import React from "react";
import Link from "next/link";
import products from "@/src/data/products.json";
import SmartImage from "@/src/components/SmartImage";
import StarRating from "@/src/components/StarRating";
import { ArrowRight } from "lucide-react";

export default function CategoryBlock({ title, slug, categoryKey, categoryValue }) {
  const categoryProducts = (products || [])
    .filter(p => p[categoryKey] === categoryValue)
    .slice(0, 8);

  if (categoryProducts.length === 0) return null;

  return (
    <section className="max-w-[1440px] mx-auto px-6 w-full py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-500">Collection</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase">{title}</h2>
        </div>
        <Link href={`/shop/${slug}`} className="text-zinc-400 hover:text-emerald-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2 transition-colors">
          View All {title} <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {categoryProducts.map((prod) => (
          <Link 
            key={prod.slug} 
            href={`/shop/${prod.category}/${prod.slug}/`} 
            className="group flex flex-col gap-2.5"
          >
            {/* Pure white background card */}
            <div className="aspect-square rounded-2xl bg-white border border-zinc-200/80 flex items-center justify-center p-3 overflow-hidden relative shadow-sm group-hover:shadow-lg transition-all duration-300">
              <SmartImage src={prod.image} alt={prod.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest truncate">{prod.brand}</span>
              <h3 className="text-xs font-bold text-white tracking-tight leading-tight group-hover:text-emerald-400 transition-colors line-clamp-1">{prod.title}</h3>
              <StarRating rating={prod.rating || 5.0} reviewsCount={prod.reviewsCount || 42} size="xs" />
              <p className="text-emerald-400 font-mono text-xs font-bold tabular-nums tracking-tight mt-0.5">{prod.priceDisplay}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
