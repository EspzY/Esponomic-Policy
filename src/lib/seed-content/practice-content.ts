import type {
  ContentBlock,
  PracticeCollection,
  PracticeGuide,
  PracticeProblem,
  PracticeStepGuide,
  PracticeSupportMode,
} from "@/lib/types";

import { cite, figureNote, p, practiceProblem } from "@/lib/seed-content/builders";

function promptBlocks(prompt: string[]): ContentBlock[] {
  return prompt.map((line) => p(line));
}

function guide(
  problemType: string,
  whatIsBeingAsked: string,
  keyConcepts: string[],
  solutionPath: string[],
  commonMistakes: string[],
): PracticeGuide {
  return {
    problemType,
    whatIsBeingAsked,
    keyConcepts,
    solutionPath,
    commonMistakes,
  };
}

function step(
  title: string,
  whatToDo: string,
  whyValid: string,
  principle: string,
  contribution: string,
  latex?: string,
): PracticeStepGuide {
  return {
    title,
    whatToDo,
    whyValid,
    principle,
    contribution,
    latex,
  };
}

const seminar1Citations = [
  cite(
    "GRA 6631 Seminar 1 Exercises",
    "pp. 1-2",
    "Question 1 on the baseline New Keynesian model and qualitative shock analysis.",
    "problem_set",
  ),
  cite(
    "Seminar 1 GRA6631 2025 Solutions",
    "pp. 1-2",
    "Guidance on sign patterns and the missing cost-push shock logic.",
    "solution",
  ),
];

const seminar2Citations = [
  cite(
    "GRA 6631 Seminar 2 Exercises",
    "pp. 1-3",
    "Questions on cost-push shocks, commitment, forward guidance, and the Phillips curve.",
    "problem_set",
  ),
  cite(
    "Seminar 2 GRA6631 2025 Solutions",
    "pp. 1-3",
    "Suggested solutions for discretion, commitment, and guidance classification.",
    "solution",
  ),
];

const seminar3Citations = [
  cite(
    "GRA 6631 Seminar 3 Sheet",
    "pp. 1-2",
    "Questions on Ricardian equivalence, debt sustainability, inequality, and environment.",
    "problem_set",
  ),
];

const exam2024Citations = [
  cite(
    "GRA6631 Economic Policy Final Exam 2024",
    "pp. 1-5",
    "Final exam questions used as practice material.",
    "exam",
  ),
  cite(
    "GRA 66311 202410 03.05.2024 EG",
    "pp. 1-9",
    "Official solution guidance for the 2024 final exam.",
    "solution",
  ),
];

const exam2025Citations = [
  cite(
    "GRA6631 Economic Policy Final Exam 2025",
    "pp. 1-4",
    "Final exam questions used as practice material.",
    "exam",
  ),
  cite(
    "GRA6631 2025-04-28 kl 09 EG",
    "pp. 1-9",
    "Official solution guidance for the 2025 final exam.",
    "solution",
  ),
];

const lectureLinkedGuideConfig: Record<
  string,
  {
    supportMode: PracticeSupportMode;
    problemType: string;
    whatIsBeingAsked: string;
    solutionPath: string[];
    commonMistakes: string[];
    handSolveNote?: string;
  }
> = {
  "lecture-1": {
    supportMode: "conceptual",
    problemType: "Policy-rule interpretation",
    whatIsBeingAsked:
      "Separate the systematic and unsystematic parts of the rule, then explain why the Taylor principle matters for real-rate tightening.",
    solutionPath: [
      "Start by splitting the rule into state-dependent terms and the residual shock.",
      "Then move from the nominal-rate response to the real-rate response.",
      "End by explaining why the inflation coefficient must be strong enough to stabilize expectations.",
    ],
    commonMistakes: [
      "Calling the entire Taylor rule a shock.",
      "Explaining the Taylor principle only in nominal terms and forgetting the real rate.",
    ],
  },
  "lecture-2": {
    supportMode: "conceptual",
    problemType: "Qualitative shock analysis",
    whatIsBeingAsked:
      "Track the signs of actual output, natural output, inflation, and the natural rate after a baseline New Keynesian shock.",
    solutionPath: [
      "Identify the shock first, then separate actual from natural objects.",
      "Use marginal cost and the Phillips curve to reason about inflation.",
      "Only then decide what happens to the output gap and the natural real rate.",
    ],
    commonMistakes: [
      "Talking about output without distinguishing $y_t$ from $y_t^n$.",
      "Calling every inflation-output-gap tension a monetary-policy shock when a cost-push shock is the missing benchmark disturbance.",
    ],
  },
  "lecture-3": {
    supportMode: "conceptual",
    problemType: "Benchmark mechanism explanation",
    whatIsBeingAsked:
      "Show why divine coincidence holds in the benchmark and why policy still needs determinacy.",
    solutionPath: [
      "Use the NKPC to explain why zero inflation implies a zero gap in the benchmark.",
      "Then move to the Dynamic IS block and explain why expectations still have to be anchored.",
    ],
    commonMistakes: [
      "Thinking divine coincidence removes the need for a policy rule.",
      "Treating determinacy as the same thing as welfare optimality.",
    ],
  },
  "lecture-4": {
    supportMode: "conceptual",
    problemType: "Optimal-policy trade-off explanation",
    whatIsBeingAsked:
      "Explain why a cost-push shock breaks divine coincidence and how the targeting rule summarizes the discretion trade-off.",
    solutionPath: [
      "Show first that inflation can move even when the welfare-relevant gap is zero.",
      "Then explain the targeting rule as a marginal trade-off between inflation stabilization and gap stabilization.",
    ],
    commonMistakes: [
      "Calling the targeting rule a law of motion instead of an optimality condition.",
      "Forgetting that the welfare-relevant gap is not always the same object as the textbook output gap.",
    ],
  },
  "lecture-5": {
    supportMode: "conceptual",
    problemType: "Time-inconsistency reasoning",
    whatIsBeingAsked:
      "Explain why discretion creates an inflation bias and why commitment or independence can reduce it.",
    solutionPath: [
      "Describe the temptation to create surprise inflation once expectations are fixed.",
      "Then show why private agents anticipate that temptation and remove the long-run output gain.",
    ],
    commonMistakes: [
      "Confusing time inconsistency with one-off policy mistakes.",
      "Saying commitment eliminates all shocks rather than changing credibility and expectations.",
    ],
  },
  "lecture-6": {
    supportMode: "conceptual",
    problemType: "Forward-guidance classification",
    whatIsBeingAsked:
      "Classify the guidance and explain how the macro effect changes when the announcement is information versus commitment.",
    solutionPath: [
      "Start with the expectations channel through the Dynamic IS equation.",
      "Then ask whether the message mainly reveals the outlook or binds future policy choices.",
    ],
    commonMistakes: [
      "Calling every low-for-long statement Odyssean.",
      "Ignoring that Delphic guidance can be expansionary in rates but contractionary in signal content.",
    ],
  },
  "lecture-7": {
    supportMode: "conceptual",
    problemType: "Structural versus reduced-form interpretation",
    whatIsBeingAsked:
      "Explain what a smaller structural slope changes and what it does not prove from raw data alone.",
    solutionPath: [
      "Start with the structural meaning of $\\kappa$ in the NKPC.",
      "Then separate structural flattening from changes in policy, expectations, and shock composition.",
    ],
    commonMistakes: [
      "Treating a flatter scatter plot as direct proof that $\\kappa$ fell.",
      "Ignoring the difference between targeting-rule geometry and reduced-form data correlations.",
    ],
  },
  "lecture-8": {
    supportMode: "conceptual",
    problemType: "Heterogeneity and transmission",
    whatIsBeingAsked:
      "Explain why the same aggregate shock produces different demand responses when MPCs and income exposure differ across households.",
    solutionPath: [
      "Track who receives the income change, not only the average size of the shock.",
      "Then explain why representative-agent logic misses the matching multiplier.",
    ],
    commonMistakes: [
      "Using only the average MPC and ignoring covariance between MPC and income exposure.",
      "Treating heterogeneity as distributional background rather than a transmission mechanism.",
    ],
  },
  "lecture-9": {
    supportMode: "conceptual",
    problemType: "Intertemporal fiscal benchmark",
    whatIsBeingAsked:
      "Explain the Ricardian benchmark first, then identify the conditions under which it is likely to fail.",
    solutionPath: [
      "Use the budget constraints to show why debt shifts taxes across time rather than creating net wealth in the benchmark.",
      "Then list the frictions that break the benchmark in real economies.",
    ],
    commonMistakes: [
      "Explaining Ricardian equivalence as a claim that debt never matters.",
      "Ignoring the role of the no-Ponzi condition and intertemporal solvency.",
    ],
  },
  "lecture-10": {
    supportMode: "conceptual",
    problemType: "Debt-sustainability interpretation",
    whatIsBeingAsked:
      "Use the debt-dynamics approximation together with expectations and institutions to explain sustainability and crisis risk.",
    solutionPath: [
      "Split the equation into the snowball term and the primary-surplus term.",
      "Then explain why benign arithmetic can still coexist with bad equilibria and sudden crises.",
    ],
    commonMistakes: [
      "Reducing Lecture 10 to debt arithmetic only.",
      "Forgetting that political economy and market expectations can move yields abruptly.",
    ],
  },
  "lecture-11": {
    supportMode: "derivation",
    problemType: "Lorenz-curve and Gini calculation",
    whatIsBeingAsked:
      "Compute the Lorenz-curve geometry carefully and then interpret the institutional mechanism behind wage compression.",
    solutionPath: [
      "First calculate cumulative population and income shares.",
      "Approximate the area with trapezoids before applying the Gini formula.",
      "Only then move to the Scandinavian-model interpretation.",
    ],
    commonMistakes: [
      "Using raw quintile shares instead of cumulative shares in the Lorenz curve.",
      "Jumping to the wage-bargaining intuition before finishing the geometry correctly.",
    ],
    handSolveNote:
      "This practice item is best solved on paper because the geometry and trapezoid calculations are easier to track by hand.",
  },
  "lecture-12": {
    supportMode: "derivation",
    problemType: "Growth-accounting and policy benchmark",
    whatIsBeingAsked:
      "Work through the resource-drag logic and then connect the growth benchmark to the climate-policy problem.",
    solutionPath: [
      "Differentiate the production function carefully and collect growth rates term by term.",
      "Use the $\\beta = 0$ benchmark to show what disappears when resources no longer enter production.",
      "Then connect the benchmark to why formal climate policy is still needed.",
    ],
    commonMistakes: [
      "Dropping the resource term too early in the derivation.",
      "Treating the Coase theorem as a practical climate-policy prescription rather than a benchmark.",
    ],
    handSolveNote:
      "Treat this as a by-hand derivation. Use the stepwise help only if you get stuck on the growth-accounting algebra.",
  },
};

export function enrichLectureLinkedPracticeProblem(
  problem: PracticeProblem,
  moduleTitle: string,
): PracticeProblem {
  const config = lectureLinkedGuideConfig[problem.moduleSlug];

  return practiceProblem({
    ...problem,
    sourceKind: "lecture_linked",
    collectionSlug: "lecture-linked-practice",
    sourceLabel: `${moduleTitle} lecture-linked practice`,
    sourceDetail:
      "Curated practice written directly against the lecture module so students can rehearse the benchmark mechanism before moving to seminar and exam material.",
    questionLabel: "Guided lecture-linked question",
    summary:
      "A compact rehearsal question tied directly to the lecture's benchmark logic, notation, and model interpretation.",
    supportMode: config?.supportMode ?? "conceptual",
    relatedModuleSlugs: [problem.moduleSlug],
    questionBlocks: promptBlocks(problem.prompt),
    guide: config
      ? guide(
          config.problemType,
          config.whatIsBeingAsked,
          problem.supportingEquations.map((equation) => equation.label),
          config.solutionPath,
          config.commonMistakes,
        )
      : guide(
          "Lecture-linked reasoning question",
          "Use the lecture benchmark to explain the mechanism clearly and in the same notation as the module.",
          problem.supportingEquations.map((equation) => equation.label),
          [
            "Identify which equation or benchmark concept the question is really asking about.",
            "Explain the mechanism in words before jumping to the conclusion.",
          ],
          ["Skipping the benchmark logic and jumping straight to the answer."],
        ),
    handSolveNote: config?.handSolveNote,
    answerPlaceholder:
      config?.supportMode === "derivation"
        ? "Optional: note where your handwritten derivation got stuck so the tutor can focus the clarification there."
        : "Write your answer in full sentences. The tutor will comment on what is correct, what is missing, and which theory may need tightening.",
  });
}

