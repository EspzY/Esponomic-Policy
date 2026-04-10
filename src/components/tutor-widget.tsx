"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { MathMarkdown } from "@/components/math-markdown";
import { TutorResponse } from "@/components/tutor-response";
import { buttonClasses } from "@/components/ui/button";
import type {
  PracticeCollectionKind,
  TutorConversationTurn,
  TutorPageContext,
  TutorResult,
  Viewer,
} from "@/lib/types";

type TutorWidgetModule = {
  slug: string;
  title: string;
  kind: "lecture" | "symbol_register";
};

type TutorWidgetProblem = {
  slug: string;
  title: string;
  moduleSlug: string;
  sourceLabel?: string;
  sourceKind?: PracticeCollectionKind;
};

type TutorWidgetMessage =
  | {
      id: string;
      role: "user";
      content: string;
    }
  | {
      id: string;
      role: "assistant";
      result: TutorResult;
      content: string;
    };

function makeId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function sourceKindLabel(kind?: PracticeCollectionKind) {
  if (kind === "past_exam") {
    return "Past exam";
  }

  if (kind === "seminar_problem_set") {
    return "Seminar / problem set";
  }

  if (kind === "lecture_linked") {
    return "Lecture-linked practice";
  }

  return undefined;
}

export function TutorWidget({
  viewer,
  modules,
  problems,
}: {
  viewer: Viewer;
  modules: TutorWidgetModule[];
  problems: TutorWidgetProblem[];
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<TutorWidgetMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentSection, setCurrentSection] = useState<{
    slug: string;
    title: string;
  } | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const hideWidget =
    !viewer ||
    pathname.startsWith("/admin") ||
    pathname === "/" ||
    pathname.startsWith("/invite/") ||
    pathname === "/register";

  useEffect(() => {
    if (!scrollerRef.current) {
      return;
    }

    scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
  }, [messages, loading, isOpen]);

  useEffect(() => {
    if (
      !pathname.startsWith("/modules/") ||
      pathname.startsWith("/modules/symbols") ||
      pathname.endsWith("/quiz")
    ) {
      setCurrentSection(null);
      return;
    }

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-tutor-section]"),
    );

    if (!sections.length) {
      setCurrentSection(null);
      return;
    }

    const pickSection = () => {
      const anchor = 150;
      let bestSection: HTMLElement | null = null;
      let bestDistance = Number.POSITIVE_INFINITY;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();

        if (rect.bottom <= anchor || rect.top >= window.innerHeight * 0.72) {
          continue;
        }

        const distance = Math.abs(rect.top - anchor);

        if (distance < bestDistance) {
          bestDistance = distance;
          bestSection = section;
        }
      }

      if (!bestSection) {
        setCurrentSection(null);
        return;
      }

      setCurrentSection({
        slug: bestSection.dataset.tutorSection ?? "",
        title: bestSection.dataset.tutorSectionTitle ?? "Current section",
      });
    };

    pickSection();
    window.addEventListener("scroll", pickSection, { passive: true });
    window.addEventListener("resize", pickSection);

    return () => {
      window.removeEventListener("scroll", pickSection);
      window.removeEventListener("resize", pickSection);
    };
  }, [pathname]);

  if (hideWidget) {
    return null;
  }

  const context = getTutorPageContext(pathname, modules, problems, currentSection);
  const contextLabel = getContextLabel(context);

  async function sendMessage() {
    const question = input.trim();

    if (!question || loading) {
      return;
    }

    const history: TutorConversationTurn[] = messages.map((message) =>
      message.role === "user"
        ? { role: "user", content: message.content }
        : { role: "assistant", content: message.content },
    );
    const userMessage: TutorWidgetMessage = {
      id: makeId("user"),
      role: "user",
      content: question,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/qa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: "qa",
          question,
          moduleSlug: context.moduleSlug,
          problemSlug: context.problemSlug,
          pageContext: context,
          conversation: history,
        }),
      });

      const payload = (await response.json()) as TutorResult;
      const assistantMessage: TutorWidgetMessage = {
        id: makeId("assistant"),
        role: "assistant",
        content: payload.answerMarkdown,
        result: response.ok
          ? payload
          : {
              answerMarkdown: "",
              confidenceLabel: "insufficient_evidence",
              citations: [],
              sourceSnippets: [],
              error: payload.error ?? "The tutor request failed.",
            },
      };

      setMessages((current) => [...current, assistantMessage]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: makeId("assistant"),
          role: "assistant",
          content: "",
          result: {
            answerMarkdown: "",
            confidenceLabel: "insufficient_evidence",
            citations: [],
            sourceSnippets: [],
            error: "The tutor request failed before a response could be returned.",
          },
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  }

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex max-w-[calc(100vw-1.5rem)] flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {isOpen ? (
        <section className="pointer-events-auto surface-card flex h-[min(72vh,42rem)] w-[min(92vw,26rem)] flex-col overflow-hidden rounded-[2rem]">
          <div className="border-b border-[var(--color-line)] px-5 py-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-teal)]">
                  Source-grounded tutor
                </p>
                <h2 className="mt-1 text-lg font-semibold text-[var(--color-ink)]">
                  Study with the current page in view
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className={buttonClasses("outline", "sm")}
              >
                Close
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-[rgba(15,118,110,0.12)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-teal)]">
                {contextLabel}
              </span>
              {context.sectionTitle ? (
                <span className="rounded-full border border-[var(--color-line)] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[var(--color-slate)]">
                  {context.sectionTitle}
                </span>
              ) : null}
            </div>
          </div>

          <div
            ref={scrollerRef}
            className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
          >
            {messages.length ? (
              messages.map((message) =>
                message.role === "user" ? (
                  <div key={message.id} className="flex justify-end">
                    <div className="max-w-[88%] rounded-[1.5rem] bg-[var(--color-ink)] px-4 py-3 text-sm leading-7 text-white">
                      <MathMarkdown content={message.content} className="text-white" />
                    </div>
                  </div>
                ) : (
                  <div key={message.id} className="space-y-2">
                    <p className="px-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-rust)]">
                      Tutor
                    </p>
                    <div className="rounded-[1.5rem] border border-[var(--color-line)] bg-white p-4">
                      <TutorResponse result={message.result} compact />
                    </div>
                  </div>
                ),
              )
            ) : (
              <div className="space-y-4 rounded-[1.5rem] border border-dashed border-[var(--color-line)] bg-white/70 p-5">
                <p className="text-sm leading-7 text-[var(--color-slate)]">
                  Ask about the lecture, the current section, or the practice problem you are working on. The tutor uses the page context and retrieved course evidence instead of guessing.
                </p>
                <div className="grid gap-2">
                  {starterPrompts(context).map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => setInput(prompt)}
                      className="rounded-[1rem] border border-[var(--color-line)] bg-[rgba(24,33,45,0.03)] px-4 py-3 text-left text-sm leading-6 text-[var(--color-ink)] transition hover:border-[rgba(15,118,110,0.28)] hover:bg-[rgba(15,118,110,0.05)]"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {loading ? (
              <div className="rounded-[1.25rem] bg-[rgba(24,33,45,0.05)] px-4 py-3 text-sm text-[var(--color-slate)]">
                Thinking through the current course material...
              </div>
            ) : null}
          </div>

          <div className="border-t border-[var(--color-line)] px-4 py-4">
            <div className="rounded-[1.5rem] border border-[var(--color-line)] bg-white p-3">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  context.pageKind === "practice_problem"
                    ? "Ask about this problem, the source, or where your reasoning is getting stuck..."
                    : "Ask about the current lecture, section, or model logic..."
                }
                className="min-h-24 w-full resize-none border-0 bg-transparent text-sm leading-7 outline-none"
              />
              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-xs leading-5 text-[var(--color-slate)]">
                  Press Enter to send, Shift+Enter for a new line.
                </p>
                <div className="flex items-center gap-2">
                  {messages.length ? (
                    <button
                      type="button"
                      onClick={() => setMessages([])}
                      className={buttonClasses("outline", "sm")}
                    >
                      Clear
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => void sendMessage()}
                    disabled={!input.trim() || loading}
                    className={buttonClasses("primary", "sm")}
                  >
                    {loading ? "Sending..." : "Send"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className={`${buttonClasses("primary", "md")} pointer-events-auto shadow-[var(--shadow-card)]`}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close study tutor" : "Open study tutor"}
      >
        {isOpen ? "Hide tutor" : "Open study tutor"}
      </button>
    </div>
  );
}

function starterPrompts(context: TutorPageContext) {
  if (context.pageKind === "practice_problem" && context.problemTitle) {
    return [
      `What is this practice question really asking me to do?`,
      `Which equation or benchmark should I start from in ${context.problemTitle}?`,
      `What is the most common mistake students make on this problem?`,
    ];
  }

  if (context.pageKind === "module" && context.sectionTitle) {
    return [
      `Explain the current section slowly and in plain English.`,
      `What changes relative to the benchmark in this section?`,
      `What should I carry forward from ${context.sectionTitle}?`,
    ];
  }

  if (context.moduleTitle) {
    return [
      `What is the main mechanism in ${context.moduleTitle}?`,
      `Which assumptions matter most in this lecture?`,
      `What kind of exam reasoning is this lecture training me to do?`,
    ];
  }

  return [
    "Help me decide what to practice next.",
    "What are the most important ideas I should carry across the course?",
    "Which lecture should I revisit if I am confused about output gaps and inflation?",
  ];
}

function getTutorPageContext(
  pathname: string,
  modules: TutorWidgetModule[],
  problems: TutorWidgetProblem[],
  currentSection: { slug: string; title: string } | null,
): TutorPageContext {
  if (pathname === "/dashboard") {
    return { pageKind: "dashboard" };
  }

  if (pathname === "/practice") {
    return { pageKind: "practice_overview" };
  }

  if (pathname === "/modules/symbols") {
    const currentModule = modules.find((item) => item.slug === "symbols");

    return {
      pageKind: "symbol_register",
      moduleSlug: currentModule?.slug ?? "symbols",
      moduleTitle: currentModule?.title ?? "Module 1: Symbol Register",
    };
  }

  const practiceMatch = pathname.match(/^\/practice\/([^/]+)$/);

  if (practiceMatch) {
    const problem = problems.find((item) => item.slug === practiceMatch[1]);
    const currentModule = modules.find((item) => item.slug === problem?.moduleSlug);

    return {
      pageKind: "practice_problem",
      moduleSlug: problem?.moduleSlug,
      moduleTitle: currentModule?.title,
      problemSlug: problem?.slug,
      problemTitle: problem?.title,
      sourceLabel: problem?.sourceLabel,
      sourceKind: problem?.sourceKind,
    };
  }

  const quizMatch = pathname.match(/^\/modules\/([^/]+)\/quiz$/);

  if (quizMatch) {
    const currentModule = modules.find((item) => item.slug === quizMatch[1]);

    return {
      pageKind: "module_quiz",
      moduleSlug: currentModule?.slug,
      moduleTitle: currentModule?.title,
    };
  }

  const moduleMatch = pathname.match(/^\/modules\/([^/]+)$/);

  if (moduleMatch) {
    const currentModule = modules.find((item) => item.slug === moduleMatch[1]);

    return {
      pageKind: "module",
      moduleSlug: currentModule?.slug,
      moduleTitle: currentModule?.title,
      sectionSlug: currentSection?.slug,
      sectionTitle: currentSection?.title,
    };
  }

  return { pageKind: "other" };
}

function getContextLabel(context: TutorPageContext) {
  if (context.pageKind === "practice_problem") {
    const source = sourceKindLabel(context.sourceKind);
    return source
      ? `${source}: ${context.problemTitle ?? "Current problem"}`
      : context.problemTitle ?? "Current practice problem";
  }

  if (context.pageKind === "module_quiz") {
    return `${context.moduleTitle ?? "Current lecture"} quiz`;
  }

  if (context.moduleTitle) {
    return context.moduleTitle;
  }

  if (context.pageKind === "practice_overview") {
    return "Practice overview";
  }

  if (context.pageKind === "dashboard") {
    return "Dashboard";
  }

  return "Course tutor";
}
