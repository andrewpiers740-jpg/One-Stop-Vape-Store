"use client";
import dynamic from "next/dynamic";

// Not needed for first paint: loaded in their own chunks after hydration so they do not add to the initial JavaScript.
const SalesPopup = dynamic(() => import("@/src/components/SalesPopup"), { ssr: false });
const SupportChat = dynamic(() => import("@/src/components/SupportChat"), { ssr: false });

export default function LazyWidgets() {
  return (
    <>
      <SalesPopup />
      <SupportChat />
    </>
  );
}
