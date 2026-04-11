import Image from "next/image";

import type { ContentBlock } from "@/lib/types";

import { MathMarkdown } from "@/components/math-markdown";

function DisplayMath({ latex }: { latex: string }) {
  return <MathMarkdown content={`$$${latex}$$`} className="text-[var(--color-ink)]" />;
}

export function ContentBlocks({
  blocks,
}: {
  blocks: ContentBlock[];
}) {
  return (
    <div className="space-y-5">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        if (block.type === "paragraph") {
          return (
            <MathMarkdown
              key={key}
              content={block.markdown}
              className="text-sm leading-8 text-[var(--color-ink)]"
            />
          );
        }

        if (block.type === "equation") {
          return (
            <div
              key={key}
              className="rounded-[1.5rem] border border-[var(--color-line)] bg-white p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-teal)]">
                {block.label}
              </p>
              <div className="mt-3 overflow-x-auto">
                <DisplayMath latex={block.latex} />
              </div>
              <MathMarkdown
                content={block.explanation}
                className="mt-3 text-sm leading-7 text-[var(--color-slate)]"
              />
            </div>
          );
        }

        if (block.type === "derivation_step") {
          return (
            <div
              key={key}
              className="rounded-[1.5rem] border border-[rgba(15,118,110,0.18)] bg-[rgba(15,118,110,0.05)] p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-teal)]">
                Derivation step
              </p>
              <h3 className="mt-2 text-lg font-semibold">{block.title}</h3>
              <MathMarkdown
                content={`**Learning goal:** ${block.learningGoal}`}
                className="mt-3 text-sm leading-7 text-[var(--color-ink)]"
              />
              {block.latexBefore ? (
                <div className="mt-4 rounded-[1.25rem] border border-[var(--color-line)] bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-slate)]">
                    Starting expression
                  </p>
                  <DisplayMath latex={block.latexBefore} />
                </div>
              ) : null}
              <div className="mt-4 rounded-[1.25rem] border border-[var(--color-line)] bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-slate)]">
                  Expression after this step
                </p>
                <DisplayMath latex={block.latexAfter} />
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-[1.25rem] bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-rust)]">
                    What we are doing now
                  </p>
                  <MathMarkdown
                    content={block.operation}
                    className="mt-2 text-sm leading-7 text-[var(--color-ink)]"
                  />
                </div>
                <div className="rounded-[1.25rem] bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-rust)]">
                    Why it is valid
                  </p>
                  <MathMarkdown
                    content={block.whyValid}
                    className="mt-2 text-sm leading-7 text-[var(--color-ink)]"
                  />
                </div>
              </div>
              <MathMarkdown
                content={block.explanation}
                className="mt-4 text-sm leading-7 text-[var(--color-slate)]"
              />
            </div>
          );
        }

        if (block.type === "model_map") {
          return (
            <div key={key} className="space-y-3">
              <h3 className="text-lg font-semibold">{block.title}</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {block.items.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.5rem] border border-[var(--color-line)] bg-white p-4"
                  >
                    <MathMarkdown
                      content={item.label}
                      className="text-sm font-semibold text-[var(--color-ink)]"
                    />
                    <MathMarkdown
                      content={item.description}
                      className="mt-2 text-sm leading-7 text-[var(--color-slate)]"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        }

        if (block.type === "shock_trace") {
          return (
            <div
              key={key}
              className="rounded-[1.5rem] border border-[rgba(188,141,47,0.22)] bg-[rgba(188,141,47,0.07)] p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-rust)]">
                Shock analysis
              </p>
              <h3 className="mt-2 text-lg font-semibold">{block.title}</h3>
              <MathMarkdown
                content={`**Shock:** ${block.shock}`}
                className="mt-3 text-sm leading-7 text-[var(--color-ink)]"
              />
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {block.steps.map((step) => (
                  <div key={step.variable} className="rounded-[1.25rem] bg-white p-4">
                    <MathMarkdown
                      content={step.variable}
                      className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-slate)]"
                    />
                    <p className="mt-2 text-lg font-semibold text-[var(--color-ink)]">
                      {step.direction}
                    </p>
                    <MathMarkdown
                      content={step.explanation}
                      className="mt-2 text-sm leading-7 text-[var(--color-slate)]"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        }

        if (block.type === "worked_example") {
          return (
            <div
              key={key}
              className="rounded-[1.5rem] border border-[var(--color-line)] bg-[rgba(24,33,45,0.03)] p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-rust)]">
                Guided example
              </p>
              <h3 className="mt-2 text-lg font-semibold">{block.title}</h3>
              <MathMarkdown
                content={block.prompt}
                className="mt-3 text-sm leading-7 text-[var(--color-ink)]"
              />
              <div className="mt-4 space-y-3">
                {block.steps.map((step) => (
                  <div
                    key={step.title}
                    className="rounded-[1.25rem] border border-[var(--color-line)] bg-white p-4"
                  >
                    <p className="text-sm font-semibold text-[var(--color-ink)]">
                      {step.title}
                    </p>
                    <MathMarkdown
                      content={step.markdown}
                      className="mt-2 text-sm leading-7 text-[var(--color-slate)]"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        }

        if (block.type === "figure") {
          return (
            <div
              key={key}
              className="rounded-[1.5rem] border border-dashed border-[var(--color-line)] bg-white p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-slate)]">
                Figure
              </p>
              <h3 className="mt-2 text-lg font-semibold">{block.title}</h3>
              {block.imagePath ? (
                <div className="mt-4 overflow-hidden rounded-[1.25rem] border border-[var(--color-line)] bg-[var(--color-paper)]">
                  <Image
                    src={block.imagePath}
                    alt={block.altText ?? block.title}
                    width={756}
                    height={567}
                    className="h-auto w-full"
                  />
                </div>
              ) : null}
              <MathMarkdown
                content={block.caption}
                className="mt-3 text-sm leading-7 text-[var(--color-slate)]"
              />
              {block.note ? (
                <MathMarkdown
                  content={block.note}
                  className="mt-3 text-sm leading-7 text-[var(--color-rust)]"
                />
              ) : null}
            </div>
          );
        }

        if (block.type === "checklist") {
          return (
            <div key={key} className="rounded-[1.5rem] bg-[rgba(24,33,45,0.04)] p-5">
              {block.title ? <h3 className="text-lg font-semibold">{block.title}</h3> : null}
              <ul className="mt-3 space-y-2 text-sm leading-7 text-[var(--color-slate)]">
                {block.items.map((item) => (
                  <li key={item} className="rounded-2xl bg-white px-4 py-3">
                    <MathMarkdown content={item} />
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        return (
          <div
            key={key}
            className="rounded-[1.5rem] border border-[rgba(180,83,9,0.24)] bg-[rgba(180,83,9,0.06)] p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-rust)]">
              Exam trap
            </p>
            <h3 className="mt-2 text-lg font-semibold">{block.title}</h3>
            <MathMarkdown
              content={`**Trap:** ${block.trap}`}
              className="mt-3 text-sm leading-7 text-[var(--color-ink)]"
            />
            <MathMarkdown
              content={`**Fix:** ${block.correction}`}
              className="mt-3 text-sm leading-7 text-[var(--color-slate)]"
            />
          </div>
        );
      })}
    </div>
  );
}
