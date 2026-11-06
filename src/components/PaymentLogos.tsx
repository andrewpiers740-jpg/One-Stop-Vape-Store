import React from "react";

// Logos of the payment methods the store accepts. Glyphs are the brands' own marks (simple-icons, CC0) saved locally in
// /public/images/payments; Chime has no glyph in that set so it is set as its wordmark.
const LOGOS: { id: string; label: string; src?: string; dark?: boolean }[] = [
  { id: "applepay", label: "Apple Pay", src: "/images/payments/applepay.svg" },
  { id: "cashapp", label: "Cash App", src: "/images/payments/cashapp.svg" },
  { id: "chime", label: "Chime" },
  { id: "bitcoin", label: "Bitcoin", src: "/images/payments/bitcoin.svg" },
  { id: "tether", label: "USDT (Tether)", src: "/images/payments/tether.svg" },
  { id: "razer", label: "Razer Gold gift card", src: "/images/payments/razer.svg", dark: true },
];

export default function PaymentLogos({ className = "", heading = "We accept" }: { className?: string; heading?: string | null }) {
  return (
    <div className={className}>
      {heading && <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-600">{heading}</p>}
      <ul className="flex flex-wrap items-center gap-2" aria-label="Accepted payment methods">
        {LOGOS.map((l) => (
          <li
            key={l.id}
            title={l.label}
            className={`flex h-10 min-w-[3.5rem] items-center justify-center gap-1.5 rounded-lg border px-3 ${l.dark ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"}`}
          >
            {l.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={l.src} alt={l.label} width={l.id === "applepay" ? 40 : 24} height={24} className={l.id === "applepay" ? "h-6 w-10 object-contain" : "h-6 w-6 object-contain"} loading="lazy" />
            ) : (
              <span className="text-lg font-black lowercase tracking-tight text-[#007a4d]" aria-label={l.label}>chime</span>
            )}
            {l.id === "cashapp" && <span className="text-[11px] font-bold text-slate-800">Cash App</span>}
            {l.id === "tether" && <span className="text-[11px] font-bold text-slate-800">USDT</span>}
            {l.id === "bitcoin" && <span className="text-[11px] font-bold text-slate-800">BTC</span>}
            {l.id === "razer" && <span className="text-[11px] font-bold text-white">Gift Card</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
