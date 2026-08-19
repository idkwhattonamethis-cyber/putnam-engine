/* Schedule data — the 120-week Putnam campaign.
   Day 1 is Wed 19 Aug 2026; week 1 is a Wed–Sun stub, every week from 2 on runs Mon→Sun.
   Week 120 (Mon 27 Nov – Sun 3 Dec 2028) contains the target: Putnam, Sat 2 Dec 2028.
   No AMC/AIME track — this campaign is Putnam-only from day one. */

export const START = new Date(2026, 7, 19);   // Wed 19 Aug 2026 — day 1 (stub week)
export const ANCHOR = new Date(2026, 7, 24);  // Mon 24 Aug 2026 — first Monday, start of week 2
export const TARGET = new Date(2028, 11, 2);  // Sat 2 Dec 2028 — Putnam
export const TARGET_FINAL = new Date(2029, 11, 1); // Sat 1 Dec 2029 — the last legal sitting, on the 3-year path
export const TOTAL_WEEKS = 178;
export const PRIMARY_WEEKS = 120;   // wk 120 = Putnam 2028, the stated target
export const DAY_MS = 86400000;

/* whole-day difference that survives DST boundaries (both args are local midnight) */
const dayDiff = (a, b) => Math.round((a - b) / DAY_MS);
export const weekOf = (d) => (d < ANCHOR ? 1 : 2 + Math.floor(dayDiff(d, ANCHOR) / 7));
export const weekStart = (n) => { if (n <= 1) return new Date(START); const d = new Date(ANCHOR); d.setDate(d.getDate() + 7 * (n - 2)); return d; };
export const weekEnd = (n) => { const d = weekStart(n); d.setDate(d.getDate() + (n <= 1 ? 4 : 6)); return d; };

export function W(list, startWk, code) { return list.map((s, i) => { const p = s.split("|"); return { wk: startWk + i, code, t: p[0], m: p[1] || "" }; }); }

