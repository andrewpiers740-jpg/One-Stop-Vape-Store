// lib/collections.js — the catalogue's indexable collection pages and brand pages.
//
// URLs (all static, trailing slash, listed in the sitemap):
//   /collections/<category>/<collection>/            collections: brand-in-category, product line, flavor, strength, type, price band, "all"
//   /collections/<category>/<collection>/page/2/     pagination (48 per page)
//   /brands/                                         brand directory
//   /brands/<brand>/  and  /brands/<brand>/page/2/   one page per brand across every category
// <category> is a real category slug, or "all" for the whole shop (price bands + everything).
//
// Product lines, flavors and types are curated below; brands, counts and price bands come from the data.
import products from "@/src/data/products.json";
import { CATEGORIES, SITE } from "@/src/config/site";
import { catUrl, brandUrl, collUrl } from "@/lib/urlmap";

export const PER_PAGE = 48;
export const slugify = (s) => String(s).toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
const money = (n) => "$" + (Number.isInteger(n) ? n : n.toFixed(2));
const title = (p) => p.title.toLowerCase();
const hasWords = (p, words) => words.every((w) => title(p).includes(w));
const anyWords = (p, alts) => alts.some((a) => hasWords(p, a.split(/\s+/)));
const isFree = (p) => /^0\s*mg/i.test(p.nicotine || "") || p.subcategory === "zero-nicotine" || /nicotine[- ]free|zero nicotine/i.test(p.title);
const mgList = (p) => [...String(p.nicotine || "").matchAll(/(\d+(?:\.\d+)?)\s*mg/gi)].map((m) => +m[1]);

// ---------- brands (several spellings merged) ----------
const BRAND_GROUPS = [
  { label: "Horizontech", names: ["Horizontech", "HorizonTech"] },
  { label: "UT / FLUM", names: ["UT", "UT Bar", "FLUM"] },
];
export const brandOf = (name) => {
  const g = BRAND_GROUPS.find((x) => x.names.some((n) => norm(n) === norm(name)));
  return g ? g.label : name;
};
const SKIP_BRANDS = new Set(["newproduct", "other", ""]);

const catBySlug = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c]));
const catName = (slug) => (slug === "all" ? "All Products" : catBySlug[slug]?.name || slug);

