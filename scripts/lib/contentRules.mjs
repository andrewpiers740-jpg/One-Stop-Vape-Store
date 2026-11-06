// scripts/lib/contentRules.mjs — shared validation for AI-written (or hand-written) long-form content.
import fs from "node:fs";

export const BANNED = [
  /\bsafe\b/i, /\bsafer\b/i, /\bsafely\b/i, /\bhealthy\b/i, /\bhealthier\b/i, /non-toxic/i, /guaranteed? success/i, /therapeutic/i,
  /quit smoking/i, /stop smoking/i, /smoking cessation/i, /\bcure[sd]?\b/i, /harmless/i, /risk-free/i, /harm reduction/i, /better for you/i,
  /approved by the fda/i, /fda[- ]approved/i, /100% authentic/i, /lab[- ]tested/i, /laboratory/i, /\bpatented\b/i, /pharmaceutical/i,
  /\bbest in the world\b/i, /\bnumber one\b/i, /as seen on/i,
];

export const SHOP_CATS = ["vape-juice", "coils-pods", "disposables", "vape-kits", "vaporizers", "nic-pouches", "nixodine"];
export const STATIC_PATHS = new Set(["/", "/shop/", "/blog/", "/about/", "/contact/", "/faq/", "/help/", "/shipping/", "/refunds/", "/privacy/", "/terms/", "/pact-act/", "/fda-disclaimer/", "/california-privacy/", "/wholesale/"]);

export const wordCount = (s) => (String(s).replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").match(/\b[\w'’-]+\b/g) || []).length;

export function loadKey() {
  if (process.env.ANTHROPIC_API_KEY) return process.env.ANTHROPIC_API_KEY;
  for (const f of [".env.local", ".env"]) {
    if (fs.existsSync(f)) {
      const m = fs.readFileSync(f, "utf8").match(/^ANTHROPIC_API_KEY=["']?([^"'\r\n]+)["']?/m);
      if (m) return m[1];
    }
  }
  return null;
}

// ctx: { productSlugs:Set<"cat/slug">, blogSlugs:Set<string> }
export function validate(text, { minWords, ctx, minLinks = 2 }) {
  const errors = [];
  const w = wordCount(text);
  if (w < minWords) errors.push(`only ${w} words, need at least ${minWords}`);
  for (const re of BANNED) { const m = text.match(re); if (m) errors.push(`banned wording "${m[0]}" — rephrase without it`); }
  const links = [...text.matchAll(/\]\((\/[^)]*)\)/g)].map((m) => m[1].split("#")[0]);
  if (links.length < minLinks) errors.push(`needs at least ${minLinks} internal links, found ${links.length}`);
  for (const l of links) {
    const prod = l.match(/^\/shop\/([^/]+)\/([^/]+)\/$/);
    const cat = l.match(/^\/shop\/([^/]+)\/$/);
    const blog = l.match(/^\/blog\/([^/]+)\/$/);
    if (prod) { if (!ctx.productSlugs.has(`${prod[1]}/${prod[2]}`)) errors.push(`broken product link ${l}`); }
    else if (cat) { if (!SHOP_CATS.includes(cat[1])) errors.push(`broken category link ${l}`); }
    else if (blog) { if (!ctx.blogSlugs.has(blog[1])) errors.push(`broken blog link ${l}`); }
    else if (!STATIC_PATHS.has(l)) errors.push(`unknown link ${l} — only use the links provided`);
  }
  if (/^#\s/m.test(text)) errors.push("must not contain an H1 (# heading); use ## for sections");
  if (!/21/.test(text)) errors.push("must mention that products are for adults 21+");
  return { ok: errors.length === 0, errors, words: w };
}
