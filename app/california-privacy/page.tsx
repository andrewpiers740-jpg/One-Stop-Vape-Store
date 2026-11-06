import React from "react";
import { SITE } from "@/src/config/site";
import PageBanner from "@/src/components/PageBanner";

export const metadata = {
  title: `California Privacy Notice | ${SITE.name}`,
  description: `California privacy notice for ${SITE.name}.`,
};

export default function CaliforniaPrivacyPage() {
  return (
    <>
      <PageBanner slug="california-privacy" label="California Privacy" />
      <div className="max-w-4xl mx-auto px-6 py-24 prose ">
      <h1>California Privacy Notice</h1>
      <p>This notice provides information to California residents.</p>
    </div>
    </>
  );
}
