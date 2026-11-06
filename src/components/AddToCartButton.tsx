"use client";
import React from "react";
import Link from "next/link";
import { ShoppingCart, Check, Minus, Plus } from "lucide-react";
import { useCart } from "@/src/components/CartProvider";

type P = { slug: string; title: string; brand?: string; category?: string; price: number; image?: string };

// Quantity stepper + "Add to cart". `compact` is the product-tile variant; the default is the product-page variant.
export default function AddToCartButton({ product, compact = false }: { product: P; compact?: boolean }) {
  const { add } = useCart();
  const [qty, setQty] = React.useState(1);
  const [added, setAdded] = React.useState(false);

  const onAdd = () => {
    add(product, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  };
  const onType = (v: string) => {
    const n = parseInt(v.replace(/\D/g, ""), 10);
    setQty(Number.isFinite(n) ? Math.max(1, Math.min(99, n)) : 1);
  };

  const stepper = (size: "sm" | "md") => {
    const btn = size === "sm" ? "h-9 w-9" : "h-11 w-11";
    return (
      <div className="inline-flex items-center rounded-full border border-slate-300 bg-white" role="group" aria-label={`Quantity for ${product.title}`}>
        <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className={`${btn} flex items-center justify-center text-slate-600 hover:text-slate-900`}><Minus size={size === "sm" ? 14 : 16} /></button>
        <input
          inputMode="numeric"
          aria-label="Quantity"
          value={qty}
          onChange={(e) => onType(e.target.value)}
          className={`${size === "sm" ? "w-8 text-sm" : "w-10"} border-0 bg-transparent p-0 text-center font-mono font-bold text-slate-900 focus:outline-none`}
        />
        <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(99, q + 1))} className={`${btn} flex items-center justify-center text-slate-600 hover:text-slate-900`}><Plus size={size === "sm" ? 14 : 16} /></button>
      </div>
    );
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        {stepper("sm")}
        <button
          type="button"
          onClick={onAdd}
          aria-label={`Add ${qty} × ${product.title} to cart`}
          className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full bg-emerald-500 px-2 text-[11px] font-black uppercase tracking-wider text-white transition-colors hover:bg-emerald-600"
        >
          {added ? <Check size={14} /> : <ShoppingCart size={14} />} {added ? "Added" : "Add"}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        {stepper("md")}
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-full bg-emerald-500 py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-emerald-500/25 transition-colors hover:bg-emerald-600"
        >
          {added ? <Check size={18} /> : <ShoppingCart size={18} />} {added ? "Added to cart" : "Add to cart"}
        </button>
      </div>
      {added && (
        <Link href="/cart/" className="text-center text-xs font-bold uppercase tracking-widest text-emerald-700 hover:text-emerald-800">
          View cart &amp; checkout →
        </Link>
      )}
    </div>
  );
}
