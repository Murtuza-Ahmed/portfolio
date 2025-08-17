import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database/connection"
import User from "@/models/User"
import { hashPassword } from "@/lib/auth/password"
import { userUpdateSchema, paginationSchema, filterSchema } from "@/lib/validations/schemas"
import {
  createSuccessResponse,
  createErrorResponse,
  createPaginatedResponse,
  buildSortQuery,
  buildFilterQuery,
  HTTP_STATUS,
} from "@/lib/utils/api"

// GET /api/admin/users - Get all users with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const queryParams = Object.fromEntries(searchParams.entries())

    // Validate pagination and filter parameters
    const { page, limit, sortBy, sortOrder } = await paginationSchema.validate(queryParams)
    const filters = await filterSchema.validate(queryParams)

    // Build query
    const filterQuery = buildFilterQuery(filters)
    const sortQuery = buildSortQuery(sortBy, sortOrder)

    // Execute queries
    const [users, totalUsers] = await Promise.all([
      User.find(filterQuery)
        .sort(sortQuery)
        .skip((page - 1) * limit)
        .limit(limit)
        .select("-password"),
      User.countDocuments(filterQuery),
    ])

    return NextResponse.json(createPaginatedResponse(users, totalUsers, page, limit, "Users retrieved successfully"), {
      status: HTTP_STATUS.OK,
    })
  } catch (error: any) {
    console.error("Get users error:", error)
    return NextResponse.json(createErrorResponse("Failed to retrieve users"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}

// POST /api/admin/users - Create new user
export async function POST(request: NextRequest) {
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

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(createErrorResponse("User with this email already exists"), {
        status: HTTP_STATUS.CONFLICT,
      })
    }

    // Hash password if provided
    const hashedPassword = password ? await hashPassword(password) : await hashPassword("TempPassword123!")

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    })

    await user.save()

    // Remove password from response
    const userResponse = user.toObject()
    delete userResponse.password

    return NextResponse.json(createSuccessResponse(userResponse, "User created successfully"), {
      status: HTTP_STATUS.CREATED,
    })
  } catch (error: any) {
    console.error("Create user error:", error)
    return NextResponse.json(createErrorResponse("Failed to create user"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}
