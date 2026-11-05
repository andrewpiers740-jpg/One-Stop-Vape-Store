import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    return NextResponse.json({
      success: true,
      message: "Thank you for contacting One Stop Vape Store. Our team will review your message promptly."
    });
  } catch {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}
