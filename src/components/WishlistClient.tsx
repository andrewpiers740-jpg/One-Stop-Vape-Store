"use client";
import React, { useSyncExternalStore, useMemo } from "react";
import Link from "next/link";
import { SITE } from "@/src/config/site";
import SmartImage from "@/src/components/SmartImage";
import StarRating from "@/src/components/StarRating";
import { Heart, Trash2, ShoppingBag, ArrowRight, MessageSquare } from "lucide-react";

export interface WishlistItem {
  id: string;
  slug: string;
  title: string;
  brand: string;
  category: string;
  price: number;
  priceDisplay: string;
  image: string;
  rating?: number;
  reviewsCount?: number;
}

function subscribeWishlist(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("osv_wishlist_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("osv_wishlist_change", callback);
  };
}

function getWishlistSnapshot() {
  if (typeof window === "undefined") return "[]";
  return localStorage.getItem("osv_wishlist") || "[]";
}

function getServerSnapshot() {
  return "[]";
}

export default function WishlistClient() {
  const rawList = useSyncExternalStore(
    subscribeWishlist,
    getWishlistSnapshot,
    getServerSnapshot
  );

  const items = useMemo<WishlistItem[]>(() => {
    try {
      const parsed = JSON.parse(rawList);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [rawList]);

  const removeItem = (slug: string) => {
    try {
      const updated = items.filter(item => item.slug !== slug);
      localStorage.setItem("osv_wishlist", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("osv_wishlist_change"));
    } catch {
      // ignore
    }
  };

  const clearAll = () => {
    try {
      localStorage.removeItem("osv_wishlist");
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("osv_wishlist_change"));
    } catch {
      // ignore
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center flex flex-col items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500">
          <Heart size={36} className="text-slate-400" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">Your Wishlist is Empty</h1>
          <p className="text-slate-600 text-sm md:text-base max-w-md mx-auto">
            Save your favorite disposable vapes, nixodine innovations, pod systems, and e-liquids here to easily revisit or order anytime.
          </p>
        </div>
        <Link
          href="/shop"
          className="mt-4 px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-white font-black uppercase tracking-widest rounded-full transition-all duration-300 flex items-center gap-2 shadow-xl shadow-emerald-500/20 text-xs"
        >
          <span>Explore Shop Catalog</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-12 flex flex-col gap-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-slate-200">
        <div className="flex flex-col gap-2">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-600">Wishlist</span>
          </nav>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">My Wishlist</h1>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-xs font-black rounded-full">
              {items.length} {items.length === 1 ? "Item" : "Items"}
            </span>
          </div>
        </div>

        <button
          onClick={clearAll}
          className="text-xs text-slate-500 hover:text-red-700 transition-colors flex items-center gap-1.5 self-start sm:self-end font-bold uppercase tracking-wider"
        >
          <Trash2 size={14} />
          <span>Clear Wishlist</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => {
          const waUrl = `https://wa.me/${SITE.contact.whatsapp}?text=${encodeURIComponent(
            `Hi ${SITE.name}, I would like to order: ${item.title} (${item.priceDisplay}) from my wishlist.`
          )}`;

          return (
            <div
              key={item.slug}
              className="group flex flex-col justify-between gap-4 p-4 rounded-3xl bg-slate-100/40 border border-slate-200 hover:border-emerald-500/40 transition-all duration-300"
            >
              <div className="flex flex-col gap-4">
                {/* Pure white background card for image */}
                <div className="aspect-square rounded-2xl bg-white border border-zinc-200/80 p-6 flex items-center justify-center relative overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-500">
                  <SmartImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={() => removeItem(item.slug)}
                    aria-label="Remove item"
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-100/80 hover:bg-red-500 text-slate-700 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{item.brand}</span>
                  <Link
                    href={`/shop/${item.category}/${item.slug}/`}
                    className="text-sm font-bold text-slate-900 hover:text-emerald-600 transition-colors line-clamp-1 tracking-tight"
                  >
                    {item.title}
                  </Link>
                  {item.rating && item.reviewsCount ? <StarRating rating={item.rating} reviewsCount={item.reviewsCount} size="xs" /> : null}
                  <p className="text-emerald-600 font-mono text-sm font-bold tabular-nums mt-1">{item.priceDisplay}</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-2 pt-3 border-t border-slate-200/60">
                <Link
                  href={`/shop/${item.category}/${item.slug}/`}
                  className="w-full py-2.5 bg-slate-200 hover:bg-zinc-700 text-slate-900 text-xs font-black uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag size={14} />
                  <span>View Details</span>
                </Link>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 hover:text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 border border-emerald-500/20"
                >
                  <MessageSquare size={14} />
                  <span>Order on WhatsApp</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
