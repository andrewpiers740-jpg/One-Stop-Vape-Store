// scripts/expand-guides.mjs — expands the 30 brand guides and 28 flavor guides to 1,500+ words, with no external API.
// Every number, product, price, strength and count comes from src/data/products.json; the explanatory text comes from the
// hand-written banks below (per category, per flavor family). Output: content/generated/blog/<slug>.json, applied by build-blog.mjs.
//   node scripts/expand-guides.mjs [--only slug]
import fs from "node:fs";
import path from "node:path";
import { validate, wordCount } from "./lib/contentRules.mjs";

const products = JSON.parse(fs.readFileSync("src/data/products.json", "utf8"));
const posts = JSON.parse(fs.readFileSync("src/data/blog-posts.json", "utf8"));
const only = process.argv.includes("--only") ? process.argv[process.argv.indexOf("--only") + 1] : null;
const ctx = { productSlugs: new Set(products.map((p) => `${p.category}/${p.slug}`)), blogSlugs: new Set(posts.map((p) => p.slug)) };
const OUT = "content/generated/blog";
fs.mkdirSync(OUT, { recursive: true });

const money = (n) => "$" + (Math.round(n * 100) / 100).toFixed(2);
const CAT = { "vape-juice": "vape juice", "coils-pods": "coils and pods", disposables: "disposable vapes", "vape-kits": "vape kits", vaporizers: "vaporizers", "nic-pouches": "nicotine pouches", nixodine: "Nixodine devices" };
const CAT_ONE = { "vape-juice": "e-liquid", "coils-pods": "replacement part", disposables: "disposable", "vape-kits": "kit", vaporizers: "vaporizer product", "nic-pouches": "pouch", nixodine: "Nixodine device" };
const hash = (s) => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
const puffsNum = (s) => { const m = String(s || "").replace(/,/g, "").match(/(\d+(?:\.\d+)?)\s*(k)?/i); if (!m) return 0; const n = parseFloat(m[1]) * (m[2] ? 1000 : 1); return n >= 500 ? n : 0; };
const median = (a) => { const s = [...a].sort((x, y) => x - y); return s.length ? s[Math.floor(s.length / 2)] : 0; };
const list = (a) => (a.length <= 1 ? a.join("") : a.length === 2 ? a.join(" and ") : a.slice(0, -1).join(", ") + " and " + a[a.length - 1]);
const uniq = (a) => [...new Set(a)];
const title = (s) => s.replace(/\b\w/g, (c) => c.toUpperCase());

// -------- flavor families (descriptive only) --------
const FAM = {
  cool: { name: "cooling and ice", re: /\b(ice|icy|iced|menthol|mint|freeze|frost|arctic|cool|chill|polar|spearmint|peppermint|wintergreen|glacier)/i, text: "Cooling flavors add a crisp, chilled edge. Instead of changing the fruit or dessert at the core of a recipe, they sharpen it, which is why so many fruit flavors ship in an “ice” version." },
  berry: { name: "berry", re: /\b(berry|berries|raspberry|razz|strawberry|blueberry|blackberry|cranberry|acai)/i, text: "Berry flavors balance sweetness and tartness. Blue raspberry, strawberry and mixed-berry blends are among the most reliable crowd-pleasers in vaping." },
  citrus: { name: "citrus", re: /\b(lemon|lime|orange|citrus|grapefruit|lemonade|yuzu|tangerine)/i, text: "Citrus flavors lead with acidity and brightness. They tend to feel light and refreshing, and they pair naturally with cooling notes." },
  tropical: { name: "tropical", re: /\b(mango|pineapple|passion|guava|papaya|banana|coconut|tropical|dragon|lychee|kiwi|aloe)/i, text: "Tropical flavors lean sweet and aromatic, with a rounder, juicier body than most orchard fruit." },
  melon: { name: "melon", re: /\b(melon|watermelon|cantaloupe|honeydew)/i, text: "Melon flavors are soft, watery and mellow, and they work well on their own or blended with berry and ice." },
  stone: { name: "orchard and stone fruit", re: /\b(peach|apricot|cherry|plum|apple|pear|nectarine)/i, text: "Orchard and stone fruits read familiar and balanced, with a gentle sweetness that suits all-day vaping." },
  grape: { name: "grape", re: /\b(grape|concord)/i, text: "Grape flavors are deep and jammy, often with a candy-like edge." },
  candy: { name: "candy and soda", re: /\b(candy|gummy|sour|cotton|bubble|skittle|rainbow|punch|soda|cola|slush|swirl|lollipop|jelly)/i, text: "Candy and soda flavors recreate confectionery and drinks, with a sweet-sour pop that stands out." },
  dessert: { name: "dessert and cream", re: /\b(cream|custard|vanilla|cake|cookie|donut|waffle|pastry|milk|caramel|butter|pudding|chocolate|brownie)/i, text: "Dessert flavors build a smooth, creamy body that feels mellow and rich." },
  tobacco: { name: "tobacco", re: /\b(tobacco|cigar|classic|virginia)/i, text: "Tobacco-style flavors recreate a traditional profile with a mellow, toasty depth." },
};
const famOf = (t) => Object.values(FAM).filter((f) => f.re.test(t));

