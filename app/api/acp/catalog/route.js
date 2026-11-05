import { NextResponse } from "next/server";
import products from "@/src/data/products.json";
import { SITE, CATEGORIES } from "@/src/config/site";

export async function GET() {
  return NextResponse.json({
    protocol: { name: "acp", version: "0.1.0" },
    store: SITE.name,
    domain: SITE.domain,
    categories: CATEGORIES,
    sampleCatalog: products.slice(0, 20),
    totalCount: products.length
  });
}
