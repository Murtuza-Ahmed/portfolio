import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database/connection"
import Resume from "@/models/Resume"
import { resumeSchema } from "@/lib/validations/schemas"
import { createSuccessResponse, createErrorResponse, HTTP_STATUS } from "@/lib/utils/api"

// Get default resume
function getDefaultResume() {
  return {
    fullName: "",
    title: "",
    summary: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    downloadUrl: "",
  }
}

// GET /api/admin/resume - Get resume
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    let resume = await Resume.findOne()

    // If no resume exists, return defaults
    if (!resume) {
      const defaults = getDefaultResume()
      return NextResponse.json(createSuccessResponse(defaults, "Resume retrieved (defaults)"), {
        status: HTTP_STATUS.OK,
      })
    }

    return NextResponse.json(createSuccessResponse(resume, "Resume retrieved successfully"), {
      status: HTTP_STATUS.OK,
    })
  } catch (error: any) {
    console.error("Get resume error:", error)
    return NextResponse.json(createErrorResponse("Failed to retrieve resume"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}

// PUT /api/admin/resume - Update resume (upsert)
export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()

    // Validate request body
    try {
      await resumeSchema.validate(body, { stripUnknown: true })
    } catch (validationError: any) {
      return NextResponse.json(createErrorResponse("Validation failed", validationError.message), {
        status: HTTP_STATUS.BAD_REQUEST,
      })
    }

    // Find and update or create resume
    let resume = await Resume.findOne()

    if (!resume) {
      // Create new resume with defaults
      const defaults = getDefaultResume()
      resume = new Resume({
        ...defaults,
        ...body,
      })
    } else {
      // Update existing resume
      Object.assign(resume, body)
    }

    await resume.save()

    return NextResponse.json(createSuccessResponse(resume, "Resume updated successfully"), {
      status: HTTP_STATUS.OK,
    })
  } catch (error: any) {
    console.error("Update resume error:", error)
    return NextResponse.json(createErrorResponse("Failed to update resume"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}

// DELETE /api/admin/resume - Reset resume to defaults
export async function DELETE(request: NextRequest) {
  try {
    await connectDB()

    await Resume.deleteMany({})

    const defaults = getDefaultResume()
    const newResume = new Resume(defaults)
    await newResume.save()

    return NextResponse.json(createSuccessResponse(newResume, "Resume reset to defaults"), {
      status: HTTP_STATUS.OK,
    })
  } catch (error: any) {
    console.error("Delete resume error:", error)
    return NextResponse.json(createErrorResponse("Failed to reset resume"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}
