import type { ContentBlock, ModuleDetail } from "@/lib/types";

import {
  allLecture2Citations,
  lecture2FirmCitations,
  lecture2HouseholdCitations,
  lecture2IntroCitations,
  lecture2NaturalCitations,
  lecture2ThreeEquationCitations,
  nkpcDerivationCitations,
  seminarCitations,
  shockTransmissionCitations,
} from "@/lib/seed-content/notation-content";

const p = (markdown: string): ContentBlock => ({
  type: "paragraph",
  markdown,
});

const eq = (
  label: string,
  latex: string,
  explanation: string,
): ContentBlock => ({
  type: "equation",
  label,
  latex,
  explanation,
});

const derivation = (params: {
  title: string;
  learningGoal: string;
  operation: string;
  whyValid: string;
  latexAfter: string;
  latexBefore?: string;
  explanation: string;
}): ContentBlock => ({
  type: "derivation_step",
  ...params,
});

const modelMap = (
  title: string,
  items: { label: string; description: string }[],
): ContentBlock => ({
  type: "model_map",
  title,
  items,
});

const shockTrace = (params: {
  title: string;
  shock: string;
  steps: {
    variable: string;
    direction: string;
    explanation: string;
  }[];
}): ContentBlock => ({
  type: "shock_trace",
  ...params,
});

const workedExample = (params: {
  title: string;
  prompt: string;
  steps: {
    title: string;
    markdown: string;
  }[];
}): ContentBlock => ({
  type: "worked_example",
  ...params,
});

const checklist = (items: string[], title?: string): ContentBlock => ({
  type: "checklist",
  title,
  items,
});

const examTrap = (
  title: string,
  trap: string,
  correction: string,
): ContentBlock => ({
  type: "exam_trap",
  title,
  trap,
  correction,
});

const figureNote = (
  title: string,
  caption: string,
  imagePath?: string,
  altText?: string,
  note?: string,
): ContentBlock => ({
  type: "figure",
  title,
  caption,
  status: imagePath ? "ready" : "source_pending",
  imagePath,
  altText,
  note,
});

