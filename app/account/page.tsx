import React from "react";
import { SITE } from "@/src/config/site";

export const metadata = {
  title: `My Account | ${SITE.name}`,
  description: `Manage your account details at ${SITE.name}.`,
};

export default function AccountPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-8">My Account</h1>
      <p className="text-zinc-400">Please sign in to view your account details, order history, and preferences.</p>
    </div>
  );
}
