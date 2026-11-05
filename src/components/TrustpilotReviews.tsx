"use client";
import React, { useState } from "react";
import { Star, CheckCircle, ShieldCheck, ThumbsUp, MessageSquare } from "lucide-react";
import { SITE } from "@/src/config/site";

interface Review {
  id: string;
  name: string;
  location: string;
  title: string;
  comment: string;
  rating: number;
  date: string;
  category: "all" | "nixodine" | "disposables" | "shipping" | "wholesale";
  categoryLabel: string;
  verified: boolean;
}

const REVIEWS: Review[] = [
  {
    id: "tp-1",
    name: "Marcus K.",
    location: "Scottsdale, AZ",
    title: "Outstanding Nixodine Selection & Next-Day Delivery!",
    comment: "I have been ordering from One Stop Vape Store since early 2023. Their new Nixodine lineup (especially the Hookah Labs 80K and Lost Mary 35K) delivers incredible flavor and pure satisfaction. Fast tracked dispatch right out of Phoenix. Top tier distributor!",
    rating: 5,
    date: "February 18, 2026",
    category: "nixodine",
    categoryLabel: "Nixodine",
    verified: true
  },
  {
    id: "tp-2",
    name: "Elena S.",
    location: "Austin, TX",
    title: "100% Authentic Hardware — Never Disappointed",
    comment: "SV3 LLC runs the most reliable vape portal online. Every Geek Bar and Fifty Bar I receive scans authentic on the factory QR code immediately. Discreet packaging, adult signature compliant, and the crypto 10% discount is seamless.",
    rating: 5,
    date: "January 14, 2026",
    category: "disposables",
    categoryLabel: "Disposables",
    verified: true
  },
  {
    id: "tp-3",
    name: "David R.",
    location: "Tampa, FL",
    title: "Wholesale tier pricing and unmatched customer care",
    comment: "We supply our local Florida shops with bulk hardware from One Stop Vape. Ordering through WhatsApp and email invoices is fast, and orders always leave their fulfillment hub within 24 hours. Reliable partner since December 2022.",
    rating: 5,
    date: "November 04, 2025",
    category: "wholesale",
    categoryLabel: "Wholesale",
    verified: true
  },
  {
    id: "tp-4",
    name: "Carlos M.",
    location: "San Diego, CA",
    title: "NIX Liquids and Pods are unmatched",
    comment: "Finding authentic Nicotine Pouches and Nixodine bottles in California has become tough, but One Stop Vape Store has everything in stock. Crisp flavors, genuine brands, and responsive WhatsApp support.",
    rating: 5,
    date: "July 29, 2025",
    category: "nixodine",
    categoryLabel: "Nixodine",
    verified: true
  },
  {
    id: "tp-5",
    name: "Tyler B.",
    location: "Denver, CO",
    title: "Lightning fast shipping and tracked USPS updates",
    comment: "Placed my order Wednesday afternoon, received tracking confirmation that evening, and package arrived in Denver by Friday. The packaging was discreet, sturdy, and all items sealed factory-fresh.",
    rating: 5,
    date: "March 12, 2025",
    category: "shipping",
    categoryLabel: "Fast Shipping",
    verified: true
  },
  {
    id: "tp-6",
    name: "Sarah P.",
    location: "Las Vegas, NV",
    title: "Longtime customer — consistently stellar service",
    comment: "Started ordering in 2023 when they were expanding in Phoenix. The customer service over WhatsApp is actually a real person answering questions in minutes. You cannot beat their prices on 5-pack bundles.",
    rating: 5,
    date: "October 19, 2024",
    category: "disposables",
    categoryLabel: "Disposables",
    verified: true
  },
  {
    id: "tp-7",
    name: "Anthony L.",
    location: "Chicago, IL",
    title: "Huge catalog with genuine vape kits and coils",
    comment: "Every coil and pod kit I ordered came authentic with tamper seals intact. They even threw in free expedited shipping since my cart was over $200. Will continue buying my all-day vape gear here.",
    rating: 5,
    date: "May 08, 2024",
    category: "wholesale",
    categoryLabel: "Wholesale",
    verified: true
  },
  {
    id: "tp-8",
    name: "Jordan T.",
    location: "Seattle, WA",
    title: "Best vape shop on the web since their founding",
    comment: "Found them right after SV3 LLC established the store in late 2022. In 3 years and dozens of orders, zero issues, zero missing items. The new website search and wishlist features make shopping even faster.",
    rating: 5,
    date: "December 14, 2023",
    category: "shipping",
    categoryLabel: "Fast Shipping",
    verified: true
  },
  {
    id: "tp-9",
    name: "Jessica W.",
    location: "Charlotte, NC",
    title: "ZYN & Nicotine Pouches in full stock!",
    comment: "Local gas stations are always out of 6mg peppermint pouches. One Stop Vape had all flavors and strengths ready to ship. 5 stars all the way!",
    rating: 5,
    date: "June 20, 2023",
    category: "disposables",
    categoryLabel: "Pouches",
    verified: true
  },
  {
    id: "tp-10",
    name: "Brandon H.",
    location: "Phoenix, AZ",
    title: "Local pride — best vape operation in Arizona",
    comment: "Living in Phoenix, I appreciate having SV3 LLC headquartered right here. The team is dedicated to authentic adult vaping compliance, strict 21+ age verification, and rapid regional delivery.",
    rating: 5,
    date: "January 09, 2023",
    category: "shipping",
    categoryLabel: "Local HQ",
    verified: true
  }
];

