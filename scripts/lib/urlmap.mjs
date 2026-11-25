// scripts/lib/urlmap.mjs — rewrites old URLs to the keyword-based URLs defined in src/data/url-map.json.
// Used by scripts/apply-url-map.mjs (one-time migration of data files) and scripts/build-blog.mjs (so a blog rebuild keeps the new slugs).
import fs from "node:fs";

export const urlMap = JSON.parse(fs.readFileSync("src/data/url-map.json", "utf8"));
const M = urlMap;

export const newCat = (c) => M.categories[c] || c;
export const newProductSlug = (s) => M.products[s] || s;
export const newBlogSlug = (s) => M.blog[s] || s;
export const newBrand = (b) => M.brands[b] || b;
export const newColl = (cat, c) => M.collections[`${cat}/${c}`] || c;

// Rewrite every internal link in a text blob (markdown, HTML or plain). Safe to run once on text that still uses old URLs.
export function rewriteLinks(text) {
  if (typeof text !== "string" || !text.includes("/")) return text;
  let t = text;
  // products: /shop/<cat>/<slug>/
  t = t.replace(/\/shop\/([a-z0-9-]+)\/([a-z0-9-]+)\//g, (m, cat, slug) => `/shop/${newCat(cat)}/${newProductSlug(slug)}/`);
  // categories: /shop/<cat>/ (single segment, not followed by another segment)
  t = t.replace(/\/shop\/([a-z0-9-]+)\/(?![a-z0-9-])/g, (m, cat) => `/shop/${newCat(cat)}/`);
  // blog posts
  t = t.replace(/\/blog\/([a-z0-9-]+)\//g, (m, s) => (s === "category" || s === "page" ? m : `/blog/${newBlogSlug(s)}/`));
  // brands
  t = t.replace(/\/brands\/([a-z0-9-]+)\//g, (m, b) => `/brands/${newBrand(b)}/`);
  // collections
  t = t.replace(/\/collections\/([a-z0-9-]+)\/([a-z0-9-]+)\//g, (m, cat, c) => `/collections/${newCat(cat)}/${newColl(cat, c)}/`);
  // static pages
  for (const [o, n] of Object.entries(M.pages)) t = t.split(`(${o})`).join(`(${n})`).split(`"${o}"`).join(`"${n}"`).split(`'${o}'`).join(`'${n}'`).split(`href="${o}`).join(`href="${n}`);
  return t;
}

// image file name helpers (blog images are <slug>-<n>.webp)
export const newBlogImage = (src) => {
  const m = src.match(/^\/images\/blog\/(.+)-(\d+)\.webp$/);
  return m && M.blog[m[1]] ? `/images/blog/${M.blog[m[1]]}-${m[2]}.webp` : src;
};
