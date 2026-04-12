import {
  demoPracticeCollections,
  demoPracticeProblems,
  demoGlobalNotation,
  demoModules,
  demoProgress,
  demoNotation,
  getLocalPracticeProblemBySlug,
  getLocalPracticeProblemForModule,
  getLocalQuizItems,
} from "@/lib/course-content";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import type {
  ContentBlock,
  ModuleDetail,
  ModuleSection,
  ModuleSummary,
  NotationEntry,
  PracticeCollection,
  PracticeProblem,
  PracticeSupportEquation,
  ProgressSnapshot,
  QuizItem,
  TutorSource,
} from "@/lib/types";

const curatedModulesBySlug = new Map(demoModules.map((module) => [module.slug, module]));

function isArrayOfObjects(value: unknown): value is Record<string, unknown>[] {
  return Array.isArray(value) && value.every((item) => item !== null && typeof item === "object");
}

function stringArray(value: unknown) {
  return Array.isArray(value) ? value.map((item) => String(item)) : [];
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

function mapModuleSummary(row: Record<string, unknown>): ModuleSummary {
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    kind: row.kind === "symbol_register" ? "symbol_register" : "lecture",
    summary: String(row.summary ?? ""),
    description: String(row.description ?? ""),
    estimatedMinutes: Number(row.estimated_minutes ?? 0),
    tags: stringArray(row.tags),
    publicationStatus: row.publication_status === "draft" ? "draft" : "published",
  };
}

function legacyContentBlocks(row: Record<string, unknown>): ContentBlock[] {
  const blocks: ContentBlock[] = [];

  for (const paragraph of stringArray(row.body)) {
    blocks.push({
      type: "paragraph",
      markdown: paragraph,
    });
  }

  if (isArrayOfObjects(row.equations)) {
    for (const equation of row.equations) {
      blocks.push({
        type: "equation",
        label: String(equation.label ?? "Equation"),
        latex: String(equation.latex ?? equation.expression ?? ""),
        explanation: String(equation.explanation ?? ""),
      });
    }
  }

  const checkpoints = stringArray(row.checkpoints);

  if (checkpoints.length) {
    blocks.push({
      type: "checklist",
      title: "Legacy checkpoints",
      items: checkpoints,
    });
  }

  return blocks;
}

function mapModuleSection(row: Record<string, unknown>): ModuleSection {
  const contentBlocks = isArrayOfObjects(row.content_blocks)
    ? (row.content_blocks as ContentBlock[])
    : legacyContentBlocks(row);

  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    summary: String(row.summary ?? ""),
    contentBlocks,
    body: stringArray(row.body),
    equations: isArrayOfObjects(row.equations)
      ? (row.equations as ModuleSection["equations"])
      : [],
    checkpoints: stringArray(row.checkpoints),
    citations: isArrayOfObjects(row.citations)
      ? (row.citations as ModuleSection["citations"])
      : [],
  };
}

function filterLocalNotation(moduleSlug?: string | null) {
  if (moduleSlug === null) {
    return demoGlobalNotation;
  }

  if (moduleSlug) {
    return demoNotation.filter((entry) => entry.moduleSlug === moduleSlug);
  }

  return demoNotation;
}

function getLocalTutorSources(moduleSlug: string): TutorSource[] {
  const courseModule = curatedModulesBySlug.get(moduleSlug);

  if (!courseModule) {
    return [];
  }

  const notation = [...demoGlobalNotation, ...filterLocalNotation(moduleSlug)];
  const sectionSources = courseModule.sections.map(
    (section): TutorSource => ({
      id: `local-section-${moduleSlug}-${section.slug}`,
      moduleSlug,
      title: section.title,
      text: [section.summary, ...section.contentBlocks.map((block) => flattenBlockText(block))]
        .join(" ")
        .trim(),
      citations: section.citations,
      tags: [moduleSlug, section.slug],
    }),
  );

  const notationSources = notation.map(
    (entry): TutorSource => ({
      id: `local-notation-${entry.id}`,
      moduleSlug,
      title: `${entry.spokenName} notation`,
      text: [
        entry.displayLatex,
        entry.plainMeaning,
        entry.whyItMatters,
        ...entry.whereItAppears,
        ...entry.commonConfusions,
      ]
        .join(" ")
        .trim(),
      citations: entry.citations,
      tags: [String(entry.kind), entry.spokenName],
    }),
  );

  return [...sectionSources, ...notationSources];
}

