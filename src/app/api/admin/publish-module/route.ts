import { NextResponse } from "next/server";

import { getViewer } from "@/lib/auth";
import { publishDemoModule } from "@/lib/publish";

export async function POST(request: Request) {
  const viewer = await getViewer();

  if (!viewer || viewer.role !== "admin") {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  const body = (await request.json()) as { moduleSlug?: string };

  if (!body.moduleSlug) {
    return NextResponse.json({ error: "moduleSlug is required." }, { status: 400 });
  }

  try {
    const result = await publishDemoModule(body.moduleSlug);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Publishing failed.",
      },
      { status: 400 },
    );
  }
}
