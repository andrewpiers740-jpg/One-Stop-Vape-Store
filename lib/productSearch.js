// lib/productSearch.js — shared by /api/products and /api/mcp (route files may not export helpers).
import products from "@/src/data/products.json";
import { SITE } from "@/src/config/site";

export function searchProducts({ q = "", category = "", maxPrice = 0, limit = 24 }) {
  const needle = String(q || "").toLowerCase().trim();
  let list = products;
  if (needle) list = list.filter((p) => `${p.title} ${p.brand}`.toLowerCase().includes(needle));
  if (category) list = list.filter((p) => p.category === category || p.subcategory === category);
  if (maxPrice > 0) list = list.filter((p) => p.price <= maxPrice);
  const n = Math.max(1, Math.min(100, Number(limit) || 24));
  return {
    count: list.length,
    results: list.slice(0, n).map((p) => ({
      slug: p.slug, title: p.title, brand: p.brand, category: p.category, price: p.price, currency: SITE.contact.currency.code,
      inStock: p.inStock !== false, url: `https://${SITE.domain}/shop/${p.category}/${p.slug}/`, image: `https://${SITE.domain}${p.image}`,
    })),
  };
}
