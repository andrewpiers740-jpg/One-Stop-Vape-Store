import React from "react";
import { SITE } from "@/src/config/site";
import PageBanner from "@/src/components/PageBanner";

export const metadata = {
  title: "FDA Disclaimer | One Stop Vape Store",
  description: "Official FDA compliance statement and legal disclaimer.",
};

export default function FdaDisclaimerPage() {
  return (
    <>
      <PageBanner slug="fda-disclaimer" label="FDA Disclaimer" />
      <div className="max-w-4xl mx-auto px-6 py-24 prose ">
      <h1><strong>FDA Disclaimer</strong></h1>

      <p>
        <em>&ldquo;The statements made regarding these products have not been evaluated by the Food and Drug Administration. The efficacy of these products and the testimonials made have not been confirmed by FDA- approved research. These products are not intended to diagnose, treat, cure or prevent any disease. All information presented here is not meant as a substitute for or alternative to information from health care practitioners. Please consult your healthcare professional about potential interactions or other possible complications before using any product. The Federal Food, Drug, and Cosmetic Act requires this notice. SV3 LLC shall not be held liable for the medical claims made by customer testimonials.</em>
      </p>
      <p>
        <em>These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure or prevent any disease or ailment. SV3 LLC assumes no responsibility for the improper use of these products. We recommend consulting with a qualified medical doctor or physician when preparing a treatment plan for any and all diseases or ailments. SV3 LLC does not make any health claims about our products and recommend consulting with a qualified medical doctor or physician prior to consuming our products or preparing a treatment plan. It is especially important for those who are pregnant, nursing, chronically ill, elderly or under the age of 21 to discuss the use of these products with a physician prior to consuming. You must be 21 years or older to visit this website and/or purchase SV3 LLC products. The information on our website is intended to provide general information regarding our products and is not to be construed as medical advice or instruction. All products ship in accordance with the PACT Act.&rdquo;</em>
      </p>


      <h2>What this disclaimer means</h2>
      <p>Vapor and nicotine products sold on this website are intended only for adults aged 21 or older. We do not claim that any product has been approved, authorized or endorsed by the U.S. Food and Drug Administration, and nothing on this website is medical advice. Product descriptions, blog articles and FAQs are provided for general information about how products work and how to choose between them.</p>

      <h2>Nicotine warning</h2>
      <p>WARNING: Products on this website contain nicotine. Nicotine is an addictive chemical. Not for use by minors, pregnant or breastfeeding women, or anyone with a medical condition unless advised by a doctor. Keep all products, e-liquids and pouches away from children and pets.</p>

      <h3>No health or cessation claims</h3>
      <p>We do not state or imply that any product treats, prevents or cures any condition, helps anyone quit smoking, or is without risk. If you have questions about nicotine, speak to a licensed healthcare professional.</p>

      <h2>Adult-only sales and compliance</h2>
      <h3>Age verification</h3>
      <p>Customers must confirm they are 21+ before entering the store and again at checkout, and an adult must sign for delivery. See our <a href="/pact-act/">PACT Act FAQ</a> and <a href="/shipping/">Shipping Policy</a>.</p>
      <h3>State and local laws</h3>
      <p>Laws on vapor products, flavors and nicotine pouches differ by state and city. It is your responsibility to make sure that buying, receiving and using these products is lawful where you live. We may decline or cancel any order that cannot be shipped lawfully.</p>

      <h2>Questions</h2>
      <p>Contact us at <a href="mailto:sales@onestopvapestore.com">sales@onestopvapestore.com</a> or <a href="tel:+17747341372">774-734-1372</a>.</p>

      <footer className="mt-16 pt-8 border-t border-slate-200">
        <p className="text-sm">
          Regulatory Transparency: Users and regulatory bodies may review our historical compliance records online:
          {" "}
          <a 
            href="https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/sv3-llc-dba-mi-one-brands-647624-12022022" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-emerald-600 hover:text-emerald-600 underline font-bold"
          >
            Review Official FDA Regulatory Records
          </a>
        </p>
      </footer>
    </div>
    </>
  );
}