export const WEEKS = [
  /* ---------- P1 · Proof & Strategy Base — wk 1–7 · 19 Aug → 4 Oct 2026 ---------- */
  ...W([
    "Zeitz ch.1 (What is problem solving?) + Book of Proof ch.1–2 · P&B ch.1 opens|DAY 1 = Wed 19 Aug (Wed–Sun stub week). Baseline diagnostic. Both logs open. SAT thread begins.",
    "Zeitz ch.2.1–2.2 (get your hands dirty · penultimate step · wishful thinking) + Book of Proof ch.3–6 (counting, direct proof, contrapositive, contradiction)|First full week. The write-up habit is the point, not the problem count.",
    "Zeitz ch.2.3–2.4 (methods of argument · other strategies) + Book of Proof ch.7–10 (induction, disproof, relations, functions)|Proof grammar locked",
    "Zeitz ch.3.1–3.2 (symmetry · the extreme principle)|",
    "Zeitz ch.3.3–3.4 (pigeonhole · invariants and monovariants)|SAT REGISTRATION DEADLINE Fri 18 Sep — register this week or the Oct 3 sitting is gone. Full-length SAT checkpoint Sat.",
    "Zeitz ch.4.1–4.2 (graph theory · complex numbers as crossover tactics)|",
    "Zeitz ch.4.3 (generating functions) — SAT week, math deliberately light|*** SAT · Sat 3 Oct 2026 ***",
  ], 1, "P1"),

  /* ---------- P2 · Analysis I: Spivak — wk 8–19 · 5 Oct → 27 Dec 2026 ---------- */
  ...W([
    "Spivak ch.1–2 (Basic Properties of Numbers · Numbers of Various Sorts)|SAT done — 100% of the day is Putnam from here. Zeitz drops to the slot-C problem diet.",
    "Spivak ch.3–4 (Functions · Graphs)|",
    "Spivak ch.5–6 (Limits · Continuous Functions)|",
    "Spivak ch.7–8 (Three Hard Theorems · Least Upper Bounds)|The two chapters that decide whether analysis ever feels rigorous. Do not rush them.",
    "Spivak ch.9–10 (Derivatives · Differentiation)|",
    "Spivak ch.11–12 (Significance of the Derivative · Inverse Functions)|",
    "Spivak ch.13–14 (Integrals · The Fundamental Theorem of Calculus)|",
    "Spivak ch.15 + 18 (Trigonometric Functions · Logs and Exponentials)|",
    "Spivak ch.19 (Integration in Elementary Terms) — light week, the rehearsal is the event|*** Sat 5 Dec 2026: HOME DRESS REHEARSAL (Putnam 2005, both sessions) ***",
    "Rehearsal post-mortem + Spivak ch.20 (Approximation by Polynomial Functions / Taylor)|Post-mortem before any new theory",
    "Spivak ch.22–23 (Infinite Sequences · Infinite Series)|",
    "Spivak ch.24 (Uniform Convergence & Power Series) + consolidation|Spivak done · holiday week: half-days are fine, zero days are not",
  ], 8, "P2"),

  /* ---------- P3 · Number Theory + Combinatorics — wk 20–29 · 28 Dec 2026 → 7 Mar 2027 ---------- */
  ...W([
    "Niven §1.1–1.4 (divisibility, primes, the binomial theorem)|New year, new subject. NT and counting need no analysis — pure Putnam yield.",
    "Niven §2.1–2.4 (congruences, CRT, solving congruences)|",
    "Niven §2.5–2.8 (prime power & prime modulus, primitive roots)|",
    "Niven §3.1–3.3 + §4.1 (quadratic residues, reciprocity, Jacobi symbol, greatest integer) + LTE|NT toolkit live",
    "Bóna ch.1–3 (pigeonhole, induction, elementary counting)|",
    "Bóna ch.4–5 (binomial theorem & identities, integer partitions)|",
    "Bóna ch.6–7 (cycles in permutations · the sieve / inclusion–exclusion)|",
    "Bóna ch.8 (ordinary generating functions) + Wilf ch.1 (Introductory Ideas and Examples)|",
    "Wilf ch.2 §2.1–2.3 (formal OGF/EGF calculus) + Bóna EGF section + competition GF sets|Generating functions live",
    "Consolidation — every NT + counting theorem re-proved cold, mixed timed sets|Discrete toolkit audit · BUFFER WEEK: behind? catch up here. On track? run it at half load and rest",
  ], 20, "P3"),

  /* ---------- P4 · Analysis II: Rudin — wk 30–37 · 8 Mar → 2 May 2027 ---------- */
  ...W([
    "Rudin ch.1 — consolidation + exercises (primed since wk 20, so this week is problems, not first contact)|One chapter a week from here. Every theorem reproduced from memory before advancing.",
    "Rudin ch.2 — compactness & connectedness re-proved cold + exercises (primed since wk 24)|The chapter that pays off for the rest of your life. Ten weeks of priming bought you the right to spend this week on its exercises.",
    "Rudin ch.3 (first half) — sequences, subsequences, Cauchy criterion|",
    "Rudin ch.3 (second half) — series, root/ratio tests, rearrangements|",
    "Rudin ch.4 — continuity, uniform continuity, connectedness|",
    "Rudin ch.5 — differentiation, MVT, L'Hôpital, Taylor's theorem|",
    "Rudin ch.6 — the Riemann–Stieltjes integral|",
    "Rudin ch.7 — sequences & series of functions, uniform convergence|Rudin core done",
  ], 30, "P4"),

  /* ---------- P5 · Linear Algebra: Axler — wk 38–43 · 3 May → 13 Jun 2027 ---------- */
  ...W([
    "Axler ch.1–2 — vector spaces, finite-dimensional vector spaces|",
    "Axler ch.3 — linear maps, null space & range, matrices, duality|",
    "Axler ch.4–5A — polynomials, invariant subspaces, eigenvalues|",
    "Axler ch.5B–5D — diagonalizability, minimal & characteristic polynomials|",
    "Axler ch.6 — inner-product spaces, Gram–Schmidt, orthogonal projection|",
    "Axler ch.7 + 8A — spectral theorem, generalized eigenvectors (Jordan form, overview)|Axler done · BUFFER WEEK: if you are behind anywhere, catch up here instead of advancing",
  ], 38, "P5"),

  /* ---------- P6 · Toolkit Sweep (summer 2027) — wk 44–56 · 14 Jun → 12 Sep 2027 ---------- */
  ...W([
    "Steele ch.1–2, 5 — Cauchy–Schwarz, AM-GM, consequences of order|COACH ONBOARDS — full-time summer, 3 graded write-ups/wk from here on",
    "Steele ch.6, 8, 13 (convexity/Jensen, power means, majorization & Schur) + M–O–D ch.1|",
    "M–O–D ch.3 (recent olympiad inequalities) + PFTB ch.1–2 (substitutions · always Cauchy–Schwarz)|Big-3 inequalities reflexive",
    "Complex — A-to-Z ch.2 (polar form, nth roots of unity) + Needham ch.1|",
    "Complex — A-to-Z §5.7–5.8 (polygons, complex-number combinatorics) + PFTB ch.7 + cyclotomic sums|",
    "MULTIVARIABLE — Rudin ch.9 (the derivative in several variables, inverse & implicit function theorems) + Lagrange multipliers, Jacobians, multiple integrals|Primed since wk 38. Spivak was single-variable; this is the hole that shows up as a B-problem",
    "Geometry — EGMO ch.5–6 (complex numbers, barycentric coordinates) — computational methods ONLY|Deliberate triage: synthetic olympiad geometry is the lowest-yield Putnam topic per hour. One week on the two methods that actually close Putnam geometry problems, and we accept skipping the rest",
    "Probability — Grinstead & Snell ch.1, 3, 6 (discrete, combinatorics, expectation & variance) + Loh's probabilistic-methods handout|",
    "Graphs — Bóna ch.9–11 (graph origins, trees, matchings & colorings)|",
    "Graphs — Bóna ch.12–13 (planarity, Ramsey) + PFTB ch.6 (extremal graph theory)|",
    "Abstract algebra — Gallian ch.1–6 + 26–27 (groups, permutation groups, symmetry & Burnside counting), selective|",
    "Polynomials & functional equations — PFTB ch.10–11 (arithmetic properties of polynomials · Lagrange interpolation) + FE handout sets|",
    "TOOLKIT AUDIT — 5 key theorems per topic reproduced cold; mixed timed sets across everything|All Putnam topics seen · UMN classes start Tue 7 Sep",
  ], 44, "P6"),

  /* ---------- P7 · Synthesis + Peak I — wk 57–68 · 13 Sep → 5 Dec 2027 ---------- */
  ...W([
    "P&B cross-subject mixed sets — first full week at UMN|Join the Putnam training group in your first 5 days. Confirm the Putnam registration path with the department. Line up research or independent-study credits now — see the enrolment note in the Plan tab.",
    "P&B mixed + write-up speed under a real clock|REGISTER (dept supervisor + MAA) — the deadline is early October, do not let it pass",
    "Kedlaya–Poonen–Vakil 1985–2000 — work the themed sections, not chronologically|The commentary is the whole point: it names the technique behind each problem",
    "KPV themed sections + coach-targeted sets on the 2 weakest categories|",
    "Peak 1 — full sim + patch cycle|",
    "Peak 2 — full sim + patch cycle|",
    "Peak 3 — full sim + patch cycle|",
    "Peak 4 — full sim + patch cycle|",
    "Peak 5 — last full-intensity week|Score trend is the only KPI",
    "Taper — light favorites, sleep locked to exam timing|",
    "Deep taper — body clock is the exam clock; logistics done by Thursday|",
    "FIRST REAL ATTEMPT — Sat 4 Dec 2027|*** Putnam sit #1 · Sat 4 Dec 2027 ***",
  ], 57, "P7"),

  /* ---------- P8 · Post-mortem + Weakness Rebuild — wk 69–82 · 6 Dec 2027 → 12 Mar 2028 ---------- */
  ...W([
    "Post-mortem I — re-solve all 12 problems untimed, to airtight write-ups|UMN finals week. 2–3 problems/day is enough — and the FIRST genuinely light week since August 2026. Take it",
    "Post-mortem II — coach builds the gap map from your paper + your recollections|Gap map",
    "Weakness #1 rebuild — theory refresh + daily drills|Winter break: the highest-leverage 3 weeks of year 2",
    "Weakness #1 — timed category sets under exam clock|",
    "Weakness #1 verified with fresh problems → #2 begins|#1 patched",
    "Weakness #2 — theory refresh + daily drills|",
    "Weakness #2 verified with fresh problems|Both patched",
    "Larson ch.1–2 (heuristics · induction and pigeonhole) — technique-indexed drilling|",
    "Larson selective — the chapters matching your two gap-map weaknesses|",
    "P&B completion pass I — 12–15 write-ups/wk|",
    "P&B completion pass II|",
    "P&B completion pass III|P&B complete",
    "Hard-problem sprints in your lowest-scoring categories|",
    "Mastery consolidation → total simulation|NEW THEORY ENDS HERE · BUFFER WEEK before 25 straight simulation weeks — take it seriously",
  ], 69, "P8"),

  /* ---------- P9 · Total Simulation — wk 83–107 · 13 Mar → 3 Sep 2028 ---------- */
  ...Array.from({ length: 25 }, (_, i) => {
    const n = i + 1;
    /* Paper allocation, so no phase burns a paper another phase needs. See PAPER_BUDGET. */
    const era = n <= 7 ? "a 1998–2004 paper" : n <= 13 ? "a 2006–2011 paper" : n <= 20 ? "a 2012–2018 paper" : "a RE-SIT of one of your 1985–1993 papers from P7 (14+ months ago \u2014 you will not remember 12 problems)";
    const m = n === 8 ? "8+ sims" : n === 15 ? "15+ sims" : n === 20 ? "20+ sims" : n === 25 ? "25 sims · recent papers next" : "";
    return { wk: 82 + n, code: "P9", t: `SIM #${n} — ${era} + weekday patch cycle`, m, era, n };
  }),

  /* ---------- P10 · Recent Papers + Taper — wk 108–120 · 4 Sep → 3 Dec 2028 ---------- */
  ...W([
    "Recent papers — Putnam 2019 + 2020|Fall semester: the sims are now the curriculum",
    "Recent papers — Putnam 2021|",
    "Recent papers — Putnam 2022|",
    "Recent papers — Putnam 2023|",
    "Recent papers — Putnam 2024|~30 sims logged",
    "Recent papers — Putnam 2025 + tricks sheet drafted|",
    "Recent papers — Putnam 2026 + mixed recent, sleep locked to exam timing|",
    "Putnam 2027 re-solved (your own paper) + tricks sheet final, triage rehearsal|Decisions automatic",
    "Confidence block — favorites + LAST full sim|",
    "Taper — light favorites, logistics done|",
    "Deep taper — body clock locked to exam clock|",
    "Pre-exam week — one warm-up pair Wed, nothing after|",
    "PUTNAM — Saturday 2 Dec 2028|*** THE TARGET ***",
  ], 108, "P10"),

  /* ---------- P11 · Post-mortem + Full-time cycle — wk 121-132 · 4 Dec 2028 -> 25 Feb 2029 ---------- */
  ...W([
    "Post-mortem I — re-solve all 12 problems from 2 Dec untimed|Finals week. No self-grading: write recollections the same evening, hand everything to the coach.",
    "Post-mortem II — gap map #2 from your own paper and the coach's read|Gap map #2",
    "CONFIRM YEAR 3 with your advisor — degree audit, credit load, funding, housing|*** Decision already made (Aug 2026): 3 years, graduate spring 2030 ***",
    "Interview conversion: every fall-2028 application chased, every recruiter answered|Winter break — recruiting admin IS the work",
    "Interview block — first rounds. Written post-mortem the same day, every time|",
    "Interview block + MFM IDP internal application drafted|",
    "MFM IDP application submitted|IDP in",
    "Superday prep — market-making games daily, mocks with your partner|",
    "Interviews continue + flagship note v3 defended to a genuinely hostile reader|",
    "Recruiting admin: offer timelines and negotiating windows understood BEFORE you need them|",
    "Research entry — pick the professor and the problem for spring 2029|The letter starts being earned here",
    "Spring term opens — coursework locked, research started|Putnam 2028 results land Feb/Mar",
  ], 121, "P11"),

  /* ---------- P12 · The Sprint — wk 133-145 · 26 Feb -> 27 May 2029 ---------- */
  ...W([
    "SPRINT 1 — quant prep AT THE CAP (2-3 h/day): green book pass 3, timed|Results land this window",
    "Sprint 2 — Heard on the Street complete + mental math to elite (90-in-8)|",
    "Sprint 3 — Natenberg, options intuition, volatility as a traded object|",
    "Sprint 4 — market-making games daily with a partner|",
    "Sprint 5 — one mock a week, every one post-mortemed in writing|",
    "Sprint 6 — flagship v4: another year of data, capacity analysis, execution costs|",
    "Sprint 7 — brainteaser bank complete; betting-calibration games|",
    "Sprint 8 — research with your professor. This is what actually buys the letter|",
    "Sprint 9 — the 90-second pitch delivered cold, to strangers, until it is boring|",
    "Sprint 10 — summer locked: internship, or research + flagship if it did not land|",
    "Sprint 11 — coursework close-out|",
    "End of year 2 — you are NOT graduating. Year 3 begins, and with it the last Putnam|*** Year 3 confirmed · one more sitting bought ***",
    "Transition week — Putnam re-entry begins Monday. Summer internship starts within the fortnight|",
  ], 133, "P12"),

  /* ---------- P13 · Summer 2029 + re-entry — wk 146-159 · 28 May -> 2 Sep 2029 ---------- */
  ...W([
    "Summer 2029 internship starts — the whole reason year 3 exists. No internship? Research + flagship, full time, no self-pity|The conversion year",
    "Putnam re-entry: Kedlaya archive, 5 easy-band problems a day. The muscle returns faster than you expect|",
    "Re-entry — timed pairs return on Saturdays|",
    "Weakness audit against the Dec-2028 gap map|",
    "Weak topic #1 — theory refresh + daily drills|",
    "Weak topic #1 verified with fresh problems|#1 patched",
    "Weak topic #2 — theory refresh + daily drills|",
    "Weak topic #2 verified|Both patched",
    "P&B — every problem you never closed, closed|",
    "KPV 1985-2000 — the themed sections you skipped the first time|",
    "Full sims resume — one a week from here to the exam|",
    "Sim + patch cycle|",
    "Sim + patch cycle|Internship converts or it doesn't — either way the post-mortem gets written",
    "Summer close-out: internship post-mortem written, return-offer status known|",
  ], 146, "P13"),

  /* ---------- P14 · Final campaign — wk 160-172 · 3 Sep -> 2 Dec 2029 ---------- */
  ...W([
    "UMN year 3 opens. REGISTER for your LAST Putnam|Register — final sitting, no second chances",
    "Full sim + patch cycle|",
    "Full sim + patch cycle|",
    "Full sim + patch cycle|",
    "Full sim + patch cycle|",
    "Full sim + patch cycle|",
    "Full sim + patch cycle|",
    "PEAK 1 — the hardest full-intensity week of the entire campaign|",
    "PEAK 2 — the last full-intensity week you will ever run for this exam|",
    "Taper — light favourites, sleep locked to exam timing|",
    "Deep taper — body clock is the exam clock|",
    "Pre-exam week — one warm-up pair Wednesday, nothing after it|",
    "PUTNAM — Saturday 1 Dec 2029. The last one|*** FINAL SITTING ***",
  ], 160, "P14"),

  /* ---------- P15 · Close-out — wk 173-178 · 3 Dec 2029 -> 13 Jan 2030 ---------- */
  ...W([
    "Post-mortem — re-solve all 12, one last time, for nobody but you|",
    "Full-time cycle: three Putnam scores, a research note, an order book, an Expert rating|",
    "Professor letters requested. By now you have earned them|",
    "Interviews + winter break|",
    "Handover — write down what you would tell someone starting this in 2030|",
    "END. 178 weeks|*** Campaign complete ***",
  ], 173, "P15"),
];

