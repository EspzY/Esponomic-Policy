import type {
  Citation,
  ContentBlock,
  ModuleDetail,
  NotationEntry,
  PracticeProblem,
  QuizItem,
  SourceType,
} from "@/lib/types";

export function cite(
  documentTitle: string,
  page: string,
  note: string,
  sourceType: SourceType,
): Citation {
  return {
    documentTitle,
    page,
    note,
    sourceType,
  };
}

export function lectureModule(
  module: Omit<ModuleDetail, "kind" | "publicationStatus">,
): ModuleDetail {
  return {
    kind: "lecture",
    publicationStatus: "published",
    ...module,
  };
}

export function notationEntry(
  entry: Omit<NotationEntry, "status">,
  status: NotationEntry["status"] = "verified",
): NotationEntry {
  return {
    ...entry,
    status,
  };
}

export function p(markdown: string): ContentBlock {
  return {
    type: "paragraph",
    markdown,
  };
}

export function eq(label: string, latex: string, explanation: string): ContentBlock {
  return {
    type: "equation",
    label,
    latex,
    explanation,
  };
}

export function derivation(params: {
  title: string;
  learningGoal: string;
  operation: string;
  whyValid: string;
  latexAfter: string;
  latexBefore?: string;
  explanation: string;
}): ContentBlock {
  return {
    type: "derivation_step",
    ...params,
  };
}

export function modelMap(
  title: string,
  items: { label: string; description: string }[],
): ContentBlock {
  return {
    type: "model_map",
    title,
    items,
  };
}

export function shockTrace(params: {
  title: string;
  shock: string;
  steps: {
    variable: string;
    direction: string;
    explanation: string;
  }[];
}): ContentBlock {
  return {
    type: "shock_trace",
    ...params,
  };
}

export function workedExample(params: {
  title: string;
  prompt: string;
  steps: {
    title: string;
    markdown: string;
  }[];
}): ContentBlock {
  return {
    type: "worked_example",
    ...params,
  };
}

export function figureNote(params: {
  title: string;
  caption: string;
  note?: string;
  imagePath?: string;
  altText?: string;
}): ContentBlock {
  return {
    type: "figure",
    status: params.imagePath ? "ready" : "source_pending",
    ...params,
  };
}

export function checklist(items: string[], title?: string): ContentBlock {
  return {
    type: "checklist",
    title,
    items,
  };
}

export function examTrap(
  title: string,
  trap: string,
  correction: string,
): ContentBlock {
  return {
    type: "exam_trap",
    title,
    trap,
    correction,
  };
}

export function practiceProblem(problem: PracticeProblem): PracticeProblem {
  const guide = problem.guide;
  const stepGuide = problem.stepGuide ?? [];
  const baseHints = [...problem.hints];
  const baseNextSteps = [...problem.nextSteps];
  const baseOutline = [...problem.solutionOutline];

  if (guide) {
    const framingHint = `Start by naming the problem type before you chase the answer: this is a **${guide.problemType}** task. The real question is: ${guide.whatIsBeingAsked}`;
    const conceptHint = guide.keyConcepts.length
      ? `Keep these objects in play while you reason: ${guide.keyConcepts.join(", ")}.`
      : "";
    const confusionHint = guide.commonMistakes[0]
      ? `Likely confusion to avoid: ${guide.commonMistakes[0]}`
      : "";

    if (!baseHints.includes(framingHint)) {
      baseHints.unshift(framingHint);
    }

    if (conceptHint && !baseHints.includes(conceptHint)) {
      baseHints.push(conceptHint);
    }

    if (confusionHint && !baseHints.includes(confusionHint)) {
      baseHints.push(confusionHint);
    }

    const pathScaffold = guide.solutionPath.length
      ? `Do not jump to the conclusion yet. A safer route is: ${guide.solutionPath.join(" Then ")}`
      : "";

    if (pathScaffold && !baseNextSteps.includes(pathScaffold)) {
      baseNextSteps.unshift(pathScaffold);
    }
  }

  if ((problem.supportMode ?? "conceptual") === "derivation" && stepGuide.length) {
    const derivationHints = [
      "Treat this as a by-hand derivation. Do not try to type the whole proof first; isolate the exact line where your algebra or logic stopped making sense.",
      `Your first explicit move should be: ${stepGuide[0].whatToDo}`,
    ];

    for (const hint of derivationHints.reverse()) {
      if (!baseHints.includes(hint)) {
        baseHints.unshift(hint);
      }
    }

    const derivationNextStep = stepGuide[0]
      ? `Concrete next move: ${stepGuide[0].whatToDo} This is the right move now because ${stepGuide[0].contribution.toLowerCase()}`
      : "";

    if (derivationNextStep && !baseNextSteps.includes(derivationNextStep)) {
      baseNextSteps.unshift(derivationNextStep);
    }

    const teachingOutline = stepGuide.map((step, index) => {
      const ruleLead = step.principle ? `Rule used: ${step.principle}. ` : "";
      const helpLead = step.contribution
        ? `How you should know this is the right move: ${step.contribution} `
        : "";

      return `Step ${index + 1} - ${step.title}: ${step.whatToDo} ${ruleLead}Why it is valid: ${step.whyValid} ${helpLead}`.trim();
    });

    for (const item of baseOutline) {
      if (!teachingOutline.includes(item)) {
        teachingOutline.push(item);
      }
    }

    return {
      ...problem,
      hints: [...new Set(baseHints)],
      nextSteps: [...new Set(baseNextSteps)],
      solutionOutline: teachingOutline,
    };
  }

  return {
    ...problem,
    hints: [...new Set(baseHints)],
    nextSteps: [...new Set(baseNextSteps)],
    solutionOutline: [...new Set(baseOutline)],
  };
}

function hashString(value: string) {
  let hash = 0;

  for (const char of value) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }

  return hash;
}

export function quizBank(items: QuizItem[]): QuizItem[] {
  return items.map((item, index) => {
    if (
      !Array.isArray(item.choices) ||
      item.choices.length < 2 ||
      item.correctIndex < 0 ||
      item.correctIndex >= item.choices.length
    ) {
      return item;
    }

    const targetIndex = (hashString(item.id) + index) % item.choices.length;

    if (targetIndex === item.correctIndex) {
      return item;
    }

    const offset =
      (item.correctIndex - targetIndex + item.choices.length) % item.choices.length;
    const rotatedChoices = item.choices.map(
      (_, position) => item.choices[(position + offset) % item.choices.length],
    );

    return {
      ...item,
      choices: rotatedChoices,
      correctIndex: targetIndex,
    };
  });
}
