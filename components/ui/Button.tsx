import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'warning' | 'info'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  icon?: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, icon, children, disabled, ...props }, ref) => {
    // Map outline/warning/info to existing button styles
    let effectiveVariant = variant
    if (variant === 'outline') effectiveVariant = 'secondary'
    if (variant === 'warning') effectiveVariant = 'danger'
    if (variant === 'info') effectiveVariant = 'primary'

    return (
      <button
        className={cn(
          'btn',
          {
            'btn-sm': size === 'sm',
            'btn-md': size === 'md',
            'btn-lg': size === 'lg',
            'btn-primary': effectiveVariant === 'primary',
            'btn-secondary': effectiveVariant === 'secondary',
            'btn-ghost': effectiveVariant === 'ghost',
            'btn-danger': effectiveVariant === 'danger',
          },
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {children}
          </>
        ) : (
          <>
            {icon && <span className="mr-2">{icon}</span>}
            {children}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
