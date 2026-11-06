import React from "react";
import { SITE } from "@/src/config/site";
import Link from "next/link";
import PageBanner from "@/src/components/PageBanner";

export const metadata = {
  title: `Help Center | ${SITE.name}`,
  description: `Help center for ${SITE.name}.`,
};

export default function HelpCenterPage() {
  return (
    <>
      <PageBanner slug="help" label="Help Center" />
      <div className="max-w-4xl mx-auto px-6 py-24 prose ">
      <h1>Help Center</h1>
      <p>How can we assist you today?</p>
      <ul>
        <li><Link href="/faq">FAQ</Link></li>
        <li><Link href="/contact">Contact Support</Link></li>
      </ul>
    </div>
    </>
  );
}
