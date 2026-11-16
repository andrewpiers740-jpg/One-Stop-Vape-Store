import { NextResponse } from "next/server";
import { suggest } from "@/lib/search";

// Live suggestions for the search box: /api/suggest?q=gee
export async function GET(request) {
  const q = (new URL(request.url).searchParams.get("q") || "").trim().slice(0, 60);
  if (q.length < 2) return NextResponse.json({ query: q, total: 0, products: [], brands: [], categories: [] });
  return NextResponse.json(suggest(q), { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" } });
}
