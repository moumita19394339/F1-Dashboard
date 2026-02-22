/**
 * Dashboard Header Component
 * Top header with title, season slicer, and metrics
 */

'use client'

import { Trophy, Award, Zap, Gauge, Percent } from 'lucide-react'
import { MetricsCard } from './MetricsCard'
import { SeasonSlicer } from './SeasonSlicer'
import type { DashboardSummary } from '@/lib/api'

interface DashboardHeaderProps {
  summary: DashboardSummary | undefined
  selectedSeason: number | 'All'
  onSeasonChange: (season: number | 'All') => void
  isLoading?: boolean
}

export function DashboardHeader({
  summary,
  selectedSeason,
  onSeasonChange,
  isLoading = false,
}: DashboardHeaderProps) {
  if (isLoading) {
    return (
      <div className="bg-white border-b-4 border-f1-red p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-f1-red rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">F1</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">F1 Team Championship Overview</h1>
                <p className="text-gray-600">(2020-2024)</p>
              </div>
            </div>
            <div className="animate-pulse bg-gray-300 h-10 w-48 rounded"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse bg-gray-200 h-28 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border-b-4 border-f1-red p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-f1-red rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">F1</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                F1 Team Championship Overview
              </h1>
              <p className="text-gray-600 mt-1">
                ({selectedSeason === 'All' ? '2020-2024' : selectedSeason})
              </p>
            </div>
          </div>
          <SeasonSlicer
            selectedSeason={selectedSeason}
            onSeasonChange={onSeasonChange}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <MetricsCard
            title="Wins"
            value={summary?.total_wins ?? 107}
            icon={Trophy}
          />
          <MetricsCard
            title="Podiums"
            value={summary?.total_podiums ?? 321}
            icon={Award}
          />
          <MetricsCard
            title="Avg Pts"
            value={summary?.average_points?.toFixed(2) ?? '5.07'}
            icon={Zap}
          />
          <MetricsCard
            title="Speed"
            value={summary?.average_speed?.toFixed(2) ?? '211.67'}
            icon={Gauge}
          />
          <MetricsCard
            title="Win %"
            value={summary?.win_percentage?.toFixed(2) ?? '0.05'}
            icon={Percent}
          />
          <MetricsCard
            title="Races"
            value={120}
            icon={Gauge}
          />
        </div>
      </div>
    </div>
  )
}