function mapNotationEntry(row: Record<string, unknown>): NotationEntry {
  return {
    id: String(row.id),
    moduleSlug: row.module_slug ? String(row.module_slug) : null,
    kind:
      row.kind === "parameter" ||
      row.kind === "abbreviation" ||
      row.kind === "shock" ||
      row.kind === "operator"
        ? row.kind
        : "symbol",
    displayLatex: String(row.display_latex ?? ""),
    spokenName: String(row.spoken_name ?? ""),
    plainMeaning: String(row.plain_meaning ?? ""),
    whyItMatters: String(row.why_it_matters ?? ""),
    whereItAppears: stringArray(row.where_it_appears),
    commonConfusions: stringArray(row.common_confusions),
    relatedTerms: stringArray(row.related_terms),
    status: row.status === "not_found_in_material" ? "not_found_in_material" : "verified",
    citations: isArrayOfObjects(row.citations)
      ? (row.citations as NotationEntry["citations"])
      : [],
  };
}

function mapPracticeSupportEquations(row: Record<string, unknown>): PracticeSupportEquation[] {
  if (isArrayOfObjects(row.supporting_equations)) {
    return row.supporting_equations.map((equation, index) => ({
      id: String(equation.id ?? `support-${index + 1}`),
      label: String(equation.label ?? `Equation ${index + 1}`),
      latex: String(equation.latex ?? equation.expression ?? ""),
      explanation: String(equation.explanation ?? ""),
    }));
  }

  return stringArray(row.equations).map((equation, index) => ({
    id: `legacy-equation-${index + 1}`,
    label: `Equation ${index + 1}`,
    latex: equation,
    explanation: "Legacy seeded equation migrated into the math-first practice layout.",
  }));
}

function flattenBlockText(block: ContentBlock): string {
  if (block.type === "paragraph") {
    return block.markdown;
  }

  if (block.type === "equation") {
    return `${block.label}. ${block.explanation} Latex: ${block.latex}`;
  }

  if (block.type === "derivation_step") {
    return [
      block.title,
      block.learningGoal,
      block.operation,
      block.whyValid,
      block.explanation,
      block.latexBefore ?? "",
      block.latexAfter,
    ].join(" ");
  }

  if (block.type === "model_map") {
    return `${block.title} ${block.items
      .map((item) => `${item.label}: ${item.description}`)
      .join(" ")}`;
  }

  if (block.type === "shock_trace") {
    return `${block.title} ${block.shock} ${block.steps
      .map((step) => `${step.variable} ${step.direction}. ${step.explanation}`)
      .join(" ")}`;
  }

  if (block.type === "worked_example") {
    return `${block.title} ${block.prompt} ${block.steps
      .map((step) => `${step.title}. ${step.markdown}`)
      .join(" ")}`;
  }

  if (block.type === "figure") {
    return `${block.title}. ${block.caption}. ${block.note ?? ""}`;
  }

  if (block.type === "checklist") {
    return `${block.title ?? "Checklist"} ${block.items.join(" ")}`;
  }

  return `${block.title}. Trap: ${block.trap}. Fix: ${block.correction}`;
}

async function moduleHasRichContent(moduleSlug: string) {
  const admin = createAdminSupabaseClient();

  if (!admin) {
    return false;
  }

  const { data: moduleRow, error: moduleError } = await admin
    .from("modules")
    .select("id")
    .eq("slug", moduleSlug)
    .eq("publication_status", "published")
    .maybeSingle();

  if (moduleError || !moduleRow) {
    return false;
  }

  const { data: sections, error: sectionError } = await admin
    .from("module_sections")
    .select("content_blocks")
    .eq("module_id", moduleRow.id);

  if (sectionError || !sections?.length) {
    return false;
  }

  return sections.some(
    (section) => Array.isArray(section.content_blocks) && section.content_blocks.length > 0,
  );
}

