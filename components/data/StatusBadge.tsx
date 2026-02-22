'use client'

import { Badge } from '@/components/ui'
import { CheckCircle2, XCircle, Clock, Pause } from 'lucide-react'
import { cn } from '@/lib/utils'

export type Status = 'active' | 'inactive' | 'pending' | 'success' | 'error' | 'warning'

export interface StatusBadgeProps {
  status: Status
  label?: string
  showIcon?: boolean
  className?: string
}

const statusConfig: Record<
  Status,
  { variant: 'default' | 'primary' | 'success' | 'warning' | 'error'; icon: any; defaultLabel: string }
> = {
  active: { variant: 'success', icon: CheckCircle2, defaultLabel: 'Active' },
  inactive: { variant: 'default', icon: XCircle, defaultLabel: 'Inactive' },
  pending: { variant: 'warning', icon: Clock, defaultLabel: 'Pending' },
  success: { variant: 'success', icon: CheckCircle2, defaultLabel: 'Success' },
  error: { variant: 'error', icon: XCircle, defaultLabel: 'Error' },
  warning: { variant: 'warning', icon: Pause, defaultLabel: 'Warning' },
}

export function StatusBadge({ status, label, showIcon = false, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon
  const displayLabel = label || config.defaultLabel

  return (
    <Badge variant={config.variant} className={cn('gap-1.5', className)}>
      {showIcon && <Icon className="h-3 w-3" />}
      {displayLabel}
    </Badge>
  )
}

// Specialized status badges for specific use cases
export function RaceStatusBadge({ status, className }: { status: string; className?: string }) {
  const statusMap: Record<string, Status> = {
    Finished: 'success',
    DNF: 'error',
    DNS: 'error',
    Retired: 'error',
    Withdrawn: 'error',
    Disqualified: 'error',
    '+1 Lap': 'warning',
    '+2 Laps': 'warning',
    '+3 Laps': 'error',
  }

  const badgeStatus = statusMap[status] || 'warning'
  return <StatusBadge status={badgeStatus} label={status} className={className} />
}

export function DriverStatusBadge({
  isActive,
  className,
}: {
  isActive: boolean
  className?: string
}) {
  return <StatusBadge status={isActive ? 'active' : 'inactive'} className={className} />
}
