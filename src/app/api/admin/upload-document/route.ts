import { NextResponse } from "next/server";

import { getViewer } from "@/lib/auth";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { buildStoragePath, extractPdfDocument } from "@/lib/pdf";

export async function POST(request: Request) {
  const viewer = await getViewer();

  if (!viewer || viewer.role !== "admin") {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  const formData = await request.formData();
  const title = String(formData.get("title") ?? "").trim();
  const moduleSlug = String(formData.get("moduleSlug") ?? "").trim();
  const sourceType = String(formData.get("sourceType") ?? "lecture").trim();
  const file = formData.get("file");

  if (!(file instanceof File) || !title) {
    return NextResponse.json(
      { error: "A PDF file and title are required." },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const extracted = await extractPdfDocument(buffer);

  if (viewer.demoMode) {
    return NextResponse.json({
      document: {
        id: "demo-document",
        title,
        preview: extracted.preview,
        candidateSymbols: extracted.candidateSymbols,
      },
    });
  }

  const admin = createAdminSupabaseClient();
  const bucket = "course-documents";
  const path = buildStoragePath(moduleSlug, file.name);

  const uploadResult = await admin!.storage.from(bucket).upload(path, buffer, {
    contentType: file.type || "application/pdf",
    upsert: false,
  });

  if (uploadResult.error) {
    return NextResponse.json({ error: uploadResult.error.message }, { status: 400 });
  }

  const { data: document, error } = await admin!
    .from("source_documents")
    .insert({
      title,
      module_slug: moduleSlug || null,
      source_type: sourceType,
      storage_bucket: bucket,
      storage_path: path,
      mime_type: file.type || "application/pdf",
      extraction_status: "uploaded",
      is_authoritative: true,
      preview_text: extracted.preview,
      metadata: {
        candidateSymbols: extracted.candidateSymbols,
      },
      uploaded_by: viewer.id,
    })
    .select("id, title")
    .single();

  if (error || !document) {
    return NextResponse.json({ error: error?.message ?? "Document write failed." }, { status: 400 });
  }

  return NextResponse.json({
    document: {
      id: document.id,
      title: document.title,
      preview: extracted.preview,
      candidateSymbols: extracted.candidateSymbols,
    },
  });
}
