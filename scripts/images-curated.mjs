// scripts/images-curated.mjs — hero, page banners and category tiles from hand-picked Unsplash photos (see pool).
// Output: public/images/{hero,banners,categories}/…  Credits: src/data/image-credits.json
import fs from "node:fs";
import path from "node:path";
import { loadPool, downloadRaw, trackDownload } from "./lib/unsplash.mjs";
import { processTo } from "./lib/imageProc.mjs";

const HERO = [
  ["hero-1-one-stop-shop", "hVcmxpYg1Gc", "A wall of vape devices and e-liquids in a well-stocked vape shop"],
  ["hero-2-vapor-clouds", "4TcUM4qz9Dc", "Adult exhaling a thick vapor cloud against a black background"],
  ["hero-3-flavor-clouds", "pazM9TQJ2Ck", "Swirling blue and magenta smoke representing e-liquid flavor"],
  ["hero-4-disposable-pods", "PYOgYPnNYO0", "Rows of slim disposable vape pods on a dark surface"],
  ["hero-5-premium-eliquid", "7Fofd92SXak", "Bottles of premium e-liquid lined up on a white table"],
];

// page banners (blue smoke set) 1920x480
const SMOKE = ["qIZMt-o2RIk", "ohQinqTl_DE", "jypIYXtYw8c", "Lx6shBsd22Y", "08Jff84I-sA", "usUR2Jfl2N8", "b1RPuThmbA8", "slpTDuenYeM", "PSKEtP7nFRg", "pmXy_shBCmU", "hWwwr-jQDKE", "7dpWnjeEEVs", "h2ag8i7qFNg", "t_V3OcTVFPk", "rKwXm0mySfE", "Q2ZDFTrJ8PY", "nk-JDYs5XJk", "BTPOW5044NA", "PcL6ob39jbs", "4-FOpHohquk"];
const PAGES = ["shop", "blog", "about", "contact", "faq", "help", "shipping", "refunds", "privacy", "terms", "pact-act", "fda-disclaimer", "california-privacy", "wholesale", "search", "wishlist", "account"];
const PAGE_ALT = {
  shop: "Blue vapor swirling on a dark background", blog: "Wisps of blue smoke on black", about: "Soft blue smoke curls", contact: "Blue vapor trails", faq: "Abstract blue smoke", help: "Blue smoke ribbon",
  shipping: "Streaming blue vapor", refunds: "Calm blue smoke", privacy: "Dark blue vapor", terms: "Blue smoke swirl", "pact-act": "Rising blue smoke", "fda-disclaimer": "Wispy blue smoke", "california-privacy": "Blue smoke curve",
  wholesale: "Bold blue smoke plume", search: "Light blue smoke trails", wishlist: "Blue smoke drift", account: "Blue vapor wisp",
};
const CATS = {
  "vape-juice": { banner: "jBDQwPaCGI0", tile: "atzWFItRHy8", altB: "Slices of colorful citrus fruit representing e-liquid flavors", altT: "Dragon fruit and blood orange halves" },
  "coils-pods": { banner: "OdqmOsUgNwk", tile: "sq5lAdfyC5s", altB: "Vape accessories, pods and bottles on a table", altT: "Hands refilling a vape pod" },
  disposables: { banner: "1AR9kNZ6jMI", tile: "Oa0Fb-HVbLQ", altB: "A modern pod device with colorful bokeh lights", altT: "A disposable pod device held in an open hand" },
  "vape-kits": { banner: "M8CrCzlS78Y", tile: "jQSgioaqhpM", altB: "A vape starter kit resting on dark volcanic rock", altT: "A box-mod vape kit on a wooden table" },
  vaporizers: { banner: "6jLWY4myaOw", tile: "3_OGgbdPIdA", altB: "A metal box-mod vaporizer on weathered wood", altT: "A rack of vaporizer pens and cartridges" },
  "nic-pouches": { banner: "SOz6YQcC_5c", tile: "vJVPnu3mp1o", altB: "Dark green mint leaves", altT: "Fresh bright mint leaves" },
  nixodine: { banner: "VgROGebCi80", tile: "j0i8M-2aTPE", altB: "Electric blue neon light bars in the dark", altT: "Streaks of cyan neon light" },
};

const pool = loadPool();
const credits = {};
const get = (id) => { const p = pool.photos[id]; if (!p) throw new Error("not in pool: " + id); return p; };
const credit = (file, id) => { const p = get(id); credits["/" + file.replace(/\\/g, "/")] = { id, by: p.by, byUrl: p.byUrl, page: p.page }; };
const jobs = [];

HERO.forEach(([name, id, alt]) => jobs.push({ id, out: `public/images/hero/${name}.webp`, w: 1600, h: 1000, kb: 170, alt }));
PAGES.forEach((p, i) => jobs.push({ id: SMOKE[i], out: `public/images/banners/${p}.webp`, w: 1920, h: 480, kb: 110, alt: PAGE_ALT[p] }));
Object.entries(CATS).forEach(([slug, c]) => {
  jobs.push({ id: c.banner, out: `public/images/banners/${slug}.webp`, w: 1920, h: 480, kb: 120, alt: c.altB });
  jobs.push({ id: c.tile, out: `public/images/categories/${slug}.webp`, w: 1200, h: 900, kb: 130, alt: c.altT });
});

const used = new Set();
const manifest = [];
for (const j of jobs) {
  if (used.has(j.id)) throw new Error("duplicate photo reused: " + j.id);
  used.add(j.id);
  const p = get(j.id);
  const buf = await downloadRaw(p, { width: Math.max(j.w, 1920), quality: 80 });
  const size = await processTo(buf, path.resolve(j.out), { width: j.w, height: j.h, budgetKB: j.kb });
  await trackDownload(p);
  credit(j.out.replace(/^public/, ""), j.id);
  manifest.push({ file: j.out.replace(/^public/, ""), alt: j.alt, unsplash: j.id, by: p.by, kb: Math.round(size / 1024) });
  console.log(j.out.padEnd(52), Math.round(size / 1024) + " KB");
}

const credFile = path.resolve("src/data/image-credits.json");
const existing = fs.existsSync(credFile) ? JSON.parse(fs.readFileSync(credFile, "utf8")) : {};
fs.writeFileSync(credFile, JSON.stringify({ ...existing, ...credits }, null, 1));
fs.writeFileSync(path.resolve("src/data/site-images.json"), JSON.stringify({
  hero: HERO.map(([name, , alt]) => ({ src: `/images/hero/${name}.webp`, alt })),
  banners: Object.fromEntries(manifest.filter((m) => m.file.includes("/banners/")).map((m) => [path.basename(m.file, ".webp"), { src: m.file, alt: m.alt }])),
  tiles: Object.fromEntries(manifest.filter((m) => m.file.includes("/categories/")).map((m) => [path.basename(m.file, ".webp"), { src: m.file, alt: m.alt }])),
}, null, 1));
fs.mkdirSync("docs", { recursive: true });
fs.writeFileSync("docs/images-manifest-curated.json", JSON.stringify(manifest, null, 1));
console.log("done", manifest.length, "images");
