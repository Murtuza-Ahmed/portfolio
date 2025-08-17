import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Download John Doe's resume and explore his professional experience as a MERN Stack Developer, including work history, education, and technical skills.",
}

const workExperience = [
  {
    company: "TechCorp Solutions",
    position: "Senior Full Stack Developer",
    location: "San Francisco, CA",
    duration: "Jan 2023 - Present",
    type: "Full-time",
    description: [
      "Led development of a microservices architecture serving 100k+ daily active users",
      "Implemented CI/CD pipelines reducing deployment time by 60%",
      "Mentored 3 junior developers and conducted code reviews",
      "Built responsive web applications using React, Node.js, and MongoDB",
    ],
    technologies: ["React", "Node.js", "MongoDB", "AWS", "Docker", "TypeScript"],
  },
  {
    company: "StartupXYZ",
    position: "Full Stack Developer",
    location: "Remote",
    duration: "Jun 2021 - Dec 2022",
    type: "Full-time",
    description: [
      "Developed and maintained 5+ web applications from concept to deployment",
      "Collaborated with design team to implement pixel-perfect UI components",
      "Optimized database queries resulting in 40% performance improvement",
      "Integrated third-party APIs including Stripe, SendGrid, and Google Maps",
    ],
    technologies: ["React", "Express.js", "PostgreSQL", "Redux", "Tailwind CSS"],
  },
  {
    company: "Digital Agency Pro",
    position: "Junior Web Developer",
    location: "New York, NY",
    duration: "Aug 2020 - May 2021",
    type: "Full-time",
    description: [
      "Built responsive websites for 20+ clients using modern web technologies",
      "Collaborated with designers to translate mockups into functional websites",
      "Implemented SEO best practices improving client site rankings by 25%",
      "Maintained and updated existing client websites and applications",
    ],
    technologies: ["JavaScript", "HTML/CSS", "WordPress", "PHP", "MySQL"],
  },
]

const education = [
  {
    institution: "University of California, Berkeley",
    degree: "Bachelor of Science in Computer Science",
    location: "Berkeley, CA",
    duration: "2016 - 2020",
    gpa: "3.8/4.0",
    achievements: [
      "Dean's List for 6 semesters",
      "President of Computer Science Club",
      "Completed senior capstone project on machine learning applications",
    ],
  },
  {
    institution: "FreeCodeCamp",
    degree: "Full Stack Web Development Certification",
    location: "Online",
    duration: "2019",
    achievements: [
      "Completed 300+ hours of coursework",
      "Built 5 full-stack projects",
      "Earned certifications in Frontend and Backend development",
    ],
  },
]

const certifications = [
  {
    name: "AWS Certified Developer - Associate",
    issuer: "Amazon Web Services",
    date: "2023",
    credentialId: "AWS-DEV-2023-001",
  },
  {
    name: "MongoDB Certified Developer",
    issuer: "MongoDB University",
    date: "2022",
    credentialId: "MDB-DEV-2022-456",
  },
  {
    name: "React Developer Certification",
    issuer: "Meta",
    date: "2021",
    credentialId: "META-REACT-2021-789",
  },
]

const skills = {
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS", "JavaScript"],
  Backend: ["Node.js", "Express.js", "RESTful APIs", "GraphQL", "Microservices"],
  Database: ["MongoDB", "PostgreSQL", "Redis", "MySQL"],
  "Tools & DevOps": ["Git", "Docker", "AWS", "Vercel", "CI/CD", "Jest"],
}

function TimelineItem({ children, isLast = false }: { children: React.ReactNode; isLast?: boolean }) {
  return (
    <div className="relative flex gap-6 pb-8">
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg" />
        {!isLast && <div className="w-0.5 h-full bg-border mt-2" />}
      </div>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  )
}

export default function ResumePage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">Resume</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Download my resume or explore my professional journey, skills, and achievements below.
        </p>
        <Button size="lg" className="group">
          <Download className="mr-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
          Download Resume PDF
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
              <span>john@example.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <span>johndoe-portfolio.vercel.app</span>
            </div>
            <div className="flex items-center space-x-3">
              <Linkedin className="h-5 w-5 text-muted-foreground" />
              <span>linkedin.com/in/johndoe</span>
            </div>
            <div className="flex items-center space-x-3">
              <Github className="h-5 w-5 text-muted-foreground" />
              <span>github.com/johndoe</span>
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
            Passionate Full Stack Developer with 3+ years of experience building scalable web applications using the
            MERN stack. Proven track record of delivering high-quality solutions that serve thousands of users daily.
            Strong expertise in React, Node.js, MongoDB, and modern web technologies. Experienced in leading development
            teams, implementing DevOps practices, and mentoring junior developers. Committed to writing clean,
            maintainable code and staying current with industry best practices.
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
              <TimelineItem key={index} isLast={index === workExperience.length - 1}>
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
                    {edu.gpa && (
                      <div className="text-muted-foreground">
                        <span className="font-medium">GPA: {edu.gpa}</span>
                      </div>
                    )}
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
                  <span className="text-muted-foreground">Issued: {cert.date}</span>
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
          I'm always open to discussing new opportunities and exciting projects. Feel free to reach out!
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
  )
}
