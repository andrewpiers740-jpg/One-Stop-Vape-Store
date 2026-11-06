"use client";
import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, Send, MessageCircle, Trash2 } from "lucide-react";
import { useAdmin } from "@/src/components/admin/AdminClientShell";

const pill = (on: boolean) => `rounded-full border px-4 py-2 text-xs font-black uppercase tracking-widest ${on ? "border-emerald-500 bg-emerald-500 text-white" : "border-zinc-800 text-zinc-400 hover:text-white"}`;

function Detail({ id }: { id: string }) {
  const { api } = useAdmin();
  const router = useRouter();
  const [e, setE] = React.useState<any>(null);
  const [reply, setReply] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [wa, setWa] = React.useState("");

  const load = React.useCallback(() => api(`/api/admin/enquiries/${encodeURIComponent(id)}/`).then((j) => setE(j.enquiry)).catch((x) => setMsg(x.message)), [api, id]);
  React.useEffect(() => { load(); }, [load]);

  const send = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setBusy(true); setMsg("");
    try {
      const j = await api("/api/admin/reply-enquiry/", { method: "POST", body: JSON.stringify({ id, reply }) });
      setMsg(j.sent ? "Reply emailed to the customer." : j.reason === "not-configured" ? "Email (SMTP) is not configured — use the WhatsApp reply below or copy the text." : "Email failed to send.");
      if (j.whatsappUrl) setWa(j.whatsappUrl);
      await load();
    } catch (x) { setMsg(x instanceof Error ? x.message : "Failed"); } finally { setBusy(false); }
  };
  const remove = async () => { if (window.confirm("Delete this enquiry permanently?")) { await api(`/api/admin/enquiries/${encodeURIComponent(id)}/`, { method: "DELETE" }); router.push("/admin/enquiries/"); } };

  if (!e) return <p className="text-zinc-500">{msg || "Loading…"}</p>;
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <Link href="/admin/enquiries/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white"><ArrowLeft size={14} /> All enquiries</Link>
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><h1 className="text-2xl font-black text-white">{e.name}</h1><span className="rounded-full border border-zinc-700 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-zinc-300">{e.type} · {e.status}</span></div>
        <p className="text-sm text-zinc-400"><a className="underline" href={`mailto:${e.email}`}>{e.email}</a>{e.phone ? ` · ${e.phone}` : ""} · {new Date(e.createdAt).toLocaleString()}</p>
        {e.meta?.business && <p className="mt-1 text-sm text-zinc-400">Business: {e.meta.business} · Volume: {e.meta.volume}</p>}
        <p className="mt-4 whitespace-pre-wrap rounded-xl bg-black p-4 text-sm text-zinc-200">{e.message}</p>
      </div>
      <form onSubmit={send} className="flex flex-col gap-3 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <label htmlFor="rp" className="text-xs font-black uppercase tracking-widest text-emerald-400">Your reply</label>
        <textarea id="rp" rows={6} value={reply} onChange={(x) => setReply(x.target.value)} required className="rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white" />
        <div className="flex flex-wrap items-center gap-3">
          <button disabled={busy} className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-emerald-400 disabled:opacity-50"><Send size={14} /> {busy ? "Sending…" : "Email reply"}</button>
          {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 px-5 py-3 text-xs font-black uppercase tracking-widest text-zinc-200 hover:bg-zinc-900"><MessageCircle size={14} /> Send on WhatsApp</a>}
          <button type="button" onClick={remove} className="ml-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-400"><Trash2 size={14} /> Delete</button>
        </div>
        {msg && <p role="status" className="text-sm text-emerald-400">{msg}</p>}
      </form>
    </div>
  );
}

function List() {
  const { api } = useAdmin();
  const [rows, setRows] = React.useState<any[] | null>(null);
  const [f, setF] = React.useState("all");
  React.useEffect(() => { api("/api/admin/enquiries/").then((j) => setRows(j.enquiries)); }, [api]);
  if (!rows) return <p className="text-zinc-500">Loading…</p>;
  const shown = rows.filter((r) => f === "all" || r.type === f || r.status === f);
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <h1 className="text-3xl font-black uppercase tracking-tighter text-white md:text-4xl">Enquiries</h1>
      <div className="flex flex-wrap gap-2">{["all", "contact", "wholesale", "new", "replied"].map((x) => <button key={x} onClick={() => setF(x)} className={pill(f === x)}>{x}</button>)}</div>
      {shown.length === 0 ? <p className="text-sm text-zinc-500">Nothing here.</p> : (
        <ul className="flex flex-col gap-3">
          {shown.map((r) => (
            <li key={r.id}><Link href={`/admin/enquiries/?id=${r.id}`} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 hover:border-emerald-500/50">
              <span className="font-bold text-white">{r.name}</span>
              <span className="min-w-0 flex-1 truncate text-sm text-zinc-400">{r.message}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{r.type} · {r.status}</span>
            </Link></li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Switch() { const id = useSearchParams().get("id"); return id ? <Detail id={id} /> : <List />; }
export default function EnquiriesPage() { return <Suspense fallback={<p className="text-zinc-500">Loading…</p>}><Switch /></Suspense>; }
