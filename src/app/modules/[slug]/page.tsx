import Link from "next/link";
import { notFound } from "next/navigation";

import { markSectionCompleteAction } from "@/app/actions";
import { CitationList } from "@/components/citation-list";
import { ContentBlocks } from "@/components/content-blocks";
import { NotationCollection } from "@/components/notation-collection";
import { TutorPanel } from "@/components/tutor-panel";
import { buttonClasses } from "@/components/ui/button";
import { requireViewer } from "@/lib/auth";
import {
  getModuleBySlug,
  getNotationEntries,
  getProgressSnapshots,
} from "@/lib/repository";

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const viewer = await requireViewer();
  const { slug } = await params;
  const [module, progress, notation] = await Promise.all([
    getModuleBySlug(slug),
    getProgressSnapshots(viewer.demoMode ? undefined : viewer.id),
    getNotationEntries(slug),
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
            className={buttonClasses("primary", "sm", "mt-5")}
          >
            Open module quiz
          </Link>
        </div>
      </section>

      {notation.length ? (
        <NotationCollection
          entries={notation}
          title="Lecture 2 glossary"
          subtitle="This glossary stays in the same teaching format throughout the module: what the notation is, why it matters, where it appears, and what students commonly mix up."
        />
      ) : null}

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
                  <button className={buttonClasses("outline", "sm")}>
                    {done ? "Section completed" : "Mark section complete"}
                  </button>
                </form>
              </div>

              <div className="mt-6">
                <ContentBlocks blocks={section.contentBlocks} />
              </div>

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
