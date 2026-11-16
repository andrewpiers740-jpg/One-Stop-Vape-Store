import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductCard from "@/src/components/ProductCard";
import PageBanner from "@/src/components/PageBanner";
import { CATEGORIES, SITE } from "@/src/config/site";
import productsData from "@/src/data/products.json";

// Filtered product lists opened from the navigation dropdowns:
//   /browse/?category=disposables&brand=Foger&q=switch+pro&sub=...&strength=none|has&sort=price-asc&page=2
// "q": every word must appear in the title; commas mean "any of these".
// Filtered lists are not indexed — the category pages are the canonical, indexable collections.
export const metadata = {
  title: `Shop by brand, flavor and type | ${SITE.name}`,
  robots: { index: false, follow: true },
};

type P = { slug: string; title: string; brand: string; category: string; subcategory: string; price: number; image: string; badge?: string; nicotine?: string; rating?: number; reviewsCount?: number };
const PER_PAGE = 48;
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || "";

const SORTS: Record<string, string> = { "": "Featured", "price-asc": "Price: low to high", "price-desc": "Price: high to low", name: "Name A–Z" };

export default async function BrowsePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const category = one(sp.category);
  const brands = one(sp.brand).split(",").map((b) => norm(b)).filter(Boolean);
  const sub = one(sp.sub);
  const q = one(sp.q);
  const strength = one(sp.strength);
  const sort = SORTS[one(sp.sort)] ? one(sp.sort) : "";
  const page = Math.max(1, parseInt(one(sp.page), 10) || 1);

  const alts = q.split(",").map((a) => a.toLowerCase().split(/\s+/).filter(Boolean)).filter((w) => w.length);
  const cat = CATEGORIES.find((c) => c.slug === category);

  let list = (productsData as P[]).filter((p) => {
    if (category && p.category !== category) return false;
    if (brands.length && !brands.includes(norm(p.brand))) return false;
    if (sub && p.subcategory !== sub) return false;
    if (alts.length) {
      const t = p.title.toLowerCase();
      if (!alts.some((words) => words.every((w) => t.includes(w)))) return false;
    }
    if (strength) {
      const free = /^0\s*mg/i.test(p.nicotine || "") || p.subcategory === "zero-nicotine" || /nicotine[- ]free|zero nicotine/i.test(p.title);
      if (strength === "none" && !free) return false;
      if (strength === "has" && free) return false;
    }
    return true;
  });
  if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
  if (sort === "name") list = [...list].sort((a, b) => a.title.localeCompare(b.title));

  const total = list.length;
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));
  const cur = Math.min(page, pages);
  const shown = list.slice((cur - 1) * PER_PAGE, cur * PER_PAGE);

  // human-readable title from the active filters
  const brandLabel = brands.length ? (productsData as P[]).find((p) => brands.includes(norm(p.brand)))?.brand : "";
  const parts = [brandLabel, q && !q.includes(",") ? q.replace(/\b\w/g, (c) => c.toUpperCase()) : "", strength === "none" ? "Nicotine Free" : strength === "has" ? "With Nicotine" : ""].filter(Boolean);
  const heading = (parts.length ? parts.join(" · ") + " " : "") + (cat ? cat.name : "Products");

  const qs = (extra: Record<string, string>) => {
    const base: Record<string, string> = {};
    for (const [k, v] of Object.entries(sp)) {
      const val = one(v);
      if (val && k !== "page") base[k] = val;
    }
    const merged = { ...base, ...extra };
    Object.keys(merged).forEach((k) => !merged[k] && delete merged[k]);
    return "/browse/?" + new URLSearchParams(merged).toString();
  };

  return (
    <>
      <PageBanner slug={category || "shop"} label={cat?.name || "Shop"} />
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-4 py-10 text-slate-900 sm:px-6">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
          <Link href="/" className="hover:text-emerald-600">Home</Link>
          <ChevronRight size={10} aria-hidden="true" />
          <Link href="/shop/" className="hover:text-emerald-600">Shop</Link>
          {cat && (<><ChevronRight size={10} aria-hidden="true" /><Link href={`/shop/${cat.slug}/`} className="hover:text-emerald-600">{cat.name}</Link></>)}
        </nav>

        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-black uppercase leading-none tracking-tighter sm:text-5xl">{heading}</h1>
          <p className="text-sm text-slate-600">{total} {total === 1 ? "product" : "products"}{cat ? <> in <Link href={`/shop/${cat.slug}/`} className="font-bold text-emerald-700 underline">{cat.name}</Link></> : null}.</p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Sort</span>
            {Object.entries(SORTS).map(([k, label]) => (
              <Link key={k || "featured"} href={qs({ sort: k })} aria-current={sort === k} className={`rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider ${sort === k ? "border-emerald-500 bg-emerald-500/10 text-emerald-700" : "border-slate-200 bg-slate-100 text-slate-600 hover:border-emerald-500"}`}>{label}</Link>
            ))}
          </div>
        </div>

        {shown.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center">
            <p className="mb-5 text-slate-600">No products match this selection.</p>
            <Link href={cat ? `/shop/${cat.slug}/` : "/shop/"} className="inline-block rounded-full bg-emerald-500 px-8 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-emerald-400">Browse {cat ? cat.name : "all products"}</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4 xl:gap-6">
            {shown.map((p) => <ProductCard key={p.slug} product={p as any} />)}
          </div>
        )}

        {pages > 1 && (
          <nav aria-label="Pages" className="flex flex-wrap items-center justify-center gap-2 border-t border-slate-200 pt-8">
            {cur > 1 && <Link href={qs({ page: String(cur - 1) })} className="rounded-full border border-slate-300 px-4 py-2 text-xs font-bold uppercase tracking-wider hover:border-emerald-500">Previous</Link>}
            <span className="px-3 text-xs font-mono text-slate-600">Page {cur} of {pages}</span>
            {cur < pages && <Link href={qs({ page: String(cur + 1) })} className="rounded-full border border-slate-300 px-4 py-2 text-xs font-bold uppercase tracking-wider hover:border-emerald-500">Next</Link>}
          </nav>
        )}
      </div>
    </>
  );
}