export const lecture2Module: ModuleDetail = {
  id: "lecture-2",
  slug: "lecture-2",
  title: "Lecture 2: The New Keynesian Model",
  kind: "lecture",
  summary:
    "A math-first walkthrough of the basic New Keynesian model: notation, assumptions, derivations, and qualitative shock analysis.",
  description:
    "This rebuilt Lecture 2 follows the actual course material: it starts with intuition, rebuilds the full model block by block, derives the compact three-equation system, explains the NKPC step by step, and ends with shock logic and Seminar 1 reasoning.",
  estimatedMinutes: 110,
  tags: ["lecture-2", "new-keynesian-model", "nkpc", "shock-analysis"],
  publicationStatus: "published",
  objectives: [
    "Read the full New Keynesian model in the same notation as the lecture slides.",
    "Derive natural output, the natural real interest rate, the Dynamic IS equation, and the NKPC step by step.",
    "Explain the sign logic of technology, discount-factor, and monetary policy shocks without guessing.",
  ],
  sections: [
    {
      id: "lecture-2-big-picture",
      slug: "big-picture-and-exam-relevance",
      title: "Big picture and why this lecture matters",
      summary:
        "Why Lecture 2 matters for the rest of the course and for exam questions.",
      contentBlocks: [
        p(
          "Lecture 2 is the first place where the course gives you the **workhorse New Keynesian model**. From this point on, many exercises and exam questions boil down to the same habits: identify the shock, separate actual output from natural output, compare the actual real rate with the natural rate, and trace how inflation responds through the Phillips curve.",
        ),
        p(
          "Relative to Lecture 1, this is the step where the course stops talking about policy rules in the abstract and places them inside a full macro model. What changes is that you now have explicit household, firm, and policy blocks. What stays is the need to ask what the policy instrument does, what benchmark it is being judged against, and how the central bank should react once the state of the economy changes.",
        ),
        p(
          "The lecture starts by contrasting a **flexible-price benchmark** with the sticky-price New Keynesian economy. Under flexible prices, monetary shocks are neutral in the standard setup. Once prices adjust only gradually, monetary disturbances gain temporary real effects and supply and demand shocks travel through different channels.",
        ),
        modelMap("Why the model is worth learning", [
          {
            label: "Benchmark logic",
            description:
              "You always compare the sticky-price economy with the flexible-price benchmark. That is why objects such as $y_t^n$ and $r_t^n$ matter so much.",
          },
          {
            label: "Policy transmission",
            description:
              "The model tells you how the policy rate changes demand, how marginal cost changes inflation, and when nominal rigidities amplify or dampen shocks.",
          },
          {
            label: "Exam payoff",
            description:
              "Many qualitative questions can be answered if you know how the three-equation system is built and what each shock does to $y_t$, $y_t^n$, $\\tilde{y}_t$, $\\pi_t$, and $r_t^n$.",
          },
        ]),
        checklist(
          [
            "Know the difference between **actual**, **natural**, and **gap** objects before you start any derivation.",
            "Treat Lecture 2 as the foundation for later topics like forward guidance, the output gap, and policy design.",
            "Expect the exam to test both **derivation logic** and **qualitative transmission logic**.",
          ],
          "What you should take away from this section",
        ),
        examTrap(
          "Jumping straight to signs without a benchmark",
          "Students often answer shock questions by guessing whether output or inflation goes up or down without first asking what happens in the flexible-price allocation.",
          "Start from the benchmark object that moves first. For supply shocks, that is usually $y_t^n$ and sometimes $r_t^n$. For demand shocks, the key comparison is between the actual real rate and the natural rate.",
        ),
      ],
      citations: [...lecture2IntroCitations, ...seminarCitations],
    },
    {
      id: "lecture-2-notation",
      slug: "notation-and-glossary",
      title: "Notation and glossary",
      summary: "The few objects you must keep separate all the time.",
      contentBlocks: [
        p(
          "The lecture introduces a compact notation that becomes the language of the rest of the course. If you are ever lost, the first repair step is to ask: **Is this an actual object, a natural object, or a gap object?**",
        ),
        eq(
          "Output gap definition",
          "\\tilde{y}_t \\equiv y_t - y_t^n",
          "The output gap is not output itself. It measures how far the sticky-price economy is from the flexible-price benchmark.",
        ),
        eq(
          "Real interest rate definition",
          "r_t \\equiv i_t - E_t\\pi_{t+1}",
          "The policy instrument is nominal, but households care about the expected real return when they choose consumption.",
        ),
        modelMap("The three objects students confuse most", [
          {
            label: "$y_t$",
            description:
              "Actual output in the sticky-price economy. It moves with shocks and with monetary transmission.",
          },
          {
            label: "$y_t^n$",
            description:
              "Natural output in the flexible-price economy. Technology shocks move it directly.",
          },
          {
            label: "$\\tilde{y}_t$",
            description:
              "The difference between the two. A technology shock can raise $y_t$ and still leave the gap lower if natural output rises more.",
          },
        ]),
        checklist(
          [
            "Read $E_t$ as **expectation formed today**, not realized future data.",
            "Read $r_t^n$ as a **time-varying equilibrium object**, not a fixed long-run constant.",
            "Remember that abbreviations such as $mc_t$ and labels such as NKPC or DIS are part of the model's language.",
          ],
          "Micro-checklist",
        ),
      ],
      citations: [...lecture2IntroCitations, ...lecture2NaturalCitations],
    },
    {
      id: "lecture-2-assumptions",
      slug: "core-assumptions-and-benchmark-comparison",
      title: "Core assumptions and benchmark comparison",
      summary: "What is built into the baseline model before any derivation starts.",
      contentBlocks: [
        p(
          "The baseline environment is deliberately stripped down: the economy is closed, there is no capital accumulation, firms are monopolistically competitive, labor markets are competitive, wages are flexible, and nominal price adjustment follows the Calvo structure. These assumptions make the logic tractable enough that you can see exactly where the frictions enter.",
        ),
        eq(
          "Flexible-price pricing condition",
          "P_t = \\frac{\\varepsilon}{\\varepsilon - 1}\\,\\Psi_t",
          "Under flexible prices, firms charge a markup over nominal marginal cost. This is the benchmark from which sticky-price distortions are measured.",
        ),
        p(
          "The lecture log-linearizes the model around a steady state with **zero inflation** and **zero output growth**. That is why upper-case variables from the nonlinear model become lower-case log deviations such as $w_t$, $p_t$, and $c_t$.",
        ),
        modelMap("Why the assumptions matter", [
          {
            label: "No capital accumulation",
            description:
              "Output is tied tightly to labor and productivity, so the supply side stays transparent.",
          },
          {
            label: "Monopolistic competition",
            description:
              "The markup wedge appears naturally, which is why $\\mu$ and marginal cost matter in the inflation block.",
          },
          {
            label: "Sticky prices but flexible wages",
            description:
              "Nominal rigidity comes from price-setting, not wage stickiness, in this lecture's baseline system.",
          },
        ]),
        examTrap(
          "Treating the baseline as a generic macro model",
          "It is easy to import habits from richer models with capital, investment, or government and then start looking for channels that do not exist here.",
          "Stay inside the lecture's baseline environment: output is closed by consumption, labor, productivity, price setting, and the Taylor rule. If a channel is not in the listed equations, do not smuggle it in.",
        ),
      ],
      citations: [...lecture2IntroCitations, ...lecture2FirmCitations],
    },
    {
      id: "lecture-2-households",
      slug: "household-block",
      title: "Household block",
      summary: "The Euler equation and labor supply are the household side of the full model.",
      contentBlocks: [
        p(
          "Households choose consumption and labor supply. The Euler equation tells you how current consumption trades off against expected future consumption once the expected real return is taken into account. The labor-supply condition tells you what real wage is required to make a given amount of work acceptable.",
        ),
        eq(
          "Euler equation",
          "c_t = E_t c_{t+1} - \\frac{1}{\\sigma}\\bigl(i_t - E_t\\pi_{t+1} - \\rho\\bigr) + \\frac{1-\\rho_z}{\\sigma} z_t",
          "A higher expected real rate makes current consumption less attractive. A discount-factor shock $z_t$ shifts demand directly.",
        ),
        eq(
          "Labor supply",
          "w_t - p_t = \\sigma c_t + \\phi n_t",
          "The real wage must rise when consumption is high or when households are asked to work more.",
        ),
        eq(
          "Real rate definition",
          "r_t = i_t - E_t\\pi_{t+1}",
          "The Fisher equation gives the real rate that matters for intertemporal demand.",
        ),
        modelMap("How to read the household block", [
          {
            label: "$\\sigma$",
            description:
              "Controls how hard households push back against moving consumption across time.",
          },
          {
            label: "$\\phi$",
            description:
              "Controls how quickly the real wage must rise to get more labor supplied.",
          },
          {
            label: "$z_t$",
            description:
              "A demand disturbance: it shifts the Euler equation directly and therefore moves desired consumption.",
          },
        ]),
        examTrap(
          "Forgetting that the Euler equation is about the real rate",
          "Some students see $i_t$ rise and conclude immediately that consumption must fall, without checking what happens to expected inflation.",
          "Always rewrite the Euler condition in terms of the real rate. The true question is whether $r_t$ rises relative to the natural rate $r_t^n$.",
        ),
      ],
      citations: lecture2HouseholdCitations,
    },
    {
      id: "lecture-2-firms",
      slug: "firm-block",
      title: "Firm block",
      summary: "Production is simple, but price-setting is forward looking because firms may stay stuck with today's reset price.",
      contentBlocks: [
        p(
          "Firms use labor as the only input, so productivity and hours are enough to determine output. The interesting friction is nominal price-setting: only a share $1-\\theta$ of firms can reset prices in a given period, while the others keep the old price. That single assumption is what makes inflation forward looking.",
        ),
        eq(
          "Aggregate production",
          "y_t = a_t + n_t",
          "Productivity and labor together determine output in the log-linearized production block.",
        ),
        eq(
          "Calvo price aggregation",
          "p_t = \\theta p_{t-1} + (1-\\theta)p_t^*",
          "A higher $\\theta$ means a larger share of firms remain stuck with their old price, so aggregate prices adjust more slowly.",
        ),
        eq(
          "Phillips curve in marginal-cost form",
          "\\pi_t = \\beta E_t\\pi_{t+1} + \\lambda (mc_t - mc)",
          "Inflation rises when expected future inflation is high or when current real marginal cost is high relative to steady state.",
        ),
        eq(
          "Real marginal cost",
          "mc_t = w_t - p_t - a_t",
          "Higher real wages push marginal cost up; higher productivity pushes it down.",
        ),
        modelMap("What to watch in the firm block", [
          {
            label: "$\\theta$",
            description:
              "The stickiness parameter. Average price duration is $1/(1-\\theta)$.",
          },
          {
            label: "$p_t^*$",
            description:
              "The reset price chosen by reoptimizing firms. It is not the aggregate price level.",
          },
          {
            label: "$mc_t - mc$",
            description:
              "The inflation-driving cost pressure that the lecture later shows is proportional to the output gap.",
          },
        ]),
      ],
      citations: [...lecture2FirmCitations, ...nkpcDerivationCitations],
    },
    {
      id: "lecture-2-reduction",
      slug: "from-blocks-to-the-three-equation-model",
      title: "From blocks to the three-equation NK model",
      summary: "How the full model collapses into the system you solve in exercises.",
      contentBlocks: [
        p(
          "Lecture 2 does not ask you to memorize the compact three-equation system as if it fell from the sky. The key reduction step is to express the marginal-cost gap in terms of the output gap and then subtract the flexible-price Euler equation from the sticky-price Euler equation.",
        ),
        derivation({
          title: "Turn the marginal-cost gap into the output gap",
          learningGoal:
            "Show that the inflation block can be written in terms of $\\tilde{y}_t$ instead of $mc_t - mc$.",
          latexBefore:
            "mc_t - mc = \\sigma y_t + \\phi(y_t - a_t) - \\sigma y_t^n - \\phi(y_t^n - a_t)",
          operation:
            "Use market clearing $y_t = c_t$, the production function, and the flexible-price counterparts. Then collect terms in $y_t - y_t^n$.",
          whyValid:
            "Lecture 2 p. 25 uses the same substitutions to line up the sticky-price and flexible-price allocations before simplifying.",
          latexAfter:
            "mc_t - mc = (\\sigma + \\phi)(y_t - y_t^n) = (\\sigma + \\phi)\\tilde{y}_t",
          explanation:
            "This is the bridge from the firm's marginal-cost language to the output-gap language used in the compact NK system.",
        }),
        derivation({
          title: "Derive the Dynamic IS equation",
          learningGoal:
            "Replace the household block with a single demand equation in the output gap.",
          latexBefore:
            "\\begin{aligned} c_t &= E_t c_{t+1} - \\frac{1}{\\sigma}(i_t - E_t\\pi_{t+1} - \\rho) + \\frac{1-\\rho_z}{\\sigma}z_t \\\\ c_t^n &= E_t c_{t+1}^n - \\frac{1}{\\sigma}(r_t^n - \\rho) + \\frac{1-\\rho_z}{\\sigma}z_t \\end{aligned}",
          operation:
            "Subtract the flexible-price Euler equation from the sticky-price Euler equation and use market clearing $y_t = c_t$ and $y_t^n = c_t^n$.",
          whyValid:
            "The shock term appears in both equations and therefore cancels. What survives is the gap between the actual real rate and the natural real rate.",
          latexAfter:
            "\\tilde{y}_t = E_t\\tilde{y}_{t+1} - \\frac{1}{\\sigma}\\bigl(i_t - E_t\\pi_{t+1} - r_t^n\\bigr)",
          explanation:
            "Demand is weak when the actual real rate is high relative to the natural rate. That statement is the economic heart of the Dynamic IS equation.",
        }),
        eq(
          "Compact three-equation system",
          "\\begin{aligned} \\pi_t &= \\beta E_t\\pi_{t+1} + \\kappa \\tilde{y}_t \\\\ \\tilde{y}_t &= E_t\\tilde{y}_{t+1} - \\frac{1}{\\sigma}\\bigl(i_t - E_t\\pi_{t+1} - r_t^n\\bigr) \\\\ i_t &= \\rho + \\phi_\\pi \\pi_t + \\phi_y \\tilde{y}_t + v_t \\end{aligned}",
          "Once the full model has been reduced to these three equations, most later qualitative analysis becomes a disciplined sign exercise.",
        ),
        checklist(
          [
            "The NKPC comes from the **firm block** and price-setting.",
            "The Dynamic IS equation comes from the **household block** after subtracting the flexible-price counterpart.",
            "The policy rule closes the model by telling you how the nominal rate reacts.",
          ],
          "Reduction logic",
        ),
      ],
      citations: [...lecture2ThreeEquationCitations, ...lecture2NaturalCitations],
    },
    {
      id: "lecture-2-nkpc",
      slug: "full-nkpc-derivation",
      title: "Full NKPC derivation step by step",
      summary: "From the reset-price problem to the Phillips curve without skipping the algebraic logic.",
      contentBlocks: [
        p(
          "This is the derivation most likely to feel rushed in class. The pricing problem is forward looking because a firm that resets today may remain stuck with the same price for several future periods. That is why the factor $(\\beta\\theta)^k$ appears from the very start.",
        ),
        derivation({
          title: "Set up the reset-price problem",
          learningGoal:
            "Write the firm's objective before touching any linearization.",
          latexAfter:
            "\\max_{P_t^*} E_t\\sum_{k=0}^{\\infty}(\\beta\\theta)^k\\left[\\left(\\frac{P_t^*}{P_{t+k}}\\right)Y_{t+k\\mid t} - MC_{t+k\\mid t}Y_{t+k\\mid t}\\right]",
          operation:
            "Start from the expected discounted stream of profits for a firm that is allowed to reoptimize in period $t$.",
          whyValid:
            "$\\beta$ discounts future payoffs and $\\theta$ is the probability the firm remains stuck with the chosen price in the future.",
          explanation:
            "The objective is forward looking because the reset price chosen today can affect profits for many periods.",
        }),
        derivation({
          title: "Substitute the demand curve and identify the markup object",
          learningGoal:
            "Express the first-order condition in terms of the chosen price, future aggregate prices, and marginal cost.",
          latexBefore:
            "Y_{t+k\\mid t} = \\left(\\frac{P_t^*}{P_{t+k}}\\right)^{-\\varepsilon}Y_{t+k}",
          latexAfter:
            "\\sum_{k=0}^{\\infty}(\\beta\\theta)^kE_t\\left[\\left(\\frac{P_t^*}{P_{t+k}}\\right)^{-\\varepsilon}Y_{t+k}\\bigl(P_t^* - M MC_{t+k\\mid t}\\bigr)\\right] = 0",
          operation:
            "Substitute firm-specific demand into the profit condition and define the desired markup as $M = \\varepsilon/(\\varepsilon - 1)$.",
          whyValid:
            "The monopoly problem can be written using the elasticity of substitution across varieties, which is exactly what the derivation note does on page 1.",
          explanation:
            "The first-order condition says the optimal reset price balances current and future profit losses from pricing too low against demand losses from pricing too high.",
        }),
        derivation({
          title: "Log-linearize the optimal pricing condition",
          learningGoal:
            "Move from the nonlinear reset-price problem to a linear relation around the zero-inflation steady state.",
          latexAfter:
            "p_t^* - p_{t-1} = (1-\\beta\\theta)\\sum_{k=0}^{\\infty}(\\beta\\theta)^k E_t\\left[\\widehat{mc}_{t+k\\mid t} + (p_{t+k} - p_{t-1})\\right]",
          operation:
            "Linearize around the zero-inflation steady state used in the lecture slides.",
          whyValid:
            "Lecture 2 explicitly log-linearizes the model around a steady state with zero inflation, so the derivation note works in deviations from that benchmark.",
          explanation:
            "At this stage the reset price depends on a weighted average of current and expected future marginal-cost pressure plus the future aggregate price level.",
        }),
        derivation({
          title: "Rewrite the reset price as a markup over expected nominal marginal costs",
          learningGoal:
            "Get an equation with immediate economic intuition before jumping to inflation.",
          latexAfter:
            "p_t^* = \\mu + (1-\\beta\\theta)\\sum_{k=0}^{\\infty}(\\beta\\theta)^kE_t\\bigl(mc_{t+k\\mid t} + p_{t+k}\\bigr)",
          operation:
            "Use $mc = -\\mu$ and the fact that the geometric weights sum to one.",
          whyValid:
            "The derivation note proves explicitly that $(1-\\beta\\theta)\\sum_{k=0}^{\\infty}(\\beta\\theta)^k = 1$ when $|\\beta\\theta| < 1$.",
          explanation:
            "The reset price is a markup over a weighted average of current and expected future nominal marginal costs. The weights are larger at horizons where the firm is more likely to still be stuck with today's price.",
        }),
        derivation({
          title: "Split the infinite sum recursively",
          learningGoal:
            "Turn the reset-price equation into a recursive condition that is easier to interpret.",
          latexBefore:
            "p_t^* = (1-\\beta\\theta)\\sum_{k=0}^{\\infty}(\\beta\\theta)^k E_t\\bigl(mc_{t+k\\mid t} - mc + p_{t+k}\\bigr)",
          latexAfter:
            "p_t^* = (1-\\beta\\theta)(mc_t - mc + p_t) + \\beta\\theta E_t(p_{t+1}^*)",
          operation:
            "Separate the $k=0$ term from the rest of the sum, factor out $\\beta\\theta$, re-index, and then use the law of iterated expectations.",
          whyValid:
            "The continuation part of the problem from period $t+1$ onward has the same structure as the problem solved one period later.",
          explanation:
            "Today's optimal reset price is a weighted average of current desired pricing and tomorrow's expected optimal reset price.",
        }),
        derivation({
          title: "Use the aggregate price index identities to get the NKPC",
          learningGoal:
            "Translate the reset-price equation into an inflation equation.",
          latexBefore:
            "p_t = \\theta p_{t-1} + (1-\\theta)p_t^*, \\qquad \\pi_t \\equiv p_t - p_{t-1}",
          latexAfter:
            "\\pi_t = \\beta E_t\\pi_{t+1} + \\frac{(1-\\theta)(1-\\beta\\theta)}{\\theta}(mc_t - mc)",
          operation:
            "Use the price-index identities to rewrite $p_t^* - p_t$ and $p_{t+1}^* - p_t$ in terms of inflation, then substitute into the recursive pricing equation.",
          whyValid:
            "The derivation note proves the required identities on pages 4-6 before the final substitution step.",
          explanation:
            "This is the marginal-cost version of the NKPC. Lecture 2 then combines it with the proportionality result to express inflation in terms of the output gap.",
        }),
        checklist(
          [
            "You should be able to explain **why** $(\\beta\\theta)^k$ appears.",
            "You should be able to explain **what** the reset price averages over.",
            "You should be able to explain **where** the inflation identities enter the final step.",
          ],
          "Derivation checklist",
        ),
      ],
      citations: nkpcDerivationCitations,
    },
    {
      id: "lecture-2-shocks",
      slug: "shock-analysis-and-sign-logic",
      title: "Shock analysis and sign logic",
      summary: "How to reason through the three baseline shocks without handwaving.",
      contentBlocks: [
        p(
          "The complementary lecture makes the qualitative logic explicit by comparing **flexible prices**, **fixed prices**, and **rigid prices**. The key lesson is simple: nominal rigidities amplify demand shocks and dampen supply shocks.",
        ),
        eq(
          "Natural real interest rate",
          "r_t^n = \\rho - \\sigma\\frac{1+\\phi}{\\sigma + \\phi}(1-\\rho_a)a_t + (1-\\rho_z)z_t",
          "Lecture 2 derives the natural rate as a flexible-price equilibrium object that responds to temporary technology and discount-factor shocks.",
        ),
        shockTrace({
          title: "Contractionary monetary policy shock",
          shock: "$v_t$ rises temporarily in the Taylor rule.",
          steps: [
            {
              variable: "Policy rate $i_t$",
              direction: "Rises",
              explanation:
                "The Taylor rule is hit directly, so the nominal instrument jumps on impact.",
            },
            {
              variable: "Real rate $r_t$",
              direction: "Rises",
              explanation:
                "With sticky prices, expected inflation does not adjust one-for-one immediately, so the higher nominal rate raises the real rate.",
            },
            {
              variable: "Output gap $\\tilde{y}_t$",
              direction: "Falls",
              explanation:
                "The Dynamic IS equation says demand contracts when the actual real rate rises relative to $r_t^n$.",
            },
            {
              variable: "Inflation $\\pi_t$",
              direction: "Falls",
              explanation:
                "Lower real activity reduces marginal-cost pressure, so inflation declines through the Phillips curve.",
            },
          ],
        }),
        shockTrace({
          title: "Contractionary discount-factor shock",
          shock: "$z_t$ falls, so households want to postpone consumption.",
          steps: [
            {
              variable: "Natural rate $r_t^n$",
              direction: "Falls",
              explanation:
                "In the flexible-price allocation, the natural rate must decline to keep consumption and output aligned with optimal intertemporal smoothing.",
            },
            {
              variable: "Demand",
              direction: "Falls",
              explanation:
                "The Euler equation is hit directly, so consumption demand weakens even before policy reacts.",
            },
            {
              variable: "Output gap $\\tilde{y}_t$",
              direction: "Falls",
              explanation:
                "With sticky prices, actual output declines while potential output does not move, so the gap becomes negative.",
            },
            {
              variable: "Inflation $\\pi_t$",
              direction: "Falls",
              explanation:
                "Lower demand lowers marginal cost and therefore inflation.",
            },
          ],
        }),
        shockTrace({
          title: "Expansionary technology shock",
          shock: "$a_t$ rises temporarily.",
          steps: [
            {
              variable: "Natural output $y_t^n$",
              direction: "Rises",
              explanation:
                "Firms can produce more efficiently, so the flexible-price benchmark level of output rises immediately.",
            },
            {
              variable: "Natural rate $r_t^n$",
              direction: "Falls in the lecture calibration",
              explanation:
                "The lecture and accompanying note emphasize that temporary technology shocks change intertemporal consumption incentives, so the natural real rate moves with the shock.",
            },
            {
              variable: "Inflation $\\pi_t$",
              direction: "Falls",
              explanation:
                "Higher productivity lowers real marginal cost, which reduces inflationary pressure.",
            },
            {
              variable: "Output gap $\\tilde{y}_t$",
              direction: "Falls",
              explanation:
                "Under sticky prices, actual output rises by less than potential output, so the gap becomes more negative.",
            },
          ],
        }),
        p(
          "This is one of the main sign-pattern lessons of Lecture 2: a positive technology shock can give you **higher output, lower inflation, and a lower output gap at the same time**.",
        ),
        figureNote(
          "Contractionary monetary policy shock: impulse responses",
          "Screenshot from the complementary Lecture 2 deck. This figure is useful because it shows the full joint movement of the output gap, inflation, nominal and real rates, output, employment, money supply, the policy shock itself, the real wage, and the price level after a contractionary monetary policy shock.",
          "/figures/lecture-2/monetary-policy-shock-impulse-responses.png",
          "Complementary Lecture 2 slide showing impulse responses to a contractionary monetary policy shock.",
          "For this pass, I chose the slide screenshot over a custom redraw so the visual stays faithful to the lecture's own sign patterns and scales.",
        ),
        figureNote(
          "Contractionary discount factor shock: impulse responses",
          "Screenshot from the complementary Lecture 2 deck. This is especially useful for seeing that the output gap, inflation, nominal rate, and real rate all move together in the demand-contraction case, while potential output stays fixed in the lecture logic.",
          "/figures/lecture-2/discount-factor-shock-impulse-responses.png",
          "Complementary Lecture 2 slide showing impulse responses to a contractionary discount factor shock.",
          "This is a curated screenshot from the source PDF rather than a reconstructed figure.",
        ),
        figureNote(
          "Expansionary technology shock: impulse responses",
          "Screenshot from the complementary Lecture 2 deck. This figure helps students see the important Lecture 2 pattern visually: output rises, inflation falls, and the output gap becomes more negative because natural output rises even more strongly.",
          "/figures/lecture-2/technology-shock-impulse-responses.png",
          "Complementary Lecture 2 slide showing impulse responses to an expansionary technology shock.",
          "Using the lecture screenshot keeps the chart layout and the directional comparisons consistent with the source material.",
        ),
      ],
      citations: [...shockTransmissionCitations, ...lecture2NaturalCitations],
    },
    {
      id: "lecture-2-seminar",
      slug: "guided-seminar-1-walkthrough",
      title: "Guided Seminar 1 walkthrough",
      summary: "How to answer exam-style qualitative questions with a repeatable method.",
      contentBlocks: [
        p(
          "Seminar 1 is useful because it tests whether you can move from equations to qualitative logic. The safest way to answer is to identify the shock, separate actual and natural objects, and explain the adjustment mechanism rather than giving only sign predictions.",
        ),
        workedExample({
          title: "Seminar 1(a): positive technology shock",
          prompt:
            "Suppose the economy starts in steady state and is hit by a temporary positive technology shock. Describe the impact response of **output**, **potential output**, **inflation**, and the **natural rate of interest**.",
          steps: [
            {
              title: "Step 1: start with the flexible-price benchmark",
              markdown:
                "A positive technology shock raises productivity directly, so **natural output $y_t^n$ increases**. That is the cleanest starting point because supply-side capacity has genuinely improved.",
            },
            {
              title: "Step 2: use marginal cost to sign inflation",
              markdown:
                "Higher productivity lowers real marginal cost through $mc_t = w_t - p_t - a_t$, so **inflation falls**.",
            },
            {
              title: "Step 3: compare actual output with potential output",
              markdown:
                "Under sticky prices, the complementary lecture says actual output also rises, but **less than potential output** in the baseline calibration. Therefore **the output gap falls**.",
            },
            {
              title: "Step 4: explain the natural rate",
              markdown:
                "Lecture 2 and the natural-rate note say **$r_t^n$ moves with temporary technology shocks**. In the lecture calibration, it **falls**.",
            },
          ],
        }),
        workedExample({
          title: "Seminar 1(b): inflation rises while the output gap falls",
          prompt:
            "Can one of the three baseline shocks generate **higher inflation** together with a **lower output gap** on its own?",
          steps: [
            {
              title: "Step 1: test the demand shocks",
              markdown:
                "A contractionary monetary or discount-factor shock lowers demand, so both **inflation** and the **output gap** typically fall together. That does **not** give the requested pattern.",
            },
            {
              title: "Step 2: test the technology shock",
              markdown:
                "A positive technology shock can indeed lower the output gap, but it also lowers inflation because marginal cost falls. Again, the pattern does **not** fit.",
            },
            {
              title: "Step 3: state the missing disturbance",
              markdown:
                "The complementary lecture explicitly says a **cost-push shock** is introduced later in the course. That is the natural missing candidate if inflation rises while the output gap falls.",
            },
          ],
        }),
        examTrap(
          "Giving signs without the mechanism",
          "Students often list 'up' and 'down' answers and stop there.",
          "In this course, the mechanism matters. Always say which equation or benchmark object is doing the work: productivity shifts $y_t^n$, the Euler equation shifts demand, the Phillips curve shifts inflation pressure, or the Taylor rule shifts the policy rate.",
        ),
      ],
      citations: [...seminarCitations, ...shockTransmissionCitations],
    },
    {
      id: "lecture-2-traps",
      slug: "common-traps-and-quick-recap",
      title: "Common traps and quick recap",
      summary: "The last pass before you move on to exercises and the quiz.",
      contentBlocks: [
        examTrap(
          "Mixing up actual and natural objects",
          "If you skip the flexible-price benchmark, you will misread many technology-shock questions.",
          "Always keep three columns in your head: actual object, natural object, and gap object.",
        ),
        examTrap(
          "Forgetting the model is forward looking",
          "Students often try to insert lagged inflation into the baseline Lecture 2 NKPC because they are thinking of a later extension.",
          "In this lecture, the baseline system is purely forward looking. Lagged variables return only after adding features such as indexation or habit persistence.",
        ),
        examTrap(
          "Treating the natural rate as fixed",
          "If you hold $r_t^n$ fixed when the lecture says it responds to technology or discount-factor shocks, the Dynamic IS reasoning falls apart.",
          "Use the natural-rate formula and the natural-rate note to remember that $r_t^n$ is a time-varying flexible-price object.",
        ),
        checklist(
          [
            "Be able to write the household block, firm block, and Taylor rule from memory.",
            "Be able to derive $mc_t - mc = (\\sigma + \\phi)\\tilde{y}_t$.",
            "Be able to explain the NKPC from the reset-price problem, not just quote the final equation.",
            "Be able to give qualitative sign logic for monetary, discount-factor, and technology shocks.",
          ],
          "Lecture 2 exam checklist",
        ),
        p(
          "If you can do the checklist above and explain why each step is valid, you already have the right toolkit for Seminar 1, the Lecture 2 quiz, and the first wave of exam-style qualitative questions.",
        ),
      ],
      citations: [...lecture2NaturalCitations, ...shockTransmissionCitations],
    },
  ],
  citations: allLecture2Citations,
};
