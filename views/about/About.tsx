"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { ForgeReveal, ForgeEyebrow, ForgeSectionHeader } from "@/components/forge";
import {
  Code2,
  Database,
  Server,
  Globe,
  GitBranch,
  Coffee,
  Music,
  Camera,
  BookOpen,
  Award,
  Users,
  Target,
  Heart,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import type { About as AboutType, Skill } from "@/lib/types";

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

const defaultTechnologies = [
  { name: "React", icon: Code2 },
  { name: "Next.js", icon: Globe },
  { name: "TypeScript", icon: Code2 },
  { name: "Node.js", icon: Server },
  { name: "NestJS", icon: Server },
  { name: "MongoDB", icon: Database },
  { name: "PostgreSQL", icon: Database },
  { name: "Docker", icon: Server },
  { name: "Git", icon: GitBranch },
];

const interestIcons: Record<string, any> = {
  Coffee: Coffee,
  Photography: Camera,
  Music: Music,
  Reading: BookOpen,
};

const valueIcons: Record<string, any> = {
  "Quality First": Target,
  Collaboration: Users,
  "Continuous Learning": Award,
  "User-Centric": Heart,
};

const quickFacts = [
  { value: "3+", label: "Projects" },
  { value: "1+", label: "Years Exp." },
  { value: "1+", label: "Happy Clients" },
  { value: "5+", label: "Technologies" },
];

function ProficiencyList({ items }: { items: Skill[] }) {
  if (items.length === 0) {
    return (
      <p className="text-muted-foreground">
        Skills added from the admin panel will appear here.
      </p>
    );
  }
  return (
    <div className="space-y-4">
      {items.map((skill) => {
        const proficiency =
          typeof skill.proficiency === "number"
            ? Math.min(100, Math.max(0, skill.proficiency))
            : 0;
        return (
          <div key={skill._id} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">{skill.name}</span>
              <span className="forge-chip text-xs">{skill.category}</span>
            </div>
            <Progress value={proficiency} className="h-2" />
            <div className="text-right text-sm text-forge-mute">
              {proficiency}%
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function About() {
  const [about, setAbout] = useState<AboutType | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutRes, skillsRes] = await Promise.all([
          fetch("/api/about"),
          fetch("/api/skills?limit=100"),
        ]);

        const aboutData = await aboutRes.json();
        const skillsData = await skillsRes.json();

        if (aboutData.data) setAbout(aboutData.data);
        if (Array.isArray(skillsData.data)) setSkills(skillsData.data);
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

  const technicalSkills = skills.filter(
    (s) => (s.skillType || "technical") === "technical"
  );
  const engineeringSkills = skills.filter(
    (s) => s.skillType === "engineering"
  );

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="forge-hero-glow" />
        <div className="forge-section text-center">
          <ForgeReveal>
            {about?.profileImage && (
              <div className="relative mx-auto h-32 w-32 rounded-full border-2 border-forge-amber/40 shadow-[0_0_48px_-8px_rgba(255,178,56,0.5)]">
                <Image
                  src={about.profileImage}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="rounded-full object-cover"
                />
              </div>
            )}
            <div className="mt-8 space-y-4">
              <ForgeEyebrow centered>Profile</ForgeEyebrow>
              <h1 className="forge-h1">About Me</h1>
              <p className="forge-lead forge-lead-center">
                I&apos;m a Full Stack Developer experienced in MERN and
                TypeScript-based backends. I build scalable, production-ready
                applications using React, Next.js, Node.js, NestJS, PostgreSQL,
                MongoDB, and Docker.
              </p>
            </div>
          </ForgeReveal>
        </div>
      </section>

      {/* Bio + Quick Facts Section */}
      <section>
        <div className="forge-section">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <ForgeReveal>
              <ForgeEyebrow>My Journey</ForgeEyebrow>
              <div className="space-y-4 text-muted-foreground leading-relaxed mt-6">
                {about?.bio ? (
                  about.bio
                    .split(/\n+/)
                    .map((para, i) => <p key={i}>{para}</p>)
                ) : (
                  <>
                    <p>
                      My journey into web development started during my
                      computer science studies, where I discovered my passion
                      for creating digital experiences that make a
                      difference. What began as curiosity about how websites
                      work evolved into a deep love for crafting elegant
                      solutions to complex problems.
                    </p>
                    <p>
                      Over the past years, I&apos;ve had the privilege of
                      working with startups and established companies, helping
                      them bring their visions to life through code. I
                      specialize in the MERN stack but I&apos;m always eager to
                      learn new technologies that can help me build better
                      products.
                    </p>
                    <p>
                      When I&apos;m not coding, you&apos;ll find me exploring
                      new experiences, experimenting with new things, or
                      contributing to open-source projects. I believe that the
                      best developers are those who never stop learning and
                      growing, both professionally and personally.
                    </p>
                  </>
                )}
              </div>
            </ForgeReveal>

            <ForgeReveal delay={0.15}>
              <ForgeEyebrow>Quick Facts</ForgeEyebrow>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {quickFacts.map((fact) => (
                  <div key={fact.label} className="forge-card p-6 text-center">
                    <div className="font-display text-3xl font-bold text-foreground">
                      {fact.value}
                    </div>
                    <div className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-forge-mute mt-2">
                      {fact.label}
                    </div>
                  </div>
                ))}
              </div>
            </ForgeReveal>
          </div>
        </div>
      </section>

      <hr className="forge-divider" />

      {/* Skills Section */}
      <section>
        <div className="forge-section">
          <ForgeSectionHeader
            eyebrow="Skills"
            title="Technical Skills"
            lead="Here's a breakdown of my technical expertise across different areas of web development."
          />

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <ForgeReveal>
              <h3 className="forge-h3">Proficiency Levels</h3>
              <div className="mt-6">
                <ProficiencyList items={technicalSkills} />
              </div>
            </ForgeReveal>

            <ForgeReveal delay={0.15}>
              <h3 className="forge-h3">Technologies I Use</h3>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {defaultTechnologies.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <div
                      key={tech.name}
                      className="forge-card forge-card-hover p-4 flex items-center gap-3"
                    >
                      <span className="forge-icon-badge-sm">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-medium">{tech.name}</span>
                    </div>
                  );
                })}
              </div>
            </ForgeReveal>
          </div>
        </div>
      </section>

      {/* Development / Engineering Skills Section */}
      {engineeringSkills.length > 0 && (
        <>
          <hr className="forge-divider" />

          <section>
            <div className="forge-section">
              <ForgeSectionHeader
                eyebrow="Skills"
                title="Development / Engineering Skills"
                lead="The engineering practices and disciplines I rely on to design, build, and ship reliable software."
              />

              <div className="mt-12 grid gap-x-8 md:grid-cols-2">
                <ProficiencyList items={engineeringSkills} />
              </div>
            </div>
          </section>
        </>
      )}

      <hr className="forge-divider" />

      {/* Values Section */}
      <section>
        <div className="forge-section">
          <ForgeSectionHeader
            eyebrow="Values"
            title="What Drives Me"
            lead="These core values guide my approach to development and collaboration."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {asArray<string>(about?.values).map((value, i) => {
              const Icon = valueIcons[value] || Target;
              return (
                <ForgeReveal key={value} delay={i * 0.08}>
                  <div className="forge-card forge-card-hover p-6 text-center h-full">
                    <span className="forge-icon-badge-sm mx-auto">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="forge-h3 text-lg mt-4">{value}</h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      Guided by this core principle
                    </p>
                  </div>
                </ForgeReveal>
              );
            })}
          </div>
        </div>
      </section>

      <hr className="forge-divider" />

      {/* Interests Section */}
      <section>
        <div className="forge-section">
          <ForgeSectionHeader
            eyebrow="Interests"
            title="Beyond Code"
            lead="When I'm not developing, these are the things that inspire and energize me."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {asArray<string>(about?.interests).map((interest, i) => {
              const Icon = interestIcons[interest] || Coffee;
              return (
                <ForgeReveal key={interest} delay={i * 0.08}>
                  <div className="forge-card forge-card-hover p-6 text-center h-full">
                    <span className="forge-icon-badge-sm mx-auto">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="forge-h3 text-lg mt-4">{interest}</h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      One of my passions
                    </p>
                  </div>
                </ForgeReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section>
        <div className="forge-section">
          <ForgeReveal>
            <div className="forge-card p-12 text-center">
              <ForgeEyebrow centered>Contact</ForgeEyebrow>
              <h2 className="forge-h2 mt-4">Let&apos;s Work Together</h2>
              <p className="forge-lead forge-lead-center mt-4">
                I&apos;m always excited to take on new challenges and
                collaborate with amazing people. Let&apos;s create something
                incredible together!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <a href="/contact" className="forge-btn-primary">
                  Get In Touch
                </a>
                <a href="/projects" className="forge-btn-ghost">
                  View My Work
                </a>
              </div>
            </div>
          </ForgeReveal>
        </div>
      </section>
    </div>
  );
}
