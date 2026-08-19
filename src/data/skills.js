/* Career-skill tracks — the things that actually clear a quant screen and then convert it.
   Layered onto the Putnam campaign WITHOUT touching the deep block, Block B, slot C, or the
   protected weekday free block. The weekday quant dose is re-specified (same minutes, real
   content instead of a vague label); everything project-shaped goes in the builder block,
   which lives on Saturday evening and Sunday afternoon and is switched off during peaks. */

/* ------------------------------------------------------------------ targets */
/* Zetamac: correct answers in 8 minutes. 80 is the working bar for trading OAs. */
export const ZETAMAC = { 1: 30, 8: 40, 20: 55, 32: 65, 44: 75, 56: 80, 84: 85 };
export const zetamacTarget = (wk) => { let t = 30; for (const k of Object.keys(ZETAMAC).map(Number).sort((a, b) => a - b)) if (wk >= k) t = ZETAMAC[k]; return t; };

/* Codeforces — DELIBERATELY DEMOTED (see CREDENTIALS below).
   The tier list is blunt about this: Codeforces under 1900 is a C-tier credential and even
   2200+ is only a B, explicitly discounted for QT versus QR. Expert (1600) is therefore a
   C-tier badge that the old plan was buying with ~4 h/week for two years — the worst
   hours-per-tier trade anywhere in this campaign.
   What survives: C++ itself (the order book is the project, and the industry runs on it) and
   CSES as the cheapest way to acquire C++. What goes: the rating chase past Specialist.
   The freed hours go to Prosperity and the spring trading comps, which are A/A+/S. */
export const CF = {
  19: "account made · C++ ramp via CSES (the language is the point, not the rating)",
  22: "first Div3 contest, finish A+B",
  32: 1200,
  52: 1400,
  57: "STOP CHASING RATING HERE. Specialist is banked; every further point is C-tier. Contests become upsolving practice for the trading comps, nothing more",
  106: "maintenance only — a byproduct of staying sharp in C++, never a target",
};
export const cfTarget = (wk) => { let t = null; for (const k of Object.keys(CF).map(Number).sort((a, b) => a - b)) if (wk >= k) t = CF[k]; return t; };

