/* Color palettes (light/dark) + contrast helper + fonts + notification beep. */

export const LIGHT = {
  bg: "#F5EFE4", panel: "#FBF7EF", panel2: "#F1E9DA", line: "#E0D5C1",
  text: "#2B2620", dim: "#6E6455", mute: "#A2957F",
  gold: "#B0722A", green: "#3F7A56", ink: "#2B2620", accent: "#8C3B2E",
  onAccent: "#FBF7EF", goldGrad2: "#C98A3E", doneBg: "#EAF1EA", milestoneBg: "#F6EBD3",
  sidebar: "rgba(251,247,239,0.72)", scrollThumb: "#D8C9AE",
};
export const DARK = {
  bg: "#17130F", panel: "#211C17", panel2: "#2A241D", line: "#392F26",
  text: "#EFE7D8", dim: "#B3A794", mute: "#867B69",
  gold: "#E0A94F", green: "#63B084", ink: "#EFE7D8", accent: "#DE7159",
  onAccent: "#1B140D", goldGrad2: "#F0BC63", doneBg: "#1C2A20", milestoneBg: "#2C2416",
  sidebar: "rgba(23,19,15,0.74)", scrollThumb: "#4A3E31",
};
export function readableOn(hex) {
  const h = (hex || "").replace("#", "");
  if (h.length < 6) return "#FBF7EF";
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.62 ? "#1B140D" : "#FBF7EF";
}
export const mono = "'IBM Plex Mono', ui-monospace, Menlo, monospace";
export function beep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.18].forEach((t, i) => { const o = ctx.createOscillator(), g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.frequency.value = i ? 1320 : 880; g.gain.setValueAtTime(0.12, ctx.currentTime + t); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.15); o.start(ctx.currentTime + t); o.stop(ctx.currentTime + t + 0.16); });
  } catch (e) {}
}
