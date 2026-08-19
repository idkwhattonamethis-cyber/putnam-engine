/* Quant interview-prep spine — phases, flagship project channel, career gates.
   Week numbers are the 120-week Putnam calendar (week 1 = 19 Aug 2026). */

export const QUANT_PHASES = [
  { from: 1, to: 54, key: "A", name: "Foundations", dose: "15 min",
    detail: "Mental math to 80-in-8 (Zetamac/tradermath, daily 15 min). Green book pass 1, untimed, ~2 problems/day. Market-reading 10 min. Runs ALONGSIDE full Putnam density — costs no deep-block hours by design." },
  { from: 55, to: 106, key: "B", name: "Breadth + live reps", dose: "45 min",
    detail: "Green book pass 2, TIMED. Heard on the Street for breadth. Market-making games with a partner. Fall-2027 calibration interviews land here — each gets a written post-mortem: which questions, where it broke, QT-feel vs QR-feel." },
  { from: 107, to: 120, key: "C", name: "Sharpening (throttled)", dose: "20 min",
    detail: "PUTNAM PEAK OWNS THIS WINDOW — throttled by design. Natenberg/options intuition, betting-calibration games, 1 mock/month. Have someone hostile attack the research note; rehearse the defence." },
  { from: 121, to: 132, key: "D", name: "Full-time cycle", dose: "2 h",
    detail: "The Putnam is behind you and this is the main event now. Interview conversion, MFM IDP application, the flagship defended to hostile readers. Treat a first round exactly like a Saturday sim: predict, perform, post-mortem in writing the same day." },
  { from: 133, to: 145, key: "E", name: "The Sprint", dose: "2–3 h (cap)",
    detail: "Mar–May 2029, AT THE CAP. Green book pass 3 timed, Heard on the Street complete, mental math to 90-in-8, Natenberg, daily market-making games, weekly mocks. The cap is real: prep saturates near 400–500 lifetime focused hours, and past that firms write novel questions specifically to defeat grinders. Surplus hours go to the flagship and the research." },
  { from: 146, to: 178, key: "F", name: "Convert + final campaign", dose: "45 min",
    detail: "Internship (or research) through summer 2029, then the quant thread throttles again so the final Putnam campaign owns Sep–Dec 2029. After 1 Dec 2029: full-time cycle holding three Putnam scores, a research note, a C++ order book and an Expert rating." },
];
export const quantPhase = (wk) => QUANT_PHASES.find(p => wk >= p.from && wk <= p.to) || QUANT_PHASES[QUANT_PHASES.length - 1];

export const FLAGSHIP = {
  22: "FLAGSHIP: bot hardening begins — costs/slippage audit, lookahead audit on rolling z-scores & quantiles.",
  37: "FLAGSHIP: ablations — momentum-only baseline, no-vol-target, smoothing sensitivity, shuffled-regime null. (Moved off wk 34: Prosperity 2027 owns that fortnight.)",
  46: "FLAGSHIP: research note v1 (6–10pp, deflated Sharpe, limitations written BEFORE an interviewer finds them).",
  70: "FLAGSHIP: HMM regime detector replaces the z-score/quantile heuristic → note v2.",
  94: "FLAGSHIP: v3 — another year of live data, cost-aware execution, capacity analysis.",
};

export const QUANT_GATES = {
  19: "C++ order-book + matching-engine project starts (Jan 2027). Stroustrup A Tour of C++ alongside it, Harris Trading and Exchanges in the Wednesday dose — the book is what makes the project defensible rather than merely impressive.",
  24: "Blitzstein & Hwang, with exercises. Applied-probability fluency — distinct from Putnam-style problems.",
  32: "Jane Street puzzles monthly from here. Recruiting funnels, not decoration.",
  34: "IMC PROSPERITY 2027 — solo practice run. Rehearsal for the S-tier attempts in wk 86 and wk 138; target top ~500 and learn the format.",
  56: "UMN week 1 (classes start Tue 7 Sep 2027): Putnam training group. Professor outreach (prob/stats/optimisation) by October.",
  58: "FILE EVERY FIRM PIPELINE APPLICATION (JS FTTP & INSIGHT, Discover Citadel, Discover DRW, SIG freshman, IMC Launchpad, Optiver, Five Rings). A-tier and the highest conversion rate of anything in this plan — apply to all, not to your favourites.",
  79: "Spring trading-comp circuit opens (MIT / UChicago Midwest / Berkeley). A+ to win, A− to place, and the sponsors in the room are your target firms.",
  86: "IMC PROSPERITY 2028 — real attempt #1. Floor is top 100, the rank with documented unprompted recruiter contact.",
  68: "Putnam sit #1 (Sat 4 Dec 2027) — its job is the score on fall-2028 internship applications.",
  84: "Tsay ch.1–3 + GARCH → HMM upgrade (flagship week 70). If interview routing has pushed you QR by now, Wasserman All of Statistics starts here too.",
  107: "Jun–Sep 2028: summer-2029 internship apps — first FULLY ARMED cycle (Putnam + research note + C++ + competitions).",
  120: "PUTNAM 2 Dec 2028 → results Feb/Mar 2029. On the 2-year path this was your last sitting.",
  123: "Confirm year 3 with the advisor (decided Aug 2026): graduating spring 2030. This buys the summer-2029 internship AND the final Putnam sitting — the two things two years could not give you.",
  131: "Spring trading comp 2029 — second season, target a placing (A−).",
  133: "THE SPRINT (Mar–Aug 2029): quant prep at the 2–3h/day cap, flagship v4, research with a professor.",
  138: "IMC PROSPERITY 2029 — real attempt #2 and the best shot you will ever have: eleven months from the final Putnam, so it costs nothing you need. Top 10 is A+, top 3 is S−.",
  146: "Summer 2029: internship if it landed, research + flagship if not. On the extend path, Putnam re-entry starts wk 147.",
  160: "UMN year 3. REGISTER for the final Putnam — 1 Dec 2029, the last sitting you are eligible for.",
  172: "PUTNAM 1 Dec 2029 → results spring 2030 → full-time cycle with three scores, a research note, an order book and an Expert rating.",
};
