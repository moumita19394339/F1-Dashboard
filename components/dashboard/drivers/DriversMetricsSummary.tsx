/**
 * Drivers Metrics Summary Component
 * Displays aggregate metrics cards for drivers overview
 */

'use client'

import { MetricsCard } from '@/components/dashboard/MetricsCard'
import { Users, Trophy, Award, TrendingUp } from 'lucide-react'

interface DriversMetricsSummaryProps {
  totalDrivers: number
  activeDrivers: number
  totalWins: number
  totalChampionships: number
  isLoading?: boolean
}

export function DriversMetricsSummary({
  totalDrivers,
  activeDrivers,
  totalWins,
  totalChampionships,
  isLoading = false
}: DriversMetricsSummaryProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="metric-card">
            <div className="h-32 bg-neutral-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricsCard
        title="Total Drivers"
        value={totalDrivers}
        icon={Users}
        color="text-blue-600"
        bgColor="bg-blue-50"
      />
      <MetricsCard
        title="Active Drivers"
        value={activeDrivers}
        icon={TrendingUp}
        color="text-green-600"
        bgColor="bg-green-50"
      />
      <MetricsCard
        title="Total Wins"
        value={totalWins}
        icon={Trophy}
        color="text-red-600"
        bgColor="bg-red-50"
      />
      <MetricsCard
        title="Championships"
        value={totalChampionships}
        icon={Award}
        color="text-yellow-600"
        bgColor="bg-yellow-50"
      />
    </div>
  )
}
