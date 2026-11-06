import { checkAdminPasscode } from "@/lib/adminAuth";
import { listOrders, publicOrder } from "@/lib/orderStore";
import { isPersistent } from "@/lib/redis";

export const dynamic = "force-dynamic";

// GET /api/admin/orders — also the passcode check used by the admin login gate.
export async function GET(request) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  const orders = (await listOrders()).map((o) => ({ ...publicOrder(o), hasProof: (o.proofCount || 0) > 0 }));
  return Response.json({ orders, persistent: isPersistent() });
}
