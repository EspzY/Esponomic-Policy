import { redirect } from "next/navigation";

import { RegisterForm } from "@/components/register-form";
import { getViewer } from "@/lib/auth";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const [viewer, params] = await Promise.all([getViewer(), searchParams]);

  if (viewer && !viewer.demoMode) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-[calc(100vh-12rem)] items-center justify-center">
      <div className="w-full max-w-xl">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-teal)]">
            Economic Policy course platform
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--color-slate)]">
            Create a student account with your email, password, and nickname. After that you can sign in from the front page.
          </p>
        </div>
        <RegisterForm error={params.error} />
      </div>
    </main>
  );
}
