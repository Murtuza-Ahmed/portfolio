import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Github, Calendar, Users, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore John Doe's portfolio of MERN stack projects, featuring modern web applications built with React, Node.js, MongoDB, and Express.",
}

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with user authentication, product management, shopping cart, payment integration, and admin dashboard.",
    image: "/ecommerce-platform-screenshot.png",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe", "JWT"],
    category: "Full Stack",
    liveUrl: "https://ecommerce-demo.vercel.app",
    githubUrl: "https://github.com/johndoe/ecommerce-platform",
    featured: true,
    stats: {
      stars: 45,
      users: "1.2k",
      date: "2024",
    },
  },
  {
    id: 2,
    title: "Social Media Dashboard",
    description:
      "A comprehensive social media management dashboard with real-time analytics, post scheduling, and multi-platform integration.",
    image: "/social-dashboard-screenshot.png",
    technologies: ["Next.js", "TypeScript", "MongoDB", "Socket.io", "Chart.js"],
    category: "Full Stack",
    liveUrl: "https://social-dashboard-demo.vercel.app",
    githubUrl: "https://github.com/johndoe/social-dashboard",
    featured: true,
    stats: {
      stars: 32,
      users: "800",
      date: "2024",
    },
  },
  {
    id: 3,
    title: "Task Management App",
    description:
      "A collaborative task management application with drag-and-drop functionality, team collaboration, and real-time updates.",
    image: "/task-management-screenshot.png",
    technologies: ["React", "Node.js", "PostgreSQL", "Socket.io", "Redux"],
    category: "Full Stack",
    liveUrl: "https://taskmanager-demo.vercel.app",
    githubUrl: "https://github.com/johndoe/task-manager",
    featured: false,
    stats: {
      stars: 28,
      users: "650",
      date: "2023",
    },
  },
  {
    id: 4,
    title: "Weather Forecast App",
    description:
      "A beautiful weather application with location-based forecasts, interactive maps, and detailed weather analytics.",
    image: "/weather-app-screenshot.png",
    technologies: ["React", "TypeScript", "OpenWeather API", "Mapbox"],
    category: "Frontend",
    liveUrl: "https://weather-app-demo.vercel.app",
    githubUrl: "https://github.com/johndoe/weather-app",
    featured: false,
    stats: {
      stars: 19,
      users: "400",
      date: "2023",
    },
  },
  {
    id: 5,
    title: "Blog CMS",
    description:
      "A content management system for bloggers with markdown support, SEO optimization, and analytics dashboard.",
    image: "/blog-cms-screenshot.png",
    technologies: ["Next.js", "MongoDB", "MDX", "Tailwind CSS"],
    category: "Full Stack",
    liveUrl: "https://blog-cms-demo.vercel.app",
    githubUrl: "https://github.com/johndoe/blog-cms",
    featured: false,
    stats: {
      stars: 23,
      users: "300",
      date: "2023",
    },
  },
  {
    id: 6,
    title: "Expense Tracker",
    description:
      "A personal finance application with expense tracking, budget management, and financial insights with charts.",
    image: "/expense-tracker-screenshot.png",
    technologies: ["React", "Node.js", "MongoDB", "Chart.js", "Express"],
    category: "Full Stack",
    liveUrl: "https://expense-tracker-demo.vercel.app",
    githubUrl: "https://github.com/johndoe/expense-tracker",
    featured: false,
    stats: {
      stars: 15,
      users: "250",
      date: "2023",
    },
  },
]

const categories = ["All", "Full Stack", "Frontend", "Backend"]

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={400}
            height={250}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {project.featured && (
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">Featured</Badge>
          )}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
            <Button size="sm" variant="secondary" asChild>
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" />
                Live Demo
              </Link>
            </Button>
            <Button size="sm" variant="secondary" asChild>
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-1" />
                Code
              </Link>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{project.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4" />
              <span>{project.stats.stars}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{project.stats.users}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{project.stats.date}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex space-x-2">
        <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
          <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-1" />
            Live Demo
          </Link>
        </Button>
        <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            <Github className="h-4 w-4 mr-1" />
            View Code
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function ProjectsPage() {
  const featuredProjects = projects.filter((project) => project.featured)
  const allProjects = projects

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">My Projects</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Here's a collection of projects I've worked on, showcasing my expertise in MERN stack development and modern
          web technologies.
        </p>
      </section>

      {/* Featured Projects */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These are some of my most impactful and technically challenging projects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* All Projects with Tabs */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">All Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse through all my projects by category or view them all at once.
          </p>
        </div>

        <Tabs defaultValue="All" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="text-sm">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(category === "All"
                  ? allProjects
                  : allProjects.filter((project) => project.category === category)
                ).map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30 rounded-lg">
        <div className="text-center space-y-8">
          <h2 className="text-3xl font-bold">Project Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Total Projects</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">15+</div>
              <div className="text-sm text-muted-foreground">Technologies Used</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">3.5k+</div>
              <div className="text-sm text-muted-foreground">GitHub Stars</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">10k+</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-6 py-12">
        <h2 className="text-3xl font-bold">Interested in Working Together?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          I'm always excited to take on new challenges and create amazing digital experiences. Let's discuss your next
          project!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/contact">Start a Project</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/resume">View My Resume</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
