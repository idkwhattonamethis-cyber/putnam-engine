/* Gym periodization — Nippard PPL (Push/Pull), 13-wk cycle, e1RM/PR math. */
import { quantPhase } from "./quant.js";

export const WORKOUT_DB = {
  P1: {
    "Push #1": [
      ["Barbell Bench Press", 3, 3, "6–8", "8", "~3 min", "Main strength lift. Add weight when you hit 8 on all sets."],
      ["Machine Shoulder Press", 2, 3, "10–12", "9", "~2–3 min", "Chest-supported; press without arching."],
      ["Standing Cable Fly (high-to-low)", 1, 3, "12–15", "9–10", "~1–2 min", "Squeeze at the bottom; stretch at the top."],
      ["Egyptian Lateral Raise", 1, 3, "12–15", "10", "~1 min", "Lean away from the cable; slow negatives."],
      ["Triceps Pressdown (rope)", 1, 3, "10–12", "9–10", "~1–2 min", "Full lockout, control the stretch."],
      ["Overhead Cable Triceps Ext.", 1, 3, "12–15", "10", "~1 min", "Deep stretch behind the head."],
    ],
    "Pull #1": [
      ["Omni-Grip Chest-Supported Row", 2, 3, "10–12", "8–9", "~2–3 min", "3 grips across the 3 sets, wider → closer."],
      ["Lat Pulldown", 2, 3, "10–12", "9", "~2–3 min", "Drive elbows down; full stretch at top."],
      ["A1. Bottom-Half DB Lat Pullover", 1, 2, "10–12", "9–10", "0 min", "Stay in the stretched half of the ROM only."],
      ["A2. Lat Static Stretch", 0, 2, "30s hold", "—", "0 min", "~7/10 intensity stretch."],
      ["Omni-Direction Face Pull", 1, 3, "12–15", "9–10", "~1–2 min", "Low→high, mid, high→low across the 3 sets."],
      ["EZ-Bar Curl", 1, 3, "6–8", "9–10", "~1–2 min", "Minimize torso momentum."],
      ["Bottom-Half Preacher Curl", 0, 2, "10–12", "10", "~1–2 min", "Stretched half of the ROM only."],
    ],
    "Push #2": [
      ["Overhead Press (barbell or machine)", 3, 3, "6–8", "8", "~3 min", "Vertical press as the day's strength anchor."],
      ["Incline DB Press", 2, 3, "10–12", "9", "~2–3 min", "~30° bench; deep stretch at the bottom."],
      ["Pec Deck / Machine Fly", 1, 3, "12–15", "9–10", "~1–2 min", "Hold the squeeze 1s."],
      ["Cable Lateral Raise", 1, 3, "12–15", "10", "~1 min", "Constant tension; no swinging."],
      ["Cross-Body Cable Triceps Ext.", 1, 3, "12–15", "10", "~1 min", "One arm at a time, long head focus."],
      ["Close-Grip Push-Up (or dip)", 0, 2, "AMRAP", "10", "~1–2 min", "To failure; elbows tucked."],
    ],
    "Pull #2": [
      ["Weighted Pull-Up (or assisted)", 2, 3, "6–8", "8–9", "~3 min", "Full hang to chin over bar."],
      ["Seated Cable Row (neutral)", 2, 3, "10–12", "9", "~2–3 min", "Squeeze shoulder blades; no torso heave."],
      ["Kelso Shrug / Chest-Supported Shrug", 1, 3, "12–15", "9–10", "~1–2 min", "Retract, don't just elevate."],
      ["Reverse Pec Deck", 1, 3, "15–20", "10", "~1 min", "Rear delts; slight bend, pinkies up."],
      ["Incline DB Curl", 1, 3, "10–12", "9–10", "~1–2 min", "Deep stretch with arm behind torso."],
      ["Hammer Curl", 0, 3, "10–12", "10", "~1 min", "Brachialis + forearm; neutral grip."],
    ],
  },
  P2: {
    "Push #1": [
      ["Barbell Bench Press", 3, 2, "4–6", "9", "~3 min", "Heavy. Not true failure on the bar for recovery."],
      ["Machine Shoulder Press", 2, 2, "6–8", "10", "~2–3 min", "Max effort — no clean rep left."],
      ["Machine Chest Fly", 1, 1, "6–8", "10", "~2 min", "One all-out set."],
      ["Cable Lateral Raise", 1, 2, "6–8", "10", "~1–2 min", "Heavy for laterals; strict."],
      ["Triceps Pressdown", 1, 2, "6–8", "10", "~1–2 min", "To failure."],
    ],
    "Pull #1": [
      ["Lat Pulldown", 3, 2, "4–6", "9", "~3 min", "Heavy; controlled."],
      ["Chest-Supported Row", 2, 2, "6–8", "10", "~2–3 min", "Max effort."],
      ["DB Lat Pullover", 1, 1, "6–8", "10", "~2 min", "One hard set."],
      ["Face Pull", 1, 2, "8–10", "10", "~1–2 min", "Rear delt max effort."],
      ["EZ-Bar Curl", 1, 2, "4–6", "10", "~1–2 min", "Heavy; strict."],
    ],
    "Push #2": [
      ["Overhead Press", 3, 2, "4–6", "9", "~3 min", "Heavy vertical press."],
      ["Incline DB Press", 2, 2, "6–8", "10", "~2–3 min", "Max effort."],
      ["Pec Deck", 1, 1, "6–8", "10", "~2 min", "One all-out set."],
      ["DB Lateral Raise", 1, 2, "6–8", "10", "~1–2 min", "Strict, heavy."],
      ["Overhead Triceps Ext.", 1, 2, "6–8", "10", "~1–2 min", "To failure."],
    ],
    "Pull #2": [
      ["Weighted Pull-Up", 3, 2, "4–6", "9", "~3 min", "Add load; full ROM."],
      ["Seated Cable Row", 2, 2, "6–8", "10", "~2–3 min", "Max effort."],
      ["Reverse Pec Deck", 1, 2, "8–10", "10", "~1–2 min", "Rear delts to failure."],
      ["Incline DB Curl", 1, 2, "6–8", "10", "~1–2 min", "Heavy; deep stretch."],
      ["Hammer Curl", 0, 2, "6–8", "10", "~1 min", "To failure."],
    ],
  },
  P3: {
    "Push #1": [
      ["Machine Chest Press", 2, 3, "15–20", "8–9", "~1–2 min", "High-rep pump; constant tension."],
      ["Machine Shoulder Press", 2, 3, "15–20", "9", "~1–2 min", "Deep burn; short rests."],
      ["Cable Fly", 1, 3, "15–20", "9–10", "~1 min", "Chase the stretch + squeeze."],
      ["Lateral Raise (cable or DB)", 1, 4, "15–20", "10", "~45s", "Metabolite city; keep tension."],
      ["Triceps Pressdown", 1, 3, "15–20", "9–10", "~1 min", "Full pump."],
      ["Overhead Triceps Ext.", 1, 3, "15–20", "10", "~1 min", "Stretch-focused."],
    ],
    "Pull #1": [
      ["Lat Pulldown", 2, 3, "15–20", "8–9", "~1–2 min", "High-rep; feel the lats."],
      ["Chest-Supported Row", 2, 3, "15–20", "9", "~1–2 min", "Squeeze each rep."],
      ["Straight-Arm Pulldown", 1, 3, "15–20", "9–10", "~1 min", "Lat isolation."],
      ["Face Pull", 1, 4, "15–20", "10", "~45s", "Rear delt pump."],
      ["Cable Curl", 1, 3, "15–20", "9–10", "~1 min", "Constant tension."],
      ["Hammer Curl", 0, 3, "15–20", "10", "~1 min", "Burn out the forearms."],
    ],
    "Push #2": [
      ["Incline Machine Press", 2, 3, "15–20", "8–9", "~1–2 min", "Upper-chest pump."],
      ["Overhead Press (machine)", 2, 3, "15–20", "9", "~1–2 min", "High rep."],
      ["Pec Deck", 1, 3, "15–20", "9–10", "~1 min", "Squeeze + stretch."],
      ["Lateral Raise", 1, 4, "15–20", "10", "~45s", "Keep tension, no rest at top."],
      ["Cross-Body Triceps Ext.", 1, 3, "15–20", "10", "~1 min", "Long-head stretch."],
      ["Bench Dip / Push-Up", 0, 2, "AMRAP", "10", "~1 min", "Finisher to failure."],
    ],
    "Pull #2": [
      ["Pull-Up (assisted for reps)", 2, 3, "15–20", "8–9", "~1–2 min", "Volume; use assist to hit reps."],
      ["Seated Cable Row", 2, 3, "15–20", "9", "~1–2 min", "High rep, full squeeze."],
      ["Reverse Pec Deck", 1, 4, "15–20", "10", "~45s", "Rear delt pump."],
      ["Shrug", 1, 3, "15–20", "9–10", "~1 min", "Traps; hold the top."],
      ["Incline DB Curl", 1, 3, "15–20", "9–10", "~1 min", "Stretch-biased."],
      ["Cable Hammer Curl", 0, 3, "15–20", "10", "~1 min", "Finisher."],
    ],
  },
};
export const WORKOUT_DELOAD_NOTE = "DELOAD/EXAM week: run the Phase-3 movements but cut to 2 sets each, stop 3–4 reps shy of failure (RPE 6–7), lighter load. Keep the pattern, shed the fatigue.";
export const GYM_ROTATION = { 1: "Push #1", 2: "Pull #1", 3: "Push #2", 5: "Pull #2" };
export const EXAM_DELOAD_WEEKS = new Set([7, 16, 67, 68, 119, 120, 171, 172]); // SAT, home rehearsal, Putnam 2027 taper+sit, Putnam 2028 taper+sit
export function gymPhase(wk) {
  if (EXAM_DELOAD_WEEKS.has(wk)) return { key: "DELOAD", phase: "EXAM DELOAD", detail: "Exam window: half volume, nothing near failure, keep the movement pattern. The exam is the performance this week, not the gym." };
  const c = ((wk - 1) % 13) + 1;
  if (c <= 6) return { key: "P1", phase: `Phase 1 · Base (cycle wk ${c}/6)`, detail: "Moderate volume, 10–12 reps. Compounds RPE 8–9, isolations RPE 9–10. Double-progress: reps to top of range, then add weight." };
  if (c <= 10) return { key: "P2", phase: `Phase 2 · Max Effort (cycle wk ${c - 6}/4)`, detail: "Low volume, ultra-high intensity, 4–8 reps. The heavy compound stays at RPE 9 (1 rep in reserve — bar speed and joints matter more than the last rep on a barbell lift); isolation and machine work goes to genuine RPE 10. Current hypertrophy research backs 1–3 RIR as the default and true failure as a tool used sparingly, not on every set — this block already follows that split." };
  if (c <= 12) return { key: "P3", phase: `Phase 3 · Supercompensation (cycle wk ${c - 10}/2)`, detail: "Ultra-high volume, 15–20 reps at RPE 8–10. Get genuinely close to failure or high reps understimulate." };
  return { key: "DELOAD", phase: "Deload (cycle wk 13)", detail: "Reduce volume AND intensity. Same movements, lighter. Funds the next cycle." };
}
export function gymBlock(wk, dow) {
  const day = GYM_ROTATION[dow] || null;
  const p = gymPhase(wk);
  if (!day) return { isGymDay: false, quantName: `Phase ${quantPhase(wk).key} · ${quantPhase(wk).name}`, quantDose: quantPhase(wk).dose, quantDetail: quantPhase(wk).detail };
  const lookupKey = p.key === "DELOAD" ? "P3" : p.key;
  const exercises = (WORKOUT_DB[lookupKey] && WORKOUT_DB[lookupKey][day]) || [];
  return {
    isGymDay: true,
    day, phase: p.phase, phaseKey: p.key, exercises,
    deload: p.key === "DELOAD",
    quantName: `Phase ${quantPhase(wk).key} · ${quantPhase(wk).name}`,
    quantDose: quantPhase(wk).dose,
    quantDetail: quantPhase(wk).detail + " — CAP: never exceeds 2-3h/day even in sprint. It saturates. Hours past the cap go to the flagship, not more drilling.",
    label: `GYM 7:00 — ${day} · ${p.phase}`,
    detail: `${p.detail} Tap the dumbbell icon (top-right of this block) for today's full exercise list. Warm-up first: ~5 min easy cardio (core temp matters this early) + arm swings + cable external rotations, then pyramid into each lift. Push/Pull only by design — legs dropped intentionally (already built from sports; muscle will slowly shrink toward balance, but leg FAT only goes via overall deficit — no spot reduction).`,
  };
}
export const parseRestSec = (rest, kind) => { const m = /([\d.]+)(?:–([\d.]+))?\s*min/.exec(rest || ""); let base = 90; if (m) base = Math.round(((+m[1]) + (m[2] ? +m[2] : +m[1])) / 2 * 60); else if (/45s/.test(rest || "")) base = 45; return kind === "W" ? Math.max(30, Math.round(base * 0.5)) : base; };
export const e1rm = (w, reps, rpe) => { const rir = Math.max(0, 10 - (rpe || 10)); const eff = reps + rir; return Math.round(w * (1 + eff / 30) * 10) / 10; };
export const sessionVolume = (sets) => sets.reduce((s, [w, r]) => s + w * r, 0);
export const workingOnly = (sets) => sets.filter((s) => (s[3] || "S") === "S");
export const warmupOnly = (sets) => sets.filter((s) => s[3] === "W");
export const bestE1RM = (sets) => Math.max(0, ...workingOnly(sets).map(([w, r, p]) => e1rm(w, r, p)));
