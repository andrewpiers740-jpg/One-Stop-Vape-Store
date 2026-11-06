// Offline pricing test: server price authority, discounts, free-shipping rule, tamper resistance.
import assert from "node:assert/strict";
const { priceOrder, resolvePaymentMethod } = await import("../lib/catalog.js");
const p = JSON.parse((await import("node:fs")).readFileSync("src/data/products.json", "utf8"));
const item = p.find((x) => x.price >= 20 && x.price < 30);
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
