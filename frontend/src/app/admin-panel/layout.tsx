"use client";
import AdminPanel from "./components/SidebarPanel";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminPanel>{children}</AdminPanel>;
}
