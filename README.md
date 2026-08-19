# Putnam Engine

A 178-week execution engine for one goal: **top 100 on the William Lowell Putnam
Competition.** Primary target Saturday 2 December 2028 (week 120); final sitting Saturday
1 December 2029 (week 172), which is the last one eligibility allows.

Day 1 is **Wednesday 19 August 2026**. Week 1 is a Wed–Sun stub; every week after it runs
Monday→Sunday.

**Committed decision (Aug 2026):** three years at UMN, graduating spring 2030. Putnam
eligibility ends at graduation and quant full-time hiring runs through returning interns —
two years gave one internship window (autumn 2027, before any Putnam score existed) and no
return offer. Year 3 buys the summer-2029 internship *and* the 1 Dec 2029 sitting. The full
argument, both sides, is in `DECISION` in `src/data/schedule.js` and on the Plan tab, so it
never gets re-argued in a bad week.

React + Vite PWA. State lives in `localStorage`; there is no backend and nothing leaves the
device.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production bundle in dist/
npm run calendar   # regenerate the .ics files in calendar/
npm run icons      # regenerate the PWA icon set from public/favicon.svg
npm run lint
```

## The plan

Fifteen phases, no AMC and no AIME — the campaign is Putnam-only from day one.

| Phase | Weeks | Dates | What it is |
|---|---|---|---|
| P1 · Proof & Strategy Base | 1–7 | 19 Aug – 4 Oct 2026 | Zeitz ch.1–4 + Book of Proof. SAT thread ends 3 Oct |
| P2 · Analysis I | 8–19 | 5 Oct – 27 Dec 2026 | Spivak, cover to cover. Home dress rehearsal 5 Dec |
| P3 · Number Theory + Combinatorics | 20–29 | 28 Dec 2026 – 7 Mar 2027 | Niven, Bóna ch.1–8, Wilf |
| P4 · Analysis II | 30–37 | 8 Mar – 2 May 2027 | Rudin ch.1–7. Ch.1–2 primed in slot C since wk 20, so these weeks buy exercises |
| P5 · Linear Algebra | 38–43 | 3 May – 13 Jun 2027 | Axler ch.1–7 + 8A |
| P6 · Toolkit Sweep | 44–56 | 14 Jun – 12 Sep 2027 | Inequalities, complex, **multivariable**, geometry, probability, graphs, algebra. **Coach onboards wk 44** |
| P7 · Synthesis + Peak I | 57–68 | 13 Sep – 5 Dec 2027 | UMN starts. Register. **First real Putnam, 4 Dec 2027** |
| P8 · Post-mortem + Rebuild | 69–82 | 6 Dec 2027 – 12 Mar 2028 | Gap map, weakness surgery, Larson, P&B completion. Timed category sets, one full paper every 3rd week |
| P9 · Total Simulation | 83–107 | 13 Mar – 3 Sep 2028 | 25 full both-session sims. No new theory |
| P10 · Recent + Taper | 108–120 | 4 Sep – 3 Dec 2028 | Papers 2019–2027, then taper. **Putnam 2 Dec 2028** |
| P11 · Post-mortem + Cycle | 121–132 | 4 Dec 2028 – 25 Feb 2029 | Gap map #2, full-time interviews, MFM IDP application |
| P12 · The Sprint | 133–145 | 26 Feb – 27 May 2029 | Quant prep at the 2–3 h cap, flagship v4, research |
| P13 · Summer 2029 + Re-entry | 146–159 | 28 May – 2 Sep 2029 | Internship. Putnam re-entry from wk 147 |
| P14 · Final Campaign | 160–172 | 3 Sep – 2 Dec 2029 | Weekly full sims. **Final sitting 1 Dec 2029** |
| P15 · Close-out | 173–178 | 3 Dec 2029 – 13 Jan 2030 | Letters, full-time cycle, handover |

Fixed weekly split: **Mon·Tue·Wed·Fri** train (gym 07:00 + 5.25 h study) · **Thu** strict
rest with a morning block only · **Sat** simulation · **Sun** review and recovery.
~32–34 focused hours a week, with the recovery protected so it survives 28 months.

The simulation scales: a 90-minute A1+B1 pair in P1, a three-hour single session from week
38, full both-session papers from week 57 — then timed category sets through the P8 rebuild,
because a full paper is the wrong instrument for patching one named weakness (and there are
only ~43 papers with solid solutions; see the paper budget on the Plan tab).

Two **priming threads** ride in slot C ahead of the phases that need them: Rudin ch.1–2 from
week 20, multivariable (Rudin ch.9, Lagrange, Jacobians) from week 38. Two pages a session with
every theorem re-proved — so the intensive weeks are spent on problems, not first contact.

## The career layer

Six skill tracks run underneath the maths without touching the deep block (`src/data/skills.js`):
mental math and OA speed, probability and brainteasers, market-making and calibration,
competitive programming, **network and referrals**, and interview mechanics. The weekday quant
dose keeps its 15/45/20 minutes and just gets real per-day content; everything project-shaped
(C++ order book, the flagship, Codeforces) goes to a **builder block** on Saturday evening —
and Sunday afternoon only in the two summers and the career phases, never while the Putnam
deep block is at full load. There is also a **30 min/day weekday code dose** (16:50–17:20,
Mon/Tue/Wed/Fri from week 19), taken off the front of the protected free block — the only
thing in 178 weeks allowed to touch it. Both switch off entirely through every peak and taper.

Targets: Zetamac 30-in-8 → **80-in-8 by week 56**; Codeforces **Pupil by wk 32, Specialist by
wk 52, Expert by wk 78** (rebased for learning C++ from Java inside ~4 h/week); **10 warm
contacts across 8 firms** before applications open. The outreach calendar is the non-target fix
and costs minutes, not hours. IMC Prosperity is a *team* event — teammates recruited wk 59,
team locked wk 80, real attempt wk 86.

## What is actually being trained

Not knowledge — **provability under a hostile grader**. Putnam gives a 1 for a right idea
with a gap in it. So every simulation ends with the same four-step protocol, and the
calibration delta (predicted score minus real score) is the number that matters most until
it reaches zero. See the Plan tab.

## Calendars

`npm run calendar` writes four importable files into `calendar/`:

| File | Contents |
|---|---|
| `putnam-milestones.ics` | 40 events — exams, deadlines, phase starts, gates. Week-ahead alerts |
| `putnam-weeks.ics` | 178 all-day events, one per week, each carrying that week's deep block / Block B / slot C / simulation in the description |
| `putnam-daily.ics` | 27 recurring events (RRULE) — the hour-by-hour skeleton, not 15,000 copies |
| `putnam-all.ics` | all three in one file |

The same files download from the **Plan** tab in the app.

**Google Calendar import:** create a new calendar first (Settings → Add calendar → Create
new calendar, name it "Putnam"), *then* Settings → Import & export → select the file →
choose that calendar as the destination. Importing into your personal calendar works but
cannot be undone in bulk.

The daily file uses floating local times, so it follows whatever timezone your calendar is
set to — which is what you want when you move to campus.

## Layout

```
src/
  data/schedule.js   178-week plan, phase metadata, chapter maps, key dates, the DECISION record
  data/resources.js  the curated library + the deliberate cut list
  data/quant.js      quant thread phases A–F, flagship project, career gates
  data/skills.js     the six skill tracks, daily quant dose, builder block, outreach calendar
  data/gym.js        Nippard PPL 13-week cycles, e1RM/PR math
  data/lifestyle.js  meals, supplements, skincare
  data/grading.js    the adversarial rubric, gap log, calibration protocol
  lib/slots.js       week → curriculum content, and day type → hourly rows
  lib/ics.js         calendar generation (shared by the app and the CLI script)
  lib/theme.js       light/dark palettes
  App.jsx            the whole UI
