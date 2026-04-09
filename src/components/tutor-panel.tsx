"use client";

import { useState } from "react";

import { TutorResponse } from "@/components/tutor-response";
import { buttonClasses } from "@/components/ui/button";
import type { TutorResult } from "@/lib/types";

export function TutorPanel({
  moduleSlug,
}: {
  moduleSlug: string;
}) {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<TutorResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function submitQuestion() {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/qa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          moduleSlug,
          question,
          mode: "qa",
        }),
      });

      const payload = (await response.json()) as TutorResult;

      if (!response.ok) {
        setResult({
          answerMarkdown: "",
          confidenceLabel: "insufficient_evidence",
          citations: [],
          sourceSnippets: [],
          error: payload.error ?? "The tutor request failed.",
        });
        return;
      }

      setResult(payload);
    } catch {
      setResult({
        answerMarkdown: "",
        confidenceLabel: "insufficient_evidence",
        citations: [],
        sourceSnippets: [],
        error: "The tutor request failed. Try again after the current page is fully loaded.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="surface-card rounded-[2rem] p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-teal)]">
            Source-based Q&A
          </p>
          <h2 className="text-2xl font-semibold">Ask the module tutor</h2>
        </div>
        <span className="rounded-full bg-[rgba(15,118,110,0.12)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-teal)]">
          No guessing
        </span>
      </div>
      <p className="mb-4 text-sm leading-7 text-[var(--color-slate)]">
        Answers should stay grounded in indexed lecture material. If the evidence is too thin, the assistant should say so instead of improvising.
      </p>
      <textarea
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        placeholder="Example: Why does expected future marginal cost matter for inflation today?"
        className="min-h-32 w-full rounded-[1.5rem] border border-[var(--color-line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--color-teal)]"
      />
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-slate)]">
          Powered by retrieved course evidence
        </p>
        <button
          onClick={submitQuestion}
          disabled={!question.trim() || loading}
          className={buttonClasses("primary", "sm")}
        >
          {loading ? "Thinking..." : "Ask tutor"}
        </button>
      </div>
      {result ? (
        <div className="mt-6 rounded-[1.5rem] border border-[var(--color-line)] bg-white p-5">
          <TutorResponse result={result} />
        </div>
      ) : null}
    </section>
  );
}
