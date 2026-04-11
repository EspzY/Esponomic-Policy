import type { PracticeProblem, QuizItem, TutorSource } from "@/lib/types";

import {
  lecture2HouseholdCitations,
  lecture2NaturalCitations,
  lecture2ThreeEquationCitations,
  nkpcDerivationCitations,
  seminarCitations,
  shockTransmissionCitations,
} from "@/lib/seed-content/notation-content";
import { quizBank } from "@/lib/seed-content/builders";

export const demoQuizItems: QuizItem[] = quizBank([
  {
    id: "lecture2-quiz-1",
    prompt:
      "Why is it dangerous to answer a technology-shock question without first comparing actual output $y_t$ to natural output $y_t^n$?",
    choices: [
      "Because a technology shock can raise actual output and still lower the output gap if natural output rises by more.",
      "Because technology shocks do not affect the flexible-price allocation at all.",
      "Because the output gap is the same thing as inflation in the three-equation model.",
      "Because technology shocks only enter the Taylor rule.",
    ],
    correctIndex: 0,
    explanation:
      "Lecture 2 and the complementary shock-transmission lecture emphasize that a positive technology shock raises potential output directly. Under sticky prices, actual output typically rises by less, so $\\tilde{y}_t$ can fall even when $y_t$ rises.",
    tags: ["technology-shock", "output-gap"],
    citations: [...lecture2NaturalCitations, ...shockTransmissionCitations],
  },
  {
    id: "lecture2-quiz-2",
    prompt:
      "What is the cleanest interpretation of the factor $(\\beta\\theta)^k$ in the reset-price problem?",
    choices: [
      "It combines discounting and the probability that the firm is still stuck with today's reset price $k$ periods ahead.",
      "It measures the elasticity of substitution across labor inputs.",
      "It is the Taylor-rule coefficient on inflation.",
      "It means future marginal cost no longer matters for inflation.",
    ],
    correctIndex: 0,
    explanation:
      "The derivation note explains that $\\beta$ discounts future profits and $\\theta$ is the probability the firm does not get to reset again. That is why expected future marginal costs matter for pricing today.",
    tags: ["nkpc", "calvo-pricing"],
    citations: nkpcDerivationCitations,
  },
  {
    id: "lecture2-quiz-3",
    prompt:
      "How do you get from the household block to the Dynamic IS equation in Lecture 2?",
    choices: [
      "Subtract the flexible-price Euler equation from the sticky-price Euler equation and use market clearing.",
      "Differentiate the Taylor rule with respect to inflation.",
      "Set marginal cost equal to zero and solve for prices.",
      "Replace expected inflation with lagged inflation and then linearize.",
    ],
    correctIndex: 0,
    explanation:
      "Lecture 2 explicitly derives the demand equation by comparing the sticky-price Euler equation with its flexible-price counterpart. This is what brings the natural rate $r_t^n$ into the model.",
    tags: ["dynamic-is", "natural-rate"],
    citations: [...lecture2HouseholdCitations, ...lecture2ThreeEquationCitations],
  },
  {
    id: "lecture2-quiz-4",
    prompt:
      "Which sign pattern is most consistent with a baseline positive technology shock in Lecture 2?",
    choices: [
      "Output up, inflation down, output gap down.",
      "Output down, inflation up, output gap up.",
      "Output unchanged, inflation unchanged, output gap up.",
      "Output up, inflation up, output gap up.",
    ],
    correctIndex: 0,
    explanation:
      "The complementary lecture says a positive technology shock raises actual output, but less than potential output, while lower marginal cost pushes inflation down. That makes the output gap more negative.",
    tags: ["technology-shock", "shock-analysis"],
    citations: shockTransmissionCitations,
  },
]);

