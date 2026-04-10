import Link from "next/link";

import { buttonClasses } from "@/components/ui/button";
import type { PracticeCollection, PracticeProblem } from "@/lib/types";

function kindLabel(kind: PracticeCollection["kind"]) {
  if (kind === "seminar_problem_set") {
    return "Seminar / problem set";
  }

  if (kind === "past_exam") {
    return "Past exam";
  }

  return "Lecture-linked";
}

function supportLabel(problem: PracticeProblem) {
  return problem.supportMode === "derivation"
    ? "Solve by hand"
    : "Written answer feedback";
}

export function PracticeCollectionCard({
  collection,
  problems,
}: {
  collection: PracticeCollection;
  problems: PracticeProblem[];
}) {
  return (
    <article className="surface-card rounded-[2rem] p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[rgba(15,118,110,0.12)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-teal)]">
          {kindLabel(collection.kind)}
        </span>
        <span className="rounded-full border border-[var(--color-line)] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[var(--color-slate)]">
          {collection.estimatedMinutes} min
        </span>
      </div>
      <h3 className="mt-4 text-2xl font-semibold">{collection.title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">
        {collection.description}
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
      <div className="mt-6 space-y-3">
        {problems.map((problem) => (
          <div
            key={problem.slug}
            className="rounded-[1.5rem] border border-[var(--color-line)] bg-white p-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[rgba(180,83,9,0.12)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-rust)]">
                {problem.questionLabel ?? "Question"}
              </span>
              <span className="rounded-full border border-[var(--color-line)] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[var(--color-slate)]">
                {supportLabel(problem)}
              </span>
            </div>
            <h4 className="mt-3 text-lg font-semibold text-[var(--color-ink)]">
              {problem.title}
            </h4>
            <p className="mt-2 text-sm leading-7 text-[var(--color-slate)]">
              {problem.summary}
            </p>
            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-slate)]">
                {problem.sourceDetail}
              </p>
              <Link
                href={`/practice/${problem.slug}`}
                className={buttonClasses("primary", "sm")}
              >
                Open question
              </Link>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
