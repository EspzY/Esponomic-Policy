import type {
  Citation,
  ModuleDetail,
  NotationEntry,
  PracticeProblem,
  QuizItem,
} from "@/lib/types";

import {
  checklist,
  cite,
  derivation,
  eq,
  examTrap,
  figureNote,
  lectureModule,
  modelMap,
  notationEntry,
  p,
  practiceProblem,
  quizBank,
  shockTrace,
  workedExample,
} from "@/lib/seed-content/builders";

const lecture3Title = "GRA6631_2026_Lecture3.pdf";
const lecture3RecursiveTitle = "recursive_substitution.pdf";
const lecture3MatrixTitle = "Derivation notes: the system in matrix form.pdf";

const lecture4Title = "GRA6631_2026_Lecture4.pdf";
const lecture4OutputGapTitle = "Complementary lecture slides: the output gap";
const lecture4CommitmentTitle = "GRA6631_notes on commitment_Sveen.pdf";
const lecture4DiscretionTitle = "the interest rate under discretion.pdf";

const lecture5Title = "GRA6631_2026_TimeInconsistency_independencev2.pdf";
const lecture5DrechselTitle = "drechsel_political_pressure_shocks.pdf";
const lecture5MercatusTitle =
  "Thomas Drechsel on the Effects of Political Pressure and Identifying Monetary Policy Shocks";

const lecture6Title = "Lecture_forward_guidance_slides.pdf";
const lecture6PuzzleTitle = "Complementary lecture forwardguidance puzzle.pdf";

const lecture7Title = "Leture7 Slope Phillips Curve.pdf";
const lecture8Title = "GRA6631_2026_inequality.pdf";

const lecture3CoreCitations: Citation[] = [
  cite(
    lecture3Title,
    "selected slides",
    "Introduces divine coincidence, the three-equation model, and the benchmark policy problem without a cost-push shock.",
    "lecture",
  ),
  cite(
    lecture3RecursiveTitle,
    "entire note",
    "Shows how recursive substitution rewrites inflation as a discounted sum of expected future output gaps.",
    "derivation_note",
  ),
  cite(
    lecture3MatrixTitle,
    "entire note",
    "Presents the linear system in matrix form and links policy coefficients to determinacy.",
    "derivation_note",
  ),
];

const lecture4CoreCitations: Citation[] = [
  cite(
    lecture4Title,
    "selected slides",
    "Introduces cost-push shocks, the loss function, and optimal monetary policy under trade-offs.",
    "lecture",
  ),
  cite(
    lecture4OutputGapTitle,
    "selected slides",
    "Clarifies the welfare-relevant output gap used in the optimal-policy problem.",
    "complementary_lecture",
  ),
  cite(
    lecture4CommitmentTitle,
    "entire note",
    "Explains commitment and the role of expectations in improving current trade-offs.",
    "derivation_note",
  ),
  cite(
    lecture4DiscretionTitle,
    "entire note",
    "Derives the discretionary interest-rate response and associated targeting logic.",
    "derivation_note",
  ),
];

const lecture5CoreCitations: Citation[] = [
  cite(
    lecture5Title,
    "selected slides",
    "Covers time inconsistency, inflation bias, commitment, and central bank independence.",
    "lecture",
  ),
  cite(
    lecture5DrechselTitle,
    "selected sections",
    "Provides evidence on political pressure and monetary policy decisions.",
    "paper",
  ),
  cite(
    lecture5MercatusTitle,
    "selected discussion",
    "Summarizes the political-pressure identification problem in accessible language.",
    "paper",
  ),
];

const lecture6CoreCitations: Citation[] = [
  cite(
    lecture6Title,
    "selected slides",
    "Introduces the zero lower bound, forward guidance, and the expectations channel.",
    "lecture",
  ),
  cite(
    lecture6PuzzleTitle,
    "selected slides",
    "Explains the difference between Delphic and Odyssean guidance and the forward-guidance puzzle.",
    "complementary_lecture",
  ),
];

const lecture7CoreCitations: Citation[] = [
  cite(
    lecture7Title,
    "selected slides",
    "Covers the historical Phillips curve, the modern NKPC, flattening, and identification issues.",
    "lecture",
  ),
];

const lecture8CoreCitations: Citation[] = [
  cite(
    lecture8Title,
    "selected slides",
    "Introduces heterogeneous-agent macro, the distribution of MPCs, and redistribution channels.",
    "lecture",
  ),
];

const lecture3Module: ModuleDetail = lectureModule({
  id: "lecture-3",
  slug: "lecture-3",
  title: "Lecture 3: Divine Coincidence",
  summary:
    "Why stabilizing inflation also stabilizes the output gap in the benchmark New Keynesian setup.",
  description:
    "This module turns Lecture 3 into a stepwise policy benchmark. It shows why the no-cost-push-shock version of the New Keynesian model removes the inflation-output-gap trade-off, while still requiring systematic policy and a determinate equilibrium.",
  estimatedMinutes: 90,
  tags: ["lecture-3", "divine-coincidence", "nk-model", "policy-rules"],
  objectives: [
    "Explain the benchmark meaning of divine coincidence.",
    "Use the NKPC, Dynamic IS equation, and Taylor rule together.",
    "Understand why the Taylor principle still matters in the benchmark.",
  ],
  sections: [
    {
      id: "lecture-3-big-picture",
      slug: "big-picture-and-exam-relevance",
      title: "Big picture and why this lecture matters",
      summary: "Lecture 3 is the clean benchmark the course later breaks.",
      contentBlocks: [
        p(
          "Lecture 3 asks the first clean policy question in the New Keynesian model: **if the central bank stabilizes inflation in a benchmark economy with no cost-push shock, what happens to the output gap?** The lecture's answer is the famous benchmark result called **divine coincidence**.",
        ),
        p(
          "This lecture matters because later modules are built by breaking its result. Lecture 4 adds cost-push shocks and the trade-off returns. So if you understand Lecture 3 properly, you understand exactly what later lectures are changing.",
        ),
        p(
          "Relative to Lecture 2, what changes here is not the three-equation structure itself but the policy interpretation of that structure. What stays from the benchmark is the role of the Dynamic IS equation, the Phillips curve, and the Taylor principle. What you must carry forward is the ability to ask whether inflation pressure comes only from slack or from an extra wedge as well.",
        ),
      ],
      citations: lecture3CoreCitations,
    },
    {
      id: "lecture-3-notation",
      slug: "notation-and-glossary",
      title: "Notation and glossary",
      summary: "The three-equation objects that organize the benchmark.",
      contentBlocks: [
        eq(
          "New Keynesian Phillips curve",
          "\\pi_t = \\beta E_t\\pi_{t+1} + \\kappa \\tilde{y}_t",
          "Inflation depends on expected future inflation and the output gap when there is no cost-push shock.",
        ),
        eq(
          "Dynamic IS equation",
          "\\tilde{y}_t = E_t\\tilde{y}_{t+1} - \\frac{1}{\\sigma}(i_t - E_t\\pi_{t+1} - r_t^n)",
          "Demand depends on the gap between the actual and natural real rates.",
        ),
        eq(
          "Taylor rule benchmark",
          "i_t = \\rho + \\phi_\\pi \\pi_t + \\phi_y \\tilde{y}_t + v_t",
          "Policy responds systematically to inflation and the output gap.",
        ),
      ],
      citations: lecture3CoreCitations,
    },
    {
      id: "lecture-3-setup",
      slug: "setup-assumptions-and-benchmark",
      title: "Setup, assumptions, and benchmark",
      summary: "The benchmark removes the extra inflation wedge.",
      contentBlocks: [
        p(
          "The lecture keeps the baseline New Keynesian model from Lecture 2 but removes the extra disturbance that would shift inflation independently of slack. That means inflation pressure comes only from expected inflation and the output gap.",
        ),
        checklist(
          [
            "No cost-push shock in the Phillips curve.",
            "Forward-looking households and firms still matter.",
            "Policy must still satisfy a strong-enough Taylor principle to anchor expectations.",
          ],
          "Benchmark ingredients",
        ),
      ],
      citations: lecture3CoreCitations,
    },
    {
      id: "lecture-3-mechanism-a",
      slug: "core-mechanism-a",
      title: "Core mechanism A: why inflation and the gap move together",
      summary: "Without a cost-push shock, inflation only sees slack.",
      contentBlocks: [
        derivation({
          title: "Why zero inflation implies a zero output gap in the benchmark",
          learningGoal:
            "See the exact reason divine coincidence holds in the lecture's benchmark model.",
          latexBefore: "\\pi_t = \\beta E_t\\pi_{t+1} + \\kappa \\tilde{y}_t",
          operation:
            "Ask what must happen if current and expected future inflation are stabilized.",
          whyValid:
            "With no cost-push shock, the output gap is the only remaining source of inflation pressure.",
          latexAfter:
            "\\pi_t = 0 \\text{ and } E_t\\pi_{t+1} = 0 \\Rightarrow \\tilde{y}_t = 0",
          explanation:
            "The lecture's point is that there is no separate inflation-output-gap trade-off in this benchmark. If inflation is stabilized, the output gap is stabilized too.",
        }),
      ],
      citations: lecture3CoreCitations,
    },
    {
      id: "lecture-3-mechanism-b",
      slug: "core-mechanism-b",
      title: "Core mechanism B: why the Dynamic IS equation still matters",
      summary: "The benchmark removes the trade-off, not the transmission mechanism.",
      contentBlocks: [
        p(
          "Even under divine coincidence, the central bank still has to generate the real-rate path that keeps demand aligned with the natural rate. The Dynamic IS equation remains essential because it tells you how policy affects the output gap through the real rate and expectations.",
        ),
        modelMap("Why policy still matters", [
          {
            label: "Natural-rate movements",
            description:
              "Policy must still track changes in $r_t^n$ caused by shocks.",
          },
          {
            label: "Expectations channel",
            description:
              "Because the IS curve is forward looking, expected future policy affects the gap today.",
          },
        ]),
      ],
      citations: lecture3CoreCitations,
    },
    {
      id: "lecture-3-compact",
      slug: "from-detailed-setup-to-the-compact-result",
      title: "From detailed setup to the compact result",
      summary: "The benchmark has no inflation-gap trade-off, but it is still a policy benchmark.",
      contentBlocks: [
        p(
          "The compact result is that **when inflation has no independent cost-push wedge, stabilizing inflation also stabilizes the output gap**. This is a benchmark result about the structure of the policy trade-off, not a claim that policy becomes irrelevant or automatic.",
        ),
        p(
          "Carry this benchmark forward into Lecture 4: the whole point of the next lecture is to show what breaks once inflation is hit by a disturbance that does not come only from the output gap.",
        ),
      ],
      citations: lecture3CoreCitations,
    },
    {
      id: "lecture-3-derivation",
      slug: "step-by-step-derivation-or-mechanism-chain",
      title: "Step by step: recursive substitution and determinacy",
      summary: "The lecture's two key mathematical add-ons.",
      contentBlocks: [
        derivation({
          title: "Recursive substitution turns inflation into a forward sum",
          learningGoal:
            "See why current inflation depends on expected future output gaps, not just today's gap.",
          latexBefore: "\\pi_t = \\beta E_t\\pi_{t+1} + \\kappa \\tilde{y}_t",
          operation:
            "Substitute the one-period-ahead Phillips curve into today's equation repeatedly.",
          whyValid:
            "The same structural equation holds one period ahead, so the future inflation term can be replaced recursively.",
          latexAfter:
            "\\pi_t = \\kappa \\sum_{k=0}^{\\infty} \\beta^k E_t\\tilde{y}_{t+k}",
          explanation:
            "This is the lecture's cleanest statement of why expectations matter: inflation today reflects expected future slack.",
        }),
        derivation({
          title: "The Taylor principle as a determinacy condition",
          learningGoal:
            "Connect policy coefficients to equilibrium stability.",
          operation:
            "Collect the linear system in matrix form and impose the requirement that the stable solution should not explode.",
          whyValid:
            "The matrix note shows that forward-looking systems require sufficiently strong policy feedback to anchor expectations.",
          latexAfter:
            "\\kappa(\\phi_\\pi - 1) + (1-\\beta)\\phi_y > 0",
          explanation:
            "The policy lesson is that divine coincidence still needs a determinate equilibrium. A weak inflation response can still destabilize the benchmark system.",
        }),
      ],
      citations: lecture3CoreCitations,
    },
    {
      id: "lecture-3-analysis",
      slug: "shock-analysis-or-figure-interpretation",
      title: "Shock analysis and policy interpretation",
      summary: "How to explain the benchmark in an exam-style answer.",
      contentBlocks: [
        shockTrace({
          title: "Demand disturbance under divine coincidence",
          shock:
            "A demand disturbance moves the natural real rate and threatens to open an output gap if policy does not respond.",
          steps: [
            {
              variable: "$r_t^n$",
              direction: "moves",
              explanation:
                "The natural rate changes with the disturbance, so the policy rule must track it.",
            },
            {
              variable: "$\\tilde{y}_t$",
              direction: "can stay near zero under good policy",
              explanation:
                "If the central bank aligns the actual real rate with the natural rate, the output gap need not open much.",
            },
            {
              variable: "$\\pi_t$",
              direction: "stays stabilized when the gap stays stabilized",
              explanation:
                "With no cost-push term, stabilizing the gap stabilizes inflation pressure too.",
            },
          ],
        }),
        figureNote({
          title: "Divine coincidence in one benchmark slide",
          caption:
            "Screenshot from Lecture 3 showing the clean benchmark result: strict inflation stabilization implies a closed output gap and an actual rate aligned with the natural rate. Use it as the visual summary of why Lecture 3 is the benchmark later lectures break.",
          imagePath: "/figures/lecture-3/divine-coincidence-benchmark.png",
          altText:
            "Lecture 3 slide stating divine coincidence, with inflation at zero, output equal to natural output, and the policy rate aligned with the natural rate.",
          note:
            "What to notice: the benchmark is not saying policy is irrelevant. It is saying that, in this special setup, stabilizing inflation also stabilizes the output gap.",
        }),
      ],
      citations: lecture3CoreCitations,
    },
    {
      id: "lecture-3-guided",
      slug: "guided-problem-walkthrough",
      title: "Guided problem walkthrough",
      summary: "A benchmark reasoning exercise before trade-offs reappear.",
      contentBlocks: [
        workedExample({
          title: "Why is there no separate trade-off in Lecture 3?",
          prompt:
            "Explain why an inflation-targeting central bank also closes the output gap in the benchmark Lecture 3 model.",
          steps: [
            {
              title: "Step 1: inspect the Phillips curve",
              markdown:
                "Inflation depends on expected inflation and the output gap only. There is no extra inflation wedge.",
            },
            {
              title: "Step 2: impose inflation stabilization",
              markdown:
                "If current and expected future inflation are stabilized, the Phillips curve leaves no room for a persistent output gap.",
            },
            {
              title: "Step 3: interpret carefully",
              markdown:
                "The result is a benchmark about the absence of a trade-off, not about the absence of a transmission mechanism.",
            },
          ],
        }),
      ],
      citations: lecture3CoreCitations,
    },
    {
      id: "lecture-3-traps",
      slug: "common-traps-and-quick-recap",
      title: "Common traps and quick recap",
      summary: "The benchmark is simple, but the usual mistakes still matter.",
      contentBlocks: [
        checklist(
          [
            "Divine coincidence requires no cost-push shock in the benchmark Phillips curve.",
            "The result removes the trade-off, not the IS block or the need for policy discipline.",
            "The Taylor principle still matters because the equilibrium must be determinate.",
            "Carry forward: later lectures are easiest if you keep asking what exact assumption broke the benchmark.",
          ],
          "Quick recap",
        ),
        examTrap(
          "Treating divine coincidence as a universal law",
          "Students often answer later policy questions as if stabilizing inflation must always stabilize the output gap too.",
          "State the benchmark condition explicitly: divine coincidence only holds when the Phillips curve has no independent cost-push wedge. Lecture 4 is about what happens when that assumption fails.",
        ),
      ],
      citations: lecture3CoreCitations,
    },
  ],
  citations: lecture3CoreCitations,
});

