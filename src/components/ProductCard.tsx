import React from "react";
import Link from "next/link";
import SmartImage from "@/src/components/SmartImage";
import StarRating from "@/src/components/StarRating";
import AddToCartButton from "@/src/components/AddToCartButton";
import { getVariantGroups } from "@/lib/variants";

type P = { slug: string; title: string; brand?: string; category: string; price: number; priceDisplay?: string; image: string; badge?: string; nicotine?: string; packSize?: string; rawPrice?: string; rating?: number; reviewsCount?: number };

// One tile for every product grid on the site: white image frame, brand, title, rating, price, and a working
// quantity stepper + "Add to cart" button. The links and the buy controls are siblings (no interactive nesting).
export default function ProductCard({ product: p, showBadge = true }: { product: P; showBadge?: boolean }) {
  const href = `/shop/${p.category}/${p.slug}/`;
  const hasOptions = getVariantGroups(p as any).length > 0;
  return (
    <article className="group flex h-full flex-col gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-3.5 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-lg">
      <Link href={href} aria-label={p.title} className="relative block aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <SmartImage src={p.image} alt={p.title} className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
        {showBadge && (
          <span className="absolute left-3 top-3 rounded-md border border-emerald-500/30 bg-white/90 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-emerald-700 backdrop-blur">
            {p.badge || "In stock"}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-1 px-1">
        <span className="truncate text-[10px] font-black uppercase tracking-widest text-slate-600">{p.brand}</span>
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-tight tracking-tight text-slate-900">
          <Link href={href} className="hover:text-emerald-600">{p.title}</Link>
        </h3>
        <StarRating rating={p.rating} reviewsCount={p.reviewsCount} size="xs" />
        <div className="mt-1 flex items-baseline justify-between gap-2">
          <p className="font-mono text-base font-bold tabular-nums text-emerald-700">{p.priceDisplay || `$${p.price.toFixed(2)}`}</p>
          {p.nicotine && <span className="rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[9px] text-slate-600">{p.nicotine}</span>}
        </div>
      </div>
      {hasOptions ? (
        <Link href={href} className="inline-flex h-9 items-center justify-center rounded-full bg-emerald-500 px-3 text-[11px] font-black uppercase tracking-wider text-white transition-colors hover:bg-emerald-600">Select options</Link>
      ) : (
        <AddToCartButton compact product={{ slug: p.slug, title: p.title, brand: p.brand, category: p.category, price: p.price, image: p.image }} />
      )}
    </article>
  );
}
