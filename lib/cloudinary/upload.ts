import { v2 as cloudinary } from "cloudinary"

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.warn("Cloudinary environment variables not configured")
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
})

interface UploadResponse {
  secure_url: string
  public_id: string
  width: number
  height: number
  format: string
  size: number
  bytes: number
}

/**
 * Upload image to Cloudinary
 */
export async function uploadImage(buffer: Buffer, filename: string): Promise<UploadResponse> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "portfolio",
        public_id: filename.replace(/\.[^/.]+$/, ""),
        resource_type: "auto",
      },
      (error, result) => {
        if (error) reject(error)
        else resolve(result as UploadResponse)
      },
    )

    uploadStream.end(buffer)
  })
}

/**
 * Delete image from Cloudinary
 */
export async function deleteImage(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    })
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error)
    throw error
  }
}

/**
 * Get image metadata from Cloudinary
 */
export async function getImageMetadata(publicId: string): Promise<any> {
  try {
    const result = await cloudinary.api.resource(publicId)
    return result
  } catch (error) {
    console.error("Error getting image metadata:", error)
    throw error
  }
}
