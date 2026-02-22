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
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
      <div className="flex items-center gap-3">
        <Activity className="h-8 w-8 animate-spin text-primary-600" />
        <span className="text-neutral-600 text-lg">Loading...</span>
      </div>
    </div>
  )
}
