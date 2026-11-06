import React from "react";
import { SITE } from "@/src/config/site";
import Nav from "@/src/components/Nav";
import Footer from "@/src/components/Footer";
import AnnouncementBar from "@/src/components/AnnouncementBar";
import AgeGateModal from "@/src/components/AgeGateModal";
import SalesPopup from "@/src/components/SalesPopup";
import JsonLd from "@/src/components/JsonLd";
import { CartProvider } from "@/src/components/CartProvider";
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
  icons: {
    icon: [{ url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" }, { url: "/brand/icon-512.png", sizes: "512x512", type: "image/png" }],
    apple: "/brand/apple-touch-icon.png",
  },
  alternates: {
    canonical: "./",
  },
  other: {
    "google-site-verification": SITE.gscVerification,
    "og:updated_time": new Date().toISOString(),
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITE.locale} className="dark selection:bg-emerald-500 selection:text-white">
      <head>
        <script src="/js/webmcp.js" defer></script>
      </head>
      <body className="bg-white text-slate-900 antialiased min-h-screen flex flex-col font-sans">
        <CartProvider>
          <AnnouncementBar />
          <Nav />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <AgeGateModal />
          <SalesPopup />
        </CartProvider>
        <JsonLd />
      </body>
    </html>
  );
}
