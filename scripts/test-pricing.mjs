// Offline pricing test: server price authority, discounts, free-shipping rule, tamper resistance.
import assert from "node:assert/strict";
const { priceOrder, resolvePaymentMethod } = await import("../lib/catalog.js");
const p = JSON.parse((await import("node:fs")).readFileSync("src/data/products.json", "utf8"));
const item = p.find((x) => x.price >= 24.69 && x.price < 27.78); // ~$25: 9 units clear $200 after a 10% discount, 8 do not
const q = (n, m = 0) => priceOrder([{ slug: item.slug, qty: n, price: 0.01 }], m);
assert.equal(q(1).ok, false, "below minimum rejected");
const a = q(5); // 5 x ~25 = ~125 -> under 200 -> shipping 15
assert.ok(a.ok && a.shipping === 15 && Math.abs(a.total - (a.subtotal + 15)) < 0.01);
const b = q(9, 10); // ~225 subtotal, 10% off -> ~202.5 after discount -> free shipping
assert.ok(b.ok && b.shipping === 0, `free shipping after discount: ${JSON.stringify(b)}`);
const c = q(8, 10); // ~200 subtotal, 10% off -> ~180 -> NOT free (policy is after discount)
assert.ok(c.ok && c.shipping === 15, `not free when discounted below 200: ${JSON.stringify(c)}`);
assert.equal(priceOrder([{ slug: "nope", qty: 1 }], 0).ok, false);
assert.equal(priceOrder([{ slug: item.slug, qty: -3 }], 0).ok, false);
assert.equal(priceOrder([{ slug: item.slug, qty: 2.5e9 }], 0).ok, false);
assert.equal(resolvePaymentMethod("crypto-DOGE"), null);
assert.equal(resolvePaymentMethod("crypto-USDT", { cryptoNetwork: "bsc" }), null, "network must belong to the token");
assert.equal(resolvePaymentMethod("giftcard-apple").discount, 10);
assert.equal(resolvePaymentMethod("giftcard-bogus"), null);
assert.equal(resolvePaymentMethod("cashapp").discount, 0);
console.log("pricing: all assertions passed (item $" + item.price + ")");

// --- variants: price + label come from the server catalogue, never from the browser ---
{
  const { getVariantGroups } = await import("../lib/variants.js");
  const vp = p.find((x) => /,/.test(x.nicotine || "") && /,/.test(x.packSize || "") && / - /.test(x.rawPrice));
  const groups = getVariantGroups(vp);
  assert.ok(groups.length === 2, "strength + pack groups present");
  const [lo, hi] = [...vp.rawPrice.matchAll(/\$([\d.]+)/g)].map((m) => parseFloat(m[1]));
  const packs = groups.find((g) => g.id === "pack").options;
  const strengths = groups.find((g) => g.id === "strength").options;
  const one = (variant, qty) => priceOrder([{ slug: vp.slug, qty, variant, price: 0.01 }], 0);
  const big = one({ strength: strengths[strengths.length - 1].value, pack: packs[packs.length - 1].value }, Math.ceil(100 / hi) + 1);
  assert.ok(big.ok && big.lines[0].price === hi, `last pack priced at the range top: ${JSON.stringify(big)}`);
  assert.ok(big.lines[0].title.includes(strengths[strengths.length - 1].value), "title carries the chosen strength");
  const small = one({ strength: strengths[0].value, pack: packs[0].value }, Math.ceil(100 / lo) + 1);
  assert.ok(small.ok && small.lines[0].price === lo, "first pack priced at the range bottom");
  assert.equal(one({ strength: "99mg" }, 20).ok, false, "unknown strength rejected");
  const none = one(undefined, Math.ceil(100 / lo) + 1);
  assert.ok(none.ok && none.lines[0].variant.strength === strengths[0].value, "missing variant defaults to the first option");
}
console.log("variant pricing OK");