export const curatedPracticeProblems: PracticeProblem[] = [
  practiceProblem({
    id: "seminar-1-question-1",
    slug: "seminar-1-question-1",
    title: "Seminar 1, Question 1: Baseline NK Shock Analysis",
    moduleSlug: "lecture-2",
    sourceKind: "seminar_problem_set",
    collectionSlug: "seminar-1",
    sourceLabel: "Seminar 1 problem set",
    sourceDetail: "Question 1 with subparts (a)-(e) from the January 2026 seminar sheet.",
    questionLabel: "Question 1",
    summary:
      "A full qualitative reasoning set on the baseline New Keynesian model that trains sign logic and benchmark discipline.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-2"],
    prompt: [
      "Consider the basic New Keynesian model used in class and summarized by the standard baseline equations.",
      "Answer subparts (a)-(e) on technology shocks, impossible sign patterns, hours worked, combined shocks, and optimal-policy reasoning.",
    ],
    questionBlocks: [
      p("The seminar sheet frames the exercise around the baseline equations from Lecture 2:"),
      p("$$c_t = E_t c_{t+1} - \\frac{1}{\\sigma}(i_t - E_t\\pi_{t+1} - \\rho) + \\frac{1-\\rho_z}{\\sigma}z_t$$"),
      p("$$w_t - p_t = \\sigma c_t + \\phi n_t, \\quad y_t = a_t + n_t, \\quad y_t = c_t$$"),
      p("$$\\pi_t = \\beta E_t\\pi_{t+1} + \\lambda(m c_t - m c), \\quad m c_t = w_t - p_t - a_t$$"),
      p("$$i_t = \\rho + \\phi_\\pi \\pi_t + \\phi_y \\tilde{y}_t + v_t$$"),
      p("$$z_t = \\rho_z z_{t-1} + \\varepsilon_t^z, \\quad v_t = \\rho_v v_{t-1} + \\varepsilon_t^v, \\quad a_t = \\rho_a a_{t-1} + \\varepsilon_t^a$$"),
      p("**(a)** Suppose the economy is in steady state and is hit by a temporary positive technology shock. Describe qualitatively the impact response of output, potential output, inflation, and the natural rate of interest, and explain the transmission mechanism."),
      p("**(b)** Suppose inflation increases while the output gap decreases after a one-time temporary shock. Can any of the three baseline shocks generate that pattern on their own? If not, what other disturbance might be needed?"),
      p("**(c)** Suppose output increases while total hours worked decrease. What kind of shock has hit the economy? Explain your reasoning."),
      p("**(d)** Suppose the economy is hit simultaneously by a contractionary monetary-policy shock and a contractionary technology shock. Do you have sufficient information to sign the impact response of hours worked? Explain your reasoning."),
      p("**(e)** Suppose the economy is hit simultaneously by a positive discount-factor shock and a positive technology shock under optimal monetary policy. Describe the combined effect on the output gap and inflation. Do you have sufficient information to sign the natural rate of interest?"),
    ],
    guide: guide(
      "Qualitative multi-part shock analysis",
      "You are being asked to reason from the Lecture 2 benchmark equations, not to improvise from intuition alone. The core skill is to keep actual and natural variables separate and to explain the transmission channel for each sign.",
      [
        "Dynamic IS equation",
        "Natural output versus actual output",
        "Phillips curve and marginal cost",
        "Technology, discount-factor, and monetary-policy shocks",
        "Missing cost-push shock logic",
      ],
      [
        "Start each subpart by identifying the shock and the first equation or benchmark object it moves directly.",
        "Then separate what happens in the flexible-price benchmark from what happens under sticky prices.",
        "Only after that should you sign inflation, the gap, and the natural rate.",
      ],
      [
        "Talking about output without distinguishing $y_t$ from $y_t^n$.",
        "Forgetting that inflation can move directly because of marginal-cost logic, not only because output moves.",
        "Treating an impossible sign pattern as proof that one of the three baseline shocks must fit.",
      ],
    ),
    supportingEquations: [
      {
        id: "seminar1-gap",
        label: "Output-gap identity",
        latex: "\\tilde{y}_t = y_t - y_t^n",
        explanation:
          "Use this to keep actual and natural output separate. Most mistakes in this seminar come from collapsing the two objects too early.",
      },
      {
        id: "seminar1-natural-rate",
        label: "Natural real rate benchmark",
        latex:
          "r_t^n = \\rho - \\sigma \\frac{1+\\phi}{\\sigma+\\phi}(1-\\rho_a)a_t + (1-\\rho_z) z_t",
        explanation:
          "This tells you when technology and discount-factor shocks move the benchmark real rate and why a monetary-policy shock does not move the natural rate directly.",
      },
    ],
    hints: [
      "Treat each subpart as a sign-tracing exercise with one benchmark comparison and one sticky-price comparison.",
      "If the sign pattern is impossible under the three baseline shocks, ask what disturbance would enter inflation directly instead of through the usual demand or technology channels.",
    ],
    nextSteps: [
      "For subpart (a), write four separate lines: what happens to $y_t$, $y_t^n$, $\\pi_t$, and $r_t^n$ after a positive technology shock.",
      "For subpart (b), test the sign pair against monetary-policy, discount-factor, and technology shocks one by one before you conclude that a cost-push disturbance is missing.",
    ],
    solutionOutline: [
      "A positive technology shock raises $y_t^n$ immediately and lowers marginal cost, so inflation falls in the baseline sticky-price model.",
      "Actual output rises, but the lecture benchmark says it rises by less than natural output, so the output gap falls.",
      "Inflation up with the output gap down is not generated by the three baseline shocks on their own; a cost-push shock is the natural missing disturbance.",
      "If output rises while hours fall, the clean benchmark interpretation is a positive technology shock because productivity raises output while reducing labor input needs.",
      "When shocks are combined, sign only what the model lets you sign cleanly; do not force an answer where the combined effect is ambiguous.",
    ],
    answerPlaceholder:
      "Write one subpart at a time. The tutor should judge whether your reasoning is economically coherent, not just whether you guessed the final sign correctly.",
    citations: seminar1Citations,
  }),
  practiceProblem({
    id: "seminar-2-question-1",
    slug: "seminar-2-question-1",
    title: "Seminar 2, Question 1: Cost-Push Shocks under Discretion and Commitment",
    moduleSlug: "lecture-4",
    sourceKind: "seminar_problem_set",
    collectionSlug: "seminar-2",
    sourceLabel: "Seminar 2 problem set",
    sourceDetail: "Question 1 from the March 2026 seminar sheet.",
    questionLabel: "Question 1",
    summary:
      "A concept-heavy policy question on what a cost-push shock is and how the optimal response differs across regimes.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-4", "lecture-6"],
    prompt: [
      "Answer the three linked subparts on cost-push shocks, discretion, and commitment.",
    ],
    questionBlocks: [
      p("**(a)** What is a cost-push shock?"),
      p("**(b)** What is the optimal monetary policy under **discretion** in response to a cost-push shock?"),
      p("**(c)** What is the optimal monetary policy under **commitment** in response to a cost-push shock?"),
    ],
    guide: guide(
      "Regime comparison with a cost-push disturbance",
      "The question asks for a clean verbal comparison. You need to define the shock first, then explain why discretion and commitment imply different inflation and output-gap paths.",
      [
        "Cost-push shock",
        "Divine coincidence failure",
        "Discretionary targeting rule",
        "History dependence under commitment",
      ],
      [
        "Define a cost-push shock as a disturbance that moves inflation directly for a given welfare-relevant gap.",
        "Explain that discretion solves period by period and therefore trades off inflation and the gap without inherited promises.",
        "Then explain that commitment uses future policy promises and history dependence to improve the trade-off.",
      ],
      [
        "Defining a cost-push shock as just any supply shock.",
        "Saying commitment fully stabilizes inflation on impact rather than changing the whole expected path.",
      ],
    ),
    supportingEquations: [
      {
        id: "seminar2-targeting-rule",
        label: "Discretionary targeting rule",
        latex: "x_t = -\\frac{\\kappa}{\\alpha_x}\\pi_t",
        explanation:
          "This summarizes the inflation-gap trade-off under discretion. It is an optimality condition, not the whole model.",
      },
    ],
    hints: [
      "Start by explaining why a cost-push shock means inflation can be positive even when the welfare-relevant gap is zero.",
    ],
    nextSteps: [
      "After defining the shock, compare discretion as period-by-period optimization with commitment as a regime that can promise future tightening or future restraint.",
    ],
    solutionOutline: [
      "A cost-push shock is a disturbance that raises inflation directly in the Phillips curve, so divine coincidence fails.",
      "Under discretion, the central bank accepts a trade-off between inflation and the welfare-relevant gap each period.",
      "Under commitment, the bank can shape future expectations and use history dependence to lower welfare loss relative to discretion.",
    ],
    answerPlaceholder:
      "Write a short but structured answer: definition first, discretion second, commitment third.",
    citations: seminar2Citations,
  }),
  practiceProblem({
    id: "seminar-2-forward-guidance-ranking",
    slug: "seminar-2-forward-guidance-ranking",
    title: "Seminar 2, Questions 2-3: Delphic versus Odyssean Guidance",
    moduleSlug: "lecture-6",
    sourceKind: "seminar_problem_set",
    collectionSlug: "seminar-2",
    sourceLabel: "Seminar 2 problem set",
    sourceDetail:
      "Questions 2 and 3 from the March 2026 seminar sheet, including the central-bank statement ranking exercise.",
    questionLabel: "Questions 2-3",
    summary:
      "A classification exercise where students sort guidance statements by commitment content rather than by wording alone.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-5", "lecture-6"],
    prompt: [
      "Explain the distinction between Delphic and Odyssean forward guidance, link it to commitment versus discretion, and then rank the supplied central-bank statements from least to most committed.",
    ],
    questionBlocks: [
      p("**(a)** What is the distinction between Delphic and Odyssean forward guidance?"),
      p("**(b)** How is the distinction between commitment and discretion in monetary policy linked to these two kinds of forward guidance?"),
      figureNote({
        title: "Original Seminar 2 statement set",
        caption:
          "Use the original source page when you rank the statements. What matters is **how much policy commitment the statement conveys**, not just whether rates are said to stay low.",
        imagePath: "/figures/practice/seminar-2/seminar-2-page-2.png",
        altText:
          "Seminar 2 page with central-bank forward-guidance statements and Norges Bank interest-rate projection.",
      }),
      p("**(c)** Rank the statements from most Delphic to most Odyssean. You should explain why the position changes as the statement becomes more explicitly state-contingent or promise-like."),
    ],
    guide: guide(
      "Policy-statement classification",
      "This is not a keyword exercise. You are being asked to infer how much future policy is actually being committed to, and how much of the message is just information about the outlook.",
      [
        "Delphic guidance",
        "Odyssean guidance",
        "Commitment versus discretion",
        "State contingencies",
      ],
      [
        "Begin with the macro distinction: information about the outlook versus a promise about future policy choices.",
        "Then classify each statement by how condition-based and commitment-heavy it is.",
        "Use the ranking to explain how the commitment content rises from weak guidance to stronger Odyssean guidance.",
      ],
      [
        "Classifying every guidance statement as Odyssean just because it mentions the future.",
        "Ignoring the difference between a projection and an explicit promise.",
      ],
    ),
    supportingEquations: [
      {
        id: "seminar2-dis",
        label: "Expectations channel",
        latex: "\\tilde{y}_t = E_t\\tilde{y}_{t+1} - \\frac{1}{\\sigma}(i_t - E_t\\pi_{t+1} - r_t^n)",
        explanation:
          "Use this equation to explain why expected future policy changes current demand even before the policy move happens.",
      },
    ],
    hints: [
      "Ask whether the statement is mainly saying 'the outlook is weak' or 'we are tying ourselves to a future policy path.'",
    ],
    nextSteps: [
      "Move the statements rightward on the Delphic-Odyssean line only when the central bank becomes more explicitly state-contingent and promise-like.",
    ],
    solutionOutline: [
      "Delphic guidance mainly reveals the central bank's view of future conditions; Odyssean guidance contains stronger commitment about future policy choices.",
      "The distinction maps naturally to discretion versus commitment: Delphic guidance leans more on information, while Odyssean guidance leans more on credible promises.",
      "The ranking exercise should therefore focus on commitment content, not on whether the statement sounds dovish or hawkish in isolation.",
    ],
    answerPlaceholder:
      "Write the ranking as an ordered list and justify the movement from left to right in one sentence per statement.",
    citations: seminar2Citations,
  }),
  practiceProblem({
    id: "seminar-2-phillips-curve-slope",
    slug: "seminar-2-phillips-curve-slope",
    title: "Seminar 2, Question 4: The Slope of the Phillips Curve",
    moduleSlug: "lecture-7",
    sourceKind: "seminar_problem_set",
    collectionSlug: "seminar-2",
    sourceLabel: "Seminar 2 problem set",
    sourceDetail: "Question 4 from the March 2026 seminar sheet.",
    questionLabel: "Question 4",
    summary:
      "A short policy question on how the slope of the Phillips curve changes discretion and how price flexibility enters the model.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-4", "lecture-7"],
    prompt: [
      "Explain how the slope of the Phillips curve affects optimal policy under discretion and what happens to the Phillips curve when prices become more flexible.",
    ],
    questionBlocks: [
      p("**(a)** How does the slope of the Phillips curve affect optimal policy under discretion?"),
      p("**(b)** What happens to the Phillips curve if prices become more flexible, everything else equal?"),
    ],
    guide: guide(
      "Structural-parameter interpretation",
      "You need to connect a structural parameter to both the geometry of the targeting trade-off and the economic cost of moving inflation.",
      [
        "Phillips-curve slope $\\kappa$",
        "Price flexibility and Calvo parameter $\\theta$",
        "Discretionary targeting rule",
      ],
      [
        "Explain first what a larger or smaller $\\kappa$ means for inflation sensitivity.",
        "Then connect that to how much gap movement is needed to stabilize inflation under discretion.",
      ],
      [
        "Talking only about the data correlation instead of the structural slope.",
        "Forgetting that lower $\\theta$ makes prices more flexible and therefore steepens the structural Phillips curve.",
      ],
    ),
    supportingEquations: [
      {
        id: "seminar2-kappa",
        label: "Slope parameter",
        latex: "\\kappa = \\lambda(\\sigma + \\phi)",
        explanation:
          "In the lecture notation, a larger $\\kappa$ means inflation reacts more strongly to a given amount of slack.",
      },
    ],
    hints: [
      "Translate price flexibility into the slope first. Then explain why the targeting trade-off changes.",
    ],
    nextSteps: [
      "If prices are more flexible, inflation becomes more responsive to slack, so the same inflation correction requires less output-gap movement.",
    ],
    solutionOutline: [
      "A steeper Phillips curve means inflation reacts more strongly to the gap, which changes the discretion trade-off in favor of moving inflation with smaller real costs.",
      "More flexible prices mean a lower Calvo stickiness parameter and a steeper structural Phillips curve.",
    ],
    answerPlaceholder:
      "Explain the structural logic first, then mention the policy implication under discretion.",
    citations: seminar2Citations,
  }),
  practiceProblem({
    id: "seminar-3-ricardian-equivalence",
    slug: "seminar-3-ricardian-equivalence",
    title: "Seminar 3, Question 1: Ricardian Equivalence",
    moduleSlug: "lecture-9",
    sourceKind: "seminar_problem_set",
    collectionSlug: "seminar-3",
    sourceLabel: "Seminar 3 problem set",
    sourceDetail: "Question 1 from the April 2026 seminar sheet.",
    questionLabel: "Question 1",
    summary:
      "A full intertemporal-fiscal reasoning problem on government and household budget constraints.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-9"],
    prompt: [
      "Work through subparts (a)-(e) on the government budget constraint, the consumer budget constraint, Ricardian equivalence, and benchmark failures.",
    ],
    questionBlocks: [
      p("The government budget constraint is given in present-value form with a no-Ponzi condition:"),
      p("$$R(t) = \\int_{\\tau = 0}^{t} r(\\tau)\\, d\\tau, \\quad \\int_{t=0}^{\\infty} e^{-R(t)} G(t)\\, dt \\leq -D(0) + \\int_{t=0}^{\\infty} e^{-R(t)} T(t)\\, dt, \\quad \\lim_{s\\to\\infty} e^{-R(s)} D(s) \\leq 0.$$"),
      p("The consumer budget constraint is:"),
      p("$$\\int_{t=0}^{\\infty} e^{-R(t)} C(t)\\, dt \\leq K(0) + D(0) + \\int_{t=0}^{\\infty} e^{-R(t)}[W(t) - T(t)]\\, dt.$$"),
      p("**(a)** Explain how discounting with $e^{-R(t)}$ allows the interest rate to vary over time."),
      p("**(b)** Explain how the government budget constraint limits government purchases over time."),
      p("**(c)** Explain the consumer budget constraint."),
      p("**(d)** Use the government budget constraint to illustrate why the quantity of government purchases, not whether they are financed with taxes or bonds, affects private consumption in the Ricardian benchmark."),
      p("**(e)** Discuss reasons why Ricardian equivalence may not hold."),
    ],
    guide: guide(
      "Intertemporal benchmark reasoning",
      "The problem asks you to explain the benchmark carefully before you criticize it. You need to show how solvency, discounting, and private expectations fit together.",
      [
        "Present-value discounting",
        "Government intertemporal budget constraint",
        "Consumer budget constraint",
        "No-Ponzi condition",
        "Ricardian equivalence failures",
      ],
      [
        "Explain each constraint in plain English before using it for equivalence logic.",
        "Then connect the government's future taxes to the household's perceived wealth.",
        "Only after the benchmark is clear should you list the reasons it may fail.",
      ],
      [
        "Treating the benchmark as saying debt never matters in any world.",
        "Listing failure reasons before showing why the benchmark works in the first place.",
      ],
    ),
    supportingEquations: [
      {
        id: "seminar3-budget",
        label: "Government solvency benchmark",
        latex:
          "\\int_0^{\\infty} e^{-R(t)} G(t)\\,dt \\leq -D(0) + \\int_0^{\\infty} e^{-R(t)} T(t)\\,dt",
        explanation:
          "Borrowing can reshuffle taxes across time, but it cannot remove the need for future financing.",
      },
    ],
    hints: [
      "Explain the present-value logic first. Ricardian equivalence only makes sense once the two budget constraints are interpreted together.",
    ],
    nextSteps: [
      "Use subpart (d) to connect the government's future tax burden to the household's wealth position.",
    ],
    solutionOutline: [
      "Discounting with $e^{-R(t)}$ allows the interest rate to vary over time because $R(t)$ cumulates the whole interest-rate path.",
      "The government budget constraint limits purchases because the present value of spending must be backed by initial wealth and the present value of taxes, subject to the no-Ponzi condition.",
      "Ricardian equivalence then says debt-financed tax cuts do not create net wealth if households fully internalize future taxes.",
      "The result can fail under liquidity constraints, myopia, unequal incidence, distortionary taxation, or political-economy frictions.",
    ],
    answerPlaceholder:
      "Use short headings for each subpart so your own reasoning stays organized.",
    citations: seminar3Citations,
  }),
  practiceProblem({
    id: "seminar-3-debt-sustainability",
    slug: "seminar-3-debt-sustainability",
    title: "Seminar 3, Question 2: Sustainable Public Debt",
    moduleSlug: "lecture-10",
    sourceKind: "seminar_problem_set",
    collectionSlug: "seminar-3",
    sourceLabel: "Seminar 3 problem set",
    sourceDetail: "Question 2 from the April 2026 seminar sheet.",
    questionLabel: "Question 2",
    summary:
      "A compact debt-dynamics problem mixing arithmetic, institutions, and crisis logic.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-10"],
    prompt: [
      "Use the debt-dynamics approximation to discuss sustainability, Japan's experience, and the fiscal-commons problem.",
    ],
    questionBlocks: [
      p("The seminar gives the approximation $$\\Delta d \\approx (r-g)\\cdot d - s$$ where $d = D/Y$, $s$ is the primary surplus share, $r$ is the real interest rate, and $g$ is real GDP growth."),
      p("**(a)** Explain under what conditions a primary deficit can coexist with sustainable public debt."),
      p("**(b)** Japan's debt-to-GDP ratio exceeded 200 percent without a debt crisis. What economic condition made this possible?"),
      p("**(c)** Explain the fiscal-commons problem. Which type of government is most susceptible, and what institutions can mitigate deficit bias?"),
    ],
    guide: guide(
      "Debt arithmetic plus political economy",
      "The question is deliberately broader than one formula. You need to use the debt equation, then connect it to institutions and equilibrium risk.",
      [
        "Debt dynamics",
        "Interest-growth differential",
        "Primary surplus",
        "Fiscal commons",
        "Institutional deficit bias",
      ],
      [
        "Explain the arithmetic first: what happens when $r-g$ is favorable or unfavorable.",
        "Then move from arithmetic to institutions, credibility, and coalition incentives.",
      ],
      [
        "Answering only with $r-g$ and ignoring the role of institutions and political fragmentation.",
        "Talking about Japan as if high debt is always harmless rather than conditional on financing conditions.",
      ],
    ),
    supportingEquations: [
      {
        id: "seminar3-debt-dynamics",
        label: "Debt-to-GDP dynamics",
        latex: "\\Delta d \\approx (r-g)d - s",
        explanation:
          "This is the arithmetic benchmark. Lecture 10 then asks what expectations and institutions do on top of it.",
      },
    ],
    hints: [
      "Split the question into arithmetic, Japan as an example, and fiscal commons as an institutional mechanism.",
    ],
    nextSteps: [
      "For part (a), explain how a negative or small $(r-g)$ can offset a primary deficit when debt is sustainable.",
    ],
    solutionOutline: [
      "A primary deficit can coexist with sustainable debt when favorable debt arithmetic, especially a low or negative $(r-g)$, keeps the ratio from exploding.",
      "Japan could sustain high debt because growth-adjusted financing conditions were unusually benign for a long time.",
      "The fiscal-commons problem arises when many political actors internalize only part of the budget cost, which biases policy toward larger deficits.",
    ],
    answerPlaceholder:
      "Use one paragraph for arithmetic and one for political economy so the two logics do not get blended together.",
    citations: seminar3Citations,
  }),
  practiceProblem({
    id: "seminar-3-inequality",
    slug: "seminar-3-inequality",
    title: "Seminar 3, Question 3: Income Distribution and Inequality",
    moduleSlug: "lecture-11",
    sourceKind: "seminar_problem_set",
    collectionSlug: "seminar-3",
    sourceLabel: "Seminar 3 problem set",
    sourceDetail: "Question 3 from the April 2026 seminar sheet.",
    questionLabel: "Question 3",
    summary:
      "A mixed inequality problem combining Cobb-Douglas factor shares, Lorenz geometry, and centralized bargaining.",
    supportMode: "derivation",
    relatedModuleSlugs: ["lecture-11"],
    prompt: [
      "Work through subparts (a)-(c) on Cobb-Douglas factor shares, the Gini approximation, and centralized wage bargaining.",
    ],
    questionBlocks: [
      p("**(a)** In a Cobb-Douglas economy $$Y = K^{\\alpha}L^{1-\\alpha}$$, show that the labour share equals $(1-\\alpha)$ and the capital share equals $\\alpha$. What is a key limitation of applying this result literally to observed wage inequality?"),
      p("**(b)** Consider five income quintiles with shares $5\\%, 10\\%, 15\\%, 25\\%, 45\\%$. Compute cumulative income shares and approximate the Gini coefficient using $$G \\approx 1 - 2 \\times (\\text{area under the Lorenz curve}).$$"),
      p("**(c)** Would centralized wage bargaining as in the Scandinavian model be expected to produce a higher or lower Gini than a fully decentralized labor market? Explain the mechanism."),
    ],
    guide: guide(
      "By-hand inequality calculation and interpretation",
      "This is a hand-solvable exercise. You need both a clean calculation and a clear interpretation of what the calculation leaves out.",
      [
        "Cobb-Douglas factor shares",
        "Cumulative shares",
        "Lorenz curve",
        "Gini approximation",
        "Scandinavian wage compression",
      ],
      [
        "Do the factor-share algebra first and interpret its limit for wage inequality.",
        "Then compute cumulative shares carefully before doing any geometry.",
        "Only after the numbers are done should you explain the wage-bargaining mechanism.",
      ],
      [
        "Using non-cumulative shares in the Lorenz curve.",
        "Treating factor shares as a complete theory of personal wage inequality.",
      ],
    ),
    supportingEquations: [
      {
        id: "seminar3-gini",
        label: "Gini approximation",
        latex: "G \\approx 1 - 2A",
        explanation:
          "Here $A$ is the area under the Lorenz curve. The sheet expects you to approximate that area with trapezoids.",
      },
    ],
    stepGuide: [
      step(
        "Derive the factor shares",
        "Differentiate the Cobb-Douglas production function with respect to labor and capital, multiply each marginal product by the relevant factor quantity, and divide by output.",
        "Under competitive pricing, factor income equals marginal product times quantity.",
        "Competitive factor pricing in a Cobb-Douglas economy.",
        "This shows why labour gets $(1-\\alpha)$ and capital gets $\\alpha$ in the benchmark.",
        "\\frac{wL}{Y} = 1-\\alpha, \\qquad \\frac{rK}{Y} = \\alpha",
      ),
      step(
        "Build the Lorenz points",
        "Turn the quintile shares into cumulative income shares and pair them with cumulative population shares.",
        "The Lorenz curve is defined on cumulative shares, not on raw quintile shares.",
        "Definition of the Lorenz curve.",
        "This gives you the points needed for the trapezoid rule.",
      ),
      step(
        "Approximate the area",
        "Compute the area under the Lorenz curve by adding the trapezoids between adjacent cumulative-share points.",
        "The trapezoid rule is the approximation method specified in the seminar question.",
        "Numerical approximation by trapezoids.",
        "Once you have the area $A$, the Gini follows immediately.",
      ),
      step(
        "Interpret the bargaining mechanism",
        "After the calculation, explain how centralized bargaining compresses wages and therefore tends to compress the personal income distribution too.",
        "The question asks for both a numeric inequality measure and an institutional interpretation.",
        "Scandinavian model and wage compression.",
        "This connects the geometric calculation back to Lecture 11's policy and institution logic.",
      ),
    ],
    hints: [
      "Do the Lorenz-curve geometry on paper. The main learning gain comes from seeing the cumulative shares rather than typing them.",
    ],
    nextSteps: [
      "List the cumulative income shares explicitly before you touch the trapezoid rule.",
    ],
    solutionOutline: [
      "The Cobb-Douglas benchmark gives constant factor shares, but that does not by itself explain personal wage inequality.",
      "The Lorenz-curve calculation requires cumulative income shares, then trapezoid areas, then the Gini formula.",
      "Centralized bargaining typically lowers the Gini by compressing the wage distribution relative to a decentralized benchmark.",
    ],
    handSolveNote:
      "Solve this one by hand. Use the progressive help only if you get stuck on the algebra or the Lorenz-curve geometry.",
    answerPlaceholder:
      "Optional: write where your handwritten solution broke down so the tutor can focus the clarification there.",
    citations: seminar3Citations,
  }),
  practiceProblem({
    id: "seminar-3-environment",
    slug: "seminar-3-environment",
    title: "Seminar 3, Question 4: Growth, Resources, and the Environment",
    moduleSlug: "lecture-12",
    sourceKind: "seminar_problem_set",
    collectionSlug: "seminar-3",
    sourceLabel: "Seminar 3 problem set",
    sourceDetail: "Question 4 from the April 2026 seminar sheet.",
    questionLabel: "Question 4",
    summary:
      "A mixed question on resource drag, the Coase benchmark, and carbon-pricing instrument choice.",
    supportMode: "derivation",
    relatedModuleSlugs: ["lecture-12"],
    prompt: [
      "Work through subparts (a)-(c) on the extended Solow model, the Coase theorem, and carbon-pricing instruments.",
    ],
    questionBlocks: [
      p("Consider the extended Solow model with $$Y = K^{\\alpha}(AL)^{1-\\alpha-\\beta}R^{\\beta}$$ where productivity grows at rate $g$, labor at rate $n$, and resources deplete at rate $b$."),
      p("**(a)** Set $b = g$ as in the Lecture 12 homework. Derive the steady-state per-capita growth rate. What is the resource drag, and when is it larger?"),
      p("**(b)** State the Coase theorem. Give three features of climate change that make private Coasian solutions ineffective."),
      p("**(c)** Compare carbon taxes and cap-and-trade. Which is preferred when the marginal abatement cost curve is steep, and why?"),
    ],
    guide: guide(
      "Derivation plus policy interpretation",
      "The question moves from growth-accounting algebra to climate-policy benchmarks. You need to keep those parts connected rather than treating them as unrelated bullets.",
      [
        "Extended Solow model",
        "Resource drag",
        "Coase theorem",
        "Transaction costs and diffuse externalities",
        "Carbon tax versus cap-and-trade",
      ],
      [
        "Do the growth-rate derivation first and isolate the resource-drag term clearly.",
        "Then state the Coase theorem as a benchmark before explaining why climate change violates its practical conditions.",
        "End with the instrument-choice logic under uncertainty and steep marginal abatement costs.",
      ],
      [
        "Using the Coase theorem as if it were a direct policy recommendation for climate change.",
        "Explaining resource drag verbally without showing where it enters the growth expression.",
      ],
    ),
    supportingEquations: [
      {
        id: "seminar3-extended-solow",
        label: "Extended production benchmark",
        latex: "Y = K^{\\alpha}(AL)^{1-\\alpha-\\beta}R^{\\beta}",
        explanation:
          "The resource term is what creates the extra drag relative to the textbook benchmark.",
      },
    ],
    stepGuide: [
      step(
        "Differentiate the production function",
        "Take growth rates term by term so output growth becomes a weighted sum of capital, technology, labor, and resource growth.",
        "For Cobb-Douglas functions, log differentiation turns exponents into weights on growth rates.",
        "Log differentiation of a Cobb-Douglas production function.",
        "This is the step that makes the resource-drag term visible.",
      ),
      step(
        "Insert the resource law of motion",
        "Substitute $\\dot R / R = -b$ and the steady-state condition that capital and output grow at the same rate.",
        "The seminar explicitly tells you to use the steady-state shortcut for the capital-growth term.",
        "Steady-state growth accounting.",
        "This yields the closed-form growth expression used in Lecture 12.",
      ),
      step(
        "Interpret the benchmark $\\beta = 0$",
        "Set the resource share to zero and compare the resulting expression to the standard benchmark.",
        "Removing the resource input cleanly isolates what part of the growth formula is due to scarcity.",
        "Benchmark comparison.",
        "This is how you explain what resource drag means rather than just naming it.",
      ),
      step(
        "Move from theory to policy",
        "After the derivation, explain why the Coase benchmark fails in climate policy and how the choice between taxes and quantities depends on slope and uncertainty.",
        "The question is designed to connect the model benchmark to real policy design.",
        "Externalities and instrument choice under uncertainty.",
        "This completes the bridge from growth theory to climate-policy reasoning.",
      ),
    ],
    hints: [
      "Keep the algebra and the policy benchmark separate at first. The question becomes much clearer when you solve part (a) before you touch parts (b) and (c).",
    ],
    nextSteps: [
      "Write the growth rate of output as a weighted sum of the growth rates of $K$, $A$, $L$, and $R$ before simplifying.",
    ],
    solutionOutline: [
      "Resource drag is the negative growth contribution coming from the depletion term when resources enter production with positive share $\\beta$.",
      "The drag becomes larger when the resource share or the depletion rate is larger.",
      "The Coase theorem is a benchmark, but climate change violates its ideal conditions through many agents, diffuse harms, international spillovers, and high transaction costs.",
      "When marginal abatement costs are steep, a quantity instrument can be less attractive than a tax because price mistakes are less costly than quantity mistakes in that case.",
    ],
    handSolveNote:
      "This one is meant for paper. The derivation is easier to follow by hand, and the stepwise guide explains the logic behind each manipulation.",
    answerPlaceholder:
      "Optional: note the step or expression where your handwritten derivation stopped making sense.",
    citations: seminar3Citations,
  }),
  practiceProblem({
    id: "exam-2024-question-1-forward-guidance",
    slug: "exam-2024-question-1-forward-guidance",
    title: "Exam 2024, Question 1: Forward Guidance",
    moduleSlug: "lecture-6",
    sourceKind: "past_exam",
    collectionSlug: "exam-2024",
    sourceLabel: "Final exam 2024",
    sourceDetail: "Question 1 from the May 2024 final exam.",
    questionLabel: "Question 1",
    summary:
      "A short exam question testing whether the student can connect Delphic versus Odyssean guidance to commitment versus discretion.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-5", "lecture-6"],
    prompt: [
      "Discuss the distinction between Delphic and Odyssean forward guidance and explain how it links to commitment and discretion in monetary policy.",
    ],
    questionBlocks: [
      p("**(a)** What is the distinction between Delphic and Odyssean forward guidance? Give a short example of each."),
      p("**(b)** How is the distinction between commitment and discretion in monetary policy linked to the two different types of forward guidance?"),
    ],
    guide: guide(
      "Short conceptual exam answer",
      "This question is asking for a clean two-part answer. First define the two kinds of guidance. Then map them onto commitment versus discretion.",
      [
        "Delphic guidance",
        "Odyssean guidance",
        "Commitment versus discretion",
      ],
      [
        "Answer part (a) with one sentence on information and one sentence on commitment.",
        "Then answer part (b) by explaining why Delphic guidance is closer to discretion and Odyssean guidance is closer to commitment.",
      ],
      [
        "Giving two examples without defining the conceptual distinction first.",
        "Treating all forward guidance as commitment regardless of informational content.",
      ],
    ),
    supportingEquations: [],
    hints: [
      "Keep the structure strict: definition first, link to policy regime second.",
    ],
    nextSteps: [
      "Use one sentence to define Delphic guidance as information and one sentence to define Odyssean guidance as commitment.",
    ],
    solutionOutline: [
      "Delphic guidance communicates information about the outlook and future policy conditional on that outlook.",
      "Odyssean guidance communicates a stronger commitment to future policy choices.",
      "That is why Delphic guidance is closer to discretion, while Odyssean guidance is closer to commitment.",
    ],
    answerPlaceholder:
      "Write as if this were a 10-point exam answer: short, structured, and economically precise.",
    citations: exam2024Citations,
  }),
  practiceProblem({
    id: "exam-2024-question-2-mpc-distribution",
    slug: "exam-2024-question-2-mpc-distribution",
    title: "Exam 2024, Question 2: MPC Distribution",
    moduleSlug: "lecture-8",
    sourceKind: "past_exam",
    collectionSlug: "exam-2024",
    sourceLabel: "Final exam 2024",
    sourceDetail: "Question 2 from the May 2024 final exam.",
    questionLabel: "Question 2",
    summary:
      "A heterogeneity question on why MPCs differ and why the covariance term amplifies aggregate shocks.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-8"],
    prompt: [
      "Explain why individuals may have different MPCs, then interpret the covariance term in Patterson's aggregate-MPC decomposition.",
    ],
    questionBlocks: [
      p("The exam gives the decomposition"),
      p("$$\\mathrm{MPC} = \\sum_i \\frac{dC_i}{dE_i}\\frac{dE_i}{dY} = \\sum_i \\frac{E_i}{Y}\\frac{dC_i}{dE_i} + \\operatorname{cov}\\!\\left(\\frac{dC_i}{dE_i}, \\frac{dE_i}{dY}\\frac{Y}{E_i}\\right).$$"),
      p("**(a)** Briefly discuss a few reasons why individuals may have different MPCs."),
      p("**(b)** Explain what role the covariance term has for the amplification of aggregate shocks and economic policy."),
    ],
    guide: guide(
      "Heterogeneity and amplification",
      "The exam is testing whether you understand both household heterogeneity and why distribution affects aggregate transmission.",
      [
        "Household MPC heterogeneity",
        "Balance sheets and liquidity",
        "Aggregate MPC",
        "Covariance or matching multiplier",
      ],
      [
        "Start with concrete reasons for different MPCs: liquidity, assets, income risk, demographics, and exposure.",
        "Then explain that the covariance term captures whether shocks land on households whose MPCs are high.",
      ],
      [
        "Describing the covariance term as just a technical correction.",
        "Ignoring that amplification depends on who receives the income change, not only on the average MPC.",
      ],
    ),
    supportingEquations: [
      {
        id: "exam2024-mpc",
        label: "Aggregate-MPC decomposition",
        latex:
          "\\mathrm{MPC} = \\sum_i \\frac{E_i}{Y}\\frac{dC_i}{dE_i} + \\operatorname{cov}\\!\\left(\\frac{dC_i}{dE_i}, \\frac{dE_i}{dY}\\frac{Y}{E_i}\\right)",
        explanation:
          "The covariance term is what makes distribution part of macro transmission rather than a side note.",
      },
    ],
    hints: [
      "Answer part (a) at the household level and part (b) at the aggregate-transmission level.",
    ],
    nextSteps: [
      "Explain the covariance term as a 'who gets hit' term: shocks are amplified when they fall on high-MPC households.",
    ],
    solutionOutline: [
      "MPCs differ because households differ in liquidity, wealth, balance sheets, income risk, and the ability to smooth consumption.",
      "The covariance term is positive when shocks or policy disproportionately affect households with high MPCs, which amplifies aggregate demand responses.",
    ],
    answerPlaceholder:
      "Use one short paragraph on household heterogeneity and one on the covariance term.",
    citations: exam2024Citations,
  }),
  practiceProblem({
    id: "exam-2024-question-3-optimal-policy",
    slug: "exam-2024-question-3-optimal-policy",
    title: "Exam 2024, Question 3: Optimal Monetary Policy",
    moduleSlug: "lecture-4",
    sourceKind: "past_exam",
    collectionSlug: "exam-2024",
    sourceLabel: "Final exam 2024",
    sourceDetail: "Question 3 from the May 2024 final exam.",
    questionLabel: "Question 3",
    summary:
      "A benchmark divine-coincidence question asking what the shock is, what optimal policy does, and why $i_t = r_t^n$ is not a sufficient practical rule.",
    supportMode: "derivation",
    relatedModuleSlugs: ["lecture-2", "lecture-3", "lecture-4"],
    prompt: [
      "Work through the exam's three-part question on the NKPC, DIS, the implied shock, and the logic of optimal monetary policy.",
    ],
    questionBlocks: [
      p("The exam gives the benchmark system"),
      p("$$\\pi_t = \\beta E_t\\pi_{t+1} + \\kappa \\tilde y_t$$"),
      p("$$\\tilde y_t = E_t\\tilde y_{t+1} - \\frac{1}{\\sigma}(i_t - E_t\\pi_{t+1} - r_t^n)$$"),
      p("together with the benchmark expressions for $\\kappa$, $r_t^n$, and $y_t^n$, and the calibration $\\rho_a = 0$, $\\rho_z = 0.5$, $\\varepsilon_t^a = 0$, $\\varepsilon_t^z = 0.5$."),
      p("**(a)** What shock is present in this model economy?"),
      p("**(b)** What is optimal monetary policy here? Discuss in words and show using equations."),
      p("**(c)** Discuss whether the rule $$i_t = r_t^n$$ could be the optimal rule for the central bank in response to this shock, and whether there are more advantageous rules."),
    ],
    guide: guide(
      "Model-based derivation and interpretation",
      "This is an exam derivation question. You must identify the shock, use the benchmark equations to state the optimal allocation, and then explain why a practical interest-rate rule needs more than the natural rate alone.",
      [
        "Discount-factor shock",
        "Divine coincidence",
        "Dynamic IS equation",
        "Taylor principle",
        "Blanchard-Kahn determinacy",
      ],
      [
        "Identify the shock from the calibration before doing anything else.",
        "Use the NKPC and DIS to show the divine-coincidence benchmark allocation.",
        "Then separate the equilibrium characterization from the practical design of an implementable policy rule.",
      ],
      [
        "Jumping straight to 'set $i_t = r_t^n$' without discussing observability and determinacy.",
        "Talking about optimal policy without showing why the zero-inflation, zero-gap allocation is feasible in the benchmark.",
      ],
    ),
    supportingEquations: [
      {
        id: "exam2024-nkpc",
        label: "Benchmark NKPC",
        latex: "\\pi_t = \\beta E_t\\pi_{t+1} + \\kappa \\tilde y_t",
        explanation:
          "In the no-cost-push benchmark, zero inflation and a zero output gap are jointly feasible.",
      },
      {
        id: "exam2024-dis",
        label: "Dynamic IS equation",
        latex:
          "\\tilde y_t = E_t\\tilde y_{t+1} - \\frac{1}{\\sigma}(i_t - E_t\\pi_{t+1} - r_t^n)",
        explanation:
          "Use this to infer the interest-rate path consistent with the benchmark allocation.",
      },
    ],
    stepGuide: [
      step(
        "Identify the shock from the calibration",
        "Read the persistence and innovation assumptions carefully and isolate which exogenous process is active.",
        "The model tells you directly that the technology innovation is zero and the discount-factor innovation is positive.",
        "Shock identification from calibration restrictions.",
        "You cannot state optimal policy correctly until you know which disturbance the central bank is responding to.",
      ),
      step(
        "Show the divine-coincidence allocation",
        "Set the target allocation to $\\pi_t = 0$ and $\\tilde y_t = 0$, then check whether the benchmark NKPC allows that.",
        "With no cost-push shock in the Phillips curve, zero inflation implies a zero output gap is feasible.",
        "Benchmark divine coincidence.",
        "This establishes the welfare benchmark for the policy discussion.",
      ),
      step(
        "Read off the implied rate path",
        "Plug the benchmark allocation into the Dynamic IS equation and solve for the interest-rate condition.",
        "If the gap and expected future gap are both zero, the real-rate gap must also be zero.",
        "Dynamic IS consistency.",
        "This is the step that makes $i_t$ relative to $r_t^n$ appear naturally.",
        "i_t - E_t\\pi_{t+1} = r_t^n",
      ),
      step(
        "Separate equilibrium logic from practical policy design",
        "Explain why $i_t = r_t^n$ describes an equilibrium object but is still not a robust implementable rule.",
        "The natural rate is unobserved and the rule does not by itself guarantee a determinate equilibrium.",
        "Observability and Blanchard-Kahn determinacy.",
        "This is what the final exam part is really probing: benchmark logic versus usable policy design.",
      ),
    ],
    hints: [
      "Use the benchmark logic from Lectures 3 and 4: no cost-push shock means the policymaker can in principle eliminate both inflation and the gap.",
    ],
    nextSteps: [
      "Show first that the active shock is the discount-factor shock, then use the NKPC to motivate the zero-inflation, zero-gap benchmark.",
    ],
    solutionOutline: [
      "The active disturbance is the discount-factor shock.",
      "Optimal policy exploits divine coincidence in the benchmark and stabilizes both inflation and the output gap.",
      "The Dynamic IS equation then implies that the real rate should track the natural rate along the equilibrium path.",
      "But the rule $i_t = r_t^n$ is not a sufficient practical rule because $r_t^n$ is unobserved and the equilibrium need not be locally unique.",
      "A strong Taylor rule written in observables is more practical because it anchors expectations and supports determinacy.",
    ],
    handSolveNote:
      "Solve this one by hand. The point is to move from the benchmark equations to the policy interpretation step by step.",
    answerPlaceholder:
      "Optional: note the exact step where you got stuck, for example shock identification, the divine-coincidence argument, or the determinacy discussion.",
    citations: exam2024Citations,
  }),
  practiceProblem({
    id: "exam-2024-question-4-phillips-curve-figure",
    slug: "exam-2024-question-4-phillips-curve-figure",
    title: "Exam 2024, Question 4: The Slope of the Phillips Curve",
    moduleSlug: "lecture-7",
    sourceKind: "past_exam",
    collectionSlug: "exam-2024",
    sourceLabel: "Final exam 2024",
    sourceDetail: "Question 4 from the May 2024 final exam, including Figure 1.",
    questionLabel: "Question 4",
    summary:
      "A figure-based interpretation question on why a flatter reduced-form correlation can still coexist with an unchanged structural targeting rule.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-4", "lecture-7"],
    prompt: [
      "Use Figure 1 and the lecture hypotheses to explain how the red line in the scatter plot can flatten even when the structural targeting rule is unchanged.",
    ],
    questionBlocks: [
      figureNote({
        title: "Exam 2024 Figure 1 and prompt",
        caption:
          "This is the original exam page. The key teaching point is that the **red reduced-form correlation can flatten without changing the structural targeting rule in panel (b)**.",
        imagePath: "/figures/practice/exam-2024/exam-2024-q4-page.png",
        altText: "Original 2024 exam page with Figure 1 and the Phillips-curve slope question.",
      }),
      p("The exam asks you to discuss one explanation for why the lower average correlation in panel (a) can still be consistent with an unchanged targeting rule in panel (b)."),
    ],
    guide: guide(
      "Figure interpretation with structural discipline",
      "The question is testing whether you can separate a reduced-form data relationship from a deep structural relation used for policy.",
      [
        "Reduced-form inflation-output correlation",
        "Structural Phillips-curve slope",
        "Targeting rule under discretion",
        "Policy, shocks, and measurement hypotheses",
      ],
      [
        "Start by stating that the exam holds the targeting rule fixed on purpose.",
        "Then choose one lecture-consistent explanation for why the data cloud can flatten anyway.",
        "Explain why that explanation changes the observed correlation without changing the structural relation in the targeting rule.",
      ],
      [
        "Treating the flatter red line as direct proof that the structural Phillips curve changed.",
        "Ignoring the exam hint that panel (b) is unchanged.",
      ],
    ),
    supportingEquations: [],
    hints: [
      "Pick one of the lecture's explanations that leaves the structural relation intact: more aggressive policy, more volatile supply shocks, or mismeasurement of slack.",
    ],
    nextSteps: [
      "Write one sentence saying that the targeting rule is structural and unchanged, then explain how your chosen hypothesis changes the observed correlation in panel (a).",
    ],
    solutionOutline: [
      "A flatter raw correlation in the data does not by itself prove that the structural Phillips-curve slope changed.",
      "The lecture gives several explanations consistent with an unchanged structural targeting rule, such as a stronger policy response, more volatile supply shocks, or poor slack measurement.",
      "The right answer therefore distinguishes structural policy geometry from observed data correlations.",
    ],
    answerPlaceholder:
      "Choose one explanation and defend it clearly instead of listing several weakly.",
    citations: exam2024Citations,
  }),
  practiceProblem({
    id: "exam-2024-question-5-ricardian-equivalence",
    slug: "exam-2024-question-5-ricardian-equivalence",
    title: "Exam 2024, Question 5: Ricardian Equivalence",
    moduleSlug: "lecture-9",
    sourceKind: "past_exam",
    collectionSlug: "exam-2024",
    sourceLabel: "Final exam 2024",
    sourceDetail: "Question 5 from the May 2024 final exam.",
    questionLabel: "Question 5",
    summary:
      "A long-form fiscal benchmark question with original budget-constraint pages preserved as source images.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-9"],
    prompt: [
      "Explain the government and consumer budget constraints, then use them to show the Ricardian benchmark and discuss why it may fail.",
    ],
    questionBlocks: [
      figureNote({
        title: "Exam 2024 Question 5 original page",
        caption:
          "Use the original exam page to keep the government and consumer budget constraints exactly as stated in the source.",
        imagePath: "/figures/practice/exam-2024/exam-2024-q5-page.png",
        altText: "Original 2024 exam page for Question 5 on Ricardian equivalence.",
      }),
      p("Answer subparts **(a)-(e)** in the same structure as the original exam question."),
    ],
    guide: guide(
      "Long-form benchmark explanation",
      "This is a structured fiscal-theory answer. You need to explain the constraints first and only then use them to reason about equivalence.",
      [
        "Present-value government budget constraint",
        "Consumer budget constraint",
        "No-Ponzi condition",
        "Ricardian equivalence",
        "Benchmark failures",
      ],
      [
        "Treat subparts (a)-(c) as set-up. Do not rush to equivalence before the budget constraints are clear.",
        "Use subpart (d) to connect public and private intertemporal constraints.",
        "End with benchmark failures that are economically grounded rather than just listed.",
      ],
      [
        "Skipping the explanatory budget-constraint work and jumping straight to 'households anticipate future taxes.'",
        "Claiming that Ricardian equivalence says debt can never matter in practice.",
      ],
    ),
    supportingEquations: [],
    hints: [
      "The strongest answers explain the two budget constraints in words before using them for equivalence logic.",
    ],
    nextSteps: [
      "Write one paragraph on the government constraint, one on the consumer constraint, and only then move to the equivalence argument.",
    ],
    solutionOutline: [
      "The government budget constraint says the present value of spending must be backed by initial wealth and the present value of taxes, subject to the no-Ponzi condition.",
      "The consumer budget constraint says the present value of consumption is limited by initial wealth and the present value of net income.",
      "Under strong assumptions, debt-financed tax changes do not change net wealth because households internalize future taxes.",
      "The result can fail for many reasons, including liquidity constraints, myopia, distortionary taxation, and heterogeneous incidence.",
    ],
    answerPlaceholder:
      "Treat this like a 30-point exam answer: clear headings, full sentences, and explicit budget-constraint interpretation.",
    citations: exam2024Citations,
  }),
  practiceProblem({
    id: "exam-2024-question-6-tax-smoothing",
    slug: "exam-2024-question-6-tax-smoothing",
    title: "Exam 2024, Question 6: Tax Smoothing",
    moduleSlug: "lecture-9",
    sourceKind: "past_exam",
    collectionSlug: "exam-2024",
    sourceLabel: "Final exam 2024",
    sourceDetail: "Question 6 from the May 2024 final exam.",
    questionLabel: "Question 6",
    summary:
      "A derivation question on why convex tax distortions imply a constant tax share over time in the benchmark.",
    supportMode: "derivation",
    relatedModuleSlugs: ["lecture-9"],
    prompt: [
      "Derive the tax-smoothing result and explain why the optimal policy equalizes marginal distortion across time.",
    ],
    questionBlocks: [
      figureNote({
        title: "Exam 2024 Question 6 original page",
        caption:
          "The original exam page preserves the tax-cost function and minimization problem exactly as students see it in the source.",
        imagePath: "/figures/practice/exam-2024/exam-2024-q6-page.png",
        altText: "Original 2024 exam page for Question 6 on tax smoothing.",
      }),
      p("The exam asks **(a)** why tax costs rise with the tax share of income and **(b)** why the minimization problem implies that taxes should be a constant fraction of income over time."),
    ],
    guide: guide(
      "By-hand optimal-tax derivation",
      "The real task is not to memorize the result but to show why convex distortions imply equalized marginal tax costs across time.",
      [
        "Convex distortions",
        "Intertemporal budget constraint",
        "Marginal benefit versus marginal cost",
        "Constant tax share",
      ],
      [
        "Interpret part (a) briefly, then spend most of your effort on part (b).",
        "Set the marginal benefit of lowering taxes today equal to the marginal cost of raising them tomorrow.",
        "Use that equality to show that the optimal tax share is constant over time in the benchmark.",
      ],
      [
        "Stating the constant-tax-share result without showing the marginal condition.",
        "Forgetting that the result is about the tax share of income, not necessarily the level of taxes.",
      ],
    ),
    supportingEquations: [
      {
        id: "exam2024-tax-cost",
        label: "Tax distortion benchmark",
        latex: "C_t = Y_t f\\!\\left(\\frac{T_t}{Y_t}\\right)",
        explanation:
          "The convexity of $f$ is the reason tax distortions become more painful as taxes absorb a larger share of income.",
      },
    ],
    stepGuide: [
      step(
        "Interpret the objective correctly",
        "Read the planner's problem as minimizing the discounted distortion cost of taxes, not the level of taxes itself.",
        "The loss depends on the tax share through the convex function $f(\\cdot)$.",
        "Convex distortion benchmark.",
        "This tells you what must be equalized across time: marginal distortion, not raw tax revenue.",
      ),
      step(
        "Compare adjacent periods",
        "Imagine lowering taxes slightly in period $t$ and raising them in period $t+1$ just enough to keep the intertemporal budget constraint satisfied.",
        "This is the clean marginal-comparison argument used in the official solution.",
        "Marginal benefit equals marginal cost across time.",
        "This is the step that generates the constant-share result.",
      ),
      step(
        "Write the marginal condition",
        "Set the marginal benefit from reducing the tax share today equal to the marginal cost of increasing the tax share tomorrow.",
        "In the optimum, there is no gain from shifting distortions across dates if the intertemporal constraint is respected.",
        "First-order optimality across time.",
        "This is the algebraic core of the derivation.",
      ),
      step(
        "Read off the implication",
        "Use the convexity and monotonicity of $f'$ to conclude that the tax share must be constant across time in the benchmark.",
        "If marginal distortions are equalized and $f'$ is one-to-one, the tax share must be equalized too.",
        "Invertibility of the marginal distortion schedule.",
        "This gives the result the exam is asking you to explain.",
      ),
    ],
    hints: [
      "Do not start from the final result. Start from the marginal trade-off between moving taxes across dates.",
    ],
    nextSteps: [
      "Write one line for the marginal benefit of reducing the tax share today and one line for the marginal cost of increasing it tomorrow.",
    ],
    solutionOutline: [
      "The benchmark says tax distortions are convex in the tax share of income.",
      "The planner therefore wants to smooth the marginal distortion over time, not bunch it in one period.",
      "Setting marginal benefit equal to marginal cost across dates implies a constant tax share in the benchmark.",
    ],
    handSolveNote:
      "This problem should be solved by hand. The stepwise help is meant to teach the derivation logic rather than replace it.",
    answerPlaceholder:
      "Optional: describe where your handwritten derivation broke down, for example the marginal-condition step.",
    citations: exam2024Citations,
  }),
  practiceProblem({
    id: "exam-2025-question-1-taylor-rules",
    slug: "exam-2025-question-1-taylor-rules",
    title: "Exam 2025, Question 1: Estimation of Taylor Rules",
    moduleSlug: "lecture-1",
    sourceKind: "past_exam",
    collectionSlug: "exam-2025",
    sourceLabel: "Final exam 2025",
    sourceDetail: "Question 1 from the April 2025 final exam.",
    questionLabel: "Question 1",
    summary:
      "A conceptual bridge from Clarida-Gali-Gertler to the Taylor principle and Blanchard-Kahn determinacy.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-1", "lecture-3"],
    prompt: [
      "Discuss the main pre-Volcker versus post-Volcker Taylor-rule result and connect it to the Taylor principle and the Blanchard-Kahn condition.",
    ],
    questionBlocks: [
      p("Clarida, Gali, and Gertler (2000) estimate Taylor rules over a pre-Volcker sample and a post-Volcker sample."),
      p("Discuss the main result and relate it to the Taylor principle and the Blanchard-Kahn condition in the New Keynesian model discussed in class."),
    ],
    guide: guide(
      "Empirical result linked to theory",
      "This is asking for one empirical contrast and one theoretical interpretation. You should move cleanly from estimated inflation coefficients to determinacy.",
      [
        "Pre-Volcker versus post-Volcker policy",
        "Taylor principle",
        "Blanchard-Kahn determinacy",
      ],
      [
        "State the estimated result first: weaker inflation response before Volcker, stronger after.",
        "Then explain the Taylor principle and why it matters for determinacy in New Keynesian models.",
      ],
      [
        "Retelling U.S. monetary history without linking it to the model.",
        "Using 'determinacy' without explaining what it means for equilibrium uniqueness and expectations.",
      ],
    ),
    supportingEquations: [
      {
        id: "exam2025-taylor-principle",
        label: "Taylor principle",
        latex: "\\phi_\\pi > 1",
        explanation:
          "The practical statement is that the nominal rate must respond more than one-for-one to inflation so the real rate tightens.",
      },
    ],
    hints: [
      "Write one sentence on the estimated inflation coefficient in each sample, then move straight to the Taylor principle.",
    ],
    nextSteps: [
      "Explain that a coefficient below one risks indeterminacy, while a coefficient above one supports a determinate equilibrium.",
    ],
    solutionOutline: [
      "Clarida, Gali, and Gertler find a weaker inflation response before Volcker and a stronger one after Volcker.",
      "That means the Taylor principle is more likely to be violated in the first sample and satisfied in the second.",
      "In New Keynesian theory, that maps onto indeterminacy before Volcker and determinacy after Volcker.",
    ],
    answerPlaceholder:
      "Keep the answer focused: one paragraph for the empirical result, one for the theoretical interpretation.",
    citations: exam2025Citations,
  }),
  practiceProblem({
    id: "exam-2025-question-2-discretion-vs-commitment",
    slug: "exam-2025-question-2-discretion-vs-commitment",
    title: "Exam 2025, Question 2: Cost-Push Shock under Discretion and Commitment",
    moduleSlug: "lecture-4",
    sourceKind: "past_exam",
    collectionSlug: "exam-2025",
    sourceLabel: "Final exam 2025",
    sourceDetail:
      "Question 2 from the April 2025 final exam, including the original impulse-response figure.",
    questionLabel: "Question 2",
    summary:
      "A major derivation-and-interpretation question on targeting rules under discretion and commitment after a cost-push shock.",
    supportMode: "derivation",
    relatedModuleSlugs: ["lecture-4", "lecture-6"],
    prompt: [
      "Derive the targeting rules under discretion and state-contingent commitment, then explain the impulse responses and the role of lower price stickiness.",
    ],
    questionBlocks: [
      p("The exam gives the policy objective"),
      p("$$\\min_{\\{\\pi_{t+i},x_{t+i}\\}} \\frac{1}{2} E_t \\sum_{i=0}^{\\infty} \\beta^i\\left[\\pi_{t+i}^2 + \\alpha_x x_{t+i}^2\\right]$$"),
      p("subject to the NKPC $$\\pi_{t+i} = \\beta \\pi_{t+i+1} + \\kappa x_{t+i} + u_{t+i}^{\\pi},$$ where the cost-push shock is transitory."),
      p("**(a)** Derive the targeting rule under discretion and explain how you solve it."),
      p("**(b)** Derive the targeting rule under state-contingent commitment and explain how you solve it."),
      figureNote({
        title: "Exam 2025 Question 2 original figure page",
        caption:
          "The original exam page contains the cost-push-shock impulse responses used in part (c). Read the figure together with the targeting rules, not as a separate chart-reading exercise.",
        imagePath: "/figures/practice/exam-2025/exam-2025-q2-page.png",
        altText:
          "Original 2025 exam page showing Question 2 and the impulse-response figure for discretion versus commitment.",
      }),
      p("**(c)** Describe and explain the impulse responses under both regimes using the formulas."),
      p("**(d)** Explain how lower price stickiness, formalized as a lower $\\theta$, changes the targeting rules."),
    ],
    guide: guide(
      "Full derivation and regime comparison",
      "This is a flagship by-hand problem. You must derive two different targeting rules, interpret a figure, and then explain what happens when the Phillips curve becomes steeper.",
      [
        "Loss function and NKPC",
        "Discretionary targeting rule",
        "Commitment and history dependence",
        "Impulse-response interpretation",
        "Price stickiness and $\\kappa$",
      ],
      [
        "Solve discretion first as a period-by-period problem where expectations are taken as given.",
        "Then solve commitment as an intertemporal problem with inherited promises.",
        "Use the two targeting rules to interpret the figure before you discuss lower $\\theta$.",
      ],
      [
        "Mixing the discretion and commitment Lagrangians.",
        "Explaining the figure without tying it back to the targeting rules.",
        "Saying that lower price stickiness changes policy only qualitatively and not through $\\kappa$.",
      ],
    ),
    supportingEquations: [
      {
        id: "exam2025-discretion-rule",
        label: "Discretionary targeting rule",
        latex: "x_t = -\\frac{\\kappa}{\\alpha_x}\\pi_t",
        explanation:
          "This is the period-by-period trade-off under discretion when current policy cannot manipulate inherited expectations.",
      },
    ],
    stepGuide: [
      step(
        "Solve discretion first",
        "Write the one-period Lagrangian by treating future expectations as given, then differentiate with respect to $x_t$ and $\\pi_t$.",
        "Under discretion, the policymaker re-optimizes each period and does not inherit promises from the past.",
        "Period-by-period optimization.",
        "This yields the simple targeting rule used for the discretion part of the figure.",
      ),
      step(
        "Set up the commitment problem",
        "Write the full intertemporal Lagrangian with multipliers on the NKPC in every period.",
        "Commitment changes the problem because future promises are part of today's optimization.",
        "Intertemporal optimization with history dependence.",
        "This is what generates the difference equation in the commitment targeting rule.",
      ),
      step(
        "Interpret the impulse responses",
        "Use the discretion rule and commitment rule to explain why commitment creates a more history-dependent path for inflation and the output gap.",
        "The figure is a visual consequence of the two targeting rules, not an independent fact.",
        "Formula-to-figure interpretation.",
        "This is the bridge from derivation to economic meaning.",
      ),
      step(
        "Explain lower price stickiness",
        "Translate a lower $\\theta$ into a higher $\\kappa$, then explain how that changes the trade-off embedded in both targeting rules.",
        "Price flexibility steepens the Phillips curve, so inflation responds more to the same amount of slack.",
        "Structural parameter mapping.",
        "This is the final comparative-static step the question wants.",
      ),
    ],
    hints: [
      "Do not start with the figure. Derive the rules first and let the figure become a consequence of those rules.",
    ],
    nextSteps: [
      "For part (a), treat future inflation expectations as fixed and combine the two first-order conditions to get the discretion targeting rule.",
    ],
    solutionOutline: [
      "Under discretion, the optimal targeting rule is static and period-specific because the policymaker takes future expectations as given.",
      "Under commitment, the targeting rule is history dependent and links today's gap choice to past and future promises.",
      "The figure therefore shows gradual, monotonic convergence under discretion and stronger history dependence under commitment.",
      "Lower $\\theta$ raises $\\kappa$, making inflation more responsive to slack and changing the optimal inflation-gap trade-off under both regimes.",
    ],
    handSolveNote:
      "This is a by-hand derivation problem. Work it on paper and use the progressive help one step at a time if needed.",
    answerPlaceholder:
      "Optional: tell the tutor whether you got stuck in the discretion Lagrangian, the commitment Lagrangian, or the figure interpretation.",
    citations: exam2025Citations,
  }),
  practiceProblem({
    id: "exam-2025-question-3-heterogeneity",
    slug: "exam-2025-question-3-heterogeneity",
    title: "Exam 2025, Question 3: Heterogeneity and Consumption Responses",
    moduleSlug: "lecture-8",
    sourceKind: "past_exam",
    collectionSlug: "exam-2025",
    sourceLabel: "Final exam 2025",
    sourceDetail: "Question 3 from the April 2025 final exam.",
    questionLabel: "Question 3",
    summary:
      "A heterogeneity question on why the same productivity shock creates different aggregate-consumption dynamics across economies with different MPC distributions.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-2", "lecture-8"],
    prompt: [
      "Compare the consumption dynamics in two economies with different shares of hand-to-mouth households after the same one-period productivity shock, and discuss the monetary-policy implications.",
    ],
    questionBlocks: [
      p("Economy X has 20 percent hand-to-mouth households with MPC near one and 80 percent households with MPC 0.4."),
      p("Economy Z has 60 percent hand-to-mouth households with MPC near one and 40 percent households with MPC 0.4."),
      p("Both economies experience the same one-period positive aggregate productivity shock."),
      p("**(a)** Describe the difference in the dynamics of aggregate consumption across the two economies and highlight the mechanisms."),
      p("**(b)** Discuss the optimal monetary policy response to this shock. Does it vary across the two economies?"),
    ],
    guide: guide(
      "Heterogeneity plus policy reasoning",
      "This question asks you to combine Lecture 8 heterogeneity with the broader New Keynesian policy framework. You need both distributional and aggregate logic.",
      [
        "Average MPC",
        "Hand-to-mouth households",
        "Consumption smoothing",
        "Productivity shock",
        "Optimal policy and transmission",
      ],
      [
        "Explain part (a) in terms of average MPC and consumption smoothing.",
        "Then ask whether the same productivity shock should produce different macro trade-offs for policy when household responses differ.",
      ],
      [
        "Talking about heterogeneity only as fairness, not as transmission.",
        "Ignoring that the same supply shock can create different aggregate consumption dynamics when MPC distributions differ.",
      ],
    ),
    supportingEquations: [
      {
        id: "exam2025-aggregate-consumption",
        label: "Aggregate consumption logic",
        latex: "\\Delta C = \\sum_i \\mathrm{MPC}_i \\cdot \\Delta Y_i",
        explanation:
          "The aggregate response depends on both the income change and who receives it.",
      },
    ],
    hints: [
      "Country Z has a higher average MPC. Start there before you move to monetary policy.",
    ],
    nextSteps: [
      "Explain first why the impact response of consumption is stronger and more front-loaded in the economy with more hand-to-mouth households.",
    ],
    solutionOutline: [
      "The economy with more hand-to-mouth households has a larger immediate consumption response because a bigger share of the income gain is spent rather than smoothed.",
      "That stronger transmission can change how policy reasons about the aggregate demand effects of the same productivity shock.",
      "A strong answer ties the heterogeneity result back to the broader New Keynesian transmission mechanism rather than treating it as a standalone distribution fact.",
    ],
    answerPlaceholder:
      "A strong answer can be in bullets, but each bullet should still say what the mechanism is and why it matters.",
    citations: exam2025Citations,
  }),
  practiceProblem({
    id: "exam-2025-question-4-resources-growth",
    slug: "exam-2025-question-4-resources-growth",
    title: "Exam 2025, Question 4: Resources and Growth",
    moduleSlug: "lecture-12",
    sourceKind: "past_exam",
    collectionSlug: "exam-2025",
    sourceLabel: "Final exam 2025",
    sourceDetail: "Question 4 from the April 2025 final exam.",
    questionLabel: "Question 4",
    summary:
      "A derivation question on constant returns, output growth, per-worker growth, and the $\\beta = 0$ benchmark.",
    supportMode: "derivation",
    relatedModuleSlugs: ["lecture-12"],
    prompt: [
      "Show constant returns, derive the growth rate of output and output per worker, and then analyze the benchmark where resources drop out of production.",
    ],
    questionBlocks: [
      p("The production function is $$Y = K^{\\alpha}R^{\\beta}(AL)^{1-\\alpha-\\beta}$$ with $0 < \\alpha < 1$, $0 < \\beta < 1$, and $\\alpha + \\beta < 1$."),
      p("The growth equations are $$\\dot L = nL, \\quad \\dot A = gA, \\quad \\dot K = sY - \\delta K, \\quad \\dot R = -bR.$$"),
      p("**(a)** Show that there is constant returns to scale."),
      p("**(b)** Calculate the growth rate of output and of output per worker in steady state."),
      p("**(c)** Set $\\beta = 0$. What changes in the growth rate of output and output per worker?"),
    ],
    guide: guide(
      "Growth-accounting derivation",
      "This is a calculation question with a benchmark comparison built in. The cleanest route is to handle scale, then growth accounting, then the $\\beta = 0$ benchmark.",
      [
        "Constant returns to scale",
        "Log differentiation",
        "Steady-state growth",
        "Per-worker growth",
        "Benchmark $\\beta = 0$",
      ],
      [
        "Prove constant returns by scaling every factor by a common scalar.",
        "Then derive the output-growth expression using growth rates term by term.",
        "Finally set $\\beta = 0$ and interpret what disappears.",
      ],
      [
        "Mixing up output growth and per-worker output growth.",
        "Plugging in $\\beta = 0$ before deriving the general expression.",
      ],
    ),
    supportingEquations: [
      {
        id: "exam2025-growth",
        label: "Production benchmark",
        latex: "Y = K^{\\alpha}R^{\\beta}(AL)^{1-\\alpha-\\beta}",
        explanation:
          "The resource exponent is what makes the extended Solow benchmark differ from the textbook case.",
      },
    ],
    stepGuide: [
      step(
        "Prove constant returns to scale",
        "Multiply every input by the same scalar $\\lambda$ and simplify the exponents.",
        "A Cobb-Douglas function has constant returns when the exponents sum to one.",
        "Definition of constant returns to scale.",
        "This completes part (a) cleanly and sets up the benchmark intuition.",
      ),
      step(
        "Differentiate in growth rates",
        "Take the time derivative of the production function and divide by $Y$ so the result becomes a weighted sum of growth rates.",
        "This is the standard growth-accounting shortcut for a Cobb-Douglas function.",
        "Log differentiation.",
        "This is the core step for part (b).",
      ),
      step(
        "Use the steady-state shortcut",
        "Impose the steady-state condition that capital and output grow at the same rate before solving for $g_Y$.",
        "The exam explicitly allows this simplification.",
        "Steady-state growth condition.",
        "This gives you the closed-form output-growth expression.",
      ),
      step(
        "Move to per-worker growth and the $\\beta = 0$ benchmark",
        "Subtract labor-force growth to get per-worker growth, then set $\\beta = 0$ and simplify.",
        "Output per worker is output growth minus labor growth, and the benchmark comparison shows exactly what role the resource term played.",
        "Per-worker conversion and benchmark comparison.",
        "This closes parts (b) and (c).",
      ),
    ],
    hints: [
      "Work from the general expression first. The $\\beta = 0$ case is a benchmark comparison, not the main derivation.",
    ],
    nextSteps: [
      "Start by checking whether the exponents in the production function sum to one when all inputs are scaled together.",
    ],
    solutionOutline: [
      "Constant returns follows because the exponents sum to one when all inputs are scaled together.",
      "The output-growth expression is a weighted combination of capital growth, productivity growth, labor growth, and negative resource growth.",
      "Output per worker subtracts labor growth from total output growth.",
      "Setting $\\beta = 0$ removes the resource-drag channel and returns the model toward the textbook benchmark.",
    ],
    handSolveNote:
      "This is a by-hand derivation. Solve the growth-accounting steps on paper and use the step guide progressively if needed.",
    answerPlaceholder:
      "Optional: describe whether you got stuck on constant returns, the growth-rate algebra, or the $\\beta = 0$ comparison.",
    citations: exam2025Citations,
  }),
  practiceProblem({
    id: "exam-2025-question-5-tax-smoothing",
    slug: "exam-2025-question-5-tax-smoothing",
    title: "Exam 2025, Question 5: Tax Smoothing",
    moduleSlug: "lecture-9",
    sourceKind: "past_exam",
    collectionSlug: "exam-2025",
    sourceLabel: "Final exam 2025",
    sourceDetail: "Question 5 from the April 2025 final exam.",
    questionLabel: "Question 5",
    summary:
      "A longer tax-smoothing derivation that adds uncertainty to the benchmark constant-tax-share result.",
    supportMode: "derivation",
    relatedModuleSlugs: ["lecture-9"],
    prompt: [
      "Derive the constant-tax-share benchmark and then discuss how uncertainty about government income changes the result.",
    ],
    questionBlocks: [
      p("The exam defines tax costs as $$C_t = Y_t f\\!\\left(\\frac{T_t}{Y_t}\\right), \\quad f(0)=0,\\quad f'(0)=0,\\quad f''(\\cdot)>0.$$"),
      p("The planner solves"),
      p("$$\\min_{T_0,T_1,\\ldots} \\sum_{t=0}^{\\infty} \\frac{1}{(1+r)^t} Y_t f\\!\\left(\\frac{T_t}{Y_t}\\right)$$"),
      p("subject to the intertemporal budget constraint"),
      p("$$\\sum_{t=0}^{\\infty} \\frac{1}{(1+r)^t} T_t = D_0 + \\sum_{t=0}^{\\infty} \\frac{1}{(1+r)^t} G_t.$$"),
      p("**(a)** What can be reasons that tax costs increase with taxes' share of income?"),
      p("**(b)** Show that the minimization problem requires taxes to be a constant fraction of income."),
      p("**(c)** Discuss whether the conclusion changes under uncertainty about the path of government income."),
    ],
    guide: guide(
      "Optimal-tax derivation with uncertainty extension",
      "This is the same tax-smoothing logic as in Lecture 9 and the 2024 exam, but the final step adds an uncertainty discussion. Keep the benchmark derivation clean before extending it.",
      [
        "Convex tax distortions",
        "Intertemporal budget constraint",
        "Equalized marginal tax distortion",
        "Random walk tax share under uncertainty",
      ],
      [
        "Answer part (a) quickly, then derive the constant-share benchmark in part (b).",
        "For part (c), ask what happens to the first-order condition when expectations enter under uncertainty.",
      ],
      [
        "Blurring the certainty benchmark and the uncertainty extension together.",
        "Talking about uncertainty qualitatively without referring back to the marginal-condition logic.",
      ],
    ),
    supportingEquations: [
      {
        id: "exam2025-tax",
        label: "Tax-cost objective",
        latex: "C_t = Y_t f\\!\\left(\\frac{T_t}{Y_t}\\right)",
        explanation:
          "The curvature of $f$ is what gives the planner a motive to smooth taxes across time.",
      },
    ],
    stepGuide: [
      step(
        "Interpret the convexity",
        "Explain why a higher tax share creates more than proportionally larger distortions.",
        "The function $f''(\\cdot)>0$ tells you marginal distortion rises with the tax share.",
        "Convex distortions.",
        "This explains why smoothing is desirable before you derive anything.",
      ),
      step(
        "Derive the certainty benchmark",
        "Set up the marginal benefit and marginal cost of shifting one unit of taxes across adjacent dates and equate them.",
        "The planner is indifferent only when marginal distortion is equalized across dates.",
        "Intertemporal marginal condition.",
        "This yields the constant-tax-share benchmark in part (b).",
      ),
      step(
        "Translate the condition into a constant share",
        "Use the monotonicity of $f'$ to show that equal marginal distortions imply equal tax shares across time.",
        "If $f'$ is one-to-one, equal marginal distortion implies equal arguments.",
        "Invertibility of $f'$ under convexity.",
        "This is the exact step the exam wants explained.",
      ),
      step(
        "Add uncertainty",
        "Replace tomorrow's marginal distortion with its expectation and explain what happens when $f$ is quadratic.",
        "Under uncertainty, expectations enter the first-order condition directly.",
        "Expected marginal distortion under uncertainty.",
        "This lets you explain why the tax share follows a random walk in the quadratic benchmark.",
      ),
    ],
    hints: [
      "Get the certainty benchmark right first. The uncertainty part is an extension, not a different model.",
    ],
    nextSteps: [
      "Write the marginal-condition logic for moving a small amount of taxation from period $t$ to period $t+1$.",
    ],
    solutionOutline: [
      "Tax costs rise with the tax share because distortions, avoidance, and evasion incentives typically become stronger at higher tax rates.",
      "The planner smooths taxes because convex distortions make uneven tax shares more costly than even ones.",
      "Under uncertainty, the first-order condition becomes an expectation condition, and in the quadratic case the optimal tax share follows a random walk with no trend.",
    ],
    handSolveNote:
      "This is a by-hand derivation problem. Use the step guide to learn the derivation logic rather than to skip it.",
    answerPlaceholder:
      "Optional: say whether you got stuck in the certainty benchmark or in the uncertainty extension.",
    citations: exam2025Citations,
  }),
];

