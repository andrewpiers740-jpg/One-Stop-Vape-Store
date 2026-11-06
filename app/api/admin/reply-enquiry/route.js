import { checkAdminPasscode } from "@/lib/adminAuth";
import { getEnquiry, markEnquiryReplied } from "@/lib/enquiryStore";
import { sendMail } from "@/lib/mailer";
import { enquiryReplyEmail } from "@/lib/emailTemplates";
import { waLinkTo, WA_HEADER } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

// POST { id, reply }
export async function POST(request) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  const { id, reply } = await request.json().catch(() => ({}));
  const e = await getEnquiry(String(id || ""));
  if (!e) return Response.json({ error: "Enquiry not found" }, { status: 404 });
  const text = String(reply || "").trim().slice(0, 4000);
  if (text.length < 2) return Response.json({ error: "Write a reply first." }, { status: 400 });
  const r = await sendMail({ to: e.email, ...enquiryReplyEmail(e, text) });
  if (r.sent) await markEnquiryReplied(e.id);
  return Response.json({ sent: r.sent, reason: r.reason, whatsappUrl: e.phone ? waLinkTo(e.phone, `${WA_HEADER}\n${text}`) : null });
}
