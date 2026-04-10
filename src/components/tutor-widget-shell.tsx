import { getViewer } from "@/lib/auth";
import { isTutorWidgetEnabled } from "@/lib/env";
import { getCourseModules, getPracticeProblems } from "@/lib/repository";

import { TutorWidget } from "@/components/tutor-widget";

export async function TutorWidgetShell() {
  if (!isTutorWidgetEnabled()) {
    return null;
  }

  const viewer = await getViewer();

  if (!viewer) {
    return null;
  }

  const [modules, problems] = await Promise.all([
    getCourseModules(),
    getPracticeProblems(),
  ]);

  return (
    <TutorWidget
      viewer={viewer}
      modules={modules.map((module) => ({
        slug: module.slug,
        title: module.title,
        kind: module.kind,
      }))}
      problems={problems.map((problem) => ({
        slug: problem.slug,
        title: problem.title,
        moduleSlug: problem.moduleSlug,
        sourceLabel: problem.sourceLabel,
        sourceKind: problem.sourceKind,
      }))}
    />
  );
}
