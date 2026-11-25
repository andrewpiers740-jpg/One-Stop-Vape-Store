// lib/catUrls.js — category URL slugs (= each category's primary keyword). Tiny on purpose: it is imported by client components.
import map from "@/src/data/cat-urls.json";
export const catUrl = (key) => map[key] || key;
export const productHref = (p) => `/shop/${catUrl(p.category || "all")}/${p.slug}/`;
