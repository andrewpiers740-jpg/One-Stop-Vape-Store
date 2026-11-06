// lib/cryptoRate.js — live USD prices for the wallets in src/config/wallets.js.
// CoinGecko first (one batched call), Coinbase spot as a per-coin fallback. 30 s cache, 5 min stale grace.
import { WALLETS } from "@/src/config/wallets";

const CURRENCY = (process.env.CRYPTO_QUOTE_CURRENCY || "usd").toLowerCase();
const TTL_MS = 30_000;
const STALE_MS = 5 * 60_000;
let cache = { at: 0, rates: null };

async function coingecko() {
  const ids = [...new Set(Object.values(WALLETS).map((t) => t.coingeckoId))].join(",");
  const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(ids)}&vs_currencies=${CURRENCY}`, {
    headers: { accept: "application/json" },
    cache: "no-store",
    signal: AbortSignal.timeout(7000),
  });
  if (!res.ok) throw new Error(`coingecko ${res.status}`);
  const data = await res.json();
  const out = {};
  for (const [symbol, t] of Object.entries(WALLETS)) {
    const p = data?.[t.coingeckoId]?.[CURRENCY];
    if (typeof p === "number" && p > 0) out[symbol] = p;
  }
  return out;
}

async function coinbase(symbol) {
  const res = await fetch(`https://api.coinbase.com/v2/prices/${symbol}-${CURRENCY.toUpperCase()}/spot`, { cache: "no-store", signal: AbortSignal.timeout(6000) });
  if (!res.ok) throw new Error(`coinbase ${res.status}`);
  const p = Number((await res.json())?.data?.amount);
  if (!(p > 0)) throw new Error("coinbase bad price");
  return p;
}

export async function getRates() {
  const now = Date.now();
  if (cache.rates && now - cache.at < TTL_MS) return { rates: cache.rates, at: cache.at, stale: false };
  let rates = {};
  try {
    rates = await coingecko();
  } catch (e) {
    console.error("[crypto-rate] coingecko:", e.message);
  }
  for (const symbol of Object.keys(WALLETS)) {
    if (rates[symbol]) continue;
    try {
      rates[symbol] = await coinbase(symbol);
    } catch {
      /* try next */
    }
  }
  if (Object.keys(rates).length) {
    cache = { at: now, rates: { ...(cache.rates || {}), ...rates } };
    return { rates: cache.rates, at: now, stale: false };
  }
  if (cache.rates && now - cache.at < STALE_MS) return { rates: cache.rates, at: cache.at, stale: true };
  return null;
}

export const QUOTE_CURRENCY = CURRENCY.toUpperCase();

export { amountTag, quoteAmount } from "@/lib/cryptoQuote";
