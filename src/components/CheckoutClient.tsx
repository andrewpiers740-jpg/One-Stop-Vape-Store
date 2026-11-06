"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bitcoin, Gift, Smartphone, Banknote, CreditCard, Lock, MessageCircle, AlertCircle } from "lucide-react";
import { useCart, itemKey } from "@/src/components/CartProvider";
import { SITE } from "@/src/config/site";
import { getToken, getNetwork } from "@/src/config/wallets";
import { getGiftCard } from "@/src/config/giftcards";
import CryptoTokenPicker from "@/src/components/CryptoTokenPicker";
import CryptoPayModal from "@/src/components/CryptoPayModal";
import GiftCardPicker from "@/src/components/GiftCardPicker";
import SmartImage from "@/src/components/SmartImage";
import { generateOrderRef, money } from "@/lib/order";
import { waOrderLink } from "@/lib/whatsapp";

type Kind = "crypto" | "giftcard" | "cashapp" | "applepay" | "chime";
const METHODS: { id: Kind; label: string; sub: string; icon: React.ElementType }[] = [
  { id: "cashapp", label: "Cash App", sub: "Pay with Cashapp", icon: Banknote },
  { id: "applepay", label: "Apple Pay", sub: "Pay with Apple", icon: Smartphone },
  { id: "chime", label: "Chime", sub: "Pay securely with chime", icon: CreditCard },
  { id: "crypto", label: "Cryptocurrency", sub: `BTC · USDT · USDC · ETH · BNB · SOL — save ${SITE.order.cryptoDiscount}%`, icon: Bitcoin },
  { id: "giftcard", label: "Gift cards", sub: `Apple · Razer · Paysafe · Sephora · Macy's — save ${SITE.order.giftCardDiscount}%`, icon: Gift },
];

const inputCls = "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-500 focus:border-emerald-500 focus:outline-none";
const labelCls = "mb-1 block text-xs font-bold uppercase tracking-widest text-slate-600";

