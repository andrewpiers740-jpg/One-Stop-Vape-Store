"use client";
import React, { useState, useMemo, useSyncExternalStore } from "react";
import { SITE } from "@/src/config/site";
import { Search, ShoppingBag, Menu, X, User, Heart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
    <header className="sticky top-0 z-50 w-full bg-black/95 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3">
        {/* Top Section: Branding, Search bar shifted left, Wishlist, Account, Cart */}
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link href="/" className="text-xl md:text-2xl font-black text-white uppercase shrink-0 tracking-tighter">
            One Stop <span className="text-emerald-500">Vape</span>
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
                className="w-full bg-zinc-900 text-zinc-200 placeholder-zinc-500 text-xs py-2 pl-3.5 pr-8 rounded-full border border-zinc-800 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <button 
                type="submit" 
                aria-label="Submit search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-emerald-400 transition-colors"
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
              className="relative p-2 text-zinc-400 hover:text-emerald-400 transition-colors rounded-full hover:bg-zinc-900" 
              aria-label="My Wishlist"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-emerald-500 text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* My Account */}
            <Link 
              href="/account" 
              className="p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-zinc-900" 
              aria-label="My Account"
            >
              <User size={20} />
            </Link>
            
            {/* Shopping Cart */}
            <Link 
              href="/cart" 
              className="p-2 text-zinc-400 hover:text-emerald-400 transition-colors rounded-full hover:bg-zinc-900" 
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={20} />
            </Link>

            {/* Mobile Hamburger */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-900"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Second Section: Center-Aligned Main Navigation Bar (Desktop) */}
        <nav className="hidden lg:flex items-center justify-center gap-5 xl:gap-7 flex-wrap py-2 border-t border-zinc-900/60 mt-3 pt-3">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className="text-[11px] font-black uppercase tracking-[0.14em] text-zinc-400 hover:text-emerald-400 transition-colors whitespace-nowrap"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-black/98 border-b border-zinc-800 p-6 flex flex-col gap-3 shadow-2xl animate-in slide-in-from-top duration-200">
            <div className="text-[10px] uppercase font-black tracking-widest text-emerald-500 mb-1">
              Menu & Collections
            </div>
            {navItems.map((item) => (
              <Link 
                key={item.name}
                onClick={() => setIsOpen(false)} 
                href={item.href} 
                className="text-base font-bold text-zinc-200 uppercase tracking-tight hover:text-emerald-400 transition-colors py-1.5 border-b border-zinc-900/50"
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center gap-3 mt-4">
              <Link 
                onClick={() => setIsOpen(false)} 
                href="/pages/wishlist" 
                className="flex-1 py-3 bg-zinc-900 text-white text-center text-xs font-black uppercase tracking-wider rounded-xl border border-zinc-800 flex items-center justify-center gap-2"
              >
                <Heart size={14} className="text-emerald-400" />
                <span>Wishlist ({wishlistCount})</span>
              </Link>
              <Link 
                onClick={() => setIsOpen(false)} 
                href="/shop" 
                className="flex-1 py-3 bg-emerald-500 text-black text-center text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-500/20"
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
