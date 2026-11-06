import React from "react";
import { SITE } from "@/src/config/site";
import CartClient from "@/src/components/CartClient";

export const metadata = {
  title: `Cart | ${SITE.name}`,
  description: `Review the items in your cart at ${SITE.name}, then check out with crypto, gift cards, Cash App, Apple Pay or Chime.`,
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-8">Shopping Cart</h1>
      <CartClient />
    </div>
  );
}
