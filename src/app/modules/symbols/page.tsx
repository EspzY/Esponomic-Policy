import { CitationList } from "@/components/citation-list";
import { ContentBlocks } from "@/components/content-blocks";
import { NotationCollection } from "@/components/notation-collection";
import { requireViewer } from "@/lib/auth";
import { getCourseModules, getModuleBySlug, getNotationEntries } from "@/lib/repository";

export default async function SymbolsPage() {
  await requireViewer();

  const [module, modules, globalNotation] = await Promise.all([
    getModuleBySlug("symbols"),
    getCourseModules(),
    getNotationEntries(null),
  ]);

  const lectureModules = modules.filter((entry) => entry.kind === "lecture");
  const lectureNotationCollections = await Promise.all(
    lectureModules.map(async (lectureModule) => ({
      module: lectureModule,
      entries: await getNotationEntries(lectureModule.slug),
    })),
  );

  const verifiedCount = [
    ...globalNotation,
    ...lectureNotationCollections.flatMap((collection) => collection.entries),
  ].filter(
    (entry) => entry.status === "verified",
  ).length;

  return (
    <main className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="surface-card rounded-[2.25rem] p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-rust)]">
            Module 1
          </p>
          <h1 className="mt-3 text-4xl font-semibold">{module?.title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-slate)]">
            {module?.description}
          </p>
        </div>
        <div className="surface-card rounded-[2.25rem] p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-teal)]">
            Coverage snapshot
          </p>
          <p className="mt-3 text-4xl font-semibold">{verifiedCount}</p>
          <p className="mt-2 text-sm text-[var(--color-slate)]">
            verified symbols currently seeded into the register
          </p>
          <p className="mt-4 text-sm text-[var(--color-slate)]">
            If a symbol is not securely supported by the material, it should remain flagged rather than guessed.
          </p>
        </div>
      </section>

      {module?.sections[0] ? (
        <section className="surface-card rounded-[2.25rem] p-8">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rust)]">
                How to study this page
              </p>
              <h2 className="mt-2 text-3xl font-semibold">{module.sections[0].title}</h2>
            </div>
            <span className="rounded-full bg-[rgba(15,118,110,0.12)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-teal)]">
              Verified before expanded ingest
            </span>
          </div>
          <div className="mt-6">
            <ContentBlocks blocks={module.sections[0].contentBlocks} />
          </div>
        </section>
      ) : null}

      <NotationCollection
        entries={globalNotation}
        title="Global course notation"
        subtitle="These are the objects you should recognize immediately anywhere in the course: actual variables, natural variables, gap variables, parameters, shocks, and the expectation operator."
      />

      {lectureNotationCollections
        .filter((collection) => collection.entries.length > 0)
        .map((collection) => (
          <NotationCollection
            key={collection.module.slug}
            entries={collection.entries}
            title={`${collection.module.title} notation`}
            subtitle={`Module-specific notation for ${collection.module.title}. Each entry keeps the same teaching format: what it is, why it matters, where it appears, and what students commonly mix up.`}
          />
        ))}

      {module ? <CitationList citations={module.citations} /> : null}
    </main>
  );
}
