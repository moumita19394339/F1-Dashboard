'use client'

import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-4', className)}>
      {Icon && (
        <div className="rounded-full bg-neutral-100 p-4 mb-4">
          <Icon className="h-8 w-8 text-neutral-400" />
        </div>
      )}
      <h3 className="text-base font-semibold text-neutral-900">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-neutral-500 text-center max-w-sm">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 inline-flex items-center justify-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}

// Specialized empty states for common scenarios
export function NoDataEmptyState({ message = 'No data found' }: { message?: string }) {
  return (
    <EmptyState
      title={message}
      description="There are no items to display at this time."
    />
  )
}

export function SearchEmptyState({ query }: { query: string }) {
  return (
    <EmptyState
      title="No results found"
      description={`We couldn't find anything matching "${query}". Try checking your spelling or using different keywords.`}
    />
  )
}

export function ErrorEmptyState({ onRetry }: { onRetry: () => void }) {
  return (
    <EmptyState
      title="Something went wrong"
      description="We encountered an error while loading your data. Please try again."
      action={{
        label: 'Try again',
        onClick: onRetry,
      }}
    />
  )
}

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative h-12 w-12">
        <div className="absolute top-0 left-0 h-full w-full rounded-full border-4 border-neutral-200" />
        <div className="absolute top-0 left-0 h-full w-full rounded-full border-4 border-t-primary-600 animate-spin" />
      </div>
      <p className="mt-4 text-sm text-neutral-500">Loading...</p>
    </div>
  )
}