/* -------------------------------------------------------------- the tracks */
export const TRACKS = [
  { key: "T1", name: "Mental math & OA speed", live: "wk 1 → end", dose: "in the daily dose",
    why: "The online assessment, not the resume, is where most candidates actually die. Zetamac speed is a motor pattern — it needs 500 short sessions, not 50 long ones, which is exactly why it starts in week 1 at 15 min and never stops.",
    target: "80 correct in 8 minutes by week 56, 85+ by week 84." },
  { key: "T2", name: "Probability & brainteasers", live: "wk 1 → end", dose: "in the daily dose",
    why: "Green book pass 1 untimed, pass 2 timed in phase B, Joshi alternating from wk 55. Blitzstein & Hwang from week 24 for the applied-probability fluency Putnam training does NOT give you — Putnam probability is combinatorial, interview probability is conditional and Bayesian.",
    target: "Green book twice through, second pass timed. Heard on the Street for breadth." },
  { key: "T3", name: "Market-making & calibration", live: "wk 26 paper → wk 55 live", dose: "Wed in the dose",
    why: "The skill firms actually test in the final rounds, the skill Prosperity's algorithmic rounds are built on, and the one no amount of solo drilling fully produces. Live play needs a partner and a whiteboard — find one in the UMN quant club in your first fortnight. But the PAPER version starts at wk 26, because the first Prosperity is wk 34 and the original plan had this arriving 21 weeks too late to matter.",
    target: "Paper quoting from wk 26, weekly live game from wk 55. Calibration: your 80% intervals should contain the truth 80% of the time — the same delta discipline as the Putnam gap log." },
  { key: "T4", name: "C++ & competitive programming", live: "wk 19 →", dose: "builder block",
    why: "Re-scoped by the credential tiers. CP is how you acquire C++ cheaply — CSES in C++ buys the language the order book needs — but the RATING is a C-tier credential under 1900 and only a B at 2200+, discounted for QT. It was never worth the two years the old plan gave it. C++ fluency and a working order book are worth every hour; a Codeforces badge is worth almost none.",
    target: "Specialist (1400) by wk 52, then STOP. C++ good enough that the order book compiles clean and you can write a matching engine under discussion. Rating after wk 57 is a byproduct you do not track." },
  { key: "T7", name: "Trading competitions", live: "wk 34 →", dose: "builder block, spring only",
    why: "The single biggest gap in the old plan, and the highest-tier thing actually reachable from here. Prosperity alone spans A (top 100 — documented unprompted recruiter contact at exactly that rank) to S (global win). MIT/Berkeley/UChicago trading comps are A+ to win, A− to place, and the sponsor list in the room IS your target list: Citadel, Jane Street, Optiver, Jump, DRW, SIG, HRT, Five Rings. Three Prosperity attempts and three comp seasons beat any amount of solo drilling.",
    target: "Prosperity: top 500 (2027 practice) → top 100 (2028) → top 10 (2029). One university trading comp every spring from 2028, placing by 2029." },
  { key: "T5", name: "Network & referrals", live: "wk 44 →", dose: "Sunday reset, minutes",
    why: "THE fix for a non-target school, and the cheapest thing on this list per hour. One alum who forwards your resume is worth more than fifteen Putnam points. UMN's disadvantage is not prestige, it is that fewer recruiters walk into the building — which is a networking problem with a networking solution.",
    target: "10 warm contacts across 8 target firms before applications open. Two professors who know your name and your work." },
  { key: "T6", name: "Interview mechanics", live: "wk 55 →", dose: "Fri in the dose",
    why: "Being right silently scores zero, in the interview exactly as on the Putnam. The 90-second project pitch, thinking out loud under a clock, and a written post-mortem after every real interview.",
    target: "The flagship explained in 90 seconds, cold, to someone hostile. One mock per week during any live cycle." },
];

/* ------------------------------------------------- the weekday quant dose */
/* dow: 0=Sun … 6=Sat. Returns null on days with no dose. */
export function quantDay(wk, dow) {
  const z = zetamacTarget(wk);
  if (wk >= 107) {
    if (dow === 0 || dow === 6) return null;
    return { dose: "20 min", name: "Phase C · throttled", detail: `Zetamac 10 min (hold ${z}-in-8) + ONE brainteaser. Then stop. The Putnam peak owns this window and the recruiting work was finished in week 106 on purpose.` };
  }
  if (wk >= 55) {
    const B = {
      1: `Zetamac 10 min (target ${z}-in-8) + green book PASS 2, timed: 3 problems in 25 min + 10 min on Brainstellar / the brainteaser bank.`,
      2: `Heard on the Street / Joshi Quant Job Interview Questions — 4 problems in 30 min, written, alternating books week to week. Then Zetamac 10 min (${z}-in-8).`,
      3: `MARKET-MAKING GAME with your partner, 30 min — quote two-sided, get run over, work out why. Then Zetamac 10 min.`,
      4: `Zetamac 15 min only (${z}-in-8). Rest day: arithmetic is motor pattern, not cognition.`,
      5: `Mock block: 20 min of probability OUT LOUD to a person or a recorder, 15 min rehearsing the 90-second flagship pitch, one estimation question cold.`,
    };
    return B[dow] ? { dose: dow === 4 ? "15 min" : "45 min", name: "Phase B · breadth + live reps", detail: B[dow] } : null;
  }
  const A = {
    1: `Zetamac × 3 runs, log the best (target ${z}-in-8).`,
    2: `Green book — 2 problems, untimed, solutions written out properly. Pass 1 is for understanding, not speed.`,
    3: `Zetamac × ${wk >= 26 ? 2 : 3} runs + 5 min market reading — Money Stuff, and one headline number you cannot explain gets looked up.${wk >= 19 ? " Then Harris, Trading and Exchanges: 10 pages, alongside the order book." : ""}${wk >= 26 ? " PAPER MARKET MAKING (the third Zetamac run pays for this): quote a two-sided market on something with a knowable answer — a statistic you look up afterwards — then work out which side would have picked you off and why. Prosperity's algorithmic rounds are this skill and nothing else; it must be live before wk 34." : ""}`,
    4: `Zetamac only, 15 min (${z}-in-8). This sits inside the rest block on purpose — motor pattern, not cognitive load.`,
    5: `Green book — 2 problems, written out.${wk >= 24 ? " Blitzstein & Hwang exercises alternate in from week 24." : ""}${wk >= 32 && wk <= 34 ? " CROWD/EV DRILL instead of one green-book problem: Keynesian beauty contests, 'guess 2/3 of the average', and any question where the answer depends on what everyone else answers. This is what Prosperity's MANUAL rounds test, and no other part of this plan trains it." : ""}`,
  };
  return A[dow] ? { dose: "15 min", name: "Phase A · foundations", detail: A[dow] } : null;
}

