"use client";
// Contact + wholesale forms. Both post to /api/contact (formName = contact | wholesale): the enquiry is saved to the
// admin dashboard, the owner is emailed, and the sender gets an auto-reply.
import React from "react";
import { useRouter } from "next/navigation";

const base = "w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-4 text-slate-900 outline-none transition-all focus:border-emerald-500";
const lbl = "ml-1 text-[10px] font-black uppercase tracking-widest text-slate-500";

export default function EnquiryForm({ type }: { type: "contact" | "wholesale" }) {
  const router = useRouter();
  const t0 = React.useRef(Date.now());
  const [v, setV] = React.useState({ name: "", email: "", phone: "", subject: "General Inquiry", business: "", taxId: "", volume: "", message: "", website: "" });
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState("");
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setV((s) => ({ ...s, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr("");
    const message = type === "contact" ? `[${v.subject}]\n${v.message}` : `${v.message}\n\nBusiness license / Tax ID: ${v.taxId || "—"}`;
    try {
      const res = await fetch("/api/contact/", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ formName: type, _t: t0.current, website: v.website, name: v.name, email: v.email, phone: v.phone, business: v.business, volume: v.volume, message }) });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || !j.success) throw new Error(j.error || "Could not send your message. Please try again.");
      router.push(j.redirect || "/thank-you-contact/");
    } catch (x) { setErr(x instanceof Error ? x.message : "Something went wrong."); setBusy(false); }
  };

  const hp = <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden"><label>Website<input tabIndex={-1} autoComplete="off" value={v.website} onChange={set("website")} /></label></div>;
  const btn = <button disabled={busy} className="w-full rounded-full bg-emerald-500 px-12 py-5 font-black uppercase tracking-widest text-white shadow-xl shadow-emerald-500/20 transition-all hover:bg-emerald-400 disabled:opacity-50 md:w-auto">{busy ? "Sending…" : type === "contact" ? "Send Message" : "Submit Application"}</button>;
  const error = err ? <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{err}</p> : null;

  if (type === "wholesale") {
    return (
      <form onSubmit={submit} className="relative flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-2"><label htmlFor="w-biz" className={lbl}>Company name</label><input id="w-biz" required value={v.business} onChange={set("business")} className={base} placeholder="Vape Shop Inc." /></div>
          <div className="flex flex-col gap-2"><label htmlFor="w-tax" className={lbl}>Business license / Tax ID</label><input id="w-tax" value={v.taxId} onChange={set("taxId")} className={base} placeholder="EIN / Resale #" /></div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-2"><label htmlFor="w-name" className={lbl}>Contact name</label><input id="w-name" required autoComplete="name" value={v.name} onChange={set("name")} className={base} placeholder="Full name" /></div>
          <div className="flex flex-col gap-2"><label htmlFor="w-email" className={lbl}>Email</label><input id="w-email" type="email" required autoComplete="email" value={v.email} onChange={set("email")} className={base} placeholder="you@company.com" /></div>
        </div>
        <div className="flex flex-col gap-2"><label htmlFor="w-phone" className={lbl}>Phone / WhatsApp</label><input id="w-phone" type="tel" autoComplete="tel" value={v.phone} onChange={set("phone")} className={base} /></div>
        <div className="flex flex-col gap-2"><label htmlFor="w-vol" className={lbl}>Estimated monthly volume</label>
          <select id="w-vol" required value={v.volume} onChange={set("volume")} className={`${base} cursor-pointer appearance-none`}><option value="">Select volume…</option><option>$1,000 - $5,000</option><option>$5,000 - $20,000</option><option>$20,000+</option></select></div>
        <div className="flex flex-col gap-2"><label htmlFor="w-msg" className={lbl}>Message / requirements</label><textarea id="w-msg" required rows={4} value={v.message} onChange={set("message")} className={`${base} resize-none`} placeholder="Brands or specific quantities required…" /></div>
        {hp}{error}{btn}
      </form>
    );
  }
  return (
    <form onSubmit={submit} className="relative grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="flex flex-col gap-2"><label htmlFor="c-name" className={lbl}>Your name</label><input id="c-name" required autoComplete="name" value={v.name} onChange={set("name")} className={base} placeholder="John Doe" /></div>
      <div className="flex flex-col gap-2"><label htmlFor="c-email" className={lbl}>Email address</label><input id="c-email" type="email" required autoComplete="email" value={v.email} onChange={set("email")} className={base} placeholder="john@example.com" /></div>
      <div className="flex flex-col gap-2"><label htmlFor="c-phone" className={lbl}>Phone / WhatsApp (optional)</label><input id="c-phone" type="tel" autoComplete="tel" value={v.phone} onChange={set("phone")} className={base} /></div>
      <div className="flex flex-col gap-2"><label htmlFor="c-sub" className={lbl}>Subject</label><select id="c-sub" value={v.subject} onChange={set("subject")} className={`${base} cursor-pointer appearance-none`}><option>General Inquiry</option><option>Order Status</option><option>Defective Product</option><option>Wholesale Question</option></select></div>
      <div className="flex flex-col gap-2 md:col-span-2"><label htmlFor="c-msg" className={lbl}>Your message</label><textarea id="c-msg" required rows={6} value={v.message} onChange={set("message")} className={`${base} resize-none`} placeholder="How can we help you?" /></div>
      {hp}
      <div className="flex flex-col gap-4 pt-4 md:col-span-2">{error}{btn}</div>
    </form>
  );
}
