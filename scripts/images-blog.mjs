// scripts/images-blog.mjs — 4 images per blog post (thumbnail/hero 16:9 + 3 inline 3:2), topic-matched from the Unsplash
// pool, never reusing a photo. Writes public/images/blog/<slug>-1..4.webp, docs/blog-images.json and credits.
//   node scripts/images-blog.mjs            (resumable: existing files are reused)
import fs from "node:fs";
import path from "node:path";
import { loadPool, downloadRaw, trackDownload } from "./lib/unsplash.mjs";
import { processTo } from "./lib/imageProc.mjs";

const pool = loadPool();
const posts = JSON.parse(fs.readFileSync("src/data/blog-posts.json", "utf8"));
const curated = fs.existsSync("docs/images-manifest-curated.json") ? JSON.parse(fs.readFileSync("docs/images-manifest-curated.json", "utf8")) : [];
const used = new Set(curated.map((m) => m.unsplash));
// --fix-affected: keep earlier picks for posts whose category mapping was already right; re-source the rest.
const FIX = process.argv.includes("--fix-affected");
const AFFECTED = new Set(["payments-and-crypto", "shipping-and-orders", "compliance-and-legal", "troubleshooting-and-care", "about-and-business"]);
const prevManifest = fs.existsSync("docs/images-manifest-blog.json") ? JSON.parse(fs.readFileSync("docs/images-manifest-blog.json", "utf8")) : [];
const prevBySlot = new Map(prevManifest.map((m) => [m.file, m]));

const T = {
  device: ["vape", "e-cigarette", "vaping device"],
  smoke: ["blue smoke black background", "smoke abstract"],
  neon: ["neon blue light dark"],
  fruit: ["colorful fruit slices", "mixed berries", "citrus fruit", "tropical fruit", "watermelon", "blueberries", "grapes", "mango"],
  mint: ["mint leaves"], ice: ["ice cubes"], coffee: ["coffee beans"], dessert: ["dessert sweets", "candy colorful"],
  tech: ["technology circuit board", "battery charging usb", "electronics macro", "metal wire coil"],
  ship: ["shipping box package", "delivery courier", "warehouse shelves"],
  crypto: ["bitcoin", "ethereum crypto"], pay: ["smartphone payment", "credit card payment"], giftcard: ["gift card"],
  legal: ["law gavel legal", "identity card", "paperwork documents desk"],
  city: ["city night lights", "friends cafe"], desert: ["phoenix arizona", "desert sunset"],
  store: ["storage organizer box", "retail store shelves"], support: ["customer service headset", "laptop shopping online"],
};
const FALLBACK = ["smoke", "neon", "city", "tech", "store", "desert", "support", "device"];
const themeIds = (name) => {
  const ids = [];
  for (const q of T[name]) for (const k of Object.keys(pool.queries)) if (k.startsWith(q + "|")) ids.push(...pool.queries[k]);
  return [...new Set(ids)];
};

function themesFor(p) {
  const s = p.slug;
  const flavor = p.tags.find((t) => !["flavor", "disposables", "vape-juice", "vape-kits", "nixodine", "nic-pouches", "coils-pods", "vaporizers"].includes(t));
  switch (p.categorySlug) {
    case "flavor-guides":
      if (/ice/.test(s)) return ["ice", "fruit", "device", "fruit"];
      if (/mint|menthol/.test(s)) return ["mint", "ice", "fruit", "device"];
      if (/vanilla|cream|cola|coconut|tobacco/.test(s)) return ["dessert", "coffee", "fruit", "device"];
      return ["fruit", "fruit", "ice", "device"];
    case "payments-and-crypto":
      return /bitcoin|usdt|usdc|ethereum|bnb|solana|crypto|network|wallet|exchange|qr|fees/.test(s) ? ["crypto", "pay", "crypto", "support"] : ["pay", "crypto", "support", "store"];
    case "gift-card-payments": return ["giftcard", "pay", "giftcard", "support"];
    case "shipping-and-orders": return /payment/.test(s) ? ["pay", "support", "ship", "store"] : ["ship", "ship", "support", "store"];
    case "compliance-and-legal": return ["legal", "legal", "city", "store"];
    case "how-vaping-works": return /flavor|ice|cooling|liquid|steep/.test(s) ? ["fruit", "device", "smoke", "tech"] : ["tech", "device", "smoke", "neon"];
    case "troubleshooting-and-care": return ["tech", "device", "store", "smoke"];
    case "nicotine-pouches": return ["mint", "store", "fruit", "ice"];
    case "nixodine": return ["neon", "smoke", "device", "tech"];
    case "about-and-business": return ["store", "desert", "support", "city"];
    case "brand-guides": return ["device", "store", "smoke", "device"];
    default: return ["device", "tech", "fruit", "store"];
  }
}

