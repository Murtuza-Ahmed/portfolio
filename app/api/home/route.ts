import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database/connection"
import Home from "@/models/Home"
import { createSuccessResponse, createErrorResponse, HTTP_STATUS } from "@/lib/utils/api"

export const dynamic = "force-dynamic"

function getDefaultHome() {
  return {
    heroImage: "",
    heroTitle: "Welcome to My Portfolio",
    heroSubtitle: "Full Stack Developer & Creative Designer",
    heroDescription: "I create beautiful, functional web experiences",
    ctaButtonText: "View My Work",
    ctaButtonLink: "/projects",
    featuredProjectsCount: 3,
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    let home = await Home.findOne()

    if (!home) {
      const defaults = getDefaultHome()
      return NextResponse.json(createSuccessResponse(defaults, "Home content retrieved"), {
        status: HTTP_STATUS.OK,
      })
    }

    return NextResponse.json(createSuccessResponse(home, "Home content retrieved successfully"), {
      status: HTTP_STATUS.OK,
    })
  } catch (error: any) {
    console.error("Get home error:", error)
    return NextResponse.json(createErrorResponse("Failed to retrieve home content"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}