/* ------------------------------------------------------- the builder block */
/* Saturday 17:30–19:00 and Sunday 15:30–17:30. Everything project-shaped lives here:
   the C++ order book (Stroustrup + Harris), the flagship (López de Prado + ISL), Codeforces (CSES + the CP Handbook), and the recruiting admin. It is OFF
   before week 19, during every exam-deload week, through the Putnam peak, and in the
   final taper — the point is that it never competes with a peak. */
const BUILDER_OFF = (wk) => wk < 19 || wk === 7 || wk === 16 || (wk >= 61 && wk <= 68) || (wk >= 117 && wk <= 120) || (wk >= 167 && wk <= 172);
/* Saturday every active week (1.5 h, 17:00-18:30 — the cheapest hours in the week).
   Sunday only in the stretches with genuine slack: the two summers and the career phases,
   where the Putnam deep-block load has dropped. Sunday rest is load-bearing the rest of
   the time and is NOT available for this. */
const SUNDAY_ON = (wk) => (wk >= 44 && wk <= 56) || (wk >= 107 && wk <= 116) || (wk >= 121 && wk <= 159);

export function builderFor(wk, dow) {
  if (BUILDER_OFF(wk)) return null;
  if (dow === 0 && !SUNDAY_ON(wk)) return null;
  if (dow !== 6 && dow !== 0) return null;
  const cf = cfTarget(wk);
  const cfLine = typeof cf === "number" ? `Codeforces: rating target ${cf}. ` : `Codeforces: ${cf}. `;
  let label = "BUILDER · project + Codeforces";
  let detail = "";

  if (wk <= 24) detail = `C++ RAMP — you already write Java, Python and Julia, so this is a translation not a new language: references vs pointers, RAII and destructors, the STL, templates, const-correctness. learncpp.com plus Stroustrup's Tour. Do NOT start the order book yet. ${cfLine}Solve CSES in C++ from day one — competitive programming is the cheapest C++ practice that exists, so the language work and the rating compound instead of competing.`;
  else if (wk <= 29) detail = `C++ consolidation via CSES — sorting, searching, the STL containers the order book will need. ${cfLine}ORDER-BOOK DESIGN this month, on paper: matching rules, data structures, the API. Build starts wk 30.`;
  else if (wk <= 43) detail = `C++ ORDER BOOK + matching engine — build it slowly and correctly. Working core by wk 43; latency work and polish happen in the summer. ${cfLine}${wk === 32 || wk === 33 ? "PROSPERITY PREP — the block is this and nothing else for a fortnight, and it is three specific things, not 'revision': (1) work last year's published rounds end to end, scoring yourself; (2) get the submission tooling and a local backtest harness running so day 1 is not spent on plumbing; (3) drill the manual rounds — crowd/EV questions, which is what the Friday dose is doing this fortnight too. You have been paper-quoting since wk 26; this is where it gets pointed at the actual format. " : ""}${wk === 34 ? "*** IMC PROSPERITY 2027 RUNS THIS WEEK — solo practice run. The block is entirely Prosperity. Order book resumes wk 36. *** " : ""}${wk === 37 ? "FLAGSHIP THIS WEEK (Python or Julia — no reason to fight C++ for research code): ablations — momentum-only baseline, no-vol-target, smoothing sensitivity, shuffled-regime null." : ""}`;
  else if (wk <= 56) { label = "BUILDER · flagship + competition skills"; detail = `Summer — the only stretch with real slack, and the Codeforces rating chase that used to eat it is gone. ${wk >= 44 && wk <= 47 ? "OPTIONS MECHANICS (4 weeks, in the old Codeforces slot): calls and puts, put-call parity, delta and why vega exists. Deliberately shallow — Natenberg stays in the 2029 sprint — but Prosperity 2028 has an options-shaped round in wk 86 and arriving without this is how you donate a round. " : ""}${wk >= 48 && wk <= 50 ? "BACKTEST DISCIPLINE, pointed at competition data: the lookahead audits and deflated-Sharpe habits the flagship already taught you, applied to a trading bot. A bot that backtests beautifully and dies live is the most common way to lose Prosperity. " : ""}Flagship research note. ${wk === 46 ? "FLAGSHIP THIS WEEK: research note v1, 6–10pp, deflated Sharpe, limitations written BEFORE an interviewer finds them." : ""}`; }
  else if (wk <= 60) { label = "BUILDER · pipeline applications"; detail = `${wk === 58 ? "*** FILE EVERY PIPELINE APPLICATION THIS WEEK — JS FTTP & INSIGHT, Discover Citadel, Discover DRW, SIG freshman, IMC Launchpad, Optiver, Five Rings. A-tier and the highest conversion rate on the credential list. Low acceptance means you apply to ALL of them, not the two you like. *** " : ""}Applications, mocks and referral follow-ups own this block until the peak starts. The apps are the deliverable — a perfect research note nobody reads scores zero.`; }
  else if (wk <= 82) detail = `Post-mortem season. ${wk === 70 ? "FLAGSHIP THIS WEEK: HMM regime detector replaces the z-score heuristic → note v2. " : ""}${wk >= 76 && wk <= 78 ? "TRADING-COMP PREP — the new skill here is TEAM, not quoting: you have been market-making since wk 26 on paper and wk 55 live, but these are team events. Rehearse the handoffs cold — who codes, who watches risk, who reads the round brief — plus the exact platform the comp runs on. Losing to coordination when you had the better traders is the standard failure. " : ""}${wk === 79 ? "*** SPRING TRADING COMP THIS WEEKEND — A+ to win, A− to place, and the sponsor list in the room is your target list. The block is the comp. *** " : ""}Codeforces is upsolving only now — the rating chase ended at wk 57 and those hours belong to the comps.`;
  else if (wk <= 106) detail = `${wk >= 84 && wk <= 85 ? "PROSPERITY PREP — you arrive with everything the 2027 run lacked: paper quoting since wk 26, options mechanics from summer 2027, a backtest harness that does not lie, and a team that has played a trading comp together in wk 79. Re-work 2027's rounds, fix what actually broke, and pre-build the bot skeleton so day 1 is strategy and not plumbing. " : ""}${wk === 86 ? "*** IMC PROSPERITY 2028 RUNS THIS WEEK AND NEXT — floor is top 100 (A-tier, documented recruiter contact at that rank). Rounds are 72h and asynchronous: it comes out of THIS block, the free block and Sunday. It does NOT touch the deep block or the Saturday sim. *** " : ""}${wk === 94 ? "FLAGSHIP THIS WEEK: v3 — another year of live data, cost-aware execution, capacity analysis. " : ""}Maintenance: upsolve in C++ to keep the language sharp, nothing rating-driven.`;
  else if (wk <= 120) { label = "BUILDER · applications"; detail = "Fall-2028 cycle. Applications out with referrals attached, one mock interview a week, post-mortem written the same day. This block ends at week 116 — nothing career-shaped touches the last four weeks."; }
  else if (wk <= 132) { label = "BUILDER · full-time cycle"; detail = `${wk >= 128 && wk <= 130 ? "TRADING-COMP PREP — second season, and this time you know the format. Drill the platform with your team. " : ""}${wk === 131 ? "*** SPRING TRADING COMP 2029 THIS WEEKEND — you are not learning the format any more. Target a placing (A−) and the sponsor conversations that come with it. *** " : ""}The Putnam is behind you and this block is now the main event, not the side one. Interview conversion, MFM IDP application, flagship defended to hostile readers.`; }
  else if (wk <= 145) { label = "BUILDER · the sprint"; detail = `${wk >= 136 && wk <= 137 ? "PROSPERITY PREP — final run, best team you have had, two campaigns of experience. Rework 2028's rounds and fix what broke. " : ""}${wk === 138 ? "*** IMC PROSPERITY 2029 RUNS THIS WEEK AND NEXT — the best shot you will ever have at this. Eleven months from the final Putnam, quant prep already at the cap: this is the one competition in 178 weeks that costs you nothing you need. Top 10 is A+, top 3 is S−. *** " : ""}Quant prep at the 2-3 h/day cap — and the cap is real. Past ~500 lifetime focused hours marginal drilling buys nothing, because firms write novel questions specifically to defeat grinders. Extra hours go to the flagship and the research, not to more problems.`; }
  else if (wk <= 159) { label = "BUILDER · internship / research"; detail = "If the internship landed, this block is the internship post-mortem and the professor relationship. If it did not, it is research and flagship v4 — and that is a genuinely good year, not a failure state."; }
  else { label = "BUILDER · maintenance"; detail = "Final Putnam campaign owns the week. Keep the flagship warm and answer recruiters; build nothing new."; }

  return { label, detail };
}

