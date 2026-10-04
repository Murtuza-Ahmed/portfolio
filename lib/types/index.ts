export interface User {
  _id: string
  name: string
  email: string
  password?: string
  role: "admin" | "user"
  avatar?: string
  createdAt: Date
  updatedAt: Date
  refreshToken: string
  accountVerified: boolean
}

export interface Project {
  _id: string
  title: string
  description: string
  longDescription?: string
  image: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  status: "active" | "completed" | "archived"
  createdAt: Date
  updatedAt: Date
}

export interface ContactMessage {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  status: "unread" | "read" | "replied"
  createdAt: Date
  updatedAt: Date
}

export interface AuthResponse {
  success: boolean
  message: string
  user?: Omit<User, "password">
  token?: string
}

export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  error?: string
  validationErrors?: { field: string; message: string }[]
}

// Form interfaces
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface ProjectForm {
  title: string
  description: string
  longDescription?: string
  image: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  status: "active" | "completed" | "archived"
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export interface UserForm {
  name: string
  email: string
  role: "admin" | "user"
  password?: string
}

export interface Settings {
  _id: string
  siteName: string
  siteDescription: string
  socialLinks: {
    github: string
    linkedin: string
    twitter: string
  }
  contactEmail: string
  contactSuccessMessage: string
  emailNotifications: boolean
  theme: "light" | "dark" | "auto"
  accentColor: string
  featuredProjectsCount: number
  createdAt: Date
  updatedAt: Date
}

export interface Home {
  _id: string
  heroImage: string
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  ctaButtonText: string
  ctaButtonLink: string
  featuredProjectsCount: number
  createdAt: Date
  updatedAt: Date
}

export interface About {
  _id: string
  profileImage: string
  bio: string
  interests: string[]
  values: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Skill {
  _id: string
  name: string
  proficiency: number
  category: "Frontend" | "Backend" | "Database" | "Tools" | "DevOps" | "Other"
  skillType: "technical" | "engineering"
  createdAt: Date
  updatedAt: Date
}

export interface Experience {
  _id: string
  jobTitle: string
  company: string
  startDate: Date
  endDate?: Date | null
  description: string
  technologies: string[]
  companyLogo?: string
  createdAt: Date
  updatedAt: Date
}

export interface Education {
  _id: string
  school: string
  degree: string
  field: string
  startDate: Date
  endDate?: Date
  achievements: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Certification {
  _id: string
  name: string
  issuer: string
  date: Date
  url?: string
  createdAt: Date
  updatedAt: Date
}

// Form interfaces
export interface HomeForm {
  heroImage: string
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  ctaButtonText: string
  ctaButtonLink: string
  featuredProjectsCount: number
}

export interface AboutForm {
  profileImage: string
  bio: string
  interests: string[]
  values: string[]
}

export interface SkillForm {
  name: string
  proficiency: number
  category: "Frontend" | "Backend" | "Database" | "Tools" | "DevOps" | "Other"
  skillType: "technical" | "engineering"
}

export interface ExperienceForm {
  jobTitle: string
  company: string
  startDate: Date
  endDate?: Date | null
  description: string
  technologies: string[]
  companyLogo?: string
}

export interface EducationForm {
  school: string
  degree: string
  field: string
  startDate: Date
  endDate?: Date
  achievements: string[]
}

export interface CertificationForm {
  name: string
  issuer: string
  date: Date
  url?: string
}

export interface Resume {
  _id: string
  fullName: string
  title: string
  summary: string
  email: string
  phone?: string
  location?: string
  website?: string
  linkedin?: string
  github?: string
  downloadUrl?: string
  createdAt: Date
  updatedAt: Date
}

export interface ResumeForm {
  fullName: string
  title: string
  summary: string
  email: string
  phone?: string
  location?: string
  website?: string
  linkedin?: string
  github?: string
  downloadUrl?: string
}
