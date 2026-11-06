// scripts/apply-long.mjs — validates hand-written long-form blog posts in content/long/*.mjs (1,500+ words each) and writes them to
// content/generated/blog/<slug>.json, which scripts/build-blog.mjs applies over the short draft. No external API is used.
// Each file exports default { "<slug>": { body: "markdown", faq: [["q","a"], ...] } }.
//   node scripts/apply-long.mjs
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { validate, wordCount } from "./lib/contentRules.mjs";

const products = JSON.parse(fs.readFileSync("src/data/products.json", "utf8"));
const posts = JSON.parse(fs.readFileSync("src/data/blog-posts.json", "utf8"));
const ctx = { productSlugs: new Set(products.map((p) => `${p.category}/${p.slug}`)), blogSlugs: new Set(posts.map((p) => p.slug)) };
const known = new Set(posts.map((p) => p.slug));
const OUT = "content/generated/blog";
fs.mkdirSync(OUT, { recursive: true });
const dir = "content/long";
let ok = 0, bad = 0, total = 0;
// files named *-extra.mjs export { slug: "markdown" } and are appended to the same slug's body (before validation)
const all = {};
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".mjs") && !x.includes("-extra")).sort()) {
  const mod = await import(pathToFileURL(path.resolve(dir, f)).href);
  for (const [slug, post] of Object.entries(mod.default)) all[slug] = { ...post, _f: f };
}
for (const f of fs.readdirSync(dir).filter((x) => x.includes("-extra")).sort()) {
  const mod = await import(pathToFileURL(path.resolve(dir, f)).href);
  for (const [slug, md] of Object.entries(mod.default)) if (all[slug]) all[slug].body = all[slug].body.trim() + "\n\n" + md.trim();
}
{
  for (const [slug, post] of Object.entries(all)) {
    const f = post._f;
    if (!known.has(slug)) { bad++; console.log(`FAIL ${f}:${slug} — unknown slug`); continue; }
    const body = post.body.trim();
    const v = validate(body, { minWords: 1500, ctx, minLinks: 6 });
    if (!v.ok) { bad++; console.log(`FAIL ${f}:${slug} (${v.words} words) — ${v.errors.join("; ")}`); continue; }
    const faq = (post.faq || []).map(([q, a]) => ({ q, a }));
    if (faq.length < 5) { bad++; console.log(`FAIL ${f}:${slug} — needs at least 5 FAQ items`); continue; }
    fs.writeFileSync(path.join(OUT, slug + ".json"), JSON.stringify({ ok: true, mock: false, body, words: wordCount(body), faq, model: "hand-written" }));
    ok++; total += v.words;
  }
}
console.log(`applied ${ok} long posts (${bad} failed), avg ${Math.round(total / Math.max(1, ok))} words`);
