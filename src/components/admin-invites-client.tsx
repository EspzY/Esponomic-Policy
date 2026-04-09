"use client";

import { useState } from "react";

import type { InvitePreview } from "@/lib/types";

type InviteResult = {
  invite?: {
    inviteUrl: string;
    email: string;
  };
  recoveryUrl?: string;
  error?: string;
};

export function AdminInvitesClient({
  invites,
  demoMode,
}: {
  invites: InvitePreview[];
  demoMode: boolean;
}) {
  const [inviteResult, setInviteResult] = useState<InviteResult | null>(null);
  const [recoveryResult, setRecoveryResult] = useState<InviteResult | null>(null);

  async function createInvite(formData: FormData) {
    const response = await fetch("/api/admin/create-invite", {
      method: "POST",
      body: formData,
    });

    setInviteResult((await response.json()) as InviteResult);
  }

  async function generateRecovery(formData: FormData) {
    const response = await fetch("/api/admin/generate-recovery-link", {
      method: "POST",
      body: formData,
    });

    setRecoveryResult((await response.json()) as InviteResult);
  }

  return (
    <div className="space-y-6">
      {demoMode ? (
        <div className="rounded-[1.5rem] border border-[var(--color-line)] bg-[rgba(188,141,47,0.12)] px-4 py-3 text-sm text-[var(--color-rust)]">
          Demo mode is active. Invite generation is simulated until Supabase is configured.
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <form
          action={createInvite}
          className="surface-card rounded-[2rem] p-6"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rust)]">
            Create invite
          </p>
          <h2 className="text-2xl font-semibold">Issue a one-person token</h2>
          <div className="mt-4 space-y-3">
            <input
              name="fullName"
              placeholder="Student name"
              className="w-full rounded-[1.5rem] border border-[var(--color-line)] bg-white px-4 py-3"
            />
            <input
              name="email"
              type="email"
              placeholder="student@example.com"
              className="w-full rounded-[1.5rem] border border-[var(--color-line)] bg-white px-4 py-3"
            />
            <input
              name="cohort"
              placeholder="Spring 2026"
              defaultValue="Spring 2026"
              className="w-full rounded-[1.5rem] border border-[var(--color-line)] bg-white px-4 py-3"
            />
            <input
              name="expiresAt"
              type="date"
              className="w-full rounded-[1.5rem] border border-[var(--color-line)] bg-white px-4 py-3"
            />
          </div>
          <button className="mt-4 rounded-full bg-[var(--color-ink)] px-4 py-2 text-sm font-semibold text-white">
            Generate invite
          </button>
          {inviteResult?.invite ? (
            <div className="mt-4 rounded-[1.5rem] border border-[var(--color-line)] bg-white p-4 text-sm">
              <p className="font-medium text-[var(--color-ink)]">
                Invite created for {inviteResult.invite.email}
              </p>
              <p className="mt-2 break-all text-[var(--color-slate)]">
                {inviteResult.invite.inviteUrl}
              </p>
            </div>
          ) : null}
          {inviteResult?.error ? (
            <p className="mt-3 text-sm text-[var(--color-rust)]">{inviteResult.error}</p>
          ) : null}
        </form>

        <form
          action={generateRecovery}
          className="surface-card rounded-[2rem] p-6"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-teal)]">
            Password recovery
          </p>
          <h2 className="text-2xl font-semibold">Generate a reset link</h2>
          <input
            name="email"
            type="email"
            placeholder="student@example.com"
            className="mt-4 w-full rounded-[1.5rem] border border-[var(--color-line)] bg-white px-4 py-3"
          />
          <button className="mt-4 rounded-full bg-[var(--color-teal)] px-4 py-2 text-sm font-semibold text-white">
            Create recovery link
          </button>
          {recoveryResult?.recoveryUrl ? (
            <div className="mt-4 rounded-[1.5rem] border border-[var(--color-line)] bg-white p-4 text-sm text-[var(--color-slate)]">
              {recoveryResult.recoveryUrl}
            </div>
          ) : null}
          {recoveryResult?.error ? (
            <p className="mt-3 text-sm text-[var(--color-rust)]">
              {recoveryResult.error}
            </p>
          ) : null}
        </form>
      </div>

      <section className="surface-card rounded-[2rem] p-6">
        <h2 className="text-2xl font-semibold">Existing invites</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.16em] text-[var(--color-slate)]">
              <tr>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Cohort</th>
                <th className="px-3 py-2">Expires</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {invites.map((invite) => (
                <tr key={invite.id} className="border-t border-[var(--color-line)]">
                  <td className="px-3 py-3">{invite.email}</td>
                  <td className="px-3 py-3">{invite.cohort}</td>
                  <td className="px-3 py-3">{invite.expiresAt.slice(0, 10)}</td>
                  <td className="px-3 py-3">{invite.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
