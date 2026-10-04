import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database/connection"
import Home from "@/models/Home"
import { homeSchema } from "@/lib/validations/schemas"
import { createSuccessResponse, createErrorResponse, HTTP_STATUS } from "@/lib/utils/api"

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
      return NextResponse.json(createSuccessResponse(defaults, "Home content retrieved (defaults)"), {
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

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()

    // Validate request body (strip unknown fields to prevent mass assignment)
    let homeData: Record<string, unknown>
    try {
      homeData = (await homeSchema.validate(body, { stripUnknown: true })) as Record<string, unknown>
    } catch (validationError: any) {
      return NextResponse.json(createErrorResponse("Validation failed", validationError.message), {
        status: HTTP_STATUS.BAD_REQUEST,
      })
    }

    let home = await Home.findOne()

    if (!home) {
      const defaults = getDefaultHome()
      home = new Home({
        ...defaults,
        ...homeData,
      })
    } else {
      Object.assign(home, homeData)
    }

    await home.save()

    return NextResponse.json(createSuccessResponse(home, "Home content updated successfully"), {
      status: HTTP_STATUS.OK,
    })
  } catch (error: any) {
    console.error("Update home error:", error)
    return NextResponse.json(createErrorResponse("Failed to update home content"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB()

    await Home.deleteMany({})

    const defaults = getDefaultHome()
    const newHome = new Home(defaults)
    await newHome.save()

    return NextResponse.json(createSuccessResponse(newHome, "Home content reset to defaults"), {
      status: HTTP_STATUS.OK,
    })
  } catch (error: any) {
    console.error("Delete home error:", error)
    return NextResponse.json(createErrorResponse("Failed to reset home content"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}
