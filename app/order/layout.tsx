import React from "react";

export const metadata = {
  robots: { index: false, follow: true },
};

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
