import React from "react";
import Link from "next/link";
import { Check, ChevronDown } from "lucide-react";

export type FacetItem = { label: string; href: string; count: number; slug?: string };
export type FacetGroup = { key: string; title: string; items: FacetItem[]; limit?: number };

function Item({ it, current }: { it: FacetItem; current: string }) {
  const active = it.href === current;
  return (
    <li>
      <Link
        href={it.href}
        aria-current={active ? "page" : undefined}
        className={`flex items-center justify-between gap-3 rounded-lg px-2.5 py-1.5 text-sm transition-colors ${active ? "bg-emerald-50 font-black text-emerald-700" : "font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900"}`}
      >
        <span className="flex min-w-0 items-center gap-2">
          {active && <Check size={14} aria-hidden="true" className="shrink-0" />}
          <span className="truncate">{it.label}</span>
        </span>
        <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-mono font-bold text-slate-600">{it.count}</span>
      </Link>
    </li>
  );
}

// Faceted navigation: every entry is a plain link to an indexable collection, brand or category page.
export default function FilterSidebar({ groups, current, clearHref }: { groups: FacetGroup[]; current: string; clearHref?: string }) {
  return (
    <nav aria-label="Filter products" className="flex flex-col gap-3">
      {clearHref && current !== clearHref && (
        <Link href={clearHref} className="rounded-xl border border-slate-300 px-4 py-2 text-center text-xs font-black uppercase tracking-wider text-slate-700 hover:border-emerald-500 hover:text-emerald-700">Clear filter</Link>
      )}
      {groups.map((g, i) => {
        const limit = g.limit || g.items.length;
        const head = g.items.slice(0, limit);
        const rest = g.items.slice(limit);
        // keep the active item visible even when it is in the collapsed part
        const activeInRest = rest.some((r) => r.href === current);
        return (
          <details key={g.key} open={i < 4 || activeInRest} className="group rounded-2xl border border-slate-200 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-slate-900 marker:hidden [&::-webkit-details-marker]:hidden">
              <span>{g.title} <span className="font-mono text-[10px] text-slate-500">({g.items.length})</span></span>
              <ChevronDown size={16} aria-hidden="true" className="transition-transform group-open:rotate-180 motion-reduce:transition-none" />
            </summary>
            <div className="px-2 pb-3">
              <ul className="flex flex-col gap-0.5">{head.map((it) => <Item key={it.href} it={it} current={current} />)}</ul>
              {rest.length > 0 && (
                <details open={activeInRest} className="mt-1">
                  <summary className="cursor-pointer list-none rounded-lg px-2.5 py-1.5 text-xs font-black text-emerald-700 marker:hidden hover:bg-emerald-50 [&::-webkit-details-marker]:hidden">Show all {g.items.length} {g.title.toLowerCase()} options</summary>
                  <ul className="mt-1 flex flex-col gap-0.5">{rest.map((it) => <Item key={it.href} it={it} current={current} />)}</ul>
                </details>
              )}
            </div>
          </details>
        );
      })}
    </nav>
  );
}
