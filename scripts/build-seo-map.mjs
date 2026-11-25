// Builds the SEO data files from docs/seo/full-keyword-report.csv (the approved keyword map):
//   src/data/seo-map.json       pages, utility pages, categories, brands, collections
//   src/data/seo-blog.json      blog posts (keyed by URL, with the retitled headline where one was approved)
//   src/data/seo-products.json  products (keyed by URL)
// Run: node scripts/build-seo-map.mjs   (re-run whenever the map changes)
import fs from "fs";
const UM = JSON.parse(fs.readFileSync("src/data/url-map.json", "utf8"));
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
const SEC = /^(.*) \[([A-Z]+) (\d+)\/(\d+)\]$/;
const pages = {}, blog = {}, prods = {};
for (const r of parse(fs.readFileSync(CSV, "utf8"))) {
  const sec = (r.secondaries_with_intent_volume_kd || "").split("; ").filter(Boolean).map((x) => { const m = x.match(SEC); return m ? m[1] : x; });
  const nb = /name-based/.test(r.primary_intent);
  const e = { t: r.type.split(":")[0], p: r.primary_keyword, nb, i: nb ? "N" : r.primary_intent, v: nb ? null : +r.primary_volume, k: nb ? null : +r.primary_kd, s: sec };
  const type = e.t;
  if (type === "product") { const o = r.url.split("/")[3]; prods[UM.products[o] || o] = { ...e, s: sec.slice(0, 12) }; }
  else if (type === "blog") {
    const m = (r.page || "").match(/^PROPOSED: (.*) \(current: .*\)$/);
    const o = r.url.split("/")[2]; blog[UM.blog[o] || o] = { ...e, h: m ? m[1] : null };
  } else pages[r.url] = e;
}
const w = (f, o) => fs.writeFileSync(f, JSON.stringify(o));
const gen = new Date().toISOString().slice(0, 10);
w("src/data/seo-map.json", { generated: gen, pages });
w("src/data/seo-blog.json", { generated: gen, pages: blog });
w("src/data/seo-products.json", { generated: gen, pages: prods });
console.log("pages", Object.keys(pages).length, "| blog", Object.keys(blog).length, "| products", Object.keys(prods).length);
