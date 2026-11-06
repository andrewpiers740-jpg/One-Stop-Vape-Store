// scripts/unsplash-track.mjs — fires Unsplash's "download" tracking event for every photo used on the site
// (an API-guideline requirement when photos are used). Resumable and rate-limit aware: the demo tier allows only
// 50 requests/hour, so on that tier run it repeatedly, or apply for a production key (5,000/hour) and run once.
//   node scripts/unsplash-track.mjs
import fs from "node:fs";
import { loadPool } from "./lib/unsplash.mjs";

const KEY_FILE = "C:/Users/GLOBAL STORE/.claude/skills/image-sourcing/config/api_keys.env";
const key = fs.readFileSync(KEY_FILE, "utf8").match(/^UNSPLASH_ACCESS_KEY=(.+)$/m)[1].trim();
const DONE = "docs/_unsplash-tracked.json";
const done = new Set(fs.existsSync(DONE) ? JSON.parse(fs.readFileSync(DONE, "utf8")) : []);
const pool = loadPool();
const ids = [...new Set(Object.values(JSON.parse(fs.readFileSync("src/data/image-credits.json", "utf8"))).map((c) => c.id))];
const todo = ids.filter((id) => !done.has(id) && pool.photos[id]?.dl);
console.log(`${ids.length} used photos, ${done.size} already tracked, ${todo.length} to go`);
for (const id of todo) {
  const res = await fetch(pool.photos[id].dl, { headers: { Authorization: `Client-ID ${key}` } });
  if (res.status === 403 || res.status === 429) { console.log("rate limit reached — re-run later (or use a production key)"); break; }
  if (res.ok) { done.add(id); fs.writeFileSync(DONE, JSON.stringify([...done])); }
}
console.log(`tracked ${done.size}/${ids.length}`);
