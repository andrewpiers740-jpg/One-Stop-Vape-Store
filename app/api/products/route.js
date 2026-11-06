// GET /api/products?q=&category=&max_price=&limit= — public, read-only catalogue listing (referenced by the agent files).
import { NextResponse } from "next/server";
import { searchProducts } from "@/lib/productSearch";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const sp = new URL(request.url).searchParams;
  const data = searchProducts({ q: sp.get("q") || "", category: sp.get("category") || "", maxPrice: parseFloat(sp.get("max_price") || "0"), limit: sp.get("limit") || 24 });
  return NextResponse.json(data, { headers: { "Access-Control-Allow-Origin": "*", "Cache-Control": "public, max-age=300" } });
}
