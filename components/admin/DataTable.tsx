/**
 * Data Table Component
 *
 * A reusable table component with sorting and pagination support.
 */

'use client'

import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

export type Column<T> = {
  key: string
  header: string
  render?: (item: T) => React.ReactNode
  sortable?: boolean
  className?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyField: string
  onRowClick?: (item: T) => void
  emptyMessage?: string
  isLoading?: boolean
}

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  keyField,
  onRowClick,
  emptyMessage = 'No data available',
  isLoading = false,
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSort = (columnKey: string) => {
    const column = columns.find((c) => c.key === columnKey)
    if (!column?.sortable) return

    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(columnKey)
      setSortDirection('asc')
    }
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0

    const aValue = a[sortColumn]
    const bValue = b[sortColumn]

    if (aValue === undefined || bValue === undefined) return 0
    if (aValue === bValue) return 0

    let comparison = 0
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      comparison = aValue.localeCompare(bValue)
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      comparison = aValue - bValue
    } else {
      comparison = String(aValue).localeCompare(String(bValue))
    }

    return sortDirection === 'asc' ? comparison : -comparison
  })

  if (isLoading) {
    return (
      <div className="card overflow-hidden">
        <div className="p-8 text-center text-gray-400">Loading...</div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="card overflow-hidden">
        <div className="p-8 text-center text-gray-400">{emptyMessage}</div>
      </div>
    )
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`
                    px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider
                    ${column.sortable ? 'cursor-pointer hover:text-white' : ''}
                    ${column.className || ''}
                  `}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.sortable && sortColumn === column.key && (
                      sortDirection === 'asc' ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {sortedData.map((item) => (
              <tr
                key={String(item[keyField])}
                className={`
                  ${onRowClick ? 'cursor-pointer hover:bg-f1-dark/50' : ''}
                  transition-colors
                `}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-300 ${column.className || ''}`}
                  >
                    {column.render ? column.render(item) : String(item[column.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
