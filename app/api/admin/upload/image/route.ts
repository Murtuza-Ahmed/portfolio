import { type NextRequest, NextResponse } from "next/server"
import { uploadImage } from "@/lib/cloudinary/upload"
import { createSuccessResponse, createErrorResponse, HTTP_STATUS } from "@/lib/utils/api"

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/jpg"]

// POST /api/admin/upload/image - Upload image to Cloudinary
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json(createErrorResponse("No file provided"), {
        status: HTTP_STATUS.BAD_REQUEST,
      })
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        createErrorResponse(
          `Invalid file type. Allowed types: ${ALLOWED_TYPES.join(", ")}`,
        ),
        {
          status: HTTP_STATUS.BAD_REQUEST,
        },
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        createErrorResponse(`File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`),
        {
          status: HTTP_STATUS.BAD_REQUEST,
        },
      )
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = file.name

    // Upload to Cloudinary
    const result = await uploadImage(buffer, filename)

    return NextResponse.json(
      createSuccessResponse(
        {
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
          format: result.format,
          size: result.bytes,
        },
        "Image uploaded successfully",
      ),
      {
        status: HTTP_STATUS.CREATED,
      },
    )
  } catch (error: any) {
    console.error("Upload image error:", error)
    return NextResponse.json(createErrorResponse("Failed to upload image"), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    })
  }
}
