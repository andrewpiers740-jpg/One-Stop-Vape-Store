import React from "react";
import { SITE } from "@/src/config/site";

export const metadata = {
  title: "FDA Disclaimer | One Stop Vape Store",
  description: "Official FDA compliance statement and legal disclaimer.",
};

export default function FdaDisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 prose prose-invert">
      <h1><strong>FDA Disclaimer</strong></h1>

      <p>
        <em>&ldquo;The statements made regarding these products have not been evaluated by the Food and Drug Administration. The efficacy of these products and the testimonials made have not been confirmed by FDA- approved research. These products are not intended to diagnose, treat, cure or prevent any disease. All information presented here is not meant as a substitute for or alternative to information from health care practitioners. Please consult your healthcare professional about potential interactions or other possible complications before using any product. The Federal Food, Drug, and Cosmetic Act requires this notice. SV3 LLC shall not be held liable for the medical claims made by customer testimonials.</em>
      </p>
      <p>
        <em>These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure or prevent any disease or ailment. SV3 LLC assumes no responsibility for the improper use of these products. We recommend consulting with a qualified medical doctor or physician when preparing a treatment plan for any and all diseases or ailments. SV3 LLC does not make any health claims about our products and recommend consulting with a qualified medical doctor or physician prior to consuming our products or preparing a treatment plan. It is especially important for those who are pregnant, nursing, chronically ill, elderly or under the age of 21 to discuss the use of these products with a physician prior to consuming. You must be 21 years or older to visit this website and/or purchase SV3 LLC products. The information on our website is intended to provide general information regarding our products and is not to be construed as medical advice or instruction. All products ship in accordance with the PACT Act.&rdquo;</em>
      </p>

      <footer className="mt-16 pt-8 border-t border-zinc-900">
        <p className="text-sm">
          Regulatory Transparency: Users and regulatory bodies may review our historical compliance records online:
          {" "}
          <a 
            href="https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/sv3-llc-dba-mi-one-brands-647624-12022022" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-emerald-500 hover:text-emerald-400 underline font-bold"
          >
            Review Official FDA Regulatory Records
          </a>
        </p>
      </footer>
    </div>
  );
}
