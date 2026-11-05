"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { Check, Upload, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SITE } from "@/src/config/site";

function ConfirmPaymentContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id") || "---";
  const [status, setStatus] = React.useState("idle"); // idle, uploading, success

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("uploading");
    setTimeout(() => {
      setStatus("success");
    }, 2000);
  };

  if (status === "success") {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 flex flex-col items-center text-center gap-8">
        <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center text-black shadow-2xl shadow-emerald-500/20">
          <Check size={48} strokeWidth={3} />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">Receipt Received</h1>
          <p className="text-zinc-500 leading-relaxed max-w-sm">
            Thank you. Your payment for Order <span className="text-white font-bold">{orderId}</span> is now under review. We will notify you once verified.
          </p>
        </div>
        <Link href="/" className="px-12 py-5 bg-zinc-900 hover:bg-zinc-800 text-white font-black uppercase tracking-widest rounded-2xl transition-all border border-zinc-800 mt-8">
          Return to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-12 md:py-24 flex flex-col gap-10">
      
      <div className="flex flex-col gap-4">
        <Link href={`/order/payment-details?id=${orderId}`} className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-zinc-500 hover:text-emerald-500 transition-colors tracking-widest">
           <ArrowLeft size={12} />
           Back to details
        </Link>
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic leading-none">Confirm Payment</h1>
        <p className="text-zinc-500 text-sm">Please upload a screenshot of your transaction confirmation.</p>
      </div>

      <form onSubmit={handleUpload} className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-8 md:p-12 flex flex-col gap-8 shadow-2xl relative">
        <div className="flex flex-col gap-6">
           <div className="flex flex-col gap-2">
             <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Order Reference</label>
             <input type="text" readOnly value={orderId} className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 text-zinc-400 font-mono focus:outline-none cursor-default" />
           </div>

           <div className="flex flex-col gap-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1 text-center">Transaction Screenshot</label>
              <div className="relative aspect-video rounded-3xl border-2 border-dashed border-zinc-800 bg-zinc-900/50 flex flex-col items-center justify-center text-center p-8 group hover:border-emerald-500/50 transition-all cursor-pointer">
                 <input type="file" required className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                 <Upload size={32} className="text-zinc-700 group-hover:text-emerald-500 transition-colors mb-4" />
                 <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest group-hover:text-white transition-colors">Tap to select image</p>
                 <p className="text-[9px] text-zinc-700 mt-2 uppercase font-black">JPEG, PNG, or WebP</p>
              </div>
           </div>
        </div>

        <button 
          disabled={status === "uploading"}
          className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 disabled:text-zinc-500 text-black font-black uppercase tracking-widest rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/10"
        >
          {status === "uploading" ? "Uploading..." : <>Submit for Verification <ShieldCheck size={18} /></>}
        </button>

        <p className="text-[10px] text-zinc-600 text-center uppercase font-bold tracking-widest">
           Secure SSL encrypted transmission
        </p>
      </form>

    </div>
  );
}

export default function ConfirmPayment() {
  return (
    <React.Suspense fallback={<div className="max-w-xl mx-auto px-6 py-24 text-center text-zinc-500">Loading payment form...</div>}>
      <ConfirmPaymentContent />
    </React.Suspense>
  );
}
