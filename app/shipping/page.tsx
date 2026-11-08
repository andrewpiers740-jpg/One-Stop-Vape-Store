import React from "react";
import Link from "next/link";
import { SITE } from "@/src/config/site";
import LegalPage from "@/src/components/LegalPage";

export const metadata = {
  title: `Shipping Policy | ${SITE.name}`,
  description: `Processing times, regional carrier delivery estimates, free shipping over $${SITE.order.freeShippingThreshold}, adult signature (21+), lost or damaged packages and returns at ${SITE.name}.`,
  alternates: { canonical: `https://${SITE.domain}/shipping/` },
};

const mail = <a href={`mailto:${SITE.contact.email}`}>{SITE.contact.email}</a>;

export default function ShippingPage() {
  return (
    <LegalPage
      slug="shipping"
      label="Shipping"
      h1="Shipping Policy"
      updated="November 8, 2026"
      intro={
        <>
          <p>This policy explains how {SITE.name} processes and ships orders from Phoenix, Arizona: how much shipping costs, how long it takes, who can sign for your package and what happens if something goes wrong. Products are for adults aged {SITE.compliance.ageThreshold} and over, and nicotine is addictive. Federal rules for remote sales of vapor products shape much of what follows; see our <Link href="/pact-act/">PACT Act FAQ</Link>.</p>
        </>
      }
      sections={[
        { id: "cost", h2: "Shipping cost and free shipping", body: (<>
          <p><strong>Free domestic shipping on orders of ${SITE.order.freeShippingThreshold} or more.</strong> Only online orders of ${SITE.order.freeShippingThreshold} or more, after discount and before tax, inside the US qualify for free shipping. Free shipping appears as an option when you select your shipping method, with a valid purchase.</p>
          <p>Orders under ${SITE.order.freeShippingThreshold} pay a standard flat shipping fee of ${SITE.order.flatShippingFee}. Our minimum order is ${SITE.order.minOrder}. The 10% discount for cryptocurrency and gift card payments is applied before the free shipping check. See <Link href="/blog/minimum-order-and-free-shipping-explained/">minimum order and free shipping explained</Link>.</p>
          <p>Free shipping is valid for most of the 48 contiguous US states. It does not apply to Guam, the US Virgin Islands, Puerto Rico, Hawaii, Alaska or APO/DPO/FPO and other US military addresses.</p>
        </>) },
        { id: "international", h2: "International orders", body: (<>
          <p>We do not ship internationally. Orders placed with an international shipping address will be canceled and refunded. International customers may call us for help finding a local distributor.</p>
        </>) },
        { id: "processing", h2: "Order processing", body: (<>
          <ul>
            <li>All orders have a processing time of 24 to 72 business hours. Most orders ship within 48 hours, and orders confirmed before 2:00 PM MST typically ship the same business day.</li>
            <li>Orders ship with a signature required on delivery, with photo ID showing that the recipient is {SITE.compliance.ageThreshold} or over, as federal law requires.</li>
            <li>All shipping times are counted in business days, Monday to Friday.</li>
            <li>Orders may be reviewed to confirm security and accuracy. If your order is under review, we will contact you the same day.</li>
          </ul>
          <p><em>Please note:</em> we do not process orders on weekends or federal holidays. Your order continues processing on the next business day.</p>
          <p>See <Link href="/blog/how-ordering-works/">how ordering works</Link> and <Link href="/blog/how-payment-details-reach-you/">how payment details reach you</Link>.</p>
        </>) },
        { id: "carriers", h2: "Shipping carriers", body: (<>
          <p>We ship through a network of regional local carriers. Errors and delays caused by or resulting from the regional carriers are not the responsibility of Onestopvapestore.com.</p>
          <p>We do not provide refunds or reships if a package is lost, stolen or damaged in transit, but we offer Guide package protection for these situations, provided it has not been removed from your order. Any package returned to us by the carrier receives a refund minus a 15% restocking fee and the shipping cost.</p>
        </>) },
        { id: "times", h2: "Carrier delivery times", body: (<>
          <p>After the processing period of 24 to 72 business hours, a tracking email is sent automatically to confirm that your package is in the final stages of fulfillment. Carrier delivery times depend on where you are in the country.</p>
          <h3>Estimated time in transit</h3>
          <ul>
            <li><strong>West Coast (Arizona, Nevada, Washington and Idaho):</strong> 3 to 7 business days.</li>
            <li><strong>Eastern half of the US:</strong> 11 to 18 business days.</li>
          </ul>
          <p>These are estimates, not guarantees. Weather, carrier volume and address problems can add time. See <Link href="/blog/shipping-times-from-phoenix-arizona/">shipping times from Phoenix</Link> and <Link href="/blog/how-to-track-your-order/">how to track your order</Link>.</p>
        </>) },
        { id: "signature", h2: "Required adult signature service", body: (<>
          <p>In accordance with federal law, all orders containing e-cigarette related products require Adult Signature Confirmation ({SITE.compliance.ageThreshold}+) on delivery. To receive the package, the recipient must show a valid government-issued photo ID to the delivery employee to confirm their age.</p>
          <p>If a package is returned because no one was available to sign for it, we process a refund minus a 15% restocking fee and the shipping cost.</p>
          <p>Choose an address where an adult will be present, and tell anyone expecting the package to bring ID. See <Link href="/blog/adult-signature-on-delivery-what-to-expect/">adult signature on delivery</Link> and <Link href="/blog/shipping-address-tips/">shipping address tips</Link>.</p>
        </>) },
        { id: "lost", h2: "Lost or stolen shipments", body: (<>
          <p>We want you to receive a quality product on time. Things do sometimes go wrong, which is why we offer Guide insurance. If you did not pay for Guide insurance and your shipment is lost or stolen, call us at <a href={`tel:+1${SITE.contact.phone.replace(/\D/g, "")}`}>1-{SITE.contact.phone}</a> or email {mail}, and we will review your case.</p>
        </>) },
        { id: "damaged", h2: "Damaged packages", body: (<>
          <p>If your package arrives and the goods are damaged, take photos of the items and the invoice included in the package straight away. Email our support team with the photos, and we will reorder the damaged items for you.</p>
        </>) },
        { id: "exchanges", h2: "Exchanges and refunds", body: (<>
          <p>If there is an issue with your purchase, call or email us and we will guide you through our process. Returns must be made within 30 days of the purchase date. Puffco products do not qualify for refunds or exchanges.</p>
          <p>Once we receive the returned product, we issue your refund through the same payment method the payment was received through (Cash App, Apple Pay, Chime, cryptocurrency or gift card), minus a 15% restocking fee. Read the full <Link href="/refunds/">refund and return policy</Link> and <Link href="/blog/refund-and-return-policy-explained/">refund and return policy explained</Link>.</p>
        </>) },
        { id: "restrictions", h2: "Refund and exchange restrictions", body: (<>
          <p>Some items cannot be accepted as returns because of FDA regulation:</p>
          <ul>
            <li>Opened and used e-liquid.</li>
            <li>Products not purchased from onestopvapestore.com.</li>
            <li>Opened and used devices and accessories.</li>
            <li>Shipping fees.</li>
            <li>Puffco products, even if unopened.</li>
            <li>Sample packs or bundle deals that are partially returned or opened.</li>
          </ul>
          <p>You are responsible for shipping the product back to us. When we receive the returned items, a customer service representative will call you to confirm what you would like in exchange and place the order with you over the phone. You pay only the difference for any item of unequal value. The standard shipping fee applies to exchange orders under ${SITE.order.freeShippingThreshold}.</p>
        </>) },
        { id: "address", h2: "Return mailing address", body: (<>
          <p>Onestopvapestore.com<br />Attention: Returns<br />4908 E McDowell Road STE 103<br />Phoenix, Arizona 85008</p>
          <p>Please contact us for an RMA before sending anything. See our <Link href="/refunds/">refund and return policy</Link> and <Link href="/contact/">contact page</Link>.</p>
        </>) },
      ]}
    />
  );
}
