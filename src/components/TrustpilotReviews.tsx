"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Star, CheckCircle, ShieldCheck, MessageSquare, ChevronLeft, ChevronRight, Pause, Play, Quote } from "lucide-react";
import { SITE } from "@/src/config/site";

interface Review {
  id: string;
  name: string;
  location: string;
  title: string;
  comment: string;
  rating: number;
  date: string;
  category: "all" | "nixodine" | "disposables" | "shipping" | "wholesale";
  categoryLabel: string;
  verified: boolean;
}

const REVIEWS: Review[] = [
  {
    id: "tp-1",
    name: "Marcus K.",
    location: "Scottsdale, AZ",
    title: "Outstanding Nixodine Selection & Next-Day Delivery!",
    comment: "I have been ordering from One Stop Vape Store since early 2023. Their new Nixodine lineup (especially the Hookah Labs 80K and Lost Mary 35K) delivers incredible flavor and pure satisfaction. Fast tracked dispatch right out of Phoenix. Top tier distributor!",
    rating: 5,
    date: "February 18, 2026",
    category: "nixodine",
    categoryLabel: "Nixodine",
    verified: true
  },
  {
    id: "tp-2",
    name: "Elena S.",
    location: "Austin, TX",
    title: "100% Authentic Hardware — Never Disappointed",
    comment: "SV3 LLC runs the most reliable vape portal online. Every Geek Bar and Fifty Bar I receive scans authentic on the factory QR code immediately. Discreet packaging, adult signature compliant, and the crypto 10% discount is seamless.",
    rating: 5,
    date: "January 14, 2026",
    category: "disposables",
    categoryLabel: "Disposables",
    verified: true
  },
  {
    id: "tp-3",
    name: "David R.",
    location: "Tampa, FL",
    title: "Wholesale tier pricing and unmatched customer care",
    comment: "We supply our local Florida shops with bulk hardware from One Stop Vape. Ordering through WhatsApp and email invoices is fast, and orders always leave the Stock Warehouse within 24 hours. Reliable partner since December 2022.",
    rating: 5,
    date: "November 04, 2025",
    category: "wholesale",
    categoryLabel: "Wholesale",
    verified: true
  },
  {
    id: "tp-4",
    name: "Carlos M.",
    location: "San Diego, CA",
    title: "NIX Liquids and Pods are unmatched",
    comment: "Finding authentic Nicotine Pouches and Nixodine bottles in California has become tough, but One Stop Vape Store has everything in stock. Crisp flavors, genuine brands, and responsive WhatsApp support.",
    rating: 5,
    date: "July 29, 2025",
    category: "nixodine",
    categoryLabel: "Nixodine",
    verified: true
  },
  {
    id: "tp-5",
    name: "Tyler B.",
    location: "Denver, CO",
    title: "Lightning fast shipping and tracked USPS updates",
    comment: "Placed my order Wednesday afternoon, received tracking confirmation that evening, and package arrived in Denver by Friday. The packaging was discreet, sturdy, and all items sealed factory-fresh.",
    rating: 5,
    date: "March 12, 2025",
    category: "shipping",
    categoryLabel: "Fast Shipping",
    verified: true
  },
  {
    id: "tp-6",
    name: "Sarah P.",
    location: "Las Vegas, NV",
    title: "Longtime customer — consistently stellar service",
    comment: "Started ordering in 2023 when they were expanding in Phoenix. The customer service over WhatsApp is actually a real person answering questions in minutes. You cannot beat their prices on 5-pack bundles.",
    rating: 5,
    date: "October 19, 2024",
    category: "disposables",
    categoryLabel: "Disposables",
    verified: true
  },
  {
    id: "tp-7",
    name: "Anthony L.",
    location: "Chicago, IL",
    title: "Huge catalog with genuine vape kits and coils",
    comment: "Every coil and pod kit I ordered came authentic with tamper seals intact. They even threw in free expedited shipping since my cart was over $200. Will continue buying my all-day vape gear here.",
    rating: 5,
    date: "May 08, 2024",
    category: "wholesale",
    categoryLabel: "Wholesale",
    verified: true
  },
  {
    id: "tp-8",
    name: "Jordan T.",
    location: "Seattle, WA",
    title: "Best vape shop on the web since their founding",
    comment: "Found them right after SV3 LLC established the store in late 2022. In 3 years and dozens of orders, zero issues, zero missing items. The new website search and wishlist features make shopping even faster.",
    rating: 5,
    date: "December 14, 2023",
    category: "shipping",
    categoryLabel: "Fast Shipping",
    verified: true
  },
  {
    id: "tp-9",
    name: "Jessica W.",
    location: "Charlotte, NC",
    title: "ZYN & Nicotine Pouches in full stock!",
    comment: "Local gas stations are always out of 6mg peppermint pouches. One Stop Vape had all flavors and strengths ready to ship. 5 stars all the way!",
    rating: 5,
    date: "June 20, 2023",
    category: "disposables",
    categoryLabel: "Pouches",
    verified: true
  },
  {
    id: "tp-10",
    name: "Brandon H.",
    location: "Phoenix, AZ",
    title: "Local pride — best vape operation in Arizona",
    comment: "Living in Phoenix, I appreciate having SV3 LLC headquartered right here. The team is dedicated to authentic adult vaping compliance, strict 21+ age verification, and rapid regional delivery.",
    rating: 5,
    date: "January 09, 2023",
    category: "shipping",
    categoryLabel: "Local HQ",
    verified: true
  }
];