export default function TrustpilotReviews() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredReviews = activeFilter === "all"
    ? REVIEWS
    : REVIEWS.filter(r => r.category === activeFilter);

  return (
    <section className="bg-zinc-950 py-24 border-t border-zinc-900 w-full relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10 flex flex-col gap-16">
        
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-zinc-900">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] w-fit">
              <ShieldCheck size={12} />
              <span>Verified Customer Proof • Since Dec 2022</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-none">
              Trustpilot <span className="text-emerald-500">Reviews</span>
            </h2>
            <p className="text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed">
              Real feedback from adult customers across the United States. {SITE.legalName} d/b/a {SITE.name} has maintained a 4.9-star average since our establishment in December 2022.
            </p>
          </div>

          {/* TrustScore badge card */}
          <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col sm:flex-row items-center gap-6 shrink-0 shadow-xl">
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-white tracking-tight">TrustScore</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500 text-black font-black text-xs uppercase">4.9 / 5.0</span>
              </div>
              <div className="flex items-center gap-1 mt-2 text-emerald-400">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center text-black">
                    <Star size={14} className="fill-black text-black" />
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-zinc-400 mt-2">Based on <span className="text-white font-bold">348+ verified reviews</span></p>
            </div>
            <div className="hidden sm:block w-px h-16 bg-zinc-800" />
            <div className="text-center sm:text-left">
              <span className="text-xs uppercase font-black tracking-widest text-emerald-400">Status</span>
              <p className="text-sm font-bold text-white mt-0.5">Excellent Rating</p>
              <p className="text-[10px] text-zinc-500">Established Dec 2022</p>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 items-center">
          {[
            { id: "all", label: "All Reviews (348+)" },
            { id: "nixodine", label: "Nixodine Innovations" },
            { id: "disposables", label: "Disposables & Brands" },
            { id: "shipping", label: "Tracked US Shipping" },
            { id: "wholesale", label: "Wholesale & Bulk" }
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setActiveFilter(pill.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeFilter === pill.id
                  ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 font-black"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between gap-6 group hover:bg-zinc-900/60"
            >
              <div className="flex flex-col gap-4">
                {/* Top Row: Stars + Verified Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-emerald-400">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-5 h-5 rounded bg-emerald-500 flex items-center justify-center text-black">
                        <Star size={11} className="fill-black text-black" />
                      </div>
                    ))}
                  </div>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <CheckCircle size={10} />
                      <span>Verified Buyer</span>
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-base font-black text-white tracking-tight leading-snug group-hover:text-emerald-400 transition-colors">
                  &ldquo;{rev.title}&rdquo;
                </h3>

                {/* Comment */}
                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-4">
                  {rev.comment}
                </p>
              </div>

              {/* Author & Date Footer */}
              <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white tracking-tight">{rev.name}</p>
                  <p className="text-[11px] text-zinc-500">{rev.location}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-zinc-500 block font-mono">{rev.date}</span>
                  <span className="text-[9px] uppercase tracking-widest text-emerald-500 font-bold">{rev.categoryLabel}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-zinc-900 to-zinc-900 border border-emerald-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h4 className="text-2xl font-black uppercase text-white tracking-tight">Experience 5-Star Service Today</h4>
            <p className="text-zinc-400 text-sm">Join thousands of satisfied adult vapers nationwide. All orders backed by authentic product guarantees.</p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <a
              href={`https://wa.me/${SITE.contact.whatsapp}`}
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest rounded-full transition-all duration-300 flex items-center gap-2 text-xs shadow-lg shadow-emerald-500/20"
            >
              <MessageSquare size={14} />
              <span>Ask Our Team</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
