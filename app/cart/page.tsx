import React from "react";
import { SITE } from "@/src/config/site";
import Link from "next/link";

export const metadata = {
  title: `Cart | ${SITE.name}`,
  description: `View items in your cart at ${SITE.name}.`,
};

export default function CartPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-8">Shopping Cart</h1>
      <p className="text-zinc-400 mb-8">Your cart is currently empty.</p>
      <Link href="/shop" className="text-emerald-500 hover:text-emerald-400 font-bold uppercase tracking-widest text-sm transition-colors">
        Continue Shopping
      </Link>
    </div>
  );
}
