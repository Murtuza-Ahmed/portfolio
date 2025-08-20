export interface User {
  _id: string
  name: string
  email: string
  password?: string
  role: "admin" | "user"
  avatar?: string
  createdAt: Date
  updatedAt: Date
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
