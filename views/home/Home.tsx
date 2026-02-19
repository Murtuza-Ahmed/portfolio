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
  Database,
  Server,
  Smartphone,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import CountUp from "react-countup";
import { TypeAnimation } from "react-type-animation";
const techStack = [
  { name: "React", icon: "⚛️" },
  { name: "Node.js", icon: "🟢" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Express", icon: "🚀" },
  { name: "TypeScript", icon: "🔷" },
  { name: "Next.js", icon: "▲" },
];

const services = [
  {
    icon: Code2,
    title: "Frontend Development",
    description:
      "Building responsive, interactive user interfaces with React, Next.js, and modern CSS frameworks.",
  },
  {
    icon: Server,
    title: "Backend Development",
    description:
      "Creating robust APIs and server-side applications with Node.js, Express, and RESTful services.",
  },
  {
    icon: Database,
    title: "Database Design",
    description:
      "Designing and implementing efficient database schemas with MongoDB.",
  },
  {
    icon: Smartphone,
    title: "Full-Stack Solutions",
    description:
      "End-to-end development from concept to deployment with modern DevOps practices.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-accent/5" />

        <div className="container relative z-10 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8 animate-fade-in-up">
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
                  Node.js, MongoDB, and Express. Passionate about creating
                  seamless user experiences and robust backend solutions.
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
                      <span className="mr-2">{tech.icon}</span>
                      {tech.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="group">
                  <Link href="/contact">
                    Get In Touch
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/resume">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </Link>
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4 pt-4">
                <p className="text-sm text-muted-foreground">
                  Connect with me:
                </p>
                <div className="flex space-x-3">
                  <Button variant="ghost" size="icon" asChild>
                    <Link
                      href="https://github.com/Murtuza-Ahmed"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link
                      href="https://www.linkedin.com/in/murtuza-ahmed-36012628b/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="mailto:murtuza.prohrammer@gmail.com">
                      <Mail className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative animate-slide-in-left h-full">
              <div className="relative w-full max-w-md mx-auto">
                {/* Profile Image Placeholder */}
                <div className="relative w-80 h-80 mx-auto">
                  <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20 rounded-full blur-3xl" />
                  <div className="relative w-full h-full bg-linear-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center border border-border/50">
                    <Image
                      src="/my-image.png"
                      alt="Murtuza - MERN Stack Developer"
                      width={300}
                      height={300}
                      className="rounded-full object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 animate-bounce">
                  <div className="bg-primary text-primary-foreground p-3 rounded-lg shadow-lg">
                    <Code2 className="h-6 w-6" />
                  </div>
                </div>
                <div
                  className="absolute -bottom-4 -left-4 animate-bounce"
                  style={{ animationDelay: "1s" }}
                >
                  <div className="bg-accent text-accent-foreground p-3 rounded-lg shadow-lg">
                    <Database className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">What I Do</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I specialize in full-stack development, creating end-to-end
              solutions that are both powerful and user-friendly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.title}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">
                <CountUp end={3} duration={4} />+
              </div>
              <div className="text-sm text-muted-foreground">
                Projects Completed
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">
                <CountUp end={1} duration={4} />+
              </div>
              <div className="text-sm text-muted-foreground">
                Years Experience
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">
                <CountUp end={1} duration={4} />+
              </div>
              <div className="text-sm text-muted-foreground">Happy Clients</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">
                1%
              </div>
              <div className="text-sm text-muted-foreground">
                Client Satisfaction
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let's work together to bring your ideas to life. I'm always excited
            to take on new challenges and create amazing digital experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="group">
              <Link href="/contact">
                Start a Project
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">View My Work</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
