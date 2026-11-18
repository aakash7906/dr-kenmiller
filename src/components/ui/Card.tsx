import React from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'subtle' | 'emergency' | 'doctor'
  interactive?: boolean
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', interactive = false, children, ...props }, ref) => {
    const variants = {
      default: 'bg-white border border-slate-100 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] rounded-2xl',
      elevated: 'bg-white border border-slate-100 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.08)] rounded-2xl',
      subtle: 'bg-[#F0F8F9] border border-[#E0F0F2] rounded-2xl',
      emergency: 'bg-gradient-to-br from-[#991B1B] to-[#7F1D1D] text-white rounded-2xl shadow-lg shadow-red-900/20',
      doctor: 'bg-white border border-slate-200 shadow-sm rounded-xl'
    }

    return (
      <div
        ref={ref}
        className={cn(
          variants[variant],
          interactive && 'transition-all duration-150 hover:shadow-md hover:border-slate-300 cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
