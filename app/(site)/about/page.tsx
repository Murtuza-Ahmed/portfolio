import About from "@/views/about/About";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Murtuza Ahmed, a passionate MERN Stack Developer with expertise in modern web technologies and a commitment to creating exceptional digital experiences.",
};

export default function AboutPage() {
  return (
    <>
      <About />
    </>
  );
}
