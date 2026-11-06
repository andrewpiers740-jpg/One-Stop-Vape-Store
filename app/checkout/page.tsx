import React from "react";
import { SITE } from "@/src/config/site";
import CheckoutClient from "@/src/components/CheckoutClient";

export const metadata = {
  title: `Checkout | ${SITE.name}`,
  description: `Secure checkout at ${SITE.name}. Pay with crypto, gift cards, Cash App, Apple Pay or Chime.`,
  robots: { index: false, follow: true },
};

export default function CheckoutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-8">Checkout</h1>
      <CheckoutClient />
    </div>
  );
}
