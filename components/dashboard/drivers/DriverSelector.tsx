/**
 * Driver Selector Component
 * Searchable dropdown for selecting drivers for comparison
 */

'use client'

import { useState, useEffect } from 'react'
import { Select } from '@/components/ui/Select'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import type { Driver } from '@/lib/api'
import { Search, X } from 'lucide-react'

interface DriverSelectorProps {
  drivers: Driver[]
  selectedDriverIds: number[]
  onSelectionChange: (driverIds: number[]) => void
  maxDrivers?: number
  minDrivers?: number
}

export function DriverSelector({
  drivers,
  selectedDriverIds,
  onSelectionChange,
  maxDrivers = 4,
  minDrivers = 2
}: DriverSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>(drivers)

  useEffect(() => {
    if (searchTerm) {
      const filtered = drivers.filter((driver) =>
        driver.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.code?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredDrivers(filtered)
    } else {
      setFilteredDrivers(drivers)
    }
  }, [searchTerm, drivers])

  const handleAddDriver = (driverId: number) => {
    if (selectedDriverIds.length < maxDrivers && !selectedDriverIds.includes(driverId)) {
      onSelectionChange([...selectedDriverIds, driverId])
    }
  }

  const handleRemoveDriver = (driverId: number) => {
    if (selectedDriverIds.length > minDrivers) {
      onSelectionChange(selectedDriverIds.filter((id) => id !== driverId))
    }
  }

  const selectedDrivers = drivers.filter((d) => selectedDriverIds.includes(d.id))
  const canAddMore = selectedDriverIds.length < maxDrivers

  return (
    <div className="space-y-4">
      {/* Selected Drivers */}
      {selectedDrivers.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedDrivers.map((driver) => (
            <Badge
              key={driver.id}
              variant="primary"
              className="flex items-center gap-2 px-3 py-2"
            >
              <span>{driver.full_name}</span>
              {selectedDriverIds.length > minDrivers && (
                <button
                  onClick={() => handleRemoveDriver(driver.id)}
                  className="hover:text-red-600 transition-colors"
                  aria-label={`Remove ${driver.full_name}`}
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </Badge>
          ))}
        </div>
      )}

      {/* Add Driver Controls */}
      {canAddMore && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search drivers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>

          <Select
            value=""
            onChange={(e) => {
              const driverId = parseInt(e.target.value)
              if (driverId) {
                handleAddDriver(driverId)
                setSearchTerm('')
              }
            }}
            disabled={!canAddMore}
          >
            <option value="">
              {canAddMore
                ? `Select driver (${selectedDriverIds.length}/${maxDrivers})`
                : `Maximum ${maxDrivers} drivers selected`}
            </option>
            {filteredDrivers
              .filter((driver) => !selectedDriverIds.includes(driver.id))
              .map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.full_name} ({driver.code || 'N/A'})
                </option>
              ))}
          </Select>
        </div>
      )}

      {/* Help Text */}
      <p className="text-xs text-neutral-600">
        Select {minDrivers}-{maxDrivers} drivers to compare. Currently selected: {selectedDriverIds.length}
      </p>
    </div>
  )
}
