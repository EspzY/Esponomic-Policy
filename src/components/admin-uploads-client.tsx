"use client";

import { useState } from "react";

type UploadResponse = {
  document?: {
    id: string;
    title: string;
    preview: string;
    candidateSymbols?: string[];
  };
  error?: string;
};

export function AdminUploadsClient() {
  const [uploadResult, setUploadResult] = useState<UploadResponse | null>(null);
  const [processResult, setProcessResult] = useState<UploadResponse | null>(null);

  async function upload(formData: FormData) {
    const response = await fetch("/api/admin/upload-document", {
      method: "POST",
      body: formData,
    });

    setUploadResult((await response.json()) as UploadResponse);
  }

  async function processDocument(formData: FormData) {
    const response = await fetch("/api/admin/process-document", {
      method: "POST",
      body: formData,
    });

    setProcessResult((await response.json()) as UploadResponse);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form action={upload} className="surface-card rounded-[2rem] p-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rust)]">
          Step 1
        </p>
        <h2 className="text-2xl font-semibold">Upload a private PDF</h2>
        <div className="mt-4 space-y-3">
          <input
            name="title"
            placeholder="Lecture 3 complementary notes"
            className="w-full rounded-[1.5rem] border border-[var(--color-line)] bg-white px-4 py-3"
          />
          <input
            name="moduleSlug"
            placeholder="lecture-3"
            className="w-full rounded-[1.5rem] border border-[var(--color-line)] bg-white px-4 py-3"
          />
          <select
            name="sourceType"
            className="w-full rounded-[1.5rem] border border-[var(--color-line)] bg-white px-4 py-3"
            defaultValue="lecture"
          >
            <option value="lecture">Lecture</option>
            <option value="complementary_lecture">Complementary lecture</option>
            <option value="derivation_note">Derivation note</option>
            <option value="problem_set">Problem set</option>
            <option value="exam">Exam</option>
            <option value="solution">Solution</option>
          </select>
          <input name="file" type="file" accept="application/pdf" />
        </div>
        <button className="mt-4 rounded-full bg-[var(--color-ink)] px-4 py-2 text-sm font-semibold text-white">
          Upload document
        </button>
        {uploadResult?.document ? (
          <div className="mt-4 rounded-[1.5rem] border border-[var(--color-line)] bg-white p-4 text-sm">
            <p className="font-medium text-[var(--color-ink)]">
              Uploaded: {uploadResult.document.title}
            </p>
            <p className="mt-2 text-[var(--color-slate)]">
              {uploadResult.document.preview}
            </p>
          </div>
        ) : null}
        {uploadResult?.error ? (
          <p className="mt-3 text-sm text-[var(--color-rust)]">{uploadResult.error}</p>
        ) : null}
      </form>

      <form action={processDocument} className="surface-card rounded-[2rem] p-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-teal)]">
          Step 2
        </p>
        <h2 className="text-2xl font-semibold">Process uploaded document</h2>
        <input
          name="documentId"
          placeholder="Paste the uploaded document id"
          className="mt-4 w-full rounded-[1.5rem] border border-[var(--color-line)] bg-white px-4 py-3"
        />
        <button className="mt-4 rounded-full bg-[var(--color-teal)] px-4 py-2 text-sm font-semibold text-white">
          Extract chunks and symbol candidates
        </button>
        {processResult?.document ? (
          <div className="mt-4 rounded-[1.5rem] border border-[var(--color-line)] bg-white p-4 text-sm text-[var(--color-slate)]">
            <p className="font-medium text-[var(--color-ink)]">
              Processed: {processResult.document.title}
            </p>
            <p className="mt-2">{processResult.document.preview}</p>
            {processResult.document.candidateSymbols?.length ? (
              <p className="mt-2">
                Candidate symbols:{" "}
                {processResult.document.candidateSymbols.slice(0, 12).join(", ")}
              </p>
            ) : null}
          </div>
        ) : null}
        {processResult?.error ? (
          <p className="mt-3 text-sm text-[var(--color-rust)]">{processResult.error}</p>
        ) : null}
      </form>
    </div>
  );
}