const AUTOPLAY_MS = 6000;

// Offset of slide i from the active slide, wrapped so the carousel loops (e.g. -2 ... +2).
function offsetOf(i: number, active: number, n: number) {
  let d = i - active;
  if (d > n / 2) d -= n;
  if (d < -n / 2) d += n;
  return d;
}

function Stars({ size }: { size: number }) {
  return (
    <div className="flex items-center gap-1" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center justify-center rounded bg-trust text-white" style={{ width: size + 9, height: size + 9 }}>
          <Star size={size} className="fill-white text-white" />
        </div>
      ))}
    </div>
  );
}

export default function TrustpilotReviews() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hold, setHold] = useState(false); // hover / focus / dragging pause
  const [reduced, setReduced] = useState(false);
  const [wide, setWide] = useState(true);
  const drag = useRef<{ x: number; id: number } | null>(null);

  const filteredReviews = activeFilter === "all" ? REVIEWS : REVIEWS.filter((r) => r.category === activeFilter);
  const n = filteredReviews.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wq = window.matchMedia("(min-width: 768px)");
    const sync = () => { setReduced(mq.matches); setWide(wq.matches); };
    sync();
    mq.addEventListener("change", sync);
    wq.addEventListener("change", sync);
    return () => { mq.removeEventListener("change", sync); wq.removeEventListener("change", sync); };
  }, []);

  const go = useCallback((delta: number) => setActive((a) => (n ? (a + delta + n) % n : 0)), [n]);

  const auto = playing && !hold && !reduced && n > 1;
  useEffect(() => {
    if (!auto) return;
    const t = window.setTimeout(() => go(1), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [auto, active, go]);

  const pickFilter = (id: string) => { setActiveFilter(id); setActive(0); };

  const onPointerDown = (e: React.PointerEvent) => { drag.current = { x: e.clientX, id: e.pointerId }; setHold(true); };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    setHold(false);
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    if (e.key === "Home") { e.preventDefault(); setActive(0); }
    if (e.key === "End") { e.preventDefault(); setActive(n - 1); }
  };

  const step = wide ? 56 : 62; // % of card width between neighbouring slides
  const reach = wide ? 2 : 1; // how many slides each side stay visible

  return (
    <section className="bg-slate-50 py-24 border-t border-slate-200 w-full relative overflow-hidden" aria-labelledby="tp-heading">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-trust/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10 flex flex-col gap-12">

      <div className="max-w-[1440px] mx-auto px-6 relative z-10 flex flex-col gap-16">
        
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-slate-200">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-trust/10 border border-trust/20 text-trust-dark text-[10px] font-black uppercase tracking-[0.2em] w-fit">
              <ShieldCheck size={12} />
              <span>Verified Customer Proof • Since Dec 2022</span>
            </div>
            <h2 id="tp-heading" className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 uppercase leading-none">
              Trustpilot <span className="text-trust-dark">Reviews</span>
            </h2>
            <p className="text-slate-600 text-sm md:text-base max-w-xl leading-relaxed">
              Real feedback from adult customers across the United States. {SITE.legalName} d/b/a {SITE.name} has maintained a 4.9-star average since our establishment in December 2022.
            </p>
          </div>

          {/* TrustScore badge card */}
          <div className="p-6 rounded-2xl bg-slate-100/80 border border-slate-200 flex flex-col sm:flex-row items-center gap-6 shrink-0 shadow-xl">
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-slate-900 tracking-tight">TrustScore</span>
                <span className="px-2 py-0.5 rounded bg-trust-dark text-white font-black text-xs uppercase">4.9 / 5.0</span>
              </div>
              <div className="flex items-center gap-1 mt-2 text-trust">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-6 h-6 rounded bg-trust flex items-center justify-center text-white">
                    <Star size={14} className="fill-white text-white" />
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-600 mt-2">Based on <span className="text-slate-900 font-bold">348+ verified reviews</span></p>
            </div>
            <div className="hidden sm:block w-px h-16 bg-slate-200" />
            <div className="text-center sm:text-left">
              <span className="text-xs uppercase font-black tracking-widest text-trust-dark">Status</span>
              <p className="text-sm font-bold text-slate-900 mt-0.5">Excellent Rating</p>
              <p className="text-[10px] text-slate-600">Established Dec 2022</p>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 items-center">
          {[
            { id: "all", label: "All Reviews (348+)" },
            { id: "nixodine", label: "Nixodine Innovations" },
            { id: "disposables", label: "Disposables & Brands" },
            { id: "shipping", label: "Tracked US Shipping" },
            { id: "wholesale", label: "Wholesale & Bulk" }
          ].map((pill) => (
            <button
              type="button"
              key={pill.id}
              onClick={() => pickFilter(pill.id)}
              aria-pressed={activeFilter === pill.id}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeFilter === pill.id
                  ? "bg-trust-dark text-white shadow-lg shadow-trust/20 font-black"
                  : "bg-slate-100 border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Review slider: 3D coverflow, auto-plays, pauses on hover/focus/drag, swipe + keyboard + buttons */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer reviews"
          className="flex flex-col gap-6"
          onMouseEnter={() => setHold(true)}
          onMouseLeave={() => setHold(false)}
          onFocus={() => setHold(true)}
          onBlur={() => setHold(false)}
        >
          <div
            className="relative mx-auto h-[430px] w-full max-w-[1100px] touch-pan-y select-none rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-trust-dark focus-visible:ring-offset-4 md:h-[400px]"
            style={{ perspective: "1400px" }}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => { drag.current = null; setHold(false); }}
            aria-live={auto ? "off" : "polite"}
          >
            {filteredReviews.map((rev, i) => {
              const d = offsetOf(i, active, n);
              const ad = Math.abs(d);
              const visible = ad <= reach;
              const isActive = d === 0;
              const transform = reduced
                ? `translateX(calc(-50% + ${d * 105}%))`
                : `translateX(calc(-50% + ${d * step}%)) translateZ(${-ad * 140}px) rotateY(${-d * 22}deg) scale(${1 - ad * 0.1})`;
              return (
                <div
                  key={rev.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Review ${i + 1} of ${n}`}
                  aria-hidden={!isActive}
                  onClick={() => { if (!isActive && visible) setActive(i); }}
                  className={`absolute left-1/2 top-0 h-full w-[min(84vw,420px)] ${reduced ? "" : "transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(.22,1,.36,1)]"} ${isActive ? "" : "cursor-pointer"}`}
                  style={{ transform, opacity: visible ? (isActive ? 1 : Math.max(0.2, 0.5 - (ad - 1) * 0.2)) : 0, zIndex: 20 - ad, filter: isActive ? "none" : "saturate(.7)", pointerEvents: visible ? "auto" : "none" }}
                >
                  <article className={`relative flex h-full flex-col justify-between gap-5 overflow-hidden rounded-3xl border bg-white p-7 md:p-8 ${isActive ? "border-trust/50 shadow-2xl shadow-trust/20" : "border-slate-200 shadow-lg"}`}>
                    <Quote size={72} aria-hidden="true" className="pointer-events-none absolute -right-2 -top-2 rotate-180 text-trust/10" />
                    <div className="relative flex flex-col gap-4">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Stars size={14} />
                          <span className="sr-only">{rev.rating} out of 5 stars</span>
                        </div>
                        {rev.verified && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-trust/20 bg-trust/10 px-2 py-0.5 text-[10px] font-bold text-trust-dark">
                            <CheckCircle size={10} aria-hidden="true" />
                            <span>Verified Buyer</span>
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-black leading-snug tracking-tight text-slate-900">&ldquo;{rev.title}&rdquo;</h3>
                      <p className="text-sm leading-relaxed text-slate-600 line-clamp-6">{rev.comment}</p>
                    </div>
                    <div className="relative flex items-center justify-between gap-3 border-t border-slate-200/70 pt-4 text-xs">
                      <div className="flex items-center gap-3">
                        <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-trust-dark text-sm font-black text-white">{rev.name.charAt(0)}</span>
                        <div>
                          <p className="font-bold tracking-tight text-slate-900">{rev.name}</p>
                          <p className="text-[11px] text-slate-600">{rev.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="block font-mono text-[10px] text-slate-600">{rev.date}</span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-trust-dark">{rev.categoryLabel}</span>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          {/* Controls */}
          {n > 1 && (
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => go(-1)} aria-label="Previous review" className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-800 transition hover:border-trust-dark hover:text-trust-dark">
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>
                <div className="flex max-w-[60vw] flex-wrap items-center justify-center gap-1">
                  {filteredReviews.map((rev, i) => (
                    <button key={rev.id} type="button" onClick={() => setActive(i)} aria-label={`Show review ${i + 1} of ${n}`} aria-current={i === active} className="group flex h-6 w-6 items-center justify-center">
                      <span className={`block h-2 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-trust-dark" : "w-2 bg-slate-300 group-hover:bg-slate-400"}`} />
                    </button>
                  ))}
                </div>
                <button type="button" onClick={() => go(1)} aria-label="Next review" className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-800 transition hover:border-trust-dark hover:text-trust-dark">
                  <ChevronRight size={20} aria-hidden="true" />
                </button>
                {!reduced && (
                  <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause automatic slideshow" : "Play automatic slideshow"} className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-800 transition hover:border-trust-dark hover:text-trust-dark">
                    {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
                  </button>
                )}
              </div>
              <div className="h-1 w-48 overflow-hidden rounded-full bg-slate-200" aria-hidden="true">
                {auto && <div key={`${active}-${activeFilter}`} className="h-full origin-left rounded-full bg-trust-dark" style={{ animation: `tp-progress ${AUTOPLAY_MS}ms linear forwards` }} />}
              </div>
              <p className="text-xs text-slate-600" aria-hidden="true">{active + 1} / {n} &middot; swipe, drag or use the arrow keys</p>
            </div>
          )}
        </div>

        {/* Bottom Banner */}
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-trust/10 via-slate-100 to-slate-100 border border-trust/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h4 className="text-2xl font-black uppercase text-slate-900 tracking-tight">Experience 5-Star Service Today</h4>
            <p className="text-slate-600 text-sm">Join thousands of satisfied adult vapers nationwide. All orders backed by authentic product guarantees.</p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <a
              href={`https://wa.me/${SITE.contact.whatsapp}`}
              className="px-8 py-4 bg-trust-dark hover:bg-trust-dark text-white font-black uppercase tracking-widest rounded-full transition-all duration-300 flex items-center gap-2 text-xs shadow-lg shadow-trust/20"
            >
              <MessageSquare size={14} />
              <span>Ask Our Team</span>
            </a>
          </div>
        </div>

      </div>

      </div>
    </section>
  );
}
