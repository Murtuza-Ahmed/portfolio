import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import connectDB from "@/lib/database/connection"
import User from "@/models/User"
import { comparePassword } from "@/lib/auth/password"
import { generateToken } from "@/lib/auth/jwt"
import { loginSchema } from "@/lib/validations/schemas"
import { createSuccessResponse, createErrorResponse, HTTP_STATUS } from "@/lib/utils/api"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()

    // Validate request body
    try {
      await loginSchema.validate(body)
    } catch (validationError: any) {
      return NextResponse.json(createErrorResponse("Validation failed", validationError.message), {
        status: HTTP_STATUS.BAD_REQUEST,
      })
    }

    const { email, password } = body

    // Find user with password field included
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
      return NextResponse.json(createErrorResponse("Invalid email or password"), { status: HTTP_STATUS.UNAUTHORIZED })
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(createErrorResponse("Invalid email or password"), { status: HTTP_STATUS.UNAUTHORIZED })
    }

    // Generate JWT token
    const token = generateToken(user)

    // Set HTTP-only cookie
    const cookieStore = cookies()
    cookieStore.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    })

    // Remove password from response
    const userResponse = user.toObject()
    delete userResponse.password

    return NextResponse.json(
      createSuccessResponse(
        {
          user: userResponse,
          token,
        },
        "Login successful",
      ),
      { status: HTTP_STATUS.OK },
    )
  } catch (error: any) {
    console.error("Login error:", error)
    return NextResponse.json(createErrorResponse("Internal server error"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}
