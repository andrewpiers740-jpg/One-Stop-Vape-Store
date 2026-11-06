// scripts/images-pool.mjs — fills docs/_unsplash-pool.json from scripts/image-queries.json (resumable, rate-limit aware).
import fs from "node:fs";
import { loadPool, savePool, search, apiRemaining } from "./lib/unsplash.mjs";

const queries = JSON.parse(fs.readFileSync("scripts/image-queries.json", "utf8"));
const pool = loadPool();
let calls = 0;
for (const q of queries) {
  const r = await search(pool, q.query, { page: q.page || 1, orientation: q.orientation || "landscape" });
  if (r.stopped) { console.log("rate limit reached — stopping; re-run later to continue"); break; }
  if (!r.cached) { calls++; savePool(pool); }
  console.log(`${r.cached ? "cache" : "api  "} ${String(q.query).padEnd(34)} p${q.page || 1} -> ${r.ids?.length ?? 0} (remaining ${apiRemaining()})`);
}
savePool(pool);
console.log(`pool: ${Object.keys(pool.photos).length} unique photos from ${Object.keys(pool.queries).length} queries; api calls this run ${calls}`);
