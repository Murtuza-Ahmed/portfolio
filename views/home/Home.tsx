"use client";

import { useEffect, useState } from "react";
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
  Loader2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Home as HomeType, Skill, Experience, Project } from "@/lib/types";

export default function Home() {
  const [home, setHome] = useState<HomeType | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [homeRes, skillsRes, experienceRes, projectsRes] =
          await Promise.all([
            fetch("/api/home"),
            fetch("/api/skills?limit=100"),
            fetch("/api/experience?limit=100"),
            fetch("/api/projects?limit=3"),
          ]);

        const homeData = await homeRes.json();
        const skillsData = await skillsRes.json();
        const experienceData = await experienceRes.json();
        const projectsData = await projectsRes.json();

        if (homeData.data) setHome(homeData.data);
        if (skillsData.data) setSkills(skillsData.data.slice(0, 4));
        if (experienceData.data) setExperience(experienceData.data);
        if (projectsData.data) setProjects(projectsData.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Hero Section */}
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
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                  {home?.heroSubtitle ||
                    "Hello, I'm a product-minded developer"}
                </p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight">
                  {home?.heroTitle ||
                    "Simple, smooth, premium web experiences."}
                </h1>
                <p className="max-w-2xl text-base md:text-lg leading-8 text-muted-foreground">
                  {home?.heroDescription ||
                    "I build elegant MERN applications with clear structure, thoughtful motion, and a polished interface that feels like a top-tier product."}
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="group transition-transform hover:-translate-y-0.5 hover:scale-[1.02]"
                >
                  <Link href={home?.ctaButtonLink || "/contact"}>
                    {home?.ctaButtonText || "Hire Me"}
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

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {skills.slice(0, 4).map((skill) => (
                  <div
                    key={skill._id}
                    className="glass-card tilt-card p-4 text-center"
                  >
                    <p className="text-sm font-semibold">{skill.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-slide-in-left page-section page-section-delay-1">
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

      {/* About Section */}
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

      {/* Skills Section */}
      <section
        id="skills"
        className="bg-muted/30 px-4 py-20 page-section page-section-delay-2"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Skills
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Technologies I rely on
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <div
                key={skill._id}
                className="glass-card p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="font-semibold">{skill.name}</h3>
                <div className="mt-4 w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2 transition-all"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {skill.proficiency}% proficiency • {skill.category}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link href="/about">View All Skills</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
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
                key={project._id}
                className="group tilt-card overflow-hidden border border-border/70 bg-background transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3 text-primary">
                    <Briefcase className="h-5 w-5" />
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-7">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-xs py-2 px-3"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3 pt-4">
                    {project.liveUrl && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="transition-transform hover:-translate-y-0.5"
                      >
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Live Demo
                        </Link>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="transition-transform hover:-translate-y-0.5"
                      >
                        <Link
                          href={project.githubUrl}
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

      {/* Experience Section */}
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
                key={item._id}
                className="glass-card tilt-card p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">{item.jobTitle}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.company}
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {new Date(item.startDate).getFullYear()} -{" "}
                    {item.endDate
                      ? new Date(item.endDate).getFullYear()
                      : "Present"}
                  </Badge>
                </div>
                <p className="mt-4 text-muted-foreground leading-7">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
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
              Let's create something exceptional.
            </h2>
            <p className="mt-4 text-muted-foreground leading-8">
              If you'd like a portfolio with clean structure, polished motion,
              and fast performance, I'm ready to help.
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
