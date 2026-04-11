import type {
  ContentBlock,
  PracticeCollection,
  PracticeProblem,
  PracticeStepGuide,
  PracticeSupportEquation,
} from "@/lib/types";

export type PracticeSessionStep = {
  key: string;
  collectionSlug: string;
  collectionTitle: string;
  problemSlug: string;
  problemTitle: string;
  questionLabel: string;
  questionIndex: number;
  questionCount: number;
  partId: string;
  partLabel: string | null;
  partIndex: number;
  partCount: number;
  promptText: string;
  questionBlocks: ContentBlock[];
  sharedBlocks: ContentBlock[];
  supportingEquations: PracticeSupportEquation[];
  supportMode: NonNullable<PracticeProblem["supportMode"]>;
  answerPlaceholder?: string;
  relatedModuleSlugs: string[];
};

export type PracticeSession = {
  collection: PracticeCollection;
  problems: PracticeProblem[];
  steps: PracticeSessionStep[];
};

type ProblemPart = {
  id: string;
  label: string | null;
  promptText: string;
  questionBlocks: ContentBlock[];
  answerPlaceholder?: string;
  hintIndexes?: number[];
  nextStepIndexes?: number[];
  solutionOutlineIndexes?: number[];
  stepGuideIndexes?: number[];
  supportingEquationIds?: string[];
};

function paragraphBlock(markdown: string): ContentBlock {
  return {
    type: "paragraph",
    markdown,
  };
}

