import Home from "@/views/home/Home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Murtuza Ahmed is a MERN stack developer crafting responsive, modern web applications with React, Node.js, MongoDB, PostgreSQL, Nest.js, and Express.",
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
