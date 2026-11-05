import React from "react";
import AdminClientShell from "@/src/components/admin/AdminClientShell";

export const metadata = {
  title: "Admin Portal | One Stop Vape Store",
  robots: { index: false, follow: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminClientShell>{children}</AdminClientShell>;
}
