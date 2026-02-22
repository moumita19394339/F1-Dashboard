'use client'

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems?: number
  itemsPerPage?: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  className,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const showEllipsis = totalPages > 7

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
      }
    }

    return pages
  }

  if (totalPages <= 1) return null

  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div className="flex items-center gap-2">
        <span className="text-sm text-neutral-500">
          {totalItems !== undefined && itemsPerPage !== undefined
            ? `Showing ${Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}-${Math.min(
                currentPage * itemsPerPage,
                totalItems
              )} of ${totalItems}`
            : `Page ${currentPage} of ${totalPages}`}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={cn(
            'p-2 rounded-md transition-colors',
            'hover:bg-neutral-100',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent'
          )}
          aria-label="First page"
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            'p-2 rounded-md transition-colors',
            'hover:bg-neutral-100',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent'
          )}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => {
            if (typeof page === 'string') {
              return (
                <span key={index} className="px-2 text-neutral-400">
                  ...
                </span>
              )
            }

            return (
              <button
                key={index}
                onClick={() => onPageChange(page)}
                className={cn(
                  'min-w-[2.25rem] h-9 px-3 rounded-md text-sm font-medium transition-colors',
                  currentPage === page
                    ? 'bg-primary-600 text-white'
                    : 'text-neutral-700 hover:bg-neutral-100'
                )}
              >
                {page}
              </button>
            )
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            'p-2 rounded-md transition-colors',
            'hover:bg-neutral-100',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent'
          )}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={cn(
            'p-2 rounded-md transition-colors',
            'hover:bg-neutral-100',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent'
          )}
          aria-label="Last page"
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
