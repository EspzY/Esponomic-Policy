import type {
  ModuleDetail,
  PracticeProblem,
  ProgressSnapshot,
  QuizItem,
  SymbolEntry,
  TutorSource,
  Viewer,
} from "@/lib/types";

export const demoViewer: Viewer = {
  id: "demo-admin",
  email: "demo@bi.no",
  fullName: "Demo Admin",
  role: "admin",
  demoMode: true,
};

const lecture2CoreCitations = [
  {
    documentTitle: "Economic Policy: Lecture 2",
    page: "pp. 8-15",
    note: "Introduces notation, shocks, the three-equation model, and the household and firm blocks.",
    sourceType: "lecture" as const,
  },
];

const nkpcDerivationCitations = [
  {
    documentTitle: "Derivation Notes: Markups and NKPC derivation",
    page: "pp. 1-3",
    note: "Walks from the reset-price problem to the recursive pricing equation and the NKPC intuition.",
    sourceType: "derivation_note" as const,
  },
];

const seminarCitations = [
  {
    documentTitle: "GRA 6631 Seminar 1: NK Model",
    page: "pp. 1-2",
    note: "Contains qualitative shock-analysis questions built directly on the Lecture 2 notation and model.",
    sourceType: "problem_set" as const,
  },
];

export const demoModules: ModuleDetail[] = [
  {
    id: "symbols",
    slug: "symbols",
    title: "Module 1: Symbol Register",
    kind: "symbol_register",
    summary: "A verified symbol overview for the New Keynesian core used in the course starter material.",
    description:
      "Every entry states what the symbol means, how it is usually read out loud, and where it is grounded in the source material.",
    estimatedMinutes: 35,
    tags: ["notation", "reference", "lecture-2"],
    publicationStatus: "published",
    objectives: [
      "Use the same symbol names as the lecture slides and derivation notes.",
      "See quickly whether a meaning is verified in the material or still missing.",
      "Trace each symbol back to a concrete page reference.",
    ],
    sections: [
      {
        id: "symbols-overview",
        slug: "overview",
        title: "How to read the register",
        summary: "The register is source-based, not a dictionary made from memory.",
        body: [
          "This first version is seeded from the verified Lecture 2 slide deck, the NKPC derivation note, and the first seminar sheet. That gives a trustworthy starting point for the core New Keynesian notation.",
          "Whenever a symbol meaning is not securely supported by the uploaded material, the entry should stay explicitly marked as not found in the material instead of being guessed.",
        ],
        checkpoints: [
          "Use this page as a source of truth when symbol variants differ only by superscripts, gaps, or time indices.",
        ],
        citations: [...lecture2CoreCitations, ...nkpcDerivationCitations],
      },
    ],
    citations: [...lecture2CoreCitations, ...nkpcDerivationCitations],
  },
  {
    id: "lecture-2",
    slug: "lecture-2",
    title: "Lecture 2: The New Keynesian Model",
    kind: "lecture",
    summary:
      "The three-equation New Keynesian model with careful notation, block-by-block intuition, and a stepwise pricing derivation.",
    description:
      "This module turns the lecture deck and derivation note into a learnable path: intuition first, equations second, and detailed derivation support where the lecture typically moves too fast.",
    estimatedMinutes: 70,
    tags: ["new-keynesian-model", "nkpc", "dynamic-is", "lecture-2"],
    publicationStatus: "published",
    objectives: [
      "Explain the role of the New Keynesian Phillips Curve, Dynamic IS equation, and monetary policy rule.",
      "Track how shocks enter the model and which variables respond directly.",
      "Follow the reset-price derivation step by step instead of jumping from result to result.",
    ],
    sections: [
      {
        id: "lecture-2-intuition",
        slug: "model-intuition",
        title: "Model intuition before the equations",
        summary: "Why this model differs from a flexible-price benchmark.",
        body: [
          "The lecture contrasts a flexible-price world with the New Keynesian benchmark. In the flexible-price case, prices jump immediately and monetary shocks do not move output in the standard setup. The New Keynesian model keeps a neoclassical core, but adds staggered price adjustment, so monetary shocks can have real effects for a while.",
          "That distinction matters for policy analysis. Once prices are sticky, the path from an interest-rate decision to output and inflation is no longer neutral. The model therefore becomes useful for tracing how the central bank reacts to demand and supply disturbances.",
        ],
        citations: lecture2CoreCitations,
      },
      {
        id: "lecture-2-core",
        slug: "three-equation-core",
        title: "The three-equation core",
        summary: "The compressed system students need to be fluent in.",
        body: [
          "Lecture 2 reduces the model to three equations that organize nearly every later exercise in the course: the New Keynesian Phillips Curve, the Dynamic IS equation, and the monetary policy rule.",
          "The output gap links the actual economy to the flexible-price benchmark. Inflation depends on expected future inflation and the output gap. The output gap depends on expected future demand conditions and on the gap between the policy-controlled real rate and the natural rate of interest.",
        ],
        equations: [
          {
            label: "New Keynesian Phillips Curve",
            expression: "π_t = β E_t π_(t+1) + κ ỹ_t",
            explanation:
              "Inflation today reflects expected future inflation and real slack measured by the output gap.",
          },
          {
            label: "Dynamic IS equation",
            expression: "ỹ_t = E_t ỹ_(t+1) - (1/σ) ( i_t - E_t π_(t+1) - r_t^n )",
            explanation:
              "Demand is stronger when the real interest rate is low relative to the natural rate.",
          },
          {
            label: "Monetary policy rule",
            expression: "i_t = ρ + φ_π π_t + φ_y ỹ_t + v_t",
            explanation:
              "The policy rate reacts systematically to inflation and the output gap, with a separate monetary policy shock term.",
          },
        ],
        checkpoints: [
          "Be able to say in words what each equation determines.",
          "Keep the difference between y_t, y_t^n, and ỹ_t completely clear.",
        ],
        citations: lecture2CoreCitations,
      },
      {
        id: "lecture-2-blocks",
        slug: "households-and-firms",
        title: "Households and firms block by block",
        summary: "What the lecture gives before compressing the model.",
        body: [
          "In the household block, consumption depends on expected future consumption and on the real interest rate, while labor supply links the real wage to consumption and hours worked. These relationships are the source of the Dynamic IS equation after the model is closed.",
          "In the firm block, output is produced with productivity and labor, while nominal prices are sticky in the Calvo sense. The stickiness parameter θ measures how likely a firm is to keep its old price, so a higher θ means slower price adjustment and a longer average price duration.",
        ],
        equations: [
          {
            label: "Household Euler equation",
            expression:
              "c_t = E_t c_(t+1) - (1/σ)( i_t - E_t π_(t+1) - ρ ) + (1-ρ_z)/σ · z_t",
            explanation:
              "The discount-factor shock z_t shifts intertemporal demand directly.",
          },
          {
            label: "Labor supply",
            expression: "w_t - p_t = σ c_t + φ n_t",
            explanation:
              "The real wage rises with consumption and labor supplied in the log-linearized system.",
          },
          {
            label: "Aggregate production",
            expression: "y_t = a_t + n_t",
            explanation:
              "Productivity and labor together determine output in the log-linearized model.",
          },
          {
            label: "Calvo price aggregation",
            expression: "p_t = θ p_(t-1) + (1-θ) p_t*",
            explanation:
              "Only the firms that can reoptimize contribute a new reset price p_t* in period t.",
          },
        ],
        citations: lecture2CoreCitations,
      },
      {
        id: "lecture-2-derivation",
        slug: "nkpc-derivation",
        title: "Step-by-step: from reset pricing to the NKPC",
        summary: "The derivation note fills in the algebraic steps that are easy to lose in class.",
        body: [
          "Step 1. Start from the firm's reset-price problem. A reoptimizing firm chooses a price today knowing there is a probability θ that it will be stuck with that price in future periods. That is why profits are discounted both by β and by θ.",
          "Step 2. Substitute the demand curve into the profit expression. This rewrites the first-order condition in terms of the chosen reset price, the aggregate price level, demand, and nominal marginal cost.",
          "Step 3. Log-linearize around the zero-inflation steady state. This turns the nonlinear optimal-pricing condition into a linear expression for the reset price relative to the previous aggregate price level.",
          "Step 4. Split the infinite sum into the current term and the future tail. The derivation note shows that the tail can be rewritten recursively as expected future optimal reset pricing. That creates the recursive price-setting equation.",
          "Step 5. Interpret the result. The optimal reset price is a markup over a weighted average of current and expected future marginal costs. Because firms may stay stuck for many periods, expectations about future marginal cost matter for inflation today.",
        ],
        checkpoints: [
          "You should be able to explain why βθ appears in the objective.",
          "You should be able to explain why the recursive representation is useful before moving to the NKPC.",
        ],
        citations: nkpcDerivationCitations,
      },
    ],
    citations: [
      ...lecture2CoreCitations,
      ...nkpcDerivationCitations,
      ...seminarCitations,
    ],
  },
];

