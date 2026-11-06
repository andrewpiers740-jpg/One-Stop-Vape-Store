// scripts/images-blog-products.mjs — 4 on-niche images per blog post, built from the store's own product photos so every
// picture shows something the topic is actually about (brand posts show that brand, flavor posts show that flavor,
// pouch posts show pouch cans, payment posts get a payment-methods board). Replaces the earlier generic stock photos.
// Output: public/images/blog/<slug>-1..4.webp (1 = 16:9 hero/thumbnail, 2-4 = 3:2 inline), docs/blog-images.json.
//   node scripts/images-blog-products.mjs [--only slug]
import fs from "node:fs";
import sharp from "sharp";

const posts = JSON.parse(fs.readFileSync("src/data/blog-posts.json", "utf8"));
const products = JSON.parse(fs.readFileSync("src/data/products.json", "utf8")).filter((p) => p.inStock !== false && fs.existsSync("public" + p.image));
const credits = JSON.parse(fs.readFileSync("src/data/image-credits.json", "utf8"));
const only = process.argv.includes("--only") ? process.argv[process.argv.indexOf("--only") + 1] : null;
const brands = [...new Set(products.map((p) => p.brand))].sort((a, b) => b.length - a.length);

const hash = (s) => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
const rng = (seed) => () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
const shuffle = (arr, seed) => { const r = rng(seed), a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const TINTS = [["#d1ecff", "#f2f9ff"], ["#dcfce7", "#f7fef9"], ["#fef3c7", "#fffdf2"], ["#e0e7ff", "#f5f7ff"], ["#fce7f3", "#fff5fa"], ["#e2e8f0", "#f8fafc"]];

function pool(post) {
  const title = post.title.toLowerCase();
  const brand = brands.find((b) => title.includes(b.toLowerCase()));
  let list = [];
  if (brand) list = products.filter((p) => p.brand === brand);
  const flavor = post.tags.includes("flavor") ? post.tags.find((t) => t !== "flavor" && !post.shop.includes(t) && !/^(vape-juice|disposables|nixodine|vape-kits|nic-pouches|coils-pods|vaporizers)$/.test(t)) : null;
  if (!list.length && flavor) {
    const term = flavor.replace(/-/g, " ");
    list = products.filter((p) => post.shop.includes(p.category) && (p.title + " " + (p.flavor || "")).toLowerCase().includes(term));
    if (list.length < 4) list = products.filter((p) => (p.title + " " + (p.flavor || "")).toLowerCase().includes(term));
  }
  if (!list.length && post.category === "Nicotine Pouches") list = products.filter((p) => p.category === "nic-pouches");
  if (!list.length && post.category === "Nixodine") list = products.filter((p) => p.category === "nixodine");
  if (list.length < 4) {
    const kw = post.keywords.map((k) => k.toLowerCase());
    const extra = products.filter((p) => kw.some((k) => p.brand.toLowerCase().includes(k)) || post.shop.includes(p.category));
    list = [...list, ...extra.filter((p) => !list.includes(p))];
  }
  if (list.length < 4) list = [...list, ...products.filter((p) => !list.includes(p))];
  // prefer distinct brands first (variety), then everything else
  const sh = shuffle(list, hash(post.slug));
  const seen = new Set(), first = [], rest = [];
  for (const p of sh) (seen.has(p.brand) ? rest : (seen.add(p.brand), first)).push(p);
  return [...first, ...rest];
}

const roundedMask = (w, h, r) => Buffer.from(`<svg width="${w}" height="${h}"><rect width="100%" height="100%" rx="${r}" ry="${r}"/></svg>`);
async function card(file, size) {
  const inner = Math.round(size * 0.86), pad = Math.round((size - inner) / 2), r = Math.round(size * 0.07);
  const base = await sharp({ create: { width: size, height: size, channels: 4, background: "#ffffff" } })
    .composite([{ input: await sharp(file).resize(inner, inner, { fit: "contain", background: "#ffffff" }).toBuffer(), left: pad, top: pad }]).png().toBuffer();
  const body = await sharp(base).composite([{ input: roundedMask(size, size, r), blend: "dest-in" }]).png().toBuffer();
  const shadow = await sharp({ create: { width: size, height: size, channels: 4, background: { r: 15, g: 23, b: 42, alpha: 0.2 } } })
    .composite([{ input: roundedMask(size, size, r), blend: "dest-in" }]).blur(Math.max(6, size / 28)).png().toBuffer();
  return { body, shadow };
}
async function canvas(w, h, tint, cards) {
  const bg = Buffer.from(`<svg width="${w}" height="${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${tint[0]}"/><stop offset="1" stop-color="${tint[1]}"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`);
  const layers = [];
  for (const c of cards) { layers.push({ input: c.shadow, left: c.x, top: c.y + Math.round(c.size / 30) }, { input: c.body, left: c.x, top: c.y }); }
  return sharp(bg).composite(layers);
}
const place = async (items, rects) => Promise.all(items.map(async (p, i) => ({ ...(await card("public" + p.image, rects[i].s)), x: rects[i].x, y: rects[i].y, size: rects[i].s })));

// layouts: 16:9 hero (1280x720) and 3:2 inline (1200x800)
const L = {
  feature: { w: 1280, h: 720, n: 3, rects: [{ x: 150, y: 80, s: 560 }, { x: 770, y: 80, s: 270 }, { x: 770, y: 370, s: 270 }] },
  row3: { w: 1200, h: 800, n: 3, rects: [{ x: 60, y: 210, s: 340 }, { x: 430, y: 210, s: 340 }, { x: 800, y: 210, s: 340 }] },
  grid4: { w: 1200, h: 800, n: 4, rects: [{ x: 250, y: 40, s: 340 }, { x: 610, y: 40, s: 340 }, { x: 250, y: 410, s: 340 }, { x: 610, y: 410, s: 340 }] },
  single: { w: 1200, h: 800, n: 1, rects: [{ x: 320, y: 100, s: 560 }] },
};

async function paymentsBoard(tint) {
  const W = 1200, H = 800, cw = 300, ch = 230, gx = 40, gy = 40;
  const x0 = (W - (cw * 3 + gx * 2)) / 2, y0 = (H - (ch * 2 + gy)) / 2;
  const items = [["applepay", "Apple Pay", "#000"], ["cashapp", "Cash App", "#00c244"], ["chime", "Chime", "#00a060"], ["bitcoin", "Bitcoin", "#f7931a"], ["tether", "USDT", "#26a17b"], ["razer", "Razer Gold gift card", "#44d62c"]];
  const bg = Buffer.from(`<svg width="${W}" height="${H}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${tint[0]}"/><stop offset="1" stop-color="${tint[1]}"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`);
  const layers = [];
  for (let i = 0; i < items.length; i++) {
    const x = Math.round(x0 + (i % 3) * (cw + gx)), y = Math.round(y0 + Math.floor(i / 3) * (ch + gy));
    const dark = items[i][0] === "razer";
    const tile = Buffer.from(`<svg width="${cw}" height="${ch}"><rect width="100%" height="100%" rx="26" ry="26" fill="${dark ? "#0f172a" : "#ffffff"}"/></svg>`);
    layers.push({ input: await sharp(tile).png().toBuffer(), left: x, top: y });
    if (items[i][0] === "chime") {
      layers.push({ input: Buffer.from(`<svg width="${cw}" height="${ch}"><text x="50%" y="58%" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="76" fill="#00a060">chime</text></svg>`), left: x, top: y });
    } else {
      const glyph = await sharp(`public/images/payments/${items[i][0]}.svg`, { density: 600 }).resize(items[i][0] === "applepay" ? 170 : 110, 110, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
      layers.push({ input: glyph, left: x + Math.round((cw - (items[i][0] === "applepay" ? 170 : 110)) / 2), top: y + 36 });
      layers.push({ input: Buffer.from(`<svg width="${cw}" height="60"><text x="50%" y="40" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="28" fill="${dark ? "#ffffff" : "#0f172a"}">${esc(items[i][1])}</text></svg>`), left: x, top: y + ch - 76 });
    }
  }
  return sharp(bg).composite(layers);
}

const names = (items) => { const n = [...new Set(items.map((p) => p.brand))].slice(0, 3); return n.length > 1 ? n.slice(0, -1).join(", ") + " and " + n[n.length - 1] : n[0]; };
const manifest = fs.existsSync("docs/blog-images.json") ? JSON.parse(fs.readFileSync("docs/blog-images.json", "utf8")) : {};
fs.mkdirSync("public/images/blog", { recursive: true });
let made = 0;

for (const post of posts) {
  if (only && post.slug !== only) continue;
  const list = pool(post);
  let cursor = 0;
  const take = (n) => { const out = []; for (let i = 0; i < n; i++) out.push(list[(cursor++) % list.length]); return out; };
  const h = hash(post.slug);
  const payments = post.category === "Payments & Crypto" || post.category === "Gift Card Payments";
  const plan = [["feature", take(3)], [payments ? "payments" : "grid4", payments ? [] : take(4)], ["row3", take(3)], ["single", take(1)]];
  const imgs = [];
  for (let i = 0; i < 4; i++) {
    const [kind, items] = plan[i];
    const tint = TINTS[(h + i * 2) % TINTS.length];
    const file = `public/images/blog/${post.slug}-${i + 1}.webp`;
    let pipeline, w, hgt, alt;
    if (kind === "payments") { pipeline = await paymentsBoard(tint); w = 1200; hgt = 800; alt = "Payment methods accepted at One Stop Vape Store: Apple Pay, Cash App, Chime, Bitcoin, USDT and Razer Gold gift cards"; }
    else {
      const lay = L[kind]; w = lay.w; hgt = lay.h;
      pipeline = await canvas(w, hgt, tint, await place(items, lay.rects));
      alt = `${names(items)} products from the One Stop Vape Store catalogue — ${post.category.toLowerCase()} article image`;
    }
    await pipeline.webp({ quality: 80 }).toFile(file);
    imgs.push({ src: `/images/blog/${post.slug}-${i + 1}.webp`, alt, w, h: hgt, own: true });
    delete credits[`/images/blog/${post.slug}-${i + 1}.webp`];
  }
  manifest[post.slug] = imgs;
  made++;
  if (made % 25 === 0) console.log(`${made} posts…`);
}
fs.writeFileSync("docs/blog-images.json", JSON.stringify(manifest));
fs.writeFileSync("src/data/image-credits.json", JSON.stringify(credits, null, 2));
console.log(`done: ${made} posts, ${made * 4} images`);
