// GET /api/recent-orders — anonymised feed of REAL, payment-confirmed orders for the "recent purchase" notification.
// Exposes only: first item title + image, quantity, US state and a rounded "time ago". No names, emails, cities or order IDs.
import { listOrders } from "@/lib/orderStore";
import { isPersistent } from "@/lib/redis";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isPersistent()) return Response.json({ sales: [] }); // nothing to show without real stored orders
  try {
    const cutoff = Date.now() - 30 * 24 * 3600 * 1000;
    const sales = (await listOrders())
      .filter((o) => (o.status === "payment-confirmed" || o.status === "shipped") && Date.parse(o.paymentConfirmedAt || o.createdAt) > cutoff)
      .slice(0, 12)
      .map((o) => {
        const it = o.items?.[0];
        return {
          title: it?.title,
          image: it?.image,
          slug: it?.slug,
          category: it?.category,
          qty: it?.qty || 1,
          state: String(o.address?.state || "").slice(0, 2).toUpperCase(),
          at: o.paymentConfirmedAt || o.createdAt,
        };
      })
      .filter((s) => s.title && s.state.length === 2);
    return Response.json({ sales }, { headers: { "Cache-Control": "public, max-age=60" } });
  } catch {
    return Response.json({ sales: [] });
  }
}
