"use client";
import React from "react";
import { SlidersHorizontal, X } from "lucide-react";

// Mobile: a "Filters" button opens the facet list full-width; desktop: the list is always visible in the sidebar.
// The facet links are rendered on the server either way, so they stay crawlable.
export default function FilterDrawer({ children, activeCount = 0 }: { children: React.ReactNode; activeCount?: number }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="lg:w-72 lg:shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="catalog-filters"
        className="flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-black uppercase tracking-wider text-slate-900 lg:hidden"
      >
        <span className="inline-flex items-center gap-2"><SlidersHorizontal size={16} aria-hidden="true" />Filters &amp; browse{activeCount ? ` (${activeCount})` : ""}</span>
        {open ? <X size={16} aria-hidden="true" /> : <span className="text-xs text-emerald-700">Show</span>}
      </button>
      <div id="catalog-filters" className={`${open ? "block" : "hidden"} mt-3 lg:sticky lg:top-28 lg:mt-0 lg:block lg:max-h-[calc(100dvh-8rem)] lg:overflow-y-auto lg:pr-2`}>
        {children}
      </div>
    </div>
  );
}