export const PHASE_META = {
  P1:  { name: "Proof & Strategy Base",  color: "#2F6E8F" },
  P2:  { name: "Analysis I · Spivak",    color: "#6D5296" },
  P3:  { name: "Number Theory + Comb.",  color: "#B0442F" },
  P4:  { name: "Analysis II · Rudin",    color: "#B0722A" },
  P5:  { name: "Linear Algebra · Axler", color: "#3F7A56" },
  P6:  { name: "Toolkit Sweep",          color: "#2C7A82" },
  P7:  { name: "Synthesis + Peak I",     color: "#C05F2C" },
  P8:  { name: "Post-mortem + Rebuild",  color: "#8C3B2E" },
  P9:  { name: "Total Simulation",       color: "#6D5296" },
  P10: { name: "Recent + Taper",         color: "#B0722A" },
  P11: { name: "Post-mortem + Cycle",    color: "#2F6E8F" },
  P12: { name: "The Sprint",             color: "#3F7A56" },
  P13: { name: "Summer 2029 + Re-entry", color: "#2C7A82" },
  P14: { name: "Final Campaign",         color: "#8C3B2E" },
  P15: { name: "Close-out",              color: "#6E6455" },
};
export const PHASE_ORDER = ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10", "P11", "P12", "P13", "P14", "P15"];