// -------- brand banks by main category --------
const CATBANK = {
  disposables: {
    what: "Disposable vapes arrive pre-filled and pre-charged, so there is nothing to refill and no coil to replace. You use the device until the flavor or battery runs out, then dispose of it responsibly. The appeal is simplicity: no settings, no maintenance and no compatibility questions.",
    choose: [
      "**Start with the puff count, but read it sensibly.** The number is the manufacturer's estimate, not a guarantee. Habits, draw length and temperature all change how long a device lasts, so use puff count to compare devices against each other rather than to predict an exact lifespan.",
      "**Check the charging port.** Rechargeable models with a USB-C port can be topped up on a standard cable, which extends their useful life. Non-rechargeable models are lighter but finish when the battery does.",
      "**Think about screens and airflow.** Some devices include a small display showing battery and e-liquid levels, and some offer adjustable airflow. Neither is essential, but both make a large-capacity device easier to live with.",
      "**Compare cost per puff.** A higher price for a device with far more puffs can cost less per puff than a cheaper, smaller one. The section on value below shows the numbers for this brand.",
    ],
    care: "Charge rechargeable models on a hard, dry surface with a standard cable and unplug them when full. Keep the device upright and at room temperature, away from direct sun and hot cars. Take gentle draws instead of long, forceful ones to avoid a burnt taste, and never open or modify the device. When it is finished, take it to an electronics or battery recycling point where available.",
  },
  "vape-juice": {
    what: "E-liquid is the flavored liquid you add to a refillable device. You choose the bottle size, the nicotine type and strength, and the PG/VG balance, which gives you more control than a disposable and often a lower cost per milliliter.",
    choose: [
      "**Match the nicotine type to your hardware.** Nicotine-salt liquids are usually chosen for low-power pod systems and come in higher strengths such as 50mg, while freebase liquids suit tanks and higher wattage. See our guide to [nicotine salts vs freebase](/blog/nicotine-salts-vs-freebase/).",
      "**Look at the PG/VG ratio.** A higher VG ratio produces bigger clouds in sub-ohm tanks, while a higher PG ratio carries flavor and suits small pods. Read more in [PG and VG ratios explained](/blog/pg-vg-ratio-explained/).",
      "**Pick a bottle size that fits how you vape.** Larger bottles lower the cost per milliliter but leave you with more liquid to store. Our [bottle sizes guide](/blog/e-liquid-bottle-sizes-30ml-60ml-100ml/) explains the trade-offs.",
      "**Read the label.** Strength, volume, ratio and the warning statement should all be clearly shown. Our guide to [reading an e-liquid label](/blog/how-to-read-an-e-liquid-label/) shows what to look for.",
    ],
    care: "Fill your device slowly and wipe the tip clean. Let a fresh coil soak for a few minutes before the first puff, and replace the coil when flavor fades or it tastes burnt. Keep bottles upright, capped and away from heat and sunlight, and store them out of reach of children and pets. See [how to store e-liquid](/blog/how-to-store-e-liquid/).",
  },
  "vape-kits": {
    what: "A vape kit bundles a rechargeable device with a pod or tank, giving you a reusable system. You can refill or swap pods and keep using the same battery, which spreads the cost of the hardware over many pods.",
    choose: [
      "**Decide between pod and tank style.** Pod kits are compact and simple, while tank kits offer more control over airflow and power. Our [first vape kit guide](/blog/first-vape-kit-guide/) walks through the choice.",
      "**Check which pods fit.** Pods are specific to the device, so confirm the product name and the pod range before you buy spares.",
      "**Look at battery capacity and charging.** A larger battery lasts longer between charges, and USB-C charging is convenient because the cable is common.",
      "**Consider what is included.** Some kits come with a pre-filled pod while others expect you to supply liquid.",
    ],
    care: "Charge the device fully before the first use with a standard USB-C cable, seat the pod until it clicks and give a new pod a minute to saturate. Keep the pod connectors clean and dry, store the kit upright away from heat and use only compatible pods. Never charge a damaged device.",
  },
  "nic-pouches": {
    what: "Nicotine pouches are small, tobacco-free pouches placed between the lip and gum. There is no smoke or vapor and no device to charge, which is why some adults choose them where vaping is not convenient.",
    choose: [
      "**Compare strength per pouch.** Strengths are listed in milligrams, and a lower number is a gentler starting point. See [nicotine pouch strengths explained](/blog/nicotine-pouch-strengths-explained/).",
      "**Check the pouch count.** A can usually holds around 15 to 20 pouches, so compare the cost per pouch, not just the price per can.",
      "**Choose a flavor family you enjoy.** Mint and citrus are common, with fruit and coffee options from some brands.",
      "**Think about size and comfort.** Slim and mini pouches are less noticeable, while standard pouches deliver stronger flavor.",
    ],
    care: "Use pouches only as directed on the can, keep a pouch in place for the time on the label and dispose of used pouches in a bin. Keep cans closed in a cool, dry place and away from children and pets. See [how to store nicotine pouches](/blog/how-to-store-nicotine-pouches/).",
  },
  nixodine: {
    what: "Nixodine is a newer nicotine alternative, and Nixodine devices are usually ready-to-use disposables. We list them in their own category so you can compare them with traditional nicotine-salt devices.",
    choose: [
      "**Read the label closely.** Strength and ingredients are shown on the packaging, and our [Nixodine guide](/blog/what-is-nixodine/) explains how it differs from standard nicotine.",
      "**Compare puff counts and features.** The same points apply as with any disposable: capacity, charging port and screen.",
      "**Choose a flavor family you already enjoy.** Trying a familiar flavor first makes it easier to judge the product itself.",
      "**Check the price per puff.** Larger devices often cost less per puff.",
    ],
    care: "Use as directed on the packaging, take short puffs, keep the device upright and away from heat and do not open or modify it. Dispose of used devices at an electronics recycling point where available.",
  },
  vaporizers: {
    what: "Vaporizers and their accessories cover a range of systems. Each listing names the device it belongs to so you can match parts to your setup.",
    choose: [
      "**Confirm compatibility first.** Accessories are made for a specific device, so match the product name before ordering.",
      "**Check the material.** Glass, quartz and metal parts have different care needs.",
      "**Compare what is included.** Some listings are single parts, others are complete devices.",
      "**Know your local laws.** Rules differ by state, and it is your responsibility to follow them.",
    ],
    care: "Follow the manufacturer's instructions, make sure parts are clean and dry before assembly and handle glass and small components carefully. Store accessories in a secure place away from children and pets.",
  },
  "coils-pods": {
    what: "Replacement coils and pods keep a refillable or pod device running. A fresh part restores flavor and vapor quality when an old one wears out.",
    choose: [
      "**Match the device exactly.** Pods and coils are not interchangeable between brands or even between models.",
      "**Choose the resistance or type listed for your use.** Lower resistances suit more power, higher resistances suit mouth-to-lung pods.",
      "**Stock a spare.** Having one on hand means you never run out mid-week.",
      "**Check the pack size.** Multi-packs lower the price per part.",
    ],
    care: "Prime new coils with a few drops of e-liquid and wait a few minutes before use. Replace them when flavor fades or a burnt taste appears, and store spares in a cool, dry place. See [how to pick replacement coils and pods](/blog/how-to-pick-replacement-coils-and-pods/).",
  },
};

