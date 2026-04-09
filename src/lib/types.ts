export type UserRole = "student" | "admin";
export type ModuleKind = "lecture" | "symbol_register";
export type ProgressState = "not_started" | "in_progress" | "completed";
export type SymbolStatus = "verified" | "not_found_in_material";
export type TutorMode =
  | "qa"
  | "hint"
  | "next_step"
  | "solution_check"
  | "full_solution";
export type SourceType =
  | "lecture"
  | "complementary_lecture"
  | "derivation_note"
  | "problem_set"
  | "exam"
  | "solution";

export type Citation = {
  documentTitle: string;
  page: string;
  note: string;
  sourceType: SourceType;
};

export type SymbolEntry = {
  id: string;
  symbol: string;
  spokenName: string;
  definition: string;
  context: string;
  status: SymbolStatus;
  citations: Citation[];
};

export type EquationBlock = {
  label: string;
  expression: string;
  explanation: string;
};

export type ModuleSection = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string[];
  equations?: EquationBlock[];
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
  prompt: string[];
  equations: string[];
  hints: string[];
  nextSteps: string[];
  solutionOutline: string[];
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

export type TutorResult = {
  answer: string;
  citations: Citation[];
  confidenceLabel: "grounded" | "partial" | "insufficient_evidence";
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
