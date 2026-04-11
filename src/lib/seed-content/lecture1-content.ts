import type { Citation, ModuleDetail, NotationEntry, PracticeProblem, QuizItem } from "@/lib/types";

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
  workedExample,
} from "@/lib/seed-content/builders";

const lecture1Title = "Economic Policy: Lecture 1";
const lecture1ComplementTitle = "Economic Policy: Systematic and unsystematic Monetary Policy";

export const lecture1IntroCitations: Citation[] = [
  cite(
    lecture1Title,
    "pp. 1-5",
    "Outline, lecture sequence, and the course framing of monetary policy objectives, rules, and systematic versus unsystematic policy.",
    "lecture",
  ),
];

export const lecture1PolicyCitations: Citation[] = [
  cite(
    lecture1Title,
    "pp. 9-18",
    "Slides on inflation targeting, the output gap, and the policy objectives of flexible inflation targeting.",
    "lecture",
  ),
  cite(
    lecture1Title,
    "pp. 23-31",
    "Slides on the Qvigstad plot, the Taylor principle, and the Taylor rule.",
    "lecture",
  ),
];

export const lecture1SystematicCitations: Citation[] = [
  cite(
    lecture1ComplementTitle,
    "pp. 3-10",
    "Defines systematic versus unsystematic monetary policy using the Taylor-rule decomposition and Clarida-Gali-Gertler evidence.",
    "complementary_lecture",
  ),
  cite(
    lecture1ComplementTitle,
    "pp. 13-23",
    "Empirical evidence on monetary policy shocks and the claim that policy has become more systematic over time.",
    "complementary_lecture",
  ),
];

export const allLecture1Citations = [
  ...lecture1IntroCitations,
  ...lecture1PolicyCitations,
  ...lecture1SystematicCitations,
];

