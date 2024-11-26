"use client";
import UserRolesProvider from "@/providers/UserRolesProvider";
import AdminPanel from "./components/SidebarPanel";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserRolesProvider>
      <AdminPanel>{children}</AdminPanel>
    </UserRolesProvider>
  );
}