/* P1 DAY-BY-DAY — real PDF page numbers, so no two content days in the same week
   ever show identical text. Verified against the actual local files:
     Zeitz 3e            (putnam books/The Art and Craft of Problem Solving...)
     Hammack Book of Proof 3.4 (free PDF, richardhammack.github.io/BookOfProof/Main.pdf)
   dayIdx: 0=Mon 1=Tue 2=Wed 3=Thu 4=Fri. Week 1 only has entries for 2,3,4 (starts Wed).
   Book of Proof deliberately skips ch.3 Counting (77-122, covered far better later by
   Niven/Bona) and ch.11-14 Relations/Functions/Cardinality (not on the Putnam critical
   path) — core proof grammar only: Sets, Logic, Direct/Contrapositive/Contradiction,
   Non-conditional statements, Proofs Involving Sets, Disproof, Induction. Ends p.210. */
export const ZEITZ_DAY = {
  1: { 2: "Zeitz pp.17–18 (§1.1 ‘Exercises’ vs. ‘Problems’) — read slowly, this is the whole book's thesis in 2 pages.", 3: "Zeitz pp.19–21 (§1.2 The Three Levels of Problem Solving).", 4: "Zeitz pp.22–27 (§1.3 A Problem Sampler + §1.4 How to Read This Book) — work every sampler problem before reading its discussion." },
  2: { 0: "Zeitz pp.28–31 (§2.1 Psychological Strategies, start ‘Mental Toughness’).", 1: "Zeitz pp.31–38 (finish §2.1: ‘Creativity’).", 2: "Zeitz pp.39–43 (§2.2 start: ‘The First Step: Orientation’).", 3: "Zeitz pp.43–48 (§2.2 continued: ‘I'm Oriented, Now What?’).", 4: "Zeitz pp.48–52 (finish §2.2) — chapter 2.1–2.2 complete." },
  3: { 0: "Zeitz pp.53–58 (§2.3 start: abbreviations, symbolic logic, argument by contradiction).", 1: "Zeitz pp.58–65 (finish §2.3: Mathematical Induction).", 2: "Zeitz pp.65–71 (§2.4 start: Draw a Picture!).", 3: "Zeitz pp.71–73 (§2.4: Change Your Point of View) — chapter 2.3–2.4 complete.", 4: "REVIEW day — re-read your own week-3 write-ups cold, no new pages." },
  4: { 0: "Zeitz pp.74–80 (§3.1 start: Geometric Symmetry).", 1: "Zeitz pp.80–86 (finish §3.1: Algebraic Symmetry).", 2: "Zeitz pp.86–96 (§3.2 The Extreme Principle, complete) — chapter 3.1–3.2 complete.", 3: "REVIEW day — redo 2 problems from this week untimed, no notes.", 4: "REVIEW day — same, different problems." },
  5: { 0: "Zeitz pp.96–99 (§3.3 start: Basic + Intermediate Pigeonhole).", 1: "Zeitz pp.99–104 (finish §3.3: Advanced Pigeonhole).", 2: "Zeitz pp.104–113 (§3.4 start: Parity, Modular Arithmetic and Coloring).", 3: "Zeitz pp.113–120 (finish §3.4: Monovariants) — chapter 3.3–3.4 complete.", 4: "SAT checkpoint week — no new Zeitz today, tag review only." },
  6: { 0: "Zeitz pp.121–127 (§4.1 Graph Theory: Connectivity, Cycles, Eulerian/Hamiltonian Walks).", 1: "Zeitz pp.127–132 (finish §4.1: The Two Men of Tibet).", 2: "Zeitz pp.132–139 (§4.2 start: Basic Operations, Roots of Unity).", 3: "Zeitz pp.139–143 (finish §4.2: Some Applications) — chapter 4.1–4.2 complete.", 4: "REVIEW day — redo your weakest problem from this week." },
  7: { 0: "Zeitz pp.144–148 (§4.3 start: Introductory Examples).", 1: "Zeitz pp.148–154 (Recurrence Relations, Partitions).", 2: "Zeitz pp.154–158 (§4.4 Interlude: A Few Mathematical Games) — chapter 4.3 complete, F1 phase of Zeitz done.", 3: "LIGHT — SAT is Saturday. Re-read your best week-1–6 write-up.", 4: "LIGHT — nothing new. Sleep, logistics, confidence." },
};
export const zeitzDay = (wk, dayIdx) => (ZEITZ_DAY[wk] && ZEITZ_DAY[wk][dayIdx]) || null;

