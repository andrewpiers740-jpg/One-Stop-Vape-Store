"use client";
import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, Send, Trash2, MessageCircle, Paperclip, ExternalLink } from "lucide-react";
import { useAdmin } from "@/src/components/admin/AdminClientShell";
import { money, statusLabel } from "@/lib/order";
import { waLinkTo } from "@/lib/whatsapp";
import { SITE } from "@/src/config/site";

const STATUSES = ["pending", "payment-sent", "payment-submitted", "payment-detected", "payment-confirmed", "shipped", "cancelled"];
const tone = (s: string) => (s === "payment-confirmed" || s === "shipped" ? "text-emerald-300 border-emerald-500/40 bg-emerald-500/10" : s === "cancelled" ? "text-zinc-500 border-zinc-800" : s === "payment-submitted" || s === "payment-detected" ? "text-amber-300 border-amber-500/40 bg-amber-500/10" : "text-zinc-300 border-zinc-700");
const Badge = ({ s }: { s: string }) => <span className={`inline-block whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${tone(s)}`}>{statusLabel(s)}</span>;

function Detail({ id }: { id: string }) {
  const { api } = useAdmin();
  const router = useRouter();
  const [d, setD] = React.useState<any>(null);
  const [err, setErr] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [tracking, setTracking] = React.useState("");
  const [note, setNote] = React.useState("");

  const load = React.useCallback(async () => {
    try { const j = await api(`/api/admin/orders/${encodeURIComponent(id)}/`); setD(j); setTracking(j.order.trackingNumber || ""); setNote(j.order.adminNote || ""); setErr(""); }
    catch (e) { setErr(e instanceof Error ? e.message : "Failed"); }
  }, [api, id]);
  React.useEffect(() => { load(); }, [load]);

  const patch = async (body: any) => {
    setBusy(true); setMsg("");
    try { await api(`/api/admin/orders/${encodeURIComponent(id)}/`, { method: "PATCH", body: JSON.stringify(body) }); setMsg("Saved."); await load(); }
    catch (e) { setMsg(e instanceof Error ? e.message : "Failed"); } finally { setBusy(false); }
  };
  const remove = async () => {
    if (!window.confirm(`Permanently delete order ${id}? This cannot be undone.`)) return;
    await api(`/api/admin/orders/${encodeURIComponent(id)}/`, { method: "DELETE" });
    router.push("/admin/orders/");
  };

  if (err) return <p role="alert" className="text-red-400">{err}</p>;
  if (!d) return <p className="text-zinc-500">Loading…</p>;
  const o = d.order;
  const a = o.address || {};
  const Row = ({ k, v }: { k: string; v: React.ReactNode }) => <div className="flex flex-col gap-0.5 py-2 sm:flex-row sm:gap-4"><dt className="w-40 shrink-0 text-xs font-bold uppercase tracking-widest text-zinc-500">{k}</dt><dd className="min-w-0 break-words text-sm text-zinc-200">{v}</dd></div>;

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <Link href="/admin/orders/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white"><ArrowLeft size={14} /> All orders</Link>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-mono text-3xl font-black text-white">{o.orderNumber}</h1>
        <div className="flex items-center gap-3"><Badge s={o.status} /><span className="font-mono text-2xl font-black text-emerald-400">{money(o.total)}</span></div>
      </div>

      <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <h2 className="mb-2 text-sm font-black uppercase tracking-widest text-emerald-400">Customer</h2>
        <dl className="divide-y divide-zinc-900">
          <Row k="Name" v={o.customerName} />
          <Row k="Email" v={<a className="underline" href={`mailto:${o.customerEmail}`}>{o.customerEmail}</a>} />
          <Row k="Phone" v={o.customerPhone} />
          <Row k="Ship to" v={[a.line1, a.line2, a.city, a.state, a.zip].filter(Boolean).join(", ")} />
          <Row k="Channel" v={o.channel} />
          <Row k="Placed" v={new Date(o.createdAt).toLocaleString()} />
          {o.notes && <Row k="Customer notes" v={o.notes} />}
        </dl>
      </section>

      <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <h2 className="mb-2 text-sm font-black uppercase tracking-widest text-emerald-400">Items</h2>
        <ul className="divide-y divide-zinc-900 text-sm">
          {o.items.map((i: any) => <li key={i.slug} className="flex justify-between gap-4 py-2"><span>{i.qty} × {i.title}</span><span className="font-mono">{money(i.price * i.qty)}</span></li>)}
        </ul>
        <dl className="mt-3 space-y-1 border-t border-zinc-800 pt-3 text-sm">
          <div className="flex justify-between text-zinc-400"><dt>Subtotal</dt><dd className="font-mono">{money(o.subtotal)}</dd></div>
          {o.discount > 0 && <div className="flex justify-between text-zinc-400"><dt>Discount ({o.discountPercent}%)</dt><dd className="font-mono">−{money(o.discount)}</dd></div>}
          <div className="flex justify-between text-zinc-400"><dt>Shipping</dt><dd className="font-mono">{o.shipping ? money(o.shipping) : "Free"}</dd></div>
          <div className="flex justify-between font-bold"><dt>Total</dt><dd className="font-mono">{money(o.total)}</dd></div>
        </dl>
      </section>

      <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <h2 className="mb-2 text-sm font-black uppercase tracking-widest text-emerald-400">Payment — {o.paymentLabel}</h2>
        <dl className="divide-y divide-zinc-900">
          {o.paymentKind === "crypto" && <>
            <Row k="Expected" v={`${o.cryptoAmount} ${o.cryptoToken}`} />
            <Row k="Network" v={o.cryptoNetwork} />
            <Row k="Wallet" v={<code className="break-all text-xs">{o.cryptoAddress}</code>} />
            {o.txHash && <Row k="Tx hash" v={<code className="break-all text-xs">{o.txHash}</code>} />}
            {o.receivedUsd && <Row k="Received (USD)" v={`$${o.receivedUsd}${o.autoVerified ? " — auto-verified on-chain" : ""}`} />}
            {o.cryptoNote && <Row k="Note" v={<span className="text-amber-300">{o.cryptoNote}</span>} />}
          </>}
          {o.paymentKind === "giftcard" && <Row k="Card code / PIN" v={o.cardCode ? <code className="break-all">{o.cardCode}</code> : "Not provided yet"} />}
          {o.paymentDetails && <Row k="Details sent" v={<pre className="whitespace-pre-wrap font-mono text-xs">{o.paymentDetails}</pre>} />}
          {o.customerNotes && <Row k="Customer message" v={o.customerNotes} />}
        </dl>
        {d.proofs.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400"><Paperclip size={13} /> Uploaded proof ({d.proofs.length})</p>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {d.proofs.map((p: any, i: number) => (
                <li key={i}><a href={p.dataUrl} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-xl border border-zinc-800 bg-black">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={p.dataUrl} alt={`Proof ${i + 1}`} className="aspect-square w-full object-cover" /></a></li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="flex flex-col gap-4 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <h2 className="text-sm font-black uppercase tracking-widest text-emerald-400">Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href={`/admin/send-payment-email/?id=${encodeURIComponent(o.orderNumber)}`} className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-emerald-400"><Send size={14} /> {o.status === "pending" ? "Send" : "Resend"} payment details</Link>
          <a href={waLinkTo(o.customerPhone, `*${SITE.name}* — about your order ${o.orderNumber}: `)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 px-5 py-3 text-xs font-black uppercase tracking-widest text-zinc-200 hover:bg-zinc-900"><MessageCircle size={14} /> WhatsApp customer</a>
          <a href={d.links.confirm} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 px-5 py-3 text-xs font-black uppercase tracking-widest text-zinc-200 hover:bg-zinc-900"><ExternalLink size={14} /> Customer view</a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="st" className="mb-1 block text-xs font-bold uppercase tracking-widest text-zinc-400">Status</label>
            <select id="st" value={o.status} disabled={busy} onChange={(e) => patch({ status: e.target.value })} className="w-full rounded-xl border border-zinc-700 bg-black px-3 py-3 text-white">
              {STATUSES.map((s) => <option key={s} value={s}>{statusLabel(s)}</option>)}
            </select>
            <p className="mt-1 text-[11px] text-zinc-500">“Payment confirmed” emails the customer automatically.</p>
          </div>
          <div>
            <label htmlFor="tr" className="mb-1 block text-xs font-bold uppercase tracking-widest text-zinc-400">Tracking number</label>
            <div className="flex gap-2"><input id="tr" value={tracking} onChange={(e) => setTracking(e.target.value)} className="min-w-0 flex-1 rounded-xl border border-zinc-700 bg-black px-3 py-3 text-white" /><button disabled={busy} onClick={() => patch({ trackingNumber: tracking })} className="rounded-xl border border-zinc-700 px-4 text-xs font-bold text-zinc-200 hover:bg-zinc-900">Save</button></div>
          </div>
        </div>
        <div>
          <label htmlFor="nt" className="mb-1 block text-xs font-bold uppercase tracking-widest text-zinc-400">Private admin note</label>
          <div className="flex gap-2"><textarea id="nt" rows={2} value={note} onChange={(e) => setNote(e.target.value)} className="min-w-0 flex-1 rounded-xl border border-zinc-700 bg-black px-3 py-3 text-white" /><button disabled={busy} onClick={() => patch({ adminNote: note })} className="rounded-xl border border-zinc-700 px-4 text-xs font-bold text-zinc-200 hover:bg-zinc-900">Save</button></div>
        </div>
        {msg && <p role="status" className="text-sm text-emerald-400">{msg}</p>}
        <button onClick={remove} className="inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300"><Trash2 size={14} /> Delete order</button>
      </section>
    </div>
  );
}

function List() {
  const { api } = useAdmin();
  const [orders, setOrders] = React.useState<any[] | null>(null);
  const [filter, setFilter] = React.useState("all");
  const [q, setQ] = React.useState("");
  const [err, setErr] = React.useState("");
  React.useEffect(() => { api("/api/admin/orders/").then((j) => setOrders(j.orders)).catch((e) => setErr(e.message)); }, [api]);
  if (err) return <p role="alert" className="text-red-400">{err}</p>;
  if (!orders) return <p className="text-zinc-500">Loading…</p>;
  const shown = orders.filter((o) => (filter === "all" || o.status === filter) && (!q || `${o.orderNumber} ${o.customerName} ${o.customerEmail}`.toLowerCase().includes(q.toLowerCase())));
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <h1 className="text-3xl font-black uppercase tracking-tighter text-white md:text-4xl">Orders</h1>
      <div className="flex flex-wrap gap-3">
        <label className="sr-only" htmlFor="oq">Search orders</label>
        <input id="oq" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search order, name, email…" className="min-w-0 flex-1 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white" />
        <label className="sr-only" htmlFor="of">Filter by status</label>
        <select id="of" value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-3 text-white"><option value="all">All statuses</option>{STATUSES.map((s) => <option key={s} value={s}>{statusLabel(s)}</option>)}</select>
      </div>
      {shown.length === 0 ? <p className="text-sm text-zinc-500">No orders to show.</p> : (
        <ul className="flex flex-col gap-3">
          {shown.map((o) => (
            <li key={o.orderNumber}>
              <Link href={`/admin/orders/?id=${o.orderNumber}`} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 hover:border-emerald-500/50">
                <span className="font-mono font-black text-white">{o.orderNumber}</span>
                <span className="min-w-0 flex-1 truncate text-sm text-zinc-300">{o.customerName} <span className="text-zinc-600">·</span> <span className="text-zinc-500">{o.paymentLabel}</span></span>
                {o.hasProof && <Paperclip size={14} className="text-amber-300" aria-label="Has uploaded proof" />}
                <Badge s={o.status} />
                <span className="font-mono font-bold text-white">{money(o.total)}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Switch() {
  const id = useSearchParams().get("id");
  return id ? <Detail id={id} /> : <List />;
}
export default function OrdersPage() {
  return <Suspense fallback={<p className="text-zinc-500">Loading…</p>}><Switch /></Suspense>;
}
