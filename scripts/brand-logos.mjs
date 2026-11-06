// scripts/brand-logos.mjs — fetches each brand's logo from the brand's own website and saves a trimmed WebP to
// public/logos/<slug>.webp, then writes src/data/brand-logos.json ({ brand: { src, source } }) listing what was found.
// Brands with no logo found are simply absent from the manifest; the carousel renders a clean text mark for those.
//   node scripts/brand-logos.mjs [--only "Geek Bar"]
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const UA = "Mozilla/5.0 (compatible; OneStopVapeStoreBot/1.0; +https://www.onestopvapestore.com)";
const slug = (b) => b.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
// Candidate official domains per brand (first one that yields a usable logo wins).
const SITES = {
  "Geek Bar": ["geekbar.com", "geekbar.us"],
  "Lost Mary": ["lostmary.com", "lostmary.us", "lostmaryofficial.com"],
  "RAZ": ["razvape.com", "raz-vape.com", "razvapes.com"],
  "Foger": ["foger.com", "fogervape.com"],
  "Fifty Bar": ["fiftybar.com", "fiftybarvape.com"],
  "Pod Juice": ["podjuice.com"],
  "Pod Salt": ["podsalt.com"],
  "HorizonTech": ["horizontech.com", "horizontechvape.com"],
  "Mr Fog": ["mrfogvape.com", "mrfog.com"],
  "EB Create": ["ebcreate.com", "ebdesign.com", "ebcreatevape.com"],
  "Cloud Nurdz": ["cloudnurdz.com"],
  "Coastal Clouds": ["coastalclouds.com"],
  "Juice Head": ["juicehead.co", "juicehead.com"],
  "Monster Labs": ["monstervapelabs.com", "monsterlabs.com"],
  "ZYN": ["zyn.com"],
  "American Ice": ["americanice.com", "americaniceus.com"],
  "LUCY": ["lucy.co"],
  "NOAT": ["noat.com", "noatpouches.com"],
  "Hookah Labs": ["hookahlabs.com"],
  "Parfflo": ["parfflo.com"],
  "Geek Labs": ["geeklabs.com"],
  "YOVO": ["yovovape.com"],
  "Rifbar": ["rifbar.com"],
  "Rinnbar": ["rinnbar.com"],
  "Hotbox": ["hotboxvapes.com"],
  "NIX Liquids": ["nixliquids.com", "nixodine.com"],
};

async function get(url, type = "text") {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), 12000);
  try {
    const r = await fetch(url, { headers: { "user-agent": UA, accept: "*/*" }, signal: ctl.signal, redirect: "follow" });
    if (!r.ok) return null;
    return type === "text" ? await r.text() : Buffer.from(await r.arrayBuffer());
  } catch { return null; } finally { clearTimeout(t); }
}

