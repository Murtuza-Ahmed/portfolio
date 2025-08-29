export const dynamic = "force-dynamic";

import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database/connection"
import Project from "@/models/Project"
import { paginationSchema, filterSchema } from "@/lib/validations/schemas"
import {
  createErrorResponse,
  createPaginatedResponse,
  buildSortQuery,
  buildFilterQuery,
  HTTP_STATUS,
} from "@/lib/utils/api"

// GET /api/projects - Get public projects with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = request.nextUrl
    const queryParams = Object.fromEntries(searchParams.entries())

    // Validate pagination and filter parameters
    const { page, limit, sortBy, sortOrder } = await paginationSchema.validate(queryParams)
    const filters: any = await filterSchema.validate(queryParams)

    // Build query - only show active projects for public API
    const filterQuery = {
      ...buildFilterQuery(filters),
      status: "active", // Only show active projects publicly
    }
    const sortQuery = buildSortQuery(sortBy || "featured", sortOrder) // Default sort by featured

    // Execute queries
    const [projects, totalProjects] = await Promise.all([
      Project.find(filterQuery)
        .sort(sortQuery)
        .skip((page - 1) * limit)
        .limit(limit),
      Project.countDocuments(filterQuery),
    ])

    return NextResponse.json(
      createPaginatedResponse(projects, totalProjects, page, limit, "Projects retrieved successfully"),
      {
        status: HTTP_STATUS.OK,
      },
    )
  } catch (error: any) {
    console.error("Get public projects error:", error)
    return NextResponse.json(createErrorResponse("Failed to retrieve projects"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}