export const PROOF_WEEK = {
  1: "Book of Proof pp.15–27 (§1.1–1.3 Sets: Introduction to Sets, The Cartesian Product, Subsets) — 3 content days, ~4 pages/day.",
  2: "Book of Proof pp.27–48 (finish §1 Sets: Power Sets→Russell's Paradox, pp.27–45; start §2 Logic: Statements, pp.46–48) — ~4 pages/day across 5 days.",
  3: "Book of Proof pp.48–69 (§2 Logic: And/Or/Not → Translating English to Symbolic Logic) — ~4 pages/day.",
  4: "Book of Proof pp.69–76 (finish §2 Logic: Negating Statements, Logical Inference) THEN SKIP to pp.125–139 (§4 Direct Proof, complete — ch.3 Counting deliberately skipped, covered better by Niven/Bóna later).",
  5: "Book of Proof pp.140–148 (§5 Contrapositive Proof, complete) + pp.149–156 (§6 Proof by Contradiction, complete) + pp.159–162 (§7 start: if-and-only-if statements).",
  6: "Book of Proof pp.162–168 (finish §7 Non-Conditional Statements: existence/uniqueness proofs) + pp.169–183 (§8 Proofs Involving Sets, complete).",
  7: "Book of Proof pp.184–191 (§9 Disproof, complete) + pp.192–210 (§10 Mathematical Induction, complete) — P1's proof-grammar core ends here. §11–12 Relations/Functions are optional bonus reading, not on the critical path.",
};

