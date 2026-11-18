import React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'emergency' | 'doctor' | 'subtle'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  fullWidth?: boolean
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth = false, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer'

    const sizeStyles = {
      sm: 'text-xs px-3 py-1.5 gap-1.5',
      md: 'text-sm px-4 py-2.5 gap-2',
      lg: 'text-base px-5 py-3 gap-2.5 font-semibold',
      icon: 'h-10 w-10 p-2'
    }

    const variantStyles = {
      primary: 'bg-patient-primary hover:bg-patient-primary-hover text-white shadow-sm focus:ring-[var(--patient-primary)]/40',
      secondary: 'bg-patient-secondary-light hover:bg-[var(--patient-secondary-border)] text-patient-secondary-text focus:ring-[var(--patient-secondary)]/30',
      outline: 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 focus:ring-slate-400/20 shadow-xs',
      ghost: 'bg-transparent hover:bg-slate-100 text-slate-700',
      emergency: 'bg-gradient-to-r from-patient-emergency to-patient-emergency-hover text-white shadow-md shadow-red-500/20 focus:ring-red-500/40 font-semibold',
      doctor: 'bg-doctor-primary hover:bg-doctor-primary-hover text-white shadow-sm focus:ring-[var(--doctor-primary)]/40',
      subtle: 'bg-patient-primary-subtle hover:bg-patient-primary-light text-patient-primary border border-patient-primary-border'
    }

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
