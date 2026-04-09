import { NextResponse } from "next/server";

import { hashInviteToken } from "@/lib/auth";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/env";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    token?: string;
    password?: string;
  };

  if (!body.token || !body.password || body.password.length < 8) {
    return NextResponse.json(
      { error: "A valid token and a password with at least 8 characters are required." },
      { status: 400 },
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      message: "Demo mode: account creation is simulated.",
    });
  }

  const admin = createAdminSupabaseClient();
  if (!admin) {
    return NextResponse.json(
      { error: "Supabase is not configured." },
      { status: 500 },
    );
  }
  const tokenHash = hashInviteToken(body.token);

  const { data: invite } = await admin
    .from("invites")
    .select("*")
    .eq("token_hash", tokenHash)
    .maybeSingle();

  if (
    !invite ||
    invite.status !== "pending" ||
    (invite.expires_at && new Date(invite.expires_at).getTime() < Date.now())
  ) {
    return NextResponse.json(
      { error: "This invite is invalid, expired, or already used." },
      { status: 400 },
    );
  }

  const { data: userResponse, error: createError } =
    await admin.auth.admin.createUser({
      email: invite.email,
      password: body.password,
      email_confirm: true,
      user_metadata: {
        full_name: invite.full_name,
      },
    });

  if (createError || !userResponse.user) {
    return NextResponse.json(
      { error: createError?.message ?? "Failed to create the account." },
      { status: 400 },
    );
  }

  await admin.from("profiles").upsert({
    id: userResponse.user.id,
    email: invite.email,
    full_name: invite.full_name,
    cohort: invite.cohort,
    role: "student",
  });

  await admin.from("invites").update({
    status: "accepted",
    accepted_at: new Date().toISOString(),
    accepted_by: userResponse.user.id,
  }).eq("id", invite.id);

  return NextResponse.json({
    message: "Account created successfully. Please sign in on the landing page.",
  });
}
