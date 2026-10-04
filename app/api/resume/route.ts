import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database/connection"
import Resume from "@/models/Resume"
import { createSuccessResponse, createErrorResponse, HTTP_STATUS } from "@/lib/utils/api"

export const dynamic = "force-dynamic"

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

// GET /api/resume - Get resume (public)
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const resume = await Resume.findOne()

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
