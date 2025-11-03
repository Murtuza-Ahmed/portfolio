import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "@/lib/auth/jwt"

export function middleware(request: NextRequest) {

  const { pathname } = request.nextUrl

  // Check if the request is for admin routes
  if (pathname.startsWith("/admin") && pathname.startsWith("/admin/login")) {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    const payload = verifyToken(token)
    if (!payload || payload.role !== "admin") {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  // Check if the request is for API routes that require authentication
  if (pathname.startsWith("/api/admin") || pathname.startsWith("/api/protected")) {
    const token =
      request.headers.get("authorization")?.replace("Bearer ", "") || request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 })
    }

    const payload = verifyToken(token)
    console.log("payload_middleware: ", payload)
    if (!payload) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 })
    }

    // For admin routes, check admin role
    if (pathname.startsWith("/api/admin") && payload.role !== "admin") {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // "/admin/:path*",
    "/api/admin/:path*",
    "/api/protected/:path*"
  ],
}
