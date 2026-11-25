// lib/urlmap.js — URL slugs that equal each page's primary keyword (src/data/url-map.json, built by scripts/build-url-map.mjs).
// Internal keys (category/brand/collection slugs used by the catalogue code) stay unchanged; these helpers convert to and from the public URL slug.
// Product and blog slugs are stored directly in the data files, so they need no conversion.
import map from "@/src/data/url-map.json";

const rev = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [v, k]));
const catRev = rev(map.categories);
const brandRev = rev(map.brands);
const collRev = {};
for (const [k, v] of Object.entries(map.collections)) { const [cat, key] = k.split("/"); collRev[`${cat}/${v}`] = key; }

export const catUrl = (key) => map.categories[key] || key;
export const catKeyOf = (url) => catRev[url] || url;
export const brandUrl = (key) => map.brands[key] || key;
export const brandKeyOf = (url) => brandRev[url] || url;
export const collUrl = (catKey, key) => map.collections[`${catKey}/${key}`] || key;
export const collKeyOf = (catKey, url) => collRev[`${catKey}/${url}`] || url;
export const staticUrl = (oldPath) => map.pages[oldPath] || oldPath;
export const productPath = (p) => `/shop/${catUrl(p.category)}/${p.slug}/`;

const pageRev = rev(map.pages);
// New (keyword) path -> the old path that seo-map.json is keyed by. Paths that did not change are returned as-is.
export function oldPathOf(p) {
  if (pageRev[p]) return pageRev[p];
  const seg = p.split("/").filter(Boolean);
  if (seg[0] === "shop" && seg.length === 2) return "/shop/" + catKeyOf(seg[1]) + "/";
  if (seg[0] === "brands" && seg.length === 2) return "/brands/" + brandKeyOf(seg[1]) + "/";
  if (seg[0] === "collections" && seg.length === 3) { const c = catKeyOf(seg[1]); return "/collections/" + c + "/" + collKeyOf(c, seg[2]) + "/"; }
  return p;
}
