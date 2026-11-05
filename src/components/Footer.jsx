import React from "react";
import Link from "next/link";
import { SITE } from "@/src/config/site";
import { Mail, Phone, MessageSquare, MapPin, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#09090b] border-t border-zinc-900 pt-16 pb-8 text-white">
      <div className="max-w-[1440px] mx-auto px-6">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Info & Identity Column */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="text-2xl font-black tracking-tighter text-white uppercase">
              One Stop <span className="text-emerald-500">Vape</span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {SITE.description}
            </p>
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                <ShieldCheck size={14} />
                <span>Entity Credentials</span>
              </div>
              <p className="text-xs font-bold text-zinc-200">
                {SITE.legalName} d/b/a {SITE.name}
              </p>
              <p className="text-[11px] text-zinc-500">
                Established December 2022 • Phoenix, AZ
              </p>
            </div>
          </div>

          {/* Column 1: Support & Info */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xs font-black uppercase tracking-widest text-emerald-400 border-b border-zinc-900 pb-2">
              Support & Info
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-zinc-400">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-emerald-400 transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-emerald-400 transition-colors">Help Center</Link>
              </li>
              <li>
                <Link href="/wholesale" className="hover:text-emerald-400 transition-colors">Wholesale Inquiry</Link>
              </li>
              <li>
                <Link href="/pages/wishlist" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Heart size={13} className="text-emerald-400" />
                  <span>Wishlist</span>
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-emerald-400 transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Policies & Legal */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xs font-black uppercase tracking-widest text-emerald-400 border-b border-zinc-900 pb-2">
              Policies & Legal
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-zinc-400">
              <li>
                <Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-emerald-400 transition-colors">Shipping Policy</Link>
              </li>
              <li>
                <Link href="/pact-act" className="hover:text-emerald-400 transition-colors">Pact Act FAQ</Link>
              </li>
              <li>
                <Link href="/refunds" className="hover:text-emerald-400 transition-colors">Returns & Refund Policy</Link>
              </li>
              <li>
                <Link href="/fda-disclaimer" className="hover:text-emerald-400 transition-colors">FDA Disclaimer</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Get In Touch */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xs font-black uppercase tracking-widest text-emerald-400 border-b border-zinc-900 pb-2">
              Get In Touch
            </h3>
            <div className="flex flex-col gap-3.5">
              {/* Phone */}
              <a 
                href="tel:7747341372" 
                className="flex items-center gap-3 group text-zinc-400 hover:text-white transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-400 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                  <Phone size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-zinc-500">Call Us</span>
                  <span className="text-sm font-bold text-zinc-200">774-734-1372</span>
                </div>
              </a>

              {/* WhatsApp */}
              <a 
                href="https://wa.me/17747341372" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group text-zinc-400 hover:text-white transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-400 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                  <MessageSquare size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-zinc-500">WhatsApp</span>
                  <span className="text-sm font-bold text-zinc-200">+1 774-734-1372</span>
                </div>
              </a>

              {/* Email */}
              <a 
                href="mailto:sales@onestopvapestore.com" 
                className="flex items-center gap-3 group text-zinc-400 hover:text-white transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-400 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                  <Mail size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-zinc-500">Email</span>
                  <span className="text-sm font-bold text-zinc-200">sales@onestopvapestore.com</span>
                </div>
              </a>

              {/* HQ Address */}
              <div className="mt-2 p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60 flex items-start gap-2.5">
                <MapPin size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase font-black text-zinc-500 tracking-wider">Fulfillment Hub</span>
                  <span className="text-xs text-zinc-300 leading-snug">{SITE.contact.location}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-xs text-zinc-500 font-medium">
            © {new Date().getFullYear()} {SITE.legalName} d/b/a {SITE.name}. All rights reserved. Established December 2022.
          </p>
          <p className="text-[11px] text-zinc-500 max-w-md">
            Adult Signature (21+) required upon delivery. All products comply with federal PACT Act guidelines.
          </p>
        </div>

      </div>
    </footer>
  );
}
