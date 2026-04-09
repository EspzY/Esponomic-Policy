import { NextResponse } from "next/server";

import { embedText } from "@/lib/ai";
import { getViewer } from "@/lib/auth";
import { extractPdfDocument } from "@/lib/pdf";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const viewer = await getViewer();

  if (!viewer || viewer.role !== "admin") {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  const formData = await request.formData();
  const documentId = String(formData.get("documentId") ?? "").trim();

  if (!documentId) {
    return NextResponse.json({ error: "documentId is required." }, { status: 400 });
  }

  if (viewer.demoMode) {
    return NextResponse.json({
      document: {
        id: documentId,
        title: "Demo processed document",
        preview: "Demo mode does not persist extracted chunks.",
        candidateSymbols: ["π_t", "ỹ_t", "r_t^n"],
      },
    });
  }

  const admin = createAdminSupabaseClient();
  const { data: document, error: docError } = await admin!
    .from("source_documents")
    .select("*")
    .eq("id", documentId)
    .single();

  if (docError || !document) {
    return NextResponse.json({ error: docError?.message ?? "Document not found." }, { status: 404 });
  }

  const downloadResult = await admin!
    .storage.from(document.storage_bucket)
    .download(document.storage_path);

  if (downloadResult.error) {
    return NextResponse.json({ error: downloadResult.error.message }, { status: 400 });
  }

  const buffer = Buffer.from(await downloadResult.data.arrayBuffer());
  const extracted = await extractPdfDocument(buffer);

  await admin!.from("document_chunks").delete().eq("document_id", documentId);

  const chunkRows = await Promise.all(
    extracted.chunks.map(async (chunk) => ({
      document_id: documentId,
      chunk_index: chunk.chunkIndex,
      page_from: chunk.pageFrom,
      page_to: chunk.pageTo,
      content: chunk.content,
      embedding_json: (await embedText(chunk.content)) ?? null,
    })),
  );

  if (chunkRows.length) {
    await admin!.from("document_chunks").insert(chunkRows);
  }

  await admin!.from("source_documents").update({
    page_count: extracted.pageCount,
    extraction_status: "processed",
    extracted_at: new Date().toISOString(),
    preview_text: extracted.preview,
    metadata: {
      ...(document.metadata ?? {}),
      candidateSymbols: extracted.candidateSymbols,
    },
  }).eq("id", documentId);

  return NextResponse.json({
    document: {
      id: documentId,
      title: document.title,
      preview: extracted.preview,
      candidateSymbols: extracted.candidateSymbols,
    },
  });
}
