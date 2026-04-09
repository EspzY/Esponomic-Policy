import { AdminUploadsClient } from "@/components/admin-uploads-client";
import { requireAdminViewer } from "@/lib/auth";

export default async function AdminUploadsPage() {
  await requireAdminViewer();

  return (
    <main className="space-y-6">
      <section className="surface-card rounded-[2.25rem] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rust)]">
          Admin
        </p>
        <h1 className="mt-3 text-4xl font-semibold">Upload and process PDFs</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-slate)]">
          This flow stores PDFs in private Supabase Storage, writes document metadata, and then extracts text chunks and candidate symbols for review.
        </p>
      </section>
      <AdminUploadsClient />
    </main>
  );
}
