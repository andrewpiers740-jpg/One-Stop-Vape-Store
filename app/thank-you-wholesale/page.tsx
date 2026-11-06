import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Application Received | One Stop Vape Store",
  robots: { index: false, follow: true },
};

export default function ThankYouWholesalePage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-24 flex flex-col items-center text-center gap-8">
      <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
        <CheckCircle2 size={40} />
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter italic">
          Application Received
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
          Our wholesale department is reviewing your company details and tax ID. An account manager will reach out with tier pricing sheets shortly.
        </p>
      </div>

      <Link
        href="/shop"
        className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-black uppercase tracking-widest rounded-full transition-all flex items-center gap-2"
      >
        Explore Catalog <ArrowRight size={16} />
      </Link>
    </div>
  );
}
