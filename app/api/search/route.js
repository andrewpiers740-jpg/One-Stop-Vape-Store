import { NextResponse } from "next/server";
import { search } from "@/lib/search";

// Public product search: /api/search?q=geek+bar+blue+razz&category=disposables&strength=nicotine-free&max_price=20&limit=24
export async function GET(request) {
  const sp = new URL(request.url).searchParams;
  const r = search({ q: sp.get("q") || "", category: sp.get("category") || "", brand: sp.get("brand") || "", strength: sp.get("strength") || "", maxPrice: parseFloat(sp.get("max_price") || "0"), sort: sp.get("sort") || "relevance" });
  const limit = Math.max(1, Math.min(100, parseInt(sp.get("limit") || "50", 10) || 50));
  return NextResponse.json({ query: r.query, count: r.total, partial: r.partial, results: r.products.slice(0, limit).map(({ description, sourceImage, ...p }) => p) });
}
