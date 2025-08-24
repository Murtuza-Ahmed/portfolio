"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import type { User, LoginForm, RegisterForm, AuthResponse } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginForm) => Promise<AuthResponse>;
  register: (userData: RegisterForm) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get("/api/auth/me");

      if (response.data.success) {
        setUser(response.data.data);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginForm): Promise<AuthResponse> => {
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/login", credentials);

      if (response.data.success) {
        setUser(response.data.data.user);
        return {
          success: true,
          message: response.data.message,
          user: response.data.data.user,
          token: response.data.data.token,
        };
      }

      return {
        success: false,
        message: response.data.message || "Login failed",
      };
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed";
      return {
        success: false,
        message,
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterForm): Promise<AuthResponse> => {
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/register", userData);

      if (response.data.success) {
        setUser(response.data.data.user);
        return {
          success: true,
          message: response.data.message,
          user: response.data.data.user,
          token: response.data.data.token,
        };
      }

      return {
        success: false,
        message: response.data.message || "Registration failed",
      };
    } catch (error: any) {
      const message = error.response?.data?.message || "Registration failed";
      return {
        success: false,
        message,
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await axios.post("/api/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setLoading(false);
      router.push("/");
    }
  };

  const refreshUser = async () => {
    try {
      const response = await axios.get("/api/auth/me");
      if (response.data.success) {
        setUser(response.data.data);
      }
    } catch (error) {
      console.error("Refresh user failed:", error);
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    refreshUser,
    isAuthenticated,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
