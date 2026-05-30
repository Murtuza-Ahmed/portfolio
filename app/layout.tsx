import type React from "react";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const baseUrl = new URL("https://portfolio-murtuza-ahmed.vercel.app");

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: {
    default: "Murtuza Ahmed - MERN Stack Developer",
    template: "%s | Murtuza Ahmed - MERN Stack Developer",
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
  authors: [{ name: "Murtuza Ahmed" }],
  creator: "Murtuza Ahmed",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl.toString(),
    title: "Murtuza Ahmed - MERN Stack Developer",
    description:
      "Full-stack MERN developer specializing in modern web applications with React, Node.js, MongoDB, and Express.",
    siteName: "Murtuza Ahmed Portfolio",
    images: [
      new URL("/professional-developer-portrait.png", baseUrl).toString(),
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Murtuza Ahmed - MERN Stack Developer",
    description:
      "Full-stack MERN developer specializing in modern web applications with React, Node.js, MongoDB, and Express.",
    creator: "@murtuza_ahmed",
    images: [
      new URL("/professional-developer-portrait.png", baseUrl).toString(),
    ],
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
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background dark:text-white font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
