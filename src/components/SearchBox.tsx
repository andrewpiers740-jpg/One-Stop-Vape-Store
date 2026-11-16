"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";

type Sug = {
  query: string; total: number;
  products: { title: string; brand: string; category: string; price: number; image: string; href: string }[];
  brands: { label: string; href: string; count: number }[];
  categories: { label: string; href: string }[];
};

// Search field with live suggestions (products, brands, categories). Enter goes to /search/?q=… ; arrow keys move through suggestions.
export default function SearchBox({ variant = "nav", initial = "", autoFocus = false }: { variant?: "nav" | "page"; initial?: string; autoFocus?: boolean }) {
  const router = useRouter();
  const [q, setQ] = React.useState(initial);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState<Sug | null>(null);
  const [active, setActive] = React.useState(-1);
  const wrap = React.useRef<HTMLDivElement>(null);
  const seq = React.useRef(0);
  const id = React.useId();
  const listId = `${id}-list`;

  // debounce + fetch suggestions
  React.useEffect(() => {
    const term = q.trim();
    if (term.length < 2) return;
    const n = ++seq.current;
    const t = window.setTimeout(async () => {
      try {
        const r = await fetch(`/api/suggest?q=${encodeURIComponent(term)}`);
        const j = (await r.json()) as Sug;
        if (n === seq.current) { setData(j); setActive(-1); }
      } catch { /* offline: Enter still works */ }
    }, 180);
    return () => window.clearTimeout(t);
  }, [q]);

  // close on outside click
  React.useEffect(() => {
    const on = (e: MouseEvent) => { if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", on);
    return () => document.removeEventListener("mousedown", on);
  }, []);

  const items = React.useMemo(() => {
    if (!data) return [] as { href: string; kind: string }[];
    return [
      ...data.products.map((p) => ({ href: p.href, kind: "p" })),
      ...data.brands.map((b) => ({ href: b.href, kind: "b" })),
      ...data.categories.map((c) => ({ href: c.href, kind: "c" })),
    ];
  }, [data]);

  const go = (term: string) => { setOpen(false); router.push(`/search/?q=${encodeURIComponent(term.trim())}`); };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (active >= 0 && items[active]) { setOpen(false); router.push(items[active].href); return; }
    if (q.trim()) go(q);
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { setOpen(false); return; }
    if (!open || !items.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => (a + 1) % items.length); }
    if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => (a <= 0 ? items.length - 1 : a - 1)); }
  };

  const big = variant === "page";
  const show = open && q.trim().length >= 2 && data;
  let idx = -1;
  return (
    <div ref={wrap} className="relative w-full">
      <form onSubmit={submit} role="search" className="relative w-full">
        <label htmlFor={`${id}-input`} className="sr-only">Search products, brands, flavors or strengths</label>
        <input
          id={`${id}-input`}
          type="search"
          value={q}
          autoFocus={autoFocus}
          autoComplete="off"
          enterKeyHint="search"
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
          placeholder={big ? "Search by product, brand, flavor, category or strength…" : "Search products, brands..."}
          role="combobox"
          aria-expanded={Boolean(show)}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${id}-opt-${active}` : undefined}
          className={big
            ? "w-full rounded-2xl border border-slate-300 bg-white py-4 pl-14 pr-14 text-base text-slate-900 shadow-sm placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none sm:py-5 sm:text-lg"
            : "w-full rounded-full border border-slate-200 bg-slate-100 py-2 pl-3.5 pr-14 text-xs text-slate-700 placeholder-slate-500 transition-colors focus:border-emerald-500 focus:outline-none"}
        />
        {q && (
          <button type="button" aria-label="Clear search" onClick={() => { setQ(""); setData(null); }} className={`absolute top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900 ${big ? "right-14" : "right-8"}`}>
            <X size={big ? 18 : 14} />
          </button>
        )}
        <button type="submit" aria-label="Submit search" className={`absolute top-1/2 -translate-y-1/2 text-slate-600 hover:text-emerald-600 ${big ? "left-5" : "right-2.5"}`}>
          <Search size={big ? 22 : 14} />
        </button>
      </form>

      {show && (
        <div id={listId} role="listbox" aria-label="Search suggestions" className={`absolute z-[70] mt-2 max-h-[70vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/15 ${big ? "left-0 right-0" : "left-0 w-[min(92vw,26rem)]"}`}>
          {data.products.length === 0 && data.brands.length === 0 && data.categories.length === 0 ? (
            <p className="px-3 py-4 text-sm text-slate-600">No matches for &ldquo;{q.trim()}&rdquo;. Try a brand, flavor or product name.</p>
          ) : (
            <>
              {data.products.length > 0 && <p className="px-3 pb-1 pt-2 text-[10px] font-black uppercase tracking-widest text-slate-500">Products</p>}
              {data.products.map((p) => { idx++; const i = idx; return (
                <Link key={p.href} id={`${id}-opt-${i}`} role="option" aria-selected={active === i} href={p.href} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-xl px-2 py-1.5 ${active === i ? "bg-emerald-50" : "hover:bg-slate-50"}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt="" width={44} height={44} loading="lazy" className="h-11 w-11 shrink-0 rounded-lg border border-slate-200 bg-white object-contain" />
                  <span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold text-slate-900">{p.title}</span><span className="block truncate text-[11px] text-slate-600">{p.brand} · from ${p.price.toFixed(2)}</span></span>
                </Link>
              ); })}
              {data.brands.length > 0 && <p className="px-3 pb-1 pt-3 text-[10px] font-black uppercase tracking-widest text-slate-500">Brands</p>}
              {data.brands.map((b) => { idx++; const i = idx; return (
                <Link key={b.href} id={`${id}-opt-${i}`} role="option" aria-selected={active === i} href={b.href} onClick={() => setOpen(false)} className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm font-bold ${active === i ? "bg-emerald-50" : "hover:bg-slate-50"}`}>
                  <span>{b.label}</span><span className="font-mono text-[11px] text-slate-500">{b.count} products</span>
                </Link>
              ); })}
              {data.categories.length > 0 && <p className="px-3 pb-1 pt-3 text-[10px] font-black uppercase tracking-widest text-slate-500">Categories</p>}
              {data.categories.map((c) => { idx++; const i = idx; return (
                <Link key={c.href} id={`${id}-opt-${i}`} role="option" aria-selected={active === i} href={c.href} onClick={() => setOpen(false)} className={`block rounded-xl px-3 py-2 text-sm font-bold ${active === i ? "bg-emerald-50" : "hover:bg-slate-50"}`}>{c.label}</Link>
              ); })}
              <button type="button" onClick={() => go(q)} className="mt-1 flex w-full items-center justify-between rounded-xl bg-emerald-50 px-3 py-2.5 text-sm font-black text-emerald-700 hover:bg-emerald-100">
                <span>See all {data.total.toLocaleString()} results for &ldquo;{q.trim()}&rdquo;</span><ArrowRight size={16} aria-hidden="true" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
