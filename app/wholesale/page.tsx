import React from "react";
import { SITE } from "@/src/config/site";
import { BadgeCheck, Building2, Globe2, Mail, MessageSquare, Scale } from "lucide-react";

export const metadata = {
  title: "Wholesale & B2B Inquiries | One Stop Vape Store",
  description: "Get bulk pricing and exclusive distributor rates for Geek Bar, Lost Mary, and more. Direct supply from Los Angeles for vape shops across the US.",
};

export default function WholesalePage() {
  return (
    <div className="flex flex-col gap-24 py-12 pb-24">
      
      <section className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-8">
          <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em]">Business Solutions</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase leading-[0.9]">
            Bulk Supply. <br />
            <span className="text-emerald-500">Unrivaled Scale.</span>
          </h1>
          <p className="text-zinc-500 text-lg leading-relaxed max-w-xl">
            One Stop Vape Store provides volume-based pricing for registered retailers and distributors. From master cases of Geek Bar Pulse X to bulk nicotine salt supplies, we are your primary terminal for verified authentic hardware.
          </p>
          <div className="flex flex-col gap-4">
             <div className="flex items-center gap-4 text-white font-bold tracking-tight">
               <BadgeCheck className="text-emerald-500" />
               Tax-Exempt Ordering for Registered Businesses
             </div>
             <div className="flex items-center gap-4 text-white font-bold tracking-tight">
               <Globe2 className="text-emerald-500" />
               Same-Day Dispatch from Los Angeles HQ
             </div>
             <div className="flex items-center gap-4 text-white font-bold tracking-tight">
               <Scale className="text-emerald-500" />
               Flexible Tiers: 100 to 50,000+ Units
             </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-10 rounded-[2.5rem] shadow-2xl relative">
          <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-8">Wholesale Inquiry</h2>
          <form className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Company Name</label>
                <input type="text" className="bg-black border border-zinc-800 rounded-xl px-4 py-4 focus:border-emerald-500 outline-none text-white transition-all" placeholder="Vape Shop Inc." />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Business License / Tax ID</label>
                <input type="text" className="bg-black border border-zinc-800 rounded-xl px-4 py-4 focus:border-emerald-500 outline-none text-white transition-all" placeholder="EIN / Resale #" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Contact Name</label>
              <input type="text" className="bg-black border border-zinc-800 rounded-xl px-4 py-4 focus:border-emerald-500 outline-none text-white transition-all" placeholder="Full Name" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Estimated Monthly Volume</label>
              <select className="bg-black border border-zinc-800 rounded-xl px-4 py-4 focus:border-emerald-500 outline-none text-white transition-all appearance-none cursor-pointer">
                <option>Select volume...</option>
                <option>$1,000 - $5,000</option>
                <option>$5,000 - $20,000</option>
                <option>$20,000+</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Message / Requirements</label>
              <textarea rows={4} className="bg-black border border-zinc-800 rounded-xl px-4 py-4 focus:border-emerald-500 outline-none text-white transition-all resize-none" placeholder="Brands or specific quantities required..."></textarea>
            </div>
            <button className="w-full py-5 bg-white hover:bg-emerald-500 hover:text-black text-black font-black uppercase tracking-widest rounded-xl transition-all duration-300">
              Submit Application
            </button>
          </form>
          <div className="absolute -top-6 -right-6 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-black shadow-lg shadow-emerald-500/20">
             <Building2 size={24} />
          </div>
        </div>
      </section>

      <section className="bg-emerald-500 py-24 overflow-hidden relative">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-black text-black/5 pointer-events-none select-none">WHOLESALE</div>
         <div className="max-w-[1440px] mx-auto px-6 relative z-10 flex flex-col items-center text-center gap-10">
            <h2 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter leading-none">Prefer Direct Contact?</h2>
            <div className="flex flex-col md:flex-row items-center gap-6">
               <a href={`mailto:${SITE.contact.email}`} className="px-10 py-5 bg-black text-white font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform flex items-center gap-3">
                 <Mail size={20} />
                 Email Department
               </a>
               <a href={`https://wa.me/${SITE.contact.whatsapp}`} className="px-10 py-5 bg-zinc-900/10 border-2 border-black text-black font-black uppercase tracking-widest rounded-full hover:bg-black hover:text-white transition-all flex items-center gap-3">
                 <MessageSquare size={20} />
                 WhatsApp Business
               </a>
            </div>
         </div>
      </section>

    </div>
  );
}
