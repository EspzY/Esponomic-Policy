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
  return problem;
}

export function quizBank(items: QuizItem[]): QuizItem[] {
  return items;
}
