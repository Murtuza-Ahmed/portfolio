import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database/connection"
import Experience from "@/models/Experience"
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

    const [experiences, totalExperiences] = await Promise.all([
      Experience.find()
        .sort(sortQuery)
        .skip((page - 1) * limit)
        .limit(limit),
      Experience.countDocuments(),
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
