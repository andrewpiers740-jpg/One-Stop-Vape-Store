import React from "react";
import { preload } from "react-dom";
import Link from "next/link";
import { SITE } from "@/src/config/site";
import images from "@/src/data/site-images.json";

type Banner = { src: string; alt: string };

// Full-width banner image shown at the top of every main and category page. The page's own <h1> stays below it
// (one h1 per page); the banner only carries a breadcrumb-style label.
export default function PageBanner({ slug, label, priority = true, alt }: { slug: string; label: string; priority?: boolean; alt?: string }) {
  const b = (images.banners as Record<string, Banner>)[slug];
  if (!b) return null;
  // smaller copies made by scripts/images-responsive.mjs; the browser picks one with srcSet
  const responsive = /^\/images\/banners\/.+\.webp$/.test(b.src);
  const srcSet = responsive ? `${b.src.replace(/\.webp$/, "-640.webp")} 640w, ${b.src.replace(/\.webp$/, "-1280.webp")} 1280w, ${b.src} 1920w` : undefined;
  if (priority) preload(b.src, { as: "image", fetchPriority: "high", ...(srcSet ? { imageSrcSet: srcSet, imageSizes: "100vw" } : {}) });
  return (
    <div className="relative w-full overflow-hidden border-b border-zinc-900 bg-black">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={b.src}
        srcSet={srcSet}
        sizes="100vw"
        alt={alt || b.alt}
        width={1920}
        height={480}
        fetchPriority={priority ? "high" : "auto"}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
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
