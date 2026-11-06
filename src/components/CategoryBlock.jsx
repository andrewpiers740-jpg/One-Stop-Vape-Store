import React from "react";
import ProductCard from "@/src/components/ProductCard";
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
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-600">Collection</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 uppercase">{title}</h2>
        </div>
        <Link href={`/shop/${slug}`} className="text-slate-600 hover:text-emerald-600 font-bold uppercase tracking-widest text-xs flex items-center gap-2 transition-colors">
          View All {title} <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categoryProducts.map((prod) => (
          <ProductCard key={prod.slug} product={prod} />
        ))}
      </div>
    </section>
  );
}
