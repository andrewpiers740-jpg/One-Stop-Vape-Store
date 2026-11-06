import React from "react";
import { Metadata } from "next";
import { SITE } from "@/src/config/site";
import WishlistClient from "@/src/components/WishlistClient";
import PageBanner from "@/src/components/PageBanner";

export const metadata: Metadata = {
  title: `My Wishlist | ${SITE.name}`,
  description: `View and manage your saved favorite vape products at ${SITE.name}.`,
  alternates: {
    canonical: `https://${SITE.domain}/pages/wishlist/`,
  },
};

export default function WishlistAliasPage() {
  return (
    <>
      <PageBanner slug="wishlist" label="Wishlist" />
      <div className="min-h-screen bg-white text-slate-900">
      <WishlistClient />
    </div>
    </>
  );
}
