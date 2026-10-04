import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database/connection"
import Settings from "@/models/Settings"
import { createSuccessResponse, createErrorResponse, HTTP_STATUS } from "@/lib/utils/api"

export const dynamic = "force-dynamic"

// GET /api/public/settings - Get public settings (no auth required)
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    let settings = await Settings.findOne()

    // If no settings exist, return defaults
    if (!settings) {
      const defaults = {
        siteName: "My Portfolio",
        siteDescription: "Welcome to my portfolio",
        socialLinks: {
          github: "",
          linkedin: "",
          twitter: "",
        },
        contactEmail: "",
        contactSuccessMessage: "Thank you for your message! I'll get back to you soon.",
        theme: "auto",
        accentColor: "#3b82f6",
        featuredProjectsCount: 3,
      }
      return NextResponse.json(createSuccessResponse(defaults, "Settings retrieved (defaults)"), {
        status: HTTP_STATUS.OK,
      })
    }

    return NextResponse.json(createSuccessResponse(settings, "Settings retrieved successfully"), {
      status: HTTP_STATUS.OK,
    })
  } catch (error: any) {
    console.error("Get public settings error:", error)
    return NextResponse.json(createErrorResponse("Failed to retrieve settings"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}
