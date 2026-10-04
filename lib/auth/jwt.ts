// NOTE: keep this module Node-only ("jsonwebtoken" does not run on Edge).
// Middleware (Edge runtime) must import verifyTokenEdge from
// "@/lib/auth/jwt-edge" instead of this file.
import jwt, { type Secret, type SignOptions } from "jsonwebtoken"
import type { User } from "@/lib/types"

// Env access is lazy so importing this module never crashes `next build`
// when env vars are missing; the error surfaces only when actually used.
function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error("Please define the JWT_SECRET environment variable inside .env.local")
  }
  return secret
}

function getJwtExpiresIn(): SignOptions["expiresIn"] {
  return (process.env.JWT_EXPIRES_IN || "7d") as SignOptions["expiresIn"]
}

export interface JWTPayload {
  userId: string
  email: string
  role: "admin" | "user"
}

export function generateToken(user: Pick<User, "_id" | "email" | "role">): string {
  const payload: JWTPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  }

  const options: SignOptions = { expiresIn: getJwtExpiresIn() }

  return jwt.sign(payload, getJwtSecret() as Secret, options)
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, getJwtSecret()) as JWTPayload
  } catch {
    return null
  }
}

// WARNING: this only decodes the token WITHOUT verifying its signature.
// It must NEVER be used to make authentication or authorization decisions.
export function decodeToken(token: string): JWTPayload | null {
  try {
    return jwt.decode(token) as JWTPayload
  } catch {
    return null
  }
}
