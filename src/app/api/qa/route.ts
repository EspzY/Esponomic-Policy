import { NextResponse } from "next/server";

import { buildTutorAnswer, retrieveTutorSources } from "@/lib/ai";
import { getViewer } from "@/lib/auth";
import { isTutorWidgetEnabled } from "@/lib/env";
import { enforceAiQuota, recordAiUsage } from "@/lib/progress";
import { getCourseModules, getPracticeProblemBySlug, getTutorSources } from "@/lib/repository";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import type { ContentBlock, PracticeProblem, TutorConversationTurn, TutorPageContext, TutorSource } from "@/lib/types";

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
    id: `qa-problem-${problem.slug}`,
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

function buildContextPrompt(
  question: string,
  pageContext?: TutorPageContext,
  conversation?: TutorConversationTurn[],
) {
  const contextLines = pageContext
    ? [
        `Page kind: ${pageContext.pageKind}`,
        pageContext.moduleTitle ? `Current lecture/module: ${pageContext.moduleTitle}` : "",
        pageContext.sectionTitle ? `Current section: ${pageContext.sectionTitle}` : "",
        pageContext.problemTitle ? `Current practice problem: ${pageContext.problemTitle}` : "",
        pageContext.sourceLabel ? `Current source: ${pageContext.sourceLabel}` : "",
      ].filter(Boolean)
    : [];

  const conversationBlock = conversation?.length
    ? [
        "Conversation so far:",
        ...conversation.slice(-6).map((turn) => `${turn.role === "user" ? "Student" : "Tutor"}: ${turn.content}`),
      ].join("\n")
    : "";

  return [
    contextLines.length ? `Current page context:\n${contextLines.join("\n")}` : "",
    conversationBlock,
    `Latest student question:\n${question}`,
  ]
    .filter(Boolean)
    .join("\n\n");
}

export async function POST(request: Request) {
  try {
    if (!isTutorWidgetEnabled()) {
      return NextResponse.json(
        {
          answerMarkdown:
            "The live chat tutor is currently disabled to avoid runtime AI costs. Use the lecture modules, worked derivations, and the built-in practice guidance instead.",
          confidenceLabel: "insufficient_evidence",
          citations: [],
          sourceSnippets: [],
          error:
            "The live tutor is disabled in this deployment.",
        },
        { status: 403 },
      );
    }

    const viewer = await getViewer();
    const body = (await request.json()) as {
      moduleSlug?: string;
      problemSlug?: string;
      question?: string;
      mode?: "qa";
      pageContext?: TutorPageContext;
      conversation?: TutorConversationTurn[];
    };

    if (!body.question?.trim()) {
      return NextResponse.json(
        {
          error: "question is required.",
        },
        { status: 400 },
      );
    }

    if (viewer && !viewer.demoMode) {
      const quota = await enforceAiQuota({
        userId: viewer.id,
        usageKind: "qa",
        limit: 30,
      });

      if (!quota.allowed) {
        return NextResponse.json(
          {
            error: "Daily Q&A quota reached for this user.",
          },
          { status: 429 },
        );
      }
    }

    const problem = body.problemSlug ? await getPracticeProblemBySlug(body.problemSlug) : null;
    const moduleSlug = body.moduleSlug ?? body.pageContext?.moduleSlug ?? problem?.moduleSlug;

    const allSources = moduleSlug
      ? await getTutorSources(moduleSlug)
      : (
          await Promise.all(
            (await getCourseModules()).map((module) => getTutorSources(module.slug)),
          )
        ).flat();

    const combinedSources = Array.from(
      new Map(
        (problem ? [toProblemTutorSource(problem), ...allSources] : allSources).map((source) => [
          source.id,
          source,
        ]),
      ).values(),
    );
    const retrievalQuery = [
      body.question,
      body.pageContext?.moduleTitle ?? "",
      body.pageContext?.sectionTitle ?? "",
      body.pageContext?.problemTitle ?? "",
      ...(body.conversation?.slice(-3).map((turn) => turn.content) ?? []),
    ]
      .join("\n")
      .trim();
    const selectedSources = await retrieveTutorSources(retrievalQuery, combinedSources);
    const answer = await buildTutorAnswer(
      "qa",
      buildContextPrompt(body.question, body.pageContext, body.conversation),
      selectedSources,
    );

    if (viewer && !viewer.demoMode) {
      await recordAiUsage(viewer.id, "qa");

      const admin = createAdminSupabaseClient();
      const { data: thread } = await admin!.from("qa_threads").insert({
        user_id: viewer.id,
        module_slug: moduleSlug,
        title: body.question.slice(0, 100),
      }).select("id").single();

      if (thread) {
        await admin!.from("qa_messages").insert([
          {
            thread_id: thread.id,
            role: "user",
            mode: "qa",
            content_markdown: body.question,
          },
          {
            thread_id: thread.id,
            role: "assistant",
            mode: "qa",
            content_markdown: answer.answerMarkdown,
            citations: answer.citations,
            confidence_label: answer.confidenceLabel,
          },
        ]);
      }
    }

    return NextResponse.json(answer);
  } catch (error) {
    return NextResponse.json(
      {
        answerMarkdown:
          "The tutor request failed before a reliable answer could be produced.",
        confidenceLabel: "insufficient_evidence",
        citations: [],
        sourceSnippets: [],
        error: error instanceof Error ? error.message : "The tutor request failed.",
      },
      { status: 500 },
    );
  }
}
