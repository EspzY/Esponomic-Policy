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
  notationEntry,
  p,
  practiceProblem,
  quizBank,
  shockTrace,
  workedExample,
} from "@/lib/seed-content/builders";

const lecture9Title = "Lecture 9.pdf";
const lecture10Title = "Lecture 10.pdf";
const lecture10TomzTitle = "Empirical Research on Sovereign Debt and Default";
const lecture10EichengreenTitle = "Dealing with Debt: The 1930s and the 1980s";
const lecture11Title = "Lecture 11.pdf";
const lecture11ReportTitle = "Monetary Policy Report 1/2024";
const lecture12Title = "Lecture 12.pdf";
const lecture12BrundtlandTitle = "Our Common Future";
const lecture12HardinTitle = "The Tragedy of the Commons";
const lecture12SternTitle = "The Economics of Climate Change";
const seminar3Title = "GRA6631_TA3_Sheet.pdf";

const lecture9CoreCitations: Citation[] = [
  cite(
    lecture9Title,
    "selected slides",
    "Covers the government budget constraint, Ricardian equivalence, and tax smoothing.",
    "lecture",
  ),
  cite(
    seminar3Title,
    "public-debt section",
    "Provides guided exercises on Ricardian equivalence and debt sustainability.",
    "problem_set",
  ),
];

const lecture10CoreCitations: Citation[] = [
  cite(
    lecture10Title,
    "selected slides",
    "Covers debt sustainability, debt crises, and the political economy of debt.",
    "lecture",
  ),
  cite(
    lecture10TomzTitle,
    "selected discussion",
    "Provides background on sovereign debt, default, and empirical debt-crisis patterns.",
    "paper",
  ),
  cite(
    lecture10EichengreenTitle,
    "selected discussion",
    "Provides historical perspective on debt crises and adjustment.",
    "paper",
  ),
  cite(
    seminar3Title,
    "debt-sustainability section",
    "Provides the debt-dynamics approximation used in guided practice.",
    "problem_set",
  ),
];

const lecture11CoreCitations: Citation[] = [
  cite(
    lecture11Title,
    "selected slides",
    "Covers functional and personal distribution, the Scandinavian model, and inequality measures.",
    "lecture",
  ),
  cite(
    lecture11ReportTitle,
    "selected discussion",
    "Provides recent central-bank discussion of income developments and distributional conditions.",
    "policy_report",
  ),
];

const lecture12CoreCitations: Citation[] = [
  cite(
    lecture12Title,
    "selected slides",
    "Covers sustainability, resource constraints, externalities, and environmental policy instruments.",
    "lecture",
  ),
  cite(
    lecture12BrundtlandTitle,
    "selected discussion",
    "Provides the course's benchmark definition of sustainable development.",
    "paper",
  ),
  cite(
    lecture12HardinTitle,
    "selected discussion",
    "Provides the classic commons-externality benchmark.",
    "paper",
  ),
  cite(
    lecture12SternTitle,
    "selected discussion",
    "Provides the policy-economics framing of climate externalities and carbon pricing.",
    "paper",
  ),
  cite(
    seminar3Title,
    "environment section",
    "Provides guided prompts on carbon taxes, cap-and-trade, and environmental externalities.",
    "problem_set",
  ),
];

const lecture9Module: ModuleDetail = lectureModule({
  id: "lecture-9",
  slug: "lecture-9",
  title: "Lecture 9: Government Debt and Fiscal Policy",
  summary:
    "How the government's budget constraint, Ricardian equivalence, and tax smoothing fit together.",
  description:
    "This module turns Lecture 9 into a stepwise fiscal-policy guide. It explains the government budget constraint, the no-Ponzi logic, the Ricardian-equivalence benchmark, and why the timing of taxes can matter less than students often think under strong assumptions.",
  estimatedMinutes: 95,
  tags: ["lecture-9", "government-debt", "ricardian-equivalence", "tax-smoothing"],
  objectives: [
    "Read the government budget constraint dynamically rather than as a static accounting identity.",
    "Explain what Ricardian equivalence does and does not claim.",
    "Use tax smoothing as a policy benchmark rather than a slogan.",
  ],
  sections: [
    {
      id: "lecture-9-big-picture",
      slug: "big-picture-and-exam-relevance",
      title: "Big picture and why this lecture matters",
      summary: "Lecture 9 gives the fiscal side of the stabilization story.",
      contentBlocks: [
        p(
          "Lecture 9 shifts from monetary policy to fiscal arithmetic. The central question is simple: **how can the government borrow, tax, and spend over time without violating its intertemporal budget constraint?** Once that question is clear, Ricardian equivalence and tax smoothing become much easier to interpret.",
        ),
        p(
          "Relative to the earlier monetary-policy lectures, what changes is the object of discipline: instead of a reaction function for the policy rate, you now need an intertemporal accounting logic for taxes, spending, and debt. What stays is the benchmark mentality. What you must carry forward is that borrowing changes timing, not the need for financing itself.",
        ),
      ],
      citations: lecture9CoreCitations,
    },
    {
      id: "lecture-9-notation",
      slug: "notation-and-glossary",
      title: "Notation and glossary",
      summary: "The debt and flow objects that organize the lecture.",
      contentBlocks: [
        eq(
          "Debt accumulation",
          "\\dot D(t) = [G(t) - T(t)] + r(t)D(t)",
          "Debt rises because of the primary deficit and because interest accrues on existing debt.",
        ),
        eq(
          "No-Ponzi condition",
          "\\lim_{s \\to \\infty} e^{-R(s)}D(s) \\leq 0",
          "The present value of debt cannot explode forever without future resources to back it.",
        ),
        eq(
          "Household intertemporal budget logic",
          "\\text{PV}(C) = \\text{initial wealth} + \\text{PV}(Y-T)",
          "Ricardian equivalence works by showing that lower taxes today imply higher taxes later, so lifetime resources need not change under the benchmark assumptions.",
        ),
      ],
      citations: lecture9CoreCitations,
    },
    {
      id: "lecture-9-setup",
      slug: "setup-assumptions-and-benchmark",
      title: "Setup, assumptions, and benchmark",
      summary: "Fiscal policy written as an intertemporal problem.",
      contentBlocks: [
        p(
          "The lecture starts from the government budget constraint and then interprets it intertemporally: current debt must be backed by the present value of future primary surpluses. That is the benchmark behind solvency, Ricardian equivalence, and tax smoothing.",
        ),
      ],
      citations: lecture9CoreCitations,
    },
    {
      id: "lecture-9-mechanism-a",
      slug: "core-mechanism-a",
      title: "Core mechanism A: debt dynamics and solvency",
      summary: "Why debt is not free just because borrowing is possible.",
      contentBlocks: [
        p(
          "Borrowing shifts taxes over time, but it does not erase the budget constraint. Debt dynamics tell you how current deficits accumulate and why future surpluses must eventually validate current borrowing if default or monetization is to be avoided.",
        ),
      ],
      citations: lecture9CoreCitations,
    },
    {
      id: "lecture-9-mechanism-b",
      slug: "core-mechanism-b",
      title: "Core mechanism B: Ricardian equivalence and tax smoothing",
      summary: "When the timing of taxes may matter less than students think.",
      contentBlocks: [
        p(
          "Under strong assumptions, debt-financed tax cuts do not raise private wealth because households understand that future taxes must rise. That is the Ricardian-equivalence benchmark. The tax-smoothing logic then says governments may want to spread distortionary taxation over time rather than changing taxes sharply each period.",
        ),
        p(
          "The lecture's logic is more precise than the slogan. Ricardian equivalence comes from combining the **government's intertemporal budget constraint** with the **household's intertemporal budget constraint**. When the government cuts taxes today and borrows instead, the present value of future taxes rises by the same amount under the benchmark assumptions, so lifetime household resources do not change.",
        ),
        p(
          "Tax smoothing is a second layer. Even if the government must eventually finance spending, it need not do so with a wildly varying tax path. If taxes are distortionary, the lecture's benchmark says it is optimal to keep the **marginal distortion of taxation** as even as possible across periods instead of making tax rates jump around sharply.",
        ),
      ],
      citations: lecture9CoreCitations,
    },
    {
      id: "lecture-9-compact",
      slug: "from-detailed-setup-to-the-compact-result",
      title: "From detailed setup to the compact result",
      summary: "The lecture's cleanest fiscal takeaway.",
      contentBlocks: [
        p(
          "The compact takeaway is that government borrowing changes the timing of financing, not the need for financing itself. Under strong benchmark assumptions, the private sector understands that and may offset debt-financed tax changes through its own saving behavior.",
        ),
        p(
          "Carry this forward into Lecture 10: once you understand the arithmetic of debt and fiscal promises, the next question is when those same dynamics become fragile enough to generate crisis logic.",
        ),
      ],
      citations: lecture9CoreCitations,
    },
    {
      id: "lecture-9-derivation",
      slug: "step-by-step-derivation-or-mechanism-chain",
      title: "Step by step: from the flow budget to the intertemporal budget constraint",
      summary: "The key fiscal derivation in the module.",
      contentBlocks: [
        derivation({
          title: "Start from the debt-accumulation equation",
          learningGoal:
            "See how the one-period fiscal identity becomes an intertemporal solvency condition.",
          latexBefore: "\\dot D(t) = [G(t) - T(t)] + r(t)D(t)",
          operation:
            "Forward-solve the debt equation and discount future values back to the present.",
          whyValid:
            "Debt is a stock variable, so its current value must equal the discounted value of future financing needs and resources.",
          latexAfter:
            "\\text{Current debt} = \\text{present value of future primary surpluses, subject to the no-Ponzi condition}",
          explanation:
            "This is the fiscal version of 'there is no free lunch'. Borrowing today means future fiscal adjustment somewhere in the system.",
        }),
        derivation({
          title: "Write the flow budget in present-value form before summing forward",
          learningGoal:
            "Show the mathematical bridge from a one-period differential equation to an intertemporal solvency condition.",
          latexBefore: "\\dot D(t) - r(t)D(t) = G(t) - T(t)",
          operation:
            "Multiply by the integrating factor that discounts debt at the interest rate, then integrate forward over time.",
          whyValid:
            "This is the continuous-time analogue of solving a first-order linear difference equation. The integrating factor turns the left-hand side into the time derivative of discounted debt.",
          latexAfter:
            "\\frac{d}{dt}\\left[e^{-\\int_0^t r(s)ds}D(t)\\right] = e^{-\\int_0^t r(s)ds}\\,[G(t)-T(t)]",
          explanation:
            "This is the step many students skip. Once the debt stock is written in discounted form, the intertemporal budget constraint is just the integral of today's discounted financing need plus the no-Ponzi boundary condition.",
        }),
        derivation({
          title: "Where Ricardian equivalence comes from",
          learningGoal:
            "See why the benchmark wealth effect disappears only after the household and government budgets are combined.",
          operation:
            "Start from the household present-value budget and substitute in the government's intertemporal budget implication that lower current taxes must be offset by higher future taxes of equal present value.",
          whyValid:
            "The lecture's point is that debt changes the timing of taxes, not their present value, under the benchmark assumptions of forward-looking households and lump-sum taxation.",
          latexAfter:
            "\\Delta \\text{PV}(Y-T) = 0 \\quad \\Rightarrow \\quad \\Delta \\text{private wealth} = 0",
          explanation:
            "That is the clean Ricardian result. The tax cut feels expansionary only if some part of the benchmark fails, for example liquidity constraints, myopia, distortionary taxation, or unequal incidence.",
        }),
        derivation({
          title: "Show the cancellation that kills the benchmark wealth effect",
          learningGoal:
            "Make the logic of Ricardian equivalence explicit instead of leaving the crucial cancellation hidden.",
          latexBefore:
            "\\text{PV consumption resources} = \\text{PV income} - \\text{PV taxes} + \\text{initial bond holdings}",
          operation:
            "Replace lower current taxes plus higher public debt by the equal-present-value increase in future taxes implied by the government budget constraint.",
          whyValid:
            "Under lump-sum taxation and forward-looking households, government debt is not net wealth. Households internalize that the bonds they hold are matched by future taxes they or their descendants must pay.",
          latexAfter:
            "\\Delta\\bigl[-\\text{PV}(T) + D_0\\bigr] = 0 \\quad \\Rightarrow \\quad \\Delta\\text{consumption resources} = 0",
          explanation:
            "The benchmark result is therefore a cancellation argument, not magic. A debt-financed tax cut fails to create net wealth because the bond asset and the tax liability are two sides of the same intertemporal government position.",
        }),
        derivation({
          title: "Why tax smoothing equalizes marginal distortion over time",
          learningGoal:
            "Understand why the lecture treats stable tax rates as a benchmark when taxes are costly.",
          operation:
            "Write the government's problem as minimizing the total distortion from taxation subject to the intertemporal financing requirement.",
          whyValid:
            "If the distortion function is convex, one very high tax rate is more costly than several moderate tax rates with the same present-value revenue.",
          latexAfter:
            "f'\\!\\left(\\frac{T_t}{Y_t}\\right) = \\lambda \\quad \\text{across periods in the benchmark optimum}",
          explanation:
            "The exact message is that the marginal deadweight cost of taxation should be smoothed over time. That is the economic core behind the lecture's tax-smoothing benchmark.",
        }),
        derivation({
          title: "Turn equal marginal distortion into a constant tax share",
          learningGoal:
            "Bridge the first-order condition to the exam-style claim that taxes should be a constant fraction of income in the benchmark optimum.",
          operation:
            "Use the fact that the marginal distortion is a function of the tax share alone. If the same multiplier applies in every period and $f'$ is monotone under convexity, the tax share must be the same in every period.",
          whyValid:
            "Convexity implies $f''(\\cdot)>0$, so $f'(\\cdot)$ is one-to-one. Equal values of $f'$ therefore imply equal arguments, which here means equal values of $T_t/Y_t$.",
          latexAfter:
            "f'\\!\\left(\\frac{T_t}{Y_t}\\right)=\\lambda \\ \\forall t \\quad \\Rightarrow \\quad \\frac{T_t}{Y_t}=\\tau \\ \\forall t",
          explanation:
            "This is the missing bridge students often hand-wave. The planner is not smoothing nominal tax revenue itself, but the tax share that governs marginal distortion in the objective.",
        }),
      ],
      citations: lecture9CoreCitations,
    },
    {
      id: "lecture-9-analysis",
      slug: "shock-analysis-or-figure-interpretation",
      title: "Fiscal analysis and comparative statics",
      summary: "How to reason through debt-financed tax changes.",
      contentBlocks: [
        shockTrace({
          title: "Temporary debt-financed tax cut under Ricardian equivalence",
          shock:
            "The government cuts taxes today and issues debt instead of raising taxes immediately.",
          steps: [
            {
              variable: "Government debt",
              direction: "up today",
              explanation:
                "Current borrowing rises because the government defers part of the financing burden.",
            },
            {
              variable: "Private saving",
              direction: "up in the Ricardian benchmark",
              explanation:
                "Households anticipate future taxes and save more rather than consuming all of the tax cut.",
            },
            {
              variable: "Aggregate demand",
              direction: "little changed in the benchmark",
              explanation:
                "If households fully internalize future taxes, the timing shift does not create net private wealth.",
            },
          ],
        }),
        p(
          "Lecture 9 also warns about **measurement issues**. Inflation can mechanically raise nominal deficit measures even when the real fiscal position has not worsened in the same way, and asset sales can change gross debt figures without changing the underlying intertemporal need for resources. A careful answer therefore separates accounting labels from the real solvency logic.",
        ),
        figureNote({
          title: "Conventional view versus Ricardian-equivalence benchmark",
          caption:
            "Screenshot from Lecture 9 contrasting the standard demand-stimulus view of debt with the Ricardian benchmark. It is useful because the lecture is really training students to compare two mechanisms, not to memorize one slogan.",
          imagePath: "/figures/lecture-9/ricardian-equivalence-alternative-view.png",
          altText:
            "Lecture 9 slide titled Alternative view, listing Ricardian equivalence and explaining why higher current debt implies future taxes that households anticipate.",
          note:
            "What to notice: the lecture's payoff comes from comparing the two views slowly and identifying exactly which assumptions make the Ricardian benchmark bite.",
        }),
      ],
      citations: lecture9CoreCitations,
    },
    {
      id: "lecture-9-guided",
      slug: "guided-problem-walkthrough",
      title: "Guided problem walkthrough",
      summary: "A Seminar 3-style Ricardian-equivalence question.",
      contentBlocks: [
        workedExample({
          title: "When does debt-financed tax relief fail to boost demand?",
          prompt:
            "Explain why a debt-financed tax cut may have little effect on aggregate demand in the Ricardian-equivalence benchmark.",
          steps: [
            {
              title: "Step 1: name the fiscal change",
              markdown:
                "Taxes fall today, so households receive higher disposable income in the current period.",
            },
            {
              title: "Step 2: impose forward-looking household behavior",
              markdown:
                "Households understand that future taxes must rise because debt increased today.",
            },
            {
              title: "Step 3: state the benchmark implication",
              markdown:
                "If households save the tax cut to pay for expected future taxes, current demand changes little.",
            },
            {
              title: "Step 4: explain why the benchmark may fail",
              markdown:
                "The lecture and exams expect you to go one step further: liquidity constraints, myopia, distortionary taxes, or unequal incidence can all restore real demand effects even when the Ricardian benchmark itself is internally coherent.",
            },
          ],
        }),
      ],
      citations: lecture9CoreCitations,
    },
    {
      id: "lecture-9-traps",
      slug: "common-traps-and-quick-recap",
      title: "Common traps and quick recap",
      summary: "The mistakes that turn fiscal accounting into confusion.",
      contentBlocks: [
        checklist(
          [
            "Debt shifts financing over time; it does not remove the budget constraint.",
            "Ricardian equivalence is a benchmark with strong assumptions, not a universal law.",
            "Tax smoothing is about minimizing distortion over time, not about avoiding taxes forever.",
            "Inflation, nominal debt measures, or asset sales can change accounting numbers without changing the core intertemporal solvency question in the same way.",
            "Carry forward: later debt-crisis reasoning is much easier if you already separate fiscal arithmetic from market beliefs.",
          ],
          "Quick recap",
        ),
        examTrap(
          "Treating Ricardian equivalence as either obviously true or obviously absurd",
          "Students often answer debt questions by taking a side immediately instead of identifying the benchmark assumptions and then asking which real-world frictions break them.",
          "Start from the benchmark cleanly. Then say which assumptions fail in practice and how those failures restore demand effects, distributional effects, or crisis risks.",
        ),
      ],
      citations: lecture9CoreCitations,
    },
  ],
  citations: lecture9CoreCitations,
});

