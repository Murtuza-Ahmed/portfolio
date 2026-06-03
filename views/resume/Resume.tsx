"use client";

import { useEffect, useState } from "react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Download,
  MapPin,
  Calendar,
  Building,
  GraduationCap,
  Award,
  Mail,
  Phone,
  Globe,
  Linkedin,
  Github,
  Loader2,
} from "lucide-react";
import type { Experience, Education, Certification, Skill } from "@/lib/types";

function TimelineItem({
  children,
  isLast = false,
}: {
  children: React.ReactNode;
  isLast?: boolean;
}) {
  return (
    <div className="relative flex gap-6 pb-8">
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg" />
        {!isLast && <div className="w-0.5 h-full bg-border mt-2" />}
      </div>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

export default function Resume() {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expRes, eduRes, certRes, skillsRes] = await Promise.all([
          fetch("/api/experience?limit=100"),
          fetch("/api/education?limit=100"),
          fetch("/api/certifications?limit=100"),
          fetch("/api/skills?limit=100"),
        ]);

        const expData = await expRes.json();
        const eduData = await eduRes.json();
        const certData = await certRes.json();
        const skillsData = await skillsRes.json();

        if (expData.data) setExperience(expData.data);
        if (eduData.data) setEducation(eduData.data);
        if (certData.data) setCertifications(certData.data);
        if (skillsData.data) setSkills(skillsData.data);
      } catch (error) {
        console.error("Failed to fetch resume data:", error);
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

  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>,
  );

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <section className="text-center space-y-6 page-section page-section-delay-1">
        <h1 className="text-4xl md:text-5xl font-bold">Resume</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Download my resume or explore my professional journey, skills, and
          achievements below.
        </p>
        <Button size="lg" className="group">
          <Download className="mr-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
          <Link href="/resume/Murtuza-Ahmed.pdf"> Download Resume PDF</Link>
        </Button>
      </section>

      {/* Contact Info */}
      <Card className="page-section page-section-delay-2 glass-card">
        <CardHeader>
          <CardTitle className="text-2xl">Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <span>murtuza.programmer@gmail.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <span>+92 (312) 291-3097</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <span>SECTOR- 11 IMAM COLONY ORANGI TOWN Karachi</span>
            </div>
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <span>portfolio-murtuza-ahmed.vercel.app/</span>
            </div>
            <div className="flex items-center space-x-3">
              <Linkedin className="h-5 w-5 text-muted-foreground" />
              <span>linkedin.com/in/murtuza-ahmed-36012628b</span>
            </div>
            <div className="flex items-center space-x-3">
              <Github className="h-5 w-5 text-muted-foreground" />
              <span>github.com/Murtuza-Ahmed</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Summary */}
      <Card className="page-section page-section-delay-3 glass-card">
        <CardHeader>
          <CardTitle className="text-2xl">Professional Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            Passionate Full Stack Developer with 1+ years of experience building
            scalable web applications using the MERN stack. Proven track record
            of delivering high-quality solutions that serve thousands of users
            daily. Strong expertise in React, Node.js, MongoDB, and modern web
            technologies. Experienced in leading development teams, implementing
            DevOps practices, and mentoring junior developers. Committed to
            writing clean, maintainable code and staying current with industry
            best practices.
          </p>
        </CardContent>
      </Card>

      {/* Work Experience */}
      {experience.length > 0 && (
        <Card className="page-section page-section-delay-4 glass-card">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Building className="mr-2 h-6 w-6" />
              Work Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {experience.map((job, index) => (
                <TimelineItem
                  key={job._id}
                  isLast={index === experience.length - 1}
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">{job.jobTitle}</h3>
                      <div className="flex flex-col md:flex-row md:items-center gap-2 text-muted-foreground">
                        <div className="flex items-center">
                          <Building className="mr-1 h-4 w-4" />
                          <span className="font-medium">{job.company}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          <span>
                            {new Date(job.startDate).getFullYear()} -{" "}
                            {job.endDate
                              ? new Date(job.endDate).getFullYear()
                              : "Present"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground">{job.description}</p>

                    {job.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </TimelineItem>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Card className="page-section page-section-delay-5 glass-card">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <GraduationCap className="mr-2 h-6 w-6" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {education.map((edu, index) => (
                <TimelineItem
                  key={edu._id}
                  isLast={index === education.length - 1}
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">{edu.degree}</h3>
                      <div className="flex flex-col md:flex-row md:items-center gap-2 text-muted-foreground">
                        <div className="flex items-center">
                          <Building className="mr-1 h-4 w-4" />
                          <span className="font-medium">{edu.school}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          <span>
                            {new Date(edu.startDate).getFullYear()} -{" "}
                            {edu.endDate
                              ? new Date(edu.endDate).getFullYear()
                              : "Present"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {edu.achievements.length > 0 && (
                      <ul className="space-y-2 text-muted-foreground">
                        {edu.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </TimelineItem>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Skills */}
      {Object.keys(skillsByCategory).length > 0 && (
        <Card className="page-section page-section-delay-6 glass-card">
          <CardHeader>
            <CardTitle className="text-2xl">Technical Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(skillsByCategory).map(
                ([category, categorySkills]) => (
                  <div key={category} className="space-y-3">
                    <h3 className="font-semibold text-lg">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map((skill) => (
                        <Badge key={skill._id} variant="outline">
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <Card className="page-section page-section-delay-7 glass-card">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Award className="mr-2 h-6 w-6" />
              Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {certifications.map((cert) => (
                <div key={cert._id} className="space-y-2 p-4 border rounded-lg">
                  <h3 className="font-semibold">{cert.name}</h3>
                  <p className="text-muted-foreground">{cert.issuer}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">
                      Issued: {new Date(cert.date).getFullYear()}
                    </span>
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-xs"
                      >
                        View Credential
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Call to Action */}
      <section className="text-center space-y-6 py-12 bg-muted/30 rounded-lg page-section page-section-delay-8">
        <h2 className="text-3xl font-bold">Let's Work Together</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          I'm always open to discussing new opportunities and exciting projects.
          Feel free to reach out!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <a href="/contact">Get In Touch</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="/projects">View My Projects</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
