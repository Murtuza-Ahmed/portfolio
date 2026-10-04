import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database/connection"
import Certification from "@/models/Certification"
import { certificationSchema, paginationSchema, filterSchema } from "@/lib/validations/schemas"
import {
  createSuccessResponse,
  createErrorResponse,
  createPaginatedResponse,
  buildSortQuery,
  buildFilterQuery,
  HTTP_STATUS,
} from "@/lib/utils/api"

const CERTIFICATION_SORT_FIELDS = ["createdAt", "date", "name", "issuer"]

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const queryParams = Object.fromEntries(searchParams.entries())

    const { page, limit, sortBy, sortOrder } = await paginationSchema.validate(queryParams)
    const filters = await filterSchema.validate(queryParams)

    const filterQuery = buildFilterQuery(filters)
    const sortQuery = buildSortQuery(sortBy || "date", sortOrder, CERTIFICATION_SORT_FIELDS)

    const [certifications, totalCertifications] = await Promise.all([
      Certification.find(filterQuery)
        .sort(sortQuery)
        .skip((page - 1) * limit)
        .limit(limit),
      Certification.countDocuments(filterQuery),
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

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()

    // Validate request body (strip unknown fields to prevent mass assignment,
    // e.g. an attacker-supplied _id)
    let certificationData: Record<string, unknown>
    try {
      certificationData = (await certificationSchema.validate(body, { stripUnknown: true })) as Record<string, unknown>
    } catch (validationError: any) {
      return NextResponse.json(createErrorResponse("Validation failed", validationError.message), {
        status: HTTP_STATUS.BAD_REQUEST,
      })
    }

    const certification = new Certification(certificationData)
    await certification.save()

    return NextResponse.json(createSuccessResponse(certification, "Certification created successfully"), {
      status: HTTP_STATUS.CREATED,
    })
  } catch (error: any) {
    console.error("Create certification error:", error)
    return NextResponse.json(createErrorResponse("Failed to create certification"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}
