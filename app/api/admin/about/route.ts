import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database/connection"
import About from "@/models/About"
import { aboutSchema } from "@/lib/validations/schemas"
import { createSuccessResponse, createErrorResponse, HTTP_STATUS } from "@/lib/utils/api"

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
      return NextResponse.json(createSuccessResponse(defaults, "About content retrieved (defaults)"), {
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

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()

    // Validate request body (strip unknown fields to prevent mass assignment)
    let aboutData: Record<string, unknown>
    try {
      aboutData = (await aboutSchema.validate(body, { stripUnknown: true })) as Record<string, unknown>
    } catch (validationError: any) {
      return NextResponse.json(createErrorResponse("Validation failed", validationError.message), {
        status: HTTP_STATUS.BAD_REQUEST,
      })
    }

    let about = await About.findOne()

    if (!about) {
      const defaults = getDefaultAbout()
      about = new About({
        ...defaults,
        ...aboutData,
      })
    } else {
      Object.assign(about, aboutData)
    }

    await about.save()

    return NextResponse.json(createSuccessResponse(about, "About content updated successfully"), {
      status: HTTP_STATUS.OK,
    })
  } catch (error: any) {
    console.error("Update about error:", error)
    return NextResponse.json(createErrorResponse("Failed to update about content"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB()

    await About.deleteMany({})

    const defaults = getDefaultAbout()
    const newAbout = new About(defaults)
    await newAbout.save()

    return NextResponse.json(createSuccessResponse(newAbout, "About content reset to defaults"), {
      status: HTTP_STATUS.OK,
    })
  } catch (error: any) {
    console.error("Delete about error:", error)
    return NextResponse.json(createErrorResponse("Failed to reset about content"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}
