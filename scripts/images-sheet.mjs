// scripts/images-sheet.mjs <out.png> <query|page> [offset] — numbered contact sheet of pool photos for visual curation.
import sharp from "sharp";
import { loadPool, downloadRaw } from "./lib/unsplash.mjs";

const [out, query, offsetArg] = process.argv.slice(2);
const pool = loadPool();
const key = Object.keys(pool.queries).find((k) => k.startsWith(`${query}|`));
if (!key) throw new Error("query not in pool: " + query);
const ids = pool.queries[key].slice(Number(offsetArg || 0), Number(offsetArg || 0) + 30);
const W = 300, H = 200, COLS = 6;
const tiles = await Promise.all(ids.map(async (id, i) => {
  const p = pool.photos[id];
  const buf = await downloadRaw(p, { width: 400, quality: 60 });
  const img = await sharp(buf).resize(W, H, { fit: "cover" }).toBuffer();
  const label = Buffer.from(`<svg width="${W}" height="${H}"><rect x="0" y="0" width="38" height="24" fill="#000a"/><text x="5" y="18" font-size="16" fill="#fff" font-family="Arial" font-weight="700">${i}</text></svg>`);
  return { input: await sharp(img).composite([{ input: label }]).toBuffer(), left: (i % COLS) * W, top: Math.floor(i / COLS) * H };
}));
const rows = Math.ceil(ids.length / COLS);
await sharp({ create: { width: W * COLS, height: H * rows, channels: 3, background: "#222" } }).composite(tiles).png().toFile(out);
console.log("ids:", ids.join(","));
