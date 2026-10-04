import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database/connection"
import Experience from "@/models/Experience"
import { experienceSchema, paginationSchema, filterSchema } from "@/lib/validations/schemas"
import {
  createSuccessResponse,
  createErrorResponse,
  createPaginatedResponse,
  buildSortQuery,
  buildFilterQuery,
  HTTP_STATUS,
} from "@/lib/utils/api"

const EXPERIENCE_SORT_FIELDS = ["createdAt", "startDate", "company", "jobTitle"]

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const queryParams = Object.fromEntries(searchParams.entries())

    const { page, limit, sortBy, sortOrder } = await paginationSchema.validate(queryParams)
    const filters = await filterSchema.validate(queryParams)

    const filterQuery = buildFilterQuery(filters)
    const sortQuery = buildSortQuery(sortBy || "startDate", sortOrder, EXPERIENCE_SORT_FIELDS)

    const [experiences, totalExperiences] = await Promise.all([
      Experience.find(filterQuery)
        .sort(sortQuery)
        .skip((page - 1) * limit)
        .limit(limit),
      Experience.countDocuments(filterQuery),
    ])

    return NextResponse.json(
      createPaginatedResponse(experiences, totalExperiences, page, limit, "Experiences retrieved successfully"),
      {
        status: HTTP_STATUS.OK,
      },
    )
  } catch (error: any) {
    console.error("Get experiences error:", error)
    return NextResponse.json(createErrorResponse("Failed to retrieve experiences"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()

    // Validate request body (strip unknown fields to prevent mass assignment,
    // e.g. an attacker-supplied _id)
    let experienceData: Record<string, unknown>
    try {
      experienceData = (await experienceSchema.validate(body, { stripUnknown: true })) as Record<string, unknown>
    } catch (validationError: any) {
      return NextResponse.json(createErrorResponse("Validation failed", validationError.message), {
        status: HTTP_STATUS.BAD_REQUEST,
      })
    }

    const experience = new Experience(experienceData)
    await experience.save()

    return NextResponse.json(createSuccessResponse(experience, "Experience created successfully"), {
      status: HTTP_STATUS.CREATED,
    })
  } catch (error: any) {
    console.error("Create experience error:", error)
    return NextResponse.json(createErrorResponse("Failed to create experience"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}
