import React from "react";
import Link from "next/link";
import ProductCard from "@/src/components/ProductCard";
import PageBanner from "@/src/components/PageBanner";
import SearchBox from "@/src/components/SearchBox";
import { CATEGORIES, SITE } from "@/src/config/site";
import { search } from "@/lib/search";
import { brands, brandHref } from "@/lib/collections";

// Search results. Search pages are not indexed (the category, collection and brand pages are the indexable ones).
export const metadata = { title: `Search | ${SITE.name}`, robots: { index: false, follow: true } };

const PER_PAGE = 48;
const SORTS: Record<string, string> = { relevance: "Best match", "price-asc": "Price: low to high", "price-desc": "Price: high to low", name: "Name A–Z" };
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || "";
const POPULAR = ["Geek Bar Pulse", "Lost Mary", "Foger Switch Pro", "blue razz", "nicotine free", "ZYN 6mg", "mango ice", "pod juice", "menthol", "5 pack"];

export default async function SearchPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const q = one(sp.q).trim().slice(0, 80);
  const category = one(sp.category);
  const brand = one(sp.brand);
  const strength = one(sp.strength);
  const sort = SORTS[one(sp.sort)] ? one(sp.sort) : "relevance";
  const page = Math.max(1, parseInt(one(sp.page), 10) || 1);

  const r = q ? search({ q, category, brand, strength, sort }) : null;
  const pages = r ? Math.max(1, Math.ceil(r.total / PER_PAGE)) : 1;
  const cur = Math.min(page, pages);
  const shown = r ? r.products.slice((cur - 1) * PER_PAGE, cur * PER_PAGE) : [];

  const href = (extra: Record<string, string>) => {
    const m: Record<string, string> = { q, category, brand, strength, sort: sort === "relevance" ? "" : sort, ...extra };
    Object.keys(m).forEach((k) => !m[k] && delete m[k]);
    return "/search/?" + new URLSearchParams(m).toString();
  };
  const chip = (active: boolean) => `inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors ${active ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-500 hover:text-emerald-700"}`;

  return (
    <>
      <PageBanner slug="search" label="Search" />
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-4 py-10 text-slate-900 sm:px-6 md:py-14">
        <div className="flex max-w-3xl flex-col gap-4">
          <h1 className="text-3xl font-black uppercase leading-none tracking-tighter sm:text-5xl">{q ? <>Results for &ldquo;{q}&rdquo;</> : "Search the catalog"}</h1>
          <SearchBox variant="page" initial={q} autoFocus={!q} />
          <p className="text-xs text-slate-600">Search by product name, brand, category, sub-category, flavor or nicotine strength, for example “geek bar blue razz”, “zyn 6mg” or “nicotine free disposable”.</p>
        </div>

        {r ? (
          <>
            <div className="flex flex-col gap-4 border-y border-slate-200 py-5">
              <p className="text-sm font-bold text-slate-700" role="status">
                {r.total.toLocaleString()} {r.total === 1 ? "result" : "results"}{r.partial && r.total > 0 ? " (closest matches — not every word was found)" : ""}
                {pages > 1 && <span className="font-mono text-xs text-slate-500"> · page {cur} of {pages}</span>}
              </p>
              {r.facets.categories.length > 1 && (
                <div className="flex flex-wrap items-center gap-2"><span className="w-20 text-[10px] font-black uppercase tracking-widest text-slate-500">Category</span>
                  <Link href={href({ category: "" })} className={chip(!category)}>All</Link>
                  {r.facets.categories.map((c) => <Link key={c.slug} href={href({ category: category === c.slug ? "" : c.slug })} aria-current={category === c.slug} className={chip(category === c.slug)}>{c.label} <span className="font-mono text-[10px] opacity-70">{c.count}</span></Link>)}
                </div>
              )}
              {r.facets.brands.length > 1 && (
                <div className="flex flex-wrap items-center gap-2"><span className="w-20 text-[10px] font-black uppercase tracking-widest text-slate-500">Brand</span>
                  {r.facets.brands.map((b) => <Link key={b.label} href={href({ brand: brand === b.label ? "" : b.label })} aria-current={brand === b.label} className={chip(brand === b.label)}>{b.label} <span className="font-mono text-[10px] opacity-70">{b.count}</span></Link>)}
                </div>
              )}
              <div className="flex flex-wrap items-center gap-2"><span className="w-20 text-[10px] font-black uppercase tracking-widest text-slate-500">Strength</span>
                {r.facets.strengths.map((s) => <Link key={s.slug} href={href({ strength: strength === s.slug ? "" : s.slug })} aria-current={strength === s.slug} className={chip(strength === s.slug)}>{s.label} <span className="font-mono text-[10px] opacity-70">{s.count}</span></Link>)}
              </div>
              <div className="flex flex-wrap items-center gap-2"><span className="w-20 text-[10px] font-black uppercase tracking-widest text-slate-500">Sort</span>
                {Object.entries(SORTS).map(([k, label]) => <Link key={k} href={href({ sort: k === "relevance" ? "" : k })} aria-current={sort === k} className={chip(sort === k)}>{label}</Link>)}
              </div>
            </div>

            {shown.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-6">
                {shown.map((p: any) => <ProductCard key={p.slug} product={p} />)}
              </div>
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center">
                <p className="mb-2 text-lg font-black">No products found for &ldquo;{q}&rdquo;</p>
                <p className="mb-6 text-sm text-slate-600">Check the spelling, try fewer words, or browse a category.</p>
                <div className="flex flex-wrap justify-center gap-2">{CATEGORIES.map((c) => <Link key={c.slug} href={`/shop/${c.slug}/`} className={chip(false)}>{c.name}</Link>)}</div>
              </div>
            )}

            {pages > 1 && (
              <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-2 border-t border-slate-200 pt-8">
                {cur > 1 && <Link rel="prev" href={href({ page: String(cur - 1) })} className="rounded-full border border-slate-300 px-4 py-2 text-xs font-bold hover:border-emerald-500">Previous</Link>}
                <span className="px-3 font-mono text-xs text-slate-600">Page {cur} of {pages}</span>
                {cur < pages && <Link rel="next" href={href({ page: String(cur + 1) })} className="rounded-full border border-slate-300 px-4 py-2 text-xs font-bold hover:border-emerald-500">Next</Link>}
              </nav>
            )}
          </>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="mb-4 text-xs font-black uppercase tracking-widest text-slate-600">Popular searches</h2>
              <div className="flex flex-wrap gap-2">{POPULAR.map((t) => <Link key={t} href={`/search/?q=${encodeURIComponent(t)}`} className={chip(false)}>{t}</Link>)}</div>
            </section>
            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="mb-4 text-xs font-black uppercase tracking-widest text-slate-600">Top brands</h2>
              <div className="flex flex-wrap gap-2">{brands.slice(0, 10).map((b) => <Link key={b.slug} href={brandHref(b.slug)} className={chip(false)}>{b.label}</Link>)}</div>
            </section>
            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="mb-4 text-xs font-black uppercase tracking-widest text-slate-600">Categories</h2>
              <div className="flex flex-wrap gap-2">{CATEGORIES.map((c) => <Link key={c.slug} href={`/shop/${c.slug}/`} className={chip(false)}>{c.name}</Link>)}</div>
            </section>
          </div>
        )}
      </div>
    </>
  );
}
