// POST /api/crypto/verify { id, token } — checks the blockchain for this order's payment and, when a matching
// confirmed transfer is found, marks the order paid automatically and emails the customer + owner.
import { getOrder, tokenMatches, markPaymentConfirmed, updateOrder } from "@/lib/orderStore";
import { verifyCryptoPayment } from "@/lib/cryptoVerify";
import { sendMail, ownerEmail } from "@/lib/mailer";
import { paymentConfirmedEmail } from "@/lib/emailTemplates";
import { rateLimited } from "@/lib/redis";
import { money } from "@/lib/order";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const ip = (request.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  if (await rateLimited(`verify:${ip}:${body.id}`, 40, 600)) return Response.json({ error: "Too many checks. Please wait a minute." }, { status: 429 });

  const order = await getOrder(String(body.id || ""));
  // Same answer for a wrong token and an unknown order, so references cannot be guessed.
  if (!order || !tokenMatches(order, String(body.token || ""))) return Response.json({ error: "Order not found." }, { status: 404 });
  if (order.paymentKind !== "crypto") return Response.json({ error: "This order is not a crypto order." }, { status: 400 });
  if (order.status === "payment-confirmed" || order.status === "shipped") return Response.json({ state: "confirmed", txHash: order.txHash, status: order.status });

  const r = await verifyCryptoPayment(order);

  if (r.state === "confirmed") {
    const updated = await markPaymentConfirmed(order.orderNumber, { txHash: r.txHash, receivedUsd: r.receivedUsd, autoVerified: true });
    await Promise.all([
      sendMail({ to: order.customerEmail, ...paymentConfirmedEmail(updated) }),
      sendMail({ to: ownerEmail(), subject: `Crypto payment auto-confirmed — ${order.orderNumber} (${money(order.total)})`, html: `<p>Order <b>${order.orderNumber}</b> was matched on-chain: ${r.receivedUsd} USD, tx <code>${r.txHash}</code> (${order.cryptoNetwork}).</p>` }),
    ]);
  } else if (r.state === "detected" || r.state === "underpaid") {
    await updateOrder(order.orderNumber, {
      status: r.state === "detected" ? "payment-detected" : order.status,
      txHash: r.txHash,
      receivedUsd: r.receivedUsd,
      cryptoNote: r.state === "underpaid" ? `Underpaid: received about $${r.receivedUsd} of $${r.expectedUsd}.` : undefined,
    });
  }
  return Response.json({ state: r.state, txHash: r.txHash, receivedUsd: r.receivedUsd, expectedUsd: r.expectedUsd });
}
