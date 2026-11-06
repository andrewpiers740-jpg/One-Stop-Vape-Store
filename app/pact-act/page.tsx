import React from "react";
import { SITE } from "@/src/config/site";
import PageBanner from "@/src/components/PageBanner";

export const metadata = {
  title: "Pact Act FAQ | One Stop Vape Store",
  description: "Frequently asked questions regarding the PACT Act and vape shipping regulations.",
};

export default function PactActPage() {
  return (
    <>
      <PageBanner slug="pact-act" label="PACT Act" />
      <div className="max-w-4xl mx-auto px-6 py-24 prose ">
      <h1><strong>Pact Act FAQ</strong></h1>

      <h3>What is the PACT Act?</h3>
      <p>An amendment to the Prevent All Cigarette Trafficking (“PACT”) Act was signed into law in December 2020. This amendment regulates the sale of vaping products both online and in bricks & mortar vape shops and comes into effect on Saturday, March 27th, 2021.</p>

      <h3>Is there a ban on shipping vaping products?</h3>
      <p>The PACT Act prevents USPS from carrying any vaping products and while FedEx and UPS have also stated they will stop carrying vaping products, there is not a ban on shipping vape products. Once USPS stops carrying our products, we will be working with a new shipping partner.</p>
      <p>We are working hard to expand our shipping coverage, but there may be some temporary interruptions to service in some locations.</p>

      <h3>Will I have to sign for my package?</h3>
      <p>Yes, every delivery containing vaping products will require an adult (21+) with ID to sign for the package in ALL states. Some of our customers are used to this, as 11 states we ship already have this law and it works well. <em>(It may be easier to have your order sent to a work address to ensure you don&rsquo;t miss your delivery.)</em></p>
      <p>There are also new labelling rules for packages containing vaping products, so your packages will have a sticker on them that reads: <em>&ldquo;CIGARETTES/NICOTINE/SMOKELESS TOBACCO: FEDERAL LAW REQUIRES THE PAYMENT OF ALL APPLICABLE EXCISE TAXES, AND COMPLIANCE WITH APPLICABLE LICENSING AND TAX-STAMPING OBLIGATIONS&rdquo;</em></p>

      <h3>So, do I have to pay tax?</h3>
      <p>Some states impose a tax on vaping products and if your state is one of them, we will now collect and pay this on your behalf. This means that when you come to check out and provide your ZIP code, we will automatically add and itemize the relevant state excise to your final total. This requirement applies to both online retailers and your local vape shop.</p>

      <h3>What else do I need to know?</h3>
      <p>The PACT Act effectively means that all vaping retailers, including online retailers, must hold any applicable state and local licenses & permits. One Stop Vape Store will comply fully with all these requirements.</p>

      <h3>Can I still buy from One Stop Vape Store?</h3>
      <p>Despite what some people tell you, online sales for vape are not banned but the PACT Act has made it harder for us. But we are determined to rise to this challenge and continue to sell a great range of products at competitive prices.</p>
    </div>
    </>
  );
}
