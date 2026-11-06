// Builds transparent logo variants from public/brand/logo.webp (white-background original).
// Flood-fills near-white pixels connected to the image edge to transparent, keeping the
// logo's own white outline (it is enclosed by the black outer stroke) intact.
import sharp from "sharp";
import path from "node:path";

const dir = path.resolve("public/brand");
const src = path.join(dir, "logo.webp");

const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h } = info;
const isBg = (i) => data[i] > 238 && data[i + 1] > 238 && data[i + 2] > 238;
const seen = new Uint8Array(w * h);
const stack = [];
const push = (x, y) => {
  if (x < 0 || y < 0 || x >= w || y >= h) return;
  const p = y * w + x;
  if (seen[p] || !isBg(p * 4)) return;
  seen[p] = 1;
  stack.push(p);
};
for (let x = 0; x < w; x++) { push(x, 0); push(x, h - 1); }
for (let y = 0; y < h; y++) { push(0, y); push(w - 1, y); }
while (stack.length) {
  const p = stack.pop();
  const x = p % w, y = (p / w) | 0;
  push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1);
}
for (let p = 0; p < w * h; p++) if (seen[p]) data[p * 4 + 3] = 0;

const base = sharp(data, { raw: { width: w, height: h, channels: 4 } });
const trimmedPng = await base.clone().png().toBuffer();
const trimmed = { data: await sharp(trimmedPng).trim({ threshold: 1 }).png().toBuffer() };
console.log("trimmed", (await sharp(trimmed.data).metadata()).width);
await sharp(trimmed.data).resize({ width: 900 }).webp({ quality: 90 }).toFile(path.join(dir, "logo-transparent.webp"));
await sharp(trimmed.data).resize({ width: 900 }).png().toFile(path.join(dir, "logo-transparent.png"));
// Square mark (cloud) for favicon / app icon: left ~38% of the trimmed logo
const t = await sharp(trimmed.data).metadata();
const cloudW = Math.round(t.width * 0.4);
const cloud = await sharp(trimmed.data).extract({ left: 0, top: 0, width: cloudW, height: t.height }).toBuffer();
await sharp(cloud).resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(path.join(dir, "icon-512.png"));
await sharp(cloud).resize(180, 180, { fit: "contain", background: { r: 10, g: 10, b: 10, alpha: 1 } }).png().toFile(path.join(dir, "apple-touch-icon.png"));
await sharp(cloud).resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(path.join(dir, "favicon-32.png"));

// Dominant non-black/white hues for the record
const small = await sharp(src).resize(120).raw().toBuffer({ resolveWithObject: true });
const hist = new Map();
for (let i = 0; i < small.data.length; i += small.info.channels) {
  const [r, g, b] = [small.data[i], small.data[i + 1], small.data[i + 2]];
  if (Math.max(r, g, b) - Math.min(r, g, b) < 60) continue; // skip greys
  const k = `#${[r, g, b].map((v) => ((v >> 5) << 5).toString(16).padStart(2, "0")).join("")}`;
  hist.set(k, (hist.get(k) || 0) + 1);
}
console.log([...hist.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8));