const ORDERING = (a) => `## Ordering ${a} from One Stop Vape Store
Every order is placed on our secure checkout. Pick your options on the product page, add the items to your cart and choose a payment method: Cash App, Apple Pay, Chime, cryptocurrency or gift cards. Cryptocurrency and supported gift cards save 10% on your order total, which is explained in [how the crypto discount works](/blog/crypto-discount-how-it-works/) and [how gift card payment works](/blog/how-gift-card-payment-works/). You can compare every option in [payment methods compared](/blog/payment-methods-compared/).

The minimum order is $100, and orders of $200 or more after discounts ship free. Smaller orders pay a flat $15 shipping fee. We process orders within 24 to 72 business hours at our Stock Warehouse in Phoenix, Arizona, and ship with USPS or UPS and a tracking number. Because these are vapor products, an adult aged 21 or older must sign for delivery under the PACT Act, so see [adult signature on delivery](/blog/adult-signature-on-delivery-what-to-expect/) and our [shipping times guide](/blog/shipping-times-from-phoenix-arizona/) before you order.

Returns are accepted within 30 days for unopened items in their original packaging, with a 15% restocking fee, and refunds go back through the payment method you used. Read the [refund and return policy explained](/blog/refund-and-return-policy-explained/) for the details. If you run a shop, our [wholesale ordering guide](/blog/wholesale-ordering-guide/) covers bulk pricing. Everything we sell is for adults aged 21 and over, and nicotine is addictive.`;


