import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database/connection"
import Skill from "@/models/Skill"
import { skillSchema, paginationSchema, filterSchema } from "@/lib/validations/schemas"
import {
  createSuccessResponse,
  createErrorResponse,
  createPaginatedResponse,
  buildSortQuery,
  buildFilterQuery,
  HTTP_STATUS,
} from "@/lib/utils/api"

const SKILL_SORT_FIELDS = ["createdAt", "updatedAt", "name", "proficiency", "category", "skillType"]

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const queryParams = Object.fromEntries(searchParams.entries())

    const { page, limit, sortBy, sortOrder } = await paginationSchema.validate(queryParams)
    const filters = await filterSchema.validate(queryParams)

    const filterQuery = buildFilterQuery(filters)

    // Optional filter: ?skillType=technical|engineering
    const skillTypeParam = searchParams.get("skillType")
    if (skillTypeParam === "technical" || skillTypeParam === "engineering") {
      ;(filterQuery as Record<string, unknown>).skillType = skillTypeParam
    }

    const sortQuery = buildSortQuery(sortBy, sortOrder, SKILL_SORT_FIELDS)

    const [skills, totalSkills] = await Promise.all([
      Skill.find(filterQuery)
        .sort(sortQuery)
        .skip((page - 1) * limit)
        .limit(limit),
      Skill.countDocuments(filterQuery),
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

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()

    // Validate request body (strip unknown fields to prevent mass assignment,
    // e.g. an attacker-supplied _id)
    let skillData: Record<string, unknown>
    try {
      skillData = (await skillSchema.validate(body, { stripUnknown: true })) as Record<string, unknown>
    } catch (validationError: any) {
      return NextResponse.json(createErrorResponse("Validation failed", validationError.message), {
        status: HTTP_STATUS.BAD_REQUEST,
      })
    }

    const skill = new Skill(skillData)
    await skill.save()

    return NextResponse.json(createSuccessResponse(skill, "Skill created successfully"), {
      status: HTTP_STATUS.CREATED,
    })
  } catch (error: any) {
    console.error("Create skill error:", error)
    return NextResponse.json(createErrorResponse("Failed to create skill"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}
