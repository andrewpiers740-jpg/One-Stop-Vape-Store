// GET /api/order/payment-details?id=&token= — the customer's own order view (needs the private link token).
import { getOrder, tokenMatches, publicOrder } from "@/lib/orderStore";
import { parsePaymentDetail, methodDetail } from "@/lib/order";
import { getGiftCard } from "@/src/config/giftcards";
import { SITE } from "@/src/config/site";
import { rateLimited } from "@/lib/redis";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const ip = (request.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  if (await rateLimited(`pd:${ip}`, 60, 600)) return Response.json({ error: "Too many requests." }, { status: 429 });

  const order = await getOrder(searchParams.get("id") || "");
  if (!order || !tokenMatches(order, searchParams.get("token") || "")) return Response.json({ error: "Order not found." }, { status: 404 });

  const detail = methodDetail(order.paymentMethod);
  const fill = (s) => (s || "").replace("{amount}", `$${order.total.toFixed(2)}`).replace("{order_id}", order.orderNumber).replace("{crypto_type}", order.cryptoToken || "");
  const card = order.giftCard ? getGiftCard(order.giftCard) : null;
  const safe = publicOrder(order);
  delete safe.address;
  delete safe.customerPhone;
  return Response.json({
    order: safe,
    fields: parsePaymentDetail(order.paymentDetails || ""),
    opening: fill(order.paymentOpening ?? detail?.opening),
    closing: fill(order.paymentClosing ?? detail?.closing),
    giftCard: card ? { id: card.id, name: card.name, buyUrl: card.buyUrl, steps: card.steps } : null,
    whatsapp: SITE.contact.whatsapp,
  });
}
