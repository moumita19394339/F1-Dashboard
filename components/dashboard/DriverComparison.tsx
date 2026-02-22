/**
 * Driver Comparison Component
 * Displays side-by-side comparison of two drivers
 */

'use client'

import type { DriverComparisonData } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Trophy, Medal, Target, Zap, Award, Calendar } from 'lucide-react'

interface DriverComparisonProps {
  drivers: DriverComparisonData[]
}

export function DriverComparison({ drivers }: DriverComparisonProps) {
  if (drivers.length !== 2) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-400">Please select exactly two drivers to compare</p>
      </div>
    )
  }

  const driver1 = drivers[0]
  const driver2 = drivers[1]

  type StatItem = {
    label: string
    icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
    key: keyof DriverComparisonData
    color: string
    format?: (val: number) => string
  }

  const stats: StatItem[] = [
    {
      label: 'Wins',
      icon: Trophy,
      key: 'wins',
      color: '#E10600',
    },
    {
      label: 'Podiums',
      icon: Medal,
      key: 'podiums',
      color: '#27F4D2',
    },
    {
      label: 'Championships',
      icon: Award,
      key: 'championships',
      color: '#F91536',
    },
    {
      label: 'Pole Positions',
      icon: Target,
      key: 'pole_positions',
      color: '#3671C6',
    },
    {
      label: 'Career Points',
      icon: Zap,
      key: 'career_points',
      color: '#F58020',
      format: (val: number) => val.toFixed(1),
    },
    {
      label: 'Years Active',
      icon: Calendar,
      key: 'years_active',
      color: '#64C4FF',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Driver 1 Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="text-2xl font-bold">{driver1.driver_name}</div>
              {driver1.driver_code && (
                <div className="text-sm text-gray-400">{driver1.driver_code}</div>
              )}
              {driver1.team && (
                <div className="text-xs text-f1-red">{driver1.team}</div>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.map((stat) => {
              const Icon = stat.icon
              const value = driver1[stat.key as keyof DriverComparisonData]
              const displayValue = stat.format ? stat.format(Number(value)) : value

              return (
                <div key={stat.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" style={{ color: stat.color }} />
                    <span className="text-sm text-gray-400">{stat.label}</span>
                  </div>
                  <span className="font-bold text-white">{displayValue}</span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Indicators */}
      <div className="flex items-center justify-center">
        <div className="space-y-4">
          {stats.map((stat) => {
            const value1 = Number(driver1[stat.key as keyof DriverComparisonData] || 0)
            const value2 = Number(driver2[stat.key as keyof DriverComparisonData] || 0)
            const diff = value1 - value2
            const isTie = diff === 0

            return (
              <div key={stat.label} className="flex items-center gap-4 h-10">
                {diff > 0 ? (
                  <div className="w-3 h-3 rounded-full bg-green-500" title="Driver 1 leads" />
                ) : diff < 0 ? (
                  <div className="w-3 h-3 rounded-full bg-gray-600" />
                ) : (
                  <div className="w-3 h-3 rounded-full bg-yellow-500" title="Tie" />
                )}
                {!isTie && (
                  <span className="text-xs text-gray-400">{Math.abs(diff).toFixed(1)}</span>
                )}
                {diff < 0 ? (
                  <div className="w-3 h-3 rounded-full bg-green-500" title="Driver 2 leads" />
                ) : diff > 0 ? (
                  <div className="w-3 h-3 rounded-full bg-gray-600" />
                ) : (
                  <div className="w-3 h-3 rounded-full bg-yellow-500" title="Tie" />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Driver 2 Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="text-2xl font-bold">{driver2.driver_name}</div>
              {driver2.driver_code && (
                <div className="text-sm text-gray-400">{driver2.driver_code}</div>
              )}
              {driver2.team && (
                <div className="text-xs text-f1-red">{driver2.team}</div>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.map((stat) => {
              const Icon = stat.icon
              const value = driver2[stat.key as keyof DriverComparisonData]
              const displayValue = stat.format ? stat.format(Number(value)) : value

              return (
                <div key={stat.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" style={{ color: stat.color }} />
                    <span className="text-sm text-gray-400">{stat.label}</span>
                  </div>
                  <span className="font-bold text-white">{displayValue}</span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
