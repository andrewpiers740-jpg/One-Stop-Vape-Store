import React from "react";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-9xl font-black text-zinc-900 leading-none">404</h1>
        <p className="text-2xl font-black text-slate-900 uppercase tracking-tighter -mt-8">Terminal Offline</p>
      </div>
      <p className="text-slate-500 max-w-xs mx-auto text-sm leading-relaxed">
        The requested resource could not be found or has been moved to a different sector.
      </p>
      <Link 
        href="/"
        className="px-10 py-4 bg-emerald-500 text-white font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-transform flex items-center gap-3"
      >
        <MoveLeft size={18} />
        Back to Terminal
      </Link>
    </div>
  );
}