export const demoSymbols: SymbolEntry[] = [
  {
    id: "pi_t",
    symbol: "π_t",
    spokenName: "pi t, inflation",
    definition:
      "Inflation in period t, defined in the lecture as the change in the log price level.",
    context: "Lecture 2, three-equation model and household block.",
    status: "verified",
    citations: lecture2CoreCitations,
  },
  {
    id: "y_t",
    symbol: "y_t",
    spokenName: "y t, output",
    definition: "Output (GDP) in the New Keynesian model.",
    context: "Lecture 2 notation slide and production block.",
    status: "verified",
    citations: lecture2CoreCitations,
  },
  {
    id: "y_t_n",
    symbol: "y_t^n",
    spokenName: "y t n, natural output",
    definition: "Output in the flexible-price version of the model.",
    context: "Lecture 2 notation slide and output-gap definitions.",
    status: "verified",
    citations: lecture2CoreCitations,
  },
  {
    id: "y_t_gap",
    symbol: "ỹ_t",
    spokenName: "y tilde t, output gap",
    definition: "The gap between actual output and natural output: y_t - y_t^n.",
    context: "Lecture 2 notation slide and three-equation model.",
    status: "verified",
    citations: lecture2CoreCitations,
  },
  {
    id: "r_t",
    symbol: "r_t",
    spokenName: "r t, real interest rate",
    definition: "The ex ante real interest rate defined by i_t - E_t π_(t+1).",
    context: "Lecture 2 notation slide and household block.",
    status: "verified",
    citations: lecture2CoreCitations,
  },
  {
    id: "r_t_n",
    symbol: "r_t^n",
    spokenName: "r t n, natural rate of interest",
    definition:
      "The real interest rate that prevails in the flexible-price version of the model.",
    context: "Lecture 2 notation slide and Dynamic IS equation.",
    status: "verified",
    citations: lecture2CoreCitations,
  },
  {
    id: "i_t",
    symbol: "i_t",
    spokenName: "i t, nominal interest rate",
    definition: "The policy rate set by the monetary authority in the Taylor rule.",
    context: "Lecture 2 Dynamic IS equation and monetary policy rule.",
    status: "verified",
    citations: lecture2CoreCitations,
  },
  {
    id: "c_t",
    symbol: "c_t",
    spokenName: "c t, consumption",
    definition: "Consumption in the household first-order condition.",
    context: "Lecture 2 household block.",
    status: "verified",
    citations: lecture2CoreCitations,
  },
  {
    id: "n_t",
    symbol: "n_t",
    spokenName: "n t, labor",
    definition: "Labor input or hours worked in the log-linearized model.",
    context: "Lecture 2 labor supply and production equations.",
    status: "verified",
    citations: lecture2CoreCitations,
  },
  {
    id: "w_t",
    symbol: "w_t",
    spokenName: "w t, log wage",
    definition: "The log nominal wage appearing in the labor-supply condition.",
    context: "Lecture 2 preliminaries and household block.",
    status: "verified",
    citations: lecture2CoreCitations,
  },
  {
    id: "p_t",
    symbol: "p_t",
    spokenName: "p t, log price level",
    definition: "The aggregate log price level in the linearized model.",
    context: "Lecture 2 inflation definition and price aggregation.",
    status: "verified",
    citations: lecture2CoreCitations,
  },
  {
    id: "p_t_star",
    symbol: "p_t*",
    spokenName: "p star t, reset price",
    definition:
      "The optimal price chosen by firms that are allowed to reoptimize in period t.",
    context: "Lecture 2 firm block and NKPC derivation note.",
    status: "verified",
    citations: nkpcDerivationCitations,
  },
  {
    id: "sigma",
    symbol: "σ",
    spokenName: "sigma",
    definition:
      "A parameter inversely related to willingness to substitute consumption intertemporally.",
    context: "Lecture 2 household block and Dynamic IS equation.",
    status: "verified",
    citations: lecture2CoreCitations,
  },
  {
    id: "phi",
    symbol: "φ",
    spokenName: "phi",
    definition:
      "A parameter inversely related to willingness to adjust labor supply flexibly.",
    context: "Lecture 2 household block.",
    status: "verified",
    citations: lecture2CoreCitations,
  },
  {
    id: "beta",
    symbol: "β",
    spokenName: "beta",
    definition:
      "The household discount factor; it also enters the reset-price problem and the NKPC.",
    context: "Lecture 2 Phillips curve and derivation note.",
    status: "verified",
    citations: [...lecture2CoreCitations, ...nkpcDerivationCitations],
  },
  {
    id: "kappa",
    symbol: "κ",
    spokenName: "kappa",
    definition:
      "The slope coefficient multiplying the output gap in the New Keynesian Phillips Curve.",
    context: "Lecture 2 three-equation model.",
    status: "verified",
    citations: lecture2CoreCitations,
  },
  {
    id: "theta",
    symbol: "θ",
    spokenName: "theta",
    definition:
      "The Calvo stickiness parameter: the probability that a firm cannot reset its price in a period.",
    context: "Lecture 2 firm block and derivation note.",
    status: "verified",
    citations: [...lecture2CoreCitations, ...nkpcDerivationCitations],
  },
  {
    id: "z_t",
    symbol: "z_t",
    spokenName: "z t, discount-factor shock",
    definition: "A demand shock that shifts consumption demand.",
    context: "Lecture 2 shock definitions and household Euler equation.",
    status: "verified",
    citations: lecture2CoreCitations,
  },
  {
    id: "v_t",
    symbol: "v_t",
    spokenName: "v t, monetary policy shock",
    definition:
      "A Taylor-rule disturbance that shifts the policy rate independently of systematic policy.",
    context: "Lecture 2 shock definitions and monetary policy rule.",
    status: "verified",
    citations: lecture2CoreCitations,
  },
  {
    id: "a_t",
    symbol: "a_t",
    spokenName: "a t, productivity shock",
    definition: "A supply shock affecting productivity and therefore production.",
    context: "Lecture 2 shock definitions and production block.",
    status: "verified",
    citations: lecture2CoreCitations,
  },
];

