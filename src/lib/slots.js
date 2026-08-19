/* Day-schedule builders: slotsFor() (curriculum content per week) and
   buildDay() (the hour-by-hour rows for a given day type). */
import { P1MAP, SPV, zeitzC, rudinPrime, mvPrime, zeitzDay, PROOF_WEEK } from "../data/schedule.js";
import { M1, M2, M3, SNACK, SKIN_AM, SKIN_PM } from "../data/lifestyle.js";
import { quantDay, builderFor, outreachFor, competitionsFor, codeDose } from "../data/skills.js";

/* ---- Putnam and Beyond, mapped section-by-section onto the week that studies the theory ---- */
export const PB = {
  /* P1 · ch.1 Methods of Proof — the chapter the whole campaign is built on */
  1: "P&B §1.1 (Argument by Contradiction)", 2: "P&B §1.2 (Mathematical Induction)",
  3: "P&B §1.2 (strong induction, well-ordering) — harder half", 4: "P&B §1.4 (Ordered Sets and Extremal Elements)",
  5: "P&B §1.3 (Pigeonhole) + §1.5 (Invariants and Semi-invariants)", 6: "P&B §6.1.4 (Euler's Formula for Planar Graphs) + §4.2.2 (Euler's Formula)",
  7: "P&B ch.1 mixed review — light, the SAT is Saturday",
  /* P2 · Spivak */
  8: "P&B §1.2 + §2.1.1 (Algebraic Identities)", 9: "P&B §2.2.1–2.2.2 (Polynomials: warm-up, Viète's relations)",
  10: "P&B §3.2.1–3.2.2 (Limits of Functions, Continuous Functions)", 11: "P&B §3.2.3 (Intermediate Value Property) + §3.1.3 (Limits of Sequences)",
  12: "P&B §3.2.4 (Derivatives and Their Applications)", 13: "P&B §3.2.5–3.2.6 (Mean Value Theorem, Convex Functions)",
  14: "P&B §3.2.7–3.2.9 (Indefinite & Definite Integrals, Riemann Sums)", 15: "P&B §3.2.10 (Inequalities for Integrals) + §4.2.1 (Trigonometric Identities)",
  16: "P&B — favourites only, 3 problems. The rehearsal is the week.", 17: "P&B §3.2.11 (Taylor and Fourier Series)",
  18: "P&B §3.1.1–3.1.2 (Search for a Pattern, Linear Recurrences) + §3.1.5 (Series)", 19: "P&B §3.1.6 (Telescoping Series and Products)",
  /* P3 · Niven + Bóna */
  20: "P&B §5.2.1–5.2.2 (Factorization and Divisibility, Prime Numbers)", 21: "P&B §5.2.3–5.2.5 (Modular Arithmetic, Fermat's Little Theorem, Wilson) — swap up to half for PFTB ch.3 (Look at the Exponent)",
  22: "P&B §5.2.6–5.2.7 (Euler's Totient Function, Chinese Remainder Theorem)", 23: "P&B §5.1.2–5.1.3 + §5.3 (Infinite Descent, Greatest Integer, Diophantine incl. Pell) — swap up to half for PFTB ch.4 (Primes and Squares)",
  24: "P&B §6.1.1–6.1.2 (Combinatorics of Sets, Permutations)", 25: "P&B §6.2.1 (Combinatorial Identities)",
  26: "P&B §6.2.3–6.2.4 (Counting Strategies, Inclusion–Exclusion)", 27: "P&B §6.2.2 (Generating Functions)",
  28: "P&B §6.2.2 (harder) — swap up to half for PFTB ch.8 (Formal Series Revisited)", 29: "P&B mixed §5 + §6 — cross-topic, no section labels shown before you start",
  /* P4 · Rudin */
  30: "P&B §3.1.3 (Limits of Sequences) — swap up to half for Kaczor–Nowak I ch.1–2 (full solutions)", 31: "P&B §3.1.4 (More About Limits of Sequences) + K–N I §2.4 (lim sup / lim inf)",
  32: "P&B §3.1.5 (Series) — swap up to half for Kaczor–Nowak I ch.3", 33: "P&B §3.1.6 (Telescoping) + K–N I ch.3, the convergence-test problems",
  34: "P&B §3.2.1–3.2.3 (Limits, Continuity, IVP) — swap up to half for K–N II ch.1 (§1.2, §1.3, §1.5 uniform continuity)", 35: "P&B §3.2.4–3.2.6 (Derivatives, MVT, Convexity) — swap up to half for K–N II ch.2 (esp. §2.5)",
  36: "P&B §3.2.7–3.2.10 (Integrals, Riemann sums, integral inequalities) — swap up to half for K–N III (Integration)", 37: "P&B §3.2.11 + §3.3 (Multivariable Differential Calculus) — the section most Putnam candidates skip and then meet in B5",
  /* P5 · Axler */
  38: "P&B §2.3.1–2.3.2 (Operations with Matrices, Determinants)", 39: "P&B §2.3.3–2.3.4 (Inverse of a Matrix, Systems of Linear Equations)",
  40: "P&B §2.3.5 (Vector Spaces, Linear Combinations, Bases)", 41: "P&B §2.3.6 (Linear Transformations, Eigenvalues, Eigenvectors)",
  42: "P&B §2.3.6 (harder) + §2.1.3 (Cauchy–Schwarz) as a linear-algebra tool", 43: "P&B §2.3.7 (Cayley–Hamilton and Perron–Frobenius)",
  /* P6 · toolkit sweep */
  44: "P&B §2.1.3–2.1.5 (Cauchy–Schwarz, Triangle Inequality, AM-GM)", 45: "P&B §2.1.6–2.1.7 (Sturm's Principle, Other Inequalities)",
  46: "P&B §2.1 complete — swap up to half for PFTB ch.5 (T2's Lemma)", 47: "P&B §4.2.1–4.2.2 (Trigonometric Identities, Euler's Formula)",
  48: "P&B §4.2.3–4.2.4 (Trigonometric Substitutions, Telescoping in Trigonometry) — swap up to half for PFTB ch.7 (Complex Combinatorics)", 49: "P&B §4.1.1–4.1.2 (Vectors, Coordinate Geometry of Lines and Circles)",
  50: "P&B §4.1.3, §4.1.5–4.1.6 (Conics, Integrals in Geometry, Other Geometry Problems)", 51: "P&B §6.3 (Probability: equally likely cases, relations among probabilities, geometric probability)",
  52: "P&B §6.1.4 (Euler's Formula for Planar Graphs)", 53: "P&B §6.1.5 (Ramsey Theory) — swap up to half for PFTB ch.6 (extremal graph theory)",
  54: "P&B §2.4 (Abstract Algebra: binary operations, groups, rings)", 55: "P&B §2.2.3–2.2.6 (Derivative of a Polynomial, Location of Zeros, Irreducible Polynomials, Chebyshev) + §3.4 (Functional Equations)",
  56: "P&B mixed across all six chapters — 8 problems, no section labels",
};

