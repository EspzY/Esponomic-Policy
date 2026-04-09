import { notFound } from "next/navigation";

import { InviteRegistrationForm } from "@/components/invite-registration-form";
import { hashInviteToken } from "@/lib/auth";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/env";

export default async function InvitePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  if (!isSupabaseConfigured()) {
    return (
      <main className="space-y-6">
        <section className="surface-card rounded-[2.25rem] p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rust)]">
            Demo invite
          </p>
          <h1 className="mt-3 text-4xl font-semibold">Invite registration preview</h1>
          <p className="mt-4 text-base leading-8 text-[var(--color-slate)]">
            Supabase is not configured yet, so this route shows the real UI but cannot create a persistent account.
          </p>
        </section>
        <InviteRegistrationForm
          token={token}
          email="student@example.com"
          fullName="Invited Student"
        />
      </main>
    );
  }

  const admin = createAdminSupabaseClient();
  const tokenHash = hashInviteToken(token);
  const { data: invite } = await admin!
    .from("invites")
    .select("*")
    .eq("token_hash", tokenHash)
    .maybeSingle();

  if (!invite || invite.status !== "pending") {
    notFound();
  }

  return (
    <main className="space-y-6">
      <section className="surface-card rounded-[2.25rem] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-rust)]">
          Invite-only registration
        </p>
        <h1 className="mt-3 text-4xl font-semibold">Your invite is valid</h1>
        <p className="mt-4 text-base leading-8 text-[var(--color-slate)]">
          Finish account creation here. This route checks the token server-side before allowing the registration request.
        </p>
      </section>
      <InviteRegistrationForm
        token={token}
        email={invite.email}
        fullName={invite.full_name}
      />
    </main>
  );
}
