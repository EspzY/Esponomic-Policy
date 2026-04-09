import { NextResponse } from "next/server";

import { buildTutorAnswer, retrieveTutorSources } from "@/lib/ai";
import { getViewer } from "@/lib/auth";
import { enforceAiQuota, recordAiUsage } from "@/lib/progress";
import { getPracticeProblemBySlug, getTutorSources } from "@/lib/repository";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const viewer = await getViewer();
  const body = (await request.json()) as {
    mode?: "hint" | "next_step" | "solution_check" | "full_solution";
    moduleSlug?: string;
    problemSlug?: string;
    studentWork?: string;
  };

  if (!body.mode || !body.moduleSlug || !body.problemSlug) {
    return NextResponse.json(
      { error: "mode, moduleSlug, and problemSlug are required." },
      { status: 400 },
    );
  }

  const problem = await getPracticeProblemBySlug(body.problemSlug);

  if (!problem) {
    return NextResponse.json({ error: "Problem not found." }, { status: 404 });
  }

  const usageKind = body.mode === "full_solution" ? "full_solution" : "solution_check";
  const limit = body.mode === "full_solution" ? 10 : 15;

  if (viewer && !viewer.demoMode) {
    const quota = await enforceAiQuota({
      userId: viewer.id,
      usageKind,
      limit,
    });

    if (!quota.allowed) {
      return NextResponse.json(
        { error: `Daily quota reached for ${body.mode}.` },
        { status: 429 },
      );
    }
  }

  let answerPayload:
    | {
        answer: string;
        confidenceLabel: "grounded" | "partial" | "insufficient_evidence";
        citations: typeof problem.citations;
      }
    | undefined;

  if (body.mode === "hint") {
    answerPayload = {
      answer: problem.hints[0] ?? "No hint is currently stored for this problem.",
      confidenceLabel: "grounded",
      citations: problem.citations,
    };
  } else if (body.mode === "next_step") {
    answerPayload = {
      answer:
        problem.nextSteps[0] ?? "No next-step guidance is currently stored for this problem.",
      confidenceLabel: "grounded",
      citations: problem.citations,
    };
  } else if (body.mode === "full_solution") {
    answerPayload = {
      answer: problem.solutionOutline.join("\n\n"),
      confidenceLabel: "grounded",
      citations: problem.citations,
    };
  } else {
    const sources = await getTutorSources(body.moduleSlug);
    const selectedSources = await retrieveTutorSources(
      `${problem.title}\n${body.studentWork ?? ""}`,
      sources,
    );
    answerPayload = await buildTutorAnswer(
      "solution_check",
      `Problem: ${problem.title}\nStudent work:\n${body.studentWork ?? "(no work provided yet)"}`,
      selectedSources,
    );
  }

  if (viewer && !viewer.demoMode) {
    await recordAiUsage(viewer.id, usageKind);

    const admin = createAdminSupabaseClient();
    const { data: thread } = await admin!.from("qa_threads").insert({
      user_id: viewer.id,
      module_slug: body.moduleSlug,
      title: problem.title,
    }).select("id").single();

    if (thread) {
      await admin!.from("qa_messages").insert([
        {
          thread_id: thread.id,
          role: "user",
          mode: body.mode,
          content_markdown: body.studentWork ?? body.mode,
        },
        {
          thread_id: thread.id,
          role: "assistant",
          mode: body.mode,
          content_markdown: answerPayload.answer,
          citations: answerPayload.citations,
          confidence_label: answerPayload.confidenceLabel,
        },
      ]);
    }
  }

  return NextResponse.json(answerPayload);
}
