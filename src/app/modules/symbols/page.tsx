import { CitationList } from "@/components/citation-list";
import { requireViewer } from "@/lib/auth";
import { getModuleBySlug, getSymbolRegister } from "@/lib/repository";

export default async function SymbolsPage() {
  await requireViewer();

  const [module, symbols] = await Promise.all([
    getModuleBySlug("symbols"),
    getSymbolRegister(),
  ]);

  const verifiedCount = symbols.filter((symbol) => symbol.status === "verified").length;

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

      <section className="surface-card rounded-[2.25rem] p-8">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rust)]">
              Source-grounded reference
            </p>
            <h2 className="mt-2 text-3xl font-semibold">Symbol register</h2>
          </div>
          <span className="rounded-full bg-[rgba(15,118,110,0.12)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-teal)]">
            Verified before expanded ingest
          </span>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="text-xs uppercase tracking-[0.16em] text-[var(--color-slate)]">
              <tr>
                <th className="px-3 py-3">Symbol</th>
                <th className="px-3 py-3">Called</th>
                <th className="px-3 py-3">Definition</th>
                <th className="px-3 py-3">Context</th>
                <th className="px-3 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {symbols.map((symbol) => (
                <tr key={symbol.id} className="border-t border-[var(--color-line)] align-top">
                  <td className="px-3 py-4 font-mono text-lg">{symbol.symbol}</td>
                  <td className="px-3 py-4 text-sm text-[var(--color-slate)]">
                    {symbol.spokenName}
                  </td>
                  <td className="px-3 py-4 text-sm leading-7">{symbol.definition}</td>
                  <td className="px-3 py-4 text-sm text-[var(--color-slate)]">
                    {symbol.context}
                  </td>
                  <td className="px-3 py-4">
                    <span className="rounded-full bg-[rgba(24,33,45,0.08)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-slate)]">
                      {symbol.status.replaceAll("_", " ")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {module ? <CitationList citations={module.citations} /> : null}
    </main>
  );
}
