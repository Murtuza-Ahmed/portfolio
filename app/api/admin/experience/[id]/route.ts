import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database/connection"
import Experience from "@/models/Experience"
import { experienceSchema } from "@/lib/validations/schemas"
import { createSuccessResponse, createErrorResponse, HTTP_STATUS } from "@/lib/utils/api"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const experience = await Experience.findById(params.id)
    if (!experience) {
      return NextResponse.json(createErrorResponse("Experience not found"), { status: HTTP_STATUS.NOT_FOUND })
    }

    return NextResponse.json(createSuccessResponse(experience, "Experience retrieved successfully"), {
      status: HTTP_STATUS.OK,
    })
  } catch (error: any) {
    console.error("Get experience error:", error)
    return NextResponse.json(createErrorResponse("Failed to retrieve experience"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const body = await request.json()

    try {
      await experienceSchema.validate(body)
    } catch (validationError: any) {
      return NextResponse.json(createErrorResponse("Validation failed", validationError.message), {
        status: HTTP_STATUS.BAD_REQUEST,
      })
    }

    const experience = await Experience.findByIdAndUpdate(params.id, body, { new: true, runValidators: true })
    if (!experience) {
      return NextResponse.json(createErrorResponse("Experience not found"), { status: HTTP_STATUS.NOT_FOUND })
    }

    return NextResponse.json(createSuccessResponse(experience, "Experience updated successfully"), {
      status: HTTP_STATUS.OK,
    })
  } catch (error: any) {
    console.error("Update experience error:", error)
    return NextResponse.json(createErrorResponse("Failed to update experience"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const experience = await Experience.findByIdAndDelete(params.id)
    if (!experience) {
      return NextResponse.json(createErrorResponse("Experience not found"), { status: HTTP_STATUS.NOT_FOUND })
    }

    return NextResponse.json(createSuccessResponse(null, "Experience deleted successfully"), {
      status: HTTP_STATUS.OK,
    })
  } catch (error: any) {
    console.error("Delete experience error:", error)
    return NextResponse.json(createErrorResponse("Failed to delete experience"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}
