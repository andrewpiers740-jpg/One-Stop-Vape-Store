// lib/seoPages.js — keyword-map builders for pages that are not category/brand/collection listings:
// home, static and utility pages, product pages and blog posts. All facts come from site config, catalog data and the page's own content.
import blogMap from "@/src/data/seo-blog.json";
import prodMap from "@/src/data/seo-products.json";
import urlMapData from "@/src/data/url-map.json";
import { SITE } from "@/src/config/site";
import { productHref } from "@/lib/catUrls";
import { titleCase, cleanSecondaries, seoEntry, powerTitle, fitTitle } from "@/lib/seo";

const sentenceCase = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const list = (a) => (a.length <= 1 ? a.join("") : `${a.slice(0, -1).join(", ")} and ${a[a.length - 1]}`);
const money = (n) => `$${Number(n).toFixed(2)}`;
const age = () => SITE.compliance.ageThreshold;

// seo-blog.json / seo-products.json are keyed by the OLD path; posts and products now carry keyword slugs, so translate back.
const lastSeg = (k) => k.split("/").filter(Boolean).pop();
const blogByOld = Object.fromEntries(Object.entries(blogMap.pages).map(([k, v]) => [lastSeg(k), v]));
const prodByOld = Object.fromEntries(Object.entries(prodMap.pages).map(([k, v]) => [lastSeg(k), v]));
const blogOld = Object.fromEntries(Object.entries(urlMapData.blog).map(([o, n]) => [n, o]));
const prodOld = Object.fromEntries(Object.entries(urlMapData.products).map(([o, n]) => [n, o]));
export const seoBlogEntry = (slug) => blogByOld[blogOld[slug] || slug] || null;
export const seoProductEntry = (cat, slug) => prodByOld[prodOld[slug] || slug] || null;

export const tagsFor = (e, extra = []) => {
  const out = [];
  for (const t of [e.p, ...cleanSecondaries(e, [e.p]).slice(0, 7), ...extra]) if (t && !out.some((x) => x.toLowerCase() === t.toLowerCase())) out.push(t);
  return out.slice(0, 12);
};
export const keywordsString = (e, extra = []) => tagsFor(e, extra).join(", ");

// shorten a title to ~70 characters by dropping trailing parts
const fit = (variants, max = 70) => variants.find((v) => v.length <= max) || variants[variants.length - 1];

