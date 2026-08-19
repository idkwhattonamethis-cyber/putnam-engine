/* iCalendar (.ics) generation — import into Google Calendar, Apple Calendar, Outlook.

   Three separate calendars so they can be toggled or deleted independently:
     weeks      — 120 all-day multi-day events, one per campaign week, full detail in the body
     milestones — the ~25 dates that are not negotiable (exams, deadlines, gates)
     daily      — the hour-by-hour skeleton as ~20 recurring events (RRULE), not 15,000 copies

   Google Calendar import: Settings → Import & export → pick the file → choose a target
   calendar. Make a NEW calendar for each file first, otherwise everything lands in your
   personal one and cannot be un-imported in bulk. */

import { WEEKS, PHASE_META, KEY_DATES, weekStart, weekEnd, TOTAL_WEEKS } from "../data/schedule.js";
import { slotsFor } from "./slots.js";

/* calendar SUMMARY: more room than a UI label, so keep the whole title up to ~58 chars */
const calTitle = (t) => (t.length <= 58 ? t : t.slice(0, 57).replace(/\s+\S*$/, "") + "…");

const pad = (n) => String(n).padStart(2, "0");
const dstamp = (d) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
const dtLocal = (d, hhmm) => `${dstamp(d)}T${hhmm.replace(":", "")}00`;
const plusDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };

/* RFC 5545 TEXT escaping */
const esc = (s) => String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");

/* RFC 5545 line folding — 75 octets, continuation lines start with a single space */
function fold(line) {
  const out = [];
  let buf = "";
  let bytes = 0;
  for (const ch of line) {
    const n = new TextEncoder().encode(ch).length;
    if (bytes + n > 73) { out.push(buf); buf = " "; bytes = 1; }
    buf += ch; bytes += n;
  }
  out.push(buf);
  return out.join("\r\n");
}

function wrap(name, events) {
  const head = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Putnam Engine//120-week campaign//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${esc(name)}`,
    "X-WR-TIMEZONE:America/Chicago",
  ];
  return [...head, ...events, "END:VCALENDAR"].map(fold).join("\r\n") + "\r\n";
}

const STAMP = "20260819T000000Z";
let seq = 0;
const uid = (tag) => `${tag}-${++seq}@putnam-engine`;

function vevent({ uidTag, summary, description, allDayStart, allDayEnd, start, end, rrule, alarmDays }) {
  const L = ["BEGIN:VEVENT", `UID:${uid(uidTag)}`, `DTSTAMP:${STAMP}`];
  if (allDayStart) {
    L.push(`DTSTART;VALUE=DATE:${dstamp(allDayStart)}`);
    L.push(`DTEND;VALUE=DATE:${dstamp(plusDays(allDayEnd || allDayStart, 1))}`);
    L.push("TRANSP:TRANSPARENT");
  } else {
    L.push(`DTSTART:${start}`);
    L.push(`DTEND:${end}`);
  }
  if (rrule) L.push(`RRULE:${rrule}`);
  L.push(`SUMMARY:${esc(summary)}`);
  if (description) L.push(`DESCRIPTION:${esc(description)}`);
  if (alarmDays != null) L.push("BEGIN:VALARM", "ACTION:DISPLAY", `DESCRIPTION:${esc(summary)}`, `TRIGGER:-P${alarmDays}D`, "END:VALARM");
  L.push("END:VEVENT");
  return L;
}

/* ---------------------------------------------------------------- weeks */
function weeksEvents() {
  const events = [];
  for (const w of WEEKS) {
    const s = slotsFor(w);
    const meta = PHASE_META[w.code];
    const a = weekStart(w.wk), b = weekEnd(w.wk);
    const milestone = w.m && w.m.startsWith("***");
    const body = [
      `${w.code} · ${meta.name} · week ${w.wk} of ${TOTAL_WEEKS}`,
      `${a.toDateString()} → ${b.toDateString()}`,
      "",
      w.t,
      w.m ? `\u25c6 ${w.m.replaceAll("*", "").trim()}` : "",
      "",
      `DEEP BLOCK (09:15, Mon/Tue/Wed/Fri · 07:30 Thu)\n${s.a}`,
      "",
      `BLOCK B (13:00)\n${s.b}`,
      "",
      `SLOT C + journal (15:30)\n${s.c}`,
      "",
      `SATURDAY SIMULATION (09:00)\n${s.sim}`,
    ].filter((x) => x !== null).join("\n");
    events.push(...vevent({
      uidTag: `wk${w.wk}`,
      summary: `${milestone ? "\u25c6 " : ""}W${w.wk} · ${w.code} · ${calTitle(w.t)}`,
      description: body,
      allDayStart: a, allDayEnd: b,
    }));
  }
  return events;
}
export const buildWeeksIcs = () => wrap("Putnam — weeks", weeksEvents());


