"use client"

import { useAuth as useAuthContext } from "@/lib/contexts/AuthContext"

// Re-export the useAuth hook for convenience
export const useAuth = useAuthContext

// Additional auth-related hooks
export function useRequireAuth(redirectTo = "/admin/login") {
  const auth = useAuthContext()

  if (!auth.isAuthenticated && !auth.loading) {
    if (typeof window !== "undefined") {
      window.location.href = redirectTo
    }
  }

  return auth
}

export function useRequireAdmin(redirectTo = "/admin/unauthorized") {
  const auth = useAuthContext()

  if (!auth.isAdmin && !auth.loading) {
    if (typeof window !== "undefined") {
      window.location.href = redirectTo
    }
  }

  return auth
}