/* Generic day-of-week splitter — used by every phase after P1 (which has real
   page-level detail from the actual PDFs). Most week descriptions already look like
   "Spivak ch.7–8 (Three Hard Theorems · Least Upper Bounds)" — one topic phrase per
   chapter, separated by "·" or ",". This pulls that list apart and gives each content
   day (0=Mon..4=Fri) ONE topic instead of showing the whole week's text every day.
   If a week has nothing to split (single topic, no parenthetical), it degrades
   gracefully to the full text — that is a genuinely single-topic week, not a bug. */
/* A candidate list is only treated as chapter topics (not prose) if every item is
   short and has no sentence-like words — otherwise a parenthetical aside such as
   "(primed since wk 20, so this week is problems, not first contact)" would get
   sliced into meaningless fragments. When nothing safe is found, return the
   original text unchanged — a single-topic week showing the same line all week
   is correct, not a bug. */
const PROSE_WORD = /(is|was|are|so|this|since|not|you|your|it|the|week|weeks|then|from|for|with|has|have|been|will|that|and|or)/i;
function splitTopics(str) {
  const items = str.split(/\s*[·,]\s*/).map((x) => x.trim()).filter(Boolean);
  if (items.length <= 1) return null;
  if (items.some((it) => it.split(/\s+/).length > 6 || PROSE_WORD.test(it))) return null;
  return items;
}
function daySlice(mainText, dayIdx) {
  if (dayIdx == null) return mainText;
  // only a parenthetical immediately after a chapter/section marker counts —
  // this is what distinguishes "ch.1–2 (Topic A · Topic B)" from a prose aside
  const m = mainText.match(/((?:ch\.|§)[\d.–—+,\s]+)\(([^)]+)\)/);  // allow commas: "ch.6, 8, 13 (...)"
  let items = null, head = "", tail = "", full = "";
  if (m) {
    items = splitTopics(m[2]);
    if (items) {
      head = mainText.slice(0, m.index + m[1].length).trim();
      tail = mainText.slice(m.index + m[0].length).trim();
      full = m[2];
    }
  }
  if (!items) {
    // fallback: "... — Topic A, Topic B, Topic C" with nothing after the list
    const dash = mainText.match(/\s—\s([^—]+)$/);  // em-dash only: en-dash appears inside compound terms like "Cauchy–Schwarz"
    if (dash) {
      const cand = splitTopics(dash[1]);
      if (cand) { items = cand; head = mainText.slice(0, dash.index).trim(); tail = ""; full = dash[1]; }
    }
  }
  if (!items) return mainText;
  const n = items.length;
  if (dayIdx < n) {
    return `${head} — TODAY (day ${dayIdx + 1}/5): ${items[dayIdx]}.${tail ? " " + tail : ""} This week overall: ${full}.`;
  }
  return `${head} — TODAY (day ${dayIdx + 1}/5): consolidate. Re-derive ${items[n - 1]} cold from memory, then problems.${tail ? " " + tail : ""} This week overall: ${full}.`;
}

