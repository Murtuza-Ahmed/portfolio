import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database/connection"
import Certification from "@/models/Certification"
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

    const sortQuery = buildSortQuery(sortBy || "date", sortOrder)

    const [certifications, totalCertifications] = await Promise.all([
      Certification.find()
        .sort(sortQuery)
        .skip((page - 1) * limit)
        .limit(limit),
      Certification.countDocuments(),
    ])

    return NextResponse.json(
      createPaginatedResponse(certifications, totalCertifications, page, limit, "Certifications retrieved successfully"),
      {
        status: HTTP_STATUS.OK,
      },
    )
  } catch (error: any) {
    console.error("Get certifications error:", error)
    return NextResponse.json(createErrorResponse("Failed to retrieve certifications"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}
