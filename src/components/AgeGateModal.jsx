"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { SITE } from "@/src/config/site";

export default function AgeGateModal() {
  const [show, setShow] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const confirmed = localStorage.getItem("age-confirmed");
    if (!confirmed) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow(true);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem("age-confirmed", "true");
    setShow(false);
  };

  if (!show || pathname?.startsWith("/admin")) return null; // staff pages are exempt

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-md">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 mb-6">
          <span className="text-2xl font-bold">{SITE.compliance.ageThreshold}+</span>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">
          Age Verification Required
        </h2>
        
        <p className="text-zinc-400 text-sm leading-relaxed mb-8">
          {SITE.compliance.disclaimer}
          <br /><br />
          By clicking enter, you confirm that you are at least {SITE.compliance.ageThreshold} years of age and agree to our terms of service.
        </p>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={handleConfirm}
            className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl transition-all duration-300"
          >
            I am {SITE.compliance.ageThreshold} or older
          </button>
          
          <a
            href="https://www.google.com"
            className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition-all duration-300"
          >
            I am under {SITE.compliance.ageThreshold}
          </a>
        </div>
        
        <p className="mt-6 text-[10px] uppercase tracking-widest text-zinc-600 font-semibold">
          {SITE.name} · Compliance {SITE.compliance.authority}
        </p>
      </div>
    </div>
  );
}