export const lecture1Module: ModuleDetail = lectureModule({
  id: "lecture-1",
  slug: "lecture-1",
  title: "Lecture 1: Monetary Policy Objectives and Rules",
  summary:
    "A foundation module on what central banks try to stabilize, how the Taylor rule organizes policy, and why systematic policy matters more than rare monetary shocks.",
  description:
    "This module turns Lecture 1 and the complementary systematic-versus-unsystematic policy deck into a learnable path. It starts with objectives and instruments, then builds the Taylor-rule logic step by step, and ends with the key policy lesson: credible, systematic reactions usually matter more than one-off monetary surprises.",
  estimatedMinutes: 90,
  tags: ["lecture-1", "monetary-policy", "taylor-rule", "systematic-policy"],
  objectives: [
    "Explain the difference between monetary policy objectives, instruments, and operational rules.",
    "Read the Taylor rule as a disciplined reaction function instead of a formula to memorize blindly.",
    "Distinguish the systematic component of policy from unsystematic monetary shocks and explain why the former matters most.",
  ],
  sections: [
    {
      id: "lecture-1-big-picture",
      slug: "big-picture-and-exam-relevance",
      title: "Big picture and why this lecture matters",
      summary:
        "Why the course starts with rules, objectives, and the distinction between systematic and unsystematic policy.",
      contentBlocks: [
        p(
          "Lecture 1 gives you the **language of monetary policy** before the course turns to full models. Later modules ask what the central bank should do in a New Keynesian model, under commitment, at the zero lower bound, or when inequality matters. But all of those later questions still rely on the same core habits introduced here: identify the objective, identify the instrument, and ask whether policy moves systematically with the state of the economy or only through shocks.",
        ),
        p(
          "Relative to the rest of the course, this lecture is the benchmark for how to think about policy discipline before the models become more detailed. What changes in Lecture 2 and beyond is the amount of structure around the economy; what stays is the need to separate the **goal**, the **tool**, and the **reaction pattern**. Carry that distinction forward, because almost every later lecture assumes you can already do it.",
        ),
        p(
          "This is also exam-relevant because the course repeatedly distinguishes between **what a central bank wants to stabilize**, **what it actually controls**, and **what kind of rule maps the state of the economy into a rate decision**. If those three layers get mixed together, the rest of the course becomes harder than it needs to be.",
        ),
        checklist(
          [
            "Keep **objectives**, **instruments**, and **rules** separate.",
            "Treat the Taylor rule as a reaction function, not a description of every real-world central bank decision.",
            "Remember that the complementary lecture's main empirical message is that monetary policy has become more systematic over time.",
          ],
          "What this lecture is really training",
        ),
      ],
      citations: allLecture1Citations,
    },
    {
      id: "lecture-1-notation",
      slug: "notation-and-glossary",
      title: "Notation and glossary",
      summary: "The core objects that appear throughout the early monetary-policy lectures.",
      contentBlocks: [
        p(
          "Lecture 1 is lighter on derivations than Lecture 2, but the notation still matters. Most of the later monetary-policy material keeps returning to **inflation**, the **output gap**, the **policy rate**, the **inflation target**, and the distinction between a **systematic response** and an **unsystematic shock**.",
        ),
        eq(
          "Taylor rule",
          "R_t = r_t^{LR} + \\pi_t + 0.5(\\pi_t - \\pi^*) + 0.5(y_t - y_t^p)",
          "This is the lecture's benchmark representation of a simple monetary-policy rule: the nominal rate rises with inflation, with inflation relative to target, and with output relative to potential.",
        ),
        modelMap("How to read the key objects", [
          {
            label: "$\\pi_t$ and $\\pi^*$",
            description:
              "Current inflation and the inflation target. The target is the nominal anchor that later helps organize systematic policy.",
          },
          {
            label: "$y_t - y_t^p$",
            description:
              "The output gap term used in Lecture 1. It captures how far activity is from potential output.",
          },
          {
            label: "$\\varepsilon_t^M$",
            description:
              "The unsystematic monetary-policy shock in the complementary lecture: the part of policy not explained by a systematic reaction to inflation and output.",
          },
        ]),
      ],
      citations: [...lecture1PolicyCitations, ...lecture1SystematicCitations],
    },
    {
      id: "lecture-1-setup",
      slug: "setup-assumptions-and-benchmark",
      title: "Setup, assumptions, and benchmark",
      summary: "Flexible inflation targeting and the idea of a nominal anchor.",
      contentBlocks: [
        p(
          "The lecture treats **low and stable inflation** as the central nominal objective, while also recognizing stabilization of real activity. The benchmark institutional idea is **flexible inflation targeting**: the central bank aims at low and stable inflation over time, but does not ignore output and employment conditions along the way.",
        ),
        p(
          "The lecture also emphasizes the role of a **nominal anchor**. Historically, anchors have included gold, exchange rates, money-growth targets, and inflation targets. In this course, the inflation target is the anchor that organizes later discussions of systematic policy.",
        ),
        modelMap("Benchmark principles from Lecture 1", [
          {
            label: "Inflation target as anchor",
            description:
              "A credible target helps organize expectations and gives policy a stable nominal reference point.",
          },
          {
            label: "Flexible inflation targeting",
            description:
              "The central bank cares about inflation, but also about stabilizing output when activity is weak and inflation is below target.",
          },
          {
            label: "Systematic policy",
            description:
              "Policy should be well understood and respond predictably to persistent inflation or output conditions.",
          },
        ]),
      ],
      citations: lecture1PolicyCitations,
    },
    {
      id: "lecture-1-mechanism-a",
      slug: "core-mechanism-a",
      title: "Core mechanism A: objectives, instruments, and policy principles",
      summary: "What the central bank wants to achieve and what it can directly move.",
      contentBlocks: [
        p(
          "A recurring mistake is to talk about the policy rate as if it were itself the objective. Lecture 1 is careful about the distinction: the **instrument** is the short-term policy rate, while the **objectives** concern inflation and real activity. A rule is only the bridge between the two.",
        ),
        p(
          "For a student seeing monetary transmission for the first time, the safest chain is: the central bank changes the **nominal** policy rate, that changes the **real** rate only after you compare it with expected inflation, and the real rate is what then pushes demand, output, and inflation around. Keep that chain in mind now, because Lecture 2 turns it into the Dynamic IS logic formally.",
        ),
        checklist(
          [
            "The policy rate is the instrument, not the goal.",
            "The central bank should provide stimulus when activity is low and inflation is below target.",
            "The central bank should raise the policy rate **more than one-for-one** when inflation rises persistently. That is the Taylor principle.",
          ],
          "Lecture 1 policy principles",
        ),
        examTrap(
          "Confusing the target with the tool",
          "Students sometimes write as if the central bank directly controls inflation, output, and the output gap at the same time.",
          "Start by naming the instrument. The central bank sets a nominal policy rate, and the economy responds through a transmission mechanism.",
        ),
      ],
      citations: lecture1PolicyCitations,
    },
    {
      id: "lecture-1-mechanism-b",
      slug: "core-mechanism-b",
      title: "Core mechanism B: systematic versus unsystematic policy",
      summary: "Why the reaction function matters more than isolated shocks.",
      contentBlocks: [
        p(
          "The complementary lecture decomposes policy into a **systematic part** and an **unsystematic part**. The systematic part is the endogenous response of policy to inflation and the output gap. The unsystematic part is the shock term, often written as $\\varepsilon_t^M$, which captures policy movements not explained by the usual rule.",
        ),
        eq(
          "Policy decomposition",
          "R_t = r_t^{LR} + \\pi^* + 1.5(\\pi_t - \\pi^*) + 0.5(y_t - y_t^p) + \\varepsilon_t^M",
          "The first terms describe the systematic rule. The monetary-policy shock is the residual piece that remains after conditioning on the state of the economy.",
        ),
        p(
          "The complementary lecture's empirical message is strong: the unsystematic component explains only a **minor fraction** of output and even interest-rate fluctuations in more recent periods. That is why the course cares so much about rules, credibility, and expectations.",
        ),
        p(
          "This is also the safest way to avoid a common confusion in seminar and exam answers: a large rate move is **not automatically a monetary-policy shock**. First ask what the rule would have implied given inflation and the output gap. Only the leftover part counts as unsystematic policy. The course keeps repeating this because later New Keynesian lectures explain fluctuations mainly through the rule, expectations, and benchmark objects such as the natural rate, not through a constant stream of random policy surprises.",
        ),
        p(
          "This is exactly where the Clarida-Gali-Gertler result fits. Their pre-Volcker versus post-Volcker Taylor-rule estimates are used in the course to show that the **systematic response to inflation increased over time**. The core lesson is not just historical. It is that a stronger inflation response is part of what made policy more stabilizing and less erratic.",
        ),
        checklist(
          [
            "Systematic policy is the state-contingent part of the rule.",
            "The residual shock is what is left after conditioning on inflation and the output gap.",
            "The course uses the post-Volcker evidence to motivate why stronger inflation responses matter for determinacy later on.",
          ],
          "How this lecture feeds later model lectures",
        ),
      ],
      citations: lecture1SystematicCitations,
    },
    {
      id: "lecture-1-compact",
      slug: "from-detailed-setup-to-the-compact-result",
      title: "From detailed setup to the compact policy takeaway",
      summary: "Why the Taylor rule is useful even though no real central bank follows it mechanically.",
      contentBlocks: [
        p(
          "Lecture 1 does not claim that the Taylor rule is a complete model of central-bank behavior. The point is narrower and more useful: the rule gives a compact way to summarize **good policy discipline**. It says policy should be systematic, should respond to inflation and activity, and should satisfy the Taylor principle.",
        ),
        p(
          "Carry this forward into the rest of the course: later lectures will replace the simple rule with a full New Keynesian benchmark, commitment problems, forward-guidance promises, or richer distributional environments. But they still keep asking the same underlying question: **how should policy react once the state of the economy changes?**",
        ),
        p(
          "So the explicit recall bridge is this: whenever a later lecture introduces a richer model, do not throw Lecture 1 away. Reactivate the same three questions. What is the instrument? What makes the real rate move? And is policy reacting strongly enough to stabilize expectations rather than letting them drift? That is the Lecture 1 thread that later becomes the Taylor principle, determinacy, and commitment logic.",
        ),
        modelMap("Why the Taylor rule survives in the course", [
          {
            label: "Transparency",
            description:
              "It makes the reaction function visible instead of leaving policy as a black box.",
          },
          {
            label: "Cross-check",
            description:
              "It gives a benchmark for asking whether policy is loose or tight relative to inflation and activity.",
          },
          {
            label: "Bridge to later lectures",
            description:
              "Later modules replace the simple rule with optimality conditions, commitment, or zero-lower-bound constraints, but they still ask the same question: how should the instrument respond to the state of the economy?",
          },
        ]),
      ],
      citations: lecture1PolicyCitations,
    },
    {
      id: "lecture-1-derivation",
      slug: "step-by-step-derivation-or-mechanism-chain",
      title: "Step by step: how to read the Taylor rule like an economist",
      summary: "A mechanism chain rather than a deep algebraic derivation.",
      contentBlocks: [
        p(
          "Before you read the rule term by term, recall the bridge from everyday central-bank language to course language. The bank sets a **nominal** policy rate, but demand depends on the **real** rate relative to inflation expectations. So the whole point of reading the Taylor rule carefully is to see when a nominal-rate move genuinely tightens policy in real terms.",
        ),
        derivation({
          title: "Read the rule from left to right",
          learningGoal:
            "Translate the Taylor rule into a disciplined economic story instead of treating it as a cryptic formula.",
          latexBefore:
            "R_t = r_t^{LR} + \\pi_t + 0.5(\\pi_t - \\pi^*) + 0.5(y_t - y_t^p)",
          operation:
            "Start from the long-run real rate and current inflation, then add policy reactions to deviations of inflation from target and output from potential.",
          whyValid:
            "This is exactly how the lecture presents the rule: a neutral benchmark rate plus systematic responses to persistent macro conditions.",
          latexAfter:
            "\\text{Policy rate} = \\text{neutral nominal benchmark} + \\text{inflation response} + \\text{activity response}",
          explanation:
            "This reading prevents the common mistake of seeing each coefficient as a random constant. Each term has a job: anchor the nominal rate, lean against inflationary pressure, and react to slack.",
        }),
        derivation({
          title: "Make the real-rate bridge explicit before invoking the Taylor principle",
          learningGoal:
            "See the exact mathematical object policy is trying to move when inflation rises.",
          latexBefore: "r_t = i_t - E_t\\pi_{t+1}",
          operation:
            "Differentiate the real-rate identity with respect to the policy change you are analyzing. Then compare the nominal-rate response with the movement in expected inflation.",
          whyValid:
            "This is not a new model assumption. It is just the Fisher-style identity written in change form, which tells you whether a higher nominal rate is actually a tighter real rate.",
          latexAfter:
            "\\Delta r_t = \\Delta i_t - \\Delta E_t\\pi_{t+1}",
          explanation:
            "This is the bridge weaker students often need. If expected inflation rises by as much as the nominal rate, the real rate does not tighten. So the Taylor principle is really a statement about making the real rate rise enough to cool demand.",
        }),
        derivation({
          title: "Why the Taylor principle matters",
          learningGoal:
            "See why raising the nominal rate by more than inflation is necessary if policy is to tighten the real rate.",
          operation:
            "Suppose inflation rises persistently. If the nominal rate moved one-for-one with inflation, the ex ante real rate would not rise. Demand pressure would then remain too strong.",
          whyValid:
            "Lecture 1 explicitly states that policy should raise the rate more than one-for-one in response to persistent inflation.",
          latexAfter:
            "\\Delta i_t > \\Delta \\pi_t \\quad \\Rightarrow \\quad \\Delta r_t = \\Delta i_t - \\Delta E_t\\pi_{t+1} > 0",
          explanation:
            "The policy rate has to move aggressively enough to change the real rate. This simple idea becomes essential in later lectures when the course studies uniqueness, commitment, and zero-lower-bound problems.",
        }),
        derivation({
          title: "Bridge the empirical Lecture 1 result to the New Keynesian model",
          learningGoal:
            "Connect the Clarida-Gali-Gertler evidence to the Taylor principle and the Blanchard-Kahn logic used later in the course.",
          operation:
            "Take the empirical finding first: the systematic response to inflation became stronger over time. Then reinterpret that statement inside the New Keynesian model.",
          whyValid:
            "The exam-style bridge is exactly this: a stronger inflation response means policy is more likely to satisfy the Taylor principle and therefore more likely to anchor expectations in the forward-looking model.",
          latexAfter:
            "\\phi_\\pi \\uparrow \\quad \\Rightarrow \\quad \\text{Taylor principle more likely to hold} \\quad \\Rightarrow \\quad \\text{determinacy is easier to obtain}",
          explanation:
            "This is the clean bridge from Lecture 1 to Lecture 3. Clarida-Gali-Gertler is not just a historical fact. In course logic, it helps explain why moving from a weak inflation response to a stronger one changes macro stability in a forward-looking equilibrium.",
        }),
      ],
      citations: [...lecture1PolicyCitations, ...lecture1SystematicCitations],
    },
    {
      id: "lecture-1-analysis",
      slug: "policy-analysis-and-comparative-statics",
      title: "Policy analysis and comparative statics",
      summary: "Qvigstad's plot, the Great Recession debate, and the empirical limits of shock identification.",
      contentBlocks: [
        p(
          "Lecture 1 uses the **Qvigstad plot** to show how policy can be communicated in an inflation-output-gap space. The point is not that the plot is a model by itself, but that it forces the central bank's trade-offs and intended movement to be visible.",
        ),
        figureNote({
          title: "Taylor-rule benchmark as a policy visual",
          caption:
            "Screenshot from Lecture 1 showing the classic Taylor-rule comparison between the actual Fed funds rate and the rule-implied benchmark. Use it to see why the lecture treats rules as a disciplined reference point for policy, not as a decorative formula.",
          imagePath: "/figures/lecture-1/taylor-rule-benchmark.png",
          altText:
            "Lecture 1 slide showing a time-series comparison between the actual Federal Funds Rate and the original Taylor Rule from 1993-present.",
          note:
            "What to notice: the lecture uses this figure to train the habit of comparing actual policy to a systematic benchmark before calling policy unusually loose or tight.",
        }),
        p(
          "The lecture also uses the pre-Great Recession debate between Taylor and Bernanke to show how rules are used in practice: not as infallible commands, but as a benchmark for arguing that policy was perhaps too low for too long or, alternatively, that the economy's neutral rate had moved.",
        ),
        p(
          "The complementary lecture then closes the loop empirically. Identifying pure monetary-policy shocks is difficult, the results vary across samples and methods, and more recent policy appears less erratic and more systematic. That empirical message supports the course's emphasis on rules and expectations rather than on shock hunting alone.",
        ),
        p(
          "A good course-style reading is therefore: the rule is a benchmark, the Qvigstad plot is a communication device, and the empirical evidence says central banks became more systematic partly by responding more strongly to inflation. That is the bridge you need when later modules ask why a stronger policy reaction can stabilize a forward-looking model instead of letting expectations drift.",
        ),
      ],
      citations: [...lecture1PolicyCitations, ...lecture1SystematicCitations],
    },
    {
      id: "lecture-1-guided",
      slug: "guided-problem-walkthrough",
      title: "Guided problem walkthrough",
      summary: "A gentle first exercise on decomposing a rule into systematic and unsystematic pieces.",
      contentBlocks: [
        workedExample({
          title: "When is a rate increase systematic and when is it a shock?",
          prompt:
            "Suppose inflation rises above target and the output gap turns positive. The central bank raises the policy rate. Explain when that move should be read as systematic policy and when the residual should instead be interpreted as an unsystematic monetary-policy shock.",
          steps: [
            {
              title: "Step 0: write the benchmark rule in words before you classify the move",
              markdown:
                "Start by saying what the rule would normally prescribe when inflation is above target and the output gap is positive: **a higher policy rate**. This stops you from calling the entire rate move a shock before you have identified the benchmark response.",
            },
            {
              title: "Step 1: read the state of the economy",
              markdown:
                "If inflation is above target and activity is strong, a higher rate is exactly what the systematic part of a Taylor-type rule predicts.",
            },
            {
              title: "Step 2: define the shock correctly",
              markdown:
                "The shock is **not** the full change in the rate. It is the part left over **after** controlling for inflation and the output gap.",
            },
            {
              title: "Step 3: link to the empirical literature",
              markdown:
                "That is why monetary shocks are hard to identify empirically: the econometric problem is to strip out the systematic component first.",
            },
            {
              title: "Step 4: connect to the Taylor-principle lesson",
              markdown:
                "If the central bank's *systematic* response to inflation becomes stronger over time, the economy is not just seeing fewer random surprises. It is also moving toward a policy regime that is more likely to stabilize expectations in later New Keynesian lectures.",
            },
          ],
        }),
      ],
      citations: lecture1SystematicCitations,
    },
    {
      id: "lecture-1-traps",
      slug: "common-traps-and-quick-recap",
      title: "Common traps and quick recap",
      summary: "The mistakes that make later lectures feel harder than they need to be.",
      contentBlocks: [
        checklist(
          [
            "Do not confuse **potential output** with actual output, or the **output gap** with output itself.",
            "Do not call every rate change a monetary shock. First ask what the rule would have implied.",
            "Do not treat the Taylor rule as a literal description of all central-bank behavior. Treat it as a benchmark reaction function.",
            "Carry the Taylor principle forward into later lectures. It is one of the threads connecting Lecture 1 to determinacy, Blanchard-Kahn logic, and later optimal-policy analysis.",
          ],
          "Quick recap",
        ),
        examTrap(
          "Remembering Clarida-Gali-Gertler as a history fact instead of a model lesson",
          "Students sometimes state that the response to inflation increased over time, but then stop before explaining why the course cares.",
          "Finish the bridge. A stronger inflation response means policy is more likely to satisfy the Taylor principle, and in the forward-looking New Keynesian model that helps deliver a determinate equilibrium rather than unstable expectations.",
        ),
      ],
      citations: allLecture1Citations,
    },
  ],
  citations: allLecture1Citations,
});

