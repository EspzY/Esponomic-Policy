import { notFound, redirect } from "next/navigation";

import { requireViewer } from "@/lib/auth";
import { getPracticeProblemParts, getPracticeProblemSessionHref } from "@/lib/practice-session";
import { getPracticeProblemBySlug } from "@/lib/repository";

export default async function PracticeProblemPage({
  params,
}: {
  params: Promise<{ problemSlug: string }>;
}) {
  await requireViewer();
  const { problemSlug } = await params;
  const problem = await getPracticeProblemBySlug(problemSlug);

  if (!problem) {
    notFound();
  }

  const firstPart = getPracticeProblemParts(problem).parts[0];

  redirect(
    getPracticeProblemSessionHref(problem, firstPart?.id && firstPart.id !== "main" ? firstPart.id : undefined),
  );
}
