import type {
  ContentBlock,
  PracticeCollection,
  PracticeGuide,
  PracticeProblem,
  PracticeSessionPart,
  PracticeStepGuide,
  PracticeSupportMode,
} from "@/lib/types";

import { lectureLinkedCollectionSlug } from "@/lib/practice-session";
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

type SourcePartConfig = {
  id: string;
  label: string;
  prompt: string;
  imagePath: string;
  altText: string;
  caption?: string;
  displayPromptText?: boolean;
  beforePromptBlocks?: ContentBlock[];
  afterPromptBlocks?: ContentBlock[];
  answerPlaceholder?: string;
  hintIndexes?: number[];
  nextStepIndexes?: number[];
  solutionOutlineIndexes?: number[];
  stepGuideIndexes?: number[];
  supportingEquationIds?: string[];
};

function sourcePart({
  id,
  label,
  prompt,
  imagePath,
  altText,
  caption,
  displayPromptText = true,
  beforePromptBlocks,
  afterPromptBlocks,
  answerPlaceholder,
  hintIndexes,
  nextStepIndexes,
  solutionOutlineIndexes,
  stepGuideIndexes,
  supportingEquationIds,
}: SourcePartConfig): PracticeSessionPart {
  return {
    id,
    label,
    prompt,
    questionBlocks: [
      figureNote({
        title: "Original source excerpt",
        caption:
          caption ??
          "This is the original seminar or exam wording from the PDF source. The current step keeps that wording as the canonical question.",
        imagePath,
        altText,
      }),
      ...(beforePromptBlocks ?? []),
      ...(displayPromptText ? [p(prompt)] : []),
      ...(afterPromptBlocks ?? []),
    ],
    answerPlaceholder,
    hintIndexes,
    nextStepIndexes,
    solutionOutlineIndexes,
    stepGuideIndexes,
    supportingEquationIds,
  };
}

const seminar1Citations = [
  cite(
    "GRA6631_TA1_Exercises.pdf",
    "pp. 1-2",
    "Canonical Seminar 1 exercise sheet used for the displayed question wording and page images.",
    "problem_set",
  ),
  cite(
    "Seminar_1_GRA6631_2025_Solutions.pdf",
    "pp. 1-2",
    "Support material for sign patterns and the missing cost-push shock logic; not the canonical question source.",
    "solution",
  ),
];

const seminar2Citations = [
  cite(
    "GRA6631_TA2_Exercises.pdf",
    "pp. 1-3",
    "Canonical Seminar 2 exercise sheet used for the displayed question wording and source images.",
    "problem_set",
  ),
  cite(
    "Seminar_2_GRA6631_2025_solutions.pdf",
    "pp. 1-3",
    "Support material for discretion, commitment, and guidance classification; not the canonical question source.",
    "solution",
  ),
];

const seminar3Citations = [
  cite(
    "GRA6631_TA3_Sheet.pdf",
    "pp. 1-2",
    "Canonical Seminar 3 sheet used for the displayed question wording and source images.",
    "problem_set",
  ),
];

const exam2020Citations = [
  cite(
    "Exam 2020.pdf",
    "pp. 1-4",
    "Canonical 2020 final exam used for the displayed question wording and source images.",
    "exam",
  ),
  cite(
    "GRA 66311_202010_11.05.2020_EG.pdf",
    "pp. 1-8",
    "Evaluation guidelines used only as support material for solutions and explanatory guidance.",
    "solution",
  ),
];

const exam2021Citations = [
  cite(
    "Exam 2021.pdf",
    "pp. 1-4",
    "Canonical 2021 final exam used for the displayed question wording and source images.",
    "exam",
  ),
  cite(
    "GRA 66311_202110_19.05.2021_EG.pdf",
    "pp. 1-6",
    "Evaluation guidelines used only as support material for solutions and explanatory guidance.",
    "solution",
  ),
];

const exam2024Citations = [
  cite(
    "Exam 2024.pdf",
    "pp. 1-5",
    "Canonical 2024 final exam used for the displayed question wording and source images.",
    "exam",
  ),
  cite(
    "GRA 66311_202410_03.05.2024_EG.pdf",
    "pp. 1-9",
    "Official solution guidance used only as support material for the 2024 final exam.",
    "solution",
  ),
];

const exam2025Citations = [
  cite(
    "GRA6631_2025-04-28_kl_09_EP.pdf",
    "pp. 1-4",
    "Canonical 2025 final exam used for the displayed question wording and source images.",
    "exam",
  ),
  cite(
    "GRA6631_2025-04-28_kl_09_EG.pdf",
    "pp. 1-9",
    "Official solution guidance used only as support material for the 2025 final exam.",
    "solution",
  ),
];

const seminar3RicardianSetupBlocks = [
  p("Consider the government budget constraint below. $r(\\tau)$ is the interest rate at time $\\tau$. $G(t)$ and $T(t)$ denote government purchases and taxes at time $t$. $D(t)$ denotes government debt at time $t$."),
  p("$$R(t)=\\int_{\\tau=0}^{t} r(\\tau)\\,d\\tau, \\qquad \\int_{t=0}^{\\infty} e^{-R(t)} G(t)\\,dt \\le -D(0) + \\int_{t=0}^{\\infty} e^{-R(t)} T(t)\\,dt, \\qquad \\lim_{s\\to\\infty} e^{-R(s)} D(s) \\le 0$$"),
  p("Below is a budget constraint for the consumers. $C(t)$ and $W(t)$ denote consumption and wages at time $t$. $K(0)$ denotes consumers' capital stock at time $0$."),
  p("$$\\int_{t=0}^{\\infty} e^{-R(t)} C(t)\\,dt \\le K(0) + D(0) + \\int_{t=0}^{\\infty} e^{-R(t)} [W(t)-T(t)]\\,dt$$"),
];

const seminar3DebtSetupBlocks = [
  p("The change in the debt-to-GDP ratio can be approximated as $$\\Delta d \\approx (r-g)\\cdot d - s,$$ where $d = D/Y$, $s$ is the primary surplus as a share of GDP, $r$ is the real interest rate, and $g$ is real GDP growth."),
];

const seminar3InequalitySetupBlocks = [
  p("In a Cobb-Douglas economy the seminar writes output as $$Y = K^{\\alpha}L^{1-\\alpha}.$$"),
];

const seminar3EnvironmentSetupBlocks = [
  p("Consider the extended Solow model from Lecture 12 with output $$Y = K^{\\alpha}(AL)^{1-\\alpha-\\beta}R^{\\beta},$$ where $A$ grows at rate $g$, $L$ at rate $n$, and resources $R$ deplete at rate $b$."),
];

const exam2024Question3SetupBlocks = [
  p("Assume a model economy as represented by the NKPC and the DIS:"),
  p("$$\\pi_t = \\beta E_t \\pi_{t+1} + \\kappa \\tilde y_t$$"),
  p("$$\\tilde y_t = E_t \\tilde y_{t+1} - \\frac{1}{\\sigma}(i_t - E_t \\pi_{t+1} - r_t^n)$$"),
  p("where $$\\pi_t \\equiv p_t - p_{t-1}, \\qquad \\tilde y_t \\equiv y_t - y_t^n,$$"),
  p("$$\\kappa = \\lambda (\\sigma + \\phi), \\qquad r_t^n = \\rho - \\sigma \\frac{1+\\phi}{\\sigma+\\phi}(1-\\rho_a) a_t + (1-\\rho_z) z_t,$$"),
  p("$$y_t^n = -\\frac{\\mu}{\\sigma+\\phi} + \\frac{1+\\phi}{\\sigma+\\phi} a_t, \\qquad z_t = \\rho_z z_{t-1} + \\epsilon_t^z, \\qquad a_t = \\rho_a a_{t-1} + \\epsilon_t^a,$$"),
  p("with calibration $$\\rho_a = 0, \\qquad \\rho_z = 0.5, \\qquad \\epsilon_t^a = 0, \\qquad \\epsilon_t^z = 0.5.$$"),
];

const exam2025Question2SetupBlocks = [
  p("Assume that the central bank has the following policy objective (quadratic loss function):"),
  p("$$\\min_{\\pi_{t+i},x_{t+i}} \\frac{1}{2} E_t \\sum_{i=0}^{\\infty} \\beta^i \\left[\\pi_{t+i}^2 + \\alpha_x x_{t+i}^2\\right]$$"),
  p("and faces the following New Keynesian Phillips curve (NKPC):"),
  p("$$\\pi_{t+i} = \\beta \\pi_{t+i+1} + \\kappa x_{t+i} + u_{t+i}^{\\pi}.$$"),
  p("Notation is identical to the lecture notes. $u_{t+i}^{\\pi}$ represents a transitory cost-push shock $(\\rho_{\\pi}=0)$."),
  p("$$\\kappa \\equiv \\lambda (\\sigma + \\phi) = \\frac{(1-\\beta \\theta)(1-\\theta)}{\\theta}(\\sigma + \\phi).$$"),
];

const exam2025Question3SetupBlocks = [
  p("Assume two economies X and Z."),
  p("In economy X, 20 percent of individuals have a marginal propensity to consume (MPC) close to 1 (\"hand-to-mouth\" households). 80 percent of individuals have an MPC of 0.4."),
  p("In economy Z, 60 percent of individuals have a marginal propensity to consume (MPC) close to 1 (\"hand-to-mouth\" households). 40 percent of individuals have an MPC of 0.4."),
  p("Assume that all individuals in economy X and Y are otherwise identical. Both of these economies are hit by a one-period positive aggregate productivity shock."),
];

const exam2025Question4SetupBlocks = [
  p("Consider the macro production function below. It is a Cobb-Douglas macro production function where resources, $R$, are included as a factor of production. $K$, $A$ and $L$ denote capital, productivity and labor used in production, respectively."),
  p("$$Y = F(K,R,AL) = K^{\\alpha} R^{\\beta} (AL)^{1-\\alpha-\\beta}$$"),
  p("Assume that the below inequalities are fulfilled:"),
  p("$$0 < \\alpha < 1, \\qquad 0 < \\beta < 1, \\qquad \\alpha + \\beta < 1$$"),
  p("Let a dot above a variable denote the derivative with respect to time, i.e. growth: $$\\dot X = \\frac{dX}{dt}.$$ Assume that growth in labor, productivity, capital and resources are given by the below equations:"),
  p("$$\\dot L = nL, \\qquad \\dot A = gA, \\qquad \\dot K = sY - \\delta K, \\qquad \\dot R = -bR.$$"),
];

