"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Briefcase, Loader2, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import type { Home as HomeType, Skill, Experience, Project } from "@/lib/types";
import {
  ForgeReveal,
  ForgeEyebrow,
  ForgeSectionHeader,
} from "@/components/forge";

// API projects carry `technologies` / `liveUrl` / `githubUrl`; the legacy
// `badges` / `live` / `github` fields are kept as fallbacks.
type ProjectCard = Project & { badges?: string[]; live?: string; github?: string };
// Fallback tech names shown when the skills API has no data yet.
const fallbackTechNames = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "NestJS",
  "MongoDB",
  "PostgreSQL",
  "Docker",
];

/** Render a year from a date-ish value without ever showing "NaN". */
function safeYear(value: unknown): string {
  if (!value) return "";
  const d = new Date(value as string);
  return Number.isNaN(d.getTime()) ? "" : String(d.getFullYear());
}

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

/** Rotation order for the hero tech-stack groups. */
const TECH_GROUP_ORDER = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Tools",
  "Other",
];

/**
 * Rotating tech-stack: shows one skill group at a time (Frontend, Backend,
 * …, Engineering) and cycles every few seconds with a soft fade.
 * Static when there is a single group or the user prefers reduced motion.
 */
function RotatingTechStack({ skills }: { skills: Skill[] }) {
  const groups = useMemo(() => {
    if (skills.length === 0) {
      return [{ label: "Core Stack", items: fallbackTechNames }];
    }
    const built: { label: string; items: string[] }[] = [];
    for (const cat of TECH_GROUP_ORDER) {
      const names = skills
        .filter(
          (s) => (s.skillType || "technical") === "technical" && s.category === cat,
        )
        .map((s) => s.name);
      if (names.length > 0) built.push({ label: cat, items: names.slice(0, 8) });
    }
    const engNames = skills
      .filter((s) => s.skillType === "engineering")
      .map((s) => s.name);
    if (engNames.length > 0)
      built.push({ label: "Engineering", items: engNames.slice(0, 8) });
    return built.length > 0
      ? built
      : [{ label: "Core Stack", items: fallbackTechNames }];
  }, [skills]);

  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setIndex(0);
  }, [groups.length]);

  useEffect(() => {
    if (groups.length <= 1) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const id = window.setInterval(() => {
      setFading(true);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        setIndex((i) => (i + 1) % groups.length);
        setFading(false);
      }, 280);
    }, 3600);
    return () => {
      window.clearInterval(id);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [groups.length]);

  const goTo = (i: number) => {
    if (i === index || fading) return;
    setFading(true);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setIndex(i);
      setFading(false);
    }, 220);
  };

  const group = groups[index % groups.length];

  return (
    <div className="mt-12">
      <ForgeEyebrow centered>Tech Stack</ForgeEyebrow>
      <div className="mt-6 flex min-h-[148px] flex-col items-center">
        <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-forge-amber">
          {group.label}
        </p>
        <div
          className={`mt-4 flex flex-wrap justify-center gap-3 transition-all duration-300 ${
            fading ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          {group.items.map((name) => (
            <span key={name} className="forge-chip">
              {name}
            </span>
          ))}
        </div>
        {groups.length > 1 && (
          <div className="mt-5 flex items-center gap-2">
            {groups.map((g, i) => (
              <button
                key={g.label}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show ${g.label} skills`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-6 bg-forge-amber"
                    : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [home, setHome] = useState<HomeType | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<ProjectCard[]>([]);
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
        if (Array.isArray(skillsData.data))
          setSkills(skillsData.data.slice(0, 48));
        if (Array.isArray(experienceData.data))
          setExperience(experienceData.data);
        if (Array.isArray(projectsData.data))
          setProjects(projectsData.data);
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
        <Loader2 className="h-8 w-8 animate-spin text-forge-amber" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Hero Section */}
      <section id="top" className="relative overflow-hidden">
        <div className="forge-hero-glow" />
        <div className="forge-section text-center">
          <ForgeReveal>
            <span className="forge-pill-badge">
              <span className="forge-pulse-dot" />
              Available for new opportunities
            </span>
          </ForgeReveal>

          <ForgeReveal delay={100}>
            <h1 className="forge-h1 mt-8">Hi, I'm Murtuza Ahmed</h1>
            <div className="font-display text-2xl md:text-3xl font-semibold text-forge-amber mt-4">
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
                className="font-display text-2xl md:text-3xl font-semibold text-forge-amber"
              />
            </div>
            <p className="forge-lead forge-lead-center mt-6">
              I craft modern, scalable web applications using React, Next.js,
              Node.js, NestJS, PostgreSQL, MongoDB, and Docker. Passionate
              about creating seamless user experiences and production-ready
              backend solutions.
            </p>
          </ForgeReveal>

          {/* Tech Stack — rotating groups, live from the skills API */}
          <ForgeReveal delay={200}>
            <RotatingTechStack skills={skills} />
          </ForgeReveal>

          <ForgeReveal delay={200}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href={home?.ctaButtonLink || "/contact"}
                className="forge-btn-primary group"
              >
                {home?.ctaButtonText || "Hire Me"}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/projects" className="forge-btn-ghost">
                View Work
              </Link>
            </div>
          </ForgeReveal>

          <ForgeReveal delay={200}>
            <div className="forge-stats mt-14">
              <div className="forge-stat">
                <div className="forge-stat-value">3+</div>
                <div className="forge-stat-label">Projects Shipped</div>
              </div>
              <div className="forge-stat">
                <div className="forge-stat-value">1+</div>
                <div className="forge-stat-label">Years Experience</div>
              </div>
              <div className="forge-stat">
                <div className="forge-stat-value">8+</div>
                <div className="forge-stat-label">Core Technologies</div>
              </div>
            </div>
          </ForgeReveal>
        </div>
      </section>

      {/* About Teaser */}
      <section id="about">
        <div className="forge-section">
          <ForgeSectionHeader
            eyebrow="About"
            title="Clean structure, strong execution."
            lead="I translate business needs into a polished digital presence using thoughtful layout, consistent spacing, and clear visual hierarchy. Every section is built to feel intentional and premium."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            <ForgeReveal>
              <div className="forge-card forge-card-hover p-6">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-forge-mute">
                  Experience
                </p>
                <p className="forge-h3 mt-4">MERN + product-driven apps</p>
              </div>
            </ForgeReveal>
            <ForgeReveal delay={100}>
              <div className="forge-card forge-card-hover p-6">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-forge-mute">
                  Approach
                </p>
                <p className="forge-h3 mt-4">Less noise, more clarity.</p>
              </div>
            </ForgeReveal>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <div className="forge-section">
          <ForgeSectionHeader eyebrow="Projects" title="Featured work" />
          {projects.length === 0 ? (
            <div className="forge-card p-12 text-center text-muted-foreground">
              Projects added from the admin panel will appear here.
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-3">
              {projects.map((project, index) => {
                const badges =
                  project.technologies && project.technologies.length > 0
                    ? project.technologies
                    : (project.badges ?? []);
                const liveUrl = project.liveUrl || project.live;
                const githubUrl = project.githubUrl || project.github;
                return (
                  <ForgeReveal key={project._id} delay={(index % 3) * 100}>
                    <article className="forge-card forge-card-hover group flex h-full flex-col overflow-hidden">
                      <div className="relative overflow-hidden">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.title || "Project image"}
                            width={600}
                            height={400}
                            className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-52 w-full items-center justify-center bg-forge-brown-1">
                            <Briefcase className="h-12 w-12 text-muted-foreground" />
                          </div>
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        {project.featured && (
                          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-forge-amber px-3 py-1 text-xs font-bold text-[#140e04] shadow-[0_4px_16px_rgba(255,178,56,0.5)]">
                            <Star className="h-3 w-3" />
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="forge-h3 transition-colors group-hover:text-forge-amber">
                          {project.title || "Untitled project"}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm leading-7 text-muted-foreground">
                          {project.description || "No description provided."}
                        </p>
                        {badges.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {asArray<string>(badges)
                              .slice(0, 4)
                              .map((badge) => (
                                <span
                                  key={badge}
                                  className="forge-chip text-xs"
                                >
                                  {badge}
                                </span>
                              ))}
                            {badges.length > 4 && (
                              <span className="forge-chip text-xs">
                                +{badges.length - 4}
                              </span>
                            )}
                          </div>
                        )}
                        <div className="mt-auto flex flex-wrap gap-3 pt-6">
                          {liveUrl && (
                            <Link
                              href={liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="forge-btn-ghost px-5 py-2.5 text-sm"
                            >
                              Live Demo
                            </Link>
                          )}
                          {githubUrl && (
                            <Link
                              href={githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="forge-btn-ghost px-5 py-2.5 text-sm"
                            >
                              GitHub
                            </Link>
                          )}
                        </div>
                      </div>
                    </article>
                  </ForgeReveal>
                );
              })}
            </div>
          )}
          {projects.length > 0 && (
            <ForgeReveal delay={150}>
              <div className="mt-10 text-center">
                <Link href="/projects" className="forge-btn-ghost group">
                  View All Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </ForgeReveal>
          )}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience">
        <div className="forge-section">
          <ForgeSectionHeader
            eyebrow="Experience"
            title="Built for real results"
          />
          {experience.length === 0 ? (
            <div className="forge-card p-12 text-center text-muted-foreground">
              Experience entries added from the admin panel will appear here.
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {experience.map((item, index) => {
                const start = safeYear(item.startDate);
                const end = item.endDate ? safeYear(item.endDate) : "Present";
                const period = start ? `${start} - ${end}` : end;
                return (
                  <ForgeReveal
                    key={item._id}
                    delay={(index % 2) * 100}
                  >
                    <div className="forge-card forge-card-hover h-full p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="forge-h3">
                            {item.jobTitle || "Role"}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {item.company || ""}
                          </p>
                        </div>
                        <span className="forge-ghost-num text-5xl">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      {period && (
                        <div className="mt-4">
                          <span className="forge-chip">{period}</span>
                        </div>
                      )}
                      {item.description && (
                        <p className="mt-4 leading-7 text-muted-foreground">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </ForgeReveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact">
        <div className="forge-section">
          <ForgeReveal>
            <div className="forge-card forge-card-hover mx-auto max-w-4xl p-12 text-center">
              <ForgeEyebrow centered>Contact</ForgeEyebrow>
              <h2 className="forge-h2 mt-4">
                Let's create something exceptional.
              </h2>
              <p className="forge-lead forge-lead-center mt-5">
                If you'd like a portfolio with clean structure, polished
                motion, and fast performance, I'm ready to help.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link href="/contact" className="forge-btn-primary">
                  Hire Me
                </Link>
                <Link href="/resume" className="forge-btn-ghost">
                  Download Resume
                </Link>
              </div>
            </div>
          </ForgeReveal>
        </div>
      </section>

      <a
        href="#top"
        className="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-forge-line bg-forge-coal/90 text-forge-amber shadow-[0_0_24px_-6px_rgba(255,178,56,0.4)] backdrop-blur transition-transform hover:-translate-y-1"
        aria-label="Back to top"
      >
        <ArrowRight className="rotate-90 h-5 w-5" />
      </a>
    </div>
  );
}
