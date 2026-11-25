// lib/seo.js — applies the approved keyword map (src/data/seo-map.json) to titles, meta descriptions, H1s and on-page copy.
// Everything written here is derived from the catalog data and site config (no invented facts, reviews or statistics).
import map from "@/src/data/seo-map.json";
import { SITE } from "@/src/config/site";
import { oldPathOf, staticUrl } from "@/lib/urlmap";

export const SEO_UPDATED = map.generated; // shown as "Last updated" and used for dateModified

export const seoEntry = (path) => map.pages[path] || map.pages[oldPathOf(path)] || null;

const SMALL = new Set(["a", "an", "and", "as", "at", "by", "for", "in", "of", "on", "or", "the", "to", "vs", "with"]);
export const titleCase = (s) =>
  String(s || "")
    .split(/\s+/)
    .filter(Boolean)
    .map((w, i) => (i > 0 && SMALL.has(w.toLowerCase()) ? w.toLowerCase() : /[A-Z]/.test(w.slice(1)) || /^\d/.test(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");

// Secondary keywords that read cleanly inside a sentence (drops local shop names, symbols and doubled brand fragments).
const BAD = /&|@|\bnear\b|\.com|\d{3} tobacco|reddit|\d{3,} puff|\bvs\b|\bwhere\b|\bhow\b|\bwhat\b/i;
export const cleanSecondaries = (e, exclude = []) => {
  const ex = exclude.map((x) => x.toLowerCase());
  return (e?.s || []).filter((k) => !BAD.test(k) && !ex.includes(k.toLowerCase()) && k.length <= 48);
};

const money = (n) => `$${Number(n).toFixed(2)}`;
const list = (a) => (a.length <= 1 ? a.join("") : `${a.slice(0, -1).join(", ")} and ${a[a.length - 1]}`);
const sentenceCase = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// ---------- facts from the catalog slice shown on a page ----------
export function factsFor(items) {
  const prices = items.map((p) => p.price).filter((n) => n > 1).sort((a, b) => a - b);
  const brandCount = {};
  items.forEach((p) => { const b = (p.brand || "").trim(); if (b) brandCount[b] = (brandCount[b] || 0) + 1; });
  const brands = Object.entries(brandCount).sort((a, b) => b[1] - a[1]).map((x) => x[0]);
  const uniq = (k) => [...new Set(items.map((p) => p[k]).filter(Boolean))];
  const puffs = uniq("puffs").map((s) => parseInt(String(s).replace(/,/g, ""), 10)).filter((n) => n > 1000).sort((a, b) => a - b);
  return {
    n: items.length,
    lo: prices[0], hi: prices[prices.length - 1],
    under15: prices.filter((x) => x < 15).length,
    mid: prices.filter((x) => x >= 15 && x < 30).length,
    over30: prices.filter((x) => x >= 30).length,
    brands,
    nicotine: uniq("nicotine").slice(0, 5),
    packs: [...new Set(items.flatMap((p) => String(p.packSize || "").split(",").map((s) => s.trim()).filter(Boolean)))].slice(0, 6),
    puffLo: puffs[0], puffHi: puffs[puffs.length - 1],
    picks: items.slice(0, 6),
  };
}

// ---------- title / meta / H1 ----------
// Title with a buy-intent power word near the start (rule 7). Adds "Buy" / "Online" only when the keyphrase does not already carry them.
export const POWER = /\b(buy|shop|best|order|get|deal|deals|save|premium|exclusive|limited|official)\b/i;
export function powerTitle(Pt, extra = "", tail = ` | ${SITE.name}`) {
  const lead = POWER.test(Pt) ? "" : "Buy ";
  const online = /\bonline\b/i.test(Pt) ? "" : " Online";
  return `${lead}${Pt}${extra}${online}${tail}`;
}
// first variant within ~60 characters, else within 65, else within 70, else the last (shortest) one
export const fitTitle = (vs) => vs.find((v) => v.length <= 60) || vs.find((v) => v.length <= 65) || vs.find((v) => v.length <= 70) || vs[vs.length - 1];
export function seoTitle(e, fallback, extra = "") {
  if (!e) return fallback;
  const ex = /vapes?/i.test(e.p) ? extra.replace(/ Vapes( &)?/i, "") : extra;
  const Pt = titleCase(e.p);
  return fitTitle([powerTitle(Pt, ex), powerTitle(Pt), powerTitle(Pt, "", ""), powerTitle(Pt, "", "").replace(/ Online$/, "")]);
}
// Meta description: primary keyphrase + the first two clean secondaries, kept at or under 160 characters.
export function seoMeta(e, facts, fallback) {
  if (!e) return fallback;
  const sec = cleanSecondaries(e, [e.p]).slice(0, 2);
  const range = facts.lo ? ` ${money(facts.lo)}–${money(facts.hi)}.` : "";
  const browse = (n) => (sec.length ? ` Browse ${list(sec.slice(0, n))}.` : "");
  const variants = [
    `Shop ${e.p} at ${SITE.name}: ${facts.n} products.${browse(2)}${range} Tracked US shipping from Phoenix, AZ. Adults 21+ only.`,
    `Shop ${e.p} at ${SITE.name}: ${facts.n} products.${browse(2)}${range} Tracked US shipping. Adults 21+ only.`,
    `Shop ${e.p} at ${SITE.name}: ${facts.n} products.${browse(1)}${range} Tracked US shipping. Adults 21+ only.`,
    `Shop ${e.p} at ${SITE.name}: ${facts.n} products.${browse(1)}${range} Adults 21+ only.`,
    `Shop ${e.p} at ${SITE.name}: ${facts.n} products.${range} Adults 21+ only.`,
  ];
  return variants.find((v) => v.length <= 160) || variants[variants.length - 1].slice(0, 160);
}
// H1 must contain the primary keyphrase.
export function seoH1(e, fallback, brandLabel = "") {
  if (!e) return fallback;
  const base = titleCase(e.p);
  if (fallback.toLowerCase().includes(e.p.toLowerCase())) return fallback;
  if (base.toLowerCase().includes(fallback.toLowerCase())) return base;
  if (brandLabel && !e.p.toLowerCase().includes(brandLabel.toLowerCase())) return `${base} – ${fallback}`;
  return base === fallback ? fallback : `${base} – ${fallback}`;
}

// ---------- on-page copy (answer-first sections, FAQ) ----------
// The primary keyphrase is used in numbered "slots"; slots beyond K are replaced by a neutral phrase so the keyphrase
// density lands near 2% (rule 5) instead of being stuffed. Slots 1, 2 and 9 (first H2, first paragraph, first FAQ question) are always kept.
const MUST = new Set([1, 2, 9]);
function build(e, label, items, K, noPicks = false) {
  const f = factsFor(items);
  const P = e.p;
  const Pt = titleCase(P);
  const use = (i) => MUST.has(i) || i <= K;
  const X = (i, alt) => (use(i) ? P : alt); // primary or a neutral reference
  const sec = cleanSecondaries(e, [P]);
  const [s0, s1, s2, s3] = [sec[0], sec[1], sec[2], sec[3]];
  const more = sec.slice(4, 8);
  const brandText = f.brands.length > 1 ? `from ${list(f.brands.slice(0, 4))}${f.brands.length > 4 ? ` and ${f.brands.length - 4} more brands` : ""}` : f.brands.length ? `from ${f.brands[0]}` : "";
  const range = f.lo ? `priced from ${money(f.lo)} to ${money(f.hi)}` : "";
  const age = SITE.compliance.ageThreshold;
  const sections = [];
  sections.push({
    h2: use(1) ? `${Pt}: what you can buy at ${SITE.name}` : `What you can buy at ${SITE.name}`,
    p: [`${sentenceCase(X(2, "this range"))} at ${SITE.name} covers ${f.n} ${f.n === 1 ? "product" : "products"} ${brandText}${range ? `, ${range}` : ""}. Every order ships from Phoenix, Arizona with tracked delivery and an adult signature for customers aged ${age} or over. Use the filters to narrow ${X(3, "the list")} by brand, price and strength.`],
  });
  if (s0) {
    const picks = noPicks ? [] : f.picks.slice(0, 5).map((p) => `${p.title} (${money(p.price)})`);
    sections.push({
      h2: `Shop ${titleCase(s0)}`,
      p: [`Looking for ${s0}${s1 ? ` or ${s1}` : ""}? ${picks.length ? `Popular picks in ${X(4, "this selection")} include ${list(picks)}.` : ""} Each product page lists the available pack sizes and options, and the price shown updates when you choose one.`],
    });
  }
  if (s1) {
    const opts = [];
    if (f.nicotine.length) opts.push(`nicotine options include ${list(f.nicotine)}`);
    if (f.packs.length) opts.push(`pack sizes include ${list(f.packs)}`);
    if (f.puffLo && f.puffHi && f.puffLo !== f.puffHi) opts.push(`puff counts run from ${f.puffLo.toLocaleString("en-US")} to ${f.puffHi.toLocaleString("en-US")}`);
    sections.push({
      h2: `How do I choose ${s1}?`,
      p: [`When comparing ${s1} within ${X(5, "this range")}, check the details on each product page. ${opts.length ? `In this range, ${list(opts)}.` : "Each product page lists strength, size and flavor."} ${s2 ? `If you are also comparing ${s2}, open the related collections linked above the product grid.` : ""} Adults aged ${age}+ only.`],
    });
  }
  if (f.lo) {
    const bands = [];
    if (f.under15) bands.push(`${f.under15} under $15`);
    if (f.mid) bands.push(`${f.mid} from $15 to $30`);
    if (f.over30) bands.push(`${f.over30} at $30 or more`);
    sections.push({
      h2: use(6) ? `${Pt} price guide` : "Price guide",
      p: [`${sentenceCase(X(7, "this range"))} currently starts at ${money(f.lo)} and tops out at ${money(f.hi)}. ${bands.length ? `Of the ${f.n} listed, ${list(bands)}.` : ""} ${s3 ? `Prices for ${s3} follow the same bands.` : ""} Orders over $${SITE.order.freeShippingThreshold} after any discount ship free.`],
    });
  }
  if (more.length >= 2) {
    sections.push({
      h2: "Related searches",
      p: [`Shoppers who start with ${X(13, "this range")} often also look at ${list(more)}. Each of these has its own filtered page linked in the filters, so you can compare brands, prices and strengths side by side.`],
    });
  }
  sections.push({
    h2: use(8) ? `Delivery, age verification and returns for ${P}` : "Delivery, age verification and returns",
    p: [`Orders are packed within 1 to 3 business days and usually arrive within 2 to 7 days, tracked, from our Phoenix, Arizona location. An adult aged ${age} or over must sign for every parcel. Eligible returns are accepted within 30 days; see the returns page for the conditions.`],
    links: [{ label: "Shipping details", href: staticUrl("/shipping/") }, { label: "Returns policy", href: staticUrl("/refunds/") }],
  });
  const faqs = [
    { q: `What is ${P} at ${SITE.name}?`, a: `${sentenceCase(X(10, "This selection"))} is ${f.n} ${f.n === 1 ? "product" : "products"} on this page${brandText ? `, ${brandText}` : ""}${range ? `, ${range}` : ""}. Use the filters to browse by brand, price and strength.` },
    { q: use(11) ? `How much does ${P} cost?` : "How much do these products cost?", a: f.lo ? `Prices run from ${money(f.lo)} to ${money(f.hi)}, depending on brand, size and pack. The price on each product page updates when you pick an option.` : "Open any product to see its current price." },
    { q: "Which brands are included?", a: f.brands.length ? `This selection includes ${list(f.brands.slice(0, 6))}${f.brands.length > 6 ? ` and ${f.brands.length - 6} more` : ""}.` : "Browse the product list above for the brands available." },
    { q: `Can I buy ${X(12, "these products")} if I am under ${age}?`, a: `No. ${SITE.name} sells to adults aged ${age} or over only, and an adult must sign for delivery.` },
    { q: "How fast do orders ship?", a: `Orders are handled within 1 to 3 business days and typically arrive within 2 to 7 days, tracked. Orders over $${SITE.order.freeShippingThreshold} after any discount ship free.` },
  ];
  if (s0) faqs.push({ q: `Where can I find ${s0}?`, a: `${sentenceCase(s0)} products are part of this selection where available. Use the brand and price filters to narrow the list.` });
  const text = sections.flatMap((x) => x.p).join(" ") + " " + sections.map((x) => x.h2).join(" ") + " " + faqs.map((q) => q.q + " " + q.a).join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  const count = text.toLowerCase().split(P.toLowerCase()).length - 1;
  return { sections, faqs, words, count, density: (count / words) * 100, primary: P, alt: `${Pt}${s0 ? ` – ${s0}` : ""}`, tags: [P, ...sec.slice(0, 7)] };
}

// kind: category | brand | collection. Returns { sections, faqs, words, count, density }.
export function listingCopy({ e, label, kind, items }) {
  if (!e) return null;
  let best = null;
  for (let K = 16; K >= 0; K--) {
    const c = build(e, label, items, K);
    best = c;
    if (c.density <= 2.4) break;
  }
  if (best.density > 2.4) best = build(e, label, items, 0, true);
  return best;
}
