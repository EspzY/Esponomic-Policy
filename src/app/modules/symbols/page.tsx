import { CitationList } from "@/components/citation-list";
import { ContentBlocks } from "@/components/content-blocks";
import { NotationCollection } from "@/components/notation-collection";
import { requireViewer } from "@/lib/auth";
import { getModuleBySlug, getNotationEntries } from "@/lib/repository";

export default async function SymbolsPage() {
  await requireViewer();

  const [module, globalNotation, lecture2Notation] = await Promise.all([
    getModuleBySlug("symbols"),
    getNotationEntries(null),
    getNotationEntries("lecture-2"),
  ]);

  const verifiedCount = [...globalNotation, ...lecture2Notation].filter(
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

      <NotationCollection
        entries={lecture2Notation}
        title="Lecture 2 module notation"
        subtitle="These entries are specific to the New Keynesian model in Lecture 2, including pricing notation, Phillips-curve coefficients, Taylor-rule coefficients, and the marginal-cost abbreviations students often find opaque."
      />

      {module ? <CitationList citations={module.citations} /> : null}
    </main>
  );
}