export default function CheckoutClient() {
  const router = useRouter();
  const { items, subtotal, clear, ready } = useCart();
  const [kind, setKind] = React.useState<Kind>("cashapp");
  const [pay, setPay] = React.useState({ token: "", network: "" });
  const [giftCard, setGiftCard] = React.useState("");
  const [f, setF] = React.useState({ name: "", email: "", phone: "", line1: "", line2: "", city: "", state: "", zip: "", notes: "", website: "" });
  const [age, setAge] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [cryptoOpen, setCryptoOpen] = React.useState(false);
  const [ref, setRef] = React.useState("");
  const startedAt = React.useRef(Date.now());
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF((s) => ({ ...s, [k]: e.target.value }));

  const discountPct = kind === "crypto" ? SITE.order.cryptoDiscount : kind === "giftcard" ? SITE.order.giftCardDiscount : 0;
  const discount = Math.round(subtotal * discountPct) / 100;
  const shipping = subtotal - discount >= SITE.order.freeShippingThreshold ? 0 : SITE.order.flatShippingFee; // free over $200 after discount (see /shipping/)
  const total = Math.round((subtotal - discount + shipping) * 100) / 100;
  const belowMin = subtotal < SITE.order.minOrder;

  const token = kind === "crypto" && pay.token ? getToken(pay.token) : null;
  const network = token && pay.network ? getNetwork(pay.token, pay.network) : null;

  const method = kind === "crypto" ? `crypto-${pay.token}` : kind === "giftcard" ? `giftcard-${giftCard}` : kind;
  const methodReady = kind === "crypto" ? Boolean(token && network) : kind === "giftcard" ? Boolean(getGiftCard(giftCard)) : true;

  function validate(skipPay = false): string {
    if (!items.length) return "Your cart is empty.";
    if (belowMin) return `The minimum order is ${money(SITE.order.minOrder)}.`;
    if (f.name.trim().length < 2) return "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) return "Please enter a valid email — your order updates are sent there.";
    if (f.phone.replace(/\D/g, "").length < 7) return "Please enter a valid phone number.";
    if (!f.line1.trim() || !f.city.trim() || !f.state.trim() || f.zip.replace(/\D/g, "").length < 5) return "Please complete your shipping address.";
    if (!age) return `Please confirm you are ${SITE.compliance.ageThreshold} or older.`;
    if (kind === "crypto" && !skipPay && !methodReady) return "Please choose a crypto token and network.";
    if (kind === "giftcard" && !methodReady) return "Please choose which gift card you will pay with.";
    return "";
  }

  async function placeOrder(channel: "email" | "whatsapp") {
    const problem = validate();
    if (problem) { setError(problem); setCryptoOpen(false); return; }
    setError("");
    setLoading(true);
    // Open the WhatsApp tab synchronously (popup blockers), then point it at the order message after saving.
    const waTab = channel === "whatsapp" ? window.open("about:blank", "_blank") : null;
    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          formName: "order", channel, ref: ref || undefined, _t: startedAt.current, website: f.website, ageConfirmed: age,
          customer: { name: f.name, email: f.email, phone: f.phone },
          address: { line1: f.line1, line2: f.line2, city: f.city, state: f.state, zip: f.zip },
          items: items.map((i) => ({ slug: i.slug, qty: i.qty, variant: i.variant })),
          paymentMethod: method, cryptoNetwork: pay.network, notes: f.notes,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.error || "Something went wrong placing your order. Please try again.");
      const summary = {
        orderNumber: data.orderNumber, total: data.total, paymentLabel: kind === "crypto" ? `Crypto (${pay.token})` : kind === "giftcard" ? `Gift card (${getGiftCard(giftCard)?.name})` : METHODS.find((m) => m.id === kind)?.label,
        customerName: f.name, items: items.map((i) => ({ qty: i.qty, title: i.title, price: i.price })), paymentKind: data.paymentKind,
      };
      try { sessionStorage.setItem("osv-last-order", JSON.stringify(summary)); } catch { /* ignore */ }
      if (waTab) waTab.location.href = waOrderLink(summary);
      clear();
      router.push(data.redirect);
    } catch (e) {
      waTab?.close();
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setLoading(false);
    }
  }

  const openCrypto = (justPicked = false) => {
    const problem = validate(justPicked);
    if (problem) { setError(problem); return; }
    setError("");
    setRef((r) => r || generateOrderRef());
    setCryptoOpen(true);
  };

  if (!ready) return <p className="text-slate-600">Loading…</p>;
  if (!items.length) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center">
        <p className="mb-6 text-slate-600">Your cart is empty.</p>
        <Link href="/shop" className="inline-block rounded-full bg-emerald-500 px-8 py-3.5 text-xs font-black uppercase tracking-widest text-white hover:bg-emerald-400">Shop now</Link>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (kind === "crypto") openCrypto(false); else placeOrder("email"); }} noValidate className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_400px] items-start">
      <div className="flex flex-col gap-10">
        <section aria-labelledby="co-contact" className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <h2 id="co-contact" className="text-sm font-black uppercase tracking-widest text-emerald-600">1 · Contact &amp; shipping</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label htmlFor="co-name" className={labelCls}>Full name</label><input id="co-name" autoComplete="name" required className={inputCls} value={f.name} onChange={set("name")} /></div>
            <div><label htmlFor="co-email" className={labelCls}>Email (required)</label><input id="co-email" type="email" autoComplete="email" required className={inputCls} value={f.email} onChange={set("email")} /></div>
            <div className="sm:col-span-2"><label htmlFor="co-phone" className={labelCls}>Phone / WhatsApp</label><input id="co-phone" type="tel" autoComplete="tel" required className={inputCls} value={f.phone} onChange={set("phone")} placeholder="+1 602 555 0123" /></div>
            <div className="sm:col-span-2"><label htmlFor="co-line1" className={labelCls}>Street address</label><input id="co-line1" autoComplete="address-line1" required className={inputCls} value={f.line1} onChange={set("line1")} /></div>
            <div className="sm:col-span-2"><label htmlFor="co-line2" className={labelCls}>Apartment, suite (optional)</label><input id="co-line2" autoComplete="address-line2" className={inputCls} value={f.line2} onChange={set("line2")} /></div>
            <div><label htmlFor="co-city" className={labelCls}>City</label><input id="co-city" autoComplete="address-level2" required className={inputCls} value={f.city} onChange={set("city")} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label htmlFor="co-state" className={labelCls}>State</label><input id="co-state" autoComplete="address-level1" required className={inputCls} value={f.state} onChange={set("state")} /></div>
              <div><label htmlFor="co-zip" className={labelCls}>ZIP</label><input id="co-zip" inputMode="numeric" autoComplete="postal-code" required className={inputCls} value={f.zip} onChange={set("zip")} /></div>
            </div>
          </div>
          {/* honeypot */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden"><label>Website<input tabIndex={-1} autoComplete="off" value={f.website} onChange={set("website")} /></label></div>
        </section>

        <section aria-labelledby="co-pay" className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <h2 id="co-pay" className="text-sm font-black uppercase tracking-widest text-emerald-600">2 · Payment method</h2>
          <div role="radiogroup" aria-labelledby="co-pay" className="grid gap-3">
            {METHODS.map((m) => {
              const on = kind === m.id;
              return (
                <label key={m.id} className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-colors ${on ? "border-emerald-500 bg-emerald-500/10" : "border-slate-200 hover:border-zinc-600"}`}>
                  <input type="radio" name="payment" value={m.id} checked={on} onChange={() => { setKind(m.id); setError(""); setCryptoOpen(false); }} className="sr-only" />
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${on ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-600"}`}><m.icon size={20} /></span>
                  <span className="min-w-0 flex-1"><span className="block font-bold text-slate-900">{m.label}</span><span className="block text-xs text-slate-600">{m.sub}</span></span>
                  <span aria-hidden="true" className={`h-5 w-5 shrink-0 rounded-full border-2 ${on ? "border-emerald-400 bg-emerald-500" : "border-zinc-600"}`} />
                </label>
              );
            })}
          </div>

          {kind === "crypto" && (
            <div className="rounded-2xl border border-slate-200 bg-slate-100/50 p-4">
              <CryptoTokenPicker pay={pay} onChange={setPay} onReady={() => openCrypto(true)} />
              <p className="mt-3 text-xs text-slate-600">Pick a token and the payment window opens with the wallet address, QR code and a live quote. Your payment is detected automatically.</p>
            </div>
          )}
          {kind === "giftcard" && (
            <div className="rounded-2xl border border-slate-200 bg-slate-100/50 p-4"><GiftCardPicker value={giftCard} onChange={setGiftCard} /></div>
          )}
          {(kind === "cashapp" || kind === "applepay" || kind === "chime") && (
            <p className="rounded-2xl border border-slate-200 bg-slate-100/50 p-4 text-sm text-slate-700">
              Place your order and we email you the {METHODS.find((m) => m.id === kind)?.label} payment details (and can WhatsApp them). You pay, then upload your receipt or screenshot from the link we send.
            </p>
          )}
          <div><label htmlFor="co-notes" className={labelCls}>Order notes (optional)</label><textarea id="co-notes" rows={2} className={inputCls} value={f.notes} onChange={set("notes")} /></div>
        </section>
      </div>

      <aside className="sticky top-28 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-sm font-black uppercase tracking-widest text-emerald-600">Your order</h2>
        <ul className="flex max-h-72 flex-col gap-3 overflow-y-auto pr-1">
          {items.map((i) => (
            <li key={itemKey(i)} className="flex items-center gap-3">
              <div className="h-14 w-14 shrink-0 rounded-lg bg-white p-1.5"><SmartImage src={i.image || ""} alt={i.title} className="h-full w-full object-contain" /></div>
              <div className="min-w-0 flex-1"><p className="line-clamp-2 text-xs font-bold text-slate-900">{i.title}</p><p className="text-[11px] text-slate-600">Qty {i.qty}</p></div>
              <span className="font-mono text-xs font-bold">{money(i.price * i.qty)}</span>
            </li>
          ))}
        </ul>
        <dl className="flex flex-col gap-2 border-t border-slate-200 pt-4 text-sm">
          <div className="flex justify-between"><dt className="text-slate-600">Subtotal</dt><dd className="font-mono">{money(subtotal)}</dd></div>
          {discountPct > 0 && <div className="flex justify-between text-emerald-600"><dt>{kind === "crypto" ? "Crypto" : "Gift card"} discount ({discountPct}%)</dt><dd className="font-mono">−{money(discount)}</dd></div>}
          <div className="flex justify-between"><dt className="text-slate-600">Shipping</dt><dd className="font-mono">{shipping ? money(shipping) : "Free"}</dd></div>
          <div className="flex justify-between border-t border-slate-200 pt-3 text-lg"><dt className="font-bold">Total</dt><dd className="font-mono font-black">{money(total)}</dd></div>
        </dl>

        <label className="flex cursor-pointer items-start gap-3 text-xs text-slate-700">
          <input type="checkbox" checked={age} onChange={(e) => setAge(e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-[#0b6dff]" />
          <span>I confirm I am {SITE.compliance.ageThreshold}+ and will sign for delivery. I accept the <Link href="/terms" className="underline">terms</Link> and <Link href="/refunds" className="underline">refund policy</Link>.</span>
        </label>

        {error && !cryptoOpen && <p role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700"><AlertCircle size={14} className="mt-0.5 shrink-0" />{error}</p>}

        {kind === "crypto" ? (
          <button type="submit" disabled={loading} className="rounded-full bg-emerald-500 py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-emerald-500/25 hover:bg-emerald-400 disabled:opacity-50">
            {methodReady ? "Open payment window" : "Choose token to pay"}
          </button>
        ) : (
          <>
            <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-emerald-500/25 hover:bg-emerald-400 disabled:opacity-50"><Lock size={14} />{loading ? "Placing order…" : "Place order"}</button>
            <button type="button" disabled={loading} onClick={() => placeOrder("whatsapp")} className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-500/60 py-3.5 text-xs font-black uppercase tracking-widest text-emerald-600 hover:bg-emerald-500/10 disabled:opacity-50"><MessageCircle size={14} />Place order &amp; message us on WhatsApp</button>
          </>
        )}
        <p className="text-center text-[11px] text-slate-600">Min. order {money(SITE.order.minOrder)} · free shipping over {money(SITE.order.freeShippingThreshold)} after discount</p>
      </aside>

      <CryptoPayModal
        open={cryptoOpen} token={token} network={network} totalLabel={money(total, "$")} amountFiat={total} orderRef={ref}
        loading={loading} error={error} onClose={() => setCryptoOpen(false)} onPaid={() => placeOrder("email")} currency="USD" discountPercent={SITE.order.cryptoDiscount}
      />
    </form>
  );
}
