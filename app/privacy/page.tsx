import React from "react";
import Link from "next/link";
import { SITE } from "@/src/config/site";
import LegalPage from "@/src/components/LegalPage";

export const metadata = {
  title: `Privacy Policy | ${SITE.name}`,
  description: `How ${SITE.name} collects, uses and protects your personal information when you browse, order or contact us, and the choices you have.`,
  alternates: { canonical: `https://${SITE.domain}/privacy/` },
};

const mail = <a href={`mailto:${SITE.contact.email}`}>{SITE.contact.email}</a>;

export default function PrivacyPage() {
  return (
    <LegalPage
      slug="privacy"
      label="Privacy"
      h1="Privacy Policy"
      updated="November 6, 2026"
      intro={
        <>
          <p>{SITE.legalName}, doing business as {SITE.name} (“we”, “us”), respects your privacy. This policy explains what personal information we collect through {SITE.domain}, why we collect it, who we share it with, and the choices you have. It applies to visitors, customers, wholesale enquirers and anyone who contacts us.</p>
          <p>Our products are for adults aged {SITE.compliance.ageThreshold} and over. We do not knowingly collect information from anyone under {SITE.compliance.ageThreshold}.</p>
        </>
      }
      sections={[
        { id: "collect", h2: "Information we collect", body: (<>
          <h3>Information you give us</h3>
          <ul>
            <li><strong>Order details:</strong> name, email address, phone number, shipping address, items ordered, order notes and your chosen payment method.</li>
            <li><strong>Payment proof:</strong> if you upload a screenshot or receipt to confirm a payment, we store that image with the order.</li>
            <li><strong>Enquiries:</strong> anything you send through our contact, wholesale or support forms, by email, by phone or on WhatsApp.</li>
            <li><strong>Age confirmation:</strong> your confirmation that you are {SITE.compliance.ageThreshold} or older.</li>
          </ul>
          <h3>Information collected automatically</h3>
          <ul>
            <li>Technical data such as IP address, browser type and pages requested, used to keep the site working and to limit abuse and spam.</li>
            <li>Small items stored in your browser: your age-gate confirmation, your cart and your wishlist. These stay on your device and let the site remember your choices.</li>
          </ul>
          <h3>Payment information</h3>
          <p>We never ask for or store card numbers. You pay by Cash App, Apple Pay, Chime, cryptocurrency or gift card. Those payments are handled by the provider you choose; for cryptocurrency, transactions are recorded on a public blockchain, which we check to confirm your payment.</p>
        </>) },
        { id: "use", h2: "How we use your information", body: (<ul>
          <li>To process, confirm, ship and support your order, and to send order and tracking emails.</li>
          <li>To verify age and meet legal requirements, including adult-signature delivery and federal and state rules for vapor products.</li>
          <li>To confirm payments and to prevent fraud and duplicate or abusive orders.</li>
          <li>To answer questions and wholesale enquiries.</li>
          <li>To keep our website secure, reliable and improving.</li>
        </ul>) },
        { id: "share", h2: "Who we share it with", body: (<>
          <p>We do not sell your personal information. We share it only with service providers who help us run the store, and only as needed:</p>
          <ul>
            <li><strong>Hosting and infrastructure:</strong> Vercel hosts the website, and Upstash stores order records.</li>
            <li><strong>Email:</strong> our email provider delivers order and support messages.</li>
            <li><strong>Carriers:</strong> The regional delivery carriers receive your name, address and phone number to deliver your package, including adult-signature service.</li>
            <li><strong>Live chat:</strong> if tawk.to chat is enabled, messages you type in the chat are processed by tawk.to under its own privacy policy.</li>
            <li><strong>Authorities:</strong> where the law requires it, or to protect our rights and customers.</li>
          </ul>
        </>) },
        { id: "cookies", h2: "Cookies and local storage", body: (<p>We use only what the store needs: browser storage for your age confirmation, cart and wishlist, and any cookies set by the chat widget if enabled. We do not run advertising or cross-site tracking cookies. You can clear this data at any time in your browser settings; doing so will empty your cart and ask you to confirm your age again.</p>) },
        { id: "retention", h2: "How long we keep it", body: (<p>We keep order and enquiry records for as long as needed to fulfil your order, handle returns, meet tax, accounting and legal obligations, and resolve disputes. After that we delete or anonymise them.</p>) },
        { id: "security", h2: "How we protect it", body: (<p>The site is served over HTTPS. Order pages use private links, administrative access is passcode protected, and we limit who can see customer records. No online service can promise perfect security, so please use a strong email password and do not share your private order link.</p>) },
        { id: "rights", h2: "Your choices and rights", body: (<>
          <p>You can ask us to access, correct or delete the personal information we hold about you, or to stop sending you non-essential messages. Email {mail} from the address on your order and we will respond within 45 days. We may need to keep some records where the law requires it.</p>
          <p>California residents have additional rights; see our <Link href="/california-privacy/">California Privacy Notice</Link>.</p>
        </>) },
        { id: "children", h2: "Children", body: (<p>The store is intended only for adults aged {SITE.compliance.ageThreshold}+. If you believe a minor has given us information, contact us and we will delete it.</p>) },
        { id: "changes", h2: "Changes to this policy", body: (<p>We may update this policy as our practices or the law change. The date at the top shows the latest version. Continued use of the site after an update means you accept the revised policy.</p>) },
        { id: "contact", h2: "Contact us", body: (<p>{SITE.legalName} d/b/a {SITE.name}<br />{SITE.contact.location}<br />Email: {mail}<br />Phone: <a href={`tel:+1${SITE.contact.phone.replace(/\D/g, "")}`}>{SITE.contact.phone}</a></p>) },
      ]}
    />
  );
}
