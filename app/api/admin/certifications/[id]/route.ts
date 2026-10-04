import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database/connection"
import Certification from "@/models/Certification"
import { certificationSchema } from "@/lib/validations/schemas"
import { createSuccessResponse, createErrorResponse, isValidObjectId, HTTP_STATUS } from "@/lib/utils/api"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    if (!isValidObjectId(params.id)) {
      return NextResponse.json(createErrorResponse("Invalid certification ID"), { status: HTTP_STATUS.BAD_REQUEST })
    }

    const certification = await Certification.findById(params.id)
    if (!certification) {
      return NextResponse.json(createErrorResponse("Certification not found"), { status: HTTP_STATUS.NOT_FOUND })
    }

    return NextResponse.json(createSuccessResponse(certification, "Certification retrieved successfully"), {
      status: HTTP_STATUS.OK,
    })
  } catch (error: any) {
    console.error("Get certification error:", error)
    return NextResponse.json(createErrorResponse("Failed to retrieve certification"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    if (!isValidObjectId(params.id)) {
      return NextResponse.json(createErrorResponse("Invalid certification ID"), { status: HTTP_STATUS.BAD_REQUEST })
    }

    const body = await request.json()

    // Validate request body (strip unknown fields to prevent mass assignment)
    let certificationData: Record<string, unknown>
    try {
      certificationData = (await certificationSchema.validate(body, { stripUnknown: true })) as Record<string, unknown>
    } catch (validationError: any) {
      return NextResponse.json(createErrorResponse("Validation failed", validationError.message), {
        status: HTTP_STATUS.BAD_REQUEST,
      })
    }

    const certification = await Certification.findByIdAndUpdate(params.id, certificationData, {
      new: true,
      runValidators: true,
    })
    if (!certification) {
      return NextResponse.json(createErrorResponse("Certification not found"), { status: HTTP_STATUS.NOT_FOUND })
    }

    return NextResponse.json(createSuccessResponse(certification, "Certification updated successfully"), {
      status: HTTP_STATUS.OK,
    })
  } catch (error: any) {
    console.error("Update certification error:", error)
    return NextResponse.json(createErrorResponse("Failed to update certification"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    if (!isValidObjectId(params.id)) {
      return NextResponse.json(createErrorResponse("Invalid certification ID"), { status: HTTP_STATUS.BAD_REQUEST })
    }

    const certification = await Certification.findByIdAndDelete(params.id)
    if (!certification) {
      return NextResponse.json(createErrorResponse("Certification not found"), { status: HTTP_STATUS.NOT_FOUND })
    }

    return NextResponse.json(createSuccessResponse(null, "Certification deleted successfully"), { status: HTTP_STATUS.OK })
  } catch (error: any) {
    console.error("Delete certification error:", error)
    return NextResponse.json(createErrorResponse("Failed to delete certification"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}
