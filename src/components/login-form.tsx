"use client";

import Link from "next/link";
import { useState } from "react";

import { loginAction } from "@/app/actions";
import { buttonClasses } from "@/components/ui/button";

const REMEMBERED_EMAIL_KEY = "economic-policy-remembered-email";

export function LoginForm({
  error,
  registered,
}: {
  error?: string;
  registered?: boolean;
}) {
  const [email, setEmail] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }

    return window.localStorage.getItem(REMEMBERED_EMAIL_KEY) ?? "";
  });
  const [rememberMe, setRememberMe] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return Boolean(window.localStorage.getItem(REMEMBERED_EMAIL_KEY));
  });

  function handleSubmit() {
    if (rememberMe && email.trim()) {
      window.localStorage.setItem(REMEMBERED_EMAIL_KEY, email.trim());
      return;
    }

    window.localStorage.removeItem(REMEMBERED_EMAIL_KEY);
  }

  return (
    <section className="surface-card w-full max-w-xl rounded-[2.5rem] p-8 sm:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-rust)]">
        Student sign in
      </p>
      <h1 className="mt-3 text-4xl font-semibold">Log in to Economic Policy</h1>
      <p className="mt-4 text-sm leading-7 text-[var(--color-slate)]">
        Use your course email and password to continue. If you tick remember me, this device will keep your email filled in next time.
      </p>
      <form action={loginAction} onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--color-ink)]">
            Email
          </label>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
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
            autoComplete="current-password"
            required
            placeholder="Your password"
            className="w-full rounded-[1.5rem] border border-[var(--color-line)] bg-white px-4 py-3 outline-none transition focus:border-[var(--color-teal)]"
          />
        </div>
        <label className="flex items-center gap-3 rounded-[1.25rem] border border-[var(--color-line)] bg-white px-4 py-3 text-sm text-[var(--color-ink)]">
          <input
            name="rememberMe"
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
          />
          Remember me on this device
        </label>
        <button className={buttonClasses("primary", "md", "w-full")}>
          Log in
        </button>
      </form>
      <div className="mt-5 space-y-3">
        <Link href="/register" className={buttonClasses("secondary", "md", "w-full")}>
          Register
        </Link>
        <p className="text-center text-sm text-[var(--color-slate)]">
          If you already have a personal invite link, open that link directly to finish invite-based registration.
        </p>
      </div>
      {registered ? (
        <p className="mt-4 text-sm text-[var(--color-teal)]">
          Account created. You can sign in now.
        </p>
      ) : null}
      {error ? (
        <p className="mt-4 text-sm text-[var(--color-rust)]">{error}</p>
      ) : null}
    </section>
  );
}
