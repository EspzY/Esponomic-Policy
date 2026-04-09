"use client";

import { useState } from "react";

import type { Citation } from "@/lib/types";

type TutorResponse = {
  answer: string;
  confidenceLabel: string;
  citations: Citation[];
  error?: string;
};

export function TutorPanel({
  moduleSlug,
}: {
  moduleSlug: string;
}) {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<TutorResponse | null>(null);
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

      const payload = (await response.json()) as TutorResponse;
      setResult(payload);
    } catch {
      setResult({
        answer: "",
        confidenceLabel: "insufficient_evidence",
        citations: [],
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
          className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-teal)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Ask tutor"}
        </button>
      </div>
      {result ? (
        <div className="mt-6 rounded-[1.5rem] border border-[var(--color-line)] bg-white p-5">
          {result.error ? (
            <p className="text-sm text-[var(--color-rust)]">{result.error}</p>
          ) : (
            <>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rust)]">
                Confidence: {result.confidenceLabel.replaceAll("_", " ")}
              </p>
              <div className="whitespace-pre-wrap text-sm leading-7 text-[var(--color-ink)]">
                {result.answer}
              </div>
              {result.citations.length ? (
                <ul className="mt-4 space-y-2 text-sm text-[var(--color-slate)]">
                  {result.citations.map((citation) => (
                    <li
                      key={`${citation.documentTitle}-${citation.page}-${citation.note}`}
                      className="rounded-2xl bg-[rgba(24,33,45,0.04)] px-3 py-2"
                    >
                      <span className="font-medium text-[var(--color-ink)]">
                        {citation.documentTitle}
                      </span>{" "}
                      {citation.page}
                      <div>{citation.note}</div>
                    </li>
                  ))}
                </ul>
              ) : null}
            </>
          )}
        </div>
      ) : null}
    </section>
  );
}
