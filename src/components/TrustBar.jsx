import React from "react";
import { ShieldCheck, Truck, Zap, Headphones } from "lucide-react";

export default function TrustBar() {
  const features = [
    { icon: ShieldCheck, text: "Adult Signature (21+) Compliance" },
    { icon: Zap, text: "Fast Fulfillment" },
    { icon: Truck, text: "Reliable Shipping" },
    { icon: Headphones, text: "Customer Support" },
  ];

  return (
    <div className="bg-slate-50 border-y border-slate-200 py-6">
      <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, i) => (
          <div key={i} className="flex items-center gap-3">
            <feature.icon className="text-emerald-600 shrink-0" size={24} />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">{feature.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
