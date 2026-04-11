import { notFound } from "next/navigation";

import { PracticeSessionView } from "@/components/practice-session-view";
import { requireViewer } from "@/lib/auth";
import { buildPracticeSession } from "@/lib/practice-session";
import { getPracticeCollections, getPracticeProblems } from "@/lib/repository";

export default async function PracticeSourcePage({
  params,
  searchParams,
}: {
  params: Promise<{ collectionSlug: string }>;
  searchParams: Promise<{ question?: string; part?: string }>;
}) {
  await requireViewer();

  const [{ collectionSlug }, resolvedSearchParams, collections, problems] = await Promise.all([
    params,
    searchParams,
    getPracticeCollections(),
    getPracticeProblems(),
  ]);

  const collection = collections.find((item) => item.slug === collectionSlug);

  if (!collection) {
    notFound();
  }

  const session = buildPracticeSession(collection, problems);

  return (
    <main>
      <PracticeSessionView
        session={session}
        initialQuestionSlug={resolvedSearchParams.question}
        initialPartId={resolvedSearchParams.part}
      />
    </main>
  );
}
