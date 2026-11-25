// scripts/apply-url-map.mjs — ONE-TIME migration: applies src/data/url-map.json to the data files and image files.
//   node scripts/apply-url-map.mjs            (dry run: prints what would change)
//   node scripts/apply-url-map.mjs --write    (renames files with git mv and rewrites JSON)
// Product and blog slugs live in src/data/*.json, so changing them there moves every page, link, sitemap entry and schema URL.
// Old URLs are 301-redirected (next.config.ts for pages, vercel.json for images). Brand/collection/category slugs are handled in lib/urlmap.js.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { urlMap as M, rewriteLinks, newBlogImage } from "./lib/urlmap.mjs";

const WRITE = process.argv.includes("--write");
const J = (f) => JSON.parse(fs.readFileSync(f, "utf8"));
const W = (f, o) => WRITE && fs.writeFileSync(f, JSON.stringify(o, null, 2) + "\n");
const mv = (a, b) => {
  if (!fs.existsSync(a)) return false;
  if (fs.existsSync(b)) throw new Error(`target exists: ${b}`);
  if (WRITE) {
    try { execFileSync("git", ["mv", a, b], { stdio: "ignore" }); } catch { fs.renameSync(a, b); }
  }
  return true;
};
const slugify = (s) => String(s).toLowerCase().replace(/&/g, " and ").replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const imageMap = {};
const stats = {};

// ---------- products ----------
const products = J("src/data/products.json");
const desc = J("src/data/product-descriptions.json");
let nProd = 0, nImg = 0, nCopy = 0;
for (const p of products) {
  const n = M.products[p.slug];
  if (!n) continue;
  const old = p.slug;
  const oldImg = `/images/products/${old}.webp`;
  if (p.image === oldImg) {
    if (mv(`public${oldImg}`, `public/images/products/${n}.webp`)) { nImg++; imageMap[oldImg] = `/images/products/${n}.webp`; p.image = `/images/products/${n}.webp`; }
  }
  if (mv(`src/data/product-copy/${old}.json`, `src/data/product-copy/${n}.json`)) nCopy++;
  if (desc[old]) { desc[n] = desc[old]; delete desc[old]; }
  p.slug = n;
  nProd++;
}
// links inside product copy / descriptions
let nLinks = 0;
const rwObj = (o) => {
  if (typeof o === "string") { const r = rewriteLinks(o); if (r !== o) nLinks++; return r; }
  if (Array.isArray(o)) return o.map(rwObj);
  if (o && typeof o === "object") return Object.fromEntries(Object.entries(o).map(([k, v]) => [k, rwObj(v)]));
  return o;
};
const desc2 = rwObj(desc);
W("src/data/products.json", products);
W("src/data/product-descriptions.json", desc2);
for (const f of fs.readdirSync("src/data/product-copy").filter((x) => x.endsWith(".json"))) {
  const fp = `src/data/product-copy/${f}`;
  const o = J(fp), o2 = rwObj(o);
  if (WRITE && JSON.stringify(o) !== JSON.stringify(o2)) fs.writeFileSync(fp, JSON.stringify(o2, null, 2) + "\n");
}
stats.products = { slugsChanged: nProd, imagesRenamed: nImg, copyRenamed: nCopy, linkStringsRewritten: nLinks };

// ---------- blog ----------
const posts = J("src/data/blog-posts.json");
let nPosts = 0, nBlogImg = 0;
for (const p of posts) {
  const old = p.slug;
  for (const img of p.images || []) {
    const ni = newBlogImage(img.src);
    if (ni !== img.src) {
      if (mv(`public${img.src}`, `public${ni}`)) nBlogImg++;
      imageMap[img.src] = ni;
      img.src = ni;
    }
  }
  p.body = rewriteLinks(p.body);
  p.summary = rewriteLinks(p.summary);
  if (p.faq) p.faq = p.faq.map((f) => ({ ...f, a: rewriteLinks(f.a) }));
  if (M.blog[old]) { p.slug = M.blog[old]; nPosts++; }
}
W("src/data/blog-posts.json", posts);
stats.blog = { slugsChanged: nPosts, imagesRenamed: nBlogImg };

// ---------- banners, category tiles, hero ----------
const seo = J("src/data/seo-map.json").pages;
const si = J("src/data/site-images.json");
const credits = J("src/data/image-credits.json");
const bannerPrimary = (key) => {
  const catKey = M.categories[key];
  if (catKey) return catKey; // category slug == slugified primary
  const url = key === "shop" ? "/shop/" : key === "blog" ? "/blog/" : `/${key}/`;
  const e = seo[url];
  return e ? slugify(e.p) : null;
};
let nBan = 0;
for (const [key, b] of Object.entries(si.banners)) {
  const n = bannerPrimary(key);
  if (!n) continue;
  const to = `/images/banners/${n}.webp`;
  if (b.src === to) continue;
  if (mv(`public${b.src}`, `public${to}`)) { nBan++; imageMap[b.src] = to; if (credits["/" + b.src]) { credits["/" + to] = credits["/" + b.src]; delete credits["/" + b.src]; } b.src = to; }
}
for (const [key, t] of Object.entries(si.tiles)) {
  const n = M.categories[key];
  if (!n) continue;
  const to = `/images/categories/${n}.webp`;
  if (t.src === to) continue;
  if (mv(`public${t.src}`, `public${to}`)) { nBan++; imageMap[t.src] = to; if (credits["/" + t.src]) { credits["/" + to] = credits["/" + t.src]; delete credits["/" + t.src]; } t.src = to; }
}
const homePrimary = slugify(seo["/"]?.p || "");
if (homePrimary) si.hero.forEach((h, i) => {
  const to = `/images/hero/${homePrimary}-${i + 1}.webp`;
  if (h.src === to) return;
  if (mv(`public${h.src}`, `public${to}`)) { nBan++; imageMap[h.src] = to; if (credits["/" + h.src]) { credits["/" + to] = credits["/" + h.src]; delete credits["/" + h.src]; } h.src = to; }
});
W("src/data/site-images.json", si);
W("src/data/image-credits.json", credits);
stats.banners = { renamed: nBan };
if (WRITE) fs.writeFileSync("src/data/image-map.json", JSON.stringify(imageMap));
console.log(WRITE ? "WRITTEN" : "DRY RUN", JSON.stringify(stats), "imageRedirects", Object.keys(imageMap).length);
