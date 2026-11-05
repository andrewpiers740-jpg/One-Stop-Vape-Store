import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Message Received | One Stop Vape Store",
  robots: { index: false, follow: true },
};

export default function ThankYouContactPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-24 flex flex-col items-center text-center gap-8">
      <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
        <CheckCircle2 size={40} />
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic">
          Message Sent
        </h1>
        <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
          Thank you for reaching out. A representative from our Los Angeles support team will get back to you within 1-2 business hours.
        </p>
      </div>

      <Link
        href="/"
        className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest rounded-full transition-all flex items-center gap-2"
      >
        Return to Home <ArrowRight size={16} />
      </Link>
    </div>
  );
}
