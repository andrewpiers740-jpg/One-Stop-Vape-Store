// lib/search.js — product search (server only). One engine for the search page, the live suggestions, /api/search,
// /api/products and the MCP tool.
//
// A query is split into words; EVERY word has to match somewhere in the product:
//   name (title words, spaced or run together: "geekbar", "pulse x2"), brand, category, sub-category / formulation,
//   flavor words (they are in the title), nicotine strength ("6mg", "5%", "nicotine free"), puffs ("25k"), pack ("5 pack").
// Results are ranked: exact brand / name starts first, then whole-name matches, then field matches. A word with a small
// typo still matches (edit distance 1 on longer words). If nothing matches every word, the best partial matches are returned.
import products from "@/src/data/products.json";
import { CATEGORIES } from "@/src/config/site";
import { brandOf, brands } from "@/lib/collections";

const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
const words = (s) => String(s).toLowerCase().replace(/[^a-z0-9%.]+/g, " ").trim().split(/\s+/).filter(Boolean);

const CATEGORY_WORDS = {
  "vape-juice": "vape juice e-juice ejuice e-liquid eliquid liquid juice vape-juice",
  "coils-pods": "coils pods coil pod replacement pod cartridge",
  disposables: "disposable disposables vape vapes puff puffs",
  "vape-kits": "vape kit kits pod system starter device mod",
  vaporizers: "vaporizer vaporizers dab dabs rig battery wax concentrate",
  "nic-pouches": "nicotine pouch pouches snus tobacco-free",
  nixodine: "nixodine nix nic-free synthetic",
};
const SUB_WORDS = {
  "smart-disposables": "smart screen display",
  "ultra-high-puff": "ultra high puff big long lasting",
  "zero-nicotine": "zero nicotine free 0mg 0% no nicotine",
  "freebase-sub-ohm": "freebase free base sub ohm subohm",
  "salt-nicotine-e-liquid": "salt salts nic nicotine salt",
  "pod-kits": "pod kit pod system",
  "replacement-pods": "replacement refill pods",
  "vape-kits": "vape kit mod",
  "coils-pods": "coils pods",
};
// words people type that mean the same thing
const SYN = { ice: "iced", icy: "iced", iced: "ice", berries: "berry", berry: "berries", razz: "raspberry", raspberry: "razz", mint: "minty", ejuice: "juice", eliquid: "juice", "e-liquid": "juice", "e-juice": "juice" };

const catName = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c.name]));
const brandRank = Object.fromEntries(brands.map((b, i) => [b.slug, i]));

const mgOf = (p) => [...String(p.nicotine || "").matchAll(/(\d+(?:\.\d+)?)\s*mg/gi)].map((m) => +m[1]);
const isFree = (p) => /^0\s*mg/i.test(p.nicotine || "") || p.subcategory === "zero-nicotine" || /nicotine[- ]free|zero nicotine/i.test(p.title);

let INDEX = null;
function index() {
  if (INDEX) return INDEX;
  const vocab = new Set();
  INDEX = products.map((p) => {
    const brand = brandOf(p.brand || "");
    const tw = words(p.title);
    tw.forEach((w) => w.length >= 4 && vocab.add(w));
    words(brand).forEach((w) => w.length >= 4 && vocab.add(w));
    const strength = [];
    mgOf(p).forEach((n) => strength.push(n + "mg", String(n)));
    if (/5\s*%/.test(p.nicotine || "")) strength.push("5%", "5");
    if (isFree(p)) strength.push("0mg", "free", "zero", "none", "nicotine-free");
    return {
      p, brand,
      title: p.title.toLowerCase(),
      ctitle: norm(p.title),
      tw,
      cbrand: norm(brand),
      bw: words(brand),
      cat: (CATEGORY_WORDS[p.category] || "") + " " + (catName[p.category] || "").toLowerCase() + " " + p.category.replace(/-/g, " "),
      sub: (SUB_WORDS[p.subcategory] || "") + " " + String(p.subcategory || "").replace(/-/g, " "),
      strength: new Set(strength),
      pack: String(p.packSize || "").toLowerCase(),
      rank: brandRank[norm(brand).length ? Object.keys(brandRank).find((k) => k === norm(brand).replace(/(.)/g, "$1")) : ""] ?? 99,
    };
  });
  // brand rank by slug is awkward here; recompute from the brand list by normalized label
  const byLabel = Object.fromEntries(brands.map((b, i) => [norm(b.label), i]));
  INDEX.forEach((e) => { e.rank = byLabel[e.cbrand] ?? byLabel[norm(e.brand)] ?? 99; });
  INDEX.vocab = [...vocab];
  return INDEX;
}

function within1(a, b) {
  if (a === b) return true;
  const la = a.length, lb = b.length;
  if (Math.abs(la - lb) > 1) return false;
  let i = 0, j = 0, edits = 0;
  while (i < la && j < lb) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++edits > 1) return false;
    if (la > lb) i++; else if (lb > la) j++; else { i++; j++; }
  }
  return edits + (la - i) + (lb - j) <= 1;
}