/* ------------------------------------------------------- weekday code dose */
/* 30 min/day, Mon/Tue/Wed/Fri, taken off the FRONT of the protected free block (16:50-17:20,
   leaving ~1h10 of it intact). This is the only place in the plan that touches that block, and
   it is here because the builder alone (1.5 h/wk) could not carry C++, the order book and
   Codeforces at once. Off during every peak and taper, same as the builder. */
export function codeDose(wk, dow) {
  if (wk < 19 || (dow !== 1 && dow !== 2 && dow !== 3 && dow !== 5)) return null;
  if ((wk >= 61 && wk <= 68) || (wk >= 117 && wk <= 120) || (wk >= 167 && wk <= 172)) return null;
  if (wk <= 24) return { label: "CODE \u00b7 30 min \u00b7 C++ ramp", detail: "learncpp.com or Stroustrup's Tour, 20 min, then one CSES problem in C++. Coming from Java the syntax is free \u2014 spend the time on pointers/references, RAII, and the STL." };
  if (wk <= 29) return { label: "CODE \u00b7 30 min \u00b7 CSES in C++", detail: "One or two CSES problems a session. Sorting, searching, data structures \u2014 the containers the order book needs anyway." };
  if (wk <= 43) return { label: "CODE \u00b7 30 min \u00b7 order book + CSES", detail: "Alternate: order-book code Mon/Wed, CSES Tue/Fri. Small commits, every session, even when it is 15 usable minutes." };
  if (wk <= 56) return { label: "CODE \u00b7 30 min \u00b7 Codeforces", detail: "Upsolve the last contest, then ladder problems at your rating +200. The summer builder block owns the order book; this slot is contest reps." };
  if (wk <= 116) return { label: "CODE \u00b7 30 min \u00b7 Codeforces maintenance", detail: "Ladder problems and upsolving. Rating is maintained by frequency, not by long sessions." };
  return { label: "CODE \u00b7 30 min \u00b7 maintenance", detail: "Light. Keep the habit, chase nothing." };
}

