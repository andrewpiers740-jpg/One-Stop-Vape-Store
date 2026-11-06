// scripts/gen-product-copy.mjs — writes a 400+ word, structured product description for EVERY product, with no external API.
// Copy is assembled from hand-written paragraph banks (per category, per flavor family, per feature) and filled with the product's
// own catalogue data (brand, flavor, strength, puff count, options, price). Which variant of each paragraph a product gets is chosen
// by a hash of its slug, so neighbouring products read differently. Output: one file per product in src/data/product-copy/<slug>.json (loaded on demand by the product page)
//   node scripts/gen-product-copy.mjs [--only slug] [--stats]
// Validation (shared with the blog pipeline): >= 400 words, no banned wording, valid internal links, mentions 21+.
import fs from "node:fs";
import { validate } from "./lib/contentRules.mjs";

const products = JSON.parse(fs.readFileSync("src/data/products.json", "utf8"));
const only = process.argv.includes("--only") ? process.argv[process.argv.indexOf("--only") + 1] : null;
const ctx = { productSlugs: new Set(products.map((p) => `${p.category}/${p.slug}`)), blogSlugs: new Set() };

const hash = (s) => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
const pick = (arr, seed, slot) => arr[hash(seed + ":" + slot) % arr.length];

const CAT_NAME = { "vape-juice": "Vape Juice", "coils-pods": "Coils & Pods", disposables: "Disposable Vapes", "vape-kits": "Vape Kits", vaporizers: "Vaporizers", "nic-pouches": "Nicotine Pouches", nixodine: "Nixodine" };

// ---- flavor families (keyword -> descriptive sentence fragments; descriptive only, no claims) ----
const FAMILIES = [
  { id: "cool", re: /ice|icy|menthol|mint|freeze|frost|arctic|cool|chill|polar|spearmint|peppermint|wintergreen|glacier|blast/i,
    s: ["a cooling finish that lifts the flavor on every inhale", "a crisp, chilled edge that keeps the profile fresh", "a refreshing cool note layered over the main flavor"] },
  { id: "berry", re: /berry|berries|raspberry|razz|strawberry|blueberry|blackberry|cranberry|acai|currant/i,
    s: ["bright, juicy berry notes with a natural sweet-tart balance", "ripe berry sweetness that stays lively from first puff to last", "a rounded berry profile that leans fruity without feeling heavy"] },
  { id: "citrus", re: /lemon|lime|orange|citrus|grapefruit|lemonade|yuzu|tangerine|pink lemon/i,
    s: ["a zesty citrus lift that reads clean and sharp", "tangy citrus brightness with a soft sweet finish", "a sparkling citrus character that suits daytime vaping"] },
  { id: "tropical", re: /mango|pineapple|passion|guava|papaya|banana|coconut|tropical|dragon|lychee|kiwi|aloe|island|hawaiian/i,
    s: ["sun-ripened tropical fruit with a smooth, juicy body", "an island-style fruit blend that leans sweet and aromatic", "layered tropical notes that taste rounded and full"] },
  { id: "melon", re: /melon|watermelon|cantaloupe|honeydew/i,
    s: ["cool, juicy melon sweetness with a light, watery finish", "a mellow melon profile that stays soft on the palate"] },
  { id: "stone", re: /peach|apricot|cherry|plum|apple|pear|nectarine/i,
    s: ["orchard-fruit sweetness with a gentle, familiar taste", "soft stone-fruit and apple notes that stay balanced"] },
  { id: "grape", re: /grape|concord/i, s: ["deep, jammy grape flavor with a smooth finish", "a rich grape profile with a sweet, candy-like edge"] },
  { id: "candy", re: /candy|gummy|sour|cotton|bubble|skittle|rainbow|punch|soda|cola|slush|swirl|lollipop|jelly|fruit blast/i,
    s: ["playful candy sweetness with a sour-sweet pop", "a nostalgic sweet-shop style flavor with plenty of fun", "bold, confectionery-style flavor that stands out"] },
  { id: "dessert", re: /cream|custard|vanilla|cake|cookie|donut|waffle|pastry|milk|caramel|butter|pudding|chocolate|brownie|honey|cheesecake/i,
    s: ["a creamy, dessert-inspired profile with a smooth, rounded body", "a bakery-style sweetness with soft vanilla-like warmth", "indulgent dessert notes that taste rich and mellow"] },
  { id: "tobacco", re: /tobacco|cigar|classic|rustic|havana|virginia|rich tobacco/i,
    s: ["a traditional tobacco-style profile with a mellow, toasty depth", "a classic, no-frills taste for adults who prefer tobacco notes"] },
  { id: "coffee", re: /coffee|latte|cappuccino|espresso|mocha/i, s: ["roasted coffee notes with a smooth, slightly sweet finish"] },
  { id: "energy", re: /energy|redbull|bull|monster|rocket/i, s: ["a bold, fizzy energy-drink style flavor with a sweet, tangy profile"] },
];
const family = (t) => FAMILIES.filter((f) => new RegExp("\\b(?:" + f.re.source + ")", "i").test(t));

