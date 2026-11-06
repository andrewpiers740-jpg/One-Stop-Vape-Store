"use client";
// Home-page hero "pop-up" card: five slides that pop in and change every 5 seconds.
// Pauses on hover/focus and via the pause button; honours prefers-reduced-motion (no autoplay, no animation).
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";
import images from "@/src/data/site-images.json";

const INTERVAL_MS = 5000;
const SLIDES = [
  { kicker: "One Stop Shop", title: "Everything vaping, in one place", href: "/shop/", cta: "Shop the catalog" },
  { kicker: "Hardware", title: "Vape kits & vaporizers", href: "/shop/vape-kits/", cta: "Shop hardware" },
  { kicker: "New", title: "Nixodine innovations", href: "/shop/nixodine/", cta: "Explore Nixodine" },
  { kicker: "Grab & go", title: "Disposable vapes", href: "/shop/disposables/", cta: "Shop disposables" },
  { kicker: "Premium", title: "E-liquids & nicotine salts", href: "/shop/vape-juice/", cta: "Shop e-liquid" },
];

export default function HeroShowcase() {
  const slides = images.hero.map((h, i) => ({ ...h, ...SLIDES[i] }));
  const [i, setI] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) setPaused(true);
    const on = (e: MediaQueryListEvent) => { setReduced(e.matches); if (e.matches) setPaused(true); };
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  React.useEffect(() => {
    if (paused || hover) return;
    const t = window.setTimeout(() => setI((n) => (n + 1) % slides.length), INTERVAL_MS);
    return () => window.clearTimeout(t);
  }, [i, paused, hover, slides.length]);

  const go = (n: number) => setI((n + slides.length) % slides.length);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured collections"
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-emerald-500/10">
        {slides.map((s, n) => {
          const active = n === i;
          return (
            <div
              key={s.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${n + 1} of ${slides.length}`}
              aria-hidden={!active}
              className={`absolute inset-0 transition-opacity duration-700 ${active ? "z-10 opacity-100" : "z-0 opacity-0 pointer-events-none"} ${active && !reduced ? "hero-pop" : ""}`}
            >
              <Image src={s.src} alt={s.alt} fill sizes="(min-width:1024px) 50vw, 100vw" priority={n === 0} className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
                <div className="min-w-0">
                  <p className="mb-1 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-300">{s.kicker}</p>
                  <p className="text-xl font-black leading-tight tracking-tight text-white sm:text-3xl">{s.title}</p>
                </div>
                <Link href={s.href} tabIndex={active ? 0 : -1} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-emerald-500 px-4 py-3 text-[11px] font-black uppercase tracking-widest text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 sm:px-5">
                  <span className="hidden sm:inline">{s.cta}</span><ArrowRight size={16} aria-label={s.cta} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose slide">
          {slides.map((s, n) => (
            <button
              key={s.src}
              role="tab"
              aria-selected={n === i}
              aria-label={`Show slide ${n + 1}: ${s.title}`}
              onClick={() => go(n)}
              className="group flex h-6 w-8 items-center justify-center"
            >
              <span className={`h-1.5 rounded-full transition-all ${n === i ? "w-8 bg-emerald-400" : "w-4 bg-zinc-700 group-hover:bg-zinc-500"}`} />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => go(i - 1)} aria-label="Previous slide" className="flex h-11 w-11 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-900 hover:text-white"><ChevronLeft size={18} /></button>
          <button onClick={() => setPaused((p) => !p)} aria-label={paused ? "Start automatic slide change" : "Pause automatic slide change"} className="flex h-11 w-11 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-900 hover:text-white">{paused ? <Play size={16} /> : <Pause size={16} />}</button>
          <button onClick={() => go(i + 1)} aria-label="Next slide" className="flex h-11 w-11 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-900 hover:text-white"><ChevronRight size={18} /></button>
        </div>
      </div>
      <p className="sr-only" aria-live={paused || hover ? "polite" : "off"}>{slides[i].title}</p>
    </div>
  );
}
