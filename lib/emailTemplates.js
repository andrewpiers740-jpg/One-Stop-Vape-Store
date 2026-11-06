// lib/emailTemplates.js — LIGHT email shell only (white card, dark brand header band, brand colour as accent).
// Dark-body emails get force-inverted by Zoho/Gmail dark mode, so the body is always light.
import { SITE } from "@/src/config/site";
import { escapeHtml as esc, money, paymentTermsHtml, methodDetail } from "@/lib/order";
import { getGiftCard, withArticle } from "@/src/config/giftcards";

const ACCENT = SITE.reply.brand.primary;
const HEADER = SITE.reply.brand.headerDark;

export const baseUrl = () => (process.env.SITE_URL || `https://${SITE.domain}`).replace(/\/$/, "");
export const orderLinks = (o) => {
  const q = `id=${encodeURIComponent(o.orderNumber)}&token=${encodeURIComponent(o.token || "")}`;
  return { details: `${baseUrl()}/order/payment-details/?${q}`, confirm: `${baseUrl()}/order/confirm-payment/?${q}` };
};

function shell(title, inner, preheader = "") {
  return `<!doctype html><html><body style="margin:0;padding:0;background:#f3f4f6;">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 12px;"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;font-family:Arial,Helvetica,sans-serif;color:#111827;">
<tr><td style="background:${HEADER};padding:20px 24px;border-bottom:4px solid ${ACCENT};">
<img src="${baseUrl()}/brand/logo-transparent.png" alt="${esc(SITE.name)}" width="170" style="display:block;height:auto;max-width:170px;">
<div style="color:#93c5fd;font-size:11px;letter-spacing:.14em;text-transform:uppercase;margin-top:10px;font-weight:700;">${esc(title)}</div></td></tr>
<tr><td style="padding:24px;font-size:14px;line-height:1.6;color:#111827;">${inner}</td></tr>
<tr><td style="padding:16px 24px;background:#f9fafb;border-top:1px solid #e5e7eb;font-size:11px;color:#6b7280;line-height:1.6;">
${esc(SITE.legalName)} · ${esc(SITE.contact.location)}<br>${esc(SITE.compliance.disclaimer)}</td></tr>
</table></td></tr></table></body></html>`;
}

const field = (label, value) =>
  `<tr><td style="padding:6px 0;color:#6b7280;font-size:12px;width:38%;vertical-align:top;">${esc(label)}</td><td style="padding:6px 0;font-weight:700;font-size:14px;word-break:break-all;">${value}</td></tr>`;
const fieldsTable = (rows) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e5e7eb;margin:12px 0;">${rows.join("")}</table>`;
const callout = (html) => `<div style="margin:16px 0;padding:14px 16px;background:#eff6ff;border:1px solid #bfdbfe;border-left:4px solid ${ACCENT};border-radius:8px;font-size:13px;">${html}</div>`;
const button = (href, label) =>
  `<p style="margin:20px 0;"><a href="${esc(href)}" style="display:inline-block;background:${ACCENT};color:#ffffff;text-decoration:none;font-weight:700;padding:13px 22px;border-radius:10px;font-size:14px;">${esc(label)}</a></p>`;

function itemsTable(o) {
  const rows = (o.items || [])
    .map((i) => `<tr><td style="padding:6px 0;border-bottom:1px solid #f3f4f6;font-size:13px;">${esc(i.qty)} × ${esc(i.title)}</td><td align="right" style="padding:6px 0;border-bottom:1px solid #f3f4f6;font-size:13px;">${money(i.price * i.qty)}</td></tr>`)
    .join("");
  const sum = (l, v, b) => `<tr><td style="padding:4px 0;font-size:13px;${b ? "font-weight:800;" : "color:#6b7280;"}">${l}</td><td align="right" style="padding:4px 0;font-size:13px;${b ? "font-weight:800;" : ""}">${v}</td></tr>`;
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}${sum("Subtotal", money(o.subtotal))}${o.discount ? sum(`Discount`, `-${money(o.discount)}`) : ""}${sum("Shipping", o.shipping ? money(o.shipping) : "Free")}${sum("Total due", money(o.total), true)}</table>`;
}

// 1. To the customer — fires for EVERY order, every channel.
export function orderConfirmationEmail(o) {
  const links = orderLinks(o);
  let body = `<p>Hi ${esc(o.customerName)}, thank you for your order <b>${esc(o.orderNumber)}</b>.</p>${itemsTable(o)}`;
  let preheader = `Order ${o.orderNumber} received`;

  if (o.paymentKind === "giftcard") {
    const card = getGiftCard(o.giftCard);
    body += `<h3 style="margin:22px 0 6px;font-size:16px;">Pay with your ${esc(card?.name)} gift card</h3>
