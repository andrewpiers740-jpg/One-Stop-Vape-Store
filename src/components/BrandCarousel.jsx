"use client";
import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { BRANDS } from "@/src/config/site";
import logos from "@/src/data/brand-logos.json";

// Brand logos are the brands' own marks, fetched from their websites by scripts/brand-logos.mjs into /public/logos.
// A brand with no logo on file shows its name as a clean text mark instead of a broken image.
export default function BrandCarousel() {
  // Brands with a logo first, then the rest; the list is doubled for a seamless marquee.
  const ordered = [...BRANDS].sort((a, b) => Number(!!logos[b]) - Number(!!logos[a]));
  const marquee = [...ordered, ...ordered];

  return (
    <div className="w-full overflow-hidden bg-white py-16">
      <h2 className="mb-12 text-center text-xs font-black uppercase tracking-[0.3em] text-slate-600">Trusted Brands</h2>
      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex items-center gap-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 45, ease: "linear", repeat: Infinity }}
        >
          {marquee.map((brand, i) => {
            const logo = logos[brand];
            return (
              <Link
                key={`${brand}-${i}`}
                href={`/shop?brand=${encodeURIComponent(brand)}`}
                aria-label={`Shop ${brand}`}
                className="flex h-20 w-40 flex-shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 transition-shadow hover:shadow-md"
              >
                {logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logo.src} alt={brand} width={140} height={52} className="max-h-12 w-auto max-w-full object-contain" />
                ) : (
                  <span className="text-center text-sm font-black uppercase tracking-wide text-slate-700">{brand}</span>
                )}
              </Link>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
