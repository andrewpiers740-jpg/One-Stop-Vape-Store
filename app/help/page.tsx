import React from "react";
import { SITE } from "@/src/config/site";
import Link from "next/link";

export const metadata = {
  title: `Help Center | ${SITE.name}`,
  description: `Help center for ${SITE.name}.`,
};

export default function HelpCenterPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 prose prose-invert">
      <h1>Help Center</h1>
      <p>How can we assist you today?</p>
      <ul>
        <li><Link href="/faq">FAQ</Link></li>
        <li><Link href="/contact">Contact Support</Link></li>
      </ul>
    </div>
  );
}
