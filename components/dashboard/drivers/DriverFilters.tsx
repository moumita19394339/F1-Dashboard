/**
 * Driver Filters Component
 * Provides filtering and sorting controls for driver list
 */

'use client'

import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Search, X } from 'lucide-react'

export interface DriverFilterValues {
  search: string
  nationality: string
  is_active: string
  min_wins: string
  sort_by: string
  sort_order: 'asc' | 'desc'
}

interface DriverFiltersProps {
  filters: DriverFilterValues
  nationalities: string[]
  onFilterChange: (filters: DriverFilterValues) => void
  onReset: () => void
}

export function DriverFilters({
  filters,
  nationalities,
  onFilterChange,
  onReset
}: DriverFiltersProps) {
  const handleChange = (key: keyof DriverFilterValues, value: string) => {
    onFilterChange({ ...filters, [key]: value })
  }

  const hasActiveFilters =
    filters.search ||
    filters.nationality ||
    filters.is_active ||
    filters.min_wins

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Input
            placeholder="Search drivers..."
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
          />
        </div>

        {/* Nationality Filter */}
        <Select
          value={filters.nationality}
          onChange={(e) => handleChange('nationality', e.target.value)}
        >
          <option value="">All Nationalities</option>
          {nationalities.map((nationality) => (
            <option key={nationality} value={nationality}>
              {nationality}
            </option>
          ))}
        </Select>

        {/* Active/Retired Filter */}
        <Select
          value={filters.is_active}
          onChange={(e) => handleChange('is_active', e.target.value)}
        >
          <option value="">All Drivers</option>
          <option value="true">Active Only</option>
          <option value="false">Retired Only</option>
        </Select>

        {/* Minimum Wins Filter */}
        <Select
          value={filters.min_wins}
          onChange={(e) => handleChange('min_wins', e.target.value)}
        >
          <option value="">All Wins</option>
          <option value="1">1+ Wins</option>
          <option value="5">5+ Wins</option>
          <option value="10">10+ Wins</option>
          <option value="20">20+ Wins</option>
          <option value="50">50+ Wins</option>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        {/* Sort Controls */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-600">Sort by:</span>
          <Select
            value={filters.sort_by}
            onChange={(e) => handleChange('sort_by', e.target.value)}
            className="w-40"
          >
            <option value="driver_name">Name</option>
            <option value="wins">Wins</option>
            <option value="podiums">Podiums</option>
            <option value="championships">Championships</option>
            <option value="debut_year">Debut Year</option>
          </Select>
          <Select
            value={filters.sort_order}
            onChange={(e) => handleChange('sort_order', e.target.value as 'asc' | 'desc')}
            className="w-32"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Select>
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            icon={<X className="h-4 w-4" />}
          >
            Reset Filters
          </Button>
        )}
      </div>
    </div>
  )
}
