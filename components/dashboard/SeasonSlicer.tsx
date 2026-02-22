/**
 * Season Slicer Component
 * Dropdown for filtering by season
 */

'use client'

import { Trophy } from 'lucide-react'

interface SeasonSlicerProps {
  selectedSeason: number | 'All'
  onSeasonChange: (season: number | 'All') => void
  startYear?: number
  endYear?: number
}

export function SeasonSlicer({
  selectedSeason,
  onSeasonChange,
  startYear = 2020,
  endYear = 2024,
}: SeasonSlicerProps) {
  const seasons = ['All', ...Array.from({ length: endYear - startYear + 1 }, (_, i) => endYear - i)]

  return (
    <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border-2 border-gray-300">
      <label htmlFor="season-select" className="text-sm font-medium text-gray-700">
        Season:
      </label>
      <select
        id="season-select"
        value={selectedSeason}
        onChange={(e) => onSeasonChange(e.target.value === 'All' ? 'All' : parseInt(e.target.value))}
        className="bg-white text-gray-900 px-3 py-1 rounded border-2 border-gray-300 focus:border-f1-red focus:outline-none"
      >
        {seasons.map((season) => (
          <option key={season} value={season}>
            {season === 'All' ? 'All' : season}
          </option>
        ))}
      </select>
    </div>
  )
}
