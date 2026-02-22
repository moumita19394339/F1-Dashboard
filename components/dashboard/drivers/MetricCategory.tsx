'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface Metric {
  label: string
  value: any
  icon?: React.ReactNode
  color?: string
  highlight?: boolean
}

interface MetricCategoryProps {
  title: string
  icon: React.ReactNode
  metrics: Metric[]
  defaultExpanded?: boolean
}

export function MetricCategory({
  title,
  icon,
  metrics,
  defaultExpanded = false,
}: MetricCategoryProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <div className="border border-neutral-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 bg-neutral-50 hover:bg-neutral-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-f1-red">{icon}</span>
          <h4 className="font-bold text-sm text-neutral-900">{title}</h4>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isExpanded && (
        <div className="p-3 bg-white">
          <div className="grid grid-cols-2 gap-3">
            {metrics.map((metric, index) => (
              <MetricRow key={index} {...metric} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

interface MetricRowProps {
  label: string
  value: any
  icon?: React.ReactNode
  color?: string
  highlight?: boolean
}

function MetricRow({ label, value, icon, color, highlight }: MetricRowProps) {
  // Format value - handle null/undefined
  const formattedValue =
    value === null || value === undefined
      ? '-'
      : typeof value === 'number'
        ? value.toLocaleString()
        : value

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1 mb-1">
        {icon && <span className="text-neutral-400 text-xs">{icon}</span>}
        <span className="text-xs text-neutral-500">{label}</span>
      </div>
      <div
        className={`text-base font-semibold ${
          highlight
            ? 'text-f1-red'
            : color
              ? `text-${color}`
              : 'text-neutral-900'
        }`}
      >
        {formattedValue}
      </div>
    </div>
  )
}
