import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database/connection"
import Project from "@/models/Project"
import { createSuccessResponse, createErrorResponse, isValidObjectId, HTTP_STATUS } from "@/lib/utils/api"

// GET /api/projects/[id] - Get public project by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    if (!isValidObjectId(params.id)) {
      return NextResponse.json(createErrorResponse("Invalid project ID"), { status: HTTP_STATUS.BAD_REQUEST })
    }

    const project = await Project.findOne({ _id: params.id, status: "active" })
    if (!project) {
      return NextResponse.json(createErrorResponse("Project not found"), { status: HTTP_STATUS.NOT_FOUND })
    }

    return NextResponse.json(createSuccessResponse(project, "Project retrieved successfully"), {
      status: HTTP_STATUS.OK,
    })
  } catch (error: any) {
    console.error("Get public project error:", error)
    return NextResponse.json(createErrorResponse("Failed to retrieve project"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}
