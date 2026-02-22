'use client'

import { HTMLAttributes, ReactNode, useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  content: ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}

export function Tooltip({ children, content, placement = 'top', delay = 200, className }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
    }, delay)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsVisible(false)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const placementClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            'absolute z-tooltip whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-xs text-white animate-fade-in',
            placementClasses[placement],
            className
          )}
        >
          {content}
          <div
            className={cn(
              'absolute h-2 w-2 rotate-45 bg-neutral-900',
              {
                'top-full left-1/2 -translate-x-1/2 -mt-1': placement === 'top',
                'bottom-full left-1/2 -translate-x-1/2 -mb-1': placement === 'bottom',
                'right-full top-1/2 -translate-y-1/2 -mr-1': placement === 'left',
                'left-full top-1/2 -translate-y-1/2 -ml-1': placement === 'right',
              }
            )}
          />
        </div>
      )}
    </div>
  )
}