const lecture4Module: ModuleDetail = lectureModule({
  id: "lecture-4",
  slug: "lecture-4",
  title: "Lecture 4: Optimal Monetary Policy",
  summary:
    "How cost-push shocks destroy divine coincidence and force a real inflation-gap trade-off.",
  description:
    "This module rebuilds Lecture 4 around the moment the benchmark breaks. Once a cost-push shock enters the Phillips curve, inflation and the output gap can no longer be stabilized simultaneously. The module explains the welfare-relevant output gap, the quadratic loss function, discretion versus commitment, and the targeting rules that summarize optimal policy.",
  estimatedMinutes: 100,
  tags: ["lecture-4", "optimal-policy", "cost-push-shocks", "commitment"],
  objectives: [
    "Explain why divine coincidence fails once a cost-push shock appears.",
    "Use the welfare-relevant output gap and loss function correctly.",
    "Distinguish discretion from commitment and interpret the targeting rules.",
  ],
  sections: [
    {
      id: "lecture-4-big-picture",
      slug: "big-picture-and-exam-relevance",
      title: "Big picture and why this lecture matters",
      summary: "This is where the course turns from a benchmark to a real trade-off.",
      contentBlocks: [
        p(
          "Lecture 4 matters because it is the first point in the course where the central bank cannot get everything it wants at the same time. Once a **cost-push shock** shifts inflation directly, lowering inflation quickly usually requires creating a negative welfare-relevant output gap.",
        ),
        p(
          "This is why the lecture introduces loss functions, targeting rules, discretion, and commitment. These are the tools the course uses from this point onward whenever policy has to manage conflicting objectives.",
        ),
        p(
          "Relative to Lecture 3, what changes is that inflation now has a wedge of its own. What stays is the New Keynesian structure and the need to think systematically about policy. What you must carry forward is that the policy problem is no longer 'stabilize one thing and get the other for free' but 'choose how to trade costly margins against each other.'",
        ),
      ],
      citations: lecture4CoreCitations,
    },
    {
      id: "lecture-4-notation",
      slug: "notation-and-glossary",
      title: "Notation and glossary",
      summary: "The objects that organize the optimal-policy problem.",
      contentBlocks: [
        eq(
          "Welfare-relevant output gap",
          "x_t = y_t - y_t^e",
          "Lecture 4 is careful that the policy problem is written in terms of the gap between actual output and the efficient level of output, not just any empirical output-gap measure.",
        ),
        eq(
          "Gap decomposition",
          "\\tilde{y}_t = y_t - y_t^n = x_t + (y_t^e - y_t^n)",
          "This decomposition explains why the welfare-relevant gap and the flexible-price natural-output gap are not always the same object once distortions matter.",
        ),
        eq(
          "Phillips curve with cost-push shock",
          "\\pi_t = \\beta E_t\\pi_{t+1} + \\kappa x_t + u_t^{\\pi}",
          "Inflation now contains an extra wedge, so zero inflation no longer implies a zero gap.",
        ),
        eq(
          "Quadratic loss function",
          "L_t = \\pi_t^2 + \\alpha_x x_t^2",
          "The central bank dislikes both inflation misses and welfare-gap misses.",
        ),
        eq(
          "Discretionary targeting rule",
          "x_t = -\\frac{\\kappa}{\\alpha_x}\\pi_t",
          "The compact rule summarizing the inflation-gap trade-off under discretion.",
        ),
      ],
      citations: lecture4CoreCitations,
    },
    {
      id: "lecture-4-setup",
      slug: "setup-assumptions-and-benchmark",
      title: "Setup, assumptions, and benchmark",
      summary: "A linear-quadratic policy problem replaces the no-trade-off benchmark.",
      contentBlocks: [
        p(
          "The lecture keeps the New Keynesian structure but adds a disturbance that moves inflation independently of the gap. That means the central bank must minimize a quadratic loss function subject to a Phillips-curve trade-off rather than simply stabilizing one variable and getting the other for free.",
        ),
        p(
          "A key conceptual upgrade relative to Lecture 3 is that output now comes in **three versions**. $y_t$ is actual output. $y_t^n$ is the natural output level in the flexible-price benchmark. $y_t^e$ is the efficient output level relevant for welfare. Lecture 4's policy problem is about $x_t = y_t - y_t^e$, because the welfare loss should be measured against the efficient benchmark, not against a benchmark that may still contain distortions.",
        ),
        p(
          "The lecture also links the slope of the Phillips curve to price flexibility. A smaller Calvo parameter $\\theta$ means prices are more flexible, which raises $\\kappa$. When $\\kappa$ is larger, a given movement in the welfare-relevant output gap has a bigger effect on inflation, so the trade-off becomes less painful for the policymaker.",
        ),
        checklist(
          [
            "$x_t$ is the welfare-relevant output gap.",
            "$u_t^{\\pi}$ is the extra inflation wedge that breaks divine coincidence.",
            "$\\alpha_x$ governs how costly it is to move the gap in order to lower inflation.",
          ],
          "The policy ingredients",
        ),
      ],
      citations: lecture4CoreCitations,
    },
    {
      id: "lecture-4-mechanism-a",
      slug: "core-mechanism-a",
      title: "Core mechanism A: why cost-push shocks break the benchmark",
      summary: "Inflation can now move for reasons other than the gap itself.",
      contentBlocks: [
        p(
          "With a positive cost-push shock, inflation can be above target even when the welfare-relevant output gap is zero. That is the exact reason divine coincidence fails: the central bank can no longer remove inflation pressure without also deciding how much real slack to create.",
        ),
        shockTrace({
          title: "Positive cost-push shock",
          shock:
            "A positive cost-push shock raises inflation directly through the Phillips curve.",
          steps: [
            {
              variable: "$\\pi_t$",
              direction: "up",
              explanation:
                "Inflation rises because the shock enters directly, not because the gap necessarily rose first.",
            },
            {
              variable: "$x_t$",
              direction: "typically pushed down by policy",
              explanation:
                "To offset inflation, the policymaker usually creates a negative welfare-relevant output gap.",
            },
            {
              variable: "Loss",
              direction: "up on both margins",
              explanation:
                "Inflation is costly, but so is moving the gap away from zero. That is the trade-off.",
            },
          ],
        }),
      ],
      citations: lecture4CoreCitations,
    },
    {
      id: "lecture-4-mechanism-b",
      slug: "core-mechanism-b",
      title: "Core mechanism B: discretion versus commitment",
      summary: "Why promised future policy changes the current trade-off.",
      contentBlocks: [
        p(
          "Under discretion, the central bank reoptimizes each period and cannot commit future policymakers to a promised path. Under commitment, credible promises about future policy shape private expectations today, which improves the current inflation-output trade-off because the Phillips curve is forward looking.",
        ),
        p(
          "The lecture distinguishes **three policy frameworks**. Under **discretion**, the central bank takes future expectations as given and solves period by period. Under **commitment to a simple targeting rule**, the central bank chooses a rule that is tougher on inflation than discretion because private agents internalize the promised future response. Under **full state-contingent commitment**, policy is not restricted to one simple rule; instead, the central bank chooses the entire contingent path and exploits history dependence much more fully.",
        ),
        p(
          "That is why the lecture keeps coming back to credibility. Commitment is valuable precisely because current inflation depends on expected future output gaps. A credible promise to keep demand weak in the future lowers inflation today, so the central bank can improve today's trade-off without engineering as large an immediate contraction as under discretion.",
        ),
        modelMap("Why commitment helps", [
          {
            label: "Expectations",
            description:
              "Expected future policy affects current inflation pressure.",
          },
          {
            label: "Intertemporal smoothing",
            description:
              "Commitment lets the central bank spread adjustment over time rather than doing everything today.",
          },
          {
            label: "History dependence",
            description:
              "Under full commitment, the central bank deliberately lets today's promises affect tomorrow's policy path, which is exactly the opposite of discretion's period-by-period reset.",
          },
        ]),
      ],
      citations: lecture4CoreCitations,
    },
    {
      id: "lecture-4-compact",
      slug: "from-detailed-setup-to-the-compact-result",
      title: "From detailed setup to the compact result",
      summary: "Targeting rules summarize the optimal trade-off.",
      contentBlocks: [
        p(
          "The lecture's compact takeaway is that optimal policy can be summarized by targeting rules linking inflation and the welfare-relevant output gap. Under discretion, the central bank chooses a gap that moves against inflation rather than trying to eliminate both at once.",
        ),
        p(
          "Carry this forward into Lectures 5 and 6: once trade-offs exist, credibility and expectations become even more important because current outcomes depend on how private agents think policy will behave over time.",
        ),
      ],
      citations: lecture4CoreCitations,
    },
    {
      id: "lecture-4-derivation",
      slug: "step-by-step-derivation-or-mechanism-chain",
      title: "Step by step: where the targeting rule comes from",
      summary: "A spoon-fed route from the loss function to the policy trade-off.",
      contentBlocks: [
        derivation({
          title: "Write the objective and the constraint together",
          learningGoal:
            "Start the optimization problem in the correct place instead of memorizing the final rule.",
          latexBefore:
            "L_t = \\pi_t^2 + \\alpha_x x_t^2 \\quad \\text{subject to} \\quad \\pi_t = \\beta E_t\\pi_{t+1} + \\kappa x_t + u_t^{\\pi}",
          operation:
            "Treat inflation and the gap as jointly chosen through the Phillips curve constraint.",
          whyValid:
            "This is the linear-quadratic structure laid out in the lecture.",
          latexAfter:
            "\\text{Optimal policy balances the marginal cost of inflation against the marginal cost of moving } x_t.",
          explanation:
            "The loss function tells you what the policymaker dislikes; the Phillips curve tells you what trade-off the economy allows.",
        }),
        derivation({
          title: "Read the discretionary first-order condition economically",
          learningGoal:
            "Understand why the optimal gap moves against inflation after a cost-push shock.",
          operation:
            "Differentiate the loss and set marginal benefit equal to marginal cost in the discretionary problem.",
          whyValid:
            "Under discretion, the central bank takes future expectations as given in the current period.",
          latexAfter: "x_t = -\\frac{\\kappa}{\\alpha_x}\\pi_t",
          explanation:
            "The targeting rule says inflation and the welfare-relevant gap move in opposite directions. The stronger inflation responds to slack, or the less costly slack is in the loss function, the more the central bank is willing to contract activity.",
        }),
        derivation({
          title: "Why commitment to a simple rule is tougher than discretion",
          learningGoal:
            "Understand the lecture's result that credibility changes the effective trade-off parameter rather than merely changing rhetoric.",
          operation:
            "Keep the same functional form as under discretion, but allow the central bank to commit before expectations are formed. The future path of policy is now part of the optimization problem.",
          whyValid:
            "The commitment note shows that the optimal simple-rule commitment behaves as if the policymaker places a smaller effective weight on the output gap because future promises help reduce current inflation.",
          latexAfter:
            "x_t = -\\frac{\\kappa}{\\alpha_x^c}\\pi_t, \\qquad \\alpha_x^c = \\alpha_x(1-\\beta\\rho_\\pi) < \\alpha_x",
          explanation:
            "The rule keeps the same sign pattern as under discretion, but commitment fights inflation more aggressively. The important intuition is not the algebra alone; it is that credibility makes current inflation easier to stabilize because the private sector believes the future policy path.",
        }),
      ],
      citations: lecture4CoreCitations,
    },
    {
      id: "lecture-4-analysis",
      slug: "shock-analysis-or-figure-interpretation",
      title: "Shock analysis and figure interpretation",
      summary: "How to explain the difference between discretion and commitment.",
      contentBlocks: [
        p(
          "The safest summary is that **commitment works through expectations**. It does not remove the cost-push shock, but it changes private beliefs about future policy and therefore makes current inflation easier to stabilize with a different current gap path than under discretion.",
        ),
        p(
          "The full state-contingent commitment result is even more specific. After a transitory cost-push shock, the optimal plan keeps the output gap negative **until the price level returns to its pre-shock path**. That means inflation first rises, then undershoots, and the output gap stays mildly negative for longer than under discretion. The lecture interprets this as a form of **history dependence** or price-level targeting.",
        ),
        figureNote({
          title: "Discretionary targeting rule and trade-off geometry",
          caption:
            "Screenshot from Lecture 4 highlighting the discretionary optimality condition. This visual is useful because it makes the inflation-gap trade-off concrete instead of leaving the targeting rule as an abstract formula.",
          imagePath: "/figures/lecture-4/discretionary-targeting-rule.png",
          altText:
            "Lecture 4 slide showing the discretionary optimality condition x_t = -(kappa/alpha_x) pi_t and explaining why inflation and the welfare-relevant output gap take opposite signs.",
          note:
            "What to notice: once a cost-push shock exists, the policymaker is not trying to make both inflation and the gap zero. The target rule tells you how the trade-off is optimally managed under discretion.",
        }),
        p(
          "A good oral or written interpretation is therefore: discretion gives a sharp initial contraction because each period is solved in isolation; commitment gives a milder but more persistent contraction because the central bank can promise to stay tough in the future and thereby lower current inflation pressure already today.",
        ),
      ],
      citations: lecture4CoreCitations,
    },
    {
      id: "lecture-4-guided",
      slug: "guided-problem-walkthrough",
      title: "Guided problem walkthrough",
      summary: "A Seminar 2-style trade-off question.",
      contentBlocks: [
        workedExample({
          title: "Why does a cost-push shock reintroduce the trade-off?",
          prompt:
            "Explain why a positive cost-push shock prevents the central bank from keeping inflation at target and the welfare-relevant output gap at zero at the same time.",
          steps: [
            {
              title: "Step 1: inspect the Phillips curve",
              markdown:
                "Inflation now includes $u_t^{\\pi}$, so inflation can be high even when the gap is zero.",
            },
            {
              title: "Step 2: describe the policy response",
              markdown:
                "To lower inflation, the central bank typically needs to push the welfare-relevant output gap downward.",
            },
            {
              title: "Step 3: state the policy trade-off",
              markdown:
                "Inflation and real stabilization cannot both be perfect because the cost-push shock drives a wedge between them.",
            },
            {
              title: "Step 4: add the commitment comparison",
              markdown:
                "Under commitment, the central bank can promise future tightness and thereby lower current inflation more cheaply. So the same shock does not imply the same path under discretion and commitment.",
            },
          ],
        }),
      ],
      citations: lecture4CoreCitations,
    },
    {
      id: "lecture-4-traps",
      slug: "common-traps-and-quick-recap",
      title: "Common traps and quick recap",
      summary: "The usual mistakes around welfare gaps and targeting rules.",
      contentBlocks: [
        checklist(
          [
            "Once $u_t^{\\pi}$ appears, divine coincidence is gone.",
            "$x_t$ is the welfare-relevant output gap used in the policy problem.",
            "$x_t$ need not be the same thing as $y_t-y_t^n$; Lecture 4 distinguishes the efficient level of output from the natural one.",
            "Targeting rules summarize optimal trade-offs; they are not primitive structural equations.",
            "Commitment matters because it changes expectations.",
            "A larger $\\kappa$ means policy can move inflation more with less output-gap sacrifice, so more flexible prices improve the trade-off.",
            "Carry forward: later lectures on credibility and forward guidance only make sense if you already see why expectations help manage today's trade-off.",
          ],
          "Quick recap",
        ),
        examTrap(
          "Thinking the central bank can still close both gaps at once",
          "Students often keep using the Lecture 3 benchmark logic after a cost-push shock has already entered the Phillips curve.",
          "Stop and ask whether inflation now has an independent wedge. If it does, perfect inflation stabilization and a zero welfare-relevant output gap are no longer jointly feasible in the benchmark policy problem.",
        ),
      ],
      citations: lecture4CoreCitations,
    },
  ],
  citations: lecture4CoreCitations,
});

