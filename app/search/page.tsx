"use client";
import React from "react";
import ProductCard from "@/src/components/ProductCard";
import Link from "next/link";
import products from "@/src/data/products.json";
import SmartImage from "@/src/components/SmartImage";
import { Search as SearchIcon, X } from "lucide-react";
import PageBanner from "@/src/components/PageBanner";

export default function SearchPage() {
  const [query, setQuery] = React.useState("");

  const results = React.useMemo(() => {
    if (query.length > 2) {
      const q = query.toLowerCase();
      return products.filter((p: any) => 
        p.title.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      ).slice(0, 20);
    }
    return [];
  }, [query]);

  return (
    <>
      <PageBanner slug="search" label="Search" />
      <div className="max-w-[1440px] mx-auto px-6 py-12 flex flex-col gap-12 min-h-[60vh]">
      <div className="flex flex-col gap-6 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 uppercase">Search Catalog</h1>
        <div className="relative">
          <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" size={24} />
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by brand, flavor or model..."
            className="w-full bg-slate-100 border border-slate-200 rounded-2xl py-6 pl-16 pr-6 text-xl text-slate-900 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-all shadow-2xl"
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery("")}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900"
            >
              <X size={24} />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {query.length > 2 ? (
          <>
            <p className="text-sm font-bold text-slate-600 uppercase tracking-widest">
              Found {results.length} results for &ldquo;{query}&rdquo;
            </p>
            {results.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {results.map((prod: any) => (
                  <ProductCard key={prod.slug} product={prod} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border border-slate-200 rounded-3xl bg-slate-50/50">
                <p className="text-slate-600">No products found matching your search.</p>
              </div>
            )}
          </>
        ) : query.length > 0 ? (
          <p className="text-slate-600 italic">Type at least 3 characters...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-50">
             {/* Suggested terms */}
             <div className="p-6 rounded-2xl bg-slate-100/30 border border-slate-200">
               <h3 className="text-xs font-black uppercase text-slate-600 mb-4 tracking-widest">Popular Brands</h3>
               <div className="flex flex-wrap gap-2">
                 {["Geek Bar", "Lost Mary", "RAZ", "Off Stamp"].map(b => (
                   <button key={b} onClick={() => setQuery(b)} className="text-sm text-slate-600 hover:text-emerald-600 underline underline-offset-4">{b}</button>
                 ))}
               </div>
             </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
