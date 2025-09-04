import { AuthProvider } from "@/lib/contexts/AuthContext";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: {
    default: "Admin Panel - MERN Stack Project",
    template: "%s | Admin Panel",
  },
  description: "Admin panel for managing users, projects, and contact messages",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <AuthProvider>
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
        </div>
      </AuthProvider>
    </>
  );
}
