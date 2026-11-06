"use client";
import React from "react";
import Link from "next/link";
import { ShoppingCart, MessageSquare, Clock, BadgeCheck, AlertTriangle } from "lucide-react";
import { useAdmin } from "@/src/components/admin/AdminClientShell";
import { money, statusLabel } from "@/lib/order";

export default function AdminHub() {
  const { api } = useAdmin();
  const [orders, setOrders] = React.useState<any[]>([]);
  const [enq, setEnq] = React.useState<any[]>([]);
  const [persistent, setPersistent] = React.useState(true);
  const [err, setErr] = React.useState("");

  React.useEffect(() => {
    (async () => {
      try {
        const o = await api("/api/admin/orders/");
        setOrders(o.orders); setPersistent(o.persistent);
        setEnq((await api("/api/admin/enquiries/")).enquiries);
      } catch (e) { setErr(e instanceof Error ? e.message : "Failed to load"); }
    })();
  }, [api]);

  const waiting = orders.filter((o) => ["pending", "payment-submitted", "payment-detected"].includes(o.status));
  const stats = [
    { name: "Orders", value: orders.length, icon: ShoppingCart, href: "/admin/orders" },
    { name: "Need action", value: waiting.length, icon: Clock, href: "/admin/orders" },
    { name: "Paid", value: orders.filter((o) => o.status === "payment-confirmed" || o.status === "shipped").length, icon: BadgeCheck, href: "/admin/orders" },
    { name: "New enquiries", value: enq.filter((e) => e.status === "new").length, icon: MessageSquare, href: "/admin/enquiries" },
  ];

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      <h1 className="text-3xl font-black uppercase tracking-tighter text-white md:text-4xl">Dashboard</h1>
      {!persistent && <p className="flex items-start gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-300"><AlertTriangle size={18} className="mt-0.5 shrink-0" /> Storage is not connected: orders are held in temporary memory. Add an Upstash Redis database in Vercel → Storage so orders persist.</p>}
      {err && <p role="alert" className="text-red-400">{err}</p>}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.name} href={s.href} className="flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-950 p-5 hover:border-emerald-500/50">
            <s.icon size={20} className="text-emerald-400" />
            <span className="font-mono text-3xl font-black text-white">{s.value}</span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">{s.name}</span>
          </Link>
        ))}
      </div>
      <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-emerald-400">Recent orders</h2>
        {orders.length === 0 ? <p className="text-sm text-zinc-500">No orders yet.</p> : (
          <ul className="divide-y divide-zinc-900">
            {orders.slice(0, 8).map((o) => (
              <li key={o.orderNumber}>
                <Link href={`/admin/orders/?id=${o.orderNumber}`} className="flex flex-wrap items-center justify-between gap-2 py-3 hover:text-emerald-400">
                  <span className="font-mono font-bold">{o.orderNumber}</span>
                  <span className="text-sm text-zinc-400">{o.customerName} · {o.paymentLabel}</span>
                  <span className="text-xs text-zinc-500">{statusLabel(o.status)}</span>
                  <span className="font-mono">{money(o.total)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
