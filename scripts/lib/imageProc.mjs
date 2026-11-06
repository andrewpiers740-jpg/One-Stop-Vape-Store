// scripts/lib/imageProc.mjs — shared processing pass for sourced photos: crop to slot aspect, light tone match,
// adaptive WebP under a KB budget. (AVIF siblings are not written: on Vercel next/image negotiates AVIF at runtime.)
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

export async function processTo(buf, outFile, { width, height, budgetKB = 120, position = "attention" }) {
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  const pos = position === "attention" ? sharp.strategy.attention : position;
  const base = await sharp(buf)
    .rotate()
    .resize(width, height, { fit: "cover", position: pos, kernel: "lanczos3" })
    .modulate({ saturation: 1.04 }) // light consistent tone pass across sources
    .toBuffer();
  let out;
  for (const q of [82, 76, 70, 64, 58, 52, 46, 40, 34]) {
    out = await sharp(base).webp({ quality: q, effort: 5 }).toBuffer();
    if (out.length <= budgetKB * 1024) break;
  }
  fs.writeFileSync(outFile, out);
  return out.length;
}
