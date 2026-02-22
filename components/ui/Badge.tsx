import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    // Map 'danger' to 'error' for backward compatibility
    const effectiveVariant = variant === 'danger' ? 'error' : variant
    // Map 'outline' to 'default' for backward compatibility
    const finalVariant = effectiveVariant === 'outline' ? 'default' : effectiveVariant

    return (
      <div
        ref={ref}
        className={cn(
          'badge',
          {
            'badge-default': finalVariant === 'default',
            'badge-primary': finalVariant === 'primary',
            'badge-success': finalVariant === 'success',
            'badge-warning': finalVariant === 'warning',
            'badge-error': finalVariant === 'error',
            'text-xs': size === 'sm',
            'text-sm': size === 'md',
            'text-base': size === 'lg',
          },
          className
        )}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }
