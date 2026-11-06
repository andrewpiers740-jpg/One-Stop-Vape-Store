"use client";
import React, { useSyncExternalStore, useMemo } from "react";
import { Heart } from "lucide-react";
import { WishlistItem } from "./WishlistClient";

interface WishlistButtonProps {
  product: {
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
  };
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

export default function WishlistButton({ product }: WishlistButtonProps) {
  const rawList = useSyncExternalStore(
    subscribeWishlist,
    getWishlistSnapshot,
    getServerSnapshot
  );

  const isInWishlist = useMemo(() => {
    try {
      const list: WishlistItem[] = JSON.parse(rawList);
      return Array.isArray(list) && list.some((item) => item.slug === product.slug);
    } catch {
      return false;
    }
  }, [rawList, product.slug]);

  const toggleWishlist = () => {
    try {
      const stored = localStorage.getItem("osv_wishlist");
      let list: WishlistItem[] = stored ? JSON.parse(stored) : [];

      if (isInWishlist) {
        list = list.filter((item) => item.slug !== product.slug);
      } else {
        list.push({
          id: product.id,
          slug: product.slug,
          title: product.title,
          brand: product.brand,
          category: product.category,
          price: product.price,
          priceDisplay: product.priceDisplay,
          image: product.image,
          rating: product.rating,
          reviewsCount: product.reviewsCount,
        });
      }

      localStorage.setItem("osv_wishlist", JSON.stringify(list));
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("osv_wishlist_change"));
    } catch {
      // ignore
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      type="button"
      className={`w-full py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 border ${
        isInWishlist
          ? "bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-slate-900"
          : "bg-slate-100 border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-slate-900"
      }`}
    >
      <Heart
        size={16}
        className={isInWishlist ? "fill-rose-500 text-rose-500" : "text-slate-600"}
      />
      <span>{isInWishlist ? "Saved in Wishlist" : "Save to Wishlist"}</span>
    </button>
  );
}