// ---------- static, home and utility pages ----------
const T = { cost: `Orders over $${SITE.order.freeShippingThreshold} after any discount ship free, the minimum order is $${SITE.order.minOrder}, and standard shipping under that is $${SITE.order.flatShippingFee}.` };
const STATIC = {
  "/": {
    topic: "home", h2: "what you can shop here",
    a: `${SITE.name} (${SITE.legalName}, established December 2022) sells disposable vapes, Nixodine nicotine-free vapes, nicotine salts and freebase e-liquids, nicotine pouches, pod systems, kits, coils and vaporizers. Orders ship tracked from Phoenix, Arizona, and an adult aged ${age()} or over signs for every delivery.`,
    b: `${T.cost} Accepted payment methods: ${list(SITE.order.paymentMethods.map((m) => m.replace(/ \(.*\)/, "")))}. Crypto and gift-card payments get ${SITE.order.cryptoDiscount}% off.`,
    faqs: [
      ["Where does {site} ship from?", `Every order ships from our Phoenix, Arizona location with tracked delivery, usually arriving within 2 to 7 days after 1 to 3 business days of handling.`],
      ["What is the minimum order?", `The minimum order is $${SITE.order.minOrder}. ${T.cost}`],
      ["Do you sell to people under {age}?", `No. {site} sells to adults aged {age} or over only, and an adult must sign for delivery.`],
    ],
  },
  "/shop/": {
    topic: "shop", h2: "how the catalog is organised",
    a: `The catalog is split into vape juice, disposables, vape kits, coils and pods, nicotine pouches, Nixodine and vaporizers. Every category page lists its brands, flavors, strengths and price bands, so you can narrow the range in a few taps.`,
    b: `${T.cost} Every product page shows the pack sizes and options available, and the price updates when you choose one.`,
    faqs: [
      ["How do I find a specific brand or flavor?", `Use the search box or the filters on any category page. Brand and flavor pages list every matching product.`],
      ["Are all products new and sealed?", `Products are sold as listed on each product page. Contact us on WhatsApp or by email if you need a detail confirmed before you order.`],
    ],
  },
  "/wholesale/": {
    topic: "wholesale", h2: "how our wholesale program works",
    a: `${SITE.name} supplies registered vape shops and other adult-only retailers with volume pricing across disposables, e-liquids, nicotine salts, pods and nicotine pouches. Orders ship from Phoenix, Arizona by regional carrier with adult signature on delivery.`,
    b: `Send an inquiry, share your business documents, receive a written quote, then pay and ship. Prices are confirmed in writing before you pay, and the wholesale order minimum is confirmed in your quote.`,
    faqs: [
      ["Who can buy wholesale?", `Registered businesses that sell to adults only. We may ask for a business license or tax ID, a resale certificate and a retail license where your state requires one.`],
      ["How do I get a wholesale quote?", `Use the inquiry form on the wholesale page, or contact us by email or WhatsApp with your business name, products and estimated monthly volume.`],
    ],
  },
  "/shipping/": {
    topic: "shipping", h2: "how shipping works",
    a: `Orders are handled within 1 to 3 business days and usually arrive within 2 to 7 days by tracked regional carrier from Phoenix, Arizona. ${T.cost}`,
    b: `An adult aged ${age()} or over must sign for every parcel. Free shipping is valid for most of the 48 contiguous US states and does not apply to Hawaii, Alaska, US territories or military addresses.`,
    faqs: [
      ["How long does delivery take?", `Handling takes 1 to 3 business days and transit usually takes 2 to 7 days. Every order is tracked.`],
      ["Who can sign for my parcel?", `An adult aged ${age()} or over. If nobody can sign, the carrier will leave a notice and retry.`],
    ],
  },
  "/blog/": {
    topic: "blog", h2: "what the guides cover",
    a: `The ${SITE.name} blog collects buying guides, how-tos and explainers on disposables, e-liquid, pods and coils, nicotine pouches and Nixodine. Each guide links to the matching products and collections so you can compare and buy in one place.`,
    b: `Guides are written for adults aged ${age()}+ and are general information, not medical or legal advice.`,
    faqs: [
      ["What topics do the guides cover?", `Buying guides for disposable vapes, e-liquid, pods and coils, nicotine pouches and Nixodine, plus how-tos on setup, storage and troubleshooting.`],
      ["Are the guides for adults only?", `Yes. The blog is written for adults aged ${age()} or over.`],
    ],
  },
  "/about/": {
    topic: "about", h2: "about our store",
    a: `${SITE.name} is operated by ${SITE.legalName} and has been trading since December 2022. We sell disposables, e-liquids, nicotine pouches, Nixodine products, pod systems and vaporizers, shipped from ${SITE.contact.location}.`,
    b: `Customer support is available ${SITE.contact.hours}. We sell to adults aged ${age()} or over only and verify age with an adult signature on delivery.`,
    faqs: [
      ["Who runs the store?", `${SITE.name} is operated by ${SITE.legalName} in Phoenix, Arizona.`],
      ["How can I contact the store?", `Email ${SITE.contact.email}, call ${SITE.contact.phone} or message us on WhatsApp at ${SITE.contact.whatsappDisplay}.`],
    ],
  },
  "/contact/": {
    topic: "contact", h2: "how to reach the store",
    a: `You can reach ${SITE.name} by email at ${SITE.contact.email}, by phone on ${SITE.contact.phone} or on WhatsApp at ${SITE.contact.whatsappDisplay}. Support hours are ${SITE.contact.hours}.`,
    b: `Our location is ${SITE.contact.location}. For order questions, include your order ID so we can find it quickly.`,
    faqs: [
      ["What are your support hours?", `${SITE.contact.hours}.`],
      ["Where is the store located?", `${SITE.contact.location}.`],
    ],
  },
  "/faq/": {
    topic: "faq", h2: "quick answers",
    a: `This page answers common questions about Nixodine and formulations, shipping, the PACT Act and age verification, payment methods and discounts, wholesale, orders, products and nicotine, and returns. Pick a topic below, or contact us if your question is not covered.`,
    b: `${T.cost} All orders ship from Phoenix, Arizona to adults aged ${age()} or over.`,
    faqs: [
      ["How do I contact support?", `Email ${SITE.contact.email} or message us on WhatsApp at ${SITE.contact.whatsappDisplay}.`],
    ],
  },
  "/help/": {
    topic: "help", h2: "where to start",
    a: `The help center covers orders, payments, shipping and returns. Use it to track an order, check how to pay, understand delivery times or start a return.`,
    b: `${T.cost} Support is available ${SITE.contact.hours}.`,
    faqs: [
      ["Where can I get help with an order?", `Email ${SITE.contact.email} or message us on WhatsApp at ${SITE.contact.whatsappDisplay} with your order ID.`],
    ],
  },
  "/refunds/": {
    topic: "returns", h2: "how returns work",
    a: `Eligible returns are accepted within 30 days of delivery; a 15% restocking fee applies. See the sections below for what qualifies, how to start a return and how refunds are issued.`,
    b: `Contact ${SITE.contact.email} with your order ID to start a return.`,
    faqs: [
      ["How long do I have to return an item?", `Eligible returns are accepted within 30 days of delivery.`],
    ],
  },
  "/terms/": {
    topic: "terms", h2: "what these terms cover",
    a: `These terms govern the use of ${SITE.name} and purchases made through it. They cover age requirements (${age()}+), ordering, pricing, shipping, returns and your responsibilities as a buyer.`,
    b: `By using the site or placing an order you agree to these terms. Contact ${SITE.contact.email} with any question.`,
    faqs: [
      ["Who can place an order?", `Only adults aged ${age()} or over may place an order.`],
    ],
  },
  "/privacy/": {
    topic: "privacy", h2: "what this policy covers",
    a: `This policy explains what personal information ${SITE.name} collects when you browse or order, how it is used and the choices you have.`,
    b: `For privacy questions or requests, contact ${SITE.contact.email}.`,
    faqs: [
      ["How do I make a privacy request?", `Email ${SITE.contact.email} and tell us what you need.`],
    ],
  },
  "/california-privacy/": {
    topic: "california privacy", h2: "your California privacy rights",
    a: `This notice explains the rights California residents have over their personal information under the CCPA and CPRA, and how to exercise them with ${SITE.name}.`,
    b: `To make a request, contact ${SITE.contact.email}.`,
    faqs: [
      ["How do I exercise my California privacy rights?", `Email ${SITE.contact.email} with your request.`],
    ],
  },
  "/pact-act/": {
    topic: "PACT Act", h2: "what the PACT Act means for buyers",
    a: `The PACT Act sets rules for delivery of vaping products in the United States, including age verification. ${SITE.name} requires an adult aged ${age()} or over to sign for every parcel.`,
    b: `See the answers below for what to expect when ordering.`,
    faqs: [
      ["Do I need to be 21 to order?", `Yes. An adult aged ${age()} or over must place the order and sign for delivery.`],
    ],
  },
  "/fda-disclaimer/": {
    topic: "FDA disclaimer", h2: "what this disclaimer says",
    a: `${SITE.compliance.disclaimer}`,
    b: `Contact ${SITE.contact.email} with any question about this disclaimer.`,
    faqs: [
      ["Are these products approved by the FDA?", `See the disclaimer on this page for the exact statement. Products are intended for adults only.`],
    ],
  },
};

