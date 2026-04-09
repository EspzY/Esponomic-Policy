import type { Citation } from "@/lib/types";

export function CitationList({ citations }: { citations: Citation[] }) {
  if (!citations.length) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-[var(--color-line)] bg-[rgba(15,118,110,0.06)] p-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-teal)]">
        Sources used
      </p>
      <ul className="space-y-2 text-sm text-[var(--color-slate)]">
        {citations.map((citation) => (
          <li
            key={`${citation.documentTitle}-${citation.page}-${citation.note}`}
            className="rounded-2xl bg-white/70 px-3 py-2"
          >
            <span className="font-medium text-[var(--color-ink)]">
              {citation.documentTitle}
            </span>{" "}
            <span>{citation.page}</span>
            <div>{citation.note}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