function normalizePartId(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function partLabel(value: string) {
  return `Part ${value}`;
}

function stripMarkdown(value: string) {
  return value
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(/\$/g, "")
    .replace(/\\[a-zA-Z]+/g, " ")
    .replace(/[{}_^]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractPartMarker(block: ContentBlock) {
  if (block.type !== "paragraph") {
    return null;
  }

  const match = block.markdown.trim().match(/^\*\*\(([a-z0-9]+)\)\*\*\s*/i);

  if (!match) {
    return null;
  }

  return match[1];
}

function stripPartMarker(markdown: string) {
  const stripped = markdown.replace(/^\*\*\(([a-z0-9]+)\)\*\*\s*/i, "").trim();
  return stripped || markdown;
}

function pickByIndexes<T>(items: T[], indexes?: number[]) {
  if (!indexes?.length) {
    return items;
  }

  return indexes
    .map((index) => items[index])
    .filter((item): item is T => Boolean(item));
}

function selectSolutionOutline(problem: PracticeProblem, part: ProblemPart, partIndex: number, partCount: number) {
  if (!problem.solutionOutline.length) {
    return [];
  }

  if (part.solutionOutlineIndexes?.length) {
    return pickByIndexes(problem.solutionOutline, part.solutionOutlineIndexes);
  }

  if (partCount === 1) {
    return problem.solutionOutline;
  }

  if (problem.solutionOutline.length >= partCount) {
    return [problem.solutionOutline[Math.min(partIndex, problem.solutionOutline.length - 1)]];
  }

  if (partIndex === partCount - 1) {
    return [problem.solutionOutline[problem.solutionOutline.length - 1]];
  }

  return [problem.solutionOutline[Math.min(partIndex, problem.solutionOutline.length - 1)]];
}

function selectStepGuide(problem: PracticeProblem, part: ProblemPart, partIndex: number, partCount: number) {
  const stepGuide = problem.stepGuide ?? [];

  if (!stepGuide.length) {
    return [] as PracticeStepGuide[];
  }

  if (part.stepGuideIndexes?.length) {
    return pickByIndexes(stepGuide, part.stepGuideIndexes);
  }

  if (partCount === 1) {
    return stepGuide;
  }

  if (stepGuide.length === partCount) {
    return [stepGuide[Math.min(partIndex, stepGuide.length - 1)]];
  }

  if (partIndex === 0) {
    return [stepGuide[0]];
  }

  if (partIndex === partCount - 1) {
    return stepGuide.slice(1);
  }

  return [stepGuide[Math.min(partIndex, stepGuide.length - 1)]];
}

function selectHints(problem: PracticeProblem, part: ProblemPart, partIndex: number) {
  if (!problem.hints.length) {
    return [];
  }

  if (part.hintIndexes?.length) {
    return pickByIndexes(problem.hints, part.hintIndexes);
  }

  if (problem.hints[partIndex]) {
    return [problem.hints[partIndex], problem.hints[0]].filter(
      (value, index, items) => Boolean(value) && items.indexOf(value) === index,
    );
  }

  return problem.hints.slice(0, 2);
}

function selectNextSteps(problem: PracticeProblem, part: ProblemPart, partIndex: number) {
  if (!problem.nextSteps.length) {
    return [];
  }

  if (part.nextStepIndexes?.length) {
    return pickByIndexes(problem.nextSteps, part.nextStepIndexes);
  }

  if (problem.nextSteps[partIndex]) {
    return [problem.nextSteps[partIndex]];
  }

  return problem.nextSteps.slice(0, 2);
}

function selectSupportingEquations(problem: PracticeProblem, part: ProblemPart) {
  if (!part.supportingEquationIds?.length) {
    return problem.supportingEquations;
  }

  const selected = problem.supportingEquations.filter((equation) =>
    part.supportingEquationIds?.includes(equation.id),
  );

  return selected.length ? selected : problem.supportingEquations;
}

function buildManualParts(problem: PracticeProblem) {
  const sharedBlocks =
    problem.questionBlocks?.length
      ? problem.questionBlocks
      : problem.prompt.map((paragraph) => paragraphBlock(paragraph));
  const parts = (problem.sessionParts ?? []).map((part): ProblemPart => {
    const blocks = part.questionBlocks?.length
      ? part.questionBlocks
      : [paragraphBlock(part.prompt)];

    return {
      id: normalizePartId(part.id),
      label: part.label,
      promptText: stripMarkdown(part.prompt),
      questionBlocks: blocks,
      answerPlaceholder: part.answerPlaceholder,
      hintIndexes: part.hintIndexes,
      nextStepIndexes: part.nextStepIndexes,
      solutionOutlineIndexes: part.solutionOutlineIndexes,
      stepGuideIndexes: part.stepGuideIndexes,
      supportingEquationIds: part.supportingEquationIds,
    };
  });

  return {
    sharedBlocks,
    parts,
  };
}

function buildAutomaticParts(problem: PracticeProblem) {
  const blocks =
    problem.questionBlocks?.length
      ? problem.questionBlocks
      : problem.prompt.map((paragraph) => paragraphBlock(paragraph));
  const sharedBlocks: ContentBlock[] = [];
  const parts: ProblemPart[] = [];
  let current: ProblemPart | null = null;

  for (const block of blocks) {
    const marker = extractPartMarker(block);

    if (marker) {
      if (current) {
        parts.push(current);
      }

      const strippedMarkdown =
        block.type === "paragraph" ? stripPartMarker(block.markdown) : "";

      current = {
        id: normalizePartId(marker),
        label: partLabel(marker),
        promptText: stripMarkdown(strippedMarkdown),
        questionBlocks: [
          block.type === "paragraph"
            ? {
                ...block,
                markdown: strippedMarkdown,
              }
            : block,
        ],
      };

      continue;
    }

    if (current) {
      current.questionBlocks.push(block);
      continue;
    }

    sharedBlocks.push(block);
  }

  if (current) {
    parts.push(current);
  }

  if (!parts.length) {
    return {
      sharedBlocks: [],
      parts: [
        {
          id: "main",
          label: null,
          promptText: stripMarkdown(problem.prompt.join(" ")),
          questionBlocks: blocks,
        },
      ],
    };
  }

  return {
    sharedBlocks,
    parts,
  };
}

export function lectureLinkedCollectionSlug(moduleSlug: string) {
  return `lecture-linked-${moduleSlug}`;
}

export function getPracticeCollectionProblems(
  collection: PracticeCollection,
  problems: PracticeProblem[],
) {
  const bySlug = new Map(problems.map((problem) => [problem.slug, problem]));

  return collection.problemSlugs
    .map((slug) => bySlug.get(slug))
    .filter((problem): problem is PracticeProblem => Boolean(problem));
}

export function getPracticeProblemParts(problem: PracticeProblem) {
  if (problem.sessionParts?.length) {
    return buildManualParts(problem);
  }

  return buildAutomaticParts(problem);
}

export function getPracticeSessionStepCount(
  collection: PracticeCollection,
  problems: PracticeProblem[],
) {
  return getPracticeCollectionProblems(collection, problems).reduce((count, problem) => {
    const parts = getPracticeProblemParts(problem).parts;
    return count + Math.max(parts.length, 1);
  }, 0);
}

export function buildPracticeSession(
  collection: PracticeCollection,
  problems: PracticeProblem[],
): PracticeSession {
  const collectionProblems = getPracticeCollectionProblems(collection, problems);
  const steps: PracticeSessionStep[] = [];

  collectionProblems.forEach((problem, questionIndex) => {
    const { sharedBlocks, parts } = getPracticeProblemParts(problem);

    parts.forEach((part, partIndex) => {
      steps.push({
        key: `${problem.slug}::${part.id}`,
        collectionSlug: collection.slug,
        collectionTitle: collection.title,
        problemSlug: problem.slug,
        problemTitle: problem.title,
        questionLabel: problem.questionLabel ?? `Question ${questionIndex + 1}`,
        questionIndex,
        questionCount: collectionProblems.length,
        partId: part.id,
        partLabel: part.label,
        partIndex,
        partCount: parts.length,
        promptText: part.promptText,
        questionBlocks: part.questionBlocks,
        sharedBlocks,
        supportingEquations: selectSupportingEquations(problem, part),
        supportMode: problem.supportMode ?? "conceptual",
        answerPlaceholder: part.answerPlaceholder ?? problem.answerPlaceholder,
        relatedModuleSlugs: problem.relatedModuleSlugs ?? [problem.moduleSlug],
      });
    });
  });

  return {
    collection,
    problems: collectionProblems,
    steps,
  };
}

export function getPracticeSessionHref(collectionSlug: string) {
  return `/practice/source/${collectionSlug}`;
}

export function getPracticeProblemSessionHref(problem: PracticeProblem, partId?: string) {
  const base = `${getPracticeSessionHref(problem.collectionSlug ?? lectureLinkedCollectionSlug(problem.moduleSlug))}?question=${problem.slug}`;
  return partId ? `${base}&part=${partId}` : base;
}

export function focusPracticeProblemForSessionPart(
  problem: PracticeProblem,
  partId?: string,
) {
  if (!partId) {
    return problem;
  }

  const { parts } = getPracticeProblemParts(problem);
  const partIndex = parts.findIndex((part) => part.id === normalizePartId(partId));
  const part = partIndex >= 0 ? parts[partIndex] : null;

  if (!part) {
    return problem;
  }

  const guide = problem.guide
    ? {
        ...problem.guide,
        whatIsBeingAsked: part.promptText || problem.guide.whatIsBeingAsked,
      }
    : undefined;

  return {
    ...problem,
    title: part.label ? `${problem.title} - ${part.label}` : problem.title,
    prompt: [part.promptText],
    questionBlocks: part.questionBlocks,
    guide,
    supportingEquations: selectSupportingEquations(problem, part),
    hints: selectHints(problem, part, partIndex),
    nextSteps: selectNextSteps(problem, part, partIndex),
    solutionOutline: selectSolutionOutline(problem, part, partIndex, parts.length),
    stepGuide: selectStepGuide(problem, part, partIndex, parts.length),
    answerPlaceholder:
      part.answerPlaceholder ??
      problem.answerPlaceholder ??
      (problem.supportMode === "derivation"
        ? "Use this box for your current line of reasoning or the exact step you want feedback on."
        : "Write your answer to this part here."),
  } satisfies PracticeProblem;
}
