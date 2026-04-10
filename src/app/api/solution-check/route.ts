import { NextResponse } from "next/server";

import { buildTutorAnswer, retrieveTutorSources } from "@/lib/ai";
import { getViewer } from "@/lib/auth";
import { enforceAiQuota, recordAiUsage } from "@/lib/progress";
import { getPracticeProblemBySlug, getTutorSources } from "@/lib/repository";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import type { ContentBlock, PracticeProblem, TutorSource } from "@/lib/types";

function flattenBlockText(block: ContentBlock): string {
  if (block.type === "paragraph") {
    return block.markdown;
  }

  if (block.type === "equation") {
    return `${block.label}. ${block.explanation} Latex: ${block.latex}`;
  }

  if (block.type === "derivation_step") {
    return [
      block.title,
      block.learningGoal,
      block.operation,
      block.whyValid,
      block.explanation,
      block.latexBefore ?? "",
      block.latexAfter,
    ].join(" ");
  }

  if (block.type === "model_map") {
    return `${block.title} ${block.items.map((item) => `${item.label}: ${item.description}`).join(" ")}`;
  }

  if (block.type === "shock_trace") {
    return `${block.title} ${block.shock} ${block.steps
      .map((step) => `${step.variable} ${step.direction}. ${step.explanation}`)
      .join(" ")}`;
  }

  if (block.type === "worked_example") {
    return `${block.title} ${block.prompt} ${block.steps
      .map((step) => `${step.title}. ${step.markdown}`)
      .join(" ")}`;
  }

  if (block.type === "figure") {
    return `${block.title}. ${block.caption}. ${block.note ?? ""}`;
  }

  if (block.type === "checklist") {
    return `${block.title ?? "Checklist"} ${block.items.join(" ")}`;
  }

  return `${block.title}. Trap: ${block.trap}. Fix: ${block.correction}`;
}

function toProblemTutorSource(problem: PracticeProblem): TutorSource {
  const promptText = problem.questionBlocks?.length
    ? problem.questionBlocks.map((block) => flattenBlockText(block)).join(" ")
    : problem.prompt.join(" ");
  const supportEquations = problem.supportingEquations
    .map((equation) => `${equation.label}: ${equation.explanation} Latex: ${equation.latex}`)
    .join(" ");
  const guideText = problem.guide
    ? [
        problem.guide.problemType,
        problem.guide.whatIsBeingAsked,
        ...problem.guide.keyConcepts,
        ...problem.guide.solutionPath,
        ...problem.guide.commonMistakes,
      ].join(" ")
    : "";
  const stepGuideText = (problem.stepGuide ?? [])
    .map((step) =>
      [step.title, step.whatToDo, step.whyValid, step.principle, step.contribution, step.latex ?? ""].join(
        " ",
      ),
    )
    .join(" ");

  return {
    id: `problem-${problem.slug}`,
    moduleSlug: problem.moduleSlug,
    title: `${problem.questionLabel ?? "Practice question"}: ${problem.title}`,
    text: [
      problem.summary ?? "",
      promptText,
      supportEquations,
      guideText,
      stepGuideText,
      ...problem.hints,
      ...problem.nextSteps,
      ...problem.solutionOutline,
    ]
      .join(" ")
      .trim(),
    citations: problem.citations,
    tags: [
      "practice",
      problem.moduleSlug,
      problem.supportMode ?? "conceptual",
      problem.collectionSlug ?? "standalone",
    ],
  };
}

