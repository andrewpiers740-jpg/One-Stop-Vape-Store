import React from "react";
import Link from "next/link";
import { SITE } from "@/src/config/site";
import LegalPage from "@/src/components/LegalPage";

export const metadata = {
  title: `Refund and Return Policy | ${SITE.name}`,
  description: `How returns, exchanges and refunds work at ${SITE.name}: 30-day window, RMA, 15% restocking fee, refunds to the original payment method, and items we cannot accept.`,
  alternates: { canonical: `https://${SITE.domain}/refunds/` },
};

export default function ReturnsPage() {
  return (
    <LegalPage
      slug="refunds"
      label="Refunds"
      h1="Refund and Return Policy"
      updated="November 8, 2026"
      intro={
        <>
          <p>If something is wrong with your order, we want to sort it out clearly and quickly. This page explains how returns, exchanges and refunds work at {SITE.name}, what we can and cannot accept back, how refunds are paid and how to start a return. Please read it before you order. Products are for adults aged {SITE.compliance.ageThreshold} and over, and nicotine is addictive.</p>
          <p>A shorter summary is in our guide <Link href="/blog/refund-and-return-policy-explained/">refund and return policy explained</Link>, and shipping-related rules are in our <Link href="/shipping/">shipping policy</Link>.</p>
        </>
      }
      sections={[
        { id: "overview", h2: "Exchange and refund policy", body: (<>
          <p>If there is an issue with your purchase at onestopvapestore.com, call or email us and we will guide you through the process. Returns must be made within 30 days of the date you purchased the item. Please contact us before sending anything back, so that we can give you an RMA form.</p>
        </>) },
        { id: "refunds", h2: "Refunds", body: (<>
          <p>Once we receive the returned product, we issue your refund through the same payment method the payment was received through (Cash App, Apple Pay, Chime, cryptocurrency or gift card), minus a 15% restocking fee.</p>
          <ul>
            <li>We do not provide pre-paid return labels.</li>
            <li>We do not refund shipping fees.</li>
            <li>We strongly suggest adding insurance to your package when you ship it back to us.</li>
          </ul>
          <p>Keep your payment confirmations, because they help us match your refund to your order.</p>
        </>) },
        { id: "exchanges", h2: "Exchanges", body: (<>
          <p>We are happy to arrange exchanges within 30 days of purchase. When the returned items arrive, a customer service representative will call you to confirm what you would like in exchange and place the order with you over the phone. You pay only the remaining amount for any item of unequal value. The standard shipping fee applies to exchange orders under ${SITE.order.freeShippingThreshold}.</p>
        </>) },
        { id: "restrictions", h2: "Refund and exchange restrictions", body: (<>
          <p>There are items we cannot accept as returns because of FDA regulation:</p>
          <ul>
            <li>Opened and/or used e-liquid.</li>
            <li>Products that were not purchased on onestopvapestore.com.</li>
            <li>Opened and used devices and accessories.</li>
            <li>Shipping fees.</li>
            <li>Sample packs or bundle deals that are partially returned or opened.</li>
            <li>Puffco products, which do not qualify for refunds or exchanges, even if unopened.</li>
          </ul>
          <p>You are responsible for shipping the product back to us. Opened or used products cannot be returned, so we suggest starting with a single unit of a new flavor or strength before buying a pack.</p>
        </>) },
        { id: "rma", h2: "How to start a return", body: (<>
          <h3>Step by step</h3>
          <ol className="ml-5 list-decimal space-y-1.5 pl-1">
            <li>Contact us within 30 days of purchase, with your order ID and a description of the problem.</li>
            <li>We give you an RMA form. If an RMA is not included in the package, we cannot guarantee any refund or exchange.</li>
            <li>Pack the item securely, with the RMA inside, and insure the parcel.</li>
            <li>Ship it to the return address below.</li>
            <li>When we receive it, we process your refund or call you to arrange an exchange.</li>
          </ol>
        </>) },
        { id: "damaged", h2: "Damaged, lost or incorrect orders", body: (<>
          <p>If your package arrives damaged, take photos of the items and the invoice straight away and email them to us, and we will reorder the damaged items for you. For lost or stolen packages and Guide package protection, see our <Link href="/shipping/">shipping policy</Link>. If you received the wrong item, contact us with your order ID and photos.</p>
        </>) },
        { id: "address", h2: "Return mailing address and contact", body: (<>
          <p>Onestopvapestore.com<br />Attention: Returns<br />4908 E McDowell Road STE 103<br />Phoenix, Arizona 85008</p>
          <p>Email <a href={`mailto:${SITE.contact.email}`}>{SITE.contact.email}</a> or call <a href={`tel:+1${SITE.contact.phone.replace(/\D/g, "")}`}>1-{SITE.contact.phone}</a>. Support hours are on our <Link href="/contact/">contact page</Link>.</p>
        </>) },
      ]}
    />
  );
}
