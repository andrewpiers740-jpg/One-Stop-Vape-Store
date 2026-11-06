// Catalog-driven flavor guides: counts, brands and example products come from src/data/products.json.
const slugify = (s) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const clean = (t) => t.replace(/[\[\]]/g, "");

// [display name, title keyword(s), what it tastes like, pairing tip]
const FLAVORS = [
  ["Ice", ["ice"], "Ice versions add a cooling finish to a base flavor, usually fruit. The chill brightens sweet recipes and can make them feel fresher.", "Try an ice version next to the plain one to learn how much cooling you like. See [how cooling flavors work](/blog/how-cooling-ice-flavors-work/)."],
  ["Watermelon", ["watermelon"], "Watermelon vapes taste of sweet, juicy melon, often with a hint of candy. Many are paired with ice or with strawberry, lime or berries.", "Watermelon with ice is a classic summer-style combination, while watermelon with berries is sweeter."],
  ["Blue Razz", ["blue razz"], "Blue razz is a tangy, candy-like blue raspberry profile that is sweet with a slightly sour edge.", "It is often sold with ice. If you find sweet flavors heavy, choose a tart blue razz with lemon or lime."],
  ["Mango", ["mango"], "Mango flavors are rich, sweet and tropical, ranging from ripe fruit to a sharper, green-mango style.", "Mango pairs well with peach, passion fruit, pineapple and a touch of ice."],
  ["Peach", ["peach"], "Peach vapes taste soft, sweet and slightly floral, either as a juicy ripe fruit or a candy-style peach ring.", "Peach and ice, peach and mango and peach and strawberry are common blends."],
  ["Strawberry", ["strawberry"], "Strawberry is the most common fruit flavor: sweet, bright and familiar, from fresh berry to candy and cream.", "It blends with banana, kiwi, watermelon and cream, and often comes with ice."],
  ["Mint", ["mint"], "Mint flavors range from soft spearmint to sharp peppermint and are often described as clean and refreshing.", "If you find menthol too cold, start with spearmint or a mint-and-fruit blend."],
  ["Menthol", ["menthol"], "Menthol delivers a strong, cold, clean sensation with little sweetness, and suits people who like a crisp finish.", "Menthol is the strongest cooling profile. Compare it with mint if you are not sure which you prefer."],
  ["Grape", ["grape"], "Grape flavors lean candy-sweet, with a rounded juicy taste reminiscent of grape soda or sweets.", "Grape pairs well with ice, berries and peach."],
  ["Cherry", ["cherry"], "Cherry vapes taste of sweet, slightly tart fruit and sometimes cola or candy.", "Cherry with ice or with lime is a popular, balanced combination."],
  ["Banana", ["banana"], "Banana flavors are creamy and sweet, and are often blended with strawberry or ice.", "Banana mixes well with creamy or custard-style recipes."],
  ["Lemon", ["lemon"], "Lemon is tart and bright. Variants include lemonade, lemon tea and sweeter pastry-style lemon.", "Lemon with berries or mint adds a zingy lift to sweeter profiles."],
  ["Pineapple", ["pineapple"], "Pineapple is tangy and tropical, often combined with coconut, mango or ice.", "Pineapple blends well with citrus and can cut through very sweet recipes."],
  ["Apple", ["apple"], "Apple vapes range from crisp green apple to sweet candy apple and apple-and-fruit blends.", "Green apple suits those who like tartness, while apple blends with berries are sweeter."],
  ["Raspberry", ["raspberry"], "Raspberry flavors taste sweet and tart, from fresh berry to blue raspberry candy.", "Raspberry works with lemon, peach and ice."],
  ["Kiwi", ["kiwi"], "Kiwi is tart and slightly sweet with a fresh, green character, often paired with strawberry or passion fruit.", "A kiwi blend suits those who want fruit without heavy sweetness."],
  ["Orange", ["orange"], "Orange flavors run from juicy citrus to creamy orange soda or candy.", "Orange pairs well with mango, peach and cream."],
  ["Guava", ["guava"], "Guava tastes tropical, floral and sweet, with a gentle tartness.", "Guava with passion fruit, ice or strawberry is a common blend."],
  ["Passion Fruit", ["passion"], "Passion fruit is tangy, aromatic and tropical, with a sweet-sour balance.", "Pair it with mango, guava or orange for a layered tropical mix."],
  ["Dragon Fruit", ["dragon"], "Dragon fruit has a mild, lightly sweet taste, often boosted by berries, kiwi or lychee.", "Look for dragon fruit in mixed blends, where it adds a soft tropical note."],
  ["Vanilla", ["vanilla"], "Vanilla vapes are creamy, warm and sweet, often part of dessert recipes such as custard or ice cream.", "Vanilla is best if you like rich flavors. Note that creamy liquids can leave more residue on coils."],
  ["Cola", ["cola"], "Cola flavors recreate soda: sweet, a little spicy and tangy, with a slightly caramel note.", "Cola with cherry or lime echoes classic soda combinations."],
  ["Lime", ["lime"], "Lime is sharp, zesty and tart, and is often used to balance sweeter fruits.", "Lime pairs well with watermelon, strawberry and mint."],
  ["Coconut", ["coconut"], "Coconut is creamy and tropical, from light and milky to rich and sweet.", "Coconut with pineapple or mango makes a classic piña-colada style blend."],
  ["Tobacco", ["tobacco"], "Tobacco flavors replicate the taste of traditional tobacco, from light and sweet to rich and nutty.", "Tobacco profiles suit adults who dislike fruity or sweet flavors."],
  ["Mixed Berry", ["berry"], "Mixed berry vapes combine strawberry, blueberry, raspberry and more into a sweet, bright blend.", "If you cannot choose a single berry, a mixed berry flavor is an easy starting point for taste testing."],
  ["Cream", ["cream"], "Cream flavors are soft, sweet and dessert-like, from vanilla custard to ice cream.", "Cream pairs with fruit for a milkshake-style taste, but expect more coil residue than with plain fruit."],
  ["Strawberry Banana", ["strawberry banana", "strawberry-banana"], "Strawberry banana is a smoothie-style classic: sweet strawberry with creamy banana.", "It is often available with ice for a cooler finish."],
];

