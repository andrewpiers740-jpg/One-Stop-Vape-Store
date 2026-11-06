"use client";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Variant = { strength?: string; pack?: string };
export type CartItem = { slug: string; title: string; brand?: string; category?: string; price: number; qty: number; image?: string; variant?: Variant; variantLabel?: string };
// One cart line per product + chosen options (12mg and 15mg of the same flavour are separate lines).
export const itemKey = (i: { slug: string; variant?: Variant }) => {
  const v = i.variant || {};
  const s = Object.keys(v).sort().map((k) => k + "=" + (v as Record<string, string>)[k]).join("&");
  return s ? i.slug + "?" + s : i.slug;
};
type Ctx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  ready: boolean;
  add: (p: Omit<CartItem, "qty">, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<Ctx | null>(null);
const KEY = "osv-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed.filter((i) => i && typeof i.slug === "string" && i.qty > 0));
      }
    } catch {
      /* private mode / corrupt — start empty */
    }
    setReady(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY && e.newValue) {
        try { setItems(JSON.parse(e.newValue)); } catch { /* ignore */ }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* ignore */ }
  }, [items, ready]);

  const add = useCallback((p: Omit<CartItem, "qty">, qty = 1) => {
    setItems((cur) => {
      const k = itemKey(p);
      const found = cur.find((i) => itemKey(i) === k);
      if (found) return cur.map((i) => (itemKey(i) === k ? { ...i, qty: Math.min(99, i.qty + qty) } : i));
      return [...cur, { ...p, qty: Math.min(99, qty) }];
    });
  }, []);
  const setQty = useCallback((key: string, qty: number) => setItems((cur) => cur.map((i) => (itemKey(i) === key ? { ...i, qty: Math.max(1, Math.min(99, qty)) } : i))), []);
  const remove = useCallback((key: string) => setItems((cur) => cur.filter((i) => itemKey(i) !== key)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<Ctx>(
    () => ({
      items,
      ready,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: Math.round(items.reduce((s, i) => s + i.price * i.qty, 0) * 100) / 100,
      add, setQty, remove, clear,
    }),
    [items, ready, add, setQty, remove, clear]
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
