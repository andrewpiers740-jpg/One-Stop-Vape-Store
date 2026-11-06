// lib/variants.js — product options (strength, packaging size) and their prices.
// Pure functions, used by the product page (browser) and by lib/catalog.js (server price authority).
//
// Where the data comes from:
//   - strength options  <- the product's `nicotine` list ("9mg, 12mg, 15mg", "Standard 9mg, Strong 12mg, Magnum 15mg")
//   - packaging options <- the product's `packSize` list ("Single, 5 Pack")
//   - prices            <- the catalogue's price range ("$6.99 - $29.99"): the first pack option is the low end and the
//                          last is the high end. Strengths of one product share a price unless a price is set below.
//   - exact prices      <- src/data/variant-prices.json overrides everything: { "<slug>": { "5 Pack": 27.99, "12mg": 7.49 } }.
//                          Use it whenever the supplier price list differs from the derived values.
import overrides from "@/src/data/variant-prices.json";

const round2 = (n) => Math.round(n * 100) / 100;
const mgOf = (s) => parseFloat((String(s).match(/(\d+(?:\.\d+)?)\s*mg/i) || [])[1]);

function parseStrengths(nicotine) {
  if (!nicotine || !/,/.test(nicotine)) return [];
  const seen = new Set();
  const parts = String(nicotine).split(",").map((s) => s.trim()).filter((s) => Number.isFinite(mgOf(s)));
  const out = parts.filter((s) => (seen.has(s.toLowerCase()) ? false : (seen.add(s.toLowerCase()), true)));
  out.sort((a, b) => mgOf(a) - mgOf(b));
  return out.length > 1 ? out : [];
}

function parsePacks(packSize) {
  if (!packSize || !/,/.test(packSize)) return [];
  const out = String(packSize).split(",").map((s) => s.trim()).filter(Boolean);
  return out.length > 1 ? out : [];
}

function bounds(p) {
  const nums = [...String(p.rawPrice || "").matchAll(/\$\s*([\d.]+)/g)].map((m) => parseFloat(m[1])).filter(Number.isFinite);
  if (!nums.length) return [p.price, p.price];
  return [Math.min(...nums), Math.max(...nums)];
}

// -> [{ id, label, options: [{ value, label, price? }] }]. Empty array = a simple product with nothing to choose.
export function getVariantGroups(p) {
  const groups = [];
  const strengths = parseStrengths(p.nicotine);
  const ov = overrides[p.slug] || {};
  if (strengths.length) {
    groups.push({ id: "strength", label: "Strength", options: strengths.map((s) => ({ value: s, label: s, price: typeof ov[s] === "number" ? ov[s] : undefined })) });
  }
  const packs = parsePacks(p.packSize);
  if (packs.length) {
    const [lo, hi] = bounds(p);
    const derived = (i) => (packs.length === 2 ? (i === 0 ? lo : hi) : undefined);
    const options = packs.map((s, i) => ({ value: s, label: s, price: typeof ov[s] === "number" ? ov[s] : derived(i) }));
    // Only offer pack sizes whose price we actually know — never guess one.
    if (options.every((o) => typeof o.price === "number")) groups.push({ id: "pack", label: "Packaging size", options });
  }
  return groups;
}

// selection: { strength?: string, pack?: string }. Missing groups default to their first option.
// -> { ok:true, price, label, selection } | { ok:false, error }
export function resolveVariant(p, selection) {
  const groups = getVariantGroups(p);
  const sel = {};
  const labels = [];
  let price = p.price;
  for (const g of groups) {
    const want = selection && typeof selection[g.id] === "string" ? selection[g.id] : g.options[0].value;
    const opt = g.options.find((o) => o.value === want);
    if (!opt) return { ok: false, error: `Please choose a valid ${g.label.toLowerCase()} for ${p.title}.` };
    sel[g.id] = opt.value;
    labels.push(opt.label);
    if (typeof opt.price === "number") price = opt.price;
  }
  return { ok: true, price: round2(price), label: labels.join(" · "), selection: sel };
}

export const variantKey = (slug, selection) => {
  const s = selection && typeof selection === "object" ? Object.keys(selection).sort().map((k) => `${k}=${selection[k]}`).join("&") : "";
  return s ? `${slug}?${s}` : slug;
};