const lecture5Module: ModuleDetail = lectureModule({
  id: "lecture-5",
  slug: "lecture-5",
  title: "Lecture 5: Time Inconsistency and Central Bank Independence",
  summary:
    "Why discretionary policymakers create inflation bias and why institutional design matters for credibility.",
  description:
    "This module turns the time-inconsistency lecture into a learnable incentives problem. It shows how a policymaker who wants output above the natural rate ends up creating inflation bias under discretion, why commitment removes that bias, and why central bank independence is treated as a practical credibility device.",
  estimatedMinutes: 95,
  tags: ["lecture-5", "time-inconsistency", "inflation-bias", "central-bank-independence"],
  objectives: [
    "Explain inflation bias in the classic time-inconsistency setup.",
    "Show why commitment removes the bias while discretion does not.",
    "Connect central bank independence to the broader credibility problem.",
  ],
  sections: [
    {
      id: "lecture-5-big-picture",
      slug: "big-picture-and-exam-relevance",
      title: "Big picture and why this lecture matters",
      summary: "Lecture 5 makes credibility into a formal incentive problem.",
      contentBlocks: [
        p(
          "Lecture 5 strips the commitment problem down to its core: **what if policymakers would like output above the natural level, but private agents understand that incentive?** Then discretion produces an equilibrium with too much inflation and no lasting real gain. That is the classic inflation-bias result.",
        ),
        p(
          "This lecture matters because it explains why credibility is not just a communication issue. It is an incentive problem. That is also why central bank independence is discussed here: it is meant to make short-run political pressure less able to distort long-run monetary-policy goals.",
        ),
        p(
          "Relative to Lecture 4, what changes is that the focus shifts from a technical stabilization trade-off to the policymaker's own incentive problem. What stays is the importance of expectations. What you must carry forward is that policy design is not only about which rule is optimal, but also about whether private agents believe policymakers will stick to it.",
        ),
      ],
      citations: lecture5CoreCitations,
    },
    {
      id: "lecture-5-notation",
      slug: "notation-and-glossary",
      title: "Notation and glossary",
      summary: "The symbols carrying the inflation-bias logic.",
      contentBlocks: [
        eq(
          "Loss function",
          "L = (\\pi - \\pi^*)^2 + a(y - y^*)^2",
          "The policymaker dislikes inflation misses and output misses relative to a desired target.",
        ),
        eq(
          "Short-run Phillips curve",
          "y - y^n = b(\\pi - \\pi^e)",
          "Unexpected inflation can temporarily push output above the natural level.",
        ),
        eq(
          "Inflation-bias formula",
          "\\pi = \\pi^* + ab(y^* - y^n)",
          "Under discretion, equilibrium inflation rises above target when the policymaker wants output above the natural level.",
        ),
      ],
      citations: lecture5CoreCitations,
    },
    {
      id: "lecture-5-setup",
      slug: "setup-assumptions-and-benchmark",
      title: "Setup, assumptions, and benchmark",
      summary: "The temptation appears because the desired output target exceeds the natural level.",
      contentBlocks: [
        p(
          "The benchmark assumption is that the policymaker wants output above the natural level, so $y^* > y^n$. Given that target gap, surprise inflation looks attractive in the short run because the Phillips curve temporarily pushes output upward when inflation exceeds what private agents expected.",
        ),
        p(
          "But private agents are rational. If they know the policymaker has that temptation, they build it into expected inflation. The result is higher equilibrium inflation without a permanent output gain.",
        ),
      ],
      citations: lecture5CoreCitations,
    },
    {
      id: "lecture-5-mechanism-a",
      slug: "core-mechanism-a",
      title: "Core mechanism A: why discretion creates inflation bias",
      summary: "Short-run temptation becomes a long-run equilibrium distortion.",
      contentBlocks: [
        shockTrace({
          title: "Inflation-bias logic under discretion",
          shock:
            "There is no external shock here. The distortion comes from the policymaker's incentive itself.",
          steps: [
            {
              variable: "Expected inflation",
              direction: "up",
              explanation:
                "Private agents anticipate that discretionary policymakers want surprise inflation.",
            },
            {
              variable: "Actual inflation",
              direction: "up",
              explanation:
                "The policymaker still inflates in equilibrium, but the surprise element is gone.",
            },
            {
              variable: "Output relative to $y^n$",
              direction: "returns to zero on average",
              explanation:
                "The long-run output gain disappears once expectations adjust.",
            },
          ],
        }),
      ],
      citations: lecture5CoreCitations,
    },
    {
      id: "lecture-5-mechanism-b",
      slug: "core-mechanism-b",
      title: "Core mechanism B: why commitment and independence matter",
      summary: "Institutional design as a credibility technology.",
      contentBlocks: [
        p(
          "Commitment removes the inflation-bias problem because the policymaker can announce and stick to a low-inflation plan before expectations are formed. Central bank independence is introduced as a practical institutional device meant to mimic that discipline by reducing short-run political pressure.",
        ),
        modelMap("Two routes to credibility", [
          {
            label: "Commitment in theory",
            description:
              "A promise about future low inflation is believed before expectations are set.",
          },
          {
            label: "Independence in institutions",
            description:
              "Mandates and insulation from politics make it harder to exploit short-run temptations.",
          },
        ]),
      ],
      citations: lecture5CoreCitations,
    },
    {
      id: "lecture-5-compact",
      slug: "from-detailed-setup-to-the-compact-result",
      title: "From detailed setup to the compact result",
      summary: "The lecture's headline result in one line.",
      contentBlocks: [
        p(
          "The compact takeaway is that **if policymakers want output above the natural level and cannot commit, rational expectations generate inflation bias**. Commitment or institutions that mimic commitment can remove that bias by making low inflation credible in advance.",
        ),
        p(
          "Carry this forward into Lecture 6: once expectations are central to credibility, promises about future policy can become a stabilization tool in their own right when the current rate is constrained.",
        ),
      ],
      citations: lecture5CoreCitations,
    },
    {
      id: "lecture-5-derivation",
      slug: "step-by-step-derivation-or-mechanism-chain",
      title: "Step by step: deriving the inflation bias",
      summary: "The short algebra hides a deep incentives result.",
      contentBlocks: [
        derivation({
          title: "Combine the loss function and Phillips curve",
          learningGoal:
            "See where the temptation to inflate comes from in one optimization problem.",
          latexBefore:
            "L = (\\pi - \\pi^*)^2 + a(y - y^*)^2, \\quad y - y^n = b(\\pi - \\pi^e)",
          operation:
            "Substitute the Phillips curve into the loss function so that output depends on inflation surprises.",
          whyValid:
            "The short-run Phillips curve is the constraint linking inflation choices to output outcomes.",
          latexAfter:
            "L = (\\pi - \\pi^*)^2 + a\\bigl(y^n + b(\\pi - \\pi^e) - y^*\\bigr)^2",
          explanation:
            "This is the point where the policymaker's short-run temptation becomes explicit.",
        }),
        derivation({
          title: "Impose rational expectations in equilibrium",
          learningGoal:
            "Understand why the short-run temptation becomes a long-run inflation bias instead of a lasting output gain.",
          operation:
            "Optimize with respect to inflation, then set expected inflation equal to actual inflation in equilibrium.",
          whyValid:
            "Rational private agents correctly anticipate the policymaker's discretionary incentive.",
          latexAfter: "\\pi = \\pi^* + ab(y^* - y^n)",
          explanation:
            "The equilibrium contains excess inflation but no permanent output bonus. That is the inflation-bias result.",
        }),
      ],
      citations: lecture5CoreCitations,
    },
    {
      id: "lecture-5-analysis",
      slug: "shock-analysis-or-figure-interpretation",
      title: "Policy analysis and institutional interpretation",
      summary: "How to talk about independence without becoming vague.",
      contentBlocks: [
        p(
          "The right interpretation of central bank independence is not simply 'independence is good'. The sharper claim is that independence can improve welfare when it reduces short-run political pressure that would otherwise push policy away from its long-run inflation objective.",
        ),
        figureNote({
          title: "Political pressure and monetary policy",
          caption:
            "Screenshot from the Drechsel material showing how political pressure is associated with persistent shifts in macro and policy outcomes. It helps students see that credibility problems are not only theoretical; they also have empirical fingerprints.",
          imagePath: "/figures/lecture-5/political-pressure-impulse-responses.png",
          altText:
            "Figure from the Drechsel material showing impulse-response style panels for presidential interactions, the T-bill rate, GDP deflator, real GDP, spending, deficit ratio, and newspaper coverage after political pressure shocks.",
          note:
            "What to notice: the figure does not prove every institutional claim on its own, but it gives the lecture's incentives story an empirical anchor.",
        }),
      ],
      citations: lecture5CoreCitations,
    },
    {
      id: "lecture-5-guided",
      slug: "guided-problem-walkthrough",
      title: "Guided problem walkthrough",
      summary: "A classic inflation-bias question, made explicit.",
      contentBlocks: [
        workedExample({
          title: "Why is inflation high without a permanent output gain?",
          prompt:
            "Explain why equilibrium inflation ends up above target under discretion even though output does not stay permanently above the natural level.",
          steps: [
            {
              title: "Step 1: identify the temptation",
              markdown:
                "Given fixed expectations, surprise inflation can raise output temporarily through the Phillips curve.",
            },
            {
              title: "Step 2: impose rational expectations",
              markdown:
                "Private agents anticipate that temptation and raise expected inflation before policy acts.",
            },
            {
              title: "Step 3: state the equilibrium result",
              markdown:
                "Inflation ends up too high, but the output gain disappears once the surprise element is gone.",
            },
          ],
        }),
      ],
      citations: lecture5CoreCitations,
    },
    {
      id: "lecture-5-traps",
      slug: "common-traps-and-quick-recap",
      title: "Common traps and quick recap",
      summary: "The mistakes that blur incentives and equilibrium.",
      contentBlocks: [
        checklist(
          [
            "Inflation bias is an equilibrium outcome under discretion and rational expectations.",
            "The bias disappears if $y^* = y^n$.",
            "Commitment and independence matter because they change credibility and incentives.",
            "Carry forward: from here on, expectations are not just a forecasting detail but part of the policy problem itself.",
          ],
          "Quick recap",
        ),
        examTrap(
          "Talking as if policymakers can fool people forever",
          "Students sometimes explain inflation bias as if the policymaker repeatedly surprises households with inflation year after year.",
          "Impose rational expectations. The whole point of the lecture is that private agents learn the policymaker's incentive, so equilibrium inflation rises while the output gain disappears.",
        ),
      ],
      citations: lecture5CoreCitations,
    },
  ],
  citations: lecture5CoreCitations,
});

