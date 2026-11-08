import React from "react";
import Link from "next/link";
import { SITE } from "@/src/config/site";
import EnquiryForm from "@/src/components/EnquiryForm";
import { BadgeCheck, Building2, Globe2, Mail, MessageSquare, Scale } from "lucide-react";
import PageBanner from "@/src/components/PageBanner";

export const metadata = {
  title: `Wholesale & B2B Inquiries | ${SITE.name}`,
  description: `Volume pricing for registered adult-only retailers: disposables, e-liquids, pods and nicotine pouches shipped from Phoenix, Arizona. How to apply, what to prepare and what we need from your business.`,
  alternates: { canonical: `https://${SITE.domain}/wholesale/` },
};

const steps = [
  ["Send an inquiry", "Use the form on this page, or contact us by email or WhatsApp. Tell us your business name, what you want to stock and your estimated monthly volume."],
  ["Share your documents", "We may ask for a business license or tax ID, a resale certificate and your retail license where your state requires one."],
  ["Receive a quote", "We reply with availability and a written quote for the products and quantities you list. Prices are confirmed in writing before you pay."],
  ["Pay and ship", "Pay with an accepted method, and we process the order and ship it by regional carrier with adult signature on delivery."],
];

export default function WholesalePage() {
  return (
    <>
      <PageBanner slug="wholesale" label="Wholesale" />
      <div className="flex flex-col gap-24 py-12 pb-24">

      <section className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-8">
          <p className="text-emerald-700 text-[10px] font-black uppercase tracking-[0.3em]">Business Solutions</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 uppercase leading-[0.9]">
            Wholesale for <br />
            <span className="text-emerald-700">Adult-Only Retailers</span>
          </h1>
          <p className="text-slate-700 text-lg leading-relaxed max-w-xl">
            {SITE.name} supplies registered vape shops and other adult-only retailers with volume pricing across our catalog of disposables, e-liquids, nicotine salts, pods and nicotine pouches. Tell us what you sell and what you need, and we will reply with availability and a written quote.
          </p>
          <div className="flex flex-col gap-4">
             <div className="flex items-center gap-4 text-slate-900 font-bold tracking-tight">
               <BadgeCheck className="text-emerald-700" />
               Registered businesses only, adults 21+
             </div>
             <div className="flex items-center gap-4 text-slate-900 font-bold tracking-tight">
               <Globe2 className="text-emerald-700" />
               Shipped from Phoenix, Arizona by regional carrier
             </div>
             <div className="flex items-center gap-4 text-slate-900 font-bold tracking-tight">
               <Scale className="text-emerald-700" />
               Volume pricing quoted in writing before you pay
             </div>
          </div>
        </div>

        <div className="bg-slate-100/50 border border-slate-200 p-10 rounded-[2.5rem] shadow-2xl relative">
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-8">Wholesale Inquiry</h2>
          <EnquiryForm type="wholesale" />
          <div className="absolute -top-6 -right-6 w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
             <Building2 size={24} />
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 w-full text-slate-800 leading-relaxed">
        <h2 className="mb-4 border-b border-slate-200 pb-2 text-2xl font-black tracking-tight text-slate-900">Who qualifies</h2>
        <p className="mb-4">Wholesale is for retailers that sell only to adults aged {SITE.compliance.ageThreshold} and over, and that can show a business license or tax ID. Requirements vary by state and city, and you are responsible for your own compliance, including retail licenses, tax registration and product-listing rules in your area. We may decline to supply a business that cannot show it can lawfully sell vapor products. Where your documents support it, registered businesses may order tax-exempt.</p>

        <h2 className="mb-4 mt-12 border-b border-slate-200 pb-2 text-2xl font-black tracking-tight text-slate-900">How wholesale ordering works</h2>
        <ol className="grid gap-4 sm:grid-cols-2">
          {steps.map(([t, d], i) => (
            <li key={t} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-black uppercase tracking-widest text-slate-600">Step {i + 1}</p>
              <h3 className="mt-1 text-lg font-black text-slate-900">{t}</h3>
              <p className="mt-1 text-sm">{d}</p>
            </li>
          ))}
        </ol>

        <h2 className="mb-4 mt-12 border-b border-slate-200 pb-2 text-2xl font-black tracking-tight text-slate-900">What to prepare</h2>
        <ul className="ml-5 list-disc space-y-1.5">
          <li>Your business name and legal entity.</li>
          <li>Your tax or resale ID, and your retail license where required.</li>
          <li>A shipping address that can accept adult-signature deliveries, with someone present during business hours.</li>
          <li>A list of the brands, products and quantities you want, and your estimated monthly volume.</li>
          <li>The contact details of the person who will place orders and receive deliveries.</li>
        </ul>

        <h2 className="mb-4 mt-12 border-b border-slate-200 pb-2 text-2xl font-black tracking-tight text-slate-900">Pricing, payment and shipping</h2>
        <p className="mb-4">Volume pricing depends on the product and the quantity, so there is no single published wholesale list. Browse our <Link className="text-brand-700 underline" href="/shop/disposables/">disposable vapes</Link> and <Link className="text-brand-700 underline" href="/shop/vape-juice/">vape juice</Link>, build a list and send it to us. We confirm the total in writing, and explain whether any discount applies, before you pay.</p>
        <p className="mb-4">Wholesale orders can use the payment methods we accept: Cash App, Apple Pay, Chime, cryptocurrency and gift cards. Large amounts are best handled with a quote, because some methods have transfer limits. Orders ship with adult signature on delivery, and transit follows the estimates in our <Link className="text-brand-700 underline" href="/shipping/">shipping policy</Link>: processing in 24 to 72 business hours, then about 3 to 7 business days to Arizona, Nevada, Washington and Idaho and about 11 to 18 to the eastern half of the US.</p>

        <h2 className="mb-4 mt-12 border-b border-slate-200 pb-2 text-2xl font-black tracking-tight text-slate-900">Your responsibilities as a reseller</h2>
        <p className="mb-4">As a retailer, you are responsible for your own licensing, taxes and age checks: verify the age of every customer, display required warnings, store products responsibly and follow local rules on flavors, packaging and advertising. Our <Link className="text-brand-700 underline" href="/refunds/">refund policy</Link> applies to wholesale orders unless your quote says otherwise. See <Link className="text-brand-700 underline" href="/blog/wholesale-ordering-guide/">the wholesale ordering guide</Link> and <Link className="text-brand-700 underline" href="/pact-act/">our PACT Act FAQ</Link>.</p>
        <p className="text-sm text-slate-700">We make no health claims. Nicotine is addictive, and our products are for adults only.</p>
      </section>

      <section className="bg-emerald-600 py-24 overflow-hidden relative">
         <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-black text-black/5 pointer-events-none select-none">WHOLESALE</div>
         <div className="max-w-[1440px] mx-auto px-6 relative z-10 flex flex-col items-center text-center gap-10">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">Prefer Direct Contact?</h2>
            <div className="flex flex-col md:flex-row items-center gap-6">
               <a href={`mailto:${SITE.contact.email}`} className="px-10 py-5 bg-white text-slate-900 font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform flex items-center gap-3">
                 <Mail size={20} />
                 Email Department
               </a>
               <a href={`https://wa.me/${SITE.contact.whatsapp}`} className="px-10 py-5 bg-slate-100/10 border-2 border-white text-white font-black uppercase tracking-widest rounded-full hover:bg-white hover:text-slate-900 transition-all flex items-center gap-3">
                 <MessageSquare size={20} />
                 WhatsApp Business
               </a>
            </div>
         </div>
      </section>

    </div>
    </>
  );
}
