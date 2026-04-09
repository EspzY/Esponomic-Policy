import Link from "next/link";
import { redirect } from "next/navigation";

import { loginAction } from "@/app/actions";
import { ModuleCard } from "@/components/module-card";
import { buttonClasses } from "@/components/ui/button";
import { getViewer } from "@/lib/auth";
import {
  demoPracticeProblems,
  demoQuizItemsByModule,
} from "@/lib/course-content";
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

  const lectureCount = modules.filter((module) => module.kind === "lecture").length;
  const totalQuizQuestions = Object.values(demoQuizItemsByModule).reduce(
    (sum, items) => sum + items.length,
    0,
  );

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
            The platform now follows one production standard across the course: math-first rendering, source-grounded explanations, lecture-specific glossaries, guided practice, and quizzes that test understanding instead of rote recall. Start from Module 1 if you need notation first, or go lecture by lecture if you want the full red thread through the course.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border border-[var(--color-line)] bg-white px-4 py-4">
              <p className="text-2xl font-semibold">{lectureCount}</p>
              <p className="mt-2 text-sm text-[var(--color-slate)]">
                lecture modules built with the Lecture 2 teaching method
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-[var(--color-line)] bg-white px-4 py-4">
              <p className="text-2xl font-semibold">{demoPracticeProblems.length}</p>
              <p className="mt-2 text-sm text-[var(--color-slate)]">
                guided practice problems across the course
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-[var(--color-line)] bg-white px-4 py-4">
              <p className="text-2xl font-semibold">{totalQuizQuestions}</p>
              <p className="mt-2 text-sm text-[var(--color-slate)]">
                concept questions in the current quiz bank
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className={buttonClasses("primary")}
            >
              Open the study dashboard
            </Link>
            <Link
              href="/modules/symbols"
              className={buttonClasses("outline")}
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
            <button className={buttonClasses("primary", "md", "w-full")}>
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
            <h2 className="text-3xl font-semibold">Current study path</h2>
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