${callout(`Amount due: <b>${money(o.total)}</b>. Buy ${esc(withArticle(card?.name || "gift card"))} gift card for exactly this amount, then upload the details so we can verify it.`)}
<ol style="margin:0 0 0 18px;padding:0;line-height:1.8;font-size:14px;">
<li><b>Buy the card online:</b> <a href="${esc(card?.buyUrl)}" style="color:${ACCENT};font-weight:700;">${esc(card?.buyUrl)}</a></li>
${(card?.steps || []).slice(1).map((s) => `<li>${esc(s)}</li>`).join("")}
<li><b>Upload your proof:</b> the card code/PIN, clear photos of the card (front and back, if physical) and your purchase receipt.</li></ol>
${button(links.confirm, "Upload gift card details")}
<p style="font-size:12px;color:#6b7280;">Use your Order ID <b>${esc(o.orderNumber)}</b> as the reference. Never share your card with anyone other than through this secure upload link.</p>`;
    preheader = `Buy your ${card?.name} gift card and upload the details for order ${o.orderNumber}`;
  } else if (o.paymentKind === "crypto") {
    body += `${callout(`Payment: <b>${esc(o.paymentLabel)}</b><br>Send <b>${esc(o.cryptoAmount)} ${esc(o.cryptoToken)}</b> on <b>${esc(o.cryptoNetwork)}</b> to:<br><span style="font-family:monospace;word-break:break-all;">${esc(o.cryptoAddress)}</span>`)}
<p>Your payment is checked automatically on the blockchain. If you have already paid, no further action is needed — you can also upload a screenshot as a backup.</p>${button(links.confirm, "View payment status / upload screenshot")}`;
  } else {
    body += `${callout(`Payment: <b>${esc(o.paymentLabel)}</b><br>Please <b>watch for our next email</b> — we are sending your ${esc(o.paymentLabel)} payment details shortly (usually within minutes during business hours).`)}`;
  }
  body += `<p style="font-size:12px;color:#6b7280;">Need help? Reply to this email or WhatsApp us on ${esc(SITE.contact.whatsappDisplay)}.</p>`;
  return { subject: `Order ${o.orderNumber} received — ${SITE.name}`, html: shell("Order received", body, preheader) };
}

// 2. To the shop owner.
export function orderNotificationEmail(o) {
  const rows = [
    field("Order", esc(o.orderNumber)),
    field("Customer", esc(o.customerName)),
    field("Email", esc(o.customerEmail)),
    field("Phone", esc(o.customerPhone)),
    field("Ship to", esc([o.address?.line1, o.address?.line2, o.address?.city, o.address?.state, o.address?.zip].filter(Boolean).join(", "))),
    field("Payment", esc(o.paymentLabel)),
    field("Channel", esc(o.channel)),
    ...(o.paymentKind === "crypto" ? [field("Crypto due", `${esc(o.cryptoAmount)} ${esc(o.cryptoToken)} (${esc(o.cryptoNetwork)})`)] : []),
  ];
  const body = `<p><b>New order ${esc(o.orderNumber)}</b> — ${money(o.total)}</p>${fieldsTable(rows)}${itemsTable(o)}${button(`${baseUrl()}/admin/orders/?id=${encodeURIComponent(o.orderNumber)}`, "Reply in Dashboard →")}`;
  return { subject: `New order ${o.orderNumber} — ${money(o.total)} (${o.paymentLabel})`, html: shell("New order", body, `New order ${o.orderNumber}`) };
}

// 3. Payment details to the customer (Cash App / Apple Pay / Chime / crypto override).
export function paymentDetailsEmail(o, fields, opening, closing) {
  const links = orderLinks(o);
  const body = `<p>Hi ${esc(o.customerName)}, here are the payment details for order <b>${esc(o.orderNumber)}</b>.</p>
