import React from "react";
import Link from "next/link";
import { SITE, CATEGORIES } from "@/src/config/site";
import products from "@/src/data/products.json";
import SmartImage from "@/src/components/SmartImage";
import StarRating from "@/src/components/StarRating";
import WishlistButton from "@/src/components/WishlistButton";
import { notFound } from "next/navigation";
import { Check, MessageSquare, ShieldCheck, Truck, ChevronRight } from "lucide-react";

export const dynamicParams = true;

export async function generateStaticParams() {
  // Pre-render the top 100 flagship products statically for instant initial loading
  return (products as any[]).slice(0, 100).map((p) => ({
    category: p.category,
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string, slug: string }> }) {
  const { slug } = await params;
  const product = (products as any[]).find(p => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.title} | ${product.brand} | One Stop Vape Store`,
    description: product.description.substring(0, 155),
    alternates: {
      canonical: `https://${SITE.domain}/shop/${product.category}/${product.slug}/`,
    },
    openGraph: {
      title: `${product.title} | ${SITE.name}`,
      description: product.description.substring(0, 155),
      images: [{ url: product.image }],
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ category: string, slug: string }> }) {
  const { slug } = await params;
  const product = (products as any[]).find(p => p.slug === slug);
  if (!product) notFound();

  const relatedProducts = (products as any[])
    .filter(p => p.brand === product.brand && p.slug !== product.slug)
    .slice(0, 4);

  const whatsappMessage = `Hi ${SITE.name}, I would like to order: ${product.title} (${product.priceDisplay}).`;
  const whatsappUrl = `https://wa.me/${SITE.contact.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "image": [product.image],
    "description": product.description,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating ? String(product.rating) : "5.0",
      "reviewCount": product.reviewsCount ? String(product.reviewsCount) : "48"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://${SITE.domain}/shop/${product.category}/${product.slug}/`,
      "priceCurrency": SITE.contact.currency.code,
      "price": String(product.price),
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": SITE.legalName
      }
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `https://${SITE.domain}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": product.category,
        "item": `https://${SITE.domain}/shop/${product.category}/`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.title,
        "item": `https://${SITE.domain}/shop/${product.category}/${product.slug}/`
      }
    ]
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-12 flex flex-col gap-20 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        {/* Left: Gallery with pure white container */}
        <div className="flex flex-col gap-6 sticky top-24">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">
            <Link href="/" className="hover:text-emerald-500 transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link href={`/shop/${product.category}/`} className="hover:text-emerald-500 transition-colors capitalize">{product.category.replace('-', ' ')}</Link>
            <ChevronRight size={10} />
            <span className="text-zinc-400 truncate max-w-[150px]">{product.brand}</span>
          </nav>

          {/* Pure white background card */}
          <div className="aspect-square rounded-3xl bg-white border border-zinc-200/80 flex items-center justify-center p-8 md:p-12 overflow-hidden shadow-xl">
            <SmartImage 
              src={product.image} 
              alt={product.title} 
              priority={true}
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-700" 
            />
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <div className="aspect-square rounded-xl bg-white border-2 border-emerald-500 p-2 flex items-center justify-center shadow-sm">
              <SmartImage src={product.image} alt={product.title} className="w-full h-full object-contain" />
            </div>
          </div>
        </div>

        {/* Right: Purchase Module */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3 border-b border-zinc-900 pb-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">{product.brand}</span>
              <span className="text-[10px] font-bold text-zinc-500 font-mono">SKU: {product.id}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase leading-tight">
              {product.title}
            </h1>

            {/* 5-Star Rating Component */}
            <div className="flex items-center gap-3 mt-1">
              <StarRating rating={product.rating || 5.0} reviewsCount={product.reviewsCount || 48} size="sm" />
              <span className="text-zinc-700">•</span>
              <span className="text-xs text-zinc-400">Verified Authentic Inventory</span>
            </div>

            <div className="flex items-center gap-4 mt-3">
              <p className="text-3xl md:text-4xl font-black text-white font-mono tabular-nums">{product.priceDisplay}</p>
              <span className="px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                In Stock & Ready to Ship
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Device Specifications</span>
              <div className="grid grid-cols-2 gap-3">
                {product.nicotine && (
                  <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800">
                    <p className="text-[10px] text-zinc-500 uppercase font-bold mb-0.5">Strength / Formulation</p>
                    <p className="text-sm font-bold text-white">{product.nicotine}</p>
                  </div>
                )}
                {(product as any).packSize && (
                  <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800">
                    <p className="text-[10px] text-zinc-500 uppercase font-bold mb-0.5">Packaging Size</p>
                    <p className="text-sm font-bold text-white">{(product as any).packSize}</p>
                  </div>
                )}
                {(product as any).flavor && (
                  <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800">
                    <p className="text-[10px] text-zinc-500 uppercase font-bold mb-0.5">Flavor Profile</p>
                    <p className="text-sm font-bold text-white">{(product as any).flavor}</p>
                  </div>
                )}
                {product.puffs && (
                  <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800">
                    <p className="text-[10px] text-zinc-500 uppercase font-bold mb-0.5">Puff Capacity</p>
                    <p className="text-sm font-bold text-white">{product.puffs}</p>
                  </div>
                )}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 mt-2">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest rounded-full transition-all duration-300 flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/20 text-xs"
              >
                <MessageSquare size={18} />
                <span>Order via WhatsApp</span>
              </a>

              <WishlistButton product={product} />

              <p className="text-[10px] text-zinc-500 text-center uppercase font-bold tracking-widest pt-2">
                Min. Order ${SITE.order.minOrder} • {SITE.order.cryptoDiscount}% Crypto Discount • Free Shipping over ${SITE.order.freeShippingThreshold}
              </p>
            </div>
          </div>

          {/* Product Description */}
          <div className="flex flex-col gap-4 py-8 border-y border-zinc-900">
            <h3 className="text-xs font-black uppercase tracking-widest text-emerald-400">Product Overview</h3>
            <div className="text-zinc-400 text-sm leading-relaxed space-y-4">
              <p className="whitespace-pre-line">{product.description}</p>
              <ul className="space-y-2 pt-2">
                <li className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <Check size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                  <span>100% factory authentic hardware sourced through authorized manufacturer distribution.</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <Check size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                  <span>Dispatched in discreet, tamper-evident packaging from Phoenix, Arizona within 24 hours.</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <Check size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                  <span>Strict adult compliance (21+) with signature verification upon delivery.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Shipping & Trust Guarantees */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                <Truck size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-tight">Express Shipping</p>
                <p className="text-[10px] text-zinc-500">Tracked USPS/UPS</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-tight">Verified Dealer</p>
                <p className="text-[10px] text-zinc-500">Since Dec 2022</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="flex flex-col gap-8 pt-8 border-t border-zinc-900">
          <div className="flex flex-col gap-1">
            <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em]">Related Collection</span>
            <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-white uppercase">More from {product.brand}</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p: any) => (
              <Link 
                key={p.slug} 
                href={`/shop/${p.category}/${p.slug}/`} 
                className="group flex flex-col gap-3 p-3.5 rounded-3xl bg-zinc-900/30 border border-zinc-800/80 hover:border-emerald-500/40 transition-all duration-300"
              >
                {/* Pure white background card */}
                <div className="aspect-square rounded-2xl bg-white border border-zinc-200/80 flex items-center justify-center p-6 overflow-hidden relative shadow-sm group-hover:shadow-xl transition-all duration-500">
                  <SmartImage 
                    src={p.image} 
                    alt={p.title} 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="flex flex-col gap-1 px-1">
                  <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest">{p.brand}</span>
                  <h3 className="text-sm font-bold text-white leading-tight group-hover:text-emerald-400 transition-colors line-clamp-1">{p.title}</h3>
                  <StarRating rating={p.rating || 5.0} reviewsCount={p.reviewsCount || 42} size="xs" />
                  <p className="text-emerald-400 font-mono text-sm font-bold mt-0.5">{p.priceDisplay}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
