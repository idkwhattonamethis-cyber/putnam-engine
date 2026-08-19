import { useState, useEffect, useMemo, useRef } from "react";
import { START, TARGET, TARGET_FINAL, PRIMARY_WEEKS, DAY_MS, WEEKS, PHASE_META, TOTAL_WEEKS, DECISION, ENROLMENT, PAPER_BUDGET, weekOf, dayType, TYPE_LABEL, iso } from "./data/schedule.js";
import { QUANT_PHASES, FLAGSHIP, QUANT_GATES } from "./data/quant.js";
import { gymBlock, WORKOUT_DELOAD_NOTE, e1rm, sessionVolume, workingOnly, warmupOnly, bestE1RM } from "./data/gym.js";
import { RUBRIC, GRADE_STEP, GAP_LOG, CALIB } from "./data/grading.js";
import { M3, DIET } from "./data/lifestyle.js";
import { RESOURCES, CUT_LIST } from "./data/resources.js";
import { TRACKS, OUTREACH, COMPETITIONS_SORTED, CREDENTIALS, COMP_SKILLS } from "./data/skills.js";
import { slotsFor, buildDay } from "./lib/slots.js";
import { LIGHT, DARK, readableOn, mono, beep } from "./lib/theme.js";
import { buildAllIcs, buildWeeksIcs, buildMilestonesIcs, buildDailyIcs, downloadIcs } from "./lib/ics.js";

