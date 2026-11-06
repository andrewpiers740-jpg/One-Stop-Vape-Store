import React from "react";
import { SITE } from "@/src/config/site";
import PageBanner from "@/src/components/PageBanner";

export const metadata = {
  title: "About Us | One Stop Vape Store",
  description: "Learn more about One Stop Vape Store, our mission, story, and commitment to quality vaping products.",
};

export default function AboutPage() {
  return (
    <>
      <PageBanner slug="about" label="About" />
      <div className="max-w-4xl mx-auto px-6 py-24 prose ">
      <h1><strong>About Us</strong></h1>
      
      <h3>Our Mission</h3>
      <p>At {SITE.name}, our mission is to empower every vaping enthusiast with quality and diversity in product selection, backed by superior customer service.</p>
      <p>We strive to be the definitive destination for all things related to vaping, from the novice to the connoisseur. We are committed to fostering a community that enlightens, educates, and entertains, while providing a platform for the finest vaping products in the industry.</p>
      <p>Our products are intended for current smokers, vapers, and tobacco users. We have no interest in selling to minors, as the government underage use has proven an existential threat to our industry that threatens to deny adult vapers access to smoke and ash free alternatives.</p>
      <p>At {SITE.name}, providing the quick shipping, the best vape products, and unmatched customer service is our priority.</p>

      <h3>Our Story</h3>
      <p>Our journey has been one of innovation and adaptability. As one of the top vaping brands in the US, we faced challenges when the PACT Act came into effect, changing the way nicotine products could be shipped.</p>
      <p>However, we saw this as an opportunity to expand and evolve. By switching our focus to global markets, we were able to foster a new community of vapers with trusted products and pertinent vaping information.</p>
      <p>We are happy to announce our continued presence in the US market, having established a robust shipping network, and we look forward to providing our customers with unmatched service and the best vaping hardware, e-liquids, accessories, vape mods, and disposable vapes on the market.</p>

      <h3>Company Values</h3>
      <ul>
        <li><strong>Empowerment:</strong> Empowering our customers with the freedom to choose high-quality vaping products tailored to their unique preferences.</li>
        <li><strong>Quality:</strong> Delivering excellence in every product, ensuring the highest standards of safety and satisfaction for our customers.</li>
        <li><strong>Diversity:</strong> Celebrating the diverse tastes and preferences of our community with a wide range of products that cater to everyone.</li>
        <li><strong>Education:</strong> Committed to educating our customers with the latest information and guidance to make informed choices about their vaping experience.</li>
        <li><strong>Commitment:</strong> Dedicated to building lasting relationships through consistent, reliable service and a steadfast focus on customer satisfaction.</li>
      </ul>

      <h3>What We Provide</h3>
      <p>At {SITE.name}, we pride ourselves on offering a curated collection of the best vape products. This includes replacement pods and coils for long-established and popular devices as well as cutting-edge vape pods and vape mods that cater to the tastes and preferences of our diverse clientele.</p>
      <p>Our commitment to quality extends to providing the biggest names in vape juice as well as cutting-edge disposable vape devices. We meticulously select items that stand out for their innovation, reliability, and user satisfaction.</p>
      <p>From beginner kits to advanced mods, every product is chosen to provide an exceptional vaping experience. Customers enjoy a seamless purchase process that ensures their favorite vaping essentials are delivered swiftly and efficiently, maintaining our standard of excellence.</p>
    </div>
    </>
  );
}
