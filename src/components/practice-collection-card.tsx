"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { buttonClasses } from "@/components/ui/button";
import { buildPracticeSession, getPracticeSessionHref } from "@/lib/practice-session";
import type { PracticeCollection, PracticeProblem } from "@/lib/types";

function kindLabel(kind: PracticeCollection["kind"]) {
  if (kind === "seminar_problem_set") {
    return "Seminar / problem set";
  }

  if (kind === "past_exam") {
    return "Past exam";
  }

  return "Lecture-linked practice";
}

function supportSummary(problems: PracticeProblem[]) {
  const modes = new Set(problems.map((problem) => problem.supportMode ?? "conceptual"));

  if (modes.size === 1 && modes.has("derivation")) {
    return "Derivation-focused support";
  }

  if (modes.size === 1) {
    return "Written-answer support";
  }

  return "Mixed conceptual and derivation support";
}

type StoredSessionProgress = {
  currentStepKey?: string;
  visitedStepKeys?: string[];
  completedAt?: string;
};

function storageKey(collectionSlug: string) {
  return `practice-session:${collectionSlug}`;
}

function readStoredProgress(collectionSlug: string): StoredSessionProgress | null {
  try {
    const raw = window.localStorage.getItem(storageKey(collectionSlug));

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as StoredSessionProgress | null;

    if (!parsed || typeof parsed !== "object") {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function PracticeCollectionCard({
  collection,
  problems,
}: {
  collection: PracticeCollection;
  problems: PracticeProblem[];
}) {
  const session = useMemo(
    () => buildPracticeSession(collection, problems),
    [collection, problems],
  );
  const [progress, setProgress] = useState<StoredSessionProgress | null>(null);

  useEffect(() => {
    function syncProgress() {
      setProgress(readStoredProgress(collection.slug));
    }

    function handleStorage(event: StorageEvent) {
      if (event.key && event.key !== storageKey(collection.slug)) {
        return;
      }

      syncProgress();
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        syncProgress();
      }
    }

    syncProgress();
    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", syncProgress);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", syncProgress);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [collection.slug]);

  const visitedCount = progress?.visitedStepKeys?.length ?? 0;
  const ctaLabel = progress?.completedAt
    ? "Review set"
    : visitedCount > 0
      ? "Continue set"
      : "Start set";

  return (
    <article className="surface-card rounded-[2rem] p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[rgba(15,118,110,0.12)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-teal)]">
          {kindLabel(collection.kind)}
        </span>
        <span className="rounded-full border border-[var(--color-line)] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[var(--color-slate)]">
          {session.steps.length} step{session.steps.length === 1 ? "" : "s"}
        </span>
        <span className="rounded-full border border-[var(--color-line)] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[var(--color-slate)]">
          {collection.estimatedMinutes} min
        </span>
      </div>

      <h3 className="mt-4 text-2xl font-semibold">{collection.title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">
        {collection.summary}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {collection.relatedModuleSlugs.map((slug) => (
          <span
            key={slug}
            className="rounded-full bg-[rgba(24,33,45,0.06)] px-3 py-1 text-xs font-medium text-[var(--color-slate)]"
          >
            {slug.replace("lecture-", "Lecture ")}
          </span>
        ))}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-[1.25rem] bg-white px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-rust)]">
            Questions
          </p>
          <p className="mt-2 text-lg font-semibold text-[var(--color-ink)]">
            {problems.length}
          </p>
        </div>
        <div className="rounded-[1.25rem] bg-white px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-rust)]">
            Session flow
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
            One prompt at a time
          </p>
        </div>
        <div className="rounded-[1.25rem] bg-white px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-rust)]">
            Support
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--color-slate)]">
            {supportSummary(problems)}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-slate)]">
          {visitedCount > 0 && !progress?.completedAt
            ? `${visitedCount} of ${session.steps.length} steps visited`
            : collection.sourceLabel}
        </p>
        <Link
          href={getPracticeSessionHref(collection.slug)}
          className={buttonClasses("primary", "sm")}
        >
          {ctaLabel}
        </Link>
      </div>
    </article>
  );
}
