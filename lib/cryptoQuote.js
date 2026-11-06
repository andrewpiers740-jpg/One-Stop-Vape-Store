// lib/cryptoQuote.js — pure quote maths shared by the browser (pay window) and the server (order record).
// Small deterministic tag (1-9 smallest units) so two same-size orders rarely share an exact amount.
export function amountTag(orderRef, decimals) {
  let h = 0;
  for (const c of String(orderRef)) h = (h * 31 + c.charCodeAt(0)) % 9973;
  return ((h % 9) + 1) / 10 ** decimals;
}

export function quoteAmount(fiat, rate, decimals, orderRef) {
  const raw = fiat / rate;
  const f = 10 ** decimals;
  return Math.ceil(raw * f) / f + (orderRef ? amountTag(orderRef, decimals) : 0);
}
