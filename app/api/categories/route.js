import { NextResponse } from "next/server";
import { CATEGORIES } from "@/src/config/site";

export async function GET() {
  return NextResponse.json(CATEGORIES);
}
