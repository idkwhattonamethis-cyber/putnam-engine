/* Serverless endpoint backing cross-device sync. Reads/writes one JSON blob per sync
   code via the Upstash Redis REST API (the env vars Vercel injects when a KV/Redis
   store is connected to this project: Storage tab -> Create Database -> Connect).
   Not configured yet? Every call 503s and the client just stays local-only. */

async function kvCommand(base, token, command) {
  const r = await fetch(base, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
  });
  return r.json();
}

export default async function handler(req, res) {
  const code = (req.query.code || "").toString().trim().toLowerCase();
  if (!/^[a-z0-9]{4,40}$/.test(code)) {
    res.status(400).json({ error: "bad code" });
    return;
  }

  const base = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!base || !token) {
    res.status(503).json({ error: "sync not configured — connect a KV/Redis store to this project" });
    return;
  }

  const key = `putnam-sync:${code}`;

  if (req.method === "GET") {
    try {
      const j = await kvCommand(base, token, ["GET", key]);
      let data = null;
      if (j && j.result) { try { data = JSON.parse(j.result); } catch (e) {} }
      res.status(200).json(data || {});
    } catch (e) { res.status(502).json({ error: "kv unreachable" }); }
    return;
  }

  if (req.method === "POST") {
    let body = req.body;
    if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }
    if (!body || typeof body !== "object") { res.status(400).json({ error: "bad body" }); return; }
    body.updatedAt = Date.now();
    try {
      await kvCommand(base, token, ["SET", key, JSON.stringify(body)]);
      res.status(200).json({ ok: true, updatedAt: body.updatedAt });
    } catch (e) { res.status(502).json({ error: "kv unreachable" }); }
    return;
  }

  res.status(405).json({ error: "method not allowed" });
}
