import React from "react";
import { SITE } from "@/src/config/site";
import PageBanner from "@/src/components/PageBanner";

export const metadata = {
  title: "Shipping Policy | One Stop Vape Store",
  description: "Review our shipping, delivery, and return policy for One Stop Vape Store.",
};

export default function ShippingPage() {
  return (
    <>
      <PageBanner slug="shipping" label="Shipping" />
      <div className="max-w-4xl mx-auto px-6 py-24 prose ">
      <h1><strong>Shipping Policy</strong></h1>

      <h3>Free Domestic Shipping on Orders Over $200!</h3>
      <p>Only online orders $200+ (after discount before tax) inside the US are valid for free shipping. Free shipping will be an option when selecting your shipping method, with a valid purchase.</p>
      <p>Free shipping valid for most of the 48 contiguous U.S. States. No Guam, U.S. Virgin Islands, Puerto Rico, Hawaii, Alaska and APO/DPO/FPO/Other U.S. Military Addresses.</p>

      <h3>International</h3>
      <p>We do not offer international. Orders placed with international shipping will be canceled and refunded. International Customers may call for help with finding a local distributor.</p>

      <h3>Orders</h3>
      <ul>
        <li>All orders have a processing time of 24 to 72 business hours. However, most orders will be shipped within 48 hours.</li>
        <li>Orders will ship via our reliable shipping carriers with signature required upon delivery with photo ID showing 21 and up per Federal Laws.</li>
        <li>All shipping methods are in business days (Monday-Friday).</li>
        <li>Orders may also be reviewed to ensure security and accuracy. If your order is under review, you will be contacted within the same day.</li>
      </ul>
      <p><em>Please Note:</em> We do not process orders on weekends and all Federal holidays! Your order will continue processing the following business day.</p>

      <h3>Shipping Carriers</h3>
      <p>We have a reliable shipping network that uses regional local carriers to deliver your packages. Errors and delays caused by or as a result of the regional carriers are not the responsibility of Onestopvapestore.com.</p>
      <p>We do not provide refunds or reships if the package is lost/stolen or damaged but we do have Guide package protection for situations like this once it is not removed from the order. Also any packages returned by the carrier will receive a refund minus 15% restocking fee and shipping cost.</p>

      <h3>Carrier Delivery Times</h3>
      <p>After the processing period of 24 to 72 business hours, a tracking email will be automatically sent to the customer to confirm the package is in the final stages of fulfillment and carrier delivery times vary on what part of the country you are located in.</p>
      <p>Estimated carrier delivery times:</p>
      <ul>
        <li>West Coast (Arizona, Nevada, Washington and Idaho) of the US: 3-7 business days in transit</li>
        <li>Eastern Half of the US: 11-18 business days in transit</li>
      </ul>

      <h3>Required Adult Signature Service</h3>
      <p>In accordance with Federal jurisdiction and laws, all vape mail orders will require the use of Adult Signature Confirmation (21+) upon delivery for packages containing e-cigarette related products. To receive this package, the recipient is required to show a proper form of government photo identification to the delivery employee for age confirmation.</p>
      <p>If the package is returned because no one is available to sign for the package we will process a refund minus 15% restocking fee and shipping cost.</p>

      <h3>Lost or Stolen Shipments</h3>
      <p>We want to ensure excellent customer satisfaction and quality product delivered in a timely manner. We do know that things happen time to time that is why we now have Guide insurance. In the event you did not pay for Guide Insurance, feel free to call us at 1-774-734-1372 or email us at sales@onestopvapestore.com.</p>

      <h3>Damaged Package During Transit</h3>
      <p>If your package arrives to you and your goods are damaged, immediately take a picture of the items and the invoice included in your package. To better accommodate you, please send our Customer Support Team an email with the pictures of the package included and we will reorder the damaged items for you.</p>

      <h3>Exchanges & Refund Policy</h3>
      <p>If there is an issue with your purchase at onestopvapestore.com, you can call or email us, and we&apos;ll guide you through our processes. Returns must be done within 30 days from the date you purchased it. Puffco products do not qualify for refunds or exchanges.</p>

      <h3>Refunds</h3>
      <p>Once the product is received, we will issue you a refund back to the card used in the original order, minus a 15% restocking fee.</p>

      <h3>Refund/Exchange Restrictions</h3>
      <p>Unfortunately, there are certain items we can&apos;t accept as a return due to FDA Regulation:</p>
      <ul>
        <li>Opened and used juice</li>
        <li>Products that were not purchased on onestopvapestore.com</li>
        <li>Opened and used devices/accessories</li>
        <li>Shipping Fees</li>
        <li>Puffco products do not qualify for refunds or exchanges even if not opened</li>
        <li>No refunds or exchanges on sample packs or bundle deals that are partially returned or opened</li>
      </ul>
      <p>You will be responsible for shipping the product back to us. When the returned items are received, a customer service representative will give you a call to clarify what items you would like to exchange for and place your order with you over the phone. You will only be responsible for the remaining amount of an item that is not of equal value. Standard shipping fee will be applied to all orders less than $200.</p>

      <h3>Onestopvapestore.com Return Mailing Address</h3>
      <p>
        Onestopvapestore.com<br />
        Attention: Returns<br />
        4908 E McDowell Road STE 103<br />
        Phoenix, Arizona 85008
      </p>
    </div>
    </>
  );
}