/* P1 detail: the proof on-ramp + the SAT thread that ends 3 Oct 2026 */
export const P1MAP = {
  1: { zeitz: "Zeitz ch.1 — what problem solving actually is: exercise vs. problem, and the psychology of the 20-minute struggle.", proof: "Book of Proof ch.1–4 (sets, logic, quantifiers, direct proof) — free PDF. This is grammar, not mathematics: move fast.", sat: "SAT thread STARTS (slot C, 30–40 min, hard cap): Bluebook diagnostic + Meltzer Grammar pp.7–15 (Intro, Cheat Sheet, Parts of Speech, Preliminary Exercise)" },
  2: { zeitz: "Zeitz ch.2.1–2.2 — get your hands dirty, penultimate step, wishful thinking, make it easier.", proof: "Book of Proof ch.5–8 (contrapositive, contradiction, induction, proofs involving sets)", sat: "SAT 30–40 min/day: Meltzer Grammar pp.16–30 (ch.1 Is it Relevant? Adding, Deleting & Revising) + 15 QBank items on your weakest tag" },
  3: { zeitz: "Zeitz ch.2.3–2.4 — methods of argument, and changing the point of view.", proof: "Book of Proof ch.9–11 (disproof, relations, functions & cardinality) — finish it this week", sat: "SAT 30–40 min/day: Meltzer Grammar pp.31–52 (ch.2 Sentence and Paragraph Order, ch.3 Infographics)" },
  4: { zeitz: "Zeitz ch.3.1–3.2 — symmetry (impose it, then exploit it) and the extreme principle.", proof: "Proof grammar is now maintenance: every solution you write is the exercise.", sat: "SAT 30–40 min/day: Meltzer Grammar pp.53–70 (ch.4 Shorter is Better, ch.5 Diction, Idioms & Register)" },
  5: { zeitz: "Zeitz ch.3.3–3.4 — pigeonhole (including the strong form) and invariants/monovariants.", proof: "Rewrite two week-2 write-ups to the standard you can now hold.", sat: "SAT FULL-LENGTH CHECKPOINT Sat (score it, target 1500+) + tag review. REGISTRATION CLOSES FRI 18 SEP." },
  6: { zeitz: "Zeitz ch.4.1–4.2 — graph theory and complex numbers used as crossover tactics on problems that mention neither.", proof: "Write-up speed: a complete proof page in under 25 min.", sat: "SAT 30–40 min/day: weakest-tag surgery driven by the checkpoint" },
  7: { zeitz: "Zeitz ch.4.3 — generating functions as a crossover tactic. Light week: the SAT is Saturday.", proof: "Nothing new. Re-read your own best three write-ups.", sat: "SAT: nothing new — sleep, logistics, confidence. TEST Sat 3 Oct. Backup sittings: 7 Nov (5 Dec collides with the rehearsal)." },
};

/* Spivak chapter map (P2) */
export const SPV = {
  8:  "Spivak ch.1–2 (Basic Properties of Numbers · Numbers of Various Sorts)",
  9:  "Spivak ch.3–4 (Functions · Graphs)",
  10: "Spivak ch.5–6 (Limits · Continuous Functions)",
  11: "Spivak ch.7–8 (Three Hard Theorems · Least Upper Bounds)",
  12: "Spivak ch.9–10 (Derivatives · Differentiation)",
  13: "Spivak ch.11–12 (Significance of the Derivative · Inverse Functions)",
  14: "Spivak ch.13–14 (Integrals · The Fundamental Theorem of Calculus)",
  15: "Spivak ch.15, 18 (Trigonometric Functions · Log and Exponential Functions)",
  16: "Spivak ch.19 (Integration in Elementary Terms) — light; the rehearsal owns this week",
  17: "Spivak ch.20 (Approximation by Polynomial Functions — Taylor's theorem)",
  18: "Spivak ch.22–23 (Infinite Sequences · Infinite Series)",
  19: "Spivak ch.24 (Uniform Convergence & Power Series) + loose ends",
};

