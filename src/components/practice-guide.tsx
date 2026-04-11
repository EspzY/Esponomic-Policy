import type { PracticeGuide as PracticeGuideType, PracticeStepGuide, PracticeSupportMode } from "@/lib/types";

import { MathMarkdown } from "@/components/math-markdown";

export function PracticeGuide({
  guide,
  supportMode,
  stepGuide,
  handSolveNote,
}: {
  guide?: PracticeGuideType;
  supportMode: PracticeSupportMode;
  stepGuide?: PracticeStepGuide[];
  handSolveNote?: string;
}) {
  if (!guide) {
    return null;
  }

  return (
    <section className="surface-card rounded-[2rem] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rust)]">
        Solving guide
      </p>
      <h2 className="mt-3 text-2xl font-semibold">How to approach this question</h2>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.5rem] border border-[var(--color-line)] bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-teal)]">
            What this is
          </p>
          <p className="mt-2 text-lg font-semibold text-[var(--color-ink)]">
            {guide.problemType}
          </p>
          <MathMarkdown
            content={guide.whatIsBeingAsked}
            className="mt-3 text-sm leading-7 text-[var(--color-slate)]"
          />
        </div>
        <div className="rounded-[1.5rem] border border-[var(--color-line)] bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-teal)]">
            How to work on it
          </p>
          <p className="mt-2 text-lg font-semibold text-[var(--color-ink)]">
            {supportMode === "derivation" ? "Solve by hand first" : "Write and get feedback"}
          </p>
          <MathMarkdown
            content={
              supportMode === "derivation"
                ? handSolveNote ??
                  "This question is primarily a by-hand exercise. Use the stepwise help when you get stuck, and keep the main derivation on paper."
                : "Draft your answer in full sentences. The tutor should help you improve the reasoning, not just label it right or wrong."
            }
            className="mt-3 text-sm leading-7 text-[var(--color-slate)]"
          />
        </div>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <div className="rounded-[1.5rem] bg-[rgba(24,33,45,0.04)] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-rust)]">
            Key concepts
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-[var(--color-slate)]">
            {guide.keyConcepts.map((concept) => (
              <li key={concept} className="rounded-2xl bg-white px-4 py-3">
                <MathMarkdown content={concept} />
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[1.5rem] bg-[rgba(24,33,45,0.04)] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-rust)]">
            Safe order to solve it
          </p>
          <ol className="mt-3 space-y-2 text-sm leading-7 text-[var(--color-slate)]">
            {guide.solutionPath.map((item, index) => (
              <li key={item} className="rounded-2xl bg-white px-4 py-3">
                <span className="font-semibold text-[var(--color-ink)]">{index + 1}.</span>{" "}
                <MathMarkdown content={item} className="inline-block" />
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-[1.5rem] bg-[rgba(180,83,9,0.06)] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-rust)]">
            Common mistakes
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-[var(--color-slate)]">
            {guide.commonMistakes.map((mistake) => (
              <li key={mistake} className="rounded-2xl bg-white px-4 py-3">
                <MathMarkdown content={mistake} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {supportMode === "derivation" && stepGuide?.length ? (
        <div className="mt-5 rounded-[1.5rem] border border-[rgba(15,118,110,0.16)] bg-[rgba(15,118,110,0.05)] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-teal)]">
            Stepwise help available
          </p>
          <p className="mt-2 text-sm leading-7 text-[var(--color-slate)]">
            The workspace below lets you reveal these steps progressively. Each step is meant to answer the questions a stuck student usually has: what to do next, why that move is the right one, what rule justifies it, and how that step fits the full derivation.
          </p>
        </div>
      ) : null}
    </section>
  );
}
