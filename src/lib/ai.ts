import { HfInference } from "@huggingface/inference";
import OpenAI from "openai";

import { env, isHuggingFaceConfigured, isOpenAiConfigured } from "@/lib/env";
import type { Citation, TutorMode, TutorResult, TutorSource } from "@/lib/types";
import { cosineSimilarity } from "@/lib/utils";

const hfClient = isHuggingFaceConfigured()
  ? new HfInference(env.huggingFaceApiKey)
  : null;

const openaiClient = isOpenAiConfigured()
  ? new OpenAI({
      apiKey: env.openAiApiKey,
    })
  : null;

function lexicalScore(query: string, source: TutorSource) {
  const haystack = `${source.title} ${source.text} ${source.tags.join(" ")}`.toLowerCase();
  const tokens = query
    .toLowerCase()
    .split(/\s+/)
    .filter((token) => token.length > 2);

  if (!tokens.length) {
    return 0;
  }

  return tokens.reduce(
    (score, token) => score + (haystack.includes(token) ? 1 : 0),
    0,
  );
}

function dedupeCitations(citations: Citation[]) {
  const seen = new Set<string>();

  return citations.filter((citation) => {
    const key = `${citation.documentTitle}-${citation.page}-${citation.note}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function buildSourceSnippets(sources: TutorSource[]) {
  return sources.map((source) => ({
    title: source.title,
    excerpt: source.text.length > 320 ? `${source.text.slice(0, 317).trimEnd()}...` : source.text,
    citations: source.citations,
  }));
}

export async function embedText(text: string) {
  if (!hfClient) {
    return null;
  }

  try {
    const result = await hfClient.featureExtraction({
      model: env.huggingFaceEmbeddingModel,
      inputs: text,
    });

    if (!Array.isArray(result) || !result.length) {
      return null;
    }

    if (typeof result[0] === "number") {
      return result as number[];
    }

    return null;
  } catch {
    return null;
  }
}

export async function retrieveTutorSources(query: string, sources: TutorSource[]) {
  if (!sources.length) {
    return [];
  }

  const queryEmbedding = await embedText(query);

  if (!queryEmbedding) {
    return [...sources]
      .map((source) => ({ source, score: lexicalScore(query, source) }))
      .sort((left, right) => right.score - left.score)
      .slice(0, 3)
      .map(({ source }) => source);
  }

  const scored = await Promise.all(
    sources.map(async (source) => {
      try {
        const embedding = await embedText(source.text);

        return {
          source,
          score:
            embedding?.length === queryEmbedding.length
              ? cosineSimilarity(queryEmbedding, embedding)
              : lexicalScore(query, source),
        };
      } catch {
        return {
          source,
          score: lexicalScore(query, source),
        };
      }
    }),
  );

  return scored
    .sort((left, right) => right.score - left.score)
    .slice(0, 4)
    .map(({ source }) => source);
}

function fallbackTutorAnswer(
  mode: TutorMode,
  question: string,
  sources: TutorSource[],
  error?: string,
): TutorResult {
  if (!sources.length) {
    return {
      answerMarkdown:
        "I could not find enough indexed evidence for a reliable answer yet. That means I should **not guess**. Please upload or publish the relevant lecture material before treating any explanation as authoritative.",
      citations: [],
      sourceSnippets: [],
      confidenceLabel: "insufficient_evidence",
      error,
    };
  }

  const modeLead =
    mode === "hint"
      ? "Start from the model block that moves first, and do **not** jump to the final sign pattern yet."
      : mode === "next_step"
        ? "A good next step is to translate the question into **one equation** and **one benchmark comparison**."
        : mode === "full_solution"
          ? "Here is a grounded outline based on the currently indexed material."
          : "Based on the indexed material, the safest answer is:";

  return {
    answerMarkdown: [
      modeLead,
      "",
      `**Question received:** ${question}`,
      "",
      "I am falling back to retrieved course evidence because the language-model step is unavailable or failed.",
      "",
      sources.map((source, index) => `${index + 1}. **${source.title}**: ${source.text}`).join("\n"),
    ].join("\n"),
    citations: dedupeCitations(sources.flatMap((source) => source.citations)),
    sourceSnippets: buildSourceSnippets(sources),
    confidenceLabel: sources.length >= 2 ? "grounded" : "partial",
    error,
  };
}

export async function buildTutorAnswer(
  mode: TutorMode,
  question: string,
  sources: TutorSource[],
) {
  if (!openaiClient) {
    return fallbackTutorAnswer(mode, question, sources);
  }

  const evidenceBlock = sources
    .map(
      (source, index) =>
        `[Source ${index + 1}] ${source.title}\n${source.text}\nCitations: ${source.citations
          .map((citation) => `${citation.documentTitle} ${citation.page}`)
          .join(", ")}`,
    )
    .join("\n\n");

  const modeSpecificRule =
    mode === "solution_check"
      ? [
          '- For "solution_check" mode, behave like a teaching evaluator, not a grading stamp.',
          "- Explicitly say what in the student's answer is already correct.",
          "- Explicitly say what is incomplete, unclear, or based on a misunderstanding.",
          "- Name the theory, equation, or benchmark comparison the student should return to.",
          "- Give the student one concrete improvement step so they can revise the answer themselves.",
        ].join("\n")
      : "";

  const prompt = `
You are a careful course tutor for Economic Policy.
Mode: ${mode}

Rules:
- Use only the supplied evidence.
- If the evidence is insufficient, say so explicitly.
- Do not invent missing derivation steps or symbols.
- Keep the answer pedagogical and structured.
- For "hint" mode, do not reveal the full answer.
- For "next_step" mode, reveal exactly one next step.
- For "full_solution" mode, provide a concise, source-grounded outline.
${modeSpecificRule}

Student question:
${question}

Evidence:
${evidenceBlock}

Return valid JSON with keys:
- answerMarkdown
- confidenceLabel (grounded | partial | insufficient_evidence)
`;

  try {
    const response = await openaiClient.responses.create({
      model: env.openAiRuntimeModel,
      input: prompt,
      text: {
        format: {
          type: "json_schema",
          name: "tutor_answer",
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              answerMarkdown: {
                type: "string",
              },
              confidenceLabel: {
                type: "string",
                enum: ["grounded", "partial", "insufficient_evidence"],
              },
            },
            required: ["answerMarkdown", "confidenceLabel"],
          },
        },
      },
    });

    const rawOutput = response.output_text?.trim();

    if (!rawOutput) {
      return fallbackTutorAnswer(
        mode,
        question,
        sources,
        "The tutor model returned an empty response, so I fell back to retrieved evidence.",
      );
    }

    const output = JSON.parse(rawOutput) as {
      answerMarkdown?: string;
      confidenceLabel?: TutorResult["confidenceLabel"];
    };

    if (!output.answerMarkdown || !output.confidenceLabel) {
      return fallbackTutorAnswer(
        mode,
        question,
        sources,
        "The tutor model returned an invalid payload, so I fell back to retrieved evidence.",
      );
    }

    return {
      answerMarkdown: output.answerMarkdown,
      confidenceLabel: output.confidenceLabel,
      citations: dedupeCitations(sources.flatMap((source) => source.citations)),
      sourceSnippets: buildSourceSnippets(sources),
    } satisfies TutorResult;
  } catch {
    return fallbackTutorAnswer(
      mode,
      question,
      sources,
      "The tutor model is temporarily unavailable, so this answer is a retrieval-only fallback.",
    );
  }
}
