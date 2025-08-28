import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import connectDB from "@/lib/database/connection"
import User from "@/models/User"
import { verifyToken } from "@/lib/auth/jwt"
import { createSuccessResponse, createErrorResponse, HTTP_STATUS } from "@/lib/utils/api"

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    // Get token from cookie or Authorization header
    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")?.value || request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json(createErrorResponse("Authentication required"), { status: HTTP_STATUS.UNAUTHORIZED })
    }

    // Verify token
    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json(createErrorResponse("Invalid token"), { status: HTTP_STATUS.UNAUTHORIZED })
    }

    // Find user
    const user = await User.findById(payload.userId)
    if (!user) {
      return NextResponse.json(createErrorResponse("User not found"), { status: HTTP_STATUS.NOT_FOUND })
    }

    return NextResponse.json(createSuccessResponse(user, "User retrieved successfully"), { status: HTTP_STATUS.OK })
  } catch (error: any) {
    console.error("Get user error:", error)
    return NextResponse.json(createErrorResponse("Internal server error"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}
