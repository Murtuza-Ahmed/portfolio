"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
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

const defaultTechnologies = [
  { name: "React", icon: Code2, color: "text-blue-500" },
  { name: "Node.js", icon: Server, color: "text-green-500" },
  { name: "MongoDB", icon: Database, color: "text-green-600" },
  { name: "TypeScript", icon: Code2, color: "text-blue-600" },
  { name: "Next.js", icon: Globe, color: "text-gray-800 dark:text-gray-200" },
  { name: "JavaScript", icon: Code2, color: "text-blue-300" },
  { name: "Express", icon: Server, color: "text-gray-600" },
  { name: "Git", icon: GitBranch, color: "text-orange-500" },
  { name: "Docker", icon: Server, color: "text-blue-400" },
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
        if (skillsData.data) setSkills(skillsData.data);
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
    <div className="container max-w-6xl mx-auto px-4 py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 page-section page-section-delay-1">
        {about?.profileImage && (
          <div className="relative w-32 h-32 mx-auto">
            <Image
              src={about.profileImage}
              alt="Profile"
              width={128}
              height={128}
              className="rounded-full object-cover border-4 border-primary/20"
            />
          </div>
        )}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">About Me</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {about?.bio ||
              "I'm a passionate MERN Stack Developer with over 1.5 years of experience creating modern, scalable web applications."}
          </p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="grid lg:grid-cols-2 gap-12 items-start page-section page-section-delay-2">
        <div className="space-y-6 page-section page-section-delay-3">
          <h2 className="text-3xl font-bold">My Journey</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              My journey into web development started during my computer science
              studies, where I discovered my passion for creating digital
              experiences that make a difference. What began as curiosity about
              how websites work evolved into a deep love for crafting elegant
              solutions to complex problems.
            </p>
            <p>
              Over the past years, I've had the privilege of working with
              startups and established companies, helping them bring their
              visions to life through code. I specialize in the MERN stack but
              I'm always eager to learn new technologies that can help me build
              better products.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new experiences,
              experimenting with new things, or contributing to open-source
              projects. I believe that the best developers are those who never
              stop learning and growing, both professionally and personally.
            </p>
          </div>
        </div>

        <div className="space-y-6 page-section page-section-delay-4">
          <h3 className="text-2xl font-semibold">Quick Facts</h3>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">3+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">1+</div>
                <div className="text-sm text-muted-foreground">Years Exp.</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">1+</div>
                <div className="text-sm text-muted-foreground">
                  Happy Clients
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">5+</div>
                <div className="text-sm text-muted-foreground">
                  Technologies
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator />

      {/* Skills Section */}
      <section className="space-y-8 page-section page-section-delay-1">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Technical Skills</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here's a breakdown of my technical expertise across different areas
            of web development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Skills with Progress Bars */}
          <div className="space-y-6 page-section page-section-delay-2">
            <h3 className="text-xl font-semibold">Proficiency Levels</h3>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill._id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{skill.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {skill.category}
                    </Badge>
                  </div>
                  <Progress value={skill.proficiency} className="h-2" />
                  <div className="text-right text-sm text-muted-foreground">
                    {skill.proficiency}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Icons */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Technologies I Use</h3>
            <div className="grid grid-cols-2 gap-4">
              {defaultTechnologies.map((tech) => {
                const Icon = tech.icon;
                return (
                  <Card
                    key={tech.name}
                    className="group hover:shadow-md transition-all duration-300"
                  >
                    <CardContent className="p-4 flex items-center space-x-3">
                      <Icon className={`h-8 w-8 ${tech.color}`} />
                      <span className="font-medium">{tech.name}</span>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Values Section */}
      <section className="space-y-8 page-section page-section-delay-2">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">What Drives Me</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These core values guide my approach to development and
            collaboration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {about?.values.map((value) => {
            const Icon = valueIcons[value] || Target;
            return (
              <Card
                key={value}
                className="text-center group hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Guided by this core principle
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <Separator />

      {/* Interests Section */}
      <section className="space-y-8 page-section page-section-delay-3">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Beyond Code</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            When I'm not developing, these are the things that inspire and
            energize me.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {about?.interests.map((interest) => {
            const Icon = interestIcons[interest] || Coffee;
            return (
              <Card
                key={interest}
                className="group hover:shadow-md transition-all duration-300"
              >
                <CardContent className="p-6 text-center space-y-4">
                  <Icon className="h-8 w-8 mx-auto text-primary" />
                  <h3 className="font-semibold">{interest}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    One of my passions
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-6 py-12 bg-muted/30 rounded-lg page-section page-section-delay-4">
        <h2 className="text-3xl font-bold">Let's Work Together</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          I'm always excited to take on new challenges and collaborate with
          amazing people. Let's create something incredible together!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Get In Touch
          </a>
          <a
            href="/projects"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            View My Work
          </a>
        </div>
      </section>
    </div>
  );
}
