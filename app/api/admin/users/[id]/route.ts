import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database/connection"
import User from "@/models/User"
import { hashPassword } from "@/lib/auth/password"
import { userUpdateSchema } from "@/lib/validations/schemas"
import { createSuccessResponse, createErrorResponse, HTTP_STATUS } from "@/lib/utils/api"

// GET /api/admin/users/[id] - Get user by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const user = await User.findById(params.id).select("-password")
    if (!user) {
      return NextResponse.json(createErrorResponse("User not found"), { status: HTTP_STATUS.NOT_FOUND })
    }

    return NextResponse.json(createSuccessResponse(user, "User retrieved successfully"), { status: HTTP_STATUS.OK })
  } catch (error: any) {
    console.error("Get user error:", error)
    return NextResponse.json(createErrorResponse("Failed to retrieve user"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}

// PUT /api/admin/users/[id] - Update user
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const body = await request.json()

    // Validate request body
    try {
      await userUpdateSchema.validate(body)
    } catch (validationError: any) {
      return NextResponse.json(createErrorResponse("Validation failed", validationError.message), {
        status: HTTP_STATUS.BAD_REQUEST,
      })
    }

    const { name, email, role, password } = body

    // Check if user exists
    const user = await User.findById(params.id)
    if (!user) {
      return NextResponse.json(createErrorResponse("User not found"), { status: HTTP_STATUS.NOT_FOUND })
    }

    // Check if email is already taken by another user
    if (email !== user.email) {
      const existingUser = await User.findOne({ email, _id: { $ne: params.id } })
      if (existingUser) {
        return NextResponse.json(createErrorResponse("Email is already taken"), { status: HTTP_STATUS.CONFLICT })
      }
    }

    // Update user fields
    user.name = name
    user.email = email
    user.role = role

    // Update password if provided
    if (password) {
      user.password = await hashPassword(password)
    }

    await user.save()

    // Remove password from response
    const userResponse = user.toObject()
    delete userResponse.password

    return NextResponse.json(createSuccessResponse(userResponse, "User updated successfully"), {
      status: HTTP_STATUS.OK,
    })
  } catch (error: any) {
    console.error("Update user error:", error)
    return NextResponse.json(createErrorResponse("Failed to update user"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}

// DELETE /api/admin/users/[id] - Delete user
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const user = await User.findById(params.id)
    if (!user) {
      return NextResponse.json(createErrorResponse("User not found"), { status: HTTP_STATUS.NOT_FOUND })
    }

    await User.findByIdAndDelete(params.id)

    return NextResponse.json(createSuccessResponse(null, "User deleted successfully"), { status: HTTP_STATUS.OK })
  } catch (error: any) {
    console.error("Delete user error:", error)
    return NextResponse.json(createErrorResponse("Failed to delete user"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}
