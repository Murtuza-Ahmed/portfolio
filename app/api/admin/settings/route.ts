import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database/connection"
import Settings from "@/models/Settings"
import { settingsSchema } from "@/lib/validations/schemas"
import { createSuccessResponse, createErrorResponse, HTTP_STATUS } from "@/lib/utils/api"

// Get default settings
function getDefaultSettings() {
  return {
    siteName: "My Portfolio",
    siteDescription: "Welcome to my portfolio",
    socialLinks: {
      github: "",
      linkedin: "",
      twitter: "",
    },
    contactEmail: "",
    contactSuccessMessage: "Thank you for your message! I'll get back to you soon.",
    emailNotifications: true,
    theme: "auto",
    accentColor: "#3b82f6",
    featuredProjectsCount: 3,
  }
}

// GET /api/admin/settings - Get all settings
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    let settings = await Settings.findOne()

    // If no settings exist, return defaults
    if (!settings) {
      const defaults = getDefaultSettings()
      return NextResponse.json(createSuccessResponse(defaults, "Settings retrieved (defaults)"), {
        status: HTTP_STATUS.OK,
      })
    }

    return NextResponse.json(createSuccessResponse(settings, "Settings retrieved successfully"), {
      status: HTTP_STATUS.OK,
    })
  } catch (error: any) {
    console.error("Get settings error:", error)
    return NextResponse.json(createErrorResponse("Failed to retrieve settings"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}

// PUT /api/admin/settings - Update settings (upsert)
export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()

    // Validate request body (strip unknown fields to prevent mass assignment)
    let settingsData: Record<string, unknown>
    try {
      settingsData = (await settingsSchema.validate(body, { stripUnknown: true })) as Record<string, unknown>
    } catch (validationError: any) {
      return NextResponse.json(createErrorResponse("Validation failed", validationError.message), {
        status: HTTP_STATUS.BAD_REQUEST,
      })
    }

    // Find and update or create settings
    let settings = await Settings.findOne()

    if (!settings) {
      // Create new settings with defaults
      const defaults = getDefaultSettings()
      settings = new Settings({
        ...defaults,
        ...settingsData,
      })
    } else {
      // Update existing settings
      Object.assign(settings, settingsData)
    }

    await settings.save()

    return NextResponse.json(createSuccessResponse(settings, "Settings updated successfully"), {
      status: HTTP_STATUS.OK,
    })
  } catch (error: any) {
    console.error("Update settings error:", error)
    return NextResponse.json(createErrorResponse("Failed to update settings"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}

// DELETE /api/admin/settings - Reset settings to defaults
export async function DELETE(request: NextRequest) {
  try {
    await connectDB()

    await Settings.deleteMany({})

    const defaults = getDefaultSettings()
    const newSettings = new Settings(defaults)
    await newSettings.save()

    return NextResponse.json(createSuccessResponse(newSettings, "Settings reset to defaults"), {
      status: HTTP_STATUS.OK,
    })
  } catch (error: any) {
    console.error("Delete settings error:", error)
    return NextResponse.json(createErrorResponse("Failed to reset settings"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}
