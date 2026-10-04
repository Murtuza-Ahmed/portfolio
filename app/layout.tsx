import type React from "react";
import type { Metadata } from "next";
import { Space_Grotesk, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-hanken",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const baseUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ||
    "https://portfolio-murtuza-ahmed.vercel.app",
);

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
  const siteUrl = baseUrl.toString().replace(/\/$/, "");
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Murtuza Ahmed",
    url: siteUrl,
    jobTitle: "MERN Stack Developer",
    description:
      "Full-stack MERN developer specializing in modern web applications with React, Node.js, MongoDB, and Express.",
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "MERN Stack",
    ],
  };

  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background dark:text-white font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex-1">{children}</main>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