const fillF = (s) => s.replace(/\{site\}/g, SITE.name).replace(/\{age\}/g, String(age()));

// Returns { lead, sections, faqs, tags } for a static/home/utility page, or null when the page has no map entry.
export function staticCopy(path) {
  const e = seoEntry(path);
  const d = STATIC[path];
  if (!e || !d) return null;
  const P = e.p;
  const sec = cleanSecondaries(e, [P]);
  const [s0, s1, s2, s3, s4, s5] = sec;
  const lead = `${sentenceCase(P)}: ${d.a.split(". ")[0].replace(/\.$/, "")}.${s0 ? ` Browse ${s0}${s1 ? ` and ${s1}` : ""} below.` : ""}`;
  const sections = [
    { h2: `${titleCase(P)}: ${d.h2}`, p: [d.a, d.b] },
  ];
  if (s0 && s1) sections.push({ h2: `${titleCase(s0)} and ${titleCase(s1)}`, p: [`Looking for ${s0} or ${s1}? Browse the category pages and filters to compare brands, prices and strengths. Each product page lists its pack sizes and options.`] });
  if (s2) sections.push({ h2: "Related searches", p: [`Shoppers who start with ${P} often also look at ${list([s2, s3, s4, s5].filter(Boolean))}. Each has a filtered page you can open from the shop menu.`] });
  const faqs = d.faqs.map(([q, a]) => ({ q: fillF(q), a: fillF(a) }));
  faqs.unshift({ q: `What is ${P} at ${SITE.name}?`, a: `${sentenceCase(P)} at ${SITE.name}: ${d.a.split(". ")[0].replace(/\.$/, "")}.` });
  if (s0) faqs.push({ q: `Where can I find ${s0}?`, a: `Use the shop menu or search to open the matching category and filter by brand, price or strength.` });
  return { lead, sections, faqs, tags: tagsFor(e), e, alt: `${titleCase(P)}${s0 ? ` – ${s0}` : ""}` };
}