const SHARED = (subject) => `## A buyer's checklist for ${subject}
Before you place an order, run through this short list. It takes a minute and prevents most of the problems customers contact us about:

- **Confirm you are buying the right type.** A disposable, a refillable pod, a bottle of e-liquid and a pouch are different products, even when the flavor name matches.
- **Read the strength.** Compare the milligram or percentage figure with what you currently use, and start lower if you are unsure.
- **Check the options on the page.** Where a listing offers strengths or pack sizes, choose them above the Add to Cart button so the price and your order match.
- **Look at capacity and size.** Puff count, bottle volume or pouches per can tell you how long a purchase should last.
- **Compare value, not just price.** A larger device, bottle or can often costs less per puff, milliliter or pouch.
- **Have an adult ready to sign.** Delivery requires a signature from someone aged 21 or older, so choose an address where that is possible.
- **Choose your payment method early.** Cryptocurrency and gift cards save 10%, while Cash App, Apple Pay and Chime are handled through your private order page.
- **Keep your order email.** It contains the private link to your order, your tracking updates and the payment page.

## Common mistakes to avoid
- **Buying the highest strength by default.** Higher numbers are not better, and a strength that is too high for you is the most common reason people are unhappy with a purchase.
- **Ignoring compatibility.** Pods, coils and accessories are specific to a device, so match the exact product name before you order spares.
- **Storing products in the heat.** Cars, windowsills and bags left in the sun shorten the life of batteries and degrade flavor.
- **Expecting identical results from every device.** Flavor and vapor vary with the hardware and how you draw, so judge a flavor over several uses before you decide.
- **Forgetting about delivery.** A missed signature delays a parcel, so plan around the carrier's tracking updates.

## Understanding the labels and specifications
Product pages and packaging use a small set of terms repeatedly. **Nicotine strength** is shown in milligrams per milliliter or as a percentage, and 50mg is the same as 5%. **Puff count** is the manufacturer's estimate of how many draws a device can provide, and real results vary with how you use it. **Capacity** describes the volume of e-liquid in a pod or bottle. **Pack size** tells you how many units come in a listing, such as a single device or a five-pack bundle.

Reading these four figures together lets you compare any two products fairly. If two listings look similar, the one with the lower price per puff, per milliliter or per pouch is usually the better value, provided the strength is one you are comfortable with. Our [guide to reading a product page](/blog/how-to-read-a-vape-product-page/) walks through a real example, and the [glossary of vape terms](/blog/vape-glossary-terms-a-to-z/) explains the less common words.

## Using nicotine products responsibly
Every product we sell is intended only for adults aged 21 and over, and nicotine is addictive. Keep products out of reach of children and pets, never share them with anyone underage, follow the manufacturer's instructions and use them only where it is lawful and considerate to do so. Laws on vapor products and flavors differ by state and city, and it is your responsibility to know the rules where you live. Our guides to [state and local vape laws](/blog/state-and-local-vape-laws-explained/), [what 21+ age verification means](/blog/what-21-plus-age-verification-means/) and the [FDA and vaping products](/blog/fda-and-vaping-products-what-adults-should-know/) are a good place to start.
`;

