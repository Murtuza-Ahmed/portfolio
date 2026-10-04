import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database/connection"
import Education from "@/models/Education"
import { educationSchema, paginationSchema, filterSchema } from "@/lib/validations/schemas"
import {
  createSuccessResponse,
  createErrorResponse,
  createPaginatedResponse,
  buildSortQuery,
  buildFilterQuery,
  HTTP_STATUS,
} from "@/lib/utils/api"

const EDUCATION_SORT_FIELDS = ["createdAt", "startDate", "school", "degree"]

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const queryParams = Object.fromEntries(searchParams.entries())

    const { page, limit, sortBy, sortOrder } = await paginationSchema.validate(queryParams)
    const filters = await filterSchema.validate(queryParams)

    const filterQuery = buildFilterQuery(filters)
    const sortQuery = buildSortQuery(sortBy || "startDate", sortOrder, EDUCATION_SORT_FIELDS)

    const [educations, totalEducations] = await Promise.all([
      Education.find(filterQuery)
        .sort(sortQuery)
        .skip((page - 1) * limit)
        .limit(limit),
      Education.countDocuments(filterQuery),
    ])

    return NextResponse.json(
      createPaginatedResponse(educations, totalEducations, page, limit, "Educations retrieved successfully"),
      {
        status: HTTP_STATUS.OK,
      },
    )
  } catch (error: any) {
    console.error("Get educations error:", error)
    return NextResponse.json(createErrorResponse("Failed to retrieve educations"), {
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
    let educationData: Record<string, unknown>
    try {
      educationData = (await educationSchema.validate(body, { stripUnknown: true })) as Record<string, unknown>
    } catch (validationError: any) {
      return NextResponse.json(createErrorResponse("Validation failed", validationError.message), {
        status: HTTP_STATUS.BAD_REQUEST,
      })
    }

    const education = new Education(educationData)
    await education.save()

    return NextResponse.json(createSuccessResponse(education, "Education created successfully"), {
      status: HTTP_STATUS.CREATED,
    })
  } catch (error: any) {
    console.error("Create education error:", error)
    return NextResponse.json(createErrorResponse("Failed to create education"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}
