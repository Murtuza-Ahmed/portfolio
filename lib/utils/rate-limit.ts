import { NextResponse } from "next/server"

// Simple in-memory sliding-window rate limiter.
//
// NOTE: this is per-process memory, so it is most effective on a single
// instance (e.g. `next start` on one server). Behind multiple serverless
// instances, use a shared store (Redis/Upstash) for strict limiting.
interface Bucket {
  count: number
  resetAt: number
}

const buckets = new Map<string, Bucket>()

export interface RateLimitResult {
  allowed: boolean
  retryAfterMs: number
}

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now()

  // Opportunistic cleanup so the map cannot grow unboundedly
  if (buckets.size > 10000) {
    for (const [k, b] of buckets) {
      if (b.resetAt <= now) buckets.delete(k)
    }
  }

  const bucket = buckets.get(key)
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, retryAfterMs: 0 }
  }

  if (bucket.count >= limit) {
    return { allowed: false, retryAfterMs: bucket.resetAt - now }
  }

  bucket.count += 1
  return { allowed: true, retryAfterMs: 0 }
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown"
}

export function rateLimitExceededResponse(retryAfterMs: number): NextResponse {
  const retryAfterSec = Math.max(1, Math.ceil(retryAfterMs / 1000))
  return NextResponse.json(
    { success: false, message: "Too many requests. Please try again later." },
    {
      status: 429,
      headers: { "Retry-After": String(retryAfterSec) },
    },
  )
}
