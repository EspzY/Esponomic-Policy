import { QuizClient } from "@/components/quiz-client";
import { requireViewer } from "@/lib/auth";
import { getModuleBySlug, getQuizItems } from "@/lib/repository";

export default async function ModuleQuizPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requireViewer();
  const { slug } = await params;
  const [module, items] = await Promise.all([getModuleBySlug(slug), getQuizItems(slug)]);

  return (
    <main className="space-y-8">
      <section className="surface-card rounded-[2.25rem] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rust)]">
          Quiz
        </p>
        <h1 className="mt-3 text-4xl font-semibold">{module?.title} quiz</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-slate)]">
          Each explanation is stored with the question instead of being generated on the fly, so the runtime quiz stays stable and reviewable.
        </p>
      </section>
      <QuizClient moduleSlug={slug} items={items} />
    </main>
  );
}