const lecture6Module: ModuleDetail = lectureModule({
  id: "lecture-6",
  slug: "lecture-6",
  title: "Lecture 6: Forward Guidance and Unconventional Monetary Policy",
  summary:
    "How the zero lower bound turns promises about future policy into a current stabilization tool.",
  description:
    "This module translates the forward-guidance lecture into a structured learning path. It explains why the zero lower bound makes future policy promises powerful today, distinguishes Delphic from Odyssean guidance, and shows why the textbook model can overstate the effect of distant promises.",
  estimatedMinutes: 95,
  tags: ["lecture-6", "forward-guidance", "zlb", "unconventional-policy"],
  objectives: [
    "Explain why forward guidance works through expected future real rates.",
    "Distinguish Delphic from Odyssean guidance clearly.",
    "Understand the forward-guidance puzzle without rejecting the basic mechanism.",
  ],
  sections: [
    {
      id: "lecture-6-big-picture",
      slug: "big-picture-and-exam-relevance",
      title: "Big picture and why this lecture matters",
      summary: "Lecture 6 asks what policy can do when the current rate is constrained.",
      contentBlocks: [
        p(
          "At the zero lower bound, conventional rate cuts are limited. That does **not** make policy powerless. It means the transmission mechanism shifts toward the **expected future path** of rates. Lecture 6 is therefore where expectations management becomes a central policy tool rather than a side comment.",
        ),
        p(
          "Relative to Lectures 4 and 5, what changes here is that credibility is no longer only about long-run inflation discipline. It becomes a direct stabilization instrument. What stays is the role of expectations. What you must carry forward is that the Dynamic IS equation is the backbone of the whole lecture: without that equation, Delphic and Odyssean labels are just words.",
        ),
      ],
      citations: lecture6CoreCitations,
    },
    {
      id: "lecture-6-notation",
      slug: "notation-and-glossary",
      title: "Notation and glossary",
      summary: "The few objects that organize the whole lecture.",
      contentBlocks: [
        eq(
          "Dynamic IS equation",
          "\\tilde{y}_t = E_t\\tilde{y}_{t+1} - \\frac{1}{\\sigma}(i_t - E_t\\pi_{t+1} - r_t^n)",
          "This is the key equation for forward guidance because current demand depends on expected future real-rate conditions.",
        ),
        eq(
          "Zero lower bound benchmark",
          "i_t \\geq 0",
          "The constraint limiting how far the current nominal rate can be cut.",
        ),
        modelMap("The labels students mix up", [
          {
            label: "Delphic guidance",
            description:
              "Information about the future state of the economy rather than a pure promise about future policy.",
          },
          {
            label: "Odyssean guidance",
            description:
              "A credible commitment to a future policy path designed to affect current expectations.",
          },
          {
            label: "Forward-guidance puzzle",
            description:
              "The benchmark model's tendency to predict very large current effects from small future promises.",
          },
        ]),
      ],
      citations: lecture6CoreCitations,
    },
    {
      id: "lecture-6-setup",
      slug: "setup-assumptions-and-benchmark",
      title: "Setup, assumptions, and benchmark",
      summary: "A demand slump with the current rate constrained.",
      contentBlocks: [
        p(
          "The lecture's benchmark is a severe demand shortfall in which the central bank would like to cut the rate further, but cannot do so much today because of the zero lower bound. In that environment, policy works mainly by changing what households and firms expect future policy to be.",
        ),
      ],
      citations: lecture6CoreCitations,
    },
    {
      id: "lecture-6-mechanism-a",
      slug: "core-mechanism-a",
      title: "Core mechanism A: how future rates affect current demand",
      summary: "The expectations channel in plain English.",
      contentBlocks: [
        derivation({
          title: "Why future policy matters today",
          learningGoal:
            "Translate the Dynamic IS equation into the verbal logic of forward guidance.",
          latexBefore:
            "\\tilde{y}_t = E_t\\tilde{y}_{t+1} - \\frac{1}{\\sigma}(i_t - E_t\\pi_{t+1} - r_t^n)",
          operation:
            "Interpret the real-rate term and remember that spending decisions are forward looking.",
          whyValid:
            "Households compare spending now with spending later, so expected future policy changes alter current incentives.",
          latexAfter:
            "\\text{Expected lower future real rates} \\Rightarrow \\text{stronger current demand}",
          explanation:
            "That is the core mechanism of forward guidance. The lecture's labels only make sense once this channel is understood.",
        }),
      ],
      citations: lecture6CoreCitations,
    },
    {
      id: "lecture-6-mechanism-b",
      slug: "core-mechanism-b",
      title: "Core mechanism B: Delphic versus Odyssean guidance",
      summary: "Same words about future rates, different economic content.",
      contentBlocks: [
        p(
          "Delphic guidance tells markets something about the outlook: rates will be low because the economy will be weak. Odyssean guidance tells markets something about policy commitment: rates will be kept lower for longer to support the economy. The same sentence about future low rates can therefore mean bad news, good stabilization news, or some mix of both.",
        ),
        p(
          "The lecture is explicit that **Delphic guidance is forecast without commitment**, while **Odyssean guidance is commitment**. That distinction matters because only Odyssean guidance is the clean continuation of Lecture 4's commitment logic: a credible promise about future policy changes private expectations today.",
        ),
        p(
          "The lower bound is what makes the distinction central. In normal times the central bank can cut the current rate directly. At the lower bound it cannot cut enough, so it tries to stabilize the economy by changing the expected future path of policy instead. This is why the lecture says there is **no divine coincidence once the lower bound binds**.",
        ),
      ],
      citations: lecture6CoreCitations,
    },
    {
      id: "lecture-6-compact",
      slug: "from-detailed-setup-to-the-compact-result",
      title: "From detailed setup to the compact result",
      summary: "The lecture's main policy takeaway.",
      contentBlocks: [
        p(
          "The compact result is that **when the current policy rate is constrained, promises about future policy become a current policy instrument**. A credible commitment to keep future rates lower can stimulate demand today by lowering the expected path of real rates.",
        ),
        p(
          "Carry this forward into Lecture 7: once policy increasingly works through expectations, it becomes even more important to know how strongly inflation actually reacts to slack.",
        ),
      ],
      citations: lecture6CoreCitations,
    },
    {
      id: "lecture-6-derivation",
      slug: "step-by-step-derivation-or-mechanism-chain",
      title: "Step by step: the forward-guidance puzzle",
      summary: "Why the benchmark model can produce unrealistically strong effects.",
      contentBlocks: [
        derivation({
          title: "Why distant promises matter in the benchmark model",
          learningGoal:
            "Understand the source of the puzzle before criticizing the model.",
          operation:
            "Iterate the Dynamic IS logic forward. Current demand depends on an expected sequence of future real rates, not only the current one.",
          whyValid:
            "The representative-agent, forward-looking benchmark gives a strong role to intertemporal substitution.",
          latexAfter:
            "\\tilde{y}_t \\text{ depends on an expected path of future real rates.}",
          explanation:
            "The puzzle is not that forward guidance works. The puzzle is that the simplest textbook model can make it work *too much*, especially for promises far in the future.",
        }),
      ],
      citations: lecture6CoreCitations,
    },
    {
      id: "lecture-6-analysis",
      slug: "shock-analysis-or-figure-interpretation",
      title: "Policy analysis and figure interpretation",
      summary: "How to read a forward-guidance experiment.",
      contentBlocks: [
        shockTrace({
          title: "Odyssean guidance at the zero lower bound",
          shock:
            "The central bank promises to keep future rates lower for longer than markets previously expected.",
          steps: [
            {
              variable: "Expected future real rates",
              direction: "down",
              explanation:
                "The promise changes the rate path households and firms use in current spending decisions.",
            },
            {
              variable: "Current demand",
              direction: "up",
              explanation:
                "Through the Dynamic IS equation, lower expected future real rates support current expenditure.",
            },
            {
              variable: "Inflation pressure",
              direction: "up relative to the trap baseline",
              explanation:
                "Stronger demand reduces deflationary pressure and helps the economy move away from the trap.",
            },
          ],
        }),
        p(
          "The safe interpretation is therefore two-step. First, forward guidance uses the same expectations channel as optimal policy under commitment. Second, the lower bound is what makes the channel quantitatively central, because the current instrument can no longer do all the stabilization work by itself.",
        ),
        figureNote({
          title: "Forward-guidance experiment",
          caption:
            "Screenshot from the complementary forward-guidance puzzle deck showing how different promise horizons move output, inflation, the policy rate, and the real rate in the standard three-equation model.",
          imagePath: "/figures/lecture-6/forward-guidance-baseline-model.png",
          altText:
            "Complementary Lecture 6 figure with four panels for output, inflation, policy rate, and real interest rate under forward-guidance horizons T=0, 2, 4, and 8.",
          note:
            "What to notice: the whole figure is a visual version of the Dynamic IS mechanism. A future promise changes current demand because households react to the expected path of real rates, not only the current short rate.",
        }),
        p(
          "The complementary puzzle deck adds the crucial caveat: the benchmark model gets the **direction** right but often exaggerates the **magnitude**. Without discounting, distant future promises can move current output implausibly strongly. Discounting, cognitive inattention, and incomplete markets are all presented as ways to push the model toward more realistic quantitative effects.",
        ),
      ],
      citations: lecture6CoreCitations,
    },
    {
      id: "lecture-6-guided",
      slug: "guided-problem-walkthrough",
      title: "Guided problem walkthrough",
      summary: "A Seminar 2-style distinction between information and commitment.",
      contentBlocks: [
        workedExample({
          title: "Is the announcement good news or bad news?",
          prompt:
            "Suppose the central bank announces that rates will stay low for longer than markets expected. Explain how to tell whether this is Delphic or Odyssean guidance, and why the macro interpretation changes.",
          steps: [
            {
              title: "Step 1: ask what the announcement reveals",
              markdown:
                "If it mainly reveals a weaker future economy, it is Delphic guidance.",
            },
            {
              title: "Step 2: ask whether there is a commitment element",
              markdown:
                "If it mainly says policy will be easier than a purely discretionary rule would imply, it is Odyssean guidance.",
            },
            {
              title: "Step 3: connect to the IS channel",
              markdown:
                "Both types affect expectations, but only Odyssean guidance is straightforwardly expansionary policy by design.",
            },
            {
              title: "Step 4: add the lower-bound logic",
              markdown:
                "At the lower bound, this distinction becomes the whole point: if the announcement is genuine commitment, the central bank is using future policy to compensate for the inability to cut the current rate enough.",
            },
          ],
        }),
      ],
      citations: lecture6CoreCitations,
    },
    {
      id: "lecture-6-traps",
      slug: "common-traps-and-quick-recap",
      title: "Common traps and quick recap",
      summary: "The mechanism is easy to forget once the labels arrive.",
      contentBlocks: [
        checklist(
          [
            "Forward guidance works through the expected path of **real** rates.",
            "Delphic guidance is information; Odyssean guidance is commitment.",
            "The forward-guidance puzzle is about exaggerated quantitative effects, not about a nonexistent channel.",
            "Once the lower bound binds, there is no divine coincidence: current stabilization is limited unless expectations about future policy move in the right direction.",
            "Carry forward: later lectures keep relying on the same expectations logic, even when the topic is no longer the zero lower bound itself.",
          ],
          "Quick recap",
        ),
        examTrap(
          "Using the labels without the mechanism",
          "Students often define Delphic and Odyssean guidance correctly in words but cannot explain why either matters for current demand.",
          "Start from the Dynamic IS equation. Then explain how the announcement changes the expected path of future real rates, and only after that classify whether the announcement is information, commitment, or a mixture of both.",
        ),
      ],
      citations: lecture6CoreCitations,
    },
  ],
  citations: lecture6CoreCitations,
});

const lecture7Module: ModuleDetail = lectureModule({
  id: "lecture-7",
  slug: "lecture-7",
  title: "Lecture 7: The Slope of the Phillips Curve",
  summary:
    "What the Phillips-curve slope means, why it may have flattened, and why the data are hard to interpret cleanly.",
  description:
    "This module rebuilds Lecture 7 as a structured guide to the Phillips curve. It moves from the historical relation to the modern New Keynesian form, explains what the slope parameter measures, and shows why a flatter curve changes the policy trade-off without making identification easy.",
  estimatedMinutes: 90,
  tags: ["lecture-7", "phillips-curve", "kappa", "inflation-dynamics"],
  objectives: [
    "Explain the economic meaning of the Phillips-curve slope.",
    "Distinguish the historical reduced-form Phillips curve from the structural New Keynesian Phillips curve.",
    "Describe what a flatter curve changes for inflation stabilization.",
  ],
  sections: [
    {
      id: "lecture-7-big-picture",
      slug: "big-picture-and-exam-relevance",
      title: "Big picture and why this lecture matters",
      summary: "Lecture 7 asks how strongly inflation reacts to slack.",
      contentBlocks: [
        p(
          "Once you understand the New Keynesian policy problem, the next question is: **how strong is the inflation response to slack?** That is the Phillips-curve slope question. The steeper the curve, the more strongly inflation reacts to output or unemployment gaps. The flatter the curve, the harder inflation is to move with demand management alone.",
        ),
        p(
          "Relative to Lectures 3, 4, and 6, what changes here is that the course is no longer asking only *whether* policy can move inflation, but *how strongly* inflation responds once slack changes. What stays is the need to separate structural mechanisms from raw correlations. What you must carry forward is that slope debates are always partly about identification, not just about drawing a flatter line in the data.",
        ),
      ],
      citations: lecture7CoreCitations,
    },
    {
      id: "lecture-7-notation",
      slug: "notation-and-glossary",
      title: "Notation and glossary",
      summary: "The slope parameters and alternative slack measures.",
      contentBlocks: [
        eq(
          "Output-gap Phillips curve",
          "\\pi_t = \\beta E_t\\pi_{t+1} + \\kappa \\tilde{x}_t + u_t^{\\pi}",
          "The modern NKPC links inflation to expected inflation and an output-gap measure of slack.",
        ),
        eq(
          "Unemployment-gap Phillips curve",
          "\\pi_t = \\beta E_t\\pi_{t+1} - \\kappa_u \\tilde{u}_t^e + u_t^{\\pi}",
          "The same logic can be written in labor-market language by using an unemployment-gap slack measure.",
        ),
      ],
      citations: lecture7CoreCitations,
    },
    {
      id: "lecture-7-setup",
      slug: "setup-assumptions-and-benchmark",
      title: "Setup, assumptions, and benchmark",
      summary: "Historical intuition versus modern structural interpretation.",
      contentBlocks: [
        p(
          "The lecture begins with the historical Phillips-curve intuition that tighter labor markets tend to raise inflation. It then moves to the modern New Keynesian version, where inflation is forward looking and depends on a structural measure of slack plus possible cost-push disturbances.",
        ),
      ],
      citations: lecture7CoreCitations,
    },
    {
      id: "lecture-7-mechanism-a",
      slug: "core-mechanism-a",
      title: "Core mechanism A: what a flatter Phillips curve means",
      summary: "A smaller slope changes the inflation cost of moving the real economy.",
      contentBlocks: [
        p(
          "If the Phillips curve is flatter, a given amount of slack changes inflation by less. That means inflation becomes harder to move with demand management. Disinflation can require larger or longer-lasting real contractions, while booms may produce surprisingly little inflation pressure.",
        ),
        shockTrace({
          title: "Changing the slope parameter",
          shock:
            "Compare a small-$\\kappa$ economy with a large-$\\kappa$ economy under the same amount of slack.",
          steps: [
            {
              variable: "Inflation response",
              direction: "smaller when $\\kappa$ is smaller",
              explanation:
                "A flatter curve makes inflation less sensitive to the same real disturbance.",
            },
            {
              variable: "Real cost of disinflation",
              direction: "larger when $\\kappa$ is smaller",
              explanation:
                "If inflation is stubborn, policy must work harder on the real side to move it.",
            },
          ],
        }),
      ],
      citations: lecture7CoreCitations,
    },
    {
      id: "lecture-7-mechanism-b",
      slug: "core-mechanism-b",
      title: "Core mechanism B: why empirical identification is difficult",
      summary: "Observed inflation-slack correlations are not the same as the structural slope.",
      contentBlocks: [
        p(
          "The lecture warns against reading raw data too literally. Aggressive stabilization policy, anchored expectations, and changing shock composition can all flatten observed inflation-slack correlations even if the structural slope has not changed very much.",
        ),
        p(
          "That is the whole point of the course's red-line-versus-targeting-rule comparison. A flatter reduced-form relation in the data does not automatically mean the central bank's structural trade-off changed by the same amount. Better credibility, better policy, or a different shock mix can all compress the red line while leaving the underlying targeting logic much closer to the old benchmark.",
        ),
      ],
      citations: lecture7CoreCitations,
    },
    {
      id: "lecture-7-compact",
      slug: "from-detailed-setup-to-the-compact-result",
      title: "From detailed setup to the compact result",
      summary: "The lecture's main policy takeaway about flattening.",
      contentBlocks: [
        p(
          "The compact takeaway is that a flatter Phillips curve makes inflation stabilization more demanding in real terms, but the data alone do not identify that structural change cleanly.",
        ),
        p(
          "Carry this forward into later lectures: whenever inflation seems unusually inert, you should ask whether the slope changed structurally, whether policy expectations shifted, or whether the shock mix changed.",
        ),
      ],
      citations: lecture7CoreCitations,
    },
    {
      id: "lecture-7-derivation",
      slug: "step-by-step-derivation-or-mechanism-chain",
      title: "Step by step: from output-gap slack to unemployment-gap slack",
      summary: "Why the lecture writes the Phillips curve in more than one way.",
      contentBlocks: [
        derivation({
          title: "Translate the slack measure",
          learningGoal:
            "Understand that the alternative Phillips-curve forms describe the same pricing logic using different slack variables.",
          latexBefore: "\\pi_t = \\beta E_t\\pi_{t+1} + \\kappa \\tilde{x}_t + u_t^{\\pi}",
          operation:
            "Use a relationship between output-gap slack and unemployment-gap slack to rewrite the real-side term in labor-market language.",
          whyValid:
            "The lecture wants the same inflation logic to be readable in more than one macro language.",
          latexAfter: "\\pi_t = \\beta E_t\\pi_{t+1} - \\kappa_u \\tilde{u}_t^e + u_t^{\\pi}",
          explanation:
            "The sign changes because more unemployment slack lowers inflation pressure. The deeper point is that the slope still measures how strongly slack feeds into inflation.",
        }),
      ],
      citations: lecture7CoreCitations,
    },
    {
      id: "lecture-7-analysis",
      slug: "shock-analysis-or-figure-interpretation",
      title: "Comparative statics and figure interpretation",
      summary: "How to answer a 'what if the curve is flatter?' question.",
      contentBlocks: [
        workedExample({
          title: "What changes when $\\kappa$ falls?",
          prompt:
            "Explain qualitatively what happens to the inflation-output trade-off when the Phillips-curve slope $\\kappa$ becomes smaller.",
          steps: [
            {
              title: "Step 1: inflation becomes less sensitive to slack",
              markdown:
                "A given recession or boom now changes inflation by less than before.",
            },
            {
              title: "Step 2: policy must work harder",
              markdown:
                "If the central bank wants to lower inflation, it may need larger or more persistent real slack.",
            },
            {
              title: "Step 3: interpret carefully",
              markdown:
                "This does **not** automatically prove the observed data relationship should flatten for purely structural reasons. Identification is part of the problem.",
            },
            {
              title: "Step 4: connect to the unchanged targeting rule",
              markdown:
                "This is why an exam can show a flatter red line in the scatter while leaving the targeting-rule figure unchanged. The observable correlation and the structural policy trade-off are not the same object.",
            },
          ],
        }),
        figureNote({
          title: "Historical Phillips-curve benchmark",
          caption:
            "Screenshot from Lecture 7 showing the original UK Phillips-curve relationship. It is useful because it reminds students that the modern slope debate starts from an empirical pattern, but later lectures reinterpret that pattern structurally.",
          imagePath: "/figures/lecture-7/historical-phillips-curve.png",
          altText:
            "Lecture 7 slide showing inflation and unemployment in the UK with the original Phillips curve fitted to historical data.",
          note:
            "What to notice: the lecture does not stop at the historical scatter. It uses that intuition as a starting point before asking how the structural slope should be interpreted in modern policy problems.",
        }),
        p(
          "So the careful answer is two-layered. If the structural slope really is smaller, disinflation becomes more costly because slack moves inflation less. But if the flatter pattern mainly reflects anchored expectations or more systematic stabilization policy, the observed relation can flatten a lot even while the structural targeting rule changes much less.",
        ),
      ],
      citations: lecture7CoreCitations,
    },
    {
      id: "lecture-7-guided",
      slug: "guided-problem-walkthrough",
      title: "Guided problem walkthrough",
      summary: "A concept-heavy Phillips-curve question.",
      contentBlocks: [
        workedExample({
          title: "Why can inflation stay stable when unemployment moves a lot?",
          prompt:
            "Give two structural reasons and one non-structural reason why inflation might move little even when unemployment changes substantially.",
          steps: [
            {
              title: "Structural reason 1",
              markdown:
                "The structural Phillips curve may be flatter, so inflation is genuinely less sensitive to slack.",
            },
            {
              title: "Structural reason 2",
              markdown:
                "Stronger nominal rigidities can make the structural slope smaller.",
            },
            {
              title: "Non-structural reason",
              markdown:
                "Policy credibility or anchored expectations can compress observed inflation changes even if the deeper slope is similar.",
            },
            {
              title: "Exam takeaway",
              markdown:
                "Good answers separate the reduced-form evidence from the structural slope. That distinction is the lecture's main safeguard against vague claims that the Phillips curve has 'disappeared'.",
            },
          ],
        }),
      ],
      citations: lecture7CoreCitations,
    },
    {
      id: "lecture-7-traps",
      slug: "common-traps-and-quick-recap",
      title: "Common traps and quick recap",
      summary: "The slope debate is intuitive, but easy to overstate.",
      contentBlocks: [
        checklist(
          [
            "A flatter curve means inflation reacts less to slack.",
            "Reduced-form evidence is not the same as the structural slope.",
            "Policy credibility and expectations can mimic flattening in the data.",
            "Carry forward: whenever the course later talks about stubborn inflation, you should immediately ask what is happening to the slope, expectations, and identification.",
          ],
          "Quick recap",
        ),
        examTrap(
          "Reading reduced-form data as if it were the structural parameter",
          "Students often jump from a weak observed inflation-unemployment correlation to the claim that the structural Phillips curve must have flattened by the same amount.",
          "Separate the object you observe from the object you want to identify. Policy credibility, anchored expectations, and different shocks can flatten the observed relationship even when the structural slope is harder to pin down.",
        ),
      ],
      citations: lecture7CoreCitations,
    },
  ],
  citations: lecture7CoreCitations,
});