/* --------------------------------------------------------------- outreach */
/* Shown in the Sunday weekly-reset block. Minutes of work, enormous leverage. */
export const OUTREACH = {
  44: "Build the LinkedIn properly. Write résumé v1 and hand it to someone who will be rude about it.",
  46: "Research note v1 → send to two people who will attack it. Being wrong in June 2027 is free; being wrong in an interview is not.",
  50: "List your 8 target firms. For each: what they actually trade, and one question you would ask someone who works there.",
  56: "UMN WEEK 1 — join the Putnam training group AND the quant/finance club. Email 3 professors (probability, statistics, optimisation): four sentences, one specific question about their work, no ask.",
  57: "Career fair. Then find every UMN alum at your 8 target firms on LinkedIn and build the list. Do not message anyone yet.",
  58: "Send 5 coffee-chat requests. Fifteen minutes, one specific question, NO referral ask. Target: 2 real conversations.",
  59: "Recruit your IMC Prosperity team from the quant club — 3 people, now, for the spring. Prosperity is a TEAM competition and teams that form in March lose to teams that formed in October. Pick for complementary skills: one who codes faster than you, one who thinks about game theory, one who does not panic.",
  60: "Follow up with everyone who replied, each with one useful thing you have done since you spoke. This is the whole trick.",
  70: "Post-Putnam: message the professors again with how it went, and ask who runs research an undergraduate could help with.",
  80: "Prosperity team locked and practising: run the previous year's problem set together as a dry run before the real thing in wk 86.",
  84: "Research note → 2 practitioners for critique. A referral vector disguised as a request for feedback, and it works because it is sincere.",
  100: "Résumé v2 with both Putnam scores. Refresh all 10 alumni contacts before applications open — a cold contact is a wasted one.",
  106: "Fall-2028 applications go out. Every one with a referral attached if you can manage it. Recruiting work stops here so the peak is clean.",
};
export const outreachFor = (wk) => OUTREACH[wk] || null;

