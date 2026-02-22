import { SelectHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, error, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            'select',
            error && 'input-error',
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        {error && (
          <p className="mt-1 text-xs text-error-600">{error}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

export { Select }
