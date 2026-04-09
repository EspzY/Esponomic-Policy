import type { NotationEntry, NotationKind } from "@/lib/types";

import { MathMarkdown } from "@/components/math-markdown";

const kindLabels: Record<NotationKind, string> = {
  symbol: "Symbols",
  parameter: "Parameters",
  abbreviation: "Abbreviations",
  shock: "Shocks",
  operator: "Operators",
};

export function NotationCollection({
  entries,
  title,
  subtitle,
}: {
  entries: NotationEntry[];
  title: string;
  subtitle: string;
}) {
  const groups = Object.entries(
    entries.reduce<Record<NotationKind, NotationEntry[]>>(
      (accumulator, entry) => {
        accumulator[entry.kind].push(entry);
        return accumulator;
      },
      {
        symbol: [],
        parameter: [],
        abbreviation: [],
        shock: [],
        operator: [],
      },
    ),
  ).filter(([, groupEntries]) => groupEntries.length);

  return (
    <section className="surface-card rounded-[2rem] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rust)]">
        Notation guide
      </p>
      <h2 className="mt-2 text-3xl font-semibold">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--color-slate)]">{subtitle}</p>
      <div className="mt-6 space-y-8">
        {groups.map(([kind, groupEntries]) => (
          <div key={kind} className="space-y-4">
            <h3 className="text-xl font-semibold">{kindLabels[kind as NotationKind]}</h3>
            <div className="grid gap-4 lg:grid-cols-2">
              {groupEntries.map((entry) => (
                <article
                  key={entry.id}
                  className="rounded-[1.5rem] border border-[var(--color-line)] bg-white p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="overflow-x-auto text-xl text-[var(--color-ink)]">
                      <MathMarkdown content={`$$${entry.displayLatex}$$`} />
                    </div>
                    <span className="rounded-full bg-[rgba(24,33,45,0.08)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-slate)]">
                      {entry.status.replaceAll("_", " ")}
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-[var(--color-ink)]">
                    {entry.spokenName}
                  </p>
                  <div className="mt-4 space-y-3 text-sm leading-7">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-rust)]">
                        What it is
                      </p>
                      <MathMarkdown
                        content={entry.plainMeaning}
                        className="mt-1 text-[var(--color-ink)]"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-rust)]">
                        Why it matters
                      </p>
                      <MathMarkdown
                        content={entry.whyItMatters}
                        className="mt-1 text-[var(--color-slate)]"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-rust)]">
                        Where it appears
                      </p>
                      <ul className="mt-1 list-disc pl-5 text-[var(--color-slate)]">
                        {entry.whereItAppears.map((item) => (
                          <li key={item}>
                            <MathMarkdown content={item} />
                          </li>
                        ))}
                      </ul>
                    </div>
                    {entry.commonConfusions.length ? (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-rust)]">
                          Common mistake
                        </p>
                        <ul className="mt-1 list-disc pl-5 text-[var(--color-slate)]">
                          {entry.commonConfusions.map((item) => (
                            <li key={item}>
                              <MathMarkdown content={item} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    {entry.relatedTerms.length ? (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-rust)]">
                          Related terms
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {entry.relatedTerms.map((item) => (
                            <span
                              key={item}
                              className="rounded-full bg-[rgba(15,118,110,0.08)] px-3 py-1 text-xs font-medium text-[var(--color-teal)]"
                            >
                              <MathMarkdown content={item} />
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