/* ---------------------------------------------------------- credentials */
/* The tier list this whole career layer is scheduled against. Ranked by what a QT desk
   actually pays for; supply is holders per year, because scarcity is most of the value.
   QT = quant trading (your target). QR = quant research. Anything flagged "discounts for
   QT" is worth less to you than the raw tier suggests.

   THE STRUCTURAL FACT that reorganised the calendar: every credential above B tier that is
   still reachable from here is either a SPRING event (Prosperity in April, university
   trading comps Feb–April) or an APPLICATION (firm pipeline programmes, filed in autumn).
   The one competition that would collide head-on with a November–December Putnam peak —
   ICPC regionals — is only a B and discounts for QT. So the collision resolves itself
   permanently: autumn belongs to the Putnam, spring carries the résumé, and nothing has
   to be re-argued in a bad week.

   [tier, credential, supply/yr, grounding, status in THIS plan] */
export const CREDENTIALS = [
  ["S+", "— nothing —", "—", "Nothing is auto-hire. Even Putnam Fellows interview.", ""],
  ["S", "Putnam Fellow (top 5)", "5", "Citadel's 2022 intern class publicly listed two Putnam Fellows — firms advertise these hires.", "stretch"],
  ["S", "IMO gold", "~50", "That same Citadel class held nine IMO/IPhO/IOI gold medallists.", "closed to you"],
  ["S", "Prosperity global win", "1 team", "Documented path: win → interview → offer.", "chasing"],
  ["S−", "Putnam top 25 (named)", "25", "Named in the official published results.", "stretch"],
  ["S−", "Prosperity top 3", "3 teams", "", "chasing"],
  ["S−", "ICPC World Finals medal", "~12", "QR-shaped; discounted for QT.", "not pursued"],
  ["A+", "Putnam top 100 / Honourable Mention", "100", "One HM in an entire Citadel intern class. Practitioners say it catches the eye on a résumé and specifically helps offset a non-target school.", "THE TARGET"],
  ["A+", "Prosperity top 10", "10 teams", "", "wk 138 goal"],
  ["A+", "MIT / Berkeley trading comp win", "~2", "Sponsors in the room: Citadel, Jane Street, Optiver, Jump, DRW, SIG, HRT, Five Rings.", "chasing"],
  ["A", "Prosperity top 100", "100 teams", "Documented unprompted recruiter contact at this exact rank.", "wk 86 floor"],
  ["A", "Firm pipeline programmes", "—", "JS FTTP & INSIGHT, Discover Citadel, Discover DRW, SIG freshman, IMC Launchpad. Not competitions — and the highest conversion rate on this entire list.", "MUST APPLY"],
  ["A", "ICPC World Finals qualification", "~500 global", "", "not pursued"],
  ["A−", "Putnam top 200", "200", "", "realistic floor"],
  ["A−", "Trading comp placing (not winning)", "—", "", "wk 131 goal"],
  ["B+", "Putnam top 500 (~20–30 pts)", "500", "Top 500 names are mailed to every participating institution — a real, checkable credential.", "sit-1 floor"],
  ["B+", "Prosperity top ~500", "—", "", "wk 34 goal"],
  ["B", "ICPC regionals · Codeforces 2200+", "—", "Both discount for QT vs QR. ICPC also collides with Putnam peak every autumn — that is why it is not on the calendar.", "declined"],
  ["B", "Smaller university trading comps", "—", "", "chasing"],
  ["B−", "USACO Platinum", "~1k", "Nine USACO Platinum medallists in one Citadel class — it demonstrably survives onto quant résumés.", "window closing"],
  ["C", "Low nonzero Putnam · Codeforces <1900 · MCM/ICM · Kaggle", "—", "Kaggle is a QR credential; QT discounts it. Note that Codeforces Expert (1600) lives HERE — which is why the rating chase was cut.", "byproduct"],
  ["D", "AMC/AIME · HS hackathons · science olympiad", "—", "", "cut from plan"],
];

