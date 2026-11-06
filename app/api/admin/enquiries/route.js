import { checkAdminPasscode } from "@/lib/adminAuth";
import { listEnquiries } from "@/lib/enquiryStore";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  return Response.json({ enquiries: await listEnquiries() });
}
