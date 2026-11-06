import React from "react";
import { Metadata } from "next";
import { SITE } from "@/src/config/site";
import { HelpCircle, ShieldCheck, Truck, CreditCard, Box, Sparkles, MessageSquare } from "lucide-react";
import PageBanner from "@/src/components/PageBanner";

export const metadata: Metadata = {
  title: `Frequently Asked Questions | ${SITE.name}`,
  description: `Common questions regarding Nixodine formulations, PACT Act adult verification, tracked USPS/UPS shipping, crypto discounts, and wholesale options at ${SITE.name}.`,
  alternates: {
    canonical: `https://${SITE.domain}/faq/`,
  },
};

const FAQ_SECTIONS = [
  {
    title: "Nixodine & Formulations",
    icon: Sparkles,
    items: [
      {
        q: "What is Nixodine and how does it compare to standard nicotine?",
        a: "Nixodine is a patented, non-tobacco alternative compound precision-engineered to replicate the absorption curve, throat feel, and sensory satisfaction of traditional nicotine salts. It is clean, neutral in taste, and delivers maximum flavor fidelity across modern high-puff hardware."
      },
      {
        q: "Are Nixodine devices compatible with standard charging cables?",
        a: "Yes. All rechargeable Nixodine devices (such as the Hookah Labs 80K and Lost Mary MT35K) utilize standard USB Type-C charging ports for rapid recharging."
      },
      {
        q: "Do you offer single units as well as 5-pack bundles?",
        a: "Yes. All Nixodine items feature both single device purchase options and discounted 5-pack bundle pricing for adult consumers looking to stock up on their favorite flavors."
      }
    ]
  },
  {
    title: "Shipping & Fulfillment",
    icon: Truck,
    items: [
      {
        q: "Where do orders ship from and how long does delivery take?",
        a: "All orders are processed and dispatched directly from our primary logistics facility in Phoenix, Arizona (4908 E McDowell Road STE 103). Orders confirmed before 2:00 PM MST typically ship the same business day via USPS or UPS with end-to-end tracking."
      },
      {
        q: "What is your free shipping policy?",
        a: `Orders totaling $${SITE.order.freeShippingThreshold} or more qualify for free standard tracked shipping anywhere in the continental United States. Orders under $${SITE.order.freeShippingThreshold} ship for a flat fee of $${SITE.order.flatShippingFee}.`
      },
      {
        q: "Is shipping packaging discreet?",
        a: "Yes. All packages ship in plain, unmarked, tamper-evident boxes or poly mailers with no external product identifiers to ensure total privacy."
      }
    ]
  },
  {
    title: "PACT Act & Age Verification (21+)",
    icon: ShieldCheck,
    items: [
      {
        q: "How is adult age verification handled?",
        a: "Under federal law and our strict compliance policies, all purchasers must be at least 21 years of age. We utilize automated age verification software at checkout and adult signature confirmation upon final delivery."
      },
      {
        q: "What is the PACT Act and how does it affect my order?",
        a: "The Prevent All Cigarette Trafficking (PACT) Act regulates the online sale and shipment of vapor and electronic nicotine delivery systems. We fully comply with all state registration, excise reporting, and carrier compliance mandates."
      }
    ]
  },
  {
    title: "Payment Methods & Discounts",
    icon: CreditCard,
    items: [
      {
        q: "What payment methods are supported?",
        a: "We support major digital payment methods including Cryptocurrency (Bitcoin BTC, Tether USDT, Ethereum ETH, Solana SOL, Tron TRX), Apple Pay, Cashapp, Chime, and major digital Gift Cards."
      },
      {
        q: "How does the 10% Crypto discount work?",
        a: "When you select Cryptocurrency at checkout, a 10% instant discount is calculated on your merchandise subtotal. You will receive our dedicated wallet address and instructions upon order submission."
      },
      {
        q: "What is the minimum order requirement?",
        a: `To provide wholesale-competitive pricing on all items, our minimum order requirement is $${SITE.order.minOrder}.`
      }
    ]
  },
  {
    title: "Wholesale & Business Inquiries",
    icon: Box,
    items: [
      {
        q: "Do you offer wholesale pricing for brick-and-mortar vape shops?",
        a: "Yes. SV3 LLC partners with vape retailers and distributor networks across North America. Visit our dedicated Wholesale Inquiry page or chat with our B2B sales desk on WhatsApp to unlock volume master-case tier pricing."
      },
      {
        q: "Are all products guaranteed 100% authentic?",
        a: "Yes. We source exclusively through authorized manufacturer distribution channels. Every device, coil, and liquid features intact factory seals, serial codes, and scannable verification labels."
      }
    ]
  }
];

export default function FAQPage() {
  const allFaqs = FAQ_SECTIONS.flatMap(s => s.items);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <>
      <PageBanner slug="faq" label="FAQ" />
      <div className="max-w-[1440px] mx-auto px-6 py-12 md:py-20 text-slate-900 flex flex-col gap-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] mx-auto">
          <HelpCircle size={12} />
          <span>Support & Help Center</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
          Frequently Asked <span className="text-emerald-600">Questions</span>
        </h1>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
          Clear answers on shipping procedures, PACT Act compliance, Nixodine formulations, crypto discounts, and order tracking.
        </p>
      </div>

      {/* Categorized FAQ Grid */}
      <div className="flex flex-col gap-12 max-w-4xl mx-auto w-full">
        {FAQ_SECTIONS.map((section, sIdx) => {
          const Icon = section.icon;
          return (
            <div key={sIdx} className="flex flex-col gap-6">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600">
                  <Icon size={16} />
                </div>
                <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">{section.title}</h2>
              </div>

              <div className="flex flex-col gap-4">
                {section.items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    className="p-6 md:p-8 rounded-2xl bg-slate-100/40 border border-slate-200/80 hover:border-emerald-500/30 transition-all duration-300"
                  >
                    <h3 className="text-base font-bold text-slate-900 mb-3 flex items-start gap-3">
                      <span className="text-emerald-600 font-mono text-xs mt-1 shrink-0">0{iIdx + 1}.</span>
                      <span>{item.q}</span>
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed pl-7">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Support CTA */}
      <div className="max-w-4xl mx-auto w-full p-8 md:p-12 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-zinc-900 to-zinc-900 border border-emerald-500/20 text-center flex flex-col items-center gap-6">
        <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-900">Have a Specific Inquiry?</h2>
        <p className="text-sm text-slate-600 max-w-md">Our Phoenix support specialists are available on WhatsApp and email for real-time order inquiries and product guidance.</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={`https://wa.me/${SITE.contact.whatsapp}`}
            className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-black uppercase tracking-widest rounded-full transition-all duration-300 flex items-center gap-2 text-xs shadow-xl shadow-emerald-500/20"
          >
            <MessageSquare size={14} />
            <span>Chat on WhatsApp</span>
          </a>
          <a
            href={`mailto:${SITE.contact.email}`}
            className="px-8 py-4 bg-slate-200 hover:bg-zinc-700 text-slate-900 font-black uppercase tracking-widest rounded-full transition-all duration-300 text-xs border border-slate-300"
          >
            <span>Email Support</span>
          </a>
        </div>
      </div>

    </div>
    </>
  );
}
