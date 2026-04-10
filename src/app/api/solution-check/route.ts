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

function buildHintMarkdown(problem: PracticeProblem) {
  const sections = [
    "## How to frame the problem",
    `This is a **${problem.guide?.problemType ?? (problem.supportMode ?? "conceptual")}** question.`,
    problem.guide?.whatIsBeingAsked
      ? `Before you solve, restate the task in your own words: ${problem.guide.whatIsBeingAsked}`
      : "",
    problem.guide?.keyConcepts?.length
      ? `**Concepts to keep in view:** ${problem.guide.keyConcepts.join(", ")}.`
      : "",
    "## Hint ladder",
    ...problem.hints.map((hint, index) => `${index + 1}. ${hint}`),
    problem.guide?.commonMistakes?.[0]
      ? `## Likely confusion\n${problem.guide.commonMistakes[0]}`
      : "",
  ].filter(Boolean);

  return sections.join("\n\n");
}

function buildNextStepMarkdown(problem: PracticeProblem) {
  const firstStep = problem.stepGuide?.[0];

  if (firstStep) {
    return [
      "## One concrete next step",
      `**What to do now:** ${firstStep.whatToDo}`,
      `**Why this is the right move now:** ${firstStep.contribution}`,
      `**Rule or principle being used:** ${firstStep.principle}`,
      `**Why the move is valid:** ${firstStep.whyValid}`,
      firstStep.latex ? `$$${firstStep.latex}$$` : "",
    ]
      .filter(Boolean)
      .join("\n\n");
  }

  const nextMove =
    problem.nextSteps[0] ??
    problem.guide?.solutionPath[0] ??
    "No next-step guidance is currently stored for this problem.";

  return [
    "## One concrete next step",
    nextMove,
    problem.guide?.solutionPath?.[1]
      ? `After that, the next checkpoint is: ${problem.guide.solutionPath[1]}`
      : "",
    problem.guide?.commonMistakes?.[0]
      ? `Common confusion to avoid while doing this step: ${problem.guide.commonMistakes[0]}`
      : "",
  ]
    .filter(Boolean)
    .join("\n\n");
}

function buildFullSolutionMarkdown(problem: PracticeProblem) {
  const sections = [
    "## How to approach the problem",
    ...(problem.guide?.solutionPath?.map((item, index) => `${index + 1}. ${item}`) ?? []),
  ];

  if (problem.stepGuide?.length) {
    sections.push(
      "",
      "## Teaching solution",
      ...problem.stepGuide.map((step, index) =>
        [
          `### Step ${index + 1}: ${step.title}`,
          `**What to do:** ${step.whatToDo}`,
          `**Why this is the right step:** ${step.contribution}`,
          `**What rule justifies it:** ${step.principle}`,
          `**Why the move is valid:** ${step.whyValid}`,
          step.latex ? `$$${step.latex}$$` : "",
        ]
          .filter(Boolean)
          .join("\n\n"),
      ),
    );
  } else {
    sections.push(
      "",
      "## Teaching answer outline",
      ...problem.solutionOutline.map((step, index) => `${index + 1}. ${step}`),
    );
  }

  if (problem.guide?.commonMistakes?.length) {
    sections.push(
      "",
      "## Common confusion to watch for",
      ...problem.guide.commonMistakes.map((mistake, index) => `${index + 1}. ${mistake}`),
    );
  }

  return sections.join("\n");
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
        answerMarkdown: buildHintMarkdown(problem),
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
        answerMarkdown: buildNextStepMarkdown(problem),
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
        answerMarkdown: buildFullSolutionMarkdown(problem),
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