export const demoQuizItems: QuizItem[] = [
  {
    id: "lecture2-quiz-1",
    prompt:
      "If the policy rate i_t rises while expected inflation and the natural rate stay fixed, what happens to the output gap according to the Dynamic IS equation?",
    choices: [
      "The output gap falls because the real rate rises relative to the natural rate.",
      "The output gap rises because monetary policy is neutral in the New Keynesian model.",
      "The output gap is unchanged because only shocks move demand.",
      "The output gap rises because households want to consume more when rates rise.",
    ],
    correctIndex: 0,
    explanation:
      "In the Dynamic IS equation, a higher i_t increases the real interest rate term i_t - E_t π_(t+1). If r_t^n does not move, the output gap falls.",
    tags: ["dynamic-is", "policy-transmission"],
    citations: lecture2CoreCitations,
  },
  {
    id: "lecture2-quiz-2",
    prompt: "What is the cleanest interpretation of θ in the Lecture 2 firm block?",
    choices: [
      "The probability a firm cannot reset its price this period.",
      "The elasticity of intertemporal substitution.",
      "The slope of the Taylor rule with respect to inflation.",
      "The persistence of the productivity shock.",
    ],
    correctIndex: 0,
    explanation:
      "Lecture 2 defines θ as the stickiness parameter in Calvo pricing. A higher θ means prices adjust more slowly on average.",
    tags: ["pricing", "calvo"],
    citations: lecture2CoreCitations,
  },
  {
    id: "lecture2-quiz-3",
    prompt:
      "Why does expected future marginal cost matter for inflation today in the NKPC derivation?",
    choices: [
      "Because firms that reset today may keep the same price for several future periods.",
      "Because the household Euler equation sets current inflation directly.",
      "Because the natural rate of interest equals expected future inflation.",
      "Because price stickiness removes all forward-looking behavior.",
    ],
    correctIndex: 0,
    explanation:
      "The reset-price problem is forward-looking. If a firm may remain stuck with the chosen price, future marginal costs matter when it chooses p_t* today.",
    tags: ["nkpc", "derivation"],
    citations: nkpcDerivationCitations,
  },
];

