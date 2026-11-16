// Builds src/data/mega-menu.json (the navigation dropdowns) from the catalogue.
// Brands and counts come from products.json; product lines, flavours and types are curated below.
// Every link points at /browse/ with filter params that app/browse/page.tsx understands:
//   category, brand (comma list), sub, q (all words must appear in the title), strength (none|has)
// Run:  npm run menu   (after changing products)
import fs from "fs";
import path from "path";

const root = process.cwd();
const products = JSON.parse(fs.readFileSync(path.join(root, "src/data/products.json"), "utf8"));
const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");

// brands that are spelled in more than one way in the data
const ALIASES = { horizontech: ["Horizontech", "HorizonTech"], ut: ["UT", "UT Bar", "FLUM"], flum: ["UT", "UT Bar", "FLUM"], "utbar": ["UT", "UT Bar", "FLUM"] };

function brandsFor(category) {
  const map = new Map();
  for (const p of products) {
    if (p.category !== category) continue;
    const k = norm(p.brand);
    if (!map.has(k)) map.set(k, { names: new Set(), count: 0 });
    const e = map.get(k);
    e.names.add(p.brand);
    e.count++;
  }
  const out = [];
  const seen = new Set();
  for (const [k, e] of map) {
    const alias = ALIASES[k];
    if (alias) {
      const key = alias.map(norm).sort().join("|");
      if (seen.has(key)) continue;
      seen.add(key);
      const total = products.filter((p) => p.category === category && alias.map(norm).includes(norm(p.brand))).length;
      out.push({ label: alias[0] === "UT" ? "UT / FLUM" : alias[0], brand: alias.join(","), count: total });
    } else {
      const label = [...e.names].sort((a, b) => b.length - a.length)[0];
      out.push({ label, brand: [...e.names].join(","), count: e.count });
    }
  }
  return out.filter((b) => b.label.toLowerCase() !== "new product").sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

const link = (label, params) => ({ label, href: "/browse/?" + new URLSearchParams(params).toString() });
const cat = (c, extra = {}) => ({ category: c, ...extra });

const FLAVORS = [
  ["Banana", "banana"], ["Blue Razz", "blue razz"], ["Cherry", "cherry"], ["Clear", "clear"], ["Mango", "mango"], ["Grape", "grape"],
  ["Lush Ice", "lush ice"], ["Mint", "mint"], ["Strawberry", "strawberry"], ["Tobacco", "tobacco"], ["Watermelon", "watermelon"],
  ["Peach", "peach"], ["Lemon", "lemon"], ["Pineapple", "pineapple"], ["Apple", "apple"],
];

const menu = {
  "vape-juice": {
    name: "Vape Juice",
    columns: [
      { title: "Shop by brand", brands: true, limit: 10 },
      {
        title: "Shop by type",
        links: [
          link("Free Base E-Liquid", cat("vape-juice", { sub: "freebase-sub-ohm" })),
          link("Nicotine Salts E-Liquid", cat("vape-juice", { sub: "salt-nicotine-e-liquid" })),
          link("Custard Monster", cat("vape-juice", { q: "custard monster" })),
          link("Jam Monster", cat("vape-juice", { q: "jam monster" })),
          link("Fruit Monster", cat("vape-juice", { q: "fruit monster" })),
          link("Menthol E-Liquid", cat("vape-juice", { q: "menthol" })),
          link("Tobacco E-Liquid", cat("vape-juice", { q: "tobacco" })),
          link("Nixodine Juice", cat("nixodine")),
        ],
      },
    ],
  },
  "coils-pods": {
    name: "Coils & Pods",
    side: [link("Replacement Pods", cat("coils-pods", { sub: "replacement-pods" })), link("Pods & Coils", cat("coils-pods", { sub: "coils-pods" }))],
    columns: [
      { title: "Shop by brand", brands: true, limit: 10 },
      {
        title: "Shop by product line",
        links: [
          link("Off Stamp Classic Cube", cat("coils-pods", { q: "classic cube" })),
          link("Off Stamp Ice Cube", cat("coils-pods", { q: "ice cube" })),
          link("Smok Nord", cat("coils-pods", { q: "nord" })),
          link("Smok Novo", cat("coils-pods", { q: "novo" })),
          link("Caliburn Pods", cat("coils-pods", { brand: "Caliburn" })),
        ],
      },
    ],
  },
  disposables: {
    name: "Disposable Vapes",
    columns: [
      { title: "Shop by brand", brands: true, limit: 10 },
      {
        title: "Shop by product line",
        limit: 11,
        links: [
          link("Fifty Bar 20K", cat("disposables", { brand: "Fifty Bar", q: "20k" })),
          link("Foger Switch Pro", cat("disposables", { brand: "Foger", q: "switch pro" })),
          link("Foger Bit 35K", cat("disposables", { brand: "Foger", q: "bit 35k" })),
          link("Geek Bar Pulse X 25K", cat("disposables", { brand: "Geek Bar", q: "pulse x 25k" })),
          link("Geek Bar Pulse X2 50K", cat("disposables", { brand: "Geek Bar", q: "pulse x 2 50k" })),
          link("Geek Bar Pulse (all editions)", cat("disposables", { brand: "Geek Bar", q: "pulse" })),
          link("Lost Mary MT35000 Turbo", cat("disposables", { brand: "Lost Mary", q: "mt35" })),
          link("Lost Mary MT15000 Turbo", cat("disposables", { brand: "Lost Mary", q: "mt15000" })),
          link("Lost Mary VIZ 55K", cat("disposables", { brand: "Lost Mary", q: "viz" })),
          link("RAZ LTX 25000", cat("disposables", { brand: "RAZ", q: "ltx" })),
          link("RAZ TN9000", cat("disposables", { brand: "RAZ", q: "tn9000" })),
          link("UT Bar 50K", cat("disposables", { brand: "UT,UT Bar,FLUM", q: "50k" })),
          link("EBCREATE BC Pro 40K", cat("disposables", { brand: "EBCREATE", q: "bc pro 40k" })),
          link("EBCREATE BC5000", cat("disposables", { brand: "EBCREATE", q: "bc5000" })),
          link("FASTA Alien 51K", cat("disposables", { brand: "FASTA", q: "alien" })),
          link("Horizontech 100K", cat("disposables", { brand: "Horizontech,HorizonTech", q: "100k" })),
          link("Oilio Platypus 50K", cat("disposables", { brand: "Oilio" })),
        ],
      },
      { title: "Shop by flavor", links: FLAVORS.map(([l, q]) => link(l + " Vapes", cat("disposables", { q }))) },
      {
        title: "Shop by strength",
        links: [link("Nicotine Free Disposable Vapes", cat("disposables", { strength: "none" })), link("Nicotine Disposable Vapes", cat("disposables", { strength: "has" }))],
      },
    ],
  },
  "vape-kits": {
    name: "Vape Kits",
    side: [link("All Vape Kits", cat("vape-kits")), link("Pod System Vapes", cat("vape-kits", { sub: "pod-kits" })), link("Vape Kits & Mods", cat("vape-kits", { sub: "vape-kits" }))],
    columns: [
      { title: "Shop by brand", brands: true, limit: 10 },
      {
        title: "Shop by product line",
        links: [
          link("Foger Switch Pro Kit", cat("vape-kits", { brand: "Foger" })),
          link("Pod Salt Onyx Cloud X", cat("vape-kits", { brand: "Pod Salt", q: "onyx" })),
          link("Pod Salt Hit 40K", cat("vape-kits", { brand: "Pod Salt", q: "hit 40k" })),
          link("Pod Salt Air 40K", cat("vape-kits", { brand: "Pod Salt", q: "air 40k" })),
          link("Off Stamp X-Cube Kit", cat("vape-kits", { brand: "Off Stamp" })),
          link("X-Posed 35K Kit", cat("vape-kits", { brand: "X-Posed" })),
          link("Mi-Pod Pro", cat("vape-kits", { brand: "Mi-Pod" })),
          link("Lost Mary Nera Fullview", cat("vape-kits", { brand: "Lost Mary" })),
          link("Smok Nord & Novo", cat("vape-kits", { brand: "Smok" })),
          link("Caliburn", cat("vape-kits", { brand: "Caliburn" })),
        ],
      },
      { title: "Shop by type", links: [link("Pod Kits", cat("vape-kits", { sub: "pod-kits" })), link("Vape Kits", cat("vape-kits", { sub: "vape-kits" })), link("Nixodine Pods", cat("nixodine"))] },
    ],
  },
  vaporizers: {
    name: "Vaporizers",
    columns: [
      { title: "Shop by brand", brands: true, limit: 10 },
      {
        title: "Shop by type",
        links: [
          link("Puffco Devices", cat("vaporizers", { brand: "Puffco", q: "peak,proxy,pivot,plus" })),
          link("Puffco Accessories", cat("vaporizers", { brand: "Puffco", q: "glass,chamber,atomizer,cap,bag,case,pack,bowl" })),
          link("Puffco Water Pipes", cat("vaporizers", { brand: "Puffco", q: "pipe,bub,wizard,recycler,cupsy,budsy,ripple" })),
          link("Vaporizer Batteries", cat("vaporizers", { q: "battery" })),
          link("Glass & Chambers", cat("vaporizers", { q: "glass,chamber" })),
        ],
      },
    ],
  },
  "nic-pouches": { name: "Nicotine Pouches", columns: [{ title: "Shop by brand", brands: true, limit: 12, twoCols: true }] },
  nixodine: {
    name: "Nixodine",
    columns: [
      { title: "Shop by brand", brands: true, limit: 12 },
      {
        title: "Shop by type",
        links: [
          link("Nixodine Disposables", cat("nixodine", { q: "k" })),
          link("Fifty Bar 20K (Nixodine)", cat("nixodine", { brand: "Fifty Bar" })),
          link("Lost Mary MT35K Turbo (Nixodine)", cat("nixodine", { brand: "Lost Mary" })),
          link("Nixodine E-Liquids (100 mL)", cat("nixodine", { brand: "NIX Liquids" })),
          link("Rinnbar 50K Nixodine", cat("nixodine", { brand: "Rinnbar" })),
          link("Hookah Labs", cat("nixodine", { brand: "Hookah Labs" })),
        ],
      },
    ],
  },
};

const out = {};
for (const [slug, m] of Object.entries(menu)) {
  const total = products.filter((p) => p.category === slug).length;
  out[slug] = {
    name: m.name,
    href: "/shop/" + slug + "/",
    total,
    side: m.side || [],
    columns: m.columns.map((c) => {
      if (c.brands) {
        return {
          title: c.title,
          limit: c.limit,
          twoCols: Boolean(c.twoCols),
          links: brandsFor(slug).map((b) => ({ label: b.label, href: "/browse/?" + new URLSearchParams({ category: slug, brand: b.brand }).toString(), count: b.count })),
        };
      }
      return { title: c.title, limit: c.limit, links: c.links };
    }),
  };
}
fs.writeFileSync(path.join(root, "src/data/mega-menu.json"), JSON.stringify(out, null, 1) + "\n");
console.log("mega-menu.json written:", Object.entries(out).map(([k, v]) => `${k}(${v.columns.length} cols)`).join(", "));