const lecture8Module: ModuleDetail = lectureModule({
  id: "lecture-8",
  slug: "lecture-8",
  title: "Lecture 8: Macroeconomics and Inequality",
  summary:
    "Why representative-agent logic misses the distributional channels through which policy affects demand.",
  description:
    "This module turns the inequality lecture into a stepwise learning path. It starts from the representative-agent benchmark, then explains what changes once households differ in income, wealth, exposure, and marginal propensities to consume. The result is a more realistic view of monetary-policy transmission.",
  estimatedMinutes: 95,
  tags: ["lecture-8", "inequality", "hank", "redistribution"],
  objectives: [
    "Explain why heterogeneous-agent models matter for monetary-policy transmission.",
    "Use the distribution of MPCs as a genuine economic mechanism rather than a buzzword.",
    "Describe redistribution channels clearly.",
  ],
  sections: [
    {
      id: "lecture-8-big-picture",
      slug: "big-picture-and-exam-relevance",
      title: "Big picture and why this lecture matters",
      summary: "Lecture 8 asks what changes once households are no longer identical.",
      contentBlocks: [
        p(
          "The representative-household benchmark is analytically convenient, but it hides distributional channels that matter for macro outcomes. Lecture 8 asks a direct question: **if households differ in income, wealth, and spending behavior, how does that change policy transmission?**",
        ),
        p(
          "The lecture's answer is that inequality is not just a side topic. It changes the strength and distribution of policy effects because policy affects households with different MPCs and balance-sheet positions differently.",
        ),
        p(
          "Relative to the representative-agent benchmark used earlier in the course, what changes is that averages are no longer enough. What stays is the search for a transmission mechanism. What you must carry forward is that policy can move aggregates partly because it redistributes resources toward households with different spending behavior.",
        ),
      ],
      citations: lecture8CoreCitations,
    },
    {
      id: "lecture-8-notation",
      slug: "notation-and-glossary",
      title: "Notation and glossary",
      summary: "The terms organizing the distributional transmission logic.",
      contentBlocks: [
        eq(
          "Individual MPC",
          "\\text{MPC}_i = \\frac{dC_i}{dY_i}",
          "Household $i$'s marginal propensity to consume out of an income change.",
        ),
        eq(
          "Aggregate-MPC logic",
          "\\Delta C = \\sum_i \\text{MPC}_i \\cdot \\Delta Y_i",
          "Aggregate demand depends not only on total income changes but also on who receives them.",
        ),
        eq(
          "Matching-multiplier logic",
          "\\text{Aggregate MPC} = \\text{average MPC} + \\text{covariance term}",
          "Patterson's point is that aggregate amplification rises when high-MPC households are also the households whose earnings move most over the cycle.",
        ),
        modelMap("The lecture's core labels", [
          {
            label: "$\\text{HANK}$",
            description:
              "A heterogeneous-agent New Keynesian framework in which distribution matters for aggregate outcomes.",
          },
          {
            label: "Redistribution channel",
            description:
              "Policy changes shift resources across households with different MPCs and balance-sheet exposures.",
          },
          {
            label: "Direct versus indirect effects",
            description:
              "RANK leans heavily on direct intertemporal substitution, while HANK emphasizes indirect income and redistribution channels.",
          },
        ]),
      ],
      citations: lecture8CoreCitations,
    },
    {
      id: "lecture-8-setup",
      slug: "setup-assumptions-and-benchmark",
      title: "Setup, assumptions, and benchmark",
      summary: "From one representative household to many different households.",
      contentBlocks: [
        p(
          "In the representative-agent benchmark, one household stands in for everyone. Lecture 8 argues that this misses important macroeconomically relevant differences: some households are constrained, some are savers, some are borrowers, and their incomes respond differently to the business cycle.",
        ),
        p(
          "The lecture is also very explicit about why the representative-agent benchmark is empirically uncomfortable. In the data, average MPCs are around **0.25 at the quarterly horizon** and **0.5 at the annual horizon**, while the representative-agent benchmark implies an MPC much closer to the interest rate itself. That gap is one of the lecture's main reasons for moving from RANK to HANK.",
        ),
      ],
      citations: lecture8CoreCitations,
    },
    {
      id: "lecture-8-mechanism-a",
      slug: "core-mechanism-a",
      title: "Core mechanism A: the distribution of MPCs",
      summary: "The same aggregate income change can have different demand effects.",
      contentBlocks: [
        p(
          "If all households had the same MPC, distribution would matter much less. But the lecture emphasizes that this is not realistic. Some households spend most of an extra krone quickly, while others save a large fraction. Therefore, the macro effect of a policy-induced income change depends crucially on where it lands.",
        ),
        p(
          "This is why the course likes comparing economies with different shares of hand-to-mouth households. The lesson is not only that 'more high-MPC households means more spending'. The deeper lesson is that aggregate demand depends on the interaction between the **distribution of MPCs** and the **distribution of income changes**.",
        ),
      ],
      citations: lecture8CoreCitations,
    },
    {
      id: "lecture-8-mechanism-b",
      slug: "core-mechanism-b",
      title: "Core mechanism B: redistribution and exposure channels",
      summary: "Policy transmission is partly about who gains and who loses.",
      contentBlocks: [
        p(
          "The lecture discusses several heterogeneous-agent channels: earnings heterogeneity, Fisher-style redistribution between borrowers and lenders, and differences in interest-rate exposure. In all of them, the key idea is the same: policy affects aggregates partly because it reallocates resources across households with different spending responses.",
        ),
        checklist(
          [
            "Earnings heterogeneity channel: monetary policy changes labor income differently across households.",
            "Fisher channel: inflation redistributes between nominal borrowers and lenders.",
            "Interest-rate-exposure channel: balance sheets are differently exposed to changes in real rates.",
            "Lecture 8's bottom line: redistribution is part of transmission, not a side story added after the macro analysis.",
          ],
          "Channels you should be able to name explicitly",
        ),
        p(
          "The lecture also contrasts RANK and HANK directly. In RANK, the direct intertemporal-substitution channel does most of the work. In HANK, the direct effect is much smaller, while indirect effects through labor income, balance sheets, and redistribution become much more important.",
        ),
      ],
      citations: lecture8CoreCitations,
    },
    {
      id: "lecture-8-compact",
      slug: "from-detailed-setup-to-the-compact-result",
      title: "From detailed setup to the compact result",
      summary: "The main lecture takeaway in one sentence.",
      contentBlocks: [
        p(
          "The compact result is that **monetary policy works partly through distribution**. Once households differ, policy transmission depends not only on the average real rate, but also on who gets income, who faces debt-service pressure, and who has the highest MPC.",
        ),
        p(
          "Carry this forward into later applied policy questions: when the course discusses inequality, debt, or sustainability, it is no longer enough to know the average effect if the distribution of gains and losses changes the macro response.",
        ),
      ],
      citations: lecture8CoreCitations,
    },
    {
      id: "lecture-8-derivation",
      slug: "step-by-step-derivation-or-mechanism-chain",
      title: "Step by step: why heterogeneity changes the aggregate MPC",
      summary: "A mechanism chain rather than a heavy symbolic proof.",
      contentBlocks: [
        derivation({
          title: "Start from household-level MPCs",
          learningGoal:
            "See why aggregate consumption cannot be read off from one average household once MPCs differ.",
          latexBefore: "\\text{MPC}_i = \\frac{dC_i}{dY_i}",
          operation:
            "Allow MPCs to differ across households and ask how the distribution of income gains affects aggregate demand.",
          whyValid:
            "Lecture 8 explicitly emphasizes the cross-sectional distribution of MPCs rather than only the average.",
          latexAfter:
            "\\Delta C = \\sum_i \\text{MPC}_i \\cdot \\Delta Y_i",
          explanation:
            "Aggregate demand depends on both the size of income changes and where they land. That is the cleanest way to see why heterogeneity matters for macro outcomes.",
        }),
        derivation({
          title: "Why the matching multiplier amplifies downturns",
          learningGoal:
            "Understand Patterson's covariance result without getting lost in notation.",
          operation:
            "Start from the idea that aggregate demand reacts more when shocks hit households with high MPCs. Then add the empirical fact that exposure to the business cycle is not randomly distributed across households.",
          whyValid:
            "The lecture emphasizes a positive covariance between MPCs and earnings cyclicality: workers whose incomes move more over the cycle also tend to have high MPCs.",
          latexAfter:
            "\\text{Aggregate MPC} = \\text{average MPC} + \\text{covariance between MPC and cyclical earnings exposure}",
          explanation:
            "This is the amplification logic. Even a relatively small group of high-MPC households can become disproportionately important if their incomes are the ones that move most in recessions and recoveries.",
        }),
      ],
      citations: lecture8CoreCitations,
    },
    {
      id: "lecture-8-analysis",
      slug: "shock-analysis-or-figure-interpretation",
      title: "Shock analysis and policy interpretation",
      summary: "How inequality changes the effect of a policy move.",
      contentBlocks: [
        shockTrace({
          title: "Policy easing in a heterogeneous-agent economy",
          shock:
            "A monetary easing changes debt-service pressure, labor-market conditions, and the distribution of gains across households.",
          steps: [
            {
              variable: "High-MPC households",
              direction: "often benefit disproportionately",
              explanation:
                "If gains land on households likely to spend quickly, aggregate demand rises more strongly.",
            },
            {
              variable: "Aggregate demand",
              direction: "up by more than the representative-agent benchmark may predict",
              explanation:
                "Distribution amplifies the aggregate response when gains go to constrained or high-MPC households.",
              },
            {
              variable: "Direct intertemporal-substitution channel",
              direction: "often smaller than in RANK",
              explanation:
                "Lecture 8 stresses that the benchmark direct effect of lower real rates is not enough on its own; indirect income and redistribution channels do much of the work in HANK.",
            },
          ],
        }),
        p(
          "Patterson's matching-multiplier logic sharpens this further. Aggregate amplification is especially strong when high-MPC households are also the households whose earnings are most cyclical. Then a downturn does not hit a random worker; it hits the workers most likely to cut spending sharply.",
        ),
        figureNote({
          title: "Why heterogeneity changes macro transmission",
          caption:
            "Screenshot from Lecture 8 showing a distribution of households rather than one representative agent. It supports the lecture's central point that macro theory changes once income and wealth are distributed rather than concentrated in one benchmark household.",
          imagePath: "/figures/lecture-8/heterogeneous-agent-distribution.png",
          altText:
            "Lecture 8 slide titled Second Generation Macro Theories with a crowd image and a three-dimensional distribution over income and wealth.",
          note:
            "What to notice: the visual matters because the lecture is not just saying 'people differ' in words; it is saying the whole state of the economy becomes a distribution that moves over time.",
        }),
      ],
      citations: lecture8CoreCitations,
    },
    {
      id: "lecture-8-guided",
      slug: "guided-problem-walkthrough",
      title: "Guided problem walkthrough",
      summary: "A concept-heavy HANK practice problem.",
      contentBlocks: [
        workedExample({
          title: "Which economy reacts more when the share of hand-to-mouth households differs?",
          prompt:
            "Suppose two otherwise similar economies differ only in the share of hand-to-mouth households with MPCs close to one. Explain why the economy with more high-MPC households should react more strongly to the same positive productivity or policy shock.",
          steps: [
            {
              title: "Step 1: compare the MPC distributions",
              markdown:
                "The economy with more hand-to-mouth households has more agents who spend a large fraction of any extra income quickly.",
            },
            {
              title: "Step 2: trace the income incidence",
              markdown:
                "If the shock raises incomes or reduces debt-service pressure, more of the gain lands on households likely to spend it rather than save it.",
            },
            {
              title: "Step 3: state the macro result",
              markdown:
                "The demand effect is stronger, because the same average shock translates into a larger aggregate MPC when more of the population is high-MPC.",
            },
            {
              title: "Step 4: add the Patterson-style amplification logic",
              markdown:
                "If those same households are also the ones whose earnings are most cyclical, the aggregate response can be even stronger than the simple average-MPC comparison suggests.",
            },
          ],
        }),
      ],
      citations: lecture8CoreCitations,
    },
    {
      id: "lecture-8-traps",
      slug: "common-traps-and-quick-recap",
      title: "Common traps and quick recap",
      summary: "It is easy to say 'inequality matters' without saying how.",
      contentBlocks: [
        checklist(
          [
            "Do not stop at the phrase 'heterogeneity matters'. Name the channel.",
            "The aggregate MPC depends on who receives income changes, not only on the average response.",
            "Redistribution is part of the transmission mechanism, not just a fairness side issue.",
            "In HANK, indirect income and redistribution channels can dominate the direct intertemporal-substitution channel familiar from RANK.",
            "Carry forward: later policy reasoning is stronger if you always ask who gains, who loses, and who actually spends the gain.",
          ],
          "Quick recap",
        ),
        examTrap(
          "Saying inequality matters without naming the mechanism",
          "Students often answer heterogeneous-agent questions with a vague sentence about distribution but never explain why the aggregate response changes.",
          "Force yourself to name the channel: MPC dispersion, borrower-lender redistribution, labor-income exposure, or another concrete mechanism. The lecture's whole purpose is to move from a slogan to a transmission story.",
        ),
      ],
      citations: lecture8CoreCitations,
    },
  ],
  citations: lecture8CoreCitations,
});

