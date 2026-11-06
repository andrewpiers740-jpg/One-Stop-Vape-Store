"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Copy, Send, Check, AlertCircle, MessageCircle } from "lucide-react";
import { useAdmin } from "@/src/components/admin/AdminClientShell";
import { parsePaymentDetail, methodDetail, money, paymentTermsLines } from "@/lib/order";
import { SITE } from "@/src/config/site";
import { getGiftCard } from "@/src/config/giftcards";

function Composer() {
  const { api } = useAdmin();
  const sp = useSearchParams();
  const [orderId, setOrderId] = React.useState(sp.get("id") || "");
  const [order, setOrder] = React.useState<any>(null);
  const [raw, setRaw] = React.useState("");
  const [opening, setOpening] = React.useState("");
  const [closing, setClosing] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [msg, setMsg] = React.useState<{ ok: boolean; text: string } | null>(null);
  const [wa, setWa] = React.useState("");
  const [links, setLinks] = React.useState<any>(null);

  // Load the order (customer, method, amount) whenever the id changes.
  React.useEffect(() => {
    setOrder(null);
    if (!/^[A-Z]+-[A-Z0-9]{6}$/.test(orderId.trim())) return;
    api(`/api/admin/orders/${encodeURIComponent(orderId.trim())}/`).then((j) => {
      setOrder(j.order);
      const d = methodDetail(j.order.paymentMethod);
      const fill = (s?: string) => (s || "").replace("{amount}", money(j.order.total)).replace("{order_id}", j.order.orderNumber).replace("{crypto_type}", j.order.cryptoToken || "");
      setOpening(j.order.paymentOpening ?? fill(d?.opening));
      setClosing(j.order.paymentClosing ?? fill(d?.closing));
      setRaw(j.order.paymentDetails || "");
    }).catch(() => setOrder(null));
  }, [api, orderId]);

  const fields = parsePaymentDetail(raw);
  const isGift = order?.paymentKind === "giftcard";
  const card = isGift ? getGiftCard(order.giftCard) : null;

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order) return;
    setBusy(true); setMsg(null);
    try {
      const j = await api("/api/admin/send-payment-email/", { method: "POST", body: JSON.stringify({ id: order.orderNumber, rawText: raw, opening, closing }) });
      setLinks(j.links); setWa(j.whatsappUrl || "");
      setMsg({ ok: j.sent, text: j.sent ? `Email sent to ${order.customerEmail}.` : j.reason === "not-configured" ? "Saved, but email (SMTP) is not configured — send the WhatsApp message instead." : "Saved, but the email failed to send — use WhatsApp." });
    } catch (x) { setMsg({ ok: false, text: x instanceof Error ? x.message : "Failed" }); } finally { setBusy(false); }
  };
  const inputCls = "w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none focus:border-emerald-500";
  const lbl = "text-[10px] font-black uppercase tracking-widest text-zinc-500";

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10">
      <div><h1 className="text-3xl font-black uppercase tracking-tighter text-white md:text-4xl">Payment composer</h1><p className="mt-1 text-xs font-bold uppercase tracking-widest text-zinc-500">Send payment details to the customer — email + WhatsApp</p></div>
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <form onSubmit={send} className="flex flex-col gap-5 rounded-3xl border border-zinc-900 bg-zinc-950 p-6 md:p-8">
          <div><label htmlFor="oid" className={lbl}>Order ID</label><input id="oid" value={orderId} onChange={(e) => setOrderId(e.target.value.toUpperCase())} className={`${inputCls} font-mono`} placeholder="OSV-ABC234" required /></div>
          {order ? (
            <p className="rounded-xl border border-zinc-800 bg-black p-3 text-xs text-zinc-300">{order.customerName} · {order.customerEmail} · <b>{order.paymentLabel}</b> · <b className="text-emerald-400">{money(order.total)}</b></p>
          ) : orderId.length >= 10 ? <p className="text-xs text-red-400">Order not found.</p> : null}

          {isGift ? (
            <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-zinc-200">This is a <b>{card?.name}</b> gift card order. Sending re-emails the customer the buy link ({card?.buyUrl}) and the secure upload link. No payment details needed.</p>
          ) : (
            <>
              <div><label htmlFor="op" className={lbl}>Opening line</label><input id="op" value={opening} onChange={(e) => setOpening(e.target.value)} className={inputCls} /></div>
              <div>
                <div className="flex items-center justify-between"><label htmlFor="raw" className={lbl}>Paste payment detail</label><button type="button" onClick={() => setRaw("Cashtag: $YourCashtag\nName: One Stop Vape")} className="text-[10px] text-emerald-400 underline">Sample</button></div>
                <textarea id="raw" rows={6} value={raw} onChange={(e) => setRaw(e.target.value)} className={`${inputCls} font-mono text-xs`} placeholder={"Cashtag: $YourCashtag\nName: ..."} />
                <p className="mt-1 text-[10px] font-bold uppercase text-zinc-600">Each “Label: value” line becomes its own tap-to-copy field for the customer.</p>
              </div>
              <div><label htmlFor="cl" className={lbl}>Closing line</label><input id="cl" value={closing} onChange={(e) => setClosing(e.target.value)} className={inputCls} /></div>
            </>
          )}
          <button disabled={busy || !order || (!isGift && !fields.length)} className="flex items-center justify-center gap-3 rounded-xl bg-emerald-500 py-4 font-black uppercase tracking-widest text-white transition-all hover:bg-emerald-400 disabled:bg-zinc-800 disabled:text-zinc-500">
            {busy ? "Sending…" : <>{isGift ? "Send gift card instructions" : "Send payment email"} <Send size={18} /></>}
          </button>
          {msg && <p role="status" className={`flex items-center gap-2 text-sm ${msg.ok ? "text-emerald-400" : "text-amber-300"}`}>{msg.ok ? <Check size={16} /> : <AlertCircle size={16} />}{msg.text}</p>}
          {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/60 py-3.5 text-xs font-black uppercase tracking-widest text-emerald-300 hover:bg-emerald-500/10"><MessageCircle size={15} /> Open WhatsApp reply (pre-filled)</a>}
          {links && <button type="button" onClick={() => navigator.clipboard.writeText(links.details)} className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white"><Copy size={13} /> Copy customer payment page link</button>}
        </form>

        <div className="flex flex-col gap-4">
          <h2 className="border-b border-zinc-900 pb-2 text-xs font-black uppercase tracking-widest text-zinc-400">Customer preview</h2>
          <div className="flex flex-col gap-5 rounded-[2rem] border border-zinc-800 bg-zinc-900/30 p-6">
            <div className="flex items-center gap-3">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={SITE.logo} alt="" width={110} height={40} className="h-8 w-auto" /><p className="text-sm font-bold uppercase text-white">{SITE.reply.headerTagline}</p></div>
            <p className="text-xl font-black text-white">Order {order?.orderNumber || "—"}{order ? <span className="ml-2 text-emerald-400">{money(order.total)}</span> : null}</p>
            {!isGift && opening && <p className="text-sm text-zinc-300">{opening}</p>}
            {isGift ? <p className="text-sm text-zinc-400">Gift card guide for {card?.name} + upload link.</p> : fields.length ? fields.map((f, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black p-4"><span><span className="block text-[9px] font-black uppercase text-zinc-600">{f.label}</span><span className="block break-all font-mono text-sm font-bold text-zinc-200">{f.value}</span></span><Copy size={14} className="text-zinc-600" /></div>
            )) : <p className="rounded-2xl border-2 border-dashed border-zinc-800 p-8 text-center text-xs font-bold uppercase text-zinc-600">Paste details to preview</p>}
            {!isGift && closing && <p className="text-sm text-zinc-300">{closing}</p>}
            <ol className="list-decimal space-y-1 pl-5 text-[11px] text-zinc-400">{paymentTermsLines().map((l) => <li key={l}>{l}</li>)}</ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SendPaymentEmail() { return <Suspense fallback={<p className="text-zinc-500">Loading…</p>}><Composer /></Suspense>; }
