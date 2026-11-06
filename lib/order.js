// lib/order.js — isomorphic helpers (safe to import from client components AND server routes).
import { SITE } from "@/src/config/site";

const REF_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I/L
export const REF_PATTERN = new RegExp(`^${SITE.reply.orderPrefix}-[A-HJ-NP-Z2-9]{6}$`);

export function generateOrderRef() {
  const bytes = new Uint8Array(6);
  globalThis.crypto.getRandomValues(bytes); // browsers and Node 20+
  let out = "";
  for (const b of bytes) out += REF_ALPHABET[b % REF_ALPHABET.length];
  return `${SITE.reply.orderPrefix}-${out}`;
}

export function isValidOrderRef(ref) {
  return typeof ref === "string" && REF_PATTERN.test(ref);
}

export function money(amount, currency = SITE.contact.currency.symbol) {
  return `${currency}${Number(amount || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

const KNOWN_LABELS = [
  "bank", "bank name", "account", "account name", "account number", "acct", "routing", "routing number", "aba", "swift", "iban", "bic",
  "cashtag", "cash app", "cashapp", "$cashtag", "tag", "phone", "number", "email", "zelle", "name", "recipient", "beneficiary", "address",
  "wallet", "wallet address", "network", "memo", "note", "reference", "amount", "link", "pay link", "payment link", "username", "chime", "apple pay", "apple cash",
];

/**
 * parsePaymentDetail — splits one pasted blob of payment info into individually-copyable fields.
 * Tier 1: "Label: value" lines.  Tier 2: a known label word followed by the value ("Routing 123456789").
 * Tier 3: anything else becomes "Detail N". Works for any country / payment rail with no code change.
 */
export function parsePaymentDetail(text) {
  if (!text || typeof text !== "string") return [];
  const fields = [];
  let n = 0;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    const colon = line.match(/^([^:]{1,40}?)\s*[:\-–]\s+(.+)$/) || line.match(/^([^:]{1,40}?):(.+)$/);
    if (colon && !/^https?$/i.test(colon[1].trim())) {
      fields.push({ label: colon[1].trim(), value: colon[2].trim() });
      continue;
    }
    const lower = line.toLowerCase();
    const hit = KNOWN_LABELS.filter((l) => lower.startsWith(l + " ")).sort((a, b) => b.length - a.length)[0];
    if (hit) {
      fields.push({ label: line.slice(0, hit.length).replace(/\b\w/g, (c) => c.toUpperCase()), value: line.slice(hit.length).trim() });
      continue;
    }
    n += 1;
    fields.push({ label: `Detail ${n}`, value: line });
  }
  return fields.filter((f) => f.value);
}

// The single source of the payment terms — WhatsApp text, email HTML and the composer preview all read this.
export function paymentTermsLines() {
  return [
    "Pay the exact amount due and use your Order ID as the reference or note.",
    "Payment must be completed within 24 hours or the order may be released.",
    "After paying, upload your payment receipt or screenshot using the link provided.",
    "Orders ship once payment is confirmed (usually within 24 hours).",
  ];
}

export function paymentTermsHtml() {
  return `<ol style="margin:8px 0 0 18px;padding:0;color:#374151;font-size:13px;line-height:1.7;">${paymentTermsLines()
    .map((l) => `<li>${escapeHtml(l)}</li>`)
    .join("")}</ol>`;
}

export function methodDetail(methodId) {
  const key = String(methodId || "").startsWith("crypto") ? "crypto" : methodId;
  return SITE.reply.paymentMethodsDetail.find((m) => m.id === key) || null;
}

export function statusLabel(status) {
  return (
    {
      pending: "Awaiting payment",
      "payment-sent": "Payment details sent",
      "payment-submitted": "Proof submitted — checking",
      "payment-detected": "Payment detected on-chain",
      "payment-confirmed": "Payment confirmed",
      shipped: "Shipped",
      cancelled: "Cancelled",
    }[status] || status
  );
}
