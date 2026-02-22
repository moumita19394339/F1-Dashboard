import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string | number
  height?: string | number
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, width, height, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('skeleton', className)}
        style={{ width, height }}
        {...props}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'

export { Skeleton }
