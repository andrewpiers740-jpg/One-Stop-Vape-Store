import React from "react";
import Link from "next/link";
import { CATEGORIES } from "@/src/config/site";
import products from "@/src/data/products.json";
import SmartImage from "@/src/components/SmartImage";
import StarRating from "@/src/components/StarRating";

export const metadata = {
  title: "Shop All Vapes | One Stop Vape Store",
  description: "Browse our complete catalog of 2,500+ premium disposable vapes, nixodine innovations, pod systems, and nicotine salts. Fast US shipping from Phoenix, AZ.",
};

export default function ShopPage() {
  const displayProducts = (products as any[]).slice(0, 48);

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-12 flex flex-col gap-12 text-white">
      
      <div className="flex flex-col gap-4">
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-600">
          <Link href="/" className="hover:text-emerald-500 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-zinc-400">Shop All</span>
        </nav>
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white uppercase">The Catalog</h1>
        <p className="text-zinc-400 text-sm">Showing verified authentic inventory across all collections ({products.length} products total).</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-8 sticky top-24">
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-white border-b border-zinc-800 pb-2">Collections</h3>
            <ul className="flex flex-col gap-2">
              {CATEGORIES.map((cat: any) => (
                <li key={cat.slug}>
                  <Link href={`/shop/${cat.slug}/`} className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors flex items-center justify-between group py-1">
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-zinc-500 group-hover:text-emerald-400 transition-colors font-mono font-bold">
                      {(products as any[]).filter((p: any) => p.category === cat.slug).length}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-white border-b border-zinc-800 pb-2">Sort Options</h3>
            <div className="flex flex-wrap gap-2">
              {["Featured", "Price: Low to High", "Price: High to Low", "Newest", "Top Rated"].map((sort: string) => (
                <button key={sort} className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px] font-bold uppercase tracking-wider text-zinc-400 hover:border-emerald-500 hover:text-white transition-all">
                  {sort}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow flex flex-col gap-12">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayProducts.map((prod: any) => (
              <Link 
                key={prod.slug} 
                href={`/shop/${prod.category}/${prod.slug}/`} 
                className="group flex flex-col gap-3 p-3.5 rounded-3xl bg-zinc-900/30 border border-zinc-800/80 hover:border-emerald-500/40 transition-all duration-300"
              >
                {/* Pure white background card */}
                <div className="aspect-square rounded-2xl bg-white border border-zinc-200/80 flex items-center justify-center p-6 overflow-hidden relative shadow-sm group-hover:shadow-2xl transition-all duration-500">
                  <SmartImage 
                    src={prod.image} 
                    alt={prod.title} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-black/85 backdrop-blur-md text-emerald-400 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border border-emerald-500/30">
                      {prod.badge || "IN STOCK"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1 px-1">
                  <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest truncate">{prod.brand}</span>
                  <h3 className="text-sm font-bold text-white tracking-tight leading-tight group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {prod.title}
                  </h3>
                  <StarRating rating={prod.rating || 5.0} reviewsCount={prod.reviewsCount || 48} size="xs" />
                  <p className="text-emerald-400 font-mono text-sm font-bold tabular-nums tracking-tight mt-0.5">
                    {prod.priceDisplay}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-center pt-8 border-t border-zinc-900">
            <Link 
              href="/shop/nixodine" 
              className="px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest rounded-full transition-all duration-300 text-xs shadow-xl shadow-emerald-500/20"
            >
              Explore Nixodine Category
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
