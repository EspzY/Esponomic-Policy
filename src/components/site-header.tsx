import Link from "next/link";

import { getViewer } from "@/lib/auth";
import { logoutAction } from "@/app/actions";
import { buttonClasses } from "@/components/ui/button";

export async function SiteHeader() {
  const viewer = await getViewer();

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
          <nav className="hidden items-center gap-4 text-sm text-[var(--color-slate)] md:flex">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/modules/symbols">Module 1</Link>
            <Link href="/modules/lecture-2">Lecture 2</Link>
            <Link href="/practice/seminar-1-question-1">Practice</Link>
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
