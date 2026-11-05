"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingCart, MessageSquare, LogOut, Settings, Send } from "lucide-react";

export default function AdminClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [passcode, setPasscode] = React.useState("");
  const [isAuth, setIsAuth] = React.useState(false);

  React.useEffect(() => {
    const saved = localStorage.getItem("admin-passcode");
    if (saved === "admin123") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuth(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "admin123") {
      localStorage.setItem("admin-passcode", passcode);
      setIsAuth(true);
    } else {
      alert("Invalid Passcode");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin-passcode");
    setIsAuth(false);
  };

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-8 text-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Admin Portal</h1>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Secure Passcode Required</p>
          </div>
          <input 
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Enter Admin Passcode"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-4 px-6 text-center text-xl text-white outline-none focus:border-emerald-500 transition-all"
            autoFocus
          />
          <button className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest rounded-xl transition-all">
            Access Dashboard
          </button>
        </form>
      </div>
    );
  }

  const nav = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Payment Composer", href: "/admin/send-payment-email", icon: Send },
    { name: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-900 flex flex-col hidden lg:flex">
        <div className="p-8 border-b border-zinc-900">
           <span className="text-xl font-black text-white uppercase tracking-tighter">OSV <span className="text-emerald-500">Admin</span></span>
        </div>
        <nav className="p-4 flex flex-col gap-2 flex-grow">
          {nav.map(item => (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${pathname === item.href ? "bg-emerald-500 text-black" : "text-zinc-500 hover:text-white hover:bg-zinc-900"}`}
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-zinc-900">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-zinc-500 hover:text-red-500 transition-colors text-sm font-bold uppercase tracking-widest">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col overflow-hidden">
        <header className="h-16 border-b border-zinc-900 flex lg:hidden items-center justify-between px-6 bg-black">
           <span className="text-lg font-black text-white uppercase">OSV Admin</span>
           <button onClick={handleLogout} className="text-zinc-500"><LogOut size={20} /></button>
        </header>
        <div className="flex-grow overflow-y-auto p-6 md:p-12">
          {children}
        </div>
      </div>
    </div>
  );
}
