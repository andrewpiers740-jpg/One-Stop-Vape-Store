import React from "react";
import Link from "next/link";
import { SITE } from "@/src/config/site";
import LegalPage from "@/src/components/LegalPage";

export const metadata = {
  title: `PACT Act FAQ for Vape Buyers | ${SITE.name}`,
  description: `Plain answers about the PACT Act and vape shipping: adult signature, package labels, taxes, licensing, carriers and how ${SITE.name} complies.`,
  alternates: { canonical: `https://${SITE.domain}/pact-act/` },
};

export default function PactActPage() {
  return (
    <LegalPage
      slug="pact-act"
      label="PACT Act"
      h1="PACT Act FAQ"
      accordion
      updated="November 8, 2026"
      intro={
        <>
          <p>The Prevent All Cigarette Trafficking (PACT) Act is a federal law that governs remote sales of cigarettes and, since an amendment signed in December 2020, vapor products too. The e-cigarette provisions took effect on March 27, 2021. This page explains in plain language what that means for you as a buyer, and what {SITE.name} does to comply. It is general information, not legal advice. Products are for adults aged {SITE.compliance.ageThreshold} and over, and nicotine is addictive.</p>
          <p>For a longer walkthrough, read our guide <Link href="/blog/pact-act-explained-for-vape-buyers/">the PACT Act explained for vape buyers</Link>.</p>
        </>
      }
      sections={[
        { id: "what", h2: "What is the PACT Act?", body: (<>
          <p>The PACT Act, short for Prevent All Cigarette Trafficking Act, was written to stop the illegal sale of cigarettes by mail. An amendment signed into law in December 2020 extended its rules to electronic nicotine delivery systems, which covers vape devices, e-liquids and related products. The amendment applies to online retailers and to bricks and mortar vape shops that ship products to customers, and it came into effect on March 27, 2021.</p>
          <p>In practice, the law brings remote sales of vapor products under rules similar to those for cigarettes: age and signature checks on delivery, labeling on parcels, tax obligations and licensing and registration requirements for sellers.</p>
        </>) },
        { id: "ban", h2: "Is there a ban on shipping vaping products?", body: (<>
          <p>No. The law does not ban the shipping of vaping products. It does, however, restrict the United States Postal Service from carrying them, and some large national carriers have limited or stopped vapor shipments, which has changed how retailers ship. We use regional carriers that handle these parcels in line with the rules.</p>
          <p>Because carriers and rules change, coverage can vary by location, and there may occasionally be temporary interruptions or delays in some areas. If this affects your order, we will tell you. See our <Link href="/shipping/">shipping policy</Link> for processing times and delivery estimates.</p>
        </>) },
        { id: "signature", h2: "Will I have to sign for my package?", body: (<>
          <p>Yes. Every delivery containing vaping products requires an adult aged {SITE.compliance.ageThreshold} or over to sign for the package, and to show government-issued photo ID to the delivery employee. This applies in all states we ship to. If no adult is available, the carrier may try again or hold the package, and a package returned because no one could sign is refunded minus the 15% restocking fee and the shipping cost, as set out in our <Link href="/shipping/">shipping policy</Link>.</p>
          <p>Choose a delivery address where an adult with ID will be available. Some customers prefer a workplace address so that they do not miss the delivery. See <Link href="/blog/adult-signature-on-delivery-what-to-expect/">adult signature on delivery: what to expect</Link> and <Link href="/blog/shipping-address-tips/">shipping address tips</Link>.</p>
        </>) },
        { id: "labels", h2: "What will be on my package?", body: (<>
          <p>The law requires packages containing vapor products to carry a label. Your parcel will show a statement along these lines:</p>
          <p><em>“CIGARETTES/NICOTINE/SMOKELESS TOBACCO: FEDERAL LAW REQUIRES THE PAYMENT OF ALL APPLICABLE EXCISE TAXES, AND COMPLIANCE WITH APPLICABLE LICENSING AND TAX-STAMPING OBLIGATIONS.”</em></p>
          <p>This label tells carriers and recipients that the parcel contains regulated products. Do not remove it, and do not accept a parcel that has been opened.</p>
        </>) },
        { id: "tax", h2: "Do I have to pay tax?", body: (<>
          <p>Some states and localities charge a tax on vaping products. Where that applies, the seller is responsible for collecting and paying it, and the amount is added to your total. At checkout, when you provide your delivery details, the relevant state excise is itemized in your final total where it applies. This requirement applies to online retailers and to your local vape shop alike.</p>
          <p>Prices on our product pages are shown before any applicable tax. Free shipping is based on the order value after discount and before tax. See <Link href="/blog/minimum-order-and-free-shipping-explained/">minimum order and free shipping explained</Link>.</p>
        </>) },
        { id: "licensing", h2: "What licenses and permits are involved?", body: (<>
          <p>The law effectively means that all vaping retailers, including online retailers, must hold any applicable state and local licenses and permits, and must register and report as required. {SITE.name} aims to meet these requirements. Requirements differ between states and cities, and some places restrict certain products or flavors or do not allow remote sales at all. We cannot ship where the law does not allow it, and you are responsible for knowing the rules where you live. See <Link href="/blog/state-and-local-vape-laws-explained/">state and local vape laws explained</Link>.</p>
        </>) },
        { id: "age", h2: "What about age?", body: (<>
          <p>The federal minimum age to buy tobacco products, including vapes, is {SITE.compliance.ageThreshold}. We verify age at the age gate, and again through the adult signature requirement on delivery. We do not sell to anyone under {SITE.compliance.ageThreshold}.</p>
        </>) },
        { id: "still", h2: "Can I still buy from One Stop Vape Store?", body: (<>
          <p>Yes, if you are an adult aged {SITE.compliance.ageThreshold} or over and your location allows it. Online sales of vape products are not banned, although the PACT Act has made them more complicated. We have built our ordering and shipping around the rules so that you can order with confidence. Our minimum order is ${SITE.order.minOrder}, and orders of ${SITE.order.freeShippingThreshold} or more after discount ship free.</p>
        </>) },
        { id: "more", h2: "More information", body: (<>
          <p>For other policies, see our <Link href="/shipping/">shipping policy</Link>, <Link href="/refunds/">refund and return policy</Link>, <Link href="/terms/">terms</Link> and <Link href="/fda-disclaimer/">FDA disclaimer</Link>. For questions about your order, use our <Link href="/contact/">contact page</Link>, email <a href={`mailto:${SITE.contact.email}`}>{SITE.contact.email}</a> or call <a href={`tel:+1${SITE.contact.phone.replace(/\D/g, "")}`}>{SITE.contact.phone}</a>.</p>
          <p>We make no health claims. Nicotine is addictive, and our products are for adults only.</p>
        </>) },
      ]}
    />
  );
}
