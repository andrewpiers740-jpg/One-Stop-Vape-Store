"use client";
import React from "react";
import { money } from "@/lib/order";
import { Search, Filter, MoreVertical, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function AdminOrders() {
  const [filter, setFilter] = React.useState("all");

  const orders = [
    { id: "OSV-10104", customer: "Alex Rivers", total: 245.00, status: "Awaiting Payment", date: "2h ago", items: 2 },
    { id: "OSV-10103", customer: "Jordan Smith", total: 112.50, status: "Payment Confirmed", date: "5h ago", items: 1 },
    { id: "OSV-10102", customer: "Casey Lee", total: 890.00, status: "Dispatched", date: "1d ago", items: 12 },
    { id: "OSV-10101", customer: "Riley Vane", total: 156.20, status: "Cancelled", date: "2d ago", items: 3 },
  ];

  return (
    <div className="flex flex-col gap-12 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Orders</h1>
          <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Manage sales and logistics</p>
        </div>
        <div className="flex items-center gap-4 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
           {["all", "pending", "confirmed", "shipped"].map(f => (
             <button 
               key={f} 
               onClick={() => setFilter(f)}
               className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${filter === f ? "bg-emerald-500 text-black shadow-lg" : "text-zinc-500 hover:text-white"}`}
             >
               {f}
             </button>
           ))}
        </div>
      </div>

      <div className="bg-zinc-950 border border-zinc-900 rounded-[2rem] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-900 bg-zinc-900/30 text-[10px] font-black uppercase tracking-widest text-zinc-500">
              <th className="px-8 py-6">Order ID</th>
              <th className="px-8 py-6">Customer</th>
              <th className="px-8 py-6">Status</th>
              <th className="px-8 py-6 text-right">Total</th>
              <th className="px-8 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-zinc-900 hover:bg-zinc-900/20 transition-colors group">
                <td className="px-8 py-6">
                  <span className="text-sm font-bold text-white font-mono">{order.id}</span>
                  <p className="text-[10px] text-zinc-600 font-mono mt-1">{order.date}</p>
                </td>
                <td className="px-8 py-6">
                  <span className="text-sm font-medium text-zinc-300">{order.customer}</span>
                </td>
                <td className="px-8 py-6">
                   <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded border ${
                     order.status === "Awaiting Payment" ? "bg-amber-500/5 text-amber-500 border-amber-500/20" :
                     order.status === "Payment Confirmed" ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/20" :
                     order.status === "Dispatched" ? "bg-blue-500/5 text-blue-500 border-blue-500/20" :
                     "bg-zinc-500/5 text-zinc-500 border-zinc-500/20"
                   }`}>
                     {order.status}
                   </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <span className="text-sm font-bold text-white font-mono tabular-nums">{money(order.total)}</span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/orders/${order.id}`} className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-emerald-500 hover:bg-emerald-500/10 transition-all">
                      <ExternalLink size={16} />
                    </Link>
                    <button className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white transition-all">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
