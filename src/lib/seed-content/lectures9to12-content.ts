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
      title: "Big picture and exam relevance",
      summary: "Lecture 9 gives the fiscal side of the stabilization story.",
      contentBlocks: [
        p(
          "Lecture 9 shifts from monetary policy to fiscal arithmetic. The central question is simple: **how can the government borrow, tax, and spend over time without violating its intertemporal budget constraint?** Once that question is clear, Ricardian equivalence and tax smoothing become much easier to interpret.",
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
          ],
          "Quick recap",
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
      title: "Big picture and exam relevance",
      summary: "Lecture 10 is where fiscal arithmetic turns into crisis logic.",
      contentBlocks: [
        p(
          "Lecture 9 gave you the fiscal arithmetic. Lecture 10 asks when that arithmetic becomes dangerous. The central question is: **under what conditions can public debt be rolled over safely, and when can the same debt stock trigger a crisis?**",
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
        figureNote({
          title: "Debt paths and crisis scenarios",
          caption:
            "This lecture benefits a lot from the debt-path figures in the source material because they show how small changes in $r-g$ or $s$ compound over time.",
          note:
            "A screenshot from the lecture or support papers can be added later as a visual debt-path block.",
        }),
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
          ],
          "Quick recap",
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
      title: "Big picture and exam relevance",
      summary: "Lecture 11 organizes distribution into several different questions.",
      contentBlocks: [
        p(
          "Lecture 11 is useful because it prevents the word **inequality** from becoming too vague. The lecture separates functional distribution, personal distribution, wage-setting systems, and summary measures such as the Gini coefficient. Those are related, but they answer different questions.",
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
            "The lecture's inequality figures are especially useful because they show the difference between visual distribution comparisons and one-number summaries.",
          note:
            "A screenshot from the lecture deck can be added later to show the Lorenz-curve geometry directly.",
        }),
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
          title: "What does a rise in $\\alpha$ mean?",
          prompt:
            "Suppose the Cobb-Douglas capital-share parameter $\\alpha$ rises. Explain what happens to the labor share and why that does not automatically tell you the whole story about personal inequality.",
          steps: [
            {
              title: "Step 1: read the factor-share effect",
              markdown:
                "If $\\alpha$ rises, the capital share rises and the labor share $1-\\alpha$ falls.",
            },
            {
              title: "Step 2: separate functional from personal distribution",
              markdown:
                "That tells you how total income is split between factors, but not yet how labor income or capital income is distributed across people.",
            },
            {
              title: "Step 3: add institutions and household structure",
              markdown:
                "Personal inequality also depends on wage-setting institutions, ownership patterns, and household composition.",
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
          ],
          "Quick recap",
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
      title: "Big picture and exam relevance",
      summary: "Lecture 12 asks how macroeconomics changes once nature is no longer free.",
      contentBlocks: [
        p(
          "Lecture 12 ties the course together by asking what happens when growth interacts with exhaustible resources, environmental damage, and climate externalities. The lecture's purpose is not to abandon macroeconomics, but to show how the same discipline of modeling constraints and incentives applies to sustainability questions too.",
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
          ],
        }),
        figureNote({
          title: "Resource drag and climate-policy visuals",
          caption:
            "The lecture's diagrams are useful because they connect abstract sustainability definitions to explicit growth and policy mechanisms.",
          note:
            "A curated screenshot from the lecture or supporting readings can be attached later as a figure block.",
        }),
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
          ],
          "Quick recap",
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
];

const lecture9PracticeProblem: PracticeProblem = practiceProblem({
  id: "lecture-9-ricardian-equivalence-problem",
  slug: "lecture-9-ricardian-equivalence-problem",
  title: "Lecture 9: Debt, Taxes, and Ricardian Equivalence",
  moduleSlug: "lecture-9",
  prompt: [
    "Explain why a debt-financed tax cut may have little effect on aggregate demand in the Ricardian-equivalence benchmark.",
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
  ],
  nextSteps: [
    "If households internalize the future tax burden, they save more rather than spending the entire current tax cut.",
  ],
  solutionOutline: [
    "A debt-financed tax cut raises current disposable income, but government debt also rises.",
    "If households understand that future taxes must eventually increase, the tax cut does not create net wealth in the Ricardian benchmark.",
    "They therefore save more, so aggregate demand changes little under the strong benchmark assumptions.",
  ],
  citations: lecture9CoreCitations,
});

