/**
 * Driver Selector Component
 * Searchable dropdown for selecting drivers for comparison
 */

'use client'

import { Badge } from '@/components/ui/Badge'
import { SearchableSelect } from '@/components/ui/SearchableSelect'
type DriverValue = string | number | boolean | null | undefined;
interface Driver { id: number; driver_ref: string; first_name: string; last_name: string; full_name: string; nationality: string; wins: number; podiums: number; championships: number; career_points: number; is_active: boolean; [key: string]: DriverValue }
import { X } from 'lucide-react'

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
        <SearchableSelect
          options={drivers.map((driver) => ({
            value: driver.id,
            label: driver.full_name,
            subtitle: driver.code ? `Code: ${driver.code}` : undefined,
          }))}
          placeholder={
            canAddMore
              ? `Select driver (${selectedDriverIds.length}/${maxDrivers})`
              : `Maximum ${maxDrivers} drivers selected`
          }
          onSelect={(value) => {
            const driverId = typeof value === 'number' ? value : parseInt(value as string)
            if (driverId) {
              handleAddDriver(driverId)
            }
          }}
          disabled={!canAddMore}
        />
      )}

      {/* Help Text */}
      <p className="text-xs text-neutral-600">
        Select {minDrivers}-{maxDrivers} drivers to compare. Currently selected: {selectedDriverIds.length}
      </p>
    </div>
  )
}
