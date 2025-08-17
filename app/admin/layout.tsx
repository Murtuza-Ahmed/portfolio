import type React from "react"
import type { Metadata } from "next"
import { AuthProvider } from "@/lib/contexts/AuthContext"

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
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">{children}</div>
    </AuthProvider>
  )
}
