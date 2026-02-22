/**
 * Authentication hook
 * Provides authentication state and methods
 */

'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { apiClient } from '@/lib/api'
import { useCurrentUser, useLogin, useLogout } from './useF1Data'

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  user: any | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [error, setError] = useState<string | null>(null)

  // Check if token exists in cookie
  const hasToken = apiClient.isAuthenticated()

  // Fetch current user if token exists
  const { data: user, isLoading, error: userError } = useCurrentUser()

  const loginMutation = useLogin()
  const logoutMutation = useLogout()

  const login = async (email: string, password: string) => {
    setError(null)
    try {
      await loginMutation.mutateAsync({ email, password })
    } catch (err: any) {
      setError(err.message || 'Login failed')
      throw err
    }
  }

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync()
    } catch (err) {
      // Continue with logout even if API call fails
      apiClient.clearToken()
    }
  }

  const value: AuthContextType = {
    isAuthenticated: hasToken && !userError,
    isLoading,
    user: user || null,
    login,
    logout,
    error,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
