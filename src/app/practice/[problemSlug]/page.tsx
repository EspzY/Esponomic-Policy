import { CitationList } from "@/components/citation-list";
import { MathMarkdown } from "@/components/math-markdown";
import { ProblemWorkspace } from "@/components/problem-workspace";
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
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rust)]">
          Problem set workspace
        </p>
        <h1 className="mt-3 text-4xl font-semibold">{problem.title}</h1>
        <div className="mt-5 space-y-4">
          {problem.prompt.map((paragraph) => (
            <MathMarkdown
              key={paragraph}
              content={paragraph}
              className="text-sm leading-8 text-[var(--color-ink)]"
            />
          ))}
        </div>
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

      <ProblemWorkspace problem={problem} />
      <CitationList citations={problem.citations} />
    </main>
  );
}
