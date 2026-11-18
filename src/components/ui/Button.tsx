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
      primary: 'bg-[#0A5C67] hover:bg-[#084952] text-white shadow-sm focus:ring-[#0A5C67]/40',
      secondary: 'bg-[#E0F2FE] hover:bg-[#BAE6FD] text-[#0369A1] focus:ring-[#0284C7]/30',
      outline: 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 focus:ring-slate-400/20 shadow-xs',
      ghost: 'bg-transparent hover:bg-slate-100 text-slate-700',
      emergency: 'bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white shadow-md shadow-red-500/20 focus:ring-red-500/40 font-semibold',
      doctor: 'bg-[#0F2B48] hover:bg-[#0A1F36] text-white shadow-sm focus:ring-[#0F2B48]/40',
      subtle: 'bg-[#F0F8F9] hover:bg-[#E2F2F5] text-[#0A5C67] border border-[#D1EAEF]'
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
