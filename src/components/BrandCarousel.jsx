"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { BRANDS } from "@/src/config/site";

// Helper to slugify brand names for logo file lookup
const getBrandSlug = (brand) => brand.toLowerCase().replace(/\s+/g, '-');

export default function BrandCarousel() {
  // Double the list for smooth continuous marquee effect
  const marqueeBrands = [...BRANDS, ...BRANDS];

  return (
    <div className="w-full py-16 bg-white overflow-hidden">
      <h2 className="text-center text-xs font-black text-slate-600 uppercase tracking-[0.3em] mb-12">Trusted Brands</h2>
      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex gap-16 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {marqueeBrands.map((brand, i) => (
            <Link
              key={`${brand}-${i}`}
              href={`/shop?brand=${encodeURIComponent(brand)}`}
              className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            >
              {/* NOTE: Please place logo images in public/logos/ with the filename <brand-slug>.png */}
              <div className="relative w-32 h-16 flex items-center justify-center">
                 <Image 
                    src={`/logos/${getBrandSlug(brand)}.png`} 
                    alt={brand}
                    fill
                    className="object-contain"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `<span class="font-bold text-slate-500 text-xs">${brand}</span>`;
                    }}
                 />
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
