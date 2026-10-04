import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database/connection"
import Skill from "@/models/Skill"
import { skillSchema } from "@/lib/validations/schemas"
import { createSuccessResponse, createErrorResponse, isValidObjectId, HTTP_STATUS } from "@/lib/utils/api"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    if (!isValidObjectId(params.id)) {
      return NextResponse.json(createErrorResponse("Invalid skill ID"), { status: HTTP_STATUS.BAD_REQUEST })
    }

    const skill = await Skill.findById(params.id)
    if (!skill) {
      return NextResponse.json(createErrorResponse("Skill not found"), { status: HTTP_STATUS.NOT_FOUND })
    }

    return NextResponse.json(createSuccessResponse(skill, "Skill retrieved successfully"), {
      status: HTTP_STATUS.OK,
    })
  } catch (error: any) {
    console.error("Get skill error:", error)
    return NextResponse.json(createErrorResponse("Failed to retrieve skill"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    if (!isValidObjectId(params.id)) {
      return NextResponse.json(createErrorResponse("Invalid skill ID"), { status: HTTP_STATUS.BAD_REQUEST })
    }

    const body = await request.json()

    // Validate request body (strip unknown fields to prevent mass assignment)
    let skillData: Record<string, unknown>
    try {
      skillData = (await skillSchema.validate(body, { stripUnknown: true })) as Record<string, unknown>
    } catch (validationError: any) {
      return NextResponse.json(createErrorResponse("Validation failed", validationError.message), {
        status: HTTP_STATUS.BAD_REQUEST,
      })
    }

    const skill = await Skill.findByIdAndUpdate(params.id, skillData, { new: true, runValidators: true })
    if (!skill) {
      return NextResponse.json(createErrorResponse("Skill not found"), { status: HTTP_STATUS.NOT_FOUND })
    }

    return NextResponse.json(createSuccessResponse(skill, "Skill updated successfully"), { status: HTTP_STATUS.OK })
  } catch (error: any) {
    console.error("Update skill error:", error)
    return NextResponse.json(createErrorResponse("Failed to update skill"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    if (!isValidObjectId(params.id)) {
      return NextResponse.json(createErrorResponse("Invalid skill ID"), { status: HTTP_STATUS.BAD_REQUEST })
    }

    const skill = await Skill.findByIdAndDelete(params.id)
    if (!skill) {
      return NextResponse.json(createErrorResponse("Skill not found"), { status: HTTP_STATUS.NOT_FOUND })
    }

    return NextResponse.json(createSuccessResponse(null, "Skill deleted successfully"), { status: HTTP_STATUS.OK })
  } catch (error: any) {
    console.error("Delete skill error:", error)
    return NextResponse.json(createErrorResponse("Failed to delete skill"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}
