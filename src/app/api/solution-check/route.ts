import { NextResponse } from "next/server";

import { buildTutorAnswer, retrieveTutorSources } from "@/lib/ai";
import { getViewer } from "@/lib/auth";
import { enforceAiQuota, recordAiUsage } from "@/lib/progress";
import { getPracticeProblemBySlug, getTutorSources } from "@/lib/repository";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
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
          answerMarkdown: string;
          confidenceLabel: "grounded" | "partial" | "insufficient_evidence";
          citations: typeof problem.citations;
          sourceSnippets: {
            title: string;
            excerpt: string;
            citations: typeof problem.citations;
          }[];
          error?: string;
        }
      | undefined;

    if (body.mode === "hint") {
      answerPayload = {
        answerMarkdown:
          problem.hints[0] ?? "No hint is currently stored for this problem.",
        confidenceLabel: "grounded",
        citations: problem.citations,
        sourceSnippets: [
          {
            title: problem.title,
            excerpt:
              "Stored hint from the curated practice workflow for this Seminar 1 problem.",
            citations: problem.citations,
          },
        ],
      };
    } else if (body.mode === "next_step") {
      answerPayload = {
        answerMarkdown:
          problem.nextSteps[0] ?? "No next-step guidance is currently stored for this problem.",
        confidenceLabel: "grounded",
        citations: problem.citations,
        sourceSnippets: [
          {
            title: problem.title,
            excerpt:
              "Stored next-step guidance from the curated practice workflow for this Seminar 1 problem.",
            citations: problem.citations,
          },
        ],
      };
    } else if (body.mode === "full_solution") {
      answerPayload = {
        answerMarkdown: problem.solutionOutline
          .map((step, index) => `${index + 1}. ${step}`)
          .join("\n\n"),
        confidenceLabel: "grounded",
        citations: problem.citations,
        sourceSnippets: [
          {
            title: problem.title,
            excerpt:
              "Stored full-solution outline from the curated practice workflow for this Seminar 1 problem.",
            citations: problem.citations,
          },
        ],
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
            content_markdown: answerPayload.answerMarkdown,
            citations: answerPayload.citations,
            confidence_label: answerPayload.confidenceLabel,
          },
        ]);
      }
    }

    return NextResponse.json(answerPayload);
  } catch (error) {
    return NextResponse.json(
      {
        answerMarkdown:
          "The tutor could not finish the request, so no reliable grading feedback was produced.",
        confidenceLabel: "insufficient_evidence",
        citations: [],
        sourceSnippets: [],
        error: error instanceof Error ? error.message : "The tutor request failed.",
      },
      { status: 500 },
    );
  }
}