function brandGuide(post) {
  const keys = post.keywords.map((k) => k.toLowerCase());
  const items = products.filter((p) => keys.includes(p.brand.toLowerCase()));
  if (!items.length) return null;
  const name = items[0].brand;
  const byCat = {};
  items.forEach((p) => (byCat[p.category] = byCat[p.category] || []).push(p));
  const cats = Object.entries(byCat).sort((a, b) => b[1].length - a[1].length);
  const top = cats[0][0];
  const bank = CATBANK[top];
  const prices = items.map((p) => p.price);
  const lo = Math.min(...prices), hi = Math.max(...prices), avg = prices.reduce((s, x) => s + x, 0) / prices.length, med = median(prices);
  const strengths = uniq(items.flatMap((p) => String(p.nicotine || "").split(",").map((s) => s.trim()).filter((s) => /mg|%/i.test(s)))).slice(0, 8);
  const packs = uniq(items.flatMap((p) => String(p.packSize || "").split(",").map((s) => s.trim()).filter(Boolean))).slice(0, 6);
  const puffCounts = uniq(items.map((p) => puffsNum(p.puffs)).filter(Boolean)).sort((a, b) => b - a);
  const fams = {};
  items.forEach((p) => famOf(p.title).forEach((f) => (fams[f.name] = (fams[f.name] || 0) + 1)));
  const famRows = Object.entries(fams).sort((a, b) => b[1] - a[1]);
  const seen = new Set(); const picks = [];
  for (const p of items) { const k = p.title.toLowerCase().slice(0, 18); if (seen.has(k)) continue; seen.add(k); picks.push(p); if (picks.length === 8) break; }
  const first = post.body.split("\n\n")[0].replace(/\s*We currently list[\s\S]*$/, "").trim();
  const sameKind = posts.filter((x) => x.tags.includes("brand") && x.slug !== post.slug && x.shop.some((s) => post.shop.includes(s))).slice(0, 3);

  let perPuff = "";
  const withPuffs = items.filter((p) => puffsNum(p.puffs));
  if (withPuffs.length) {
    const ex = [...withPuffs].sort((a, b) => puffsNum(b.puffs) - puffsNum(a.puffs));
    const hiP = ex[0], loP = ex[ex.length - 1];
    const cp = (p) => money((p.price / puffsNum(p.puffs)) * 1000);
    perPuff = `As an example, ${hiP.title} lists ${hiP.puffs} at ${money(hiP.price)}, which works out to about ${cp(hiP)} per 1,000 puffs. ${loP.slug !== hiP.slug ? `${loP.title} lists ${loP.puffs} at ${money(loP.price)}, or about ${cp(loP)} per 1,000 puffs.` : ""} Treat these as comparison figures, because real-world puff counts vary with how you vape. Our guide to [comparing prices per puff](/blog/how-to-compare-vape-prices-per-puff/) shows the method in detail.`;
  } else perPuff = `Because ${name} products here are not sold by puff count, compare them by price, size and strength. For bottles, compare price per milliliter; for pouches, compare price per can.`;

  const body = `${first} We currently list **${items.length} ${name} products** at One Stop Vape Store, priced from ${money(lo)} to ${money(hi)}. This guide explains what the range includes, how the flavors group together, how to choose between options and how to order, using the live catalog so the numbers match what you will see in the shop.

## About ${name}
${first} ${bank.what}

Most of the ${name} range we stock sits in ${CAT[top]}${cats.length > 1 ? `, with additional products in ${list(cats.slice(1).map(([c]) => CAT[c]))}` : ""}. That matters because the best way to judge a product depends on its type: what counts when you choose a disposable is different from what counts when you choose a bottle or a pouch. The sections below follow the questions adults usually ask before buying from a brand they have not tried before.

## The ${name} range at a glance
${cats.map(([c, arr]) => `- **${title(CAT[c])}:** ${arr.length} products, from ${money(Math.min(...arr.map((p) => p.price)))} to ${money(Math.max(...arr.map((p) => p.price)))}. [Browse ${CAT[c]}](/shop/${c}/).`).join("\n")}
- **Average price:** ${money(avg)} across the range, with a median of ${money(med)}.
${strengths.length ? `- **Strengths listed:** ${strengths.join(", ")}.` : ""}
${puffCounts.length ? `- **Puff counts listed:** ${puffCounts.slice(0, 6).map((n) => n.toLocaleString("en-US")).join(", ")}.` : ""}
${packs.length ? `- **Packaging options:** ${packs.join(", ")}.` : ""}

Stock and flavors change, so the category pages are always the most current view. Use the filters on the [shop page](/shop/) to narrow by brand.

## Popular ${name} picks
These are some of the ${name} products shoppers look at first. Each links to a page with full specifications, strength and pack options and a 10-question FAQ:

${picks.map((p) => `- [${p.title}](/shop/${p.category}/${p.slug}/) — ${money(p.price)}${p.puffs && p.puffs !== "High Capacity" ? `, ${p.puffs}` : ""}${p.nicotine && /mg|%/.test(p.nicotine) ? `, ${p.nicotine}` : ""}`).join("\n")}

## Flavor profiles in the ${name} range
${famRows.length ? `Reading the product names across the ${name} catalog, the flavors group like this:\n\n${famRows.map(([f, n]) => `- **${title(f)}:** ${n} products. ${Object.values(FAM).find((x) => x.name === f).text}`).join("\n")}\n\nFlavor is personal, and the same recipe can taste sweeter or sharper depending on your device and your own palate, so treat these groupings as a guide. If you are new to the brand, start with a flavor family you already enjoy, because it makes it easier to judge the product itself. Our [vape flavor profiles guide](/blog/vape-flavor-profiles-explained/) explains how these families work, and [how cooling ice flavors work](/blog/how-cooling-ice-flavors-work/) covers the most popular finish.` : `${name} keeps its naming simple, so check each product page for the flavor profile. Our [vape flavor profiles guide](/blog/vape-flavor-profiles-explained/) explains the main families so you know what to expect.`}

## How to choose a ${name} product
${bank.choose.join("\n\n")}

## Strengths and options
${strengths.length ? `${name} products in our catalog are listed at ${list(strengths)}. ` : ""}Strength tells you how much nicotine a product contains, and it is the single most important number to read before you order. Higher is not better: pick the level that matches what you currently use, and remember that nicotine is addictive and products are for adults only. Our [nicotine strength guide](/blog/nicotine-strength-guide/) explains how mg and percentage figures relate.

${packs.length ? `Several ${name} listings offer more than one option (${list(packs)}). On those pages you choose your option above the Add to Cart button and the price updates to match, and your choice is shown in your cart and on your order confirmation.` : `Where a ${name} listing offers more than one strength or pack size, you choose it on the product page and the price updates to match.`}

## Value and pricing
${name} products here range from ${money(lo)} to ${money(hi)}, with an average of ${money(avg)}. ${perPuff}

Buying more at once usually lowers the effective price, and orders of $200 or more after discounts ship free. Paying with cryptocurrency or a supported gift card saves a further 10%, which can make a bigger order noticeably cheaper. If you run a shop and need larger volumes, read our [guide to bulk buying](/blog/bulk-buying-vapes-save-money/) and the [wholesale ordering guide](/blog/wholesale-ordering-guide/).

## Using and caring for ${name} products
${bank.care}

Keep every device, bottle and pouch away from children and pets. When you are finished with a battery-powered device, follow our guide on [how to dispose of vapes and batteries](/blog/how-to-dispose-of-vapes-and-batteries/). If you ever doubt that a product is genuine, read [how to spot counterfeit vapes](/blog/how-to-spot-counterfeit-vapes/).

${SHARED(name)}

${ORDERING(name)}

## Keep reading
${sameKind.map((x) => `- [${x.title}](/blog/${x.slug}/)`).join("\n")}
- [Best disposable vapes for flavor lovers](/blog/best-disposable-vapes-for-flavor-lovers/)
- [How to compare vape prices per puff](/blog/how-to-compare-vape-prices-per-puff/)
- [PACT Act explained for vape buyers](/blog/pact-act-explained-for-vape-buyers/)`;

  const faq = [
    { q: `How many ${name} products does One Stop Vape Store carry?`, a: `We currently list ${items.length} ${name} products across ${list(cats.map(([c]) => CAT[c]))}. Stock and flavors change, so check the category pages for the latest.` },
    { q: `How much does ${name} cost?`, a: `${name} products in our catalog range from ${money(lo)} to ${money(hi)}, with an average of ${money(avg)}.` },
    { q: `What strengths does ${name} come in?`, a: strengths.length ? `Strengths listed for ${name} include ${list(strengths)}. Check each product page for the exact figure.` : `Strength is listed on each ${name} product page where the manufacturer provides it.` },
    { q: `Can I choose a pack size or strength?`, a: packs.length ? `Yes. Where options exist (${list(packs)}), you pick them above the Add to Cart button and the price updates automatically.` : `Where a listing offers options, you pick them above the Add to Cart button and the price updates automatically.` },
    { q: `Do I get a discount for paying with crypto?`, a: "Yes. Cryptocurrency and supported gift cards save 10% on your order total." },
    { q: `How long does shipping take?`, a: "Orders are processed within 24 to 72 business hours from our Phoenix, Arizona Stock Warehouse and ship with tracking. Delivery requires an adult 21+ signature." },
    { q: `Can I return a ${name} product?`, a: "Unopened items in original packaging can be returned within 30 days with a 15% restocking fee, and refunds go back through the original payment method. Opened or used items cannot be returned." },
    { q: `Do you offer wholesale pricing on ${name}?`, a: "Yes, retailers can request wholesale pricing through the wholesale page or by contacting us on WhatsApp, phone or email." },
  ];
  return { body, faq };
}

