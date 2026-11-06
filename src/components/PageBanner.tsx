import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/src/config/site";
import images from "@/src/data/site-images.json";

type Banner = { src: string; alt: string };

// Full-width banner image shown at the top of every main and category page. The page's own <h1> stays below it
// (one h1 per page); the banner only carries a breadcrumb-style label.
export default function PageBanner({ slug, label, priority = true }: { slug: string; label: string; priority?: boolean }) {
  const b = (images.banners as Record<string, Banner>)[slug];
  if (!b) return null;
  return (
    <div className="relative w-full overflow-hidden border-b border-zinc-900 bg-black">
      <Image
        src={b.src}
        alt={b.alt}
        width={1920}
        height={480}
        priority={priority}
        sizes="100vw"
        className="h-40 w-full object-cover sm:h-52 lg:h-64"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 mx-auto flex max-w-[1440px] items-center gap-2 px-6 pb-4 text-[11px] font-black uppercase tracking-[0.25em] text-white/90 sm:pb-6">
        <Link href="/" className="hover:text-emerald-300">{SITE.name}</Link>
        <span aria-hidden="true" className="text-emerald-400">/</span>
        <span className="text-emerald-300">{label}</span>
      </div>
    </div>
  );
}
