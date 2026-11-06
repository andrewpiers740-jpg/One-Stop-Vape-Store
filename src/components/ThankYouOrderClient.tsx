"use client";
import React from "react";
import { MessageCircle } from "lucide-react";
import { waOrderLink } from "@/lib/whatsapp";
import { SITE } from "@/src/config/site";

// Reads the order summary the checkout stored in sessionStorage. Shows the order number and a WhatsApp link only —
// payment instructions are deliberately NOT shown here; they arrive by email/WhatsApp once we send them.
export default function ThankYouOrderClient() {
  const [o, setO] = React.useState<any>(null);
  React.useEffect(() => {
    try { const raw = sessionStorage.getItem("osv-last-order"); if (raw) setO(JSON.parse(raw)); } catch { /* ignore */ }
  }, []);
  if (!o) return null;
  return (
    <>
      <p className="font-mono text-sm text-slate-600">Order reference: <b className="text-slate-900">{o.orderNumber}</b></p>
      <a href={waOrderLink(o)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-600 hover:text-emerald-600">
        <MessageCircle size={14} /> Prefer WhatsApp? Message us ({SITE.contact.whatsappDisplay})
      </a>
    </>
  );
}
