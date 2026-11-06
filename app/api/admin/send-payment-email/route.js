import { checkAdminPasscode } from "@/lib/adminAuth";
import { getOrder, markOrderSent, updateOrder } from "@/lib/orderStore";
import { parsePaymentDetail, methodDetail } from "@/lib/order";
import { sendMail } from "@/lib/mailer";
import { paymentDetailsEmail, orderConfirmationEmail, orderLinks } from "@/lib/emailTemplates";
import { waPaymentDetailsMessage, waLinkTo, waGiftCardMessage } from "@/lib/whatsapp";
import { getGiftCard } from "@/src/config/giftcards";

export const dynamic = "force-dynamic";

// POST { id, rawText, opening?, closing?, send: true|false }
// Pastes one blob of real payment info → parsePaymentDetail splits it → saved on the order, emailed to the customer,
// and a pre-filled WhatsApp link is returned. For gift card orders the gift-card guide is re-sent instead.
export async function POST(request) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  const body = await request.json().catch(() => ({}));
  const order = await getOrder(String(body.id || ""));
  if (!order) return Response.json({ error: "Order not found." }, { status: 404 });
  const links = orderLinks(order);

  if (order.paymentKind === "giftcard") {
    const card = getGiftCard(order.giftCard);
    let r = { sent: false };
    if (body.send !== false) r = await sendMail({ to: order.customerEmail, ...orderConfirmationEmail(order) });
    await markOrderSent(order.orderNumber, order.paymentDetails || "");
    return Response.json({ sent: r.sent, reason: r.reason, links, whatsappUrl: waLinkTo(order.customerPhone, waGiftCardMessage(order, card, links.confirm)) });
  }

  const rawText = String(body.rawText || "").trim().slice(0, 3000);
  const fields = parsePaymentDetail(rawText);
  if (!fields.length) return Response.json({ error: "Paste the payment details first." }, { status: 400 });

  const detail = methodDetail(order.paymentMethod);
  const fill = (s) => (s || "").replace("{amount}", `$${order.total.toFixed(2)}`).replace("{order_id}", order.orderNumber).replace("{crypto_type}", order.cryptoToken || "");
  const opening = fill(String(body.opening ?? detail?.opening ?? "").slice(0, 400));
  const closing = fill(String(body.closing ?? detail?.closing ?? "").slice(0, 400));

  await updateOrder(order.orderNumber, { paymentOpening: opening, paymentClosing: closing });
  const saved = await markOrderSent(order.orderNumber, rawText);

  let r = { sent: false, reason: "not-requested" };
  if (body.send !== false) r = await sendMail({ to: order.customerEmail, ...paymentDetailsEmail({ ...saved, token: order.token }, fields, opening, closing) });
  return Response.json({
    sent: r.sent,
    reason: r.reason,
    links,
    whatsappUrl: waLinkTo(order.customerPhone, waPaymentDetailsMessage(saved, fields, opening, closing, links.details)),
  });
}