/* RUDIN PRIMING — wk 20–29, riding in slot C underneath the number-theory and
   combinatorics phase. Two pages, three days a week, and every theorem on those pages
   re-proved on blank paper before moving on. Reading Rudin passively is worthless; this
   is a slow first pass, not a skim.

   Two jobs at once: chapters 1–2 arrive FAMILIAR when the intensive block opens in wk 30
   (so those weeks go on exercises, where the learning actually is, instead of first
   contact) — and it keeps an analysis thread alive through ten weeks of discrete maths,
   so Spivak does not quietly decay while you are doing Niven and Bóna. */
export const RUDIN_PRIME = {
  20: "Rudin §1.1–1.11 (ordered sets, least upper bound property)",
  21: "Rudin §1.12–1.18 (fields, the ordered field axioms)",
  22: "Rudin §1.19–1.23 (the real field, existence of R, extended reals) + skim the Appendix on Dedekind cuts",
  23: "Rudin §1.24–1.38 (complex field, Cauchy–Schwarz, Euclidean spaces) — ch.1 read through",
  24: "Rudin §2.1–2.14 (finite, countable and uncountable sets)",
  25: "Rudin §2.15–2.24 (metric spaces, open and closed sets, limit points)",
  26: "Rudin §2.25–2.30 (closure, interior, relative topology)",
  27: "Rudin §2.31–2.36 (compactness, open covers)",
  28: "Rudin §2.37–2.42 (Heine–Borel, Bolzano–Weierstrass)",
  29: "Rudin §2.43–2.47 (perfect sets, the Cantor set, connectedness) — ch.2 read through",
};
export const rudinPrime = (wk) => RUDIN_PRIME[wk] || null;

/* MULTIVARIABLE PRIMING — wk 38–43, riding in slot C underneath Axler, Tue/Thu only.
   Same mechanism as the Rudin thread: slow exposure now so the intensive week in 49 is spent
   on problems instead of first contact. Lighter than the Rudin thread (2 days, not 3) because
   the Axler weeks already carry a real load. */
export const MV_PRIME = {
  38: "Rudin §9.1–9.9 (linear transformations, the derivative in several variables)",
  39: "Rudin §9.10–9.16 (partial derivatives, the chain rule, C¹ maps)",
  40: "Rudin §9.17–9.23 (the inverse function theorem)",
  41: "Rudin §9.24–9.29 (the implicit function theorem, rank theorem)",
  42: "Lagrange multipliers + constrained optimisation — any calculus text, then past Putnam problems using them",
  43: "Multiple integrals, change of variables, Jacobians + Green's theorem — the vector calculus that actually appears",
};
export const mvPrime = (wk) => MV_PRIME[wk] || null;

/* Zeitz problem diet for slot C — keyed to the phase whose topic it reinforces */
export const ZC = {
  8:  "Zeitz ch.9 (Calculus) problems — 3/wk, alongside Spivak",
  20: "Zeitz ch.7 (Number Theory) problems — 3/wk, alongside Niven",
  24: "Zeitz ch.6 (Combinatorics) problems — 3/wk, alongside Bóna",
  30: "Zeitz ch.9 §9.2–9.3 + hard analysis problems — 3/wk, alongside Rudin",
  38: "Zeitz ch.5 (Algebra) problems — 3/wk, alongside Axler",
  44: "Zeitz §5.5 + ch.3 inequality problems — 3/wk",
  47: "Zeitz §4.2 (Complex Numbers) problems — 3/wk",
  50: "Zeitz ch.8 (Geometry for Americans) — 3/wk",
  52: "Zeitz §4.1 (Graph Theory) — 3/wk",
  55: "Zeitz §4.3 (Generating Functions) review — 3/wk",
  57: "Journal review + 2 spaced-retrieval problems from last week's chapter.",
};
export const zeitzC = (wk) => { let out = "Journal review + 2 spaced-retrieval problems from last week's chapter."; for (const k of Object.keys(ZC).map(Number).sort((a, b) => a - b)) if (wk >= k) out = ZC[k]; return out; };

export const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export const dayType = (d) => { const w = d.getDay(); return w === 6 ? "SIM" : w === 0 ? "SUN" : w === 4 ? "THU" : "TRAIN"; };
export const TYPE_LABEL = { TRAIN: "Training day · gym + 5.25h study", SIM: "Simulation day · the sacred Saturday", THU: "Strict rest · morning study only", SUN: "Strict rest · review + recovery" };

/* There are only ~43 Putnam papers with solid solutions (1985 onward), and this campaign
   sits ~47 full both-session simulations. The fix is not to sit fewer exams; it is to stop
   burning a whole paper when a timed category set would do, and to allocate the pool
   deliberately so no phase eats another phase's supply. */
export const PAPER_BUDGET = [
  ["wk 16", "Putnam 2005", "Home dress rehearsal — one paper."],
  ["wk 57–65", "1985–1993 (9 papers)", "P7 peak before the first real sitting. Nine full both-session sims."],
  ["wk 70–82", "1994–1997 (4 papers)", "P8 now sits ONE full paper every third week. The other nine Saturdays are timed category sets that pull single problems from many papers — which is the right tool for a weakness rebuild anyway, and burns nothing."],
  ["wk 83–107", "1998–2018 (20 papers) + 5 re-sits", "P9. Sims 1–20 are fresh papers; sims 21–25 re-sit your P7 papers from 14+ months earlier."],
  ["wk 108–116", "2019–2027 (9 papers)", "P10. Held in reserve the whole campaign so the run-in is entirely unseen, recent material."],
  ["2029 (P13–P14)", "re-sits + 2028", "By the final campaign every 1985–2018 paper is 12+ months stale and safely reusable, plus Putnam 2028 is new."],
];

