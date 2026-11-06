// POST /api/order/confirm-payment — customer uploads proof (screenshot / receipt / gift card photos + code).
// Needs the order id AND the private token. Rate limited. Images only (data URLs, size capped).
import { getOrder, tokenMatches, markPaymentSubmitted, saveProof } from "@/lib/orderStore";
import { sendMail, ownerEmail } from "@/lib/mailer";
import { paymentProofEmail } from "@/lib/emailTemplates";
import { rateLimited } from "@/lib/redis";

export const dynamic = "force-dynamic";

const DATA_URL = /^data:(image\/(?:jpeg|png|webp|heic|heif));base64,([A-Za-z0-9+/=]+)$/;
const MAX_FILE_BYTES = 1_200_000; // client compresses to well under this
const MAX_FILES = 4;
const clip = (v, n) => String(v ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, n);

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body) return Response.json({ error: "Invalid request." }, { status: 400 });
  const ip = (request.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  if (await rateLimited(`proof:${ip}`, 12, 600)) return Response.json({ error: "Too many uploads. Please wait a few minutes." }, { status: 429 });

  const order = await getOrder(String(body.id || ""));
  if (!order || !tokenMatches(order, String(body.token || ""))) return Response.json({ error: "Order not found." }, { status: 404 });

  const files = Array.isArray(body.files) ? body.files.slice(0, MAX_FILES) : [];
  const parsed = [];
  for (const f of files) {
    const m = typeof f === "string" ? f.match(DATA_URL) : null;
    if (!m) return Response.json({ error: "Only image files (JPG, PNG, WebP, HEIC) are accepted." }, { status: 400 });
    const bytes = Buffer.from(m[2], "base64");
    if (bytes.length > MAX_FILE_BYTES) return Response.json({ error: "One of the images is too large (limit about 1 MB after compression)." }, { status: 413 });
    parsed.push({ mime: m[1], bytes, dataUrl: f });
  }
  const txHash = clip(body.txHash, 140);
  const cardCode = clip(body.cardCode, 120);
  const notes = clip(body.notes, 500);
  if (!parsed.length && !txHash && !cardCode) return Response.json({ error: "Please attach a screenshot/receipt or enter the transaction hash or card code." }, { status: 400 });
  if (order.paymentKind === "giftcard" && !cardCode && parsed.length < 1) return Response.json({ error: "Please add the gift card code and/or photos of the card and receipt." }, { status: 400 });

  const at = new Date().toISOString();
  for (const p of parsed) await saveProof(order.orderNumber, { at, mime: p.mime, dataUrl: p.dataUrl, size: p.bytes.length });
  await markPaymentSubmitted(order.orderNumber, {
    txHash: txHash || order.txHash,
    cardCode: cardCode || order.cardCode,
    customerNotes: notes || order.customerNotes,
  });

  const mail = paymentProofEmail(order, { txHash, cardCode, notes, fileCount: parsed.length });
  const sent = await sendMail({
    to: ownerEmail(),
    replyTo: order.customerEmail,
    ...mail,
    attachments: parsed.map((p, i) => ({ filename: `${order.orderNumber}-proof-${i + 1}.${p.mime.split("/")[1].replace("jpeg", "jpg")}`, content: p.bytes, contentType: p.mime })),
  });
  return Response.json({ success: true, emailed: sent.sent });
}
