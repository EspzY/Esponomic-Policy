import type { Citation, NotationEntry } from "@/lib/types";

const lecture2Title = "Economic Policy: Lecture 2 - The New Keynesian Model";
const complementaryTitle =
  "Economic Policy: Complementary Lecture 2 - Transmission in the NK Model";
const nkpcNoteTitle =
  "Notes to Lecture 2 - Optimal Pricing Decision and NKPC Derivation";
const naturalRateTitle =
  "Why the natural real interest rate responds to temporary technology shocks";
const seminar1Title = "GRA 6631 Seminar 1 - NK Model";

export const lecture2IntroCitations: Citation[] = [
  {
    documentTitle: lecture2Title,
    page: "pp. 5-9",
    note: "Introduces the flexible-price benchmark, sticky prices, log-linear notation, and the output-gap definitions.",
    sourceType: "lecture",
  },
];

export const lecture2ThreeEquationCitations: Citation[] = [
  {
    documentTitle: lecture2Title,
    page: "pp. 11, 25-27",
    note: "States the three-equation NK system and shows how the full model is reduced to that compact representation.",
    sourceType: "lecture",
  },
];

export const lecture2HouseholdCitations: Citation[] = [
  {
    documentTitle: lecture2Title,
    page: "pp. 14, 20-24",
    note: "Household Euler equation, labor supply, and the flexible-price objects used in the natural-rate derivation.",
    sourceType: "lecture",
  },
];

export const lecture2FirmCitations: Citation[] = [
  {
    documentTitle: lecture2Title,
    page: "pp. 15-17",
    note: "Production, Calvo pricing, and the Phillips-curve relation in marginal-cost form.",
    sourceType: "lecture",
  },
];

export const lecture2NaturalCitations: Citation[] = [
  {
    documentTitle: lecture2Title,
    page: "pp. 20-24, 26-27",
    note: "Derives natural output, natural hours, and the natural real interest rate from the flexible-price system.",
    sourceType: "lecture",
  },
  {
    documentTitle: naturalRateTitle,
    page: "p. 1",
    note: "Provides intuition for why temporary technology shocks move the natural real rate in the standard NK model.",
    sourceType: "derivation_note",
  },
];

export const nkpcDerivationCitations: Citation[] = [
  {
    documentTitle: nkpcNoteTitle,
    page: "pp. 1-6",
    note: "Walks from the reset-price problem, through the recursive price-setting equation, to the NKPC and supporting identities.",
    sourceType: "derivation_note",
  },
];

export const shockTransmissionCitations: Citation[] = [
  {
    documentTitle: complementaryTitle,
    page: "pp. 4-7, 18-29",
    note: "Summarizes calibration values, shock definitions, and qualitative transmission of monetary, discount-factor, and technology shocks.",
    sourceType: "complementary_lecture",
  },
];

export const seminarCitations: Citation[] = [
  {
    documentTitle: seminar1Title,
    page: "pp. 1-2",
    note: "Exam-style qualitative shock-analysis questions using the Lecture 2 notation and benchmark model.",
    sourceType: "problem_set",
  },
];

export const allLecture2Citations = [
  ...lecture2IntroCitations,
  ...lecture2ThreeEquationCitations,
  ...lecture2HouseholdCitations,
  ...lecture2FirmCitations,
  ...lecture2NaturalCitations,
  ...nkpcDerivationCitations,
  ...shockTransmissionCitations,
  ...seminarCitations,
];

function notationEntry(
  entry: Omit<NotationEntry, "status">,
  status: NotationEntry["status"] = "verified",
): NotationEntry {
  return {
    ...entry,
    status,
  };
}

