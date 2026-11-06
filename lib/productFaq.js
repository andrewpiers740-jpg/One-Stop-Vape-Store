// lib/productFaq.js — a factual 10-question FAQ for any product, built only from catalogue data and published store policy.
// AI-written FAQs (src/data/product-descriptions.json) replace it when present.
import { SITE } from "@/src/config/site";
import { getVariantGroups } from "@/lib/variants";

const CAT = { "vape-juice": "e-liquid", "coils-pods": "coil or pod", disposables: "disposable vape", "vape-kits": "vape kit", vaporizers: "vaporizer", "nic-pouches": "nicotine pouch", nixodine: "Nixodine product" };

export function productFaq(p) {
  const g = getVariantGroups(p);
  const strength = g.find((x) => x.id === "strength");
  const pack = g.find((x) => x.id === "pack");
  const kind = CAT[p.category] || "vape product";
  const o = SITE.order;
  const opts = [
    strength && `strengths ${strength.options.map((x) => x.label).join(", ")}`,
    pack && `pack sizes ${pack.options.map((x) => `${x.label} ($${x.price.toFixed(2)})`).join(", ")}`,
  ].filter(Boolean);
  const phone = SITE.contact.phone;
  const first = p.description ? p.description.split(/(?<=[.!?])\s/)[0] : "";
  return [
    { q: `What is ${p.title}?`, a: `${p.title} is a ${kind} from ${p.brand}, available from ${SITE.name} for adults aged ${SITE.compliance.ageThreshold}+. ${first}`.trim() },
    { q: "Which strengths and sizes can I choose?", a: opts.length ? `This product comes in ${opts.join(" and ")}. Pick your options above the Add to Cart button and the price updates to match.` : `This listing is a single option${p.nicotine ? ` with a nicotine strength of ${p.nicotine}` : ""}. If you need a different size or strength, check the related products below or contact us.` },
    { q: "What nicotine strength does it have?", a: p.nicotine ? `The listed strength is ${p.nicotine}. Nicotine is addictive; products are for adult use only.` : "Strength is shown in the specifications on this page when the manufacturer lists it. Message us if you need to confirm it before ordering." },
    { q: "How much does it cost?", a: `The price shown on the page updates for the options you choose, starting from ${p.priceDisplay}. Orders of $${o.freeShippingThreshold} or more after discounts ship free; otherwise shipping is a flat $${o.flatShippingFee}. The minimum order is $${o.minOrder}.` },
    { q: "How quickly will my order ship?", a: "Orders are processed within 24–72 business hours from our Stock Warehouse in Phoenix, Arizona. You receive a tracking email as soon as your parcel is on its way. See our Shipping Policy for carrier timings." },
    { q: "Do I need to be 21 or older to buy this?", a: `Yes. You must confirm you are ${SITE.compliance.ageThreshold}+ on entering the store and at checkout, and an adult must provide a signature on delivery under the PACT Act.` },
    { q: "What payment methods do you accept?", a: "We accept Cash App, Apple Pay, Chime, cryptocurrency (BTC, USDT, USDC, ETH, BNB, SOL) and gift cards (Apple, Razer, Paysafe, Sephora, Macy's). Payment details are sent as soon as you place your order." },
    { q: "Is there a discount for paying with crypto or gift cards?", a: `Yes. Paying with cryptocurrency saves ${o.cryptoDiscount}% and paying with a supported gift card saves ${o.giftCardDiscount}% on your order total.` },
    { q: "Can I return or exchange it?", a: "Contact us within 30 days of purchase to arrange a return or exchange. Opened or used e-liquid and devices cannot be returned, and a 15% restocking fee applies to refunds, which are returned through the payment method you originally paid with. Damaged or incorrect items are handled quickly if you send photos and your order number." },
    { q: "Do you offer bulk or wholesale pricing?", a: `Yes. Retailers can request wholesale pricing on our Wholesale page, or call ${phone} or message us on WhatsApp for help with larger orders.` },
  ];
}
