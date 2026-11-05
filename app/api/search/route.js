import { NextResponse } from "next/server";
import products from "@/src/data/products.json";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase() || "";
  const category = searchParams.get("category")?.toLowerCase();
  const maxPrice = parseFloat(searchParams.get("max_price") || "0");

  let filtered = [...products];
  if (q) {
    filtered = filtered.filter((p) =>
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }
  if (category) {
    filtered = filtered.filter((p) => p.category === category || p.subcategory === category);
  }
  if (maxPrice > 0) {
    filtered = filtered.filter((p) => p.price <= maxPrice);
  }
  return NextResponse.json({
    query: q,
    count: filtered.length,
    results: filtered.slice(0, 50)
  });
}
