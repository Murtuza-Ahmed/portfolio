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
} from "lucide-react";

const workExperience = [
  {
    company: "Suffah Tech",
    position: "Senior MERN Stack Developer",
    location: "Pakistan Bazar Sec, 11 ½, Orangi Town, Karachi, 75800, Pakistan",
    duration: "Oct 2024 - Present",
    type: "Full-time",
    description: [
      "Led development of a microservices architecture serving 100k+ daily active users",
      "Implemented CI/CD pipelines reducing deployment time by 60%",
      "Mentored 3 junior developers and conducted code reviews",
      "Built responsive web applications using React, Node.js, and MongoDB",
    ],
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      // "AWS",
      // "Docker",
      "TypeScript",
      "Next.js",
      "Express.js",
      "Redux",
    ],
  },
  {
    company: "Tek Gravity",
    position: "Word Press",
    location: "Remote",
    duration: "Aug 2024 - Oct 2024",
    type: "Full-time",
    description: [
      "Supported staff members in their daily tasks, reducing workload burden and allowing for increased focus on higher-priority assignments",
      "Gained valuable experience working within a specific industry, applying learned concepts directly into relevant work situations.",
    ],
    technologies: ["Word Press"],
  },
];

const education = [
  {
    institution: "SMIT",
    degree: "1 Year Course: Web and Mobile App Development",
    location: "Gulshan Iqbal",
    duration: "2022 - 2023",
    // gpa: "3.8/4.0",
    achievements: [
      "Dean's List for 3 semesters",
      "President of Computer Science Club",
      "Completed senior capstone project on machine learning applications",
    ],
  },
  {
    institution: "Suffah Institute of Technology",
    degree: "Full Stack Web Development Certification",
    location: "sector 11, Orangi Town",
    duration: "2023",
    achievements: [
      // "Completed 300+ hours of coursework",
      "Built 5 full-stack projects",
      "Earned certifications in Frontend and Backend development",
    ],
  },
];

const certifications = [
  {
    name: "SMIT Certified Developer",
    issuer: "Web & Mobile App Development",
    date: "2023",
    credentialId: "WMA",
  },
  {
    name: "SIT Developer Certification",
    issuer: "Full Stack Development",
    date: "2024",
    credentialId: "FSD",
  },
];

const skills = {
  Frontend: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "HTML/CSS",
    "JavaScript",
  ],
  Backend: [
    "Node.js",
    "Express.js",
    "RESTful APIs",
    "Microservices",
  ],
  Database: [
    "MongoDB",
  ],
  "Tools & DevOps": ["Git", "Docker", "Vercel", "CI/CD", "Jest"],
};

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
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <section className="text-center space-y-6">
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
      <Card>
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
      <Card>
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
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Building className="mr-2 h-6 w-6" />
            Work Experience
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {workExperience.map((job, index) => (
              <TimelineItem
                key={index}
                isLast={index === workExperience.length - 1}
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <h3 className="text-xl font-semibold">{job.position}</h3>
                      <Badge variant="outline">{job.type}</Badge>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 text-muted-foreground">
                      <div className="flex items-center">
                        <Building className="mr-1 h-4 w-4" />
                        <span className="font-medium">{job.company}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        <span>{job.duration}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2 text-muted-foreground">
                    {job.description.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {job.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TimelineItem>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <GraduationCap className="mr-2 h-6 w-6" />
            Education
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {education.map((edu, index) => (
              <TimelineItem key={index} isLast={index === education.length - 1}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{edu.degree}</h3>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 text-muted-foreground">
                      <div className="flex items-center">
                        <Building className="mr-1 h-4 w-4" />
                        <span className="font-medium">{edu.institution}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>{edu.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        <span>{edu.duration}</span>
                      </div>
                    </div>
                    {/* {edu.gpa && (
                      <div className="text-muted-foreground">
                        <span className="font-medium">GPA: {edu.gpa}</span>
                      </div>
                    )} */}
                  </div>

                  <ul className="space-y-2 text-muted-foreground">
                    {edu.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TimelineItem>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Technical Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="space-y-3">
                <h3 className="font-semibold text-lg">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Award className="mr-2 h-6 w-6" />
            Certifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="space-y-2 p-4 border rounded-lg">
                <h3 className="font-semibold">{cert.name}</h3>
                <p className="text-muted-foreground">{cert.issuer}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">
                    Issued: {cert.date}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {cert.credentialId}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <section className="text-center space-y-6 py-12 bg-muted/30 rounded-lg">
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