const lecture10Module: ModuleDetail = lectureModule({
  id: "lecture-10",
  slug: "lecture-10",
  title: "Lecture 10: Debt and Debt Crisis",
  summary:
    "How debt sustainability, rollover risk, and political economy combine to produce crisis dynamics.",
  description:
    "This module rebuilds Lecture 10 around the debt-sustainability equation, the role of the interest-growth differential, and the possibility that debt crises arise from both weak fundamentals and self-fulfilling shifts in market beliefs.",
  estimatedMinutes: 100,
  tags: ["lecture-10", "debt-crisis", "sustainability", "sovereign-debt"],
  objectives: [
    "Use the debt-dynamics approximation correctly.",
    "Explain how the interest-growth differential affects sustainability.",
    "Describe why debt crises can involve both fundamentals and expectations.",
  ],
  sections: [
    {
      id: "lecture-10-big-picture",
      slug: "big-picture-and-exam-relevance",
      title: "Big picture and why this lecture matters",
      summary: "Lecture 10 is where fiscal arithmetic turns into crisis logic.",
      contentBlocks: [
        p(
          "Lecture 9 gave you the fiscal arithmetic. Lecture 10 asks when that arithmetic becomes dangerous. The central question is: **under what conditions can public debt be rolled over safely, and when can the same debt stock trigger a crisis?**",
        ),
        p(
          "Relative to Lecture 9, what changes is that market beliefs and rollover conditions now matter alongside accounting. What stays is the debt-dynamics logic. What you must carry forward is that crises are rarely just about one equation; they emerge when arithmetic, expectations, and institutions reinforce each other.",
        ),
      ],
      citations: lecture10CoreCitations,
    },
    {
      id: "lecture-10-notation",
      slug: "notation-and-glossary",
      title: "Notation and glossary",
      summary: "The compact debt-dynamics objects you need for crisis analysis.",
      contentBlocks: [
        eq(
          "Debt-ratio approximation",
          "\\Delta d \\approx (r-g)\\,d - s",
          "The debt ratio rises when the interest-growth differential is large relative to the primary surplus.",
        ),
      ],
      citations: lecture10CoreCitations,
    },
    {
      id: "lecture-10-setup",
      slug: "setup-assumptions-and-benchmark",
      title: "Setup, assumptions, and benchmark",
      summary: "Debt sustainability written in ratio form.",
      contentBlocks: [
        p(
          "The lecture rewrites fiscal sustainability in debt-ratio language. That makes the intuition sharper: whether debt is stabilizing or exploding depends on the starting debt ratio, the interest-growth differential, and the government's primary balance.",
        ),
      ],
      citations: lecture10CoreCitations,
    },
    {
      id: "lecture-10-mechanism-a",
      slug: "core-mechanism-a",
      title: "Core mechanism A: the mechanics of sustainable debt",
      summary: "Why $r-g$ and the primary surplus matter so much.",
      contentBlocks: [
        p(
          "If the interest rate exceeds the growth rate, existing debt tends to snowball unless the government runs sufficient primary surpluses. If growth is strong relative to the interest rate, the debt burden is easier to stabilize. This is the mechanical core of the lecture.",
        ),
      ],
      citations: lecture10CoreCitations,
    },
    {
      id: "lecture-10-mechanism-b",
      slug: "core-mechanism-b",
      title: "Core mechanism B: crisis dynamics and political economy",
      summary: "Why crises are not just arithmetic.",
      contentBlocks: [
        p(
          "The lecture then adds the market side: rollover risk, default fears, and political economy. If investors begin to doubt repayment capacity, required yields can rise, which worsens debt dynamics and can help create the crisis they feared. That is why debt crises can involve both weak fundamentals and self-reinforcing beliefs.",
        ),
        p(
          "The political-economy part matters too. The lecture explicitly discusses **strategic debt accumulation** and the **fiscal commons** problem: current governments may borrow more because the future costs are shared across later governments or later taxpayers, while the current political benefits are concentrated. That is why crisis vulnerability is not only a market story; it is also an institutional story.",
        ),
        p(
          "So the lecture's crisis logic has three layers: arithmetic, beliefs, and institutions. A country can look safe when $g>r$, but if debt becomes high enough, markets may demand a higher return, which raises $r$, worsens the debt path, and potentially shifts the economy from a benign equilibrium to a bad one.",
        ),
      ],
      citations: lecture10CoreCitations,
    },
    {
      id: "lecture-10-compact",
      slug: "from-detailed-setup-to-the-compact-result",
      title: "From detailed setup to the compact result",
      summary: "The lecture's main debt takeaway.",
      contentBlocks: [
        p(
          "The compact takeaway is that debt sustainability depends on the interaction between fiscal arithmetic and market beliefs. A bad enough $r-g$ differential or insufficient primary surplus can destabilize debt mechanically, but investor fears can also worsen those mechanics further.",
        ),
        p(
          "Carry this forward into the remaining course: from here on, apparently small changes in expectations or institutions should always be read as potential amplifiers of an underlying benchmark mechanism.",
        ),
      ],
      citations: lecture10CoreCitations,
    },
    {
      id: "lecture-10-derivation",
      slug: "step-by-step-derivation-or-mechanism-chain",
      title: "Step by step: reading the debt-dynamics equation",
      summary: "The most important compact formula in the lecture.",
      contentBlocks: [
        derivation({
          title: "Separate the three moving parts",
          learningGoal:
            "Read the debt-dynamics equation term by term rather than as one opaque expression.",
          latexBefore: "\\Delta d \\approx (r-g)\\,d - s",
          operation:
            "Split the expression into the snowball term and the primary-balance term.",
          whyValid:
            "The equation is an approximation designed to isolate the channels moving the debt ratio.",
          latexAfter:
            "\\text{Debt ratio change} = \\text{snowball effect} - \\text{primary surplus}",
          explanation:
            "The snowball effect says existing debt becomes harder to carry when interest exceeds growth. The primary surplus works in the opposite direction by actively paying debt down.",
        }),
        derivation({
          title: "Why debt can still be sustainable when growth exceeds the interest rate",
          learningGoal:
            "Understand the lecture's important qualification that a high debt ratio does not automatically imply crisis.",
          operation:
            "Hold the debt ratio fixed and ask what sign of the primary balance is compatible with stability when the snowball term is negative.",
          whyValid:
            "If $g>r$, then $(r-g)d$ is negative. That means some debt stabilization can come from growth itself rather than from a large primary surplus.",
          latexAfter:
            "g > r \\quad \\Rightarrow \\quad (r-g)d < 0 \\quad \\Rightarrow \\quad \\text{a primary deficit can coexist with stable debt in the benchmark arithmetic}",
          explanation:
            "This is the logic behind the lecture's discussion of countries such as Japan. The arithmetic may be sustainable even with a very high debt ratio when financing conditions remain favorable.",
        }),
        derivation({
          title: "Why a crisis can appear without a huge change in debt",
          learningGoal:
            "See the lecture's multiple-equilibrium logic rather than treating crises as a smooth function of fundamentals alone.",
          operation:
            "Imagine that default fears raise required returns. A higher required return worsens the debt path, which can validate the original fear.",
          whyValid:
            "The lecture's crisis slides explicitly describe an unstable equilibrium and self-fulfilling default prophecies.",
          latexAfter:
            "\\text{Fear of default} \\Rightarrow r \\uparrow \\Rightarrow (r-g)d \\uparrow \\Rightarrow \\text{default becomes more likely}",
          explanation:
            "This is why Lecture 10 cannot be reduced to a single debt-ratio formula. Crisis timing depends on the interaction between weak fundamentals and belief-driven amplification.",
        }),
      ],
      citations: lecture10CoreCitations,
    },
    {
      id: "lecture-10-analysis",
      slug: "shock-analysis-or-figure-interpretation",
      title: "Shock analysis and crisis interpretation",
      summary: "How to think through a sovereign-debt scare.",
      contentBlocks: [
        shockTrace({
          title: "Rise in perceived default risk",
          shock:
            "Investors become more worried about repayment and demand higher yields.",
          steps: [
            {
              variable: "$r-g$",
              direction: "up",
              explanation:
                "Higher borrowing costs raise the interest-growth differential.",
            },
            {
              variable: "$\\Delta d$",
              direction: "up",
              explanation:
                "Worse debt dynamics follow mechanically when the snowball term rises.",
            },
            {
              variable: "Crisis risk",
              direction: "up further",
              explanation:
                "This is the self-reinforcing part: fear can worsen fundamentals and make the feared crisis more likely.",
            },
          ],
        }),
        p(
          "The lecture's graphical crisis story is therefore about **multiple equilibria**. A country may have one benign equilibrium with moderate borrowing costs and another bad equilibrium with very high borrowing costs. The unstable middle case is where beliefs matter most: if investors coordinate on fear, the bad equilibrium can become self-fulfilling even without a dramatic new fiscal shock that day.",
        ),
        figureNote({
          title: "Debt paths and crisis scenarios",
          caption:
            "Screenshot from the sovereign-debt survey paper showing the historical frequency of sovereign default. It is useful because it adds historical scale to the lecture's point that crisis episodes cluster and are not theoretical curiosities.",
          imagePath: "/figures/lecture-10/frequency-of-sovereign-default.png",
          altText:
            "Figure from Empirical Research on Sovereign Debt and Default showing the frequency of sovereign default over time with a line for the proportion of borrowers in default and bars for the number of defaulting countries.",
          note:
            "What to notice: the lecture is not only about one country's arithmetic. It is also about how default risk and crisis incidence vary over time and can rise in waves.",
        }),
        p(
          "This also explains why the Japan example is pedagogically useful. Very high debt alone does not mechanically imply crisis. What matters is the whole package: $r-g$, the expected primary balance, the investor base, institutional credibility, and whether markets see the debt path as rollover-safe.",
        ),
      ],
      citations: lecture10CoreCitations,
    },
    {
      id: "lecture-10-guided",
      slug: "guided-problem-walkthrough",
      title: "Guided problem walkthrough",
      summary: "A Seminar 3-style sustainability question.",
      contentBlocks: [
        workedExample({
          title: "When does the debt ratio become unstable?",
          prompt:
            "Use $$\\Delta d \\approx (r-g)d - s$$ to explain how a rise in the interest-growth differential changes debt sustainability.",
          steps: [
            {
              title: "Step 1: isolate the snowball term",
              markdown:
                "If $r-g$ rises, the existing debt stock contributes more to debt-ratio growth.",
            },
            {
              title: "Step 2: compare with the primary surplus",
              markdown:
                "To keep debt stable, the government now needs a larger primary surplus than before.",
            },
            {
              title: "Step 3: connect to crisis risk",
              markdown:
                "If markets doubt that the larger surplus will be delivered, yields may rise further and the situation can deteriorate quickly.",
            },
            {
              title: "Step 4: add the $g>r$ benchmark",
              markdown:
                "A careful exam answer also says the reverse: if growth exceeds the interest rate, even a very large debt stock can be sustainable for a long time. Crisis logic starts when that benign benchmark no longer looks credible.",
            },
          ],
        }),
      ],
      citations: lecture10CoreCitations,
    },
    {
      id: "lecture-10-traps",
      slug: "common-traps-and-quick-recap",
      title: "Common traps and quick recap",
      summary: "The debt equation is simple, but misread constantly.",
      contentBlocks: [
        checklist(
          [
            "The debt ratio depends on the interest-growth differential, the initial debt stock, and the primary surplus.",
            "Debt crises involve both arithmetic and expectations.",
            "A crisis can be amplified by higher yields that worsen the debt path itself.",
            "A favorable $g>r$ benchmark is helpful, but it is not a free pass once beliefs, rollover risk, or political incentives start pushing yields upward.",
            "Carry forward: whenever the course later discusses vulnerability, ask what part is fundamentals and what part is amplification through expectations.",
          ],
          "Quick recap",
        ),
        examTrap(
          "Reading the debt equation as if it fully determines crisis timing",
          "Students often write the debt-dynamics equation correctly and then act as if the crisis question is already solved.",
          "Use the equation as the arithmetic core, then add rollover risk, investor beliefs, and institutional credibility. Lecture 10 is precisely about the interaction between those layers.",
        ),
      ],
      citations: lecture10CoreCitations,
    },
  ],
  citations: lecture10CoreCitations,
});

