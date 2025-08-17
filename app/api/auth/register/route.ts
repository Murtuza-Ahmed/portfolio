import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database/connection"
import User from "@/models/User"
import { hashPassword } from "@/lib/auth/password"
import { registerSchema } from "@/lib/validations/schemas"
import { createSuccessResponse, createErrorResponse, HTTP_STATUS } from "@/lib/utils/api"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()

    // Validate request body
    try {
      await registerSchema.validate(body)
    } catch (validationError: any) {
      return NextResponse.json(createErrorResponse("Validation failed", validationError.message), {
        status: HTTP_STATUS.BAD_REQUEST,
      })
    }

    const { name, email, password } = body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(createErrorResponse("User with this email already exists"), {
        status: HTTP_STATUS.CONFLICT,
      })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "admin", // Default role
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
    console.error("Registration error:", error)
    return NextResponse.json(createErrorResponse("Internal server error"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}
