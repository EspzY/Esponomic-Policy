import {
  demoModules,
  demoNotation,
  getLocalPracticeProblemForModule,
  getLocalQuizItems,
} from "@/lib/course-content";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export async function publishDemoModule(moduleSlug: string) {
  const admin = createAdminSupabaseClient();

  if (!admin) {
    return {
      simulated: true,
      message: `Demo mode: ${moduleSlug} would have been published to Supabase.`,
    };
  }

  const courseModule = demoModules.find((item) => item.slug === moduleSlug);

  if (!courseModule) {
    throw new Error("Unknown module slug.");
  }

  const { data: moduleRow, error: moduleError } = await admin
    .from("modules")
    .upsert(
      {
        slug: courseModule.slug,
        title: courseModule.title,
        kind: courseModule.kind,
        summary: courseModule.summary,
        description: courseModule.description,
        estimated_minutes: courseModule.estimatedMinutes,
        tags: courseModule.tags,
        objectives: courseModule.objectives,
        citations: courseModule.citations,
        publication_status: "published",
        release_order: demoModules.findIndex((item) => item.slug === courseModule.slug) + 1,
      },
      {
        onConflict: "slug",
      },
    )
    .select("id")
    .single();

  if (moduleError || !moduleRow) {
    throw new Error(moduleError?.message ?? "Failed to upsert module.");
  }

  await admin.from("notation_entries").upsert(
    demoNotation
      .filter((entry) => entry.moduleSlug === null || entry.moduleSlug === moduleSlug)
      .map((entry) => ({
      id: entry.id,
      module_slug: entry.moduleSlug,
      kind: entry.kind,
      display_latex: entry.displayLatex,
      spoken_name: entry.spokenName,
      plain_meaning: entry.plainMeaning,
      why_it_matters: entry.whyItMatters,
      where_it_appears: entry.whereItAppears,
      common_confusions: entry.commonConfusions,
      related_terms: entry.relatedTerms,
      status: entry.status,
      citations: entry.citations,
      })),
    {
      onConflict: "id",
    },
  );

  await admin.from("module_sections").delete().eq("module_id", moduleRow.id);
  await admin.from("module_sections").insert(
    courseModule.sections.map((section, index) => ({
      module_id: moduleRow.id,
      slug: section.slug,
      title: section.title,
      summary: section.summary,
      body: section.body ?? [],
      equations: section.equations ?? [],
      checkpoints: section.checkpoints ?? [],
      content_blocks: section.contentBlocks,
      citations: section.citations,
      sort_order: index + 1,
    })),
  );

  if (courseModule.kind === "lecture") {
    const quizItems = getLocalQuizItems(courseModule.slug);
    const practiceProblem = getLocalPracticeProblemForModule(courseModule.slug);

    await admin.from("quiz_items").delete().eq("module_id", moduleRow.id);
    await admin.from("quiz_items").insert(
      quizItems.map((item, index) => ({
        module_id: moduleRow.id,
        prompt: item.prompt,
        choices: item.choices,
        correct_index: item.correctIndex,
        explanation: item.explanation,
        tags: item.tags,
        citations: item.citations,
        sort_order: index + 1,
        is_published: true,
      })),
    );

    if (practiceProblem) {
      await admin.from("problems").delete().eq("slug", practiceProblem.slug);
      const { data: problemRow } = await admin
        .from("problems")
        .insert({
          module_slug: courseModule.slug,
          slug: practiceProblem.slug,
          title: practiceProblem.title,
          prompt_lines: practiceProblem.prompt,
          equations: [],
          supporting_equations: practiceProblem.supportingEquations,
          citations: practiceProblem.citations,
          is_published: true,
        })
        .select("id")
        .single();

      if (problemRow) {
        await admin.from("problem_steps").delete().eq("problem_id", problemRow.id);
        await admin.from("problem_steps").insert([
          ...practiceProblem.hints.map((hint, index) => ({
            problem_id: problemRow.id,
            step_kind: "hint",
            title: `Hint ${index + 1}`,
            content_markdown: hint,
            step_order: index + 1,
          })),
          ...practiceProblem.nextSteps.map((step, index) => ({
            problem_id: problemRow.id,
            step_kind: "next_step",
            title: `Next step ${index + 1}`,
            content_markdown: step,
            step_order: index + 1,
          })),
          ...practiceProblem.solutionOutline.map((step, index) => ({
            problem_id: problemRow.id,
            step_kind: "full_solution",
            title: `Solution step ${index + 1}`,
            content_markdown: step,
            step_order: index + 1,
          })),
        ]);
      }
    }
  }

  return {
    simulated: false,
    message: `${courseModule.title} was published to the database.`,
  };
}