/* The Saturday simulation scales with the campaign: pair → half-session → full session → both sessions. */
export function simFor(wk) {
  if (wk === 1) return "BASELINE DIAGNOSTIC — Putnam 2001 A1 + B1, untimed, take as long as you need. Write real proofs, not sketches. Then grade against the official solution with the hostile rubric. Whatever number comes out is the honest floor you are building from — record it.";
  if (wk === 5) return "NO Putnam sim — Saturday is the full-length SAT checkpoint (~3h with breaks). Score it, review the tags, stop. One easy warm-up problem in the morning beforehand and nothing else.";
  if (wk === 7) return "*** SAT TEST DAY — Sat 3 Oct 2026. *** No Putnam sim, no warm-up problem, no grading. Sleep, eat, sit the test, then take the rest of the day completely off. This is the only Saturday in 178 weeks with no mathematics in it.";
  if (wk <= 7) return "Timed Putnam pair (A1 + B1, 90:00) from a 1990s paper, then the FULL grading protocol: predict → official solution → rubric → gap log → calibration delta.";
  if (wk <= 11) return "Timed Putnam pair (A1 + B1, 90:00), Kedlaya archive. The 90 minutes of writing matter less than the 30 minutes of honest grading.";
  if (wk === 16) return "HOME DRESS REHEARSAL — Putnam 2005 complete: A-session 09:00–12:00, a real break, B-session 13:00–16:00. Exam conditions, no lookups. Grade SUNDAY, not today.";
  if (wk <= 19) return "Timed half-session: A1–A3 in 90:00 (Kedlaya archive), then full adversarial grade.";
  if (wk <= 37) return "Timed half-session: A1–A3 in 90:00 (Kedlaya archive). TRIAGE DRILL FIRST — 5 minutes reading all three before you write a single line, then commit in writing to attack / park / skip on each. Afterwards check the call against what you should have picked; a wrong triage call is its own error-log entry. Then the full adversarial grade, prediction before solutions.";
  if (wk <= 43) return "FULL single session — A1–A6 in 3:00:00, real exam conditions, then full adversarial grade. Triage practice: 5 min per problem to decide attack / park / skip.";
  if (wk <= 56) return "FULL single session (3:00:00), alternating A and B papers, then the complete grading protocol. Coach verifies the grade from week 44.";
  /* P8 is a weakness REBUILD, not a simulation phase. One full paper every third week keeps
     exam rhythm; the other Saturdays run timed category sets, which are the better tool for
     patching a named weakness and which cost no whole papers. */
  if (wk >= 70 && wk <= 82) {
    if ((wk - 70) % 3 === 2) return "FULL past Putnam, BOTH sessions (1994–1997 paper) — 09:00–12:00, exam-identical break, 13:00–16:00. Strict self-grade, then coach verification. One of only four this phase, so treat it as a real test of whether the patch held.";
    return "TIMED CATEGORY SET — 3 problems in 90:00, ALL from your current gap-map weakness, pulled from different years. Full adversarial grade afterwards. This is the right tool for a rebuild: a full paper tests everything at once and tells you little about the one thing you are fixing — and it burns a whole paper you will want later.";
  }
  if (wk <= 120) return "FULL past Putnam, BOTH sessions — 09:00–12:00, exam-identical break, 13:00–16:00. Strict self-grade, then coach verification.";
  if (wk === 121) return "No sim. The post-mortem IS the work.";
  if (wk <= 132) return "One timed pair (90:00) to keep the machine warm — unless an interview is scheduled, in which case the interview wins. Recruiting outranks the sim in this phase, and that is the correct ordering.";
  if (wk <= 145) return "Saturday belongs to the sprint: one timed mock interview + market-making games. Keep ONE 90:00 Putnam pair a fortnight so the skill does not quietly die while you are not looking.";
  if (wk <= 148) return "Putnam re-entry — timed pair (A1 + B1, 90:00). Expect two rusty weeks, then it comes back.";
  if (wk <= 155) return "Timed half-session: A1–A3 in 90:00, then the full adversarial grade. The protocol never changed.";
  if (wk <= 168) return "FULL past Putnam, BOTH sessions — 09:00–12:00, exam-identical break, 13:00–16:00. Coach-verified.";
  if (wk <= 171) return wk === 170 ? "One easy timed pair Saturday morning, then rest." : "Rest. No sim.";
  if (wk === 172) return "PUTNAM — Saturday 1 Dec 2029. The last one you are eligible for. Both sessions. Everything since 19 August 2026 was for this.";
  return "No sim. It is finished — and you finished it.";
}

