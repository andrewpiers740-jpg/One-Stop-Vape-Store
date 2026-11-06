"use client";
// Shared pieces of the customer-facing order pages: private-link order loader, tap-to-copy fields,
// proof uploader (image compression), and the automatic crypto status checker.
import React from "react";
import { useSearchParams } from "next/navigation";
import { Check, Copy, Upload, X, Loader2, ShieldCheck, ExternalLink } from "lucide-react";
import { money, statusLabel } from "@/lib/order";

export type PortalData = {
  order: any;
  fields: { label: string; value: string }[];
  opening: string;
  closing: string;
  giftCard: { id: string; name: string; buyUrl: string; steps: string[] } | null;
  whatsapp: string;
};

export function usePortalOrder() {
  const sp = useSearchParams();
  const id = sp.get("id") || "";
  const token = sp.get("token") || "";
  const [data, setData] = React.useState<PortalData | null>(null);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const reload = React.useCallback(async () => {
    if (!id || !token) { setError("This link is incomplete. Please use the full link from your email or WhatsApp message."); setLoading(false); return; }
    try {
      const res = await fetch(`/api/order/payment-details/?id=${encodeURIComponent(id)}&token=${encodeURIComponent(token)}`, { cache: "no-store" });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Order not found.");
      setData(j);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Order not found.");
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  React.useEffect(() => { reload(); }, [reload]);
  return { id, token, data, error, loading, reload };
}

export function CopyField({ label, value }: { label: string; value: string }) {
  const [done, setDone] = React.useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(value); setDone(true); setTimeout(() => setDone(false), 2000); } catch { /* ignore */ }
  };
  return (
    <button type="button" onClick={copy} className="group flex w-full items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 text-left transition-all hover:border-emerald-500/60" aria-label={`Copy ${label}`}>
      <span className="min-w-0">
        <span className="block text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover:text-emerald-600">{label}</span>
        <span className="block break-all font-mono text-sm font-bold text-zinc-100">{value}</span>
      </span>
      <span className="flex shrink-0 items-center gap-1.5 text-xs font-bold text-slate-600 group-hover:text-emerald-600">
        {done ? <><Check size={16} className="text-emerald-600" /> Copied</> : <><Copy size={16} /> Tap to copy</>}
      </span>
    </button>
  );
}

export function StatusPill({ status }: { status: string }) {
  const good = status === "payment-confirmed" || status === "shipped";
  return <span className={`inline-block rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-widest ${good ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600" : "border-slate-300 bg-slate-100 text-slate-700"}`}>{statusLabel(status)}</span>;
}

async function compress(file: File): Promise<string> {
  const original = await new Promise<string>((res, rej) => { const r = new FileReader(); r.onload = () => res(String(r.result)); r.onerror = rej; r.readAsDataURL(file); });
  try {
    const img = await new Promise<HTMLImageElement>((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = original; });
    const scale = Math.min(1, 1600 / Math.max(img.width, img.height));
    const c = document.createElement("canvas");
    c.width = Math.round(img.width * scale); c.height = Math.round(img.height * scale);
    const ctx = c.getContext("2d");
    if (!ctx) return original;
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height);
    ctx.drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL("image/jpeg", 0.8);
  } catch {
    return original; // e.g. HEIC the browser can't decode — server accepts it if small enough
  }
}

