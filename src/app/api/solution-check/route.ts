import { NextResponse } from "next/server";

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
    "## Local feedback check",
    "This feedback is based on the stored teaching guide and solution structure for the problem, not on a paid live model call.",
    "",
    "## What this question is really testing",
    problem.guide?.whatIsBeingAsked ??
      "The goal is to identify the benchmark, the mechanism, and the conclusion instead of jumping straight to a slogan.",
    "",
    "## What already looks on the right track",
    matched.length
      ? matched.map((item, index) => `${index + 1}. ${item}`).join("\n")
      : `1. ${strongestPoint}`,
    "",
    "## What is still missing or too vague",
    missing.length
      ? missing.map((item, index) => `${index + 1}. Make this explicit: ${item}`).join("\n")
      : `1. The main improvement now is to make the economic logic more explicit and less implied.`,
    "",
    "## Likely confusion to watch for",
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
    "## How to rebuild the answer more safely",
    (problem.guide?.solutionPath?.length
      ? problem.guide.solutionPath
      : [
          "Start with the benchmark or definition the question is built on.",
          "Then explain the mechanism that moves the result.",
          "End with the economic interpretation the examiner is looking for.",
        ]
    )
      .slice(0, 3)
      .map((item, index) => `${index + 1}. ${item}`)
      .join("\n"),
    "",
    "## Best next revision step",
    nextRevisionStep,
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
    "## Local derivation check",
    "This is a rule-based comparison against the stored derivation guide, so it is meant to help you line up your handwritten work with the expected path rather than fully grade every algebra line.",
    "",
    "## What the problem is testing",
    problem.guide?.whatIsBeingAsked ??
      "The goal is to show the bridge from one line to the next, not just the final formula.",
    "",
    "## Steps you seem to have identified",
    matched.length
      ? matched
          .map(
            (step, index) =>
              `${index + 1}. **${step.title}**: ${step.contribution}`,
          )
          .join("\n")
      : "1. Your draft does not yet clearly show the benchmark equation or the intended transformation.",
    "",
    "## Steps you should make explicit next",
    missing.length
      ? missing
          .map(
            (step, index) =>
              `${index + 1}. **${step.title}**\n   - What to do: ${step.whatToDo}\n   - Why it is valid: ${step.whyValid}\n   - Rule being used: ${step.principle}`,
          )
          .join("\n")
      : "1. The main remaining job is to show the intermediate algebra cleanly, not just the final expression.",
    "",
    "## First missing bridge step to write on paper",
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
    "## Common derivation trap",
    (problem.guide?.commonMistakes?.[0] ??
      "Do not skip the substitution or rearrangement that justifies the final line. Write that bridge step explicitly on paper."),
    "",
    "## Best next move",
    (missing[0]?.whatToDo ??
      problem.nextSteps[0] ??
      "Go back to the first unrevealed step in the guide and write that line out by hand before continuing."),
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
        "Add a short draft first, then run the feedback check again. The checker compares your answer against the stored teaching guide and solution outline for this problem.",
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
  const sections = [
    "## How to frame the problem",
    `This is a **${problem.guide?.problemType ?? (problem.supportMode ?? "conceptual")}** question.`,
    problem.guide?.whatIsBeingAsked
      ? `**What the question is really asking:** ${problem.guide.whatIsBeingAsked}`
      : "",
    "## How to start if you feel blank",
    problem.guide?.solutionPath?.[0]
      ? `Start with this safe first move: ${problem.guide.solutionPath[0]}`
      : "Start by naming the benchmark, then ask what mechanism the question wants you to trace.",
    problem.guide?.keyConcepts?.length
      ? `**Concepts to keep in view:** ${problem.guide.keyConcepts.join(", ")}.`
      : "",
    problem.stepGuide?.[0]
      ? `**First bridge step:** ${problem.stepGuide[0].whatToDo}`
      : "",
    problem.stepGuide?.[0]?.principle
      ? `**Rule behind that step:** ${problem.stepGuide[0].principle}`
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
      problem.guide?.commonMistakes?.[0]
        ? `**What often goes wrong here:** ${problem.guide.commonMistakes[0]}`
        : "",
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
    "## What the problem is really testing",
    problem.guide?.whatIsBeingAsked ??
      "The goal is to connect the benchmark, the mechanism, and the conclusion without skipping the bridges.",
    "",
    "## Safe solving order",
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
          `**If this step feels non-obvious:** write the new line on paper and say out loud what object you just substituted, isolated, canceled, or reinterpreted. That is usually the hidden bridge students skip.`,
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

  sections.push(
    "",
    "## Final self-check before you move on",
    "1. Have you named the benchmark or starting point clearly?",
    "2. Have you explained why each major step is taken rather than only stating the step?",
    "3. Have you said what the final result means economically, not just algebraically?",
  );

  return sections.join("\n");
}

export async function POST(request: Request) {
  try {
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

    let answerPayload:
      | TutorResult
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
      answerPayload = buildLocalSolutionCheck(problem, body.studentWork);
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