function candidates(html, base) {
  const out = [];
  const abs = (u) => { try { return new URL(u, base).href; } catch { return null; } };
  for (const m of html.matchAll(/<img[^>]+>/gi)) {
    const tag = m[0];
    if (!/logo/i.test(tag)) continue;
    const src = (tag.match(/(?:data-src|src)=["']([^"']+)["']/i) || [])[1];
    if (src && !/^data:/.test(src)) out.push({ url: abs(src), score: 5 });
  }
  for (const m of html.matchAll(/<meta[^>]+property=["']og:image["'][^>]*content=["']([^"']+)["']/gi)) out.push({ url: abs(m[1]), score: 2 });
  for (const m of html.matchAll(/<link[^>]+rel=["'][^"']*(?:apple-touch-icon|icon)[^"']*["'][^>]*href=["']([^"']+)["']/gi)) out.push({ url: abs(m[1]), score: 1 });
  return out.filter((c) => c.url).sort((a, b) => b.score - a.score);
}
// Last resort: the site's own favicon via Google's favicon service (404s when the site has none).
const favicon = (d) => `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${d}&size=256`;

// The carousel sits on white, so white/very light logos are recoloured to the site's ink colour (shape unchanged).
async function norm(buf) {
  const { data, info } = await sharp(buf, { density: 300 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const n = info.width * info.height;
  let opaque = 0, lumSum = 0, minLum = 255;
  for (let i = 0; i < n; i++) {
    const a = data[i * 4 + 3];
    if (a > 128) { const l = 0.2126 * data[i * 4] + 0.7152 * data[i * 4 + 1] + 0.0722 * data[i * 4 + 2]; opaque++; lumSum += l; if (l < minLum) minLum = l; }
  }
  const opaqueFrac = opaque / n, mean = opaque ? lumSum / opaque : 0;
  const INK = [15, 23, 42];
  if (opaqueFrac > 0.6 && opaqueFrac < 0.99 && minLum > 240) {
    // knock-out mask: a white sheet with the logo cut out as transparency -> the cut-out becomes the ink
    for (let i = 0; i < n; i++) { data[i * 4] = INK[0]; data[i * 4 + 1] = INK[1]; data[i * 4 + 2] = INK[2]; data[i * 4 + 3] = 255 - data[i * 4 + 3]; }
  } else if (opaqueFrac > 0.9 && mean > 235 && minLum > 150) {
    // light mark on an opaque white box: luminance becomes opacity
    for (let i = 0; i < n; i++) { const l = 0.2126 * data[i * 4] + 0.7152 * data[i * 4 + 1] + 0.0722 * data[i * 4 + 2]; data[i * 4] = INK[0]; data[i * 4 + 1] = INK[1]; data[i * 4 + 2] = INK[2]; data[i * 4 + 3] = Math.max(0, Math.min(255, (250 - l) * 6)); }
  } else if (opaqueFrac < 0.8 && mean > 200) {
    for (let i = 0; i < n; i++) { data[i * 4] = INK[0]; data[i * 4 + 1] = INK[1]; data[i * 4 + 2] = INK[2]; }
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
}

// A usable logo is raster/SVG, not tiny, with a sensible aspect ratio, and not a photo-like (mostly-opaque, many-colour) image.
async function toLogo(buf) {
  try {
    let img = sharp(buf, { density: 300 }).ensureAlpha();
    const meta = await img.metadata();
    if (!meta.width || !meta.height || meta.width < 48 || meta.height < 24) return null;
    img = sharp(await norm(buf));
    const trimmed = await img.trim({ threshold: 12 }).toBuffer({ resolveWithObject: true });
    const { width: w, height: h } = trimmed.info;
    if (w < 40 || h < 16 || w / h > 12 || h / w > 3) return null;
    return await sharp(trimmed.data).resize({ width: 320, height: 120, fit: "inside", withoutEnlargement: false }).webp({ quality: 90 }).toBuffer();
  } catch { return null; }
}

const only = process.argv.includes("--only") ? process.argv[process.argv.indexOf("--only") + 1] : null;
const outDir = path.resolve("public/logos");
fs.mkdirSync(outDir, { recursive: true });
const manifestFile = path.resolve("src/data/brand-logos.json");
const manifest = fs.existsSync(manifestFile) ? JSON.parse(fs.readFileSync(manifestFile, "utf8")) : {};

for (const [brand, domains] of Object.entries(SITES)) {
  if (only && only !== brand) continue;
  if (manifest[brand] && !only) { console.log(`= ${brand} (have)`); continue; }
  let done = false;
  for (const d of domains) {
    const base = `https://${d}/`;
    const html = await get(base);
    const list = html ? candidates(html, base).slice(0, 6) : [];
    list.push({ url: favicon(d), score: 0 });
    for (const c of list) {
      const raw = await get(c.url, "buf");
      if (!raw) continue;
      const webp = await toLogo(raw);
      if (!webp) continue;
      fs.writeFileSync(path.join(outDir, slug(brand) + ".webp"), webp);
      manifest[brand] = { src: `/logos/${slug(brand)}.webp`, source: d };
      console.log(`+ ${brand} <- ${c.url}`);
      done = true;
      break;
    }
    if (done) break;
  }
  if (!done) console.log(`- ${brand} (no logo found)`);
}
fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 1));
console.log(`\n${Object.keys(manifest).length}/${Object.keys(SITES).length} brands have logos`);
