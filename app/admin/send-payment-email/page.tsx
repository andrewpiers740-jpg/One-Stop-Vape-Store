"use client";
import React from "react";
import { parsePaymentDetail } from "@/lib/order";
import { Copy, Send, Check, AlertCircle } from "lucide-react";
import { SITE } from "@/src/config/site";

export default function SendPaymentEmail() {
  const [orderId, setOrderId] = React.useState("");
  const [rawText, setRawText] = React.useState("");
  const [customerEmail, setCustomerEmail] = React.useState("");
  const [status, setStatus] = React.useState("idle"); // idle, sending, success

  const fields = parsePaymentDetail(rawText);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Compose Payment Details</h1>
        <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Send modular payment fields to customers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Composer */}
        <form onSubmit={handleSend} className="bg-zinc-950 border border-zinc-900 p-10 rounded-[2.5rem] flex flex-col gap-6 shadow-2xl">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Order ID</label>
            <input 
              type="text" 
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="bg-black border border-zinc-800 rounded-xl px-4 py-4 focus:border-emerald-500 outline-none text-white transition-all font-mono" 
              placeholder="e.g. OSV-10104"
              required
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Customer Email</label>
            <input 
              type="email" 
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="bg-black border border-zinc-800 rounded-xl px-4 py-4 focus:border-emerald-500 outline-none text-white transition-all" 
              placeholder="customer@example.com"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between ml-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Paste Payment Detail</label>
              <button 
                type="button" 
                onClick={() => setRawText("Bank: Chase Bank\nAccount: One Stop Vape LLC\nRouting: 123456789\nAccount Number: 987654321")}
                className="text-[9px] text-emerald-500 underline"
              >
                Insert Sample
              </button>
            </div>
            <textarea 
              rows={6} 
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              className="bg-black border border-zinc-800 rounded-xl px-4 py-4 focus:border-emerald-500 outline-none text-white transition-all resize-none font-mono text-xs leading-relaxed" 
              placeholder="Paste details from bank or wallet..."
              required
            ></textarea>
            <p className="text-[9px] text-zinc-600 mt-1 uppercase font-bold">Autodetects &apos;Label: Value&apos; format for mobile copy-tags.</p>
          </div>

          <button 
            disabled={status !== "idle"}
            className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 disabled:text-zinc-500 text-black font-black uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
          >
            {status === "sending" ? "Processing..." : status === "success" ? <>Sent Successfully <Check size={18} /></> : <>Send Payment Email <Send size={18} /></>}
          </button>
        </form>

        {/* Live Preview */}
        <div className="flex flex-col gap-8">
           <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 border-b border-zinc-900 pb-2">Customer Preview</h3>
           
           <div className="p-8 rounded-[2rem] bg-zinc-900/30 border border-zinc-800 flex flex-col gap-8 overflow-hidden relative">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-black font-black text-xs">OSV</div>
                 <p className="text-sm font-bold text-white tracking-tight uppercase">Payment Instruction</p>
              </div>

              <div className="flex flex-col gap-1">
                 <p className="text-xl font-black text-white uppercase tracking-tighter">Order {orderId || "#----"}</p>
                 <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Ready for Payment</p>
              </div>

              <div className="flex flex-col gap-3">
                {fields.length > 0 ? (
                  fields.map((f: any, i: number) => (
                    <div key={i} className="group p-4 rounded-xl bg-black border border-zinc-800 hover:border-emerald-500/50 flex items-center justify-between transition-all">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[9px] font-black uppercase text-zinc-600 group-hover:text-emerald-500 transition-colors">{f.label}</span>
                        <span className="text-sm font-bold text-zinc-200 font-mono">{f.value}</span>
                      </div>
                      <Copy size={14} className="text-zinc-700 group-hover:text-emerald-500 transition-colors" />
                    </div>
                  ))
                ) : (
                  <div className="py-12 border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-center px-6">
                    <AlertCircle size={24} className="text-zinc-800 mb-2" />
                    <p className="text-xs text-zinc-600 font-bold uppercase tracking-wider italic">Enter details to see mobile preview</p>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                 <p className="text-[10px] text-emerald-500/70 font-bold leading-relaxed">
                   Next Steps: Once paid, tap &apos;Confirm Payment&apos; and upload your receipt screenshot.
                 </p>
              </div>
           </div>

           <div className="flex flex-col gap-4 p-6 rounded-2xl bg-zinc-950 border border-zinc-900">
             <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">WhatsApp Alternative</h4>
             <button className="flex items-center justify-center gap-3 w-full py-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all">
               Copy WhatsApp Reply
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}
