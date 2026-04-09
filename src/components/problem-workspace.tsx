"use client";

import { useState } from "react";

import { TutorResponse } from "@/components/tutor-response";
import { buttonClasses } from "@/components/ui/button";
import type { PracticeProblem, TutorResult } from "@/lib/types";

export function ProblemWorkspace({ problem }: { problem: PracticeProblem }) {
  const [studentWork, setStudentWork] = useState("");
  const [result, setResult] = useState<TutorResult | null>(null);
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
        error: "The tutor request failed before feedback could be returned.",
      });
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
            className={buttonClasses("outline", "sm")}
          >
            {loadingMode === "hint" ? "Loading..." : "Hint first"}
          </button>
          <button
            onClick={() => ask("next_step")}
            className={buttonClasses("outline", "sm")}
          >
            {loadingMode === "next_step" ? "Loading..." : "Next step"}
          </button>
          <button
            onClick={() => ask("solution_check")}
            className={buttonClasses("primary", "sm")}
          >
            {loadingMode === "solution_check" ? "Checking..." : "Check my solution"}
          </button>
          <button
            onClick={() => ask("full_solution")}
            className={buttonClasses("danger", "sm")}
          >
            {loadingMode === "full_solution" ? "Revealing..." : "Reveal full outline"}
          </button>
        </div>
      </div>

      {result ? (
        <section className="surface-card rounded-[2rem] p-6">
          <TutorResponse result={result} />
        </section>
      ) : null}
    </section>
  );
}
