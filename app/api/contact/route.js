// POST /api/contact — ONE handler for orders, contact and wholesale enquiries (selected by `formName`).
// Both checkout buttons (email + WhatsApp) post here: the order is saved, the owner is notified and the
// customer confirmation email is sent unconditionally.
import { NextResponse } from "next/server";
import { createOrder, createEnquiry } from "@/lib/orderService";
import { rateLimited } from "@/lib/redis";

export const dynamic = "force-dynamic";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }

  // Bot checks: hidden honeypot + minimum time on the form.
  if (body.website) return NextResponse.json({ success: true }); // silently drop bots
  const elapsed = Date.now() - Number(body._t || 0);
  if (!Number.isFinite(elapsed) || elapsed < 2500) return NextResponse.json({ error: "Please take a moment to complete the form." }, { status: 400 });

  const ip = (request.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  const formName = body.formName;
  if (await rateLimited(`${formName}:${ip}`, formName === "order" ? 8 : 5, 600)) {
    return NextResponse.json({ error: "Too many requests. Please wait a few minutes and try again." }, { status: 429 });
  }

  if (formName === "order") {
    const r = await createOrder(body);
    if (r.error) return NextResponse.json({ error: r.error }, { status: r.status });
    const o = r.order;
    const q = `id=${encodeURIComponent(o.orderNumber)}&token=${encodeURIComponent(o.token)}`;
    const redirect = o.paymentKind === "crypto" || o.paymentKind === "giftcard" ? `/order/confirm-payment/?${q}` : `/thank-you-order/?${q}`;
    return NextResponse.json({
      success: true,
      orderNumber: o.orderNumber,
      token: o.token, // returned once, to build the private links
      total: o.total,
      paymentKind: o.paymentKind,
      redirect,
      emailed: Boolean(r.emailed),
      stored: r.stored !== false,
    });
  }

  if (formName === "contact" || formName === "wholesale") {
    const r = await createEnquiry(body, formName);
    if (r.error) return NextResponse.json({ error: r.error }, { status: r.status });
    return NextResponse.json({ success: true, redirect: formName === "wholesale" ? "/thank-you-wholesale/" : "/thank-you-contact/" });
  }

  return NextResponse.json({ error: "Unknown form" }, { status: 400 });
}
