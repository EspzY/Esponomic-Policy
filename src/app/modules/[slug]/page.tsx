import Link from "next/link";
import { notFound } from "next/navigation";

import { markSectionCompleteAction } from "@/app/actions";
import { CitationList } from "@/components/citation-list";
import { TutorPanel } from "@/components/tutor-panel";
import { requireViewer } from "@/lib/auth";
import { getModuleBySlug, getProgressSnapshots } from "@/lib/repository";

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const viewer = await requireViewer();
  const { slug } = await params;
  const [module, progress] = await Promise.all([
    getModuleBySlug(slug),
    getProgressSnapshots(viewer.demoMode ? undefined : viewer.id),
  ]);

  if (!module || module.kind !== "lecture") {
    notFound();
  }

  const progressEntry = progress.find((entry) => entry.moduleSlug === module.slug);

  return (
    <main className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="surface-card rounded-[2.25rem] p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-rust)]">
            Lecture module
          </p>
          <h1 className="mt-3 text-4xl font-semibold">{module.title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-slate)]">
            {module.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {module.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[rgba(24,33,45,0.06)] px-3 py-1 text-xs font-medium text-[var(--color-slate)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="surface-card rounded-[2.25rem] p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-teal)]">
            Completion logic
          </p>
          <p className="mt-3 text-4xl font-semibold">
            {progressEntry?.status.replaceAll("_", " ") ?? "not started"}
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">
            Finish every section below and score at least 70% on the quiz to mark the module as completed.
          </p>
          <Link
            href={`/modules/${module.slug}/quiz`}
            className="mt-5 inline-flex rounded-full bg-[var(--color-ink)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-teal)]"
          >
            Open module quiz
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        {module.sections.map((section) => {
          const done = progressEntry?.completedSections.includes(section.slug);

          return (
            <article key={section.id} className="surface-card rounded-[2rem] p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rust)]">
                    {section.slug.replaceAll("-", " ")}
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold">{section.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">
                    {section.summary}
                  </p>
                </div>
                <form action={markSectionCompleteAction}>
                  <input type="hidden" name="moduleSlug" value={module.slug} />
                  <input type="hidden" name="sectionSlug" value={section.slug} />
                  <button className="rounded-full border border-[var(--color-line)] px-4 py-2 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-teal)] hover:text-[var(--color-teal)]">
                    {done ? "Section completed" : "Mark section complete"}
                  </button>
                </form>
              </div>

              <div className="mt-6 space-y-4">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-8 text-[var(--color-ink)]">
                    {paragraph}
                  </p>
                ))}
              </div>

              {section.equations?.length ? (
                <div className="mt-6 grid gap-4">
                  {section.equations.map((equation) => (
                    <div
                      key={equation.label}
                      className="rounded-[1.5rem] border border-[var(--color-line)] bg-white p-5"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-teal)]">
                        {equation.label}
                      </p>
                      <pre className="mt-3 overflow-x-auto text-sm leading-7 text-[var(--color-ink)]">
                        {equation.expression}
                      </pre>
                      <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">
                        {equation.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}

              {section.checkpoints?.length ? (
                <ul className="mt-6 space-y-2 text-sm text-[var(--color-slate)]">
                  {section.checkpoints.map((checkpoint) => (
                    <li
                      key={checkpoint}
                      className="rounded-2xl bg-[rgba(24,33,45,0.04)] px-4 py-3"
                    >
                      {checkpoint}
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-6">
                <CitationList citations={section.citations} />
              </div>
            </article>
          );
        })}
      </section>

      <TutorPanel moduleSlug={module.slug} />
    </main>
  );
}
