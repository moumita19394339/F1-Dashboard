'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { apiClient } from '@/lib/api/client'
import { Activity } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = apiClient.isAuthenticated()

    if (isAuthenticated) {
      router.push('/admin')
    } else {
      router.push('/login')
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="flex items-center gap-3">
        <Activity className="h-8 w-8 animate-spin text-accent" />
        <span className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>Loading...</span>
      </div>
    </div>
  )
}
