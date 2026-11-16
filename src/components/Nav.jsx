"use client";
import React, { useState, useMemo, useSyncExternalStore } from "react";
import { SITE } from "@/src/config/site";
import { ShoppingBag, Menu, X, User, Heart, ChevronDown, ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/src/components/CartProvider";
import SearchBox from "@/src/components/SearchBox";

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


const CAT_SLUG = { "Vape Juice": "vape-juice", "Coils & Pods": "coils-pods", "Disposable Vapes": "disposables", "Vape Kits": "vape-kits", Vaporizers: "vaporizers", "Nicotine Pouches": "nic-pouches", Nixodine: "nixodine" };

// One column of links; long lists show the first `limit` and a "+ N more" button.
function MenuColumn({ col, onNavigate }) {
  const [all, setAll] = useState(false);
  const limit = col.limit || col.links.length;
  const links = all ? col.links : col.links.slice(0, limit);
  const more = col.links.length - limit;
  return (
    <div className={col.twoCols ? "min-w-0 sm:col-span-2" : "min-w-0"}>
      <p className="mb-3 border-b border-slate-200 pb-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-600">{col.title}</p>
      <ul className={col.twoCols ? "grid gap-x-8 gap-y-0.5 sm:grid-cols-2" : "flex flex-col gap-0.5"}>
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} onClick={onNavigate} className="block rounded-md px-2 py-1.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-emerald-50 hover:text-emerald-700 focus-visible:bg-emerald-50">{l.label}</Link>
          </li>
        ))}
      </ul>
      {more > 0 && !all && (
        <button type="button" onClick={() => setAll(true)} className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-emerald-700 hover:border-emerald-500">
          <Plus size={12} aria-hidden="true" />{more} more
        </button>
      )}
    </div>
  );
}

function MegaPanel({ menu, onNavigate }) {
  return (
    <div className="mx-auto grid max-w-[1440px] gap-8 px-6 py-7 lg:grid-cols-[220px_1fr]">
      <div className="flex flex-col gap-2">
        <Link href={menu.href} onClick={onNavigate} className="flex items-center justify-between gap-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-700 transition-colors hover:bg-emerald-100">
          <span>Shop all {menu.name}</span><ArrowRight size={16} aria-hidden="true" />
        </Link>
        {menu.side.map((l) => (
          <Link key={l.label} href={l.href} onClick={onNavigate} className="rounded-md px-3 py-1.5 text-sm font-bold text-slate-800 hover:bg-slate-100 hover:text-emerald-700">{l.label}</Link>
        ))}
        <p className="px-1 pt-2 text-[11px] text-slate-600">{menu.total.toLocaleString()} products</p>
      </div>
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 xl:grid-cols-4">
        {menu.columns.map((c) => <MenuColumn key={c.title} col={c} onNavigate={onNavigate} />)}
      </div>
    </div>
  );
}

