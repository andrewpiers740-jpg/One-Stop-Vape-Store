import React from "react";
import { SITE } from "@/src/config/site";
import { Mail, MapPin, MessageSquare, Phone } from "lucide-react";

export const metadata = {
  title: "Contact Us | One Stop Vape Store",
  description: "Get in touch with the One Stop Vape Store support team. Support for orders, hardware inquiries, and shipping updates via WhatsApp and Email.",
};

export default function ContactPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 py-12 flex flex-col gap-24">
      
      <div className="flex flex-col gap-4 max-w-3xl">
        <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em]">Support Hub</p>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase leading-none">Get in Touch</h1>
        <p className="text-zinc-500 text-lg leading-relaxed">
          Need assistance with an order or have a question about our collections? Our team is available 10am - 6pm PST to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400 border-b border-zinc-900 pb-2">Direct Channels</h2>
            <div className="flex flex-col gap-6">
              <a href={`https://wa.me/${SITE.contact.whatsapp}`} className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-300">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase text-zinc-500 mb-0.5">WhatsApp</p>
                  <p className="text-lg font-bold text-white tracking-tight">Live Chat Support</p>
                </div>
              </a>
              <a href={`mailto:${SITE.contact.email}`} className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center text-zinc-500 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase text-zinc-500 mb-0.5">Email</p>
                  <p className="text-lg font-bold text-white tracking-tight">{SITE.contact.email}</p>
                </div>
              </a>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center text-zinc-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase text-zinc-500 mb-0.5">Location</p>
                  <p className="text-lg font-bold text-white tracking-tight">{SITE.contact.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800">
            <h3 className="text-sm font-black text-white uppercase tracking-tight mb-4">Response Time</h3>
            <p className="text-zinc-500 text-sm leading-relaxed mb-4">
              We typically respond to all inquiries within 1-2 business hours during operating times.
            </p>
            <p className="text-zinc-600 text-xs font-mono">
              MON - FRI: 10AM - 6PM PST<br />
              SAT - SUN: CLOSED
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-10 md:p-16 shadow-2xl">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Your Name</label>
              <input type="text" className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 focus:border-emerald-500 outline-none text-white transition-all" placeholder="John Doe" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Email Address</label>
              <input type="email" className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 focus:border-emerald-500 outline-none text-white transition-all" placeholder="john@example.com" />
            </div>
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Subject</label>
              <select className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 focus:border-emerald-500 outline-none text-white transition-all appearance-none cursor-pointer">
                <option>General Inquiry</option>
                <option>Order Status</option>
                <option>Defective Product</option>
                <option>Wholesale Question</option>
              </select>
            </div>
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Your Message</label>
              <textarea rows={6} className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 focus:border-emerald-500 outline-none text-white transition-all resize-none" placeholder="How can we help you?"></textarea>
            </div>
            <div className="md:col-span-2 pt-4">
              <button className="w-full md:w-auto px-12 py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest rounded-full transition-all duration-300 shadow-xl shadow-emerald-500/10">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}