export const demoPracticeProblem: PracticeProblem = {
  id: "lecture-2-guided-nk-shock-analysis",
  slug: "lecture-2-guided-nk-shock-analysis",
  title: "Lecture 2 Guided NK Shock Analysis",
  moduleSlug: "lecture-2",
  prompt: [
    "Consider the basic New Keynesian model used in class and summarized by the following equations.",
    "Suppose the economy is in steady state and is hit by a temporary positive technology shock. Describe the impact response of output, potential output, inflation, and the natural rate of interest. Explain briefly the transmission mechanism.",
    "Suppose inflation increases while the output gap decreases after a one-time temporary shock. Can any of the three baseline shocks generate that pattern on their own? If not, what additional disturbance might be needed?",
  ],
  supportingEquations: [
    {
      id: "practice-euler",
      label: "Euler equation",
      latex:
        "c_t = E_t c_{t+1} - \\frac{1}{\\sigma}(i_t - E_t\\pi_{t+1} - \\rho) + \\frac{1-\\rho_z}{\\sigma}z_t",
      explanation:
        "Use this when you want to explain how demand responds to the actual real rate and to the discount-factor shock.",
    },
    {
      id: "practice-output-gap",
      label: "Output-gap definition",
      latex: "\\tilde{y}_t = y_t - y_t^n",
      explanation:
        "This is the identity that keeps actual and natural output separate.",
    },
    {
      id: "practice-nkpc",
      label: "Phillips curve",
      latex: "\\pi_t = \\beta E_t\\pi_{t+1} + \\kappa\\tilde{y}_t",
      explanation:
        "Inflation is tied to expected future inflation and real slack once the marginal-cost relation is substituted in.",
    },
    {
      id: "practice-natural-rate",
      label: "Natural real interest rate",
      latex:
        "r_t^n = \\rho - \\sigma\\frac{1+\\phi}{\\sigma + \\phi}(1-\\rho_a)a_t + (1-\\rho_z)z_t",
      explanation:
        "This is the benchmark real rate implied by the flexible-price economy.",
    },
  ],
  hints: [
    "Start by writing one line each for $y_t$, $y_t^n$, $\\pi_t$, and $r_t^n$. The point of the exercise is to compare actual and natural objects, not to describe output only.",
    "For the technology shock, ask what productivity does directly to marginal cost and to the flexible-price allocation before you say anything about the output gap.",
  ],
  nextSteps: [
    "Use the complementary lecture logic: a positive technology shock raises potential output, lowers marginal cost, and in the lecture calibration lowers the natural real rate. Then ask whether actual output moves as much as potential output under sticky prices.",
    "For the second question, test each of the three baseline shocks against the sign pair **inflation up / output gap down**. If no baseline shock fits, identify what kind of missing disturbance could push inflation up directly.",
  ],
  solutionOutline: [
    "A positive technology shock raises **potential output $y_t^n$** immediately because the flexible-price economy can produce more efficiently.",
    "It also lowers **marginal cost**, so **inflation falls** through the Phillips curve.",
    "Under sticky prices, **actual output $y_t$ rises**, but the complementary lecture says it rises by **less than potential output**, so the **output gap falls**.",
    "The Lecture 2 natural-rate formula and note say **$r_t^n$ moves with temporary technology shocks**. In the lecture calibration, it **falls**.",
    "If inflation rises while the output gap falls, the baseline monetary-policy, discount-factor, and technology shocks do not fit that sign pattern on their own. A **cost-push shock** is the natural missing disturbance.",
  ],
  citations: [...seminarCitations, ...shockTransmissionCitations, ...lecture2NaturalCitations],
};

export const demoTutorSources: TutorSource[] = [
  {
    id: "tutor-big-picture",
    moduleSlug: "lecture-2",
    title: "Lecture 2 big picture",
    text:
      "Lecture 2 contrasts a flexible-price benchmark with a sticky-price New Keynesian economy. Under flexible prices, monetary shocks are neutral in the standard setup. Under sticky prices, monetary shocks have temporary real effects and supply and demand shocks travel through different channels.",
    citations: lecture2NaturalCitations,
    tags: ["overview", "benchmark", "sticky-prices"],
  },
  {
    id: "tutor-three-equation",
    moduleSlug: "lecture-2",
    title: "Three-equation system",
    text:
      "The compact New Keynesian system is made of the NKPC, the Dynamic IS equation, and the Taylor rule. The output gap is defined as actual output minus natural output, and the Dynamic IS equation depends on the gap between the actual real rate and the natural real rate.",
    citations: lecture2ThreeEquationCitations,
    tags: ["nkpc", "dynamic-is", "output-gap", "taylor-rule"],
  },
  {
    id: "tutor-natural-rate",
    moduleSlug: "lecture-2",
    title: "Natural output and natural rate",
    text:
      "Lecture 2 derives natural output and the natural real interest rate from the flexible-price allocation. Natural output depends only on technology shocks in the baseline model, while the natural real rate responds to temporary technology and discount-factor shocks.",
    citations: lecture2NaturalCitations,
    tags: ["natural-output", "natural-rate", "technology-shock", "discount-factor-shock"],
  },
  {
    id: "tutor-nkpc-derivation",
    moduleSlug: "lecture-2",
    title: "NKPC derivation",
    text:
      "The pricing derivation starts from the firm's reset-price problem under Calvo pricing. The key forward-looking force is that the firm may remain stuck with today's price for several future periods, which is why the factor beta times theta appears. The derivation rewrites the reset price recursively and then uses the aggregate price-index identities to obtain the Phillips curve.",
    citations: nkpcDerivationCitations,
    tags: ["derivation", "nkpc", "calvo", "reset-price"],
  },
  {
    id: "tutor-shock-analysis",
    moduleSlug: "lecture-2",
    title: "Shock analysis",
    text:
      "The complementary Lecture 2 explains that nominal rigidities amplify demand shocks and dampen supply shocks. A contractionary monetary policy shock raises the real rate and lowers the output gap and inflation. A positive technology shock raises output, lowers inflation, and lowers the output gap because natural output rises by more than actual output.",
    citations: shockTransmissionCitations,
    tags: ["shock-analysis", "monetary-shock", "technology-shock", "discount-factor-shock"],
  },
  {
    id: "tutor-seminar1",
    moduleSlug: "lecture-2",
    title: "Seminar 1 qualitative reasoning",
    text:
      "Seminar 1 asks students to reason from the same Lecture 2 equations. The safe strategy is to identify the shock, separate actual output from natural output, explain what happens to inflation through marginal cost, and then decide whether the natural rate moves.",
    citations: seminarCitations,
    tags: ["seminar", "exam-style", "qualitative-reasoning"],
  },
];
