/**
 * Multi Driver Comparison Component
 * Displays side-by-side comparison of multiple drivers with comprehensive metrics
 * organized into expandable categories
 */

'use client'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { DriverComparisonData } from '@/lib/api'
import {
  Trophy,
  Award,
  Flag,
  Calendar,
  Target,
  Zap,
  User,
  AlertCircle,
} from 'lucide-react'
import { MetricCategory } from './MetricCategory'

interface MultiDriverComparisonProps {
  driversData: DriverComparisonData[]
}

export function MultiDriverComparison({
  driversData,
}: MultiDriverComparisonProps) {
  if (!driversData || driversData.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-neutral-600">No drivers selected for comparison</p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Driver Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {driversData.map((driver) => (
          <Card key={driver.driver_id} className="overflow-hidden">
            {/* Driver Header */}
            <div className="bg-gradient-to-r from-f1-red to-red-700 text-white p-4 text-center">
              <h3 className="text-lg font-bold mb-1">{driver.driver_name}</h3>
              <p className="text-sm opacity-90">{driver.driver_code || '-'}</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Badge
                  variant={driver.is_active ? 'success' : 'outline'}
                  size="sm"
                  className="bg-white/20 backdrop-blur-sm border-white/30"
                >
                  {driver.is_active ? 'Active' : 'Retired'}
                </Badge>
                {driver.nationality && (
                  <Badge
                    variant="outline"
                    size="sm"
                    className="bg-white/20 backdrop-blur-sm border-white/30"
                  >
                    {driver.nationality}
                  </Badge>
                )}
              </div>
            </div>

            {/* Metrics Categories */}
            <div className="p-4 space-y-3">
              {/* Category 1: Career Overview */}
              <MetricCategory
                title="Career Overview"
                icon={<Calendar className="w-4 h-4" />}
                defaultExpanded={true}
                metrics={[
                  { label: 'Entries', value: driver.entries },
                  { label: 'Starts', value: driver.starts },
                  { label: 'Years Active', value: driver.years_active },
                  { label: 'First Year', value: driver.first_entry_year },
                  { label: 'Last Year', value: driver.last_entry_year },
                  { label: 'Current Team', value: driver.current_team },
                  {
                    label: 'Retirement Year',
                    value: driver.retired ? driver.retirement_year : '-',
                  },
                  {
                    label: 'Car Number',
                    value: driver.car_number,
                  },
                ]}
              />

              {/* Category 2: Wins & Podiums */}
              <MetricCategory
                title="Wins & Podiums"
                icon={<Trophy className="w-4 h-4" />}
                defaultExpanded={true}
                metrics={[
                  { label: 'Wins', value: driver.wins, highlight: true },
                  { label: 'Podiums', value: driver.podiums },
                  { label: '2nd Places', value: driver.second_places },
                  { label: '3rd Places', value: driver.third_places },
                  { label: '4th Places', value: driver.fourth_places },
                  { label: '5th Places', value: driver.fifth_places },
                  { label: '6th Places', value: driver.sixth_places },
                  { label: 'Points Finishes', value: driver.points_finishes },
                ]}
              />

              {/* Category 3: Qualifying */}
              <MetricCategory
                title="Qualifying"
                icon={<Target className="w-4 h-4" />}
                defaultExpanded={false}
                metrics={[
                  { label: 'Pole Positions', value: driver.pole_positions },
                  { label: 'Front Row Starts', value: driver.front_row_starts },
                  {
                    label: 'Qualifying Appearances',
                    value: driver.qualifying_appearances,
                  },
                ]}
              />

              {/* Category 4: Championships & Points */}
              <MetricCategory
                title="Championships"
                icon={<Award className="w-4 h-4" />}
                defaultExpanded={true}
                metrics={[
                  {
                    label: 'Championships',
                    value: driver.championships,
                    highlight: true,
                  },
                  {
                    label: 'Championship Years',
                    value: driver.championship_years || '-',
                  },
                  {
                    label: 'Career Points',
                    value:
                      driver.career_points !== null &&
                      driver.career_points !== undefined
                        ? driver.career_points.toFixed(1)
                        : '-',
                  },
                  {
                    label: 'Highest Position',
                    value: driver.highest_championship_position
                      ? `P${driver.highest_championship_position}`
                      : '-',
                  },
                  {
                    label: 'Highest Position Year',
                    value: driver.highest_championship_position_year,
                  },
                ]}
              />

              {/* Category 5: Speed & Performance */}
              <MetricCategory
                title="Speed & Performance"
                icon={<Zap className="w-4 h-4" />}
                defaultExpanded={false}
                metrics={[
                  { label: 'Fastest Laps', value: driver.fastest_laps },
                  { label: 'Grand Slams', value: driver.grand_slams },
                  { label: 'Hat Tricks', value: driver.hat_tricks },
                  { label: 'Laps Led', value: driver.laps_led },
                  {
                    label: 'Distance Led (km)',
                    value:
                      driver.distance_led_km !== null &&
                      driver.distance_led_km !== undefined
                        ? driver.distance_led_km.toFixed(1)
                        : '-',
                  },
                  { label: 'Races Led', value: driver.races_led },
                ]}
              />

              {/* Category 6: Race Outcomes */}
              <MetricCategory
                title="Race Outcomes"
                icon={<AlertCircle className="w-4 h-4" />}
                defaultExpanded={false}
                metrics={[
                  { label: 'DNF', value: driver.dnf },
                  { label: 'DNS', value: driver.dns },
                  { label: 'DSQ', value: driver.dsq },
                ]}
              />

              {/* Category 7: Personal Info (Optional) */}
              <MetricCategory
                title="Personal Info"
                icon={<User className="w-4 h-4" />}
                defaultExpanded={false}
                metrics={[
                  {
                    label: 'Date of Birth',
                    value: driver.dob
                      ? new Date(driver.dob).toLocaleDateString()
                      : '-',
                  },
                  { label: 'Birth Place', value: driver.birth_place },
                  { label: 'Birth Country', value: driver.birth_country },
                  {
                    label: 'Height (cm)',
                    value:
                      driver.height_cm !== null &&
                      driver.height_cm !== undefined
                        ? driver.height_cm.toFixed(0)
                        : '-',
                  },
                  {
                    label: 'Weight (kg)',
                    value:
                      driver.weight_kg !== null &&
                      driver.weight_kg !== undefined
                        ? driver.weight_kg.toFixed(0)
                        : '-',
                  },
                ]}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
