import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database/connection"
import User from "@/models/User"
import { hashPassword } from "@/lib/auth/password"
import { registerSchema } from "@/lib/validations/schemas"
import { createSuccessResponse, createErrorResponse, HTTP_STATUS } from "@/lib/utils/api"
import { rateLimit, getClientIp, rateLimitExceededResponse } from "@/lib/utils/rate-limit"

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)
  const limit = rateLimit(`auth:register:${ip}`, 5, 60 * 60 * 1000)
  if (!limit.allowed) {
    return rateLimitExceededResponse(limit.retryAfterMs)
  }

  try {
    await connectDB()

    const body = await request.json()

    // Validate request body
    let input: { name: string; email: string; password: string }
    try {
      input = await registerSchema.validate(body, { stripUnknown: true })
    } catch (validationError: any) {
      return NextResponse.json(createErrorResponse("Validation failed", validationError.message), {
        status: HTTP_STATUS.BAD_REQUEST,
      })
    }

    const { name, email, password } = input

    // Check if user already exists
    const existingUser = await User.exists({ email })
    if (existingUser) {
      return NextResponse.json(createErrorResponse("User with this email already exists"), {
        status: HTTP_STATUS.CONFLICT,
      })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create new user — role is always "user" here; admins are created
    // via the seed script or the admin panel, never via public registration.
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
      accountVerified: false,
    })

    await user.save()

    // Remove password from response
    const userResponse = user.toObject()
    delete userResponse.password

    return NextResponse.json(
      createSuccessResponse(
        {
          user: userResponse,
        },
        "Registration successful",
      ),
      { status: HTTP_STATUS.CREATED },
    )
  } catch (error: any) {
    return NextResponse.json(createErrorResponse("Internal server error"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}