// ---- helpers over catalogue data ----
const STOP = /\b(ejuice|e-juice|eliquid|e-liquid|salts?|nic salts?|30ml|60ml|100ml|120ml|50mg|disposable|vape|pods?|kit|replacement|pouches?|nicotine|pro|plus|ultra|nixodine|device|bar|puffs?|k)\b/gi;
function flavorName(p) {
  if (p.flavor) return p.flavor;
  let t = p.title.replace(new RegExp(p.brand.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "ig"), " ");
  t = t.replace(STOP, " ").replace(/\d+[a-z]*/gi, " ").replace(/[^A-Za-z' &-]/g, " ").replace(/\s+/g, " ").trim();
  return t.length >= 3 && t.length <= 44 ? t : "";
}
const money = (p) => p.priceDisplay || `$${p.price.toFixed(2)}`;
const ACCESSORY = /attachment|cap\b|extender|insert|glass|adapter|battery|charger|case|mouthpiece|bubbler|carb|cup|banger|tip|stand|tool|pen\b|cartridge|coil|replacement/i;
const mg = (p) => (p.nicotine && /mg|%/.test(p.nicotine) ? p.nicotine : "");

// ---- category banks: intro, features (feature -> benefit), use/care, who ----
const BANK = {
  "vape-juice": {
    kind: "e-liquid",
    intro: [
      (c) => `${c.title} brings ${c.brand}'s ${c.flav ? c.flav.toLowerCase() + " " : ""}e-liquid to adult vapers who want a dependable everyday flavor. It is made for refillable pod systems and tanks, so you keep the freedom to pair it with the device you already own.`,
      (c) => `Looking for a bottle you can reach for every day? ${c.title} from ${c.brand} is a ${c.sub === "salt-nicotine-e-liquid" ? "nicotine-salt" : "freebase"} e-liquid built around ${c.fam || "a clear, easy-to-recognize flavor"}. It is stocked and shipped from our Phoenix, Arizona Stock Warehouse.`,
      (c) => `${c.brand} has made ${c.title} for adults who care about flavor first. Whether you vape in a compact pod or a larger tank, this e-liquid is designed to deliver a consistent taste from the first fill to the last drop.`,
    ],
    features: [
      ["Ready-to-use formula", "arrives pre-mixed, so there is nothing to blend and you can fill your device straight away"],
      ["Flavor-forward recipe", "keeps the taste clear and recognizable instead of muddy, which matters most when you vape the same flavor all day"],
      ["Compatible with refillable systems", "works with the pods, tanks and coils you already use, so you are not locked into one device"],
      ["Clearly labelled strength", "the nicotine strength is shown on the label and on this page, making it easier to compare against what you used before"],
      ["Bottle sized for refilling", "the bottle is built for tidy refills and easy storage on a desk or in a bag"],
      ["Consistent batches", "stocked from the manufacturer's regular production, so repeat orders taste like the last one"],
    ],
    use: "Check that your device supports the type of e-liquid you buy: nicotine-salt liquids suit low-power pod systems, while freebase liquids are usually chosen for sub-ohm tanks and higher wattage. Fill slowly, wipe the tip clean, let a fresh coil soak for a few minutes before the first puff, and keep the bottle upright with the cap closed between uses. Store it away from heat and direct sunlight, and keep it away from children and pets.",
    who: "adult vapers with a refillable pod or tank who want to stay with a flavor they enjoy, and those comparing strengths and bottle sizes before they restock",
  },
  disposables: {
    kind: "disposable vape",
    intro: [
      (c) => `${c.title} is a ready-to-use disposable vape from ${c.brand}. There is nothing to fill, no coil to replace and no setup: take it out of the box, and it is ready for adult use${c.puffs ? `, with a listed capacity of ${c.puffs}` : ""}.`,
      (c) => `If you want a pocket-friendly device without the upkeep, ${c.title} is built for exactly that. ${c.brand} pairs a pre-filled pod with a built-in battery so you can focus on flavor${c.fam ? ` — here, ${c.fam}` : ""}.`,
      (c) => `${c.brand}'s ${c.title} is a grab-and-go disposable for adults. It is stocked at our Phoenix Stock Warehouse and shipped with tracking, so you can restock your favorite flavor without hunting around.`,
    ],
    features: [
      ["Pre-filled and pre-charged", "open the box and use it straight away, with no refilling or charging before the first puff"],
      ["Built-in battery", "removes the need for separate cells or chargers, which keeps the device compact enough for a pocket or bag"],
      ["Draw-activated firing", "there are no buttons to learn, so it starts when you inhale and stops when you do"],
      ["Mesh-style coil technology", "helps spread heat evenly across the coil, which supports consistent flavor through the life of the device"],
      ["Large pre-filled capacity", "means fewer replacements and less packaging, which suits adults who vape through the day"],
      ["Single-purchase simplicity", "no pods to track, no coils to match, and no compatibility questions when you reorder"],
      ["Compact, lightweight body", "slips into a pocket without the bulk of a refillable kit"],
    ],
    use: "Use the device only as directed on the packaging. Take gentle, short puffs rather than long, hard draws, which helps the coil keep up and avoids a burnt taste. Keep it upright when you are not using it, store it at room temperature away from direct sunlight and hot cars, and do not try to open, refill or modify it. When the flavor fades or the battery stops responding, dispose of it according to local rules for electronics and batteries. Keep it away from children and pets.",
    who: "adult nicotine users who want a simple, ready-to-use device, travelers who prefer something that fits in a pocket, and anyone trying a new flavor before committing to a larger setup",
  },
  "vape-kits": {
    kind: "vape kit",
    intro: [
      (c) => `${c.title} is a complete starter or upgrade kit from ${c.brand}. It includes the device and its matching pod, so you can set up quickly and understand how the system works before you add accessories.`,
      (c) => `${c.brand}'s ${c.title} is designed for adults who want more control than a disposable offers. A rechargeable device plus a compatible pod gives you a setup you can reuse, refill or swap as your preferences change.`,
      (c) => `Moving up from disposables? ${c.title} gives you a rechargeable pod system from ${c.brand}, with a flavor-ready pod${c.fam ? ` offering ${c.fam}` : ""} and a device you can keep using after the first pod is finished.`,
    ],
    features: [
      ["Rechargeable battery", "charge over USB-C and keep using the same device instead of buying a new one each time"],
      ["Pod-based system", "makes it quick to change flavors or replace a pod without cleaning or rebuilding anything"],
      ["Compact kit design", "keeps the device and pod together in a body that is easy to carry"],
      ["Matching replacement pods", "the pods in this range are sold separately, so restocking is straightforward"],
      ["Simple operation", "a familiar draw-activated or one-button layout keeps day-to-day use easy to learn"],
      ["Reusable hardware", "spreads the cost of the device across many pods over time"],
    ],
    use: "Charge the device fully before first use with a standard USB-C cable, seat the pod firmly until it clicks, and give a new pod a minute to saturate before you begin. Take short, steady draws, keep the pod connectors clean and dry, and store the kit upright away from heat. Use only the compatible pods listed in the same product range, and never charge a damaged device. Keep all parts away from children and pets.",
    who: "adult vapers upgrading from disposables, those who want a reusable device with swappable pods, and gift buyers looking for a complete set that is ready to use",
  },
  "coils-pods": {
    kind: "replacement pod or coil",
    intro: [
      (c) => `${c.title} is a ${c.brand} replacement part made for adults who already own a compatible device. Swapping in a fresh pod or coil restores flavor and keeps your setup running the way it did on day one.`,
      (c) => `When flavor starts to fade, the quickest fix is usually a new pod or coil. ${c.title} from ${c.brand} is built to match its original device, so there is nothing to modify or adapt.`,
    ],
    features: [
      ["Designed to match the original device", "so it fits securely and connects without adapters"],
      ["Fresh coil in every pod", "restores flavor that has faded over time"],
      ["Quick swap", "takes seconds and needs no tools or cleaning"],
      ["Pre-filled or ready to fill, as listed", "so you know in advance how it is meant to be used"],
    ],
    use: "Confirm the product name matches your device before ordering, because pods and coils are not interchangeable between brands. Remove the old part, press the new one in until it seats, and let it rest for a minute before use. Dispose of used parts responsibly, store spares in a cool dry place, and keep them out of reach of children and pets.",
    who: "adult owners of the matching device who want to keep it running, and anyone who prefers to stock spares so they never run out",
  },
  vaporizers: {
    kind: "vaporizer product",
    intro: [
      (c) => `${c.title} from ${c.brand} is part of our vaporizers range, which covers devices and compatible accessories for adult use. Each listing names the system it belongs to so you can match it to your setup.`,
      (c) => `${c.brand} designs ${c.title} to work with its own system. If you already use that line, this is a straightforward way to add or replace a part without changing your whole device.`,
    ],
    features: [
      ["Made for a specific system", "which helps with fit and reduces trial and error"],
      ["Straightforward installation", "most parts attach by hand and need no special tools"],
      ["Durable materials", "chosen for regular use and easy cleaning, as described by the manufacturer"],
      ["Clear product naming", "so you can confirm compatibility before you order"],
    ],
    use: "Follow the manufacturer's instructions for your device, make sure parts are clean and dry before assembly, and handle glass or small components carefully. Store accessories in a secure, dry place away from children and pets, and use them only for legal products in your state.",
    who: "adult owners of the matching vaporizer system who are replacing a part or adding an accessory",
  },
  "nic-pouches": {
    kind: "nicotine pouch",
    intro: [
      (c) => `${c.title} is a tobacco-free nicotine pouch from ${c.brand}, made for adults who want a discreet alternative with no smoke, no vapor and no device to charge. Each can is sealed for freshness${c.fam ? ` and focuses on ${c.fam}` : ""}.`,
      (c) => `${c.brand}'s ${c.title} suits adults who want nicotine in a small, mess-free format. Place a pouch between your lip and gum, and it releases flavor and nicotine as directed on the label.`,
    ],
    features: [
      ["Tobacco-free pouch", "contains no tobacco leaf, so there is nothing to spit or dispose of beyond the used pouch"],
      ["Discreet format", "no smoke or vapor, which can be convenient where vaping is not appropriate"],
      ["Sealed can", "keeps the pouches fresh and the flavor consistent until you open it"],
      ["Clear strength options", "strengths are listed so you can compare cans and choose the level that suits you"],
      ["Portable", "a slim can fits easily in a pocket or bag"],
    ],
    use: "Use only as directed on the can. Start with the lowest strength if you are new to nicotine pouches, keep a pouch in place for the time recommended on the label, and dispose of used pouches in a bin rather than on the ground. Store cans in a cool, dry place, close the lid after each use, and keep them away from children and pets. Nicotine is addictive.",
    who: "adult nicotine users who want a discreet, device-free option and who are comfortable with a pouch format",
  },
  nixodine: {
    kind: "Nixodine product",
    intro: [
      (c) => `${c.title} is a Nixodine product from ${c.brand}. Nixodine is a newer nicotine alternative, and these devices are listed in their own category so you can compare them with traditional nicotine salt options in one place.`,
      (c) => `${c.brand}'s ${c.title} sits in our Nixodine range, built for adults who want a ready-to-use device${c.puffs ? ` with a listed capacity of ${c.puffs}` : ""} and a flavor profile${c.fam ? ` offering ${c.fam}` : ""}.`,
    ],
    features: [
      ["Ready-to-use design", "pre-filled and pre-charged so you can use it straight away"],
      ["Listed in a dedicated range", "so you can compare Nixodine options side by side"],
      ["Clear specifications", "strength and capacity are shown on this page and on the label"],
      ["Compact body", "easy to carry and simple to operate"],
    ],
    use: "Use as directed on the packaging, take short puffs, keep the device upright and away from heat, and do not open or modify it. Dispose of used devices according to local rules for electronics and batteries, and keep them out of reach of children and pets.",
    who: "adult users curious about Nixodine and anyone comparing it with standard nicotine salt devices",
  },
};

// ---- shared closing banks ----
const ORDER = [
  (c) => `You can order ${c.title} online with Cash App, Apple Pay, Chime, cryptocurrency or gift cards. Pay with crypto or a supported gift card and you save ${c.cryptoDisc}% on your order total. Orders of $${c.free} or more after discounts ship free; below that, shipping is a flat $${c.flat}, and the minimum order is $${c.min}.`,
  (c) => `Checkout accepts Cash App, Apple Pay, Chime, crypto and gift cards. Choosing crypto or a gift card takes ${c.cryptoDisc}% off your total, and orders of $${c.free} or more after that discount ship free. A flat $${c.flat} fee applies to smaller orders, and the minimum order is $${c.min}.`,
];
const SHIP = [
  "Orders are processed within 24 to 72 business hours at our Phoenix, Arizona Stock Warehouse and ship with tracking by USPS or UPS. Because these are vapor products, an adult aged 21 or older must sign for delivery under the PACT Act, so make sure someone of age can receive the parcel.",
  "Your parcel leaves our Phoenix Stock Warehouse within 24 to 72 business hours and ships with a tracking number. Adult signature (21+) is required on delivery, as federal PACT Act rules require for vapor products, so please plan to be available or choose an address where an adult can sign.",
];
const RETURN = [
  "If something is wrong with your order, contact us within 30 days and we will help. Unopened items in original packaging can be returned or exchanged, a 15% restocking fee applies to refunds, and refunds go back through the payment method you originally used. Opened or used e-liquid and devices cannot be returned. Our refund policy has the full details.",
  "Our returns window is 30 days from purchase. Unopened products in their original packaging qualify, refunds are issued through the same payment method that was used for the order, less a 15% restocking fee, and opened or used items cannot be accepted. Contact us first so we can send an RMA form.",
];
const EXTRA = [
  "Choosing between similar products usually comes down to three things: the flavor you enjoy, the strength you are comfortable with, and how you plan to use the product. Read the specifications above, compare options on the category page, and if you are unsure, contact us before you order — our team can point you to the right listing. Everything we sell is intended only for adults aged 21 and over, and nicotine is addictive.",
  "A good habit with any nicotine product is to start with the option that matches your current use rather than jumping to the highest strength or the largest size. If you are switching from another brand, compare the strength and capacity figures on this page with what you used before, and keep the packaging so you can reorder the exact product later. Products are for adult use only.",
  "Not sure whether this is the right fit? Compare it with related products from the same brand, check the strength and pack options, and read our shipping and refund policies so there are no surprises. Our support team is available by chat, WhatsApp, phone and email, and is happy to answer questions before you buy.",
];

function build(p) {
  const bank = BANK[p.category];
  const seed = p.slug;
  const sub = p.subcategory;
  const flav = flavorName(p);
  const fams = family(`${flav} ${p.title}`);
  const famLine = fams.length ? pick(fams[0].s, seed, "fam") : "";
  const second = fams[1] ? pick(fams[1].s, seed, "fam2") : "";
  const accessory = p.category === "vaporizers" && ACCESSORY.test(p.title);
  const c = { title: p.title, brand: p.brand, flav, fam: famLine, puffs: p.puffs && p.puffs !== "High Capacity" ? p.puffs : "", sub,
    cryptoDisc: 10, free: 200, flat: 15, min: 100 };

  const related = products.filter((x) => x.slug !== p.slug && x.category === p.category && x.brand === p.brand).slice(0, 2);
  const more = related.length ? related : products.filter((x) => x.slug !== p.slug && x.category === p.category).slice(0, 2);

  const paras = [];
  paras.push(pick(bank.intro, seed, "intro")(c));
  paras.push(`${p.title} is listed at ${money(p)} in our ${CAT_NAME[p.category]} range. Every product on the site is stocked for adults aged 21 and over, and you can browse the full [${CAT_NAME[p.category]}](/shop/${p.category}/) collection to compare it with similar options.`);

  // Flavor section
  if (p.category !== "coils-pods" && p.category !== "vaporizers" || (p.category === "coils-pods" && flav)) {
    const f = flav ? `The name ${flav} points to ${famLine || "a flavor that is easy to recognize"}${second ? `, with ${second}` : ""}.` : `${p.brand} keeps this one simple, with ${famLine || "a flavor that is easy to recognize"}.`;
    const tail = pick([
      "Flavor is personal, so treat the description as a guide rather than a promise: how a profile tastes depends on your device, how you draw and what you vaped before.",
      "Taste is subjective, and the same flavor can read sweeter or sharper depending on the device and your own palate, so use this as a starting point.",
      "Descriptions like this are a guide to the intended profile; your own experience will depend on your setup and preferences.",
    ], seed, "flavtail");
    paras.push(`## Flavor and experience\n${f} ${tail}`);
  }

  // Specs
  const specs = [`- **Brand:** ${p.brand}`, `- **Category:** ${CAT_NAME[p.category]}`];
  if (flav) specs.push(`- **Flavor:** ${flav}`);
  if (mg(p)) specs.push(`- **Nicotine strength:** ${mg(p)}`);
  if (p.puffs && p.puffs !== "High Capacity") specs.push(`- **Capacity:** ${p.puffs}`);
  if (p.packSize) specs.push(`- **Packaging:** ${p.packSize}`);
  specs.push(`- **Price:** ${money(p)}`, `- **Ships from:** Phoenix, Arizona Stock Warehouse`, `- **Age requirement:** 21+ with adult signature on delivery`);
  paras.push(`## Specifications\n${specs.join("\n")}`);

  // Features -> benefits (4 chosen by hash)
  const feats = [...bank.features];
  const chosen = [];
  let h = hash(seed + "feat");
  while (chosen.length < Math.min(4, feats.length)) { const i = h % feats.length; chosen.push(feats.splice(i, 1)[0]); h = Math.imul(h, 1664525) + 1013904223 >>> 0; }
  paras.push(`## Key features and what they mean for you\n${chosen.map(([f, b]) => `- **${f}:** ${b}.`).join("\n")}`);

  // Options
  if (/,/.test(p.nicotine || "") || /,/.test(p.packSize || "")) {
    paras.push(`### Strength and size options\nThis listing offers more than one option${/,/.test(p.nicotine || "") ? ` — strengths ${p.nicotine}` : ""}${/,/.test(p.packSize || "") ? `${/,/.test(p.nicotine || "") ? " and " : " — "}pack sizes ${p.packSize}` : ""}. Choose yours above the Add to Cart button and the price updates to match, then set the quantity you need. Your choice appears in your cart and on your order confirmation, so there is no guessing at fulfillment.`);
  } else if (mg(p)) {
    paras.push(`### About the strength\nThis product is listed at ${mg(p)}. Compare that figure with what you currently use before you order, remember that nicotine is addictive, and speak to a healthcare professional if you have questions about it.`);
  }

  paras.push(`## Who it suits\n${accessory ? "This listing is best for " : "${p.title} suits ".replace("${p.title}", p.title)}${bank.who}.`);
  paras.push(`## Using and caring for it\n${bank.use}`);
  paras.push(`## Ordering, payment and delivery\n${pick(ORDER, seed, "order")(c)}\n\n${pick(SHIP, seed, "ship")}`);
  paras.push(`## Returns and support\n${pick(RETURN, seed, "ret")} Read the full [refund policy](/refunds/) and [shipping policy](/shipping/), or visit the [FAQ](/faq/) for more answers.`);
  paras.push(`## Keep exploring\n${more.map((x) => `- [${x.title.replace(/[\[\]]/g, "")}](/shop/${x.category}/${x.slug}/)`).join("\n")}\n- [Browse all ${CAT_NAME[p.category]}](/shop/${p.category}/)`);

  let body = paras.join("\n\n");
  let v = validate(body, { minWords: 400, ctx, minLinks: 3 });
  for (let i = 0; !v.ok && v.words < 430 && i < EXTRA.length; i++) {
    body = body.replace("## Returns and support", `## Choosing with confidence\n${pick(EXTRA, seed, "extra" + i)}\n\n## Returns and support`);
    v = validate(body, { minWords: 400, ctx, minLinks: 3 });
    if (v.ok) break;
    EXTRA.push(EXTRA.shift());
  }
  const short = `${p.title} by ${p.brand}${mg(p) ? ` (${mg(p)})` : ""} — ${CAT_NAME[p.category].toLowerCase()} for adults 21+, ${money(p)}. Ships from Phoenix, AZ with adult signature on delivery.`.slice(0, 160);
  return { body, short, words: v.words, ok: v.ok, errors: v.errors };
}

const out = {};
const stats = { ok: 0, bad: 0, min: 1e9, max: 0, total: 0 };
const bad = [];
for (const p of products) {
  if (only && p.slug !== only) continue;
  const r = build(p);
  if (!r.ok) { stats.bad++; bad.push(`${p.slug}: ${r.errors.join("; ")}`); continue; }
  stats.ok++; stats.total += r.words; stats.min = Math.min(stats.min, r.words); stats.max = Math.max(stats.max, r.words);
  out[p.slug] = { body: r.body, short: r.short };
}
if (only) { console.log(out[only]?.body || bad.join("\n")); process.exit(0); }
fs.mkdirSync("src/data/product-copy", { recursive: true });
for (const [slug, v] of Object.entries(out)) fs.writeFileSync(`src/data/product-copy/${slug}.json`, JSON.stringify(v));
console.log(`ok ${stats.ok}, failed ${stats.bad}, words min ${stats.min} / avg ${Math.round(stats.total / Math.max(1, stats.ok))} / max ${stats.max}`);
if (bad.length) console.log(bad.slice(0, 15).join("\n"));