export async function getCourseModules() {
  const admin = createAdminSupabaseClient();

  if (!admin) {
    return demoModules.map(toSummary);
  }

  const { data, error } = await admin
    .from("modules")
    .select("*")
    .eq("publication_status", "published")
    .order("release_order", { ascending: true });

  if (error || !data?.length) {
    return demoModules.map(toSummary);
  }

  const curatedSlugs = new Set(demoModules.map((module) => module.slug));
  const remoteExtras = data
    .filter((row) => !curatedSlugs.has(String(row.slug)))
    .map((row) => mapModuleSummary(row));

  return [...demoModules.map(toSummary), ...remoteExtras];
}

export async function getModuleBySlug(slug: string) {
  const curated = curatedModulesBySlug.get(slug) ?? null;
  const admin = createAdminSupabaseClient();

  if (!admin) {
    return curated;
  }

  const { data: moduleRow, error: moduleError } = await admin
    .from("modules")
    .select("*")
    .eq("slug", slug)
    .eq("publication_status", "published")
    .maybeSingle();

  if (moduleError || !moduleRow) {
    return curated;
  }

  const { data: sections, error: sectionError } = await admin
    .from("module_sections")
    .select("*")
    .eq("module_id", moduleRow.id)
    .order("sort_order", { ascending: true });

  const mappedSections = sectionError ? [] : (sections ?? []).map((section) => mapModuleSection(section));
  const hasRichBlocks = mappedSections.some((section) => section.contentBlocks.length > 0);

  if (curated && !hasRichBlocks) {
    return curated;
  }

  const summary = mapModuleSummary(moduleRow);

  return {
    ...summary,
    objectives: stringArray(moduleRow.objectives),
    sections: mappedSections,
    citations: isArrayOfObjects(moduleRow.citations)
      ? (moduleRow.citations as ModuleDetail["citations"])
      : [],
  } satisfies ModuleDetail;
}

export async function getNotationEntries(moduleSlug?: string | null) {
  const admin = createAdminSupabaseClient();

  if (!admin) {
    return filterLocalNotation(moduleSlug);
  }

  let query = admin.from("notation_entries").select("*").order("kind").order("spoken_name");

  if (moduleSlug === null) {
    query = query.is("module_slug", null);
  } else if (moduleSlug) {
    query = query.eq("module_slug", moduleSlug);
  }

  const { data, error } = await query;

  if (error || !data?.length) {
    return filterLocalNotation(moduleSlug);
  }

  return data.map((row) => mapNotationEntry(row));
}

export async function getQuizItems(moduleSlug: string) {
  const admin = createAdminSupabaseClient();

  if (!admin) {
    return getLocalQuizItems(moduleSlug);
  }

  const richModule = await moduleHasRichContent(moduleSlug);

  if (!richModule) {
    return getLocalQuizItems(moduleSlug);
  }

  const { data: moduleRow, error: moduleError } = await admin
    .from("modules")
    .select("id")
    .eq("slug", moduleSlug)
    .maybeSingle();

  if (moduleError || !moduleRow) {
    return getLocalQuizItems(moduleSlug);
  }

  const { data, error } = await admin
    .from("quiz_items")
    .select("*")
    .eq("module_id", moduleRow.id)
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    return getLocalQuizItems(moduleSlug);
  }

  return data.map(
    (row): QuizItem => ({
      id: String(row.id),
      prompt: String(row.prompt),
      choices: stringArray(row.choices),
      correctIndex: Number(row.correct_index ?? 0),
      explanation: String(row.explanation ?? ""),
      tags: stringArray(row.tags),
      citations: isArrayOfObjects(row.citations)
        ? (row.citations as QuizItem["citations"])
        : [],
    }),
  );
}

export async function getPracticeProblemBySlug(slug: string) {
  const admin = createAdminSupabaseClient();
  const localProblem = getLocalPracticeProblemBySlug(slug);

  if (!admin) {
    return localProblem;
  }

  const moduleSlug = localProblem?.moduleSlug;
  const richModule = moduleSlug ? await moduleHasRichContent(moduleSlug) : false;

  if (!richModule && localProblem) {
    return localProblem;
  }

  const { data, error } = await admin
    .from("problems")
    .select("*, problem_steps(*)")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error || !data) {
    return localProblem;
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

  const localSolutionOutline = localProblem?.solutionOutline ?? [];
  const mergedSolutionOutline = localSolutionOutline.length
    ? localSolutionOutline
    : grouped.solutionOutline;

  return {
    ...localProblem,
    id: String(data.id),
    slug: String(data.slug),
    title: String(data.title),
    moduleSlug: String(data.module_slug ?? localProblem?.moduleSlug ?? "lecture-2"),
    prompt: stringArray(data.prompt_lines),
    supportingEquations: mapPracticeSupportEquations(data),
    hints: grouped.hints,
    nextSteps: grouped.nextSteps,
    solutionOutline: mergedSolutionOutline,
    citations: isArrayOfObjects(data.citations)
      ? (data.citations as PracticeProblem["citations"])
      : [],
  } satisfies PracticeProblem;
}