// score one query token against one product; 0 = no match
function tokenScore(e, t) {
  const ct = norm(t);
  if (!ct) return 1;
  let s = 0;
  // brand
  if (e.cbrand === ct) s = Math.max(s, 60);
  else if (e.bw.includes(t)) s = Math.max(s, 40);
  else if (e.cbrand.startsWith(ct) && ct.length >= 3) s = Math.max(s, 34);
  // name words
  if (e.tw.includes(t)) s = Math.max(s, 24);
  else if (e.tw.some((w) => w.startsWith(t)) && t.length >= 2) s = Math.max(s, 16);
  else if (!/^\d+(\.\d+)?mg$/.test(t) && (ct.length >= 3 || (ct.length === 2 && /\d/.test(ct))) && e.ctitle.includes(ct)) s = Math.max(s, 10); // run-together / partial ("geekbar", "x2"); strengths only match as whole values
  // category / sub-category / formulation
  const syn = SYN[t];
  if (e.cat.includes(t) || (syn && e.cat.includes(syn))) s = Math.max(s, 14);
  if (e.sub.includes(t)) s = Math.max(s, 12);
  // strength / puffs / pack
  if (e.strength.has(t) || e.strength.has(ct)) s = Math.max(s, 12);
  if (/^\d+k$/.test(t) && e.ctitle.includes(t)) s = Math.max(s, 12);
  if (e.pack && e.pack.includes(t)) s = Math.max(s, 6);
  if (syn && (e.tw.includes(syn) || e.tw.some((w) => w.startsWith(syn)))) s = Math.max(s, 12);
  // typo
  if (!s && t.length >= 3 && e.bw.some((w) => w[0] === t[0] && within1(w, t))) s = 6; // brand typo ("gek bar")
  if (!s && t.length >= 4 && e.tw.some((w) => w[0] === t[0] && within1(w, t))) s = 5; // name typo ("fifty barr")
  return s;
}

export function search({ q = "", category = "", brand = "", strength = "", maxPrice = 0, sort = "relevance" } = {}) {
  const idx = index();
  const qWords = words(q).filter((w) => w !== "and" && w !== "for" && w !== "the");
  const phrase = qWords.join(" ");
  const cphrase = norm(q);
  let list = [];
  let partial = false;

  if (qWords.length) {
    const scored = idx.map((e) => {
      let total = 0, matched = 0;
      for (const t of qWords) { const s = tokenScore(e, t); if (s) { total += s; matched++; } }
      return { e, total, matched };
    });
    let hits = scored.filter((x) => x.matched === qWords.length);
    if (!hits.length && qWords.length > 1) { hits = scored.filter((x) => x.matched >= Math.max(1, qWords.length - 1)); partial = hits.length > 0; }
    list = hits.map((x) => {
      let s = x.total;
      if (x.e.title.startsWith(phrase)) s += 30;
      else if (x.e.title.includes(phrase)) s += 18;
      else if (cphrase.length >= 3 && x.e.ctitle.includes(cphrase)) s += 10;
      if (x.e.cbrand === cphrase) s += 40;
      s += Math.max(0, 8 - x.e.rank * 0.3); // popular brands first on ties
      if (x.e.p.inStock === false) s -= 15;
      return { e: x.e, s };
    }).sort((a, b) => b.s - a.s || a.e.p.title.localeCompare(b.e.p.title)).map((x) => x.e);
  } else {
    list = [...idx].sort((a, b) => a.rank - b.rank);
  }

  // facets are computed before the optional filters so the refine chips stay visible
  const facet = (fn) => { const m = new Map(); list.forEach((e) => { const k = fn(e); if (k) m.set(k, (m.get(k) || 0) + 1); }); return m; };
  const catCounts = facet((e) => e.p.category);
  const brandCounts = facet((e) => e.brand);
  const strengthCounts = new Map([["nicotine-free", list.filter((e) => isFree(e.p)).length], ["with-nicotine", list.filter((e) => !isFree(e.p)).length]]);

  if (category) list = list.filter((e) => e.p.category === category);
  if (brand) list = list.filter((e) => norm(e.brand) === norm(brand));
  if (strength === "nicotine-free") list = list.filter((e) => isFree(e.p));
  if (strength === "with-nicotine") list = list.filter((e) => !isFree(e.p));
  if (maxPrice > 0) list = list.filter((e) => e.p.price <= maxPrice);
  if (sort === "price-asc") list = [...list].sort((a, b) => a.p.price - b.p.price);
  if (sort === "price-desc") list = [...list].sort((a, b) => b.p.price - a.p.price);
  if (sort === "name") list = [...list].sort((a, b) => a.p.title.localeCompare(b.p.title));

  return {
    query: q,
    partial,
    total: list.length,
    products: list.map((e) => e.p),
    facets: {
      categories: [...catCounts].map(([slug, count]) => ({ slug, label: catName[slug] || slug, count })).sort((a, b) => b.count - a.count),
      brands: [...brandCounts].map(([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count).slice(0, 14),
      strengths: [...strengthCounts].filter(([, n]) => n).map(([slug, count]) => ({ slug, label: slug === "nicotine-free" ? "Nicotine free" : "With nicotine", count })),
    },
  };
}

// live suggestions: a few products, matching brands and categories
export function suggest(q, limit = 6) {
  const r = search({ q });
  const qn = norm(q);
  const brandMatches = brands.filter((b) => norm(b.label).startsWith(qn) || norm(b.label).includes(qn)).slice(0, 3).map((b) => ({ label: b.label, href: `/brands/${b.slug}/`, count: b.count }));
  const catMatches = CATEGORIES.filter((c) => norm(c.name).includes(qn) || (CATEGORY_WORDS[c.slug] || "").split(" ").some((w) => qn.length >= 3 && w.startsWith(q.toLowerCase().trim()))).slice(0, 2).map((c) => ({ label: c.name, href: `/shop/${c.slug}/` }));
  return {
    query: q,
    total: r.total,
    products: r.products.slice(0, limit).map((p) => ({ title: p.title, brand: brandOf(p.brand || ""), category: p.category, price: p.price, image: p.image, href: `/shop/${p.category}/${p.slug}/` })),
    brands: brandMatches,
    categories: catMatches,
  };
}
