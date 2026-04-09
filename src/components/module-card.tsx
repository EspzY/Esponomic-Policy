import Link from "next/link";

import { buttonClasses } from "@/components/ui/button";
import type { ModuleSummary, ProgressSnapshot } from "@/lib/types";

export function ModuleCard({
  module,
  progress,
}: {
  module: ModuleSummary;
  progress?: ProgressSnapshot;
}) {
  const status = progress?.status ?? "not_started";
  const statusTone =
    status === "completed"
      ? "bg-[rgba(15,118,110,0.12)] text-[var(--color-teal)]"
      : status === "in_progress"
        ? "bg-[rgba(188,141,47,0.16)] text-[var(--color-rust)]"
        : "bg-[rgba(24,33,45,0.08)] text-[var(--color-slate)]";

  return (
    <article className="surface-card rounded-[2rem] p-6">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${statusTone}`}
        >
          {status.replace("_", " ")}
        </span>
        <span className="rounded-full border border-[var(--color-line)] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[var(--color-slate)]">
          {module.kind === "symbol_register" ? "Reference module" : "Lecture module"}
        </span>
      </div>
      <h2 className="text-2xl font-semibold">{module.title}</h2>
      <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">
        {module.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {module.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-[rgba(24,33,45,0.06)] px-3 py-1 text-xs font-medium text-[var(--color-slate)]"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="text-sm text-[var(--color-slate)]">
          <p>{module.estimatedMinutes} min estimated study time</p>
          {progress?.bestQuizScore ? (
            <p>Best quiz score: {progress.bestQuizScore}%</p>
          ) : null}
        </div>
        <Link
          href={`/modules/${module.slug}`}
          className={buttonClasses("primary", "sm")}
        >
          Open module
        </Link>
      </div>
    </article>
  );
}