const lecture11Module: ModuleDetail = lectureModule({
  id: "lecture-11",
  slug: "lecture-11",
  title: "Lecture 11: Inequality",
  summary:
    "How factor shares, wage-setting systems, and inequality measures help organize distributional analysis.",
  description:
    "This module turns Lecture 11 into a structured guide to inequality. It covers functional and personal income distribution, the Scandinavian wage-setting model, Cobb-Douglas factor shares, and standard inequality measures such as the Lorenz curve and the Gini coefficient.",
  estimatedMinutes: 90,
  tags: ["lecture-11", "inequality", "factor-shares", "gini"],
  objectives: [
    "Distinguish functional from personal income distribution.",
    "Derive factor shares from a Cobb-Douglas production function.",
    "Explain what Lorenz curves and Gini coefficients do and do not measure.",
  ],
  sections: [
    {
      id: "lecture-11-big-picture",
      slug: "big-picture-and-exam-relevance",
      title: "Big picture and why this lecture matters",
      summary: "Lecture 11 organizes distribution into several different questions.",
      contentBlocks: [
        p(
          "Lecture 11 is useful because it prevents the word **inequality** from becoming too vague. The lecture separates functional distribution, personal distribution, wage-setting systems, and summary measures such as the Gini coefficient. Those are related, but they answer different questions.",
        ),
        p(
          "Relative to Lecture 8, what changes is that the course now classifies distributional outcomes rather than focusing mainly on transmission. What stays is the need to ask who gets income and why. What you must carry forward is that inequality measures are only informative when you know what kind of distribution they are summarizing.",
        ),
      ],
      citations: lecture11CoreCitations,
    },
    {
      id: "lecture-11-notation",
      slug: "notation-and-glossary",
      title: "Notation and glossary",
      summary: "The key objects for factor shares and inequality measures.",
      contentBlocks: [
        eq(
          "Cobb-Douglas production function",
          "Y = K^{\\alpha}L^{1-\\alpha}",
          "The lecture uses this to interpret capital and labor shares in a clean benchmark.",
        ),
        eq(
          "Factor shares",
          "\\text{capital share} = \\alpha, \\quad \\text{labor share} = 1-\\alpha",
          "Under Cobb-Douglas technology, the exponents line up with factor-income shares.",
        ),
        eq(
          "Approximate Gini from the Lorenz curve",
          "G \\approx 1 - 2 \\times (\\text{area under the Lorenz curve})",
          "The seminar material uses this approximation together with the trapezoid rule to turn a Lorenz curve into a computable inequality measure.",
        ),
      ],
      citations: lecture11CoreCitations,
    },
    {
      id: "lecture-11-setup",
      slug: "setup-assumptions-and-benchmark",
      title: "Setup, assumptions, and benchmark",
      summary: "A lecture about several layers of distribution at once.",
      contentBlocks: [
        p(
          "The lecture moves between different concepts of distribution. Functional distribution asks how total income is split between labor and capital. Personal distribution asks how income is split across households or people. Wage-setting institutions affect both, but not always in the same way.",
        ),
      ],
      citations: lecture11CoreCitations,
    },
    {
      id: "lecture-11-mechanism-a",
      slug: "core-mechanism-a",
      title: "Core mechanism A: factor shares and production",
      summary: "Why the Cobb-Douglas benchmark is so convenient.",
      contentBlocks: [
        p(
          "Under a Cobb-Douglas production function, the labor and capital shares are easy to read: labor gets $1-\\alpha$ and capital gets $\\alpha$. That gives the lecture a clean benchmark for thinking about functional distribution before turning to wage systems and personal inequality.",
        ),
      ],
      citations: lecture11CoreCitations,
    },
    {
      id: "lecture-11-mechanism-b",
      slug: "core-mechanism-b",
      title: "Core mechanism B: institutions and personal inequality",
      summary: "Why labor-market institutions matter for the personal distribution of income.",
      contentBlocks: [
        p(
          "The Scandinavian model and other wage-setting institutions matter because they influence wage compression, bargaining outcomes, and therefore the distribution of labor income across workers. The lecture uses this to connect macro institutions to personal inequality rather than treating inequality as purely technological.",
        ),
        eq(
          "Scandinavian benchmark",
          "\\dot p_t^T = \\dot e + \\dot p_x, \\qquad \\dot w = \\dot p_t^T + \\dot a_t",
          "The traded sector anchors wage growth, and economy-wide wage setting then transmits that anchor to the rest of the economy.",
        ),
        p(
          "The lecture's mechanism is that centralized wage bargaining tends to compress wage dispersion more than a decentralized labor market. So when seminar or exam questions ask how the Scandinavian model affects inequality, the safe answer is not just 'more coordination'. It is 'more wage compression, which tends to lower personal income dispersion and therefore lower measured inequality, other things equal.'",
        ),
      ],
      citations: lecture11CoreCitations,
    },
    {
      id: "lecture-11-compact",
      slug: "from-detailed-setup-to-the-compact-result",
      title: "From detailed setup to the compact result",
      summary: "The lecture's main distributional takeaway.",
      contentBlocks: [
        p(
          "The compact takeaway is that inequality has multiple layers. Factor shares tell you how total income is split between labor and capital, while Lorenz curves and Gini coefficients summarize how income is distributed across people. Institutions can matter for both.",
        ),
        p(
          "Carry this forward into policy discussions: if the question changes from wages to personal income, or from a curve to a summary index, your interpretation must change too.",
        ),
      ],
      citations: lecture11CoreCitations,
    },
    {
      id: "lecture-11-derivation",
      slug: "step-by-step-derivation-or-mechanism-chain",
      title: "Step by step: deriving factor shares from Cobb-Douglas",
      summary: "The cleanest mathematical result in the lecture.",
      contentBlocks: [
        derivation({
          title: "Read the exponents as shares",
          learningGoal:
            "See why the lecture can interpret $\\alpha$ and $1-\\alpha$ as factor-income shares in the Cobb-Douglas benchmark.",
          latexBefore: "Y = K^{\\alpha}L^{1-\\alpha}",
          operation:
            "Use marginal-product pricing under the Cobb-Douglas benchmark to map the exponents into factor shares.",
          whyValid:
            "Under the benchmark assumptions, factor prices equal marginal products and the Cobb-Douglas form yields constant income shares.",
          latexAfter:
            "\\text{capital share} = \\alpha, \\quad \\text{labor share} = 1-\\alpha",
          explanation:
            "This is one of the lecture's most useful compact results because it turns a production function directly into a distributional benchmark.",
        }),
        derivation({
          title: "How to move from quintile shares to an approximate Gini",
          learningGoal:
            "Turn the seminar-sheet procedure into a reproducible calculation rather than a memorized formula.",
          operation:
            "Sort households by income, compute cumulative population and cumulative income shares, draw the Lorenz curve through those points, and approximate the enclosed area with trapezoids.",
          whyValid:
            "The seminar and exam material explicitly use the approximation $G \\approx 1 - 2A$, where $A$ is the area under the Lorenz curve.",
          latexAfter:
            "G \\approx 1 - 2A, \\qquad A \\approx \\sum_j \\frac{L_j + L_{j-1}}{2}(P_j - P_{j-1})",
          explanation:
            "This is the mechanical procedure students are expected to carry out. The point is not only to get a number, but to understand how the Lorenz geometry is being translated into an inequality statistic.",
        }),
      ],
      citations: lecture11CoreCitations,
    },
    {
      id: "lecture-11-analysis",
      slug: "shock-analysis-or-figure-interpretation",
      title: "Distributional analysis and figure interpretation",
      summary: "How to read the lecture's inequality visuals.",
      contentBlocks: [
        figureNote({
          title: "Lorenz curve and Gini figures",
          caption:
            "Screenshot from Lecture 11 showing Lorenz curves that cross. This is especially useful because it teaches a subtle but important lesson: inequality comparisons are not always fully ranked by one simple visual or one summary number.",
          imagePath: "/figures/lecture-11/lorenz-curves-can-cross.png",
          altText:
            "Lecture 11 slide showing several Lorenz curves, including an example where Lorenz curves cross across countries.",
          note:
            "What to notice: once Lorenz curves cross, casual statements like 'country A is clearly more unequal than country B' become much more dangerous.",
        }),
        p(
          "That is why the lecture stresses **Lorenz consistency**. If one Lorenz curve lies everywhere below another, the ranking is clear. But when curves cross, one summary number may hide important distributional differences. A good answer therefore says what the figure lets you rank confidently and where the ranking becomes ambiguous.",
        ),
      ],
      citations: lecture11CoreCitations,
    },
    {
      id: "lecture-11-guided",
      slug: "guided-problem-walkthrough",
      title: "Guided problem walkthrough",
      summary: "A compact problem on factor shares and inequality measures.",
      contentBlocks: [
        workedExample({
          title: "How do you compute and interpret a Gini in the course style?",
          prompt:
            "Suppose income quintiles receive 5%, 10%, 15%, 25%, and 45% of total income. Explain how to approximate the Gini coefficient and then explain why centralized wage bargaining would usually be expected to lower the Gini relative to a fully decentralized labor market.",
          steps: [
            {
              title: "Step 1: compute cumulative income shares",
              markdown:
                "Build the Lorenz points from the quintile shares: 5%, 15%, 30%, 55%, and 100% against cumulative population shares of 20%, 40%, 60%, 80%, and 100%.",
            },
            {
              title: "Step 2: approximate the area with trapezoids",
              markdown:
                "Use the trapezoid rule segment by segment, then apply $G \\approx 1 - 2A$.",
            },
            {
              title: "Step 3: interpret the policy institution",
              markdown:
                "Centralized wage bargaining usually compresses wages more than decentralized bargaining, so labor-income dispersion is lower and the Lorenz curve tends to move closer to equality.",
            },
            {
              title: "Step 4: keep the concepts separate",
              markdown:
                "Notice how this question mixes inequality *measurement* with inequality *mechanisms*. That is deliberate. The lecture wants you to distinguish the statistic from the labor-market institution generating it.",
            },
          ],
        }),
      ],
      citations: lecture11CoreCitations,
    },
    {
      id: "lecture-11-traps",
      slug: "common-traps-and-quick-recap",
      title: "Common traps and quick recap",
      summary: "The lecture gives you categories; use them.",
      contentBlocks: [
        checklist(
          [
            "Functional distribution and personal distribution are not the same concept.",
            "A higher capital share does not automatically tell you the full personal-inequality story.",
            "Lorenz curves and the Gini coefficient summarize distribution; they do not explain its causes by themselves.",
            "If Lorenz curves cross, ranking inequality is harder than students often assume.",
            "Carry forward: when later discussions mention inequality, first ask which inequality concept is actually being used.",
          ],
          "Quick recap",
        ),
        examTrap(
          "Using inequality as one undifferentiated concept",
          "Students often move between wage shares, household income dispersion, Lorenz curves, and the Gini coefficient as if they were interchangeable.",
          "Slow down and name the object. The lecture is teaching a classification system, and most confusion disappears once you state whether you are talking about functional shares, personal distribution, or a summary measure.",
        ),
      ],
      citations: lecture11CoreCitations,
    },
  ],
  citations: lecture11CoreCitations,
});

