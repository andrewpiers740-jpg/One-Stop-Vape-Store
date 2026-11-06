import React from "react";
import ProductCard from "@/src/components/ProductCard";
import Link from "next/link";
import { CATEGORIES } from "@/src/config/site";
import products from "@/src/data/products.json";
import SmartImage from "@/src/components/SmartImage";
import StarRating from "@/src/components/StarRating";
import PageBanner from "@/src/components/PageBanner";

export const metadata = {
  title: "Shop All Vapes | One Stop Vape Store",
  description: "Browse our complete catalog of 2,500+ premium disposable vapes, nixodine innovations, pod systems, and nicotine salts. Fast US shipping from Phoenix, AZ.",
};

export default function ShopPage() {
  const displayProducts = (products as any[]).slice(0, 48);

  return (
    <>
      <PageBanner slug="shop" label="Shop" />
      <div className="max-w-[1440px] mx-auto px-6 py-12 flex flex-col gap-12 text-slate-900">
      
      <div className="flex flex-col gap-4">
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-600">Shop All</span>
        </nav>
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 uppercase">The Catalog</h1>
        <p className="text-slate-600 text-sm">Showing verified authentic inventory across all collections ({products.length} products total).</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-8 sticky top-24">
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 border-b border-slate-200 pb-2">Collections</h3>
            <ul className="flex flex-col gap-2">
              {CATEGORIES.map((cat: any) => (
                <li key={cat.slug}>
                  <Link href={`/shop/${cat.slug}/`} className="text-sm text-slate-600 hover:text-emerald-600 transition-colors flex items-center justify-between group py-1">
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-slate-500 group-hover:text-emerald-600 transition-colors font-mono font-bold">
                      {(products as any[]).filter((p: any) => p.category === cat.slug).length}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 border-b border-slate-200 pb-2">Sort Options</h3>
            <div className="flex flex-wrap gap-2">
              {["Featured", "Price: Low to High", "Price: High to Low", "Newest", "Top Rated"].map((sort: string) => (
                <button key={sort} className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-600 hover:border-emerald-500 hover:text-slate-900 transition-all">
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
              <ProductCard key={prod.slug} product={prod} />
            ))}
          </div>

          <div className="flex items-center justify-center pt-8 border-t border-slate-200">
            <Link 
              href="/shop/nixodine" 
              className="px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-black uppercase tracking-widest rounded-full transition-all duration-300 text-xs shadow-xl shadow-emerald-500/20"
            >
              Explore Nixodine Category
            </Link>
          </div>
        </div>

      </div>
    </div>
    </>
  );
}
