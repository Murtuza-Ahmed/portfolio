import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/contexts/AuthContext"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: {
    default: "John Doe - MERN Stack Developer",
    template: "%s | John Doe - MERN Stack Developer",
  },
  description:
    "Full-stack MERN developer specializing in modern web applications with React, Node.js, MongoDB, and Express. Building scalable, user-focused solutions.",
  keywords: [
    "MERN Stack Developer",
    "React Developer",
    "Node.js",
    "MongoDB",
    "Express.js",
    "Full Stack Developer",
    "JavaScript",
    "TypeScript",
  ],
  authors: [{ name: "John Doe" }],
  creator: "John Doe",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://johndoe-portfolio.vercel.app",
    title: "John Doe - MERN Stack Developer",
    description:
      "Full-stack MERN developer specializing in modern web applications with React, Node.js, MongoDB, and Express.",
    siteName: "John Doe Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "John Doe - MERN Stack Developer",
    description:
      "Full-stack MERN developer specializing in modern web applications with React, Node.js, MongoDB, and Express.",
    creator: "@johndoe",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navigation />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