/* ---------------------------------------------------------- milestones */
function milestonesEvents() {
  const events = [];
  for (const [d, title, note] of KEY_DATES) {
    const [y, m, day] = d.split("-").map(Number);
    events.push(...vevent({
      uidTag: `key${d}`,
      summary: `\u25c6 ${title}`,
      description: note,
      allDayStart: new Date(y, m - 1, day),
      alarmDays: 7,
    }));
  }
  /* every week whose milestone field is starred, plus every phase transition */
  let lastCode = null;
  for (const w of WEEKS) {
    if (w.code !== lastCode) {
      lastCode = w.code;
      events.push(...vevent({
        uidTag: `phase${w.code}`,
        summary: `${w.code} begins · ${PHASE_META[w.code].name}`,
        description: `Week ${w.wk} of ${TOTAL_WEEKS}. ${w.t}`,
        allDayStart: weekStart(w.wk),
      }));
    }
    if (w.m && w.m.startsWith("***")) {
      events.push(...vevent({
        uidTag: `ms${w.wk}`,
        summary: `\u25c6 ${w.m.replaceAll("*", "").trim()}`,
        description: `Week ${w.wk}: ${w.t}`,
        allDayStart: weekStart(w.wk), allDayEnd: weekEnd(w.wk),
      }));
    }
    if (w.m && !w.m.startsWith("***") && /gate|Gate|REGISTER|COACH|Registered/.test(w.m)) {
      events.push(...vevent({
        uidTag: `gate${w.wk}`,
        summary: `Gate · ${w.m.replaceAll("*", "").trim()}`,
        description: `Week ${w.wk}: ${w.t}`,
        allDayStart: weekStart(w.wk),
      }));
    }
  }
  return events;
}
export const buildMilestonesIcs = () => wrap("Putnam — milestones", milestonesEvents());


/* --------------------------------------------------------------- daily */
const FIRST = new Date(2026, 7, 19);   // Wed 19 Aug 2026
const UNTIL = "20281203T235900";       // end of week 120, floating local time

/* first date on/after FIRST whose getDay() is `dow` */
function firstOn(dow) { const d = new Date(FIRST); while (d.getDay() !== dow) d.setDate(d.getDate() + 1); return d; }
const DOW = { SU: 0, MO: 1, TU: 2, WE: 3, TH: 4, FR: 5, SA: 6 };

