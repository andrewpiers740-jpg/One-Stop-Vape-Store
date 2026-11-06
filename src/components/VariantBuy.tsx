"use client";
import React from "react";
import { getVariantGroups, resolveVariant } from "@/lib/variants";
import AddToCartButton from "@/src/components/AddToCartButton";

type P = { slug: string; title: string; brand?: string; category?: string; price: number; priceDisplay?: string; image?: string; nicotine?: string; packSize?: string; rawPrice?: string };

// Price + option pickers (strength, packaging size) + quantity/Add to cart for a product page.
// The shown price and the price the server charges both come from lib/variants.js.
export default function VariantBuy({ product, stockLabel }: { product: P; stockLabel?: string }) {
  const groups = React.useMemo(() => getVariantGroups(product), [product]);
  const [sel, setSel] = React.useState<Record<string, string>>(() => Object.fromEntries(groups.map((g) => [g.id, g.options[0].value])));
  const v = resolveVariant(product, sel);
  const price: number = v.ok && typeof v.price === "number" ? v.price : product.price;
  const label = v.ok ? v.label : "";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <p className="font-mono text-3xl font-black tabular-nums text-slate-900 md:text-4xl" aria-live="polite">${price.toFixed(2)}</p>
        {stockLabel && (
          <span className="rounded border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-700">{stockLabel}</span>
        )}
      </div>

      {groups.map((g) => (
        <fieldset key={g.id} className="flex flex-col gap-2.5">
          <legend className="mb-0.5 text-[10px] font-black uppercase tracking-widest text-slate-600">
            {g.label}: <span className="text-slate-900">{sel[g.id]}</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {g.options.map((o) => {
              const on = sel[g.id] === o.value;
              return (
                <label
                  key={o.value}
                  className={`cursor-pointer rounded-xl border px-4 py-2.5 text-sm font-bold transition-colors focus-within:ring-2 focus-within:ring-emerald-500 ${on ? "border-emerald-500 bg-emerald-500 text-white shadow-md shadow-emerald-500/20" : "border-slate-300 bg-white text-slate-800 hover:border-emerald-500"}`}
                >
                  <input type="radio" name={`${product.slug}-${g.id}`} value={o.value} checked={on} onChange={() => setSel((s) => ({ ...s, [g.id]: o.value }))} className="sr-only" />
                  {o.label}
                  {typeof o.price === "number" && g.id === "pack" && <span className={`ml-2 font-mono text-xs ${on ? "text-white/90" : "text-slate-600"}`}>${o.price.toFixed(2)}</span>}
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}

      <AddToCartButton
        key={label}
        product={{
          slug: product.slug,
          title: label ? `${product.title} — ${label}` : product.title,
          brand: product.brand,
          category: product.category,
          price,
          image: product.image,
          variant: groups.length ? (sel as { strength?: string; pack?: string }) : undefined,
          variantLabel: label || undefined,
        }}
      />
    </div>
  );
}
