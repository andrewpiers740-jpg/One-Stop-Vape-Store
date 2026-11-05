import React from "react";
import Link from "next/link";
import { CATEGORIES } from "@/src/config/site";
import productsData from "@/src/data/products.json";
import SmartImage from "@/src/components/SmartImage";
import StarRating from "@/src/components/StarRating";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

interface Product {
  id: string;
  slug: string;
  title: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  priceDisplay: string;
  image: string;
  description: string;
  badge: string;
  nicotine?: string;
  flavor?: string;
  packSize?: string;
  rating?: number;
  reviewsCount?: number;
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({
    category: c.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params;
  const category = CATEGORIES.find(c => c.slug === categorySlug);
  if (!category) return {};
  return {
    title: `${category.name} | One Stop Vape Store`,
    description: `Shop authentic ${category.name} products. Best prices on verified ${category.name} hardware, bundles, and liquids with fast US shipping from Phoenix, AZ.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params;
  const category = CATEGORIES.find(c => c.slug === categorySlug);
  if (!category) notFound();

  // Filter products by category
  const categoryProducts = (productsData as Product[]).filter(p => p.category === categorySlug);

  // Group by brand
  const groupedByBrand: Record<string, Product[]> = {};
  categoryProducts.forEach(p => {
    const brand = p.brand || "Other";
    if (!groupedByBrand[brand]) groupedByBrand[brand] = [];
    groupedByBrand[brand].push(p);
  });

  const sortedBrands = Object.keys(groupedByBrand).sort();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Category Hero Header */}
      <section className="bg-zinc-950 border-b border-zinc-900 py-16">
        <div className="max-w-[1440px] mx-auto px-6">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-6">
            <Link href="/" className="hover:text-emerald-500 transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link href="/shop" className="hover:text-emerald-500 transition-colors">Shop</Link>
            <ChevronRight size={10} />
            <span className="text-emerald-500">{category.name}</span>
          </nav>
          
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-none">
              {category.name}
            </h1>
            <p className="text-zinc-400 text-base md:text-lg max-w-3xl leading-relaxed">
              {category.description}
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 mt-2">
              <span className="text-emerald-400 font-bold">{categoryProducts.length} Products Available</span>
              <span>•</span>
              <span>100% Authentic Factory Sealed</span>
              <span>•</span>
              <span>Same-Day Dispatch Eligible</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Collections Navigation */}
          <aside className="lg:w-64 shrink-0 flex flex-col gap-8">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-900">
              <h3 className="font-black uppercase tracking-widest text-xs text-white">
                All Collections
              </h3>
            </div>
            
            <ul className="flex flex-col gap-2">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link 
                    href={`/shop/${c.slug}/`}
                    className={`text-sm py-1.5 px-3 rounded-lg flex items-center justify-between transition-colors ${
                      c.slug === categorySlug
                        ? "bg-emerald-500/10 text-emerald-400 font-black border border-emerald-500/20"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                    }`}
                  >
                    <span>{c.name}</span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      {(productsData as Product[]).filter(p => p.category === c.slug).length}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Brands in this Category */}
            <div className="flex flex-col gap-3 pt-4 border-t border-zinc-900">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-zinc-500">Brands in {category.name}</h4>
              <div className="flex flex-wrap gap-1.5">
                {sortedBrands.slice(0, 16).map(brand => (
                  <span key={brand} className="px-2.5 py-1 rounded-md bg-zinc-900 text-zinc-400 text-[10px] font-bold uppercase border border-zinc-800">
                    {brand} ({groupedByBrand[brand].length})
                  </span>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Feed by Brand */}
          <main className="flex-grow flex flex-col gap-16">
            {sortedBrands.length === 0 ? (
              <div className="py-24 text-center text-zinc-500">
                No products found in this category.
              </div>
            ) : (
              sortedBrands.map(brand => (
                <section key={brand} className="flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-black uppercase tracking-tight text-white">{brand}</h2>
                    <span className="text-xs font-mono text-zinc-500">({groupedByBrand[brand].length} items)</span>
                    <div className="flex-grow h-px bg-zinc-900" />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {groupedByBrand[brand].map((prod) => (
                      <Link 
                        key={prod.slug} 
                        href={`/shop/${prod.category}/${prod.slug}/`} 
                        className="group flex flex-col gap-3 p-3.5 rounded-3xl bg-zinc-900/30 border border-zinc-800/80 hover:border-emerald-500/40 transition-all duration-300"
                      >
                        {/* Pure white background product image */}
                        <div className="aspect-square rounded-2xl bg-white border border-zinc-200/80 flex items-center justify-center p-6 overflow-hidden relative shadow-sm group-hover:shadow-xl transition-all duration-500">
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
                          <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest truncate">{prod.brand}</span>
                          <h3 className="text-sm font-bold text-white tracking-tight leading-tight group-hover:text-emerald-400 transition-colors line-clamp-1">
                            {prod.title}
                          </h3>
                          <StarRating rating={prod.rating || 5.0} reviewsCount={prod.reviewsCount || 42} size="xs" />
                          <div className="flex items-baseline justify-between gap-2 mt-1">
                            <p className="text-emerald-400 font-mono text-sm font-bold tabular-nums">
                              {prod.priceDisplay}
                            </p>
                            {prod.nicotine && (
                              <span className="text-[9px] text-zinc-400 font-mono bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
                                {prod.nicotine}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              ))
            )}
          </main>

        </div>
      </div>
    </div>
  );
}
