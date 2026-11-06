"use client";
import React from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/src/components/CartProvider";
import { SITE } from "@/src/config/site";
import SmartImage from "@/src/components/SmartImage";
import { money } from "@/lib/order";

export default function CartClient() {
  const { items, subtotal, setQty, remove, ready } = useCart();
  const { minOrder, freeShippingThreshold, flatShippingFee } = SITE.order;

  if (!ready) return <p className="text-slate-500">Loading your cart…</p>;
  if (!items.length) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center">
        <p className="text-slate-600 mb-6">Your cart is currently empty.</p>
        <Link href="/shop" className="inline-block rounded-full bg-emerald-500 px-8 py-3.5 text-xs font-black uppercase tracking-widest text-white hover:bg-emerald-400">Continue shopping</Link>
      </div>
    );
  }

  const belowMin = subtotal < minOrder;
  const shipping = subtotal >= freeShippingThreshold ? 0 : flatShippingFee;
  const toFree = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">
      <ul className="flex flex-col gap-4">
        {items.map((i) => (
          <li key={i.slug} className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="h-24 w-24 shrink-0 rounded-xl bg-white p-2 flex items-center justify-center">
              <SmartImage src={i.image || ""} alt={i.title} className="h-full w-full object-contain" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <Link href={`/shop/${i.category || "all"}/${i.slug}/`} className="line-clamp-2 text-sm font-bold text-slate-900 hover:text-emerald-600">{i.title}</Link>
              <span className="text-xs text-slate-500">{i.brand}</span>
              <div className="mt-auto flex items-center justify-between gap-3">
                <div className="inline-flex items-center rounded-full border border-slate-300 bg-slate-100">
                  <button type="button" aria-label={`Decrease quantity of ${i.title}`} onClick={() => setQty(i.slug, i.qty - 1)} className="flex h-10 w-10 items-center justify-center text-slate-700 hover:text-slate-900"><Minus size={15} /></button>
                  <span className="w-8 text-center font-mono text-sm font-bold" aria-live="polite">{i.qty}</span>
                  <button type="button" aria-label={`Increase quantity of ${i.title}`} onClick={() => setQty(i.slug, i.qty + 1)} className="flex h-10 w-10 items-center justify-center text-slate-700 hover:text-slate-900"><Plus size={15} /></button>
                </div>
                <span className="font-mono text-base font-bold text-slate-900">{money(i.price * i.qty)}</span>
                <button type="button" aria-label={`Remove ${i.title}`} onClick={() => remove(i.slug)} className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-red-700"><Trash2 size={16} /></button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside className="sticky top-28 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-sm font-black uppercase tracking-widest text-emerald-600">Order summary</h2>
        <dl className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between"><dt className="text-slate-600">Subtotal</dt><dd className="font-mono font-bold">{money(subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-slate-600">Shipping</dt><dd className="font-mono font-bold">{shipping ? money(shipping) : "Free"}</dd></div>
          <div className="mt-1 flex justify-between border-t border-slate-200 pt-3 text-base"><dt className="font-bold">Estimated total</dt><dd className="font-mono font-black">{money(subtotal + shipping)}</dd></div>
        </dl>
        <p className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-3 text-xs text-emerald-600">
          Pay with crypto or a gift card and save {SITE.order.cryptoDiscount}% — applied at checkout.
        </p>
        {toFree > 0 && !belowMin && (
          <p className="flex items-center gap-2 text-xs text-slate-600"><Truck size={14} className="text-emerald-600" /> Add {money(toFree)} more for free shipping.</p>
        )}
        {belowMin && (
          <p role="alert" className="rounded-xl border border-amber-300 bg-amber-500/10 p-3 text-xs text-amber-700">
            The minimum order is {money(minOrder)}. Add {money(minOrder - subtotal)} more to check out.
          </p>
        )}
        {belowMin ? (
          <span aria-disabled="true" className="rounded-full bg-slate-200 py-4 text-center text-xs font-black uppercase tracking-widest text-slate-500">Checkout</span>
        ) : (
          <Link href="/checkout/" className="rounded-full bg-emerald-500 py-4 text-center text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-emerald-500/25 hover:bg-emerald-400">Proceed to checkout</Link>
        )}
        <Link href="/shop" className="text-center text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-slate-900">Continue shopping</Link>
        <p className="flex items-center gap-2 text-[11px] text-slate-500"><ShieldCheck size={14} /> Adults 21+ only · signature on delivery</p>
      </aside>
    </div>
  );
}
