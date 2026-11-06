import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import type { BlogPost } from "@/src/lib/blog";

export const fmtDate = (iso: string) => new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });

// One shared tile for every blog grid: fixed 16:9 image, cover fit, equal heights.
export default function BlogCard({ post, priority = false }: { post: BlogPost; priority?: boolean }) {
  const img = post.images[0];
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 transition-colors hover:border-emerald-500/50">
      <Link href={`/blog/${post.slug}/`} className="block aspect-video overflow-hidden bg-slate-100">
        {img && <Image src={img.src} alt={img.alt} width={img.w} height={img.h} priority={priority} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />}
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
          <Link href={`/blog/category/${post.categorySlug}/`} className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-emerald-600 hover:bg-emerald-500/20">{post.category}</Link>
          <span className="flex items-center gap-1 text-slate-600"><Clock size={11} /> {post.readMinutes} min</span>
        </div>
        <h3 className="text-lg font-black leading-snug tracking-tight text-slate-900 group-hover:text-emerald-600">
          <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">{post.summary}</p>
        <time dateTime={post.date} className="mt-auto pt-2 text-[11px] font-bold uppercase tracking-widest text-slate-600">{fmtDate(post.date)}</time>
      </div>
    </article>
  );
}
