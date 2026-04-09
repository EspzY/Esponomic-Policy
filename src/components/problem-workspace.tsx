"use client";

import { useState } from "react";

import type { PracticeProblem } from "@/lib/types";

type TutorPayload = {
  answer: string;
  confidenceLabel: string;
  citations: {
    documentTitle: string;
    page: string;
    note: string;
  }[];
  error?: string;
};

export function ProblemWorkspace({ problem }: { problem: PracticeProblem }) {
  const [studentWork, setStudentWork] = useState("");
  const [result, setResult] = useState<TutorPayload | null>(null);
  const [loadingMode, setLoadingMode] = useState<string | null>(null);

  async function ask(mode: "hint" | "next_step" | "solution_check" | "full_solution") {
    setLoadingMode(mode);
    setResult(null);

    try {
      const response = await fetch("/api/solution-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode,
          moduleSlug: problem.moduleSlug,
          problemSlug: problem.slug,
          studentWork,
        }),
      });

      const payload = (await response.json()) as TutorPayload;
      setResult(payload);
    } finally {
      setLoadingMode(null);
    }
  }

  return (
    <section className="space-y-5">
      <div className="surface-card rounded-[2rem] p-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rust)]">
          Student workspace
        </p>
        <h2 className="text-2xl font-semibold">Check your reasoning, step by step</h2>
        <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">
          Use the tutor in stages: ask for a hint, then a next step, then feedback on your own work. Full-solution reveals should stay exceptional.
        </p>
        <textarea
          value={studentWork}
          onChange={(event) => setStudentWork(event.target.value)}
          placeholder="Paste your own intermediate steps here. The tutor should comment on them rather than jump straight to the final answer."
          className="mt-4 min-h-40 w-full rounded-[1.5rem] border border-[var(--color-line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--color-teal)]"
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={() => ask("hint")}
            className="rounded-full border border-[var(--color-line)] px-4 py-2 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-teal)] hover:text-[var(--color-teal)]"
          >
            {loadingMode === "hint" ? "Loading..." : "Hint first"}
          </button>
          <button
            onClick={() => ask("next_step")}
            className="rounded-full border border-[var(--color-line)] px-4 py-2 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-teal)] hover:text-[var(--color-teal)]"
          >
            {loadingMode === "next_step" ? "Loading..." : "Next step"}
          </button>
          <button
            onClick={() => ask("solution_check")}
            className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-teal)]"
          >
            {loadingMode === "solution_check" ? "Checking..." : "Check my solution"}
          </button>
          <button
            onClick={() => ask("full_solution")}
            className="rounded-full bg-[var(--color-rust)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            {loadingMode === "full_solution" ? "Revealing..." : "Reveal full outline"}
          </button>
        </div>
      </div>

      {result ? (
        <section className="surface-card rounded-[2rem] p-6">
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
                      className="rounded-2xl bg-white px-3 py-2"
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
        </section>
      ) : null}
    </section>
  );
}
