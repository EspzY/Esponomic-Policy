import type {
  ModuleDetail,
  PracticeProblem,
  ProgressSnapshot,
  QuizItem,
  Viewer,
} from "@/lib/types";

import {
  allLecture1Citations,
  lecture1Module,
  lecture1NotationEntries,
  lecture1PracticeProblem,
  lecture1QuizItems,
} from "@/lib/seed-content/lecture1-content";
import { lecture2Module } from "@/lib/seed-content/lecture2-content";
import {
  demoPracticeProblem as lecture2PracticeProblem,
  demoQuizItems as lecture2QuizItems,
} from "@/lib/seed-content/learning-content";
import {
  lectures3To8Modules,
  lectures3To8NotationEntries,
  lectures3To8PracticeProblems,
  lectures3To8QuizItemsByModule,
} from "@/lib/seed-content/lectures3to8-content";
import {
  lectures9To12Modules,
  lectures9To12NotationEntries,
  lectures9To12PracticeProblems,
  lectures9To12QuizItemsByModule,
} from "@/lib/seed-content/lectures9to12-content";
import {
  allLecture2Citations,
  globalNotationEntries,
  lecture2NotationEntries,
} from "@/lib/seed-content/notation-content";

export const demoViewer: Viewer = {
  id: "demo-admin",
  email: "demo@bi.no",
  fullName: "Demo Admin",
  role: "admin",
  demoMode: true,
};

const symbolsModule: ModuleDetail = {
  id: "symbols",
  slug: "symbols",
  title: "Module 1: Notation Hub",
  kind: "symbol_register",
  summary:
    "A math-first notation hub that teaches symbols, parameters, shocks, and abbreviations across the full course.",
  description:
    "Use this as the course's notation anchor. Every entry is rendered as a proper formula, explains why it matters, and points back to where it is used in the relevant lecture.",
  estimatedMinutes: 45,
  tags: ["notation", "reference", "full-course"],
  publicationStatus: "published",
  objectives: [
    "Read the course notation as formulas rather than raw underscore text.",
    "Keep model objects, policy rules, shocks, and abbreviations separate from the start.",
    "Learn both symbol meanings and why each object matters in the relevant lecture.",
  ],
  sections: [
    {
      id: "symbols-overview",
      slug: "overview",
      title: "How to use the notation hub",
      summary:
        "This page is designed for learning, not just looking up symbols one by one.",
      contentBlocks: [
        {
          type: "paragraph",
          markdown:
            "The notation hub is split into **global course notation** and **module-specific notation**. Start with the global entries if you are new to the course. Then move lecture by lecture to see how the same notation changes role across monetary policy, debt, inequality, and sustainability.",
        },
        {
          type: "paragraph",
          markdown:
            "Every entry answers the same teaching questions: **what it is**, **why it matters**, **where it appears**, and **what students usually confuse it with**. That consistent structure is deliberate, because this course becomes much easier once the notation stops feeling cryptic.",
        },
        {
          type: "checklist",
          title: "How to study notation efficiently",
          items: [
            "Read each symbol out loud as you study it. The spoken form helps you recognize it faster in derivations and seminar questions.",
            "Focus first on the objects that create the model's backbone: $y_t$, $y_t^n$, $\\tilde{y}_t$, $\\pi_t$, $r_t$, and $r_t^n$.",
            "Treat abbreviations such as DIS, NKPC, HANK, and the Gini coefficient as part of the model's vocabulary, not side notes.",
          ],
        },
      ],
      citations: [...allLecture1Citations, ...allLecture2Citations],
    },
  ],
  citations: [...allLecture1Citations, ...allLecture2Citations],
};

export const demoModules: ModuleDetail[] = [
  symbolsModule,
  lecture1Module,
  lecture2Module,
  ...lectures3To8Modules,
  ...lectures9To12Modules,
];
export const demoNotation = [
  ...globalNotationEntries,
  ...lecture1NotationEntries,
  ...lecture2NotationEntries,
  ...lectures3To8NotationEntries,
  ...lectures9To12NotationEntries,
];
export const demoGlobalNotation = globalNotationEntries;
export const demoPracticeProblems: PracticeProblem[] = [
  lecture1PracticeProblem,
  lecture2PracticeProblem,
  ...lectures3To8PracticeProblems,
  ...lectures9To12PracticeProblems,
];
export const demoQuizItemsByModule: Record<string, QuizItem[]> = {
  "lecture-1": lecture1QuizItems,
  "lecture-2": lecture2QuizItems,
  ...lectures3To8QuizItemsByModule,
  ...lectures9To12QuizItemsByModule,
};

export function getLocalPracticeProblemBySlug(slug: string) {
  return demoPracticeProblems.find((problem) => problem.slug === slug) ?? null;
}

export function getLocalPracticeProblemForModule(moduleSlug: string) {
  return demoPracticeProblems.find((problem) => problem.moduleSlug === moduleSlug) ?? null;
}

export function getLocalQuizItems(moduleSlug: string) {
  return demoQuizItemsByModule[moduleSlug] ?? [];
}

export const demoProgress: ProgressSnapshot[] = [
  {
    moduleSlug: "symbols",
    status: "in_progress",
    completedSections: ["overview"],
    bestQuizScore: 0,
    weakTags: ["notation"],
  },
  {
    moduleSlug: "lecture-1",
    status: "in_progress",
    completedSections: ["big-picture-and-exam-relevance"],
    bestQuizScore: 0,
    weakTags: ["systematic-policy"],
  },
  {
    moduleSlug: "lecture-2",
    status: "in_progress",
    completedSections: ["big-picture-and-exam-relevance", "notation-and-glossary"],
    bestQuizScore: 50,
    weakTags: ["nkpc", "shock-analysis"],
  },
];
