import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database/connection"
import Education from "@/models/Education"
import { paginationSchema } from "@/lib/validations/schemas"
import {
  createErrorResponse,
  createPaginatedResponse,
  buildSortQuery,
  HTTP_STATUS,
} from "@/lib/utils/api"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const queryParams = Object.fromEntries(searchParams.entries())

    const { page, limit, sortBy, sortOrder } = await paginationSchema.validate(queryParams)

    const sortQuery = buildSortQuery(sortBy || "startDate", sortOrder)

    const [educations, totalEducations] = await Promise.all([
      Education.find()
        .sort(sortQuery)
        .skip((page - 1) * limit)
        .limit(limit),
      Education.countDocuments(),
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
