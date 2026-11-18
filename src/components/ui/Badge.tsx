import React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'teal' | 'blue' | 'amber' | 'red' | 'gray' | 'navy' | 'emerald'
  size?: 'sm' | 'md'
  dot?: boolean
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'teal',
  size = 'md',
  dot = false,
  children,
  ...props
}) => {
  const variants = {
    teal: 'bg-patient-primary-light text-patient-primary border border-patient-primary-border',
    blue: 'bg-patient-secondary-light text-patient-secondary-text border border-patient-secondary-border',
    amber: 'bg-patient-gold-light text-patient-gold-text border border-patient-gold-border',
    red: 'bg-patient-emergency-light text-patient-emergency-hover border border-patient-emergency-border',
    gray: 'bg-slate-100 text-slate-700 border border-slate-200',
    navy: 'bg-doctor-primary-light text-doctor-primary border border-doctor-primary-border',
    emerald: 'bg-doctor-active-light text-doctor-active-text border border-doctor-active-border'
  }

  const dotColors = {
    teal: 'bg-patient-primary',
    blue: 'bg-patient-secondary',
    amber: 'bg-patient-gold',
    red: 'bg-patient-emergency',
    gray: 'bg-slate-400',
    navy: 'bg-doctor-primary',
    emerald: 'bg-doctor-active'
  }

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 rounded-full font-medium',
    md: 'text-xs px-2.5 py-1 rounded-full font-medium'
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 transition-colors',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full animate-pulse', dotColors[variant])} />}
      {children}
    </span>
  )
}