export async function getPracticeProblemForModule(moduleSlug: string) {
  const localProblem = getLocalPracticeProblemForModule(moduleSlug);
  const admin = createAdminSupabaseClient();

  if (!admin) {
    return localProblem;
  }

  const richModule = await moduleHasRichContent(moduleSlug);

  if (!richModule) {
    return localProblem;
  }

  const { data, error } = await admin
    .from("problems")
    .select("slug")
    .eq("module_slug", moduleSlug)
    .eq("is_published", true)
    .limit(1)
    .maybeSingle();

  if (error || !data?.slug) {
    return localProblem;
  }

  return getPracticeProblemBySlug(String(data.slug));
}

export async function getPracticeProblems() {
  return demoPracticeProblems;
}

export async function getPracticeCollections(): Promise<PracticeCollection[]> {
  return demoPracticeCollections;
}

export async function getTutorSources(moduleSlug: string) {
  const admin = createAdminSupabaseClient();

  if (!admin) {
    return getLocalTutorSources(moduleSlug);
  }

  const richModule = await moduleHasRichContent(moduleSlug);

  if (!richModule) {
    return getLocalTutorSources(moduleSlug);
  }

  const { data: module, error: moduleError } = await admin
    .from("modules")
    .select("id")
    .eq("slug", moduleSlug)
    .maybeSingle();

  if (moduleError || !module) {
    return getLocalTutorSources(moduleSlug);
  }

  const [{ data: sections, error: sectionsError }, { data: notation, error: notationError }] =
    await Promise.all([
      admin.from("module_sections").select("*").eq("module_id", module.id),
      admin
        .from("notation_entries")
        .select("*")
        .or(`module_slug.eq.${moduleSlug},module_slug.is.null`),
    ]);

  const sectionSources =
    sectionsError || !sections
      ? []
      : sections.map(
          (section): TutorSource => ({
            id: String(section.id),
            moduleSlug,
            title: String(section.title),
            text: [
              String(section.summary ?? ""),
              ...mapModuleSection(section).contentBlocks.map((block) => flattenBlockText(block)),
            ]
              .join(" ")
              .trim(),
            citations: isArrayOfObjects(section.citations)
              ? (section.citations as TutorSource["citations"])
              : [],
            tags: [moduleSlug, String(section.slug)],
          }),
        );

  const notationSources =
    notationError || !notation
      ? []
      : notation.map(
          (entry): TutorSource => ({
            id: `notation-${entry.id}`,
            moduleSlug,
            title: `${String(entry.spoken_name ?? entry.id)} notation`,
            text: [
              String(entry.display_latex ?? ""),
              String(entry.plain_meaning ?? ""),
              String(entry.why_it_matters ?? ""),
              ...stringArray(entry.where_it_appears),
              ...stringArray(entry.common_confusions),
            ]
              .join(" ")
              .trim(),
            citations: isArrayOfObjects(entry.citations)
              ? (entry.citations as TutorSource["citations"])
              : [],
            tags: [String(entry.kind ?? "symbol"), String(entry.spoken_name ?? entry.id)],
          }),
        );

  const combined = [...sectionSources, ...notationSources];

  return combined.length ? combined : getLocalTutorSources(moduleSlug);
}

export async function getProgressSnapshots(userId?: string) {
  const admin = createAdminSupabaseClient();

  if (!admin || !userId) {
    return demoProgress;
  }

  const { data, error } = await admin
    .from("user_module_progress")
    .select("*")
    .eq("user_id", userId);

  if (error || !data?.length) {
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
      completedSections: stringArray(row.completed_sections),
      bestQuizScore: Number(row.best_quiz_score ?? 0),
      weakTags: stringArray(row.weak_tags),
    }),
  );
}

export function getLocalModuleNotation(moduleSlug: string) {
  return filterLocalNotation(moduleSlug);
}
