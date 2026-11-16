// lib/productSearch.js — shared by /api/products and /api/mcp (route files may not export helpers).
import { search } from "@/lib/search";
import { SITE } from "@/src/config/site";

export function searchProducts({ q = "", category = "", maxPrice = 0, limit = 24 }) {
  const r = search({ q, category: category && !category.includes("-") ? category : category, maxPrice });
  let list = r.products;
  if (category && !list.length) list = search({ q }).products.filter((p) => p.subcategory === category);
  const n = Math.max(1, Math.min(100, Number(limit) || 24));
  return {
    count: list.length,
    results: list.slice(0, n).map((p) => ({
      slug: p.slug, title: p.title, brand: p.brand, category: p.category, price: p.price, currency: SITE.contact.currency.code,
      inStock: p.inStock !== false, url: `https://${SITE.domain}/shop/${p.category}/${p.slug}/`, image: `https://${SITE.domain}${p.image}`,
    })),
  };
}
