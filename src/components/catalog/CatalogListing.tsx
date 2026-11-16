import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductCard from "@/src/components/ProductCard";
import PageBanner from "@/src/components/PageBanner";
import FilterDrawer from "@/src/components/catalog/FilterDrawer";
import FilterSidebar, { FacetGroup } from "@/src/components/catalog/FilterSidebar";
import Pagination from "@/src/components/catalog/Pagination";
import { SITE } from "@/src/config/site";

export type Crumb = { label: string; href?: string };

// One layout for every shop listing: breadcrumbs, heading + intro, filter sidebar, product grid, pagination, JSON-LD.
export default function CatalogListing({
  bannerSlug, bannerLabel, crumbs, h1, intro, total, products, base, first, page, pages, groups, current, clearHref, chips = [], path,
}: {
  bannerSlug: string; bannerLabel: string; crumbs: Crumb[]; h1: string; intro: string; total: number; products: any[];
  base: string; first?: string; page: number; pages: number; groups: FacetGroup[]; current: string; clearHref?: string; chips?: Crumb[]; path: string;
}) {
  const url = `https://${SITE.domain}${path}`;
  const ld = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, ...(c.href ? { item: `https://${SITE.domain}${c.href}` } : {}) })) },
    { "@context": "https://schema.org", "@type": "CollectionPage", name: h1, url, description: intro, mainEntity: { "@type": "ItemList", numberOfItems: total, itemListElement: products.slice(0, 24).map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `https://${SITE.domain}/shop/${p.category}/${p.slug}/`, name: p.title })) } },
  ];
  return (
    <>
      <PageBanner slug={bannerSlug} label={bannerLabel} />
      {ld.map((o, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(o) }} />)}
      <div className="mx-auto max-w-[1440px] px-4 py-8 text-slate-900 sm:px-6 md:py-12">
        <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
          {crumbs.map((c, i) => (
            <React.Fragment key={c.label + i}>
              {i > 0 && <ChevronRight size={10} aria-hidden="true" />}
              {c.href && i < crumbs.length - 1 ? <Link href={c.href} className="hover:text-emerald-600">{c.label}</Link> : <span className="text-emerald-700">{c.label}</span>}
            </React.Fragment>
          ))}
        </nav>

        <header className="mb-6 flex flex-col gap-3 border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-black uppercase leading-none tracking-tighter sm:text-5xl lg:text-6xl">{h1}</h1>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">{intro}</p>
          {chips.length > 0 && (
            <ul className="flex flex-wrap gap-2 pt-1" aria-label="Related">
              {chips.map((c) => <li key={c.href}><Link href={c.href!} className="inline-block rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:border-emerald-500 hover:text-emerald-700">{c.label}</Link></li>)}
            </ul>
          )}
        </header>

        <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
          <FilterDrawer>
            <FilterSidebar groups={groups} current={current} clearHref={clearHref} />
          </FilterDrawer>

          <main className="min-w-0 flex-1">
            <p className="mb-4 text-xs font-mono text-slate-600">
              <span className="font-bold text-emerald-700">{total.toLocaleString()} {total === 1 ? "product" : "products"}</span>
              {pages > 1 && <> · page {page} of {pages}</>}
            </p>
            {products.length === 0 ? (
              <p className="py-20 text-center text-slate-600">No products found here yet.</p>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 2xl:grid-cols-4 xl:gap-6">
                {products.map((p) => <ProductCard key={p.slug} product={p} />)}
              </div>
            )}
            <div className="mt-10"><Pagination base={base} first={first} page={page} pages={pages} /></div>
          </main>
        </div>
      </div>
    </>
  );
}