const lecture12Module: ModuleDetail = lectureModule({
  id: "lecture-12",
  slug: "lecture-12",
  title: "Lecture 12: Sustainability and the Environment",
  summary:
    "How resource constraints, externalities, and climate policy alter the growth and welfare problem.",
  description:
    "This module rebuilds Lecture 12 as a structured guide to sustainability. It covers the Brundtland definition, growth with resource and environmental constraints, the resource-drag logic, the Coase benchmark, and the policy case for carbon taxes or cap-and-trade.",
  estimatedMinutes: 100,
  tags: ["lecture-12", "sustainability", "environment", "carbon-pricing"],
  objectives: [
    "Explain the course's benchmark definition of sustainable development.",
    "Read the extended growth model with resource and environmental inputs.",
    "Compare carbon taxes and quantity-based environmental policy in a source-grounded way.",
  ],
  sections: [
    {
      id: "lecture-12-big-picture",
      slug: "big-picture-and-exam-relevance",
      title: "Big picture and why this lecture matters",
      summary: "Lecture 12 asks how macroeconomics changes once nature is no longer free.",
      contentBlocks: [
        p(
          "Lecture 12 ties the course together by asking what happens when growth interacts with exhaustible resources, environmental damage, and climate externalities. The lecture's purpose is not to abandon macroeconomics, but to show how the same discipline of modeling constraints and incentives applies to sustainability questions too.",
        ),
        p(
          "Relative to the earlier lectures, what changes is that the constraint set now includes nature, environmental quality, and external damage. What stays is the benchmark discipline of asking what the friction is, how private incentives differ from the social optimum, and which policy instrument closes that gap. What you must carry forward is that sustainability questions are still macroeconomic mechanism questions.",
        ),
      ],
      citations: lecture12CoreCitations,
    },
    {
      id: "lecture-12-notation",
      slug: "notation-and-glossary",
      title: "Notation and glossary",
      summary: "The extended-growth objects and policy instruments that matter most.",
      contentBlocks: [
        eq(
          "Extended production function",
          "Y = K^{\\alpha} R^{\\beta} T^{\\gamma} (AL)^{1-\\alpha-\\beta-\\gamma}",
          "The lecture extends the growth setup by including resource and environmental terms directly in production.",
        ),
        eq(
          "Hotelling condition",
          "\\frac{\\dot p}{p} = r",
          "For a non-renewable resource, the resource price grows at the interest rate in the benchmark condition.",
        ),
      ],
      citations: lecture12CoreCitations,
    },
    {
      id: "lecture-12-setup",
      slug: "setup-assumptions-and-benchmark",
      title: "Setup, assumptions, and benchmark",
      summary: "From growth theory to sustainability constraints.",
      contentBlocks: [
        p(
          "The lecture begins with the Brundtland definition of sustainable development and then asks how growth theory changes when resources and environmental quality are no longer ignored. The benchmark is that production may depend not only on capital and labor, but also on natural inputs and environmental stocks.",
        ),
        p(
          "A good way to read the lecture is as an extension of the textbook Solow benchmark. First recall how long-run growth works when production depends on capital, productivity, and labor. Then add resources and environmental stocks and ask what extra drag terms appear in the growth-rate decomposition. That is exactly the skill the exams and seminar sheet are training.",
        ),
      ],
      citations: lecture12CoreCitations,
    },
    {
      id: "lecture-12-mechanism-a",
      slug: "core-mechanism-a",
      title: "Core mechanism A: resource drag and constrained growth",
      summary: "Why natural constraints can lower growth relative to the textbook benchmark.",
      contentBlocks: [
        p(
          "The lecture's resource-drag logic says that growth can slow when scarce natural inputs or environmental constraints become more binding. The drag depends on parameters such as the importance of resources in production and the rate at which natural stocks regenerate or deteriorate.",
        ),
        p(
          "The key lecture move is to compare the standard Solow growth decomposition with the extended production function. When resources deplete at rate $b$ and production depends on resources with share $\\beta$, long-run growth per worker inherits a **negative contribution from resource depletion**. The larger $\\beta$ is, the larger that drag becomes. If $\\beta = 0$, the drag disappears and the model collapses back toward the standard benchmark.",
        ),
      ],
      citations: lecture12CoreCitations,
    },
    {
      id: "lecture-12-mechanism-b",
      slug: "core-mechanism-b",
      title: "Core mechanism B: externalities and policy instruments",
      summary: "Why private incentives alone do not solve the climate problem.",
      contentBlocks: [
        p(
          "The lecture then turns to externalities. The Coase theorem is presented as a benchmark about bargaining under ideal conditions, but the lecture also emphasizes why environmental problems often fail those conditions in practice. That is where carbon pricing, cap-and-trade, and other policy tools enter.",
        ),
        p(
          "The seminar and exam material use this benchmark actively. Students are expected to infer why climate change violates the Coase conditions: too many agents, international spillovers, diffuse harms, uncertain damages, and extremely high transaction costs. That is why the lecture treats bargaining as a conceptual benchmark but not as a realistic climate-policy implementation plan.",
        ),
        p(
          "The lecture also wants students to compare **price instruments** and **quantity instruments**. A carbon tax fixes the emissions price; cap-and-trade fixes the emissions quantity. Under uncertainty, the preferred instrument depends on how costly price mistakes are relative to quantity mistakes. When marginal abatement costs are steep, the cost of forcing an exact quantity can become very large, which is why tax-style price instruments are often attractive in this benchmark comparison.",
        ),
      ],
      citations: lecture12CoreCitations,
    },
    {
      id: "lecture-12-compact",
      slug: "from-detailed-setup-to-the-compact-result",
      title: "From detailed setup to the compact result",
      summary: "The lecture's main sustainability takeaway.",
      contentBlocks: [
        p(
          "The compact takeaway is that sustainable growth requires both a realistic treatment of natural constraints and policy tools that price external damage. Without those prices, private decisions can overuse common resources and underweight long-run climate costs.",
        ),
        p(
          "Carry this forward as the course's final synthesis: the same logic of benchmarks, wedges, incentives, and policy design that governed the monetary lectures still governs environmental macroeconomics.",
        ),
      ],
      citations: lecture12CoreCitations,
    },
    {
      id: "lecture-12-derivation",
      slug: "step-by-step-derivation-or-mechanism-chain",
      title: "Step by step: reading the extended production function",
      summary: "A mechanism chain from green inputs to growth drag.",
      contentBlocks: [
        derivation({
          title: "Why the extra exponents matter",
          learningGoal:
            "See how resource and environmental inputs change the growth benchmark.",
          latexBefore: "Y = K^{\\alpha} R^{\\beta} T^{\\gamma} (AL)^{1-\\alpha-\\beta-\\gamma}",
          operation:
            "Compare the extended production function with the standard benchmark and ask what happens when resource or environmental inputs become more binding.",
          whyValid:
            "The lecture adds these inputs precisely to show that natural constraints can affect output and growth mechanically.",
          latexAfter:
            "\\text{Higher resource dependence} \\Rightarrow \\text{greater potential resource drag on growth}",
          explanation:
            "The lesson is not that growth stops mechanically, but that the economy's long-run path depends on how important constrained natural inputs are.",
        }),
        derivation({
          title: "Log-differentiate the production function term by term",
          learningGoal:
            "Show the exact mathematical bridge from the level equation to the growth-rate equation.",
          latexBefore: "Y = K^{\\alpha} R^{\\beta} T^{\\gamma} (AL)^{1-\\alpha-\\beta-\\gamma}",
          operation:
            "Take logs first, then differentiate with respect to time so each exponent becomes a weight on the corresponding growth rate.",
          whyValid:
            "For a Cobb-Douglas function, log differentiation converts products into sums and exponents into coefficients on growth rates. This is the standard growth-accounting step used both in the lecture and in the exam question.",
          latexAfter:
            "\\frac{\\dot Y}{Y} = \\alpha \\frac{\\dot K}{K} + \\beta \\frac{\\dot R}{R} + \\gamma \\frac{\\dot T}{T} + (1-\\alpha-\\beta-\\gamma)\\left(\\frac{\\dot A}{A}+\\frac{\\dot L}{L}\\right)",
          explanation:
            "This is the line students need on paper. Until you write the growth-rate decomposition explicitly, the later resource-drag result looks like a jump rather than a derivation.",
        }),
        derivation({
          title: "Derive the growth-rate decomposition and the resource-drag term",
          learningGoal:
            "Make the lecture's resource-drag result slow enough to reproduce on an exam.",
          operation:
            "Log-differentiate the extended production function and then impose the steady-state condition that output and capital grow at the same rate.",
          whyValid:
            "This is exactly how the lecture and exam material turn the extended production function into a growth-rate statement.",
          latexAfter:
            "g_Y = \\alpha g_K + \\beta g_R + (1-\\alpha-\\beta) (g + n), \\qquad g_Y^L = g + \\frac{\\beta}{1-\\alpha} g_R",
          explanation:
            "Because $g_R$ is negative when resources deplete, the resource term drags down growth. The drag gets larger the more important resources are in production. If $\\beta=0$, the extra drag term disappears and you recover the standard benchmark logic.",
        }),
        derivation({
          title: "Show the steady-state substitution and the per-worker conversion",
          learningGoal:
            "Make explicit how you move from the general growth-accounting identity to the exam's final benchmark formulas.",
          latexBefore:
            "g_Y = \\alpha g_K + \\beta g_R + (1-\\alpha-\\beta)(g+n), \\qquad g_K = g_Y \\text{ in steady state}",
          operation:
            "Substitute the steady-state condition $g_K=g_Y$, collect the $g_Y$ terms on the left-hand side, and then subtract population growth to move from total output growth to per-worker growth.",
          whyValid:
            "Balanced growth requires capital and output to grow at the same rate. Per-worker growth is then just total output growth minus labor-force growth.",
          latexAfter:
            "\\begin{aligned} (1-\\alpha)g_Y &= \\beta g_R + (1-\\alpha-\\beta)(g+n) \\\\ g_Y &= \\frac{\\beta}{1-\\alpha}g_R + \\frac{1-\\alpha-\\beta}{1-\\alpha}(g+n) \\\\ g_{Y/L} &= g_Y - n = g + \\frac{\\beta}{1-\\alpha}g_R \\end{aligned}",
          explanation:
            "This is where the resource-drag term becomes exam-usable. The negative growth of the resource input lowers per-worker growth in direct proportion to how important the resource share $\\beta$ is. Setting $\\beta=0$ removes the entire drag channel and sends you back to the textbook benchmark.",
        }),
      ],
      citations: lecture12CoreCitations,
    },
    {
      id: "lecture-12-analysis",
      slug: "shock-analysis-or-figure-interpretation",
      title: "Policy analysis and figure interpretation",
      summary: "How to reason through environmental policy tools.",
      contentBlocks: [
        workedExample({
          title: "Carbon tax or cap-and-trade?",
          prompt:
            "Explain why both a carbon tax and a cap-and-trade system can be defended as ways of pricing environmental damage, and why the lecture still treats implementation details as important.",
          steps: [
            {
              title: "Step 1: name the common objective",
              markdown:
                "Both instruments try to internalize the external cost of emissions.",
            },
            {
              title: "Step 2: distinguish price from quantity",
              markdown:
                "A carbon tax fixes the emissions price, while cap-and-trade fixes the emissions quantity and lets the market determine the permit price.",
            },
            {
              title: "Step 3: connect to the real-world lecture point",
              markdown:
                "Institutional details, monitoring, and uncertainty matter because the real world does not satisfy the ideal conditions of textbook bargaining or perfect policy implementation.",
            },
            {
              title: "Step 4: add the uncertainty comparison",
              markdown:
                "The course-style extension is to compare price and quantity instruments under uncertainty: a tax gives price certainty, while cap-and-trade gives quantity certainty.",
            },
          ],
        }),
        figureNote({
          title: "Abatement costs and climate policy",
          caption:
            "Screenshot from the Stern Review showing a bottom-up abatement-cost curve. It is useful because it turns the lecture's carbon-pricing discussion into an explicit policy trade-off over which emission reductions are cheap or costly.",
          imagePath: "/figures/lecture-12/abatement-cost-curve.png",
          altText:
            "Figure from the Stern Review showing a McKinsey-style bottom-up abatement cost curve with emissions reductions on the horizontal axis and cost per ton on the vertical axis.",
          note:
            "What to notice: the lecture is not only defining sustainability in words. It is also training students to think about how policy instruments interact with real abatement opportunities and costs.",
        }),
        p(
          "A strong interpretation of the figure therefore does two things at once: it identifies that abatement opportunities are heterogeneous across sectors, and it connects that heterogeneity to instrument choice. The lecture is training students to see policy as a problem of pricing external damage while recognizing that real-world abatement costs and uncertainty are uneven.",
        ),
      ],
      citations: lecture12CoreCitations,
    },
    {
      id: "lecture-12-guided",
      slug: "guided-problem-walkthrough",
      title: "Guided problem walkthrough",
      summary: "A Seminar 3-style environmental-policy question.",
      contentBlocks: [
        workedExample({
          title: "Why is Coase not enough for climate policy?",
          prompt:
            "Explain why the Coase theorem is a useful benchmark in the lecture but not a complete real-world solution to climate externalities.",
          steps: [
            {
              title: "Step 1: state the benchmark",
              markdown:
                "The Coase theorem says bargaining can internalize externalities under ideal conditions such as clear property rights and low transaction costs.",
            },
            {
              title: "Step 2: identify the climate problem",
              markdown:
                "Climate externalities involve many agents, diffuse harms, international spillovers, and high transaction costs.",
            },
            {
              title: "Step 3: state the policy implication",
              markdown:
                "Because the ideal conditions fail badly, formal policy tools such as carbon taxes or cap-and-trade become necessary.",
            },
            {
              title: "Step 4: connect back to instrument choice",
              markdown:
                "Once formal policy is needed, the next question is whether you want certainty on the emissions price or on the emissions quantity. That is the bridge from the Coase benchmark to the carbon-tax versus cap-and-trade comparison.",
            },
          ],
        }),
      ],
      citations: lecture12CoreCitations,
    },
    {
      id: "lecture-12-traps",
      slug: "common-traps-and-quick-recap",
      title: "Common traps and quick recap",
      summary: "Sustainability is easy to talk about vaguely; the lecture is more disciplined.",
      contentBlocks: [
        checklist(
          [
            "Sustainability requires both a definition and a mechanism.",
            "Resource constraints can change growth dynamics directly.",
            "Externalities require pricing or quantity controls because private incentives alone are not enough.",
            "If $\\beta = 0$, the resource-drag term disappears and the model moves back toward the standard growth benchmark.",
            "Carry forward: the course ends here, but the benchmark method is the same one used from Lecture 1 onward.",
          ],
          "Quick recap",
        ),
        examTrap(
          "Talking about sustainability only in broad moral language",
          "Students often answer environmental questions with vague statements about 'being greener' instead of identifying the resource constraint, the externality, and the policy instrument.",
          "Bring the answer back to economic structure. State the constraint, explain why private incentives are misaligned, and then compare how the policy instruments change behavior.",
        ),
      ],
      citations: lecture12CoreCitations,
    },
  ],
  citations: lecture12CoreCitations,
});