${callout(`Amount due: <b>${money(o.total)}</b>`)}
${opening ? `<p>${esc(opening)}</p>` : ""}
${fieldsTable(fields.map((f) => field(f.label, esc(f.value))))}
${closing ? `<p>${esc(closing)}</p>` : ""}
${button(links.details, "Open tap-to-copy payment page")}
<p style="font-size:13px;margin-bottom:0;"><b>Payment terms</b></p>${paymentTermsHtml()}
${button(links.confirm, "I've paid — upload my receipt")}`;
  return { subject: `Payment details for order ${o.orderNumber}`, html: shell(SITE.reply.headerTagline, body, `Pay ${money(o.total)} for order ${o.orderNumber}`) };
}

// 4. Proof of payment → owner (images attached by the caller).
export function paymentProofEmail(o, meta) {
  const body = `<p><b>${esc(o.customerName)}</b> uploaded payment proof for <b>${esc(o.orderNumber)}</b> (${money(o.total)}, ${esc(o.paymentLabel)}).</p>
${fieldsTable([field("Transaction hash", esc(meta.txHash || "—")), field("Gift card code / PIN", esc(meta.cardCode || "—")), field("Notes", esc(meta.notes || "—")), field("Files", esc(String(meta.fileCount)))])}
${button(`${baseUrl()}/admin/orders/?id=${encodeURIComponent(o.orderNumber)}`, "Review in Dashboard →")}`;
  return { subject: `Payment proof — ${o.orderNumber}`, html: shell("Payment proof received", body) };
}

// 5. Payment confirmed → customer.
export function paymentConfirmedEmail(o) {
  const body = `<p>Hi ${esc(o.customerName)}, we have confirmed your payment for order <b>${esc(o.orderNumber)}</b>. Your order is now being prepared and ships from Phoenix, Arizona, usually within 24 hours.</p>${itemsTable(o)}<p style="font-size:12px;color:#6b7280;">A signature from an adult aged 21+ is required on delivery.</p>`;
  return { subject: `Payment confirmed — order ${o.orderNumber}`, html: shell("Payment confirmed", body) };
}

// 6. Enquiries.
export function enquiryNotificationEmail(e) {
  const body = `<p><b>${esc(e.type)} enquiry</b> from ${esc(e.name)}</p>${fieldsTable([field("Email", esc(e.email)), field("Phone", esc(e.phone || "—"))])}<p style="white-space:pre-wrap;">${esc(e.message)}</p>${button(`${baseUrl()}/admin/enquiries/?id=${encodeURIComponent(e.id)}`, "Reply in Dashboard →")}`;
  return { subject: `New ${e.type} enquiry from ${e.name}`, html: shell("New enquiry", body) };
}
export function enquiryAutoReplyEmail(e) {
  const body = `<p>Hi ${esc(e.name)}, thanks for contacting ${esc(SITE.name)}. We have your message and will reply shortly.</p><p style="white-space:pre-wrap;color:#6b7280;font-size:13px;">${esc(e.message)}</p>`;
  return { subject: `We received your message — ${SITE.name}`, html: shell("Message received", body) };
}
export function enquiryReplyEmail(e, reply) {
  const body = `<p>Hi ${esc(e.name)},</p><p style="white-space:pre-wrap;">${esc(reply)}</p><p style="color:#6b7280;font-size:12px;">— ${esc(SITE.name)}</p>`;
  return { subject: `Re: your enquiry to ${SITE.name}`, html: shell("Reply from us", body) };
}

export { methodDetail };