export const lecture1NotationEntries: NotationEntry[] = [
  notationEntry({
    id: "lecture1-inflation-target",
    moduleSlug: "lecture-1",
    kind: "symbol",
    displayLatex: "\\pi^*",
    spokenName: "pi star, inflation target",
    plainMeaning:
      "The target level of inflation that serves as the nominal anchor in flexible inflation targeting.",
    whyItMatters:
      "Lecture 1 uses the inflation target to organize systematic policy and to evaluate whether the central bank should tighten or ease.",
    whereItAppears: [
      "Taylor-rule benchmark in Lecture 1.",
      "The discussion of inflation targeting as a nominal anchor.",
    ],
    commonConfusions: [
      "It is the target, not the current inflation rate. The gap $\\pi_t - \\pi^*$ is what matters for systematic tightening or easing.",
    ],
    relatedTerms: ["$\\pi_t$", "nominal anchor"],
    citations: lecture1PolicyCitations,
  }),
  notationEntry({
    id: "lecture1-policy-rate",
    moduleSlug: "lecture-1",
    kind: "symbol",
    displayLatex: "R_t",
    spokenName: "R t, policy rate",
    plainMeaning:
      "The nominal interest rate chosen by the central bank in the lecture's Taylor-rule representation.",
    whyItMatters:
      "It is the instrument the central bank adjusts in response to inflation and activity.",
    whereItAppears: [
      "Lecture 1 Taylor-rule slides.",
      "The decomposition into systematic and unsystematic monetary policy.",
    ],
    commonConfusions: [
      "The policy rate is not itself the objective. It is the tool used to stabilize inflation and real activity.",
    ],
    relatedTerms: ["Taylor rule", "$\\varepsilon_t^M$"],
    citations: [...lecture1PolicyCitations, ...lecture1SystematicCitations],
  }),
  notationEntry({
    id: "lecture1-output-gap",
    moduleSlug: "lecture-1",
    kind: "symbol",
    displayLatex: "y_t - y_t^p",
    spokenName: "y t minus y t p, output gap",
    plainMeaning:
      "Output relative to potential output in the Lecture 1 Taylor-rule benchmark.",
    whyItMatters:
      "It is the real-side signal telling the central bank whether demand conditions are too weak or too strong.",
    whereItAppears: [
      "Taylor rule and Qvigstad-plot discussion.",
      "Flexible inflation targeting logic.",
    ],
    commonConfusions: [
      "Do not treat the output gap as the same thing as output. Potential output matters for the sign.",
    ],
    relatedTerms: ["potential output", "flexible inflation targeting"],
    citations: lecture1PolicyCitations,
  }),
  notationEntry({
    id: "lecture1-natural-rate",
    moduleSlug: "lecture-1",
    kind: "parameter",
    displayLatex: "r_t^{LR}",
    spokenName: "r t L R, long-run real natural rate",
    plainMeaning:
      "The long-run real-rate benchmark that enters the Taylor rule together with the inflation target.",
    whyItMatters:
      "It provides the neutral nominal benchmark before policy reacts to deviations in inflation or activity.",
    whereItAppears: [
      "Lecture 1 Taylor-rule slide.",
      "The discussion of why the Taylor rule can be misleading if the natural rate moves over time.",
    ],
    commonConfusions: [
      "Lecture 1 warns that simple rules often assume a constant natural rate, while later literature shows it can move over time.",
    ],
    relatedTerms: ["neutral rate", "Taylor rule"],
    citations: lecture1PolicyCitations,
  }),
  notationEntry({
    id: "lecture1-monetary-shock",
    moduleSlug: "lecture-1",
    kind: "shock",
    displayLatex: "\\varepsilon_t^M",
    spokenName: "epsilon m t, monetary-policy shock",
    plainMeaning:
      "The unsystematic component of policy: the part of the rate decision not explained by the systematic reaction function.",
    whyItMatters:
      "The complementary lecture uses it to show why identifying pure monetary shocks is hard and why they explain only a limited fraction of fluctuations in more systematic policy regimes.",
    whereItAppears: [
      "Complementary lecture on systematic versus unsystematic monetary policy.",
      "Empirical identification of policy shocks.",
    ],
    commonConfusions: [
      "The shock is a residual after controlling for inflation and the output gap. It is not the whole policy move.",
    ],
    relatedTerms: ["systematic policy", "Taylor rule"],
    citations: lecture1SystematicCitations,
  }),
  notationEntry({
    id: "lecture1-taylor-principle",
    moduleSlug: "lecture-1",
    kind: "abbreviation",
    displayLatex: "\\Delta i_t > \\Delta \\pi_t",
    spokenName: "Taylor principle",
    plainMeaning:
      "The principle that the nominal policy rate should rise by more than one-for-one when inflation rises persistently.",
    whyItMatters:
      "Without it, the real interest rate may fail to rise when inflation picks up, so policy would not actually tighten.",
    whereItAppears: [
      "Lecture 1 policy principles.",
      "The bridge from simple rules to later New Keynesian policy analysis.",
    ],
    commonConfusions: [
      "It is a condition about the *real-rate effect* of policy, not about the central bank reacting aggressively for its own sake.",
    ],
    relatedTerms: ["real interest rate", "systematic policy"],
    citations: lecture1PolicyCitations,
  }),
];