const lecture9NotationEntries: NotationEntry[] = [
  notationEntry({
    id: "lecture9-debt-stock",
    moduleSlug: "lecture-9",
    kind: "symbol",
    displayLatex: "D(t)",
    spokenName: "D of t, government debt",
    plainMeaning: "The stock of government debt at time $t$.",
    whyItMatters:
      "It is the stock variable the budget constraint tracks over time.",
    whereItAppears: ["Debt-accumulation equation.", "Intertemporal budget logic."],
    commonConfusions: ["Debt is a stock, not a deficit flow."],
    relatedTerms: ["$G(t)$", "$T(t)$"],
    citations: lecture9CoreCitations,
  }),
  notationEntry({
    id: "lecture9-no-ponzi",
    moduleSlug: "lecture-9",
    kind: "operator",
    displayLatex: "\\lim_{s \\to \\infty} e^{-R(s)}D(s) \\leq 0",
    spokenName: "no-Ponzi condition",
    plainMeaning:
      "A solvency condition ruling out debt that is rolled over forever without future backing.",
    whyItMatters:
      "It turns the one-period budget identity into a meaningful intertemporal constraint.",
    whereItAppears: ["Intertemporal budget-constraint discussion."],
    commonConfusions: [
      "It is a solvency requirement, not a statement that governments can never borrow.",
    ],
    relatedTerms: ["intertemporal budget constraint"],
    citations: lecture9CoreCitations,
  }),
  notationEntry({
    id: "lecture9-ricardian",
    moduleSlug: "lecture-9",
    kind: "abbreviation",
    displayLatex: "\\text{Ricardian equivalence}",
    spokenName: "Ricardian equivalence",
    plainMeaning:
      "The benchmark claim that debt-financed tax changes may not alter private wealth under strong assumptions.",
    whyItMatters:
      "It is the lecture's cleanest benchmark for why the timing of taxes may matter less than students expect.",
    whereItAppears: ["Lecture 9 fiscal benchmark.", "Seminar 3 exercises."],
    commonConfusions: [
      "It is a benchmark with strong assumptions, not a universal claim about all fiscal policy.",
    ],
    relatedTerms: ["tax smoothing", "government debt"],
    citations: lecture9CoreCitations,
  }),
  notationEntry({
    id: "lecture9-tax-smoothing",
    moduleSlug: "lecture-9",
    kind: "abbreviation",
    displayLatex: "\\text{tax smoothing}",
    spokenName: "tax smoothing",
    plainMeaning:
      "The benchmark result that distortionary taxes should be spread over time so their marginal distortion is kept relatively even across periods.",
    whyItMatters:
      "It turns Lecture 9 from pure accounting into a policy-design lecture about the optimal timing of taxes.",
    whereItAppears: ["Tax-smoothing section.", "Exam and seminar questions on fiscal policy."],
    commonConfusions: [
      "It does not mean taxes can be avoided forever. It means the path of taxes should avoid unnecessary spikes when taxation is distortionary.",
    ],
    relatedTerms: ["Ricardian equivalence", "government debt"],
    citations: lecture9CoreCitations,
  }),
];

