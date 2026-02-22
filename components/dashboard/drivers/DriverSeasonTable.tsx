/**
 * Driver Season Table Component
 * Displays season-by-season performance breakdown
 */

'use client'

import { Table } from '@/components/data/Table'
import type { DriverSeasonData } from '@/lib/api'

interface DriverSeasonTableProps {
  data: DriverSeasonData[]
}

export function DriverSeasonTable({ data }: DriverSeasonTableProps) {
  // Sort by year descending
  const sortedData = [...data].sort((a, b) => b.year - a.year)

  const columns = [
    {
      id: 'year',
      header: 'Season',
      sortable: true,
      cell: (row: DriverSeasonData) => row.year,
    },
    {
      id: 'team',
      header: 'Team',
      sortable: true,
      cell: (row: DriverSeasonData) => row.team || row.team_name || '-',
    },
    {
      id: 'races',
      header: 'Races',
      sortable: true,
      cell: (row: DriverSeasonData) => row.races,
    },
    {
      id: 'wins',
      header: 'Wins',
      sortable: true,
      cell: (row: DriverSeasonData) => row.wins,
    },
    {
      id: 'podiums',
      header: 'Podiums',
      sortable: true,
      cell: (row: DriverSeasonData) => row.podiums,
    },
    {
      id: 'pole_positions',
      header: 'Poles',
      sortable: true,
      cell: (row: DriverSeasonData) => row.pole_positions || 0,
    },
    {
      id: 'fastest_laps',
      header: 'Fastest Laps',
      sortable: true,
      cell: (row: DriverSeasonData) => row.fastest_laps || 0,
    },
    {
      id: 'points',
      header: 'Points',
      sortable: true,
      cell: (row: DriverSeasonData) => row.points?.toFixed(1) || '0.0',
    },
    {
      id: 'position',
      header: 'Position',
      sortable: true,
      cell: (row: DriverSeasonData) => row.position || '-',
    },
  ]

  return (
    <div className="overflow-x-auto">
      <Table
        data={sortedData}
        columns={columns}
        keyField="year"
        emptyState={<div className="text-neutral-500">No season data available</div>}
      />
    </div>
  )
}
