import React from "react";
import { SITE } from "@/src/config/site";
import Nav from "@/src/components/Nav";
import Footer from "@/src/components/Footer";
import AnnouncementBar from "@/src/components/AnnouncementBar";
import AgeGateModal from "@/src/components/AgeGateModal";
import SalesPopup from "@/src/components/SalesPopup";
import JsonLd from "@/src/components/JsonLd";
import "./globals.css";

export const metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  metadataBase: new URL(`https://${SITE.domain}`),
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    url: `https://${SITE.domain}`,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `https://${SITE.domain}/`,
  },
  other: {
    "google-site-verification": SITE.gscVerification,
    "og:updated_time": new Date().toISOString(),
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITE.locale} className="dark selection:bg-emerald-500 selection:text-black">
      <head>
        <script src="/js/webmcp.js" defer></script>
      </head>
      <body className="bg-black text-white antialiased min-h-screen flex flex-col font-sans">
        <AnnouncementBar />
        <Nav />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <AgeGateModal />
        <SalesPopup />
        <JsonLd />
      </body>
    </html>
  );
}