scripts/             build-ics.mjs, build-icons.mjs
calendar/            generated .ics files (committed so they can be imported directly)
BOOKS.md             audit of the PDF library — keep / cut / buy
```

Changing the plan means editing `src/data/schedule.js` and `src/lib/slots.js`. Everything
else — the app, the calendars, the phase bars, the progress maths — derives from those two
files and `TOTAL_WEEKS`.

## Deployment

Three ways, easiest first. No environment variables in any of them.

**1 · Drag and drop (fastest, no account setup beyond a Vercel login)**

Unzip `deploy/putnam-engine-DIST-dragdrop.zip`, go to [vercel.com/new](https://vercel.com/new),
and drag the unzipped folder onto the drop area. It is already built — Vercel just serves it.
`vercel.json` travels inside the folder and sets the cache headers. Redeploying means
`npm run build`, re-zip, drag again.

**2 · Git import (best if you want automatic redeploys)**

Push this folder to a GitHub repo, then Vercel → Add New → Project → import it. `vercel.json`
pins the framework to Vite, the build to `npm run build` and the output to `dist/`, so there is
nothing to configure. Every push redeploys.

**3 · CLI**

```bash
npm i -g vercel
vercel          # preview deploy
vercel --prod   # production
```

`deploy/putnam-engine-SOURCE.zip` is the full source minus `node_modules` and `dist`, for
routes 2 and 3.

**PWA note:** the service worker only registers over HTTPS or on localhost, so installing the
app to your home screen works from the deployed Vercel URL, not from a file:// open. After the
first deploy, load it on your phone and use Add to Home Screen.
