"use client";
import React from "react";
import { Mail, MessageSquare, ArrowUpRight, Search } from "lucide-react";
import Link from "next/link";

export default function AdminEnquiries() {
  const enquiries = [
    { id: "ENQ-8821", name: "Sarah Chen", email: "sarah@tech.co", type: "Wholesale", message: "Interested in bulk order of 500 Geek Bars...", status: "New", date: "45m ago" },
    { id: "ENQ-8820", name: "Mike Ross", email: "mike.r@gmail.com", type: "Support", message: "My device isn't turning on after charging...", status: "Replied", date: "3h ago" },
    { id: "ENQ-8819", name: "Emma Woods", email: "emma@vapeworld.com", type: "Wholesale", message: "Do you ship to New York? Looking for pricing list.", status: "New", date: "6h ago" },
  ];

  return (
    <div className="flex flex-col gap-12 max-w-6xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Enquiries</h1>
        <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Customer and wholesale communications</p>
      </div>

      <div className="flex flex-col gap-6">
        {enquiries.map((enq) => (
          <div key={enq.id} className="p-8 rounded-[2rem] bg-zinc-950 border border-zinc-900 flex flex-col md:flex-row gap-8 items-start md:items-center relative group hover:border-emerald-500/50 transition-all duration-500">
            <div className="flex flex-col gap-1 shrink-0 w-full md:w-48">
              <span className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">{enq.type}</span>
              <p className="text-lg font-bold text-white tracking-tight">{enq.name}</p>
              <p className="text-[10px] text-zinc-600 font-mono mt-1 uppercase font-bold">{enq.date}</p>
            </div>
            
            <div className="flex-grow">
               <p className="text-sm text-zinc-400 line-clamp-2 italic leading-relaxed">
                 &ldquo;{enq.message}&rdquo;
               </p>
            </div>

            <div className="flex items-center gap-4 shrink-0 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-zinc-900">
               <span className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                 enq.status === "New" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-zinc-900 text-zinc-500 border-zinc-800"
               }`}>
                 {enq.status}
               </span>
               <Link 
                 href={`/admin/reply-enquiry?id=${enq.id}`}
                 className="px-6 py-3 bg-white hover:bg-emerald-500 hover:text-black text-black text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center gap-2"
               >
                 Reply <ArrowUpRight size={14} />
               </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
