import { checkAdminPasscode } from "@/lib/adminAuth";
import { getOrder, updateOrder, deleteOrder, getProofs, publicOrder, markPaymentConfirmed } from "@/lib/orderStore";
import { sendMail } from "@/lib/mailer";
import { paymentConfirmedEmail, orderLinks } from "@/lib/emailTemplates";

export const dynamic = "force-dynamic";

const STATUSES = ["pending", "payment-sent", "payment-submitted", "payment-detected", "payment-confirmed", "shipped", "cancelled"];

export async function GET(request, { params }) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ order: publicOrder(order), links: orderLinks(order), proofs: await getProofs(id) });
}

// PATCH { status, notify?, trackingNumber?, adminNote? }
export async function PATCH(request, { params }) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const order = await getOrder(id);
  if (!order) return Response.json({ error: "Not found" }, { status: 404 });

  const patch = {};
  if (body.status !== undefined) {
    if (!STATUSES.includes(body.status)) return Response.json({ error: "Invalid status" }, { status: 400 });
    patch.status = body.status;
  }
  if (body.trackingNumber !== undefined) patch.trackingNumber = String(body.trackingNumber).slice(0, 80);
  if (body.adminNote !== undefined) patch.adminNote = String(body.adminNote).slice(0, 1000);

  let updated;
  if (patch.status === "payment-confirmed") {
    updated = await markPaymentConfirmed(id, { ...patch, confirmedBy: "admin" });
    if (body.notify !== false) await sendMail({ to: order.customerEmail, ...paymentConfirmedEmail(updated) });
  } else {
    updated = await updateOrder(id, patch);
  }
  return Response.json({ order: publicOrder(updated) });
}

export async function DELETE(request, { params }) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  const { id } = await params;
  await deleteOrder(id);
  return Response.json({ success: true });
}