/* [days, start, end, summary, description] */
const SKELETON = [
  ["MO,TU,WE,TH,FR,SA,SU", "06:00", "06:15", "Wake + hydrate", "Water immediately. No phone in bed. 21:30–06:00 is 8.5h; the nap is the bonus, not the substitute."],
  ["MO,TU,WE,FR", "06:40", "07:00", "Walk to gym", "Doubles as the morning sunlight walk — circadian anchor."],
  ["MO,TU,WE,FR", "07:00", "08:30", "GYM — Push/Pull (see app for today's sheet)", "Nippard PPL, 13-week cycle. The app's workout panel has the exact exercises, sets and rest for this week's phase."],
  ["MO,TU,WE,FR", "08:30", "09:00", "Breakfast (post-workout)", "2 eggs + 3 whites w/ spinach, banana, oats + flaxseed. Vitamin D3."],
  ["MO,TU,WE,FR", "09:15", "11:45", "DEEP BLOCK — primary text", "The hardest material of the week, on the best cognition of the day. Phone in another room. 20-minute struggle rule before any hint. Content: see this week's all-day event."],
  ["TH", "07:30", "10:00", "DEEP BLOCK — primary text (rest day)", "Strict rest day, but the morning study block still runs — it is the freshest cognition of the week."],
  ["TH", "10:00", "11:45", "Light block — slot C", "Journal, spaced retrieval, Anki."],
  ["MO,TU,WE,TH,FR,SU", "11:45", "12:30", "Lunch", "Curd rice + 6oz chicken + chickpeas + kimchi. Creatine 5g."],
  ["MO,TU,WE,TH,FR,SU", "12:30", "13:00", "Nap · 20–25 min", "Alarm at 25 max — longer risks sleep inertia and the 21:30 bedtime."],
  ["MO,TU,WE,FR", "13:00", "15:00", "BLOCK B — problem sets", "Putnam & Beyond section matched to this week's theory. Full write-ups, not sketches."],
  ["MO,TU,WE,FR", "15:30", "16:30", "SLOT C + journal", "Secondary thread + the journal: key idea / where stuck / technique tag for every attempt."],
  ["MO,TU,WE,FR", "16:30", "16:50", "Quant dose", "15–20 min, hard cap. Zetamac, green book, market reading."],
  ["TH", "15:30", "15:45", "Quant — mental math only", "15 min Zetamac then stop. The rest of this window is REST BY DESIGN."],
  ["MO,TU,WE,FR", "16:50", "18:30", "FREE — protected", "Load-bearing. Never study into this block."],
  ["MO,TU,WE,TH,FR,SA,SU", "18:30", "19:00", "Dinner", "6oz fatty fish (2–3x/wk) or chicken + rice/quinoa + broccoli + olive oil. Finish by 19:00."],
  ["SU", "19:30", "19:45", "Weekly reset · 15 min", "Read next week's row in the app. Lay out Monday's chapter. Check the gym phase. Nothing more."],
  ["MO,TU,WE,TH,FR,SA,SU", "20:00", "20:30", "Wind-down", "Magnesium glycinate 200–300mg. Dim lights. No screens after 21:00."],
  ["MO,TU,WE,TH,FR,SA,SU", "21:30", "22:00", "SLEEP", "8.5h to 06:00. Recomp, skin repair, memory consolidation — this IS training."],
  /* Saturday — the sacred simulation day */
  ["SA", "06:30", "07:15", "Sunlight walk", "30 min. Saturday is active: walks, no lifting."],
  ["SA", "08:15", "08:45", "Warm-up problem", "ONE easy familiar problem. Never skip it; never do two."],
  ["SA", "09:00", "12:00", "SIMULATION — A session", "Exam conditions: printed paper, timer, no phone, no lookups. See this week's all-day event for the exact paper and length."],
  ["SA", "12:00", "13:00", "Lunch + real break", "On both-session sims this IS the exam break. No nap — match exam conditions."],
  ["SA", "13:00", "16:00", "SIMULATION — B session / grading", "Both-session sims: B-session. Shorter sims: adversarial grading against the rubric."],
  ["SA", "16:00", "16:30", "Close + GRADE (protocol)", "PREDICT your score first. Then grade against the hostile rubric, hunting your own gaps. Log score, calibration delta, gap-log entries."],
  /* Sunday — review */
  ["SU", "08:00", "10:00", "REVIEW — re-solve + gap-grade", "Yesterday's misses from scratch, no notes. Then gap-grade the ones you got right."],
  ["SU", "10:00", "11:45", "Gap log + patch plan + Anki", "Error log and gap log updated separately. Calibration delta noted. New theorem cards built."],
  ["SU", "13:00", "18:30", "STRICT REST", "Genuinely off. The recovery that makes 28 months survivable."],
];

function dailyEvents() {
  const events = [];
  for (const [days, s, e, summary, desc] of SKELETON) {
    const list = days.split(",");
    const start = list.map((d) => firstOn(DOW[d])).sort((a, b) => a - b)[0];
    events.push(...vevent({
      uidTag: "sk",
      summary,
      description: desc,
      start: dtLocal(start, s),
      end: dtLocal(start, e),
      rrule: `FREQ=WEEKLY;BYDAY=${days};UNTIL=${UNTIL}`,
    }));
  }
  return events;
}
export const buildDailyIcs = () => wrap("Putnam — daily skeleton", dailyEvents());


/* One file with everything, for the in-app button */
export function buildAllIcs() {
  seq = 0;
  return wrap("Putnam Engine — 120 weeks", [...milestonesEvents(), ...weeksEvents(), ...dailyEvents()]);
}

export function downloadIcs(filename, text) {
  const blob = new Blob([text], { type: "text/calendar;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}
