"use client"

import Cookies from "js-cookie"

export const cookieUtils = {
  // Get a cookie value
  get: (name: string): string | undefined => {
    return Cookies.get(name)
  },

  // Set a cookie
  set: (name: string, value: string, options?: Cookies.CookieAttributes): void => {
    Cookies.set(name, value, {
      expires: 7, // 7 days
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      ...options,
    })
  },

  // Remove a cookie
  remove: (name: string): void => {
    Cookies.remove(name)
  },

  // Get auth token
  getAuthToken: (): string | undefined => {
    return cookieUtils.get("auth-token")
  },

  // Set auth token
  setAuthToken: (token: string): void => {
    cookieUtils.set("auth-token", token, {
      expires: 7,
      httpOnly: false, // Client-side access needed
    })
  },

  // Remove auth token
  removeAuthToken: (): void => {
    cookieUtils.remove("auth-token")
  },
}
