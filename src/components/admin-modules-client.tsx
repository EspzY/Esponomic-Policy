"use client";

import { useState } from "react";

import { buttonClasses } from "@/components/ui/button";
import type { ModuleSummary } from "@/lib/types";

export function AdminModulesClient({
  modules,
  demoMode,
}: {
  modules: ModuleSummary[];
  demoMode: boolean;
}) {
  const [message, setMessage] = useState<string | null>(null);

  async function publish(moduleSlug: string) {
    const response = await fetch("/api/admin/publish-module", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ moduleSlug }),
    });

    const payload = (await response.json()) as { message?: string; error?: string };
    setMessage(payload.message ?? payload.error ?? "Done.");
  }

  return (
    <div className="space-y-6">
      {demoMode ? (
        <div className="rounded-[1.5rem] border border-[var(--color-line)] bg-[rgba(188,141,47,0.12)] px-4 py-3 text-sm text-[var(--color-rust)]">
          Demo mode is active. Publishing is simulated until Supabase is configured.
        </div>
      ) : null}
      <section className="surface-card rounded-[2rem] p-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rust)]">
          Curation workflow
        </p>
        <h2 className="text-2xl font-semibold">Seed or publish curated modules</h2>
        <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">
          This route pushes the curated v1 content for the symbol register and Lecture 2 into the database tables, so runtime pages can stop relying on local fallback data.
        </p>
        {message ? (
          <p className="mt-4 text-sm text-[var(--color-teal)]">{message}</p>
        ) : null}
      </section>
      <div className="grid gap-4">
        {modules.map((module) => (
          <article key={module.id} className="surface-card rounded-[2rem] p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold">{module.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-slate)]">
                  {module.description}
                </p>
              </div>
              <button
                onClick={() => publish(module.slug)}
                className={buttonClasses("primary", "sm")}
              >
                Publish {module.slug}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
