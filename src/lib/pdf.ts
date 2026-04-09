import { chunkText, slugify, truncate } from "@/lib/utils";

type ExtractedPage = {
  pageNumber: number;
  text: string;
};

export type ExtractedDocument = {
  pageCount: number;
  pages: ExtractedPage[];
  chunks: {
    chunkIndex: number;
    pageFrom: number;
    pageTo: number;
    content: string;
  }[];
  preview: string;
  candidateSymbols: string[];
};

function findCandidateSymbols(text: string) {
  const matches = text.match(
    /\b(?:[a-zA-Z]+_[a-zA-Z0-9]+|[a-zA-Z]+\^[a-zA-Z0-9]+|[πβκσφθρϕλεμ]+(?:_[a-zA-Z0-9]+)?|[a-zA-Z]_t)\b/g,
  );

  return [...new Set((matches ?? []).map((match) => match.trim()))]
    .filter((match) => match.length <= 12)
    .sort();
}

export async function extractPdfDocument(buffer: Buffer) {
  const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const pdf = await getDocument({ data: buffer }).promise;
  const pages: ExtractedPage[] = [];
  const chunks: ExtractedDocument["chunks"] = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    pages.push({
      pageNumber,
      text: pageText,
    });

    const pageChunks = chunkText(pageText).map((chunk, chunkOffset) => ({
      chunkIndex: chunks.length + chunkOffset,
      pageFrom: pageNumber,
      pageTo: pageNumber,
      content: chunk,
    }));

    chunks.push(...pageChunks);
  }

  const wholeText = pages.map((page) => page.text).join(" ");

  return {
    pageCount: pdf.numPages,
    pages,
    chunks,
    preview: truncate(wholeText, 320),
    candidateSymbols: findCandidateSymbols(wholeText),
  } satisfies ExtractedDocument;
}

export function buildStoragePath(moduleSlug: string, fileName: string) {
  return `${slugify(moduleSlug || "shared")}/${Date.now()}-${slugify(fileName.replace(/\.pdf$/i, ""))}.pdf`;
}
