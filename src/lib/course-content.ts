import type { ModuleDetail, ProgressSnapshot, Viewer } from "@/lib/types";

import { lecture2Module } from "@/lib/seed-content/lecture2-content";
import {
  allLecture2Citations,
  demoNotationEntries,
  globalNotationEntries,
  lecture2NotationEntries,
} from "@/lib/seed-content/notation-content";
import {
  demoPracticeProblem,
  demoQuizItems,
  demoTutorSources,
} from "@/lib/seed-content/learning-content";

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
    "A math-first notation hub that teaches symbols, parameters, shocks, and abbreviations in the same language as Lecture 2.",
  description:
    "Use this as the course's notation anchor. Every entry is rendered as a proper formula, explains why it matters, and points back to where it is used in the model.",
  estimatedMinutes: 45,
  tags: ["notation", "reference", "lecture-2"],
  publicationStatus: "published",
  objectives: [
    "Read the course notation as formulas rather than raw underscore text.",
    "Keep actual, natural, and gap objects separate from the start.",
    "Learn both symbol meanings and why each object matters in the model.",
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
            "The notation hub is split into **global course notation** and **module-specific notation**. Start with the global entries if you are new to the course. Then use the Lecture 2 glossary to see how those same symbols behave inside the New Keynesian model.",
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
            "Treat abbreviations such as DIS, NKPC, and $mc_t$ as part of the model's vocabulary, not side notes.",
          ],
        },
      ],
      citations: allLecture2Citations,
    },
  ],
  citations: allLecture2Citations,
};

export const demoModules: ModuleDetail[] = [symbolsModule, lecture2Module];
export const demoNotation = demoNotationEntries;
export const demoGlobalNotation = globalNotationEntries;
export const demoLecture2Notation = lecture2NotationEntries;
export { demoPracticeProblem, demoQuizItems, demoTutorSources };

export const demoProgress: ProgressSnapshot[] = [
  {
    moduleSlug: "symbols",
    status: "in_progress",
    completedSections: ["overview"],
    bestQuizScore: 0,
    weakTags: ["notation"],
  },
  {
    moduleSlug: "lecture-2",
    status: "in_progress",
    completedSections: ["big-picture-and-exam-relevance", "notation-and-glossary"],
    bestQuizScore: 50,
    weakTags: ["nkpc", "shock-analysis"],
  },
];
