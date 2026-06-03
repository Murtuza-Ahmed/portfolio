import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database/connection"
import About from "@/models/About"
import { createSuccessResponse, createErrorResponse, HTTP_STATUS } from "@/lib/utils/api"

export const dynamic = "force-dynamic"

function getDefaultAbout() {
  return {
    profileImage: "",
    bio: "I am a passionate developer with expertise in modern web technologies",
    interests: [],
    values: [],
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    let about = await About.findOne()

    if (!about) {
      const defaults = getDefaultAbout()
      return NextResponse.json(createSuccessResponse(defaults, "About content retrieved"), {
        status: HTTP_STATUS.OK,
      })
    }

    return NextResponse.json(createSuccessResponse(about, "About content retrieved successfully"), {
      status: HTTP_STATUS.OK,
    })
  } catch (error: any) {
    console.error("Get about error:", error)
    return NextResponse.json(createErrorResponse("Failed to retrieve about content"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}