const exam2025Question5SetupBlocks = [
  p("Assume that tax incomes are distortive so that total costs from taxes at time $t$, $C_t$, increases with taxes' $(T_t)$ share of the total income, $Y_t$, at time $t$ as described by the function $f$."),
  p("$$C_t = Y_t f\\!\\left(\\frac{T_t}{Y_t}\\right), \\qquad f(0)=0, \\qquad f'(0)=0, \\qquad f''(\\cdot)>0$$"),
  p("Politicians may wish to minimize costs from taxation. They therefore want to solve the below minimization problem. The constraint is the intertemporal budget constraint."),
  p("$$\\min_{T_0,T_1,\\ldots} \\sum_{t=0}^{\\infty} \\frac{1}{(1+r)^t} Y_t f\\!\\left(\\frac{T_t}{Y_t}\\right) \\quad \\text{subject to} \\quad \\sum_{t=0}^{\\infty} \\frac{1}{(1+r)^t}T_t = D_0 + \\sum_{t=0}^{\\infty} \\frac{1}{(1+r)^t} G_t$$"),
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
  const lectureLinkedKeyConcepts = [
    "Current lecture benchmark",
    "What changes relative to the previous lecture",
    ...problem.supportingEquations.map((equation) => equation.label),
  ];
  const lectureLinkedPath = config
    ? [
        "Start by reactivating the benchmark or definition the lecture built the question on before you try to answer from intuition.",
        "Before you move any sign or equation, say what object is fixed, what object moves first, and why that is the safest starting point in this lecture.",
        ...config.solutionPath,
        "If the lecture works by benchmark comparison, say explicitly what stays from the old benchmark and what changes in this lecture before you jump to the final conclusion.",
        "End by stating what stays from the benchmark, what changes in this lecture, and what the result means economically.",
      ]
    : [
        "Start by naming the lecture benchmark or definition before you chase the answer.",
        "Explain the mechanism in words before jumping to the conclusion.",
        "End by stating what the result means economically and what you should carry forward from the lecture.",
      ];
  const lectureLinkedMistakes = config
    ? [
        "Answering from vague intuition without first naming the benchmark or notation the lecture used.",
        "Giving the final sign or conclusion before explaining why that object is the one that moves first in the lecture logic.",
        ...config.commonMistakes,
      ]
    : [
        "Skipping the benchmark logic and jumping straight to the answer.",
        "Using informal intuition without tying it back to the lecture notation or benchmark.",
      ];

  return practiceProblem({
    ...problem,
    sourceKind: "lecture_linked",
    collectionSlug: lectureLinkedCollectionSlug(problem.moduleSlug),
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
          `${config.whatIsBeingAsked} Start from the lecture benchmark, then explain what changes relative to that benchmark before you state the final conclusion.`,
          lectureLinkedKeyConcepts,
          lectureLinkedPath,
          lectureLinkedMistakes,
        )
      : guide(
          "Lecture-linked reasoning question",
          "Use the lecture benchmark to explain the mechanism clearly and in the same notation as the module.",
          lectureLinkedKeyConcepts,
          lectureLinkedPath,
          lectureLinkedMistakes,
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
    sourceDetail: "Question 1 with subparts (a)-(e) from GRA6631_TA1_Exercises.pdf.",
    questionLabel: "Question 1",
    summary:
      "A full qualitative reasoning set on the baseline New Keynesian model that trains sign logic and benchmark discipline.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-2"],
    prompt: [],
    sessionParts: [
      sourcePart({
        id: "a",
        label: "Part (a)",
        imagePath: "/figures/practice/seminar-1/seminar-1-page-1.png",
        altText: "Original Seminar 1 page 1 with the baseline New Keynesian model equations and part (a).",
        caption:
          "Canonical Seminar 1 wording from GRA6631_TA1_Exercises.pdf. Use the PDF excerpt as the question source for part (a).",
        displayPromptText: false,
        prompt:
          "Suppose the economy is in steady state. The economy is hit by a temporary positive technology shock. Describe from a qualitative point of view the impact response of output, potential output, inflation and natural rate of interest (i.e. whether each variable increases, decreases or stays constant). Explain briefly the transmission mechanism.",
      }),
      sourcePart({
        id: "b",
        label: "Part (b)",
        imagePath: "/figures/practice/seminar-1/seminar-1-page-1.png",
        altText: "Original Seminar 1 page 1 with the baseline New Keynesian model equations and part (b).",
        caption:
          "Canonical Seminar 1 wording from GRA6631_TA1_Exercises.pdf. Use the PDF excerpt as the question source for part (b).",
        displayPromptText: false,
        prompt:
          "Suppose the economy is in steady state. The economy is hit by one (and only one) temporary shock. In response to the shock, inflation increases and the output gap decreases. Can any of the three shocks included in the model above generate these dynamics? If not, what other shock could be at play? Explain briefly your reasoning.",
      }),
      sourcePart({
        id: "c",
        label: "Part (c)",
        imagePath: "/figures/practice/seminar-1/seminar-1-page-1.png",
        altText: "Original Seminar 1 page 1 with the baseline New Keynesian model equations and part (c).",
        caption:
          "Canonical Seminar 1 wording from GRA6631_TA1_Exercises.pdf. Use the PDF excerpt as the question source for part (c).",
        displayPromptText: false,
        prompt:
          "Suppose the economy is in steady state. The economy is hit by one (and only one) temporary shock. In response to this shock, output increases and total hours worked decrease. What kind of shock has hit the economy? Explain briefly your reasoning.",
      }),
      sourcePart({
        id: "d",
        label: "Part (d)",
        imagePath: "/figures/practice/seminar-1/seminar-1-page-2.png",
        altText: "Original Seminar 1 page 2 showing part (d).",
        caption:
          "Canonical Seminar 1 wording from GRA6631_TA1_Exercises.pdf. Use the PDF excerpt as the question source for part (d).",
        displayPromptText: false,
        prompt:
          "Suppose the economy is in steady state. The economy is hit simultaneously by a contractionary temporary monetary policy shock ($v_t$ increases) and a contractionary temporary technology shock ($a_t$ decreases). Do you have sufficient information to evaluate the impact response of hours worked? Explain briefly your reasoning.",
      }),
      sourcePart({
        id: "e",
        label: "Part (e)",
        imagePath: "/figures/practice/seminar-1/seminar-1-page-2.png",
        altText: "Original Seminar 1 page 2 showing part (e).",
        caption:
          "Canonical Seminar 1 wording from GRA6631_TA1_Exercises.pdf. Use the PDF excerpt as the question source for part (e).",
        displayPromptText: false,
        prompt:
          "Suppose the economy is in steady state. The economy is hit simultaneously by a positive temporary discount factor shock ($z_t$ increases) and by a positive temporary technology shock ($a_t$ increases). Assume that the monetary policy authority behaves optimally. Describe the combined effect of the two shocks on output gap and inflation. Explain your reasoning. Do you have sufficient information to evaluate the response of the natural interest rate?",
      }),
    ],
    guide: guide(
      "Qualitative multi-part shock analysis",
      "You are being asked to reason from the Lecture 2 benchmark equations, not to improvise from intuition alone. The core skill is to keep actual and natural variables separate, say which equation moves first, and explain the transmission channel for each sign before you state the sign itself.",
      [
        "Dynamic IS equation",
        "Natural output versus actual output",
        "Phillips curve and marginal cost",
        "Technology, discount-factor, and monetary-policy shocks",
        "Missing cost-push shock logic",
      ],
      [
        "Start each subpart by identifying what the question is asking for: one sign pattern, one impossible pattern, or one combined-shock ambiguity.",
        "Then name the shock and the first object it moves directly: the Euler equation, productivity, or the policy rule.",
        "Separate the flexible-price benchmark from the sticky-price economy before you talk about actual output, inflation, or the output gap.",
        "Only after that should you sign inflation, the gap, and the natural rate, and you should state one sentence on why the sign follows.",
        "If you are solving a technology-shock subpart, explicitly compare actual output with natural output before you talk about the output gap. That is the safest way to avoid mixing levels and gaps.",
        "If the model does not pin down the sign cleanly under combined shocks, say that explicitly instead of forcing an answer.",
      ],
      [
        "Starting with actual output and forgetting to establish the natural benchmark first.",
        "Talking about output without distinguishing $y_t$ from $y_t^n$.",
        "Forgetting that inflation can move directly because of marginal-cost logic, not only because output moves.",
        "Treating an impossible sign pattern as proof that one of the three baseline shocks must fit.",
        "Forcing a sign in the combined-shock part even when the lecture logic only gives an ambiguity result.",
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
        id: "seminar1-nkpc",
        label: "New Keynesian Phillips curve",
        latex: "\\pi_t = \\beta E_t\\pi_{t+1} + \\lambda(mc_t-mc)",
        explanation:
          "Use this whenever you need to explain why inflation rises or falls. The safest route is to talk through marginal cost first, then inflation.",
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
      "For every subpart, write one short benchmark sentence before your sign sentence so the mechanism is carrying the answer rather than trailing behind it.",
    ],
    solutionOutline: [
      "A positive temporary technology shock raises actual output and raises potential output even more, because higher productivity shifts the flexible-price benchmark upward immediately. Since natural output rises more than actual output in the sticky-price benchmark, the output gap falls. Lower marginal cost pushes inflation down, and the natural real rate falls in the lecture calibration because the temporary productivity gain changes intertemporal consumption incentives.",
      "No. In the baseline model, a monetary-policy shock or a discount-factor shock can raise inflation only by strengthening demand, and that tends to raise rather than lower the output gap. A technology shock can lower the output gap, but it lowers inflation because marginal cost falls. So the sign pattern 'inflation up, output gap down' points to a positive cost-push shock that moves inflation directly in the Phillips curve.",
      "The clean benchmark answer is a positive technology shock. Higher productivity lets firms produce more with less labor input, so output can rise even while total hours worked fall. That combination is not the usual signature of a demand or monetary-policy shock, because those shocks typically make output and hours move in the same direction.",
      "Not from the information given. A contractionary monetary-policy shock pushes output and hours down by weakening demand, but a negative technology shock lowers productivity and can push hours the other way because more labor is needed per unit of output. Without more structure on the relative sizes of the two shocks, the net effect on hours worked is ambiguous.",
      "Under optimal policy in the no-cost-push benchmark, the central bank implements the flexible-price allocation, so the output gap and inflation are both stabilized at zero even though the economy is hit by two shocks. The natural rate is not pinned down from the information given, because the positive discount-factor shock pushes $r_t^n$ up while the positive technology shock moves $r_t^n$ in the opposite direction in the lecture calibration. Without magnitudes, the combined response of the natural rate is ambiguous.",
    ],
    answerPlaceholder:
      "Answer the current seminar subpart only. Keep the wording tied to the source and explain the mechanism that justifies each sign.",
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
    sourceDetail: "Question 1 from GRA6631_TA2_Exercises.pdf.",
    questionLabel: "Question 1",
    summary:
      "A concept-heavy policy question on what a cost-push shock is and how the optimal response differs across regimes.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-4", "lecture-6"],
    prompt: [],
    sessionParts: [
      sourcePart({
        id: "a",
        label: "Part a",
        imagePath: "/figures/practice/seminar-2/seminar-2-page-2.png",
        altText: "Original Seminar 2 page 2 showing Question 1 on cost-push shocks.",
        prompt: "What is a cost-push shock?",
      }),
      sourcePart({
        id: "b",
        label: "Part b",
        imagePath: "/figures/practice/seminar-2/seminar-2-page-2.png",
        altText: "Original Seminar 2 page 2 showing Question 1 on discretion.",
        prompt: "What is the optimal monetary policy under discretion in response to a cost-push shock?",
      }),
      sourcePart({
        id: "c",
        label: "Part c",
        imagePath: "/figures/practice/seminar-2/seminar-2-page-2.png",
        altText: "Original Seminar 2 page 2 showing Question 1 on commitment.",
        prompt: "What is the optimal monetary policy under commitment in response to a cost-push shock?",
      }),
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
        "Make the comparison in the same order the lecture uses: what is taken as given under discretion, what becomes choice-relevant under commitment, and how that changes current inflation pressure.",
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
      "Questions 2 and 3 from GRA6631_TA2_Exercises.pdf, including the central-bank statement ranking exercise.",
    questionLabel: "Questions 2-3",
    summary:
      "A classification exercise where students sort guidance statements by commitment content rather than by wording alone.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-5", "lecture-6"],
    prompt: [],
    sessionParts: [
      sourcePart({
        id: "a",
        label: "Part a",
        imagePath: "/figures/practice/seminar-2/seminar-2-page-2.png",
        altText: "Original Seminar 2 page 2 showing Question 2 on Delphic versus Odyssean guidance.",
        prompt: "What is the distinction between Delphic and Odyssean forward guidance?",
      }),
      sourcePart({
        id: "b",
        label: "Part b",
        imagePath: "/figures/practice/seminar-2/seminar-2-page-2.png",
        altText: "Original Seminar 2 page 2 showing Question 2 on commitment versus discretion.",
        prompt: "How is the distinction between commitment and discretion in monetary policy linked to the two different types of forward guidance mentioned above?",
      }),
      sourcePart({
        id: "c",
        label: "Part c",
        imagePath: "/figures/practice/seminar-2/seminar-2-page-2.png",
        altText: "Original Seminar 2 page 2 showing Question 3 and the central-bank statement ranking exercise.",
        caption:
          "Use the original statement set from the seminar sheet. The ranking should follow commitment content in the source wording, not a paraphrase.",
        prompt:
          "In this exercise, we will look at forward guidance given by different central banks. Below, you will find statements from various central banks. Place them on the line and rank them from Delphic to Odyssean, i.e arrange the statements on a line in order of increasing commitment level, with the most discretionary statements (Delphic) at left-hand side and the most committed statements (Odyssean) at the right-hand side. Position the other statements accordingly in between.",
      }),
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
        "Classify the statement before you infer the macro effect; otherwise bad-news Delphic guidance and expansionary Odyssean guidance get mixed together.",
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
    sourceDetail: "Question 4 from GRA6631_TA2_Exercises.pdf.",
    questionLabel: "Question 4",
    summary:
      "A short policy question on how the slope of the Phillips curve changes discretion and how price flexibility enters the model.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-4", "lecture-7"],
    prompt: [],
    sessionParts: [
      sourcePart({
        id: "a",
        label: "Part a",
        imagePath: "/figures/practice/seminar-2/seminar-2-page-3.png",
        altText: "Original Seminar 2 page 3 showing Question 4 part (a) on the Phillips curve.",
        prompt: "How does the slope of the Phillips curve affect optimal policy under discretion?",
      }),
      sourcePart({
        id: "b",
        label: "Part b",
        imagePath: "/figures/practice/seminar-2/seminar-2-page-3.png",
        altText: "Original Seminar 2 page 3 showing Question 4 part (b) on price flexibility.",
        prompt: "What happens to the Phillips curve if prices become more flexible (everything else equal)?",
      }),
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
        "Then say explicitly that the question is about the structural slope, not about reading a reduced-form scatterplot.",
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
    sourceDetail: "Question 1 from GRA6631_TA3_Sheet.pdf.",
    questionLabel: "Question 1",
    summary:
      "A full intertemporal-fiscal reasoning problem on government and household budget constraints.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-9"],
    prompt: [],
    sessionParts: [
      sourcePart({
        id: "a",
        label: "Part a",
        imagePath: "/figures/practice/seminar-3/seminar-3-page-1.png",
        altText: "Original Seminar 3 page 1 showing Question 1 on Ricardian equivalence.",
        beforePromptBlocks: seminar3RicardianSetupBlocks,
        prompt:
          "The value of output at time $t$ is discounted to time $0$ with $e^{-R(t)}$. Explain how this allows the interest rate to vary over time.",
      }),
      sourcePart({
        id: "b",
        label: "Part b",
        imagePath: "/figures/practice/seminar-3/seminar-3-page-1.png",
        altText: "Original Seminar 3 page 1 showing Ricardian equivalence part (b).",
        beforePromptBlocks: seminar3RicardianSetupBlocks,
        prompt:
          "Explain how the government budget constraint limits government purchases over time.",
      }),
      sourcePart({
        id: "c",
        label: "Part c",
        imagePath: "/figures/practice/seminar-3/seminar-3-page-1.png",
        altText: "Original Seminar 3 page 1 showing Ricardian equivalence part (c).",
        beforePromptBlocks: seminar3RicardianSetupBlocks,
        prompt: "Explain the consumers' budget constraint.",
      }),
      sourcePart({
        id: "d",
        label: "Part d",
        imagePath: "/figures/practice/seminar-3/seminar-3-page-1.png",
        altText: "Original Seminar 3 page 1 showing Ricardian equivalence part (d).",
        beforePromptBlocks: seminar3RicardianSetupBlocks,
        prompt:
          "Use the government budget constraint and illustrate that only the quantity of government purchases, not whether they are financed with taxes or bonds, affects private consumption.",
      }),
      sourcePart({
        id: "e",
        label: "Part e",
        imagePath: "/figures/practice/seminar-3/seminar-3-page-1.png",
        altText: "Original Seminar 3 page 1 showing Ricardian equivalence part (e).",
        beforePromptBlocks: seminar3RicardianSetupBlocks,
        prompt: "Discuss reasons why Ricardian equivalence may not hold.",
      }),
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
      "Discounting with $e^{-R(t)}$ allows the interest rate to vary over time because $R(t)=\\int_0^t r(s)\\,ds$ cumulates the whole path of short rates up to time $t$. A payment far in the future is therefore discounted by the sequence of rates that applies before it is paid, not by a single fixed interest rate.",
      "The government budget constraint says that the present value of government purchases cannot exceed initial net wealth plus the present value of taxes, once the no-Ponzi condition is imposed. Borrowing can shift taxes across dates, but it cannot remove the need to finance spending eventually.",
      "The consumer budget constraint says that the present value of consumption is limited by initial private wealth plus the present value of after-tax labor and asset income. So households choose consumption against the whole discounted path of resources, not just today's disposable income.",
      "Ricardian equivalence follows when households combine their own intertemporal budget constraint with the government's. A tax cut financed by more debt lowers taxes today, but it also implies higher future taxes of equal present value because the government budget must still balance. Households therefore do not treat the tax cut as net wealth, so private consumption depends on the path of government purchases, not on whether those purchases are tax- or bond-financed.",
      "Ricardian equivalence can fail when households are liquidity constrained, myopic, finite lived, taxed through distortionary instruments, or affected unequally by future taxes. In those cases the timing of taxes changes perceived wealth or behavior, so debt finance can matter for private demand.",
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
    sourceDetail: "Question 2 from GRA6631_TA3_Sheet.pdf.",
    questionLabel: "Question 2",
    summary:
      "A compact debt-dynamics problem mixing arithmetic, institutions, and crisis logic.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-10"],
    prompt: [],
    sessionParts: [
      sourcePart({
        id: "a",
        label: "Part a",
        imagePath: "/figures/practice/seminar-3/seminar-3-page-1.png",
        altText: "Original Seminar 3 page 1 showing Question 2 on sustainable public debt.",
        beforePromptBlocks: seminar3DebtSetupBlocks,
        prompt:
          "Explain under what conditions a primary deficit can coexist with a sustainable level of debt.",
      }),
      sourcePart({
        id: "b",
        label: "Part b",
        imagePath: "/figures/practice/seminar-3/seminar-3-page-1.png",
        altText: "Original Seminar 3 page 1 showing Question 2 part (b) on Japan.",
        beforePromptBlocks: seminar3DebtSetupBlocks,
        prompt:
          "Japan's debt-to-GDP ratio exceeded 200% in recent years yet it did not face a debt crisis. What economic condition made this possible?",
      }),
      sourcePart({
        id: "c",
        label: "Part c",
        imagePath: "/figures/practice/seminar-3/seminar-3-page-1.png",
        altText: "Original Seminar 3 page 1 showing Question 2 part (c) on the fiscal commons problem.",
        beforePromptBlocks: seminar3DebtSetupBlocks,
        prompt:
          "Explain the 'fiscal commons' problem. Which type of government is most susceptible, and what institutional mechanisms can help mitigate deficit bias?",
      }),
    ],
    guide: guide(
      "Debt arithmetic plus political economy",
      "The question is deliberately broader than one formula. You need to read the debt arithmetic first, then connect that arithmetic to institutions, credibility, and equilibrium risk. If you start with political economy before the debt equation is clear, the answer usually becomes vague.",
      [
        "Debt dynamics",
        "Interest-growth differential",
        "Primary surplus",
        "Fiscal commons",
        "Institutional deficit bias",
      ],
      [
        "Start from the benchmark debt equation and say what each term means before you discuss any country example or institution.",
        "Explain what happens when $r-g$ is favorable or unfavorable and what primary balance is needed to stabilize the ratio.",
        "Before you discuss Japan or fiscal commons, solve for the stabilizing arithmetic benchmark in words: what primary balance would keep the debt ratio from rising?",
        "Only then move to Japan as an example of benign financing conditions rather than as proof that high debt is always safe.",
        "End with the fiscal-commons problem and explain why coalition structure or weak budget institutions can push deficits above the stabilizing benchmark.",
      ],
      [
        "Answering only with $r-g$ and ignoring the role of institutions and political fragmentation.",
        "Talking about Japan as if high debt is always harmless rather than conditional on financing conditions.",
        "Treating the fiscal-commons problem as a moral story rather than a mechanism where each actor internalizes only part of the budget cost.",
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
    sourceDetail: "Question 3 from GRA6631_TA3_Sheet.pdf.",
    questionLabel: "Question 3",
    summary:
      "A mixed inequality problem combining Cobb-Douglas factor shares, Lorenz geometry, and centralized bargaining.",
    supportMode: "derivation",
    relatedModuleSlugs: ["lecture-11"],
    prompt: [],
    sessionParts: [
      sourcePart({
        id: "a",
        label: "Part a",
        imagePath: "/figures/practice/seminar-3/seminar-3-page-2.png",
        altText: "Original Seminar 3 page 2 showing Question 3 on income distribution and inequality.",
        beforePromptBlocks: seminar3InequalitySetupBlocks,
        prompt:
          "In a Cobb-Douglas economy $Y = K^{\\alpha}L^{1-\\alpha}$, show that the labour share of income equals $(1-\\alpha)$ and the capital share equals $\\alpha$. What is a key limitation of applying this result literally to observed wage inequality?",
        stepGuideIndexes: [0],
        solutionOutlineIndexes: [0],
      }),
      sourcePart({
        id: "b",
        label: "Part b",
        imagePath: "/figures/practice/seminar-3/seminar-3-page-2.png",
        altText: "Original Seminar 3 page 2 showing Question 3 part (b) on the Gini coefficient.",
        beforePromptBlocks: seminar3InequalitySetupBlocks,
        prompt:
          "Consider a society with five income quintiles with shares 5%, 10%, 15%, 25%, 45%. Compute the cumulative income shares and approximate the Gini coefficient using $G \\approx 1 - 2 \\cdot (\\text{area under the Lorenz curve})$, where the area is computed with the trapezoid rule.",
        stepGuideIndexes: [1, 2],
        solutionOutlineIndexes: [1, 2],
      }),
      sourcePart({
        id: "c",
        label: "Part c",
        imagePath: "/figures/practice/seminar-3/seminar-3-page-2.png",
        altText: "Original Seminar 3 page 2 showing Question 3 part (c) on centralized bargaining.",
        beforePromptBlocks: seminar3InequalitySetupBlocks,
        prompt:
          "Would centralised wage bargaining (as in the Scandinavian model) be expected to produce a higher or lower Gini than a fully decentralised labour market? Explain the mechanism.",
        stepGuideIndexes: [3],
        solutionOutlineIndexes: [3],
      }),
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
        "A = \\frac{1}{2}\\Big[(0+0.05)0.2 + (0.05+0.15)0.2 + (0.15+0.30)0.2 + (0.30+0.55)0.2 + (0.55+1.00)0.2\\Big]",
      ),
      step(
        "Interpret the bargaining mechanism",
        "After the calculation, explain how centralized bargaining compresses wages and therefore tends to compress the personal income distribution too.",
        "The question asks for both a numeric inequality measure and an institutional interpretation.",
        "Scandinavian model and wage compression.",
        "This connects the geometric calculation back to Lecture 11's policy and institution logic.",
      ),
      step(
        "State what the Gini does not explain by itself",
        "After computing the statistic, say explicitly that the Gini summarizes the observed distribution but does not by itself identify why the distribution looks that way.",
        "The seminar mixes measurement and mechanism on purpose, so students need to keep them conceptually separate.",
        "Measurement versus explanation.",
        "This stops you from treating the inequality statistic itself as the causal story.",
      ),
    ],
    hints: [
      "Do the Lorenz-curve geometry on paper. The main learning gain comes from seeing the cumulative shares rather than typing them.",
    ],
    nextSteps: [
      "List the cumulative income shares explicitly before you touch the trapezoid rule.",
    ],
    solutionOutline: [
      "In a competitive Cobb-Douglas economy, the marginal product conditions imply $wL=(1-\\alpha)Y$ and $rK=\\alpha Y$, so the labour share is $(1-\\alpha)$ and the capital share is $\\alpha$. The limitation is that this result is about functional income shares, not about the distribution of wages across individual workers, so it cannot by itself explain observed wage inequality.",
      "For the Lorenz-curve calculation, first convert the quintile shares into cumulative income shares. Starting from $(0.05, 0.10, 0.15, 0.25, 0.45)$, the cumulative shares are $$(0.05, 0.15, 0.30, 0.55, 1.00),$$ while the cumulative population shares are $$(0.2, 0.4, 0.6, 0.8, 1.0).$$ The relevant Lorenz points are therefore $(0,0)$, $(0.2,0.05)$, $(0.4,0.15)$, $(0.6,0.30)$, $(0.8,0.55)$, and $(1,1)$.",
      "Using the trapezoid rule, the area under the Lorenz curve is $$A = \\tfrac12\\big[(0+0.05)0.2 + (0.05+0.15)0.2 + (0.15+0.30)0.2 + (0.30+0.55)0.2 + (0.55+1.00)0.2\\big] = 0.31.$$ Hence the approximate Gini coefficient is $$G \\approx 1-2A = 1-0.62 = 0.38.$$ So the worked answer is that the society has a Gini of roughly $0.38$, which signals noticeable but not extreme inequality.",
      "Centralized bargaining would normally be expected to produce a lower Gini than a fully decentralized labour market. The reason is wage compression: coordinated bargaining raises low wages relative to high wages and narrows dispersion across firms and sectors. That tends to flatten the Lorenz curve less sharply away from the 45-degree line, which lowers the Gini relative to a decentralized benchmark with wider wage dispersion.",
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
    sourceDetail: "Question 4 from GRA6631_TA3_Sheet.pdf.",
    questionLabel: "Question 4",
    summary:
      "A mixed question on resource drag, the Coase benchmark, and carbon-pricing instrument choice.",
    supportMode: "derivation",
    relatedModuleSlugs: ["lecture-12"],
    prompt: [],
    sessionParts: [
      sourcePart({
        id: "a",
        label: "Part a",
        imagePath: "/figures/practice/seminar-3/seminar-3-page-2.png",
        altText: "Original Seminar 3 page 2 showing Question 4 on economic growth, resources, and the environment.",
        beforePromptBlocks: seminar3EnvironmentSetupBlocks,
        prompt:
          "Set $b = g$ (as in the Lecture 12 homework). Derive the steady-state per-capita growth rate. What is the 'resource drag', and when is it larger?",
        stepGuideIndexes: [0, 1, 2],
        solutionOutlineIndexes: [0, 1],
      }),
      sourcePart({
        id: "b",
        label: "Part b",
        imagePath: "/figures/practice/seminar-3/seminar-3-page-2.png",
        altText: "Original Seminar 3 page 2 showing Question 4 part (b) on the Coase theorem.",
        beforePromptBlocks: seminar3EnvironmentSetupBlocks,
        prompt:
          "State the Coase theorem. Give three features of climate change that make private Coasian solutions ineffective.",
        stepGuideIndexes: [3],
        solutionOutlineIndexes: [2],
      }),
      sourcePart({
        id: "c",
        label: "Part c",
        imagePath: "/figures/practice/seminar-3/seminar-3-page-2.png",
        altText: "Original Seminar 3 page 2 showing Question 4 part (c) on carbon taxes versus cap-and-trade.",
        beforePromptBlocks: seminar3EnvironmentSetupBlocks,
        prompt:
          "Compare carbon taxes and cap-and-trade as policy instruments. Which is preferred when the marginal abatement cost curve is steep, and why?",
        stepGuideIndexes: [4],
        solutionOutlineIndexes: [3],
      }),
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
        "g_{Y/L} = g + \\frac{\\beta}{1-\\alpha}g_R \\quad \\Rightarrow \\quad b=g \\; \\Longrightarrow \\; g_{Y/L} = g - \\frac{\\beta}{1-\\alpha}g",
      ),
      step(
        "State the Coase benchmark and its failure here",
        "Write the Coase theorem as a benchmark with well-defined property rights and negligible transaction costs, then explain why climate change violates those conditions.",
        "The question wants the benchmark first and the failure of the benchmark second.",
        "Coase theorem as a benchmark, not a policy prescription.",
        "This answers part (b) directly and keeps the logic tied to Lecture 12.",
      ),
      step(
        "Compare taxes and quantities",
        "State clearly that a carbon tax fixes the emissions price while cap-and-trade fixes the emissions quantity, then explain why steep marginal abatement costs make quantity mistakes especially expensive.",
        "This is the classic price-versus-quantity comparison under uncertainty.",
        "Instrument choice under uncertainty.",
        "This completes part (c) with a direct policy answer.",
      ),
    ],
    hints: [
      "Keep the algebra and the policy benchmark separate at first. The question becomes much clearer when you solve part (a) before you touch parts (b) and (c).",
    ],
    nextSteps: [
      "Write the growth rate of output as a weighted sum of the growth rates of $K$, $A$, $L$, and $R$ before simplifying.",
    ],
    solutionOutline: [
      "Start from the production function $$Y = K^{\\alpha}(AL)^{1-\\alpha-\\beta}R^{\\beta}.$$ Log-differentiating gives $$g_Y = \\alpha g_K + (1-\\alpha-\\beta)(g+n) + \\beta g_R.$$ In steady state the seminar lets us impose $$g_K=g_Y,$$ so $$g_Y = \\alpha g_Y + (1-\\alpha-\\beta)(g+n) + \\beta g_R.$$ Rearranging gives $$ (1-\\alpha)g_Y = (1-\\alpha-\\beta)(g+n) + \\beta g_R,$$ and therefore $$ g_Y = \\frac{(1-\\alpha-\\beta)(g+n)+\\beta g_R}{1-\\alpha}. $$",
      "Per-capita growth is $$g_{Y/L}=g_Y-n.$$ Using $$g_R=-b$$ gives $$g_{Y/L}=g + \\frac{\\beta}{1-\\alpha}g_R = g - \\frac{\\beta}{1-\\alpha}b.$$ With the homework assumption $$b=g,$$ this becomes $$g_{Y/L}=g - \\frac{\\beta}{1-\\alpha}g.$$ The resource drag is therefore $$\\frac{\\beta}{1-\\alpha}b,$$ the amount of growth lost because production depends on a resource stock that is shrinking over time. It is larger when the resource share $\\beta$ is larger and when depletion $b$ is faster.",
      "The Coase theorem says that if property rights are well defined and transaction costs are negligible, private bargaining can internalize an externality and reach an efficient allocation. Climate change is a poor candidate for such bargaining because the externality involves a huge number of agents, damages are diffuse across countries and generations, and monitoring plus enforcement costs are extremely high. So the Coase theorem is useful here as a benchmark, but not as a realistic decentralized solution.",
      "A carbon tax fixes the emissions price, while cap-and-trade fixes the emissions quantity and lets the permit price adjust. When the marginal abatement cost curve is steep, getting the quantity wrong is especially expensive because a small quantity error causes a large jump in abatement costs. In that case a carbon tax is usually preferred: price certainty prevents those large cost spikes, whereas a rigid cap can generate unnecessarily large welfare losses when costs are uncertain.",
    ],
    handSolveNote:
      "This one is meant for paper. The derivation is easier to follow by hand, and the stepwise guide explains the logic behind each manipulation.",
    answerPlaceholder:
      "Optional: note the step or expression where your handwritten derivation stopped making sense.",
    citations: seminar3Citations,
  }),
  practiceProblem({
    id: "exam-2020-question-1-norges-bank",
    slug: "exam-2020-question-1-norges-bank",
    title: "Exam 2020, Question 1: Monetary Policy in Norway",
    moduleSlug: "lecture-1",
    sourceKind: "past_exam",
    collectionSlug: "exam-2020",
    sourceLabel: "Final exam 2020",
    sourceDetail: "Question 1 from Exam 2020.pdf.",
    questionLabel: "Question 1",
    summary:
      "A short policy question on Norges Bank's mandate and the type of forward guidance used in practice.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-1", "lecture-6"],
    prompt: [],
    sessionParts: [
      sourcePart({
        id: "main",
        label: "Question 1",
        imagePath: "/figures/practice/exam-2020/exam-2020-page-1.png",
        altText: "Original Exam 2020 page 1 showing Question 1 on Norges Bank and forward guidance.",
        prompt:
          "Describe the mandate assigned to Norges Bank and explain what kind of forward guidance has been used by Norges Bank in recent years.",
      }),
    ],
    guide: guide(
      "Short conceptual policy answer",
      "The exam wants a compact institutional answer: first state the mandate, then identify the type of guidance and what makes it fit that category.",
      [
        "Inflation target",
        "Employment and financial stability",
        "Delphic forward guidance",
        "Interest-rate path as communication",
      ],
      [
        "List the main mandate elements before you say anything about guidance.",
        "Then explain why Norges Bank's published rate path is treated as Delphic rather than Odyssean guidance.",
      ],
      [
        "Reducing the mandate to inflation only.",
        "Calling the guidance a hard commitment instead of a forecast-based communication device.",
      ],
    ),
    supportingEquations: [],
    hints: [
      "Keep this answer in two blocks: mandate first, guidance second.",
    ],
    nextSteps: [
      "Write one sentence on the inflation target and supporting objectives before classifying the guidance.",
    ],
    solutionOutline: [
      "Norges Bank's mandate centers on low and stable inflation, together with contributing to high and stable output and employment and guarding against financial imbalances.",
      "The guidance is Delphic because the bank publishes an expected path for the policy rate conditional on the outlook rather than promising an unconditional commitment.",
    ],
    answerPlaceholder:
      "Write a short exam-style answer with one paragraph on the mandate and one on the guidance type.",
    citations: exam2020Citations,
  }),
  practiceProblem({
    id: "exam-2020-question-2-sustainable-public-debt",
    slug: "exam-2020-question-2-sustainable-public-debt",
    title: "Exam 2020, Question 2: Sustainable Public Debt",
    moduleSlug: "lecture-10",
    sourceKind: "past_exam",
    collectionSlug: "exam-2020",
    sourceLabel: "Final exam 2020",
    sourceDetail: "Question 2 from Exam 2020.pdf.",
    questionLabel: "Question 2",
    summary:
      "Debt arithmetic and the Blanchard r-versus-g argument in one compact exam question.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-9", "lecture-10"],
    prompt: [],
    sessionParts: [
      sourcePart({
        id: "a",
        label: "Part a",
        imagePath: "/figures/practice/exam-2020/exam-2020-page-1.png",
        altText: "Original Exam 2020 page 1 showing Question 2 on sustainable public debt.",
        prompt:
          "Explain under what conditions a primary deficit can coexist with a sustainable level of debt.",
      }),
      sourcePart({
        id: "b",
        label: "Part b",
        imagePath: "/figures/practice/exam-2020/exam-2020-page-1.png",
        altText: "Original Exam 2020 page 1 showing Question 2 part (b) on Blanchard's view on public debt.",
        prompt:
          "Describe briefly Olivier Blanchard's view on public debt expressed in his presidential address to the American Economic Association 2019.",
      }),
    ],
    guide: guide(
      "Debt arithmetic plus interpretation",
      "Part (a) is pure debt arithmetic. Part (b) asks whether you can translate that arithmetic into Blanchard's policy view without overstating it.",
      [
        "Debt-to-GDP stability",
        "Primary deficit",
        "r versus g",
        "Blanchard 2019",
      ],
      [
        "State the sustainability condition first and explain what happens when growth exceeds the interest rate.",
        "Then summarize Blanchard as saying that high debt can be more sustainable when r is below g, while still acknowledging costs and limits.",
      ],
      [
        "Treating a primary deficit as always unsustainable.",
        "Turning Blanchard's argument into 'debt never matters.'",
      ],
    ),
    supportingEquations: [
      {
        id: "exam2020-debt-condition",
        label: "Debt-stability condition",
        latex:
          "\\frac{D}{Y} = \\frac{1+g}{g-r}\\cdot\\frac{G-T}{Y}",
        explanation:
          "Use this benchmark to explain when a positive primary deficit can coexist with a stable debt ratio.",
      },
    ],
    hints: [
      "Start from the debt arithmetic before you mention Blanchard's policy conclusion.",
    ],
    nextSteps: [
      "Write explicitly that a stable debt ratio is easier to maintain when the growth rate exceeds the interest rate.",
    ],
    solutionOutline: [
      "A primary deficit can coexist with debt sustainability when growth is sufficiently strong relative to the interest rate, so the denominator grows fast enough to stabilize the ratio.",
      "Blanchard's point is that low rates make higher debt less dangerous than standard textbook intuition suggests, but not costless or irrelevant.",
    ],
    answerPlaceholder:
      "Keep the answer tight: one paragraph on the arithmetic and one paragraph on Blanchard's interpretation.",
    citations: exam2020Citations,
  }),
  practiceProblem({
    id: "exam-2020-question-3-basic-nk-model",
    slug: "exam-2020-question-3-basic-nk-model",
    title: "Exam 2020, Question 3: The Basic New Keynesian Model",
    moduleSlug: "lecture-2",
    sourceKind: "past_exam",
    collectionSlug: "exam-2020",
    sourceLabel: "Final exam 2020",
    sourceDetail: "Question 3 from Exam 2020.pdf.",
    questionLabel: "Question 3",
    summary:
      "A full baseline NK-model exam set on sign logic, shock identification, and the divine-coincidence benchmark.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-2", "lecture-3", "lecture-4"],
    prompt: [],
    sessionParts: [
      sourcePart({
        id: "a",
        label: "Part a",
        imagePath: "/figures/practice/exam-2020/exam-2020-page-2.png",
        altText: "Original Exam 2020 page 2 showing Question 3 on the basic New Keynesian model.",
        prompt:
          "Suppose the economy is in steady state. The economy is hit by a temporary positive technology shock. Describe from a qualitative point of view the impact response of output, potential output, output gap, inflation and natural rate of interest (i.e. whether each variable increases, decreases or stays constant). Explain briefly the transmission mechanism.",
      }),
      sourcePart({
        id: "b",
        label: "Part b",
        imagePath: "/figures/practice/exam-2020/exam-2020-page-2.png",
        altText: "Original Exam 2020 page 2 showing Question 3 part (b).",
        prompt:
          "Suppose the economy is in steady state. The economy is hit by one (and only one) temporary shock. In response to the shock, inflation increases and the interest rate decreases. What kind of shock has hit the economy? Explain your reasoning.",
      }),
      sourcePart({
        id: "c",
        label: "Part c",
        imagePath: "/figures/practice/exam-2020/exam-2020-page-2.png",
        altText: "Original Exam 2020 page 2 showing Question 3 part (c).",
        prompt:
          "Suppose the economy is in steady state. The economy is hit by one (and only one) temporary shock. In response to the shock, output increases and total hours worked decrease. What kind of shock has hit the economy? Explain your reasoning.",
      }),
      sourcePart({
        id: "d",
        label: "Part d",
        imagePath: "/figures/practice/exam-2020/exam-2020-page-2.png",
        altText: "Original Exam 2020 page 2 showing Question 3 part (d).",
        prompt:
          "Suppose the economy is in steady state. The economy is hit by a positive temporary technology shock. Describe the effects of the shock on output, potential output, output gap and inflation if the monetary policy authority behaves optimally. Explain your reasoning. Under what parameterization are total hours worked invariant to the shock?",
      }),
      sourcePart({
        id: "e",
        label: "Part e",
        imagePath: "/figures/practice/exam-2020/exam-2020-page-2.png",
        altText: "Original Exam 2020 page 2 showing Question 3 part (e).",
        prompt:
          "Suppose the economy is in steady state. The economy is hit simultaneously by a positive temporary technology shock and a positive discount factor shock (households become more impatient and want to consume more in the current period). Assume that the monetary policy authority behaves optimally. Describe from a qualitative point of view the combined effect of the two shocks on output gap and inflation. Explain your reasoning. Do you have sufficient information to evaluate the response of the natural rate of interest?",
      }),
    ],
    guide: guide(
      "Benchmark NK-model reasoning set",
      "This question checks whether you can keep the benchmark straight across several subparts: identify the shock, separate actual from natural objects, and then switch into the optimal-policy benchmark when asked.",
      [
        "Technology versus discount-factor versus monetary-policy shocks",
        "Output versus potential output",
        "Output gap",
        "Inflation and real marginal cost",
        "Divine coincidence",
      ],
      [
        "For each part, decide first whether you are in the Taylor-rule benchmark or the optimal-policy benchmark.",
        "Only then sign output, natural output, the gap, inflation, and the relevant interest-rate object.",
      ],
      [
        "Mixing up actual output and potential output.",
        "Answering the optimal-policy parts as if the Taylor rule were still active.",
      ],
    ),
    supportingEquations: [],
    hints: [
      "Mark clearly whether each subpart is about the sticky-price economy under a Taylor rule or the flexible-price allocation under optimal policy.",
    ],
    nextSteps: [
      "For the optimal-policy parts, write 'divine coincidence' at the top of your page before you start the sign logic.",
    ],
    solutionOutline: [
      "A positive temporary technology shock raises actual output and raises potential output even more, because higher productivity shifts the flexible-price benchmark upward. In the sticky-price equilibrium the output gap therefore falls, inflation falls with marginal cost, and the natural real rate falls in the lecture calibration.",
      "The clean benchmark explanation is an expansionary monetary-policy shock. A negative policy-rate innovation lowers the nominal interest rate directly, strengthens demand, and therefore raises inflation, so it is the one baseline shock consistent with higher inflation together with a lower policy rate.",
      "The clean benchmark explanation is again a positive technology shock. Productivity raises output directly, while the higher efficiency of labour input makes it possible for firms to produce more even though total hours worked decline.",
      "Under optimal policy and with no cost-push shock, divine coincidence applies. The central bank implements the flexible-price allocation, so actual output rises together with potential output, while the output gap and inflation are both stabilized at zero. Hours worked are invariant when $\\sigma = 1$, because then the natural-employment response $$n_t^n = \\frac{1-\\sigma}{\\sigma+\\phi}a_t$$ is exactly zero.",
      "Under optimal policy, the output gap and inflation are both stabilized at zero because there is still no independent inflation wedge in the model. The natural rate is not pinned down from the information given: the positive discount-factor shock pushes $r_t^n$ up, while the positive technology shock moves $r_t^n$ in the opposite direction in the lecture calibration. Without relative magnitudes, the combined effect on the natural rate is ambiguous.",
    ],
    answerPlaceholder:
      "Answer one subpart at a time and keep the benchmark regime explicit in each one.",
    citations: exam2020Citations,
  }),
  practiceProblem({
    id: "exam-2020-question-4-supply-shocks",
    slug: "exam-2020-question-4-supply-shocks",
    title: "Exam 2020, Question 4: Monetary Policy and Supply Shocks",
    moduleSlug: "lecture-1",
    sourceKind: "past_exam",
    collectionSlug: "exam-2020",
    sourceLabel: "Final exam 2020",
    sourceDetail: "Question 4 from Exam 2020.pdf.",
    questionLabel: "Question 4",
    summary:
      "A supply-shock policy question that uses the natural-rate benchmark to distinguish temporary, permanent, and growth shocks.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-1", "lecture-2", "lecture-3"],
    prompt: [],
    sessionParts: [
      sourcePart({
        id: "a",
        label: "Part a",
        imagePath: "/figures/practice/exam-2020/exam-2020-page-3.png",
        altText: "Original Exam 2020 page 3 showing Question 4 on monetary policy and supply shocks.",
        prompt:
          "How should monetary policy respond to a positive temporary shock to the level of technology? Explain briefly.",
      }),
      sourcePart({
        id: "b",
        label: "Part b",
        imagePath: "/figures/practice/exam-2020/exam-2020-page-3.png",
        altText: "Original Exam 2020 page 3 showing Question 4 part (b).",
        prompt:
          "How should monetary policy respond to a positive permanent shock to the level of technology? Explain briefly.",
      }),
      sourcePart({
        id: "c",
        label: "Part c",
        imagePath: "/figures/practice/exam-2020/exam-2020-page-3.png",
        altText: "Original Exam 2020 page 3 showing Question 4 part (c).",
        prompt:
          "How should monetary policy respond to a positive temporary shock to the growth rate of technology? Explain briefly.",
      }),
      sourcePart({
        id: "d",
        label: "Part d",
        imagePath: "/figures/practice/exam-2020/exam-2020-page-3.png",
        altText: "Original Exam 2020 page 3 showing Question 4 part (d).",
        prompt:
          "All in all, is the statement that monetary policy should accommodate supply shocks accurate? Explain briefly.",
      }),
    ],
    guide: guide(
      "Policy interpretation through the natural-rate benchmark",
      "The safest way to answer is to reason through how each supply shock moves the natural rate of interest. The policy recommendation follows from whether the central bank should track that natural-rate movement or leave the rate unchanged.",
      [
        "Natural rate of interest",
        "Temporary versus permanent level shocks",
        "Growth-rate shocks",
        "Accommodation versus tracking",
      ],
      [
        "Classify the technology disturbance first: temporary level, permanent level, or temporary growth-rate shock.",
        "Then explain how that classification changes the natural rate and therefore the policy response.",
      ],
      [
        "Using 'accommodate' as a slogan without asking what happens to the natural rate.",
        "Treating all technology shocks as if they had the same effect on the policy rate.",
      ],
    ),
    supportingEquations: [
      {
        id: "exam2020-natural-rate",
        label: "Natural-rate benchmark",
        latex:
          "r_t^n = \\rho - \\sigma\\frac{1+\\phi}{\\sigma+\\phi}(1-\\rho_a)a_t + (1-\\rho_z)z_t",
        explanation:
          "Use the natural-rate formula to explain why different technology shocks imply different policy-rate responses.",
      },
    ],
    hints: [
      "The answer becomes much cleaner if you state what happens to the natural rate before you say what the central bank should do.",
    ],
    nextSteps: [
      "Write one line on the natural-rate effect for part (a) before you discuss accommodation.",
    ],
    solutionOutline: [
      "A temporary technology-level shock typically lowers the natural rate, so optimal policy lowers the policy rate to track it.",
      "A permanent level shock need not move the natural rate in the same way, so the policy response can be much smaller or zero.",
      "A growth-rate shock is different again because it changes expected future technology and therefore intertemporal incentives.",
      "So the slogan 'always accommodate supply shocks' is too crude; the correct response depends on which supply shock you mean.",
    ],
    answerPlaceholder:
      "Answer each subpart in one compact paragraph, always stating the natural-rate logic explicitly.",
    citations: exam2020Citations,
  }),
  practiceProblem({
    id: "exam-2020-question-5-cost-push-figure",
    slug: "exam-2020-question-5-cost-push-figure",
    title: "Exam 2020, Question 5: Cost-Push Shock under Discretion and Commitment",
    moduleSlug: "lecture-4",
    sourceKind: "past_exam",
    collectionSlug: "exam-2020",
    sourceLabel: "Final exam 2020",
    sourceDetail: "Question 5 from Exam 2020.pdf.",
    questionLabel: "Question 5",
    summary:
      "A figure-interpretation question on discretion versus full state-contingent commitment after a cost-push shock.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-4", "lecture-5"],
    prompt: [],
    sessionParts: [
      sourcePart({
        id: "main",
        label: "Question 5",
        imagePath: "/figures/practice/exam-2020/exam-2020-page-3.png",
        altText: "Original Exam 2020 page 3 showing Question 5 and the referenced figure on discretion versus commitment.",
        prompt:
          "Describe and interpret the figure shown above and discussed in class. Use the formulas relating inflation and output gap under discretion and full state-contingent commitment to explain your reasoning.",
      }),
    ],
    guide: guide(
      "Figure interpretation with policy-regime comparison",
      "The question is testing whether you can read the paths under discretion and commitment and tie them back to the target rules, not just describe the lines mechanically.",
      [
        "Cost-push shock",
        "Discretion",
        "Full state-contingent commitment",
        "Inflation-output trade-off",
      ],
      [
        "Describe what the shock does to inflation and the output gap on impact.",
        "Then explain why discretion gives a monotone return while commitment uses history dependence and a price-level catch-up logic.",
      ],
      [
        "Describing the figure without saying why the paths differ.",
        "Talking about commitment as if it simply means 'more hawkish policy.'",
      ],
    ),
    supportingEquations: [
      {
        id: "exam2020-discretion-rule",
        label: "Discretionary trade-off",
        latex: "x_t = -\\frac{\\kappa}{\\alpha_x}\\pi_t",
        explanation:
          "Under discretion the policymaker trades off current inflation against the current output gap only.",
      },
      {
        id: "exam2020-commitment-rule",
        label: "Commitment dynamics",
        latex:
          "x_{t+i} - x_{t+i-1} = -\\frac{\\kappa}{\\alpha_x}\\pi_{t+i}",
        explanation:
          "Under commitment, promised future policy actions matter for today's stabilization path.",
      },
    ],
    hints: [
      "Read the question in three layers: impact effect, transition path, and welfare intuition.",
    ],
    nextSteps: [
      "State first what the cost-push shock does on impact before comparing discretion and commitment.",
    ],
    solutionOutline: [
      "Discretion stabilizes gradually and leaves the price level permanently higher because the policymaker re-optimizes each period.",
      "Commitment creates history dependence: the central bank promises future restraint so inflation can undershoot later and the price level can move back.",
    ],
    answerPlaceholder:
      "Write as a figure-reading answer: impact, transition path, then economic intuition.",
    citations: exam2020Citations,
  }),
  practiceProblem({
    id: "exam-2020-question-6-phillips-curve-slope",
    slug: "exam-2020-question-6-phillips-curve-slope",
    title: "Exam 2020, Question 6: The Slope of the Phillips Curve",
    moduleSlug: "lecture-7",
    sourceKind: "past_exam",
    collectionSlug: "exam-2020",
    sourceLabel: "Final exam 2020",
    sourceDetail: "Question 6 from Exam 2020.pdf.",
    questionLabel: "Question 6",
    summary:
      "A benchmark question on whether more flexible prices can explain a flatter Phillips curve.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-2", "lecture-7"],
    prompt: [],
    sessionParts: [
      sourcePart({
        id: "main",
        label: "Question 6",
        imagePath: "/figures/practice/exam-2020/exam-2020-page-3.png",
        altText: "Original Exam 2020 page 3 showing Question 6 on the slope of the Phillips curve.",
        prompt:
          "Consider the New Keynesian Phillips curve used in class: $\\pi_t = \\beta E_t \\pi_{t+1} + \\kappa \\tilde y_t$, where $\\tilde y_t = y_t - y_t^n$, $\\kappa = \\lambda (\\sigma + \\phi)$ and $\\lambda = \\frac{(1-\\theta)(1-\\beta\\theta)}{\\theta}$. Assume that monetary policy follows a standard Taylor rule and that the economy is driven only by discount factor shocks and technology shocks. Some economists argue that the Phillips curve has flattened (i.e. $\\kappa$ has declined). Imagine that prices have become more flexible (everything else equal). Could this fact lead to a flattening of the Phillips curve? Explain.",
      }),
    ],
    guide: guide(
      "Theory-versus-evidence Phillips-curve question",
      "The key is to separate the structural slope parameter from the reduced-form correlation one might see in the data. The question asks directly about structural logic in the benchmark model.",
      [
        "Structural slope kappa",
        "Price flexibility",
        "Reduced-form versus structural relationship",
      ],
      [
        "Use the formula for $\\lambda$ to see what more flexible prices do to $\\kappa$.",
        "Then say why that theoretical prediction goes in the opposite direction of a flattening story.",
      ],
      [
        "Answering with raw scatterplot intuition instead of the structural formula.",
        "Confusing a flatter reduced-form relationship with a lower structural $\\kappa$ in the model.",
      ],
    ),
    supportingEquations: [
      {
        id: "exam2020-kappa",
        label: "Structural slope parameter",
        latex:
          "\\kappa = \\lambda(\\sigma + \\phi), \\qquad \\lambda = \\frac{(1-\\theta)(1-\\beta\\theta)}{\\theta}",
        explanation:
          "More flexible prices mean a lower Calvo parameter $\\theta$, which pushes $\\lambda$ and therefore $\\kappa$ up rather than down.",
      },
    ],
    hints: [
      "Use the formula before you use words. The formula settles the structural direction immediately.",
    ],
    nextSteps: [
      "Ask what happens to $\\theta$ and then to $\\lambda$ when prices become more flexible.",
    ],
    solutionOutline: [
      "More flexible prices imply a larger structural slope parameter, not a smaller one.",
      "So increased price flexibility is not a good benchmark explanation for a flatter Phillips curve within this model.",
    ],
    answerPlaceholder:
      "Give one short paragraph on the formula logic and one on the interpretation.",
    citations: exam2020Citations,
  }),
  practiceProblem({
    id: "exam-2020-question-7-fiscal-policy-in-norway",
    slug: "exam-2020-question-7-fiscal-policy-in-norway",
    title: "Exam 2020, Question 7: Fiscal Policy in Norway",
    moduleSlug: "lecture-9",
    sourceKind: "past_exam",
    collectionSlug: "exam-2020",
    sourceLabel: "Final exam 2020",
    sourceDetail: "Question 7 from Exam 2020.pdf.",
    questionLabel: "Question 7",
    summary:
      "A Norway-specific fiscal-rule question on deficits, fund returns, and the implications for policy from 2021 onward.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-9", "lecture-10"],
    prompt: [],
    sessionParts: [
      sourcePart({
        id: "main",
        label: "Question 7",
        imagePath: "/figures/practice/exam-2020/exam-2020-page-3.png",
        altText: "Original Exam 2020 page 3 showing the start of Question 7 on fiscal policy in Norway.",
        afterPromptBlocks: [
          figureNote({
            title: "Original source continuation",
            caption:
              "Question 7 continues on the next source page. The canonical wording remains the original exam text.",
            imagePath: "/figures/practice/exam-2020/exam-2020-page-4.png",
            altText:
              "Original Exam 2020 page 4 showing the continuation of Question 7 on fiscal policy in Norway.",
          }),
        ],
        prompt:
          "The Norwegian government's budget for 2020 implies a non-oil deficit of NOK 241 bn and a structural non-oil deficit of NOK 244 bn. As of April 3, these numbers have been raised to NOK 442 bn and NOK 383 bn, respectively, as a result of the effects of the Corona virus and mitigating policies. Suppose further developments during the year add another NOK 250 bn to the non-oil deficit and another NOK 170 bn to the structural, non-oil deficit. Suppose also that the Government Pension Fund Global, which started the year with a value of NOK 10,000 bn, gets an annual financial return of -15% for 2020. Discuss the consequences that such a development would have for fiscal policy from 2021 on assuming that the Fiscal Rule stays in effect.",
      }),
    ],
    guide: guide(
      "Institutional fiscal-policy application",
      "This is an applied fiscal-rule question. The exam wants you to connect the arithmetic of a weaker fund position to the institutional rule for future non-oil deficits.",
      [
        "Fiscal Rule",
        "Structural non-oil deficit",
        "Government Pension Fund Global",
        "Permanent-income logic",
      ],
      [
        "State what the Fiscal Rule is trying to stabilize relative to the sovereign wealth fund.",
        "Then explain how a larger structural deficit and a weaker fund value tighten the room for maneuver from 2021 onward.",
      ],
      [
        "Talking only about the 2020 emergency response without connecting it to the 2021 rule implications.",
        "Mixing up the observed deficit and the structural non-oil deficit.",
      ],
    ),
    supportingEquations: [],
    hints: [
      "The question is really about future fiscal space under the rule, not about whether emergency spending in 2020 was justified.",
    ],
    nextSteps: [
      "Write down what happens to the permissible structural deficit when the fund value falls sharply.",
    ],
    solutionOutline: [
      "A lower fund value mechanically lowers the krone amount consistent with the Fiscal Rule.",
      "So unless the rule changes, fiscal policy from 2021 onward must become tighter than it otherwise would have been, because the starting point is a higher structural deficit and a smaller asset base.",
    ],
    answerPlaceholder:
      "Frame the answer around the fiscal rule, fund value, and the implied tightening from 2021 onward.",
    citations: exam2020Citations,
  }),
  practiceProblem({
    id: "exam-2021-question-1-keynesian-supply-shocks",
    slug: "exam-2021-question-1-keynesian-supply-shocks",
    title: "Exam 2021, Question 1: Keynesian Supply Shocks",
    moduleSlug: "lecture-4",
    sourceKind: "past_exam",
    collectionSlug: "exam-2021",
    sourceLabel: "Final exam 2021",
    sourceDetail: "Question 1 from Exam 2021.pdf.",
    questionLabel: "Question 1",
    summary:
      "A conceptual question on Guerrieri-style Keynesian supply shocks and the policy implications of different elasticities.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-3", "lecture-4"],
    prompt: [],
    sessionParts: [
      sourcePart({
        id: "a",
        label: "Part a",
        imagePath: "/figures/practice/exam-2021/exam-2021-page-1.png",
        altText: "Original Exam 2021 page 1 showing Question 1 on Keynesian supply shocks.",
        prompt:
          "Explain the notion of Keynesian supply shocks in the context of the model proposed by Guerrieri et al (2020) discussed in class. Use the COVID-19 recession as an example.",
      }),
      sourcePart({
        id: "b",
        label: "Part b",
        imagePath: "/figures/practice/exam-2021/exam-2021-page-1.png",
        altText: "Original Exam 2021 page 1 showing Question 1 part (b) and the related figure.",
        prompt:
          "Comment the following figure and discuss the appropriate monetary policy response to a negative transitory supply shock when the elasticity of intertemporal substitution is bigger than the intratemporal elasticity of substitution between the two goods and when it is lower.",
      }),
    ],
    guide: guide(
      "Conceptual mechanism plus figure interpretation",
      "Part (a) asks what makes the shock 'Keynesian' rather than just supply-side. Part (b) then asks what that implies for the natural rate and the policy response under different elasticities.",
      [
        "Guerrieri et al. (2020)",
        "Sectoral shutdown and demand spillovers",
        "Elasticity comparison",
        "Natural-rate response",
      ],
      [
        "Define a Keynesian supply shock as one that starts on the supply side but propagates through demand and amplifies the output loss.",
        "Then use the figure to explain how the sign of the optimal policy response depends on the elasticity comparison.",
      ],
      [
        "Explaining only the initial sectoral shutdown but not the amplification channel.",
        "Talking about the policy rate without first classifying whether the shock lowers or raises the natural rate.",
      ],
    ),
    supportingEquations: [],
    hints: [
      "The word 'Keynesian' is doing real work here: explain why the demand spillover matters.",
    ],
    nextSteps: [
      "Start with the two-sector intuition before you touch the policy comparison in part (b).",
    ],
    solutionOutline: [
      "A Keynesian supply shock is a negative supply disturbance that also depresses aggregate demand through sectoral spillovers, so the output loss becomes larger than in a standard pure supply-shock story. In the COVID-19 example, shutdowns in contact-intensive sectors lowered those sectors' supply directly, but they also reduced income and demand elsewhere in the economy.",
      "The elasticity comparison determines whether the natural rate falls or rises, and that is what guides monetary policy. If intertemporal substitution is strong relative to intratemporal substitution, households want to reallocate spending across time more easily, which can make the natural rate rise; if the opposite inequality holds, the natural rate can fall instead. So the figure is not just about recession size, but about whether the optimal policy response is tighter or looser.",
    ],
    answerPlaceholder:
      "Write one paragraph on the mechanism and one on the figure-based policy response.",
    citations: exam2021Citations,
  }),
  practiceProblem({
    id: "exam-2021-question-2-basic-nk-model",
    slug: "exam-2021-question-2-basic-nk-model",
    title: "Exam 2021, Question 2: The Basic New Keynesian Model",
    moduleSlug: "lecture-2",
    sourceKind: "past_exam",
    collectionSlug: "exam-2021",
    sourceLabel: "Final exam 2021",
    sourceDetail: "Question 2 from Exam 2021.pdf.",
    questionLabel: "Question 2",
    summary:
      "A baseline NK-model exam set focused on discount-factor shocks, shock identification, and optimal policy.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-2", "lecture-3", "lecture-4"],
    prompt: [],
    sessionParts: [
      sourcePart({
        id: "a",
        label: "Part a",
        imagePath: "/figures/practice/exam-2021/exam-2021-page-2.png",
        altText: "Original Exam 2021 page 2 showing Question 2 on the basic New Keynesian model.",
        prompt:
          "Suppose the economy is in steady state. The economy is hit by a temporary positive discount factor shock ($z_t$ increases). Describe from a qualitative point of view the impact response of output, potential output, inflation and natural rate of interest (i.e. whether each variable increases, decreases or stays constant). Explain briefly your reasoning.",
      }),
      sourcePart({
        id: "b",
        label: "Part b",
        imagePath: "/figures/practice/exam-2021/exam-2021-page-2.png",
        altText: "Original Exam 2021 page 2 showing Question 2 part (b).",
        prompt:
          "Suppose the economy is in steady state. The economy is hit by one (and only one) temporary shock. In response to the shock, consumption increases and total hours worked decrease. What kind of shock has hit the economy? Explain briefly your reasoning.",
      }),
      sourcePart({
        id: "c",
        label: "Part c",
        imagePath: "/figures/practice/exam-2021/exam-2021-page-2.png",
        altText: "Original Exam 2021 page 2 showing Question 2 part (c).",
        prompt:
          "Suppose the economy is in steady state. The economy is hit simultaneously by a contractionary monetary policy shock ($v_t$ increases) and a positive temporary discount factor shock ($z_t$ increases). Do you have sufficient information to evaluate the response of the nominal interest rate? Explain briefly your reasoning.",
      }),
      sourcePart({
        id: "d",
        label: "Part d",
        imagePath: "/figures/practice/exam-2021/exam-2021-page-2.png",
        altText: "Original Exam 2021 page 2 showing Question 2 part (d).",
        prompt:
          "Suppose the economy is in steady state. The economy is hit by a positive temporary discount factor shock ($z_t$ increases). Describe the effects of the shock on output and nominal interest rate if the monetary policy authority behaves optimally. Explain briefly your reasoning.",
      }),
    ],
    guide: guide(
      "Baseline NK-model reasoning set",
      "The key benchmark is the discount-factor shock. You need to explain what it does under the Taylor-rule benchmark, then what changes once optimal policy restores the flexible-price allocation.",
      [
        "Discount-factor shock",
        "Natural rate of interest",
        "Technology shock identification",
        "Optimal policy and divine coincidence",
      ],
      [
        "Answer part (a) under sticky prices and the Taylor rule.",
        "Use shock-identification logic for parts (b) and (c).",
        "Then switch to the optimal-policy benchmark in part (d).",
      ],
      [
        "Treating the optimal-policy part as if sticky-price distortions still survive.",
        "Confusing a discount-factor shock with a technology shock in the sign logic.",
      ],
    ),
    supportingEquations: [],
    hints: [
      "For part (d), write 'track the natural rate' before you start the explanation.",
    ],
    nextSteps: [
      "Decide first whether each subpart is about the Taylor-rule benchmark or the optimal-policy benchmark.",
    ],
    solutionOutline: [
      "A positive discount-factor shock raises households' desire to spend today rather than tomorrow. In the Taylor-rule benchmark, that pushes actual output up, leaves potential output unchanged, raises inflation, and raises the natural real rate because the flexible-price economy also needs a higher real rate to absorb the stronger current demand.",
      "The clean benchmark explanation is a positive technology shock. Higher productivity allows consumption and output to rise while labour input falls, because the economy can produce more with fewer hours.",
      "Yes, the nominal interest rate increases. The contractionary monetary-policy shock raises the policy rate directly, and the positive discount-factor shock pushes demand and the natural rate upward rather than downward. So both shocks work in the direction of a higher nominal rate on impact.",
      "Under optimal policy, divine coincidence restores the flexible-price allocation. Because the discount-factor shock does not move potential output in this benchmark, actual output stays at its natural level rather than rising persistently, while the nominal interest rate increases enough to track the higher natural real rate and keep inflation at zero.",
    ],
    answerPlaceholder:
      "Answer part by part and keep the policy regime explicit in each paragraph.",
    citations: exam2021Citations,
  }),
  practiceProblem({
    id: "exam-2021-question-3-forward-guidance-puzzle",
    slug: "exam-2021-question-3-forward-guidance-puzzle",
    title: "Exam 2021, Question 3: Forward Guidance Puzzle",
    moduleSlug: "lecture-6",
    sourceKind: "past_exam",
    collectionSlug: "exam-2021",
    sourceLabel: "Final exam 2021",
    sourceDetail: "Question 3 from Exam 2021.pdf.",
    questionLabel: "Question 3",
    summary:
      "A figure-reading question on why far-future promised rate changes can have implausibly large current effects in the textbook model.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-6"],
    prompt: [],
    sessionParts: [
      sourcePart({
        id: "main",
        label: "Question 3",
        imagePath: "/figures/practice/exam-2021/exam-2021-page-3.png",
        altText: "Original Exam 2021 page 3 showing Question 3 on the forward-guidance puzzle.",
        prompt:
          "Comment the following figure discussed in class to explain the forward guidance puzzle.",
      }),
    ],
    guide: guide(
      "Figure interpretation with Dynamic IS logic",
      "The question is asking why the textbook model gives stronger current effects when the promised future rate change is further away, and why that looks implausible.",
      [
        "Forward guidance puzzle",
        "Anticipated real-rate changes",
        "Dynamic IS equation",
        "Discounted cumulative output",
      ],
      [
        "Describe what the different lines mean as news about future real-rate cuts at different horizons.",
        "Then explain why solving the model forward makes current demand depend on the whole future path of expected real rates.",
      ],
      [
        "Calling the result puzzling without explaining the intertemporal channel.",
        "Describing the lines without saying why the distant-horizon case moves current output and inflation so much.",
      ],
    ),
    supportingEquations: [],
    hints: [
      "The safest opening is: the figure compares equally sized future rate cuts announced at different horizons.",
    ],
    nextSteps: [
      "Explain first what each colored line means before you explain why the yellow line is the puzzling one.",
    ],
    solutionOutline: [
      "In the textbook model, a promised future real-rate cut raises expected future demand, and that effect feeds back into current demand through the Dynamic IS equation.",
      "Because current inflation depends on discounted future output, the farther-horizon promise can generate implausibly large current effects, which is the puzzle.",
    ],
    answerPlaceholder:
      "Write as a figure-comment answer: what the lines mean, then why the result is puzzling.",
    citations: exam2021Citations,
  }),
  practiceProblem({
    id: "exam-2021-question-4-ricardian-equivalence",
    slug: "exam-2021-question-4-ricardian-equivalence",
    title: "Exam 2021, Question 4: Ricardian Equivalence",
    moduleSlug: "lecture-9",
    sourceKind: "past_exam",
    collectionSlug: "exam-2021",
    sourceLabel: "Final exam 2021",
    sourceDetail: "Question 4 from Exam 2021.pdf.",
    questionLabel: "Question 4",
    summary:
      "A three-part Ricardian-equivalence question on the benchmark, its failures in practice, and the excess-savings link.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-9"],
    prompt: [],
    sessionParts: [
      sourcePart({
        id: "a",
        label: "Part a",
        imagePath: "/figures/practice/exam-2021/exam-2021-page-3.png",
        altText: "Original Exam 2021 page 3 showing Question 4 on Ricardian equivalence.",
        prompt: "Discuss the notion of Ricardian equivalence.",
      }),
      sourcePart({
        id: "b",
        label: "Part b",
        imagePath: "/figures/practice/exam-2021/exam-2021-page-3.png",
        altText: "Original Exam 2021 page 3 showing Question 4 part (b).",
        prompt:
          "Discuss briefly two reasons at your choice (among the four discussed in class) that are likely to imply deviations from Ricardian equivalence in practice.",
      }),
      sourcePart({
        id: "c",
        label: "Part c",
        imagePath: "/figures/practice/exam-2021/exam-2021-page-3.png",
        altText: "Original Exam 2021 page 3 showing Question 4 part (c).",
        prompt:
          "The blog post by Bilbiie, Eggertsson and Primiceri (2021) discussed in class relates the current excess of savings in the US and Ricardian equivalence. Explain the link.",
      }),
    ],
    guide: guide(
      "Benchmark plus deviations question",
      "Part (a) defines the benchmark. Part (b) asks why it fails in practice. Part (c) applies that logic to an observed savings pattern.",
      [
        "Ricardian equivalence",
        "Present value of taxes",
        "Overlapping generations, non-rational expectations, credit constraints, distortionary taxes",
        "Excess savings and public debt",
      ],
      [
        "Define the benchmark clearly first: timing of taxes does not matter when the present value is unchanged.",
        "Then choose two deviations and explain why they break the benchmark logic.",
        "Finish by linking high government debt to private saving behavior in the Bilbiie-Eggertsson-Primiceri discussion.",
      ],
      [
        "Listing assumptions without explaining why they matter.",
        "Treating excess savings as unrelated to fiscal financing expectations.",
      ],
    ),
    supportingEquations: [],
    hints: [
      "The answer is strongest when you keep the benchmark and the deviations clearly separated.",
    ],
    nextSteps: [
      "Write one clean sentence defining the benchmark before you move to any deviations.",
    ],
    solutionOutline: [
      "Ricardian equivalence says that, for a given present value of government spending, debt-financed tax cuts do not raise private consumption because households internalize future taxes.",
      "The result fails when households are not infinitely lived, not fully rational, credit constrained, or taxed through distortionary rather than lump-sum instruments.",
      "That is why higher government debt can show up as higher private saving rather than a spending boom.",
    ],
    answerPlaceholder:
      "Use one short paragraph per subpart and keep the benchmark logic explicit throughout.",
    citations: exam2021Citations,
  }),
  practiceProblem({
    id: "exam-2021-question-5-co-movement-output-consumption",
    slug: "exam-2021-question-5-co-movement-output-consumption",
    title: "Exam 2021, Question 5: Co-movement between Output and Consumption",
    moduleSlug: "lecture-8",
    sourceKind: "past_exam",
    collectionSlug: "exam-2021",
    sourceLabel: "Final exam 2021",
    sourceDetail: "Question 5 from Exam 2021.pdf.",
    questionLabel: "Question 5",
    summary:
      "A standard NK-model question on why government spending shocks can produce negative output-consumption co-movement and how to change that result.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-2", "lecture-8", "lecture-9"],
    prompt: [],
    sessionParts: [
      sourcePart({
        id: "a",
        label: "Part a",
        imagePath: "/figures/practice/exam-2021/exam-2021-page-3.png",
        altText: "Original Exam 2021 page 3 showing Question 5 on co-movement between output and consumption.",
        prompt:
          "Only one of these shocks implies a negative co-movement between output and consumption (consumption and output move in opposite directions when the shock hits the economy). Which one? Explain.",
      }),
      sourcePart({
        id: "b",
        label: "Part b",
        imagePath: "/figures/practice/exam-2021/exam-2021-page-3.png",
        altText: "Original Exam 2021 page 3 showing Question 5 part (b).",
        prompt:
          "Discuss briefly one modification to the baseline model at your choice (among the four discussed in class) in order to obtain a positive co-movement between output and consumption in response to that shock.",
      }),
    ],
    guide: guide(
      "Mechanism and model-extension question",
      "Part (a) asks you to identify the benchmark shock. Part (b) asks whether you can name and explain one modification that changes the benchmark co-movement result.",
      [
        "Government spending shock",
        "Negative output-consumption co-movement",
        "Liquidity-constrained households or other extensions",
      ],
      [
        "Start from the benchmark equation linking output, private consumption, and government spending.",
        "Then pick one model modification and explain why it changes the household response enough to restore positive co-movement.",
      ],
      [
        "Naming a modification without explaining its mechanism.",
        "Picking the wrong benchmark shock in part (a).",
      ],
    ),
    supportingEquations: [],
    hints: [
      "The benchmark negative co-movement result is tied to government spending shocks, not to the standard demand or technology shocks.",
    ],
    nextSteps: [
      "State the benchmark shock first, then choose one modification and explain its mechanism clearly.",
    ],
    solutionOutline: [
      "In the baseline model, a government spending shock is the standard case where output can rise while private consumption falls.",
      "Extensions such as liquidity-constrained households can reverse that result because current income gains translate more directly into current consumption.",
    ],
    answerPlaceholder:
      "Write one paragraph on the benchmark shock and one on your chosen modification.",
    citations: exam2021Citations,
  }),
  practiceProblem({
    id: "exam-2021-question-6-unconventional-monetary-policy",
    slug: "exam-2021-question-6-unconventional-monetary-policy",
    title: "Exam 2021, Question 6: Unconventional Monetary Policy",
    moduleSlug: "lecture-6",
    sourceKind: "past_exam",
    collectionSlug: "exam-2021",
    sourceLabel: "Final exam 2021",
    sourceDetail: "Question 6 from Exam 2021.pdf.",
    questionLabel: "Question 6",
    summary:
      "A short compare-and-contrast question on pure quantitative easing versus credit easing.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-6"],
    prompt: [],
    sessionParts: [
      sourcePart({
        id: "main",
        label: "Question 6",
        imagePath: "/figures/practice/exam-2021/exam-2021-page-3.png",
        altText: "Original Exam 2021 page 3 showing Question 6 on unconventional monetary policy.",
        prompt:
          "Compare briefly pure quantitative easing and credit easing policies.",
      }),
    ],
    guide: guide(
      "Short compare-and-contrast policy answer",
      "This is a compact classification question. The safest structure is to define each policy by what part of the central bank balance sheet it targets and then say why the transmission differs.",
      [
        "Quantitative easing",
        "Credit easing",
        "Central-bank balance sheet",
      ],
      [
        "Define pure QE as targeting the size of the balance sheet or liabilities.",
        "Define credit easing as changing the composition of assets to affect specific spreads or long rates.",
      ],
      [
        "Saying both are just 'printing money.'",
        "Ignoring the distinction between balance-sheet size and asset composition.",
      ],
    ),
    supportingEquations: [],
    hints: [
      "Ask yourself what each policy is trying to move on the central bank balance sheet.",
    ],
    nextSteps: [
      "Write one sentence on QE and one on credit easing before you compare them.",
    ],
    solutionOutline: [
      "Pure QE focuses on expanding the central bank balance sheet in size, often through reserve creation and broad asset purchases.",
      "Credit easing focuses on changing the composition of assets to lower particular yields or spreads, especially in stressed segments.",
    ],
    answerPlaceholder:
      "Keep this answer short and contrast the target of each policy clearly.",
    citations: exam2021Citations,
  }),
  practiceProblem({
    id: "exam-2024-question-1-forward-guidance",
    slug: "exam-2024-question-1-forward-guidance",
    title: "Exam 2024, Question 1: Forward Guidance",
    moduleSlug: "lecture-6",
    sourceKind: "past_exam",
    collectionSlug: "exam-2024",
    sourceLabel: "Final exam 2024",
    sourceDetail: "Question 1 from Exam 2024.pdf.",
    questionLabel: "Question 1",
    summary:
      "A short exam question testing whether the student can connect Delphic versus Odyssean guidance to commitment versus discretion.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-5", "lecture-6"],
    prompt: [],
    sessionParts: [
      sourcePart({
        id: "a",
        label: "Part a",
        imagePath: "/figures/practice/exam-2024/exam-2024-page-1.png",
        altText: "Original Exam 2024 page 1 showing Question 1 on forward guidance.",
        prompt:
          "What is the distinction between Delphic and Odyssean forward guidance? Give a short example of each.",
      }),
      sourcePart({
        id: "b",
        label: "Part b",
        imagePath: "/figures/practice/exam-2024/exam-2024-page-1.png",
        altText: "Original Exam 2024 page 1 showing Question 1 part (b) on commitment and discretion.",
        prompt:
          "How is the distinction between commitment and discretion in monetary policy linked to the two different types of forward guidance mentioned above?",
      }),
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
    sourceDetail: "Question 2 from Exam 2024.pdf.",
    questionLabel: "Question 2",
    summary:
      "A heterogeneity question on why MPCs differ and why the covariance term amplifies aggregate shocks.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-8"],
    prompt: [],
    sessionParts: [
      sourcePart({
        id: "a",
        label: "Part a",
        imagePath: "/figures/practice/exam-2024/exam-2024-page-1.png",
        altText: "Original Exam 2024 page 1 showing Question 2 on MPC distribution.",
        beforePromptBlocks: [
          p("As shown in Patterson (2023, AER), the aggregate marginal propensity to consume (MPC) can be decomposed as follows:"),
          p("$$MPC = \\sum_i \\frac{dC_i}{dE_i}\\frac{dE_i}{dY} = \\sum_i \\frac{E_i}{Y}\\frac{dC_i}{dE_i} + \\operatorname{cov}\\!\\left(\\frac{dC_i}{dE_i}, \\frac{dE_i}{dY}\\frac{Y}{E_i}\\right).$$"),
          p("where $E_i$ denotes earnings of individual $i$, $C_i$ consumption of individual $i$, and $Y$ is aggregate output."),
        ],
        prompt: "Briefly discuss a few reason for why individuals may have different MPC.",
      }),
      sourcePart({
        id: "b",
        label: "Part b",
        imagePath: "/figures/practice/exam-2024/exam-2024-page-1.png",
        altText: "Original Exam 2024 page 1 showing Question 2 part (b) on the covariance term.",
        beforePromptBlocks: [
          p("As shown in Patterson (2023, AER), the aggregate marginal propensity to consume (MPC) can be decomposed as follows:"),
          p("$$MPC = \\sum_i \\frac{dC_i}{dE_i}\\frac{dE_i}{dY} = \\sum_i \\frac{E_i}{Y}\\frac{dC_i}{dE_i} + \\operatorname{cov}\\!\\left(\\frac{dC_i}{dE_i}, \\frac{dE_i}{dY}\\frac{Y}{E_i}\\right).$$"),
        ],
        prompt:
          "Explain what role the covariance term in the equation (1) has for the amplification of aggregate shocks and economic policy.",
      }),
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
    sourceDetail: "Question 3 from Exam 2024.pdf.",
    questionLabel: "Question 3",
    summary:
      "A benchmark divine-coincidence question asking what the shock is, what optimal policy does, and why $i_t = r_t^n$ is not a sufficient practical rule.",
    supportMode: "derivation",
    relatedModuleSlugs: ["lecture-2", "lecture-3", "lecture-4"],
    prompt: [],
    sessionParts: [
      sourcePart({
        id: "a",
        label: "Part a",
        imagePath: "/figures/practice/exam-2024/exam-2024-page-2.png",
        altText: "Original Exam 2024 page 2 showing Question 3 on optimal monetary policy.",
        beforePromptBlocks: exam2024Question3SetupBlocks,
        prompt: "What shock is present in this model economy?",
        stepGuideIndexes: [0],
        solutionOutlineIndexes: [0],
      }),
      sourcePart({
        id: "b",
        label: "Part b",
        imagePath: "/figures/practice/exam-2024/exam-2024-page-2.png",
        altText: "Original Exam 2024 page 2 showing Question 3 part (b) on optimal policy.",
        beforePromptBlocks: exam2024Question3SetupBlocks,
        prompt:
          "What is optimal monetary policy here? Discuss in words and show using the equations. HINT: you only need to use equation 2 and 3.",
        stepGuideIndexes: [1, 2],
        solutionOutlineIndexes: [1, 2, 3],
      }),
      sourcePart({
        id: "c",
        label: "Part c",
        imagePath: "/figures/practice/exam-2024/exam-2024-page-2.png",
        altText: "Original Exam 2024 page 2 showing Question 3 part (c) on the interest-rate rule.",
        beforePromptBlocks: exam2024Question3SetupBlocks,
        prompt:
          "Discuss if an interest rate rule of $i_t = r_t^n$ could be the optimal rule for the central bank in response to this shock. Explain if there are other more advantages rules and in that case why and how.",
        stepGuideIndexes: [3],
        solutionOutlineIndexes: [4],
      }),
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
      "The active disturbance is the discount-factor shock, because the calibration sets the technology innovation to zero and leaves the discount-factor innovation positive.",
      "Optimal monetary policy in this benchmark is to stabilize both inflation and the output gap at zero. The reason is that the Phillips curve contains no cost-push disturbance, so there is no inflation-output trade-off: the policymaker can target $$\\pi_t=0$$ and $$\\tilde y_t=0$$ at the same time.",
      "To show this with the equations, start from the NKPC $$\\pi_t = \\beta E_t\\pi_{t+1} + \\kappa \\tilde y_t.$$ If the central bank chooses $$\\pi_t=0$$ today and expects to keep inflation at zero tomorrow as well, then $$E_t\\pi_{t+1}=0.$$ The Phillips curve becomes $$0 = 0 + \\kappa \\tilde y_t,$$ so $$\\tilde y_t=0.$$ That proves the zero-inflation allocation is consistent with a zero output gap in this benchmark.",
      "Now use the Dynamic IS equation $$\\tilde y_t = E_t\\tilde y_{t+1} - \\frac{1}{\\sigma}(i_t - E_t\\pi_{t+1} - r_t^n).$$ Under the optimal allocation we also have $$\\tilde y_t=0$$ and $$E_t\\tilde y_{t+1}=0.$$ So $$0 = 0 - \\frac{1}{\\sigma}(i_t - E_t\\pi_{t+1} - r_t^n),$$ which implies $$i_t - E_t\\pi_{t+1} = r_t^n.$$ Since optimal policy also keeps inflation at zero, this reduces to $$i_t = r_t^n.$$ So the central bank implements the optimal allocation by making the real interest rate equal to the natural rate.",
      "The rule $$i_t=r_t^n$$ describes the benchmark equilibrium allocation, but it is not by itself a good practical rule. The natural rate is not directly observable, and a pure natural-rate rule written only in terms of $$r_t^n$$ does not automatically deliver a determinate equilibrium in the way an observable Taylor-style rule can. So the economic answer is that it characterizes the optimal allocation in this benchmark, but a more practical central bank rule would respond to observable inflation and activity variables in a way that still tracks the natural-rate benchmark and anchors expectations.",
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
    sourceDetail: "Question 4 from Exam 2024.pdf, including Figure 1.",
    questionLabel: "Question 4",
    summary:
      "A figure-based interpretation question on why a flatter reduced-form correlation can still coexist with an unchanged structural targeting rule.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-4", "lecture-7"],
    prompt: [],
    sessionParts: [
      sourcePart({
        id: "main",
        label: "Question",
        imagePath: "/figures/practice/exam-2024/exam-2024-page-3.png",
        altText: "Original 2024 exam page with Figure 1 and Question 4 on the slope of the Phillips curve.",
        prompt:
          "Assume now that there is a reduction in the average correlation in the data, as shown by the red line in figure 1a. There is no changes to the targeting rule in Figure 1b. Discuss clearly one of the potential explanations for why the two figures may still be consistent with each other. HINT: The Phillips Curve in Figure 1b is unchanged.",
      }),
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
        "Make the bridge explicit: the question is asking you to separate the observed red line from the structural policy trade-off, not to guess a new value of $\\kappa$ from the picture.",
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
    sourceDetail: "Question 5 from Exam 2024.pdf.",
    questionLabel: "Question 5",
    summary:
      "A long-form fiscal benchmark question with original budget-constraint pages preserved as source images.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-9"],
    prompt: [],
    sessionParts: [
      sourcePart({
        id: "a",
        label: "Part a",
        imagePath: "/figures/practice/exam-2024/exam-2024-page-4.png",
        altText: "Original Exam 2024 page 4 showing Question 5 on Ricardian equivalence.",
        beforePromptBlocks: [
          p("The value of output at time $t$ is discounted to time 0 with $e^{-R(t)}$."),
        ],
        prompt:
          "Explain how this allow the interest rate to vary over time.",
        solutionOutlineIndexes: [0],
      }),
      sourcePart({
        id: "b",
        label: "Part b",
        imagePath: "/figures/practice/exam-2024/exam-2024-page-4.png",
        altText: "Original Exam 2024 page 4 showing Question 5 part (b).",
        prompt:
          "Explain how the government budget constraint limits government purchases over time.",
        solutionOutlineIndexes: [0],
      }),
      sourcePart({
        id: "c",
        label: "Part c",
        imagePath: "/figures/practice/exam-2024/exam-2024-page-4.png",
        altText: "Original Exam 2024 page 4 showing Question 5 part (c).",
        prompt: "Explain the consumers' budget constraint.",
        solutionOutlineIndexes: [1],
      }),
      sourcePart({
        id: "d",
        label: "Part d",
        imagePath: "/figures/practice/exam-2024/exam-2024-page-4.png",
        altText: "Original Exam 2024 page 4 showing Question 5 part (d).",
        prompt:
          "Use the government budget constraint and illustrate that only the quantity of government purchases, not whether they are financed with taxes or bonds, affects private consumption.",
        nextStepIndexes: [0],
        solutionOutlineIndexes: [2],
      }),
      sourcePart({
        id: "e",
        label: "Part e",
        imagePath: "/figures/practice/exam-2024/exam-2024-page-4.png",
        altText: "Original Exam 2024 page 4 showing Question 5 part (e).",
        prompt: "Discuss reasons why Ricardian equivalence may not hold.",
        solutionOutlineIndexes: [3],
      }),
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
        "Use subpart (d) as a cancellation argument: show exactly why lower current taxes plus higher public debt are offset by higher future taxes of equal present value in the benchmark.",
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
    sourceDetail: "Question 6 from Exam 2024.pdf.",
    questionLabel: "Question 6",
    summary:
      "A derivation question on why convex tax distortions imply a constant tax share over time in the benchmark.",
    supportMode: "derivation",
    relatedModuleSlugs: ["lecture-9"],
    prompt: [],
    sessionParts: [
      sourcePart({
        id: "a",
        label: "Part a",
        imagePath: "/figures/practice/exam-2024/exam-2024-page-5.png",
        altText: "Original Exam 2024 page 5 showing Question 6 on tax smoothing.",
        prompt:
          "What can be reasons that costs of taxing increase with taxes' share of income?",
        stepGuideIndexes: [0],
        solutionOutlineIndexes: [0],
      }),
      sourcePart({
        id: "b",
        label: "Part b",
        imagePath: "/figures/practice/exam-2024/exam-2024-page-5.png",
        altText: "Original Exam 2024 page 5 showing Question 6 part (b) on the minimization problem.",
        prompt:
          "Show that the minimization problem requires that taxes should be a constant fraction of income. Explain.",
        stepGuideIndexes: [1, 2, 3],
        solutionOutlineIndexes: [1, 2, 3],
      }),
    ],
    guide: guide(
      "By-hand optimal-tax derivation",
      "The real task is not to memorize the result but to show why convex distortions imply equalized marginal tax costs across time. The safest way to do that is to move from intuition, to the marginal comparison, to the constant-share conclusion without skipping the intermediate condition.",
      [
        "Convex distortions",
        "Intertemporal budget constraint",
        "Marginal benefit versus marginal cost",
        "Constant tax share",
      ],
      [
        "Interpret part (a) briefly, because it only motivates why smoothing matters.",
        "For part (b), imagine shifting a tiny amount of taxation from one date to the next while keeping the intertemporal budget constraint satisfied.",
        "Write the marginal condition explicitly before you say anything about a constant tax share.",
        "Only after the marginal distortions are equalized should you use monotonicity of $f'$ to conclude that the tax share itself is constant.",
      ],
      [
        "Stating the constant-tax-share result without showing the marginal condition.",
        "Forgetting that the result is about the tax share of income, not necessarily the level of taxes.",
        "Jumping from convexity directly to the final answer without writing the equal-marginal-distortion condition.",
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
        "f'\\!\\left(\\frac{T_t}{Y_t}\\right) = f'\\!\\left(\\frac{T_{t+1}}{Y_{t+1}}\\right)",
      ),
      step(
        "Write the marginal condition",
        "Set the marginal benefit from reducing the tax share today equal to the marginal cost of increasing the tax share tomorrow.",
        "In the optimum, there is no gain from shifting distortions across dates if the intertemporal constraint is respected.",
        "First-order optimality across time.",
        "This is the algebraic core of the derivation.",
        "f'\\!\\left(\\frac{T_t}{Y_t}\\right)=\\lambda \\quad \\forall t",
      ),
      step(
        "Read off the implication",
        "Use the convexity and monotonicity of $f'$ to conclude that the tax share must be constant across time in the benchmark.",
        "If marginal distortions are equalized and $f'$ is one-to-one, the tax share must be equalized too.",
        "Invertibility of the marginal distortion schedule.",
        "This gives the result the exam is asking you to explain.",
        "\\frac{T_t}{Y_t}=\\tau \\quad \\forall t",
      ),
    ],
    hints: [
      "Do not start from the final result. Start from the marginal trade-off between moving taxes across dates.",
    ],
    nextSteps: [
      "Write one line for the marginal benefit of reducing the tax share today and one line for the marginal cost of increasing it tomorrow.",
    ],
    solutionOutline: [
      "Tax costs rise with the tax share because higher tax rates usually generate more than proportional increases in distortion, avoidance, evasion, and other efficiency losses.",
      "The minimization problem can be written with the Lagrangian $$\\mathcal{L} = \\sum_{t=0}^{\\infty}\\frac{1}{(1+r)^t}Y_t f\\!\\left(\\frac{T_t}{Y_t}\\right) + \\lambda\\left[\\sum_{t=0}^{\\infty}\\frac{1}{(1+r)^t}G_t + D_0 - \\sum_{t=0}^{\\infty}\\frac{1}{(1+r)^t}T_t\\right].$$ The planner chooses the whole tax path to minimize discounted distortion costs subject to the present-value government budget constraint.",
      "Differentiate with respect to $T_t$. Because $$Y_t f\\!\\left(\\frac{T_t}{Y_t}\\right)$$ depends on $T_t$ only through the tax share, we get $$\\frac{\\partial}{\\partial T_t}\\left[Y_t f\\!\\left(\\frac{T_t}{Y_t}\\right)\\right] = f'\\!\\left(\\frac{T_t}{Y_t}\\right).$$ The first-order condition is therefore $$\\frac{1}{(1+r)^t}f'\\!\\left(\\frac{T_t}{Y_t}\\right) - \\lambda\\frac{1}{(1+r)^t} = 0,$$ or equivalently $$f'\\!\\left(\\frac{T_t}{Y_t}\\right)=\\lambda \\quad \\forall t.$$",
      "Since $$f''(\\cdot)>0,$$ the function $$f'(\\cdot)$$ is strictly increasing. So if the marginal distortion is the same in every period, its argument must also be the same in every period. Hence $$\\frac{T_t}{Y_t}=\\tau \\quad \\forall t.$$ This is the tax-smoothing result: under convex distortion costs, the government minimizes welfare losses by keeping the tax share constant over time rather than bunching taxes into a few periods.",
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
    sourceDetail: "Question 1 from GRA6631_2025-04-28_kl_09_EP.pdf.",
    questionLabel: "Question 1",
    summary:
      "A conceptual bridge from Clarida-Gali-Gertler to the Taylor principle and Blanchard-Kahn determinacy.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-1", "lecture-3"],
    prompt: [],
    sessionParts: [
      sourcePart({
        id: "main",
        label: "Question",
        imagePath: "/figures/practice/exam-2025/exam-2025-page-1.png",
        altText: "Original Exam 2025 page 1 showing Question 1 on estimation of Taylor rules.",
        prompt:
          "Clarida, Gali, and Gertler (2000, Quarterly Journal of Economics) have estimated Taylor rules over a pre-Volcker sample (1960-1979) and a post-Volcker sample (1979-1996). Discuss their main result and relate it to the Taylor principle and the Blanchard-Kahn condition in the context of the New Keynesian model discussed in class.",
      }),
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
        "Then translate that nominal-rate statement into the real-rate logic of the Taylor principle before you mention Blanchard-Kahn determinacy.",
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
      "Write one bridge sentence on the real rate: if the nominal rate does not rise more than inflation, policy may fail to tighten the real rate enough to anchor expectations.",
    ],
    solutionOutline: [
      "Clarida, Gali, and Gertler's main result is that U.S. monetary policy responded too weakly to inflation in the pre-Volcker period and much more aggressively in the post-Volcker period. In the earlier sample the estimated inflation coefficient is low enough that the nominal interest rate does not rise sufficiently when inflation increases, whereas in the later sample the policy response is much stronger.",
      "This matters because the Taylor principle requires the nominal rate to rise by more than one-for-one with inflation. Only then does the real interest rate increase when inflation goes up. If the real rate fails to rise, monetary policy does not restrain demand enough to stabilize inflationary pressure. A weak inflation response therefore means that policy is not anchoring the economy in the way the New Keynesian benchmark requires.",
      "In the New Keynesian model, that difference maps directly into the Blanchard-Kahn determinacy condition. A policy rule that violates the Taylor principle can produce indeterminacy, meaning that expectations are not pinned down by fundamentals and multiple equilibrium paths may exist. A rule that satisfies the Taylor principle instead supports a unique, determinate equilibrium. The empirical contrast between the pre- and post-Volcker samples is therefore interpreted as a shift from a regime prone to indeterminacy toward one that anchors expectations more successfully.",
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
      "Question 2 from GRA6631_2025-04-28_kl_09_EP.pdf, including the original impulse-response figure.",
    questionLabel: "Question 2",
    summary:
      "A major derivation-and-interpretation question on targeting rules under discretion and commitment after a cost-push shock.",
    supportMode: "derivation",
    relatedModuleSlugs: ["lecture-4", "lecture-6"],
    prompt: [],
    sessionParts: [
      sourcePart({
        id: "a",
        label: "Part a",
        imagePath: "/figures/practice/exam-2025/exam-2025-page-1.png",
        altText: "Original Exam 2025 page 1 showing Question 2 part (a) on discretion.",
        beforePromptBlocks: exam2025Question2SetupBlocks,
        prompt:
          "Derive the targeting rule which shows the optimal relationship between $\\pi_t$ and $x_t$ under discretion. Describe how you solve it.",
        stepGuideIndexes: [0, 1, 2],
        solutionOutlineIndexes: [0, 1, 2],
      }),
      sourcePart({
        id: "b",
        label: "Part b",
        imagePath: "/figures/practice/exam-2025/exam-2025-page-1.png",
        altText: "Original Exam 2025 page 1 showing Question 2 part (b) on commitment.",
        beforePromptBlocks: exam2025Question2SetupBlocks,
        prompt:
          "Derive the targeting rule which shows the optimal relationship between $\\pi_{t+i}$ and $x_{t+i}$ under state-contingent commitment. Describe how you solve it.",
        stepGuideIndexes: [3, 4, 5, 6],
        solutionOutlineIndexes: [3, 4, 5, 6],
      }),
      sourcePart({
        id: "c",
        label: "Part c",
        imagePath: "/figures/practice/exam-2025/exam-2025-page-2.png",
        altText: "Original Exam 2025 page 2 showing the impulse-response figure for Question 2 part (c).",
        prompt:
          "The following figure shows the resulting impulse responses following a cost-push shock. Describe and explain the impulse responses under both regimes. Use the formulas to explain your reasoning.",
        stepGuideIndexes: [7],
        solutionOutlineIndexes: [7],
      }),
      sourcePart({
        id: "d",
        label: "Part d",
        imagePath: "/figures/practice/exam-2025/exam-2025-page-2.png",
        altText: "Original Exam 2025 page 2 showing Question 2 part (d) on lower price stickiness.",
        prompt:
          "Assume that this economy implements electronic pricing which makes it easier for firms to change prices. One way to formalize this is that $\\theta$, the probability of not changing prices, is smaller. Use the model framework to explain how this changes the targeting rule in (a) and (b).",
        stepGuideIndexes: [8, 9],
        solutionOutlineIndexes: [8, 9],
      }),
    ],
    guide: guide(
      "Full derivation and regime comparison",
      "This is a flagship by-hand problem. You must derive two different targeting rules, interpret a figure, and then explain what happens when the Phillips curve becomes steeper. The safest route is to solve discretion cleanly first, because the commitment logic only makes sense once the static benchmark trade-off is already on paper.",
      [
        "Loss function and NKPC",
        "Discretionary targeting rule",
        "Commitment and history dependence",
        "Impulse-response interpretation",
        "Price stickiness and $\\kappa$",
      ],
      [
        "Solve discretion first as a period-by-period problem where expected future inflation is taken as inherited in the current period.",
        "Write the discretion first-order condition all the way to the targeting rule before you touch commitment.",
        "Then solve commitment as an intertemporal problem where today's choice also shapes future expectations and inherited promises.",
        "Use the two targeting rules to interpret the figure before you discuss lower $\\theta$.",
        "Only after the regime comparison is clear should you map lower $\\theta$ into a higher $\\kappa$ and explain how that changes the inflation-gap trade-off.",
      ],
      [
        "Mixing the discretion and commitment Lagrangians.",
        "Jumping to the commitment answer before the discretion benchmark is clear.",
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
        "Write the discretion problem as a one-period Lagrangian",
        "Treat $E_t\\pi_{t+1}$ as given and write $$\\mathcal{L}_t = \\tfrac12(\\pi_t^2 + \\alpha_x x_t^2) + \\lambda_t\\big(\\pi_t - \\beta E_t\\pi_{t+1} - \\kappa x_t - u_t^{\\pi}\\big).$$",
        "Under discretion the central bank re-optimizes period by period, so future inflation expectations are inherited when the current choice is made.",
        "Period-by-period optimization.",
        "This sets up the algebra needed for the discretion targeting rule.",
      ),
      step(
        "Differentiate the discretion Lagrangian with respect to $x_t$",
        "Take the derivative of $$\\mathcal{L}_t$$ with respect to the output gap. This gives $$\\alpha_x x_t - \\lambda_t \\kappa = 0,$$ so $$\\lambda_t = \\frac{\\alpha_x}{\\kappa}x_t.$$",
        "The multiplier measures how costly it is to tighten the NKPC constraint by one unit.",
        "First-order condition for the output gap.",
        "This expresses the multiplier in terms of the output gap.",
        "\\alpha_x x_t - \\lambda_t \\kappa = 0",
      ),
      step(
        "Differentiate with respect to inflation and eliminate the multiplier",
        "The derivative with respect to inflation gives $$\\pi_t + \\lambda_t = 0,$$ so $$\\lambda_t = -\\pi_t.$$ Combining this with $$\\lambda_t = \\frac{\\alpha_x}{\\kappa}x_t$$ yields $$\\pi_t = -\\frac{\\alpha_x}{\\kappa}x_t,$$ or equivalently $$x_t = -\\frac{\\kappa}{\\alpha_x}\\pi_t.$$",
        "This is the discretion trade-off: each period the central bank chooses current inflation and the current output gap, but it does not manipulate inherited expectations through promises about future gaps.",
        "Eliminate the multiplier to obtain the targeting rule.",
        "This is the final answer for part (a).",
        "x_t = -\\frac{\\kappa}{\\alpha_x}\\pi_t",
      ),
      step(
        "Write the intertemporal Lagrangian under commitment",
        "Under state-contingent commitment the central bank chooses the entire future path, so write $$\\mathcal{L} = E_t\\sum_{i=0}^{\\infty} \\beta^i\\Big[\\tfrac12(\\pi_{t+i}^2 + \\alpha_x x_{t+i}^2) + \\mu_{t+i}(\\pi_{t+i} - \\beta\\pi_{t+i+1} - \\kappa x_{t+i} - u_{t+i}^{\\pi})\\Big].$$",
        "Unlike discretion, commitment internalizes that today's promised future choices affect current expectations and therefore today's inflation-output trade-off.",
        "Intertemporal optimization under commitment.",
        "This is the correct starting point for the history-dependent targeting rule.",
      ),
      step(
        "Take the FOC with respect to $x_{t+i}$",
        "For every date $t+i$, differentiation with respect to $x_{t+i}$ gives $$\\alpha_x x_{t+i} - \\kappa \\mu_{t+i} = 0,$$ so $$\\mu_{t+i} = \\frac{\\alpha_x}{\\kappa}x_{t+i}.$$",
        "This is the same marginal-loss versus multiplier trade-off as before, but now the multiplier is dated because the whole path is chosen jointly.",
        "First-order condition for the committed path of output gaps.",
        "This again expresses the multiplier in terms of the output gap path.",
        "\\alpha_x x_{t+i} - \\kappa \\mu_{t+i}=0",
      ),
      step(
        "Take the FOC with respect to $\\pi_{t+i}$",
        "Inflation appears in the current NKPC constraint and in the one-period-ahead term of the previous constraint. The FOC is therefore $$\\pi_{t+i} + \\mu_{t+i} - \\mu_{t+i-1} = 0$$ for $i\\ge 0$, with the usual convention that the inherited multiplier is zero at the initial date if there is no earlier promise.",
        "This extra lagged multiplier is exactly what discretion does not have. It is the algebraic source of history dependence.",
        "Inflation first-order condition under commitment.",
        "This is the key bridge from the Lagrangian to the commitment targeting rule.",
        "\\pi_{t+i} + \\mu_{t+i} - \\mu_{t+i-1} = 0",
      ),
      step(
        "Substitute the multipliers into the commitment targeting rule",
        "Replace $$\\mu_{t+i}$$ and $$\\mu_{t+i-1}$$ by $$\\frac{\\alpha_x}{\\kappa}x_{t+i}$$ and $$\\frac{\\alpha_x}{\\kappa}x_{t+i-1}$$. This gives $$\\pi_{t+i} + \\frac{\\alpha_x}{\\kappa}(x_{t+i}-x_{t+i-1}) = 0.$$",
        "The commitment rule depends on the change in the output gap relative to the previously promised path, not just on the current output gap in isolation.",
        "Eliminate the multipliers to obtain the commitment rule.",
        "This is the full derivation for part (b).",
        "\\pi_{t+i} + \\frac{\\alpha_x}{\\kappa}(x_{t+i}-x_{t+i-1}) = 0",
      ),
      step(
        "Use the two targeting rules to read the impulse responses",
        "A positive cost-push shock pushes inflation up on impact. Under discretion the central bank only has the static rule $$x_t = -(\\kappa/\\alpha_x)\\pi_t,$$ so it lowers the output gap enough to lean against inflation today and then re-optimizes next period. Under commitment the rule $$\\pi_t + (\\alpha_x/\\kappa)(x_t-x_{t-1})=0$$ makes today's inflation depend on how policy moves the gap relative to yesterday, so the response becomes history dependent. That is why commitment can spread the adjustment over time, promise a future path, and typically achieve a better inflation-output trade-off than pure discretion.",
        "The figure is therefore a consequence of the formulas: discretion produces a purely static current trade-off, whereas commitment uses the expected future path of the gap to influence inflation today.",
        "Formula-based interpretation of the IRFs.",
        "This is the full answer for part (c).",
      ),
      step(
        "Map lower $\\theta$ into a higher $\\kappa$",
        "Use $$\\kappa = \\frac{(1-\\beta\\theta)(1-\\theta)}{\\theta}(\\sigma+\\phi).$$ A lower probability of not changing prices means a lower $$\\theta$$, which raises $$\\kappa$$ and makes the Phillips curve steeper.",
        "With more flexible prices, a given output-gap movement has a larger effect on inflation.",
        "Structural parameter mapping from price flexibility to the Phillips-curve slope.",
        "This is the comparative-static starting point for part (d).",
        "\\theta \\downarrow \\Rightarrow \\kappa \\uparrow",
      ),
      step(
        "Rewrite the discretion and commitment rules after the change in $\\kappa$",
        "Under discretion the rule is still $$x_t = -(\\kappa/\\alpha_x)\\pi_t,$$ while under commitment it is still $$\\pi_{t+i} + (\\alpha_x/\\kappa)(x_{t+i}-x_{t+i-1}) = 0.$$ A higher $$\\kappa$$ means inflation reacts more to the gap, so the sacrifice ratio improves: for a given change in the output gap, the central bank gets more inflation stabilization. Equivalently, for a given inflation objective the needed change in slack is smaller. The same logic applies under commitment, where a given promised change in the gap now moves inflation more strongly because $$\\alpha_x/\\kappa$$ is smaller.",
        "So the form of the targeting rules is unchanged, but the trade-off embedded in both rules becomes more favorable when prices are more flexible.",
        "Comparative statics of the targeting rules.",
        "This closes part (d).",
      ),
    ],
    hints: [
      "Do not start with the figure. Derive the rules first and let the figure become a consequence of those rules.",
    ],
    nextSteps: [
      "For part (a), treat future inflation expectations as fixed and combine the two first-order conditions to get the discretion targeting rule.",
    ],
    solutionOutline: [
      "Under discretion the central bank solves the problem period by period and takes $$E_t\\pi_{t+1}$$ as given. The one-period Lagrangian is $$\\mathcal{L}_t = \\tfrac12(\\pi_t^2 + \\alpha_x x_t^2) + \\lambda_t(\\pi_t - \\beta E_t\\pi_{t+1} - \\kappa x_t - u_t^{\\pi}).$$",
      "The first-order conditions are $$\\alpha_x x_t - \\lambda_t\\kappa = 0$$ and $$\\pi_t + \\lambda_t = 0.$$ From the second condition, $$\\lambda_t=-\\pi_t.$$ Substitute this into the first condition to get $$\\alpha_x x_t + \\kappa \\pi_t = 0,$$ so the discretion targeting rule is $$x_t = -\\frac{\\kappa}{\\alpha_x}\\pi_t.$$",
      "This is the required relationship under discretion: the central bank accepts a current negative output gap in order to reduce current inflation, but it does not create history dependence because it re-optimizes each period.",
      "Under state-contingent commitment the central bank chooses the whole future path, so the correct object is the intertemporal Lagrangian $$\\mathcal{L} = E_t\\sum_{i=0}^{\\infty}\\beta^i\\Big[\\tfrac12(\\pi_{t+i}^2 + \\alpha_x x_{t+i}^2) + \\mu_{t+i}(\\pi_{t+i} - \\beta\\pi_{t+i+1} - \\kappa x_{t+i} - u_{t+i}^{\\pi})\\Big].$$",
      "The FOC with respect to $$x_{t+i}$$ gives $$\\alpha_x x_{t+i} - \\kappa \\mu_{t+i}=0,$$ so $$\\mu_{t+i}=\\frac{\\alpha_x}{\\kappa}x_{t+i}.$$ The FOC with respect to inflation gives $$\\pi_{t+i} + \\mu_{t+i} - \\mu_{t+i-1}=0.$$ The lagged multiplier appears because current inflation also affects the previously promised path.",
      "Substituting the multiplier expression into the inflation FOC yields $$\\pi_{t+i} + \\frac{\\alpha_x}{\\kappa}(x_{t+i}-x_{t+i-1}) = 0.$$ This is the commitment targeting rule. Unlike discretion, it links today's inflation to the change in the output gap relative to yesterday's promised position, which is why commitment is history dependent.",
      "The impulse responses after a positive cost-push shock follow directly from these formulas. Under discretion the bank obeys the static rule $$x_t = -(\\kappa/\\alpha_x)\\pi_t,$$ so it creates a negative output gap on impact to offset the inflation surge and then re-optimizes in the next period. Under commitment the rule $$\\pi_t + (\\alpha_x/\\kappa)(x_t-x_{t-1})=0$$ lets the bank use the promised future path of the output gap to influence current inflation. That is why the commitment response is more history dependent and typically delivers a better inflation-output trade-off in the figure.",
      "If electronic pricing lowers $$\\theta$$, then $$\\kappa = \\frac{(1-\\beta\\theta)(1-\\theta)}{\\theta}(\\sigma+\\phi)$$ rises. Under discretion the rule remains $$x_t = -(\\kappa/\\alpha_x)\\pi_t,$$ but the steeper Phillips curve means a given amount of slack moves inflation more strongly. Under commitment the rule remains $$\\pi_{t+i} + (\\alpha_x/\\kappa)(x_{t+i}-x_{t+i-1}) = 0,$$ and the smaller coefficient $$\\alpha_x/\\kappa$$ means a given promised change in the gap has a larger effect on inflation. So the form of the rules is unchanged, but the trade-off becomes more favorable when prices are more flexible.",
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
    sourceDetail: "Question 3 from GRA6631_2025-04-28_kl_09_EP.pdf.",
    questionLabel: "Question 3",
    summary:
      "A heterogeneity question on why the same productivity shock creates different aggregate-consumption dynamics across economies with different MPC distributions.",
    supportMode: "conceptual",
    relatedModuleSlugs: ["lecture-2", "lecture-8"],
    prompt: [],
    sessionParts: [
      sourcePart({
        id: "a",
        label: "Part a",
        imagePath: "/figures/practice/exam-2025/exam-2025-page-2.png",
        altText: "Original Exam 2025 page 2 showing Question 3 setup and part (a) on heterogeneity.",
        beforePromptBlocks: exam2025Question3SetupBlocks,
        prompt:
          "Describe the difference in the dynamics (first period and future periods) of aggregate consumption between country X and Y. Highlight the mechanisms.",
      }),
      sourcePart({
        id: "b",
        label: "Part b",
        imagePath: "/figures/practice/exam-2025/exam-2025-page-3.png",
        altText: "Original Exam 2025 page 3 showing Question 3 part (b) on the policy response.",
        beforePromptBlocks: exam2025Question3SetupBlocks,
        prompt:
          "Discuss the optimal monetary policy response to this shock. Does it vary across the two economies? Provide a clear economic reasoning, possibly but not necessary using equations and references to different parts of the course. Your discussion can be in bullet form and should not exceed 1 page.",
      }),
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
      "The economy with more hand-to-mouth households has a larger immediate consumption response because a bigger share of the income gain is spent rather than smoothed through asset adjustment.",
      "That stronger transmission changes aggregate demand dynamics: the same productivity or income shock now moves consumption more on impact because more households have high MPCs.",
      "So heterogeneity matters for macro transmission, not just for fairness. A central bank facing an economy with more high-MPC households should expect the same income disturbance to produce a stronger aggregate-demand response than in a representative-agent benchmark.",
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
    sourceDetail: "Question 4 from GRA6631_2025-04-28_kl_09_EP.pdf.",
    questionLabel: "Question 4",
    summary:
      "A derivation question on constant returns, output growth, per-worker growth, and the $\\beta = 0$ benchmark.",
    supportMode: "derivation",
    relatedModuleSlugs: ["lecture-12"],
    prompt: [],
    sessionParts: [
      sourcePart({
        id: "a",
        label: "Part a",
        imagePath: "/figures/practice/exam-2025/exam-2025-page-3.png",
        altText: "Original Exam 2025 page 3 showing Question 4 part (a) on constant returns to scale.",
        beforePromptBlocks: exam2025Question4SetupBlocks,
        prompt: "Show that there is constant returns to scale in production.",
        stepGuideIndexes: [0],
        solutionOutlineIndexes: [0],
      }),
      sourcePart({
        id: "b",
        label: "Part b",
        imagePath: "/figures/practice/exam-2025/exam-2025-page-3.png",
        altText: "Original Exam 2025 page 3 showing Question 4 part (b) on growth rates.",
        beforePromptBlocks: exam2025Question4SetupBlocks,
        prompt:
          "Calculate the growth rate in production and the growth rate in production per worker. You can assume that the economy is in steady state so that the growth rate in production is equal to the growth rate in the stock of capital.",
        stepGuideIndexes: [1, 2, 3],
        solutionOutlineIndexes: [1, 2, 3],
      }),
      sourcePart({
        id: "c",
        label: "Part c",
        imagePath: "/figures/practice/exam-2025/exam-2025-page-4.png",
        altText: "Original Exam 2025 page 4 showing Question 4 part (c) on the beta equals zero benchmark.",
        beforePromptBlocks: exam2025Question4SetupBlocks,
        prompt:
          "Now assume that $\\beta = 0$. What is the effect of this assumption for the growth rate in production and the growth rate in production per worker?",
        stepGuideIndexes: [4],
        solutionOutlineIndexes: [4],
      }),
    ],
    guide: guide(
      "Growth-accounting derivation",
      "This is a calculation question with a benchmark comparison built in. The cleanest route is to handle scale, then growth accounting, then the $\\beta = 0$ benchmark. Students usually get lost when they skip the explicit bridge from the level equation to the growth-rate equation, so do not skip the log-differentiation line.",
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
        "F(\\lambda K,\\lambda R,\\lambda AL)=\\lambda Y",
      ),
      step(
        "Differentiate in growth rates",
        "Take the time derivative of the production function and divide by $Y$ so the result becomes a weighted sum of growth rates.",
        "This is the standard growth-accounting shortcut for a Cobb-Douglas function.",
        "Log differentiation.",
        "This is the core step for part (b).",
        "\\frac{\\dot Y}{Y}=\\alpha\\frac{\\dot K}{K}+\\beta\\frac{\\dot R}{R}+(1-\\alpha-\\beta)\\left(\\frac{\\dot A}{A}+\\frac{\\dot L}{L}\\right)",
      ),
      step(
        "Use the steady-state shortcut",
        "Impose the steady-state condition that capital and output grow at the same rate before solving for $g_Y$.",
        "The exam explicitly allows this simplification.",
        "Steady-state growth condition.",
        "This gives you the closed-form output-growth expression.",
        "(1-\\alpha)g_Y = \\beta g_R + (1-\\alpha-\\beta)(g+n)",
      ),
      step(
        "Move to per-worker growth and the $\\beta = 0$ benchmark",
        "Subtract labor-force growth to get per-worker growth and then substitute $$g_R=-b$$. This gives $$g_{Y/L}=g_Y-n = g + \\frac{\\beta}{1-\\alpha}g_R = g - \\frac{\\beta}{1-\\alpha}b.$$",
        "Output per worker is output growth minus labor growth, and the resource term survives exactly because resource depletion subtracts from growth.",
        "Per-worker conversion.",
        "This completes the derivation for part (b).",
        "g_{Y/L} = g - \\frac{\\beta}{1-\\alpha}b",
      ),
      step(
        "Apply the benchmark $\\beta = 0$",
        "Set the resource exponent equal to zero in the general formulas. Then the resource-drag term disappears, so output growth becomes $$g_Y=g+n$$ and per-worker growth becomes $$g_{Y/L}=g.$$",
        "The right way to answer part (c) is to use the general result first and then switch off the resource channel.",
        "Benchmark comparison.",
        "This shows exactly what the resource term was doing in the general model.",
        "\\beta=0 \\Rightarrow g_Y = g+n, \\quad g_{Y/L}=g",
      ),
    ],
    hints: [
      "Work from the general expression first. The $\\beta = 0$ case is a benchmark comparison, not the main derivation.",
    ],
    nextSteps: [
      "Start by checking whether the exponents in the production function sum to one when all inputs are scaled together.",
    ],
    solutionOutline: [
      "There is constant returns to scale because scaling every input by the same factor $\\lambda$ gives $$F(\\lambda K,\\lambda R,\\lambda AL)=\\lambda^{\\alpha+\\beta+1-\\alpha-\\beta}F(K,R,AL)=\\lambda Y.$$ The exponents sum to one, so the production function is homogeneous of degree one.",
      "For part (b), log-differentiate the production function $$Y = K^{\\alpha}R^{\\beta}(AL)^{1-\\alpha-\\beta}$$ to get $$\\frac{\\dot Y}{Y}=\\alpha\\frac{\\dot K}{K}+\\beta\\frac{\\dot R}{R}+(1-\\alpha-\\beta)\\left(\\frac{\\dot A}{A}+\\frac{\\dot L}{L}\\right).$$ Writing growth rates as $$g_Y, g_K, g_R, g, n$$ gives $$g_Y = \\alpha g_K + \\beta g_R + (1-\\alpha-\\beta)(g+n).$$",
      "The exam then lets us impose the steady-state shortcut $$g_K=g_Y.$$ Substitute that into the previous line: $$g_Y = \\alpha g_Y + \\beta g_R + (1-\\alpha-\\beta)(g+n).$$ Rearranging gives $$ (1-\\alpha)g_Y = \\beta g_R + (1-\\alpha-\\beta)(g+n),$$ so $$ g_Y = \\frac{\\beta g_R + (1-\\alpha-\\beta)(g+n)}{1-\\alpha}. $$ This is the growth rate of aggregate output.",
      "Per-worker growth is $$g_{Y/L}=g_Y-n.$$ Using the expression above and the law of motion $$g_R=-b$$ gives $$g_{Y/L}=g + \\frac{\\beta}{1-\\alpha}g_R = g - \\frac{\\beta}{1-\\alpha}b.$$ So the resource term lowers growth because resource depletion subtracts from the growth contribution of inputs.",
      "If $$\\beta = 0,$$ the resource-input channel is shut down. The formulas simplify to $$g_Y=g+n$$ and $$g_{Y/L}=g.$$ So the effect of setting $$\\beta=0$$ is exactly to remove the resource drag and return the model to the textbook benchmark in which per-worker growth is driven only by productivity growth.",
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
    sourceDetail: "Question 5 from GRA6631_2025-04-28_kl_09_EP.pdf.",
    questionLabel: "Question 5",
    summary:
      "A longer tax-smoothing derivation that adds uncertainty to the benchmark constant-tax-share result.",
    supportMode: "derivation",
    relatedModuleSlugs: ["lecture-9"],
    prompt: [],
    sessionParts: [
      sourcePart({
        id: "a",
        label: "Part a",
        imagePath: "/figures/practice/exam-2025/exam-2025-page-4.png",
        altText: "Original Exam 2025 page 4 showing Question 5 on tax smoothing.",
        beforePromptBlocks: exam2025Question5SetupBlocks,
        prompt:
          "What can be reasons that costs of taxing increases with taxes' share of income?",
        stepGuideIndexes: [0],
        solutionOutlineIndexes: [0],
      }),
      sourcePart({
        id: "b",
        label: "Part b",
        imagePath: "/figures/practice/exam-2025/exam-2025-page-4.png",
        altText: "Original Exam 2025 page 4 showing Question 5 part (b) on the constant tax share.",
        beforePromptBlocks: exam2025Question5SetupBlocks,
        prompt:
          "Show that the minimization problem requires that taxes should be a constant fraction of income. Explain.",
        stepGuideIndexes: [1, 2],
        solutionOutlineIndexes: [1, 2],
      }),
      sourcePart({
        id: "c",
        label: "Part c",
        imagePath: "/figures/practice/exam-2025/exam-2025-page-4.png",
        altText: "Original Exam 2025 page 4 showing Question 5 part (c) on uncertainty.",
        beforePromptBlocks: exam2025Question5SetupBlocks,
        prompt:
          "Discuss whether the conclusion would change if there is uncertainty about the path of government incomes.",
        stepGuideIndexes: [3],
        solutionOutlineIndexes: [3, 4],
      }),
    ],
    guide: guide(
      "Optimal-tax derivation with uncertainty extension",
      "This is the same tax-smoothing logic as in Lecture 9 and the 2024 exam, but the final step adds an uncertainty discussion. Keep the benchmark derivation clean before extending it, because the uncertainty result only makes sense once the certainty marginal condition is already clear.",
      [
        "Convex tax distortions",
        "Intertemporal budget constraint",
        "Equalized marginal tax distortion",
        "Random walk tax share under uncertainty",
      ],
      [
        "Answer part (a) quickly, then derive the constant-share benchmark in part (b) without mentioning uncertainty yet.",
        "Write the certainty marginal condition explicitly and translate it into a constant tax share first.",
        "For part (c), ask what changes when tomorrow's marginal distortion is uncertain and therefore enters the condition through an expectation.",
      ],
      [
        "Blurring the certainty benchmark and the uncertainty extension together.",
        "Talking about uncertainty qualitatively without referring back to the marginal-condition logic.",
        "Jumping straight to 'random walk' language without first writing the expected marginal-distortion condition.",
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
        "The planner's problem can be written with the Lagrangian $$\\mathcal{L} = \\sum_{t=0}^{\\infty}\\frac{1}{(1+r)^t}Y_t f\\!\\left(\\frac{T_t}{Y_t}\\right) + \\lambda\\left[D_0 + \\sum_{t=0}^{\\infty}\\frac{1}{(1+r)^t}G_t - \\sum_{t=0}^{\\infty}\\frac{1}{(1+r)^t}T_t\\right].$$ Differentiating with respect to $T_t$ gives the certainty first-order condition.",
        "The planner is indifferent only when marginal distortion is equalized across dates subject to the intertemporal budget constraint.",
        "Lagrangian first-order condition under certainty.",
        "This yields the key marginal condition for part (b).",
        "f'\\!\\left(\\frac{T_t}{Y_t}\\right)=\\lambda \\quad \\forall t",
      ),
      step(
        "Translate the condition into a constant share",
        "Because $$f''(\\cdot)>0,$$ the derivative $$f'(\\cdot)$$ is strictly increasing. So if $$f'\\!\\left(\\frac{T_t}{Y_t}\\right)$$ is the same in every period, then $$\\frac{T_t}{Y_t}$$ itself must also be the same in every period.",
        "If $f'$ is one-to-one, equal marginal distortion implies equal arguments.",
        "Invertibility of $f'$ under convexity.",
        "This is the exact step the exam wants explained.",
        "\\frac{T_t}{Y_t}=\\tau \\quad \\forall t",
      ),
      step(
        "Add uncertainty",
        "Under uncertainty the planner no longer equates today's marginal distortion to a known future value. Instead the Euler-style condition becomes $$f'\\!\\left(\\frac{T_t}{Y_t}\\right)=E_t\\left[f'\\!\\left(\\frac{T_{t+1}}{Y_{t+1}}\\right)\\right].$$ If $$f$$ is quadratic, then $$f'$$ is linear, so the expected future tax share equals today's tax share.",
        "Under uncertainty, expectations enter the first-order condition directly.",
        "Expected marginal distortion under uncertainty.",
        "This lets you explain why the tax share follows a random walk in the quadratic benchmark.",
        "f'\\!\\left(\\frac{T_t}{Y_t}\\right)=E_t\\left[f'\\!\\left(\\frac{T_{t+1}}{Y_{t+1}}\\right)\\right]",
      ),
    ],
    hints: [
      "Get the certainty benchmark right first. The uncertainty part is an extension, not a different model.",
    ],
    nextSteps: [
      "Write the marginal-condition logic for moving a small amount of taxation from period $t$ to period $t+1$.",
    ],
    solutionOutline: [
      "Tax costs rise with the tax share because higher rates usually create more than proportional increases in labour-supply distortions, avoidance, evasion, and other efficiency losses. That is the economic reason the tax-cost function is convex.",
      "The minimization problem can be written with the Lagrangian $$\\mathcal{L} = \\sum_{t=0}^{\\infty}\\frac{1}{(1+r)^t}Y_t f\\!\\left(\\frac{T_t}{Y_t}\\right) + \\lambda\\left[D_0 + \\sum_{t=0}^{\\infty}\\frac{1}{(1+r)^t}G_t - \\sum_{t=0}^{\\infty}\\frac{1}{(1+r)^t}T_t\\right].$$ Differentiating with respect to $$T_t$$ gives $$\\frac{1}{(1+r)^t}f'\\!\\left(\\frac{T_t}{Y_t}\\right) - \\lambda\\frac{1}{(1+r)^t} = 0,$$ so $$f'\\!\\left(\\frac{T_t}{Y_t}\\right)=\\lambda \\quad \\forall t.$$",
      "Because $$f''(\\cdot)>0,$$ the derivative $$f'(\\cdot)$$ is strictly increasing. Equal marginal distortions therefore require equal tax shares, so $$\\frac{T_t}{Y_t}=\\tau \\quad \\forall t.$$ This is the formal tax-smoothing result: under certainty, the minimization problem is solved by keeping the tax share constant over time.",
      "With uncertainty about future government income, the conclusion changes from a deterministic constant path to an expectations-based smoothing condition. The first-order condition becomes $$f'\\!\\left(\\frac{T_t}{Y_t}\\right)=E_t\\left[f'\\!\\left(\\frac{T_{t+1}}{Y_{t+1}}\\right)\\right],$$ because tomorrow's marginal distortion is no longer known with certainty at time $$t$$.",
      "If $$f$$ is quadratic, then $$f'$$ is linear, so the expected future tax share must equal today's tax share. In that benchmark the tax share follows a random walk or martingale-type process rather than a literally constant deterministic path. So uncertainty does not kill tax smoothing, but it changes the exact form of the condition from equal realized marginal distortions to equal expected marginal distortions.",
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
    id: "practice-collection-exam-2020",
    slug: "exam-2020",
    kind: "past_exam",
    title: "Final Exam 2020",
    sourceLabel: "Past exam",
    summary:
      "A full source-faithful 2020 exam covering monetary policy, debt sustainability, the baseline NK model, supply shocks, and the Phillips curve.",
    description:
      "Use the 2020 exam when you want a broad benchmark-oriented paper with several questions that map closely onto the early and middle lectures.",
    relatedModuleSlugs: ["lecture-1", "lecture-2", "lecture-4", "lecture-7", "lecture-9", "lecture-10"],
    problemSlugs: [
      "exam-2020-question-1-norges-bank",
      "exam-2020-question-2-sustainable-public-debt",
      "exam-2020-question-3-basic-nk-model",
      "exam-2020-question-4-supply-shocks",
      "exam-2020-question-5-cost-push-figure",
      "exam-2020-question-6-phillips-curve-slope",
      "exam-2020-question-7-fiscal-policy-in-norway",
    ],
    estimatedMinutes: 180,
  },
  {
    id: "practice-collection-exam-2021",
    slug: "exam-2021",
    kind: "past_exam",
    title: "Final Exam 2021",
    sourceLabel: "Past exam",
    summary:
      "A full source-faithful 2021 exam covering Keynesian supply shocks, the baseline NK model, forward guidance, Ricardian equivalence, and unconventional policy.",
    description:
      "Use the 2021 exam when you want another complete source with stronger emphasis on supply-shock classification and the forward-guidance puzzle.",
    relatedModuleSlugs: ["lecture-2", "lecture-4", "lecture-6", "lecture-8", "lecture-9"],
    problemSlugs: [
      "exam-2021-question-1-keynesian-supply-shocks",
      "exam-2021-question-2-basic-nk-model",
      "exam-2021-question-3-forward-guidance-puzzle",
      "exam-2021-question-4-ricardian-equivalence",
      "exam-2021-question-5-co-movement-output-consumption",
      "exam-2021-question-6-unconventional-monetary-policy",
    ],
    estimatedMinutes: 180,
  },
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
  const lectureLinkedCollections = lectureLinkedProblems.map((problem) => ({
    id: `practice-collection-${problem.collectionSlug ?? lectureLinkedCollectionSlug(problem.moduleSlug)}`,
    slug: problem.collectionSlug ?? lectureLinkedCollectionSlug(problem.moduleSlug),
    kind: "lecture_linked" as const,
    title: problem.sourceLabel ?? `${problem.title} practice`,
    sourceLabel: "Lecture-linked practice",
    summary:
      problem.summary ??
      "Focused practice tied directly to one lecture, designed to lock in the benchmark before you move on.",
    description:
      "This source opens as one short continuous session tied directly to the lecture module. It is the fastest way to rehearse the mechanism while the lecture is still fresh.",
    relatedModuleSlugs: [problem.moduleSlug],
    problemSlugs: [problem.slug],
    estimatedMinutes: 20,
  }));

  return [
    ...seminarCollections,
    ...examCollections,
    ...lectureLinkedCollections,
  ];
}
