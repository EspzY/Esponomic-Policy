import { getModuleBySlug } from "@/lib/repository";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

function unique(values: string[]) {
  return [...new Set(values)];
}

export async function saveSectionProgress(
  userId: string,
  moduleSlug: string,
  sectionSlug: string,
) {
  const admin = createAdminSupabaseClient();

  if (!admin) {
    return;
  }

  const courseModule = await getModuleBySlug(moduleSlug);

  if (!courseModule) {
    return;
  }

  const { data: existing } = await admin
    .from("user_module_progress")
    .select("*")
    .eq("user_id", userId)
    .eq("module_slug", moduleSlug)
    .maybeSingle();

  const completedSections = unique([
    ...(Array.isArray(existing?.completed_sections)
      ? (existing.completed_sections as string[])
      : []),
    sectionSlug,
  ]);

  const allSectionsCompleted =
    courseModule.sections.length > 0 &&
    courseModule.sections.every((section) => completedSections.includes(section.slug));

  const bestQuizScore = Number(existing?.best_quiz_score ?? 0);
  const status =
    allSectionsCompleted && bestQuizScore >= 70 ? "completed" : "in_progress";
  const payload = {
    user_id: userId,
    module_slug: moduleSlug,
    status,
    completed_sections: completedSections,
    best_quiz_score: bestQuizScore,
    weak_tags: Array.isArray(existing?.weak_tags) ? existing.weak_tags : [],
    last_activity_at: new Date().toISOString(),
  };

  const result = existing?.id
    ? await admin
        .from("user_module_progress")
        .update(payload)
        .eq("id", existing.id)
    : await admin.from("user_module_progress").insert(payload);

  if (result.error) {
    throw result.error;
  }
}

export async function saveQuizProgress(params: {
  userId: string;
  moduleSlug: string;
  answers: number[];
  scorePct: number;
  weakTags: string[];
}) {
  const admin = createAdminSupabaseClient();

  if (!admin) {
    return;
  }

  const courseModule = await getModuleBySlug(params.moduleSlug);

  await admin.from("quiz_attempts").insert({
    user_id: params.userId,
    module_slug: params.moduleSlug,
    answers: params.answers,
    score_pct: params.scorePct,
    weak_tags: params.weakTags,
  });

  const { data: existing } = await admin
    .from("user_module_progress")
    .select("*")
    .eq("user_id", params.userId)
    .eq("module_slug", params.moduleSlug)
    .maybeSingle();

  const completedSections = Array.isArray(existing?.completed_sections)
    ? (existing.completed_sections as string[])
    : [];
  const bestQuizScore = Math.max(Number(existing?.best_quiz_score ?? 0), params.scorePct);
  const allSectionsCompleted =
    Boolean(courseModule?.sections.length) &&
    courseModule?.sections.every((section) => completedSections.includes(section.slug));

  const status =
    bestQuizScore >= 70 && allSectionsCompleted ? "completed" : "in_progress";
  const payload = {
    user_id: params.userId,
    module_slug: params.moduleSlug,
    status,
    completed_sections: completedSections,
    best_quiz_score: bestQuizScore,
    weak_tags: params.weakTags,
    last_activity_at: new Date().toISOString(),
  };

  const result = existing?.id
    ? await admin
        .from("user_module_progress")
        .update(payload)
        .eq("id", existing.id)
    : await admin.from("user_module_progress").insert(payload);

  if (result.error) {
    throw result.error;
  }
}

export async function enforceAiQuota(params: {
  userId: string;
  usageKind: "qa" | "solution_check" | "full_solution";
  limit: number;
}) {
  const admin = createAdminSupabaseClient();

  if (!admin) {
    return { allowed: true, used: 0 };
  }

  const dayStart = new Date();
  dayStart.setHours(0, 0, 0, 0);

  const { count } = await admin
    .from("ai_usage_events")
    .select("*", { count: "exact", head: true })
    .eq("user_id", params.userId)
    .eq("usage_kind", params.usageKind)
    .gte("created_at", dayStart.toISOString());

  const used = count ?? 0;

  return {
    allowed: used < params.limit,
    used,
  };
}

export async function recordAiUsage(
  userId: string,
  usageKind: "qa" | "solution_check" | "full_solution",
) {
  const admin = createAdminSupabaseClient();

  if (!admin) {
    return;
  }

  await admin.from("ai_usage_events").insert({
    user_id: userId,
    usage_kind: usageKind,
  });
}
