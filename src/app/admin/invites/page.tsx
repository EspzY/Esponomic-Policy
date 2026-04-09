import { AdminInvitesClient } from "@/components/admin-invites-client";
import { requireAdminViewer } from "@/lib/auth";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export default async function AdminInvitesPage() {
  const viewer = await requireAdminViewer();
  const admin = createAdminSupabaseClient();
  const response = admin
    ? await admin.from("invites").select("*").order("created_at", {
        ascending: false,
      })
    : { data: [] };

  const invites =
    response.data?.map((invite) => ({
      id: String(invite.id),
      email: String(invite.email),
      fullName: String(invite.full_name),
      cohort: String(invite.cohort ?? ""),
      expiresAt: String(invite.expires_at ?? ""),
      usedAt: invite.accepted_at ? String(invite.accepted_at) : null,
      status: invite.status,
    })) ?? [];

  return (
    <main className="space-y-6">
      <section className="surface-card rounded-[2.25rem] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rust)]">
          Admin
        </p>
        <h1 className="mt-3 text-4xl font-semibold">Invites and password recovery</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-slate)]">
          Generate individual invite tokens for the cohort and issue recovery links manually when needed, without relying on a paid email campaign.
        </p>
      </section>
      <AdminInvitesClient invites={invites} demoMode={viewer.demoMode} />
    </main>
  );
}
