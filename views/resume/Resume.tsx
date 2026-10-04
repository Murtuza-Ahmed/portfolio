"use client";

import { useEffect, useState } from "react";
import type React from "react";
import type {
  Experience,
  Education,
  Certification,
  Skill,
  Resume as ResumeData,
} from "@/lib/types";
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
  FileText,
  Loader2,
} from "lucide-react";
import { ForgeReveal, ForgeEyebrow } from "@/components/forge";

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
        <div className="h-3.5 w-3.5 rounded-full bg-forge-amber shadow-[0_0_16px_2px_rgba(255,178,56,0.6)] ring-4 ring-forge-amber/15" />
        {!isLast && <div className="w-px flex-1 bg-white/10 mt-2" />}
      </div>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

/** Render a year from a date-ish value without ever showing "NaN". */
function safeYear(value: unknown): string {
  if (!value) return "";
  const d = new Date(value as string);
  return Number.isNaN(d.getTime()) ? "" : String(d.getFullYear());
}

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

export default function Resume() {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expRes, eduRes, certRes, skillsRes, resumeRes] = await Promise.all([
          fetch("/api/experience?limit=100"),
          fetch("/api/education?limit=100"),
          fetch("/api/certifications?limit=100"),
          fetch("/api/skills?limit=100"),
          fetch("/api/resume"),
        ]);

        const expData = await expRes.json();
        const eduData = await eduRes.json();
        const certData = await certRes.json();
        const skillsData = await skillsRes.json();
        const resumeData = await resumeRes.json();

        if (Array.isArray(expData.data)) setExperience(expData.data);
        if (Array.isArray(eduData.data)) setEducation(eduData.data);
        if (Array.isArray(certData.data)) setCertifications(certData.data);
        if (Array.isArray(skillsData.data)) setSkills(skillsData.data);
        if (resumeData.data) setResume(resumeData.data);
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
        <Loader2 className="h-8 w-8 animate-spin text-forge-amber" />
      </div>
    );
  }

  const groupSkillsByCategory = (list: Skill[]) =>
    list.reduce(
      (acc, skill) => {
        const key = skill.category || "Other";
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(skill);
        return acc;
      },
      {} as Record<string, Skill[]>,
    );

  const technicalSkills = skills.filter(
    (s) => (s.skillType || "technical") === "technical",
  );
  const engineeringSkills = skills.filter((s) => s.skillType === "engineering");
  const technicalByCategory = groupSkillsByCategory(technicalSkills);
  const engineeringByCategory = groupSkillsByCategory(engineeringSkills);

  return (
    <div className="relative">
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="forge-hero-glow" />
        <div className="forge-section max-w-4xl text-center">
          <ForgeEyebrow centered>Resume</ForgeEyebrow>
          <h1 className="forge-h1 mt-4">{resume?.fullName || "Resume"}</h1>
          <p className="forge-lead forge-lead-center mx-auto mt-5 max-w-2xl">
            {resume?.title ? `${resume.title} — ` : ""}
            Download my resume or explore my professional journey, skills, and
            achievements below.
          </p>
          <div className="mt-8">
            <Link
              href={resume?.downloadUrl || "/resume/Murtuza-Ahmed.pdf"}
              className="forge-btn-primary group"
            >
              <Download className="mr-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
              Download Resume PDF
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto w-full max-w-4xl px-4 md:px-6 pb-20 md:pb-28 space-y-8">
        {/* Contact Info */}
        <ForgeReveal>
          <div className="forge-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="forge-icon-badge-sm">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="forge-h3">Contact Information</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-forge-amber" />
                <span className="text-muted-foreground">
                  {resume?.email || "murtuza.programmer@gmail.com"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-forge-amber" />
                <span className="text-muted-foreground">
                  {resume?.phone || "+92 (312) 291-3097"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-forge-amber" />
                <span className="text-muted-foreground">
                  {resume?.location || "SECTOR- 11 IMAM COLONY ORANGI TOWN Karachi"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-forge-amber" />
                <span className="text-muted-foreground">
                  {resume?.website || "portfolio-murtuza-ahmed.vercel.app/"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="h-5 w-5 text-forge-amber" />
                <span className="text-muted-foreground">
                  {resume?.linkedin || "linkedin.com/in/murtuza-ahmed-36012628b"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Github className="h-5 w-5 text-forge-amber" />
                <span className="text-muted-foreground">
                  {resume?.github || "github.com/Murtuza-Ahmed"}
                </span>
              </div>
            </div>
          </div>
        </ForgeReveal>

        {/* Professional Summary */}
        <ForgeReveal delay={80}>
          <div className="forge-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="forge-icon-badge-sm">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="forge-h3">Professional Summary</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {resume?.summary ||
                "Passionate Full Stack Developer with 1+ years of experience building scalable web applications using React, Node.js, NestJS, PostgreSQL, and MongoDB. Proven track record of delivering production-ready solutions and improving deployment workflows using Docker and CI/CD. Strong expertise in TypeScript, modern frontend frameworks, and backend architecture. Experienced in mentoring developers and implementing DevOps best practices. Committed to writing clean, maintainable code and staying current with industry standards."}
            </p>
          </div>
        </ForgeReveal>

        {/* Work Experience */}
        {experience.length > 0 && (
          <ForgeReveal delay={160}>
            <div className="forge-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="forge-icon-badge-sm">
                  <Building className="h-5 w-5" />
                </div>
                <h3 className="forge-h3">Work Experience</h3>
              </div>
              <div className="space-y-0">
                {experience.map((job, index) => (
                  <TimelineItem
                    key={job._id}
                    isLast={index === experience.length - 1}
                  >
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-display text-xl font-bold">
                          {job.jobTitle}
                        </h4>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 text-muted-foreground">
                          <div className="flex items-center">
                            <Building className="mr-1 h-4 w-4 text-forge-amber" />
                            <span className="font-medium text-foreground">
                              {job.company}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4 text-forge-amber" />
                            <span className="text-sm text-forge-mute">
                              {safeYear(job.startDate)}
                              {safeYear(job.startDate) && " - "}
                              {job.endDate ? safeYear(job.endDate) : "Present"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-muted-foreground">{job.description}</p>

                      {asArray<string>(job.technologies).length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {asArray<string>(job.technologies).map((tech) => (
                            <span key={tech} className="forge-chip text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </TimelineItem>
                ))}
              </div>
            </div>
          </ForgeReveal>
        )}

        {/* Education */}
        {education.length > 0 && (
          <ForgeReveal delay={240}>
            <div className="forge-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="forge-icon-badge-sm">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h3 className="forge-h3">Education</h3>
              </div>
              <div className="space-y-0">
                {education.map((edu, index) => (
                  <TimelineItem
                    key={edu._id}
                    isLast={index === education.length - 1}
                  >
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-display text-xl font-bold">
                          {edu.degree}
                        </h4>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 text-muted-foreground">
                          <div className="flex items-center">
                            <Building className="mr-1 h-4 w-4 text-forge-amber" />
                            <span className="font-medium text-foreground">
                              {edu.school}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4 text-forge-amber" />
                            <span className="text-sm text-forge-mute">
                              {safeYear(edu.startDate)}
                              {safeYear(edu.startDate) && " - "}
                              {edu.endDate ? safeYear(edu.endDate) : "Present"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {asArray<string>(edu.achievements).length > 0 && (
                        <ul className="space-y-2 text-muted-foreground">
                          {asArray<string>(edu.achievements).map(
                            (achievement, i) => (
                              <li key={i} className="flex items-start">
                                <span className="mt-2 mr-3 h-1.5 w-1.5 shrink-0 rounded-full bg-forge-amber shadow-[0_0_8px_rgba(255,178,56,0.8)]" />
                                <span>{achievement}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      )}
                    </div>
                  </TimelineItem>
                ))}
              </div>
            </div>
          </ForgeReveal>
        )}

        {/* Skills */}
        {Object.keys(technicalByCategory).length > 0 ||
        Object.keys(engineeringByCategory).length > 0 ? (
          <ForgeReveal delay={320}>
            <div className="space-y-8">
              {Object.keys(technicalByCategory).length > 0 && (
                <div className="forge-card p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <h3 className="forge-h3">Technical Skills</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(technicalByCategory).map(
                      ([category, categorySkills]) => (
                        <div key={category} className="space-y-3">
                          <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-forge-mute">
                            {category}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {categorySkills.map((skill) => (
                              <span
                                key={skill._id}
                                className="forge-chip text-xs"
                              >
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
              {Object.keys(engineeringByCategory).length > 0 && (
                <div className="forge-card p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <h3 className="forge-h3">
                      Development / Engineering Skills
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(engineeringByCategory).map(
                      ([category, categorySkills]) => (
                        <div key={category} className="space-y-3">
                          <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-forge-mute">
                            {category}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {categorySkills.map((skill) => (
                              <span
                                key={skill._id}
                                className="forge-chip text-xs"
                              >
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>
          </ForgeReveal>
        ) : null}

        {/* Certifications */}
        {certifications.length > 0 && (
          <ForgeReveal delay={400}>
            <div className="forge-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="forge-icon-badge-sm">
                  <Award className="h-5 w-5" />
                </div>
                <h3 className="forge-h3">Certifications</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {certifications.map((cert) => (
                  <div
                    key={cert._id}
                    className="rounded-2xl border border-forge-line bg-white/[0.02] p-5 space-y-2"
                  >
                    <h4 className="font-semibold text-foreground">{cert.name}</h4>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-forge-mute">
                        Issued: {safeYear(cert.date) || "—"}
                      </span>
                      {cert.url && (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-forge-amber hover:underline"
                        >
                          View Credential
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ForgeReveal>
        )}

        {/* Call to Action */}
        <ForgeReveal delay={480}>
          <section className="text-center space-y-6 py-12">
            <ForgeEyebrow centered>Contact</ForgeEyebrow>
            <h2 className="forge-h2">Let's Work Together</h2>
            <p className="forge-lead forge-lead-center mx-auto max-w-2xl">
              I'm always open to discussing new opportunities and exciting
              projects. Feel free to reach out!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="forge-btn-primary">
                Get In Touch
              </Link>
              <Link href="/projects" className="forge-btn-ghost">
                View My Projects
              </Link>
            </div>
          </section>
        </ForgeReveal>
      </div>
    </div>
  );
}