export function staticTitle(path, fallback) {
  const e = seoEntry(path);
  if (!e) return fallback;
  const P = titleCase(e.p);
  const legal = e.nb && ["/refunds/", "/terms/", "/privacy/", "/california-privacy/", "/pact-act/", "/fda-disclaimer/"].includes(path);
  return fitTitle(legal ? [`${P}: Order Vapes With Confidence | ${SITE.name}`, `${P}: Shop With Confidence | ${SITE.name}`, `${P}: Shop With Confidence`, `${P} | ${SITE.name}`] : [powerTitle(P), `${P} | ${SITE.name}`]);
}
export function staticMeta(path, fallback) {
  const e = seoEntry(path);
  const d = STATIC[path];
  if (!e || !d) return fallback;
  const P = e.p;
  const sec = cleanSecondaries(e, [P]).slice(0, 2);
  const fact = d.a.split(". ")[0].replace(/\.$/, "");
  const v = [
    `${sentenceCase(P)} at ${SITE.name}: ${fact}.${sec.length ? ` Browse ${list(sec)}.` : ""} Adults 21+ only.`,
    `${sentenceCase(P)} at ${SITE.name}.${sec.length ? ` Browse ${list(sec)}.` : ""} Tracked US shipping from Phoenix, AZ. Adults 21+ only.`,
    `${sentenceCase(P)} at ${SITE.name}.${sec[0] ? ` Browse ${sec[0]}.` : ""} Adults 21+ only.`,
  ];
  return v.find((x) => x.length <= 160) || v[v.length - 1].slice(0, 160);
}
export const staticH1 = (path, fallback) => {
  const e = seoEntry(path);
  if (!e) return fallback;
  if (fallback.toLowerCase().includes(e.p.toLowerCase())) return fallback;
  if (e.nb) return titleCase(e.p);
  return `${titleCase(e.p)} – ${fallback}`;
};

// ---------- products ----------
const CAT_NOUN = { "vape-juice": "vape juice", disposables: "disposable vape", "vape-kits": "vape kit", "coils-pods": "coil or pod", "nic-pouches": "nicotine pouch", nixodine: "Nixodine product", vaporizers: "vaporizer" };

