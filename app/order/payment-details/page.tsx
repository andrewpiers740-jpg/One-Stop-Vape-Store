"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { parsePaymentDetail } from "@/lib/order";
import { Check, Copy, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { SITE } from "@/src/config/site";

const MOCK_ORDER = {
  id: "OSV-10104",
  amount: 245.00,
  details: "Bank: Chase Bank\nAccount: One Stop Vape LLC\nRouting: 123456789\nAccount Number: 987654321"
};

function OrderPaymentDetailsContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id") || MOCK_ORDER.id;
  const [copied, setCopied] = React.useState<string | null>(null);

  const fields = parsePaymentDetail(MOCK_ORDER.details);

  const handleCopy = (val: string, label: string) => {
    navigator.clipboard.writeText(val);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-12 md:py-24 flex flex-col gap-10">
      
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
           <ShieldCheck size={32} />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic">Secure Payment</h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em]">Order {orderId} · Verification Required</p>
        </div>
      </div>

      <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-8 md:p-12 flex flex-col gap-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
        
        <div className="flex flex-col items-center text-center gap-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Amount Due</p>
          <p className="text-5xl font-black text-white font-mono tracking-tighter">${MOCK_ORDER.amount.toFixed(2)}</p>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Copy Payment Details</p>
          <div className="flex flex-col gap-3">
            {fields.map((f: any, i: number) => (
              <button 
                key={i} 
                onClick={() => handleCopy(f.value, f.label)}
                className="group p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500 active:scale-[0.98] transition-all flex items-center justify-between text-left"
              >
                <div className="flex flex-col gap-0.5 overflow-hidden pr-4">
                   <span className="text-[9px] font-black uppercase text-zinc-600 group-hover:text-emerald-500 transition-colors">{f.label}</span>
                   <span className="text-base font-bold text-white font-mono truncate">{f.value}</span>
                </div>
                <div className="shrink-0 w-10 h-10 rounded-xl bg-black border border-zinc-800 flex items-center justify-center text-zinc-600 group-hover:text-emerald-500 transition-colors">
                   {copied === f.label ? <Check size={18} /> : <Copy size={18} />}
                </div>
              </button>
            ))}
          </div>
        </div>

        <Link 
          href={`/order/confirm-payment?id=${orderId}`}
          className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/10"
        >
          I&apos;ve Paid — Upload Receipt
          <Zap size={18} />
        </Link>
      </div>

      <div className="flex flex-col gap-4 p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800 text-center">
         <h3 className="text-xs font-black text-white uppercase tracking-widest">Next Steps</h3>
         <p className="text-zinc-500 text-sm leading-relaxed">
           Once you upload your screenshot, our team in Los Angeles will verify the transaction and update your order status. You will receive a tracking number via email.
         </p>
      </div>

      <div className="flex justify-center">
         <Link href="/" className="text-[10px] font-black uppercase text-zinc-700 hover:text-zinc-400 tracking-widest transition-colors">
           Back to Store
         </Link>
      </div>

    </div>
  );
}

export default function OrderPaymentDetails() {
  return (
    <React.Suspense fallback={<div className="max-w-xl mx-auto px-6 py-24 text-center text-zinc-500">Loading order payment details...</div>}>
      <OrderPaymentDetailsContent />
    </React.Suspense>
  );
}
