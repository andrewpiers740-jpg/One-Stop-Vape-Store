import React from "react";
import Link from "next/link";
import PageBanner from "@/src/components/PageBanner";
import { SITE } from "@/src/config/site";
import { brands, brandHref } from "@/lib/collections";
import { withSocial } from "@/lib/social";

const pageMeta = {
  title: `Vape Brands A–Z: Geek Bar, Lost Mary, Foger and more | ${SITE.name}`,
  description: `Browse all ${brands.length} vape, nixodine and nicotine pouch brands at ${SITE.name}. One page per brand with every product, price and variation. Adults 21+ only.`,
  alternates: { canonical: `https://${SITE.domain}/brands/` },
};
export const metadata = withSocial(pageMeta);

export default function BrandsPage() {
  const groups: Record<string, typeof brands> = {};
  [...brands].sort((a, b) => a.label.localeCompare(b.label)).forEach((b) => { const k = /^[a-z]/i.test(b.label) ? b.label[0].toUpperCase() : "#"; (groups[k] = groups[k] || []).push(b); });
  const letters = Object.keys(groups).sort();
  const top = brands.slice(0, 12);
  const ld = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `https://${SITE.domain}/` }, { "@type": "ListItem", position: 2, name: "Brands" }] };
  return (
    <>
      <PageBanner slug="shop" label="Brands" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="mx-auto max-w-[1440px] px-4 py-10 text-slate-900 sm:px-6 md:py-14">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600"><Link href="/" className="hover:text-emerald-600">Home</Link><span>/</span><span className="text-emerald-700">Brands</span></nav>
        <h1 className="text-3xl font-black uppercase leading-none tracking-tighter sm:text-5xl">Shop by brand</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">{brands.length} brands across disposable vapes, vape juice, kits, vaporizers, nicotine pouches and nixodine. Each brand page lists every product with its Single and pack prices.</p>

        <section aria-labelledby="top-brands" className="mt-8">
          <h2 id="top-brands" className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-slate-600">Most popular</h2>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {top.map((b) => (
              <li key={b.slug}><Link href={brandHref(b.slug)} className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:border-emerald-500 hover:shadow-md"><span className="text-sm font-black">{b.label}</span><span className="mt-2 text-[11px] font-mono text-slate-600">{b.count} products</span></Link></li>
            ))}
          </ul>
        </section>

        <nav aria-label="Jump to letter" className="mt-10 flex flex-wrap gap-1.5">
          {letters.map((l) => <a key={l} href={`#letter-${l}`} className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-xs font-black hover:border-emerald-500 hover:text-emerald-700">{l}</a>)}
        </nav>
        <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {letters.map((l) => (
            <section key={l} id={`letter-${l}`} className="scroll-mt-32">
              <h2 className="mb-2 border-b border-slate-200 pb-1 text-2xl font-black text-emerald-700">{l}</h2>
              <ul className="flex flex-col">
                {groups[l].map((b) => (
                  <li key={b.slug}><Link href={brandHref(b.slug)} className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm font-semibold hover:bg-emerald-50 hover:text-emerald-700"><span>{b.label}</span><span className="font-mono text-[11px] text-slate-500">{b.count}</span></Link></li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
