import React from "react";
import Link from "next/link";
import { SITE } from "@/src/config/site";
import LegalPage from "@/src/components/LegalPage";

export const metadata = {
  title: `Help Center — Orders, Payments, Shipping & Returns | ${SITE.name}`,
  description: `Get help with ordering, paying by Cash App, Apple Pay, Chime, crypto or gift card, shipping, adult signature, returns and your account at ${SITE.name}.`,
  alternates: { canonical: `https://${SITE.domain}/help/` },
};

const tel = `tel:+1${SITE.contact.phone.replace(/\D/g, "")}`;

export default function HelpCenterPage() {
  return (
    <LegalPage
      slug="help"
      label="Help Center"
      h1="Help Center"
      toc={false}
      intro={<p>Find quick answers about ordering, payment, delivery and returns. Still stuck? Message us on <a href={`https://wa.me/${SITE.contact.whatsapp}`} className="text-brand-700 underline">WhatsApp</a>, call <a href={tel} className="text-brand-700 underline">{SITE.contact.phone}</a> or email <a href={`mailto:${SITE.contact.email}`} className="text-brand-700 underline">{SITE.contact.email}</a>. Customer service hours are Monday to Friday, 8AM–5PM Arizona time.</p>}
      sections={[
        { id: "ordering", h2: "Placing an order", body: (<>
          <h3>How do I order?</h3>
          <p>Add items to your cart, choose a strength or pack size where options are shown, and go to checkout. Enter your details, confirm you are {SITE.compliance.ageThreshold}+, choose a payment method and place the order. We email you an order number and a private link to your order.</p>
          <h3>Is there a minimum order?</h3>
          <p>Yes, the minimum order is ${SITE.order.minOrder}. Orders of ${SITE.order.freeShippingThreshold} or more after any discount ship free; below that a flat ${SITE.order.flatShippingFee} shipping fee applies.</p>
          <h3>Can I change or cancel an order?</h3>
          <p>Contact us as soon as possible with your order number. We can change or cancel an order that has not shipped.</p>
        </>) },
        { id: "payment", h2: "Payment help", body: (<>
          <h3>Cash App, Apple Pay and Chime</h3>
          <p>After you place the order, we send you the payment details by email or WhatsApp. Pay, then upload a screenshot on your private order page so we can confirm quickly.</p>
          <h3>Cryptocurrency (save {SITE.order.cryptoDiscount}%)</h3>
          <p>Choose BTC, USDT, USDC, ETH, BNB or SOL. We show the exact amount, address and QR code, and we detect your payment on the blockchain. Need to buy crypto first? The payment window links to a trusted buying service.</p>
          <h3>Gift cards (save {SITE.order.giftCardDiscount}%)</h3>
          <p>Apple, Razer, Paysafe, Sephora and Macy's gift cards are accepted. We send a buy link and instructions for uploading your card details securely.</p>
        </>) },
        { id: "shipping", h2: "Shipping and delivery", body: (<>
          <h3>How long does delivery take?</h3>
          <p>Orders are processed within 24–72 business hours from our Stock Warehouse in Phoenix, Arizona. You receive a tracking email once your parcel is on its way. See the <Link href="/shipping/">Shipping Policy</Link> for carriers and delivery times.</p>
          <h3>What is adult signature delivery?</h3>
          <p>Federal law requires an adult aged {SITE.compliance.ageThreshold}+ to sign for vapor products. Please make sure someone of age is available to receive the parcel; see our <Link href="/pact-act/">PACT Act FAQ</Link>.</p>
        </>) },
        { id: "returns", h2: "Returns, exchanges and damaged items", body: (<>
          <p>Contact us within 30 days of purchase to arrange a return or exchange. Please read the <Link href="/refunds/">Returns & Refund Policy</Link> first, because opened or used e-liquid and devices cannot be returned. If your parcel arrives damaged or incorrect, email photos and your order number right away and we will make it right.</p>
        </>) },
        { id: "account", h2: "Your account, wishlist and cart", body: (<p>Your cart and <Link href="/wishlist/">wishlist</Link> are saved in your browser on this device. Clearing browser data removes them. Your orders are available through the private link in each order email.</p>) },
        { id: "more", h2: "More help", body: (<ul>
          <li><Link href="/faq/">Frequently asked questions</Link> — products, nicotine strengths, payments and shipping.</li>
          <li><Link href="/wholesale/">Wholesale inquiries</Link> — bulk pricing for retailers.</li>
          <li><Link href="/contact/">Contact us</Link> — form, phone, email and WhatsApp.</li>
          <li><Link href="/fda-disclaimer/">FDA disclaimer</Link> and <Link href="/terms/">Terms of Service</Link>.</li>
        </ul>) },
      ]}
    />
  );
}
