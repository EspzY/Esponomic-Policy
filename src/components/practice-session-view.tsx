"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { ContentBlocks } from "@/components/content-blocks";
import { MathMarkdown } from "@/components/math-markdown";
import { buttonClasses } from "@/components/ui/button";
import type { PracticeSession } from "@/lib/practice-session";
import type { PracticeSupportEquation, TutorResult } from "@/lib/types";

type SupportMode = "hint" | "outline" | "feedback" | "solution";

type PersistedSessionState = {
  currentStepKey?: string;
  visitedStepKeys: string[];
  drafts: Record<string, string>;
  completedAt?: string;
};

function storageKey(collectionSlug: string) {
  return `practice-session:${collectionSlug}`;
}

function emptyState(): PersistedSessionState {
  return {
    visitedStepKeys: [],
    drafts: {},
  };
}

function supportLabel(mode: SupportMode) {
  if (mode === "hint") {
    return "Hint";
  }

  if (mode === "outline") {
    return "Answer outline";
  }

  if (mode === "feedback") {
    return "Feedback on my answer";
  }

  return "Full solution";
}

function supportVariant(mode: SupportMode) {
  if (mode === "feedback") {
    return "primary" as const;
  }

  if (mode === "solution") {
    return "danger" as const;
  }

  return "outline" as const;
}

function resultTitle(mode: SupportMode) {
  if (mode === "hint") {
    return "Hint";
  }

  if (mode === "outline") {
    return "Answer outline";
  }

  if (mode === "feedback") {
    return "Feedback on your answer";
  }

  return "Full worked solution";
}

function findInitialStepIndex(
  session: PracticeSession,
  questionSlug?: string,
  partId?: string,
) {
  if (!questionSlug) {
    return 0;
  }

  const normalizedPart = partId?.trim().toLowerCase();
  const exactIndex = session.steps.findIndex(
    (step) =>
      step.problemSlug === questionSlug &&
      (!normalizedPart || step.partId === normalizedPart),
  );

  if (exactIndex >= 0) {
    return exactIndex;
  }

  const firstQuestionIndex = session.steps.findIndex((step) => step.problemSlug === questionSlug);
  return firstQuestionIndex >= 0 ? firstQuestionIndex : 0;
}

function SupportResponse({
  title,
  result,
}: {
  title: string;
  result: TutorResult;
}) {
  if (result.error) {
    return (
      <div className="rounded-[1.5rem] border border-[rgba(180,83,9,0.24)] bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-rust)]">
          {title}
        </p>
        <p className="mt-3 text-sm leading-7 text-[var(--color-rust)]">{result.error}</p>
      </div>
    );
  }

  return (
    <div className="rounded-[1.5rem] border border-[var(--color-line)] bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-rust)]">
        {title}
      </p>
      <MathMarkdown
        content={result.answerMarkdown}
        className="mt-3 text-sm leading-7 text-[var(--color-ink)]"
      />
    </div>
  );
}

function SupportingEquationPanel({
  equations,
}: {
  equations: PracticeSupportEquation[];
}) {
  if (!equations.length) {
    return null;
  }

  return (
    <details className="rounded-[1.25rem] border border-[var(--color-line)] bg-white px-4 py-3">
      <summary className="cursor-pointer list-none text-sm font-semibold text-[var(--color-ink)]">
        Need the benchmark formulas for this step?
      </summary>
      <div className="mt-4 grid gap-3">
        {equations.map((equation) => (
          <div
            key={equation.id}
            className="rounded-[1.25rem] bg-[rgba(24,33,45,0.04)] px-4 py-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-teal)]">
              {equation.label}
            </p>
            <MathMarkdown
              content={`$$${equation.latex}$$`}
              className="mt-3 overflow-x-auto text-[var(--color-ink)]"
            />
            <MathMarkdown
              content={equation.explanation}
              className="mt-3 text-sm leading-7 text-[var(--color-slate)]"
            />
          </div>
        ))}
      </div>
    </details>
  );
}

