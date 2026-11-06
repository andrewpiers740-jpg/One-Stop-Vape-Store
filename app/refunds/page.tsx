import React from "react";
import { SITE } from "@/src/config/site";
import PageBanner from "@/src/components/PageBanner";

export const metadata = {
  title: "Refund and Return Policy | One Stop Vape Store",
  description: "Review our refund and return policy for One Stop Vape Store.",
};

export default function ReturnsPage() {
  return (
    <>
      <PageBanner slug="refunds" label="Refunds" />
      <div className="max-w-4xl mx-auto px-6 py-24 prose ">
      <h1><strong>Refund and Return Policy</strong></h1>

      <h2>Exchange and Refund policy</h2>
      <p>If there is an issue with your purchase at onestopvapestore.com, you can call or email us, and we will guide you through our processes. Returns must be done within 30 days from the date you purchased it.</p>

      <h2>Refunds</h2>
      <p>Once the product is received, we will issue you a refund back to the card used in the original order, minus a 15% restocking fee. We do not provide pre-paid labels to return the product back to us and we do not refund any shipping fee’s. We highly suggest adding insurance to your package when shipping back to us.</p>

      <h2>Exchanges</h2>
      <p>We are more than happy to do exchanges within 30 days from purchase.</p>

      <h2>Refund/Exchange restrictions</h2>
      <p>Unfortunately, there are certain items we cannot accept as a return due to FDA Regulation.</p>
      <ul>
        <li>Opened and/or used e-liquid</li>
        <li>Products that were not purchased on onestopvapestore.com</li>
        <li>Opened and used devices/accessories</li>
        <li>Shipping Fees</li>
        <li>No refunds or exchanges on sample packs or bundle deals that are partially returned or opened</li>
        <li>You will be responsible for shipping the product back to us.</li>
      </ul>
      <p>When the returned items are received, a customer service representative will give you a call to clarify what items you would like to exchange for and place your order with you over the phone. You will only be responsible for the remaining amount of an item that is not of equal value. Standard shipping fee will be applied to all orders less than $100.</p>
      <p>Please contact us before returning any products to us so we can give you an RMA form, if the RMA is not included in the package, we cannot guarantee any refund or exchanges. Our contact information is at the bottom of the page.</p>

      <h2>Get in touch with Onestopvapestore.com</h2>
      <p>
        Onestopvapestore.com Return Mailing Address is:<br />
        Attention: Returns<br />
        4908 E McDowell Road STE 103<br />
        Phoenix, Arizona 85008
      </p>
      <p>
        Customer Service Hours:<br />
        Mon - Fri 8AM - 5PM (AZT)<br />
        Email us at <a href="mailto:sales@onestopvapestore.com">sales@onestopvapestore.com</a><br />
        Call us at <a href="tel:+17747341372">1-774-734-1372</a>
      </p>
    </div>
    </>
  );
}
