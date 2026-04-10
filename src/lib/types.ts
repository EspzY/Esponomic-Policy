export type UserRole = "student" | "admin";
export type ModuleKind = "lecture" | "symbol_register";
export type ProgressState = "not_started" | "in_progress" | "completed";
export type SymbolStatus = "verified" | "not_found_in_material";
export type NotationKind =
  | "symbol"
  | "parameter"
  | "abbreviation"
  | "shock"
  | "operator";
export type TutorMode =
  | "qa"
  | "hint"
  | "next_step"
  | "solution_check"
  | "full_solution";
export type PracticeCollectionKind =
  | "seminar_problem_set"
  | "past_exam"
  | "lecture_linked";
export type PracticeSupportMode = "conceptual" | "derivation";
export type SourceType =
  | "lecture"
  | "complementary_lecture"
  | "derivation_note"
  | "problem_set"
  | "paper"
  | "policy_report"
  | "exam"
  | "solution";

export type Citation = {
  documentTitle: string;
  page: string;
  note: string;
  sourceType: SourceType;
};

export type NotationEntry = {
  id: string;
  moduleSlug: string | null;
  kind: NotationKind;
  displayLatex: string;
  spokenName: string;
  plainMeaning: string;
  whyItMatters: string;
  whereItAppears: string[];
  commonConfusions: string[];
  relatedTerms: string[];
  status: SymbolStatus;
  citations: Citation[];
};

export type EquationBlock = {
  type: "equation";
  label: string;
  latex: string;
  explanation: string;
};

export type ParagraphBlock = {
  type: "paragraph";
  markdown: string;
};

export type DerivationStepBlock = {
  type: "derivation_step";
  title: string;
  learningGoal: string;
  operation: string;
  whyValid: string;
  latexAfter: string;
  latexBefore?: string;
  explanation: string;
};

export type ModelMapBlock = {
  type: "model_map";
  title: string;
  items: {
    label: string;
    description: string;
  }[];
};

export type ShockTraceBlock = {
  type: "shock_trace";
  title: string;
  shock: string;
  steps: {
    variable: string;
    direction: string;
    explanation: string;
  }[];
};

export type WorkedExampleBlock = {
  type: "worked_example";
  title: string;
  prompt: string;
  steps: {
    title: string;
    markdown: string;
  }[];
};

export type FigureBlock = {
  type: "figure";
  title: string;
  caption: string;
  status: "ready" | "source_pending";
  note?: string;
  imagePath?: string;
  altText?: string;
};

export type ChecklistBlock = {
  type: "checklist";
  title?: string;
  items: string[];
};

export type ExamTrapBlock = {
  type: "exam_trap";
  title: string;
  trap: string;
  correction: string;
};

export type ContentBlock =
  | ParagraphBlock
  | EquationBlock
  | DerivationStepBlock
  | ModelMapBlock
  | ShockTraceBlock
  | WorkedExampleBlock
  | FigureBlock
  | ChecklistBlock
  | ExamTrapBlock;

export type PracticeSupportEquation = {
  id: string;
  label: string;
  latex: string;
  explanation: string;
};

export type PracticeGuide = {
  problemType: string;
  whatIsBeingAsked: string;
  keyConcepts: string[];
  solutionPath: string[];
  commonMistakes: string[];
};

export type PracticeStepGuide = {
  title: string;
  whatToDo: string;
  whyValid: string;
  principle: string;
  contribution: string;
  latex?: string;
};

export type PracticeCollection = {
  id: string;
  slug: string;
  kind: PracticeCollectionKind;
  title: string;
  sourceLabel: string;
  summary: string;
  description: string;
  relatedModuleSlugs: string[];
  problemSlugs: string[];
  estimatedMinutes: number;
};

export type ModuleSection = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  contentBlocks: ContentBlock[];
  body?: string[];
  equations?: Array<Omit<EquationBlock, "type"> & { expression?: string }>;
  checkpoints?: string[];
  citations: Citation[];
};

export type ModuleSummary = {
  id: string;
  slug: string;
  title: string;
  kind: ModuleKind;
  summary: string;
  description: string;
  estimatedMinutes: number;
  tags: string[];
  publicationStatus: "draft" | "published";
};

export type ModuleDetail = ModuleSummary & {
  objectives: string[];
  sections: ModuleSection[];
  citations: Citation[];
};

export type QuizItem = {
  id: string;
  prompt: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
  tags: string[];
  citations: Citation[];
};

export type PracticeProblem = {
  id: string;
  slug: string;
  title: string;
  moduleSlug: string;
  sourceKind?: PracticeCollectionKind;
  collectionSlug?: string;
  sourceLabel?: string;
  sourceDetail?: string;
  questionLabel?: string;
  summary?: string;
  supportMode?: PracticeSupportMode;
  relatedModuleSlugs?: string[];
  prompt: string[];
  questionBlocks?: ContentBlock[];
  guide?: PracticeGuide;
  supportingEquations: PracticeSupportEquation[];
  stepGuide?: PracticeStepGuide[];
  hints: string[];
  nextSteps: string[];
  solutionOutline: string[];
  handSolveNote?: string;
  answerPlaceholder?: string;
  citations: Citation[];
};

export type ProgressSnapshot = {
  moduleSlug: string;
  status: ProgressState;
  completedSections: string[];
  bestQuizScore: number;
  weakTags: string[];
};

export type TutorSource = {
  id: string;
  moduleSlug: string;
  title: string;
  text: string;
  citations: Citation[];
  tags: string[];
};

export type TutorSourceSnippet = {
  title: string;
  excerpt: string;
  citations: Citation[];
};

export type TutorResult = {
  answerMarkdown: string;
  citations: Citation[];
  sourceSnippets: TutorSourceSnippet[];
  confidenceLabel: "grounded" | "partial" | "insufficient_evidence";
  error?: string;
};

export type TutorConversationTurn = {
  role: "user" | "assistant";
  content: string;
};

export type TutorPageKind =
  | "dashboard"
  | "module"
  | "module_quiz"
  | "practice_overview"
  | "practice_problem"
  | "symbol_register"
  | "other";

export type TutorPageContext = {
  pageKind: TutorPageKind;
  moduleSlug?: string;
  moduleTitle?: string;
  sectionSlug?: string;
  sectionTitle?: string;
  problemSlug?: string;
  problemTitle?: string;
  sourceLabel?: string;
  sourceKind?: PracticeCollectionKind;
};

export type InvitePreview = {
  id: string;
  email: string;
  fullName: string;
  cohort: string;
  expiresAt: string;
  usedAt: string | null;
  status: "pending" | "accepted" | "revoked" | "expired";
};

export type Viewer = {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  demoMode: boolean;
};
