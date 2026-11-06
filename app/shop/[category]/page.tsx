import React from "react";
import ProductCard from "@/src/components/ProductCard";
import Link from "next/link";
import { CATEGORIES } from "@/src/config/site";
import productsData from "@/src/data/products.json";
import SmartImage from "@/src/components/SmartImage";
import StarRating from "@/src/components/StarRating";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import PageBanner from "@/src/components/PageBanner";

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
    <div className="min-h-screen bg-white text-slate-900">
      <PageBanner slug={categorySlug} label={category.name} />
      {/* Category Hero Header */}
      <section className="bg-slate-50 border-b border-slate-200 py-16">
        <div className="max-w-[1440px] mx-auto px-6">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-6">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link href="/shop" className="hover:text-emerald-600 transition-colors">Shop</Link>
            <ChevronRight size={10} />
            <span className="text-emerald-600">{category.name}</span>
          </nav>
          
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-none">
              {category.name}
            </h1>
            <p className="text-slate-600 text-base md:text-lg max-w-3xl leading-relaxed">
              {category.description}
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-600 mt-2">
              <span className="text-emerald-600 font-bold">{categoryProducts.length} Products Available</span>
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
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="font-black uppercase tracking-widest text-xs text-slate-900">
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
                        ? "bg-emerald-500/10 text-emerald-600 font-black border border-emerald-500/20"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    <span>{c.name}</span>
                    <span className="text-[10px] font-mono text-slate-600">
                      {(productsData as Product[]).filter(p => p.category === c.slug).length}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Brands in this Category */}
            <div className="flex flex-col gap-3 pt-4 border-t border-slate-200">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-600">Brands in {category.name}</h4>
              <div className="flex flex-wrap gap-1.5">
                {sortedBrands.slice(0, 16).map(brand => (
                  <span key={brand} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold uppercase border border-slate-200">
                    {brand} ({groupedByBrand[brand].length})
                  </span>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Feed by Brand */}
          <main className="flex-grow flex flex-col gap-16">
            {sortedBrands.length === 0 ? (
              <div className="py-24 text-center text-slate-600">
                No products found in this category.
              </div>
            ) : (
              sortedBrands.map(brand => (
                <section key={brand} className="flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900">{brand}</h2>
                    <span className="text-xs font-mono text-slate-600">({groupedByBrand[brand].length} items)</span>
                    <div className="flex-grow h-px bg-slate-100" />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {groupedByBrand[brand].map((prod) => (
                      <ProductCard key={prod.slug} product={prod} />
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