export function ProofUploader({ id, token, kind, onDone }: { id: string; token: string; kind: string; onDone: () => void }) {
  const [files, setFiles] = React.useState<{ name: string; url: string }[]>([]);
  const [txHash, setTxHash] = React.useState("");
  const [cardCode, setCardCode] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const isGift = kind === "giftcard";
  const isCrypto = kind === "crypto";

  const onPick = async (list: FileList | null) => {
    if (!list) return;
    setError("");
    const next = [...files];
    for (const file of Array.from(list)) {
      if (next.length >= 4) break;
      if (!file.type.startsWith("image/") && !/\.(heic|heif)$/i.test(file.name)) { setError("Only image files (JPG, PNG, WebP, HEIC) can be uploaded."); continue; }
      next.push({ name: file.name, url: await compress(file) });
    }
    setFiles(next);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setError("");
    try {
      const res = await fetch("/api/order/confirm-payment/", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ id, token, files: files.map((f) => f.url), txHash, cardCode, notes }) });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Upload failed. Please try again.");
      setSent(true);
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally { setBusy(false); }
  };

  if (sent) return (
    <div role="status" className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-center">
      <Check className="mx-auto mb-2 text-emerald-600" />
      <p className="font-bold text-slate-900">Thank you — we received your {isGift ? "gift card details" : "proof of payment"}.</p>
      <p className="mt-1 text-sm text-slate-700">We&apos;ll verify it and email you as soon as it is confirmed.</p>
    </div>
  );

  const inputCls = "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-500 focus:border-emerald-500 focus:outline-none";
  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      {isGift && (
        <div>
          <label htmlFor="pf-code" className="mb-1 block text-xs font-bold uppercase tracking-widest text-slate-600">Gift card code / PIN</label>
          <input id="pf-code" value={cardCode} onChange={(e) => setCardCode(e.target.value)} className={inputCls} autoComplete="off" placeholder="Card number / code / PIN" />
        </div>
      )}
      {isCrypto && (
        <div>
          <label htmlFor="pf-tx" className="mb-1 block text-xs font-bold uppercase tracking-widest text-slate-600">Transaction hash (optional)</label>
          <input id="pf-tx" value={txHash} onChange={(e) => setTxHash(e.target.value)} className={inputCls} autoComplete="off" placeholder="0x… / txid" />
        </div>
      )}
      <div>
        <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-slate-600">{isGift ? "Photos of the card (front & back) + purchase receipt" : "Payment screenshot / receipt"}</span>
        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-100/40 p-6 text-center text-sm text-slate-600 hover:border-emerald-500/60">
          <Upload size={22} className="text-emerald-600" />
          <span>Tap to choose images (up to 4)</span>
          <input type="file" accept="image/*,.heic,.heif" multiple className="sr-only" onChange={(e) => onPick(e.target.files)} />
        </label>
        {files.length > 0 && (
          <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {files.map((f, i) => (
              <li key={i} className="relative overflow-hidden rounded-xl border border-slate-200 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.url} alt={`Upload ${i + 1}: ${f.name}`} className="aspect-square w-full object-cover" />
                <button type="button" aria-label={`Remove ${f.name}`} onClick={() => setFiles(files.filter((_, k) => k !== i))} className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-black/80 text-white"><X size={14} /></button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <label htmlFor="pf-notes" className="mb-1 block text-xs font-bold uppercase tracking-widest text-slate-600">Notes (optional)</label>
        <textarea id="pf-notes" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} className={inputCls} />
      </div>
      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">{error}</p>}
      <button disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-emerald-500/25 hover:bg-emerald-400 disabled:opacity-50">
        {busy ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : <>{isGift ? "Send gift card details" : "Send proof of payment"}</>}
      </button>
      <p className="flex items-center gap-2 text-[11px] text-slate-600"><ShieldCheck size={14} /> Only people with your private link can see this page.</p>
    </form>
  );
}

// Polls /api/crypto/verify every 20 s while the order is unpaid.
export function CryptoStatus({ id, token, order, onConfirmed }: { id: string; token: string; order: any; onConfirmed: () => void }) {
  const [state, setState] = React.useState<string>(order.status === "payment-confirmed" || order.status === "shipped" ? "confirmed" : "pending");
  const [detail, setDetail] = React.useState<any>(null);
  const [checking, setChecking] = React.useState(false);
  const doneRef = React.useRef(state === "confirmed");

  const check = React.useCallback(async () => {
    if (doneRef.current) return;
    setChecking(true);
    try {
      const res = await fetch("/api/crypto/verify/", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ id, token }) });
      const j = await res.json();
      if (res.ok) {
        setState(j.state); setDetail(j);
        if (j.state === "confirmed") { doneRef.current = true; onConfirmed(); }
      }
    } catch { /* keep polling */ } finally { setChecking(false); }
  }, [id, token, onConfirmed]);

  React.useEffect(() => {
    check();
    const t = setInterval(check, 20000);
    return () => clearInterval(t);
  }, [check]);

  const msg: Record<string, string> = {
    pending: "Waiting for your payment to appear on the blockchain…",
    detected: "Payment detected — waiting for network confirmation…",
    confirmed: "Payment confirmed! Your order is being prepared.",
    underpaid: `We found a payment of about ${money(detail?.receivedUsd || 0)} but ${money(order.total)} is due. We'll contact you about the difference — or send the balance and upload a screenshot below.`,
    unavailable: "Automatic checking is unavailable for this network right now — upload a screenshot below and we'll confirm it manually.",
  };
  const good = state === "confirmed";
  return (
    <div role="status" aria-live="polite" className={`flex items-start gap-3 rounded-2xl border p-5 ${good ? "border-emerald-500/50 bg-emerald-500/10" : "border-slate-200 bg-slate-50"}`}>
      {good ? <Check className="mt-0.5 shrink-0 text-emerald-600" /> : <Loader2 className={`mt-0.5 shrink-0 text-emerald-600 ${state === "unavailable" ? "" : "animate-spin"}`} />}
      <div className="min-w-0">
        <p className="font-bold text-slate-900">{msg[state] || msg.pending}</p>
        {detail?.txHash && <p className="mt-1 break-all font-mono text-[11px] text-slate-600">Tx: {detail.txHash}</p>}
        {!good && <button type="button" onClick={check} disabled={checking} className="mt-2 text-xs font-bold uppercase tracking-widest text-emerald-600 hover:text-emerald-600 disabled:opacity-50">{checking ? "Checking…" : "Check now"}</button>}
      </div>
    </div>
  );
}

export function ExternalBtn({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3.5 text-xs font-black uppercase tracking-widest text-white hover:bg-emerald-400">{children}<ExternalLink size={14} /></a>;
}
