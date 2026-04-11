"use client";

import { useState } from "react";

import { MathMarkdown } from "@/components/math-markdown";
import { TutorResponse } from "@/components/tutor-response";
import { buttonClasses } from "@/components/ui/button";
import type { PracticeProblem, TutorResult } from "@/lib/types";

export function ProblemWorkspace({ problem }: { problem: PracticeProblem }) {
  const [studentWork, setStudentWork] = useState("");
  const [result, setResult] = useState<TutorResult | null>(null);
  const [loadingMode, setLoadingMode] = useState<string | null>(null);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [showOutline, setShowOutline] = useState(false);
  const supportMode = problem.supportMode ?? "conceptual";
  const isDerivation = supportMode === "derivation";
  const stepGuide = problem.stepGuide ?? [];
  const hasDraft = studentWork.trim().length > 0;

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
        <h2 className="text-2xl font-semibold">
          {isDerivation ? "Solve by hand, with progressive help" : "Write your answer and improve it"}
        </h2>
        <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">
          {isDerivation
            ? problem.handSolveNote ??
              "This question is meant to be worked out by hand. Use the progressive help when you get stuck; it explains what to do, why the step is valid, and how it fits the full derivation."
            : "Draft your answer in full sentences. The local feedback checker compares your answer against the stored teaching guide and solution structure for this problem."}
        </p>

        {isDerivation ? (
          <>
            <div className="mt-4 rounded-[1.5rem] border border-[rgba(15,118,110,0.18)] bg-[rgba(15,118,110,0.05)] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-teal)]">
                Recommended workflow
              </p>
              <ol className="mt-3 space-y-2 text-sm leading-7 text-[var(--color-slate)]">
                <li className="rounded-2xl bg-white px-4 py-3">
                  1. Solve the derivation on paper using the original question and the benchmark equations above.
                </li>
                <li className="rounded-2xl bg-white px-4 py-3">
                  2. Reveal one help step at a time only when you know where your reasoning broke.
                </li>
                <li className="rounded-2xl bg-white px-4 py-3">
                  3. Use the full solution only if you are still stuck after the stepwise guide.
                </li>
              </ol>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {stepGuide.length ? (
                <button
                  onClick={() => setRevealedSteps((current) => Math.min(current + 1, stepGuide.length))}
                  className={buttonClasses("primary", "sm")}
                >
                  {revealedSteps === 0 ? "Reveal first help step" : "Reveal next help step"}
                </button>
              ) : (
                <button
                  onClick={() => ask("hint")}
                  className={buttonClasses("outline", "sm")}
                >
                  {loadingMode === "hint" ? "Loading..." : "Get a first hint"}
                </button>
              )}
              {stepGuide.length > 1 ? (
                <button
                  onClick={() => setRevealedSteps(stepGuide.length)}
                  className={buttonClasses("outline", "sm")}
                >
                  Reveal all help steps
                </button>
              ) : null}
                <button
                  onClick={() => setShowOutline(true)}
                  className={buttonClasses("danger", "sm")}
                >
                  Reveal full solution
                </button>
                {(revealedSteps > 0 || showOutline) ? (
                  <button
                    onClick={() => {
                      setRevealedSteps(0);
                      setShowOutline(false);
                      setResult(null);
                    }}
                    className={buttonClasses("outline", "sm")}
                  >
                    Reset help
                  </button>
                ) : null}
            </div>
            {stepGuide.length && revealedSteps > 0 ? (
              <div className="mt-5 space-y-3">
                {stepGuide.slice(0, revealedSteps).map((step, index) => (
                  <div
                    key={`${step.title}-${index}`}
                    className="rounded-[1.5rem] border border-[var(--color-line)] bg-white p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-rust)]">
                      Help step {index + 1}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-[var(--color-ink)]">
                      {step.title}
                    </h3>
                    {step.latex ? (
                      <div className="mt-4 rounded-[1.25rem] border border-[var(--color-line)] bg-[rgba(24,33,45,0.02)] p-4">
                        <MathMarkdown
                          content={`$$${step.latex}$$`}
                          className="overflow-x-auto text-[var(--color-ink)]"
                        />
                      </div>
                    ) : null}
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      <div className="rounded-[1.25rem] bg-[rgba(24,33,45,0.04)] p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-teal)]">
                          What to do next
                        </p>
                        <p className="mt-2 text-sm leading-7 text-[var(--color-slate)]">
                          {step.whatToDo}
                        </p>
                      </div>
                      <div className="rounded-[1.25rem] bg-[rgba(24,33,45,0.04)] p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-teal)]">
                          Why the move is valid
                        </p>
                        <p className="mt-2 text-sm leading-7 text-[var(--color-slate)]">
                          {step.whyValid}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                      <div className="rounded-[1.25rem] bg-[rgba(24,33,45,0.04)] p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-rust)]">
                          Rule or principle used
                        </p>
                        <p className="mt-2 text-sm leading-7 text-[var(--color-slate)]">
                          {step.principle}
                        </p>
                      </div>
                      <div className="rounded-[1.25rem] bg-[rgba(24,33,45,0.04)] p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-rust)]">
                          Why this is the right move now
                        </p>
                        <p className="mt-2 text-sm leading-7 text-[var(--color-slate)]">
                          {step.contribution}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
            {showOutline ? (
              <div className="mt-5 rounded-[1.5rem] border border-[rgba(180,83,9,0.22)] bg-[rgba(180,83,9,0.06)] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-rust)]">
                  Full solution
                </p>
                <MathMarkdown
                  content={problem.solutionOutline.join("\n\n")}
                  className="mt-3 rounded-2xl bg-white px-4 py-4 text-sm leading-7 text-[var(--color-slate)]"
                />
              </div>
            ) : null}
          </>
        ) : (
          <>
            <div className="mt-4 rounded-[1.5rem] border border-[rgba(15,118,110,0.16)] bg-[rgba(15,118,110,0.05)] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-teal)]">
                Best use of the feedback checker
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-slate)]">
                Write the answer you would actually hand in. The checker should tell you what is already on the right track, what is still missing, and which part of the theory needs clearer explanation.
              </p>
            </div>
            <textarea
              value={studentWork}
              onChange={(event) => setStudentWork(event.target.value)}
              placeholder={
                problem.answerPlaceholder ??
                "Write your answer here. The checker compares it against the stored teaching guide and highlights what should be strengthened."
              }
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
                {loadingMode === "next_step" ? "Loading..." : "Nudge me further"}
              </button>
              <button
                onClick={() => ask("solution_check")}
                className={buttonClasses("primary", "sm")}
                disabled={!hasDraft}
              >
                {loadingMode === "solution_check" ? "Checking..." : "Get feedback on my answer"}
              </button>
              <button
                onClick={() => ask("full_solution")}
                className={buttonClasses("danger", "sm")}
              >
                {loadingMode === "full_solution" ? "Revealing..." : "Reveal full solution"}
              </button>
            </div>
            {!hasDraft ? (
              <p className="mt-3 text-xs leading-6 text-[var(--color-slate)]">
                Add a short written answer before asking for detailed feedback. Hints and answer outlines remain available if you want to warm up first.
              </p>
            ) : null}
          </>
        )}
      </div>

      {result ? (
        <section className="surface-card rounded-[2rem] p-6">
          <TutorResponse result={result} />
        </section>
      ) : null}
    </section>
  );
}
