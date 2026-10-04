export const dynamic = "force-dynamic";

import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database/connection"
import ContactMessage from "@/models/ContactMessage"
import { paginationSchema, filterSchema } from "@/lib/validations/schemas"
import {
  createErrorResponse,
  createPaginatedResponse,
  buildSortQuery,
  buildFilterQuery,
  HTTP_STATUS,
} from "@/lib/utils/api"

const MESSAGE_SORT_FIELDS = ["createdAt", "updatedAt", "status", "name", "email"]

// GET /api/admin/messages - Get all contact messages with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = request.nextUrl
    const queryParams = Object.fromEntries(searchParams.entries())

    // Validate pagination and filter parameters
    let page: number, limit: number, sortBy: string | undefined, sortOrder: "asc" | "desc", filters: any
    try {
      const pagination = await paginationSchema.validate(queryParams)
      page = pagination.page
      limit = pagination.limit
      sortBy = pagination.sortBy
      sortOrder = pagination.sortOrder === "asc" ? "asc" : "desc"
      filters = await filterSchema.validate(queryParams)
    } catch (validationError: any) {
      return NextResponse.json(createErrorResponse("Validation failed", validationError.message), {
        status: HTTP_STATUS.BAD_REQUEST,
      })
    }

    // Build query
    const filterQuery = buildFilterQuery(filters)
    const sortQuery = buildSortQuery(sortBy, sortOrder, MESSAGE_SORT_FIELDS)

    // Execute queries
    const [messages, totalMessages] = await Promise.all([
      ContactMessage.find(filterQuery)
        .sort(sortQuery)
        .skip((page - 1) * limit)
        .limit(limit),
      ContactMessage.countDocuments(filterQuery),
    ])

    return NextResponse.json(
      createPaginatedResponse(messages, totalMessages, page, limit, "Messages retrieved successfully"),
      {
        status: HTTP_STATUS.OK,
      },
    )
  } catch (error: any) {
    console.error("Get messages error:", error)
    return NextResponse.json(createErrorResponse("Failed to retrieve messages"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}
