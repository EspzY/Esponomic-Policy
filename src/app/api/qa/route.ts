import { NextResponse } from "next/server";

import { buildTutorAnswer, retrieveTutorSources } from "@/lib/ai";
import { getViewer } from "@/lib/auth";
import { enforceAiQuota, recordAiUsage } from "@/lib/progress";
import { getTutorSources } from "@/lib/repository";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const viewer = await getViewer();
    const body = (await request.json()) as {
      moduleSlug?: string;
      question?: string;
      mode?: "qa";
    };

    if (!body.moduleSlug || !body.question?.trim()) {
      return NextResponse.json(
        {
          error: "moduleSlug and question are required.",
        },
        { status: 400 },
      );
    }

    if (viewer && !viewer.demoMode) {
      const quota = await enforceAiQuota({
        userId: viewer.id,
        usageKind: "qa",
        limit: 30,
      });

      if (!quota.allowed) {
        return NextResponse.json(
          {
            error: "Daily Q&A quota reached for this user.",
          },
          { status: 429 },
        );
      }
    }

    const allSources = await getTutorSources(body.moduleSlug);
    const selectedSources = await retrieveTutorSources(body.question, allSources);
    const answer = await buildTutorAnswer("qa", body.question, selectedSources);

    if (viewer && !viewer.demoMode) {
      await recordAiUsage(viewer.id, "qa");

      const admin = createAdminSupabaseClient();
      const { data: thread } = await admin!.from("qa_threads").insert({
        user_id: viewer.id,
        module_slug: body.moduleSlug,
        title: body.question.slice(0, 100),
      }).select("id").single();

      if (thread) {
        await admin!.from("qa_messages").insert([
          {
            thread_id: thread.id,
            role: "user",
            mode: "qa",
            content_markdown: body.question,
          },
          {
            thread_id: thread.id,
            role: "assistant",
            mode: "qa",
            content_markdown: answer.answerMarkdown,
            citations: answer.citations,
            confidence_label: answer.confidenceLabel,
          },
        ]);
      }
    }

    return NextResponse.json(answer);
  } catch (error) {
    return NextResponse.json(
      {
        answerMarkdown:
          "The tutor request failed before a reliable answer could be produced.",
        confidenceLabel: "insufficient_evidence",
        citations: [],
        sourceSnippets: [],
        error: error instanceof Error ? error.message : "The tutor request failed.",
      },
      { status: 500 },
    );
  }
}
