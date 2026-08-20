/* Cross-device sync. The sync code is the whole security model — it doubles as the
   lookup key server-side, so anyone who knows it can read/write that blob. Fine for a
   single-user personal tracker; keep the code private the way you'd keep a share link
   private. No-ops silently (never throws into the caller) so the app works exactly as
   before — local-only — until a KV store is connected on the Vercel project. */

const CODE_KEY = "sync-code";
const ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789"; // no 0/O/1/l/i ambiguity

function randomCode(len = 10) {
  const out = new Uint32Array(len);
  (window.crypto || window.msCrypto).getRandomValues(out);
  let s = "";
  for (let i = 0; i < len; i++) s += ALPHABET[out[i] % ALPHABET.length];
  return s;
}

export function getSyncCode() {
  let c = localStorage.getItem(CODE_KEY);
  if (!c) { c = randomCode(); localStorage.setItem(CODE_KEY, c); }
  return c;
}

export function setSyncCode(code) {
  const clean = (code || "").trim().toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!clean) return null;
  localStorage.setItem(CODE_KEY, clean);
  return clean;
}

export async function pullCloud(code) {
  try {
    const r = await fetch(`/api/state?code=${encodeURIComponent(code)}`);
    if (!r.ok) return null;
    const j = await r.json();
    return j && j.updatedAt ? j : null;
  } catch (e) { return null; }
}

export async function pushCloud(code, payload) {
  try {
    await fetch(`/api/state?code=${encodeURIComponent(code)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (e) {}
}