/* ------------------------------------------- competition capability ladder */
/* Scheduling a competition does not make you good at it. This is the ladder that has to be
   climbed BEFORE each date on the calendar below, and it is the half the first pass of this
   plan got wrong: the old ordering started market making in wk 55 (21 weeks AFTER the first
   Prosperity) and options in wk 133 (47 weeks after the Prosperity round that needs them).
   Both are pulled forward here. Every item lives in the daily dose or the builder block —
   nothing below touches the deep block, Block B, slot C, or the protected free block.
   [by week, capability, how it is built, what it is for] */
export const COMP_SKILLS = [
  [26, "Two-sided quoting, on paper", "Wednesday dose, costs one Zetamac run. Quote a market on something with a knowable answer, then work out which side got picked off and why. Prosperity's algorithmic rounds ARE this skill, so it has to exist before wk 34 — the old plan did not start it until wk 55.", "Prosperity 2027"],
  [30, "Order-book mechanics from the inside", "The C++ order book you are already building, plus Harris in the Wednesday dose. You cannot write a market-making bot for an exchange whose matching rules you have never implemented. This one the plan already had right.", "every competition"],
  [32, "Crowd / EV reasoning", "Prosperity's manual rounds are Keynesian beauty contests — the right answer depends on what everyone else answers. This is neither Putnam probability (combinatorial) nor interview probability (Bayesian), and nothing else in the plan teaches it.", "Prosperity manual rounds"],
  [44, "Options mechanics + delta intuition", "Summer 2027 builder, in the slot the Codeforces rating chase used to occupy. Calls, puts, put-call parity, delta, and why vega exists. Deliberately NOT Natenberg depth — that stays in the 2029 sprint — but enough to price and hedge an options round in April 2028.", "Prosperity 2028"],
  [48, "A backtest that does not lie to you", "The flagship already teaches exactly this — lookahead audits, deflated Sharpe, shuffled-regime nulls. Point the same discipline at competition data. A bot that backtests beautifully and dies live is the most common way to lose Prosperity.", "Prosperity 2028 + 2029"],
  [55, "Live market making against a human", "Phase B Wednesday dose, with a partner from the UMN quant club. Quoting under real time pressure, managing inventory, and noticing in the moment that you are being adversely selected.", "trading comps"],
  [76, "Team coordination under a clock", "Trading comps are team events and Prosperity is a three-person team. Rehearse the handoffs — who codes, who watches risk, who reads the round brief — before a round starts, not during one.", "every competition"],
];
export const compSkillsBy = (wk) => COMP_SKILLS.filter(([w]) => w <= wk);

