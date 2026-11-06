// scripts/ai-content.mjs — writes long-form content with the Claude API: 400+ word product descriptions and
// 1,500+ word blog posts. Resumable, validated (length, banned wording, link integrity), cost-estimated.
//
//   node scripts/ai-content.mjs estimate
//   node scripts/ai-content.mjs products [--limit 5] [--slug x] [--concurrency 3] [--model claude-sonnet-5-5]
//   node scripts/ai-content.mjs blog     [--limit 5] [--slug x]
//   node scripts/ai-content.mjs merge                     (applies valid, non-mock output to the site)
//   add --mock to test the pipeline without an API key (placeholder text; never merged)
//
// Needs ANTHROPIC_API_KEY (env var or .env.local). Output: content/generated/{products,blog}/<slug>.json
import fs from "node:fs";
import path from "node:path";
import { validate, wordCount, loadKey, SHOP_CATS } from "./lib/contentRules.mjs";

const args = process.argv.slice(2);
const cmd = args[0];
const flag = (n, d) => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1] : d; };
const has = (n) => args.includes(`--${n}`);
const MODEL = flag("model", process.env.CONTENT_MODEL || "claude-sonnet-5-5");
const LIMIT = Number(flag("limit", Infinity));
const ONLY = flag("slug", null);
const CONC = Number(flag("concurrency", 3));
const MOCK = has("mock");
const OUT = { products: "content/generated/products", blog: "content/generated/blog" };

const products = JSON.parse(fs.readFileSync("src/data/products.json", "utf8"));
const posts = JSON.parse(fs.readFileSync("src/data/blog-posts.json", "utf8"));
const ctx = { productSlugs: new Set(products.map((p) => `${p.category}/${p.slug}`)), blogSlugs: new Set(posts.map((p) => p.slug)) };
const CAT_NAME = { "vape-juice": "Vape Juice", "coils-pods": "Coils & Pods", disposables: "Disposable Vapes", "vape-kits": "Vape Kits", vaporizers: "Vaporizers", "nic-pouches": "Nicotine Pouches", nixodine: "Nixodine" };

const RULES = `You are the senior copywriter for One Stop Vape Store (SV3 LLC, Phoenix, Arizona, est. December 2022), an adults-only (21+) online vape retailer.
Hard rules:
- Use ONLY the facts supplied in the data block plus widely known, uncontroversial general knowledge about the product category. If a spec (puff count, battery size, ingredients, coil type, nicotine type) is not in the data, do NOT state it or imply it.
- NEVER make health claims or comparisons: do not use the words safe, safer, healthy, healthier, harmless, risk-free, cure, therapeutic, harm reduction, FDA-approved, laboratory/lab-tested, patented, or pharmaceutical. No cessation claims. No "100% authentic" claims.
- Do not invent reviews, ratings, awards, customer quotes, statistics, rankings or sales figures.
- Say plainly that nicotine is addictive and the product is for adults aged 21 and over (at least once, naturally).
- Authoritative, specific, helpful tone. Vary sentence length. No filler, no repeating the same sentence structure, no clichés like "in today's fast-paced world".
- Every page must read as unique to this specific item/post. Never use a generic boilerplate paragraph you would reuse elsewhere.
- Format: markdown-lite. "## " for section headings (never an H1), "- " bullets, "**bold**" sparingly, internal links as [text](/path/) using ONLY the links provided.`;

function productPrompt(p) {
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug && x.brand === p.brand).slice(0, 3);
  const more = related.length ? related : products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 3);
  const data = { title: p.title, brand: p.brand, category: CAT_NAME[p.category], subcategory: p.subcategory, price: p.priceDisplay, nicotine: p.nicotine || null, puffs: p.puffs && p.puffs !== "High Capacity" ? p.puffs : null, shortDescription: p.description };
  return `Write a product description of AT LEAST 420 words (aim for 450–520) for this product page.

DATA (the only product facts you may use):
${JSON.stringify(data, null, 1)}

Allowed internal links (use at least 3, naturally, as markdown links):
- [${CAT_NAME[p.category]}](/shop/${p.category}/)
- [shipping policy](/shipping/) and [refund policy](/refunds/)
${more.map((x) => `- [${x.title.replace(/[\[\]]/g, "")}](/shop/${x.category}/${x.slug}/)`).join("\n")}
- [FAQ](/faq/)

Suggested structure (adapt, don't copy): an opening paragraph about the item; "## Flavor and experience" (only what the name/data supports); "## Specifications" (bullets from the data only); "## Who it suits"; "## Using and caring for it" (general guidance for this device/liquid type); "## Ordering, payment and delivery" (crypto and gift cards get 10% off, orders of $200+ after discount ship free, adult signature required, orders over $100 minimum); closing line about nicotine and 21+.

Return ONLY:
<description>
...markdown...
</description>`;
}

