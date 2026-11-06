"use client";
import React, { Suspense } from "react";
import Link from "next/link";
import { usePortalOrder, ProofUploader, CryptoStatus, StatusPill, ExternalBtn, CopyField } from "@/src/components/OrderPortal";
import { money } from "@/lib/order";
import { waPaymentConfirmationLink } from "@/lib/whatsapp";
import { SITE } from "@/src/config/site";
import { MessageCircle } from "lucide-react";

function Inner() {
  const { id, token, data, error, loading, reload } = usePortalOrder();
  if (loading) return <p className="text-slate-600">Loading your order…</p>;
  if (error || !data) return <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">{error || "Order not found."}</p>;
  const o = data.order;
  const kind = o.paymentKind as string;
  const done = o.status === "payment-confirmed" || o.status === "shipped";
  const detailsUrl = `/order/payment-details/?id=${encodeURIComponent(id)}&token=${encodeURIComponent(token)}`;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Order</p>
          <p className="font-mono text-xl font-black text-slate-900">{o.orderNumber}</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-xl font-black text-emerald-600">{money(o.total)}</p>
          <StatusPill status={o.status} />
        </div>
      </div>

      {kind === "crypto" && (
        <>
          <section aria-labelledby="pay-send" className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 id="pay-send" className="text-sm font-black uppercase tracking-widest text-emerald-600">Your crypto payment</h2>
            <CopyField label={`Send (${o.cryptoToken})`} value={`${o.cryptoAmount} ${o.cryptoToken}`} />
            <CopyField label={`Network`} value={o.cryptoNetwork} />
            <CopyField label="Wallet address" value={o.cryptoAddress} />
            <p className="text-xs text-slate-600">Amount shown was quoted when you ordered; a payment within a small tolerance of {money(o.total)} is accepted. Use exactly the network above.</p>
          </section>
          <CryptoStatus id={id} token={token} order={o} onConfirmed={reload} />
        </>
      )}

      {kind === "giftcard" && data.giftCard && !done && (
        <section aria-labelledby="gc" className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <h2 id="gc" className="text-sm font-black uppercase tracking-widest text-emerald-600">Pay with your {data.giftCard.name} gift card</h2>
          <p className="text-sm text-slate-700">Amount due: <b className="font-mono text-slate-900">{money(o.total)}</b> — buy a card for exactly this amount, then upload the details below. We&apos;ve also emailed you this guide.</p>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
            <li><b>Buy the card online</b> — <ExternalBtnInline href={data.giftCard.buyUrl} label={`Open ${data.giftCard.name}`} /></li>
            {data.giftCard.steps.slice(1).map((s) => <li key={s}>{s}</li>)}
            <li>Upload the code, photos of the card and your receipt below.</li>
          </ol>
          <ExternalBtn href={data.giftCard.buyUrl}>Buy {data.giftCard.name} gift card</ExternalBtn>
        </section>
      )}

      {kind !== "crypto" && kind !== "giftcard" && !done && (
        <p className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
          Have your payment details? <Link href={detailsUrl} className="font-bold text-emerald-600 underline">Open the payment page</Link>. Haven&apos;t received them yet? We&apos;re preparing them now.
        </p>
      )}

      {!done && (
        <section aria-labelledby="up" className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <h2 id="up" className="text-sm font-black uppercase tracking-widest text-emerald-600">{kind === "giftcard" ? "Upload your gift card details" : kind === "crypto" ? "Optional: upload a screenshot as backup" : "Upload your payment receipt"}</h2>
          <ProofUploader id={id} token={token} kind={kind} onDone={reload} />
          <a href={waPaymentConfirmationLink({ ...o })} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-slate-900"><MessageCircle size={14} /> Or message us on WhatsApp ({SITE.contact.whatsappDisplay})</a>
        </section>
      )}
    </div>
  );
}

function ExternalBtnInline({ href, label }: { href: string; label: string }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-600 underline">{label}</a>;
}

export default function ConfirmPaymentPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="mb-8 text-3xl font-black uppercase tracking-tighter text-slate-900 sm:text-4xl">Payment &amp; order status</h1>
      <Suspense fallback={<p className="text-slate-600">Loading…</p>}><Inner /></Suspense>
    </div>
  );
}
