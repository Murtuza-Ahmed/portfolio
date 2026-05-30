import Contact from "@/views/contact/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Murtuza Ahmed for MERN stack development, custom web applications, and full-stack engineering services.",
};

export default function ContactPage() {
  return <Contact />;
}
