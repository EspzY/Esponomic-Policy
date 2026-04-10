import { PracticeCollectionCard } from "@/components/practice-collection-card";
import { requireViewer } from "@/lib/auth";
import { getPracticeCollections, getPracticeProblems } from "@/lib/repository";
import type { PracticeCollection, PracticeProblem } from "@/lib/types";

function sectionCopy(kind: PracticeCollection["kind"]) {
  if (kind === "seminar_problem_set") {
    return {
      eyebrow: "Seminar / problem sets",
      title: "Work through the course sheets with structure",
      description:
        "These sets are ideal when you want practice that mirrors seminar discussion and the reasoning patterns the course expects you to build before the exam.",
    };
  }

  if (kind === "past_exam") {
    return {
      eyebrow: "Past exams",
      title: "Practice with real exam-level demands",
      description:
        "These are full exam questions organized so you can see the original task, understand what kind of answer is needed, and get the right kind of help.",
    };
  }

  return {
    eyebrow: "Lecture-linked practice",
    title: "Rehearse each lecture before you move on",
    description:
      "These shorter guided questions are attached directly to the modules and are the fastest way to lock in the benchmark logic after studying a lecture.",
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
        <h1 className="mt-3 max-w-4xl text-4xl font-semibold">
          Practice by source, not by chaos
        </h1>
        <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--color-slate)]">
          Choose between seminar sheets, past exams, and lecture-linked practice. Every question is organized around the original source, the kind of reasoning it demands, and the right kind of help for learning rather than shortcut hunting.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {categoryCard({
          title: "Seminar / problem sets",
          description:
            "Curated from the course sheets, with the original question structure preserved and study-oriented guidance on top.",
          count: groupedCollections.seminar_problem_set.length,
        })}
        {categoryCard({
          title: "Past exams",
          description:
            "Real exam questions with faithful wording, visuals where they matter, and support modes matched to the type of reasoning the task requires.",
          count: groupedCollections.past_exam.length,
        })}
        {categoryCard({
          title: "Lecture-linked practice",
          description:
            "Focused questions tied directly to the module you just studied, so you can rehearse the benchmark before stepping into seminar or exam material.",
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
