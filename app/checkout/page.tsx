import React from "react";
import { SITE } from "@/src/config/site";

export const metadata = {
  title: `Checkout | ${SITE.name}`,
  description: `Complete your purchase at ${SITE.name}.`,
};

export default function CheckoutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-8">Checkout</h1>
      <p className="text-zinc-400">Please complete your shipping and payment details.</p>
    </div>
  );
}
