import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SelectOption {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
}

export interface SelectProps {
  value: string
  onChange: (value: string) => void
  options: (string | SelectOption)[]
  placeholder?: string
  className?: string
  triggerClassName?: string
  dropdownClassName?: string
  disabled?: boolean
  label?: string
  theme?: 'patient' | 'doctor'
}

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  className = '',
  triggerClassName = '',
  dropdownClassName = '',
  disabled = false,
  label,
  theme = 'patient'
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Normalize options to SelectOption objects
  const normalizedOptions: SelectOption[] = options.map((opt) => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt }
    }
    return opt
  })

  // Find currently selected option
  const selectedOption = normalizedOptions.find((opt) => opt.value === value)

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
      document.addEventListener('touchstart', handleOutsideClick)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const activeFocusRing =
    theme === 'doctor'
      ? 'focus:outline-none focus-visible:outline-none focus:ring-1.5 focus:ring-doctor-primary focus:border-doctor-primary'
      : 'focus:outline-none focus-visible:outline-none focus:ring-1.5 focus:ring-patient-primary focus:border-patient-primary'

  const activeOptionBg =
    theme === 'doctor'
      ? 'bg-doctor-primary-light/60 text-doctor-primary font-bold'
      : 'bg-patient-primary-light/60 text-patient-primary font-bold'

  return (
    <div className={cn('relative w-full text-left select-none', className)} ref={containerRef}>
      {label && (
        <label className="text-xs font-bold text-slate-700 block mb-1.5">{label}</label>
      )}

      {/* Trigger Button (Shadcn style with standard thickness) */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        className={cn(
          'w-full bg-slate-50/80 hover:bg-slate-100/70 border border-slate-200/90 rounded-xl px-3 py-2 text-xs text-slate-800 transition-all flex items-center justify-between gap-2 shadow-2xs cursor-pointer outline-none focus:outline-none focus-visible:outline-none',
          isOpen && 'border-slate-400 ring-1 ring-slate-200 bg-white',
          disabled && 'opacity-60 cursor-not-allowed',
          activeFocusRing,
          triggerClassName
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate flex items-center gap-2">
          {selectedOption?.icon}
          <span className={cn('font-medium', !selectedOption && 'text-slate-400 font-normal')}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </span>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180 text-slate-700'
          )}
        />
      </button>

      {/* Floating Dropdown Menu (Shadcn style) */}
      {isOpen && (
        <div
          role="listbox"
          className={cn(
            'absolute z-50 mt-1.5 w-full bg-white rounded-xl border border-slate-200 shadow-xl shadow-slate-900/10 p-1.5 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150 max-h-60 overflow-y-auto',
            dropdownClassName
          )}
        >
          {normalizedOptions.map((option) => {
            const isSelected = option.value === value

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={cn(
                  'w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer group',
                  isSelected
                    ? activeOptionBg
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                )}
              >
                <div className="flex items-center gap-2 min-w-0">
                  {option.icon}
                  <div className="min-w-0">
                    <p className="truncate">{option.label}</p>
                    {option.description && (
                      <p className="text-[10px] text-slate-400 font-normal truncate">
                        {option.description}
                      </p>
                    )}
                  </div>
                </div>

                {isSelected && (
                  <Check
                    className={cn(
                      'w-3.5 h-3.5 shrink-0',
                      theme === 'doctor' ? 'text-doctor-primary' : 'text-patient-primary'
                    )}
                  />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

// Re-export alias as DropdownMenu for flexibility
export const DropdownMenu = Select
export default Select