export const brands = (() => {
  const map = new Map();
  for (const p of products) {
    const label = brandOf(p.brand || "");
    if (SKIP_BRANDS.has(norm(label))) continue;
    const slug = slugify(label);
    if (!map.has(slug)) map.set(slug, { slug, label, count: 0, cats: {} });
    const b = map.get(slug);
    b.count++;
    b.cats[p.category] = (b.cats[p.category] || 0) + 1;
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
})();
export const brandBySlug = Object.fromEntries(brands.map((b) => [b.slug, b]));
const brandKey = (p) => slugify(brandOf(p.brand || ""));
export const brandProducts = (slug) => products.filter((p) => brandKey(p) === slug);

// ---------- curated definitions ----------
const DISP_FLAVORS = [["Banana", "banana"], ["Blue Razz", "blue razz"], ["Cherry", "cherry"], ["Clear", "clear"], ["Mango", "mango"], ["Grape", "grape"], ["Lush Ice", "lush ice"], ["Mint", "mint"], ["Strawberry", "strawberry"], ["Tobacco", "tobacco"], ["Watermelon", "watermelon"], ["Peach", "peach"], ["Lemon", "lemon"], ["Pineapple", "pineapple"], ["Apple", "apple"]];
const line = (label, brandsArr, alts) => ({ label, brands: brandsArr, alts });
const DEFS = {
  "vape-juice": {
    types: [
      { label: "Free Base E-Liquid", test: (p) => p.subcategory === "freebase-sub-ohm" },
      { label: "Nicotine Salts E-Liquid", test: (p) => p.subcategory === "salt-nicotine-e-liquid" },
    ],
    lines: [line("Custard Monster", [], ["custard monster"]), line("Jam Monster", [], ["jam monster"]), line("Fruit Monster", [], ["fruit monster"])],
    flavors: [["Menthol", "menthol"], ["Tobacco", "tobacco"], ["Blue Razz", "blue razz"], ["Strawberry", "strawberry"], ["Watermelon", "watermelon"], ["Mango", "mango"], ["Grape", "grape"], ["Peach", "peach"], ["Apple", "apple"], ["Custard & Dessert", "custard,cake,cream,donut,vanilla"]],
  },
  "coils-pods": {
    types: [
      { label: "Replacement Pods", test: (p) => p.subcategory === "replacement-pods" },
      { label: "Pods & Coils", test: (p) => p.subcategory === "coils-pods" },
    ],
    lines: [line("Off Stamp Classic Cube", [], ["classic cube"]), line("Off Stamp Ice Cube", [], ["ice cube"]), line("Smok Nord", [], ["nord"]), line("Smok Novo", [], ["novo"])],
  },
  disposables: {
    strengths: [
      { label: "Nicotine Free Disposable Vapes", slug: "nicotine-free", test: isFree },
      { label: "Nicotine Disposable Vapes", slug: "with-nicotine", test: (p) => !isFree(p) },
    ],
    lines: [
      line("Fifty Bar 20K", ["Fifty Bar"], ["20k"]), line("Foger Switch Pro", ["Foger"], ["switch pro"]), line("Foger Bit 35K", ["Foger"], ["bit 35k"]),
      line("Geek Bar Pulse X 25K", ["Geek Bar"], ["pulse x 25k"]), line("Geek Bar Pulse X2 50K", ["Geek Bar"], ["pulse x 2 50k"]), line("Geek Bar Pulse (all editions)", ["Geek Bar"], ["pulse"]),
      line("Lost Mary MT35000 Turbo", ["Lost Mary"], ["mt35"]), line("Lost Mary MT15000 Turbo", ["Lost Mary"], ["mt15000"]), line("Lost Mary VIZ 55K", ["Lost Mary"], ["viz"]),
      line("RAZ LTX 25000", ["RAZ"], ["ltx"]), line("RAZ TN9000", ["RAZ"], ["tn9000"]), line("UT Bar 50K", ["UT", "UT Bar", "FLUM"], ["50k"]),
      line("EBCREATE BC Pro 40K", ["EBCREATE"], ["bc pro 40k"]), line("EBCREATE BC5000", ["EBCREATE"], ["bc5000"]), line("FASTA Alien 51K", ["FASTA"], ["alien"]),
      line("Horizontech 100K", ["Horizontech", "HorizonTech"], ["100k"]), line("Oilio Platypus 50K", ["Oilio"], []),
    ],
    flavors: DISP_FLAVORS,
  },
  "vape-kits": {
    types: [
      { label: "Pod System Vapes", test: (p) => p.subcategory === "pod-kits" },
      { label: "Vape Kits & Mods", test: (p) => p.subcategory === "vape-kits" },
    ],
    lines: [
      line("Foger Switch Pro Kit", ["Foger"], []), line("Pod Salt Onyx Cloud X", ["Pod Salt"], ["onyx"]), line("Pod Salt Hit 40K", ["Pod Salt"], ["hit 40k"]), line("Pod Salt Air 40K", ["Pod Salt"], ["air 40k"]),
      line("Off Stamp X-Cube Kit", ["Off Stamp"], []), line("X-Posed 35K Kit", ["X-Posed"], []), line("Mi-Pod Pro", ["Mi-Pod"], []), line("Lost Mary Nera Fullview", ["Lost Mary"], []), line("Smok Nord & Novo", ["Smok"], []), line("Caliburn", ["Caliburn"], []),
    ],
  },
  vaporizers: {
    types: [
      { label: "Puffco Devices", test: (p) => brandKey(p) === "puffco" && anyWords(p, ["peak", "proxy", "pivot", "plus"]) && !anyWords(p, ["glass", "chamber", "atomizer", "cap", "bag", "case", "pack", "bowl", "pipe", "bub", "wizard", "recycler", "cupsy", "budsy", "ripple"]) },
      { label: "Puffco Accessories", test: (p) => brandKey(p) === "puffco" && anyWords(p, ["glass", "chamber", "atomizer", "cap", "bag", "case", "pack", "bowl"]) },
      { label: "Puffco Water Pipes", test: (p) => brandKey(p) === "puffco" && anyWords(p, ["pipe", "bub", "wizard", "recycler", "cupsy", "budsy", "ripple"]) },
      { label: "Vaporizer Batteries", test: (p) => anyWords(p, ["battery"]) },
      { label: "Glass & Chambers", test: (p) => anyWords(p, ["glass", "chamber"]) },
    ],
  },
  "nic-pouches": {
    strengths: [
      { label: "Low Strength Pouches (up to 6 mg)", slug: "low-strength", test: (p) => mgList(p).some((n) => n <= 6) },
      { label: "Medium Strength Pouches (7 to 12 mg)", slug: "medium-strength", test: (p) => mgList(p).some((n) => n >= 7 && n <= 12) },
      { label: "Extra Strong Pouches (13 mg and up)", slug: "extra-strong", test: (p) => mgList(p).some((n) => n >= 13) },
    ],
    flavors: [["Mint", "mint"], ["Wintergreen", "wintergreen"], ["Peppermint", "peppermint"], ["Spearmint", "spearmint"], ["Citrus", "citrus,lemon,orange"], ["Berry", "berry,blueberry,cherry"], ["Coffee", "coffee,matcha"], ["Cinnamon", "cinnamon"]],
  },
  nixodine: {
    types: [{ label: "Nixodine Disposables", test: (p) => /\d+k|disposable|kit/i.test(p.title) }, { label: "Nixodine E-Liquids (100 mL)", test: (p) => /100\s?ml/i.test(p.title) || p.packSize === "100ml Bottle" }],
    flavors: DISP_FLAVORS.slice(0, 11),
  },
};

// price bands per category: [upTo, label]; last band is open-ended
const BANDS = {
  "vape-juice": [10, 11, 13, Infinity],
  "coils-pods": [10, 20, Infinity],
  disposables: [15, 20, 30, Infinity],
  "vape-kits": [20, 50, 100, Infinity],
  vaporizers: [50, 100, 250, Infinity],
  "nic-pouches": [5, 7, Infinity],
  nixodine: [15, 20, Infinity],
  all: [10, 15, 20, 30, 50, Infinity],
};

// ---------- registry ----------
const brandRank = Object.fromEntries(brands.map((b, i) => [b.slug, i]));
const byPopularity = (a, b) => (brandRank[brandKey(a)] ?? 999) - (brandRank[brandKey(b)] ?? 999);
const collections = [];
function add(category, kind, label, slug, test, extra = {}) {
  const list = (category === "all" ? products : products.filter((p) => p.category === category)).filter(test).sort(byPopularity); // most popular brands first (stable within a brand)
  if (list.length < 2) return;
  if (collections.some((c) => c.category === category && c.slug === slug)) return;
  collections.push({ category, kind, label, slug, products: list, ...extra });
}
for (const c of CATEGORIES) {
  const cat = c.slug;
  const def = DEFS[cat] || {};
  add(cat, "all", `All ${c.name}`, "all", () => true);
  for (const b of brands) if (b.cats[cat]) add(cat, "brand", b.label, b.slug, (p) => brandKey(p) === b.slug, { brandSlug: b.slug });
  for (const l of def.lines || []) {
    const bset = new Set((l.brands || []).map(norm));
    add(cat, "line", l.label, slugify(l.label), (p) => (!bset.size || bset.has(norm(p.brand))) && (!l.alts.length || l.alts.some((a) => hasWords(p, a.split(/\s+/)))));
  }
  for (const t of def.types || []) add(cat, "type", t.label, slugify(t.label), t.test);
  for (const s of def.strengths || []) add(cat, "strength", s.label, s.slug, s.test);
  for (const [label, words] of def.flavors || []) add(cat, "flavor", `${label} ${cat === "vape-juice" ? "Vape Juice" : cat === "nic-pouches" ? "Nicotine Pouches" : cat === "nixodine" ? "Nixodine" : "Vapes"}`, "flavor-" + slugify(label), (p) => anyWords(p, words.split(",")));
  const bands = BANDS[cat];
  let prev = 0;
  bands.forEach((upTo, i) => {
    const lo = prev, hi = upTo;
    prev = upTo;
    const label = i === 0 ? `${c.name} Under ${money(hi)}` : hi === Infinity ? `${c.name} ${money(lo)} and Up` : `${c.name} ${money(lo)} to ${money(hi)}`;
    const slug = i === 0 ? `under-${hi}` : hi === Infinity ? `${lo}-and-up` : `${lo}-to-${hi}`;
    add(cat, "price", label, "price-" + slug, (p) => p.price >= lo && p.price < hi && p.price > 1);
  });
}
// whole-shop collections
add("all", "all", "All Products", "all", () => true);
{
  let prev = 0;
  BANDS.all.forEach((upTo, i) => {
    const lo = prev, hi = upTo;
    prev = upTo;
    const label = i === 0 ? `Vape Products Under ${money(hi)}` : hi === Infinity ? `Vape Products ${money(lo)} and Up` : `Vape Products ${money(lo)} to ${money(hi)}`;
    const slug = i === 0 ? `under-${hi}` : hi === Infinity ? `${lo}-and-up` : `${lo}-to-${hi}`;
    add("all", "price", label, "price-" + slug, (p) => p.price >= lo && p.price < hi && p.price > 1);
  });
}

export const allCollections = collections;
export const getCollection = (category, slug) => collections.find((c) => c.category === category && c.slug === slug);
export const collectionsOf = (category, kind) => collections.filter((c) => c.category === category && (!kind || c.kind === kind));
export const hrefOf = (c) => `/collections/${catUrl(c.category)}/${collUrl(c.category, c.slug)}/`;
export const brandHref = (slug) => `/brands/${brandUrl(slug)}/`;
export const catHref = (slug) => (slug === "all" ? "/shop/" : `/shop/${catUrl(slug)}/`);

// ---------- paging ----------
export const pageCount = (n) => Math.max(1, Math.ceil(n / PER_PAGE));
export const pageSlice = (list, page) => list.slice((page - 1) * PER_PAGE, page * PER_PAGE);
export const pagePath = (base, page) => (page <= 1 ? base : `${base}page/${page}/`);
export function parsePage(param) {
  if (!param || !param.length) return 1;
  if (param.length === 2 && param[0] === "page" && /^\d+$/.test(param[1]) && +param[1] >= 2) return +param[1];
  return null;
}
export function allPageParams(total) {
  const n = pageCount(total);
  return [[], ...Array.from({ length: Math.max(0, n - 1) }, (_, i) => ["page", String(i + 2)])];
}

// ---------- copy ----------
export function describeSet(label, list, categoryName) {
  const prices = list.map((p) => p.price).filter((n) => n > 1).sort((a, b) => a - b);
  const lo = prices[0], hi = prices[prices.length - 1];
  const bs = {};
  list.forEach((p) => { const b = brandOf(p.brand || ""); if (!SKIP_BRANDS.has(norm(b))) bs[b] = (bs[b] || 0) + 1; });
  const top = Object.entries(bs).sort((a, b) => b[1] - a[1]).slice(0, 4).map((x) => x[0]);
  const range = prices.length ? ` Prices run from ${money(lo)} to ${money(hi)}.` : "";
  const topText = top.length > 1 ? ` Brands include ${top.slice(0, -1).join(", ")} and ${top[top.length - 1]}.` : top.length ? ` Made by ${top[0]}.` : "";
  return {
    meta: `Shop ${list.length} ${label} at ${SITE.name}.${range} Tracked US shipping from Phoenix, AZ. Adults 21+ only.`.slice(0, 200),
    intro: `${list.length} ${list.length === 1 ? "product" : "products"} in ${label}${categoryName && categoryName !== "All Products" ? ` (${categoryName})` : ""}.${range}${topText} Every item ships from Phoenix, Arizona and requires an adult aged ${SITE.compliance.ageThreshold} or over to sign for delivery.`,
    lo, hi,
  };
}

// ---------- sidebar facets ----------
export function facetsFor(category) {
  const cats = CATEGORIES.map((c) => ({ label: c.name, href: catHref(c.slug), count: products.filter((p) => p.category === c.slug).length, slug: c.slug }));
  const sets = (kind) => collectionsOf(category, kind).map((c) => ({ label: c.label, href: hrefOf(c), count: c.products.length, slug: c.slug }));
  const brandLinks = (category === "all" ? brands : brands.filter((b) => b.cats[category])).map((b) => ({ label: b.label, href: brandHref(b.slug), count: category === "all" ? b.count : b.cats[category], slug: b.slug }));
  const sortCount = (a) => [...a].sort((x, y) => y.count - x.count);
  const groups = [
    { key: "category", title: "Category", items: cats },
    { key: "brand", title: "Brand", items: brandLinks, limit: 10 },
    { key: "price", title: "Price", items: sets("price") },
    { key: "type", title: "Formulation & type", items: sets("type") },
    { key: "line", title: "Product line", items: sortCount(sets("line")), limit: 8 },
    { key: "flavor", title: "Flavor", items: sets("flavor"), limit: 10 },
    { key: "strength", title: "Strength", items: sets("strength") },
  ].filter((g) => g.items.length);
  return groups;
}

// ---------- navigation menu (built on the server in app/layout.tsx) ----------
const MENU_SIDE = { "coils-pods": ["replacement-pods", "pods-and-coils"], "vape-kits": ["pod-system-vapes", "vape-kits-and-mods"] };
export function megaMenu() {
  const out = {};
  for (const c of CATEGORIES) {
    const cat = c.slug;
    const link = (x) => ({ label: x.label.replace(/^Flavor /, ""), href: hrefOf(x), count: x.products.length });
    const flavorLabel = (x) => x.label;
    const brandsCol = collectionsOf(cat, "brand").sort((a, b) => b.products.length - a.products.length).map(link);
    const columns = [{ title: "Shop by brand", limit: 10, twoCols: cat === "nic-pouches", links: brandsCol }];
    const lines = collectionsOf(cat, "line").map(link);
    const types = collectionsOf(cat, "type").map(link);
    const flavors = collectionsOf(cat, "flavor").map((x) => ({ ...link(x), label: flavorLabel(x) }));
    const strengths = collectionsOf(cat, "strength").map(link);
    const prices = collectionsOf(cat, "price").map(link);
    if (lines.length) columns.push({ title: "Shop by product line", limit: 11, links: lines });
    if (types.length) columns.push({ title: "Shop by type", links: types });
    if (flavors.length) columns.push({ title: "Shop by flavor", links: flavors });
    if (strengths.length) columns.push({ title: "Shop by strength", links: strengths });
    if (prices.length) columns.push({ title: "Shop by price", links: prices });
    const side = (MENU_SIDE[cat] || []).map((s) => getCollection(cat, s)).filter(Boolean).map(link);
    out[cat] = { name: c.name, href: catHref(cat), total: products.filter((p) => p.category === cat).length, side, columns };
  }
  return out;
}