export default function Nav({ menu: MEGA = {} }) {
  const { count: cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // desktop mega menu (category slug)
  const [mobileSub, setMobileSub] = useState(null); // mobile accordion (category slug)
  const closeTimer = React.useRef(null);
  const openNow = (slug) => { clearTimeout(closeTimer.current); setOpenMenu(slug); };
  const closeSoon = () => { clearTimeout(closeTimer.current); closeTimer.current = setTimeout(() => setOpenMenu(null), 160); };
  const closeAll = () => { clearTimeout(closeTimer.current); setOpenMenu(null); setIsOpen(false); };
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") { setOpenMenu(null); } };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

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
    <header onMouseLeave={closeSoon} className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
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

          {/* Search bar with live suggestions */}
          <div className="flex-1 max-w-[200px] sm:max-w-[260px] md:max-w-[340px] ml-2 sm:ml-4 mr-auto">
            <SearchBox variant="nav" />
          </div>

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

        {/* Second Section: main navigation bar with dropdown menus (desktop) */}
        <nav aria-label="Main" className="hidden lg:flex items-center justify-center gap-5 xl:gap-7 flex-wrap py-2 border-t border-slate-200/60 mt-3 pt-3">
          {navItems.map((item) => {
            const slug = CAT_SLUG[item.name];
            const hasMenu = Boolean(slug && MEGA[slug]);
            const active = openMenu === slug;
            return (
              <div key={item.name} className="relative" onMouseEnter={() => (hasMenu ? openNow(slug) : closeSoon())}>
                <div className="flex items-center gap-0.5">
                  <Link
                    href={item.href}
                    onClick={closeAll}
                    onFocus={() => (hasMenu ? openNow(slug) : setOpenMenu(null))}
                    className={`text-[11px] font-black uppercase tracking-[0.14em] transition-colors whitespace-nowrap ${active ? "text-emerald-600" : "text-slate-600 hover:text-emerald-600"}`}
                  >
                    {item.name}
                  </Link>
                  {hasMenu && (
                    <button
                      type="button"
                      aria-label={`${active ? "Close" : "Open"} ${item.name} menu`}
                      aria-expanded={active}
                      aria-controls={`mega-${slug}`}
                      onClick={() => setOpenMenu(active ? null : slug)}
                      className="rounded p-1 text-slate-500 hover:text-emerald-600"
                    >
                      <ChevronDown size={12} aria-hidden="true" className={`transition-transform duration-200 ${active ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>
                {active && <span aria-hidden="true" className="absolute -bottom-3 left-0 right-0 h-0.5 rounded bg-emerald-500" />}
              </div>
            );
          })}
        </nav>

        {/* Mobile navigation */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto bg-white border-b border-slate-200 p-5 flex flex-col gap-1 shadow-2xl">
            <div className="text-[10px] uppercase font-black tracking-widest text-emerald-600 mb-1">Menu &amp; Collections</div>
            {navItems.map((item) => {
              const slug = CAT_SLUG[item.name];
              const menu = slug && MEGA[slug];
              const open = mobileSub === slug;
              return (
                <div key={item.name} className="border-b border-slate-200/70">
                  <div className="flex items-center justify-between">
                    <Link onClick={closeAll} href={item.href} className="flex-1 py-3 text-base font-bold text-slate-800 uppercase tracking-tight hover:text-emerald-600 transition-colors">{item.name}</Link>
                    {menu && (
                      <button type="button" aria-expanded={open} aria-label={`${open ? "Collapse" : "Expand"} ${item.name} menu`} onClick={() => setMobileSub(open ? null : slug)} className="flex h-11 w-11 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100">
                        <ChevronDown size={18} aria-hidden="true" className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
                      </button>
                    )}
                  </div>
                  {menu && open && (
                    <div className="mb-3 flex flex-col gap-4 rounded-2xl bg-slate-50 p-4">
                      <Link href={menu.href} onClick={closeAll} className="flex items-center justify-between rounded-xl bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-700">
                        <span>Shop all {menu.name}</span><ArrowRight size={16} aria-hidden="true" />
                      </Link>
                      {menu.side.map((l) => (
                        <Link key={l.label} href={l.href} onClick={closeAll} className="text-sm font-bold text-slate-800">{l.label}</Link>
                      ))}
                      {menu.columns.map((c) => <MenuColumn key={c.title} col={c} onNavigate={closeAll} />)}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="flex items-center gap-3 mt-4">
              <Link onClick={closeAll} href="/pages/wishlist" className="flex-1 py-3 bg-slate-100 text-slate-900 text-center text-xs font-black uppercase tracking-wider rounded-xl border border-slate-200 flex items-center justify-center gap-2">
                <Heart size={14} className="text-emerald-600" />
                <span>Wishlist ({wishlistCount})</span>
              </Link>
              <Link onClick={closeAll} href="/shop" className="flex-1 py-3 bg-emerald-500 text-white text-center text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-500/20">Shop All</Link>
            </div>
          </div>
        )}
      </div>
      {/* Desktop mega menu panel, full width under the header */}
      {openMenu && MEGA[openMenu] && (
        <div
          id={`mega-${openMenu}`}
          role="region"
          aria-label={`${MEGA[openMenu].name} menu`}
          onMouseEnter={() => openNow(openMenu)}
          className="hidden lg:block absolute left-0 right-0 top-full max-h-[calc(100dvh-9rem)] overflow-y-auto border-b border-slate-200 bg-white shadow-2xl shadow-slate-900/10"
        >
          <MegaPanel menu={MEGA[openMenu]} onNavigate={closeAll} />
        </div>
      )}
    </header>
  );
}
