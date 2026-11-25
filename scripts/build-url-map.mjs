// Builds src/data/url-map.json + docs/seo/url-map.csv: the new URL slug (= the page's primary keyword) for every page,
// plus the old->new map used for 301 redirects. Source of truth: docs/seo/full-keyword-report.csv (approved keyword map).
// Run: node scripts/build-url-map.mjs
import fs from "fs";
const CSV = "docs/seo/full-keyword-report.csv";
function parse(t) {
  const rows = []; let row = [], cur = "", q = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (q) { if (c === '"') { if (t[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; }
    else if (c === '"') q = true;
    else if (c === ",") { row.push(cur); cur = ""; }
    else if (c === "\n") { row.push(cur.replace(/\r$/, "")); rows.push(row); row = []; cur = ""; }
    else cur += c;
  }
  const h = rows.shift();
  return rows.filter((r) => r.length > 1).map((r) => Object.fromEntries(h.map((k, i) => [k, r[i] || ""])));
}
const MAX = 72;
const slugify = (s) => {
  let x = String(s).toLowerCase().replace(/&/g, " and ").replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  if (x.length > MAX) x = x.slice(0, MAX).replace(/-[^-]*$/, "");
  return x;
};
const rows = parse(fs.readFileSync(CSV, "utf8"));
const out = { categories: {}, brands: {}, collections: {}, products: {}, blog: {}, pages: {} };
const csv = ["type,old_url,new_url,primary"];
const RESERVED = new Set(["shop", "blog", "brands", "collections", "search", "cart", "checkout", "account", "admin", "api", "order", "wishlist", "pages", "thank-you-contact", "thank-you-order", "thank-you-wholesale", "images", "brand", "_next", "sitemap.xml", "robots.txt"]);

// ---- categories ----
for (const r of rows.filter((r) => r.type === "category")) {
  const old = r.url.split("/")[2];
  out.categories[old] = slugify(r.primary_keyword);
}
// ---- brands ----
const usedBrand = new Set();
for (const r of rows.filter((r) => r.type === "brand")) {
  const old = r.url.split("/")[2];
  let n = slugify(r.primary_keyword) || old;
  if (usedBrand.has(n)) n = `${n}-${old}`;
  usedBrand.add(n);
  out.brands[old] = n;
}
// ---- collections (unique within category) ----
const usedColl = {};
for (const r of rows.filter((r) => r.type.startsWith("collection"))) {
  const [, , cat, old] = r.url.split("/");
  usedColl[cat] = usedColl[cat] || new Set();
  let n = slugify(r.primary_keyword) || old;
  if (usedColl[cat].has(n)) n = `${n}-${old}`;
  usedColl[cat].add(n);
  out.collections[`${cat}/${old}`] = n;
}
// ---- products (slug unique across the catalogue; name-based primaries keep their existing slug) ----
const finalProd = new Set(rows.filter((r) => r.type === "product").map((r) => r.url.split("/")[3]));
for (const r of rows.filter((r) => r.type === "product")) {
  const old = r.url.split("/")[3];
  if (/name-based/.test(r.primary_intent)) continue; // slug is already derived from the product name
  let n = slugify(r.primary_keyword);
  if (!n || n === old) continue;
  if (finalProd.has(n)) n = slugify(`${r.primary_keyword} ${old}`);
  if (finalProd.has(n)) continue;
  finalProd.delete(old); finalProd.add(n);
  out.products[old] = n;
}
// ---- blog ----
const finalBlog = new Set(rows.filter((r) => r.type === "blog").map((r) => r.url.split("/")[2]));
for (const r of rows.filter((r) => r.type === "blog")) {
  const old = r.url.split("/")[2];
  let n = slugify(r.primary_keyword);
  if (!n || n === old) continue;
  if (RESERVED.has(n) || n === "category" || n === "page" || finalBlog.has(n)) n = slugify(`${r.primary_keyword}-guide`);
  if (finalBlog.has(n)) continue;
  finalBlog.delete(old); finalBlog.add(n);
  out.blog[old] = n;
}
// ---- static, home and utility pages (top level). "/" stays; /shop/ and /blog/ are section roots (every product and post lives under them) and keep their path. ----
for (const r of rows.filter((r) => r.type === "page" || r.type === "utility")) {
  if (["/", "/shop/", "/blog/"].includes(r.url)) continue;
  const n = slugify(r.primary_keyword);
  if (!n || RESERVED.has(n)) continue;
  out.pages[r.url] = `/${n}/`;
}
fs.writeFileSync("src/data/url-map.json", JSON.stringify(out));
const add = (t, a, b, p) => csv.push([t, a, b, `"${String(p).replace(/"/g, '""')}"`].join(","));
const prim = Object.fromEntries(rows.map((r) => [r.url, r.primary_keyword]));
for (const [o, n] of Object.entries(out.categories)) add("category", `/shop/${o}/`, `/shop/${n}/`, prim[`/shop/${o}/`]);
for (const [o, n] of Object.entries(out.brands)) if (o !== n) add("brand", `/brands/${o}/`, `/brands/${n}/`, prim[`/brands/${o}/`]);
for (const [k, n] of Object.entries(out.collections)) { const [c, o] = k.split("/"); if (o !== n) add("collection", `/collections/${c}/${o}/`, `/collections/${out.categories[c] || c}/${n}/`, prim[`/collections/${c}/${o}/`]); }
const prodCat = Object.fromEntries(rows.filter((r) => r.type === "product").map((r) => [r.url.split("/")[3], r.url.split("/")[2]]));
for (const [o, n] of Object.entries(out.products)) add("product", `/shop/${prodCat[o]}/${o}/`, `/shop/${out.categories[prodCat[o]] || prodCat[o]}/${n}/`, prim[`/shop/${prodCat[o]}/${o}/`]);
for (const [o, n] of Object.entries(out.blog)) add("blog", `/blog/${o}/`, `/blog/${n}/`, prim[`/blog/${o}/`]);
for (const [o, n] of Object.entries(out.pages)) add("page", o, n, prim[o]);
fs.writeFileSync("docs/seo/url-map.csv", csv.join("\n") + "\n");
const cnt = (k) => Object.keys(out[k]).length;
console.log(JSON.stringify({ categories: cnt("categories"), brands: Object.entries(out.brands).filter(([a, b]) => a !== b).length, collections: Object.entries(out.collections).filter(([k, n]) => k.split("/")[1] !== n).length, products: cnt("products"), blog: cnt("blog"), pages: cnt("pages") }));