export const demoPracticeProblem: PracticeProblem = {
  id: "seminar-1-question-1",
  slug: "seminar-1-question-1",
  title: "Seminar 1: NK Model Shock Analysis",
  moduleSlug: "lecture-2",
  prompt: [
    "Consider the basic New Keynesian model used in class with notation and parameterization as in class.",
    "Suppose the economy starts in steady state and is hit by a temporary positive technology shock. Describe qualitatively the impact response of output, potential output, inflation, and the natural rate of interest. State whether each variable rises, falls, or stays constant, and explain the transmission mechanism.",
    "Suppose inflation rises while the output gap falls after a one-time temporary shock. Can any of the three shocks in the baseline lecture model generate that pattern on their own? If not, what additional disturbance might be needed?",
  ],
  equations: [
    "c_t = E_t c_(t+1) - (1/σ)( i_t - E_t π_(t+1) - ρ ) + (1-ρ_z)/σ · z_t",
    "w_t - p_t = σ c_t + φ n_t",
    "y_t = a_t + n_t",
    "π_t = β E_t π_(t+1) + λ ( mc_t - mc )",
    "i_t = ρ + φ_π π_t + φ_y ỹ_t + v_t",
  ],
  hints: [
    "Start by separating actual output from natural output. A technology shock changes the flexible-price benchmark directly.",
    "Ask which variables move because productivity changed immediately, before asking how monetary policy reacts.",
  ],
  nextSteps: [
    "Write one line for each target variable: y_t, y_t^n, π_t, r_t^n. Then decide whether the direct effect of higher productivity pushes each one up or down on impact.",
    "For the inflation/output-gap combination question, compare the sign pattern implied by demand shocks and productivity shocks. If neither fits, think about a cost-push disturbance.",
  ],
  solutionOutline: [
    "A positive technology shock raises potential output immediately because the flexible-price economy can produce more with the same labor input.",
    "Actual output also tends to rise, but the exact size relative to potential output determines the output-gap response.",
    "Higher productivity lowers marginal cost pressure, so inflation tends to fall on impact in the baseline model.",
    "The natural rate of interest can rise because stronger productive capacity and expected future consumption paths alter the flexible-price Euler condition.",
    "If inflation rises while the output gap falls, the baseline technology, discount-factor, and monetary policy shocks do not naturally generate that pair together; a cost-push disturbance is the usual missing candidate.",
  ],
  citations: seminarCitations,
};