const seminarCollections: PracticeCollection[] = [
  {
    id: "practice-collection-seminar-1",
    slug: "seminar-1",
    kind: "seminar_problem_set",
    title: "Seminar 1: Baseline New Keynesian Model",
    sourceLabel: "Seminar / problem set",
    summary:
      "Shock-sign logic, natural-rate reasoning, and the discipline of separating actual from natural objects.",
    description:
      "Use Seminar 1 when you want to practice the core Lecture 2 benchmark the way it appears in seminars and exams: sign tracing, benchmark comparison, and missing-shock diagnosis.",
    relatedModuleSlugs: ["lecture-2"],
    problemSlugs: ["seminar-1-question-1"],
    estimatedMinutes: 60,
  },
  {
    id: "practice-collection-seminar-2",
    slug: "seminar-2",
    kind: "seminar_problem_set",
    title: "Seminar 2: Optimal Policy, Guidance, and the Phillips Curve",
    sourceLabel: "Seminar / problem set",
    summary:
      "Commitment versus discretion, forward-guidance classification, and the policy meaning of the Phillips-curve slope.",
    description:
      "This seminar pack sits across Lectures 4, 6, and 7. It is the right place to practice regime comparison and policy interpretation before jumping to exam questions.",
    relatedModuleSlugs: ["lecture-4", "lecture-6", "lecture-7"],
    problemSlugs: [
      "seminar-2-question-1",
      "seminar-2-forward-guidance-ranking",
      "seminar-2-phillips-curve-slope",
    ],
    estimatedMinutes: 80,
  },
  {
    id: "practice-collection-seminar-3",
    slug: "seminar-3",
    kind: "seminar_problem_set",
    title: "Seminar 3: Fiscal Policy, Inequality, and the Environment",
    sourceLabel: "Seminar / problem set",
    summary:
      "Late-course practice on debt, inequality, growth, climate, and the connections between them.",
    description:
      "Seminar 3 covers the Lectures 9-12 block and is especially useful for students who want to rehearse longer economic explanations together with a few key by-hand calculations.",
    relatedModuleSlugs: ["lecture-9", "lecture-10", "lecture-11", "lecture-12"],
    problemSlugs: [
      "seminar-3-ricardian-equivalence",
      "seminar-3-debt-sustainability",
      "seminar-3-inequality",
      "seminar-3-environment",
    ],
    estimatedMinutes: 120,
  },
];
const examCollections: PracticeCollection[] = [
  {
    id: "practice-collection-exam-2024",
    slug: "exam-2024",
    kind: "past_exam",
    title: "Final Exam 2024",
    sourceLabel: "Past exam",
    summary:
      "A full cross-course set spanning forward guidance, heterogeneity, optimal policy, Phillips-curve interpretation, Ricardian equivalence, and tax smoothing.",
    description:
      "Use the 2024 exam to test whether you can move across the course without losing the red thread. Several of the questions are the same kinds of reasoning patterns the modules are designed to teach.",
    relatedModuleSlugs: ["lecture-4", "lecture-6", "lecture-7", "lecture-8", "lecture-9"],
    problemSlugs: [
      "exam-2024-question-1-forward-guidance",
      "exam-2024-question-2-mpc-distribution",
      "exam-2024-question-3-optimal-policy",
      "exam-2024-question-4-phillips-curve-figure",
      "exam-2024-question-5-ricardian-equivalence",
      "exam-2024-question-6-tax-smoothing",
    ],
    estimatedMinutes: 180,
  },
  {
    id: "practice-collection-exam-2025",
    slug: "exam-2025",
    kind: "past_exam",
    title: "Final Exam 2025",
    sourceLabel: "Past exam",
    summary:
      "A second full-exam source with stronger emphasis on discretion versus commitment, heterogeneity, resources, and tax smoothing under uncertainty.",
    description:
      "Use the 2025 exam when you want to test whether your course understanding transfers to new settings without losing the model logic.",
    relatedModuleSlugs: ["lecture-1", "lecture-4", "lecture-8", "lecture-9", "lecture-12"],
    problemSlugs: [
      "exam-2025-question-1-taylor-rules",
      "exam-2025-question-2-discretion-vs-commitment",
      "exam-2025-question-3-heterogeneity",
      "exam-2025-question-4-resources-growth",
      "exam-2025-question-5-tax-smoothing",
    ],
    estimatedMinutes: 180,
  },
];

export function buildPracticeCollections(
  lectureLinkedProblems: PracticeProblem[],
): PracticeCollection[] {
  return [
    ...seminarCollections,
    ...examCollections,
    {
      id: "practice-collection-lecture-linked",
      slug: "lecture-linked-practice",
      kind: "lecture_linked",
      title: "Lecture-linked practice",
      sourceLabel: "Lecture-linked practice",
      summary:
        "Short guided questions attached directly to each lecture so students can rehearse the mechanism before moving into seminars and exams.",
      description:
        "These are the best starting points when you want focused practice tied tightly to the lecture you just studied. They are lighter than seminar sheets, but still structured to teach reasoning rather than rote recall.",
      relatedModuleSlugs: lectureLinkedProblems.map((problem) => problem.moduleSlug),
      problemSlugs: lectureLinkedProblems.map((problem) => problem.slug),
      estimatedMinutes: lectureLinkedProblems.length * 20,
    },
  ];
}
