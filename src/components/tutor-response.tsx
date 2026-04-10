import type { TutorResult } from "@/lib/types";

import { MathMarkdown } from "@/components/math-markdown";
import { cn } from "@/lib/utils";

export function TutorResponse({
  result,
  compact = false,
}: {
  result: TutorResult;
  compact?: boolean;
}) {
  if (result.error) {
    return (
      <div
        className={cn(
          compact ? "" : "rounded-[1.5rem] border border-[rgba(180,83,9,0.24)] bg-white p-5",
        )}
      >
        <p className="text-sm text-[var(--color-rust)]">{result.error}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        compact ? "" : "rounded-[1.5rem] border border-[var(--color-line)] bg-white p-5",
      )}
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rust)]">
        Confidence: {result.confidenceLabel.replaceAll("_", " ")}
      </p>
      <MathMarkdown
        content={result.answerMarkdown}
        className="text-sm leading-7 text-[var(--color-ink)]"
      />

      {result.sourceSnippets.length ? (
        <div className="mt-5 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-teal)]">
            Sources checked
          </p>
          {result.sourceSnippets.map((snippet) => (
            <div
              key={`${snippet.title}-${snippet.excerpt}`}
              className="rounded-[1.25rem] bg-[rgba(24,33,45,0.04)] px-4 py-3"
            >
              <p className="font-medium text-[var(--color-ink)]">{snippet.title}</p>
              <MathMarkdown
                content={snippet.excerpt}
                className="mt-2 text-sm leading-7 text-[var(--color-slate)]"
              />
              {snippet.citations.length ? (
                <ul className="mt-2 space-y-1 text-xs text-[var(--color-slate)]">
                  {snippet.citations.map((citation) => (
                    <li
                      key={`${citation.documentTitle}-${citation.page}-${citation.note}`}
                    >
                      <span className="font-medium text-[var(--color-ink)]">
                        {citation.documentTitle}
                      </span>{" "}
                      {citation.page}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