export function productSeo(product) {
  const e = seoProductEntry(product.category, product.slug);
  if (!e) return null;
  const P = e.nb ? product.title : e.p;
  const Pt = e.nb ? product.title : titleCase(e.p);
  const sec = cleanSecondaries(e, [e.p]);
  const [s0, s1, s2, s3] = sec;
  const noun = CAT_NOUN[product.category] || "product";
  const price = product.price > 1 ? money(product.price) : "";
  const title = fitTitle([powerTitle(Pt), powerTitle(Pt, "", ""), powerTitle(Pt, "", "").replace(/ Online$/, ""), Pt]);
  const bits = [];
  if (product.nicotine) bits.push(String(product.nicotine).replace(/\s*\(.*\)/, ""));
  if (product.packSize) bits.push(String(product.packSize));
  const buy = /^(where|buy|shop|best|order)/i.test(P) ? "" : "Buy ";
  const metaV = [
    `${buy}${P}${price ? ` from ${price}` : ""}${bits.length ? `, ${bits.join(", ")}` : ""}.${s0 ? ` Compare ${s0}${s1 ? ` and ${s1}` : ""}.` : ""} Tracked US shipping. Adults 21+ only.`,
    `${buy}${P}${price ? ` from ${price}` : ""}.${s0 ? ` Compare ${s0}${s1 ? ` and ${s1}` : ""}.` : ""} Tracked US shipping. Adults 21+.`,
    `${buy}${P}${price ? ` from ${price}` : ""}.${s0 ? ` Compare ${s0}.` : ""} Adults 21+ only.`,
    `${buy}${P}${price ? ` from ${price}` : ""}. Adults 21+ only.`,
  ];
  const meta = metaFit(metaV);
  const h1 = e.nb || product.title.toLowerCase().includes(e.p.toLowerCase()) ? product.title : `${Pt}: ${product.title}`;
  const brandBit = product.brand ? ` by ${product.brand}` : "";
  const lead = `${sentenceCase(P)} is a ${noun}${brandBit} at ${SITE.name}${price ? `, priced from ${price}` : ""}.${bits.length ? ` Options include ${list(bits)}.` : ""}${s0 ? ` Compare ${s0}${s1 ? ` and ${s1}` : ""} on the related pages below.` : ""} Tracked US shipping from Phoenix, Arizona; adults aged ${age()}+ only.`;
  const section = {
    h2: s0 ? `Compare ${titleCase(s0)}${s1 ? ` and ${titleCase(s1)}` : ""}` : `More about ${P}`,
    p: [
      `If you are comparing ${P}${s0 ? ` with ${s0}` : ""}${s1 ? ` and ${s1}` : ""}, open the category and brand pages linked on this page to see every option side by side. ${s2 ? `Related searches include ${list([s2, s3].filter(Boolean))}.` : ""} Orders over $${SITE.order.freeShippingThreshold} after any discount ship free.`,
    ],
  };
  const faqs = [
    { q: `What is ${P}?`, a: `${sentenceCase(P)} is a ${noun}${brandBit} sold by ${SITE.name}${price ? `, priced from ${price}` : ""}.${bits.length ? ` Options include ${list(bits)}.` : ""}` },
    { q: `Where can I buy ${P}?`, a: `You can order ${P} online from ${SITE.name}. Orders ship tracked from Phoenix, Arizona, and an adult aged ${age()} or over must sign for delivery.` },
  ];
  if (s0) faqs.push({ q: `Where can I find ${s0}?`, a: `Browse the ${CAT_NOUN[product.category] || "product"} category and the brand page linked on this product page, and use the filters to compare ${s0}.` });
  return {
    e, title, meta, h1, lead, section, faqs,
    tags: tagsFor(e, [product.brand, product.title].filter(Boolean)),
    altMain: `${product.title} – ${e.nb ? (s0 || noun) : e.p}`,
    altThumb: `${product.title} ${s1 ? `– ${s1}` : "pack"}`,
    keywords: keywordsString(e, [product.brand].filter(Boolean)),
  };
}
function metaFit(v) { return v.find((x) => x.length <= 160) || v[v.length - 1].slice(0, 160); }

