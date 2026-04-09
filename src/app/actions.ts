"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireViewer } from "@/lib/auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import { saveSectionProgress } from "@/lib/progress";

export async function loginAction(formData: FormData) {
  if (!isSupabaseConfigured()) {
    redirect("/dashboard");
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();

  const supabase = await createServerSupabaseClient();

  const { error } = await supabase!.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(`/?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function logoutAction() {
  if (!isSupabaseConfigured()) {
    redirect("/");
  }

  const supabase = await createServerSupabaseClient();
  await supabase!.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

export async function markSectionCompleteAction(formData: FormData) {
  const viewer = await requireViewer();

  if (viewer.demoMode) {
    redirect(`/modules/${formData.get("moduleSlug")}`);
  }

  const moduleSlug = String(formData.get("moduleSlug") ?? "");
  const sectionSlug = String(formData.get("sectionSlug") ?? "");

  await saveSectionProgress(viewer.id, moduleSlug, sectionSlug);
  revalidatePath(`/modules/${moduleSlug}`);
  revalidatePath("/dashboard");
  redirect(`/modules/${moduleSlug}`);
}
