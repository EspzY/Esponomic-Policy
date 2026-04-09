import { CitationList } from "@/components/citation-list";
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
            <p key={paragraph} className="text-sm leading-8 text-[var(--color-ink)]">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-6 grid gap-4">
          {problem.equations.map((equation) => (
            <pre
              key={equation}
              className="overflow-x-auto rounded-[1.5rem] border border-[var(--color-line)] bg-white px-4 py-4 text-sm leading-7 text-[var(--color-ink)]"
            >
              {equation}
            </pre>
          ))}
        </div>
      </section>

      <ProblemWorkspace problem={problem} />
      <CitationList citations={problem.citations} />
    </main>
  );
}