const FLAVOR_BANK = {
  default: { pairing: "Most flavors are blended with a supporting note: a cooling finish for freshness, a sweet fruit for balance or a creamy base for body." },
};

function flavorGuide(post) {
  const term = (post.tags.find((t) => t !== "flavor" && !/^(vape-juice|disposables|nixodine|vape-kits|nic-pouches|coils-pods|vaporizers)$/.test(t)) || post.keywords[0] || "").replace(/-/g, " ");
  const re = new RegExp("\\b" + term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
  const items = products.filter((p) => re.test(p.title) || re.test(p.flavor || ""));
  if (!items.length) return null;
  const Name = title(term);
  const byCat = {};
  items.forEach((p) => (byCat[p.category] = byCat[p.category] || []).push(p));
  const cats = Object.entries(byCat).sort((a, b) => b[1].length - a[1].length);
  const brandCount = {};
  items.forEach((p) => (brandCount[p.brand] = (brandCount[p.brand] || 0) + 1));
  const brands = Object.entries(brandCount).sort((a, b) => b[1] - a[1]);
  const prices = items.map((p) => p.price);
  const lo = Math.min(...prices), hi = Math.max(...prices), avg = prices.reduce((s, x) => s + x, 0) / prices.length;
  const pairs = {};
  items.forEach((p) => famOf(p.title).filter((f) => !re.test(f.name)).forEach((f) => (pairs[f.name] = (pairs[f.name] || 0) + 1)));
  const pairRows = Object.entries(pairs).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const combos = {};
  items.forEach((p) => { const t = p.title.replace(/\b(ice|iced)\b/i, "").toLowerCase(); const m = t.match(new RegExp("([a-z]+)\\s+" + term.replace(/\s+/g, "\\s+"), "i")) || t.match(new RegExp(term.replace(/\s+/g, "\\s+") + "\\s+([a-z]+)", "i")); if (m && m[1] && !/vape|pods?|bar|kit|juice|salt/.test(m[1])) combos[m[1]] = (combos[m[1]] || 0) + 1; });
  const comboRows = Object.entries(combos).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([w]) => w);
  const seen = new Set(); const picks = [];
  for (const p of items) { if (seen.has(p.brand + p.category)) continue; seen.add(p.brand + p.category); picks.push(p); if (picks.length === 10) break; }
  const first = post.body.split("\n\n")[0].replace(/\s*We currently list[\s\S]*$/, "").trim();
  const topCat = cats[0][0];
  const cb = CATBANK[topCat];
  const fam = famOf(term)[0];
  const others = posts.filter((x) => x.tags.includes("flavor") && x.slug !== post.slug).sort((a, b) => hash(post.slug + a.slug) - hash(post.slug + b.slug)).slice(0, 4);

  const body = `${first} We currently list **${items.length} products** with ${term} in the name across ${cats.length} categories at One Stop Vape Store. This guide explains what ${term} tastes like in vapes, how it is usually blended, where to find it, which brands make it and how to choose the right product, using the live catalog so the numbers match the shop.

## What ${term} tastes like in a vape
${first} ${fam ? fam.text : FLAVOR_BANK.default.pairing} Flavor is personal, so treat any description as a guide: the same recipe can taste sweeter, sharper or fuller depending on the device, how you draw and what you vaped before.

If you are choosing ${term} for the first time, try one product from a brand you already trust before stocking up, and compare two or three variations (plain, iced and blended) so you learn which style you prefer. Our [vape flavor profiles guide](/blog/vape-flavor-profiles-explained/) explains how the main flavor families work, and [best disposable vapes for flavor lovers](/blog/best-disposable-vapes-for-flavor-lovers/) is a good next read.

## How ${term} is blended
${pairRows.length ? `Reading the product names in our catalog, ${term} is most often combined with ${list(pairRows.map(([f]) => f))} notes:\n\n${pairRows.map(([f, n]) => `- **${title(f)}:** ${n} products. ${Object.values(FAM).find((x) => x.name === f).text}`).join("\n")}` : `${term} is usually sold on its own, so the flavor leads the recipe.`}

${comboRows.length ? `Common name pairings you will see include ${list(comboRows.map((w) => `${w} ${term}`))}. Pairings like these are how makers keep a familiar flavor interesting: the second note changes the sweetness, acidity or finish without hiding the main flavor.` : ""} ${term} also appears with a cooling finish, which is covered in [how cooling ice flavors work](/blog/how-cooling-ice-flavors-work/).

## Where to find ${term}
${cats.map(([c, arr]) => `- **${title(CAT[c])}:** ${arr.length} products, from ${money(Math.min(...arr.map((p) => p.price)))} to ${money(Math.max(...arr.map((p) => p.price)))}. [Browse ${CAT[c]}](/shop/${c}/).`).join("\n")}

The same flavor can behave differently in each format. In a disposable, the flavor is fixed and consistent for the life of the device. In an e-liquid, you control strength, bottle size and PG/VG ratio, so you can fine-tune how the flavor comes across. In a pouch, the flavor is released slowly through the lip. Choosing the format first, then the flavor, usually leads to a better result than the other way around.

## Brands that make ${term}
${brands.slice(0, 8).map(([b, n]) => `- **${b}:** ${n} ${term} products`).join("\n")}

Different brands interpret ${term} differently. One may lean sweet and candy-like, another tart and juicy, another cool and clean. When a brand you like also offers ${term}, that is usually the safest place to start.

## Example ${term} products
${picks.map((p) => `- [${p.title}](/shop/${p.category}/${p.slug}/) — ${money(p.price)}${p.puffs && p.puffs !== "High Capacity" ? `, ${p.puffs}` : ""}${p.nicotine && /mg|%/.test(p.nicotine) ? `, ${p.nicotine}` : ""}`).join("\n")}

## Choosing the right format for ${term}
${CAT_ONE[topCat] ? `Most ${term} products here are ${CAT[topCat]}. ` : ""}${cb.what}

${cb.choose.join("\n\n")}

## Price range and value
${Name} products in our catalog run from ${money(lo)} to ${money(hi)}, with an average of ${money(avg)}. Value depends on the format: compare disposables by [cost per puff](/blog/how-to-compare-vape-prices-per-puff/), bottles by price per milliliter and pouches by price per can. Orders of $200 or more after discounts ship free, and paying with cryptocurrency or a supported gift card saves 10%, so a larger order can lower your effective price noticeably. If you run a shop, see the [wholesale ordering guide](/blog/wholesale-ordering-guide/).

## Keeping ${term} flavor fresh
${cb.care} Flavor fades with heat, light and a worn coil, so store products cool and dark, and if a favorite starts to taste flat, a fresh coil or pod usually fixes it. Our guide to [fixing faded vape flavor](/blog/vape-flavor-fading-fixes/) covers the common causes.

Rotating between two or three flavors can also keep ${term} tasting fresh, because your palate adapts to a flavor you vape constantly. Many adults keep ${term} as a main flavor and add a seasonal or contrasting flavor alongside it.

${SHARED(term + " products")}

${ORDERING(term + " products")}

## More flavor guides
${others.map((x) => `- [${x.title}](/blog/${x.slug}/)`).join("\n")}
- [Vape flavor profiles explained](/blog/vape-flavor-profiles-explained/)
- [Throat hit explained](/blog/throat-hit-explained/)`;

  const faq = [
    { q: `What does ${term} taste like in a vape?`, a: `${first} ${fam ? fam.text : ""}`.trim() },
    { q: `How many ${term} products do you carry?`, a: `We list ${items.length} products with ${term} in the name across ${list(cats.map(([c]) => CAT[c]))}. Availability changes, so check the category pages.` },
    { q: `Which brands make ${term}?`, a: `${list(brands.slice(0, 5).map(([b]) => b))} are among the brands with the most ${term} products in our catalog.` },
    { q: `How much do ${term} products cost?`, a: `${Name} products here range from ${money(lo)} to ${money(hi)}, with an average of ${money(avg)}.` },
    { q: `Is ${term} available in more than one format?`, a: `Yes, ${list(cats.map(([c]) => CAT[c]))}. Pick the format first, then compare strengths and sizes on the product page.` },
    { q: `Do I save money paying with crypto?`, a: "Yes. Cryptocurrency and supported gift cards save 10% on your order total." },
    { q: `How fast will my order arrive?`, a: "Orders are processed within 24 to 72 business hours from Phoenix, Arizona and ship with tracking. An adult 21+ must sign on delivery." },
    { q: `Can I return a product I do not like?`, a: "Unopened items in original packaging can be returned within 30 days with a 15% restocking fee, refunded through the original payment method. Opened or used items cannot be returned." },
  ];
  return { body, faq };
}

let ok = 0, bad = 0, min = 1e9, total = 0;
for (const post of posts) {
  if (only && post.slug !== only) continue;
  let r = null;
  if (post.tags.includes("brand")) r = brandGuide(post);
  else if (post.tags.includes("flavor")) r = flavorGuide(post);
  else continue;
  if (!r) { console.log("skip (no data)", post.slug); continue; }
  const v = validate(r.body, { minWords: 1500, ctx, minLinks: 6 });
  const wc = wordCount(r.body);
  if (!v.ok) { bad++; console.log("FAIL", post.slug, wc, v.errors.join("; ")); continue; }
  fs.writeFileSync(path.join(OUT, post.slug + ".json"), JSON.stringify({ ok: true, mock: false, body: r.body, words: wc, faq: r.faq, model: "hand-written banks + catalogue data" }));
  ok++; min = Math.min(min, wc); total += wc;
}
console.log(`ok ${ok}, failed ${bad}, min ${min} avg ${Math.round(total / Math.max(1, ok))} words`);