const lecture3NotationEntries: NotationEntry[] = [
  notationEntry({
    id: "lecture3-divine-coincidence",
    moduleSlug: "lecture-3",
    kind: "abbreviation",
    displayLatex: "\\text{divine coincidence}",
    spokenName: "divine coincidence",
    plainMeaning:
      "The benchmark result that stabilizing inflation also stabilizes the output gap when the Phillips curve has no cost-push shock.",
    whyItMatters:
      "It is the clean benchmark the course later breaks once an extra inflation wedge appears.",
    whereItAppears: ["Lecture 3 headline result.", "Bridge to Lecture 4."],
    commonConfusions: [
      "It is not a universal law. It depends on the benchmark Phillips curve without a cost-push shock.",
    ],
    relatedTerms: ["$\\tilde{y}_t$", "$u_t^{\\pi}$"],
    citations: lecture3CoreCitations,
  }),
  notationEntry({
    id: "lecture3-kappa",
    moduleSlug: "lecture-3",
    kind: "parameter",
    displayLatex: "\\kappa",
    spokenName: "kappa, slope of the Phillips curve",
    plainMeaning: "The coefficient linking the output gap to inflation in the NKPC.",
    whyItMatters:
      "It tells you how much inflation pressure a given amount of slack creates.",
    whereItAppears: ["Lecture 3 NKPC.", "Recursive-substitution note."],
    commonConfusions: [
      "It is a structural slope parameter, not a policy-rule coefficient.",
    ],
    relatedTerms: ["$\\phi_\\pi$", "$\\phi_y$"],
    citations: lecture3CoreCitations,
  }),
  notationEntry({
    id: "lecture3-taylor-principle-condition",
    moduleSlug: "lecture-3",
    kind: "operator",
    displayLatex: "\\kappa(\\phi_\\pi - 1) + (1-\\beta)\\phi_y > 0",
    spokenName: "Taylor-principle determinacy condition",
    plainMeaning:
      "A sufficient condition from the matrix note ensuring the forward-looking system is anchored by policy.",
    whyItMatters:
      "It connects the policy-rule coefficients to equilibrium stability.",
    whereItAppears: ["Matrix-form note."],
    commonConfusions: [
      "It is about determinacy, not just about being 'hawkish'.",
    ],
    relatedTerms: ["$\\phi_\\pi$", "$\\phi_y$"],
    citations: lecture3CoreCitations,
  }),
];

const lecture4NotationEntries: NotationEntry[] = [
  notationEntry({
    id: "lecture4-welfare-gap",
    moduleSlug: "lecture-4",
    kind: "symbol",
    displayLatex: "x_t",
    spokenName: "x t, welfare-relevant output gap",
    plainMeaning:
      "The output-gap concept that enters the welfare problem in Lecture 4.",
    whyItMatters:
      "It is the correct real stabilization object in the loss function.",
    whereItAppears: ["Lecture 4 loss function and Phillips curve."],
    commonConfusions: [
      "It is not automatically identical to every empirical gap measure used elsewhere in the course.",
    ],
    relatedTerms: ["$u_t^{\\pi}$", "$\\alpha_x$"],
    citations: lecture4CoreCitations,
  }),
  notationEntry({
    id: "lecture4-efficient-output",
    moduleSlug: "lecture-4",
    kind: "symbol",
    displayLatex: "y_t^e",
    spokenName: "y e t, efficient output",
    plainMeaning:
      "The output level that is relevant for welfare in the Lecture 4 policy problem.",
    whyItMatters:
      "The lecture's real stabilization target is defined relative to this efficient benchmark, not just relative to flexible-price output.",
    whereItAppears: ["Definition of the welfare-relevant output gap $x_t = y_t - y_t^e$."],
    commonConfusions: [
      "It is not automatically the same object as natural output $y_t^n$. Lecture 4 uses the distinction to explain why the welfare-relevant gap must be handled carefully.",
    ],
    relatedTerms: ["$x_t$", "$y_t^n$"],
    citations: lecture4CoreCitations,
  }),
  notationEntry({
    id: "lecture4-cost-push",
    moduleSlug: "lecture-4",
    kind: "shock",
    displayLatex: "u_t^{\\pi}",
    spokenName: "u pi t, cost-push shock",
    plainMeaning:
      "A disturbance that moves inflation independently of the welfare-relevant output gap.",
    whyItMatters:
      "It is the reason divine coincidence breaks in Lecture 4.",
    whereItAppears: ["Phillips curve with a trade-off."],
    commonConfusions: ["It is not the same as a demand or policy shock."],
    relatedTerms: ["divine coincidence", "$x_t$"],
    citations: lecture4CoreCitations,
  }),
  notationEntry({
    id: "lecture4-loss-weight",
    moduleSlug: "lecture-4",
    kind: "parameter",
    displayLatex: "\\alpha_x",
    spokenName: "alpha x, weight on gap stabilization",
    plainMeaning:
      "The weight on welfare-gap stabilization in the central bank's quadratic loss function.",
    whyItMatters:
      "It determines how willing the policymaker is to move the gap in order to reduce inflation.",
    whereItAppears: ["Loss function.", "Targeting-rule derivation."],
    commonConfusions: [
      "A larger value means the policymaker dislikes moving the gap more, not less.",
    ],
    relatedTerms: ["$x_t$", "$\\pi_t$"],
    citations: lecture4CoreCitations,
  }),
];

const lecture5NotationEntries: NotationEntry[] = [
  notationEntry({
    id: "lecture5-desired-output",
    moduleSlug: "lecture-5",
    kind: "symbol",
    displayLatex: "y^*",
    spokenName: "y star, desired output target",
    plainMeaning:
      "The output level the policymaker would like to achieve in the time-inconsistency setup.",
    whyItMatters:
      "If it exceeds the natural level, the policymaker is tempted to create surprise inflation.",
    whereItAppears: ["Time-inconsistency loss function."],
    commonConfusions: [
      "It is a desired target in the model, not necessarily a feasible long-run level.",
    ],
    relatedTerms: ["$y^n$", "inflation bias"],
    citations: lecture5CoreCitations,
  }),
  notationEntry({
    id: "lecture5-natural-output",
    moduleSlug: "lecture-5",
    kind: "symbol",
    displayLatex: "y^n",
    spokenName: "y n, natural output",
    plainMeaning:
      "The output level the economy returns to on average once surprise inflation disappears.",
    whyItMatters:
      "Inflation bias arises when the policymaker targets output above this natural level.",
    whereItAppears: ["Time-inconsistency Phillips-curve setup."],
    commonConfusions: [
      "The lecture's key distortion is the gap between $y^*$ and $y^n$.",
    ],
    relatedTerms: ["$y^*$", "inflation bias"],
    citations: lecture5CoreCitations,
  }),
  notationEntry({
    id: "lecture5-bias-formula",
    moduleSlug: "lecture-5",
    kind: "operator",
    displayLatex: "\\pi = \\pi^* + ab(y^* - y^n)",
    spokenName: "inflation-bias formula",
    plainMeaning:
      "The equilibrium inflation outcome under discretion in the classic time-inconsistency setup.",
    whyItMatters:
      "It is the lecture's cleanest compact summary of how incentives create excess inflation.",
    whereItAppears: ["Lecture 5 policy summary."],
    commonConfusions: [
      "The formula summarizes an equilibrium result under rational expectations; it is not a short-run policy menu.",
    ],
    relatedTerms: ["$a$", "$b$", "$y^* - y^n$"],
    citations: lecture5CoreCitations,
  }),
];

const lecture6NotationEntries: NotationEntry[] = [
  notationEntry({
    id: "lecture6-zlb",
    moduleSlug: "lecture-6",
    kind: "operator",
    displayLatex: "i_t \\geq 0",
    spokenName: "zero lower bound",
    plainMeaning:
      "The benchmark constraint preventing the nominal policy rate from being cut far below zero.",
    whyItMatters:
      "It is the reason future policy promises become unusually important in this lecture.",
    whereItAppears: ["Lecture 6 baseline setup."],
    commonConfusions: [
      "The key implication is not 'policy is powerless', but 'policy must work more through expectations'.",
    ],
    relatedTerms: ["forward guidance", "liquidity trap"],
    citations: lecture6CoreCitations,
  }),
  notationEntry({
    id: "lecture6-delphic",
    moduleSlug: "lecture-6",
    kind: "abbreviation",
    displayLatex: "\\text{Delphic guidance}",
    spokenName: "Delphic guidance",
    plainMeaning:
      "Guidance that mainly reveals information about the central bank's outlook for the economy.",
    whyItMatters:
      "It can contain bad news about fundamentals even though it changes rate expectations.",
    whereItAppears: ["Lecture 6 information-versus-commitment distinction."],
    commonConfusions: [
      "Lower expected rates under Delphic guidance do not automatically mean expansionary policy news.",
    ],
    relatedTerms: ["Odyssean guidance"],
    citations: lecture6CoreCitations,
  }),
  notationEntry({
    id: "lecture6-odyssean",
    moduleSlug: "lecture-6",
    kind: "abbreviation",
    displayLatex: "\\text{Odyssean guidance}",
    spokenName: "Odyssean guidance",
    plainMeaning:
      "Guidance that contains a credible commitment to a future policy path.",
    whyItMatters:
      "It is the clearly expansionary version of forward guidance in the lecture's stabilization logic.",
    whereItAppears: ["Lecture 6 commitment discussion."],
    commonConfusions: [
      "Do not reduce it to 'talking about the future'. The commitment element is the crucial distinction.",
    ],
    relatedTerms: ["Delphic guidance", "forward-guidance puzzle"],
    citations: lecture6CoreCitations,
  }),
];

const lecture7NotationEntries: NotationEntry[] = [
  notationEntry({
    id: "lecture7-kappa",
    moduleSlug: "lecture-7",
    kind: "parameter",
    displayLatex: "\\kappa",
    spokenName: "kappa, structural Phillips-curve slope",
    plainMeaning:
      "The coefficient measuring how strongly inflation responds to output-gap slack in the NKPC.",
    whyItMatters:
      "It governs the inflation-output trade-off faced by policymakers.",
    whereItAppears: ["Modern Phillips-curve specification."],
    commonConfusions: [
      "A flatter reduced-form scatterplot does not automatically imply a smaller structural $\\kappa$.",
    ],
    relatedTerms: ["$\\kappa_u$", "$u_t^{\\pi}$"],
    citations: lecture7CoreCitations,
  }),
  notationEntry({
    id: "lecture7-kappa-u",
    moduleSlug: "lecture-7",
    kind: "parameter",
    displayLatex: "\\kappa_u",
    spokenName: "kappa u, unemployment-gap slope",
    plainMeaning:
      "The coefficient linking unemployment-gap slack to inflation in the alternative Phillips-curve form.",
    whyItMatters:
      "It lets the lecture describe the same logic in labor-market language.",
    whereItAppears: ["Alternative unemployment-gap formulation."],
    commonConfusions: [
      "The sign flips relative to the output-gap version because more unemployment slack lowers inflation pressure.",
    ],
    relatedTerms: ["$\\kappa$"],
    citations: lecture7CoreCitations,
  }),
  notationEntry({
    id: "lecture7-cost-push",
    moduleSlug: "lecture-7",
    kind: "shock",
    displayLatex: "u_t^{\\pi}",
    spokenName: "u pi t, cost-push shock",
    plainMeaning:
      "A disturbance shifting inflation independently of measured slack.",
    whyItMatters:
      "It is one reason the raw data can make slope identification difficult.",
    whereItAppears: ["Modern Phillips-curve specification."],
    commonConfusions: [
      "Inflation can move because of this shock even if slack is unchanged.",
    ],
    relatedTerms: ["$\\kappa$", "flattening"],
    citations: lecture7CoreCitations,
  }),
];

const lecture8NotationEntries: NotationEntry[] = [
  notationEntry({
    id: "lecture8-mpc",
    moduleSlug: "lecture-8",
    kind: "parameter",
    displayLatex: "\\text{MPC}_i",
    spokenName: "individual MPC",
    plainMeaning:
      "Household $i$'s marginal propensity to consume out of an income change.",
    whyItMatters:
      "The lecture's whole distributional argument depends on households having different MPCs.",
    whereItAppears: ["Lecture 8 distribution of MPCs discussion."],
    commonConfusions: [
      "Average MPC is not enough. The cross-sectional distribution matters too.",
    ],
    relatedTerms: ["aggregate MPC", "HANK"],
    citations: lecture8CoreCitations,
  }),
  notationEntry({
    id: "lecture8-hank",
    moduleSlug: "lecture-8",
    kind: "abbreviation",
    displayLatex: "\\text{HANK}",
    spokenName: "heterogeneous-agent New Keynesian",
    plainMeaning:
      "A New Keynesian model with heterogeneous households rather than one representative household.",
    whyItMatters:
      "It is the framework the lecture uses to explain why distribution changes aggregate transmission.",
    whereItAppears: ["Lecture 8 model motivation."],
    commonConfusions: [
      "HANK is not just 'RA with inequality added'. The transmission channels themselves change.",
    ],
    relatedTerms: ["redistribution channel", "MPC"],
    citations: lecture8CoreCitations,
  }),
  notationEntry({
    id: "lecture8-aggregate-mpc",
    moduleSlug: "lecture-8",
    kind: "operator",
    displayLatex: "\\Delta C = \\sum_i \\text{MPC}_i \\cdot \\Delta Y_i",
    spokenName: "aggregate MPC logic",
    plainMeaning:
      "A compact way to say that aggregate consumption depends on both the size and distribution of income gains.",
    whyItMatters:
      "It is the cleanest formula for why redistribution affects aggregate demand.",
    whereItAppears: ["Lecture 8 distribution-of-MPCs section."],
    commonConfusions: [
      "The cross-sectional allocation is part of the macro result, not a side remark.",
    ],
    relatedTerms: ["$\\text{MPC}_i$", "redistribution channel"],
    citations: lecture8CoreCitations,
  }),
  notationEntry({
    id: "lecture8-redistribution",
    moduleSlug: "lecture-8",
    kind: "abbreviation",
    displayLatex: "\\text{redistribution channel}",
    spokenName: "redistribution channel",
    plainMeaning:
      "The channel through which monetary policy changes aggregate demand by reallocating resources across households with different MPCs or balance-sheet exposure.",
    whyItMatters:
      "It is one of the lecture's main reasons why HANK transmission differs from the representative-agent benchmark.",
    whereItAppears: ["Auclert discussion.", "HANK versus RANK comparison."],
    commonConfusions: [
      "It is not an after-the-fact fairness comment. The lecture treats redistribution as part of the macro transmission mechanism itself.",
    ],
    relatedTerms: ["$\\text{MPC}_i$", "HANK"],
    citations: lecture8CoreCitations,
  }),
  notationEntry({
    id: "lecture8-matching-multiplier",
    moduleSlug: "lecture-8",
    kind: "abbreviation",
    displayLatex: "\\text{matching multiplier}",
    spokenName: "matching multiplier",
    plainMeaning:
      "Patterson's amplification effect coming from the covariance between MPCs and how strongly different households' earnings move with aggregate activity.",
    whyItMatters:
      "It explains why shocks can be especially powerful when they hit the incomes of high-MPC households.",
    whereItAppears: ["Patterson section in Lecture 8."],
    commonConfusions: [
      "The key object is the covariance term, not just the average MPC. Small groups can still matter a lot if they are highly exposed to cyclical income risk.",
    ],
    relatedTerms: ["aggregate MPC", "redistribution channel"],
    citations: lecture8CoreCitations,
  }),
];

