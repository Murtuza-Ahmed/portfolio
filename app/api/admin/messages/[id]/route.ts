import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database/connection"
import ContactMessage from "@/models/ContactMessage"
import { createSuccessResponse, createErrorResponse, isValidObjectId, HTTP_STATUS } from "@/lib/utils/api"

// GET /api/admin/messages/[id] - Get message by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    if (!isValidObjectId(params.id)) {
      return NextResponse.json(createErrorResponse("Invalid message ID"), { status: HTTP_STATUS.BAD_REQUEST })
    }

    const message = await ContactMessage.findById(params.id)
    if (!message) {
      return NextResponse.json(createErrorResponse("Message not found"), { status: HTTP_STATUS.NOT_FOUND })
    }

    return NextResponse.json(createSuccessResponse(message, "Message retrieved successfully"), {
      status: HTTP_STATUS.OK,
    })
  } catch (error: any) {
    console.error("Get message error:", error)
    return NextResponse.json(createErrorResponse("Failed to retrieve message"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}

// PUT /api/admin/messages/[id] - Update message status
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    if (!isValidObjectId(params.id)) {
      return NextResponse.json(createErrorResponse("Invalid message ID"), { status: HTTP_STATUS.BAD_REQUEST })
    }

    const body = await request.json()
    const { status } = body

    if (!["unread", "read", "replied"].includes(status)) {
      return NextResponse.json(createErrorResponse("Invalid status"), { status: HTTP_STATUS.BAD_REQUEST })
    }

    const message = await ContactMessage.findByIdAndUpdate(params.id, { status }, { new: true, runValidators: true })
    if (!message) {
      return NextResponse.json(createErrorResponse("Message not found"), { status: HTTP_STATUS.NOT_FOUND })
    }

    return NextResponse.json(createSuccessResponse(message, "Message status updated successfully"), {
      status: HTTP_STATUS.OK,
    })
  } catch (error: any) {
    console.error("Update message error:", error)
    return NextResponse.json(createErrorResponse("Failed to update message"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}

// DELETE /api/admin/messages/[id] - Delete message
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    if (!isValidObjectId(params.id)) {
      return NextResponse.json(createErrorResponse("Invalid message ID"), { status: HTTP_STATUS.BAD_REQUEST })
    }

    const message = await ContactMessage.findByIdAndDelete(params.id)
    if (!message) {
      return NextResponse.json(createErrorResponse("Message not found"), { status: HTTP_STATUS.NOT_FOUND })
    }

    return NextResponse.json(createSuccessResponse(null, "Message deleted successfully"), { status: HTTP_STATUS.OK })
  } catch (error: any) {
    console.error("Delete message error:", error)
    return NextResponse.json(createErrorResponse("Failed to delete message"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}
