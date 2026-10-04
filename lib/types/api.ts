// Extended API types for better type safety

export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
  message?: string
}

export interface FilterParams {
  search?: string
  status?: string
  role?: string
  featured?: boolean
  technologies?: string[]
  dateFrom?: string | Date
  dateTo?: string | Date
}

// API endpoint response types
export interface UsersResponse extends PaginatedResponse<User> { }
export interface ProjectsResponse extends PaginatedResponse<Project> { }
export interface ContactMessagesResponse extends PaginatedResponse<ContactMessage> { }
export interface SkillsResponse extends PaginatedResponse<Skill> { }
export interface ExperienceResponse extends PaginatedResponse<Experience> { }
export interface EducationResponse extends PaginatedResponse<Education> { }
export interface CertificationsResponse extends PaginatedResponse<Certification> { }

export interface SettingsResponse {
  success: boolean
  data: Settings
  message?: string
}

export interface HomeResponse {
  success: boolean
  data: Home
  message?: string
}

export interface AboutResponse {
  success: boolean
  data: About
  message?: string
}

// Dashboard statistics
export interface DashboardStats {
  totalUsers: number
  totalProjects: number
  totalMessages: number
  featuredProjects: number
  unreadMessages: number
  recentUsers: number
  projectsByStatus: {
    active: number
    completed: number
    archived: number
  }
  messagesByStatus: {
    unread: number
    read: number
    replied: number
  }
}

// Validation error types
export interface ValidationError {
  field: string
  message: string
}

export interface ApiError {
  success: false
  message: string
  errors?: ValidationError[]
  statusCode?: number
}

// Import the base types
import type { User, Project, ContactMessage, Settings, Home, About, Skill, Experience, Education, Certification } from "./index"