// ---------- blog posts ----------
export function blogSeo(post, prods) {
  const e = seoBlogEntry(post.slug);
  if (!e) return null;
  const P = e.nb ? post.title : e.p;
  const headline = e.h || post.title;
  const sec = cleanSecondaries(e, [e.p]);
  const [s0, s1, s2, s3, s4, s5] = sec;
  const h1 = headline.toLowerCase().includes(P.toLowerCase()) || e.nb ? headline : `${titleCase(P)}: ${headline}`;
  const cut = (s) => (s.length <= 70 ? s : s.slice(0, 70).replace(/\s+\S*$/, "").replace(/[,:;\s-]+$/, ""));
  // shorten at a natural break (colon, dash, bracket) before cutting mid-phrase; keep the primary keyphrase in view
  const parts = h1.split(/\s*[:–—(]\s*|\s+-\s+/).filter(Boolean);
  const shortH1 = parts.find((x) => x.toLowerCase().includes(P.toLowerCase()) && x.length >= 20) || h1;
  // last resort: primary plus only the first clause of the headline
  const clause = `${titleCase(P)}: ${headline.split(/\s*[:–—(]\s*|\s+-\s+/)[0].trim()}`;
  const title = fitTitle([`${h1} | ${SITE.name}`, h1, `${shortH1} | ${SITE.name}`, shortH1, clause, `${clause.slice(0, 60).replace(/\s+\S*$/, "")}`]);
  void cut;
  const meta = metaFit([
    `${sentenceCase(P)}: ${headline}. Compare ${s0 || "options"}${s1 ? ` and ${s1}` : ""} at ${SITE.name}. Tracked US shipping. Adults 21+ only.`,
    `${sentenceCase(P)} – ${headline}.${s0 ? ` Compare ${s0}.` : ""} Adults 21+ only.`,
    `${sentenceCase(P)} – ${headline}. Adults 21+ only.`,
  ]);
  const lead = `${post.title.toLowerCase().includes(P.toLowerCase()) || post.summary.toLowerCase().includes(P.toLowerCase()) ? "" : `This guide covers ${P}${s0 ? `, including ${s0}${s1 ? ` and ${s1}` : ""}` : ""}. `}`.trim();
  // the four product primaries used as embedded links (rule: each post links 4 product primaries)
  const links = (prods || []).slice(0, 4).map((p) => {
    const pe = seoProductEntry(p.category, p.slug);
    return { href: productHref(p), text: pe && !pe.nb ? pe.p : p.title };
  });
  const section = {
    h2: `Shop ${titleCase(P)}`,
    before: links.length ? `Ready to buy? Popular picks for ${P} include ` : `Ready to buy ${P}? `,
    tail: `${links.length ? "." : ""} ${s0 ? `Readers also compare ${list([s0, s1, s2].filter(Boolean))}.` : ""} Orders over ${SITE.order.freeShippingThreshold} after any discount ship free.`,
  };
  const related = { h2: s3 ? `${titleCase(s3)} and more` : "Related searches", p: [`Related searches: ${list([s3, s4, s5].filter(Boolean).length ? [s3, s4, s5].filter(Boolean) : [s0, s1].filter(Boolean))}.`] };
  const faqs = [
    { q: `What should I know about ${P}?`, a: `${sentenceCase(P)} is covered in detail in this guide. Compare options${s0 ? ` such as ${s0}${s1 ? ` and ${s1}` : ""}` : ""}, check the strength and size on each product page, and remember products are for adults aged ${age()} or over.` },
  ];
  if (s2) faqs.push({ q: `Where can I buy ${s2}?`, a: `Browse the matching category or collection linked in this guide. Orders ship tracked from Phoenix, Arizona, and an adult must sign for delivery.` });
  return {
    e, h1, title, meta, lead, links, section, related, faqs,
    tags: tagsFor(e, post.tags || []),
    heroAlt: (hero) => `${P} – ${hero.alt}`,
    keywords: keywordsString(e, post.tags || []),
  };
}
