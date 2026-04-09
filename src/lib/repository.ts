import {
  demoModules,
  demoPracticeProblem,
  demoProgress,
  demoQuizItems,
  demoSymbols,
  demoTutorSources,
} from "@/lib/demo-content";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import type {
  ModuleDetail,
  ModuleSummary,
  PracticeProblem,
  ProgressSnapshot,
  QuizItem,
  SymbolEntry,
  TutorSource,
} from "@/lib/types";

function mapModuleSummary(row: Record<string, unknown>): ModuleSummary {
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    kind: row.kind === "symbol_register" ? "symbol_register" : "lecture",
    summary: String(row.summary ?? ""),
    description: String(row.description ?? ""),
    estimatedMinutes: Number(row.estimated_minutes ?? 0),
    tags: Array.isArray(row.tags) ? (row.tags as string[]) : [],
    publicationStatus:
      row.publication_status === "draft" ? "draft" : "published",
  };
}

function mapModuleDetail(
  summary: ModuleSummary,
  row: Record<string, unknown>,
): ModuleDetail {
  return {
    ...summary,
    objectives: Array.isArray(row.objectives) ? (row.objectives as string[]) : [],
    sections: Array.isArray(row.sections)
      ? (row.sections as ModuleDetail["sections"])
      : [],
    citations: Array.isArray(row.citations)
      ? (row.citations as ModuleDetail["citations"])
      : [],
  };
}

function toSummary(module: ModuleDetail): ModuleSummary {
  return {
    id: module.id,
    slug: module.slug,
    title: module.title,
    kind: module.kind,
    summary: module.summary,
    description: module.description,
    estimatedMinutes: module.estimatedMinutes,
    tags: module.tags,
    publicationStatus: module.publicationStatus,
  };
}

export async function getCourseModules() {
  const admin = createAdminSupabaseClient();

  if (!admin) {
    return demoModules.map(toSummary);
  }

  const { data } = await admin
    .from("modules")
    .select("*")
    .eq("publication_status", "published")
    .order("release_order", { ascending: true });

  if (!data?.length) {
    return demoModules.map(toSummary);
  }

  return data.map((row) => mapModuleSummary(row));
}

export async function getModuleBySlug(slug: string) {
  const admin = createAdminSupabaseClient();

  if (!admin) {
    return demoModules.find((module) => module.slug === slug) ?? null;
  }

  const { data: module } = await admin
    .from("modules")
    .select("*")
    .eq("slug", slug)
    .eq("publication_status", "published")
    .maybeSingle();

  if (!module) {
    return demoModules.find((item) => item.slug === slug) ?? null;
  }

  const { data: sections } = await admin
    .from("module_sections")
    .select("*")
    .eq("module_id", module.id)
    .order("sort_order", { ascending: true });

  const summary = mapModuleSummary(module);

  return mapModuleDetail(summary, {
    ...module,
    sections:
      sections?.map((section) => ({
        id: String(section.id),
        slug: String(section.slug),
        title: String(section.title),
        summary: String(section.summary ?? ""),
        body: Array.isArray(section.body) ? (section.body as string[]) : [],
        equations: Array.isArray(section.equations)
          ? (section.equations as ModuleDetail["sections"][number]["equations"])
          : [],
        checkpoints: Array.isArray(section.checkpoints)
          ? (section.checkpoints as string[])
          : [],
        citations: Array.isArray(section.citations)
          ? (section.citations as ModuleDetail["sections"][number]["citations"])
          : [],
      })) ?? [],
    objectives: module.objectives,
    citations: module.citations,
  });
}

export async function getSymbolRegister() {
  const admin = createAdminSupabaseClient();

  if (!admin) {
    return demoSymbols;
  }

  const { data } = await admin.from("symbols").select("*").order("symbol");

  if (!data?.length) {
    return demoSymbols;
  }

  return data.map(
    (row): SymbolEntry => ({
      id: String(row.id),
      symbol: String(row.symbol),
      spokenName: String(row.spoken_name ?? ""),
      definition: String(row.definition ?? ""),
      context: String(row.context_note ?? ""),
      status:
        row.status === "not_found_in_material"
          ? "not_found_in_material"
          : "verified",
      citations: Array.isArray(row.citations)
        ? (row.citations as SymbolEntry["citations"])
        : [],
    }),
  );
}

