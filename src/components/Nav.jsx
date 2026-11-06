"use client";
import React, { useState, useMemo, useSyncExternalStore } from "react";
import { SITE } from "@/src/config/site";
import { Search, ShoppingBag, Menu, X, User, Heart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/src/components/CartProvider";

function subscribeWishlist(callback) {
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

export default function Nav() {
  const { count: cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const rawWishlist = useSyncExternalStore(
    subscribeWishlist,
    getWishlistSnapshot,
    getServerSnapshot
  );

  const wishlistCount = useMemo(() => {
    try {
      const parsed = JSON.parse(rawWishlist);
      return Array.isArray(parsed) ? parsed.length : 0;
    } catch {
      return 0;
    }
  }, [rawWishlist]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
    }
  };

  const navItems = [
    { name: "Wholesale", href: "/wholesale" },
    { name: "Vape Juice", href: "/shop/vape-juice" },
    { name: "Coils & Pods", href: "/shop/coils-pods" },
    { name: "Disposable Vapes", href: "/shop/disposables" },
    { name: "Vape Kits", href: "/shop/vape-kits" },
    { name: "Vaporizers", href: "/shop/vaporizers" },
    { name: "Nicotine Pouches", href: "/shop/nic-pouches" },
    { name: "Nixodine", href: "/shop/nixodine" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3">
        {/* Top Section: Branding, Search bar shifted left, Wishlist, Account, Cart */}
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link href="/" aria-label="One Stop Vape Store — home" className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo-transparent.webp"
              alt="One Stop Vape Store"
              width={1463}
              height={538}
              className="h-9 sm:h-11 w-auto"
              fetchPriority="high"
            />
          </Link>

          {/* Search Bar (Shifted slightly to the left) */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="flex-1 max-w-[200px] sm:max-w-[260px] md:max-w-[320px] ml-2 sm:ml-4 mr-auto"
          >
            <div className="relative w-full">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands..." 
                className="w-full bg-slate-100 text-slate-700 placeholder-slate-400 text-xs py-2 pl-3.5 pr-8 rounded-full border border-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <button 
                type="submit" 
                aria-label="Submit search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-emerald-600 transition-colors"
              >
                <Search size={14} />
              </button>
            </div>
          </form>

          {/* Action Icons: Wishlist, My Account, Cart, Mobile Toggle */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Wishlist Icon */}
            <Link 
              href="/pages/wishlist" 
              className="relative p-2 text-slate-600 hover:text-emerald-600 transition-colors rounded-full hover:bg-slate-100" 
              aria-label="My Wishlist"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-emerald-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* My Account */}
            <Link 
              href="/account" 
              className="p-2 text-slate-600 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-100" 
              aria-label="My Account"
            >
              <User size={20} />
            </Link>
            
            {/* Shopping Cart */}
            <Link 
              href="/cart"
              aria-label={`Shopping Cart${cartCount ? `, ${cartCount} items` : ""}`}
              className="relative p-2 text-slate-600 hover:text-emerald-600 transition-colors rounded-full hover:bg-slate-100"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-emerald-500 text-white text-[10px] font-black min-w-4 h-4 px-1 rounded-full flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Second Section: Center-Aligned Main Navigation Bar (Desktop) */}
        <nav className="hidden lg:flex items-center justify-center gap-5 xl:gap-7 flex-wrap py-2 border-t border-slate-200/60 mt-3 pt-3">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-600 hover:text-emerald-600 transition-colors whitespace-nowrap"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-black/98 border-b border-slate-200 p-6 flex flex-col gap-3 shadow-2xl animate-in slide-in-from-top duration-200">
            <div className="text-[10px] uppercase font-black tracking-widest text-emerald-600 mb-1">
              Menu & Collections
            </div>
            {navItems.map((item) => (
              <Link 
                key={item.name}
                onClick={() => setIsOpen(false)} 
                href={item.href} 
                className="text-base font-bold text-slate-700 uppercase tracking-tight hover:text-emerald-600 transition-colors py-1.5 border-b border-slate-200/50"
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center gap-3 mt-4">
              <Link 
                onClick={() => setIsOpen(false)} 
                href="/pages/wishlist" 
                className="flex-1 py-3 bg-slate-100 text-slate-900 text-center text-xs font-black uppercase tracking-wider rounded-xl border border-slate-200 flex items-center justify-center gap-2"
              >
                <Heart size={14} className="text-emerald-600" />
                <span>Wishlist ({wishlistCount})</span>
              </Link>
              <Link 
                onClick={() => setIsOpen(false)} 
                href="/shop" 
                className="flex-1 py-3 bg-emerald-500 text-white text-center text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-500/20"
              >
                Shop All
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