export default function App() {
  const [tab, setTab] = useState("today");
  const [offset, setOffset] = useState(0);
  const [done, setDone] = useState({});
  const [blocks, setBlocks] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [now, setNow] = useState(new Date());
  const [showWorkout, setShowWorkout] = useState(false);
  const [liftLog, setLiftLog] = useState({});
  const [expandedEx, setExpandedEx] = useState(null);
  const [entry, setEntry] = useState({ w: "", r: "", rpe: "" });
  const [rest, setRest] = useState(null); // {left,total,label}
  const [prFlash, setPrFlash] = useState(null);
  const [selectedLift, setSelectedLift] = useState(null);
  const [blockHist, setBlockHist] = useState({});
  const [simLog, setSimLog] = useState({});
  const [simEntry, setSimEntry] = useState({ p: "", a: "" });
  const [theme, setTheme] = useState(() =>
    (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light"
  );
  const C = theme === "dark" ? DARK : LIGHT;
  const rowHover = theme === "dark" ? "hover:bg-white/[0.05]" : "hover:bg-black/[0.03]";

  useEffect(() => {
    (async () => {
      try { const r = await window.storage.get("campaign-state"); if (r) { const v = JSON.parse(r.value); setDone(v.done || {}); setBlocks(v.blocks || {}); setBlockHist(v.blockHist || {}); setSimLog(v.simLog || {}); } } catch (e) {}
      try { const l = await window.storage.get("lift-log"); if (l) setLiftLog(JSON.parse(l.value)); } catch (e) {}
      try { const t = await window.storage.get("theme"); if (t && (t.value === "dark" || t.value === "light")) setTheme(t.value); } catch (e) {}
      setLoaded(true);
    })();
    const t = setInterval(() => setNow(new Date()), 30000);
    const onKey = (e) => { if (e.key === "ArrowLeft") setOffset((o) => o - 1); if (e.key === "ArrowRight") setOffset((o) => o + 1); };
    window.addEventListener("keydown", onKey);
    return () => { clearInterval(t); window.removeEventListener("keydown", onKey); };
  }, []);
  // keep the browser/PWA chrome + overscroll gutter in sync with the theme
  useEffect(() => {
    const pal = theme === "dark" ? DARK : LIGHT;
    document.documentElement.style.colorScheme = theme;
    document.body.style.background = pal.bg;
    let m = document.querySelector('meta[name="theme-color"]');
    if (!m) { m = document.createElement("meta"); m.setAttribute("name", "theme-color"); document.head.appendChild(m); }
    m.setAttribute("content", pal.bg);
  }, [theme]);
  const toggleTheme = () => { const next = theme === "dark" ? "light" : "dark"; setTheme(next); window.storage.set("theme", next).catch(() => {}); };
  useEffect(() => {
    if (!rest || rest.left <= 0) return;
    const id = setInterval(() => setRest((r) => {
      if (!r) return null;
      if (r.left <= 1) { beep(); return { ...r, left: 0 }; }
      return { ...r, left: r.left - 1 };
    }), 1000);
    return () => clearInterval(id);
  }, [rest && rest.left > 0]);
  const save = async (d, b, sl, bh) => { try {
    const allKeys = Object.keys(b).sort();
    const recent = allKeys.slice(-14), old = allKeys.slice(0, -14);
    const histAdd = {}; old.forEach((k) => (histAdd[k] = (b[k] || []).length));
    const newHist = { ...(bh !== undefined ? bh : blockHist), ...histAdd };
    const pruned = {}; recent.forEach((k) => (pruned[k] = b[k]));
    if (Object.keys(histAdd).length) setBlockHist(newHist);
    await window.storage.set("campaign-state", JSON.stringify({ done: d, blocks: pruned, blockHist: newHist, simLog: sl !== undefined ? sl : simLog }));
  } catch (e) {} };

  const today = useMemo(() => { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + offset); return d; }, [offset]);
  const wk = weekOf(today);
  const week = WEEKS.find((w) => w.wk === wk);
  const meta = (week && PHASE_META[week.code]) || PHASE_META.P15;
  const type = dayType(today);
  const contentDayIdx = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4 }[today.getDay()] ?? null; // Mon..Fri -> 0..4, else null
  const slots = week ? slotsFor(week, contentDayIdx) : null;
  const gym = gymBlock(wk, today.getDay());
  const sched = slots ? buildDay(type, slots, gym, wk, today.getDay()) : [];
  const key = iso(today);
  const dayBlocks = blocks[key] || [];
  const preStart = today < START;
  const daysToStart = Math.ceil((START - today) / DAY_MS);
  const liveTarget = now > TARGET ? TARGET_FINAL : TARGET;
  const daysToTarget = Math.max(0, Math.ceil((liveTarget - now) / DAY_MS));
  const doneCount = Object.keys(done).length;
  const streak = useMemo(() => { let s = 0; const d = new Date(); d.setHours(0, 0, 0, 0); if (!done[iso(d)]) d.setDate(d.getDate() - 1); while (done[iso(d)]) { s++; d.setDate(d.getDate() - 1); } return s; }, [done]);
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const currentIdx = offset === 0 ? sched.reduce((acc, r, i) => (parseInt(r[0].slice(0, 2)) * 60 + parseInt(r[0].slice(3)) <= nowMin ? i : acc), -1) : -1;
  const toggleDay = () => { const d = { ...done }; if (d[key]) delete d[key]; else d[key] = true; setDone(d); save(d, blocks); };
  const toggleBlock = (i) => { const b = { ...blocks }; const arr = new Set(b[key] || []); arr.has(i) ? arr.delete(i) : arr.add(i); b[key] = [...arr]; setBlocks(b); save(done, b); };
  const saveLifts = async (log) => { try { await window.storage.set("lift-log", JSON.stringify(log)); } catch (e) {} };
  const logSim = () => { const p = parseFloat(simEntry.p), a = parseFloat(simEntry.a); if (isNaN(a)) return; const sl = { ...simLog, [key]: { p: isNaN(p) ? null : p, a } }; setSimLog(sl); save(done, blocks, sl); setSimEntry({ p: "", a: "" }); };
  const exportData = () => { try { const blob = new Blob([JSON.stringify({ exported: new Date().toISOString(), done, blocks, blockHist, simLog, liftLog }, null, 2)], { type: "application/json" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `campaign-backup-${key}.json`; a.click(); URL.revokeObjectURL(a.href); } catch (e) {} };
  const importFileRef = useRef(null);
  const importData = (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const v = JSON.parse(reader.result);
        const d = v.done || {}, b = v.blocks || {}, bh = v.blockHist || {}, sl = v.simLog || {}, ll = v.liftLog || {};
        setDone(d); setBlocks(b); setBlockHist(bh); setSimLog(sl); setLiftLog(ll);
        save(d, b, sl, bh);
        saveLifts(ll);
      } catch (e) {}
    };
    reader.readAsText(file);
  };
  const logSet = (exName, restStr, kind) => {
    const w = parseFloat(entry.w), r = parseInt(entry.r), p = entry.rpe === "" ? 10 : parseFloat(entry.rpe);
    if (!(w > 0) || !(r > 0)) return;
    const log = { ...liftLog };
    const hist = log[exName] ? [...log[exName]] : [];
    const rec = [w, r, p, kind]; // kind: "W" warm-up, "S" working
    let sess = hist.find((s) => s.d === key);
    if (sess) { sess = { ...sess, sets: [...sess.sets, rec] }; log[exName] = hist.map((s) => (s.d === key ? sess : s)); }
    else { log[exName] = [...hist, { d: key, sets: [rec] }]; }
    if (kind === "S") {
      const newE = e1rm(w, r, p);
      const priorBest = Math.max(0, ...hist.filter((s) => s.d !== key).flatMap((s) => workingOnly(s.sets).map(([a, b2, c2]) => e1rm(a, b2, c2))));
      if (newE > priorBest && priorBest > 0) { setPrFlash(exName); setTimeout(() => setPrFlash(null), 2500); }
    }
    setLiftLog(log); saveLifts(log);
    setEntry({ w: entry.w, r: "", rpe: "" });
    setRest({ left: parseRestSec(restStr, kind), total: parseRestSec(restStr, kind), label: `${exName} · ${kind === "W" ? "warm-up" : "working"}` });
  };
  const deleteSet = (exName, si) => {
    const log = { ...liftLog };
    const hist = [...(log[exName] || [])];
    const idx = hist.findIndex((s) => s.d === key);
    if (idx < 0) return;
    const sets = hist[idx].sets.filter((_, j) => j !== si);
    if (sets.length) hist[idx] = { ...hist[idx], sets }; else hist.splice(idx, 1);
    if (hist.length) log[exName] = hist; else delete log[exName];
    setLiftLog(log); saveLifts(log);
  };
  const lastSession = (exName) => { const hist = (liftLog[exName] || []).filter((s) => s.d !== key); return hist.length ? hist[hist.length - 1] : null; };
  const todaySets = (exName) => { const s = (liftLog[exName] || []).find((x) => x.d === key); return s ? s.sets : []; };
  const milestone = week && week.m.startsWith("***");
  const pct = Math.max(0, Math.min(100, ((wk - 1) / TOTAL_WEEKS) * 100));
  const NAV = [["today", "Today"], ["plan", "Plan"], ["quant", "Quant"], ["diet", "Diet"], ["resources", "Library"], ["stats", "Stats"]];
  const svgProps = { width: 21, height: 21, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round", strokeLinejoin: "round" };
  const NAV_GLYPH = {
    today: (<svg {...svgProps}><rect x="3" y="4" width="18" height="17" rx="2.5" /><path d="M3 9h18M8 2.5v3M16 2.5v3" /></svg>),
    plan: (<svg {...svgProps}><path d="M4 6h16M4 12h16M4 18h10" /></svg>),
    diet: (<svg {...svgProps}><path d="M4 10.5h16v.5a8 8 0 0 1-16 0z M9 3c0 1.2-1 1.2-1 2.4M13 3c0 1.2-1 1.2-1 2.4" /></svg>),
    resources: (<svg {...svgProps}><path d="M5 4.5h11a2 2 0 0 1 2 2V19H7a2 2 0 0 0-2 2z M18 6.5V19" /></svg>),
    stats: (<svg {...svgProps}><path d="M5 21V11M12 21V4M19 21v-7" /></svg>),
  };
  const dateStr = today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  const ring = 2 * Math.PI * 26;

  return (
    <div className="min-h-screen lg:flex" style={{ background: `radial-gradient(1100px 620px at 88% -12%, ${meta.color}12, transparent), radial-gradient(820px 520px at -8% 112%, ${C.accent}0E, transparent), ${C.bg}`, color: C.text, fontFamily: "'Iowan Old Style', 'Palatino Linotype', 'Georgia', serif" }}>
      <style>{`
        h1,h2 { font-family: 'Fraunces', Georgia, serif !important; letter-spacing: -0.01em; }
        @keyframes rise { from { opacity:0; transform: translateY(8px);} to { opacity:1; transform:none;} }
        .rise { animation: rise .45s cubic-bezier(.2,.7,.3,1) both; }
        .rise2 { animation: rise .45s .08s cubic-bezier(.2,.7,.3,1) both; }
        ::-webkit-scrollbar { width: 10px; } ::-webkit-scrollbar-track { background:${C.panel2}; } ::-webkit-scrollbar-thumb { background:${C.scrollThumb}; border-radius:5px; } ::selection { background:${C.gold}33; }
        @media (prefers-reduced-motion: reduce) { .rise,.rise2 { animation:none; } }
        /* --- mobile / installed-PWA hardening --- */
        * { -webkit-tap-highlight-color: transparent; }
        html, body { overscroll-behavior-y: none; background:${C.bg}; }
        button { touch-action: manipulation; }
        /* iOS zooms the page when focusing an input <16px — force 16px on phones only */
        @media (max-width: 640px) { input { font-size: 16px !important; } }
      `}</style>

      {/* ============ SIDEBAR ============ */}
      <aside className="lg:w-72 lg:fixed lg:inset-y-0 lg:flex lg:flex-col lg:justify-between px-6 py-6 lg:py-10 z-10" style={{ borderRight: "1px solid " + C.line, background: C.sidebar, backdropFilter: "blur(8px)" }}>
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[11px] tracking-[0.3em] font-bold" style={{ color: C.gold, fontFamily: mono }}>PUTNAM · TOP 100</div>
              <h1 className="text-2xl font-black leading-tight mt-1">Execution<br className="hidden lg:block" /> Engine</h1>
              <div className="text-xs mt-1" style={{ color: C.mute }}>178 weeks · Aug 2026 → Dec 2029</div>
            </div>
            <button onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} title={theme === "dark" ? "Light mode" : "Dark mode"} className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90" style={{ background: C.panel, color: C.gold, border: "1px solid " + C.line }}>
              {theme === "dark" ? (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4.2" /><path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8l1.8-1.8M18 6l1.8-1.8" /></svg>
              ) : (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a6.6 6.6 0 0 0 11 11z" /></svg>
              )}
            </button>
          </div>
          <nav className="mt-6 lg:mt-10 hidden lg:flex lg:flex-col gap-1 overflow-x-auto">
            {NAV.map(([id, label]) => (
              <button key={id} onClick={() => setTab(id)} className="flex items-center gap-3 py-2 px-2 lg:px-0 text-left shrink-0 transition-all">
                <span className="hidden lg:block h-px transition-all duration-300" style={{ width: tab === id ? 40 : 18, background: tab === id ? C.gold : C.mute }} />
                <span className="text-xs font-bold tracking-[0.22em] uppercase transition-colors" style={{ fontFamily: mono, color: tab === id ? C.gold : C.mute }}>{label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="hidden lg:flex items-center gap-4">
          <svg width="64" height="64" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="26" fill="none" stroke={C.line} strokeWidth="5" />
            <circle cx="32" cy="32" r="26" fill="none" stroke={C.gold} strokeWidth="5" strokeLinecap="round" strokeDasharray={ring} strokeDashoffset={ring * (1 - pct / 100)} transform="rotate(-90 32 32)" style={{ transition: "stroke-dashoffset .8s" }} />
            <text x="32" y="37" textAnchor="middle" fill={C.text} fontSize="13" fontWeight="800" fontFamily={mono}>{Math.round(pct)}%</text>
          </svg>
          <div>
            <div className="text-3xl font-black" style={{ color: C.gold, fontFamily: mono }}>{daysToTarget}</div>
            <div className="text-[10px] tracking-[0.2em] uppercase" style={{ color: C.mute, fontFamily: mono }}>days to target</div>
          </div>
        </div>
      </aside>

      {/* ============ CONTENT ============ */}
      <main className="lg:ml-72 flex-1 px-5 lg:px-12 py-6 lg:py-10 pb-28 lg:pb-10 max-w-4xl">
        {tab === "today" && (
          <div className="rise">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div>
                <div className="text-[11px] tracking-[0.3em] uppercase font-bold" style={{ color: C.mute, fontFamily: mono }}>{offset === 0 ? "Today" : "Preview · ← → keys work"}</div>
                <h2 className="text-2xl lg:text-4xl font-black mt-0.5 tracking-tight">{dateStr}</h2>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setOffset(offset - 1)} className="w-9 h-9 rounded-lg font-bold hover:opacity-75 transition-opacity" style={{ background: C.panel, color: C.dim, border: "1px solid " + C.line }}>←</button>
                {offset !== 0 && <button onClick={() => setOffset(0)} className="px-3 h-9 rounded-lg text-xs font-bold" style={{ background: C.panel, color: C.gold, border: "1px solid " + C.line }}>today</button>}
                <button onClick={() => setOffset(offset + 1)} className="w-9 h-9 rounded-lg font-bold hover:opacity-75 transition-opacity" style={{ background: C.panel, color: C.dim, border: "1px solid " + C.line }}>→</button>
              </div>
            </div>

            {preStart ? (
              <div className="rounded-2xl p-8 mt-6 text-center rise2" style={{ background: C.panel, border: "1px solid " + C.line }}>
                <div className="text-6xl font-black" style={{ color: C.gold, fontFamily: mono }}>T−{daysToStart}</div>
                <div className="mt-3 text-sm leading-relaxed max-w-md mx-auto" style={{ color: C.dim }}>Day 1 is Wednesday 19 August 2026. Before then: open BOTH logs (error log for wrong answers, gap log for under-justified steps — see the Plan tab's protocol), download Book of Proof and the free Axler PDF, print Putnam 2001 for the baseline diagnostic, and lock the 21:30 sleep tonight. Your coursework is done; the next 120 weeks are about making your proofs un-attackable.</div>
              </div>
            ) : !week ? (
              <div className="rounded-2xl p-8 mt-6 text-center" style={{ background: C.panel }}>Campaign complete.</div>
            ) : (
              <>
                <div className="flex flex-wrap items-center gap-2 mt-4 rise2">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: meta.color + "1C", color: meta.color, border: `1px solid ${meta.color}45`, fontFamily: mono }}>WK {wk}/{TOTAL_WEEKS} · {week.code} {meta.name}</span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: C.panel2, color: C.dim, border: "1px solid " + C.line, fontFamily: mono }}>{TYPE_LABEL[type]}</span>
                </div>
                <div className="rounded-2xl p-4 mt-3 rise2" style={{ background: milestone ? C.milestoneBg : C.panel, border: `1px solid ${milestone ? C.gold + "70" : C.line}` }}>
                  <div className="text-sm font-semibold leading-relaxed">{week.t}</div>
                  {week.m && <div className="text-xs font-bold mt-1.5" style={{ color: C.gold, fontFamily: mono }}>◆ {week.m.replaceAll("*", "").trim()}</div>}
                </div>
                <button onClick={toggleDay} disabled={!loaded} className="w-full rounded-2xl py-3.5 mt-4 font-black tracking-[0.18em] text-sm uppercase transition-all hover:opacity-90 active:scale-[.99]" style={{ background: done[key] ? C.doneBg : `linear-gradient(100deg, ${C.gold}, ${C.goldGrad2})`, color: done[key] ? C.green : C.onAccent, border: done[key] ? `1px solid ${C.green}55` : "none", fontFamily: mono }}>
                  {done[key] ? "✓ day complete — logged" : "mark day complete"}
                </button>
                {type === "SIM" && (
                  <div className="rounded-2xl p-4 mt-2" style={{ background: C.panel, border: `1px solid ${C.accent}44` }}>
                    <div className="text-[11px] font-bold tracking-[0.24em] uppercase mb-2" style={{ color: C.accent, fontFamily: mono }}>Sim result · the truth-teller's numbers</div>
                    {simLog[key] ? (
                      <div className="text-sm" style={{ color: C.text }}>
                        Logged: predicted <b style={{ fontFamily: mono }}>{simLog[key].p ?? "—"}</b> · actual <b style={{ fontFamily: mono, color: C.gold }}>{simLog[key].a}</b>
                        {simLog[key].p != null && <span style={{ color: C.dim }}> · calibration Δ = <b style={{ fontFamily: mono, color: Math.abs(simLog[key].p - simLog[key].a) <= 2 ? C.green : C.accent }}>{(simLog[key].p - simLog[key].a) > 0 ? "+" : ""}{Math.round((simLog[key].p - simLog[key].a) * 10) / 10}</b></span>}
                        <button onClick={() => { const sl = { ...simLog }; delete sl[key]; setSimLog(sl); save(done, blocks, sl); }} className="ml-2 text-xs underline" style={{ color: C.mute }}>redo</button>
                      </div>
                    ) : (
                      <div className="flex gap-1.5 items-center">
                        <input inputMode="decimal" value={simEntry.p} onChange={(e) => setSimEntry({ ...simEntry, p: e.target.value })} placeholder="predicted" className="min-w-0 flex-1 rounded-lg px-2.5 py-2 text-sm font-bold text-center outline-none" style={{ background: C.bg, border: `1.5px solid ${C.line}`, color: C.ink, fontFamily: mono }} />
                        <input inputMode="decimal" value={simEntry.a} onChange={(e) => setSimEntry({ ...simEntry, a: e.target.value })} placeholder="actual" className="min-w-0 flex-1 rounded-lg px-2.5 py-2 text-sm font-bold text-center outline-none" style={{ background: C.bg, border: `1.5px solid ${C.line}`, color: C.ink, fontFamily: mono }} />
                        <button onClick={logSim} className="shrink-0 rounded-lg px-3 py-2 font-black text-sm" style={{ background: C.accent, color: C.onAccent }}>log</button>
                      </div>
                    )}
                    <div className="text-[11px] mt-2 leading-relaxed" style={{ color: C.mute }}>Predict BEFORE opening solutions. The delta trend lives in Stats — driving it to ~0 is what makes self-grading trustworthy.</div>
                  </div>
                )}

                <div className="mt-5 relative">
                  <div className="absolute left-[92px] top-2 bottom-2 w-px" style={{ background: C.line }} />
                  {sched.map(([t, b, d, kind], i) => {
                    const isNow = i === currentIdx;
                    const col = kind === 1 ? meta.color : kind === 2 ? C.gold : C.mute;
                    const checked = dayBlocks.includes(i);
                    return (
                      <div key={i} className="relative flex gap-3 py-2.5 pl-1 pr-3 rounded-xl transition-colors" style={{ background: isNow ? C.panel2 : "transparent", opacity: checked ? 0.45 : 1 }}>
                        <button onClick={() => toggleBlock(i)} className="shrink-0 w-5 h-5 mt-0.5 rounded-md text-[11px] font-black transition-all" style={{ border: `1.5px solid ${checked ? C.green : C.line}`, background: checked ? C.doneBg : "transparent", color: C.green }}>{checked ? "✓" : ""}</button>
                        <div className="shrink-0 w-12 text-right text-xs font-bold pt-0.5" style={{ color: isNow ? C.green : C.mute, fontFamily: mono }}>{t}</div>
                        <div className="shrink-0 w-2 flex justify-center pt-1.5">
                          <span className="w-2 h-2 rounded-full" style={{ background: isNow ? C.green : col, boxShadow: isNow ? `0 0 0 4px ${C.green}22` : "none" }} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold flex items-center gap-2" style={{ color: kind ? col : C.text, textDecoration: checked ? "line-through" : "none" }}>
                            <span>{b}{isNow && <span className="ml-2 text-[10px] font-black tracking-widest" style={{ color: C.green, fontFamily: mono }}>NOW</span>}</span>
                            {gym.isGymDay && b.startsWith("GYM 7:00") && (
                              <button onClick={() => setShowWorkout(true)} className="shrink-0 text-[11px] font-black px-2 py-0.5 rounded-full transition-transform hover:scale-105" style={{ background: C.gold + "22", color: C.gold, border: `1px solid ${C.gold}55`, fontFamily: mono }}>🏋 workout ›</button>
                            )}
                          </div>
                          {d && <div className="text-xs mt-1 leading-relaxed" style={{ color: C.dim }}>{d}</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {tab === "plan" && (
          <div className="rise">
            <h2 className="text-2xl lg:text-3xl font-black tracking-tight">The 178 weeks</h2>
            <p className="text-xs mt-2 leading-relaxed max-w-xl" style={{ color: C.dim }}>Putnam-only: no AMC, no AIME. Week 1 is a Wed–Sun stub (19–23 Aug 2026); every week after runs Mon→Sun. Week 120 is the stated target (2 Dec 2028); weeks 121–178 carry the full-time cycle, the 2029 sprint, the summer internship, and the final sitting on 1 Dec 2029. Three years at UMN, graduating spring 2030 — decided, not pending. Fixed split: Mon·Tue·Wed·Fri train · Thu strict rest · Sat sim · Sun review. ~32–34 focused h/wk. Gold = exams & gates.</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {[["⤓ all (.ics)", () => downloadIcs("putnam-all.ics", buildAllIcs())],
                ["weeks", () => downloadIcs("putnam-weeks.ics", buildWeeksIcs())],
                ["milestones", () => downloadIcs("putnam-milestones.ics", buildMilestonesIcs())],
                ["daily skeleton", () => downloadIcs("putnam-daily.ics", buildDailyIcs())]].map(([label, fn], i) => (
                <button key={i} onClick={fn} className="text-[11px] font-bold px-3 py-1.5 rounded-full transition-opacity hover:opacity-75" style={{ background: i === 0 ? C.gold : C.panel, color: i === 0 ? C.onAccent : C.dim, border: `1px solid ${i === 0 ? C.gold : C.line}`, fontFamily: mono }}>{label}</button>
              ))}
            </div>
            <p className="text-[11px] mt-2 leading-relaxed max-w-xl" style={{ color: C.mute }}>Google Calendar → Settings → Import &amp; export. Create a new calendar first (e.g. "Putnam") and import into that one, so you can hide or delete the whole thing in one click.</p>
            <div className="rounded-2xl p-4 mt-4 mb-2" style={{ background: C.panel, border: `1px solid ${C.accent}44` }}>
              <div className="text-[11px] font-bold tracking-[0.24em] uppercase mb-2" style={{ color: C.accent, fontFamily: mono }}>The truth-teller · read this once, live it every sim</div>
              <p className="text-xs leading-relaxed mb-2" style={{ color: C.dim }}>You own the coursework. The gap between you and a top-100 finish is not knowledge — it is <span style={{ color: C.text, fontWeight: 600 }}>provability under a 0-or-9 grader</span>. Coursework gives partial credit and a charitable reader; Putnam gives a 1 for a right idea with a gap. Until you can afford a coach, this protocol is your grader:</p>
              <div className="text-xs leading-relaxed space-y-1.5" style={{ color: C.dim }}>
                <div><span style={{ color: C.accent, fontWeight: 700 }}>1 · Rubric.</span> {RUBRIC}</div>
                <div><span style={{ color: C.accent, fontWeight: 700 }}>2 · Grade step.</span> {GRADE_STEP}</div>
                <div><span style={{ color: C.accent, fontWeight: 700 }}>3 · Gap log.</span> {GAP_LOG}</div>
                <div><span style={{ color: C.accent, fontWeight: 700 }}>4 · Calibration.</span> {CALIB}</div>
              </div>
              <p className="text-[11px] leading-relaxed mt-3 pt-3" style={{ color: C.mute, borderTop: `1px solid ${C.line}` }}>Book usage note: the spine books (Zeitz, Spivak, Niven, Bóna, Rudin, Axler, Steele) ARE read in order once their phase starts — one chapter reproduced from memory before the next begins. Putnam &amp; Beyond runs underneath the whole campaign as Block B, section-matched to whatever theory that week teaches. Selection principle for the library: solutions-included sources outrank problems-only ones — until the coach onboards in week 44, every source has to support adversarial self-grading. Problems-only compilations are timed-set fodder ONLY, graded against their AoPS solution threads, never scheduled reading. Videos are watched AFTER an attempt, never instead of one.</p>
            </div>
            <div className="rounded-2xl p-4 mt-3 mb-2" style={{ background: C.milestoneBg, border: `1px solid ${C.gold}66` }}>
              <div className="text-[11px] font-bold tracking-[0.24em] uppercase mb-1" style={{ color: C.gold, fontFamily: mono }}>Decided · Aug 2026 · confirmed wk 123</div>
              <div className="text-sm font-bold">{DECISION.chosen}</div>
              <p className="text-xs mt-1 leading-relaxed" style={{ color: C.dim }}>{DECISION.short} Written down here so it is never re-argued in a bad week — the reasoning below is the whole case, both sides.</p>
              <div className="grid sm:grid-cols-2 gap-3 mt-3">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1" style={{ color: C.mute, fontFamily: mono }}>Not taken · graduate 2029</div>
                  {DECISION.twoYear.map((t, i) => <div key={i} className="text-[11px] leading-relaxed mb-1" style={{ color: C.mute }}>· {t}</div>)}
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1" style={{ color: C.green, fontFamily: mono }}>✓ CHOSEN · extend to spring 2030</div>
                  {DECISION.threeYear.map((t, i) => <div key={i} className="text-[11px] leading-relaxed mb-1" style={{ color: C.dim }}>· {t}</div>)}
                </div>
              </div>
            </div>
            <div className="rounded-2xl p-4 mt-2 mb-2" style={{ background: C.panel, border: `1px solid ${C.green}55` }}>
              <div className="text-[11px] font-bold tracking-[0.24em] uppercase mb-1" style={{ color: C.green, fontFamily: mono }}>Enrolment · from wk 56</div>
              <div className="text-sm font-bold">{ENROLMENT.headline}</div>
              <p className="text-xs mt-1.5 leading-relaxed" style={{ color: C.dim }}>{ENROLMENT.body}</p>
              <p className="text-xs mt-2 leading-relaxed" style={{ color: C.dim }}><span style={{ color: C.green, fontWeight: 700 }}>The fix: </span>{ENROLMENT.fix}</p>
              <p className="text-xs mt-2 leading-relaxed" style={{ color: C.dim }}><span style={{ color: C.green, fontWeight: 700 }}>Which classes: </span>{ENROLMENT.classes}</p>
              <p className="text-xs mt-2 leading-relaxed" style={{ color: C.mute }}>{ENROLMENT.optics}</p>
            </div>
            <div className="rounded-2xl p-4 mt-2 mb-2" style={{ background: C.panel, border: "1px solid " + C.line }}>
              <div className="text-[11px] font-bold tracking-[0.24em] uppercase mb-1" style={{ color: C.gold, fontFamily: mono }}>Paper budget</div>
              <p className="text-xs leading-relaxed mb-2" style={{ color: C.dim }}>Only ~43 Putnam papers have solid published solutions (1985 onward) and this campaign sits ~47 full simulations. Allocated deliberately so no phase burns a paper a later phase needs.</p>
              {PAPER_BUDGET.map(([wk, pool, note], i) => (
                <div key={i} className="flex gap-3 text-[11px] mb-1.5 leading-relaxed">
                  <span className="shrink-0 font-black" style={{ color: C.mute, fontFamily: mono, minWidth: 78 }}>{wk}</span>
                  <span style={{ color: C.dim }}><span style={{ color: C.text, fontWeight: 700 }}>{pool}</span> — {note}</span>
                </div>
              ))}
            </div>
            <div className="flex h-2 rounded-full overflow-hidden mt-4 mb-5" style={{ border: "1px solid " + C.line }}>
              {Object.entries(PHASE_META).map(([code, p]) => {
                const n = WEEKS.filter((w) => w.code === code).length;
                return <div key={code} title={`${code} ${p.name}`} style={{ width: `${(n / TOTAL_WEEKS) * 100}%`, background: p.color + (WEEKS.find((w) => w.wk === wk)?.code === code ? "FF" : "55") }} />;
              })}
            </div>
            {WEEKS.map((w) => {
              const p = PHASE_META[w.code]; const ms = w.m.startsWith("***"); const cur = w.wk === wk && !preStart;
              return (
                <div key={w.wk} className={`flex gap-3 px-3 py-2 rounded-lg mb-0.5 transition-colors ${rowHover}`} style={{ background: ms ? C.milestoneBg : "transparent", border: cur ? `1px solid ${C.green}60` : "1px solid transparent" }}>
                  <div className="shrink-0 w-9 text-sm font-bold" style={{ color: p.color, fontFamily: mono }}>{w.wk}</div>
                  <div className="shrink-0 w-7 text-[10px] font-bold pt-1" style={{ color: C.mute, fontFamily: mono }}>{w.code}</div>
                  <div className="min-w-0">
                    <div className="text-sm">{w.t}</div>
                    {w.m && <div className="text-[11px] font-bold mt-0.5" style={{ color: C.gold, fontFamily: mono }}>◆ {w.m.replaceAll("*", "").trim()}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === "quant" && (
          <div className="rise space-y-3">
            <div className="rounded-2xl p-5" style={{ background: C.panel, border: "1px solid " + C.line }}>
              <div className="text-[11px] tracking-[0.3em] uppercase font-bold" style={{ color: C.mute, fontFamily: mono }}>The bet</div>
              <div className="text-sm mt-2 leading-relaxed" style={{ color: C.dim }}>
                UMN for everything: 3-yr BS → MFM via the Integrated Degree Program. No target master's, no transfer — that insurance is dropped by choice.
                <span style={{ color: C.gold, fontWeight: 700 }}> A top-100 Putnam deletes the resume screen. Top 200 does most of it. Top 500 helps but does not carry a non-target resume on its own</span> — which is why the tracks below exist: referrals and funnel competitions are what actually clear the screen from UMN, and the OA is what decides whether clearing it mattered. After that, offers are decided by interview performance alone. Roles: QT + QR simultaneously — interview results do the routing, not you.
              </div>
              <div className="text-xs mt-3 leading-relaxed" style={{ color: C.mute }}>
                <span style={{ color: C.accent, fontWeight: 700 }}>Accepted tradeoff (eyes open):</span> if the Putnam badly underdelivers there is no brand fallback. Remaining assets: MFM (QuantNet top-20, not target-tier), the flagship, competitions, repeated cycles. A choice, not an oversight.
              </div>
            </div>
            <div className="rounded-2xl p-5" style={{ background: C.panel, border: "1px solid " + C.line }}>
              <div className="text-[11px] tracking-[0.3em] uppercase font-bold" style={{ color: C.mute, fontFamily: mono }}>Saturation rule</div>
              <div className="text-sm mt-2 leading-relaxed" style={{ color: C.dim }}>
                Structured interview prep saturates around <span style={{ color: C.gold, fontWeight: 700 }}>400–500 focused lifetime hours</span>. Past that, marginal hours buy ~nothing — firms write novel questions specifically to defeat grinders, and what fails Putnam-caliber candidates is communication, calibration, and market intuition. None of those come from solo drilling.
                <div className="mt-2" style={{ color: C.accent, fontWeight: 700 }}>Capped at 2–3 h/day even in sprint. Hours past the cap go to the flagship.</div>
              </div>
            </div>
            <div className="rounded-2xl p-5" style={{ background: C.panel, border: "1px solid " + C.line }}>
              <div className="text-[11px] tracking-[0.3em] uppercase font-bold" style={{ color: C.mute, fontFamily: mono }}>Credential tiers — what a QT desk actually pays for</div>
              <div className="text-[11px] mt-2 mb-3 leading-relaxed" style={{ color: C.mute }}>
                Ranked by value to a <span style={{ color: C.text, fontWeight: 600 }}>trading</span> seat, with annual supply — scarcity is most of the value. Research-shaped credentials (ICPC, Kaggle) are discounted here on purpose.
                <div className="mt-2" style={{ color: C.dim }}><span style={{ color: C.gold, fontWeight: 700 }}>Why the calendar looks the way it does: </span>every credential above B tier still reachable from here is either a <span style={{ color: C.text, fontWeight: 600 }}>spring event</span> (Prosperity in April, trading comps Feb–April) or an <span style={{ color: C.text, fontWeight: 600 }}>autumn application</span> (pipeline programmes). The one that would collide with a Nov–Dec Putnam peak — ICPC regionals — is only a B and discounts for QT, so it is declined. Autumn belongs to the Putnam; spring carries the résumé.</div>
              </div>
              {CREDENTIALS.map(([tier, name, supply, why, status], i) => {
                const col = tier.startsWith("S") ? C.accent : tier.startsWith("A") ? C.gold : tier.startsWith("B") ? C.green : C.mute;
                const hot = status === "THE TARGET" || status === "MUST APPLY";
                return (
                  <div key={i} className="flex gap-3 py-2" style={{ borderTop: i ? `1px solid ${C.line}` : "none" }}>
                    <span className="shrink-0 text-xs font-black pt-0.5 text-right" style={{ color: col, fontFamily: mono, minWidth: 26 }}>{tier}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <span className="text-xs font-bold" style={{ color: hot ? col : C.text }}>{name}</span>
                        <span className="text-[10px]" style={{ color: C.mute, fontFamily: mono }}>{supply}</span>
                        {status && <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full" style={{ background: hot ? col : "transparent", color: hot ? C.onAccent : C.mute, border: `1px solid ${hot ? col : C.line}`, fontFamily: mono }}>{status}</span>}
                      </div>
                      {why && <div className="text-[11px] mt-1 leading-relaxed" style={{ color: C.dim }}>{why}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="rounded-2xl p-5" style={{ background: C.panel, border: "1px solid " + C.line }}>
              <div className="text-[11px] tracking-[0.3em] uppercase font-bold mb-1" style={{ color: C.mute, fontFamily: mono }}>Skill tracks — what actually clears and converts a screen</div>
              <div className="text-[11px] leading-relaxed mb-3" style={{ color: C.mute }}>None of these touch the deep block. The daily dose keeps its 15/45/20 minutes and just gets real content; everything project-shaped goes to the builder block on Saturday evening (and Sunday afternoon in the summers only).</div>
              {TRACKS.map((t) => {
                const liveNow = week && ((t.key === "T4" && week.wk >= 19) || (t.key === "T5" && week.wk >= 44) || ((t.key === "T3" || t.key === "T6") && week.wk >= 55) || t.key === "T1" || t.key === "T2");
                return (
                  <div key={t.key} className="rounded-xl px-4 py-3 mb-2" style={{ background: C.panel2, border: "1px solid " + (liveNow ? C.gold + "55" : C.line) }}>
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="text-sm font-bold" style={{ color: liveNow ? C.gold : C.text }}>{t.name}</div>
                      <div className="text-[10px] font-bold" style={{ color: C.mute, fontFamily: mono }}>{t.live} · {t.dose}</div>
                    </div>
                    <div className="text-[11px] mt-1 leading-relaxed" style={{ color: C.dim }}>{t.why}</div>
                    <div className="text-[11px] mt-1 leading-relaxed" style={{ color: C.green }}>Target: {t.target}</div>
                  </div>
                );
              })}
            </div>
            <div className="rounded-2xl p-5" style={{ background: C.panel, border: "1px solid " + C.line }}>
              <div className="text-[11px] tracking-[0.3em] uppercase font-bold mb-3" style={{ color: C.mute, fontFamily: mono }}>Outreach calendar — the non-target fix</div>
              {Object.entries(OUTREACH).map(([w, t]) => (
                <div key={w} className="flex gap-3 text-xs mb-2 leading-relaxed">
                  <span className="shrink-0 font-black" style={{ color: week && week.wk >= +w ? C.gold : C.mute, fontFamily: mono }}>wk {w}</span>
                  <span style={{ color: C.dim }}>{t}</span>
                </div>
              ))}
            </div>
            <div className="rounded-2xl p-5" style={{ background: C.panel, border: `1px solid ${C.green}55` }}>
              <div className="text-[11px] tracking-[0.3em] uppercase font-bold" style={{ color: C.green, fontFamily: mono }}>Capability ladder — what must be true of you before each entry</div>
              <div className="text-[11px] mt-2 mb-3 leading-relaxed" style={{ color: C.mute }}>
                Entering a competition you have not trained for buys a bad result and a wasted fortnight. This is the training half — and it is what the first pass of this plan got wrong: market making used to start at wk 55, <span style={{ color: C.text, fontWeight: 600 }}>21 weeks after the first Prosperity</span>, and options at wk 133, <span style={{ color: C.text, fontWeight: 600 }}>47 weeks after the round that needs them</span>. Both are pulled forward. Every item below sits in the daily dose or the builder block — none of it touches the deep block, Block B, slot C, or the free block.
              </div>
              {COMP_SKILLS.map(([w, cap, how, forWhat], i) => {
                const live = week && week.wk >= w;
                return (
                  <div key={i} className="flex gap-3 py-2" style={{ borderTop: i ? `1px solid ${C.line}` : "none" }}>
                    <span className="shrink-0 text-[11px] font-black pt-0.5 text-right" style={{ color: live ? C.green : C.mute, fontFamily: mono, minWidth: 44 }}>wk {w}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <span className="text-xs font-bold" style={{ color: live ? C.green : C.text }}>{cap}</span>
                        <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full" style={{ color: C.mute, border: `1px solid ${C.line}`, fontFamily: mono }}>for {forWhat}</span>
                      </div>
                      <div className="text-[11px] mt-1 leading-relaxed" style={{ color: C.dim }}>{how}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="rounded-2xl p-5" style={{ background: C.panel, border: "1px solid " + C.line }}>
              <div className="text-[11px] tracking-[0.3em] uppercase font-bold mb-3" style={{ color: C.mute, fontFamily: mono }}>Competitions — recruiting funnels, not decoration</div>
              {COMPETITIONS_SORTED.map(([w, n, why], i) => (
                <div key={i} className="flex gap-3 text-xs mb-2 leading-relaxed">
                  <span className="shrink-0 font-black" style={{ color: week && week.wk >= w ? C.gold : C.mute, fontFamily: mono }}>wk {w}</span>
                  <span style={{ color: C.dim }}><span style={{ color: C.text, fontWeight: 700 }}>{n}</span> — {why}</span>
                </div>
              ))}
            </div>
            {QUANT_PHASES.map((p) => {
              const live = week && week.wk >= p.from && week.wk <= p.to;
              return (
                <div key={p.key} className="rounded-2xl p-5" style={{ background: C.panel, border: "1px solid " + (live ? C.gold : C.line) }}>
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="text-sm font-black" style={{ color: live ? C.gold : C.text }}>Phase {p.key} · {p.name}</div>
                    <div className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: live ? C.gold + "22" : "transparent", color: live ? C.gold : C.mute, border: "1px solid " + (live ? C.gold + "55" : C.line), fontFamily: mono }}>wk {p.from}–{p.to} · {p.dose}/day{live ? " · LIVE" : ""}</div>
                  </div>
                  <div className="text-xs mt-2 leading-relaxed" style={{ color: C.dim }}>{p.detail}</div>
                </div>
              );
            })}
            <div className="rounded-2xl p-5" style={{ background: C.panel, border: "1px solid " + C.line }}>
              <div className="text-[11px] tracking-[0.3em] uppercase font-bold" style={{ color: C.mute, fontFamily: mono }}>Phase D · The sprint (post-campaign)</div>
              <div className="text-xs mt-2 leading-relaxed" style={{ color: C.dim }}>Mar–Aug 2029, after results land. 2–3 h/day AT THE CAP: green book pass 3 timed, mental math to elite, Natenberg + daily market-making games, mocks weekly. Every remaining hour: flagship polish. Then Aug–Oct 2029 — the main recruiting cycle, holding both Putnam scores.</div>
            </div>
            <div className="rounded-2xl p-5" style={{ background: C.panel, border: "1px solid " + C.line }}>
              <div className="text-[11px] tracking-[0.3em] uppercase font-bold mb-3" style={{ color: C.mute, fontFamily: mono }}>Flagship channel — one artifact, compounding</div>
              {Object.entries(FLAGSHIP).map(([w, t]) => (
                <div key={w} className="flex gap-3 text-xs mb-2 leading-relaxed">
                  <span className="shrink-0 font-black" style={{ color: week && week.wk >= +w ? C.gold : C.mute, fontFamily: mono }}>wk {w}</span>
                  <span style={{ color: C.dim }}>{t}</span>
                </div>
              ))}
              <div className="text-xs mt-3 leading-relaxed" style={{ color: C.mute }}>Companions: the C++ order book (systems questions) + professor research (real-research questions).</div>
            </div>
            <div className="rounded-2xl p-5" style={{ background: C.panel, border: "1px solid " + C.line }}>
              <div className="text-[11px] tracking-[0.3em] uppercase font-bold mb-3" style={{ color: C.mute, fontFamily: mono }}>Quant gates</div>
              {Object.entries(QUANT_GATES).map(([w, t]) => (
                <div key={w} className="flex gap-3 text-xs mb-2 leading-relaxed">
                  <span className="shrink-0 font-black" style={{ color: week && week.wk >= +w ? C.gold : C.mute, fontFamily: mono }}>wk {w}</span>
                  <span style={{ color: C.dim }}>{t}</span>
                </div>
              ))}
            </div>
            <div className="rounded-2xl p-5" style={{ background: C.panel, border: "1px solid " + C.line }}>
              <div className="text-[11px] tracking-[0.3em] uppercase font-bold" style={{ color: C.mute, fontFamily: mono }}>Cut from the plan</div>
              <div className="text-xs mt-2 leading-relaxed" style={{ color: C.dim }}>Shreve (hedge-fund/sell-side signaling — off-path) · Durrett (PhD-branch only) · GRE, external SOPs, Princeton/MIT/CMU deadlines. Natenberg promoted to core; mental-math target moved from adequate to elite — it hard-gates QT pipelines.</div>
            </div>
          </div>
        )}

        {tab === "diet" && (
          <div className="rise">
            <h2 className="text-2xl lg:text-3xl font-black tracking-tight">Diet · ≈2,450 kcal · 168g protein</h2>
            <p className="text-xs mt-2" style={{ color: C.dim }}>Drop the snack on lighter days (~2,000) or add milk/fruit on heavy gym days (~2,600).</p>
            <div className="mt-5 space-y-2">
              {DIET.map(([m, food, macro, why], i) => (
                <div key={i} className={`rounded-2xl p-4 transition-colors ${rowHover}`} style={{ background: C.panel, border: "1px solid " + C.line }}>
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <div className="font-bold" style={{ color: C.gold }}>{m}</div>
                    <div className="text-[11px] font-bold" style={{ color: C.dim, fontFamily: mono }}>{macro}</div>
                  </div>
                  <div className="text-sm mt-1.5">{food}</div>
                  <div className="text-xs mt-1" style={{ color: C.dim }}>{why}</div>
                </div>
              ))}
              <div className="rounded-2xl p-4" style={{ background: C.panel, border: "1px solid " + C.line }}>
                <div className="text-[11px] tracking-[0.25em] uppercase font-bold mb-2" style={{ color: C.mute, fontFamily: mono }}>Supplements</div>
                {[["Vitamin D3 2–4k IU", "breakfast; get tested"], ["Creatine 5g", "Meal 2, every day incl. rest days"], ["Omega-3 1–2g", "non-fish days only"], ["Magnesium glycinate 200–300mg", "21:00 wind-down"]].map(([s, why], i) => (
                  <div key={i} className="text-sm py-1"><span className="font-bold" style={{ color: C.green }}>{s}</span> <span style={{ color: C.dim }}>— {why}</span></div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "resources" && (
          <div className="rise">
            <h2 className="text-2xl lg:text-3xl font-black tracking-tight">Resource library</h2>
            <p className="text-xs mt-2" style={{ color: C.dim }}>The entire universe. ✓ = you already own the exact edition the Plan's chapter numbers reference.</p>
            {RESOURCES.map(([cat, items], i) => (
              <div key={i} className="mt-6">
                <div className="text-[11px] font-bold tracking-[0.28em] uppercase mb-2" style={{ color: C.gold, fontFamily: mono }}>{cat}</div>
                <div className="space-y-1.5">
                  {items.map(([name, url, how], j) => (
                    <a key={j} href={url} target="_blank" rel="noreferrer" className={`group flex items-baseline justify-between gap-3 rounded-xl px-4 py-3 transition-colors ${rowHover}`} style={{ background: C.panel, border: "1px solid " + C.line }}>
                      <div className="text-sm font-bold group-hover:underline">{name} <span style={{ color: C.mute }}>↗</span></div>
                      <div className="text-[11px] text-right shrink-0" style={{ color: C.mute, fontFamily: mono }}>{how}</div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
            <div className="mt-8">
              <div className="text-[11px] font-bold tracking-[0.28em] uppercase mb-2" style={{ color: C.accent, fontFamily: mono }}>Deliberately NOT used — decided once, don't re-litigate</div>
              <div className="space-y-1.5">
                {CUT_LIST.map(([name, why], j) => (
                  <div key={j} className="rounded-xl px-4 py-3" style={{ background: C.panel2, border: "1px dashed " + C.line }}>
                    <div className="text-sm font-bold" style={{ color: C.dim }}>{name}</div>
                    <div className="text-[11px] mt-1 leading-relaxed" style={{ color: C.mute }}>{why}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "stats" && (
          <div className="rise">
            <div className="flex items-baseline justify-between">
              <h2 className="text-2xl lg:text-3xl font-black tracking-tight">Stats</h2>
              <div className="flex gap-2">
                <button onClick={exportData} className="text-[11px] font-bold px-3 py-1.5 rounded-full" style={{ background: C.panel, color: C.dim, border: `1px solid ${C.line}`, fontFamily: mono }}>⤓ export backup</button>
                <button onClick={() => importFileRef.current && importFileRef.current.click()} className="text-[11px] font-bold px-3 py-1.5 rounded-full" style={{ background: C.panel, color: C.dim, border: `1px solid ${C.line}`, fontFamily: mono }}>⤑ import backup</button>
                <input ref={importFileRef} type="file" accept="application/json" onChange={importData} style={{ display: "none" }} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-5">
              {[["days completed", doneCount], ["current streak", streak + "d"], ["week", preStart ? "pre-start" : `${Math.min(wk, TOTAL_WEEKS)}/${TOTAL_WEEKS}`], [now > TARGET ? "days to final sitting" : "days to target", daysToTarget]].map(([l, v], i) => (
                <div key={i} className="rounded-2xl p-5 text-center" style={{ background: C.panel, border: "1px solid " + C.line }}>
                  <div className="text-3xl font-black" style={{ color: C.gold, fontFamily: mono }}>{v}</div>
                  <div className="text-[10px] mt-1.5 uppercase tracking-[0.22em]" style={{ color: C.mute, fontFamily: mono }}>{l}</div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl p-5 mt-2" style={{ background: C.panel, border: "1px solid " + C.line }}>
              <div className="text-[10px] uppercase tracking-[0.22em] mb-3" style={{ color: C.mute, fontFamily: mono }}>the road · phase by phase</div>
              <div className="flex h-3 rounded-full overflow-hidden" style={{ border: "1px solid " + C.line }}>
                {Object.entries(PHASE_META).map(([code, p]) => {
                  const ws = WEEKS.filter((w) => w.code === code);
                  const doneFrac = preStart ? 0 : Math.max(0, Math.min(1, (wk - ws[0].wk + 1) / ws.length));
                  return <div key={code} className="relative" style={{ width: `${(ws.length / TOTAL_WEEKS) * 100}%`, background: p.color + "26" }}>
                    <div className="h-full" style={{ width: `${doneFrac * 100}%`, background: p.color }} />
                  </div>;
                })}
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3">
                {Object.entries(PHASE_META).map(([code, p]) => (
                  <span key={code} className="text-[10px] font-bold" style={{ color: p.color, fontFamily: mono }}>■ {code} {p.name}</span>
                ))}
              </div>
            </div>
            {Object.keys(simLog).length > 0 && (() => {
              const entries = Object.entries(simLog).sort((a, b) => a[0].localeCompare(b[0]));
              const pts = entries.map(([d, v]) => ({ d, a: v.a, delta: v.p != null ? v.p - v.a : null }));
              const maxA = Math.max(...pts.map((p) => p.a), 1);
              const deltas = pts.filter((p) => p.delta != null);
              const maxD = Math.max(...deltas.map((p) => Math.abs(p.delta)), 1);
              const W2 = 560, H2 = 150, PAD = 26, mid = H2 / 2;
              const x = (i) => pts.length === 1 ? W2 / 2 : PAD + (i * (W2 - 2 * PAD)) / (pts.length - 1);
              const yA = (a) => H2 - PAD - (a / maxA) * (H2 - 2 * PAD);
              const path = pts.map((p, i) => `${i ? "L" : "M"}${x(i)},${yA(p.a)}`).join(" ");
              const recentDelta = deltas.length ? deltas.slice(-3).reduce((s, p) => s + Math.abs(p.delta), 0) / Math.min(3, deltas.length) : null;
              return (
                <div className="rounded-2xl p-5 mt-2" style={{ background: C.panel, border: `1px solid ${C.accent}44` }}>
                  <div className="text-[10px] uppercase tracking-[0.22em] mb-3" style={{ color: C.accent, fontFamily: mono }}>sim scores + calibration · the only KPI</div>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {[["sims logged", pts.length], ["latest score", pts[pts.length - 1].a], ["avg |Δ| last 3", recentDelta == null ? "—" : Math.round(recentDelta * 10) / 10]].map(([l, v], i) => (
                      <div key={i} className="rounded-xl py-2.5 text-center" style={{ background: C.panel2 }}>
                        <div className="text-lg font-black" style={{ color: i === 2 && recentDelta != null && recentDelta <= 2 ? C.green : C.gold, fontFamily: mono }}>{v}</div>
                        <div className="text-[9px] uppercase tracking-[0.18em]" style={{ color: C.mute, fontFamily: mono }}>{l}</div>
                      </div>
                    ))}
                  </div>
                  <svg viewBox={`0 0 ${W2} ${H2}`} className="w-full" style={{ background: C.bg, borderRadius: 12, border: `1px solid ${C.line}` }}>
                    {pts.map((p, i) => p.delta != null && (
                      <rect key={"d" + i} x={x(i) - 5} width="10" rx="2"
                        y={p.delta >= 0 ? mid - (Math.abs(p.delta) / maxD) * 30 : mid}
                        height={(Math.abs(p.delta) / maxD) * 30}
                        fill={Math.abs(p.delta) <= 2 ? C.green + "55" : C.accent + "55"} />
                    ))}
                    <line x1={PAD} x2={W2 - PAD} y1={mid} y2={mid} stroke={C.line} strokeWidth="1" strokeDasharray="3 5" />
                    {pts.length > 1 && <path d={path} fill="none" stroke={C.gold} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />}
                    {pts.map((p, i) => <circle key={"c" + i} cx={x(i)} cy={yA(p.a)} r="3.5" fill={C.bg} stroke={C.gold} strokeWidth="2" />)}
                    <text x={PAD} y={12} fontSize="9" fill={C.mute} fontFamily="monospace">actual score (line) · calibration Δ around midline (bars: green = |Δ|≤2)</text>
                  </svg>
                  <div className="text-[11px] mt-2 leading-relaxed" style={{ color: C.mute, fontFamily: mono }}>Overprediction (Δ&gt;0) = your self-grading is too kind — exactly the failure mode the protocol exists to kill. Watch the bars shrink.</div>
                </div>
              );
            })()}
            {Object.keys(liftLog).length > 0 && (() => {
              const names = Object.keys(liftLog).sort((a, b) => liftLog[b].length - liftLog[a].length);
              const sel = selectedLift && liftLog[selectedLift] ? selectedLift : names[0];
              const hist = liftLog[sel] || [];
              const pts = hist.map((s) => ({ d: s.d, e: bestE1RM(s.sets), v: sessionVolume(s.sets), n: s.sets.length }));
              const maxE = Math.max(...pts.map((p) => p.e), 1), minE = Math.min(...pts.map((p) => p.e));
              const maxV = Math.max(...pts.map((p) => p.v), 1);
              const W2 = 560, H2 = 150, PAD = 26;
              const x = (i) => pts.length === 1 ? W2 / 2 : PAD + (i * (W2 - 2 * PAD)) / (pts.length - 1);
              const y = (e) => maxE === minE ? H2 / 2 : H2 - PAD - ((e - minE) * (H2 - 2 * PAD)) / (maxE - minE);
              const path = pts.map((p, i) => `${i ? "L" : "M"}${x(i)},${y(p.e)}`).join(" ");
              const prIdx = pts.reduce((best, p, i) => (p.e >= pts[best].e ? i : best), 0);
              const allTimePR = pts[prIdx];
              const totalSets = hist.reduce((s, ss) => s + ss.sets.length, 0);
              return (
                <div className="rounded-2xl p-5 mt-2" style={{ background: C.panel, border: "1px solid " + C.line }}>
                  <div className="text-[10px] uppercase tracking-[0.22em] mb-3" style={{ color: C.mute, fontFamily: mono }}>lift analytics · tap an exercise</div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {names.map((n) => (
                      <button key={n} onClick={() => setSelectedLift(n)} className="text-[11px] font-bold px-2.5 py-1 rounded-full transition-all" style={{ background: n === sel ? C.gold : C.panel2, color: n === sel ? C.onAccent : C.dim, border: `1px solid ${n === sel ? C.gold : C.line}`, fontFamily: mono }}>{n}</button>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {[["all-time e1RM", allTimePR ? allTimePR.e : "—"], ["sessions", pts.length], ["total sets", totalSets]].map(([l, v], i) => (
                      <div key={i} className="rounded-xl py-2.5 text-center" style={{ background: C.panel2 }}>
                        <div className="text-lg font-black" style={{ color: C.gold, fontFamily: mono }}>{v}</div>
                        <div className="text-[9px] uppercase tracking-[0.18em]" style={{ color: C.mute, fontFamily: mono }}>{l}</div>
                      </div>
                    ))}
                  </div>
                  <svg viewBox={`0 0 ${W2} ${H2}`} className="w-full" style={{ background: C.bg, borderRadius: 12, border: `1px solid ${C.line}` }}>
                    {[0.25, 0.5, 0.75].map((f) => <line key={f} x1={PAD} x2={W2 - PAD} y1={PAD + f * (H2 - 2 * PAD)} y2={PAD + f * (H2 - 2 * PAD)} stroke={C.line} strokeDasharray="3 5" strokeWidth="1" />)}
                    {pts.map((p, i) => (
                      <rect key={"v" + i} x={x(i) - 5} width="10" y={H2 - PAD - (p.v / maxV) * 34} height={(p.v / maxV) * 34} rx="2" fill={meta.color + "40"} />
                    ))}
                    {pts.length > 1 && <path d={path} fill="none" stroke={C.gold} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />}
                    {pts.map((p, i) => (
                      <g key={"p" + i}>
                        <circle cx={x(i)} cy={y(p.e)} r={i === prIdx ? 5 : 3.5} fill={i === prIdx ? C.gold : C.bg} stroke={C.gold} strokeWidth="2" />
                        {i === prIdx && <text x={x(i)} y={y(p.e) - 9} textAnchor="middle" fontSize="9" fontWeight="800" fill={C.gold} fontFamily="monospace">★ {p.e}</text>}
                      </g>
                    ))}
                    <text x={PAD} y={12} fontSize="9" fill={C.mute} fontFamily="monospace">e1RM trend (line) · session volume (bars)</text>
                    {pts.length > 0 && <text x={PAD} y={H2 - 8} fontSize="8" fill={C.mute} fontFamily="monospace">{pts[0].d.slice(5)}</text>}
                    {pts.length > 1 && <text x={W2 - PAD} y={H2 - 8} textAnchor="end" fontSize="8" fill={C.mute} fontFamily="monospace">{pts[pts.length - 1].d.slice(5)}</text>}
                  </svg>
                  <div className="text-[11px] mt-2 leading-relaxed" style={{ color: C.mute, fontFamily: mono }}>e1RM is RPE-adjusted (Epley on reps + reps-in-reserve) — so a 100×8 @ RPE 8 counts what it's truly worth. Log sets from the workout panel on any training day.</div>
                </div>
              );
            })()}
            <div className="rounded-2xl p-5 mt-2 text-sm leading-relaxed" style={{ background: C.panel, border: "1px solid " + C.line, color: C.dim }}>
              Top 100 is ~48/120 — 4–5 <span className="font-bold" style={{ color: C.text }}>completely-proven</span> problems under a hostile grader. You own the content most rivals are still learning; your gap is provability, and it's the most trainable gap there is. This plan spends 120 weeks on exactly that: adversarial grading every sim, a gap log that catches under-justified steps, a calibration delta you drive toward zero. ~32–34 h/wk, recovery protected so it holds for 28 straight months. Aiming at the ceiling only works if your grading is honest — so be brutal with your own proofs and the score follows.
            </div>
          </div>
        )}
      </main>

      {/* ============ WORKOUT SLIDE-IN PANEL ============ */}
      {showWorkout && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setShowWorkout(false)}>
          <div className="absolute inset-0" style={{ background: "rgba(43,38,32,0.35)", backdropFilter: "blur(2px)" }} />
          <div className="relative w-full max-w-md h-full overflow-y-auto rise" style={{ background: C.bg, borderLeft: `1px solid ${C.line}`, boxShadow: "-20px 0 60px rgba(43,38,32,0.25)" }} onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 px-5 py-4 flex items-start justify-between z-10" style={{ background: C.bg, borderBottom: `1px solid ${C.line}`, paddingTop: "calc(1rem + env(safe-area-inset-top))" }}>
              <div>
                <div className="text-[11px] tracking-[0.24em] uppercase font-bold" style={{ color: C.gold, fontFamily: mono }}>Today's workout · 7:00</div>
                <h3 className="text-xl font-black leading-tight mt-0.5">{gym.isGymDay ? gym.day : ""}</h3>
                <div className="text-[11px] mt-0.5" style={{ color: C.dim, fontFamily: mono }}>{gym.isGymDay ? gym.phase : ""}</div>
              </div>
              <button onClick={() => setShowWorkout(false)} className="shrink-0 w-8 h-8 rounded-lg font-bold" style={{ background: C.panel, color: C.dim, border: `1px solid ${C.line}` }}>✕</button>
            </div>
            <div className="px-5 py-4">
              {gym.deload && (
                <div className="rounded-xl p-3 mb-3 text-xs leading-relaxed" style={{ background: C.milestoneBg, border: `1px solid ${C.gold}55`, color: C.ink }}>{WORKOUT_DELOAD_NOTE}</div>
              )}
              <div className="rounded-xl p-3 mb-4 text-xs leading-relaxed" style={{ background: C.panel, border: `1px solid ${C.line}`, color: C.dim }}>
                <span style={{ color: C.text, fontWeight: 700 }}>Warm-up first:</span> ~5 min easy cardio (raise core temp — matters this early), front/back + side leg swings, arm swings, 1× cable external rotation each side. Then pyramid warm-up sets into your first working set.
              </div>
              {gym.isGymDay && gym.exercises.map((ex, i) => {
                const [name, wu, ws, reps, rpeT, restStr, note] = ex;
                const open = expandedEx === i;
                const logged = todaySets(name);
                const wDone = warmupOnly(logged), sDone = workingOnly(logged);
                const wuN = parseInt(wu) || 0, wsN = parseInt(ws) || 1;
                const last = lastSession(name);
                const isPR = prFlash === name;
                const doneEx = sDone.length >= wsN;
                return (
                  <div key={i} className="rounded-xl mb-2 overflow-hidden transition-all" style={{ background: C.panel, border: `1.5px solid ${isPR ? C.gold : open ? meta.color + "88" : doneEx ? C.green + "66" : C.line}`, boxShadow: isPR ? `0 0 0 4px ${C.gold}33` : "none" }}>
                    <button className="w-full text-left p-3.5" onClick={() => { setExpandedEx(open ? null : i); setEntry({ w: "", r: "", rpe: "" }); }}>
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="text-sm font-black" style={{ color: doneEx ? C.green : C.text }}>{doneEx ? "✓ " : ""}{i + 1}. {name}{isPR && <span className="ml-2 text-[10px] font-black px-1.5 py-0.5 rounded-full" style={{ background: C.gold, color: C.onAccent, fontFamily: mono }}>★ PR</span>}</div>
                        <div className="text-[11px] font-bold shrink-0" style={{ color: C.gold, fontFamily: mono }}>{sDone.length}/{ws}{wuN ? ` · wu ${Math.min(wDone.length, wuN)}/${wu}` : ""} ▾</div>
                      </div>
                      <div className="flex items-center gap-1 mt-1.5">
                        {Array.from({ length: wuN }).map((_, k) => <span key={"w" + k} className="h-1.5 w-3 rounded-full" style={{ background: k < wDone.length ? C.mute : C.line }} />)}
                        {wuN > 0 && <span className="w-1" />}
                        {Array.from({ length: wsN }).map((_, k) => <span key={"s" + k} className="h-1.5 w-5 rounded-full" style={{ background: k < sDone.length ? C.green : C.line }} />)}
                        <span className="text-[10px] ml-2" style={{ color: C.mute, fontFamily: mono }}>{ws}×{reps} @ RPE {rpeT} · rest {restStr}</span>
                      </div>
                      {!open && note && <div className="text-xs mt-1.5 leading-relaxed" style={{ color: C.dim }}>{note}</div>}
                    </button>
                    {open && (
                      <div className="px-3.5 pb-3.5">
                        {last && (
                          <div className="text-[11px] rounded-lg px-2.5 py-1.5 mb-2" style={{ background: C.panel2, color: C.dim, fontFamily: mono }}>
                            last working ({last.d.slice(5)}): {workingOnly(last.sets).map(([a, b2, c2]) => `${a}×${b2}@${c2}`).join("  ") || "—"} · e1RM {bestE1RM(last.sets) || "—"}
                          </div>
                        )}
                        {logged.map(([a, b2, c2, kd], si) => (
                          <div key={si} className="flex items-center justify-between text-xs rounded-lg px-2.5 py-1.5 mb-1" style={{ background: (kd || "S") === "W" ? C.panel2 : C.doneBg, color: (kd || "S") === "W" ? C.mute : C.ink, fontFamily: mono }}>
                            <span>{(kd || "S") === "W" ? `wu ${warmupOnly(logged.slice(0, si + 1)).length}` : `set ${workingOnly(logged.slice(0, si + 1)).length}`}: <b>{a}</b> × <b>{b2}</b> @ RPE {c2}{(kd || "S") === "S" ? ` · e1RM ${e1rm(a, b2, c2)}` : ""}</span>
                            <button onClick={() => deleteSet(name, si)} style={{ color: C.accent }} className="font-bold px-1">×</button>
                          </div>
                        ))}
                        <div className="flex gap-1.5 mt-2">
                          {[["w", "weight"], ["r", "reps"], ["rpe", "RPE"]].map(([k, ph]) => (
                            <input key={k} inputMode="decimal" value={entry[k]} onChange={(e) => setEntry({ ...entry, [k]: e.target.value })} placeholder={ph}
                              className="min-w-0 flex-1 rounded-lg px-2 py-2 text-sm font-bold text-center outline-none"
                              style={{ background: C.bg, border: `1.5px solid ${C.line}`, color: C.ink, fontFamily: mono }} />
                          ))}
                          {wuN > 0 && <button onClick={() => logSet(name, restStr, "W")} className="shrink-0 rounded-lg px-2.5 font-bold text-xs" style={{ background: C.panel2, color: C.dim, border: `1px solid ${C.line}` }}>wu</button>}
                          <button onClick={() => logSet(name, restStr, "S")} className="shrink-0 rounded-lg px-3 font-black text-sm" style={{ background: meta.color, color: readableOn(meta.color) }}>log</button>
                        </div>
                        {note && <div className="text-xs mt-2 leading-relaxed" style={{ color: C.dim }}>{note}</div>}
                      </div>
                    )}
                  </div>
                );
              })}
              {gym.isGymDay && (() => {
                const all = gym.exercises.map((ex) => todaySets(ex[0]));
                const vol = all.reduce((s, sets) => s + sessionVolume(sets), 0);
                const wN = all.reduce((s, sets) => s + warmupOnly(sets).length, 0);
                const sN = all.reduce((s, sets) => s + workingOnly(sets).length, 0);
                return (wN + sN) > 0 ? (
                  <div className="rounded-xl p-3 mt-1 text-center text-xs font-bold" style={{ background: C.panel2, color: C.dim, fontFamily: mono }}>
                    session: {wN} warm-up + {sN} working sets · {Math.round(vol).toLocaleString()} total volume (all sets)
                  </div>
                ) : null;
              })()}
              <div className="text-[11px] leading-relaxed mt-3 pt-3 pb-20" style={{ color: C.mute, borderTop: `1px solid ${C.line}`, fontFamily: mono }}>
                Exercises + progression from Nippard Ultimate PPL (Push/Pull only). Log every working set — the app remembers, ghosts last session, computes RPE-adjusted e1RM, flags PRs, and auto-starts the rest clock. Hit the top of the rep range on all sets → add weight next time.
              </div>
            </div>
            {rest && (
              <div className="sticky bottom-0 px-5 py-3 flex items-center gap-3" style={{ background: rest.left === 0 ? C.doneBg : C.panel2, borderTop: `1px solid ${C.line}`, paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}>
                <svg width="44" height="44" viewBox="0 0 44 44" className="shrink-0">
                  <circle cx="22" cy="22" r="18" fill="none" stroke={C.line} strokeWidth="4" />
                  <circle cx="22" cy="22" r="18" fill="none" stroke={rest.left === 0 ? C.green : C.gold} strokeWidth="4" strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 18} strokeDashoffset={2 * Math.PI * 18 * (rest.left / rest.total)} transform="rotate(-90 22 22)" style={{ transition: "stroke-dashoffset 1s linear" }} />
                  <text x="22" y="26" textAnchor="middle" fontSize="11" fontWeight="800" fill={C.ink} fontFamily="monospace">{rest.left > 0 ? `${Math.floor(rest.left / 60)}:${String(rest.left % 60).padStart(2, "0")}` : "GO"}</text>
                </svg>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black" style={{ color: rest.left === 0 ? C.green : C.text }}>{rest.left === 0 ? "Rest over — next set" : "Resting"}</div>
                  <div className="text-[11px] truncate" style={{ color: C.mute, fontFamily: mono }}>{rest.label}</div>
                </div>
                <button onClick={() => setRest({ ...rest, left: rest.left + 30, total: Math.max(rest.total, rest.left + 30) })} className="shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-bold" style={{ background: C.bg, border: `1px solid ${C.line}`, color: C.dim }}>+30s</button>
                <button onClick={() => setRest(null)} className="shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-bold" style={{ background: C.bg, border: `1px solid ${C.line}`, color: C.accent }}>skip</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============ MOBILE BOTTOM NAV ============ */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 flex items-stretch justify-around" style={{ background: C.sidebar, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderTop: "1px solid " + C.line, paddingBottom: "env(safe-area-inset-bottom)" }}>
        {NAV.map(([id, label]) => {
          const on = tab === id;
          return (
            <button key={id} onClick={() => { setTab(id); window.scrollTo({ top: 0, behavior: "smooth" }); }} aria-label={label} aria-current={on ? "page" : undefined} className="flex-1 flex flex-col items-center justify-center gap-1 pt-2 pb-2 transition-colors active:scale-95" style={{ color: on ? C.gold : C.mute }}>
              <span aria-hidden="true" style={{ display: "flex", transition: "transform .2s", transform: on ? "translateY(-1px)" : "none" }}>{NAV_GLYPH[id]}</span>
              <span className="text-[10px] font-bold tracking-[0.1em] uppercase" style={{ fontFamily: mono }}>{label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
