import { NextResponse } from "next/server";
import products from "@/src/data/products.json";

export async function GET(request, { params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}