export const lecture1PracticeProblem: PracticeProblem = practiceProblem({
  id: "lecture-1-guided-policy-rule",
  slug: "lecture-1-guided-policy-rule",
  title: "Lecture 1: Reading the Taylor Rule and the Policy Residual",
  moduleSlug: "lecture-1",
  prompt: [
    "Consider the Lecture 1 Taylor-rule benchmark:",
    "$$R_t = r_t^{LR} + \\pi_t + 0.5(\\pi_t - \\pi^*) + 0.5(y_t - y_t^p) + \\varepsilon_t^M.$$",
    "Explain which part of the rule is systematic monetary policy and which part is unsystematic policy. Then explain why the Taylor principle is needed if the central bank wants a persistent rise in inflation to tighten the economy in real terms.",
  ],
  supportingEquations: [
    {
      id: "lecture1-taylor-rule",
      label: "Taylor-rule benchmark",
      latex:
        "R_t = r_t^{LR} + \\pi_t + 0.5(\\pi_t - \\pi^*) + 0.5(y_t - y_t^p) + \\varepsilon_t^M",
      explanation:
        "The systematic part is everything except $\\varepsilon_t^M$. The residual shock is the unsystematic component.",
    },
    {
      id: "lecture1-taylor-principle",
      label: "Taylor principle",
      latex: "\\Delta i_t > \\Delta \\pi_t",
      explanation:
        "This is the condition ensuring that a persistent rise in inflation leads to a higher real rate rather than leaving real conditions unchanged.",
    },
  ],
  hints: [
    "Separate the rule into the part explained by macro conditions and the leftover residual.",
    "Ask what happens to the real rate if the nominal rate rises exactly as much as inflation.",
  ],
  nextSteps: [
    "Write one sentence on why the terms involving inflation and the output gap are systematic: they move because the state of the economy moves.",
    "Then explain that if $\\Delta i_t = \\Delta \\pi_t$, the ex ante real rate does not tighten. That is why the Taylor principle matters.",
  ],
  solutionOutline: [
    "The systematic component is the part of the rule that reacts predictably to inflation, inflation relative to target, and the output gap.",
    "The unsystematic component is the residual term $\\varepsilon_t^M$, which captures rate movements not explained by the usual reaction function.",
    "The Taylor principle says the nominal rate should rise by more than one-for-one with inflation.",
    "If the nominal rate moved only one-for-one, the real rate would fail to rise, so demand would not be disciplined in real terms.",
    "That is why later lectures care so much about systematic, credible policy responses rather than rare one-off shocks.",
  ],
  citations: allLecture1Citations,
});

