import { createHash, randomBytes } from "node:crypto";

import { redirect } from "next/navigation";

import { demoViewer } from "@/lib/demo-content";
import type { Viewer } from "@/lib/types";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";

export function createInviteToken() {
  return randomBytes(24).toString("hex");
}

export function hashInviteToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function getViewer(): Promise<Viewer | null> {
  if (!isSupabaseConfigured()) {
    return demoViewer;
  }

  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const admin = createAdminSupabaseClient();
  const profileResult = admin
    ? await admin.from("profiles").select("full_name, role").eq("id", user.id).maybeSingle()
    : null;

  return {
    id: user.id,
    email: user.email ?? "unknown@example.com",
    fullName:
      profileResult?.data?.full_name ??
      user.user_metadata.full_name ??
      user.email?.split("@")[0] ??
      "Student",
    role: profileResult?.data?.role ?? "student",
    demoMode: false,
  };
}

export async function requireViewer() {
  const viewer = await getViewer();

  if (!viewer) {
    redirect("/");
  }

  return viewer;
}

export async function requireAdminViewer() {
  const viewer = await requireViewer();

  if (viewer.role !== "admin") {
    redirect("/dashboard");
  }

  return viewer;
}
