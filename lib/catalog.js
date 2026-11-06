// lib/catalog.js — server-side price authority. The browser only ever sends slugs + quantities.
import products from "@/src/data/products.json";
import { SITE } from "@/src/config/site";
import { getNetwork, getToken } from "@/src/config/wallets";
import { getGiftCard } from "@/src/config/giftcards";

const bySlug = new Map(products.map((p) => [p.slug, p]));

export function getProduct(slug) {
  return bySlug.get(slug) || null;
}

export const PAYMENT_METHODS = {
  cashapp: { id: "cashapp", label: "Cash App", discount: 0 },
  applepay: { id: "applepay", label: "Apple Pay", discount: 0 },
  chime: { id: "chime", label: "Chime", discount: 0 },
};

// "crypto-USDT", "giftcard-apple", "cashapp", "applepay", "chime" -> descriptor or null
export function resolvePaymentMethod(method, extra = {}) {
  if (typeof method !== "string") return null;
  if (PAYMENT_METHODS[method]) return { ...PAYMENT_METHODS[method], kind: method };
  if (method.startsWith("crypto-")) {
    const symbol = method.slice(7);
    const token = getToken(symbol);
    const network = token ? getNetwork(symbol, extra.cryptoNetwork) : null;
    if (!token || !network) return null;
    return { id: method, kind: "crypto", label: `Crypto (${symbol} – ${network.label})`, discount: SITE.order.cryptoDiscount, token, network };
  }
  if (method.startsWith("giftcard-")) {
    const card = getGiftCard(method.slice(9));
    if (!card) return null;
    return { id: method, kind: "giftcard", label: `Gift Card (${card.name})`, discount: SITE.order.giftCardDiscount, card };
  }
  return null;
}

const round2 = (n) => Math.round(n * 100) / 100;

// Recalculates everything from the catalogue. Returns { ok, error?, lines, subtotal, discount, shipping, total }.
export function priceOrder(rawItems, discountPercent) {
  if (!Array.isArray(rawItems) || rawItems.length === 0 || rawItems.length > 60) return { ok: false, error: "Your cart is empty." };
  const lines = [];
  for (const it of rawItems) {
    const p = getProduct(String(it?.slug || ""));
    const qty = Math.floor(Number(it?.qty));
    if (!p) return { ok: false, error: "A product in your cart is no longer available." };
    if (!Number.isFinite(qty) || qty < 1 || qty > 99) return { ok: false, error: "Invalid quantity." };
    if (p.inStock === false) return { ok: false, error: `${p.title} is out of stock.` };
    lines.push({ slug: p.slug, title: p.title, brand: p.brand, category: p.category, price: p.price, qty, image: p.image, lineTotal: round2(p.price * qty) });
  }
  const subtotal = round2(lines.reduce((s, l) => s + l.lineTotal, 0));
  if (subtotal < SITE.order.minOrder) return { ok: false, error: `The minimum order is $${SITE.order.minOrder}.` };
  const discount = round2((subtotal * (discountPercent || 0)) / 100);
  const afterDiscount = round2(subtotal - discount);
  // Policy (see /shipping/): free shipping on orders of $200+ AFTER discount, before tax.
  const shipping = afterDiscount >= SITE.order.freeShippingThreshold ? 0 : SITE.order.flatShippingFee;
  return { ok: true, lines, subtotal, discount, shipping, total: round2(afterDiscount + shipping) };
}