export const lecture1QuizItems: QuizItem[] = quizBank([
  {
    id: "lecture1-quiz-1",
    prompt:
      "Which statement best captures the difference between a monetary-policy objective and a monetary-policy instrument in Lecture 1?",
    choices: [
      "Inflation and real activity are objectives, while the short-term policy rate is the instrument.",
      "The policy rate is the main objective, while inflation is an instrument used to reach it.",
      "The output gap is the instrument, while the policy rate is the objective.",
      "The central bank directly controls both inflation and output, so there is no distinction.",
    ],
    correctIndex: 0,
    explanation:
      "Lecture 1 separates what the central bank wants to stabilize from the tool it directly controls. The policy rate is the instrument; inflation and activity are the outcomes policy tries to stabilize.",
    tags: ["objectives", "instrument"],
    citations: lecture1PolicyCitations,
  },
  {
    id: "lecture1-quiz-2",
    prompt:
      "Why does Lecture 1 treat the inflation target as a nominal anchor?",
    choices: [
      "Because it gives policy and expectations a stable nominal reference point over time.",
      "Because it guarantees the output gap is always zero.",
      "Because it removes the need for a policy rule.",
      "Because it makes monetary-policy shocks easier to identify.",
    ],
    correctIndex: 0,
    explanation:
      "Lecture 1 presents the inflation target as the anchor organizing systematic policy. It does not remove trade-offs or make rules unnecessary, but it gives policy a stable nominal reference.",
    tags: ["inflation-target", "nominal-anchor"],
    citations: lecture1PolicyCitations,
  },
  {
    id: "lecture1-quiz-3",
    prompt:
      "In the complementary lecture, what is the unsystematic component of monetary policy?",
    choices: [
      "The residual monetary-policy shock left after accounting for inflation and output conditions.",
      "The central bank's entire reaction to inflation above target.",
      "The long-run real natural rate in the Taylor rule.",
      "The output-gap term in the Taylor rule.",
    ],
    correctIndex: 0,
    explanation:
      "The complementary lecture defines the unsystematic component as the shock term. It is what remains after the systematic reaction of policy to the state of the economy has been netted out.",
    tags: ["systematic-policy", "monetary-shock"],
    citations: lecture1SystematicCitations,
  },
  {
    id: "lecture1-quiz-4",
    prompt:
      "What is the economic point of the Taylor principle?",
    choices: [
      "A persistent rise in inflation must raise the nominal rate by more than one-for-one if policy is to tighten the real rate.",
      "The central bank should never react to the output gap.",
      "The nominal rate should move one-for-one with inflation so the real rate is unchanged.",
      "Monetary policy should aim to create large unsystematic shocks.",
    ],
    correctIndex: 0,
    explanation:
      "Lecture 1 states that policy must respond more than one-for-one to persistent inflation. Otherwise the real rate does not rise and policy fails to lean against overheating.",
    tags: ["taylor-principle", "real-rate"],
    citations: lecture1PolicyCitations,
  },
  {
    id: "lecture1-quiz-5",
    prompt:
      "What is the main empirical conclusion of the complementary lecture on systematic versus unsystematic policy?",
    choices: [
      "Monetary policy has become more systematic over time, so pure policy shocks explain only a limited share of fluctuations in recent samples.",
      "Unsystematic policy shocks explain most output fluctuations in recent decades.",
      "Policy rules are empirically useless because central banks never react systematically.",
      "The output gap is too hard to measure, so monetary policy should ignore it completely.",
    ],
    correctIndex: 0,
    explanation:
      "The complementary lecture's broad message is that policy has become more systematic and less erratic over time, which makes the pure shock component comparatively smaller and harder to identify.",
    tags: ["empirics", "systematic-policy"],
    citations: lecture1SystematicCitations,
  },
]);