/* Fixed calendar events — drive the milestone calendar export and the Plan tab */
export const KEY_DATES = [
  ["2026-08-19", "Day 1 — campaign starts", "Wed. Stub week (Wed–Sun). Both logs open, 21:30 bedtime locked tonight."],
  ["2026-09-18", "SAT registration deadline", "Register for the 3 Oct sitting or it is gone."],
  ["2026-10-03", "SAT", "The last non-Putnam obligation. After today the whole day is Putnam."],
  ["2026-12-05", "Home dress rehearsal — Putnam 2005", "A-session 09:00–12:00, real break, B-session 13:00–16:00. Grade Sunday, not today."],
  ["2027-06-13", "High-school coursework closes", "Full-time training from here to UMN."],
  ["2027-06-14", "Coach onboards", "3 graded write-ups/wk. Hire by now: UMN dept grad student / AoPS / Wyzant, $80–200/hr."],
  ["2027-09-07", "UMN — first day of classes", "Join the Putnam training group. Confirm the Putnam registration path with the department this week."],
  ["2027-10-01", "Putnam registration (approx.)", "Your school's supervisor registers the team. Confirm the exact date with the department in week 1."],
  ["2027-12-04", "PUTNAM sit #1", "The score that goes on fall-2028 internship applications."],
  ["2028-12-02", "PUTNAM — THE TARGET", "Top 100. Both sessions. Trust the 120 weeks."],
  ["2028-12-18", "Confirm year 3 with your advisor", "The decision was made in Aug 2026: 3 years, graduating spring 2030. This week is paperwork — degree audit, credit load, funding, housing."],
  ["2029-05-14", "End of year 2 — year 3 begins", "Not graduating. This is what buys the summer-2029 internship and the final Putnam."],
  ["2029-09-03", "Register for the final Putnam", "Confirm with the department in week 1. This is the last sitting you are eligible for."],
  ["2029-12-01", "PUTNAM — final sitting", "The last one you are eligible for. Everything since August 2026 points here."],
  ["2030-05-13", "Graduation — spring 2030", "Three Putnam scores, a research note, a C++ order book, an internship that converted, and professors who know your name."],
];

/* DECIDED — Aug 2026. Kept here in full so it never gets re-litigated at 2am in a bad week.
   Three years at UMN, graduating spring 2030. */
/* How to spend the credits, given the load is deliberately light. */
export const ENROLMENT = {
  headline: "Full-time student, light classroom load. Settled with the UMN advisor, Aug 2026.",
  body: "One or two lecture classes a semester is what makes 32 h/week of Putnam survivable once UMN starts — that was the single biggest unrealism in this plan and it is now handled. Full-time status is confirmed, which keeps internship eligibility, financial aid, insurance and housing all intact.",
  fix: "Spend the non-lecture credits on work you are doing anyway: research credits, independent study, a seminar. They cost almost no extra hours because the flagship IS the research — and they are where professor relationships actually come from. Two lecture classes a semester gets you fewer professors, not more; small rooms are what produce letters. Grading for a course is the other cheap one.",
  classes: "When you only take two, take the two that pay three ways at once — real analysis, measure theory, probability theory, stochastic processes, numerical analysis. Each feeds the Putnam, feeds the MFM application, and puts you in a small room with a professor who could write your letter. Do not burn the slots on requirements you could test out of.",
  optics: "A three-year BS at a light load, when you could have finished in one, WILL get asked about in an interview. The honest answer is a good one for a quant firm — you were training for the Putnam and building a research project — but rehearse it in week 57, do not improvise it in October 2028.",
};

export const DECISION = {
  question: "Graduate spring 2029, or extend to spring 2030?",
  chosen: "THREE YEARS. Graduating spring 2030. Decided August 2026, confirmed with the advisor in week 123.",
  short: "Putnam eligibility ends the day you graduate, and quant full-time hiring runs almost entirely through returning interns. Two years gave one internship window — autumn 2027, before any Putnam score existed — and no return offer.",
  twoYear: [
    "2 Dec 2028 is your LAST Putnam. Two sittings total — and scores climb with sittings.",
    "Your only internship window is summer 2028, recruited in autumn 2027: your first term on campus, before any Putnam score exists.",
    "No junior-summer internship means no return offer, so full-time becomes a cold application. That is the hardest door in the industry.",
    "You reach the MFM a year earlier and a year cheaper. That is a real gain, not a consolation.",
  ],
  threeYear: [
    "Buys a third sitting, 1 Dec 2029 — the one with the best odds, roughly double the top-100 chance of the 2028 sitting.",
    "Buys a summer-2029 internship recruited in autumn 2028, when you finally have a score, a research note, an order book and warm referrals.",
    "An internship that converts is worth more than everything else on this list combined.",
    "Buys two more semesters of professor relationships — where the research and the letters come from.",
    "Costs a year of tuition and a year of salary. That is the honest price.",
  ],
};
