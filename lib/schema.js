// lib/schema.js — shared schema.org building blocks (return policy, shipping, offers) used by the Organization and Product JSON-LD.
import { SITE } from "@/src/config/site";
import { getVariantGroups, resolveVariant } from "@/lib/variants";

const base = `https://${SITE.domain}`;

export const merchantReturnPolicy = () => ({
  "@type": "MerchantReturnPolicy",
  applicableCountry: "US",
  returnPolicyCountry: "US",
  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
  merchantReturnDays: 30,
  returnMethod: "https://schema.org/ReturnByMail",
  returnFees: "https://schema.org/RestockingFees",
  restockingFee: 15,
  refundType: "https://schema.org/FullRefund",
  merchantReturnLink: `${base}/refunds/`,
});

export const shippingDetails = () => ({
  "@type": "OfferShippingDetails",
  shippingDestination: { "@type": "DefinedRegion", addressCountry: "US" },
  shippingRate: { "@type": "MonetaryAmount", value: SITE.order.flatShippingFee, currency: SITE.contact.currency.code },
  deliveryTime: {
    "@type": "ShippingDeliveryTime",
    handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 3, unitCode: "DAY" },
    transitTime: { "@type": "QuantitativeValue", minValue: 2, maxValue: 7, unitCode: "DAY" },
  },
});

// One Offer per purchasable option (pack size) or a single Offer when the product has none.
export function productOffers(p) {
  const url = `${base}/shop/${p.category}/${p.slug}/`;
  const common = {
    "@type": "Offer",
    url,
    priceCurrency: SITE.contact.currency.code,
    availability: p.inStock === false ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
    seller: { "@type": "Organization", name: SITE.legalName },
    hasMerchantReturnPolicy: merchantReturnPolicy(),
    shippingDetails: shippingDetails(),
  };
  const packs = getVariantGroups(p).find((g) => g.id === "pack");
  if (!packs) return { ...common, price: String(p.price) };
  return packs.options.map((o) => {
    const v = resolveVariant(p, { pack: o.value });
    return { ...common, name: `${p.title} — ${o.label}`, price: String(v.price) };
  });
}
