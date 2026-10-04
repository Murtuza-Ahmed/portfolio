import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database/connection"
import Skill from "@/models/Skill"
import { paginationSchema } from "@/lib/validations/schemas"
import {
  createErrorResponse,
  createPaginatedResponse,
  buildSortQuery,
  HTTP_STATUS,
} from "@/lib/utils/api"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const queryParams = Object.fromEntries(searchParams.entries())

    const { page, limit, sortBy, sortOrder } = await paginationSchema.validate(queryParams)

    const sortQuery = buildSortQuery(sortBy || "name", sortOrder)

    const [skills, totalSkills] = await Promise.all([
      Skill.find()
        .sort(sortQuery)
        .skip((page - 1) * limit)
        .limit(limit),
      Skill.countDocuments(),
    ])

    return NextResponse.json(
      createPaginatedResponse(skills, totalSkills, page, limit, "Skills retrieved successfully"),
      {
        status: HTTP_STATUS.OK,
      },
    )
  } catch (error: any) {
    console.error("Get skills error:", error)
    return NextResponse.json(createErrorResponse("Failed to retrieve skills"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}
