import products from "@/src/data/products.json";

/**
 * parsePaymentDetail
 * Splits a pasted block of text into key-value pairs for easy copying.
 * Works for bank accounts, wallet addresses, etc.
 */
export function parsePaymentDetail(text) {
  if (!text) return [];
  const lines = text.split("\n").filter(l => l.trim());
  return lines.map(line => {
    if (line.includes(":")) {
      const [label, ...rest] = line.split(":");
      return { label: label.trim(), value: rest.join(":").trim() };
    }
    return { label: "Info", value: line.trim() };
  });
}

/**
 * money
 * Formats numbers into currency.
 */
export function money(amount, currency = "$") {
  return `${currency}${Number(amount).toFixed(2)}`;
}

/**
 * paymentTermsLines
 * Returns consistent payment terms for WA/Email.
 */
export function paymentTermsLines() {
  return [
    "1. Payment must be completed within 24 hours.",
    "2. Use your Order ID as the reference.",
    "3. Send a screenshot of the confirmation to our WhatsApp."
  ];
}
