"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Phone, Mail, HelpCircle, Truck, CreditCard, Headset } from "lucide-react";
import { SITE } from "@/src/config/site";

// Bottom-right support launcher on every public page. Quick answers + one-tap contact (WhatsApp, call, email).
// tawk.to live chat loads from SITE.tawk in src/config/site.js (no env vars needed);
// its own bubble is hidden and opened from the "Live chat" button below so visitors see a single chat control.
const TAWK_PROPERTY = SITE.tawk.propertyId;
const TAWK_WIDGET = SITE.tawk.widgetId;

const QUICK = [
  { icon: Truck, q: "Where is my order?", a: "Orders ship within 24–72 business hours with tracking by email. Use the private link in your order email to see its status.", href: "/shipping/" },
  { icon: CreditCard, q: "How do I pay?", a: "Cash App, Apple Pay, Chime, crypto (save 10%) or gift cards (save 10%). Details are sent right after you place the order.", href: "/faq/" },
  { icon: HelpCircle, q: "Returns & refunds", a: "Unopened items in original packaging can be returned. Damaged or wrong items are replaced.", href: "/refunds/" },
];

export default function SupportChat() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [pick, setPick] = React.useState(null);
  const [tawkReady, setTawkReady] = React.useState(false);

  React.useEffect(() => {
    if (!TAWK_PROPERTY || pathname?.startsWith("/admin")) return;
    if (window.Tawk_API && window.Tawk_API.hideWidget) { setTawkReady(true); return; }
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();
    window.Tawk_API.onLoad = () => { try { window.Tawk_API.hideWidget(); } catch { /* ignore */ } setTawkReady(true); };
    window.Tawk_API.onChatMaximized = () => setOpen(false);
    window.Tawk_API.onChatMinimized = () => { try { window.Tawk_API.hideWidget(); } catch { /* ignore */ } };
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://embed.tawk.to/${TAWK_PROPERTY}/${TAWK_WIDGET}`;
    s.charset = "UTF-8";
    s.setAttribute("crossorigin", "*");
    document.head.appendChild(s);
  }, [pathname]);

  if (pathname?.startsWith("/admin")) return null;
  const wa = `https://wa.me/${SITE.contact.whatsapp}?text=${encodeURIComponent(`Hi ${SITE.name}, I have a question.`)}`;
  const tel = `tel:+1${SITE.contact.phone.replace(/\D/g, "")}`;
  const openTawk = () => { try { window.Tawk_API.showWidget(); window.Tawk_API.maximize(); } catch { /* ignore */ } };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <section aria-label="Customer support" className="w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20">
          <div className="flex items-center justify-between bg-brand-500 px-4 py-3 text-white">
            <div className="flex items-center gap-2"><Headset size={18} aria-hidden="true" /><div><p className="text-sm font-black">{SITE.name} support</p><p className="text-[11px] text-white/90">We usually reply within minutes</p></div></div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close support" className="rounded-full p-1.5 hover:bg-white/20"><X size={18} /></button>
          </div>
          <div className="flex flex-col gap-3 p-4">
            <p className="rounded-xl bg-slate-100 p-3 text-sm text-slate-800">Hi! How can we help? Pick a topic or message us directly.</p>
            <ul className="flex flex-col gap-2">
              {QUICK.map((x, i) => (
                <li key={x.q}>
                  <button type="button" onClick={() => setPick(pick === i ? null : i)} aria-expanded={pick === i} className="flex w-full items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-left text-sm font-bold text-slate-800 hover:border-brand-500">
                    <x.icon size={16} className="text-brand-600" aria-hidden="true" />{x.q}
                  </button>
                  {pick === i && (
                    <p className="mt-1 rounded-xl bg-brand-50 p-3 text-sm text-slate-800">{x.a} <Link href={x.href} className="font-bold text-brand-700 underline">Read more</Link></p>
                  )}
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-2 gap-2 border-t border-slate-200 pt-3">
              {tawkReady && <button type="button" onClick={openTawk} className="relative col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 py-2.5 text-sm font-black text-white hover:bg-brand-600"><MessageCircle size={16} />Live chat<span className="sr-only"> (online)</span><span aria-hidden="true" className="absolute right-4 top-1/2 flex h-2.5 w-2.5 -translate-y-1/2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75 motion-reduce:animate-none" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white/70" /></span></button>}
              <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 py-2.5 text-sm font-bold text-slate-800 hover:border-brand-500"><MessageCircle size={16} />WhatsApp</a>
              <a href={tel} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 py-2.5 text-sm font-bold text-slate-800 hover:border-brand-500"><Phone size={16} />Call</a>
              <a href={`mailto:${SITE.contact.email}`} className="col-span-2 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 py-2.5 text-sm font-bold text-slate-800 hover:border-brand-500"><Mail size={16} />{SITE.contact.email}</a>
            </div>
          </div>
        </section>
      )}
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? "Close support chat" : "Open support chat"} className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-white shadow-xl shadow-brand-500/40 transition-transform hover:scale-105 hover:bg-brand-600">
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
