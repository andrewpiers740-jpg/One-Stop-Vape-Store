// scripts/images-responsive.mjs — smaller copies of the site's images so phones and card grids do not download oversized files.
//   node scripts/images-responsive.mjs            (all)   |   --only=thumbs|banners|logo
// - product card thumbnails: public/images/products/thumbs/<name>.webp (400x400; cards display at about 250px, so 400 covers 1.6x screens)
// - banner variants: <name>-640.webp and <name>-1280.webp next to each 1920px banner (the page picks one with srcset)
// - logo: public/brand/logo-transparent.webp resized to 360px wide
import fs from "fs";
import path from "path";
import sharp from "sharp";

const root = process.cwd();
const only = (process.argv.find((a) => a.startsWith("--only=")) || "").slice(7);
const want = (k) => !only || only === k;

async function write(file, buf) {
  const tmp = file + ".tmp";
  for (let i = 0; i < 6; i++) {
    try { fs.writeFileSync(tmp, buf); fs.renameSync(tmp, file); return; } catch (e) { if (i === 5) throw e; await new Promise((r) => setTimeout(r, 700 * (i + 1))); }
  }
}
async function pool(items, n, fn) {
  let i = 0, done = 0;
  await Promise.all(Array.from({ length: n }, async () => { while (i < items.length) { const it = items[i++]; await fn(it); if (++done % 250 === 0) console.log("  ", done, "/", items.length); } }));
}

if (want("thumbs")) {
  const dir = path.join(root, "public/images/products"), out = path.join(dir, "thumbs");
  fs.mkdirSync(out, { recursive: true });
  const files = fs.readdirSync(dir).filter((f) => /\.webp$/i.test(f));
  let made = 0, bytesIn = 0, bytesOut = 0;
  await pool(files, 4, async (f) => {
    const dest = path.join(out, f);
    const src = path.join(dir, f);
    if (fs.existsSync(dest) && fs.statSync(dest).mtimeMs >= fs.statSync(src).mtimeMs) return;
    const buf = await sharp(fs.readFileSync(src)).resize(400, 400, { fit: "inside", withoutEnlargement: true }).webp({ quality: 74, effort: 5 }).toBuffer();
    await write(dest, buf); made++; bytesIn += fs.statSync(src).size; bytesOut += buf.length;
  });
  console.log(`thumbs: ${made} created (${Math.round(bytesIn / 1024)} KB -> ${Math.round(bytesOut / 1024)} KB), ${files.length} products`);
}

if (want("banners")) {
  const dir = path.join(root, "public/images/banners");
  const files = fs.readdirSync(dir).filter((f) => /\.webp$/i.test(f) && !/-(640|1280)\.webp$/i.test(f));
  for (const f of files) {
    const src = fs.readFileSync(path.join(dir, f));
    for (const w of [640, 1280]) {
      const buf = await sharp(src).resize({ width: w }).webp({ quality: 70, effort: 5 }).toBuffer();
      await write(path.join(dir, f.replace(/\.webp$/i, `-${w}.webp`)), buf);
    }
  }
  console.log(`banners: variants for ${files.length} banners`);
}

if (want("logo")) {
  const f = path.join(root, "public/brand/logo-transparent.webp");
  const meta = await sharp(fs.readFileSync(f)).metadata();
  if (meta.width > 360) {
    const buf = await sharp(fs.readFileSync(f)).resize({ width: 360 }).webp({ quality: 82, alphaQuality: 90 }).toBuffer();
    await write(f, buf);
    console.log(`logo: ${meta.width}px -> 360px, ${buf.length} bytes`);
  } else console.log("logo already <= 360px");
}
