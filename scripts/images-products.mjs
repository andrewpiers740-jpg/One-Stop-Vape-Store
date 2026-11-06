// scripts/images-products.mjs — localises every product image onto a pure-white square frame.
//   * downloads the source (original kept as `sourceImage` in the data),
//   * flattens transparency onto #fff, trims the uniform border (with a collapse guard),
//   * scales the product to fill ~88% of an 800x800 white canvas (enlarging small sources),
//   * encodes WebP adaptively under ~48 KB,
//   * rewrites src/data/products.json `image` -> /images/products/<slug>.webp
// Resumable: existing outputs are skipped. Failures keep the original remote URL (SmartImage falls back safely).
// Run: node scripts/images-products.mjs [--limit N]
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const DATA = path.resolve("src/data/products.json");
const OUT = path.resolve("public/images/products");
const FAIL_LOG = path.resolve("docs/_product-image-failures.json");
const CANVAS = 800;
const FILL = 0.88;
const BUDGET = 48 * 1024;
const CONCURRENCY = 8;
const limit = Number(process.argv.includes("--limit") ? process.argv[process.argv.indexOf("--limit") + 1] : Infinity);

fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(path.dirname(FAIL_LOG), { recursive: true });
const products = JSON.parse(fs.readFileSync(DATA, "utf8"));

async function download(url, tries = 3) {
  let err;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(30000), headers: { "user-agent": "Mozilla/5.0 (compatible; OSV-image-localiser)" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return Buffer.from(await res.arrayBuffer());
    } catch (e) {
      err = e;
      await new Promise((r) => setTimeout(r, 600 * (i + 1)));
    }
  }
  throw err;
}

async function process1(buf) {
  let img = sharp(buf, { animated: false }).flatten({ background: "#ffffff" });
  const meta = await img.metadata();
  let work = await img.png().toBuffer();
  try {
    const t = await sharp(work).trim({ background: "#ffffff", threshold: 14 }).toBuffer({ resolveWithObject: true });
    // guard: keep the trim only if neither side collapses below ~12% of the original
    if (t.info.width >= (meta.width || 1) * 0.12 && t.info.height >= (meta.height || 1) * 0.12) work = t.data;
  } catch { /* nothing to trim */ }
  const inner = Math.round(CANVAS * FILL);
  const scaled = await sharp(work).resize(inner, inner, { fit: "inside", kernel: "lanczos3", withoutEnlargement: false, background: "#ffffff" }).toBuffer({ resolveWithObject: true });
  const upscaled = scaled.info.width > (meta.width || 0) * 1.1 || scaled.info.height > (meta.height || 0) * 1.1;
  const left = Math.round((CANVAS - scaled.info.width) / 2);
  const top = Math.round((CANVAS - scaled.info.height) / 2);
  let canvas = sharp({ create: { width: CANVAS, height: CANVAS, channels: 3, background: "#ffffff" } }).composite([{ input: scaled.data, left, top }]);
  if (upscaled) canvas = sharp(await canvas.png().toBuffer()).sharpen({ sigma: 0.8 });
  const raw = await canvas.png().toBuffer();
  let out;
  for (const q of [86, 80, 74, 68, 62, 56, 50, 44, 38]) {
    out = await sharp(raw).webp({ quality: q, effort: 5 }).toBuffer();
    if (out.length <= BUDGET) break;
  }
  return { out, srcW: meta.width, srcH: meta.height, upscaled };
}

const todo = products.filter((p) => p.image?.startsWith("http")).slice(0, limit);
const failures = [];
let done = 0, skipped = 0;
let idx = 0;

async function worker() {
  while (idx < todo.length) {
    const p = todo[idx++];
    const file = path.join(OUT, `${p.slug}.webp`);
    try {
      if (!fs.existsSync(file)) {
        const buf = await download(p.image);
        const r = await process1(buf);
        fs.writeFileSync(file, r.out);
      } else skipped++;
      p.sourceImage = p.sourceImage || p.image;
      p.image = `/images/products/${p.slug}.webp`;
      done++;
    } catch (e) {
      failures.push({ slug: p.slug, url: p.image, error: String(e.message || e) });
    }
    if ((done + failures.length) % 100 === 0) console.log(`progress ${done + failures.length}/${todo.length} (ok ${done}, failed ${failures.length}, skipped ${skipped})`);
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker));
// products.json holds references to the same object instances, so write back the mutated array.
fs.writeFileSync(DATA, JSON.stringify(products, null, 2));
fs.writeFileSync(FAIL_LOG, JSON.stringify(failures, null, 2));
const sizes = fs.readdirSync(OUT).map((f) => fs.statSync(path.join(OUT, f)).size);
console.log(`DONE ok=${done} failed=${failures.length} files=${sizes.length} totalMB=${(sizes.reduce((a, b) => a + b, 0) / 1e6).toFixed(1)} avgKB=${(sizes.reduce((a, b) => a + b, 0) / sizes.length / 1024).toFixed(1)}`);
