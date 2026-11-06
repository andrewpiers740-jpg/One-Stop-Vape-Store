import React from "react";
import Link from "next/link";
import { SITE } from "@/src/config/site";
import PaymentLogos from "@/src/components/PaymentLogos";
import { Mail, Phone, MessageSquare, MapPin, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-brand-50 to-slate-100 border-t-4 border-brand-500 pt-16 pb-8 text-slate-900">
      <div className="max-w-[1440px] mx-auto px-6">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Info & Identity Column */}
          <div className="flex flex-col gap-6">
            <Link href="/" aria-label="One Stop Vape Store — home" className="w-fit">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={SITE.logo} alt={SITE.name} width={1463} height={538} className="h-14 w-auto" loading="lazy" />
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed">
              {SITE.description}
            </p>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                <ShieldCheck size={14} />
                <span>Entity Credentials</span>
              </div>
              <p className="text-xs font-bold text-slate-700">
                {SITE.legalName} d/b/a {SITE.name}
              </p>
              <p className="text-[11px] text-slate-600">
                Established December 2022 • Phoenix, AZ
              </p>
            </div>
          </div>

          {/* Column 1: Support & Info */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xs font-black uppercase tracking-widest text-emerald-600 border-b border-slate-200 pb-2">
              Support & Info
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-600">
              <li>
                <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-emerald-600 transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-600 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-600 transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-emerald-600 transition-colors">Help Center</Link>
              </li>
              <li>
                <Link href="/wholesale" className="hover:text-emerald-600 transition-colors">Wholesale Inquiry</Link>
              </li>
              <li>
                <Link href="/pages/wishlist" className="hover:text-emerald-600 transition-colors flex items-center gap-1.5">
                  <Heart size={13} className="text-emerald-600" />
                  <span>Wishlist</span>
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-emerald-600 transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Policies & Legal */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xs font-black uppercase tracking-widest text-emerald-600 border-b border-slate-200 pb-2">
              Policies & Legal
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-600">
              <li>
                <Link href="/privacy" className="hover:text-emerald-600 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-600 transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-emerald-600 transition-colors">Shipping Policy</Link>
              </li>
              <li>
                <Link href="/pact-act" className="hover:text-emerald-600 transition-colors">Pact Act FAQ</Link>
              </li>
              <li>
                <Link href="/refunds" className="hover:text-emerald-600 transition-colors">Returns & Refund Policy</Link>
              </li>
              <li>
                <Link href="/fda-disclaimer" className="hover:text-emerald-600 transition-colors">FDA Disclaimer</Link>
              </li>
              <li>
                <Link href="/credits" className="hover:text-emerald-600 transition-colors">Photo Credits</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Get In Touch */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xs font-black uppercase tracking-widest text-emerald-600 border-b border-slate-200 pb-2">
              Get In Touch
            </h3>
            <div className="flex flex-col gap-3.5">
              {/* Phone */}
              <a 
                href={`tel:+1${SITE.contact.phone.replace(/D/g, "")}`} 
                className="flex items-center gap-3 group text-slate-600 hover:text-slate-900 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <Phone size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-600">Call Us</span>
                  <span className="text-sm font-bold text-slate-700">774-734-1372</span>
                </div>
              </a>

              {/* WhatsApp */}
              <a 
                href="https://wa.me/17747341372" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group text-slate-600 hover:text-slate-900 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <MessageSquare size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-600">WhatsApp</span>
                  <span className="text-sm font-bold text-slate-700">+1 774-734-1372</span>
                </div>
              </a>

              {/* Email */}
              <a 
                href="mailto:sales@onestopvapestore.com" 
                className="flex items-center gap-3 group text-slate-600 hover:text-slate-900 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <Mail size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-600">Email</span>
                  <span className="text-sm font-bold text-slate-700">sales@onestopvapestore.com</span>
                </div>
              </a>

              {/* HQ Address */}
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.contact.location)}`} target="_blank" rel="noopener noreferrer" className="mt-2 p-3.5 rounded-xl bg-white border border-slate-200 flex items-start gap-2.5 hover:border-brand-500 transition-colors">
                <MapPin size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase font-black text-slate-600 tracking-wider">Stock Warehouse</span>
                  <span className="text-xs text-slate-700 leading-snug">{SITE.contact.location}</span>
                </div>
              </a>
            </div>
          </div>

        </div>

        <PaymentLogos className="mb-8 flex flex-col items-center gap-1 md:items-start" heading="Payment methods accepted" />

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-xs text-slate-600 font-medium">
            © {new Date().getFullYear()} {SITE.legalName} d/b/a {SITE.name}. All rights reserved. Established December 2022.
          </p>
          <p className="text-[11px] text-slate-600 max-w-md">
            Adult Signature (21+) required upon delivery. All products comply with federal PACT Act guidelines.
          </p>
        </div>

      </div>
    </footer>
  );
}
