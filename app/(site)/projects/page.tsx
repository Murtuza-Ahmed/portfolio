import Projects from "@/views/projects/Projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Murtuza Ahmed portfolio of MERN stack projects, featuring modern web applications built with React, Node.js, MongoDB, and Express.",
};

export default function ProjectsPage() {
  return <Projects />;
}