const cursors = {};
function take(theme) {
  const ids = (cursors[theme] ||= themeIds(theme));
  while (ids.length) {
    const id = ids.shift();
    if (!used.has(id)) { used.add(id); return id; }
  }
  return null;
}
function pick(theme) {
  let id = take(theme);
  if (id) return { id, matched: true };
  for (const f of FALLBACK) { id = take(f); if (id) return { id, matched: false }; }
  for (const id2 of Object.keys(pool.photos)) if (!used.has(id2)) { used.add(id2); return { id: id2, matched: false }; }
  throw new Error("pool exhausted");
}

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");
const altFor = (p, photo, theme) => {
  const base = cap(photo.alt || "").replace(/\.$/, "");
  const ctx = { crypto: "cryptocurrency", pay: "payments", giftcard: "gift cards", ship: "shipping", legal: "rules and compliance", tech: "vape hardware", device: "vaping", fruit: "flavor", mint: "mint flavor", ice: "cooling flavors" }[theme] || "vaping";
  return base ? `${base} — ${ctx} article image` : `${p.title} — ${ctx} article image`;
};

const out = {};
const credits = {};
const manifest = [];
let matched = 0, total = 0;
const jobs = [];
const keepPosts = new Set();
if (FIX) {
  for (const p of posts) {
    if (AFFECTED.has(p.categorySlug)) continue;
    keepPosts.add(p.slug);
    for (let i = 0; i < 4; i++) {
      const pv = prevBySlot.get("/images/blog/" + p.slug + "-" + (i + 1) + ".webp");
      if (pv && pv.unsplash) used.add(pv.unsplash);
    }
  }
}
for (const p of posts) {
  const themes = themesFor(p);
  out[p.slug] = [];
  for (let i = 0; i < 4; i++) {
    if (keepPosts.has(p.slug)) {
      const pv = prevBySlot.get("/images/blog/" + p.slug + "-" + (i + 1) + ".webp");
      total++; if (pv.topicMatched) matched++;
      jobs.push({ p, i, id: pv.unsplash, theme: pv.theme, m: pv.topicMatched, keep: true });
      continue;
    }
    const { id, matched: m } = pick(themes[i]);
    total++; if (m) matched++;
    jobs.push({ p, i, id, theme: themes[i], m });
  }
}

let idx = 0, done = 0;
async function worker() {
  while (idx < jobs.length) {
    const j = jobs[idx++];
    const photo = pool.photos[j.id];
    const file = `public/images/blog/${j.p.slug}-${j.i + 1}.webp`;
    const hero = j.i === 0;
    const w = hero ? 1280 : 1200, h = hero ? 720 : 800;
    try {
      if (j.keep ? !fs.existsSync(file) : true) {
        const buf = await downloadRaw(photo, { width: 1600, quality: 78 });
        await processTo(buf, path.resolve(file), { width: w, height: h, budgetKB: hero ? 85 : 80 });
        await trackDownload(photo);
      }
      j.ok = true;
    } catch (e) {
      j.ok = false; j.err = String(e.message || e);
    }
    if (++done % 100 === 0) console.log(`progress ${done}/${jobs.length}`);
  }
}
await Promise.all(Array.from({ length: 6 }, worker));

let failed = 0;
for (const j of jobs) {
  const photo = pool.photos[j.id];
  const src = `/images/blog/${j.p.slug}-${j.i + 1}.webp`;
  if (!j.ok) { failed++; manifest.push({ file: src, error: j.err }); continue; }
  const hero = j.i === 0;
  out[j.p.slug][j.i] = { src, alt: altFor(j.p, photo, j.theme), w: hero ? 1280 : 1200, h: hero ? 720 : 800, by: photo.by, byUrl: photo.byUrl, page: photo.page };
  credits[src] = { id: j.id, by: photo.by, byUrl: photo.byUrl, page: photo.page };
  manifest.push({ file: src, unsplash: j.id, theme: j.theme, topicMatched: j.m, by: photo.by });
}
fs.writeFileSync("docs/blog-images.json", JSON.stringify(out));
fs.writeFileSync("docs/images-manifest-blog.json", JSON.stringify(manifest));
const credFile = path.resolve("src/data/image-credits.json");
const existing = fs.existsSync(credFile) ? JSON.parse(fs.readFileSync(credFile, "utf8")) : {};
fs.writeFileSync(credFile, JSON.stringify({ ...existing, ...credits }));
console.log(`DONE images=${jobs.length - failed}/${jobs.length} failed=${failed} topic-matched=${matched}/${total} (${Math.round((100 * matched) / total)}%) unique photos=${used.size}`);
