import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createSuccessResponse, HTTP_STATUS } from "@/lib/utils/api"

export async function POST(request: NextRequest) {
  try {
    // Clear the auth cookie
    const cookieStore = cookies()
    cookieStore.set("auth-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0, // Expire immediately
      path: "/",
    })

    return NextResponse.json(createSuccessResponse(null, "Logout successful"), { status: HTTP_STATUS.OK })
  } catch (error: any) {
    console.error("Logout error:", error)
    return NextResponse.json(
      createSuccessResponse(null, "Logout completed"), // Always succeed for logout
      { status: HTTP_STATUS.OK },
    )
  }
}
