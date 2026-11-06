import React from "react";
import ProductCard from "@/src/components/ProductCard";
import Link from "next/link";
import { SITE, CATEGORIES } from "@/src/config/site";
import products from "@/src/data/products.json";
import SmartImage from "@/src/components/SmartImage";
import StarRating from "@/src/components/StarRating";
import WishlistButton from "@/src/components/WishlistButton";
import VariantBuy from "@/src/components/VariantBuy";
import { productOffers } from "@/lib/schema";
import { productFaq } from "@/lib/productFaq";
import PaymentLogos from "@/src/components/PaymentLogos";
import PostBody from "@/src/components/blog/PostBody";
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

  // Per-product copy is written by scripts/gen-product-copy.mjs; loaded on demand so the page bundle stays small.
  const rawContent: any = await import(`@/src/data/product-copy/${slug}.json`).then((m) => m.default).catch(() => null);
  const content: { body?: string; short?: string; faq?: { q: string; a: string }[] } = typeof rawContent === "string" ? { body: rawContent } : rawContent || {};
  const faq = content.faq && content.faq.length === 10 ? content.faq : productFaq(product);
  const shortDesc = content.short || product.description;

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
    "description": shortDesc,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    ...(product.rating && product.reviewsCount ? { aggregateRating: { "@type": "AggregateRating", ratingValue: String(product.rating), reviewCount: String(product.reviewsCount) } } : {}),
    "offers": productOffers(product),
    "category": product.category,
  };

  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };

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
    <div className="max-w-[1440px] mx-auto px-6 py-12 flex flex-col gap-20 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        {/* Left: Gallery with pure white container */}
        <div className="flex flex-col gap-6 sticky top-24">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600 mb-2">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link href={`/shop/${product.category}/`} className="hover:text-emerald-600 transition-colors capitalize">{product.category.replace('-', ' ')}</Link>
            <ChevronRight size={10} />
            <span className="text-slate-600 truncate max-w-[150px]">{product.brand}</span>
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
          <div className="flex flex-col gap-3 border-b border-slate-200 pb-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">{product.brand}</span>
              <span className="text-[10px] font-bold text-slate-600 font-mono">SKU: {product.id}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 uppercase leading-tight">
              {product.title}
            </h1>

            {/* 5-Star Rating Component */}
            <div className="flex items-center gap-3 mt-1">
              <StarRating rating={product.rating} reviewsCount={product.reviewsCount} size="sm" />
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-600">Verified Authentic Inventory</span>
            </div>
            <p className="mt-2 text-base leading-relaxed text-slate-700">{shortDesc}</p>

          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Device Specifications</span>
              <div className="grid grid-cols-2 gap-3">
                {product.nicotine && (
                  <div className="p-4 rounded-xl bg-slate-100/40 border border-slate-200">
                    <p className="text-[10px] text-slate-600 uppercase font-bold mb-0.5">Strength / Formulation</p>
                    <p className="text-sm font-bold text-slate-900">{product.nicotine}</p>
                  </div>
                )}
                {(product as any).packSize && (
                  <div className="p-4 rounded-xl bg-slate-100/40 border border-slate-200">
                    <p className="text-[10px] text-slate-600 uppercase font-bold mb-0.5">Packaging Size</p>
                    <p className="text-sm font-bold text-slate-900">{(product as any).packSize}</p>
                  </div>
                )}
                {(product as any).flavor && (
                  <div className="p-4 rounded-xl bg-slate-100/40 border border-slate-200">
                    <p className="text-[10px] text-slate-600 uppercase font-bold mb-0.5">Flavor Profile</p>
                    <p className="text-sm font-bold text-slate-900">{(product as any).flavor}</p>
                  </div>
                )}
                {product.puffs && (
                  <div className="p-4 rounded-xl bg-slate-100/40 border border-slate-200">
                    <p className="text-[10px] text-slate-600 uppercase font-bold mb-0.5">Puff Capacity</p>
                    <p className="text-sm font-bold text-slate-900">{product.puffs}</p>
                  </div>
                )}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 mt-2">
              <VariantBuy product={{ slug: product.slug, title: product.title, brand: product.brand, category: product.category, price: product.price, image: product.image, nicotine: product.nicotine, packSize: (product as any).packSize, rawPrice: product.rawPrice }} stockLabel="In Stock & Ready to Ship" />
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 text-white font-black uppercase tracking-widest rounded-full transition-all duration-300 flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/20 text-xs"
              >
                <MessageSquare size={18} />
                <span>Order via WhatsApp</span>
              </a>

              <WishlistButton product={product} />
              <PaymentLogos className="pt-1" />

              <p className="text-[10px] text-slate-600 text-center uppercase font-bold tracking-widest pt-2">
                Min. Order ${SITE.order.minOrder} • {SITE.order.cryptoDiscount}% Crypto Discount • Free Shipping over ${SITE.order.freeShippingThreshold}
              </p>
            </div>
          </div>

          {/* Product Description */}
          <div className="flex flex-col gap-4 py-8 border-y border-slate-200">
            <h2 className="text-xs font-black uppercase tracking-widest text-emerald-700">Product Overview</h2>
            <div className="text-slate-600 text-sm leading-relaxed space-y-4">
              {content.body ? <PostBody body={content.body} inlineImages={[]} /> : <p className="whitespace-pre-line">{product.description}</p>}
              <ul className="space-y-2 pt-2">
                <li className="flex items-start gap-2.5 text-xs text-slate-700">
                  <Check size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                  <span>100% factory authentic hardware sourced through authorized manufacturer distribution.</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-700">
                  <Check size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                  <span>Dispatched in discreet, tamper-evident packaging from Phoenix, Arizona within 24 hours.</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-700">
                  <Check size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                  <span>Strict adult compliance (21+) with signature verification upon delivery.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Shipping & Trust Guarantees */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-100/40 border border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                <Truck size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 uppercase tracking-tight">Express Shipping</p>
                <p className="text-[10px] text-slate-600">Tracked regional carriers</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-100/40 border border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 uppercase tracking-tight">Verified Dealer</p>
                <p className="text-[10px] text-slate-600">Since Dec 2022</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <section aria-labelledby="faq-heading" className="mx-auto w-full max-w-4xl">
        <h2 id="faq-heading" className="mb-6 text-2xl font-black uppercase tracking-tighter text-slate-900 md:text-3xl">Frequently asked questions</h2>
        <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {faq.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="cursor-pointer list-none text-base font-bold text-slate-900 marker:hidden"><h3 className="inline">{f.q}</h3></summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="flex flex-col gap-8 pt-8 border-t border-slate-200">
          <div className="flex flex-col gap-1">
            <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.3em]">Related Collection</span>
            <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-slate-900 uppercase">More from {product.brand}</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p: any) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
