import React from "react";
import { Metadata } from "next";
import { SITE } from "@/src/config/site";
import WishlistClient from "@/src/components/WishlistClient";

export const metadata: Metadata = {
  title: `My Wishlist | ${SITE.name}`,
  description: `View and manage your saved disposable vapes, nixodine products, and premium hardware at ${SITE.name}.`,
  alternates: {
    canonical: `https://${SITE.domain}/pages/wishlist/`,
  },
};

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <WishlistClient />
    </div>
  );
}
