import React from "react";
import { ShoppingCart, MessageSquare, TrendingUp, Users } from "lucide-react";

export default function AdminHub() {
  const stats = [
    { name: "Live Orders", value: "24", icon: ShoppingCart, change: "+12%", color: "text-emerald-500" },
    { name: "Total Revenue", value: "$4,850", icon: TrendingUp, change: "+8%", color: "text-white" },
    { name: "Enquiries", value: "8", icon: MessageSquare, change: "New", color: "text-emerald-500" },
    { name: "Customers", value: "142", icon: Users, change: "+5", color: "text-white" },
  ];

  return (
    <div className="flex flex-col gap-12 max-w-6xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Dashboard</h1>
        <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Real-time store overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="p-8 rounded-[2rem] bg-zinc-900 border border-zinc-800 flex flex-col gap-4 relative overflow-hidden group hover:border-emerald-500/50 transition-all duration-500">
            <div className={`w-12 h-12 rounded-2xl bg-zinc-950 flex items-center justify-center ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div className="flex flex-col">
              <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">{stat.name}</p>
              <p className="text-3xl font-black text-white font-mono tabular-nums leading-none mt-1">{stat.value}</p>
            </div>
            <div className="absolute top-8 right-8 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded bg-zinc-950 text-zinc-400 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
               {stat.change}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
         <div className="flex flex-col gap-6">
            <h2 className="text-xs font-black uppercase tracking-widest text-white border-b border-zinc-900 pb-2 flex justify-between items-center">
              Recent Orders
              <button className="text-[10px] text-zinc-500 hover:text-emerald-500 transition-colors underline">View All</button>
            </h2>
            <div className="flex flex-col gap-4">
              {[1,2,3].map(i => (
                <div key={i} className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-between group cursor-pointer hover:bg-zinc-900 transition-all">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-bold text-white">#OSV-10{i}04</p>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold">2 items · $245.00</p>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    Awaiting Payment
                  </span>
                </div>
              ))}
            </div>
         </div>

         <div className="flex flex-col gap-6">
            <h2 className="text-xs font-black uppercase tracking-widest text-white border-b border-zinc-900 pb-2 flex justify-between items-center">
              Active Enquiries
              <button className="text-[10px] text-zinc-500 hover:text-emerald-500 transition-colors underline">View All</button>
            </h2>
            <div className="flex flex-col gap-4">
              {[1,2].map(i => (
                <div key={i} className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex flex-col gap-3 hover:bg-zinc-900 transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-white uppercase tracking-tight">Wholesale Inquiry</p>
                    <p className="text-[10px] text-zinc-600 font-mono">2h ago</p>
                  </div>
                  <p className="text-xs text-zinc-500 line-clamp-1 italic">&ldquo;Hello, I am interested in bulk pricing for the Geek Bar Pulse X...&rdquo;</p>
                </div>
              ))}
            </div>
         </div>
      </div>
    </div>
  );
}
