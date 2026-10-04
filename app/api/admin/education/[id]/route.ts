import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database/connection"
import Education from "@/models/Education"
import { educationSchema } from "@/lib/validations/schemas"
import { createSuccessResponse, createErrorResponse, HTTP_STATUS } from "@/lib/utils/api"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const education = await Education.findById(params.id)
    if (!education) {
      return NextResponse.json(createErrorResponse("Education not found"), { status: HTTP_STATUS.NOT_FOUND })
    }

    return NextResponse.json(createSuccessResponse(education, "Education retrieved successfully"), {
      status: HTTP_STATUS.OK,
    })
  } catch (error: any) {
    console.error("Get education error:", error)
    return NextResponse.json(createErrorResponse("Failed to retrieve education"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const body = await request.json()

    try {
      await educationSchema.validate(body)
    } catch (validationError: any) {
      return NextResponse.json(createErrorResponse("Validation failed", validationError.message), {
        status: HTTP_STATUS.BAD_REQUEST,
      })
    }

    const education = await Education.findByIdAndUpdate(params.id, body, { new: true, runValidators: true })
    if (!education) {
      return NextResponse.json(createErrorResponse("Education not found"), { status: HTTP_STATUS.NOT_FOUND })
    }

    return NextResponse.json(createSuccessResponse(education, "Education updated successfully"), {
      status: HTTP_STATUS.OK,
    })
  } catch (error: any) {
    console.error("Update education error:", error)
    return NextResponse.json(createErrorResponse("Failed to update education"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const education = await Education.findByIdAndDelete(params.id)
    if (!education) {
      return NextResponse.json(createErrorResponse("Education not found"), { status: HTTP_STATUS.NOT_FOUND })
    }

    return NextResponse.json(createSuccessResponse(null, "Education deleted successfully"), {
      status: HTTP_STATUS.OK,
    })
  } catch (error: any) {
    console.error("Delete education error:", error)
    return NextResponse.json(createErrorResponse("Failed to delete education"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}
