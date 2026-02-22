/**
 * Driver Comparison Table Component
 * Displays comprehensive sortable comparison table with 50+ metrics
 * Features: grouped headers, column toggles, sticky first column, horizontal scroll
 */

'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { DriverComparisonData } from '@/lib/api'

interface DriverComparisonTableProps {
  driversData: DriverComparisonData[]
}

export function DriverComparisonTable({
  driversData,
}: DriverComparisonTableProps) {
  // Category visibility state
  const [visibleCategories, setVisibleCategories] = useState<Set<string>>(
    new Set(['identity', 'career', 'wins', 'championships'])
  )

  const toggleCategory = (category: string) => {
    const newVisible = new Set(visibleCategories)
    if (newVisible.has(category)) {
      newVisible.delete(category)
    } else {
      newVisible.add(category)
    }
    setVisibleCategories(newVisible)
  }

  const categories = [
    { id: 'identity', label: 'Identity', color: 'bg-neutral-100' },
    { id: 'career', label: 'Career Overview', color: 'bg-blue-50' },
    { id: 'wins', label: 'Wins & Podiums', color: 'bg-red-50' },
    { id: 'qualifying', label: 'Qualifying', color: 'bg-purple-50' },
    { id: 'championships', label: 'Championships', color: 'bg-yellow-50' },
    { id: 'speed', label: 'Speed & Performance', color: 'bg-green-50' },
    { id: 'outcomes', label: 'Race Outcomes', color: 'bg-orange-50' },
    { id: 'personal', label: 'Personal Info', color: 'bg-neutral-50' },
  ]

  if (!driversData || driversData.length === 0) {
    return (
      <div className="p-8 text-center text-neutral-500">
        No drivers selected for comparison
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Column Group Toggles */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            size="sm"
            variant={visibleCategories.has(cat.id) ? 'primary' : 'outline'}
            onClick={() => toggleCategory(cat.id)}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Table with horizontal scroll */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            {/* Two-tier header: Category groups */}
            <tr className="bg-neutral-100">
              <th
                rowSpan={2}
                className="sticky left-0 bg-neutral-100 z-20 px-4 py-3 text-left text-xs font-semibold text-neutral-700 border-b-2 border-r-2 border-neutral-300 min-w-[150px]"
              >
                Driver
              </th>
              {visibleCategories.has('identity') && (
                <th
                  colSpan={2}
                  className="px-4 py-2 text-center text-xs font-semibold text-neutral-700 border-b border-neutral-200 bg-neutral-100"
                >
                  Identity
                </th>
              )}
              {visibleCategories.has('career') && (
                <th
                  colSpan={8}
                  className="px-4 py-2 text-center text-xs font-semibold text-neutral-700 border-b border-neutral-200 bg-blue-50"
                >
                  Career Overview
                </th>
              )}
              {visibleCategories.has('wins') && (
                <th
                  colSpan={8}
                  className="px-4 py-2 text-center text-xs font-semibold text-neutral-700 border-b border-neutral-200 bg-red-50"
                >
                  Wins & Podiums
                </th>
              )}
              {visibleCategories.has('qualifying') && (
                <th
                  colSpan={3}
                  className="px-4 py-2 text-center text-xs font-semibold text-neutral-700 border-b border-neutral-200 bg-purple-50"
                >
                  Qualifying
                </th>
              )}
              {visibleCategories.has('championships') && (
                <th
                  colSpan={5}
                  className="px-4 py-2 text-center text-xs font-semibold text-neutral-700 border-b border-neutral-200 bg-yellow-50"
                >
                  Championships & Points
                </th>
              )}
              {visibleCategories.has('speed') && (
                <th
                  colSpan={6}
                  className="px-4 py-2 text-center text-xs font-semibold text-neutral-700 border-b border-neutral-200 bg-green-50"
                >
                  Speed & Performance
                </th>
              )}
              {visibleCategories.has('outcomes') && (
                <th
                  colSpan={3}
                  className="px-4 py-2 text-center text-xs font-semibold text-neutral-700 border-b border-neutral-200 bg-orange-50"
                >
                  Race Outcomes
                </th>
              )}
              {visibleCategories.has('personal') && (
                <th
                  colSpan={5}
                  className="px-4 py-2 text-center text-xs font-semibold text-neutral-700 border-b border-neutral-200 bg-neutral-50"
                >
                  Personal Info
                </th>
              )}
            </tr>

            {/* Individual column headers */}
            <tr className="bg-neutral-50">
              {visibleCategories.has('identity') && (
                <>
                  <th className="px-3 py-2 text-left text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-neutral-100">
                    Code
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-neutral-100">
                    Nationality
                  </th>
                </>
              )}
              {visibleCategories.has('career') && (
                <>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-blue-50">
                    Entries
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-blue-50">
                    Starts
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-blue-50">
                    Years
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-blue-50">
                    First Year
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-blue-50">
                    Last Year
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-blue-50">
                    Team
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-blue-50">
                    Status
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-blue-50">
                    Car #
                  </th>
                </>
              )}
              {visibleCategories.has('wins') && (
                <>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-red-50">
                    Wins
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-red-50">
                    Podiums
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-red-50">
                    2nd
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-red-50">
                    3rd
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-red-50">
                    4th
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-red-50">
                    5th
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-red-50">
                    6th
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-red-50">
                    Points Finishes
                  </th>
                </>
              )}
              {visibleCategories.has('qualifying') && (
                <>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-purple-50">
                    Poles
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-purple-50">
                    Front Rows
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-purple-50">
                    Qual. Appearances
                  </th>
                </>
              )}
              {visibleCategories.has('championships') && (
                <>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-yellow-50">
                    Titles
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-yellow-50">
                    Championship Years
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-yellow-50">
                    Career Points
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-yellow-50">
                    Highest Pos.
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-yellow-50">
                    Highest Pos. Year
                  </th>
                </>
              )}
              {visibleCategories.has('speed') && (
                <>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-green-50">
                    Fastest Laps
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-green-50">
                    Grand Slams
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-green-50">
                    Hat Tricks
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-green-50">
                    Laps Led
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-green-50">
                    Distance Led (km)
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-green-50">
                    Races Led
                  </th>
                </>
              )}
              {visibleCategories.has('outcomes') && (
                <>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-orange-50">
                    DNF
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-orange-50">
                    DNS
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-orange-50">
                    DSQ
                  </th>
                </>
              )}
              {visibleCategories.has('personal') && (
                <>
                  <th className="px-3 py-2 text-left text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-neutral-50">
                    Date of Birth
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-neutral-50">
                    Birth Place
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-neutral-50">
                    Birth Country
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-neutral-50">
                    Height (cm)
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-neutral-600 border-b-2 border-neutral-200 bg-neutral-50">
                    Weight (kg)
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {driversData.map((driver, index) => (
              <tr
                key={driver.driver_id}
                className={
                  index % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'
                }
              >
                {/* Sticky driver name column */}
                <td className="sticky left-0 bg-inherit z-10 px-4 py-3 text-sm font-bold text-neutral-900 border-r-2 border-neutral-200 min-w-[150px]">
                  {driver.driver_name}
                </td>

                {/* Identity */}
                {visibleCategories.has('identity') && (
                  <>
                    <td className="px-3 py-3 text-sm text-neutral-700 whitespace-nowrap bg-neutral-100/50">
                      {driver.driver_code || '-'}
                    </td>
                    <td className="px-3 py-3 text-sm text-neutral-700 whitespace-nowrap bg-neutral-100/50">
                      {driver.nationality || '-'}
                    </td>
                  </>
                )}

                {/* Career Overview */}
                {visibleCategories.has('career') && (
                  <>
                    <td className="px-3 py-3 text-sm text-center text-neutral-700 bg-blue-50/30">
                      {driver.entries || 0}
                    </td>
                    <td className="px-3 py-3 text-sm text-center text-neutral-700 bg-blue-50/30">
                      {driver.starts || 0}
                    </td>
                    <td className="px-3 py-3 text-sm text-center text-neutral-700 bg-blue-50/30">
                      {driver.years_active || '-'}
                    </td>
                    <td className="px-3 py-3 text-sm text-center text-neutral-700 bg-blue-50/30">
                      {driver.first_entry_year || '-'}
                    </td>
                    <td className="px-3 py-3 text-sm text-center text-neutral-700 bg-blue-50/30">
                      {driver.last_entry_year || '-'}
                    </td>
                    <td className="px-3 py-3 text-sm text-neutral-700 whitespace-nowrap bg-blue-50/30">
                      {driver.current_team || '-'}
                    </td>
                    <td className="px-3 py-3 text-center bg-blue-50/30">
                      <Badge
                        variant={driver.is_active ? 'success' : 'default'}
                        size="sm"
                      >
                        {driver.is_active ? 'Active' : 'Retired'}
                      </Badge>
                    </td>
                    <td className="px-3 py-3 text-sm text-center text-neutral-700 bg-blue-50/30">
                      {driver.car_number || '-'}
                    </td>
                  </>
                )}

                {/* Wins & Podiums */}
                {visibleCategories.has('wins') && (
                  <>
                    <td className="px-3 py-3 text-sm text-center font-bold text-f1-red bg-red-50/30">
                      {driver.wins || 0}
                    </td>
                    <td className="px-3 py-3 text-sm text-center font-semibold text-neutral-700 bg-red-50/30">
                      {driver.podiums || 0}
                    </td>
                    <td className="px-3 py-3 text-sm text-center text-neutral-700 bg-red-50/30">
                      {driver.second_places || 0}
                    </td>
                    <td className="px-3 py-3 text-sm text-center text-neutral-700 bg-red-50/30">
                      {driver.third_places || 0}
                    </td>
                    <td className="px-3 py-3 text-sm text-center text-neutral-700 bg-red-50/30">
                      {driver.fourth_places || 0}
                    </td>
                    <td className="px-3 py-3 text-sm text-center text-neutral-700 bg-red-50/30">
                      {driver.fifth_places || 0}
                    </td>
                    <td className="px-3 py-3 text-sm text-center text-neutral-700 bg-red-50/30">
                      {driver.sixth_places || 0}
                    </td>
                    <td className="px-3 py-3 text-sm text-center text-neutral-700 bg-red-50/30">
                      {driver.points_finishes || 0}
                    </td>
                  </>
                )}

                {/* Qualifying */}
                {visibleCategories.has('qualifying') && (
                  <>
                    <td className="px-3 py-3 text-sm text-center font-semibold text-neutral-700 bg-purple-50/30">
                      {driver.pole_positions || 0}
                    </td>
                    <td className="px-3 py-3 text-sm text-center text-neutral-700 bg-purple-50/30">
                      {driver.front_row_starts || 0}
                    </td>
                    <td className="px-3 py-3 text-sm text-center text-neutral-700 bg-purple-50/30">
                      {driver.qualifying_appearances || 0}
                    </td>
                  </>
                )}

                {/* Championships & Points */}
                {visibleCategories.has('championships') && (
                  <>
                    <td className="px-3 py-3 text-sm text-center font-bold text-yellow-600 bg-yellow-50/30">
                      {driver.championships || 0}
                    </td>
                    <td className="px-3 py-3 text-sm text-neutral-700 whitespace-nowrap bg-yellow-50/30">
                      {driver.championship_years || '-'}
                    </td>
                    <td className="px-3 py-3 text-sm text-center font-semibold text-neutral-700 bg-yellow-50/30">
                      {driver.career_points?.toFixed(1) || '0.0'}
                    </td>
                    <td className="px-3 py-3 text-sm text-center text-neutral-700 bg-yellow-50/30">
                      {driver.highest_championship_position
                        ? `P${driver.highest_championship_position}`
                        : '-'}
                    </td>
                    <td className="px-3 py-3 text-sm text-center text-neutral-700 bg-yellow-50/30">
                      {driver.highest_championship_position_year || '-'}
                    </td>
                  </>
                )}

                {/* Speed & Performance */}
                {visibleCategories.has('speed') && (
                  <>
                    <td className="px-3 py-3 text-sm text-center text-neutral-700 bg-green-50/30">
                      {driver.fastest_laps || 0}
                    </td>
                    <td className="px-3 py-3 text-sm text-center text-neutral-700 bg-green-50/30">
                      {driver.grand_slams || 0}
                    </td>
                    <td className="px-3 py-3 text-sm text-center text-neutral-700 bg-green-50/30">
                      {driver.hat_tricks || 0}
                    </td>
                    <td className="px-3 py-3 text-sm text-center text-neutral-700 bg-green-50/30">
                      {driver.laps_led?.toLocaleString() || 0}
                    </td>
                    <td className="px-3 py-3 text-sm text-center text-neutral-700 bg-green-50/30">
                      {driver.distance_led_km?.toFixed(1) || '-'}
                    </td>
                    <td className="px-3 py-3 text-sm text-center text-neutral-700 bg-green-50/30">
                      {driver.races_led || 0}
                    </td>
                  </>
                )}

                {/* Race Outcomes */}
                {visibleCategories.has('outcomes') && (
                  <>
                    <td className="px-3 py-3 text-sm text-center text-neutral-700 bg-orange-50/30">
                      {driver.dnf || 0}
                    </td>
                    <td className="px-3 py-3 text-sm text-center text-neutral-700 bg-orange-50/30">
                      {driver.dns || 0}
                    </td>
                    <td className="px-3 py-3 text-sm text-center text-neutral-700 bg-orange-50/30">
                      {driver.dsq || 0}
                    </td>
                  </>
                )}

                {/* Personal Info */}
                {visibleCategories.has('personal') && (
                  <>
                    <td className="px-3 py-3 text-sm text-neutral-700 whitespace-nowrap bg-neutral-50/50">
                      {driver.dob
                        ? new Date(driver.dob).toLocaleDateString()
                        : '-'}
                    </td>
                    <td className="px-3 py-3 text-sm text-neutral-700 whitespace-nowrap bg-neutral-50/50">
                      {driver.birth_place || '-'}
                    </td>
                    <td className="px-3 py-3 text-sm text-neutral-700 whitespace-nowrap bg-neutral-50/50">
                      {driver.birth_country || '-'}
                    </td>
                    <td className="px-3 py-3 text-sm text-center text-neutral-700 bg-neutral-50/50">
                      {driver.height_cm?.toFixed(0) || '-'}
                    </td>
                    <td className="px-3 py-3 text-sm text-center text-neutral-700 bg-neutral-50/50">
                      {driver.weight_kg?.toFixed(0) || '-'}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