export default function ({ products }) {
  const CAT_NAME = { "vape-juice": "vape juice", disposables: "disposable vapes", "vape-kits": "vape kits", "nic-pouches": "nicotine pouches", nixodine: "Nixodine devices", "coils-pods": "coils and pods", vaporizers: "vaporizers" };
  return FLAVORS.map(([name, keys, taste, pairing]) => {
    const items = products.filter((p) => keys.some((k) => p.title.toLowerCase().includes(k)));
    if (items.length < 5) throw new Error("too few products for flavor " + name);
    const brands = {};
    items.forEach((p) => (brands[p.brand] = (brands[p.brand] || 0) + 1));
    const topBrands = Object.entries(brands).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const cats = {};
    items.forEach((p) => (cats[p.category] = (cats[p.category] || 0) + 1));
    const catList = Object.entries(cats).sort((a, b) => b[1] - a[1]);
    // one pick per brand for variety
    const picks = [];
    const used = new Set();
    for (const p of items) {
      if (used.has(p.brand)) continue;
      used.add(p.brand);
      picks.push(p);
      if (picks.length === 6) break;
    }
    const prices = items.map((p) => p.price);
    const money = (n) => "$" + (Math.round(n * 100) / 100).toFixed(2);
    const slug = slugify(name) + "-vape-flavors-guide";
    const body = `${taste} We currently list **${items.length} products** with ${name.toLowerCase()} in the name across ${catList.length} categories.

## How ${name.toLowerCase()} is used in vapes
${pairing} Browse the whole range in our [shop](/shop/) or filter by category below.

## Where to find ${name.toLowerCase()}
${catList.map(([c, n]) => `- ${n} in [${CAT_NAME[c]}](/shop/${c}/)`).join("\n")}

## Brands that offer it
${topBrands.map(([b, n]) => `- ${b}: ${n} product${n === 1 ? "" : "s"}`).join("\n")}

## Example products
${picks.map((p) => `- [${clean(p.title)}](/shop/${p.category}/${p.slug}/): ${p.priceDisplay}`).join("\n")}

## Price range
${name} products in our catalog run from ${money(Math.min(...prices))} to ${money(Math.max(...prices))}. Compare value with [cost per puff](/blog/how-to-compare-vape-prices-per-puff/).

## Choosing the right device for ${name.toLowerCase()}
${catList[0][0] === "vape-juice" ? "Most " + name.toLowerCase() + " products here are e-liquids. Match the nicotine type and PG/VG ratio to your hardware; see [PG and VG ratios](/blog/pg-vg-ratio-explained/)." : catList[0][0] === "nixodine" ? "Most " + name.toLowerCase() + " products here are Nixodine devices. Read the label and see [what is Nixodine](/blog/what-is-nixodine/)." : "Most " + name.toLowerCase() + " products here are disposables. Compare puff count and battery type; see [how to choose a disposable](/blog/how-to-choose-a-disposable-vape/)."}

## Keeping the flavor fresh
Flavor fades with heat, light and a worn coil. Store products cool and dark, and rotate flavors if you notice taste fatigue; see [flavor fading fixes](/blog/vape-flavor-fading-fixes/).

## Before you buy
Check strength and size on each product page, and read our [flavor profiles guide](/blog/vape-flavor-profiles-explained/) if you are exploring. Adults 21+ only; nicotine is addictive.`;
    return {
      slug, category: "Flavor Guides", tags: ["flavor", slugify(name), ...catList.map(([c]) => c)],
      shop: catList.slice(0, 2).map(([c]) => c), keywords: keys,
      title: `${name} Vape Flavors: What to Expect and Where to Start`,
      summary: `Explore ${items.length} ${name.toLowerCase()} vape products from ${topBrands[0][0]} and more. Taste notes, pairings and example picks with prices.`.slice(0, 158),
      body,
      faq: [
        [`What does ${name.toLowerCase()} taste like in a vape?`, taste],
        [`How many ${name.toLowerCase()} products do you carry?`, `We list ${items.length} products with ${name.toLowerCase()} in the name across ${catList.map(([c]) => CAT_NAME[c]).join(", ")}. Availability changes, so check the category pages.`],
      ],
    };
  });
}
