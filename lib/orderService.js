// lib/orderService.js — server-side order + enquiry creation. The browser's prices/totals/status are ignored.
import { SITE } from "@/src/config/site";
import { priceOrder, resolvePaymentMethod } from "@/lib/catalog";
import { generateOrderRef, isValidOrderRef } from "@/lib/order";
import { getOrder, saveOrder, newAccessToken, isStoreConfigured } from "@/lib/orderStore";
import { saveEnquiry } from "@/lib/enquiryStore";
import { getRates, quoteAmount } from "@/lib/cryptoRate";
import { sendMail, ownerEmail } from "@/lib/mailer";
import { orderConfirmationEmail, orderNotificationEmail, enquiryNotificationEmail, enquiryAutoReplyEmail } from "@/lib/emailTemplates";

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;
const clean = (v, max = 200) => String(v ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max);

export function validateCustomer(b) {
  const c = b?.customer || {};
  const a = b?.address || {};
  const customer = { name: clean(c.name, 80), email: clean(c.email, 120).toLowerCase(), phone: clean(c.phone, 30) };
  const address = { line1: clean(a.line1, 120), line2: clean(a.line2, 80), city: clean(a.city, 60), state: clean(a.state, 40), zip: clean(a.zip, 12) };
  if (customer.name.length < 2) return { error: "Please enter your full name." };
  if (!EMAIL_RE.test(customer.email)) return { error: "Please enter a valid email address — we send your order updates there." };
  if (customer.phone.replace(/\D/g, "").length < 7) return { error: "Please enter a valid phone number." };
  if (!address.line1 || !address.city || !address.state || address.zip.replace(/\D/g, "").length < 5) return { error: "Please complete your shipping address." };
  if (b?.ageConfirmed !== true) return { error: `You must confirm you are ${SITE.compliance.ageThreshold}+ to order.` };
  return { customer, address };
}

export async function createOrder(body) {
  const v = validateCustomer(body);
  if (v.error) return { status: 400, error: v.error };

  const method = resolvePaymentMethod(body.paymentMethod, { cryptoNetwork: body.cryptoNetwork });
  if (!method) return { status: 400, error: "Please choose a valid payment method." };

  const priced = priceOrder(body.items, method.discount);
  if (!priced.ok) return { status: 400, error: priced.error };

  // Reference: client's is accepted only if well-formed and unused (or the same customer retrying).
  let ref = isValidOrderRef(body.ref) ? body.ref : null;
  if (ref) {
    const existing = await getOrder(ref);
    if (existing) {
      if (existing.customerEmail === v.customer.email && Math.abs(existing.total - priced.total) < 0.01) {
        return { status: 200, order: existing, duplicate: true };
      }
      ref = null;
    }
  }
  if (!ref) {
    for (let i = 0; i < 5 && !ref; i++) {
      const candidate = generateOrderRef();
      if (!(await getOrder(candidate))) ref = candidate;
    }
  }
  if (!ref) return { status: 500, error: "Could not create an order reference. Please try again." };

  const order = {
    orderNumber: ref,
    token: newAccessToken(),
    customerName: v.customer.name,
    customerEmail: v.customer.email,
    customerPhone: v.customer.phone,
    address: v.address,
    items: priced.lines,
    subtotal: priced.subtotal,
    discount: priced.discount,
    discountPercent: method.discount,
    shipping: priced.shipping,
    total: priced.total,
    amountDue: priced.total,
    paymentMethod: method.id,
    paymentKind: method.kind,
    paymentLabel: method.label,
    channel: body.channel === "whatsapp" ? "whatsapp" : "email",
    status: "pending",
    createdAt: new Date().toISOString(),
    notes: clean(body.notes, 500),
  };

  if (method.kind === "crypto") {
    order.cryptoToken = method.token.symbol;
    order.cryptoNetwork = method.network.label;
    order.cryptoNetworkId = method.network.id;
    order.cryptoAddress = method.network.address;
    const r = await getRates();
    const rate = r?.rates?.[method.token.symbol];
    if (rate) {
      order.cryptoRate = rate;
      order.cryptoAmount = quoteAmount(priced.total, rate, method.token.decimals, ref).toFixed(method.token.decimals);
    } else {
      order.cryptoAmount = "market-rate equivalent";
    }
  }
  if (method.kind === "giftcard") order.giftCard = method.card.id;

  const stored = isStoreConfigured();
  if (stored) await saveOrder(order);

  // Emails: the customer confirmation fires UNCONDITIONALLY (every channel), plus the owner notification.
  const conf = orderConfirmationEmail(order);
  const note = orderNotificationEmail(order);
  const [customerMail] = await Promise.all([
    sendMail({ to: order.customerEmail, ...conf }),
    sendMail({ to: ownerEmail(), replyTo: order.customerEmail, ...note }),
  ]);

  return { status: 200, order, stored, emailed: customerMail.sent };
}

export async function createEnquiry(body, type) {
  const name = clean(body?.name, 80);
  const email = clean(body?.email, 120).toLowerCase();
  const message = clean(body?.message, 4000);
  if (name.length < 2 || !EMAIL_RE.test(email) || message.length < 5) return { status: 400, error: "Please complete your name, a valid email and your message." };
  const e = {
    id: `ENQ-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`,
    type,
    name,
    email,
    phone: clean(body?.phone, 30),
    message,
    meta: type === "wholesale" ? { business: clean(body?.business, 120), volume: clean(body?.volume, 80) } : undefined,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  if (isStoreConfigured()) await saveEnquiry(e);
  await Promise.all([sendMail({ to: ownerEmail(), replyTo: email, ...enquiryNotificationEmail(e) }), sendMail({ to: email, ...enquiryAutoReplyEmail(e) })]);
  return { status: 200, enquiry: e };
}
