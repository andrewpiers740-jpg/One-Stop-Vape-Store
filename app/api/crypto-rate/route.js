// GET /api/crypto-rate — live quote proxy (CoinGecko → Coinbase fallback), cached 30 s server-side.
import { getRates, QUOTE_CURRENCY } from "@/lib/cryptoRate";

export const dynamic = "force-dynamic";

export async function GET() {
  const r = await getRates();
  if (!r) return Response.json({ success: false, error: "Live rate unavailable" }, { status: 502 });
  return Response.json({ success: true, rates: r.rates, updatedAt: new Date(r.at).toISOString(), currency: QUOTE_CURRENCY, stale: r.stale });
}
