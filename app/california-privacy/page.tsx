import React from "react";
import Link from "next/link";
import { SITE } from "@/src/config/site";
import LegalPage from "@/src/components/LegalPage";

export const metadata = {
  title: `California Privacy Notice (CCPA/CPRA) | ${SITE.name}`,
  description: `California residents: what personal information ${SITE.name} collects, how it is used, and how to exercise your CCPA/CPRA rights.`,
  alternates: { canonical: `https://${SITE.domain}/california-privacy/` },
};

const mail = <a href={`mailto:${SITE.contact.email}`}>{SITE.contact.email}</a>;

export default function CaliforniaPrivacyPage() {
  return (
    <LegalPage
      slug="california-privacy"
      label="California Privacy"
      h1="California Privacy Notice"
      updated="November 6, 2026"
      toc={false}
      intro={<p>This notice supplements our <Link href="/privacy/">Privacy Policy</Link> and applies to California residents under the California Consumer Privacy Act as amended by the California Privacy Rights Act (CCPA/CPRA).</p>}
      sections={[
        { id: "categories", h2: "Categories of personal information we collect", body: (<>
          <p>In the past 12 months we have collected the following categories, from you directly or automatically when you use the site:</p>
          <ul>
            <li><strong>Identifiers:</strong> name, email address, phone number, shipping address, IP address.</li>
            <li><strong>Commercial information:</strong> products ordered, order history, payment method chosen, and payment confirmations or proof you upload.</li>
            <li><strong>Internet activity:</strong> pages requested and basic technical data used for security.</li>
            <li><strong>Age confirmation:</strong> your statement that you are {SITE.compliance.ageThreshold} or older.</li>
          </ul>
          <p>We do not collect precise geolocation, biometric data, or other sensitive personal information as defined by the CPRA.</p>
        </>) },
        { id: "purposes", h2: "Why we collect it and who receives it", body: (<p>We use this information to process and deliver orders, verify age, confirm payments, prevent fraud, support you and comply with the law. We disclose it only to service providers (hosting, order storage, email, shipping carriers and, if enabled, live chat) that process it on our behalf.</p>) },
        { id: "sale", h2: "We do not sell or share your information", body: (<p>We do not sell personal information and do not share it for cross-context behavioral advertising. We have not done so in the past 12 months. We do not knowingly sell or share the personal information of anyone under 16.</p>) },
        { id: "rights", h2: "Your California rights", body: (<>
          <ul>
            <li><strong>Know and access:</strong> request the categories and specific pieces of personal information we hold about you.</li>
            <li><strong>Delete:</strong> request deletion, subject to legal exceptions such as tax and order-record requirements.</li>
            <li><strong>Correct:</strong> request correction of inaccurate information.</li>
            <li><strong>Opt out of sale or sharing:</strong> not applicable because we do not sell or share, but you may confirm this at any time.</li>
            <li><strong>Non-discrimination:</strong> we will not treat you differently for exercising these rights.</li>
          </ul>
        </>) },
        { id: "request", h2: "How to make a request", body: (<>
          <p>Email {mail} with the subject “California privacy request” from the email address used on your order, or call <a href={`tel:+1${SITE.contact.phone.replace(/\D/g, "")}`}>{SITE.contact.phone}</a>. To protect your account we will verify your identity by matching details on your order. We respond within 45 days, and may extend once by a further 45 days where needed and with notice.</p>
          <p>An authorized agent may submit a request for you with your signed permission.</p>
        </>) },
        { id: "contact", h2: "Contact", body: (<p>{SITE.legalName} d/b/a {SITE.name}, {SITE.contact.location}.</p>) },
      ]}
    />
  );
}
