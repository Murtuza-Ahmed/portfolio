"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Code2,
  Briefcase,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
const techStack = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "🔷" },
  { name: "Node.js", icon: "🟢" },
  { name: "NestJS", icon: "🧩" },
  { name: "MongoDB", icon: "🍃" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Docker", icon: "🐳" },
];

// Derived simple skills list used in hero preview cards
// const skills = techStack.map((t) => t.name);
const projects = [
  {
    title: "E-commerce Platform",
    description:
      "A modern shopping experience with product search, cart, and checkout flows.",
    image: "/ecommerce-platform.png",
    badges: ["React", "Node.js", "MongoDB"],
    live: "https://example.com",
    github: "https://github.com/Murtuza-Ahmed/ecommerce-platform",
  },
  {
    title: "Expense Tracker App",
    description:
      "Creating robust APIs and server-side applications with Node.js and NestJS. I design scalable services backed by PostgreSQL or MongoDB and containerize deployments with Docker.",
  },
  {
    title: "Weather Dashboard",
    description:
      "Designing and implementing efficient database schemas and migrations for MongoDB and PostgreSQL. Familiar with ORMs and data modeling for production workloads.",
  },
];

const experience = [
  {
    role: "Frontend Engineer",
    company: "Freelance",
    period: "2024 — Present",
    details:
      "Designing polished web interfaces and delivering optimized React applications for startups and small businesses.",
  },
  {
    role: "MERN Developer",
    company: "Personal Projects",
    period: "2023 — Present",
    details:
      "Building full-stack applications with authentication, REST APIs, and responsive UX.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <section id="top" className="relative overflow-hidden px-4 py-20">
        <div className="absolute inset-x-0 top-0 h-72 bg-linear-to-b from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div className="space-y-8 animate-fade-in-up">
              <Badge
                variant="outline"
                className="w-fit border-primary text-primary"
              >
                Premium MERN Portfolio
              </Badge>
              <div className="space-y-4">
                <Badge variant="outline" className="w-fit">
                  Available for new opportunities
                </Badge>
                <h2 className="text-4xl text-black dark:text-white md:text-6xl lg:text-7xl font-bold tracking-tight">
                  Hi, I'm <span className="dark:text-white">Murtuza Ahmed</span>
                </h2>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-muted-foreground">
                  <TypeAnimation
                    sequence={[
                      "MERN Stack Developer",
                      1000,
                      "Full Stack Developer",
                      1000,
                      "Frontend Developer",
                      1000,
                      "Backend Developer",
                      1000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    className="text-2xl md:text-3xl lg:text-4xl font-semibold text-muted-foreground"
                  />
                </h3>
                <p className="text-base md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                  I craft modern, scalable web applications using React,
                  Next.js, Node.js, NestJS, PostgreSQL, MongoDB, and Docker.
                  Passionate about creating seamless user experiences and
                  production-ready backend solutions.
                </p>
              </div>

              {/* Tech Stack */}
              <div className="space-y-4">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-3">
                  {techStack.map((tech) => (
                    <Badge
                      key={tech.name}
                      variant="secondary"
                      className="text-sm py-2 px-4"
                    >
                      {/* <span className="mr-2">{tech.icon}</span> */}
                      {tech.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="group transition-transform hover:-translate-y-0.5 hover:scale-[1.02]"
                >
                  <Link href="/contact">
                    Hire Me
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="transition-transform hover:-translate-y-0.5 hover:scale-[1.02]"
                >
                  <Link href="/projects">View Work</Link>
                </Button>
              </div>
            </div>

            <div className="relative animate-slide-in-left page-section page-section-delay-1 mt-0 lg:mt-10">
              <div className="hero-3d-card tilt-card flex h-full flex-col justify-between p-6 shadow-xl shadow-slate-900/5">
                <div className="space-y-6">
                  <div className="flex items-center justify-between gap-4 rounded-3xl bg-linear-to-r from-primary/10 to-accent/10 p-5">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
                        Current Focus
                      </p>
                      <p className="text-xl font-semibold">
                        Modern product interfaces
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                      <Sparkles className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-3xl border border-border/60 bg-white/80 p-5 shadow-sm">
                      <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
                        MERN Stack
                      </p>
                      <p className="mt-3 text-lg font-semibold">
                        Fast, scalable full-stack builds.
                      </p>
                    </div>
                    <div className="rounded-3xl border border-border/60 bg-white/80 p-5 shadow-sm">
                      <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
                        Design System
                      </p>
                      <p className="mt-3 text-lg font-semibold">
                        Consistent spacing, subtle glass, soft shadows.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl border border-border/60 bg-white/60 p-6 shadow-sm backdrop-blur-xl">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-3xl bg-primary/10 text-primary flex items-center justify-center">
                      <Code2 className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                        Ready for
                      </p>
                      <p className="font-semibold">
                        Impactful, polished digital products.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -right-10 top-10 hidden lg:block"></div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="px-4 py-20 page-section page-section-delay-1"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_0.8fr] items-start">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                  About Me
                </p>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Clean structure, strong execution.
                </h2>
                <p className="max-w-2xl text-muted-foreground leading-8">
                  I translate business needs into a polished digital presence
                  using thoughtful layout, consistent spacing, and clear visual
                  hierarchy. Every section is built to feel intentional and
                  premium.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="glass-card tilt-card p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
                    Experience
                  </p>
                  <p className="mt-4 text-xl font-semibold">
                    MERN + product-driven apps
                  </p>
                </div>
                <div className="glass-card tilt-card p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
                    Approach
                  </p>
                  <p className="mt-4 text-xl font-semibold">
                    Less noise, more clarity.
                  </p>
                </div>
              </div>
            </div>
            <div className="glass-card tilt-card p-8 shadow-xl shadow-slate-900/5">
              <h3 className="text-xl font-semibold">Key strengths</h3>
              <ul className="mt-6 space-y-4 text-muted-foreground">
                <li>• Responsive interfaces with polished transitions.</li>
                <li>• Clear information hierarchy and consistent spacing.</li>
                <li>• Fast, maintainable code with modern tooling.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="px-4 py-20 page-section page-section-delay-3"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Projects
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">Featured work</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <Card
                key={project.title}
                className="group tilt-card overflow-hidden border border-border/70 bg-background transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-56 w-full flex items-center justify-center bg-muted/20">
                    <Briefcase className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}

                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3 text-primary">
                    <Briefcase className="h-5 w-5" />
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-7">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(project.badges || []).map((badge) => (
                      <Badge
                        key={badge}
                        variant="outline"
                        className="text-xs py-2 px-3"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3 pt-4">
                    {project.live && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="transition-transform hover:-translate-y-0.5"
                      >
                        <Link
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Live Demo
                        </Link>
                      </Button>
                    )}

                    {project.github && (
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="transition-transform hover:-translate-y-0.5"
                      >
                        <Link
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                        >
                          GitHub
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="experience"
        className="bg-muted/30 px-4 py-20 page-section page-section-delay-1"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Experience
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Built for real results
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {experience.map((item) => (
              <div
                key={item.role}
                className="glass-card tilt-card p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">{item.role}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.company}
                    </p>
                  </div>
                  <Badge variant="secondary">{item.period}</Badge>
                </div>
                <p className="mt-4 text-muted-foreground leading-7">
                  {item.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="px-4 py-20 page-section page-section-delay-2"
      >
        <div className="container mx-auto max-w-4xl">
          <div className="glass-card tilt-card p-12 text-center shadow-xl shadow-slate-900/5">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Contact
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold">
              Let’s create something exceptional.
            </h2>
            <p className="mt-4 text-muted-foreground leading-8">
              If you'd like a portfolio with clean structure, polished motion,
              and fast performance, I’m ready to help.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                className="transition-transform hover:-translate-y-0.5 hover:scale-[1.02]"
              >
                <Link href="/contact">Hire Me</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="transition-transform hover:-translate-y-0.5 hover:scale-[1.02]"
              >
                <Link href="/resume">Download Resume</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <a
        href="#top"
        className="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-border/80 bg-background/90 text-foreground shadow-lg shadow-slate-900/10 transition-transform duration-300 hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground"
        aria-label="Back to top"
      >
        <ArrowRight className="rotate-90 h-5 w-5" />
      </a>
    </div>
  );
}
