"use client";
import React from "react";
import Link from "next/link";
import products from "@/src/data/products.json";
import SmartImage from "@/src/components/SmartImage";
import { Search as SearchIcon, X } from "lucide-react";

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
    <div className="max-w-[1440px] mx-auto px-6 py-12 flex flex-col gap-12 min-h-[60vh]">
      <div className="flex flex-col gap-6 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase">Search Catalog</h1>
        <div className="relative">
          <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500" size={24} />
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by brand, flavor or model..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-6 pl-16 pr-6 text-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-all shadow-2xl"
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery("")}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
            >
              <X size={24} />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {query.length > 2 ? (
          <>
            <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">
              Found {results.length} results for &ldquo;{query}&rdquo;
            </p>
            {results.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {results.map((prod: any) => (
                  <Link key={prod.slug} href={`/shop/${prod.category}/${prod.slug}/`} className="group flex flex-col gap-4">
                    <div className="aspect-square rounded-2xl bg-white flex items-center justify-center p-4 overflow-hidden border border-zinc-900 group-hover:shadow-2xl transition-all">
                      <SmartImage src={prod.image} alt={prod.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm font-bold text-white leading-tight group-hover:text-emerald-500 transition-colors line-clamp-1">{prod.title}</h3>
                      <p className="text-emerald-500 font-mono text-xs font-bold">{prod.priceDisplay}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border border-zinc-900 rounded-3xl bg-zinc-950/50">
                <p className="text-zinc-500">No products found matching your search.</p>
              </div>
            )}
          </>
        ) : query.length > 0 ? (
          <p className="text-zinc-600 italic">Type at least 3 characters...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-50">
             {/* Suggested terms */}
             <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800">
               <h3 className="text-xs font-black uppercase text-zinc-400 mb-4 tracking-widest">Popular Brands</h3>
               <div className="flex flex-wrap gap-2">
                 {["Geek Bar", "Lost Mary", "RAZ", "Off Stamp"].map(b => (
                   <button key={b} onClick={() => setQuery(b)} className="text-sm text-zinc-500 hover:text-emerald-500 underline underline-offset-4">{b}</button>
                 ))}
               </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
