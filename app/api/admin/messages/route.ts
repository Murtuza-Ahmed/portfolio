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

// GET /api/admin/messages - Get all contact messages with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const queryParams = Object.fromEntries(searchParams.entries())

    // Validate pagination and filter parameters
    const { page, limit, sortBy, sortOrder } = await paginationSchema.validate(queryParams)
    const filters = await filterSchema.validate(queryParams)

    // Build query
    const filterQuery = buildFilterQuery(filters)
    const sortQuery = buildSortQuery(sortBy, sortOrder)

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
