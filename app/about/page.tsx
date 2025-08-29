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
} from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about John Doe, a passionate MERN Stack Developer with expertise in modern web technologies and a commitment to creating exceptional digital experiences.",
};

const skills = [
  { name: "JavaScript/TypeScript", level: 75, category: "Frontend" },
  { name: "React/Next.js", level: 92, category: "Frontend" },
  { name: "HTML/CSS", level: 90, category: "Frontend" },
  { name: "Tailwind CSS", level: 80, category: "Frontend" },
  { name: "Node.js", level: 40, category: "Backend" },
  { name: "Express.js", level: 55, category: "Backend" },
  { name: "MongoDB", level: 52, category: "Database" },
  // { name: "PostgreSQL", level: 78, category: "Database" },
  { name: "Git/GitHub", level: 88, category: "Tools" },
  // { name: "Docker", level: 75, category: "Tools" },
  // { name: "AWS/Vercel", level: 80, category: "Tools" },
  { name: "REST APIs", level: 90, category: "Backend" },
];

const technologies = [
  { name: "React", icon: Code2, color: "text-blue-500" },
  { name: "Node.js", icon: Server, color: "text-green-500" },
  { name: "MongoDB", icon: Database, color: "text-green-600" },
  { name: "TypeScript", icon: Code2, color: "text-blue-600" },
  { name: "Next.js", icon: Globe, color: "text-gray-800 dark:text-gray-200" },
  { name: "Express", icon: Server, color: "text-gray-600" },
  { name: "Git", icon: GitBranch, color: "text-orange-500" },
  { name: "Docker", icon: Server, color: "text-blue-400" },
];

const interests = [
  {
    name: "Coffee Brewing",
    icon: Coffee,
    description: "Exploring different brewing methods and coffee origins",
  },
  {
    name: "Photography",
    icon: Camera,
    description: "Capturing moments and landscapes in my free time",
  },
  {
    name: "Music Production",
    icon: Music,
    description: "Creating electronic music and learning new instruments",
  },
  {
    name: "Reading",
    icon: BookOpen,
    description: "Tech blogs, sci-fi novels, and personal development books",
  },
];

const values = [
  {
    icon: Target,
    title: "Quality First",
    description:
      "I believe in writing clean, maintainable code that stands the test of time.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "Great products are built by great teams. I thrive in collaborative environments.",
  },
  {
    icon: Award,
    title: "Continuous Learning",
    description:
      "Technology evolves rapidly, and I'm committed to staying current with the latest trends.",
  },
  {
    icon: Heart,
    title: "User-Centric",
    description:
      "Every line of code I write is with the end user's experience in mind.",
  },
];

export default function AboutPage() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="relative w-32 h-32 mx-auto">
          <Image
            src="/my-image.png"
            alt="Murtuza Ahmed"
            width={128}
            height={128}
            className="rounded-full object-cover border-4 border-primary/20"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">About Me</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I'm a passionate MERN Stack Developer with over 1.5 years of
            experience creating modern, scalable web applications. I love
            turning complex problems into simple, beautiful, and intuitive
            solutions.
          </p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
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
              Over the past three years, I've had the privilege of working with
              startups and established companies, helping them bring their
              visions to life through code. I specialize in the MERN stack but
              I'm always eager to learn new technologies that can help me build
              better products.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new coffee shops,
              experimenting with photography, or contributing to open-source
              projects. I believe that the best developers are those who never
              stop learning and growing, both professionally and personally.
            </p>
          </div>
        </div>

        <div className="space-y-6">
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
                <div className="text-2xl font-bold text-primary">1.5+</div>
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
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Technical Skills</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here's a breakdown of my technical expertise across different areas
            of web development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Skills with Progress Bars */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Proficiency Levels</h3>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{skill.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {skill.category}
                    </Badge>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                  <div className="text-right text-sm text-muted-foreground">
                    {skill.level}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Icons */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Technologies I Use</h3>
            <div className="grid grid-cols-2 gap-4">
              {technologies.map((tech) => {
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
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">What Drives Me</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These core values guide my approach to development and
            collaboration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <Card
                key={value.title}
                className="text-center group hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <Separator />

      {/* Interests Section */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Beyond Code</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            When I'm not developing, these are the things that inspire and
            energize me.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {interests.map((interest) => {
            const Icon = interest.icon;
            return (
              <Card
                key={interest.name}
                className="group hover:shadow-md transition-all duration-300"
              >
                <CardContent className="p-6 text-center space-y-4">
                  <Icon className="h-8 w-8 mx-auto text-primary" />
                  <h3 className="font-semibold">{interest.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {interest.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-6 py-12 bg-muted/30 rounded-lg">
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