export async function POST(request: Request) {
  try {
    const viewer = await getViewer();
    const body = (await request.json()) as {
      mode?: "hint" | "next_step" | "solution_check" | "full_solution";
      moduleSlug?: string;
      problemSlug?: string;
      studentWork?: string;
    };

    if (!body.mode || !body.moduleSlug || !body.problemSlug) {
      return NextResponse.json(
        { error: "mode, moduleSlug, and problemSlug are required." },
        { status: 400 },
      );
    }

    const problem = await getPracticeProblemBySlug(body.problemSlug);

    if (!problem) {
      return NextResponse.json({ error: "Problem not found." }, { status: 404 });
    }

    const usageKind = body.mode === "full_solution" ? "full_solution" : "solution_check";
    const limit = body.mode === "full_solution" ? 10 : 15;

    if (viewer && !viewer.demoMode) {
      const quota = await enforceAiQuota({
        userId: viewer.id,
        usageKind,
        limit,
      });

      if (!quota.allowed) {
        return NextResponse.json(
          { error: `Daily quota reached for ${body.mode}.` },
          { status: 429 },
        );
      }
    }

    let answerPayload:
      | {
          answerMarkdown: string;
          confidenceLabel: "grounded" | "partial" | "insufficient_evidence";
          citations: typeof problem.citations;
          sourceSnippets: {
            title: string;
            excerpt: string;
            citations: typeof problem.citations;
          }[];
          error?: string;
        }
      | undefined;

    if (body.mode === "hint") {
      answerPayload = {
        answerMarkdown:
          problem.hints[0] ?? "No hint is currently stored for this problem.",
        confidenceLabel: "grounded",
        citations: problem.citations,
        sourceSnippets: [
          {
            title: problem.title,
            excerpt:
              "Stored hint from the curated practice workflow for this practice question.",
            citations: problem.citations,
          },
        ],
      };
    } else if (body.mode === "next_step") {
      answerPayload = {
        answerMarkdown:
          problem.nextSteps[0] ?? "No next-step guidance is currently stored for this problem.",
        confidenceLabel: "grounded",
        citations: problem.citations,
        sourceSnippets: [
          {
            title: problem.title,
            excerpt:
              "Stored next-step guidance from the curated practice workflow for this practice question.",
            citations: problem.citations,
          },
        ],
      };
    } else if (body.mode === "full_solution") {
      answerPayload = {
        answerMarkdown: problem.solutionOutline
          .map((step, index) => `${index + 1}. ${step}`)
          .join("\n\n"),
        confidenceLabel: "grounded",
        citations: problem.citations,
        sourceSnippets: [
          {
            title: problem.title,
            excerpt:
              "Stored full-solution outline from the curated practice workflow for this practice question.",
            citations: problem.citations,
          },
        ],
      };
    } else {
      const problemSource = toProblemTutorSource(problem);
      const sources = [problemSource, ...(await getTutorSources(body.moduleSlug))];
      const selectedSources = await retrieveTutorSources(
        `${problem.title}\n${problem.summary ?? ""}\n${body.studentWork ?? ""}`,
        sources,
      );
      answerPayload = await buildTutorAnswer(
        "solution_check",
        [
          `Problem: ${problem.title}`,
          `Support mode: ${problem.supportMode ?? "conceptual"}`,
          `What the question asks: ${problem.guide?.whatIsBeingAsked ?? problem.prompt.join(" ")}`,
          `Student work:\n${body.studentWork ?? "(no work provided yet)"}`,
        ].join("\n"),
        selectedSources,
      );
    }

    if (viewer && !viewer.demoMode) {
      await recordAiUsage(viewer.id, usageKind);

      const admin = createAdminSupabaseClient();
      const { data: thread } = await admin!.from("qa_threads").insert({
        user_id: viewer.id,
        module_slug: body.moduleSlug,
        title: problem.title,
      }).select("id").single();

      if (thread) {
        await admin!.from("qa_messages").insert([
          {
            thread_id: thread.id,
            role: "user",
            mode: body.mode,
            content_markdown: body.studentWork ?? body.mode,
          },
          {
            thread_id: thread.id,
            role: "assistant",
            mode: body.mode,
            content_markdown: answerPayload.answerMarkdown,
            citations: answerPayload.citations,
            confidence_label: answerPayload.confidenceLabel,
          },
        ]);
      }
    }

    return NextResponse.json(answerPayload);
  } catch (error) {
    return NextResponse.json(
      {
        answerMarkdown:
          "The tutor could not finish the request, so no reliable grading feedback was produced.",
        confidenceLabel: "insufficient_evidence",
        citations: [],
        sourceSnippets: [],
        error: error instanceof Error ? error.message : "The tutor request failed.",
      },
      { status: 500 },
    );
  }
}
