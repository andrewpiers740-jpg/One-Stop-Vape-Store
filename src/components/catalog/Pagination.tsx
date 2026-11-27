import React from "react";
import Link from "next/link";
import { pagePath } from "@/lib/collections";

// Crawlable numbered pagination (/…/page/2/). Page 1 is the plain collection URL.
export default function Pagination({ base, page, pages, first }: { base: string; page: number; pages: number; first?: string }) {
  const href = (n: number) => (n <= 1 && first ? first : pagePath(base, n));
  if (pages <= 1) return null;
  // Keep every page within a few clicks: short series link every page; longer ones also link every 5th page, so any page is at most two hops from page 1.
  const nums = new Set<number>([1, pages, page, page - 1, page + 1, page - 2, page + 2].filter((n) => n >= 1 && n <= pages));
  if (pages <= 15) for (let n = 1; n <= pages; n++) nums.add(n);
  else for (let n = 5; n <= pages; n += 5) nums.add(n);
  const sorted = [...nums].sort((a, b) => a - b);
  const items: (number | "gap")[] = [];
  sorted.forEach((n, i) => { if (i && n - sorted[i - 1] > 1) items.push("gap"); items.push(n); });
  const cls = "flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-xs font-bold";
  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-2 border-t border-slate-200 pt-8">
      {page > 1 && <Link rel="prev" href={href(page - 1)} className={`${cls} border-slate-300 hover:border-emerald-500`}>Previous</Link>}
      {items.map((n, i) => n === "gap" ? <span key={"g" + i} className="px-1 text-slate-500">…</span> : (
        <Link key={n} href={href(n)} aria-current={n === page ? "page" : undefined} aria-label={`Page ${n}`} className={`${cls} ${n === page ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300 hover:border-emerald-500"}`}>{n}</Link>
      ))}
      {page < pages && <Link rel="next" href={href(page + 1)} className={`${cls} border-slate-300 hover:border-emerald-500`}>Next</Link>}
    </nav>
  );
}
