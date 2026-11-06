// scripts/lib/unsplash.mjs — Unsplash search with a persistent cache + rate-limit awareness (demo tier = 50 req/hour).
// The key is read from the image-sourcing skill's config at runtime and never printed or written anywhere.
import fs from "node:fs";
import path from "node:path";

const KEY_FILE = "C:/Users/GLOBAL STORE/.claude/skills/image-sourcing/config/api_keys.env";
export const POOL_FILE = path.resolve("docs/_unsplash-pool.json");

function loadKey() {
  const txt = fs.readFileSync(KEY_FILE, "utf8");
  const m = txt.match(/^UNSPLASH_ACCESS_KEY=(.+)$/m);
  if (!m || !m[1].trim()) throw new Error("UNSPLASH_ACCESS_KEY missing in image-sourcing config");
  return m[1].trim();
}

export function loadPool() {
  try { return JSON.parse(fs.readFileSync(POOL_FILE, "utf8")); } catch { return { queries: {}, photos: {} }; }
}
export function savePool(pool) {
  fs.mkdirSync(path.dirname(POOL_FILE), { recursive: true });
  fs.writeFileSync(POOL_FILE, JSON.stringify(pool));
}

let remaining = null;
export const apiRemaining = () => remaining;

export async function search(pool, query, { page = 1, perPage = 30, orientation = "landscape" } = {}) {
  const ck = `${query}|${page}|${orientation}`;
  if (pool.queries[ck]) return { cached: true, ids: pool.queries[ck] };
  if (remaining !== null && remaining <= 2) return { stopped: true };
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&orientation=${orientation}&content_filter=high`;
  const res = await fetch(url, { headers: { Authorization: `Client-ID ${loadKey()}`, "Accept-Version": "v1" } });
  remaining = Number(res.headers.get("x-ratelimit-remaining") ?? remaining);
  if (res.status === 403 || res.status === 429) { remaining = 0; return { stopped: true }; }
  if (!res.ok) throw new Error(`Unsplash ${res.status}`);
  const j = await res.json();
  const ids = [];
  for (const p of j.results || []) {
    ids.push(p.id);
    if (!pool.photos[p.id]) {
      pool.photos[p.id] = {
        id: p.id, w: p.width, h: p.height, color: p.color,
        alt: p.alt_description || p.description || "",
        tags: (p.tags || []).map((t) => t.title).slice(0, 8),
        raw: p.urls?.raw, page: p.links?.html, dl: p.links?.download_location,
        by: p.user?.name, byUrl: p.user?.links?.html,
      };
    }
  }
  pool.queries[ck] = ids;
  return { cached: false, ids, remaining };
}

export async function trackDownload(photo) {
  if (!photo.dl) return;
  try { await fetch(photo.dl, { headers: { Authorization: `Client-ID ${loadKey()}` } }); } catch { /* non-fatal */ }
}

export async function downloadRaw(photo, { width = 1600, quality = 78 } = {}) {
  const u = new URL(photo.raw);
  u.searchParams.set("w", String(width));
  u.searchParams.set("q", String(quality));
  u.searchParams.set("fm", "jpg");
  u.searchParams.set("fit", "max");
  const res = await fetch(u, { signal: AbortSignal.timeout(40000) });
  if (!res.ok) throw new Error(`image HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}
