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

export async function embedText(text: string) {
  if (!hfClient) {
    return null;
  }

  const result = await hfClient.featureExtraction({
    model: env.huggingFaceEmbeddingModel,
    inputs: text,
  });

  if (!Array.isArray(result) || !result.length) {
    return null;
  }

  return result as number[];
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
      const embedding = await embedText(source.text);

      return {
        source,
        score:
          embedding?.length === queryEmbedding.length
            ? cosineSimilarity(queryEmbedding, embedding)
            : lexicalScore(query, source),
      };
    }),
  );

  return scored
    .sort((left, right) => right.score - left.score)
    .slice(0, 3)
    .map(({ source }) => source);
}

function fallbackTutorAnswer(
  mode: TutorMode,
  question: string,
  sources: TutorSource[],
): TutorResult {
  if (!sources.length) {
    return {
      answer:
        "I could not find enough supporting material for a reliable answer yet. Upload or process the relevant lecture PDF before treating any explanation as authoritative.",
      citations: [],
      confidenceLabel: "insufficient_evidence",
    };
  }

  const lead = sources[0];
  const modeLead =
    mode === "hint"
      ? "Start from the model block that moves first."
      : mode === "next_step"
        ? "A good next step is to translate the question into one equation and one sign prediction."
        : mode === "full_solution"
          ? "Here is a grounded outline based on the currently indexed material."
          : "Based on the indexed material, the safest answer is:";

  return {
    answer: `${modeLead}\n\n${lead.text}\n\nQuestion received: ${question}`,
    citations: sources.flatMap((source) => source.citations),
    confidenceLabel: sources.length >= 2 ? "grounded" : "partial",
  };
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

Student question:
${question}

Evidence:
${evidenceBlock}

Return valid JSON with keys:
- answer
- confidenceLabel (grounded | partial | insufficient_evidence)
`;

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
            answer: {
              type: "string",
            },
            confidenceLabel: {
              type: "string",
              enum: ["grounded", "partial", "insufficient_evidence"],
            },
          },
          required: ["answer", "confidenceLabel"],
        },
      },
    },
  });

  const output = response.output_text
    ? JSON.parse(response.output_text)
    : { answer: "", confidenceLabel: "insufficient_evidence" };

  return {
    answer: output.answer,
    confidenceLabel: output.confidenceLabel,
    citations: dedupeCitations(sources.flatMap((source) => source.citations)),
  } satisfies TutorResult;
}
