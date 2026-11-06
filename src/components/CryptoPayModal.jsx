"use client";
import { useEffect, useRef, useState } from "react";
import { X, Copy, Check, AlertCircle, ShieldCheck, ExternalLink, CreditCard } from "lucide-react";
import { BUY_CRYPTO_LINKS, moonpayUrl } from "@/src/config/wallets";
import { quoteAmount } from "@/lib/cryptoQuote";

// token   : entry from WALLETS     network : one of that token's networks
// The order is placed only when "I have paid" is pressed — never when this popup opens.
export default function CryptoPayModal({ open, token, network, totalLabel, amountFiat, orderRef, loading, error, onClose, onPaid, currency = "USD", discountPercent = 10 }) {
  const [rate, setRate] = useState(null);
  const [rateTime, setRateTime] = useState("");
  const [rateState, setRateState] = useState("loading"); // loading | ok | error
  const [qrSrc, setQrSrc] = useState("");
  const [copied, setCopied] = useState("");
  const dialogRef = useRef(null);
  const address = network?.address || "";
  const symbol = token?.symbol;

  useEffect(() => {
    if (!open) return undefined;
    setCopied("");
    const onKey = (e) => { if (e.key === "Escape" && !loading) onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open, loading, onClose]);

  useEffect(() => {
    let cancelled = false;
    setQrSrc("");
    if (!open || !address) return undefined;
    import("qrcode")
      .then((mod) => (mod.default || mod).toDataURL(address, { width: 320, margin: 1, errorCorrectionLevel: "M" }))
      .then((url) => { if (!cancelled) setQrSrc(url); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [open, address]);

  useEffect(() => {
    if (!open || !symbol) return undefined;
    let cancelled = false;
    setRate(null);
    setRateState("loading");
    const load = async () => {
      try {
        const res = await fetch("/api/crypto-rate/", { cache: "no-store" });
        const data = await res.json();
        const r = data?.rates?.[symbol];
        if (cancelled) return;
        if (res.ok && data.success && r) {
          setRate(r);
          setRateTime(new Date(data.updatedAt).toLocaleTimeString("en-US"));
          setRateState("ok");
        } else setRateState((s) => (s === "ok" ? s : "error"));
      } catch {
        if (!cancelled) setRateState((s) => (s === "ok" ? s : "error"));
      }
    };
    load();
    const timer = setInterval(load, 30000);
    return () => { cancelled = true; clearInterval(timer); };
  }, [open, symbol]);

  if (!open || !token || !network) return null;

  const amount = rate && amountFiat ? quoteAmount(amountFiat, rate, token.decimals, orderRef).toFixed(token.decimals) : null;
  const rateLabel = rate ? rate.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "";
  const copy = async (key, text) => {
    try { await navigator.clipboard.writeText(text); setCopied(key); setTimeout(() => setCopied(""), 2000); } catch { setCopied(""); }
  };
  const CopyBtn = ({ k, text, label }) => (
    <button type="button" onClick={() => copy(k, text)} aria-label={label} className="flex shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-slate-200 px-3 text-slate-900 hover:bg-zinc-700">
      {copied === k ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
    </button>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-4" role="presentation">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={() => !loading && onClose()} aria-hidden="true" />
      <div ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="crypto-pay-title"
        className="relative max-h-[92vh] w-full space-y-4 overflow-y-auto rounded-t-3xl border border-emerald-500/40 bg-slate-50 p-5 text-slate-900 shadow-2xl shadow-black/60 focus:outline-none sm:max-w-md sm:rounded-3xl sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Pay with {token.symbol}</div>
            <h2 id="crypto-pay-title" className="text-lg font-black tracking-tight">Send {token.name} to complete your order</h2>
          </div>
          <button type="button" onClick={onClose} disabled={loading} aria-label="Close payment window" className="rounded-lg p-2 text-slate-600 hover:bg-slate-200 hover:text-slate-900 disabled:opacity-50"><X className="h-5 w-5" /></button>
        </div>

        <div className="space-y-1 rounded-xl border border-slate-200 bg-white p-3 text-xs">
          <div className="flex justify-between"><span className="text-slate-600">Order reference</span><span className="font-mono font-bold">{orderRef}</span></div>
          <div className="flex justify-between"><span className="text-slate-600">Amount due{discountPercent ? ` (after ${discountPercent}% crypto discount)` : ""}</span><span className="font-mono font-bold text-emerald-600">{totalLabel} {currency}</span></div>
        </div>

        <div className="space-y-1 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs">
          <div className="text-slate-700">Send this amount of {token.symbol}</div>
          {rateState === "ok" && amount ? (
            <>
              <div className="flex items-center justify-between gap-2">
                <span className="break-all font-mono text-xl font-black text-emerald-600">{amount} {token.symbol}</span>
                <CopyBtn k="amount" text={amount} label="Copy amount" />
              </div>
              <div className="text-[11px] text-slate-600">Live rate: 1 {token.symbol} = {currency} {rateLabel} · updated {rateTime} · refreshes every 30 s. Send the full amount shown (network fees are on top).</div>
            </>
          ) : rateState === "loading" ? (
            <div className="text-[11px] text-slate-600">Getting the live rate…</div>
          ) : (
            <div className="text-[11px] text-slate-700">The live rate is unavailable right now. Send the {token.symbol} equivalent of {totalLabel} {currency} at the current market rate.</div>
          )}
        </div>

        <div className="flex justify-center">
          <div className="flex h-48 w-48 items-center justify-center rounded-2xl bg-white p-3">
            {qrSrc ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={qrSrc} alt={`${token.name} wallet QR code`} width={176} height={176} className="h-full w-full object-contain" /> : <span className="text-xs text-slate-500">Loading QR…</span>}
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <div>
            <div className="mb-1 text-slate-600">Network (use exactly this network)</div>
            <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 font-semibold">{network.label}</div>
          </div>
          <div>
            <div className="mb-1 text-slate-600">{token.symbol} wallet address</div>
            <div className="flex items-stretch gap-2">
              <code className="flex-1 select-all break-all rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] text-emerald-600">{address}</code>
              <CopyBtn k="address" text={address} label="Copy wallet address" />
            </div>
          </div>
          {network.memo ? (
            <div>
              <div className="mb-1 text-slate-600">Memo / tag (required)</div>
              <div className="flex items-stretch gap-2">
                <code className="flex-1 select-all break-all rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] text-emerald-600">{network.memo}</code>
                <CopyBtn k="memo" text={network.memo} label="Copy memo" />
              </div>
            </div>
          ) : null}
        </div>

        {/* No crypto? Buy it with a card / bank first. */}
        <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-100/60 p-3 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-900"><CreditCard className="h-4 w-4 text-emerald-600" /> Don&apos;t have {token.symbol}? Buy it with a card or bank</div>
          <p className="leading-relaxed text-slate-600">Buy {token.symbol}, choose the <b className="text-slate-700">{network.label}</b> network when you send it, and paste the wallet address above. Then come back and press “I have paid”.</p>
          <div className="flex flex-wrap gap-2">
            <a href={moonpayUrl(token.symbol)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-2 font-bold text-white hover:bg-emerald-400">Buy on MoonPay <ExternalLink className="h-3 w-3" /></a>
            {BUY_CRYPTO_LINKS.map((l) => (
              <a key={l.id} href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 font-semibold text-slate-700 hover:bg-slate-200">{l.label} <ExternalLink className="h-3 w-3" /></a>
            ))}
          </div>
        </div>

        <div className="flex items-start gap-2 text-[11px] leading-relaxed text-slate-600">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
          <span>Sending to the wrong network or address can mean permanent loss. After you pay, press the button below — your payment is then detected automatically on the blockchain, and you can add a screenshot as a backup.</span>
        </div>

        {error ? (
          <div role="alert" className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700"><AlertCircle className="h-4 w-4 shrink-0" /><span>{error}</span></div>
        ) : null}

        <button type="button" onClick={onPaid} disabled={loading} className="w-full rounded-xl bg-emerald-500 px-4 py-3.5 text-sm font-black text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40">
          {loading ? "Placing your order…" : "I have paid"}
        </button>
      </div>
    </div>
  );
}
