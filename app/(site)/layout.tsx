import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import React from "react";

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <AuthProvider>
        <div className="relative flex min-h-screen flex-col">
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </AuthProvider>
    </>
  );
}
