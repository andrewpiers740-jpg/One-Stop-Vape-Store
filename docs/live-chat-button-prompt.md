Build a floating support chat button on this Next.js (App Router) + Tailwind project, matching the one on One Stop Vape Store exactly in look and behaviour.

## What it is
A round button fixed to the bottom-right of every public page. Clicking it opens a small support panel above it. The panel holds a greeting, three expandable quick-answer topics, and one-tap contact buttons: tawk.to live chat, WhatsApp, Call and Email. The tawk.to widget's own bubble is hidden, and the panel's "Live chat" button opens the tawk.to window, so visitors only ever see one chat control.

## Requirements
1. Create `src/components/SupportChat.jsx` as a client component (`"use client"`), using `lucide-react` icons (MessageCircle, X, Phone, Mail, HelpCircle, Truck, CreditCard, Headset), `next/link` and `usePathname`.
2. Render `<SupportChat />` once in `app/layout.tsx`, inside the body after the page content. Add no other chat widget or floating button.
3. Do not render it on `/admin` pages, and do not load tawk.to there.
4. Put all values in the single site config file (use the project's existing one, e.g. `src/config/site.js`). Nothing is hardcoded in the component:
   - `SITE.name`
   - `SITE.contact.whatsapp` (digits only, country code included, no +)
   - `SITE.contact.phone`
   - `SITE.contact.email`
   - `SITE.tawk = { propertyId: "...", widgetId: "default" }`
   The tawk.to property ID is public (it appears in the embed script), so it lives in config, not in an env var. A mistyped env var once broke the chat.
5. Use the project's own brand colour through Tailwind `brand-500`, `brand-600`, `brand-50` and `brand-700` tokens. If the project has no `brand` colour scale, define one in the Tailwind theme from the site's primary colour.
6. Behaviour:
   - The tawk.to script is injected once in a `useEffect` (guard against double-loading), loaded from `https://embed.tawk.to/{propertyId}/{widgetId}`.
   - On load, call `Tawk_API.hideWidget()` and set a `tawkReady` state. The "Live chat" button only appears once `tawkReady` is true.
   - Clicking "Live chat" calls `Tawk_API.showWidget()` then `Tawk_API.maximize()`, and the support panel closes (`onChatMaximized`).
   - When the visitor minimises the tawk.to window (`onChatMinimized`), hide the tawk.to bubble again.
   - Wrap every `Tawk_API` call in try/catch.
   - The WhatsApp link is `https://wa.me/{number}?text=` followed by the URL-encoded text `Hi {SITE.name}, I have a question.`, opened with `target="_blank" rel="noopener noreferrer"`.
   - The Call link is a `tel:` link and the Email link is a `mailto:` link.
7. Accessibility: the toggle button has `aria-expanded` and an `aria-label` ("Open support chat" or "Close support chat"). The panel is a `<section aria-label="Customer support">`. The close button has `aria-label="Close support"`. Each quick topic button has `aria-expanded`. Icons are `aria-hidden`. Tap targets are at least 44px.
8. Mobile: the panel is `w-[calc(100vw-2rem)] max-w-sm`. There must be no horizontal scroll, and it must not overlap the cookie or age-gate overlays (z-index 40).
9. Content security policy: if the project sets a CSP, allow tawk.to:
   - script-src: `https://embed.tawk.to https://*.tawk.to`
   - style-src: `https://*.tawk.to`
   - font-src: `https://*.tawk.to`
   - connect-src: `https://*.tawk.to wss://*.tawk.to`
   - frame-src: `https://*.tawk.to`
   Add these wherever the CSP is generated. Do not hand-edit generated files.
10. Replace the three quick topics with answers that match THIS site's real policies (shipping, payment, returns). Read the shipping, FAQ and refund pages first and do not invent claims. Keep the same format (icon, question, short answer, "Read more" link to the matching page).
11. Do not use banned or compliance wording from the project's CLAUDE.md in any chat text.

## Reference implementation
Match this structure and styling. Adapt only the config values and the quick topics.

```jsx
"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Phone, Mail, HelpCircle, Truck, CreditCard, Headset } from "lucide-react";
import { SITE } from "@/src/config/site";

const TAWK_PROPERTY = SITE.tawk.propertyId;
const TAWK_WIDGET = SITE.tawk.widgetId;

const QUICK = [
  { icon: Truck, q: "Where is my order?", a: "<site-specific shipping answer>", href: "/shipping/" },
  { icon: CreditCard, q: "How do I pay?", a: "<site-specific payment answer>", href: "/faq/" },
  { icon: HelpCircle, q: "Returns & refunds", a: "<site-specific returns answer>", href: "/refunds/" },
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
  const tel = `tel:+1${SITE.contact.phone.replace(/\D/g, "")}`; // change +1 to the site's country code
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
              {tawkReady && <button type="button" onClick={openTawk} className="col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 py-2.5 text-sm font-black text-white hover:bg-brand-600"><MessageCircle size={16} />Live chat</button>}
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
```

## Before you start
Ask me for the tawk.to property ID (the part after `embed.tawk.to/`) and widget ID (usually `default`), the WhatsApp number, phone, email and brand colour if they aren't already in the config. Do not guess them.

## Verify when done
- The button shows on every public page and is absent on `/admin`.
- The panel opens and closes, and the topics expand.
- "Live chat" appears after tawk.to loads, and opens the tawk.to window without a second bubble showing.
- WhatsApp, Call and Email links are correct.
- No horizontal scroll at 380px width, and no CSP violations in the console.
- The build, typecheck and project crosscheck pass.
