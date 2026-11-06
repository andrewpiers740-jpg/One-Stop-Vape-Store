// scripts/images-tiles.mjs — category tiles built from the store's own product photos (real bottles, pouch cans, devices)
// for categories where a stock photo can't show the actual product. a row of four different brands on a soft brand-tint card.
//   node scripts/images-tiles.mjs
import fs from "node:fs";
import sharp from "sharp";

const products = JSON.parse(fs.readFileSync("src/data/products.json", "utf8"));
const si = JSON.parse(fs.readFileSync("src/data/site-images.json", "utf8"));
const credits = JSON.parse(fs.readFileSync("src/data/image-credits.json", "utf8"));

const TILES = {
  "vape-juice": { alt: "Bottles of e-liquid from four different brands", pick: (p) => /ejuice|e-juice|eliquid|salts|juice/i.test(p.title) },
  "nic-pouches": { alt: "Cans of nicotine pouches from four different brands", pick: () => true },
  nixodine: { alt: "Nixodine products from the catalogue", pick: () => true },
};
// One row of four cards in the upper half: the tile's title and blurb are overlaid on the lower half on the site.
const W = 1200, H = 900, G = 28, CARD = 262;
const X0 = (W - (CARD * 4 + G * 3)) / 2;

for (const [slug, cfg] of Object.entries(TILES)) {
  const seen = new Set();
  const chosen = [];
  for (const p of products.filter((x) => x.category === slug && x.inStock !== false && cfg.pick(x))) {
    if (seen.has(p.brand) || !fs.existsSync("public" + p.image)) continue;
    seen.add(p.brand); chosen.push(p);
    if (chosen.length === 4) break;
  }
  if (chosen.length < 4) { for (const p of products.filter((x) => x.category === slug && !chosen.includes(x))) { chosen.push(p); if (chosen.length === 4) break; } }
  const layers = [];
  for (let i = 0; i < 4; i++) {
    const x = Math.round(X0 + i * (CARD + G)), y = 150;
    const card = await sharp({ create: { width: Math.round(CARD), height: Math.round(CARD), channels: 4, background: "#ffffff" } })
      .composite([{ input: await sharp("public" + chosen[i].image).resize(Math.round(CARD - 40), Math.round(CARD - 40), { fit: "contain", background: "#ffffff" }).toBuffer(), left: 20, top: 20 }])
      .png().toBuffer();
    const rounded = await sharp(card).composite([{ input: Buffer.from(`<svg width="${Math.round(CARD)}" height="${Math.round(CARD)}"><rect width="100%" height="100%" rx="28" ry="28"/></svg>`), blend: "dest-in" }]).png().toBuffer();
    const shadow = await sharp({ create: { width: Math.round(CARD), height: Math.round(CARD), channels: 4, background: { r: 15, g: 23, b: 42, alpha: 0.18 } } })
      .composite([{ input: Buffer.from(`<svg width="${Math.round(CARD)}" height="${Math.round(CARD)}"><rect width="100%" height="100%" rx="28" ry="28"/></svg>`), blend: "dest-in" }]).blur(14).png().toBuffer();
    layers.push({ input: shadow, left: x, top: y + 10 }, { input: rounded, left: x, top: y });
  }
  const bg = Buffer.from(`<svg width="${W}" height="${H}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d1ecff"/><stop offset="1" stop-color="#eaf6ff"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`);
  const out = `public/images/categories/${slug}.webp`;
  await sharp(bg).composite(layers).webp({ quality: 82 }).toFile(out);
  si.tiles[slug] = { ...si.tiles[slug], src: `/images/categories/${slug}.webp`, alt: cfg.alt };
  delete credits[`/images/categories/${slug}.webp`];
  console.log(slug, chosen.map((p) => p.brand).join(" | "), (fs.statSync(out).size / 1024) | 0, "KB");
}
fs.writeFileSync("src/data/site-images.json", JSON.stringify(si, null, 2));
fs.writeFileSync("src/data/image-credits.json", JSON.stringify(credits, null, 2));
