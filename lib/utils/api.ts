import { Types } from "mongoose"
import type { FilterParams, PaginatedResponse } from "@/lib/types/api"
import type { ApiResponse } from "../types"

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

// Escape user input before embedding it in a $regex query to prevent
// ReDoS via crafted regular-expression syntax.
function escapeRegExp(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

// Query builder helpers
export function buildSortQuery(
  sortBy?: string,
  sortOrder: "asc" | "desc" = "desc",
  allowedFields: string[] = [],
  defaultField = "createdAt",
): Record<string, 1 | -1> {
  // Only allow sorting on an explicit allowlist — sortBy comes from the URL
  const field = sortBy && allowedFields.includes(sortBy) ? sortBy : defaultField
  return { [field]: sortOrder === "asc" ? 1 : -1 }
}

export function buildFilterQuery(filters: FilterParams): Record<string, any> {
  const query: Record<string, any> = {}

  if (filters.search) {
    const safeSearch = escapeRegExp(filters.search)
    query.$or = [
      { name: { $regex: safeSearch, $options: "i" } },
      { title: { $regex: safeSearch, $options: "i" } },
      { description: { $regex: safeSearch, $options: "i" } },
      { email: { $regex: safeSearch, $options: "i" } },
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

// Validate a route param before using it as a MongoDB ObjectId. Without this,
// an invalid id throws a CastError and produces a 500 instead of a 400.
export function isValidObjectId(id: string): boolean {
  return Types.ObjectId.isValid(id)
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
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const