/* dayIdx: 0=Mon 1=Tue 2=Wed 3=Thu 4=Fri, or null when called with no day context
   (e.g. the .ics export, which shows the whole week at once). */
export function slotsFor(w, dayIdx = null) {
  const wk = w.wk, main = w.t.split("|")[0];
  const S = (a, b, c, sim) => ({ a, b, c, sim });
  const pb = PB[wk] ? PB[wk] + " — 5–6 problems matched to this week's theory, full write-ups." : "P&B cross-subject mixed sets — 6+ write-ups, sections chosen by the coach or by your lowest-scoring category.";
  const sim = simFor(wk);

  /* ---------- P1 · Proof & Strategy Base ---------- */
  if (w.code === "P1") {
    const m = P1MAP[wk];
    const todayZeitz = dayIdx != null ? zeitzDay(wk, dayIdx) : null;
    const zeitzLine = todayZeitz || m.zeitz;
    const proofWeek = PROOF_WEEK[wk] || m.proof;
    return S(
      `${zeitzLine} CONCEPT FIRST: read with pen in hand, work every example BEFORE its solution, 20-minute struggle rule. Zeitz is not a book you read; it is a book you argue with.`,
      `${pb} PLUS the proof on-ramp this week: ${proofWeek} Pace it across the week's content days; do not try to do it all in one sitting.`,
      `${m.sat} — the SAT is a distributed thread in slot C only; keep it to the dose and it never touches the deep block. Then the journal: key idea / where stuck / technique tag for every problem attempted today.`,
      sim
    );
  }

  /* ---------- P2 · Spivak ---------- */
  if (w.code === "P2") {
    if (wk === 16) return S(
      "Spivak ch.19 (Integration in Elementary Terms) — light pass, this week belongs to the rehearsal.",
      "Rehearsal prep: print Putnam 2005 complete, clear Saturday end-to-end, brief your family that 09:00–16:00 is untouchable.",
      "Logistics: pens, paper, timer, water, a cleared desk. Sleep locked Thu/Fri. " + zeitzC(wk),
      simFor(16)
    );
    if (wk === 17) return S(
      "REHEARSAL POST-MORTEM — re-solve every attempt untimed to an airtight write-up. Official solutions only after your SECOND attempt.",
      "Then Spivak ch.20 (Taylor). " + pb,
      "Journal: one entry per rehearsal problem — where exactly did it break, and was it knowledge, technique, or nerve? " + zeitzC(wk),
      sim
    );
    return S(
      `${daySlice(SPV[wk], dayIdx)} — every proof by hand. If you cannot reproduce it cold the next morning, you have not done it.`,
      pb,
      zeitzC(wk) + " Then the journal, and 10 minutes of Anki: today's theorem statements go in as cards you must reproduce, not recognise.",
      sim
    );
  }

  /* ---------- P3 · Number Theory + Combinatorics ---------- */
  if (w.code === "P3") {
    const prime = rudinPrime(wk);
    return S(
      `${daySlice(main, dayIdx)} — pen in hand; every theorem re-proved FROM MEMORY before you advance. Not cold-reproducible = not done.`,
      pb,
      `RUDIN PRIMING (Mon/Wed/Fri, ~20 min): ${prime}. Two pages a session, and re-prove every theorem on those pages on blank paper — reading Rudin passively is worthless. You are not trying to master it yet; you are making sure ch.1–2 are OLD news when the real block opens in week 30. Then: ${zeitzC(wk)} Anki: every NT/counting theorem you meet becomes a card the same day.`,
      sim
    );
  }

  /* ---------- P4 · Rudin ---------- */
  if (w.code === "P4") return S(
    wk <= 31
      ? `${daySlice(main, dayIdx)} — you have been reading this chapter since week ${wk === 30 ? 20 : 24}. So do NOT re-read it: close the book, rebuild every theorem cold, then spend the week on exercises. That is what the priming bought.`
      : `${daySlice(main, dayIdx)} — Rudin is proved, not read. Close the book and rebuild each theorem on blank paper before moving on.`,
    pb,
    zeitzC(wk) + " Journal + Anki. Rudin's exercises are the real course: at least 6/week, chosen for range not comfort.",
    sim
  );

  /* ---------- P5 · Axler ---------- */
  if (w.code === "P5") return S(
    `${daySlice(main, dayIdx)} — determinant-free by design; that is exactly the viewpoint Putnam linear algebra rewards.`,
    pb,
    `MULTIVARIABLE PRIMING (Tue/Thu, ~20 min): ${mvPrime(wk)}. Two pages a session, theorems re-proved on paper. Spivak was single-variable and Putnam is not — this thread is why week 49 can be spent on problems. Then: ${zeitzC(wk)} Journal + Anki. Free official PDF at linear.axler.net.`,
    sim
  );

  /* ---------- P6 · Toolkit sweep ---------- */
  if (w.code === "P6") {
    if (wk === 49) return S(
      "MULTIVARIABLE — you have been reading Rudin ch.9 since week 38, so do not re-read it. Rebuild the inverse and implicit function theorems cold, then work: Lagrange multipliers, Jacobians and change of variables, multiple integrals, Green's theorem.",
      "P&B §3.3 (Multivariable Differential Calculus) complete + every multivariable problem you can find in the Kedlaya archive. This is a genuine gap in most Putnam preparation and it shows up almost every year as a B-problem.",
      "COACH: 3 full write-ups. Plus P&B §3.4.2–3.4.3 (ordinary differential equations) — rare on the exam, cheap to cover, and you will not meet them anywhere else in this plan.",
      sim
    );
    if (wk === 56) return S(
      "TOOLKIT AUDIT — for each of the eight topics, write the 5 theorems you would not want to face the exam without, then prove all 40 cold. Anything you cannot rebuild goes on next week's patch list.",
      pb,
      "Coach: 3 write-ups. Also this week — UMN starts. Find the Putnam training group and the professor who runs it in your first 5 days on campus.",
      sim
    );
    return S(
      `${daySlice(main, dayIdx)} — reproduce every key result cold or repeat the section.`,
      pb,
      `COACH: 3 full write-ups submitted this week; rework returns within 48h.${wk === 44 ? " (Finalise the hire NOW — UMN dept grad student, AoPS, or Wyzant. This is the highest-ROI money in the whole campaign.)" : ""} Plus: ${zeitzC(wk)}`,
      sim
    );
  }

  /* ---------- P7 · Synthesis + Peak I ---------- */
  if (w.code === "P7") {
    if (wk === 68) return S(
      "Exam-morning routine every day this week: wake 07:00, walk, breakfast, ONE warm-up problem, stop.",
      "Thu–Fri: tricks sheet and sleep. Nothing else. No new problems.",
      "Logistics checked twice by Thursday: room, ID, pens, watch, snack.",
      "THE FIRST REAL ATTEMPT — Sat 4 Dec 2027, both sessions. No self-grading afterwards: write your recollections the same evening and hand everything to the coach."
    );
    if (wk >= 66) return S(
      "Light favourites only — 3–4 problems/day, all of them ones you can finish.",
      "Tricks sheet daily. One easy 60:00 pair on Wednesday.",
      "Sleep locked 21:30 / 06:00 — the body clock IS the exam clock.",
      wk === 67 ? "One easy timed pair Saturday morning, then rest. Nothing hard this close." : "One easy timed pair Saturday AM, then rest."
    );
    if (wk >= 61) return S(
      "Patch cycle: every Saturday miss → day-1 theory refresh, days 2–3 matched drills, re-test with 2 fresh timed problems before you close it.",
      "Targeted re-drill of patched topics + " + pb,
      "Coach: 3 write-ups/wk, rework returns within 48h. Write-up speed: a full solution page in under 20 min.",
      sim
    );
    return S(
      `${daySlice(main, dayIdx)}`,
      pb,
      `COACH: 3 full write-ups/wk.${wk === 57 ? " UMN WEEK 1 — join the Putnam training group and ask the department who supervises registration." : ""}${wk === 58 ? " REGISTER THIS WEEK — the supervisor's deadline is early October and missing it costs you the whole year." : ""} Plus: ${zeitzC(wk)}`,
      sim
    );
  }

  /* ---------- P8 · Post-mortem + rebuild ---------- */
  if (w.code === "P8") {
    if (wk === 69) return S(
      "Re-solve every A1–A6 attempt from Dec 4 untimed, to airtight write-ups. Finals week — 2–3 problems a day is enough.",
      "B1–B6 the same, as the week allows.",
      "Your own post-mortem notes per problem BEFORE the coach sees anything: what did you know, what did you try, what stopped you.",
      "No sim. The post-mortem IS the work."
    );
    return S(
      `${daySlice(main, dayIdx)}. Coach-assigned only — no self-selected comfort problems.`,
      wk >= 78 ? "P&B completion: every remaining unsolved problem in the current chapter, 12–15 write-ups/wk." : "P&B sections matched to the weakness + Larson technique drills (ch.1 Heuristics, ch.2 Induction & Pigeonhole, then the chapter matching the weak area). If the gap map names a technique PFTB covers, swap Larson for that PFTB chapter. The Weakness Arsenal in the Library supplies the timed category sets.",
      "Write-up speed: rewrite 2 old solutions cleaner and faster. Anki review stays daily — this is the phase where old theory quietly rots.",
      sim
    );
  }

  /* ---------- P9 · Total simulation ---------- */
  if (w.code === "P9") return S(
    "Patch cycle on Saturday's misses: day-1 theory refresh, days 2–3 matched drills, re-test with 2 fresh timed problems. NO new theory — that door closed in week 82.",
    "Targeted re-drill of patched topics until each re-tests clean.",
    "Write-up speed: a full solution page in under 20 min. Anki daily.",
    `SIM #${w.n} — complete Putnam from ${w.era}: A-session 09:00–12:00, exam-identical break, B-session 13:00–16:00. Strict self-grade + coach verification.`
  );

  /* ---------- P11–P15 · after the target: cycle, sprint, re-entry, final campaign ---------- */
  if (w.code === "P11" || w.code === "P12") {
    if (wk === 123) return S(
      "CONFIRM YEAR 3. The decision was made in August 2026 and the reasoning is in the Plan tab — this week is only paperwork: degree audit with your advisor, credit load for year 3, funding, housing.",
      "Two checks, in writing: (1) a third year stays inside the Putnam's four-sitting limit — ask the MAA or your department supervisor, not your advisor, this is a different body; (2) map the exact remaining course sequence to spring 2030 with your advisor, so you find out now rather than in autumn 2029 if a semester is short.",
      "Then re-read why you chose this. In a bad February you will want the argument already made and already won.",
      sim
    );
    return S(
      `${daySlice(main, dayIdx)}`,
      w.code === "P12" ? "Quant prep at the cap — and the cap is the point. It saturates around 400–500 lifetime focused hours; past that, hours go to the flagship and the research." : "Interview work is the deep block now. Treat a first round the way you treated a Saturday sim: predict, perform, post-mortem in writing the same day.",
      `${outreachFor(wk) || "Keep the contact list warm — one message a week to someone who helped you."}`,
      sim
    );
  }
  if (w.code === "P13") return S(
    `${daySlice(main, dayIdx)}`,
    wk >= 147 ? "Putnam re-entry: the theory is still in there, the speed is not. Rebuild speed first, then range." : "Internship or research — whichever you are in, the deliverable is a written artefact at the end of it.",
    outreachFor(wk) || "Journal + Anki. The cards you built in 2026 are why this re-entry takes two weeks instead of two months.",
    sim
  );
  if (w.code === "P14") return S(
    `${daySlice(main, dayIdx)} — everything you know, one last time, under a clock.`,
    "Patch cycle on every Saturday miss: day-1 theory refresh, days 2–3 matched drills, re-test with 2 fresh problems. No new theory — there is none left that would land in time.",
    "Coach: 3 write-ups a week. Tricks sheet daily from week 167. Sleep locked from week 169.",
    sim
  );
  if (w.code === "P15") return S(
    `${daySlice(main, dayIdx)}`,
    "Full-time applications, letters, and the handover document. You are no longer training; you are converting.",
    outreachFor(wk) || "Thank everyone by name. The people who helped you should hear how it ended.",
    sim
  );

  /* ---------- P10 · Recent papers + taper ---------- */
  if (wk === 120) return S(
    "Exam morning: wake 07:00, walk, breakfast, ONE warm-up problem. Then go.",
    "Nothing. It is in your hands now.",
    "Logistics checked twice by Thursday.",
    "PUTNAM — Saturday 2 Dec 2028. Both sessions. Trust the 120 weeks."
  );
  if (wk >= 117) return S(
    wk === 119 ? "One short warm-up pair on Wednesday. Nothing after it." : "Light favourites, 3–4/day maximum.",
    "Tricks sheet daily. No new problems.",
    "Sleep locked 21:30 / 06:00 — body clock = exam clock.",
    wk === 118 ? "One easy timed pair Saturday morning, then rest." : "Rest. No sim."
  );
  return S(
    `${daySlice(main, dayIdx)} — weekday patch cycle on every Saturday miss.`,
    wk >= 114 ? "One-page tricks sheet: refine it and rehearse triage — 5 minutes per problem to decide attack / park / skip." : "Re-drill patched topics; write-up speed maintenance.",
    "Logistics + sleep lock (21:30/06:00) + warm-up routine rehearsal.",
    "Full timed recent-year Putnam, both sessions" + (wk <= 112 ? ", coach-verified." : ".")
  );
}

