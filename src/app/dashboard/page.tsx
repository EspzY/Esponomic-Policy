import { ModuleCard } from "@/components/module-card";
import { requireViewer } from "@/lib/auth";
import { getCourseModules, getProgressSnapshots } from "@/lib/repository";

export default async function DashboardPage() {
  const viewer = await requireViewer();
  const [modules, progress] = await Promise.all([
    getCourseModules(),
    getProgressSnapshots(viewer.demoMode ? undefined : viewer.id),
  ]);

  const progressMap = new Map(progress.map((item) => [item.moduleSlug, item]));
  const completed = progress.filter((item) => item.status === "completed").length;
  const completionRate = Math.round((completed / Math.max(modules.length, 1)) * 100);
  const reviewTags = [...new Set(progress.flatMap((item) => item.weakTags))];

  return (
    <main className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="surface-card rounded-[2.25rem] p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-rust)]">
            Welcome back
          </p>
          <h1 className="mt-3 text-4xl font-semibold">
            {viewer.demoMode ? "Demo dashboard" : `Study plan for ${viewer.fullName}`}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--color-slate)]">
            The dashboard combines section completion, quiz performance, and weak tags so students know what to revisit instead of stopping at a raw score.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="surface-card rounded-[2rem] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-teal)]">
              Progress
            </p>
            <p className="mt-3 text-4xl font-semibold">{completionRate}%</p>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-[rgba(24,33,45,0.08)]">
              <div
                className="h-full rounded-full bg-[var(--color-teal)]"
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-[var(--color-slate)]">
              {completed} of {modules.length} modules complete
            </p>
          </div>
          <div className="surface-card rounded-[2rem] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rust)]">
              Review next
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {reviewTags.length ? (
                reviewTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[rgba(188,141,47,0.16)] px-3 py-1 text-xs font-medium text-[var(--color-rust)]"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-sm text-[var(--color-slate)]">
                  No weak tags yet.
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-rust)]">
            Modules
          </p>
          <h2 className="text-3xl font-semibold">Current study path</h2>
        </div>
        <div className="section-grid">
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              progress={progressMap.get(module.slug)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
