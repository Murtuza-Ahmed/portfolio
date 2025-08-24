import jwt, { Secret, SignOptions } from "jsonwebtoken"
import type { User } from "@/lib/types"

const JWT_SECRET = process.env.JWT_SECRET!
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN! || "7d"

if (!JWT_SECRET) {
  throw new Error("Please define the JWT_SECRET environment variable inside .env.local")
}

export interface JWTPayload {
  userId: string
  email: string
  role: "admin" | "user"
}

export function generateToken(user: User): string {
  const payload: JWTPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  }

  const option: SignOptions = { expiresIn: JWT_EXPIRES_IN as any }

  return jwt.sign(payload, JWT_SECRET as Secret, option)
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    console.error("JWT verification failed:", error)
    return null
  }
}

export function decodeToken(token: string): JWTPayload | null {
  try {
    return jwt.decode(token) as JWTPayload
  } catch (error) {
    console.error("JWT decode failed:", error)
    return null
  }
}
