import Link from "next/link";

import { ContentBlocks } from "@/components/content-blocks";
import { CitationList } from "@/components/citation-list";
import { MathMarkdown } from "@/components/math-markdown";
import { PracticeGuide } from "@/components/practice-guide";
import { ProblemWorkspace } from "@/components/problem-workspace";
import { buttonClasses } from "@/components/ui/button";
import { requireViewer } from "@/lib/auth";
import { getPracticeProblemBySlug } from "@/lib/repository";

export default async function PracticeProblemPage({
  params,
}: {
  params: Promise<{ problemSlug: string }>;
}) {
  await requireViewer();
  const { problemSlug } = await params;
  const problem = await getPracticeProblemBySlug(problemSlug);

  if (!problem) {
    return <div>Problem not found.</div>;
  }

  return (
    <main className="space-y-8">
      <section className="surface-card rounded-[2.25rem] p-8">
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/practice" className={buttonClasses("outline", "sm")}>
            Back to Practice
          </Link>
          <Link
            href={`/modules/${problem.moduleSlug}`}
            className={buttonClasses("outline", "sm")}
          >
            Back to {problem.moduleSlug.replace("lecture-", "Lecture ")}
          </Link>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[rgba(15,118,110,0.12)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-teal)]">
            {problem.sourceKind === "past_exam"
              ? "Past exam"
              : problem.sourceKind === "seminar_problem_set"
                ? "Seminar / problem set"
                : "Lecture-linked practice"}
          </span>
          {problem.questionLabel ? (
            <span className="rounded-full border border-[var(--color-line)] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[var(--color-slate)]">
              {problem.questionLabel}
            </span>
          ) : null}
          <span className="rounded-full border border-[var(--color-line)] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[var(--color-slate)]">
            {problem.supportMode === "derivation" ? "Solve by hand" : "Written answer feedback"}
          </span>
        </div>
        <h1 className="mt-3 text-4xl font-semibold">{problem.title}</h1>
        {problem.summary ? (
          <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--color-slate)]">
            {problem.summary}
          </p>
        ) : null}
        <div className="mt-5 flex flex-wrap gap-2">
          {(problem.relatedModuleSlugs ?? [problem.moduleSlug]).map((slug) => (
            <Link
              key={slug}
              href={`/modules/${slug}`}
              className="rounded-full bg-[rgba(24,33,45,0.06)] px-3 py-1 text-xs font-medium text-[var(--color-slate)]"
            >
              {slug.replace("lecture-", "Lecture ")}
            </Link>
          ))}
        </div>
      </section>

      <section className="surface-card rounded-[2rem] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rust)]">
          Original question
        </p>
        <h2 className="mt-3 text-2xl font-semibold">
          {problem.sourceLabel ?? "Original source material"}
        </h2>
        {problem.sourceDetail ? (
          <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">
            {problem.sourceDetail}
          </p>
        ) : null}
        <div className="mt-5 space-y-4">
          {problem.questionBlocks?.length ? (
            <ContentBlocks blocks={problem.questionBlocks} />
          ) : (
            problem.prompt.map((paragraph) => (
              <MathMarkdown
                key={paragraph}
                content={paragraph}
                className="text-sm leading-8 text-[var(--color-ink)]"
              />
            ))
          )}
        </div>
      </section>

      <PracticeGuide
        guide={problem.guide}
        supportMode={problem.supportMode ?? "conceptual"}
        stepGuide={problem.stepGuide}
        handSolveNote={problem.handSolveNote}
      />

      {problem.supportingEquations.length ? (
        <section className="surface-card rounded-[2rem] p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rust)]">
            Equations you may need
          </p>
          <h2 className="mt-3 text-2xl font-semibold">Keep the benchmark close</h2>
          <div className="mt-6 grid gap-4">
            {problem.supportingEquations.map((equation) => (
              <div
                key={equation.id}
                className="rounded-[1.5rem] border border-[var(--color-line)] bg-white px-5 py-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-teal)]">
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
        </section>
      ) : null}

      <ProblemWorkspace problem={problem} />
      <CitationList citations={problem.citations} />
    </main>
  );
}