const lecture10PracticeProblem: PracticeProblem = practiceProblem({
  id: "lecture-10-debt-sustainability-problem",
  slug: "lecture-10-debt-sustainability-problem",
  title: "Lecture 10: Reading the Debt-Sustainability Equation",
  moduleSlug: "lecture-10",
  prompt: [
    "Use $$\\Delta d \\approx (r-g)d - s$$ to explain how a rise in the interest-growth differential changes debt sustainability.",
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
  ],
  nextSteps: [
    "A larger $r-g$ makes existing debt harder to stabilize, so the required primary surplus rises.",
  ],
  solutionOutline: [
    "If $r-g$ rises, the existing debt stock contributes more to debt-ratio growth.",
    "The government then needs a larger primary surplus to keep debt stable.",
    "If markets doubt that such a surplus will appear, yields may rise further and the situation can worsen into a crisis.",
  ],
  citations: lecture10CoreCitations,
});

const lecture11PracticeProblem: PracticeProblem = practiceProblem({
  id: "lecture-11-factor-shares-problem",
  slug: "lecture-11-factor-shares-problem",
  title: "Lecture 11: Factor Shares and Personal Inequality",
  moduleSlug: "lecture-11",
  prompt: [
    "Suppose the Cobb-Douglas capital-share parameter $\\alpha$ rises. Explain what happens to the labor share and why that does not automatically tell you the whole story about personal inequality.",
  ],
  supportingEquations: [
    {
      id: "lecture11-cobb-douglas",
      label: "Cobb-Douglas benchmark",
      latex: "Y = K^{\\alpha}L^{1-\\alpha}",
      explanation:
        "Under the benchmark, the capital share is $\\alpha$ and the labor share is $1-\\alpha$.",
    },
  ],
  hints: [
    "Separate functional distribution from personal distribution.",
  ],
  nextSteps: [
    "A higher $\\alpha$ raises the capital share and lowers the labor share, but personal inequality also depends on ownership patterns and labor-income dispersion.",
  ],
  solutionOutline: [
    "If $\\alpha$ rises, the capital share rises and the labor share falls.",
    "That changes functional distribution between factors.",
    "But personal inequality also depends on who owns capital, how wages are distributed, and how institutions shape labor incomes.",
  ],
  citations: lecture11CoreCitations,
});

const lecture12PracticeProblem: PracticeProblem = practiceProblem({
  id: "lecture-12-environment-problem",
  slug: "lecture-12-environment-problem",
  title: "Lecture 12: Why Coase Is Not Enough for Climate Policy",
  moduleSlug: "lecture-12",
  prompt: [
    "Explain why the Coase theorem is a useful benchmark in the lecture but not a complete real-world solution to climate externalities.",
  ],
  supportingEquations: [
    {
      id: "lecture12-hotelling",
      label: "Hotelling condition",
      latex: "\\frac{\\dot p}{p} = r",
      explanation:
        "The lecture uses benchmark intertemporal resource logic to motivate environmental pricing and scarcity discussions.",
    },
  ],
  hints: [
    "State the ideal conditions under which Coase works before explaining why climate policy violates them.",
  ],
  nextSteps: [
    "Climate externalities involve many agents, diffuse harms, and high transaction costs, so bargaining alone is not enough.",
  ],
  solutionOutline: [
    "The Coase theorem is a benchmark saying bargaining can internalize externalities under ideal conditions such as clear property rights and low transaction costs.",
    "Climate externalities do not fit those conditions well because they involve many agents, cross-border spillovers, and high coordination costs.",
    "That is why the lecture still argues for formal policy tools such as carbon taxes or cap-and-trade.",
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
