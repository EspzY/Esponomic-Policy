import { PracticeCollectionCard } from "@/components/practice-collection-card";
import { requireViewer } from "@/lib/auth";
import { getPracticeCollections, getPracticeProblems } from "@/lib/repository";
import type { PracticeCollection, PracticeProblem } from "@/lib/types";

function sectionCopy(kind: PracticeCollection["kind"]) {
  if (kind === "seminar_problem_set") {
    return {
      eyebrow: "Seminar / problem sets",
      title: "Solve the course sheets in order",
      description:
        "Choose a seminar set and move through it one prompt at a time.",
    };
  }

  if (kind === "past_exam") {
    return {
      eyebrow: "Past exams",
      title: "Work through real exam sources",
      description:
        "Open one exam source and solve it as a focused session instead of jumping between disconnected pages.",
    };
  }

  return {
    eyebrow: "Lecture-linked practice",
    title: "Rehearse one lecture at a time",
    description:
      "These are the quickest sets to run right after a lecture, while the benchmark is still fresh.",
  };
}

function categoryCard({
  title,
  description,
  count,
}: {
  title: string;
  description: string;
  count: number;
}) {
  return (
    <div className="surface-card rounded-[2rem] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rust)]">
        Practice lane
      </p>
      <h2 className="mt-3 text-2xl font-semibold">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">{description}</p>
      <p className="mt-4 text-sm font-medium text-[var(--color-ink)]">
        {count} source group{count === 1 ? "" : "s"}
      </p>
    </div>
  );
}

export default async function PracticePage() {
  await requireViewer();

  const [collections, problems] = await Promise.all([
    getPracticeCollections(),
    getPracticeProblems(),
  ]);

  const problemsBySlug = new Map(problems.map((problem) => [problem.slug, problem]));
  const groupedCollections = collections.reduce(
    (accumulator, collection) => {
      accumulator[collection.kind].push(collection);
      return accumulator;
    },
    {
      seminar_problem_set: [] as PracticeCollection[],
      past_exam: [] as PracticeCollection[],
      lecture_linked: [] as PracticeCollection[],
    },
  );

  return (
    <main className="space-y-8">
      <section className="surface-card rounded-[2.25rem] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-rust)]">
          Practice system
        </p>
        <h1 className="mt-3 max-w-4xl text-4xl font-semibold">Choose a source and start solving</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-slate)]">
          Pick one seminar set, one exam, or one lecture-linked source. Each source opens as a calm step-by-step session with one question or subquestion visible at a time.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {categoryCard({
          title: "Seminar / problem sets",
          description:
            "Best when you want guided repetition of the seminar reasoning patterns.",
          count: groupedCollections.seminar_problem_set.length,
        })}
        {categoryCard({
          title: "Past exams",
          description:
            "Best when you want to sit down with a real exam source and work through it in sequence.",
          count: groupedCollections.past_exam.length,
        })}
        {categoryCard({
          title: "Lecture-linked practice",
          description:
            "Best when you want one short source tied directly to the lecture you just studied.",
          count: groupedCollections.lecture_linked.length,
        })}
      </section>

      {(
        [
          "seminar_problem_set",
          "past_exam",
          "lecture_linked",
        ] as PracticeCollection["kind"][]
      ).map((kind) => {
        const copy = sectionCopy(kind);
        const sectionCollections = groupedCollections[kind];

        return (
          <section key={kind} className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-rust)]">
                {copy.eyebrow}
              </p>
              <h2 className="text-3xl font-semibold">{copy.title}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--color-slate)]">
                {copy.description}
              </p>
            </div>
            <div className="space-y-4">
              {sectionCollections.map((collection) => (
                <PracticeCollectionCard
                  key={collection.slug}
                  collection={collection}
                  problems={collection.problemSlugs
                    .map((slug) => problemsBySlug.get(slug))
                    .filter((problem): problem is PracticeProblem => Boolean(problem))}
                />
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
