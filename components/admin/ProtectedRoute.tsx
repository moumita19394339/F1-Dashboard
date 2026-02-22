/**
 * Protected Route Component
 *
 * Wraps protected routes and redirects to login if user is not authenticated.
 * Shows a loading spinner while checking authentication status.
 */

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/hooks/useAuth'
import { Activity } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect to login if not authenticated and not loading
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-f1-darker flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Activity className="w-8 h-8 animate-spin text-f1-red" />
          <span className="text-gray-400 text-lg">Loading...</span>
        </div>
      </div>
    )
  }

  // Don't render children if not authenticated
  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
