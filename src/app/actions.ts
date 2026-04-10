"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireViewer } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/env";
import { saveSectionProgress } from "@/lib/progress";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

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

export async function registerAction(formData: FormData) {
  if (!isSupabaseConfigured()) {
    redirect("/dashboard");
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();
  const nickname = String(formData.get("nickname") ?? "").trim();

  if (!email || !password || !nickname) {
    redirect("/register?error=Please+fill+in+email%2C+password%2C+and+nickname.");
  }

  if (password.length < 8) {
    redirect("/register?error=Password+must+be+at+least+8+characters.");
  }

  const supabase = await createServerSupabaseClient();
  const admin = createAdminSupabaseClient();

  const { data, error } = await supabase!.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: nickname,
        display_name: nickname,
      },
    },
  });

  if (error) {
    redirect(`/register?error=${encodeURIComponent(error.message)}`);
  }

  if (data.user?.id && admin) {
    await admin.from("profiles").upsert({
      id: data.user.id,
      email,
      full_name: nickname,
      cohort: null,
      role: "student",
    });
  }

  revalidatePath("/", "layout");
  revalidatePath("/register");

  if (data.session) {
    redirect("/dashboard");
  }

  redirect("/?registered=1");
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
