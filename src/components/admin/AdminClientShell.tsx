"use client";
// Admin shell: passcode gate verified by the SERVER (no passcode in client code), nav, and an api() helper
// that sends the passcode in the X-Admin-Passcode header. The passcode lives only in sessionStorage.
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingCart, MessageSquare, LogOut, Send } from "lucide-react";
import { SITE } from "@/src/config/site";

type AdminCtx = { api: (path: string, init?: RequestInit) => Promise<any>; logout: () => void };
const Ctx = React.createContext<AdminCtx | null>(null);
export const useAdmin = () => {
  const c = React.useContext(Ctx);
  if (!c) throw new Error("useAdmin outside AdminClientShell");
  return c;
};

const KEY = "osv-admin-pass";

export default function AdminClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [passcode, setPasscode] = React.useState("");
  const [authed, setAuthed] = React.useState<string | null>(null);
  const [checking, setChecking] = React.useState(true);
  const [error, setError] = React.useState("");

  const verify = React.useCallback(async (code: string) => {
    const res = await fetch("/api/admin/orders/", { headers: { "x-admin-passcode": code }, cache: "no-store" });
    if (res.status === 503) throw new Error("The admin portal is not configured yet: set ADMIN_PASSCODE in the server environment.");
    return res.ok;
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        const saved = sessionStorage.getItem(KEY);
        if (saved && (await verify(saved))) setAuthed(saved);
        else sessionStorage.removeItem(KEY);
      } catch { /* ignore */ }
      setChecking(false);
    })();
  }, [verify]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (await verify(passcode)) {
        sessionStorage.setItem(KEY, passcode);
        setAuthed(passcode);
      } else setError("Invalid passcode.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not verify the passcode.");
    }
  };

  const logout = React.useCallback(() => { sessionStorage.removeItem(KEY); setAuthed(null); setPasscode(""); }, []);

  const api = React.useCallback(async (path: string, init: RequestInit = {}) => {
    const res = await fetch(path, { ...init, headers: { "content-type": "application/json", ...(init.headers || {}), "x-admin-passcode": authed || "" }, cache: "no-store" });
    const j = await res.json().catch(() => ({}));
    if (res.status === 401) logout();
    if (!res.ok) throw new Error(j.error || `Request failed (${res.status})`);
    return j;
  }, [authed, logout]);

  if (checking) return <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black text-zinc-500">Loading…</div>;

  if (!authed) {
    return (
      <div className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-black p-6">
        <form onSubmit={login} className="flex w-full max-w-sm flex-col gap-6 text-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-black uppercase tracking-tighter text-white">Admin Portal</h1>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Secure passcode required</p>
          </div>
          <label htmlFor="admin-pass" className="sr-only">Admin passcode</label>
          <input id="admin-pass" type="password" value={passcode} onChange={(e) => setPasscode(e.target.value)} placeholder="Enter admin passcode" autoFocus autoComplete="current-password"
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-4 text-center text-xl text-white outline-none transition-all focus:border-emerald-500" />
          {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
          <button className="w-full rounded-xl bg-emerald-500 py-4 font-black uppercase tracking-widest text-white transition-all hover:bg-emerald-400">Access dashboard</button>
        </form>
      </div>
    );
  }

  const nav = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Payment composer", href: "/admin/send-payment-email", icon: Send },
    { name: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
  ];
  const active = (href: string) => (href === "/admin" ? pathname.replace(/\/$/, "") === "/admin" : pathname.startsWith(href));

  return (
    <Ctx.Provider value={{ api, logout }}>
      <div className="fixed inset-0 z-[80] flex overflow-hidden bg-black">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-zinc-900 lg:flex">
          <div className="border-b border-zinc-900 p-8">
            <span className="inline-block rounded-xl bg-white px-2 py-1 ring-1 ring-emerald-500/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={SITE.logo} alt={`${SITE.name} admin`} width={160} height={59} className="h-10 w-auto" />
            </span>
          </div>
          <nav className="flex flex-grow flex-col gap-2 p-4" aria-label="Admin">
            {nav.map((item) => (
              <Link key={item.name} href={item.href} aria-current={active(item.href) ? "page" : undefined}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-widest transition-all ${active(item.href) ? "bg-emerald-500 text-white" : "text-zinc-500 hover:bg-zinc-900 hover:text-white"}`}>
                <item.icon size={18} /> {item.name}
              </Link>
            ))}
          </nav>
          <div className="border-t border-zinc-900 p-4">
            <button onClick={logout} className="flex w-full items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-widest text-zinc-500 transition-colors hover:text-red-500"><LogOut size={18} /> Sign out</button>
          </div>
        </aside>
        <div className="flex min-w-0 flex-grow flex-col">
          <header className="flex items-center justify-between gap-3 overflow-x-auto border-b border-zinc-900 bg-black px-4 py-3 lg:hidden">
            <nav className="flex gap-1" aria-label="Admin">
              {nav.map((item) => (
                <Link key={item.name} href={item.href} aria-label={item.name} aria-current={active(item.href) ? "page" : undefined} className={`flex h-11 w-11 items-center justify-center rounded-xl ${active(item.href) ? "bg-emerald-500 text-white" : "text-zinc-400"}`}><item.icon size={20} /></Link>
              ))}
            </nav>
            <button onClick={logout} aria-label="Sign out" className="flex h-11 w-11 items-center justify-center text-zinc-400"><LogOut size={20} /></button>
          </header>
          <div className="min-h-0 flex-grow overflow-y-auto p-4 md:p-10">{children}</div>
        </div>
      </div>
    </Ctx.Provider>
  );
}
