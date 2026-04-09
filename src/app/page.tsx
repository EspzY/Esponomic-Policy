import Link from "next/link";
import { redirect } from "next/navigation";

import { loginAction } from "@/app/actions";
import { ModuleCard } from "@/components/module-card";
import { getViewer } from "@/lib/auth";
import { getCourseModules } from "@/lib/repository";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; registered?: string }>;
}) {
  const [viewer, modules, params] = await Promise.all([
    getViewer(),
    getCourseModules(),
    searchParams,
  ]);

  if (viewer && !viewer.demoMode) {
    redirect("/dashboard");
  }

  return (
    <main className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.35fr_0.9fr]">
        <div className="surface-card rounded-[2.25rem] p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-rust)]">
            DataCamp-inspired, source-based learning
          </p>
          <h1 className="mt-3 max-w-3xl text-5xl font-semibold leading-tight">
            Learn Economic Policy without skipping the reasoning.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-slate)]">
            This v1 is built around verified lecture material, stepwise tutoring, and progress you can actually use. The first release focuses on the global symbol register, Lecture 2, a source-grounded tutor, and a concept quiz that favors understanding over rote recall.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border border-[var(--color-line)] bg-white px-4 py-4">
              <p className="text-2xl font-semibold">1</p>
              <p className="mt-2 text-sm text-[var(--color-slate)]">
                verified symbol register
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-[var(--color-line)] bg-white px-4 py-4">
              <p className="text-2xl font-semibold">1</p>
              <p className="mt-2 text-sm text-[var(--color-slate)]">
                full lecture module with tutor
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-[var(--color-line)] bg-white px-4 py-4">
              <p className="text-2xl font-semibold">3</p>
              <p className="mt-2 text-sm text-[var(--color-slate)]">
                concept questions in the first quiz
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="rounded-full bg-[var(--color-ink)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-teal)]"
            >
              Explore the v1 demo
            </Link>
            <Link
              href="/modules/symbols"
              className="rounded-full border border-[var(--color-line)] px-5 py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-teal)] hover:text-[var(--color-teal)]"
            >
              Open Module 1
            </Link>
          </div>
        </div>

        <section id="login" className="surface-card rounded-[2.25rem] p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-teal)]">
            Invite-only access
          </p>
          <h2 className="mt-3 text-3xl font-semibold">Sign in</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">
            Registration is only available from a personal invite link. After your account exists, sign in here with your course email and password.
          </p>
          <form action={loginAction} className="mt-6 space-y-3">
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-[1.5rem] border border-[var(--color-line)] bg-white px-4 py-3"
            />
            <input
              name="password"
              type="password"
              placeholder="Your password"
              className="w-full rounded-[1.5rem] border border-[var(--color-line)] bg-white px-4 py-3"
            />
            <button className="w-full rounded-full bg-[var(--color-ink)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-teal)]">
              Continue to dashboard
            </button>
          </form>
          {params.registered ? (
            <p className="mt-4 text-sm text-[var(--color-teal)]">
              Your account was created. Please sign in.
            </p>
          ) : null}
          {params.error ? (
            <p className="mt-4 text-sm text-[var(--color-rust)]">{params.error}</p>
          ) : null}
          {viewer?.demoMode ? (
            <p className="mt-4 text-sm text-[var(--color-slate)]">
              Demo mode is active locally, so the dashboard and admin pages remain explorable even before environment variables are configured.
            </p>
          ) : null}
        </section>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-rust)]">
              Current release
            </p>
            <h2 className="text-3xl font-semibold">What ships in v1</h2>
          </div>
          <Link
            href="/dashboard"
            className="text-sm font-semibold text-[var(--color-teal)]"
          >
            Open full dashboard
          </Link>
        </div>
        <div className="section-grid">
          {modules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </section>
    </main>
  );
}
