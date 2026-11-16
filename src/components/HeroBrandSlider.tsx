"use client";
// Home-page hero slider: five slides, one per top brand. Each slide has a brand colour world, a headline, a shop button and
// three real product photos that fan out, float and follow the pointer (parallax). Autoplay with a progress bar; pauses on
// hover/focus/drag; swipe, arrow keys, dots and buttons; prefers-reduced-motion turns off autoplay, parallax and entrance motion.
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export type HeroSlide = {
  brand: string; href: string; count: number; from: number; kicker: string; blurb: string;
  from1: string; to1: string; glow: string;
  products: { title: string; image: string; href: string; price: number }[];
  lines: { label: string; href: string }[];
};

const MS = 5500;

export default function HeroBrandSlider({ slides }: { slides: HeroSlide[] }) {
  const [i, setI] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [hold, setHold] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);
  const root = React.useRef<HTMLDivElement>(null);
  const drag = React.useRef<number | null>(null);
  const n = slides.length;

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const auto = !paused && !hold && !reduced;
  React.useEffect(() => {
    if (!auto) return;
    const t = window.setTimeout(() => setI((x) => (x + 1) % n), MS);
    return () => window.clearTimeout(t);
  }, [auto, i, n]);

  const go = (k: number) => setI(((k % n) + n) % n);

  // parallax: pointer position (-1..1) written as CSS variables, no re-render
  const onMove = (e: React.PointerEvent) => {
    if (reduced || !root.current) return;
    const r = root.current.getBoundingClientRect();
    root.current.style.setProperty("--mx", String(((e.clientX - r.left) / r.width - 0.5) * 2));
    root.current.style.setProperty("--my", String(((e.clientY - r.top) / r.height - 0.5) * 2));
  };
  const onLeave = () => { root.current?.style.setProperty("--mx", "0"); root.current?.style.setProperty("--my", "0"); setHold(false); };
  const onDown = (e: React.PointerEvent) => { drag.current = e.clientX; setHold(true); };
  const onUp = (e: React.PointerEvent) => {
    const x0 = drag.current; drag.current = null;
    if (x0 != null && Math.abs(e.clientX - x0) > 50) go(i + (e.clientX < x0 ? 1 : -1));
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(i - 1); }
  };

  return (
    <div
      ref={root}
      role="region"
      aria-roledescription="carousel"
      aria-label="Top brands"
      className="relative w-full select-none"
      style={{ ["--mx" as string]: 0, ["--my" as string]: 0 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onPointerEnter={() => setHold(true)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
      onKeyDown={onKey}
    >
      <div
        className="relative h-[440px] touch-pan-y overflow-hidden rounded-3xl shadow-2xl shadow-slate-900/20 sm:h-[500px] lg:h-[580px]"
        onPointerDown={onDown}
        onPointerUp={onUp}
        onPointerCancel={() => { drag.current = null; }}
        tabIndex={0}
        aria-live={auto ? "off" : "polite"}
      >
        {slides.map((s, k) => {
          const on = k === i;
          return (
            <div
              key={s.brand}
              role="group"
              aria-roledescription="slide"
              aria-label={`${k + 1} of ${n}: ${s.brand}`}
              aria-hidden={!on}
              className={`absolute inset-0 transition-opacity duration-700 ${on ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"}`}
              style={{ background: `radial-gradient(120% 90% at 85% 10%, ${s.glow} 0%, transparent 55%), linear-gradient(135deg, ${s.from1}, ${s.to1})` }}
            >
              {/* watermark */}
              <span aria-hidden="true" className="pointer-events-none absolute -left-4 bottom-6 whitespace-nowrap text-[7.5rem] font-black uppercase leading-none tracking-tighter text-white/[0.07] sm:text-[11rem] lg:text-[13rem]" style={{ transform: reduced ? undefined : "translate3d(calc(var(--mx) * -14px), calc(var(--my) * -8px), 0)" }}>{s.brand}</span>

              {/* text */}
              <div className="absolute left-0 top-0 z-20 flex max-w-[78%] flex-col gap-2 p-5 sm:max-w-[50%] sm:gap-3 sm:p-8 lg:p-10">
                <p className={`text-[10px] font-black uppercase tracking-[0.28em] text-white/80 ${on && !reduced ? "hb-rise" : ""}`} style={{ animationDelay: "0ms" }}>{s.kicker}</p>
                <h2 className={`text-4xl font-black uppercase leading-[0.9] tracking-tighter text-white drop-shadow sm:text-6xl lg:text-7xl ${on && !reduced ? "hb-rise" : ""}`} style={{ animationDelay: "80ms" }}>{s.brand}</h2>
                <p className={`max-w-sm text-xs leading-relaxed text-white/90 sm:text-sm ${on && !reduced ? "hb-rise" : ""}`} style={{ animationDelay: "160ms" }}>{s.blurb}</p>
                <div className={`mt-1 flex flex-wrap items-center gap-2 ${on && !reduced ? "hb-rise" : ""}`} style={{ animationDelay: "240ms" }}>
                  <Link href={s.href} tabIndex={on ? 0 : -1} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[11px] font-black uppercase tracking-widest text-slate-900 shadow-lg transition-transform hover:scale-[1.03]">
                    Shop {s.brand} <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                  <span className="rounded-full bg-black/25 px-3 py-2 text-[11px] font-bold text-white backdrop-blur">{s.count} products · from ${s.from.toFixed(2)}</span>
                </div>
                {s.lines.length > 0 && (
                  <ul className={`hidden flex-wrap gap-2 pt-1 xl:flex ${on && !reduced ? "hb-rise" : ""}`} style={{ animationDelay: "320ms" }}>
                    {s.lines.map((l) => <li key={l.href}><Link href={l.href} tabIndex={on ? 0 : -1} className="rounded-full border border-white/40 px-3 py-1 text-[11px] font-bold text-white hover:bg-white/15">{l.label}</Link></li>)}
                  </ul>
                )}
              </div>

              {/* products */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[44%] z-10 sm:top-0">
                {s.products.map((p, pk) => {
                  // pk 0 = left, 1 = centre (largest), 2 = right
                  const depth = pk === 1 ? 26 : 14;
                  const pos = ["right-[42%] sm:right-[33%]", "right-[17%] sm:right-[12%]", "right-[-3%] sm:right-[-2%]"][pk] || "right-0";
                  const size = pk === 1 ? "w-[40%] sm:w-[27%]" : "w-[32%] sm:w-[21%]";
                  const tilt = [-8, 0, 8][pk] || 0;
                  const lift = pk === 1 ? "bottom-[10%] sm:bottom-[11%]" : "bottom-[6%] sm:bottom-[8%]";
                  return (
                    <Link
                      key={p.href}
                      href={p.href}
                      tabIndex={on ? 0 : -1}
                      aria-label={`${p.title}, from $${p.price.toFixed(2)}`}
                      className={`pointer-events-auto absolute ${pos} ${lift} ${size}`}
                      style={{ transform: reduced ? `rotate(${tilt}deg)` : `translate3d(calc(var(--mx) * ${depth}px), calc(var(--my) * ${depth * 0.6}px), 0) rotate(${tilt}deg)`, transition: "transform 200ms ease-out" }}
                    >
                      <span className={`block ${on && !reduced ? "hb-pop" : ""} ${!reduced ? "hb-float" : ""}`} style={{ animationDelay: `${200 + pk * 120}ms, ${pk * 700}ms` }}>
                        <span className="block aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/30 ring-1 ring-white/60">
                          <Image src={p.image} alt={p.title} width={600} height={800} priority={k === 0} sizes="(min-width:1024px) 14vw, 30vw" className="h-full w-full scale-[1.55] object-contain" />
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* progress */}
        <div className="absolute inset-x-0 bottom-0 z-30 h-1 bg-black/20" aria-hidden="true">
          {auto && <div key={i} className="h-full origin-left bg-white" style={{ animation: `hb-progress ${MS}ms linear forwards` }} />}
        </div>
      </div>

      {/* controls */}
      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto sm:gap-2" role="tablist" aria-label="Choose brand">
          {slides.map((s, k) => (
            <button key={s.brand} type="button" role="tab" aria-selected={k === i} onClick={() => go(k)} className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-black uppercase tracking-wider transition-colors ${k === i ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}>
              {s.brand}
            </button>
          ))}
        </div>
        <div className="flex shrink-0 items-center">
          <button type="button" onClick={() => go(i - 1)} aria-label="Previous brand" className="flex h-11 w-11 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100"><ChevronLeft size={18} aria-hidden="true" /></button>
          {!reduced && <button type="button" onClick={() => setPaused((p) => !p)} aria-label={paused ? "Start automatic slide change" : "Pause automatic slide change"} className="flex h-11 w-11 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100">{paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}</button>}
          <button type="button" onClick={() => go(i + 1)} aria-label="Next brand" className="flex h-11 w-11 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100"><ChevronRight size={18} aria-hidden="true" /></button>
        </div>
      </div>
    </div>
  );
}
