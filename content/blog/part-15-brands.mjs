// Catalog-driven brand guides: real counts, price ranges and product links from src/data/products.json,
// plus a hand-written blurb and "who it suits" line per brand.
const slugify = (s) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const CAT_NAME = { "vape-juice": "vape juice", "coils-pods": "coils and pods", disposables: "disposable vapes", "vape-kits": "vape kits", vaporizers: "vaporizers", "nic-pouches": "nicotine pouches", nixodine: "Nixodine devices" };

// [display name, match names (lowercase), blurb, who it suits]
const BRANDS = [
  ["Geek Bar", ["geek bar"], "Geek Bar is one of the most recognized disposable names in the US market, known for large-capacity devices and a wide flavor lineup.", "Suits adults who want a high puff count, rechargeable convenience and lots of flavor choice."],
  ["Lost Mary", ["lost mary"], "Lost Mary is a long-running disposable brand with compact designs and a steady stream of fruit and ice flavors.", "Suits people who like pocketable devices and familiar fruit-and-ice profiles."],
  ["RAZ", ["raz"], "RAZ sells both disposables and e-liquid, and is known for bold fruit combinations and cooling blends.", "Suits adults who like sweet, bright flavors in either a disposable or a bottle."],
  ["Foger", ["foger"], "Foger offers pod-style kits and disposables with a big flavor catalog and mid-range pricing.", "Suits anyone shopping for variety without a premium price."],
  ["Fifty Bar", ["fifty bar"], "Fifty Bar makes disposables in several sizes, with the larger models aimed at heavy daily use.", "Suits adults who want long-lasting devices and consistent flavor."],
  ["Pod Juice", ["pod juice"], "Pod Juice produces nicotine-salt e-liquids in many flavors designed for pod devices.", "Suits people who run refillable pods and want a deep flavor range in 30 mL bottles."],
  ["Pod Salt", ["pod salt"], "Pod Salt covers both nicotine-salt liquids and starter pod kits.", "Suits beginners who want a simple, matched kit and liquid."],
  ["Horizontech", ["horizontech", "horizontech"], "Horizontech offers disposables with a focus on consistent flavor delivery.", "Suits adults comparing mid-price disposables."],
  ["Mr Fog", ["mr fog"], "Mr Fog is a disposable line with a premium price point and a flavor-first approach.", "Suits people who prefer a small number of well-reviewed flavors."],
  ["EBCREATE", ["ebcreate", "eb create"], "EBCREATE (EB Create) is a disposable manufacturer with a broad lineup of fruit and dessert flavors.", "Suits shoppers looking for new flavor ideas at moderate prices."],
  ["Cloud Nurdz", ["cloud nurdz"], "Cloud Nurdz makes fruit-forward e-liquids in 100 mL and salt formats.", "Suits tank users who want bold, sweet fruit blends in large bottles."],
  ["Coastal Clouds", ["coastal clouds"], "Coastal Clouds is a US e-liquid maker known for tropical and dessert-style recipes.", "Suits people who enjoy fruit with creamy or tropical notes."],
  ["Juice Head", ["juice head"], "Juice Head blends fruit flavors with an optional cooling finish, in freebase and salt formats.", "Suits fruit lovers who want a choice between regular and extra-cool versions."],
  ["Monster Labs", ["monster labs"], "Monster Labs offers e-liquids in a wide range of candy, fruit and beverage flavors.", "Suits people who like playful, sweet flavor names."],
  ["ZYN", ["zyn"], "ZYN is a widely recognized nicotine pouch brand with mint, citrus and other flavors in a couple of strengths.", "Suits adults who want a straightforward pouch without a device."],
  ["American Ice", ["american ice"], "American Ice sells cooling-style nicotine pouches in a small range.", "Suits people who prefer a crisp, icy pouch."],
  ["LUCY", ["lucy"], "LUCY makes nicotine pouches with bold flavors and several strength levels.", "Suits adults who want stronger flavor from their pouches."],
  ["NOAT", ["noat"], "NOAT is a modern pouch brand with contemporary flavors and packaging.", "Suits people trying newer pouch brands."],
  ["Hookah Labs", ["hookah labs"], "Hookah Labs sells large-capacity Nixodine disposables inspired by hookah-style flavor.", "Suits adults who like rich, layered flavors and big devices."],
  ["Parfflo", ["parfflo"], "Parfflo makes Nixodine disposables with fruit and ice flavors.", "Suits shoppers exploring the Nixodine category."],
  ["Geek Labs", ["geek labs"], "Geek Labs is the Nixodine-focused line from the makers of well-known disposables.", "Suits people who already like the Geek Bar style and want a Nixodine option."],
  ["YOVO", ["yovo"], "YOVO offers Nixodine disposables with fruit-forward flavors.", "Suits adults comparing Nixodine brands."],
  ["Rifbar", ["rifbar"], "Rifbar makes disposables and Nixodine devices with fruit and ice recipes.", "Suits people who like familiar disposable formats."],
  ["Rinnbar", ["rinnbar"], "Rinnbar sells disposables and Nixodine devices at a mid-to-higher price point.", "Suits shoppers who want larger devices."],
  ["Hotbox", ["hotbox"], "Hotbox offers Nixodine disposables with bold flavors.", "Suits adults who like strong, sweet profiles."],
  ["NIX Liquids", ["nix liquids"], "NIX Liquids focuses on Nixodine e-liquid and device formats.", "Suits people who want to try Nixodine in a liquid or device format."],
  ["UT", ["ut", "ut bar"], "UT is a high-volume disposable line with many flavors and tiered pricing.", "Suits shoppers who like to try many flavors."],
  ["Off Stamp", ["off stamp"], "Off Stamp sells disposables, kits and pods across several price levels.", "Suits people who want options from entry level to premium."],
  ["VaporLax", ["vaporlax"], "VaporLax makes disposables and e-liquids with sweet, fruit-forward profiles.", "Suits people who prefer dessert and fruit blends."],
  ["Puffco", ["puffco"], "Puffco is a vaporizer brand known for premium dab-style devices and accessories.", "Suits people who want a well-made vaporizer and accept that Puffco products are not eligible for refunds or exchanges."],
];

