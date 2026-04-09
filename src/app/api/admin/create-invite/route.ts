import { NextResponse } from "next/server";

import { createInviteToken, getViewer, hashInviteToken } from "@/lib/auth";
import { getAppUrl } from "@/lib/site-url";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const viewer = await getViewer();

  if (!viewer || viewer.role !== "admin") {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  const formData = await request.formData();
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const cohort = String(formData.get("cohort") ?? "").trim();
  const expiresAt = String(formData.get("expiresAt") ?? "").trim();

  if (!email || !fullName || !cohort || !expiresAt) {
    return NextResponse.json(
      { error: "Full name, email, cohort, and expiry date are required." },
      { status: 400 },
    );
  }

  const token = createInviteToken();
  const inviteUrl = `${getAppUrl(request)}/invite/${token}`;

  if (viewer.demoMode) {
    return NextResponse.json({
      invite: {
        inviteUrl,
        email,
      },
    });
  }

  const admin = createAdminSupabaseClient();

  const { error } = await admin!.from("invites").insert({
    email,
    full_name: fullName,
    cohort,
    expires_at: new Date(expiresAt).toISOString(),
    token_hash: hashInviteToken(token),
    status: "pending",
    created_by: viewer.id,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({
    invite: {
      inviteUrl,
      email,
    },
  });
}
