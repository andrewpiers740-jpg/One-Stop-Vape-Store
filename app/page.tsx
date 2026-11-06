import React from "react";
import ProductCard from "@/src/components/ProductCard";
import Link from "next/link";
import Image from "next/image";
import { SITE, CATEGORIES } from "@/src/config/site";
import products from "@/src/data/products.json";
import SmartImage from "@/src/components/SmartImage";
import TrustBar from "@/src/components/TrustBar";
import CategoryBlock from "@/src/components/CategoryBlock";
import BrandCarousel from "@/src/components/BrandCarousel";
import StarRating from "@/src/components/StarRating";
import TrustpilotReviews from "@/src/components/TrustpilotReviews";
import HeroShowcase from "@/src/components/HeroShowcase";
import siteImages from "@/src/data/site-images.json";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Sparkles } from "lucide-react";

export default function HomePage() {
  // Get flagship products (Geek Bar, Lost Mary, Nixodine)
  const featuredProducts = (products as any[])
    .filter(p => ["Geek Bar", "Lost Mary", "Hookah Labs", "Fifty Bar"].includes(p.brand))
    .slice(0, 8);

  if (featuredProducts.length < 8) {
    featuredProducts.push(...(products as any[]).slice(0, 8 - featuredProducts.length));
  }


  return (
    <div className="flex flex-col gap-16 pb-16 text-slate-900">
      
      {/* Hero Section with exactly one H1 */}
      <section className="relative min-h-[80vh] flex items-center pt-12 lg:pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-white to-white -z-10" />
        <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">
          
          <div className="flex flex-col gap-6 md:gap-8 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] w-fit">
              <Zap size={12} />
              <span>Fast Tracked US Shipping • Founded Dec 2022</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.92] text-slate-900">
              THE ULTIMATE <span className="text-emerald-600">VAPE</span> DESTINATION.
            </h1>
            
            <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-xl">
              From flagship Geek Bar disposables and Nixodine alternatives to authentic nicotine salts. Fast tracked delivery nationwide from our Phoenix fulfillment hub.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
              <Link 
                href="/shop" 
                className="w-full sm:w-auto px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-white font-black uppercase tracking-widest rounded-full transition-all duration-300 flex items-center justify-center gap-2 group shadow-xl shadow-emerald-500/20"
              >
                <span>Explore Catalog</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/shop/nixodine" 
                className="w-full sm:w-auto px-10 py-5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-black uppercase tracking-widest rounded-full border border-slate-200 transition-all duration-300 text-center flex items-center justify-center gap-2"
              >
                <Sparkles size={16} className="text-emerald-600" />
                <span>Nixodine Innovations</span>
              </Link>
            </div>

            <div className="pt-4 flex items-center gap-6 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-600" /> 100% Factory Authentic</span>
              <span className="flex items-center gap-1.5"><Zap size={14} className="text-emerald-600" /> 24hr Dispatch</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-600" /> 21+ PACT Compliant</span>
            </div>
          </div>

          <HeroShowcase />

        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar />

      {/* Category Grid Section */}
      <section className="max-w-[1440px] mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col gap-2">
            <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.3em]">Collections</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 uppercase">Browse by Category</h2>
          </div>
          <Link href="/shop" className="text-slate-600 hover:text-emerald-600 font-bold uppercase tracking-widest text-xs flex items-center gap-2 transition-colors">
            View All Categories <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat.slug} 
              href={`/shop/${cat.slug}/`} 
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200 bg-slate-50 transition-all duration-500 hover:border-emerald-500/50"
            >
              <Image src={(siteImages.tiles as Record<string, { src: string; alt: string }>)[cat.slug]?.src ?? ""} alt={(siteImages.tiles as Record<string, { src: string; alt: string }>)[cat.slug]?.alt ?? cat.name} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col gap-2">
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter group-hover:text-emerald-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-slate-200 text-xs leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Hardware Products */}
      <section className="bg-slate-50 py-24 border-y border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex flex-col items-center text-center gap-3 mb-16">
            <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.3em]">Trending Now</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 uppercase">Featured Best Sellers</h2>
            <div className="w-16 h-1 bg-emerald-500 mt-2" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((prod: any) => (
              <ProductCard key={prod.slug} product={prod} />
            ))}
          </div>
          
          <div className="mt-16 flex justify-center">
            <Link 
              href="/shop" 
              className="px-12 py-5 border border-slate-200 hover:border-emerald-500 text-slate-900 font-black uppercase tracking-widest rounded-full transition-all duration-300 hover:bg-slate-100"
            >
              View Full 2,500+ Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Dedicated Category Showcases */}
      <section className="w-full flex flex-col">
        <CategoryBlock title="Nixodine Innovations" slug="nixodine" categoryKey="category" categoryValue="nixodine" />
        <CategoryBlock title="Disposable Vapes" slug="disposables" categoryKey="category" categoryValue="disposables" />
        <CategoryBlock title="Vape Juice & Salts" slug="vape-juice" categoryKey="category" categoryValue="vape-juice" />
        <CategoryBlock title="Nicotine Pouches" slug="nic-pouches" categoryKey="category" categoryValue="nic-pouches" />
        <CategoryBlock title="Coils & Pods" slug="coils-pods" categoryKey="category" categoryValue="coils-pods" />
        <CategoryBlock title="Vape Kits" slug="vape-kits" categoryKey="category" categoryValue="vape-kits" />
      </section>

      {/* Brand Carousel */}
      <BrandCarousel />

      {/* Dedicated Trustpilot Reviews Section */}
      <TrustpilotReviews />

      {/* Authority & Assurance Grid */}
      <section className="max-w-[1440px] mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="p-10 rounded-3xl bg-slate-100/40 border border-slate-200 flex flex-col gap-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
            <ShieldCheck size={28} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-none">Guaranteed Authentic</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Direct partnerships with primary manufacturers. Every unit features original verification QR codes, batch serials, and factory tamper seals.
          </p>
        </div>

        <div className="p-10 rounded-3xl bg-slate-100/40 border border-emerald-500/20 flex flex-col gap-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-600">
            <Zap size={28} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-none">Priority Logistics</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Dispatched from our Phoenix fulfillment hub within 24 hours. Tracked express shipping via USPS and UPS across the United States.
          </p>
        </div>

        <div className="p-10 rounded-3xl bg-slate-100/40 border border-slate-200 flex flex-col gap-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
            <CheckCircle2 size={28} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-none">Dedicated Support</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Real assistance from our Phoenix product specialists via WhatsApp and email. Full support for individual orders and volume wholesale buyers.
          </p>
        </div>
      </section>

    </div>
  );
}