function blogPrompt(p) {
  const peers = posts.filter((x) => x.slug !== p.slug && (x.categorySlug === p.categorySlug || x.tags.some((t) => p.tags.includes(t)))).slice(0, 10);
  const existing = [...p.body.matchAll(/\]\((\/[^)]*)\)/g)].map((m) => m[1]);
  return `Expand this blog post into an in-depth, authoritative article of AT LEAST 1,600 words (aim for 1,700–1,900) that fully covers the topic for an adult reader.

TITLE: ${p.title}
SUMMARY: ${p.summary}
CATEGORY: ${p.category}
CURRENT DRAFT (keep its facts, voice and policies; expand and deepen, do not contradict it):
"""
${p.body}
"""

Site policy facts you may rely on: minimum order $100; free shipping on orders of $200+ AFTER discount (before tax); crypto and gift card payments get 10% off; orders process in 24–72 business hours; adult (21+) signature with photo ID on delivery; returns within 30 days with a 15% restocking fee and no returns of opened/used items; ships from Phoenix, AZ; we do not ship internationally.

Allowed internal links (use at least 6, naturally spread through the text):
- Pages: [shipping policy](/shipping/), [refund policy](/refunds/), [FAQ](/faq/), [contact page](/contact/), [wholesale](/wholesale/), [PACT Act FAQ](/pact-act/)
- Shop: ${SHOP_CATS.map((c) => `[${CAT_NAME[c]}](/shop/${c}/)`).join(", ")}
- Links already in the draft: ${existing.join(", ")}
- Related posts:
${peers.map((x) => `  - [${x.title.replace(/[\[\]]/g, "")}](/blog/${x.slug}/)`).join("\n")}

Requirements: a strong intro (no heading), then 7–10 "## " sections with real depth (step-by-step detail, comparisons, examples with plausible numbers only when they follow from the policy facts above, common mistakes, a short checklist or table-like bullet list). End with a practical conclusion paragraph that mentions adults 21+ and that nicotine is addictive. Then 4–5 FAQ items.

Return ONLY:
<body>
...markdown (no H1, no FAQ here)...
</body>
<faq>
Q: question
A: answer (2–4 sentences)
</faq>`;
}

async function callClaude(system, user, maxTokens, attempt = 0) {
  if (MOCK) return mockText(user, maxTokens);
  const key = loadKey();
  if (!key) throw new Error("ANTHROPIC_API_KEY is not set (env var or .env.local)");
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({ model: MODEL, max_tokens: maxTokens, system, messages: [{ role: "user", content: user }] }),
  });
  if ((res.status === 429 || res.status >= 500) && attempt < 5) {
    await new Promise((r) => setTimeout(r, 2000 * 2 ** attempt));
    return callClaude(system, user, maxTokens, attempt + 1);
  }
  if (!res.ok) throw new Error(`API ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const j = await res.json();
  return j.content.filter((b) => b.type === "text").map((b) => b.text).join("");
}

// Placeholder generator for pipeline tests (clearly marked; output is flagged mock and never merged).
function mockText(user, maxTokens) {
  const blog = /<body>/.test(user);
  const para = "This is placeholder test text used only to exercise the content pipeline and must never be published to customers of the store. ";
  const sections = Array.from({ length: blog ? 9 : 5 }, (_, i) => `## Mock section ${i + 1}\n${para.repeat(blog ? 24 : 12)}`).join("\n\n");
  const links = "[shipping policy](/shipping/) [refund policy](/refunds/) [FAQ](/faq/) [shop](/shop/disposables/) [wholesale](/wholesale/) [contact page](/contact/) [vape juice](/shop/vape-juice/) Adults 21+ only.";
  return blog ? `<body>\n${para.repeat(10)} ${links}\n\n${sections}\n</body>\n<faq>\nQ: Mock question one?\nA: Mock answer.\nQ: Mock question two?\nA: Mock answer.\n</faq>` : `<description>\n${para.repeat(6)} ${links}\n\n${sections}\n</description>`;
}

