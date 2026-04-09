"use client";

import { useMemo, useState } from "react";

import type { QuizItem } from "@/lib/types";

type QuizResponse = {
  scorePct: number;
  weakTags: string[];
  answers: {
    questionId: string;
    correct: boolean;
    explanation: string;
  }[];
  error?: string;
};

export function QuizClient({
  items,
  moduleSlug,
}: {
  items: QuizItem[];
  moduleSlug: string;
}) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<QuizResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const completedCount = useMemo(
    () => Object.keys(answers).length,
    [answers],
  );

  async function handleSubmit() {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          moduleSlug,
          answers: items.map((item) => answers[item.id] ?? -1),
        }),
      });

      const payload = (await response.json()) as QuizResponse;
      setResult(payload);
    } finally {
      setLoading(false);
    }
  }

  if (!items.length) {
    return (
      <div className="surface-card rounded-[2rem] p-6 text-sm text-[var(--color-slate)]">
        No published quiz items yet for this module.
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <div className="surface-card rounded-[2rem] p-6">
        <div className="mb-2 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-rust)]">
              Concept quiz
            </p>
            <h2 className="text-2xl font-semibold">Check your understanding</h2>
          </div>
          <span className="rounded-full border border-[var(--color-line)] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[var(--color-slate)]">
            {completedCount}/{items.length} answered
          </span>
        </div>
        <p className="text-sm leading-7 text-[var(--color-slate)]">
          The module counts as completed once all sections are marked done and the best quiz score reaches at least 70%.
        </p>
      </div>

      {items.map((item, index) => (
        <article key={item.id} className="surface-card rounded-[2rem] p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rust)]">
            Question {index + 1}
          </p>
          <h3 className="text-lg font-semibold">{item.prompt}</h3>
          <div className="mt-4 space-y-3">
            {item.choices.map((choice, choiceIndex) => {
              const active = answers[item.id] === choiceIndex;

              return (
                <label
                  key={choice}
                  className={`flex cursor-pointer items-start gap-3 rounded-[1.5rem] border px-4 py-3 text-sm transition ${
                    active
                      ? "border-[var(--color-teal)] bg-[rgba(15,118,110,0.06)]"
                      : "border-[var(--color-line)] bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name={item.id}
                    checked={active}
                    onChange={() =>
                      setAnswers((current) => ({ ...current, [item.id]: choiceIndex }))
                    }
                    className="mt-1"
                  />
                  <span>{choice}</span>
                </label>
              );
            })}
          </div>
        </article>
      ))}

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={completedCount !== items.length || loading}
          className="rounded-full bg-[var(--color-ink)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-teal)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Scoring..." : "Submit quiz"}
        </button>
      </div>

      {result ? (
        <section className="surface-card rounded-[2rem] p-6">
          {result.error ? (
            <p className="text-sm text-[var(--color-rust)]">{result.error}</p>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[rgba(15,118,110,0.12)] px-3 py-1 text-sm font-semibold text-[var(--color-teal)]">
                  Score: {result.scorePct}%
                </span>
                {result.weakTags.length ? (
                  <span className="text-sm text-[var(--color-slate)]">
                    Review more: {result.weakTags.join(", ")}
                  </span>
                ) : null}
              </div>
              <div className="mt-4 space-y-3">
                {result.answers.map((answer, index) => (
                  <div
                    key={answer.questionId}
                    className="rounded-[1.5rem] border border-[var(--color-line)] bg-white p-4"
                  >
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-rust)]">
                      Question {index + 1}: {answer.correct ? "correct" : "review needed"}
                    </p>
                    <p className="text-sm leading-7 text-[var(--color-slate)]">
                      {answer.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      ) : null}
    </section>
  );
}
