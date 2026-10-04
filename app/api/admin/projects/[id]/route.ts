import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database/connection"
import Project from "@/models/Project"
import { projectSchema } from "@/lib/validations/schemas"
import { createSuccessResponse, createErrorResponse, isValidObjectId, HTTP_STATUS } from "@/lib/utils/api"

// GET /api/admin/projects/[id] - Get project by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    if (!isValidObjectId(params.id)) {
      return NextResponse.json(createErrorResponse("Invalid project ID"), { status: HTTP_STATUS.BAD_REQUEST })
    }

    const project = await Project.findById(params.id)
    if (!project) {
      return NextResponse.json(createErrorResponse("Project not found"), { status: HTTP_STATUS.NOT_FOUND })
    }

    return NextResponse.json(createSuccessResponse(project, "Project retrieved successfully"), {
      status: HTTP_STATUS.OK,
    })
  } catch (error: any) {
    console.error("Get project error:", error)
    return NextResponse.json(createErrorResponse("Failed to retrieve project"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}

// PUT /api/admin/projects/[id] - Update project
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    if (!isValidObjectId(params.id)) {
      return NextResponse.json(createErrorResponse("Invalid project ID"), { status: HTTP_STATUS.BAD_REQUEST })
    }

    const body = await request.json()

    // Validate request body (strip unknown fields to prevent mass assignment)
    let projectData: Record<string, unknown>
    try {
      projectData = (await projectSchema.validate(body, { stripUnknown: true })) as Record<string, unknown>
    } catch (validationError: any) {
      return NextResponse.json(createErrorResponse("Validation failed", validationError.message), {
        status: HTTP_STATUS.BAD_REQUEST,
      })
    }

    const project = await Project.findByIdAndUpdate(params.id, projectData, { new: true, runValidators: true })
    if (!project) {
      return NextResponse.json(createErrorResponse("Project not found"), { status: HTTP_STATUS.NOT_FOUND })
    }

    return NextResponse.json(createSuccessResponse(project, "Project updated successfully"), { status: HTTP_STATUS.OK })
  } catch (error: any) {
    console.error("Update project error:", error)
    return NextResponse.json(createErrorResponse("Failed to update project"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}

// DELETE /api/admin/projects/[id] - Delete project
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    if (!isValidObjectId(params.id)) {
      return NextResponse.json(createErrorResponse("Invalid project ID"), { status: HTTP_STATUS.BAD_REQUEST })
    }

    const project = await Project.findByIdAndDelete(params.id)
    if (!project) {
      return NextResponse.json(createErrorResponse("Project not found"), { status: HTTP_STATUS.NOT_FOUND })
    }

    return NextResponse.json(createSuccessResponse(null, "Project deleted successfully"), { status: HTTP_STATUS.OK })
  } catch (error: any) {
    console.error("Delete project error:", error)
    return NextResponse.json(createErrorResponse("Failed to delete project"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}