const lecture3PracticeProblem: PracticeProblem = practiceProblem({
  id: "lecture-3-divine-coincidence-problem",
  slug: "lecture-3-divine-coincidence-problem",
  title: "Lecture 3: Explaining Divine Coincidence",
  moduleSlug: "lecture-3",
  prompt: [
    "Consider the benchmark Lecture 3 system with no cost-push shock:",
    "$$\\pi_t = \\beta E_t\\pi_{t+1} + \\kappa \\tilde{y}_t,$$",
    "$$\\tilde{y}_t = E_t\\tilde{y}_{t+1} - \\frac{1}{\\sigma}(i_t - E_t\\pi_{t+1} - r_t^n).$$",
    "Explain why successful inflation stabilization also stabilizes the output gap in this benchmark. Then explain why the Taylor principle still matters even though there is no inflation-gap trade-off.",
  ],
  supportingEquations: [
    {
      id: "lecture3-nkpc",
      label: "Benchmark NKPC",
      latex: "\\pi_t = \\beta E_t\\pi_{t+1} + \\kappa \\tilde{y}_t",
      explanation:
        "There is no cost-push term here. That is exactly why divine coincidence is possible.",
    },
    {
      id: "lecture3-determinacy",
      label: "Taylor-principle condition",
      latex: "\\kappa(\\phi_\\pi - 1) + (1-\\beta)\\phi_y > 0",
      explanation:
        "Use this when you explain why policy still needs to anchor expectations and deliver a stable equilibrium.",
    },
  ],
  hints: [
    "Ask what the Phillips curve implies if current and expected future inflation are stabilized.",
    "Divine coincidence removes the trade-off, but it does not remove the need for a determinate policy rule.",
  ],
  nextSteps: [
    "State that if $\\pi_t = 0$ and $E_t\\pi_{t+1} = 0$, the NKPC implies $\\tilde{y}_t = 0$.",
    "Then explain that the Taylor principle is still needed because the IS block and expectations must be anchored by policy.",
  ],
  solutionOutline: [
    "Without a cost-push shock, the Phillips curve links inflation to expected inflation and the output gap only.",
    "If policy succeeds in stabilizing current and expected future inflation, the only way the Phillips curve can hold is with a zero output gap.",
    "That is why stabilizing inflation also stabilizes the gap in the benchmark setup.",
    "The Taylor principle still matters because the economy is forward looking and policy must anchor expectations to deliver a stable equilibrium.",
  ],
  citations: lecture3CoreCitations,
});

const lecture4PracticeProblem: PracticeProblem = practiceProblem({
  id: "lecture-4-optimal-policy-problem",
  slug: "lecture-4-optimal-policy-problem",
  title: "Lecture 4: Cost-Push Shocks and the Optimal Trade-off",
  moduleSlug: "lecture-4",
  prompt: [
    "Suppose the Phillips curve is $$\\pi_t = \\beta E_t\\pi_{t+1} + \\kappa x_t + u_t^{\\pi}$$ and the central bank minimizes $$L_t = \\pi_t^2 + \\alpha_x x_t^2.$$ Explain why a positive cost-push shock destroys divine coincidence. Then explain the economic meaning of the discretionary targeting rule $$x_t = -\\frac{\\kappa}{\\alpha_x}\\pi_t.$$",
  ],
  supportingEquations: [
    {
      id: "lecture4-nkpc",
      label: "Phillips curve with cost-push shock",
      latex: "\\pi_t = \\beta E_t\\pi_{t+1} + \\kappa x_t + u_t^{\\pi}",
      explanation:
        "This is the structural reason the benchmark no-trade-off result disappears.",
    },
    {
      id: "lecture4-targeting-rule",
      label: "Discretionary targeting rule",
      latex: "x_t = -\\frac{\\kappa}{\\alpha_x}\\pi_t",
      explanation:
        "Use this as the compact summary of the optimal inflation-gap trade-off under discretion.",
    },
  ],
  hints: [
    "Start by asking whether inflation can be positive even when $x_t = 0$.",
    "Then interpret the targeting rule as a marginal trade-off, not as a structural law of motion.",
  ],
  nextSteps: [
    "Because $u_t^{\\pi}$ enters directly, a zero gap no longer guarantees zero inflation.",
    "The targeting rule says the central bank optimally allows the welfare-relevant gap to move against inflation rather than trying to eliminate both at once.",
  ],
  solutionOutline: [
    "A positive cost-push shock raises inflation directly through the Phillips curve.",
    "Therefore inflation can stay above target even when the welfare-relevant gap is zero, so divine coincidence fails.",
    "The central bank must choose a trade-off: lowering inflation requires a negative gap, but that also carries welfare costs.",
    "The discretionary targeting rule summarizes that trade-off by linking the optimal gap choice to inflation.",
  ],
  citations: lecture4CoreCitations,
});

const lecture5PracticeProblem: PracticeProblem = practiceProblem({
  id: "lecture-5-time-inconsistency-problem",
  slug: "lecture-5-time-inconsistency-problem",
  title: "Lecture 5: Explaining Inflation Bias",
  moduleSlug: "lecture-5",
  prompt: [
    "Consider the standard time-inconsistency setup with loss $$L = (\\pi - \\pi^*)^2 + a(y - y^*)^2$$ and short-run Phillips curve $$y - y^n = b(\\pi - \\pi^e).$$ Explain why discretion creates an inflation bias when $y^* > y^n$. Then explain why commitment or central bank independence can reduce that bias.",
  ],
  supportingEquations: [
    {
      id: "lecture5-bias",
      label: "Inflation-bias result",
      latex: "\\pi = \\pi^* + ab(y^* - y^n)",
      explanation:
        "This is the compact formula summarizing the equilibrium bias under discretion.",
    },
  ],
  hints: [
    "Ask why the policymaker would want surprise inflation once expectations are fixed.",
    "Then ask what rational private agents do when they anticipate that temptation.",
  ],
  nextSteps: [
    "The policymaker sees temporary output gains from surprise inflation, so discretion creates an incentive to inflate.",
    "Rational agents anticipate that incentive, so expected inflation rises and equilibrium inflation increases without a permanent output gain.",
  ],
  solutionOutline: [
    "When $y^* > y^n$, the policymaker wants output above the natural level.",
    "Given expectations, surprise inflation can temporarily push output up through the Phillips curve.",
    "Private agents anticipate that and raise expected inflation in advance.",
    "Equilibrium inflation therefore rises above target, but output returns to the natural level on average.",
    "Commitment or independence works by reducing the short-run temptation to exploit the Phillips curve once expectations are formed.",
  ],
  citations: lecture5CoreCitations,
});

const lecture6PracticeProblem: PracticeProblem = practiceProblem({
  id: "lecture-6-forward-guidance-problem",
  slug: "lecture-6-forward-guidance-problem",
  title: "Lecture 6: Delphic versus Odyssean Guidance",
  moduleSlug: "lecture-6",
  prompt: [
    "A central bank announces that rates will remain low for longer than markets previously expected. Explain how to decide whether the announcement is Delphic or Odyssean guidance, and explain why the macroeconomic interpretation differs across the two cases.",
  ],
  supportingEquations: [
    {
      id: "lecture6-is",
      label: "Dynamic IS equation",
      latex: "\\tilde{y}_t = E_t\\tilde{y}_{t+1} - \\frac{1}{\\sigma}(i_t - E_t\\pi_{t+1} - r_t^n)",
      explanation:
        "Use this to explain why future policy expectations affect current demand.",
    },
  ],
  hints: [
    "First explain the expectations channel, then classify the guidance.",
    "Ask whether the announcement mainly conveys information about the outlook or a commitment about future policy choices.",
  ],
  nextSteps: [
    "If the announcement mainly says the economy will be weak, it is Delphic guidance.",
    "If it mainly says policy will stay easier than a purely myopic rule would imply, it is Odyssean guidance.",
  ],
  solutionOutline: [
    "Forward guidance works because expected future real rates enter current demand decisions.",
    "Delphic guidance is information about future conditions, so lower expected rates may partly reflect worse fundamentals.",
    "Odyssean guidance is a policy commitment, so it is more clearly an active stabilization tool.",
  ],
  citations: lecture6CoreCitations,
});

const lecture7PracticeProblem: PracticeProblem = practiceProblem({
  id: "lecture-7-phillips-curve-problem",
  slug: "lecture-7-phillips-curve-problem",
  title: "Lecture 7: What Does a Flatter Phillips Curve Change?",
  moduleSlug: "lecture-7",
  prompt: [
    "Suppose the structural Phillips-curve slope $\\kappa$ becomes smaller. Explain what that does to the inflation response to slack, to the real cost of disinflation, and to the interpretation of empirical inflation-unemployment data.",
  ],
  supportingEquations: [
    {
      id: "lecture7-nkpc",
      label: "Modern Phillips curve",
      latex: "\\pi_t = \\beta E_t\\pi_{t+1} + \\kappa \\tilde{x}_t + u_t^{\\pi}",
      explanation:
        "A smaller $\\kappa$ means inflation reacts less to the same amount of slack.",
    },
  ],
  hints: [
    "Start with the structural meaning of $\\kappa$ before talking about data.",
    "Then separate structural flattening from changes in policy, expectations, or shock composition.",
  ],
  nextSteps: [
    "A smaller $\\kappa$ makes inflation less sensitive to slack, which can make disinflation costlier in real terms.",
    "But a flatter reduced-form data relationship does not automatically prove the structural slope changed.",
  ],
  solutionOutline: [
    "A lower $\\kappa$ means the same output or unemployment slack produces a smaller inflation response.",
    "That makes inflation harder to move with demand management alone, so disinflation can require more persistent real weakness.",
    "Observed data can still be misleading because policy credibility, anchored expectations, and shock mixes also affect the reduced-form relationship.",
  ],
  citations: lecture7CoreCitations,
});

const lecture8PracticeProblem: PracticeProblem = practiceProblem({
  id: "lecture-8-inequality-problem",
  slug: "lecture-8-inequality-problem",
  title: "Lecture 8: Why Distribution Changes Transmission",
  moduleSlug: "lecture-8",
  prompt: [
    "Suppose two otherwise similar economies experience the same positive policy or productivity shock, but one economy has a much larger share of hand-to-mouth households with MPCs close to one. Explain which economy should have the stronger aggregate-demand response and why the representative-agent benchmark misses that difference.",
  ],
  supportingEquations: [
    {
      id: "lecture8-individual-mpc",
      label: "Individual MPC",
      latex: "\\text{MPC}_i = \\frac{dC_i}{dY_i}",
      explanation:
        "This is the household-level response the lecture uses to motivate distributional transmission.",
    },
    {
      id: "lecture8-aggregate-mpc",
      label: "Aggregate-MPC logic",
      latex: "\\Delta C = \\sum_i \\text{MPC}_i \\cdot \\Delta Y_i",
      explanation:
        "Aggregate demand depends both on the income change and on which households receive it.",
    },
  ],
  hints: [
    "Hold the average shock fixed and change only the distribution of MPCs and the incidence of the income gain.",
    "Think about what the representative-agent benchmark loses when everyone is forced to have the same MPC and the same cyclical exposure.",
  ],
  nextSteps: [
    "High-MPC households spend more of an extra unit of income, so gains landing on them create a bigger demand response.",
    "Patterson's logic says amplification is even stronger if the shock hits households whose earnings are both highly cyclical and associated with high MPCs.",
  ],
  solutionOutline: [
    "If the economy has more hand-to-mouth or otherwise high-MPC households, more of the extra income generated by the same average shock is converted into spending quickly rather than saving.",
    "Aggregate demand therefore rises more strongly, even though the average shock is the same.",
    "The amplification is even larger when the same households are also the ones whose earnings move most with the business cycle.",
    "A representative-agent model cannot capture this because it assigns one common spending response and one common exposure profile to everyone.",
  ],
  citations: lecture8CoreCitations,
});

const lecture3QuizItems: QuizItem[] = quizBank([
  {
    id: "lecture3-quiz-1",
    prompt:
      "What is the central claim of divine coincidence in the Lecture 3 benchmark?",
    choices: [
      "When there is no cost-push shock, stabilizing inflation also stabilizes the output gap.",
      "Inflation can always be stabilized without changing the output gap, regardless of shocks.",
      "The Taylor rule makes the Phillips curve irrelevant.",
      "The output gap is identical to actual output.",
    ],
    correctIndex: 0,
    explanation:
      "Lecture 3's benchmark result is precisely that, in the absence of a cost-push shock, there is no separate inflation-output-gap trade-off.",
    tags: ["divine-coincidence", "benchmark"],
    citations: lecture3CoreCitations,
  },
  {
    id: "lecture3-quiz-2",
    prompt:
      "Why does the Dynamic IS equation still matter under divine coincidence?",
    choices: [
      "Because policy still has to move the real-rate path correctly to keep the output gap closed.",
      "Because the Phillips curve disappears from the model.",
      "Because divine coincidence means inflation is backward looking.",
      "Because the natural rate is fixed and can be ignored.",
    ],
    correctIndex: 0,
    explanation:
      "Divine coincidence removes the trade-off, not the need to track the natural rate and anchor demand through policy.",
    tags: ["dynamic-is", "policy"],
    citations: lecture3CoreCitations,
  },
  {
    id: "lecture3-quiz-3",
    prompt:
      "What does recursive substitution of the Phillips curve show?",
    choices: [
      "Current inflation depends on the expected future path of output gaps.",
      "Current inflation depends only on current output.",
      "The Taylor rule can replace the Phillips curve entirely.",
      "Inflation stops depending on expectations.",
    ],
    correctIndex: 0,
    explanation:
      "The recursive-substitution note rewrites current inflation as a discounted sum of expected future output gaps.",
    tags: ["recursive-substitution", "nkpc"],
    citations: lecture3CoreCitations,
  },
  {
    id: "lecture3-quiz-4",
    prompt:
      "What is the economic role of the Taylor principle in Lecture 3?",
    choices: [
      "It helps anchor expectations and deliver a determinate equilibrium.",
      "It guarantees the output gap is always positive.",
      "It introduces the cost-push shock.",
      "It makes the natural real rate constant.",
    ],
    correctIndex: 0,
    explanation:
      "The matrix note connects sufficiently strong policy reactions to equilibrium determinacy.",
    tags: ["taylor-principle", "determinacy"],
    citations: lecture3CoreCitations,
  },
  {
    id: "lecture3-quiz-5",
    prompt:
      "What is the cleanest reason Lecture 4 matters after Lecture 3?",
    choices: [
      "Lecture 4 reintroduces a cost-push shock, so the no-trade-off benchmark breaks down.",
      "Lecture 4 removes the Phillips curve from the model.",
      "Lecture 4 proves the Taylor rule is never useful.",
      "Lecture 4 shows inflation no longer depends on expectations.",
    ],
    correctIndex: 0,
    explanation:
      "Lecture 4 matters because the cost-push shock destroys divine coincidence and makes optimal trade-offs necessary.",
    tags: ["lecture-transition", "cost-push-shock"],
    citations: lecture4CoreCitations,
  },
]);

