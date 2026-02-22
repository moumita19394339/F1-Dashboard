/**
 * Driver Profile Header Component
 * Displays driver profile information and quick stats
 */

'use client'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { Driver } from '@/lib/api'
import { Trophy, Award, Flag, Calendar } from 'lucide-react'

interface DriverProfileHeaderProps {
  driver: Driver
}

export function DriverProfileHeader({ driver }: DriverProfileHeaderProps) {
  return (
    <Card className="p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Driver Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                {driver.full_name}
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-lg text-neutral-600">
                  {driver.code}
                </span>
                <Badge variant={driver.is_active ? 'success' : 'default'}>
                  {driver.is_active ? 'Active' : 'Retired'}
                </Badge>
                {driver.nationality && (
                  <Badge variant="outline">
                    <Flag className="h-3 w-3 mr-1" />
                    {driver.nationality}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center p-3 bg-neutral-50 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Trophy className="h-4 w-4 text-primary-600 mr-1" />
                <span className="text-sm text-neutral-600">Wins</span>
              </div>
              <p className="text-2xl font-bold text-neutral-900">
                {driver.wins || 0}
              </p>
            </div>
            <div className="text-center p-3 bg-neutral-50 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Award className="h-4 w-4 text-primary-600 mr-1" />
                <span className="text-sm text-neutral-600">Podiums</span>
              </div>
              <p className="text-2xl font-bold text-neutral-900">
                {driver.podiums || 0}
              </p>
            </div>
            <div className="text-center p-3 bg-neutral-50 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Trophy className="h-4 w-4 text-yellow-600 mr-1" />
                <span className="text-sm text-neutral-600">Championships</span>
              </div>
              <p className="text-2xl font-bold text-neutral-900">
                {driver.championships || 0}
              </p>
            </div>
            <div className="text-center p-3 bg-neutral-50 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Calendar className="h-4 w-4 text-primary-600 mr-1" />
                <span className="text-sm text-neutral-600">Races</span>
              </div>
              <p className="text-2xl font-bold text-neutral-900">
                {driver.entries || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="lg:w-80 space-y-3 text-sm">
          {driver.dob && (
            <div className="flex justify-between">
              <span className="text-neutral-600">Date of Birth:</span>
              <span className="font-medium text-neutral-900">
                {new Date(driver.dob).toLocaleDateString()}
              </span>
            </div>
          )}
          {driver.first_entry_year && (
            <div className="flex justify-between">
              <span className="text-neutral-600">Debut Year:</span>
              <span className="font-medium text-neutral-900">
                {driver.first_entry_year}
              </span>
            </div>
          )}
          {driver.last_entry_year && (
            <div className="flex justify-between">
              <span className="text-neutral-600">Final Year:</span>
              <span className="font-medium text-neutral-900">
                {driver.last_entry_year}
              </span>
            </div>
          )}
          {driver.career_points !== undefined && driver.career_points !== null && (
            <div className="flex justify-between">
              <span className="text-neutral-600">Career Points:</span>
              <span className="font-medium text-neutral-900">
                {driver.career_points.toFixed(1)}
              </span>
            </div>
          )}
          {driver.pole_positions !== undefined && driver.pole_positions !== null && (
            <div className="flex justify-between">
              <span className="text-neutral-600">Pole Positions:</span>
              <span className="font-medium text-neutral-900">
                {driver.pole_positions}
              </span>
            </div>
          )}
          {driver.fastest_laps !== undefined && driver.fastest_laps !== null && (
            <div className="flex justify-between">
              <span className="text-neutral-600">Fastest Laps:</span>
              <span className="font-medium text-neutral-900">
                {driver.fastest_laps}
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