/* ---------------------------------------------------------- competitions */
/* Rebuilt from the tier list. Prosperity gets three attempts instead of two, the spring
   trading-comp circuit is added outright, and the pipeline programmes are promoted from a
   one-line footnote to the highest-conversion item on the page. */
export const COMPETITIONS = [
  [32, "Jane Street puzzles — monthly from here", "C-tier on its own and that is fine: one evening a month, and it is a legitimate thing to have in common with an interviewer. Never let it grow past one evening."],
  [34, "IMC PROSPERITY 2027 — solo practice run  ◆ rehearsing an S-tier", "You are not at UMN yet so there is no team to build. Enter solo and treat it as a dress rehearsal: learn the five-round format, the tooling, and exactly where you are slow. Target is top ~500 (B+) and the result genuinely does not matter — wk 86 and wk 138 are the real attempts, and going in cold there would waste them."],
  [58, "FIRM PIPELINE PROGRAMMES — apply to every one  ◆ A-tier, highest conversion on the list", "JS FTTP & INSIGHT, Discover Citadel, Discover DRW, SIG freshman programme, IMC Launchpad, Optiver and Five Rings equivalents. These are NOT competitions — they are first-year funnels with near-zero cost to apply and the best conversion rate of anything you can do. Low acceptance means apply to all of them, not the two you like. This is the single highest-expected-value week in the career layer."],
  [78, "Citadel Datathon / Terminal", "Watch for dates from here. Pandas, feature engineering, presenting a result under a clock — another direct funnel."],
  [79, "SPRING TRADING-COMP CIRCUIT — first real entry  ◆ A+ win · A− place", "MIT, UChicago Midwest and Berkeley run team trading competitions in the Feb–April window; UChicago Midwest is the most accessible from UMN. The sponsor list in the room is your target list — Citadel, Jane Street, Optiver, Jump, DRW, SIG, HRT, Five Rings — which means placing is a credential AND a room full of recruiters. Enter with the same team you built for Prosperity."],
  [86, "IMC PROSPERITY 2028 — REAL ATTEMPT #1  ◆ S win · A+ top 10 · A top 100", "Team locked since wk 80, a year of order-book work behind you, Harris read. Floor is top 100, which is the rank with documented unprompted recruiter contact. Cost control: rounds are 72h and asynchronous, so this comes out of the builder block, the protected free block and Sunday — NEVER out of the deep block or the Saturday sim. Two weeks, ~10–15 h/wk."],
  [106, "Fall-2028 recruiting cycle opens", "First fully armed cycle: Putnam 2027 score, flagship note v3, C++ order book, Prosperity + trading-comp placements, warm referrals. Sophomore-tier pipeline programmes reopen here too — apply again."],
  [131, "SPRING TRADING-COMP CIRCUIT 2029 — place this time  ◆ A+ win · A− place", "Second season, same circuit, a year of Prosperity experience behind you. You are no longer learning the format — the goal is a placing, which is A−, and the sponsor conversations that come with it."],
  [138, "IMC PROSPERITY 2029 — REAL ATTEMPT #2  ◆ the best shot you will ever have", "Inside the Sprint, when quant prep is already at the cap and the Putnam is eleven months away — the only time in 178 weeks a competition costs you nothing you need. Two Prosperity runs of experience, a working order book, a team that has played together twice. Top 10 is A+ and genuinely reachable from here; top 3 is S−."],
];
export const competitionsFor = (wk) => COMPETITIONS.filter(([w]) => w === wk);
export const COMPETITIONS_SORTED = [...COMPETITIONS].sort((a, b) => a[0] - b[0]);
