import {
  demoModules,
  demoPracticeProblem,
  demoQuizItems,
  demoSymbols,
} from "@/lib/demo-content";
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
        release_order: courseModule.slug === "symbols" ? 1 : 2,
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

  if (courseModule.kind === "symbol_register") {
    await admin.from("symbols").delete().eq("module_slug", courseModule.slug);
    await admin.from("symbols").insert(
      demoSymbols.map((symbol) => ({
        symbol: symbol.symbol,
        spoken_name: symbol.spokenName,
        definition: symbol.definition,
        context_note: symbol.context,
        status: symbol.status,
        module_slug: courseModule.slug,
        citations: symbol.citations,
      })),
    );
  }

  if (courseModule.kind === "lecture") {
    await admin.from("module_sections").delete().eq("module_id", moduleRow.id);
    await admin.from("module_sections").insert(
      courseModule.sections.map((section, index) => ({
        module_id: moduleRow.id,
        slug: section.slug,
        title: section.title,
        summary: section.summary,
        body: section.body,
        equations: section.equations ?? [],
        checkpoints: section.checkpoints ?? [],
        citations: section.citations,
        sort_order: index + 1,
      })),
    );

    await admin.from("quiz_items").delete().eq("module_id", moduleRow.id);
    await admin.from("quiz_items").insert(
      demoQuizItems.map((item, index) => ({
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

    await admin.from("problems").delete().eq("slug", demoPracticeProblem.slug);
    const { data: problemRow } = await admin
      .from("problems")
      .insert({
        module_slug: courseModule.slug,
        slug: demoPracticeProblem.slug,
        title: demoPracticeProblem.title,
        prompt_lines: demoPracticeProblem.prompt,
        equations: demoPracticeProblem.equations,
        citations: demoPracticeProblem.citations,
        is_published: true,
      })
      .select("id")
      .single();

    if (problemRow) {
      await admin.from("problem_steps").delete().eq("problem_id", problemRow.id);
      await admin.from("problem_steps").insert([
        ...demoPracticeProblem.hints.map((hint, index) => ({
          problem_id: problemRow.id,
          step_kind: "hint",
          title: `Hint ${index + 1}`,
          content_markdown: hint,
          step_order: index + 1,
        })),
        ...demoPracticeProblem.nextSteps.map((step, index) => ({
          problem_id: problemRow.id,
          step_kind: "next_step",
          title: `Next step ${index + 1}`,
          content_markdown: step,
          step_order: index + 1,
        })),
        ...demoPracticeProblem.solutionOutline.map((step, index) => ({
          problem_id: problemRow.id,
          step_kind: "full_solution",
          title: `Solution step ${index + 1}`,
          content_markdown: step,
          step_order: index + 1,
        })),
      ]);
    }
  }

  return {
    simulated: false,
    message: `${courseModule.title} was published to the database.`,
  };
}