const lecture4QuizItems: QuizItem[] = quizBank([
  {
    id: "lecture4-quiz-1",
    prompt:
      "Why does a cost-push shock break divine coincidence?",
    choices: [
      "Because inflation can now move independently of the welfare-relevant output gap.",
      "Because the Dynamic IS equation disappears.",
      "Because the central bank no longer cares about inflation.",
      "Because the natural rate becomes constant.",
    ],
    correctIndex: 0,
    explanation:
      "Once a cost-push shock enters the Phillips curve, zero gap no longer guarantees zero inflation.",
    tags: ["cost-push-shock", "divine-coincidence"],
    citations: lecture4CoreCitations,
  },
  {
    id: "lecture4-quiz-2",
    prompt:
      "What does the welfare-relevant output gap $x_t$ measure in Lecture 4?",
    choices: [
      "The real-side deviation entering the central bank's welfare loss.",
      "Actual output minus last period's output.",
      "Inflation relative to target.",
      "The monetary-policy shock.",
    ],
    correctIndex: 0,
    explanation:
      "Lecture 4 and the complementary output-gap slides emphasize that the welfare-relevant gap is the correct real stabilization target in the optimal-policy problem.",
    tags: ["welfare-gap", "notation"],
    citations: lecture4CoreCitations,
  },
  {
    id: "lecture4-quiz-3",
    prompt:
      "How should you interpret the rule $x_t = -(\\kappa/\\alpha_x)\\pi_t$?",
    choices: [
      "As a compact summary of the optimal marginal trade-off under discretion.",
      "As a structural law of motion for the economy independent of policy.",
      "As proof that inflation and the gap always have the same sign.",
      "As a rule that eliminates all inflation shocks automatically.",
    ],
    correctIndex: 0,
    explanation:
      "The rule comes from the policymaker's first-order condition. It summarizes the optimal trade-off rather than describing a primitive structural equation.",
    tags: ["targeting-rule", "discretion"],
    citations: lecture4CoreCitations,
  },
  {
    id: "lecture4-quiz-4",
    prompt:
      "Why can commitment outperform discretion in Lecture 4?",
    choices: [
      "Because commitment changes private expectations about future policy and therefore improves the current trade-off.",
      "Because commitment removes the cost-push shock from the Phillips curve.",
      "Because commitment makes the central bank ignore output completely.",
      "Because commitment eliminates the natural rate.",
    ],
    correctIndex: 0,
    explanation:
      "Commitment matters because the Phillips curve is forward looking, so credible promises about future policy affect inflation today.",
    tags: ["commitment", "expectations"],
    citations: lecture4CoreCitations,
  },
  {
    id: "lecture4-quiz-5",
    prompt:
      "Which sign pattern is most natural after a positive cost-push shock if policy leans against inflation?",
    choices: [
      "Inflation pressure up, welfare-relevant output gap pushed down.",
      "Inflation down, gap up.",
      "Inflation and gap both exactly zero by construction.",
      "Inflation unchanged, gap permanently positive.",
    ],
    correctIndex: 0,
    explanation:
      "A positive cost-push shock raises inflation directly. Optimal policy typically leans against it by creating negative real slack.",
    tags: ["shock-analysis", "optimal-policy"],
    citations: lecture4CoreCitations,
  },
]);

const lecture5QuizItems: QuizItem[] = quizBank([
  {
    id: "lecture5-quiz-1",
    prompt:
      "What creates inflation bias in the classic time-inconsistency model?",
    choices: [
      "A discretionary policymaker wants output above the natural level and private agents anticipate that incentive.",
      "The Taylor principle fails mechanically.",
      "The central bank ignores inflation completely.",
      "The Phillips curve becomes vertical in the short run.",
    ],
    correctIndex: 0,
    explanation:
      "Inflation bias is the equilibrium result of a short-run temptation to create surprise inflation when agents form rational expectations.",
    tags: ["inflation-bias", "time-inconsistency"],
    citations: lecture5CoreCitations,
  },
  {
    id: "lecture5-quiz-2",
    prompt:
      "Why does output not remain permanently above the natural level under inflation bias?",
    choices: [
      "Because expected inflation adjusts, eliminating the surprise element needed to push output above the natural level on average.",
      "Because the policymaker stops caring about output.",
      "Because rational expectations force inflation to equal zero.",
      "Because central bank independence is assumed from the start.",
    ],
    correctIndex: 0,
    explanation:
      "Once expectations rise, the short-run Phillips-curve gain disappears and only the inflation bias remains.",
    tags: ["rational-expectations", "inflation-bias"],
    citations: lecture5CoreCitations,
  },
  {
    id: "lecture5-quiz-3",
    prompt:
      "What is the cleanest role of commitment in this lecture?",
    choices: [
      "It removes the temptation to create surprise inflation after expectations are set.",
      "It makes the Phillips curve irrelevant.",
      "It guarantees output will exceed the natural level forever.",
      "It raises the policymaker's output target.",
    ],
    correctIndex: 0,
    explanation:
      "Commitment matters because it changes the incentive structure faced by private agents and the central bank.",
    tags: ["commitment", "credibility"],
    citations: lecture5CoreCitations,
  },
  {
    id: "lecture5-quiz-4",
    prompt:
      "Why is central bank independence discussed in the same lecture as time inconsistency?",
    choices: [
      "Because independence is treated as an institutional way to reduce short-run political incentives that undermine credibility.",
      "Because independence eliminates all macroeconomic shocks.",
      "Because independence makes the natural rate constant.",
      "Because independence turns discretion into a fixed exchange rate.",
    ],
    correctIndex: 0,
    explanation:
      "Lecture 5 treats independence as a practical credibility device that can reduce political pressure and inflation bias.",
    tags: ["central-bank-independence", "credibility"],
    citations: lecture5CoreCitations,
  },
  {
    id: "lecture5-quiz-5",
    prompt:
      "What happens to the inflation-bias formula if $y^* = y^n$?",
    choices: [
      "The bias disappears because the policymaker no longer wants output above the natural level.",
      "The bias doubles because policy becomes more discretionary.",
      "The Phillips curve becomes backward looking.",
      "Commitment becomes impossible.",
    ],
    correctIndex: 0,
    explanation:
      "The inflation-bias term is proportional to $y^* - y^n$. If that temptation vanishes, so does the bias.",
    tags: ["inflation-bias", "formula"],
    citations: lecture5CoreCitations,
  },
]);

const lecture6QuizItems: QuizItem[] = quizBank([
  {
    id: "lecture6-quiz-1",
    prompt:
      "Why can forward guidance stimulate the economy even when the current nominal rate is stuck?",
    choices: [
      "Because expected future policy affects current demand through the expected path of real rates.",
      "Because households ignore future rates completely.",
      "Because the zero lower bound automatically lowers inflation expectations.",
      "Because forward guidance changes the natural rate mechanically.",
    ],
    correctIndex: 0,
    explanation:
      "Lecture 6 builds its logic directly from the Dynamic IS equation: expected future real rates matter for current expenditure decisions.",
    tags: ["forward-guidance", "dynamic-is"],
    citations: lecture6CoreCitations,
  },
  {
    id: "lecture6-quiz-2",
    prompt:
      "What is the cleanest definition of Delphic forward guidance?",
    choices: [
      "Guidance that mainly reveals information about the future state of the economy.",
      "Guidance that contains a binding commitment to overshoot inflation forever.",
      "Guidance that eliminates the zero lower bound.",
      "Guidance that says future policy will be tighter than markets expect.",
    ],
    correctIndex: 0,
    explanation:
      "Delphic guidance is primarily informational. It can communicate bad news about the outlook rather than purely expansionary policy intent.",
    tags: ["delphic-guidance", "definitions"],
    citations: lecture6CoreCitations,
  },
  {
    id: "lecture6-quiz-3",
    prompt:
      "What makes Odyssean guidance different from Delphic guidance?",
    choices: [
      "Odyssean guidance contains a genuine commitment element about future policy, not just information about the outlook.",
      "Odyssean guidance ignores expectations.",
      "Odyssean guidance only matters outside the New Keynesian model.",
      "Odyssean guidance is a synonym for quantitative easing.",
    ],
    correctIndex: 0,
    explanation:
      "The lecture's key distinction is commitment versus information.",
    tags: ["odyssean-guidance", "definitions"],
    citations: lecture6CoreCitations,
  },
  {
    id: "lecture6-quiz-4",
    prompt:
      "What is the forward-guidance puzzle?",
    choices: [
      "The benchmark model can predict implausibly large current effects from small promises about far-future policy.",
      "The fact that forward guidance never affects demand.",
      "The claim that all low future rates are bad news.",
      "The idea that the zero lower bound does not matter.",
    ],
    correctIndex: 0,
    explanation:
      "The puzzle is about magnitude, not about the existence of the expectations channel.",
    tags: ["forward-guidance-puzzle", "model-limits"],
    citations: lecture6CoreCitations,
  },
  {
    id: "lecture6-quiz-5",
    prompt:
      "Why is the zero lower bound so important in this lecture?",
    choices: [
      "Because it makes current rate cuts limited, increasing the importance of expectations about future policy.",
      "Because it forces inflation to equal zero.",
      "Because it removes the Phillips curve.",
      "Because it guarantees the economy is always in a recession.",
    ],
    correctIndex: 0,
    explanation:
      "The current rate constraint is what elevates forward guidance from a side issue to a central policy tool.",
    tags: ["zlb", "forward-guidance"],
    citations: lecture6CoreCitations,
  },
]);

const lecture7QuizItems: QuizItem[] = quizBank([
  {
    id: "lecture7-quiz-1",
    prompt:
      "What does a smaller structural Phillips-curve slope $\\kappa$ mean?",
    choices: [
      "Inflation reacts less to a given amount of slack.",
      "Inflation becomes backward looking by definition.",
      "The natural rate stops moving.",
      "Policy no longer matters for inflation.",
    ],
    correctIndex: 0,
    explanation:
      "A flatter Phillips curve means inflation is less sensitive to output-gap slack.",
    tags: ["kappa", "flattening"],
    citations: lecture7CoreCitations,
  },
  {
    id: "lecture7-quiz-2",
    prompt:
      "Why can a flatter reduced-form inflation-unemployment relationship be misleading?",
    choices: [
      "Because policy, expectations, and shock composition can change the data even if the structural slope is similar.",
      "Because the Phillips curve is irrelevant in the data.",
      "Because unemployment never matters for inflation.",
      "Because cost-push shocks always dominate slack completely.",
    ],
    correctIndex: 0,
    explanation:
      "Lecture 7 stresses the identification problem: observed correlations are not the same thing as structural parameters.",
    tags: ["identification", "phillips-curve"],
    citations: lecture7CoreCitations,
  },
  {
    id: "lecture7-quiz-3",
    prompt:
      "What happens to the real cost of disinflation if the Phillips curve becomes flatter?",
    choices: [
      "The central bank may need more or longer-lasting slack to lower inflation.",
      "Disinflation becomes costless.",
      "Inflation falls faster for any given recession.",
      "The output gap becomes irrelevant.",
    ],
    correctIndex: 0,
    explanation:
      "If inflation is less responsive to slack, policy must work harder on the real side to move inflation.",
    tags: ["disinflation", "trade-off"],
    citations: lecture7CoreCitations,
  },
  {
    id: "lecture7-quiz-4",
    prompt:
      "Why does the unemployment-gap Phillips curve have a negative slope term in front of slack?",
    choices: [
      "Because more unemployment slack lowers inflation pressure.",
      "Because unemployment shocks raise inflation mechanically.",
      "Because expected inflation becomes negative.",
      "Because the policy rate is subtracted from the Phillips curve.",
    ],
    correctIndex: 0,
    explanation:
      "Higher unemployment slack means less inflation pressure, so the relationship is written with a minus sign.",
    tags: ["notation", "unemployment-gap"],
    citations: lecture7CoreCitations,
  },
  {
    id: "lecture7-quiz-5",
    prompt:
      "What is the lecture's safest summary of the flattening debate?",
    choices: [
      "A flatter structural curve changes the policy trade-off, but the data alone do not identify that structural change cleanly.",
      "The Phillips curve has disappeared completely.",
      "Inflation no longer depends on slack at all.",
      "Only cost-push shocks matter for inflation today.",
    ],
    correctIndex: 0,
    explanation:
      "Lecture 7 teaches both the policy importance of flattening and the empirical difficulty of proving it.",
    tags: ["flattening", "identification"],
    citations: lecture7CoreCitations,
  },
]);

const lecture8QuizItems: QuizItem[] = quizBank([
  {
    id: "lecture8-quiz-1",
    prompt:
      "Why does the lecture care so much about the distribution of MPCs?",
    choices: [
      "Because aggregate demand depends on who receives income changes, not only on the average household response.",
      "Because all households have identical MPCs in practice.",
      "Because MPCs only matter for inequality, not for macroeconomics.",
      "Because the representative-agent model already captures the same effect exactly.",
    ],
    correctIndex: 0,
    explanation:
      "Lecture 8's main message is that cross-sectional MPC differences make distribution macroeconomically relevant.",
    tags: ["mpc", "heterogeneity"],
    citations: lecture8CoreCitations,
  },
  {
    id: "lecture8-quiz-2",
    prompt:
      "What is the core intuition behind a HANK model relative to a representative-agent model?",
    choices: [
      "Households differ in income, wealth, exposure, and spending behavior, so policy transmission depends on distribution.",
      "HANK assumes households never look forward.",
      "HANK removes all price rigidities.",
      "HANK is only a theory of labor unions.",
    ],
    correctIndex: 0,
    explanation:
      "The lecture uses HANK to show that heterogeneity changes the transmission mechanism itself.",
    tags: ["hank", "comparison"],
    citations: lecture8CoreCitations,
  },
  {
    id: "lecture8-quiz-3",
    prompt:
      "Why can two policies with the same average income effect generate different aggregate-demand responses?",
    choices: [
      "Because the gains may land on households with different MPCs.",
      "Because average income is the only thing that matters.",
      "Because monetary policy never affects disposable income.",
      "Because only savers consume out of extra income.",
    ],
    correctIndex: 0,
    explanation:
      "The aggregate effect depends on the cross-sectional allocation of the gains, not just the average.",
    tags: ["aggregate-demand", "distribution"],
    citations: lecture8CoreCitations,
  },
  {
    id: "lecture8-quiz-4",
    prompt:
      "What is the redistribution channel of monetary policy in the lecture's broad sense?",
    choices: [
      "Policy changes shift resources across households with different MPCs and balance-sheet positions.",
      "Policy only changes the average real rate without affecting anyone differently.",
      "Policy affects inequality only through tax policy.",
      "Redistribution is treated as a purely moral, not macroeconomic, issue.",
    ],
    correctIndex: 0,
    explanation:
      "Lecture 8 treats redistribution as a core macro transmission channel.",
    tags: ["redistribution-channel", "monetary-policy"],
    citations: lecture8CoreCitations,
  },
  {
    id: "lecture8-quiz-5",
    prompt:
      "What is the cleanest reason the representative-agent benchmark misses part of the lecture's story?",
    choices: [
      "It collapses all households into one average spender and therefore loses the covariance between income changes and MPCs.",
      "It assumes inflation is constant.",
      "It ignores all policy rates.",
      "It assumes the central bank has no instrument.",
    ],
    correctIndex: 0,
    explanation:
      "The lecture's distributional macro logic depends on who gets the income change, which a one-household model cannot represent.",
    tags: ["representative-agent", "heterogeneity"],
    citations: lecture8CoreCitations,
  },
]);

export const lectures3To8Modules: ModuleDetail[] = [
  lecture3Module,
  lecture4Module,
  lecture5Module,
  lecture6Module,
  lecture7Module,
  lecture8Module,
];

export const lectures3To8NotationEntries: NotationEntry[] = [
  ...lecture3NotationEntries,
  ...lecture4NotationEntries,
  ...lecture5NotationEntries,
  ...lecture6NotationEntries,
  ...lecture7NotationEntries,
  ...lecture8NotationEntries,
];

export const lectures3To8PracticeProblems: PracticeProblem[] = [
  lecture3PracticeProblem,
  lecture4PracticeProblem,
  lecture5PracticeProblem,
  lecture6PracticeProblem,
  lecture7PracticeProblem,
  lecture8PracticeProblem,
];

export const lectures3To8QuizItemsByModule: Record<string, QuizItem[]> = {
  "lecture-3": lecture3QuizItems,
  "lecture-4": lecture4QuizItems,
  "lecture-5": lecture5QuizItems,
  "lecture-6": lecture6QuizItems,
  "lecture-7": lecture7QuizItems,
  "lecture-8": lecture8QuizItems,
};
