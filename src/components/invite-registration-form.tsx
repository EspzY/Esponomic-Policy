"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function InviteRegistrationForm({
  token,
  email,
  fullName,
}: {
  token: string;
  email: string;
  fullName: string;
}) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("/api/auth/invite-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      const payload = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        setStatus(payload.error ?? "Registration failed.");
        return;
      }

      setStatus(payload.message ?? "Account created. Please sign in.");
      router.push("/?registered=1");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="surface-card rounded-[2rem] p-6">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rust)]">
        Invite accepted
      </p>
      <h2 className="text-2xl font-semibold">Create your account</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.5rem] border border-[var(--color-line)] bg-white px-4 py-3">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-slate)]">
            Invited student
          </p>
          <p className="mt-1 font-medium">{fullName}</p>
        </div>
        <div className="rounded-[1.5rem] border border-[var(--color-line)] bg-white px-4 py-3">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-slate)]">
            Email
          </p>
          <p className="mt-1 font-medium">{email}</p>
        </div>
      </div>
      <label className="mt-5 block text-sm font-medium text-[var(--color-ink)]">
        Set a password
      </label>
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="mt-2 w-full rounded-[1.5rem] border border-[var(--color-line)] bg-white px-4 py-3 outline-none transition focus:border-[var(--color-teal)]"
      />
      <button
        onClick={submit}
        disabled={password.length < 8 || loading}
        className="mt-4 rounded-full bg-[var(--color-ink)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-teal)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Creating account..." : "Create account"}
      </button>
      {status ? (
        <p className="mt-4 text-sm text-[var(--color-rust)]">{status}</p>
      ) : null}
    </div>
  );
}
