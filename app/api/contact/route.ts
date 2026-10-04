import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database/connection"
import ContactMessage from "@/models/ContactMessage"
import { contactSchema } from "@/lib/validations/schemas"
import { createSuccessResponse, createErrorResponse, HTTP_STATUS } from "@/lib/utils/api"
import { rateLimit, getClientIp, rateLimitExceededResponse } from "@/lib/utils/rate-limit"

// POST /api/contact - Submit a contact form message (public, rate-limited)
export async function POST(request: NextRequest) {
  const ip = getClientIp(request)
  const limit = rateLimit(`contact:${ip}`, 5, 10 * 60 * 1000)
  if (!limit.allowed) {
    return rateLimitExceededResponse(limit.retryAfterMs)
  }

  try {
    await connectDB()

    const body = await request.json()

    // Validate request body
    let input: { name: string; email: string; subject: string; message: string }
    try {
      input = await contactSchema.validate(body, { stripUnknown: true })
    } catch (validationError: any) {
      return NextResponse.json(createErrorResponse("Validation failed", validationError.message), {
        status: HTTP_STATUS.BAD_REQUEST,
      })
    }

    // Persist the message so it appears in the admin panel
    const saved = await ContactMessage.create({
      name: input.name,
      email: input.email,
      subject: input.subject,
      message: input.message,
      status: "unread",
    })

    return NextResponse.json(
      createSuccessResponse(
        {
          id: saved._id,
          name: saved.name,
          email: saved.email,
          subject: saved.subject,
          createdAt: saved.createdAt,
        },
        "Message sent successfully",
      ),
      { status: HTTP_STATUS.CREATED },
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(createErrorResponse("Failed to send message"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}
