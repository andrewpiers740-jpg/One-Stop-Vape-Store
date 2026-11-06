// lib/whatsapp.js — WhatsApp deep links. Customer→business messages open with "Hi {SITE.name},";
// business→customer messages open with the bold WA_HEADER. Never mixed.
import { SITE } from "@/src/config/site";
import { money, paymentTermsLines } from "@/lib/order";

export const WA_HEADER = `*${SITE.name}*`;
const num = SITE.contact.whatsapp;

export const waGreeting = () => `Hi ${SITE.name}, `;
export const waLink = (text = waGreeting()) => `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
export const waLinkTo = (phone, text) => `https://wa.me/${String(phone || "").replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

// Customer → business: new order request
export function waOrderMessage(order) {
  const lines = (order.items || []).map((i) => `• ${i.qty} × ${i.title} — ${money(i.price * i.qty)}`);
  return [
    `Hi ${SITE.name}, I just placed order ${order.orderNumber}.`,
    "",
    ...lines,
    "",
    `Total: ${money(order.total)}`,
    `Payment: ${order.paymentLabel}`,
    `Name: ${order.customerName}`,
    "",
    "Please send my payment details.",
  ].join("\n");
}
export const waOrderLink = (order) => waLink(waOrderMessage(order));

// Customer → business: payment made
export const waPaymentConfirmationLink = (order) =>
  waLink(`Hi ${SITE.name}, I have paid for order ${order.orderNumber} (${money(order.total)}). I have uploaded my proof of payment.`);

// Business → customer: payment details. Mirrors the email using the same parsed fields.
export function waPaymentDetailsMessage(order, fields, opening, closing, detailsUrl) {
  return [
    WA_HEADER,
    `Order ${order.orderNumber} — amount due ${money(order.total)}`,
    "",
    opening || "",
    ...fields.map((f) => `*${f.label}:* ${f.value}`),
    "",
    closing || "",
    "",
    ...paymentTermsLines().map((l, i) => `${i + 1}. ${l}`),
    "",
    detailsUrl ? `Copy-friendly details + upload your receipt: ${detailsUrl}` : "",
  ]
    .filter((l, i, a) => !(l === "" && a[i - 1] === ""))
    .join("\n");
}

// Business → customer: gift card instructions
export function waGiftCardMessage(order, card, uploadUrl) {
  return [
    WA_HEADER,
    `Order ${order.orderNumber} — pay ${money(order.total)} with a ${card.name} gift card.`,
    "",
    `1. Buy the card online here: ${card.buyUrl}`,
    `2. Upload the card details, photos and receipt here: ${uploadUrl}`,
    "",
    "We ship as soon as the card is verified.",
  ].join("\n");
}