export default function ({ products }) {
  return BRANDS.map(([name, keys, blurb, suits]) => {
    const items = products.filter((p) => keys.includes(p.brand.toLowerCase()));
    if (!items.length) throw new Error("no products for brand " + name);
    const byCat = {};
    items.forEach((p) => (byCat[p.category] = (byCat[p.category] || 0) + 1));
    const cats = Object.entries(byCat).sort((a, b) => b[1] - a[1]);
    const prices = items.map((p) => p.price);
    const min = Math.min(...prices), max = Math.max(...prices);
    const money = (n) => "$" + (Math.round(n * 100) / 100).toFixed(2);
    const picks = [];
    const seen = new Set();
    for (const p of items) {
      const k = p.title.toLowerCase().slice(0, 18);
      if (seen.has(k)) continue;
      seen.add(k);
      picks.push(p);
      if (picks.length === 5) break;
    }
    const topCat = cats[0][0];
    const slug = slugify(name) + "-vape-brand-guide";
    const range = min === max ? `${money(min)}` : `${money(min)} to ${money(max)}`;
    const tip = {
      disposables: "For disposables, compare puff count, a Type-C port and cost per puff. See [puff counts explained](/blog/puff-count-explained/).",
      "vape-juice": "For e-liquid, match nicotine type and PG/VG ratio to your device. See [nicotine salts vs freebase](/blog/nicotine-salts-vs-freebase/).",
      "vape-kits": "For kits, confirm the pod type and battery, and see our [first vape kit guide](/blog/first-vape-kit-guide/).",
      "nic-pouches": "For pouches, check strength per pouch and cans per pack. See [pouch strengths explained](/blog/nicotine-pouch-strengths-explained/).",
      nixodine: "For Nixodine products, read the label closely and see [what is Nixodine](/blog/what-is-nixodine/).",
      vaporizers: "For vaporizers, check the type and your local laws. See [types of vaporizers](/blog/types-of-vaporizers-explained/).",
      "coils-pods": "For parts, match the exact device model. See [replacement coils and pods](/blog/how-to-pick-replacement-coils-and-pods/).",
    }[topCat];
    const care = {
      disposables: "Store disposables cool, dry and upright, charge Type-C models on a hard surface and recycle them when empty. See [how to store disposables](/blog/how-to-store-disposable-vapes/) and [disposal](/blog/how-to-dispose-of-vapes-and-batteries/). Keep every device away from children and pets.",
      "vape-juice": "Keep bottles tightly capped in a cool, dark place and use them before the best-by date. See [how to store e-liquid](/blog/how-to-store-e-liquid/) and keep liquid away from children and pets.",
      "vape-kits": "Clean tanks and pods regularly, prime new coils and charge on a hard surface. See [how to clean a vape](/blog/how-to-clean-a-vape-device/) and [battery care basics](/blog/lithium-battery-care-basics-for-vapes/).",
      "nic-pouches": "Keep the lid closed, store cans cool and dry and dispose of used pouches in the trash. See [how to store pouches](/blog/how-to-store-nicotine-pouches/).",
      nixodine: "Treat Nixodine devices like any rechargeable disposable: store them cool, charge sensibly and recycle them properly. See [storage tips](/blog/nixodine-storage-and-use-tips/).",
      vaporizers: "Clean regularly, follow the manual for heating and keep batteries away from heat. See [battery care basics](/blog/lithium-battery-care-basics-for-vapes/).",
      "coils-pods": "Prime new coils, avoid chain vaping and replace parts on schedule. See [how often to replace coils](/blog/how-often-to-replace-coils/).",
    }[topCat];
    const body = `${blurb} We currently list **${items.length} ${name} product${items.length === 1 ? "" : "s"}** at One Stop Vape Store, priced ${range}.

## What we stock from ${name}
${cats.map(([c, n]) => `- ${n} in [${CAT_NAME[c]}](/shop/${c}/)`).join("\n")}

## Popular ${name} picks
${picks.map((p) => `- [${p.title.replace(/[\[\]]/g, "")}](/shop/${p.category}/${p.slug}/): ${p.priceDisplay}`).join("\n")}

## Who ${name} suits
${suits} Check each product page for strength, size and flavor details, and compare options in the [full catalog](/shop/).

## Buying tips
${tip}

## Care and storage
${care}

## Ordering
Orders over $200 after discount ship free, and crypto and gift card payments earn 10% off. See [how ordering works](/blog/how-ordering-works/). Adults 21+ only; nicotine is addictive.`;
    return {
      slug, category: "Brand Guides", tags: ["brand", slugify(name), ...cats.map(([c]) => c)],
      shop: cats.slice(0, 2).map(([c]) => c), keywords: [name.toLowerCase()],
      title: `${name} Guide: Lineup, Prices and Popular Picks`,
      summary: `Browse ${items.length} ${name} products at One Stop Vape Store from ${money(min)}. See categories, popular picks and tips on who each suits.`.slice(0, 158),
      body,
      faq: [
        [`How much does ${name} cost?`, `${name} products in our catalog range from ${range}, depending on the product and size.`],
        [`What does One Stop Vape Store stock from ${name}?`, `We list ${items.length} ${name} products across ${cats.map(([c]) => CAT_NAME[c]).join(" and ")}. Stock and flavors change, so check the category pages.`],
      ],
    };
  });
}
