import { jwtVerify, type JWTPayload as JosePayload } from "jose"

// Edge-runtime-safe JWT verification. This module intentionally does NOT
// import "jsonwebtoken" (Node-only) so it can be bundled into middleware.

function getEdgeSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error("Please define the JWT_SECRET environment variable inside .env.local")
  }
  return new TextEncoder().encode(secret)
}

export interface EdgeJWTPayload extends JosePayload {
  userId?: string
  email?: string
  role?: "admin" | "user"
}

export async function verifyTokenEdge(token: string): Promise<EdgeJWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getEdgeSecret())
    return payload as EdgeJWTPayload
  } catch {
    return null
  }
}
