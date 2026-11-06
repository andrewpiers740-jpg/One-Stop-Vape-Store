import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { SITE } from "@/src/config/site";
import ThankYouOrderClient from "@/src/components/ThankYouOrderClient";

export const metadata = {
  title: "Order Placed | One Stop Vape Store",
  robots: { index: false, follow: true },
};

export default function ThankYouOrderPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-24 flex flex-col items-center text-center gap-8">
      <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
        <CheckCircle2 size={40} />
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic">
          Order Received
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
          Thank you for choosing One Stop Vape Store. Your order has been registered in our system.
        </p>
      </div>

      <div className="w-full p-6 rounded-2xl bg-slate-100/60 border border-slate-200 text-center flex flex-col gap-2">
        <p className="text-xs font-black uppercase tracking-widest text-emerald-600">Next Step</p>
        <p className="text-sm text-slate-700">
          Please watch your inbox for our <strong>payment-details email</strong>. You will receive an email shortly containing your customized payment instructions.
        </p>
      </div>

      <ThankYouOrderClient />

      <Link
        href="/shop"
        className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-black uppercase tracking-widest rounded-full transition-all flex items-center gap-2"
      >
        Continue Shopping <ArrowRight size={16} />
      </Link>
    </div>
  );
}