export const demoTutorSources: TutorSource[] = [
  {
    id: "tutor-l2-core",
    moduleSlug: "lecture-2",
    title: "Lecture 2 core system",
    text:
      "Lecture 2 defines a three-equation core. Inflation follows the New Keynesian Phillips Curve, the output gap follows the Dynamic IS equation, and the policy rate follows a Taylor-style rule with a monetary policy shock.",
    citations: lecture2CoreCitations,
    tags: ["nkpc", "dynamic-is", "policy-rule", "output-gap"],
  },
  {
    id: "tutor-l2-shocks",
    moduleSlug: "lecture-2",
    title: "Lecture 2 shocks",
    text:
      "The lecture introduces three shocks in the baseline model: a discount-factor shock z_t as a demand shock, a monetary policy shock v_t, and a productivity shock a_t as a supply shock.",
    citations: lecture2CoreCitations,
    tags: ["shocks", "z_t", "v_t", "a_t", "demand", "supply"],
  },
  {
    id: "tutor-l2-derivation",
    moduleSlug: "lecture-2",
    title: "NKPC derivation intuition",
    text:
      "The reset-price derivation is forward-looking because a firm choosing p_t* today may remain stuck with that price in future periods. That is why future marginal cost enters the price-setting problem.",
    citations: nkpcDerivationCitations,
    tags: ["derivation", "nkpc", "reset-price", "marginal-cost"],
  },
  {
    id: "tutor-l2-problem",
    moduleSlug: "lecture-2",
    title: "Seminar 1 qualitative shock analysis",
    text:
      "The first seminar sheet asks students to reason qualitatively about technology, discount-factor, and monetary policy shocks using the same notation as Lecture 2.",
    citations: seminarCitations,
    tags: ["seminar", "qualitative", "shock-analysis"],
  },
];

export const demoProgress: ProgressSnapshot[] = [
  {
    moduleSlug: "symbols",
    status: "in_progress",
    completedSections: ["overview"],
    bestQuizScore: 0,
    weakTags: [],
  },
  {
    moduleSlug: "lecture-2",
    status: "in_progress",
    completedSections: ["model-intuition", "three-equation-core"],
    bestQuizScore: 67,
    weakTags: ["nkpc", "derivation"],
  },
];