const grab = (t, tag) => (t.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`)) || [])[1]?.trim() || "";
const parseFaq = (t) => [...grab(t, "faq").matchAll(/Q:\s*(.+)\nA:\s*([\s\S]*?)(?=\nQ:|$)/g)].map((m) => ({ q: m[1].trim(), a: m[2].trim() }));

async function generate(kind, item) {
  const isProd = kind === "products";
  const prompt = isProd ? productPrompt(item) : blogPrompt(item);
  const min = isProd ? 400 : 1500;
  let text = await callClaude(RULES, prompt, isProd ? 2200 : 6000);
  let out = isProd ? { body: grab(text, "description") } : { body: grab(text, "body"), faq: parseFaq(text) };
  let v = validate(out.body, { minWords: min, ctx, minLinks: isProd ? 3 : 6 });
  if (!v.ok) { // one corrective retry with the exact problems
    text = await callClaude(RULES, `${prompt}\n\nYour previous attempt failed validation:\n- ${v.errors.join("\n- ")}\nRewrite the whole piece fixing every problem. Previous attempt:\n${text}`, isProd ? 2200 : 6000);
    out = isProd ? { body: grab(text, "description") } : { body: grab(text, "body"), faq: parseFaq(text) };
    v = validate(out.body, { minWords: min, ctx, minLinks: isProd ? 3 : 6 });
  }
  if (!isProd && out.faq.length < 3) v = { ...v, ok: false, errors: [...v.errors, "needs at least 3 FAQ items"] };
  return { ...out, words: v.words, ok: v.ok, errors: v.errors, mock: MOCK, model: MOCK ? "mock" : MODEL, at: new Date().toISOString() };
}

async function run(kind) {
  const list = kind === "products" ? products : posts;
  const dir = OUT[kind];
  fs.mkdirSync(dir, { recursive: true });
  const done = (slug) => {
    const f = path.join(dir, `${slug}.json`);
    if (!fs.existsSync(f)) return false;
    const g = JSON.parse(fs.readFileSync(f, "utf8"));
    return g.ok && Boolean(g.mock) === MOCK; // a valid real result is never redone; mock runs only skip mock results
  };
  const todo = list.filter((x) => (!ONLY || x.slug === ONLY) && !done(x.slug)).slice(0, LIMIT);
  console.log(`${kind}: ${todo.length} to generate with ${MOCK ? "MOCK" : MODEL}`);
  let idx = 0, ok = 0, bad = 0;
  async function worker() {
    while (idx < todo.length) {
      const item = todo[idx++];
      try {
        const r = await generate(kind, item);
        fs.writeFileSync(path.join(dir, `${item.slug}.json`), JSON.stringify(r, null, 1));
        r.ok ? ok++ : bad++;
        console.log(`${r.ok ? "ok  " : "FAIL"} ${item.slug} (${r.words} words)${r.ok ? "" : " — " + r.errors.join("; ")}`);
      } catch (e) {
        bad++; console.log(`ERR  ${item.slug}: ${e.message}`);
        if (/ANTHROPIC_API_KEY|API 401|API 403/.test(e.message)) { idx = todo.length; }
      }
    }
  }
  await Promise.all(Array.from({ length: CONC }, worker));
  console.log(`done: ${ok} ok, ${bad} failed. Re-run to retry failures (valid files are skipped).`);
}

function estimate() {
  // output tokens ≈ words × 1.35; input ≈ prompt (+ draft for blog). Prices vary by model — see anthropic.com/pricing.
  const pOut = products.length * 520 * 1.35, pIn = products.length * 900;
  const bOut = posts.length * 1800 * 1.35, bIn = posts.length * 1900;
  const fmt = (n) => (n / 1e6).toFixed(2) + "M";
  console.log(`Products: ${products.length} × ~520 words → ~${fmt(pOut)} output tokens, ~${fmt(pIn)} input tokens`);
  console.log(`Blog:     ${posts.length} × ~1,800 words → ~${fmt(bOut)} output tokens, ~${fmt(bIn)} input tokens`);
  console.log(`Total:    ~${fmt(pOut + bOut)} output + ~${fmt(pIn + bIn)} input tokens (retries add roughly 5–15%).`);
  console.log("Multiply by your model's per-million-token prices (anthropic.com/pricing). Test with --limit 5 first.");
}

function merge() {
  let pm = 0, bm = 0, skipped = 0;
  const descFile = "src/data/product-descriptions.json";
  const descs = fs.existsSync(descFile) ? JSON.parse(fs.readFileSync(descFile, "utf8")) : {};
  for (const p of products) {
    const f = path.join(OUT.products, `${p.slug}.json`);
    if (!fs.existsSync(f)) continue;
    const g = JSON.parse(fs.readFileSync(f, "utf8"));
    if (!g.ok || g.mock) { skipped++; continue; }
    descs[p.slug] = g.body; pm++;
  }
  fs.writeFileSync(descFile, JSON.stringify(descs));
  for (const p of posts) { // blog bodies are applied by scripts/build-blog.mjs from content/generated/blog
    const f = path.join(OUT.blog, `${p.slug}.json`);
    if (!fs.existsSync(f)) continue;
    const g = JSON.parse(fs.readFileSync(f, "utf8"));
    if (g.ok && !g.mock) bm++; else skipped++;
  }
  console.log(`merged ${pm} product descriptions into ${descFile}; ${bm} blog posts ready (run "npm run blog" to apply); skipped ${skipped} invalid/mock`);
}

if (cmd === "estimate") estimate();
else if (cmd === "products" || cmd === "blog") await run(cmd);
else if (cmd === "merge") merge();
else console.log("usage: node scripts/ai-content.mjs estimate | products | blog | merge  [--limit N] [--slug s] [--mock]");
