import { checkAdminPasscode } from "@/lib/adminAuth";
import { getEnquiry, deleteEnquiry } from "@/lib/enquiryStore";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  const { id } = await params;
  const e = await getEnquiry(id);
  return e ? Response.json({ enquiry: e }) : Response.json({ error: "Not found" }, { status: 404 });
}

export async function DELETE(request, { params }) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  const { id } = await params;
  await deleteEnquiry(id);
  return Response.json({ success: true });
}
