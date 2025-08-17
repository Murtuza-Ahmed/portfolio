import type { ApiResponse, FilterParams, PaginatedResponse } from "@/lib/types/api"

// API response helper functions
export function createSuccessResponse<T>(data: T, message = "Success"): ApiResponse<T> {
  return {
    success: true,
    message,
    data,
  }
}

export function createErrorResponse(message: string, error?: string): ApiResponse {
  return {
    success: false,
    message,
    error,
  }
}

export function createPaginatedResponse<T>(
  data: T[],
  totalItems: number,
  currentPage: number,
  itemsPerPage: number,
  message = "Success",
): PaginatedResponse<T> {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  return {
    success: true,
    data,
    pagination: {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    },
    message,
  }
}

// Query builder helpers
export function buildSortQuery(sortBy?: string, sortOrder: "asc" | "desc" = "desc"): Record<string, 1 | -1> {
  if (!sortBy) return { createdAt: -1 }
  return { [sortBy]: sortOrder === "asc" ? 1 : -1 }
}

export function buildFilterQuery(filters: FilterParams): Record<string, any> {
  const query: Record<string, any> = {}

  if (filters.search) {
    query.$or = [
      { name: { $regex: filters.search, $options: "i" } },
      { title: { $regex: filters.search, $options: "i" } },
      { description: { $regex: filters.search, $options: "i" } },
      { email: { $regex: filters.search, $options: "i" } },
    ]
  }

  if (filters.status) {
    query.status = filters.status
  }

  if (filters.role) {
    query.role = filters.role
  }

  if (filters.featured !== undefined) {
    query.featured = filters.featured
  }

  if (filters.technologies && filters.technologies.length > 0) {
    query.technologies = { $in: filters.technologies }
  }

  if (filters.dateFrom || filters.dateTo) {
    query.createdAt = {}
    if (filters.dateFrom) {
      query.createdAt.$gte = new Date(filters.dateFrom)
    }
    if (filters.dateTo) {
      query.createdAt.$lte = new Date(filters.dateTo)
    }
  }

  return query
}

// Error handling helpers
export function handleApiError(error: any): ApiResponse {
  console.error("API Error:", error)

  if (error.name === "ValidationError") {
    const errors = Object.values(error.errors).map((err: any) => ({
      field: err.path,
      message: err.message,
    }))
    return {
      success: false,
      message: "Validation failed",
      error: errors,
    }
  }

  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0]
    return {
      success: false,
      message: `${field} already exists`,
      error: "Duplicate entry",
    }
  }

  return {
    success: false,
    message: error.message || "Internal server error",
    error: "Server error",
  }
}

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const
