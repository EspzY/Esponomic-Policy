import { NextResponse } from "next/server";

import { getViewer } from "@/lib/auth";
import { saveQuizProgress } from "@/lib/progress";
import { getQuizItems } from "@/lib/repository";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    moduleSlug?: string;
    answers?: number[];
  };

  if (!body.moduleSlug || !Array.isArray(body.answers)) {
    return NextResponse.json(
      { error: "moduleSlug and answers are required." },
      { status: 400 },
    );
  }

  const viewer = await getViewer();
  const items = await getQuizItems(body.moduleSlug);

  if (!items.length) {
    return NextResponse.json({ error: "No quiz items found." }, { status: 404 });
  }

  const reviewTags = new Set<string>();
  const answerFeedback = items.map((item, index) => {
    const chosen = body.answers?.[index] ?? -1;
    const correct = chosen === item.correctIndex;

    if (!correct) {
      item.tags.forEach((tag) => reviewTags.add(tag));
    }

    return {
      questionId: item.id,
      correct,
      explanation: item.explanation,
    };
  });

  const correctCount = answerFeedback.filter((answer) => answer.correct).length;
  const scorePct = Math.round((correctCount / items.length) * 100);

  if (viewer && !viewer.demoMode) {
    await saveQuizProgress({
      userId: viewer.id,
      moduleSlug: body.moduleSlug,
      answers: body.answers,
      scorePct,
      weakTags: [...reviewTags],
    });
  }

  return NextResponse.json({
    scorePct,
    weakTags: [...reviewTags],
    answers: answerFeedback,
  });
}