/* Label for a block header: keep "Zeitz ch.1", drop the explanation after it.
   Splits on an em/en-dash, a colon, an opening bracket, or a sentence-ending period —
   but NOT on the period inside a chapter number. */
export const shortTitle = (s) => { const cut = s.split(/\s+[—–]\s+|:\s|\s\(|\.\s/)[0].trim(); return cut.length > 44 ? cut.slice(0, 42) + "…" : cut; };

export function buildDay(type, sl, gym, wk = 1, dow = 1) {
  const q = quantDay(wk, dow);
  const builder = builderFor(wk, dow);
  const code = codeDose(wk, dow);
  const outreach = outreachFor(wk);
  const comps = competitionsFor(wk);
  const compLine = comps.length ? " \u25c6 THIS WEEK: " + comps.map(([, n, why]) => `${n} — ${why}`).join(" ") : "";
  /* insert a row immediately before the 18:30 dinner row, keeping the day in time order */
  const beforeDinner = (rows, row) => { const i = rows.findIndex((r) => r[0] === "18:30"); rows.splice(i < 0 ? rows.length : i, 0, row); return rows; };
  if (type === "TRAIN") return [
    ["06:00", "Wake + hydrate", "Water immediately. No phone in bed. (Sleep 21:30–06:00 = 8.5h + midday nap.)", 0],
    ["06:15", "Pre-gym fuel + skincare", "Small fast fuel: banana + a few dates or toast w/ honey; coffee if wanted. Quick AM skincare: " + SKIN_AM, 0],
    ["06:40", "Walk to gym", "Doubles as the morning sunlight walk — circadian anchor + warm body temp for the empty 7:00 gym.", 0],
    ["07:00", gym.label, gym.detail, 2],
    ["08:30", "Breakfast (post-workout)", M1 + " Protein within the post-gym window.", 0],
    ["09:00", "Setup", "Phone in another room. Deep-block materials out. Best cognition of the day starts now.", 0],
    ["09:15", "DEEP BLOCK · " + shortTitle(sl.a), sl.a + " ≥20 min struggle before any hint.", 1],
    ["11:45", "Lunch", M2, 0],
    ["12:30", "NAP · 20–25 min", "Set an alarm for 25 max — longer risks sleep inertia and hurts the 21:30 bedtime. Dark room, no phone. This is the segmented-sleep bonus, not a substitute for the night.", 0],
    ["13:00", "BLOCK B · " + shortTitle(sl.b), sl.b, 1],
    ["15:00", "Snack + walk", SNACK + " 10–15 min easy walk.", 0],
    ["15:30", "Slot C + journal · " + shortTitle(sl.c), sl.c + " Then log every attempt: key idea, where stuck, technique tag.", 1],
    ["16:30", "QUANT · " + (q ? q.dose + " · " + q.name : (gym.quantDose || "15 min") + " · " + gym.quantName), (q ? q.detail + " " : "") + (gym.quantDetail || "") + compLine, 1],
    ...(code ? [["16:50", code.label, code.detail + " This 30 min is taken off the FRONT of the free block by choice \u2014 it is the only thing in 178 weeks allowed to touch it, and it is why C++ and Codeforces are affordable at all.", 1]] : []),
    [code ? "17:20" : "16:50", "FREE (protected) · " + (code ? "~1h10" : "~1h40"), "Gaming, 1v1s, music, nothing. Never study into this — it's load-bearing. The quant dose and the code dose both end before this block; nothing else may enter it.", 0],
    ["18:30", "Dinner", M3, 0],
    ["19:00", "Post-dinner walk", "10 min easy.", 0],
    ["20:00", "Wind-down", "Magnesium glycinate 200–300mg. Dim lights. No screens after 21:00.", 0],
    ["20:30", "PM skincare", SKIN_PM, 0],
    ["21:30", "SLEEP", "8.5h to 06:00. Recomp, skin repair, memory consolidation — this IS training.", 2],
  ];

  if (type === "THU") return [
    ["06:00", "Wake + hydrate", "Same wake time as every day — the rhythm is the point.", 0],
    ["06:30", "Easy stroll (optional) + skincare", "Strict rest = zero training load; light exposure only. " + SKIN_AM, 0],
    ["07:00", "Breakfast", M1, 0],
    ["07:30", "DEEP BLOCK · " + shortTitle(sl.a), sl.a + " Freshest cognition of the week — spend it on the hardest material.", 1],
    ["10:00", "Light block · " + shortTitle(sl.c), sl.c, 1],
    ["11:45", "Lunch", M2 + " Creatine on rest days too.", 0],
    ["12:30", "NAP · 20–25 min", "Alarm at 25. Then the afternoon is genuinely yours.", 0],
    ["13:00", "STRICT REST · until dinner", "No gym, no drills, no guilt. Recovery converts load into ability.", 2],
    ["15:00", "Snack (optional)", SNACK, 0],
    ["15:30", "QUANT · 15 min drill", (q ? q.detail + " " : "Mental math ONLY — 15 min, Zetamac/tradermath, then stop. ") + "This sits inside the rest block on purpose: arithmetic speed is motor-pattern, not cognitive load, so it survives a rest day. The remaining ~3h of this window is REST BY DESIGN — it is not unallocated time to fill.", 1],
    ["18:30", "Dinner", M3, 0],
    ["20:00", "Wind-down", "Magnesium. No screens after 21:00.", 0],
    ["20:30", "PM skincare", SKIN_PM, 0],
    ["21:30", "SLEEP", "8.5h.", 2],
  ];

  const SIM_ROWS = type !== "SIM" ? null : [
    ["06:00", "Wake + hydrate", "Exam-day rhythm is trained, not improvised. (The real Putnam A-session starts mid-morning — this wake time has you fully online by then.)", 0],
    ["06:30", "Sunlight walk", "30 min. Saturday is active: walks, no lifting.", 0],
    ["07:15", "AM skincare + breakfast", SKIN_AM + " Then " + M1, 0],
    ["08:15", "Warm-up problem", "ONE easy familiar problem. Never skip it; never do more than one.", 1],
    ["08:45", "Exam setup", "Clear desk, printed paper, timer, water. No phone, no lookups.", 0],
    ["09:00", "SIMULATION · " + shortTitle(sl.sim), sl.sim, 1],
    ["12:00", "Lunch + real break", M2 + " Outside if possible — on both-session sims this IS the exam break. (No nap on sim days: match exam conditions.)", 0],
    ["13:00", "Part 2 / grading", "Both-session sims: B-session 13:00–16:00. Shorter sims: deep grading against the hostile rubric, then error-log and gap-log every miss.", 1],
    ["15:00", "Snack", SNACK, 0],
    ["16:00", "Close + grade (PROTOCOL)", "PREDICT your score first (calibration). Then grade every problem against the hostile rubric — hunt your own gaps line-by-line. Log scores + delta + gap-log entries. Re-solving is Sunday's job.", 1],
    ["16:30", "FREE · rest of day", "Done. The rest of Saturday is yours.", 0],
    ["18:30", "Dinner", M3, 0],
    ["20:00", "Wind-down", "Magnesium. No screens after 21:00.", 0],
    ["20:30", "PM skincare", SKIN_PM, 0],
    ["21:30", "SLEEP", "", 2],
  ];

  if (type === "SIM") {
    if (builder) beforeDinner(SIM_ROWS, ["17:00", builder.label, builder.detail + " (1h30. Saturday evening is the cheapest study time in the week — no gym, no morning block tomorrow.)", 1]);
    return SIM_ROWS;
  }

  const SUN_ROWS = [
    ["06:00", "Wake + hydrate", "Consistency protects Monday.", 0],
    ["06:30", "Sunlight walk + skincare", SKIN_AM, 0],
    ["07:15", "Breakfast", M1, 0],
    ["08:00", "REVIEW · re-solve + gap-grade", "Yesterday's misses from scratch, no notes. Stuck again? read the official solution, close it, re-derive unaided. Then GAP-GRADE every solved problem against the rubric: a right answer with an under-justified step is a gap-log entry, not a win.", 1],
    ["10:00", "Gap log + patch plan + Anki build", "Update the GAP LOG (under-justified steps) AND the error log (wrong answers) separately. Note this week's calibration delta. Patch plan: the 1–2 gaps Block B drills next week. Then turn this week's theorems into Anki cards — statement on the front, proof sketch you must reproduce on the back.", 1],
    ["11:45", "Lunch", M2, 0],
    ["12:30", "NAP · 20–25 min (optional)", "Alarm at 25.", 0],
    ["13:00", "STRICT REST · until dinner", "Genuinely off. The recovery that makes 28 months survivable.", 2],
    ["15:00", "Snack + easy walk", SNACK, 0],
    ["18:30", "Dinner", M3, 0],
    ["19:30", "Weekly reset · 15 min", "Read next week's Plan row. Lay out Monday's deep-block chapter + check which gym phase the week is in." + (outreach ? " \u25c6 OUTREACH THIS WEEK: " + outreach : " Nothing more.") + compLine, 1],
    ["20:00", "Wind-down", "Magnesium. No screens after 21:00.", 0],
    ["20:30", "PM skincare", SKIN_PM, 0],
    ["21:30", "SLEEP", "", 2],
  ];
  if (builder) beforeDinner(SUN_ROWS, ["15:30", builder.label, builder.detail + " (2h. This one costs you rest, which is why it only runs in the summers and the career phases — never while the Putnam deep block is at full load.)", 1]);
  return SUN_ROWS;
}
