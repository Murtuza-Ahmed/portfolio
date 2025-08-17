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
  dateFrom?: string
  dateTo?: string
}

// API endpoint response types
export interface UsersResponse extends PaginatedResponse<User> {}
export interface ProjectsResponse extends PaginatedResponse<Project> {}
export interface ContactMessagesResponse extends PaginatedResponse<ContactMessage> {}

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
import type { User, Project, ContactMessage } from "./index"
