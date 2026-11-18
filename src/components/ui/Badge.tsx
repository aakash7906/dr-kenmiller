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
    teal: 'bg-[#E6F4F6] text-[#0A5C67] border border-[#CDEAEF]',
    blue: 'bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD]',
    amber: 'bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]',
    red: 'bg-[#FEE2E2] text-[#B91C1C] border border-[#FECACA]',
    gray: 'bg-slate-100 text-slate-700 border border-slate-200',
    navy: 'bg-[#EBF3FB] text-[#0F2B48] border border-[#CBDCF0]',
    emerald: 'bg-[#D1FAE5] text-[#065F46] border border-[#A7F3D0]'
  }

  const dotColors = {
    teal: 'bg-[#0A5C67]',
    blue: 'bg-[#0284C7]',
    amber: 'bg-[#D97706]',
    red: 'bg-[#DC2626]',
    gray: 'bg-slate-400',
    navy: 'bg-[#0F2B48]',
    emerald: 'bg-[#10B981]'
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
