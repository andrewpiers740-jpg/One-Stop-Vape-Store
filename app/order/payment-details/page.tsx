"use client";
import React, { Suspense } from "react";
import Link from "next/link";
import { usePortalOrder, CopyField, StatusPill } from "@/src/components/OrderPortal";
import { money, paymentTermsLines } from "@/lib/order";

function Inner() {
  const { id, token, data, error, loading } = usePortalOrder();
  if (loading) return <p className="text-slate-600">Loading your payment details…</p>;
  if (error || !data) return <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">{error || "Order not found."}</p>;
  const o = data.order;
  const confirmUrl = `/order/confirm-payment/?id=${encodeURIComponent(id)}&token=${encodeURIComponent(token)}`;

  if (!data.fields.length) {
    return (
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center">
        <p className="text-lg font-bold text-slate-900">We&apos;re preparing your payment details.</p>
        <p className="text-sm text-slate-600">Order <b className="font-mono text-slate-900">{o.orderNumber}</b> ({money(o.total)}). You&apos;ll get them by email or WhatsApp shortly — this page updates once they&apos;re ready.</p>
        <Link href={confirmUrl} className="text-sm font-bold text-emerald-600 underline">Already paid? Upload your receipt</Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div><p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Order</p><p className="font-mono text-xl font-black text-slate-900">{o.orderNumber}</p></div>
        <div className="text-right"><p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Amount due</p><p className="font-mono text-2xl font-black text-emerald-600">{money(o.total)}</p></div>
      </div>
      <StatusPill status={o.status} />
      {data.opening && <p className="text-sm text-slate-700">{data.opening}</p>}
      <div className="flex flex-col gap-3">{data.fields.map((f, i) => <CopyField key={i} label={f.label} value={f.value} />)}</div>
      {data.closing && <p className="text-sm text-slate-700">{data.closing}</p>}
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
        <p className="mb-2 text-xs font-black uppercase tracking-widest text-emerald-600">Payment terms</p>
        <ol className="list-decimal space-y-1 pl-5 text-xs text-slate-700">{paymentTermsLines().map((l) => <li key={l}>{l}</li>)}</ol>
      </div>
      <Link href={confirmUrl} className="rounded-full bg-emerald-500 py-4 text-center text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-emerald-500/25 hover:bg-emerald-400">I&apos;ve paid — upload my receipt</Link>
    </div>
  );
}

export default function PaymentDetailsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="mb-8 text-3xl font-black uppercase tracking-tighter text-slate-900 sm:text-4xl">Payment details</h1>
      <Suspense fallback={<p className="text-slate-600">Loading…</p>}><Inner /></Suspense>
    </div>
  );
}
