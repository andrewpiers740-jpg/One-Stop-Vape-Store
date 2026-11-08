import React from "react";
import Link from "next/link";
import { SITE } from "@/src/config/site";
import LegalPage from "@/src/components/LegalPage";

export const metadata = {
  title: `About Us | ${SITE.name}`,
  description: `${SITE.name} is operated by ${SITE.legalName}, established December 2022, shipping adult-only vaping and nicotine products from Phoenix, Arizona. Our mission, values, what we sell and how we operate.`,
  alternates: { canonical: `https://${SITE.domain}/about/` },
};

export default function AboutPage() {
  return (
    <LegalPage
      slug="about"
      label="About"
      h1="About One Stop Vape Store"
      updated="November 8, 2026"
      intro={
        <>
          <p>{SITE.name} is an online retailer of vaping and nicotine products for adults aged {SITE.compliance.ageThreshold} and over. We are operated by {SITE.legalName}, were established in December 2022 and ship from Phoenix, Arizona. This page explains what we stand for, what we sell, how an order works and what we do not do. Nicotine is addictive, and our products are for adults only.</p>
          <p>For a longer introduction, read <Link href="/blog/about-one-stop-vape-store/">about One Stop Vape Store</Link>.</p>
        </>
      }
      sections={[
        { id: "mission", h2: "Our mission", body: (<>
          <p>Our mission is to give adult vapers a wide choice of quality products, backed by good customer service. We want to be a dependable place to buy, from a first device to a repeat order, and to explain what we sell in plain language, from the beginner to the experienced user.</p>
          <p>Our products are intended for current smokers, vapers and tobacco users. We have no interest in selling to minors. Underage use is a serious problem for our industry, and it threatens adult access to the products we sell. Quick shipping, a good range of products and dependable customer service are our priorities.</p>
        </>) },
        { id: "story", h2: "Our story", body: (<>
          <p>{SITE.legalName} established {SITE.name} in December 2022, after the PACT Act changed how nicotine products can be shipped. We built our ordering and shipping around those rules from the start: adult signature on every delivery, labeled parcels, tax and licensing compliance and a network of regional carriers that handle these parcels. See our <Link href="/pact-act/">PACT Act FAQ</Link> and <Link href="/shipping/">shipping policy</Link>.</p>
          <p>We have grown our catalog to more than 2,500 products, and we keep adding guides and policies so that customers can see how we work before they order.</p>
        </>) },
        { id: "values", h2: "Our values", body: (<>
          <h3>Choice</h3>
          <p>We offer a wide range of products so that adults can pick what suits their own preferences, with options such as strength and pack size on the product page.</p>
          <h3>Quality</h3>
          <p>We choose products from established brands, and we describe them accurately from their specifications.</p>
          <h3>Diversity</h3>
          <p>Our catalog covers disposables, e-liquids, kits, pods, nicotine pouches and more, because adults have different tastes.</p>
          <h3>Education</h3>
          <p>We publish guides on buying, payments, shipping, compliance, how devices work and troubleshooting, so that customers can make informed choices.</p>
          <h3>Commitment</h3>
          <p>We aim for consistent, reliable service and clear communication, and we stand behind our published policies.</p>
        </>) },
        { id: "provide", h2: "What we provide", body: (<>
          <p>Our catalog includes <Link href="/shop/disposables/">disposable vapes</Link>, <Link href="/shop/vape-juice/">vape juice</Link> and nicotine salts, <Link href="/shop/vape-kits/">vape kits</Link>, <Link href="/shop/vaporizers/">vaporizers</Link>, <Link href="/shop/coils-pods/">replacement pods and coils</Link>, <Link href="/shop/nic-pouches/">nicotine pouches</Link> and <Link href="/shop/nixodine/">Nixodine devices</Link>. We also supply registered retailers through our <Link href="/wholesale/">wholesale</Link> program.</p>
          <p>Orders are processed in 24 to 72 business hours and delivered by regional carrier with adult signature. We accept Cash App, Apple Pay, Chime, cryptocurrency and gift cards, with 10% off for cryptocurrency and gift card payments. The minimum order is ${SITE.order.minOrder}, and orders of ${SITE.order.freeShippingThreshold} or more after discount ship free.</p>
        </>) },
        { id: "compliance", h2: "Compliance and responsible sales", body: (<>
          <p>We verify age at our age gate and on delivery, follow the PACT Act, and publish our <Link href="/terms/">terms</Link>, <Link href="/privacy/">privacy policy</Link>, <Link href="/refunds/">refund policy</Link> and <Link href="/fda-disclaimer/">FDA disclaimer</Link>. We cannot ship where the law does not allow it, and customers are responsible for knowing the rules where they live.</p>
        </>) },
        { id: "claims", h2: "What we do not do", body: (<>
          <ul>
            <li>We do not sell to anyone under {SITE.compliance.ageThreshold}.</li>
            <li>We do not make health claims, and we do not say any product treats or prevents any condition.</li>
            <li>We do not invent reviews, ratings or statistics.</li>
            <li>We do not ask for card numbers, passwords, private keys or seed phrases in messages.</li>
          </ul>
        </>) },
        { id: "contact", h2: "Where to find us", body: (<>
          <p>{SITE.legalName}, doing business as {SITE.name}<br />{SITE.contact.location}</p>
          <p>Email <a href={`mailto:${SITE.contact.email}`}>{SITE.contact.email}</a>, call <a href={`tel:+1${SITE.contact.phone.replace(/\D/g, "")}`}>{SITE.contact.phone}</a> or use our <Link href="/contact/">contact page</Link>.</p>
        </>) },
      ]}
    />
  );
}
