import React from "react";
import { SITE } from "@/src/config/site";
import PageBanner from "@/src/components/PageBanner";

export const metadata = {
  title: `Privacy Policy | ${SITE.name}`,
  description: `Privacy policy for ${SITE.name}.`,
};

export default function PrivacyPage() {
  return (
    <>
      <PageBanner slug="privacy" label="Privacy" />
      <div className="max-w-4xl mx-auto px-6 py-24 prose ">
      <h1>Privacy Policy</h1>
      <p>We respect your privacy and protect your data.</p>
    </div>
    </>
  );
}
