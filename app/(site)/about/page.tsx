import About from "@/views/about/About";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Murtuza Ahmed, a Full Stack Developer experienced with React, Next.js, NestJS, PostgreSQL, Docker, and modern web technologies.",
};

export default function AboutPage() {
  return (
    <>
      <About />
    </>
  );
}
