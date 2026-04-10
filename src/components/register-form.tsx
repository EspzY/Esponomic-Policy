import Link from "next/link";

import { registerAction } from "@/app/actions";
import { buttonClasses } from "@/components/ui/button";

export function RegisterForm({ error }: { error?: string }) {
  return (
    <section className="surface-card w-full max-w-xl rounded-[2.5rem] p-8 sm:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-teal)]">
        Student registration
      </p>
      <h1 className="mt-3 text-4xl font-semibold">Create your account</h1>
      <p className="mt-4 text-sm leading-7 text-[var(--color-slate)]">
        Register with your email, choose a password, and set the nickname you want shown in the course platform.
      </p>
      <form action={registerAction} className="mt-6 space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--color-ink)]">
            Email
          </label>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-[1.5rem] border border-[var(--color-line)] bg-white px-4 py-3 outline-none transition focus:border-[var(--color-teal)]"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--color-ink)]">
            Nickname
          </label>
          <input
            name="nickname"
            type="text"
            autoComplete="nickname"
            required
            placeholder="How you want your name to appear"
            className="w-full rounded-[1.5rem] border border-[var(--color-line)] bg-white px-4 py-3 outline-none transition focus:border-[var(--color-teal)]"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--color-ink)]">
            Password
          </label>
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
            placeholder="At least 8 characters"
            className="w-full rounded-[1.5rem] border border-[var(--color-line)] bg-white px-4 py-3 outline-none transition focus:border-[var(--color-teal)]"
          />
        </div>
        <button className={buttonClasses("primary", "md", "w-full")}>
          Register account
        </button>
      </form>
      <div className="mt-5">
        <Link href="/" className={buttonClasses("outline", "md", "w-full")}>
          Back to sign in
        </Link>
      </div>
      {error ? (
        <p className="mt-4 text-sm text-[var(--color-rust)]">{error}</p>
      ) : null}
    </section>
  );
}
