import { redirect } from "next/navigation";

import { LoginForm } from "@/components/login-form";
import { getViewer } from "@/lib/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; registered?: string }>;
}) {
  const [viewer, params] = await Promise.all([getViewer(), searchParams]);

  if (viewer && !viewer.demoMode) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-[calc(100vh-12rem)] items-center justify-center">
      <div className="w-full max-w-xl">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-rust)]">
            Economic Policy course platform
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">
            Shared links should land on a clean sign-in screen first. From there students can log in directly or create an account.
          </p>
        </div>
        <LoginForm
          error={params.error}
          registered={params.registered === "1"}
        />
        {viewer?.demoMode ? (
          <p className="mt-4 text-center text-sm text-[var(--color-slate)]">
            Demo mode is active locally, so the dashboard and admin pages remain explorable even before environment variables are configured.
          </p>
        ) : null}
      </div>
    </main>
  );
}
