"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, X } from "lucide-react";

// "Recent purchase" notification driven by REAL confirmed orders (see /api/recent-orders). It shows nothing until
// there are genuine orders, and never invents names, places or products.
function ago(iso) {
  const m = Math.max(1, Math.round((Date.now() - Date.parse(iso)) / 60000));
  if (m < 60) return `${m} minute${m === 1 ? "" : "s"} ago`;
  const h = Math.round(m / 60);
  if (h < 48) return `${h} hour${h === 1 ? "" : "s"} ago`;
  return `${Math.round(h / 24)} days ago`;
}

export default function SalesPopup() {
  const [sales, setSales] = useState([]);
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try { if (sessionStorage.getItem("osv-sales-dismissed")) setDismissed(true); } catch { /* ignore */ }
    fetch("/api/recent-orders/").then((r) => r.json()).then((d) => setSales(d.sales || [])).catch(() => {});
  }, []);

  useEffect(() => {
    if (dismissed || !sales.length) return undefined;
    const first = setTimeout(() => setVisible(true), 6000);
    return () => clearTimeout(first);
  }, [dismissed, sales.length]);

  useEffect(() => {
    if (dismissed || !sales.length || !visible) return undefined;
    const hide = setTimeout(() => setVisible(false), 7000);
    return () => clearTimeout(hide);
  }, [visible, dismissed, sales.length, i]);

  useEffect(() => {
    if (dismissed || !sales.length) return undefined;
    const next = setInterval(() => { setI((n) => (n + 1) % sales.length); setVisible(true); }, 22000);
    return () => clearInterval(next);
  }, [dismissed, sales.length]);

  if (dismissed || !sales.length || !visible) return null;
  const s = sales[i % sales.length];
  return (
    <div role="status" aria-live="polite" className="fixed bottom-4 left-4 z-40 flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 pr-9 shadow-2xl shadow-slate-900/10 sm:max-w-sm">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white">
        {s.image ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={s.image} alt="" width={48} height={48} className="h-full w-full object-contain p-1" /> : <ShoppingBag size={20} className="text-emerald-600" />}
      </div>
      <div className="min-w-0 text-xs leading-snug">
        <p className="text-slate-600">A customer in <b className="text-slate-900">{s.state}</b> bought</p>
        <p className="truncate font-bold text-slate-900">{s.qty > 1 ? `${s.qty} × ` : ""}{s.slug ? <Link href={`/shop/${s.category}/${s.slug}/`} className="hover:text-emerald-600">{s.title}</Link> : s.title}</p>
        <p className="text-[11px] text-slate-500">{ago(s.at)}</p>
      </div>
      <button type="button" aria-label="Dismiss notification" onClick={() => { setDismissed(true); try { sessionStorage.setItem("osv-sales-dismissed", "1"); } catch { /* ignore */ } }} className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700"><X size={14} /></button>
    </div>
  );
}
