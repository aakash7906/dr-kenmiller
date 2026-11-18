import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Check } from 'lucide-react'

export interface CalendarProps {
  selectedDate?: Date
  onSelectDate?: (date: Date) => void
  minDate?: Date
  maxDate?: Date
  highlightDates?: Date[]
  className?: string
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export const Calendar: React.FC<CalendarProps> = ({
  selectedDate: initialSelected = new Date(2024, 10, 15), // Nov 15, 2024
  onSelectDate,
  minDate,
  maxDate,
  highlightDates = [new Date(2024, 10, 15)],
  className = ''
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(initialSelected)
  const [viewMonth, setViewMonth] = useState<number>(initialSelected.getMonth())
  const [viewYear, setViewYear] = useState<number>(initialSelected.getFullYear())

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear((prev) => prev - 1)
    } else {
      setViewMonth((prev) => prev - 1)
    }
  }

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear((prev) => prev + 1)
    } else {
      setViewMonth((prev) => prev + 1)
    }
  }

  const handleSelectDay = (day: number) => {
    const newDate = new Date(viewYear, viewMonth, day)
    setSelectedDate(newDate)
    if (onSelectDate) {
      onSelectDate(newDate)
    }
  }

  // Calculate day grid
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate()

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    )
  }

  const isToday = (day: number) => {
    const today = new Date(2024, 10, 15) // sync with mock today
    return (
      today.getFullYear() === viewYear &&
      today.getMonth() === viewMonth &&
      today.getDate() === day
    )
  }

  const isHighlighted = (day: number) => {
    const d = new Date(viewYear, viewMonth, day)
    return highlightDates.some((h) => isSameDay(h, d))
  }

  return (
    <div className={`w-full max-w-sm mx-auto bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-4 shadow-2xs select-none ${className}`}>
      {/* Month & Year Navigation Header */}
      <div className="flex items-center justify-between px-1 mb-3">
        <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
          <CalendarIcon className="w-4 h-4 text-patient-primary" />
          <span>{MONTH_NAMES[viewMonth]} {viewYear}</span>
        </h3>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="w-7 h-7 rounded-lg border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors cursor-pointer active:scale-95"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className="w-7 h-7 rounded-lg border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors cursor-pointer active:scale-95"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday Labels Grid */}
      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {WEEKDAYS.map((day) => (
          <span
            key={day}
            className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase py-1"
          >
            {day}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {/* Previous Month Filler Days */}
        {Array.from({ length: firstDayOfWeek }).map((_, index) => {
          const prevMonthDay = daysInPrevMonth - firstDayOfWeek + index + 1
          return (
            <div
              key={`prev-${index}`}
              className="h-8 sm:h-9 flex items-center justify-center text-[11px] text-slate-300 font-medium"
            >
              {prevMonthDay}
            </div>
          )
        })}

        {/* Current Month Active Days */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1
          const thisDate = new Date(viewYear, viewMonth, day)
          const isSelected = isSameDay(selectedDate, thisDate)
          const isClinicClosed = thisDate.getDay() === 0 // Sunday closed
          const hasVisit = isHighlighted(day)

          return (
            <button
              key={`day-${day}`}
              type="button"
              disabled={isClinicClosed}
              onClick={() => handleSelectDay(day)}
              className={`h-8 sm:h-9 rounded-xl text-xs font-semibold relative flex flex-col items-center justify-center transition-all cursor-pointer ${
                isSelected
                  ? 'bg-patient-primary text-white font-bold shadow-xs scale-103'
                  : isClinicClosed
                  ? 'text-slate-300 cursor-not-allowed'
                  : isToday(day)
                  ? 'border border-patient-primary text-patient-primary font-bold hover:bg-patient-primary-light'
                  : 'text-slate-700 hover:bg-slate-100 active:scale-95'
              }`}
            >
              <span>{day}</span>

              {/* Event / Appointment Indicator Dot */}
              {hasVisit && !isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-patient-primary absolute bottom-1" />
              )}
            </button>
          )
        })}

        {/* Next Month Filler Days to complete the 7-column grid */}
        {Array.from({ length: (7 - ((firstDayOfWeek + daysInMonth) % 7)) % 7 }).map((_, index) => (
          <div
            key={`next-${index}`}
            className="h-8 sm:h-9 flex items-center justify-center text-[11px] text-slate-300 font-medium"
          >
            {index + 1}
          </div>
        ))}
      </div>

      {/* Legend & Selected Date Indicator */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-patient-primary" />
          <span>Scheduled Visit</span>
        </div>
        <span className="font-semibold text-slate-700">
          {MONTH_NAMES[selectedDate.getMonth()].slice(0, 3)} {selectedDate.getDate()}, {selectedDate.getFullYear()}
        </span>
      </div>
    </div>
  )
}