const lecture10NotationEntries: NotationEntry[] = [
  notationEntry({
    id: "lecture10-debt-ratio",
    moduleSlug: "lecture-10",
    kind: "symbol",
    displayLatex: "d",
    spokenName: "d, debt ratio",
    plainMeaning: "Public debt measured relative to output.",
    whyItMatters:
      "The lecture uses debt-ratio dynamics to explain sustainability and crisis risk.",
    whereItAppears: ["Debt-sustainability equation."],
    commonConfusions: ["The ratio can worsen even if the debt stock itself changes slowly."],
    relatedTerms: ["$r-g$", "$s$"],
    citations: lecture10CoreCitations,
  }),
  notationEntry({
    id: "lecture10-r-minus-g",
    moduleSlug: "lecture-10",
    kind: "parameter",
    displayLatex: "r-g",
    spokenName: "r minus g, interest-growth differential",
    plainMeaning:
      "The gap between the interest rate on debt and the growth rate of the economy.",
    whyItMatters:
      "It determines whether the existing debt stock snowballs upward or becomes easier to stabilize.",
    whereItAppears: ["Debt-dynamics approximation."],
    commonConfusions: [
      "A favorable primary balance can offset a bad $r-g$, but it does not make the differential irrelevant.",
    ],
    relatedTerms: ["$d$", "$s$"],
    citations: lecture10CoreCitations,
  }),
  notationEntry({
    id: "lecture10-primary-surplus",
    moduleSlug: "lecture-10",
    kind: "symbol",
    displayLatex: "s",
    spokenName: "s, primary surplus",
    plainMeaning:
      "The fiscal balance excluding interest payments, measured in the lecture's debt-ratio approximation.",
    whyItMatters:
      "It is the active fiscal term working against debt accumulation.",
    whereItAppears: ["Debt-dynamics approximation."],
    commonConfusions: [
      "The primary surplus is not the same as the overall fiscal balance once interest costs matter.",
    ],
    relatedTerms: ["$d$", "$r-g$"],
    citations: lecture10CoreCitations,
  }),
  notationEntry({
    id: "lecture10-fiscal-commons",
    moduleSlug: "lecture-10",
    kind: "abbreviation",
    displayLatex: "\\text{fiscal commons}",
    spokenName: "fiscal commons problem",
    plainMeaning:
      "A political-economy problem in which current decision-makers borrow too much because the future costs are spread across others while the current political gains are concentrated.",
    whyItMatters:
      "It explains why debt vulnerability can emerge even before market panic appears.",
    whereItAppears: ["Political economy of debt section."],
    commonConfusions: [
      "It is not a market-pricing concept. It is an institutional mechanism that can bias fiscal choices toward excessive debt accumulation.",
    ],
    relatedTerms: ["strategic debt accumulation", "$d$"],
    citations: lecture10CoreCitations,
  }),
];

const lecture11NotationEntries: NotationEntry[] = [
  notationEntry({
    id: "lecture11-alpha",
    moduleSlug: "lecture-11",
    kind: "parameter",
    displayLatex: "\\alpha",
    spokenName: "alpha, capital-share parameter",
    plainMeaning:
      "The Cobb-Douglas exponent determining the capital share of income in the benchmark production function.",
    whyItMatters:
      "It lets the lecture translate a production function directly into a factor-share benchmark.",
    whereItAppears: ["Cobb-Douglas benchmark."],
    commonConfusions: [
      "A higher capital share does not by itself tell you the whole personal-inequality story.",
    ],
    relatedTerms: ["labor share", "functional distribution"],
    citations: lecture11CoreCitations,
  }),
  notationEntry({
    id: "lecture11-gini",
    moduleSlug: "lecture-11",
    kind: "abbreviation",
    displayLatex: "\\text{Gini}",
    spokenName: "Gini coefficient",
    plainMeaning:
      "A summary measure of the inequality represented by the Lorenz curve.",
    whyItMatters:
      "It compresses the distribution into one statistic, which is useful but incomplete.",
    whereItAppears: ["Inequality-measures section."],
    commonConfusions: [
      "The Gini coefficient summarizes the distribution; it does not explain its causes.",
    ],
    relatedTerms: ["Lorenz curve"],
    citations: lecture11CoreCitations,
  }),
  notationEntry({
    id: "lecture11-lorenz",
    moduleSlug: "lecture-11",
    kind: "abbreviation",
    displayLatex: "\\text{Lorenz curve}",
    spokenName: "Lorenz curve",
    plainMeaning:
      "A curve plotting cumulative population shares against cumulative income shares after sorting households from poorest to richest.",
    whyItMatters:
      "It is the visual foundation for the Gini coefficient and for Lorenz-consistent inequality comparisons.",
    whereItAppears: ["Lorenz-curve section.", "Seminar-sheet Gini exercise."],
    commonConfusions: [
      "Crossing Lorenz curves do not give a clean ranking. That is exactly why the lecture warns students to interpret inequality graphics carefully.",
    ],
    relatedTerms: ["Gini coefficient"],
    citations: lecture11CoreCitations,
  }),
];