export const demoNotationEntries: NotationEntry[] = [
  notationEntry({
    id: "notation-output",
    moduleSlug: null,
    kind: "symbol",
    displayLatex: "y_t",
    spokenName: "y t, output",
    plainMeaning: "Actual output in the sticky-price New Keynesian economy.",
    whyItMatters:
      "This is the quantity that moves with both real shocks and monetary transmission when prices are not fully flexible.",
    whereItAppears: [
      "Lecture 2 notation slide.",
      "The production block, market clearing, and the three-equation model.",
    ],
    commonConfusions: [
      "Do not confuse $y_t$ with natural output $y_t^n$. The difference between them is the output gap.",
    ],
    relatedTerms: ["output gap", "natural output"],
    citations: lecture2IntroCitations,
  }),
  notationEntry({
    id: "notation-natural-output",
    moduleSlug: null,
    kind: "symbol",
    displayLatex: "y_t^n",
    spokenName: "y t n, natural output",
    plainMeaning:
      "Output in the flexible-price version of the model, also called potential output.",
    whyItMatters:
      "It is the benchmark that tells you whether actual output is too high or too low relative to the frictionless economy.",
    whereItAppears: [
      "Lecture 2 notation slide.",
      "Natural-output derivation and Dynamic IS equation.",
    ],
    commonConfusions: [
      "Natural output is not the same thing as actual output under sticky prices. Technology shocks can move $y_t^n$ even when the output gap falls.",
    ],
    relatedTerms: ["$\\tilde{y}_t$", "$r_t^n$"],
    citations: [...lecture2IntroCitations, ...lecture2NaturalCitations],
  }),
  notationEntry({
    id: "notation-output-gap",
    moduleSlug: null,
    kind: "symbol",
    displayLatex: "\\tilde{y}_t",
    spokenName: "y tilde t, output gap",
    plainMeaning:
      "The gap between actual output and natural output: $\\tilde{y}_t \\equiv y_t - y_t^n$.",
    whyItMatters:
      "It is the real-side object in the compact NK system and tells you whether sticky prices are making activity too strong or too weak relative to the flexible-price benchmark.",
    whereItAppears: [
      "Lecture 2 three-equation slide.",
      "Seminar 1 qualitative shock-analysis questions.",
    ],
    commonConfusions: [
      "A positive technology shock can raise $y_t$ and still lower $\\tilde{y}_t$ if $y_t^n$ rises by more.",
    ],
    relatedTerms: ["$y_t$", "$y_t^n$", "Dynamic IS"],
    citations: [...lecture2ThreeEquationCitations, ...seminarCitations],
  }),
  notationEntry({
    id: "notation-inflation",
    moduleSlug: null,
    kind: "symbol",
    displayLatex: "\\pi_t",
    spokenName: "pi t, inflation",
    plainMeaning:
      "Inflation, defined in the slides as $\\pi_t \\equiv p_t - p_{t-1}$ in the log-linearized model.",
    whyItMatters:
      "Inflation is the object monetary policy reacts to directly in the Taylor rule, and it is the left-hand-side variable in the NKPC.",
    whereItAppears: [
      "Lecture 2 three-equation slide.",
      "Firm block and NKPC derivation.",
    ],
    commonConfusions: [
      "In the baseline Lecture 2 model, inflation is forward looking. There is no lagged inflation term unless the model is extended later.",
    ],
    relatedTerms: ["price level", "NKPC"],
    citations: [...lecture2ThreeEquationCitations, ...nkpcDerivationCitations],
  }),
  notationEntry({
    id: "notation-real-rate",
    moduleSlug: null,
    kind: "symbol",
    displayLatex: "r_t",
    spokenName: "r t, real interest rate",
    plainMeaning:
      "The ex ante real interest rate, defined by $r_t \\equiv i_t - E_t\\pi_{t+1}$.",
    whyItMatters:
      "Households care about the real, not nominal, return when deciding whether to shift consumption across time.",
    whereItAppears: [
      "Lecture 2 household block.",
      "Dynamic IS intuition through the gap $r_t - r_t^n$.",
    ],
    commonConfusions: [
      "Do not treat $r_t$ as a policy instrument. The central bank sets $i_t$, and expected inflation helps determine $r_t$.",
    ],
    relatedTerms: ["$i_t$", "$r_t^n$"],
    citations: [...lecture2HouseholdCitations, ...lecture2ThreeEquationCitations],
  }),
  notationEntry({
    id: "notation-natural-rate",
    moduleSlug: null,
    kind: "symbol",
    displayLatex: "r_t^n",
    spokenName: "r t n, natural real interest rate",
    plainMeaning:
      "The real interest rate that would prevail in the flexible-price allocation.",
    whyItMatters:
      "The Dynamic IS equation depends on the gap between the actual real rate and the natural rate. That gap is what makes demand too weak or too strong.",
    whereItAppears: [
      "Lecture 2 three-equation slide.",
      "Natural-rate derivation and shock-transmission lecture.",
    ],
    commonConfusions: [
      "The natural rate is not a fixed long-run constant in this model. It moves with temporary technology and discount-factor shocks.",
    ],
    relatedTerms: ["Dynamic IS", "flexible-price allocation"],
    citations: [...lecture2NaturalCitations, ...shockTransmissionCitations],
  }),
  notationEntry({
    id: "notation-policy-rate",
    moduleSlug: null,
    kind: "symbol",
    displayLatex: "i_t",
    spokenName: "i t, nominal interest rate",
    plainMeaning: "The policy rate set by the central bank in the Taylor rule.",
    whyItMatters:
      "It is the nominal instrument the monetary authority directly controls in the baseline model.",
    whereItAppears: [
      "Lecture 2 three-equation slide.",
      "Household Euler equation and Taylor rule.",
    ],
    commonConfusions: [
      "A higher $i_t$ does not tell you everything by itself. You must compare it with expected inflation to understand the real-rate effect on demand.",
    ],
    relatedTerms: ["$r_t$", "$v_t$"],
    citations: [...lecture2ThreeEquationCitations, ...lecture2HouseholdCitations],
  }),
  notationEntry({
    id: "notation-consumption",
    moduleSlug: null,
    kind: "symbol",
    displayLatex: "c_t",
    spokenName: "c t, consumption",
    plainMeaning: "Consumption in the representative-household block.",
    whyItMatters:
      "Because market clearing imposes $y_t = c_t$ in this closed-economy setup, consumption is a direct channel from the Euler equation to output.",
    whereItAppears: [
      "Lecture 2 household block.",
      "Market-clearing condition and Seminar 1.",
    ],
    commonConfusions: [
      "In this lecture, consumption and output move together because the model is closed and there is no investment or government sector in the baseline setup.",
    ],
    relatedTerms: ["Euler equation", "market clearing"],
    citations: [...lecture2HouseholdCitations, ...seminarCitations],
  }),
  notationEntry({
    id: "notation-hours",
    moduleSlug: null,
    kind: "symbol",
    displayLatex: "n_t",
    spokenName: "n t, hours or labor input",
    plainMeaning: "Labor input in the production block.",
    whyItMatters:
      "Together with productivity, labor determines output. Technology shocks therefore change how much output can be produced for a given amount of labor.",
    whereItAppears: [
      "Labor-supply condition and production function.",
      "Shock-analysis questions about output and hours moving differently.",
    ],
    commonConfusions: [
      "Output rising does not guarantee that hours rise. Under a positive technology shock, higher productivity can let firms produce more with fewer hours.",
    ],
    relatedTerms: ["$a_t$", "$y_t$"],
    citations: [...lecture2HouseholdCitations, ...shockTransmissionCitations],
  }),
  notationEntry({
    id: "notation-operator-expectation",
    moduleSlug: null,
    kind: "operator",
    displayLatex: "E_t[\\cdot]",
    spokenName: "E sub t, expectation conditional on information at time t",
    plainMeaning:
      "The expectation operator using the information available in period $t$.",
    whyItMatters:
      "Lecture 2 is a forward-looking model. Expected future inflation, future output gaps, and future reset prices all shape current outcomes.",
    whereItAppears: [
      "Euler equation, NKPC, recursive pricing equation, and forward-looking solution formulas.",
    ],
    commonConfusions: [
      "Do not read $E_t\\pi_{t+1}$ as realized future inflation. It is the expectation formed today.",
    ],
    relatedTerms: ["forward looking", "recursive substitution"],
    citations: [...lecture2ThreeEquationCitations, ...nkpcDerivationCitations],
  }),
  notationEntry({
    id: "notation-sigma",
    moduleSlug: null,
    kind: "parameter",
    displayLatex: "\\sigma",
    spokenName: "sigma, inverse intertemporal elasticity of substitution",
    plainMeaning:
      "A parameter governing how willing households are to shift consumption across time.",
    whyItMatters:
      "It determines how strongly consumption and the output gap respond when the real interest rate moves relative to the natural rate.",
    whereItAppears: [
      "Household Euler equation.",
      "Natural output and natural-rate derivations.",
    ],
    commonConfusions: [
      "A larger $\\sigma$ means households are less willing to rearrange consumption intertemporally, not more.",
    ],
    relatedTerms: ["Euler equation", "Dynamic IS"],
    citations: [...lecture2HouseholdCitations, ...lecture2NaturalCitations],
  }),
  notationEntry({
    id: "notation-phi",
    moduleSlug: null,
    kind: "parameter",
    displayLatex: "\\phi",
    spokenName: "phi, inverse Frisch elasticity parameter",
    plainMeaning:
      "A parameter governing how costly it is for households to vary labor supply.",
    whyItMatters:
      "It affects the slope linking real marginal cost to the output gap and shows up in the natural-output formula.",
    whereItAppears: [
      "Labor-supply equation.",
      "Natural output derivation and proportionality result.",
    ],
    commonConfusions: [
      "In Lecture 2, $\\phi$ is not a Taylor-rule coefficient. Those are $\\phi_\\pi$ and $\\phi_y$.",
    ],
    relatedTerms: ["$\\phi_\\pi$", "$\\phi_y$", "$\\kappa$"],
    citations: [...lecture2HouseholdCitations, ...lecture2NaturalCitations],
  }),
  notationEntry({
    id: "notation-dis",
    moduleSlug: null,
    kind: "abbreviation",
    displayLatex: "\\text{DIS}",
    spokenName: "Dynamic IS equation",
    plainMeaning:
      "The output-gap equation that comes from subtracting the flexible-price Euler equation from the sticky-price Euler equation.",
    whyItMatters:
      "It explains why demand falls when the actual real rate rises above the natural rate.",
    whereItAppears: [
      "Three-equation core.",
      "Lecture 2 reduction from the full model to the compact system.",
    ],
    commonConfusions: [
      "The Dynamic IS equation is not an equilibrium condition about goods supply. It is an intertemporal demand relation.",
    ],
    relatedTerms: ["Euler equation", "output gap", "natural rate"],
    citations: lecture2ThreeEquationCitations,
  }),
  notationEntry({
    id: "notation-nkpc",
    moduleSlug: null,
    kind: "abbreviation",
    displayLatex: "\\text{NKPC}",
    spokenName: "New Keynesian Phillips Curve",
    plainMeaning:
      "The inflation equation linking current inflation to expected future inflation and real slack.",
    whyItMatters:
      "It is the bridge from nominal rigidity to observable inflation dynamics in the basic model.",
    whereItAppears: [
      "Three-equation core.",
      "Firm block and the pricing-derivation note.",
    ],
    commonConfusions: [
      "In this baseline lecture version, inflation depends on expected future conditions and current marginal-cost pressure, not lagged inflation.",
    ],
    relatedTerms: ["$\\lambda$", "$mc_t$", "Calvo pricing"],
    citations: [...lecture2ThreeEquationCitations, ...nkpcDerivationCitations],
  }),
  notationEntry({
    id: "notation-shock-a",
    moduleSlug: null,
    kind: "shock",
    displayLatex: "a_t",
    spokenName: "a t, technology shock",
    plainMeaning: "A productivity shock affecting the supply side of the economy.",
    whyItMatters:
      "It moves natural output directly and is the core supply shock in the baseline Lecture 2 environment.",
    whereItAppears: [
      "Production function, natural-output derivation, and shock-transmission lecture.",
    ],
    commonConfusions: [
      "A positive technology shock can lower inflation and the output gap even when actual output rises.",
    ],
    relatedTerms: ["supply shock", "natural output", "natural rate"],
    citations: [...lecture2IntroCitations, ...shockTransmissionCitations],
  }),
  notationEntry({
    id: "notation-shock-z",
    moduleSlug: null,
    kind: "shock",
    displayLatex: "z_t",
    spokenName: "z t, discount-factor shock",
    plainMeaning:
      "A demand shock entering the Euler equation and shifting households' desire to consume today versus later.",
    whyItMatters:
      "It moves the natural rate and current demand even when technology does not change.",
    whereItAppears: [
      "Household Euler equation.",
      "Shock-transmission lecture and Seminar 1.",
    ],
    commonConfusions: [
      "A discount-factor shock is still a demand disturbance even though it enters through preferences rather than the Taylor rule.",
    ],
    relatedTerms: ["demand shock", "$r_t^n$"],
    citations: [...lecture2IntroCitations, ...shockTransmissionCitations],
  }),
  notationEntry({
    id: "notation-shock-v",
    moduleSlug: null,
    kind: "shock",
    displayLatex: "v_t",
    spokenName: "v t, monetary policy shock",
    plainMeaning:
      "An exogenous disturbance in the Taylor rule that moves the policy rate away from its systematic response.",
    whyItMatters:
      "It is the clean way to trace monetary non-neutrality in the model: the instrument moves, prices are sticky, and demand falls before prices fully adjust.",
    whereItAppears: [
      "Taylor rule, complementary shock-transmission lecture, and Seminar 1.",
    ],
    commonConfusions: [
      "A monetary policy shock does not move potential output in this baseline setup, so the output gap tracks actual output.",
    ],
    relatedTerms: ["Taylor rule", "demand shock", "$i_t$"],
    citations: [...lecture2IntroCitations, ...shockTransmissionCitations],
  }),
  notationEntry({
    id: "notation-mc",
    moduleSlug: "lecture-2",
    kind: "abbreviation",
    displayLatex: "mc_t",
    spokenName: "m c t, real marginal cost",
    plainMeaning:
      "The model's measure of real marginal cost, defined in the lecture by $mc_t = w_t - p_t - a_t$.",
    whyItMatters:
      "It is the real-side driver of inflation in the pricing block. Once you show that $mc_t - mc$ is proportional to the output gap, the NKPC can be written in output-gap form.",
    whereItAppears: [
      "Firm block.",
      "NKPC derivation and proportionality result on Lecture 2 p. 25.",
    ],
    commonConfusions: [
      "Do not treat $mc_t$ as an arbitrary accounting object. It is the key wedge linking the labor market and productivity to inflation pressure.",
    ],
    relatedTerms: ["$mc$", "$\\lambda$", "$\\tilde{y}_t$"],
    citations: [...lecture2FirmCitations, ...lecture2ThreeEquationCitations],
  }),
  notationEntry({
    id: "notation-lambda",
    moduleSlug: "lecture-2",
    kind: "parameter",
    displayLatex: "\\lambda \\equiv \\frac{(1-\\theta)(1-\\beta\\theta)}{\\theta}",
    spokenName: "lambda, marginal-cost slope coefficient",
    plainMeaning:
      "The coefficient on the marginal-cost gap in the Phillips curve when inflation is written in terms of $mc_t - mc$.",
    whyItMatters:
      "It shows how Calvo stickiness and discounting compress or amplify the pass-through from marginal cost to inflation.",
    whereItAppears: [
      "Lecture 2 firm block.",
      "NKPC derivation note final expression.",
    ],
    commonConfusions: [
      "$\\lambda$ is not yet the slope on the output gap. That step comes after using $mc_t - mc = (\\sigma + \\phi)\\tilde{y}_t$.",
    ],
    relatedTerms: ["$\\kappa$", "$\\theta$", "NKPC"],
    citations: [...lecture2FirmCitations, ...nkpcDerivationCitations],
  }),
  notationEntry({
    id: "notation-kappa",
    moduleSlug: "lecture-2",
    kind: "parameter",
    displayLatex: "\\kappa = \\lambda(\\sigma + \\phi)",
    spokenName: "kappa, output-gap slope of the NKPC",
    plainMeaning:
      "The coefficient multiplying the output gap when the NKPC is written in the standard three-equation form.",
    whyItMatters:
      "It combines pricing frictions with household-side elasticities and therefore tells you how much inflation reacts when the output gap changes.",
    whereItAppears: [
      "Lecture 2 reduced three-equation system.",
      "Complementary lecture shock analysis.",
    ],
    commonConfusions: [
      "Do not confuse $\\kappa$ with the markup object $\\mu$. They play completely different roles.",
    ],
    relatedTerms: ["$\\lambda$", "$\\sigma$", "$\\phi$"],
    citations: lecture2ThreeEquationCitations,
  }),
  notationEntry({
    id: "notation-theta",
    moduleSlug: "lecture-2",
    kind: "parameter",
    displayLatex: "\\theta",
    spokenName: "theta, Calvo stickiness parameter",
    plainMeaning:
      "The probability that a firm cannot reset its price in a given period.",
    whyItMatters:
      "It controls how long prices remain fixed on average and therefore how persistent the real effects of nominal shocks can be.",
    whereItAppears: [
      "Calvo price-aggregation equation.",
      "NKPC derivation note through the factor $(\\beta\\theta)^k$.",
    ],
    commonConfusions: [
      "A higher $\\theta$ means more stickiness, not more flexibility.",
    ],
    relatedTerms: ["Calvo pricing", "$\\lambda$"],
    citations: [...lecture2FirmCitations, ...nkpcDerivationCitations],
  }),
  notationEntry({
    id: "notation-mu",
    moduleSlug: "lecture-2",
    kind: "parameter",
    displayLatex: "\\mu = \\log\\!\\left(\\frac{\\varepsilon}{\\varepsilon - 1}\\right)",
    spokenName: "mu, steady-state markup in logs",
    plainMeaning:
      "The steady-state markup term that also pins down the steady-state marginal cost through $mc = -\\mu$.",
    whyItMatters:
      "It shows up in the natural-output derivation and explains why a larger markup lowers the efficient level of output.",
    whereItAppears: [
      "Flexible-price block and natural-output derivation.",
      "NKPC derivation note when rewriting the reset-price equation.",
    ],
    commonConfusions: [
      "The lecture's $\\mu$ is a steady-state markup object, not a shock.",
    ],
    relatedTerms: ["$mc$", "natural output"],
    citations: [...lecture2NaturalCitations, ...nkpcDerivationCitations],
  }),
  notationEntry({
    id: "notation-reset-price",
    moduleSlug: "lecture-2",
    kind: "symbol",
    displayLatex: "p_t^*",
    spokenName: "p star t, reset price",
    plainMeaning:
      "The optimal price chosen by firms that are allowed to reoptimize in period $t$.",
    whyItMatters:
      "The entire NKPC derivation starts from how the reset price is chosen under the risk of being stuck with it in future periods.",
    whereItAppears: [
      "Calvo price aggregation.",
      "Optimal-pricing derivation note.",
    ],
    commonConfusions: [
      "$p_t^*$ is not the aggregate price level. It is the price selected only by the firms that can reset today.",
    ],
    relatedTerms: ["$p_t$", "$\\theta$"],
    citations: [...lecture2FirmCitations, ...nkpcDerivationCitations],
  }),
  notationEntry({
    id: "notation-phi-pi",
    moduleSlug: "lecture-2",
    kind: "parameter",
    displayLatex: "\\phi_\\pi",
    spokenName: "phi pi, inflation coefficient in the Taylor rule",
    plainMeaning: "The policy-rule coefficient on inflation.",
    whyItMatters:
      "The lecture highlights the Taylor principle: policy must respond sufficiently aggressively to inflation to deliver equilibrium uniqueness.",
    whereItAppears: [
      "Monetary policy rule.",
      "Lecture 2 uniqueness condition on p. 28.",
    ],
    commonConfusions: [
      "Do not confuse $\\phi_\\pi$ with the household-side labor parameter $\\phi$.",
    ],
    relatedTerms: ["Taylor principle", "$\\phi_y$"],
    citations: [...lecture2ThreeEquationCitations, ...lecture2NaturalCitations],
  }),
  notationEntry({
    id: "notation-phi-y",
    moduleSlug: "lecture-2",
    kind: "parameter",
    displayLatex: "\\phi_y",
    spokenName: "phi y, output-gap coefficient in the Taylor rule",
    plainMeaning: "The policy-rule coefficient on the output gap.",
    whyItMatters:
      "It says how strongly the central bank leans against real-side deviations from the flexible-price benchmark.",
    whereItAppears: ["Taylor rule and uniqueness condition."],
    commonConfusions: [
      "A low $\\phi_y$ does not mean policy ignores output; it means inflation is given relatively more weight in the calibration shown in the complementary lecture.",
    ],
    relatedTerms: ["Taylor rule", "$\\phi_\\pi$"],
    citations: [...lecture2ThreeEquationCitations, ...shockTransmissionCitations],
  }),
];

export const globalNotationEntries = demoNotationEntries.filter(
  (entry) => entry.moduleSlug === null,
);

export const lecture2NotationEntries = demoNotationEntries.filter(
  (entry) => entry.moduleSlug === "lecture-2",
);
