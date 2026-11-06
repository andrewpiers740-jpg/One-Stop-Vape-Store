import React from "react";
import Link from "next/link";
import { CATEGORIES, type BlogPost } from "@/src/lib/blog";
import BlogCard from "@/src/components/blog/BlogCard";

// Shared listing UI: category chips + uniform grid + numbered pagination (server-rendered, crawlable links).
export default function BlogList({ posts, activeCategory, page, pages, basePath }: { posts: BlogPost[]; activeCategory?: string; page: number; pages: number; basePath: string }) {
  const chip = (on: boolean) => `rounded-full border px-4 py-2 text-[11px] font-black uppercase tracking-widest transition-colors ${on ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-200 text-slate-600 hover:border-emerald-500/50 hover:text-slate-900"}`;
  const href = (n: number) => (n === 1 ? basePath : `${basePath}page/${n}/`);
  const nums = Array.from({ length: pages }, (_, i) => i + 1).filter((n) => n === 1 || n === pages || Math.abs(n - page) <= 2);
  return (
    <div className="flex flex-col gap-10">
      <nav aria-label="Blog categories" className="flex flex-wrap gap-2">
        <Link href="/blog/" className={chip(!activeCategory)}>All</Link>
        {CATEGORIES.map((c) => (
          <Link key={c.slug} href={`/blog/category/${c.slug}/`} className={chip(activeCategory === c.slug)}>{c.name} <span className="opacity-60">{c.count}</span></Link>
        ))}
      </nav>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p, i) => <BlogCard key={p.slug} post={p} priority={page === 1 && i < 3} />)}
      </div>
      {pages > 1 && (
        <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-2">
          {page > 1 && <Link href={href(page - 1)} rel="prev" className={chip(false)}>← Prev</Link>}
          {nums.map((n, i) => (
            <React.Fragment key={n}>
              {i > 0 && n - nums[i - 1] > 1 && <span className="px-1 text-slate-600">…</span>}
              <Link href={href(n)} aria-current={n === page ? "page" : undefined} className={chip(n === page)}>{n}</Link>
            </React.Fragment>
          ))}
          {page < pages && <Link href={href(page + 1)} rel="next" className={chip(false)}>Next →</Link>}
        </nav>
      )}
    </div>
  );
}
