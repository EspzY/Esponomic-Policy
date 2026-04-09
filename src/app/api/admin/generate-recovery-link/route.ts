import { NextResponse } from "next/server";

import { getViewer } from "@/lib/auth";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const viewer = await getViewer();

  if (!viewer || viewer.role !== "admin") {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  if (viewer.demoMode) {
    return NextResponse.json({
      recoveryUrl: `https://example.com/recovery?email=${encodeURIComponent(email)}`,
    });
  }

  const admin = createAdminSupabaseClient();
  const { data, error } = await admin!.auth.admin.generateLink({
    type: "recovery",
    email,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({
    recoveryUrl: data.properties.action_link,
  });
}
