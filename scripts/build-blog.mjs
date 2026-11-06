// scripts/build-blog.mjs — merges content/blog/*.mjs (+ catalog-driven brand/flavor posts), validates, and writes
// src/data/blog-posts.json. Images come from docs/blog-images.json (written by scripts/images-blog.mjs) when present.
//   node scripts/build-blog.mjs [--strict]     (--strict fails on any warning)
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const strict = process.argv.includes("--strict");
const TARGET = 200;
const CONTENT = path.resolve("content/blog");
const products = JSON.parse(fs.readFileSync("src/data/products.json", "utf8"));
const productSlugs = new Set(products.map((p) => `${p.category}/${p.slug}`));
const SHOP_CATS = new Set(["vape-juice", "coils-pods", "disposables", "vape-kits", "vaporizers", "nic-pouches", "nixodine"]);
const STATIC_PATHS = new Set(["/", "/shop/", "/blog/", "/about/", "/contact/", "/faq/", "/help/", "/shipping/", "/refunds/", "/privacy/", "/terms/", "/pact-act/", "/fda-disclaimer/", "/california-privacy/", "/wholesale/", "/cart/", "/checkout/", "/search/"]);

// Compliance: never imply health benefits, safety, cessation or guaranteed outcomes.
const BANNED = [/\bsafe\b/i, /\bsafer\b/i, /\bsafely\b/i, /\bhealthy\b/i, /\bhealthier\b/i, /non-toxic/i, /guaranteed? success/i, /therapeutic/i, /quit smoking/i, /stop smoking/i, /smoking cessation/i, /\bcure[sd]?\b/i, /harmless/i, /risk-free/i, /harm reduction/i, /better for you/i, /approved by the fda/i, /fda[- ]approved/i, /100% authentic/i, /lab[- ]tested/i, /laboratory/i, /\bpatented\b/i, /pharmaceutical/i];

const posts = [];
const warnings = [];
const errors = [];

for (const f of fs.readdirSync(CONTENT).filter((x) => x.endsWith(".mjs")).sort()) {
  const mod = await import(pathToFileURL(path.join(CONTENT, f)).href);
  const list = typeof mod.default === "function" ? mod.default({ products }) : mod.default;
  for (const p of list) posts.push({ ...p, _file: f });
}

const slugify = (s) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const words = (s) => (s.match(/\b[\w'’-]+\b/g) || []).length;
const seen = new Set();
const out = [];

for (const p of posts) {
  const where = `${p._file}:${p.slug || p.title}`;
  const err = (m) => errors.push(`${where} — ${m}`);
  const warn = (m) => warnings.push(`${where} — ${m}`);
  if (!p.slug || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug)) { err("bad slug"); continue; }
  if (seen.has(p.slug)) { err("duplicate slug"); continue; }
  seen.add(p.slug);
  if (!p.title || p.title.length > 72) warn(`title length ${p.title?.length}`);
  if (!p.summary || p.summary.length < 100 || p.summary.length > 160) warn(`summary length ${p.summary?.length} (aim 110–158)`);
  const w = words(p.body);
  if (w < 200) warn(`only ${w} words`);
  if (!Array.isArray(p.faq) || p.faq.length < 2) warn("needs ≥2 FAQ");
  if (!p.shop?.length || p.shop.some((c) => !SHOP_CATS.has(c))) err("invalid shop category");
  if (!p.category) err("missing category");
  // internal links
  const links = [...p.body.matchAll(/\]\((\/[^)]*)\)/g)].map((m) => m[1]);
  if (links.length < 2) warn(`only ${links.length} internal links`);
  for (const l of links) {
    const clean = l.split("#")[0];
    const m = clean.match(/^\/shop\/([^/]+)\/([^/]+)\/$/);
    const b = clean.match(/^\/blog\/([^/]+)\/$/);
    if (m) { if (!productSlugs.has(`${m[1]}/${m[2]}`)) err(`broken product link ${l}`); }
    else if (clean.match(/^\/shop\/([^/]+)\/$/)) { if (!SHOP_CATS.has(clean.split("/")[2])) err(`broken category link ${l}`); }
    else if (b) { /* checked after all slugs known */ }
    else if (!STATIC_PATHS.has(clean)) err(`unknown internal link ${l}`);
  }
  // banned terms
  const text = [p.title, p.summary, p.body, ...(p.faq || []).flat()].join("\n");
  for (const re of BANNED) { const m = text.match(re); if (m) err(`banned term "${m[0]}"`); }
  const faq = (p.faq || []).map((x) => (Array.isArray(x) ? { q: x[0], a: x[1] } : x));
  out.push({
    slug: p.slug, title: p.title, summary: p.summary, category: p.category, categorySlug: slugify(p.category),
    tags: (p.tags || []).map((t) => t.toLowerCase()), shop: p.shop, keywords: p.keywords || [],
    body: p.body.trim(), faq, readMinutes: Math.max(2, Math.ceil(w / 200)), words: w, themes: p.themes || [],
  });
}
for (const p of out) for (const m of p.body.matchAll(/\]\(\/blog\/([^/)]+)\/\)/g)) if (!seen.has(m[1])) errors.push(`${p.slug} — broken blog link /blog/${m[1]}/`);

// Keep exactly TARGET posts: hand-written first, then generated, in file order.
const GEN = path.resolve("content/generated/blog");
let applied = 0;
for (const p of out) {
  const f = path.join(GEN, p.slug + ".json");
  if (!fs.existsSync(f)) continue;
  const g = JSON.parse(fs.readFileSync(f, "utf8"));
  if (!g.ok || g.mock) continue; // only validated, non-mock AI output replaces the hand-written draft
  p.body = g.body; p.words = g.words; p.readMinutes = Math.max(2, Math.ceil(g.words / 200));
  if (g.faq && g.faq.length >= 3) p.faq = g.faq;
  applied++;
}
if (applied) console.log("applied " + applied + " AI-expanded posts");
const final = out.slice(0, TARGET);
if (out.length < TARGET) errors.push(`only ${out.length} posts, need ${TARGET}`);

// Spread publication dates 5 Jan → 4 Nov 2026 (editable later); newest-first display is handled by the loader.
const start = Date.parse("2026-01-05"), end = Date.parse("2026-11-04");
final.forEach((p, i) => { p.date = new Date(start + ((end - start) * i) / Math.max(1, final.length - 1)).toISOString().slice(0, 10); });

const imgFile = path.resolve("docs/blog-images.json");
const imgMap = fs.existsSync(imgFile) ? JSON.parse(fs.readFileSync(imgFile, "utf8")) : {};
for (const p of final) p.images = imgMap[p.slug] || [];

fs.mkdirSync("src/data", { recursive: true });
fs.writeFileSync("src/data/blog-posts.json", JSON.stringify(final));
const avg = Math.round(final.reduce((s, p) => s + p.words, 0) / Math.max(1, final.length));
const cats = {};
final.forEach((p) => (cats[p.category] = (cats[p.category] || 0) + 1));
console.log(`posts: ${final.length} (avg ${avg} words, min ${Math.min(...final.map((p) => p.words))}); with images: ${final.filter((p) => p.images.length === 4).length}`);
console.log("categories:", JSON.stringify(cats));
if (warnings.length) console.log(`\nWARNINGS (${warnings.length}):\n` + warnings.slice(0, 60).join("\n"));
if (errors.length) { console.log(`\nERRORS (${errors.length}):\n` + errors.slice(0, 80).join("\n")); process.exit(1); }
if (strict && warnings.length) process.exit(1);
