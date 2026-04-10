import Link from "next/link";

import { logoutAction } from "@/app/actions";
import { buttonClasses } from "@/components/ui/button";
import { getViewer } from "@/lib/auth";
import { getCourseModules } from "@/lib/repository";

export async function SiteHeader() {
  const [viewer, modules] = await Promise.all([getViewer(), getCourseModules()]);
  const lectures = modules.filter((module) => module.kind === "lecture");

  return (
    <header className="border-b border-[var(--color-line)] bg-white/75 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-ink)] text-sm font-semibold uppercase tracking-[0.2em] text-white">
              EP
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-rust)]">
                Invite-only course platform
              </p>
              <p className="text-lg font-semibold">Economic Policy</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-3 md:flex">
            <Link
              href="/dashboard"
              className={buttonClasses("outline", "sm")}
            >
              Dashboard
            </Link>
            <Link
              href="/modules/symbols"
              className={buttonClasses("outline", "sm")}
            >
              Module 1
            </Link>
            <details className="group relative">
              <summary
                className={`${buttonClasses("outline", "sm")} summary-reset cursor-pointer gap-2`}
              >
                Lectures
                <span className="text-xs transition group-open:rotate-180">▾</span>
              </summary>
              <div className="absolute left-0 top-[calc(100%+0.75rem)] z-30 min-w-72 rounded-[1.5rem] border border-[var(--color-line)] bg-[var(--color-paper)] p-3 shadow-[var(--shadow-card)]">
                <div className="grid gap-2">
                  {lectures.map((lecture) => (
                    <Link
                      key={lecture.id}
                      href={`/modules/${lecture.slug}`}
                      className="rounded-[1rem] px-4 py-3 text-sm font-medium text-[var(--color-ink)] transition hover:bg-[rgba(15,118,110,0.06)] hover:text-[var(--color-teal)]"
                    >
                      {lecture.title}
                    </Link>
                  ))}
                </div>
              </div>
            </details>
            <Link
              href="/practice/lecture-1-guided-policy-rule"
              className={buttonClasses("outline", "sm")}
            >
              Practice
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {viewer?.demoMode ? (
            <span className="rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rust)]">
              Demo mode
            </span>
          ) : null}

          {viewer ? (
            <>
              {viewer.role === "admin" ? (
                <Link
                  href="/admin/modules"
                  className={buttonClasses("outline", "sm")}
                >
                  Admin
                </Link>
              ) : null}
              <div className="hidden text-right text-sm md:block">
                <p className="font-medium text-[var(--color-ink)]">{viewer.fullName}</p>
                <p className="text-[var(--color-slate)]">{viewer.email}</p>
              </div>
              {!viewer.demoMode ? (
                <form action={logoutAction}>
                  <button className={buttonClasses("primary", "sm")}>
                    Sign out
                  </button>
                </form>
              ) : null}
            </>
          ) : (
            <Link
              href="/#login"
              className={buttonClasses("primary", "sm")}
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
