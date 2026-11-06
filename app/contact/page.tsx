import React from "react";
import { SITE } from "@/src/config/site";
import EnquiryForm from "@/src/components/EnquiryForm";
import { Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import PageBanner from "@/src/components/PageBanner";

export const metadata = {
  title: "Contact Us | One Stop Vape Store",
  description: "Get in touch with the One Stop Vape Store support team. Support for orders, hardware inquiries, and shipping updates via WhatsApp and Email.",
};

export default function ContactPage() {
  return (
    <>
      <PageBanner slug="contact" label="Contact" />
      <div className="max-w-[1440px] mx-auto px-6 py-12 flex flex-col gap-24">
      
      <div className="flex flex-col gap-4 max-w-3xl">
        <p className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.3em]">Support Hub</p>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 uppercase leading-none">Get in Touch</h1>
        <p className="text-slate-500 text-lg leading-relaxed">
          Need assistance with an order or have a question about our collections? Our team is available 10am - 6pm Arizona time (MST) to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-600 border-b border-slate-200 pb-2">Direct Channels</h2>
            <div className="flex flex-col gap-6">
              <a href={`https://wa.me/${SITE.contact.whatsapp}`} className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase text-slate-500 mb-0.5">WhatsApp</p>
                  <p className="text-lg font-bold text-slate-900 tracking-tight">Live Chat Support</p>
                </div>
              </a>
              <a href={`mailto:${SITE.contact.email}`} className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase text-slate-500 mb-0.5">Email</p>
                  <p className="text-lg font-bold text-slate-900 tracking-tight">{SITE.contact.email}</p>
                </div>
              </a>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase text-slate-500 mb-0.5">Location</p>
                  <p className="text-lg font-bold text-slate-900 tracking-tight">{SITE.contact.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-100/30 border border-slate-200">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-4">Response Time</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              We typically respond to all inquiries within 1-2 business hours during operating times.
            </p>
            <p className="text-slate-400 text-xs font-mono">
              MON - FRI: 10AM - 6PM ARIZONA (MST)<br />
              SAT - SUN: CLOSED
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 bg-slate-50 border border-slate-200 rounded-[2.5rem] p-10 md:p-16 shadow-2xl">
          <EnquiryForm type="contact" />
        </div>
      </div>

    </div>
    </>
  );
}
