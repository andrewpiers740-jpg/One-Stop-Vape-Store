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
    <div role="dialog" aria-modal="true" aria-labelledby="age-gate-title" className="fixed inset-0 z-[100] flex justify-center overflow-y-auto bg-white/95 p-4 backdrop-blur-md md:p-6">
      <div className="my-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center sm:p-8 shadow-2xl shadow-slate-900/10">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-slate-200 bg-white p-2 shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={SITE.logo} alt={`${SITE.name} logo`} width={80} height={80} className="h-full w-full object-contain" />
        </div>
        <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-brand-600">{SITE.compliance.ageThreshold}+ only</p>

        <h2 id="age-gate-title" className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
          Age Verification Required
        </h2>

        <p className="mb-8 text-sm leading-relaxed text-slate-600">
          {SITE.compliance.disclaimer}
          <br /><br />
          By clicking enter, you confirm that you are at least {SITE.compliance.ageThreshold} years of age and agree to our terms of service.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleConfirm}
            className="w-full rounded-xl bg-brand-500 py-4 font-bold text-white transition-all duration-300 hover:bg-brand-600"
          >
            I am {SITE.compliance.ageThreshold} or older
          </button>

          <a
            href="https://www.google.com"
            className="w-full rounded-xl border border-slate-300 bg-white py-4 font-medium text-slate-700 transition-all duration-300 hover:bg-slate-100"
          >
            I am under {SITE.compliance.ageThreshold}
          </a>
        </div>

        <p className="mt-6 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
          {SITE.name} · Compliance {SITE.compliance.authority}
        </p>
      </div>
    </div>
  );
}