const lecture12NotationEntries: NotationEntry[] = [
  notationEntry({
    id: "lecture12-resource-drag",
    moduleSlug: "lecture-12",
    kind: "abbreviation",
    displayLatex: "\\text{resource drag}",
    spokenName: "resource drag",
    plainMeaning:
      "The growth slowdown created when scarce natural inputs or environmental constraints become more binding.",
    whyItMatters:
      "It is the lecture's compact way of linking sustainability constraints to macro growth outcomes.",
    whereItAppears: ["Extended-growth discussion."],
    commonConfusions: [
      "It is not a claim that growth must stop mechanically, only that resource dependence can lower the growth path.",
    ],
    relatedTerms: ["extended production function"],
    citations: lecture12CoreCitations,
  }),
  notationEntry({
    id: "lecture12-hotelling",
    moduleSlug: "lecture-12",
    kind: "operator",
    displayLatex: "\\frac{\\dot p}{p} = r",
    spokenName: "Hotelling condition",
    plainMeaning:
      "A benchmark rule for the price path of a non-renewable resource.",
    whyItMatters:
      "It links resource economics to the intertemporal logic already familiar from macro and finance.",
    whereItAppears: ["Non-renewable resource discussion."],
    commonConfusions: [
      "It is a benchmark condition, not a claim that real-world resource prices always follow the rule cleanly.",
    ],
    relatedTerms: ["resource scarcity"],
    citations: lecture12CoreCitations,
  }),
  notationEntry({
    id: "lecture12-coase",
    moduleSlug: "lecture-12",
    kind: "abbreviation",
    displayLatex: "\\text{Coase theorem}",
    spokenName: "Coase theorem",
    plainMeaning:
      "A benchmark claim that bargaining can internalize externalities under ideal conditions.",
    whyItMatters:
      "The lecture uses it as a benchmark to explain why real-world climate problems still require formal policy tools.",
    whereItAppears: ["Externalities and environmental policy section."],
    commonConfusions: [
      "It is a benchmark about ideal conditions, not a claim that bargaining solves climate policy in practice.",
    ],
    relatedTerms: ["carbon tax", "cap-and-trade"],
    citations: lecture12CoreCitations,
  }),
  notationEntry({
    id: "lecture12-beta",
    moduleSlug: "lecture-12",
    kind: "parameter",
    displayLatex: "\\beta",
    spokenName: "beta, resource share",
    plainMeaning:
      "The output elasticity with respect to natural resources in the extended production function.",
    whyItMatters:
      "It governs how large the resource-drag term becomes in the lecture's growth decomposition.",
    whereItAppears: ["Extended Solow production function.", "Resource-drag derivation."],
    commonConfusions: [
      "If $\\beta = 0$, the extended model loses the resource-input channel and the extra drag term disappears. That is a benchmark comparison the exams explicitly like to test.",
    ],
    relatedTerms: ["resource drag", "extended production function"],
    citations: lecture12CoreCitations,
  }),
];

const lecture9PracticeProblem: PracticeProblem = practiceProblem({
  id: "lecture-9-ricardian-equivalence-problem",
  slug: "lecture-9-ricardian-equivalence-problem",
  title: "Lecture 9: Debt, Taxes, and Ricardian Equivalence",
  moduleSlug: "lecture-9",
  prompt: [
    "Explain why a debt-financed tax cut may have little effect on aggregate demand in the Ricardian-equivalence benchmark, and then name two reasons why the benchmark may fail in practice.",
  ],
  supportingEquations: [
    {
      id: "lecture9-debt",
      label: "Debt accumulation",
      latex: "\\dot D(t) = [G(t) - T(t)] + r(t)D(t)",
      explanation:
        "Borrowing shifts taxes over time, but it does not remove the government's financing requirement.",
    },
  ],
  hints: [
    "Start by asking what households expect future taxes to do after debt rises today.",
    "Then ask which benchmark assumptions would have to fail for current demand to move more strongly.",
  ],
  nextSteps: [
    "If households internalize the future tax burden, they save more rather than spending the entire current tax cut.",
    "Then list frictions such as liquidity constraints, myopia, or unequal incidence that break the benchmark.",
  ],
  solutionOutline: [
    "A debt-financed tax cut raises current disposable income, but government debt also rises.",
    "If households understand that future taxes must eventually increase, the tax cut does not create net wealth in the Ricardian benchmark.",
    "They therefore save more, so aggregate demand changes little under the strong benchmark assumptions.",
    "In practice the result can fail if households are liquidity constrained, myopic, unequally affected, or if taxes are distortionary in ways the benchmark abstracts from.",
  ],
  citations: lecture9CoreCitations,
});

const lecture10PracticeProblem: PracticeProblem = practiceProblem({
  id: "lecture-10-debt-sustainability-problem",
  slug: "lecture-10-debt-sustainability-problem",
  title: "Lecture 10: Reading the Debt-Sustainability Equation",
  moduleSlug: "lecture-10",
  prompt: [
    "Use $$\\Delta d \\approx (r-g)d - s$$ to explain how a rise in the interest-growth differential changes debt sustainability. Then explain why a country can still avoid crisis for a long time when $g>r$, and why that benign benchmark can nevertheless break suddenly.",
  ],
  supportingEquations: [
    {
      id: "lecture10-dynamics",
      label: "Debt-ratio approximation",
      latex: "\\Delta d \\approx (r-g)d - s",
      explanation:
        "The debt ratio rises when the snowball effect from $r-g$ dominates the primary surplus.",
    },
  ],
  hints: [
    "Split the expression into the snowball term and the primary-surplus term.",
    "Remember that Lecture 10 is not only arithmetic. Expectations and institutions matter too.",
  ],
  nextSteps: [
    "A larger $r-g$ makes existing debt harder to stabilize, so the required primary surplus rises.",
    "If $g>r$, the arithmetic becomes friendlier, but a jump in yields or a loss of credibility can still move the economy toward the bad equilibrium.",
  ],
  solutionOutline: [
    "If $r-g$ rises, the existing debt stock contributes more to debt-ratio growth.",
    "The government then needs a larger primary surplus to keep debt stable.",
    "If $g>r$, the snowball term can become negative, so even high debt can be sustainable for a while under favorable financing conditions.",
    "If markets doubt that such a surplus will appear, yields may rise further and the situation can worsen into a crisis.",
    "That is why Lecture 10 combines arithmetic, expectations, and political economy rather than treating crises as a one-equation result.",
  ],
  citations: lecture10CoreCitations,
});

const lecture11PracticeProblem: PracticeProblem = practiceProblem({
  id: "lecture-11-factor-shares-problem",
  slug: "lecture-11-factor-shares-problem",
  title: "Lecture 11: Lorenz Curves, Gini, and Wage Compression",
  moduleSlug: "lecture-11",
  prompt: [
    "Suppose income quintiles receive 5%, 10%, 15%, 25%, and 45% of total income. Explain how to approximate the Gini coefficient using the Lorenz curve and the trapezoid rule. Then explain why centralized wage bargaining in the Scandinavian model would typically be expected to lower the Gini relative to a decentralized labor market.",
  ],
  supportingEquations: [
    {
      id: "lecture11-gini",
      label: "Gini approximation",
      latex: "G \\approx 1 - 2A",
      explanation:
        "Here $A$ is the area under the Lorenz curve, which the seminar sheet approximates by trapezoids.",
    },
  ],
  hints: [
    "Compute cumulative income shares first, then use those points to approximate the area under the Lorenz curve.",
  ],
  nextSteps: [
    "After computing the Lorenz geometry, explain how centralized bargaining compresses wages and therefore tends to compress personal income distribution too.",
  ],
  solutionOutline: [
    "Turn the quintile shares into cumulative income shares and plot them against cumulative population shares.",
    "Approximate the area under the Lorenz curve with trapezoids, then apply $G \\approx 1 - 2A$.",
    "Centralized wage bargaining tends to compress wages, so the Lorenz curve moves closer to the 45-degree line and the Gini tends to fall relative to a more decentralized benchmark.",
  ],
  citations: lecture11CoreCitations,
});

const lecture12PracticeProblem: PracticeProblem = practiceProblem({
  id: "lecture-12-environment-problem",
  slug: "lecture-12-environment-problem",
  title: "Lecture 12: Resource Drag and Climate Policy",
  moduleSlug: "lecture-12",
  prompt: [
    "Consider the extended production function $$Y = K^{\\alpha}R^{\\beta}(AL)^{1-\\alpha-\\beta}.$$ Explain what resource drag means, what changes when $\\beta = 0$, and why the Coase theorem is still not enough as a practical climate-policy solution.",
  ],
  supportingEquations: [
    {
      id: "lecture12-growth",
      label: "Extended production benchmark",
      latex: "Y = K^{\\alpha}R^{\\beta}(AL)^{1-\\alpha-\\beta}",
      explanation:
        "The lecture uses the resource share $\\beta$ to show how natural-input scarcity can lower growth relative to the textbook benchmark.",
    },
  ],
  hints: [
    "First explain what the resource term contributes to growth accounting, then move to the externality benchmark.",
  ],
  nextSteps: [
    "If $\\beta = 0$, the extra resource-drag channel disappears. Climate policy then returns to the externality problem rather than the growth-drag problem.",
    "Coasian bargaining still fails as a practical solution because climate change violates the ideal bargaining conditions badly.",
  ],
  solutionOutline: [
    "Resource drag means that when resources enter production with share $\\beta$ and deplete over time, growth inherits a negative contribution from the resource term.",
    "If $\\beta = 0$, that extra drag disappears and the model moves back toward the standard benchmark without the resource-input channel.",
    "The Coase theorem remains a useful benchmark because it clarifies what ideal bargaining would require.",
    "But climate change violates those conditions through many agents, diffuse harms, international spillovers, and high transaction costs, so formal policy tools such as carbon taxes or cap-and-trade are still needed.",
  ],
  citations: lecture12CoreCitations,
});

const lecture9QuizItems: QuizItem[] = quizBank([
  {
    id: "lecture9-quiz-1",
    prompt:
      "What does the government budget constraint tell you in Lecture 9?",
    choices: [
      "Borrowing can shift taxes over time, but current debt must still be backed by future financing.",
      "Governments can finance any spending path forever without adjustment.",
      "Debt is a flow, not a stock.",
      "The no-Ponzi condition rules out all government borrowing.",
    ],
    correctIndex: 0,
    explanation:
      "Lecture 9 treats debt as an intertemporal financing device, not a way to escape future adjustment.",
    tags: ["budget-constraint", "government-debt"],
    citations: lecture9CoreCitations,
  },
  {
    id: "lecture9-quiz-2",
    prompt:
      "What is the cleanest statement of Ricardian equivalence?",
    choices: [
      "Under strong assumptions, debt-financed tax changes may not change private wealth because households anticipate future taxes.",
      "Debt-financed tax cuts always raise consumption one-for-one.",
      "Governments should never issue debt.",
      "Tax smoothing is impossible.",
    ],
    correctIndex: 0,
    explanation:
      "Ricardian equivalence is a benchmark claim about forward-looking private behavior under strong assumptions.",
    tags: ["ricardian-equivalence", "fiscal-policy"],
    citations: lecture9CoreCitations,
  },
  {
    id: "lecture9-quiz-3",
    prompt:
      "Why does the no-Ponzi condition matter?",
    choices: [
      "It ensures debt cannot be rolled over forever without future backing.",
      "It forces debt to be zero immediately.",
      "It says taxes can never change.",
      "It eliminates interest payments from the budget constraint.",
    ],
    correctIndex: 0,
    explanation:
      "The no-Ponzi condition turns the one-period fiscal identity into a meaningful intertemporal solvency condition.",
    tags: ["no-ponzi", "solvency"],
    citations: lecture9CoreCitations,
  },
  {
    id: "lecture9-quiz-4",
    prompt:
      "What is the logic of tax smoothing in Lecture 9?",
    choices: [
      "Governments may prefer to spread distortionary taxation over time rather than moving taxes sharply each period.",
      "Governments should avoid taxes completely.",
      "Tax rates should never change even after large shocks.",
      "Borrowing eliminates the need to finance spending.",
    ],
    correctIndex: 0,
    explanation:
      "Tax smoothing is a benchmark about reducing distortion over time, not about avoiding taxes forever.",
    tags: ["tax-smoothing", "fiscal-policy"],
    citations: lecture9CoreCitations,
  },
  {
    id: "lecture9-quiz-5",
    prompt:
      "What is the safest way to interpret a debt-financed tax cut in the Ricardian benchmark?",
    choices: [
      "As a timing shift in taxation that may be offset by higher private saving.",
      "As guaranteed fiscal stimulus regardless of expectations.",
      "As proof that debt is free.",
      "As a violation of the government budget constraint.",
    ],
    correctIndex: 0,
    explanation:
      "If households internalize future taxes, the demand effect of the tax cut can be much smaller than the immediate disposable-income change suggests.",
    tags: ["ricardian-equivalence", "tax-cut"],
    citations: lecture9CoreCitations,
  },
]);

