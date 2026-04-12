import { NextResponse } from "next/server";

import { focusPracticeProblemForSessionPart } from "@/lib/practice-session";
import { getPracticeProblemBySlug } from "@/lib/repository";
import type { PracticeProblem, TutorResult } from "@/lib/types";

const STOP_WORDS = new Set([
  "the",
  "and",
  "that",
  "this",
  "with",
  "from",
  "into",
  "your",
  "their",
  "they",
  "them",
  "have",
  "has",
  "had",
  "what",
  "when",
  "where",
  "which",
  "while",
  "would",
  "should",
  "could",
  "about",
  "because",
  "there",
  "these",
  "those",
  "then",
  "than",
  "over",
  "under",
  "after",
  "before",
  "through",
  "being",
  "been",
  "just",
  "very",
  "more",
  "most",
  "also",
  "into",
  "onto",
  "only",
  "must",
  "does",
  "doing",
  "done",
  "such",
  "each",
  "same",
  "much",
  "many",
  "still",
  "need",
  "needs",
  "using",
  "used",
  "make",
  "made",
  "show",
  "shows",
  "showing",
  "student",
  "answer",
  "question",
]);

function tokenize(text: string) {
  return text
    .toLowerCase()
    .replace(/[$\\{}^_=(),.:;!?[\]"]/g, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 3 && !STOP_WORDS.has(token));
}

function scorePhraseCoverage(phrase: string, studentTokens: Set<string>) {
  const tokens = tokenize(phrase);

  if (!tokens.length) {
    return 0;
  }

  const hits = tokens.filter((token) => studentTokens.has(token)).length;
  return hits / tokens.length;
}

function buildSourceSnippets(problem: PracticeProblem) {
  return [
    {
      title: problem.title,
      excerpt:
        problem.guide?.whatIsBeingAsked ??
        problem.summary ??
        problem.prompt.join(" "),
      citations: problem.citations,
    },
  ];
}

function firstNonEmpty(values: Array<string | undefined>) {
  return values.find((value) => Boolean(value?.trim()));
}

function uniqueNonEmpty(values: Array<string | undefined>) {
  return values.filter((value, index, items): value is string => {
    if (!value?.trim()) {
      return false;
    }

    return items.findIndex((candidate) => candidate?.trim() === value.trim()) === index;
  });
}

function isMetaSolutionSentence(value: string) {
  return /(^|\b)(move\s+\d+|what to do|why this belongs here|carry this forward|safe reading order|safest route|right move now|this is the bridge|the exam wants|strong answer can|write one sentence|write one paragraph|write the|start by)\b/i.test(
    value,
  );
}

function stripMetaCoaching(text: string) {
  const trimmed = text.trim();

  if (!trimmed) {
    return "";
  }

  const sentences = trimmed
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)
    .filter((sentence) => !isMetaSolutionSentence(sentence));

  if (!sentences.length) {
    return "";
  }

  return sentences.join(" ").trim();
}

function buildConceptualRewriteTemplate(problem: PracticeProblem) {
  const path = uniqueNonEmpty([
    ...problem.nextSteps,
    ...(problem.guide?.solutionPath ?? []),
  ]);

  return [
    path[0] ?? "Start from the benchmark or definition the question rests on.",
    path[1] ?? "Then explain the mechanism one link at a time.",
    path[2] ?? "Finish with the economic interpretation.",
  ];
}

function buildAnswerOutlineMarkdown(problem: PracticeProblem) {
  const steps =
    problem.supportMode === "derivation" && problem.stepGuide?.length
      ? problem.stepGuide.map((step) => step.title)
      : uniqueNonEmpty([
          ...problem.nextSteps,
          ...(problem.guide?.solutionPath ?? []),
        ]);

  const outline = steps.length ? steps : buildConceptualRewriteTemplate(problem);

  return [
    "## Answer outline",
    ...outline.slice(0, 4).map((step, index) => `${index + 1}. ${step}`),
  ].join("\n\n");
}

function buildExamReadyAnswer(problem: PracticeProblem) {
  const cleanedOutline = problem.solutionOutline
    .map((paragraph) => stripMetaCoaching(paragraph))
    .filter(Boolean);

  if (cleanedOutline.length) {
    return cleanedOutline.join("\n\n");
  }

  if (problem.stepGuide?.length) {
    const lastStep = problem.stepGuide[problem.stepGuide.length - 1];
    return [
      stripMetaCoaching(lastStep.contribution),
      lastStep.latex ? `Result: $$${lastStep.latex}$$` : "",
    ]
      .filter(Boolean)
      .join("\n\n");
  }

  return problem.guide?.whatIsBeingAsked ?? problem.prompt.join(" ");
}

function buildLocalConceptualFeedback(
  problem: PracticeProblem,
  studentWork: string,
): TutorResult {
  const studentTokens = new Set(tokenize(studentWork));
  const rubricItems = [
    ...(problem.guide?.keyConcepts ?? []),
    ...(problem.guide?.solutionPath ?? []),
    ...problem.solutionOutline,
  ]
    .filter(Boolean)
    .slice(0, 10);

  const scoredItems = rubricItems.map((item) => ({
    item,
    score: scorePhraseCoverage(item, studentTokens),
  }));

  const matched = scoredItems
    .filter((entry) => entry.score >= 0.35)
    .sort((left, right) => right.score - left.score)
    .slice(0, 3)
    .map((entry) => entry.item);
  const missing = scoredItems
    .filter((entry) => entry.score < 0.35)
    .slice(0, 3)
    .map((entry) => entry.item);

  const strongestPoint =
    matched[0] ??
    firstNonEmpty(problem.guide?.keyConcepts ?? []) ??
    problem.summary ??
    "You are engaging with the right topic, but the answer still needs a clearer structure.";
  const nextRevisionStep =
    missing[0] ??
    firstNonEmpty(problem.guide?.solutionPath ?? []) ??
    firstNonEmpty(problem.solutionOutline) ??
    "Rewrite the answer so it explicitly names the benchmark, the mechanism, and the conclusion.";

  const markdown = [
    "## What is already working",
    matched.length
      ? matched.map((item, index) => `${index + 1}. ${item}`).join("\n")
      : `1. ${strongestPoint}`,
    "",
    "## What is still missing",
    missing.length
      ? missing.map((item, index) => `${index + 1}. Make this explicit: ${item}`).join("\n")
      : `1. The next gain is to make the mechanism more explicit instead of leaving it implied.`,
    "",
    "## Tighten this mechanism",
    problem.guide?.whatIsBeingAsked ??
      "State the benchmark first, then explain the mechanism, then give the conclusion.",
    "",
    "## Likely confusion",
    (problem.guide?.commonMistakes?.length
      ? problem.guide.commonMistakes
      : [
          "Students often jump straight to the final conclusion without naming the benchmark comparison or the mechanism that gets them there.",
        ]
    )
      .slice(0, 2)
      .map((item, index) => `${index + 1}. ${item}`)
      .join("\n"),
    "",
    "## Best next rewrite",
    buildConceptualRewriteTemplate(problem)
      .map((item, index) => `${index + 1}. ${item}`)
      .join("\n"),
    "",
    `## Best next step\n${nextRevisionStep}`,
  ].join("\n");

  return {
    answerMarkdown: markdown,
    confidenceLabel: matched.length >= 2 ? "grounded" : "partial",
    citations: problem.citations,
    sourceSnippets: buildSourceSnippets(problem),
  };
}

function buildLocalDerivationFeedback(
  problem: PracticeProblem,
  studentWork: string,
): TutorResult {
  const studentTokens = new Set(tokenize(studentWork));
  const derivationSteps = (problem.stepGuide ?? []).map((step) => ({
    title: step.title,
    whatToDo: step.whatToDo,
    principle: step.principle,
    whyValid: step.whyValid,
    contribution: step.contribution,
    latex: step.latex,
    score: scorePhraseCoverage(
      [step.title, step.whatToDo, step.principle, step.contribution].join(" "),
      studentTokens,
    ),
  }));

  const matched = derivationSteps
    .filter((step) => step.score >= 0.28)
    .slice(0, 2);
  const missing = derivationSteps
    .filter((step) => step.score < 0.28)
    .slice(0, 2);

  const markdown = [
    "## What is already in place",
    matched.length
      ? matched
          .map(
            (step, index) =>
              `${index + 1}. **${step.title}**: ${step.contribution}`,
          )
          .join("\n")
      : "1. Your draft does not yet clearly show the benchmark equation or the intended transformation.",
    "",
    "## Missing bridge step",
    missing.length
      ? missing
          .map(
            (step, index) =>
              `${index + 1}. **${step.title}**\n   - What to do: ${step.whatToDo}\n   - Why it is valid: ${step.whyValid}\n   - Rule being used: ${step.principle}`,
          )
          .join("\n")
      : "1. The main remaining job is to show the intermediate algebra cleanly, not just the final expression.",
    "",
    "## Why that step matters",
    missing[0]?.contribution ??
      "This is the hidden bridge between the setup and the final formula.",
    "",
    "## Write this next on paper",
    missing[0]
      ? [
          `**${missing[0].title}**`,
          `- Write this move explicitly: ${missing[0].whatToDo}`,
          `- Why it is valid: ${missing[0].whyValid}`,
          `- What tells you this is the right move now: ${missing[0].contribution}`,
          missing[0].latex ? `- Helpful target line: $$${missing[0].latex}$$` : "",
        ]
          .filter(Boolean)
          .join("\n")
      : "1. Your next gain comes from writing the missing intermediate line explicitly instead of leaping from setup to final answer.",
    "",
    `## Common derivation trap\n${problem.guide?.commonMistakes?.[0] ??
      "Do not skip the substitution or rearrangement that justifies the final line. Write that bridge step explicitly on paper."}`,
    "",
    `## Best next move\n${missing[0]?.whatToDo ??
      problem.nextSteps[0] ??
      "Go back to the first unrevealed step in the guide and write that line out by hand before continuing."}`,
  ].join("\n");

  return {
    answerMarkdown: markdown,
    confidenceLabel:
      matched.length >= 2 ? "grounded" : matched.length >= 1 ? "partial" : "insufficient_evidence",
    citations: problem.citations,
    sourceSnippets: buildSourceSnippets(problem),
  };
}

function buildLocalSolutionCheck(
  problem: PracticeProblem,
  studentWork?: string,
): TutorResult {
  const trimmedWork = studentWork?.trim();

  if (!trimmedWork) {
    return {
      answerMarkdown:
        "Add a short draft first, then run the feedback check again. The checker compares your answer against the stored teaching guide and model answer for this problem.",
      confidenceLabel: "insufficient_evidence",
      citations: problem.citations,
      sourceSnippets: buildSourceSnippets(problem),
    };
  }

  if ((problem.supportMode ?? "conceptual") === "derivation") {
    return buildLocalDerivationFeedback(problem, trimmedWork);
  }

  return buildLocalConceptualFeedback(problem, trimmedWork);
}

function buildHintMarkdown(problem: PracticeProblem) {
  const firstHint =
    problem.hints[0] ??
    problem.guide?.solutionPath?.[0] ??
    "Start with the benchmark or definition before you jump to the conclusion.";

  const secondHint =
    problem.stepGuide?.[0]?.whatToDo ??
    problem.nextSteps[0] ??
    problem.guide?.solutionPath?.[1] ??
    "";

  return [
    "## Hint",
    firstHint,
    secondHint ? `Then do this next: ${secondHint}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
}

function buildNextStepMarkdown(problem: PracticeProblem) {
  return buildAnswerOutlineMarkdown(problem);
}

function extractPartLabel(problem: PracticeProblem) {
  const match = problem.title.match(/ - (Part\s*\(?[a-z0-9]+\)?)/i);
  return match?.[1] ?? "";
}

function buildFullSolutionMarkdown(problem: PracticeProblem) {
  const partLabel = extractPartLabel(problem);
  const solutionParagraphs = (
    problem.solutionOutline.length
      ? problem.solutionOutline
      : [buildExamReadyAnswer(problem)]
  )
    .map((paragraph) => stripMetaCoaching(paragraph))
    .filter(Boolean);
  const fallbackAnswer = stripMetaCoaching(buildExamReadyAnswer(problem));
  const answerParagraphs = solutionParagraphs.length
    ? solutionParagraphs
    : fallbackAnswer
      ? [fallbackAnswer]
      : ["A stored model answer is not available for this step yet."];

  if (problem.supportMode === "derivation" && problem.stepGuide?.length) {
    return [
      "## Exam answer",
      partLabel ? `### ${partLabel}` : "",
      ...answerParagraphs,
    ].join("\n\n");
  }

  return [
    "## Exam answer",
    partLabel ? `### ${partLabel}` : "",
    ...answerParagraphs,
  ].join("\n\n");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      mode?: "hint" | "next_step" | "solution_check" | "full_solution";
      moduleSlug?: string;
      problemSlug?: string;
      partId?: string;
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

    const focusedProblem = focusPracticeProblemForSessionPart(problem, body.partId);

    let answerPayload:
      | TutorResult
      | undefined;

    if (body.mode === "hint") {
      answerPayload = {
        answerMarkdown: buildHintMarkdown(focusedProblem),
        confidenceLabel: "grounded",
        citations: focusedProblem.citations,
        sourceSnippets: [
          {
            title: focusedProblem.title,
            excerpt:
              "Stored hint from the curated practice workflow for this practice question.",
            citations: focusedProblem.citations,
          },
        ],
      };
    } else if (body.mode === "next_step") {
      answerPayload = {
        answerMarkdown: buildNextStepMarkdown(focusedProblem),
        confidenceLabel: "grounded",
        citations: focusedProblem.citations,
        sourceSnippets: [
          {
            title: focusedProblem.title,
            excerpt:
              "Stored answer-outline guidance from the curated practice workflow for this practice question.",
            citations: focusedProblem.citations,
          },
        ],
      };
    } else if (body.mode === "full_solution") {
      answerPayload = {
        answerMarkdown: buildFullSolutionMarkdown(focusedProblem),
        confidenceLabel: "grounded",
        citations: focusedProblem.citations,
        sourceSnippets: [
          {
            title: focusedProblem.title,
            excerpt:
              "Stored worked solution from the curated practice workflow for this practice question.",
            citations: focusedProblem.citations,
          },
        ],
      };
    } else {
      answerPayload = buildLocalSolutionCheck(focusedProblem, body.studentWork);
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