export function PracticeSessionView({
  session,
  initialQuestionSlug,
  initialPartId,
}: {
  session: PracticeSession;
  initialQuestionSlug?: string;
  initialPartId?: string;
}) {
  const initialIndex = useMemo(
    () => findInitialStepIndex(session, initialQuestionSlug, initialPartId),
    [initialPartId, initialQuestionSlug, session],
  );
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [visitedStepKeys, setVisitedStepKeys] = useState<string[]>([]);
  const [activeSupport, setActiveSupport] = useState<SupportMode | null>(null);
  const [loadingMode, setLoadingMode] = useState<SupportMode | null>(null);
  const [results, setResults] = useState<Record<string, TutorResult>>({});
  const [finished, setFinished] = useState(false);

  const currentStep = session.steps[currentIndex];

  useEffect(() => {
    if (!session.steps.length || typeof window === "undefined") {
      return;
    }

    try {
      const raw = window.localStorage.getItem(storageKey(session.collection.slug));
      const stored = raw ? (JSON.parse(raw) as PersistedSessionState) : emptyState();
      const explicitQueryRequested = Boolean(initialQuestionSlug);
      const storedIndex = stored.currentStepKey
        ? session.steps.findIndex((step) => step.key === stored.currentStepKey)
        : -1;

      setDrafts(stored.drafts ?? {});
      setVisitedStepKeys(stored.visitedStepKeys ?? []);

      if (!explicitQueryRequested && storedIndex >= 0) {
        setCurrentIndex(storedIndex);
      }
    } catch {
      setDrafts({});
      setVisitedStepKeys([]);
    }
  }, [initialQuestionSlug, session.collection.slug, session.steps]);

  useEffect(() => {
    if (!currentStep) {
      return;
    }

    setVisitedStepKeys((current) =>
      current.includes(currentStep.key) ? current : [...current, currentStep.key],
    );
  }, [currentStep]);

  useEffect(() => {
    if (typeof window === "undefined" || !currentStep) {
      return;
    }

    const payload: PersistedSessionState = {
      currentStepKey: currentStep.key,
      visitedStepKeys,
      drafts,
      completedAt: finished ? new Date().toISOString() : undefined,
    };

    window.localStorage.setItem(storageKey(session.collection.slug), JSON.stringify(payload));
  }, [currentStep, drafts, finished, session.collection.slug, visitedStepKeys]);

  useEffect(() => {
    setActiveSupport(null);
    setLoadingMode(null);
  }, [currentIndex]);

  if (!session.steps.length || !currentStep) {
    return (
      <section className="surface-card rounded-[2rem] p-8">
        <h1 className="text-3xl font-semibold">This source is not ready yet.</h1>
        <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">
          No practice steps were found for this source.
        </p>
      </section>
    );
  }

  const currentDraft = drafts[currentStep.key] ?? "";
  const currentResultKey = activeSupport ? `${currentStep.key}:${activeSupport}` : null;
  const currentResult = currentResultKey ? results[currentResultKey] : null;
  const isLastStep = currentIndex === session.steps.length - 1;

  async function requestSupport(mode: SupportMode) {
    setActiveSupport(mode);

    const resultKey = `${currentStep.key}:${mode}`;

    if (mode !== "feedback" && results[resultKey]) {
      return;
    }

    const apiMode =
      mode === "outline"
        ? "next_step"
        : mode === "feedback"
          ? "solution_check"
          : mode === "solution"
            ? "full_solution"
            : "hint";

    setLoadingMode(mode);

    try {
      const response = await fetch("/api/solution-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: apiMode,
          moduleSlug: session.problems[currentStep.questionIndex]?.moduleSlug,
          problemSlug: currentStep.problemSlug,
          partId: currentStep.partId !== "main" ? currentStep.partId : undefined,
          studentWork: currentDraft,
        }),
      });

      const payload = (await response.json()) as TutorResult;

      if (!response.ok) {
        setResults((current) => ({
          ...current,
          [resultKey]: {
            answerMarkdown: "",
            confidenceLabel: "insufficient_evidence",
            citations: [],
            sourceSnippets: [],
            error: payload.error ?? "Support could not be loaded for this step.",
          },
        }));
        return;
      }

      setResults((current) => ({
        ...current,
        [resultKey]: payload,
      }));
    } catch {
      setResults((current) => ({
        ...current,
        [resultKey]: {
          answerMarkdown: "",
          confidenceLabel: "insufficient_evidence",
          citations: [],
          sourceSnippets: [],
          error: "Support could not be loaded for this step.",
        },
      }));
    } finally {
      setLoadingMode(null);
    }
  }

  function updateDraft(value: string) {
    setDrafts((current) => ({
      ...current,
      [currentStep.key]: value,
    }));
    setResults((current) => {
      const next = { ...current };
      delete next[`${currentStep.key}:feedback`];
      return next;
    });
  }

  function moveBy(offset: -1 | 1) {
    const nextIndex = currentIndex + offset;

    if (nextIndex < 0 || nextIndex >= session.steps.length) {
      return;
    }

    setCurrentIndex(nextIndex);
  }

  function finishSession() {
    setFinished(true);
  }

  function restartSession() {
    setFinished(false);
    setCurrentIndex(0);
    setActiveSupport(null);
  }

  if (finished) {
    return (
      <div className="space-y-6">
        <section className="surface-card rounded-[2rem] p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rust)]">
            Practice complete
          </p>
          <h1 className="mt-3 text-3xl font-semibold">{session.collection.title}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-slate)]">
            You reached the end of this source. Return to Practice to choose a new set, or restart this one if you want another pass while the reasoning is still fresh.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/practice" className={buttonClasses("primary", "sm")}>
              Return to Practice
            </Link>
            <button onClick={restartSession} className={buttonClasses("outline", "sm")}>
              Restart this set
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="surface-card rounded-[2rem] p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rust)]">
              Practice session
            </p>
            <h1 className="mt-2 text-3xl font-semibold">{session.collection.title}</h1>
          </div>
          <Link href="/practice" className={buttonClasses("outline", "sm")}>
            Back to Practice
          </Link>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[rgba(15,118,110,0.12)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-teal)]">
            Step {currentIndex + 1} of {session.steps.length}
          </span>
          <span className="rounded-full border border-[var(--color-line)] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[var(--color-slate)]">
            {currentStep.questionLabel}
            {currentStep.partLabel ? ` • ${currentStep.partLabel}` : ""}
          </span>
          {currentStep.relatedModuleSlugs.map((slug) => (
            <span
              key={slug}
              className="rounded-full border border-[var(--color-line)] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[var(--color-slate)]"
            >
              {slug.replace("lecture-", "Lecture ")}
            </span>
          ))}
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-[rgba(24,33,45,0.08)]">
          <div
            className="h-full rounded-full bg-[var(--color-teal)] transition-all"
            style={{
              width: `${((currentIndex + 1) / session.steps.length) * 100}%`,
            }}
          />
        </div>

        <details className="mt-5 rounded-[1.25rem] border border-[var(--color-line)] bg-white px-4 py-3">
          <summary className="cursor-pointer list-none text-sm font-semibold text-[var(--color-ink)]">
            Source overview
          </summary>
          <div className="mt-4 grid gap-2">
            {session.steps.map((step, index) => (
              <button
                key={step.key}
                onClick={() => setCurrentIndex(index)}
                className={`rounded-[1rem] border px-4 py-3 text-left transition ${
                  index === currentIndex
                    ? "border-[rgba(15,118,110,0.35)] bg-[rgba(15,118,110,0.08)]"
                    : "border-[var(--color-line)] bg-[rgba(24,33,45,0.02)]"
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-rust)]">
                  Step {index + 1}
                </p>
                <p className="mt-1 text-sm font-semibold text-[var(--color-ink)]">
                  {step.questionLabel}
                  {step.partLabel ? ` • ${step.partLabel}` : ""}
                </p>
                <p className="mt-1 text-sm leading-6 text-[var(--color-slate)]">
                  {step.promptText}
                </p>
              </button>
            ))}
          </div>
        </details>
      </section>

      <section className="surface-card rounded-[2rem] p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rust)]">
              Current question
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[var(--color-ink)]">
              {currentStep.problemTitle}
            </h2>
            <p className="mt-2 text-sm text-[var(--color-slate)]">
              Question {currentStep.questionIndex + 1} of {currentStep.questionCount}
              {currentStep.partLabel ? ` • ${currentStep.partLabel} of ${currentStep.partCount}` : ""}
            </p>
          </div>
        </div>

        {currentStep.sharedBlocks.length ? (
          <details className="mt-5 rounded-[1.25rem] border border-[var(--color-line)] bg-white px-4 py-3">
            <summary className="cursor-pointer list-none text-sm font-semibold text-[var(--color-ink)]">
              View source setup for this question
            </summary>
            <div className="mt-4">
              <ContentBlocks blocks={currentStep.sharedBlocks} />
            </div>
          </details>
        ) : null}

        <div className="mt-5">
          <ContentBlocks blocks={currentStep.questionBlocks} />
        </div>

        <div className="mt-6">
          <label className="text-sm font-semibold text-[var(--color-ink)]">
            {currentStep.supportMode === "derivation"
              ? "Your working notes"
              : "Your answer"}
          </label>
          <textarea
            value={currentDraft}
            onChange={(event) => updateDraft(event.target.value)}
            placeholder={
              currentStep.answerPlaceholder ??
              (currentStep.supportMode === "derivation"
                ? "Solve the full derivation by hand. Use this box for the line you are at, the result you got, or the exact point where you got stuck."
                : "Write your answer to this question here.")
            }
            className="mt-3 min-h-44 w-full rounded-[1.5rem] border border-[var(--color-line)] bg-white px-4 py-4 text-sm outline-none transition focus:border-[var(--color-teal)]"
          />
          {currentStep.supportMode === "derivation" ? (
            <p className="mt-3 text-xs leading-6 text-[var(--color-slate)]">
              Use paper for the full derivation. The box is there for short notes, target lines, or the step you want feedback on.
            </p>
          ) : null}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {(["hint", "outline", "feedback", "solution"] as SupportMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => requestSupport(mode)}
              disabled={mode === "feedback" && !currentDraft.trim()}
              className={buttonClasses(supportVariant(mode), "sm")}
            >
              {loadingMode === mode ? "Loading..." : supportLabel(mode)}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <SupportingEquationPanel equations={currentStep.supportingEquations} />
        </div>

        {activeSupport && currentResult ? (
          <div className="mt-5">
            <SupportResponse
              title={resultTitle(activeSupport)}
              result={currentResult}
            />
          </div>
        ) : null}
      </section>

      <section className="surface-card sticky bottom-4 rounded-[2rem] p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => moveBy(-1)}
            disabled={currentIndex === 0}
            className={buttonClasses("outline", "sm")}
          >
            Previous
          </button>
          <p className="text-sm font-medium text-[var(--color-slate)]">
            {currentStep.questionLabel}
            {currentStep.partLabel ? ` • ${currentStep.partLabel}` : ""}
          </p>
          {isLastStep ? (
            <button onClick={finishSession} className={buttonClasses("primary", "sm")}>
              Finish set
            </button>
          ) : (
            <button onClick={() => moveBy(1)} className={buttonClasses("primary", "sm")}>
              Next
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
