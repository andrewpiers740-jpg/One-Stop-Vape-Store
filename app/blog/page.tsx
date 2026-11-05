import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { SITE } from "@/src/config/site";
import SmartImage from "@/src/components/SmartImage";
import { POSTS } from "./[slug]/page";
import { Clock, ArrowRight, BookOpen, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: `Vaping Education & Guides | ${SITE.name}`,
  description: `Expert articles, hardware teardowns, Nixodine guides, and coil maintenance tutorials from the specialists at ${SITE.name}.`,
  alternates: {
    canonical: `https://${SITE.domain}/blog/`,
  },
};

export default function BlogPage() {
  const featured = POSTS[0];
  const remaining = POSTS.slice(1);

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-12 md:py-20 text-white flex flex-col gap-16">
      
      {/* Header */}
      <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mx-auto">
          <BookOpen size={12} />
          <span>Knowledge Base & Industry Insights</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
          Vaping <span className="text-emerald-500">Education</span> & Guides
        </h1>
        <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
          Comprehensive guides covering Nixodine innovations, tobacco-free nicotine pouches, pod system maintenance, and e-liquid chemistry.
        </p>
      </div>

      {/* Featured Article Card */}
      {featured && (
        <div className="rounded-3xl bg-zinc-900/40 border border-zinc-800 overflow-hidden hover:border-emerald-500/50 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 md:p-12">
            <div className="aspect-[16/10] rounded-2xl bg-white border border-zinc-200/80 p-8 flex items-center justify-center relative overflow-hidden shadow-lg">
              <SmartImage
                src={featured.image}
                alt={featured.title}
                priority={true}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-500/30 flex items-center gap-1.5">
                  <Sparkles size={11} />
                  <span>Featured Post</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 text-xs font-bold text-emerald-400 uppercase tracking-widest">
                <span>{featured.category}</span>
                <span className="text-zinc-700">•</span>
                <span className="flex items-center gap-1 text-zinc-500"><Clock size={12} /> {featured.readTime}</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight leading-snug">
                <Link href={`/blog/${featured.slug}/`} className="hover:text-emerald-400 transition-colors">
                  {featured.title}
                </Link>
              </h2>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                {featured.summary}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                <span className="text-xs text-zinc-500 font-mono">{featured.date}</span>
                <Link
                  href={`/blog/${featured.slug}/`}
                  className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <span>Read Article</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Remaining Articles */}
      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-3">
          <span>Recent Publications</span>
          <span className="h-px bg-zinc-900 flex-grow" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {remaining.map((post) => (
            <div
              key={post.slug}
              className="group p-6 rounded-3xl bg-zinc-900/30 border border-zinc-800/80 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between gap-6"
            >
              <div className="flex flex-col gap-4">
                <div className="aspect-[16/9] rounded-2xl bg-white border border-zinc-200/80 p-6 flex items-center justify-center overflow-hidden shadow-sm">
                  <SmartImage
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex items-center gap-3 text-[10px] font-bold text-emerald-400 uppercase tracking-widest pt-2">
                  <span>{post.category}</span>
                  <span className="text-zinc-700">•</span>
                  <span className="flex items-center gap-1 text-zinc-500"><Clock size={11} /> {post.readTime}</span>
                </div>

                <h3 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-emerald-400 transition-colors leading-snug">
                  <Link href={`/blog/${post.slug}/`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
                  {post.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-800/60 text-xs">
                <span className="text-zinc-500 font-mono text-[11px]">{post.date}</span>
                <Link
                  href={`/blog/${post.slug}/`}
                  className="text-emerald-400 hover:text-white font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
                >
                  <span>Read Guide</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