export async function getQuizItems(moduleSlug: string) {
  const admin = createAdminSupabaseClient();

  if (!admin) {
    return moduleSlug === "lecture-2" ? demoQuizItems : [];
  }

  const { data: module } = await admin
    .from("modules")
    .select("id")
    .eq("slug", moduleSlug)
    .maybeSingle();

  if (!module) {
    return moduleSlug === "lecture-2" ? demoQuizItems : [];
  }

  const { data } = await admin
    .from("quiz_items")
    .select("*")
    .eq("module_id", module.id)
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (!data?.length) {
    return moduleSlug === "lecture-2" ? demoQuizItems : [];
  }

  return data.map(
    (row): QuizItem => ({
      id: String(row.id),
      prompt: String(row.prompt),
      choices: Array.isArray(row.choices) ? (row.choices as string[]) : [],
      correctIndex: Number(row.correct_index ?? 0),
      explanation: String(row.explanation ?? ""),
      tags: Array.isArray(row.tags) ? (row.tags as string[]) : [],
      citations: Array.isArray(row.citations)
        ? (row.citations as QuizItem["citations"])
        : [],
    }),
  );
}

export async function getPracticeProblemBySlug(slug: string) {
  const admin = createAdminSupabaseClient();

  if (!admin) {
    return slug === demoPracticeProblem.slug ? demoPracticeProblem : null;
  }

  const { data } = await admin
    .from("problems")
    .select("*, problem_steps(*)")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (!data) {
    return slug === demoPracticeProblem.slug ? demoPracticeProblem : null;
  }

  const steps = Array.isArray(data.problem_steps) ? data.problem_steps : [];
  type ProblemStepRow = {
    step_kind: string;
    step_order: number;
    content_markdown: string;
  };
  const typedSteps = steps as ProblemStepRow[];

  const grouped = {
    hints: typedSteps
      .filter((step) => step.step_kind === "hint")
      .sort((left, right) => left.step_order - right.step_order)
      .map((step) => String(step.content_markdown)),
    nextSteps: typedSteps
      .filter((step) => step.step_kind === "next_step")
      .sort((left, right) => left.step_order - right.step_order)
      .map((step) => String(step.content_markdown)),
    solutionOutline: typedSteps
      .filter((step) => step.step_kind === "full_solution")
      .sort((left, right) => left.step_order - right.step_order)
      .map((step) => String(step.content_markdown)),
  };

  return {
    id: String(data.id),
    slug: String(data.slug),
    title: String(data.title),
    moduleSlug: String(data.module_slug ?? "lecture-2"),
    prompt: Array.isArray(data.prompt_lines)
      ? (data.prompt_lines as string[])
      : [String(data.prompt_markdown ?? "")],
    equations: Array.isArray(data.equations) ? (data.equations as string[]) : [],
    hints: grouped.hints,
    nextSteps: grouped.nextSteps,
    solutionOutline: grouped.solutionOutline,
    citations: Array.isArray(data.citations)
      ? (data.citations as PracticeProblem["citations"])
      : [],
  } satisfies PracticeProblem;
}

export async function getTutorSources(moduleSlug: string) {
  const admin = createAdminSupabaseClient();

  if (!admin) {
    return demoTutorSources.filter((entry) => entry.moduleSlug === moduleSlug);
  }

  const { data: module } = await admin
    .from("modules")
    .select("id")
    .eq("slug", moduleSlug)
    .maybeSingle();

  if (!module) {
    return demoTutorSources.filter((entry) => entry.moduleSlug === moduleSlug);
  }

  const { data: sections } = await admin
    .from("module_sections")
    .select("*")
    .eq("module_id", module.id);

  const sectionSources =
    sections?.map(
      (section): TutorSource => ({
        id: String(section.id),
        moduleSlug,
        title: String(section.title),
        text: [
          String(section.summary ?? ""),
          ...(Array.isArray(section.body) ? (section.body as string[]) : []),
        ]
          .join(" ")
          .trim(),
        citations: Array.isArray(section.citations)
          ? (section.citations as TutorSource["citations"])
          : [],
        tags: Array.isArray(section.tags) ? (section.tags as string[]) : [],
      }),
    ) ?? [];

  return sectionSources.length
    ? sectionSources
    : demoTutorSources.filter((entry) => entry.moduleSlug === moduleSlug);
}

export async function getProgressSnapshots(userId?: string) {
  const admin = createAdminSupabaseClient();

  if (!admin || !userId) {
    return demoProgress;
  }

  const { data } = await admin
    .from("user_module_progress")
    .select("*")
    .eq("user_id", userId);

  if (!data?.length) {
    return demoProgress;
  }

  return data.map(
    (row): ProgressSnapshot => ({
      moduleSlug: String(row.module_slug),
      status:
        row.status === "completed"
          ? "completed"
          : row.status === "in_progress"
            ? "in_progress"
            : "not_started",
      completedSections: Array.isArray(row.completed_sections)
        ? (row.completed_sections as string[])
        : [],
      bestQuizScore: Number(row.best_quiz_score ?? 0),
      weakTags: Array.isArray(row.weak_tags) ? (row.weak_tags as string[]) : [],
    }),
  );
}