const lecture10QuizItems: QuizItem[] = quizBank([
  {
    id: "lecture10-quiz-1",
    prompt:
      "What does the term $(r-g)d$ represent in the debt-dynamics approximation?",
    choices: [
      "The snowball effect from the interest-growth differential acting on the existing debt ratio.",
      "The primary surplus.",
      "The current-account balance.",
      "The inflation target.",
    ],
    correctIndex: 0,
    explanation:
      "This term captures how existing debt becomes harder or easier to carry depending on whether interest exceeds growth.",
    tags: ["debt-dynamics", "r-minus-g"],
    citations: lecture10CoreCitations,
  },
  {
    id: "lecture10-quiz-2",
    prompt:
      "Why is a higher interest-growth differential dangerous for debt sustainability?",
    choices: [
      "Because it increases the snowball effect, so larger primary surpluses are needed to stabilize debt.",
      "Because it automatically eliminates the debt stock.",
      "Because it lowers yields on government debt.",
      "Because it removes rollover risk.",
    ],
    correctIndex: 0,
    explanation:
      "A higher $r-g$ means the existing debt ratio tends to rise faster unless offset by fiscal adjustment.",
    tags: ["sustainability", "r-minus-g"],
    citations: lecture10CoreCitations,
  },
  {
    id: "lecture10-quiz-3",
    prompt:
      "Why can debt crises be self-reinforcing?",
    choices: [
      "Because fears of non-repayment can raise yields, which worsens debt dynamics and makes default more likely.",
      "Because debt crises never involve market expectations.",
      "Because primary surpluses have no effect once debt is high.",
      "Because growth automatically rises during crises.",
    ],
    correctIndex: 0,
    explanation:
      "Lecture 10 emphasizes that expectations can worsen fundamentals by increasing borrowing costs.",
    tags: ["debt-crisis", "expectations"],
    citations: lecture10CoreCitations,
  },
  {
    id: "lecture10-quiz-4",
    prompt:
      "What is the role of the primary surplus $s$ in the debt-dynamics equation?",
    choices: [
      "It works against debt accumulation by paying debt down relative to output.",
      "It is the same thing as the overall deficit including interest.",
      "It raises debt mechanically.",
      "It measures the inflation response to debt.",
    ],
    correctIndex: 0,
    explanation:
      "A larger primary surplus reduces the debt ratio, holding the snowball term fixed.",
    tags: ["primary-surplus", "debt-dynamics"],
    citations: lecture10CoreCitations,
  },
  {
    id: "lecture10-quiz-5",
    prompt:
      "What is the lecture's safest summary of a sovereign-debt crisis?",
    choices: [
      "It is an interaction between fiscal fundamentals and market beliefs about repayment.",
      "It is purely a political story with no arithmetic.",
      "It is purely arithmetic with no role for expectations.",
      "It can only happen when debt is literally zero.",
    ],
    correctIndex: 0,
    explanation:
      "Lecture 10 combines debt arithmetic, rollover risk, and expectations in the crisis story.",
    tags: ["sovereign-debt", "crisis"],
    citations: lecture10CoreCitations,
  },
]);

const lecture11QuizItems: QuizItem[] = quizBank([
  {
    id: "lecture11-quiz-1",
    prompt:
      "What is the difference between functional and personal income distribution?",
    choices: [
      "Functional distribution splits income between factors such as labor and capital, while personal distribution splits income across people or households.",
      "They are two names for the same object.",
      "Functional distribution measures only wages.",
      "Personal distribution ignores institutions.",
    ],
    correctIndex: 0,
    explanation:
      "Lecture 11 is careful to separate the factor split from the across-people split.",
    tags: ["distribution", "definitions"],
    citations: lecture11CoreCitations,
  },
  {
    id: "lecture11-quiz-2",
    prompt:
      "In the Cobb-Douglas benchmark, what is the labor share of income?",
    choices: [
      "$1-\\alpha$",
      "$\\alpha$",
      "$\\alpha + 1$",
      "$\\alpha^2$",
    ],
    correctIndex: 0,
    explanation:
      "Under the benchmark, the capital share is $\\alpha$ and the labor share is $1-\\alpha$.",
    tags: ["factor-shares", "cobb-douglas"],
    citations: lecture11CoreCitations,
  },
  {
    id: "lecture11-quiz-3",
    prompt:
      "Why does a change in the capital share not automatically tell you the whole story about personal inequality?",
    choices: [
      "Because personal inequality also depends on who owns capital, wage dispersion, and household structure.",
      "Because factor shares and personal distribution are identical.",
      "Because the Gini coefficient never changes.",
      "Because labor income is irrelevant.",
    ],
    correctIndex: 0,
    explanation:
      "Functional distribution is only one layer of the lecture's inequality story.",
    tags: ["factor-shares", "personal-inequality"],
    citations: lecture11CoreCitations,
  },
  {
    id: "lecture11-quiz-4",
    prompt:
      "What does a Lorenz curve summarize?",
    choices: [
      "The cumulative share of income received by cumulative shares of the population.",
      "The output gap.",
      "The inflation bias under discretion.",
      "The debt ratio.",
    ],
    correctIndex: 0,
    explanation:
      "The Lorenz curve is the lecture's standard visual representation of personal income distribution.",
    tags: ["lorenz-curve", "inequality-measures"],
    citations: lecture11CoreCitations,
  },
  {
    id: "lecture11-quiz-5",
    prompt:
      "What is the cleanest caution when using the Gini coefficient?",
    choices: [
      "It summarizes the distribution in one number, but it does not explain why the distribution looks the way it does.",
      "It is useless for comparing distributions.",
      "It only measures capital income.",
      "It is identical to the labor share.",
    ],
    correctIndex: 0,
    explanation:
      "Lecture 11 treats the Gini as a useful summary statistic, but not as a complete causal explanation.",
    tags: ["gini", "measurement"],
    citations: lecture11CoreCitations,
  },
]);

const lecture12QuizItems: QuizItem[] = quizBank([
  {
    id: "lecture12-quiz-1",
    prompt:
      "What is the Brundtland-style benchmark definition of sustainable development in the lecture?",
    choices: [
      "Development that meets present needs without compromising the ability of future generations to meet their own needs.",
      "Development that maximizes current output regardless of future costs.",
      "Development with zero use of natural resources.",
      "Development with no role for government policy.",
    ],
    correctIndex: 0,
    explanation:
      "Lecture 12 uses the Brundtland definition as its benchmark sustainability statement.",
    tags: ["sustainability", "definition"],
    citations: lecture12CoreCitations,
  },
  {
    id: "lecture12-quiz-2",
    prompt:
      "What is the lecture's meaning of resource drag?",
    choices: [
      "Growth slows when scarce natural inputs or environmental constraints become more binding.",
      "Resource use automatically rises growth forever.",
      "It is another name for the output gap.",
      "It means capital is irrelevant.",
    ],
    correctIndex: 0,
    explanation:
      "The lecture uses resource drag to describe how natural constraints can weigh on growth.",
    tags: ["resource-drag", "growth"],
    citations: lecture12CoreCitations,
  },
  {
    id: "lecture12-quiz-3",
    prompt:
      "Why is the Coase theorem not a complete real-world solution to climate policy in the lecture?",
    choices: [
      "Because climate externalities involve many agents, diffuse harms, and high transaction costs that violate the ideal Coase conditions.",
      "Because bargaining is always impossible even in simple settings.",
      "Because externalities never exist in environmental economics.",
      "Because carbon pricing contradicts the Coase theorem.",
    ],
    correctIndex: 0,
    explanation:
      "The theorem is a useful benchmark, but the lecture emphasizes that climate policy fails the ideal bargaining conditions badly.",
    tags: ["coase", "climate-policy"],
    citations: lecture12CoreCitations,
  },
  {
    id: "lecture12-quiz-4",
    prompt:
      "What is the difference between a carbon tax and a cap-and-trade system?",
    choices: [
      "A carbon tax fixes the emissions price, while cap-and-trade fixes the emissions quantity and lets the market determine the permit price.",
      "They are the same instrument with different names.",
      "A carbon tax fixes emissions exactly, while cap-and-trade fixes the tax rate exactly.",
      "Neither instrument prices emissions.",
    ],
    correctIndex: 0,
    explanation:
      "Lecture 12 uses the price-versus-quantity distinction as the clean way to compare the two instruments.",
    tags: ["carbon-tax", "cap-and-trade"],
    citations: lecture12CoreCitations,
  },
  {
    id: "lecture12-quiz-5",
    prompt:
      "What does the Hotelling condition describe in the lecture?",
    choices: [
      "The benchmark price path for a non-renewable resource.",
      "The optimal inflation target.",
      "The government budget constraint.",
      "The Lorenz curve.",
    ],
    correctIndex: 0,
    explanation:
      "The Hotelling condition links non-renewable resource pricing to intertemporal scarcity logic.",
    tags: ["hotelling", "resource-economics"],
    citations: lecture12CoreCitations,
  },
]);

export const lectures9To12Modules: ModuleDetail[] = [
  lecture9Module,
  lecture10Module,
  lecture11Module,
  lecture12Module,
];

export const lectures9To12NotationEntries: NotationEntry[] = [
  ...lecture9NotationEntries,
  ...lecture10NotationEntries,
  ...lecture11NotationEntries,
  ...lecture12NotationEntries,
];

export const lectures9To12PracticeProblems: PracticeProblem[] = [
  lecture9PracticeProblem,
  lecture10PracticeProblem,
  lecture11PracticeProblem,
  lecture12PracticeProblem,
];

export const lectures9To12QuizItemsByModule: Record<string, QuizItem[]> = {
  "lecture-9": lecture9QuizItems,
  "lecture-10": lecture10QuizItems,
  "lecture-11": lecture11QuizItems,
  "lecture-12": lecture12QuizItems,
};
