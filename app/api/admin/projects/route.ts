import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database/connection"
import Project from "@/models/Project"
import { projectSchema, paginationSchema, filterSchema } from "@/lib/validations/schemas"
import {
  createSuccessResponse,
  createErrorResponse,
  createPaginatedResponse,
  buildSortQuery,
  buildFilterQuery,
  HTTP_STATUS,
} from "@/lib/utils/api"

// GET /api/admin/projects - Get all projects with pagination and filtering
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
    console.error("Get projects error:", error)
    return NextResponse.json(createErrorResponse("Failed to retrieve projects"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}

// POST /api/admin/projects - Create new project
export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()

    // Validate request body
    try {
      await projectSchema.validate(body)
    } catch (validationError: any) {
      return NextResponse.json(createErrorResponse("Validation failed", validationError.message), {
        status: HTTP_STATUS.BAD_REQUEST,
      })
    }

    // Create new project
    const project = new Project(body)
    await project.save()

    return NextResponse.json(createSuccessResponse(project, "Project created successfully"), {
      status: HTTP_STATUS.CREATED,
    })
  } catch (error: any) {
    console.error("Create project error:", error)
    return NextResponse.json(createErrorResponse("Failed to create project"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}
