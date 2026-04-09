import { AdminModulesClient } from "@/components/admin-modules-client";
import { requireAdminViewer } from "@/lib/auth";
import { getCourseModules } from "@/lib/repository";

export default async function AdminModulesPage() {
  const viewer = await requireAdminViewer();
  const modules = await getCourseModules();

  return (
    <main className="space-y-6">
      <section className="surface-card rounded-[2.25rem] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rust)]">
          Admin
        </p>
        <h1 className="mt-3 text-4xl font-semibold">Publish curated v1 content</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-slate)]">
          Push the curated Lecture 2 module, quiz, and symbol register into the live tables before you switch from fallback content to database-backed runtime reads.
        </p>
      </section>
      <AdminModulesClient modules={modules} demoMode={viewer.demoMode} />
    </main>
  );
}
