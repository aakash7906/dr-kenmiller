import React, { useState, useMemo } from 'react'
import {
  CalendarDays,
  Clock,
  UserCheck,
  Plus,
  AlertCircle,
  CheckCircle2,
  Filter,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Activity,
  Stethoscope,
  AlertTriangle,
  RotateCcw,
  Check,
  User
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { Select } from '@/components/ui/Select'
import { CLINIC_DOCTORS } from '@/data/mockData'

interface ScheduleSlot {
  id: string
  time: string
  dateStr: string // YYYY-MM-DD
  patientName: string
  chartNumber: string
  provider: string
  operatory: string
  procedure: string
  status: 'seated' | 'upcoming' | 'completed' | 'buffer'
  notes?: string
  alerts?: string
}

// Helper to format date as YYYY-MM-DD
const formatDateKey = (date: Date): string => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const isSameDay = (d1: Date, d2: Date): boolean => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}

// Clinician active shift schedule by day of week (0 = Sun, 1 = Mon ... 6 = Sat)
const CLINICIAN_SHIFTS: Record<string, { days: number[]; room: string; role: string }> = {
  'Dr. Ken Miller': { days: [1, 2, 3, 4, 5], room: 'Operatory 1 & 2', role: 'Lead Dental Surgeon (Surgical & CEREC)' },
  'Dr. Julie Miller': { days: [1, 2, 3, 4], room: 'Operatory 2', role: 'Associate General Dentist (Restorative)' },
  'Dr. Viktoria Kirsten': { days: [2, 3, 4, 5], room: 'Operatory 3', role: 'Associate Dentist (Perio & Laser)' },
  'Dr. Austin Chomay': { days: [1, 3, 5, 6], room: 'Operatory 4', role: 'Associate Dentist (Endo & Trauma)' },
  'Lisa (RDH)': { days: [1, 2, 3, 4, 5], room: 'Hygiene Bay A', role: 'Senior Dental Hygienist' },
  'Elena (RDH)': { days: [1, 2, 4], room: 'Hygiene Bay B', role: 'Registered Dental Hygienist' }
}

export const DoctorSchedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [weekOffset, setWeekOffset] = useState<number>(0)
  const [providerFilter, setProviderFilter] = useState<string>('All')
  const [showAddBufferModal, setShowAddBufferModal] = useState(false)
  const [showMonthPicker, setShowMonthPicker] = useState(false)
  const [selectedOperatory, setSelectedOperatory] = useState('Operatory 1 (Dr. Ken Miller)')
  const [bufferDuration, setBufferDuration] = useState('30 mins')

  // Generate 7 days of the current viewed week (Monday to Sunday)
  const weekDays = useMemo(() => {
    const today = new Date()
    const currentDay = today.getDay() // 0 is Sunday
    // Calculate Monday of the week
    const distanceToMonday = currentDay === 0 ? -6 : 1 - currentDay
    const monday = new Date(today)
    monday.setDate(today.getDate() + distanceToMonday + weekOffset * 7)

    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(monday)
      d.setDate(monday.getDate() + i)
      return d
    })
  }, [weekOffset])

  // Initial schedule appointments for current dates
  const todayKey = formatDateKey(new Date())
  const [scheduleList, setScheduleList] = useState<ScheduleSlot[]>([
    {
      id: 'sc-1',
      dateStr: todayKey,
      time: '8:45 AM – 9:30 AM',
      patientName: 'Robert Gagne',
      chartNumber: 'KM-5102',
      provider: 'Dr. Ken Miller',
      operatory: 'Operatory 1',
      procedure: 'Post-Op Suture Removal 30',
      status: 'completed'
    },
    {
      id: 'sc-2',
      dateStr: todayKey,
      time: '9:45 AM – 10:30 AM',
      patientName: 'David Chen',
      chartNumber: 'KM-7244',
      provider: 'Lisa (RDH)',
      operatory: 'Hygiene Bay A',
      procedure: 'Periodontal Prophylaxis & Scaling',
      status: 'seated'
    },
    {
      id: 'sc-3',
      dateStr: todayKey,
      time: '10:00 AM – 10:45 AM',
      patientName: 'Sarah Tremblay',
      chartNumber: 'KM-6421',
      provider: 'Dr. Ken Miller',
      operatory: 'Operatory 1',
      procedure: 'Implant Stage 2 Abutment Seating & Bitewings',
      status: 'seated',
      notes: 'Penicillin allergy noted. Patient arrived and checked in.',
      alerts: 'Penicillin Allergy'
    },
    {
      id: 'sc-4',
      dateStr: todayKey,
      time: '10:45 AM – 11:30 AM',
      patientName: 'Marcus Vance',
      chartNumber: 'KM-5819',
      provider: 'Dr. Ken Miller',
      operatory: 'Operatory 2',
      procedure: 'Crown Prep & Temp Placement 14',
      status: 'upcoming'
    },
    {
      id: 'sc-5',
      dateStr: todayKey,
      time: '11:30 AM – 12:00 PM',
      patientName: 'Emergency Triage Buffer',
      chartNumber: 'TRIAGE',
      provider: 'Dr. Ken Miller',
      operatory: 'Operatory 1',
      procedure: 'Reserved for Incoming Dental Trauma (Liam O’Connor)',
      status: 'buffer',
      notes: 'Trauma protocol active on Chair 1.'
    },
    {
      id: 'sc-6',
      dateStr: todayKey,
      time: '1:15 PM – 2:00 PM',
      patientName: 'Grace Miller',
      chartNumber: 'KM-6912',
      provider: 'Elena (RDH)',
      operatory: 'Hygiene Bay B',
      procedure: 'Pediatric Exam & Fluoride Varnish',
      status: 'upcoming'
    },
    {
      id: 'sc-7',
      dateStr: todayKey,
      time: '2:15 PM – 3:15 PM',
      patientName: 'Ronald Bouchard',
      chartNumber: 'KM-4902',
      provider: 'Dr. Ken Miller',
      operatory: 'Operatory 1',
      procedure: '3-Unit Bridge Try-In & Occlusal Balance',
      status: 'upcoming'
    },
    {
      id: 'sc-8',
      dateStr: todayKey,
      time: '11:15 AM – 12:00 PM',
      patientName: 'David Chen',
      chartNumber: 'KM-7244',
      provider: 'Dr. Julie Miller',
      operatory: 'Operatory 2',
      procedure: 'CEREC Tessera CAD Onlay #30',
      status: 'upcoming'
    },
    {
      id: 'sc-9',
      dateStr: todayKey,
      time: '1:00 PM – 1:45 PM',
      patientName: 'Bernice Campbell',
      chartNumber: 'KM-4190',
      provider: 'Dr. Viktoria Kirsten',
      operatory: 'Operatory 3',
      procedure: 'Hard Tissue Laser Debridement & Thermal Check #31',
      status: 'upcoming'
    },
    {
      id: 'sc-10',
      dateStr: todayKey,
      time: '11:30 AM – 12:30 PM',
      patientName: "Liam O'Connor",
      chartNumber: 'KM-8109',
      provider: 'Dr. Austin Chomay',
      operatory: 'Operatory 4',
      procedure: 'Urgent Trauma Stabilization & Wire Splint #8',
      status: 'seated',
      alerts: 'Acute Dental Trauma'
    }
  ])

  // Selected date key
  const selectedDateKey = formatDateKey(selectedDate)
  const isSelectedDateToday = isSameDay(selectedDate, new Date())

  // Generate dynamic appointments for non-today dates so schedule is fully interactive
  const currentDaySlots = useMemo(() => {
    const dayOfWeek = selectedDate.getDay()

    // If it's today, return the interactive state schedule
    if (isSelectedDateToday) {
      return scheduleList.filter(s => s.dateStr === todayKey)
    }

    // Sunday (Clinic Closed)
    if (dayOfWeek === 0) {
      return []
    }

    // Saturday (Limited emergency / recall appointments)
    if (dayOfWeek === 6) {
      return [
        {
          id: `sat-1`,
          dateStr: selectedDateKey,
          time: '9:00 AM – 10:00 AM',
          patientName: 'Austin Tremblay',
          chartNumber: 'KM-3910',
          provider: 'Dr. Austin Chomay',
          operatory: 'Operatory 4',
          procedure: 'Emergency Tooth Ache Assessment & Radiograph',
          status: 'upcoming' as const
        },
        {
          id: `sat-2`,
          dateStr: selectedDateKey,
          time: '10:15 AM – 11:30 AM',
          patientName: 'Clara Jenkins',
          chartNumber: 'KM-4481',
          provider: 'Dr. Austin Chomay',
          operatory: 'Operatory 4',
          procedure: 'Endodontic Pulpectomy & Temp Seal #19',
          status: 'upcoming' as const
        }
      ]
    }

    // Other weekdays: realistic clinical schedule for that date
    return [
      {
        id: `dyn-1-${selectedDateKey}`,
        dateStr: selectedDateKey,
        time: '8:45 AM – 9:30 AM',
        patientName: 'Emma Watson',
        chartNumber: 'KM-5512',
        provider: 'Dr. Ken Miller',
        operatory: 'Operatory 1',
        procedure: 'Comprehensive Exam & Full Mouth Bitewings',
        status: 'upcoming' as const
      },
      {
        id: `dyn-2-${selectedDateKey}`,
        dateStr: selectedDateKey,
        time: '9:30 AM – 10:30 AM',
        patientName: 'Robert Gagne',
        chartNumber: 'KM-5102',
        provider: 'Lisa (RDH)',
        operatory: 'Hygiene Bay A',
        procedure: 'Periodontal Recall & Fluoride Therapy',
        status: 'upcoming' as const
      },
      {
        id: `dyn-3-${selectedDateKey}`,
        dateStr: selectedDateKey,
        time: '10:00 AM – 11:15 AM',
        patientName: 'Marcus Vance',
        chartNumber: 'KM-5819',
        provider: 'Dr. Julie Miller',
        operatory: 'Operatory 2',
        procedure: 'CEREC Monolithic Crown Seating #14',
        status: 'upcoming' as const
      },
      {
        id: `dyn-4-${selectedDateKey}`,
        dateStr: selectedDateKey,
        time: '11:30 AM – 12:00 PM',
        patientName: 'Emergency Triage Buffer',
        chartNumber: 'TRIAGE',
        provider: 'Dr. Ken Miller',
        operatory: 'Operatory 1',
        procedure: 'Reserved Operatory Window for Walk-In Trauma',
        status: 'buffer' as const
      },
      {
        id: `dyn-5-${selectedDateKey}`,
        dateStr: selectedDateKey,
        time: '1:15 PM – 2:30 PM',
        patientName: 'Bernice Campbell',
        chartNumber: 'KM-4190',
        provider: 'Dr. Viktoria Kirsten',
        operatory: 'Operatory 3',
        procedure: 'Diode Laser Gingivectomy & Soft Tissue Biopsy',
        status: 'upcoming' as const
      },
      {
        id: `dyn-6-${selectedDateKey}`,
        dateStr: selectedDateKey,
        time: '2:45 PM – 3:45 PM',
        patientName: 'Ronald Bouchard',
        chartNumber: 'KM-4902',
        provider: 'Dr. Austin Chomay',
        operatory: 'Operatory 4',
        procedure: 'Composite Restoration Surfaces MOD #19',
        status: 'upcoming' as const
      }
    ]
  }, [selectedDate, isSelectedDateToday, scheduleList, todayKey, selectedDateKey])

  // Filter slots by provider
  const filteredSlots = useMemo(() => {
    if (providerFilter === 'All') return currentDaySlots
    return currentDaySlots.filter(s => s.provider.includes(providerFilter))
  }, [currentDaySlots, providerFilter])

  // Active / Present clinician roster calculations for the selected date
  const selectedDayOfWeek = selectedDate.getDay()
  const cliniciansRoster = useMemo(() => {
    return Object.entries(CLINICIAN_SHIFTS).map(([name, config]) => {
      const isPresent = config.days.includes(selectedDayOfWeek)
      const count = currentDaySlots.filter(s => s.provider.includes(name)).length

      return {
        name,
        isPresent,
        room: config.room,
        role: config.role,
        appointmentCount: count
      }
    })
  }, [selectedDayOfWeek, currentDaySlots])

  // Handlers for slot actions
  const markSlotCompleted = (id: string) => {
    setScheduleList(prev => prev.map(item => item.id === id ? { ...item, status: 'completed' } : item))
  }

  const markSlotSeated = (id: string) => {
    setScheduleList(prev => prev.map(item => item.id === id ? { ...item, status: 'seated' } : item))
  }

  // Jump to today
  const handleJumpToToday = () => {
    setSelectedDate(new Date())
    setWeekOffset(0)
  }

  return (
    <div className="space-y-6 pb-28 pt-2">
      {/* 1. Schedule Header - Kept EXACTLY as original */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-doctor-primary tracking-tight">
            Daily Schedule
          </h2>
        </div>

        <button
          onClick={() => setShowAddBufferModal(true)}
          className="shrink-0 bg-doctor-primary hover:bg-doctor-primary-hover text-white text-xs font-bold py-2 px-3 sm:py-2.5 sm:px-3.5 rounded-xl flex items-center gap-1.5 shadow-2xs cursor-pointer active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Insert Buffer</span>
        </button>
      </div>

      {/* 2. Google Calendar Style Date Navigation Strip */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
        {/* Top Controls: Month Display, Week Step, and Today Button */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-xl transition-all">
              <CalendarIcon className="w-4 h-4 text-doctor-primary" />
              <span className="text-xs sm:text-sm font-black text-slate-800">
                {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </div>

            {/* Jump to Today Button */}
            {!isSelectedDateToday && (
              <button
                onClick={handleJumpToToday}
                className="text-xs font-bold text-doctor-primary bg-blue-50 hover:bg-blue-100/80 border border-blue-200 px-2.5 py-1.5 rounded-xl flex items-center gap-1 transition-all cursor-pointer active:scale-98"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Today</span>
              </button>
            )}
          </div>

          {/* Week Prev / Next Nav */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setWeekOffset(prev => prev - 1)}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
              title="Previous Week"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setWeekOffset(0)}
              className="px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Current Week
            </button>
            <button
              onClick={() => setWeekOffset(prev => prev + 1)}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
              title="Next Week"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 7-Day Week Strip (Google Calendar Style) */}
        <div className="grid grid-cols-7 gap-1.5 text-center select-none pt-1">
          {weekDays.map((day, idx) => {
            const isSelected = isSameDay(day, selectedDate)
            const isToday = isSameDay(day, new Date())
            const isSunday = day.getDay() === 0
            const dayNum = day.getDate()
            const dayName = day.toLocaleDateString('en-US', { weekday: 'short' })

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedDate(day)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-doctor-primary text-white shadow-xs scale-102 font-black'
                    : isToday
                    ? 'bg-blue-50 text-doctor-primary border-2 border-doctor-primary/40 hover:bg-blue-100/50'
                    : isSunday
                    ? 'bg-slate-50 text-slate-300 hover:bg-slate-100/70 border border-dashed border-slate-200'
                    : 'bg-slate-50/70 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                }`}
              >
                {/* Day name abbreviation (e.g. Mon, Tue) */}
                <span
                  className={`text-[10px] uppercase font-bold tracking-wider ${
                    isSelected ? 'text-white/80' : isToday ? 'text-doctor-primary' : 'text-slate-400'
                  }`}
                >
                  {dayName}
                </span>

                {/* Day number (e.g. 19) */}
                <span className="text-sm sm:text-base font-black my-0.5">
                  {dayNum}
                </span>

                {/* Status indicator dots */}
                <div className="flex items-center gap-0.5 h-1.5">
                  {!isSunday ? (
                    <>
                      <span
                        className={`w-1 h-1 rounded-full ${
                          isSelected ? 'bg-white' : 'bg-emerald-500'
                        }`}
                      />
                      {day.getDay() % 2 === 1 && (
                        <span
                          className={`w-1 h-1 rounded-full ${
                            isSelected ? 'bg-white/70' : 'bg-blue-500'
                          }`}
                        />
                      )}
                    </>
                  ) : (
                    <span className="text-[8px] leading-none text-slate-400 font-semibold">Off</span>
                  )}
                </div>

                {/* Today small indicator banner */}
                {isToday && !isSelected && (
                  <span className="absolute -top-1.5 bg-doctor-primary text-white text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-tighter">
                    Today
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* 3. Clinicians On-Duty & Active Presence Matrix for Selected Date */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-doctor-primary" />
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
              On-Duty Clinicians & Operatories
            </h3>
          </div>
          <span className="text-[11px] font-bold text-slate-500">
            {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
        </div>

        {/* Clinicians Attendance Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {cliniciansRoster.map((doc) => {
            const isFilterActive = providerFilter.includes(doc.name)

            return (
              <button
                key={doc.name}
                type="button"
                onClick={() => setProviderFilter(doc.name)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 active:scale-98 ${
                  isFilterActive
                    ? 'bg-doctor-primary text-white border-doctor-primary shadow-xs'
                    : doc.isPresent
                    ? 'bg-slate-50 hover:bg-slate-100 border-slate-200/90 text-slate-800'
                    : 'bg-slate-50/50 border-slate-200/60 text-slate-400 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-1">
                  <div className="min-w-0">
                    <p className="text-xs font-bold truncate leading-snug">{doc.name}</p>
                    <p
                      className={`text-[10px] truncate ${
                        isFilterActive ? 'text-white/80' : 'text-slate-500'
                      }`}
                    >
                      {doc.room}
                    </p>
                  </div>
                  <span
                    className={`w-2 h-2 rounded-full mt-1 shrink-0 ${
                      doc.isPresent
                        ? isFilterActive
                          ? 'bg-emerald-300'
                          : 'bg-emerald-500'
                        : 'bg-slate-300'
                    }`}
                    title={doc.isPresent ? 'Present on Shift' : 'Off-Duty Today'}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] font-semibold pt-0.5 border-t border-slate-100/20">
                  <span
                    className={
                      isFilterActive
                        ? 'text-white/90'
                        : doc.isPresent
                        ? 'text-emerald-700 font-bold'
                        : 'text-slate-400'
                    }
                  >
                    {doc.isPresent ? '🟢 Active' : '⚪ Off-Duty'}
                  </span>
                  <span
                    className={
                      isFilterActive ? 'text-white/90' : 'text-slate-600 font-bold'
                    }
                  >
                    {doc.appointmentCount} appts
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* 4. Provider Quick Filter Strip */}
      <div className="flex items-center justify-between gap-2 pt-0.5">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 scrollbar-none w-full">
          {['All', 'Dr. Ken Miller', 'Dr. Julie Miller', 'Dr. Viktoria Kirsten', 'Dr. Austin Chomay', 'Lisa (RDH)'].map((prov) => (
            <button
              key={prov}
              onClick={() => setProviderFilter(prov)}
              className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer select-none active:scale-98 ${
                providerFilter === prov
                  ? 'bg-doctor-primary text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {prov === 'All' ? 'All Providers (Clinic-Wide)' : prov}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Schedule Timeline Slots for Selected Date */}
      <div className="space-y-3.5">
        {/* Date & Capacity Banner */}
        <div className="flex items-center justify-between px-1 text-xs text-slate-500 font-bold">
          <span>
            {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </span>
          <span>
            {filteredSlots.length} Appointment{filteredSlots.length === 1 ? '' : 's'}
          </span>
        </div>

        {filteredSlots.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-2">
            <CalendarDays className="w-8 h-8 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold text-slate-800">
              {selectedDayOfWeek === 0
                ? 'Clinic Closed on Sundays'
                : 'No appointments scheduled for this selection'}
            </h4>
            <p className="text-xs text-slate-500">
              {selectedDayOfWeek === 0
                ? 'Emergency call rotation handled by St. Paul Hospital emergency department.'
                : 'Use the "Insert Buffer" button above to reserve an operatory slot.'}
            </p>
          </div>
        ) : (
          filteredSlots.map((slot) => {
            const isBuffer = slot.status === 'buffer'
            const isSeated = slot.status === 'seated'
            const isCompleted = slot.status === 'completed'

            return (
              <div
                key={slot.id}
                className={`p-4 sm:p-4.5 rounded-2xl border transition-all shadow-2xs ${
                  isBuffer
                    ? 'bg-amber-50/80 border-amber-300'
                    : isSeated
                    ? 'bg-blue-50/50 border-blue-300 shadow-xs'
                    : isCompleted
                    ? 'bg-slate-50/80 border-slate-200 opacity-75'
                    : 'bg-white border-slate-200/90'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    {/* Time pill */}
                    <div className="bg-white border border-slate-200/90 rounded-xl px-3 py-2 text-center shrink-0 shadow-2xs min-w-[76px]">
                      <span className="text-xs font-bold text-slate-800 block">
                        {slot.time.split('–')[0].trim()}
                      </span>
                      <span className="text-[10px] text-slate-400 block font-semibold mt-0.5">
                        {slot.operatory}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-slate-900">
                          {slot.patientName}
                        </h4>
                        <Badge
                          variant={
                            isSeated ? 'emerald' : isCompleted ? 'gray' : isBuffer ? 'amber' : 'navy'
                          }
                          size="sm"
                          className="font-bold"
                        >
                          {isSeated ? 'In Chair' : isCompleted ? 'Completed' : isBuffer ? 'Buffer Slot' : 'Scheduled'}
                        </Badge>
                        {slot.alerts && (
                          <span className="text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3 text-rose-600" />
                            <span>{slot.alerts}</span>
                          </span>
                        )}
                      </div>

                      <p className="text-xs font-semibold text-slate-800">
                        {slot.procedure}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Provider: <strong className="text-slate-700">{slot.provider}</strong>
                      </p>
                      {slot.notes && (
                        <p className="text-[10px] text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded-md mt-1 inline-block font-medium">
                          {slot.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Slot Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    {!isCompleted && !isBuffer && (
                      <>
                        {!isSeated ? (
                          <button
                            onClick={() => markSlotSeated(slot.id)}
                            className="text-xs font-bold text-blue-900 bg-white border border-blue-200 px-3 py-1.5 rounded-xl hover:bg-blue-50 transition-all cursor-pointer active:scale-98 shadow-2xs"
                          >
                            Seat in Chair
                          </button>
                        ) : (
                          <button
                            onClick={() => markSlotCompleted(slot.id)}
                            className="text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-xl flex items-center gap-1 transition-all cursor-pointer active:scale-98 shadow-2xs"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Complete</span>
                          </button>
                        )}
                      </>
                    )}
                    {isCompleted && (
                      <span className="text-xs text-slate-400 font-semibold bg-slate-100 px-2.5 py-1 rounded-xl">
                        ✓ Finalized
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* 6. Add Buffer Modal - Unchanged */}
      <Dialog
        isOpen={showAddBufferModal}
        onClose={() => setShowAddBufferModal(false)}
        title="Insert Emergency Buffer Slot"
        subtitle="Reserve an operatory window for acute trauma or walk-ins"
      >
        <div className="space-y-3.5 text-xs sm:text-sm">
          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">Select Operatory:</label>
            <Select
              value={selectedOperatory}
              onChange={setSelectedOperatory}
              theme="doctor"
              options={[
                'Operatory 1 (Dr. Ken Miller)',
                'Operatory 2 (Dr. Ken Miller)',
                'Operatory 3 (Dr. Viktoria Kirsten)',
                'Operatory 4 (Dr. Austin Chomay)',
                'Hygiene Bay A (Lisa RDH)',
                'Hygiene Bay B (Elena RDH)'
              ]}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">Buffer Duration:</label>
            <div className="grid grid-cols-3 gap-2">
              {['20 mins', '30 mins', '45 mins'].map((dur) => (
                <button
                  key={dur}
                  type="button"
                  onClick={() => setBufferDuration(dur)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    bufferDuration === dur
                      ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-2xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {dur}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">Target Date:</label>
            <div className="p-2.5 bg-slate-100 rounded-xl text-xs font-bold text-slate-800">
              {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>

          <Button
            variant="doctor"
            fullWidth
            onClick={() => {
              const newBuffer: ScheduleSlot = {
                id: `buf-${Date.now()}`,
                dateStr: selectedDateKey,
                time: '12:00 PM – 12:30 PM',
                patientName: 'Emergency Triage Buffer',
                chartNumber: 'BUFFER',
                provider: selectedOperatory.includes('Ken Miller') ? 'Dr. Ken Miller' : 'Clinic Provider',
                operatory: selectedOperatory.split('(')[0].trim(),
                procedure: `Reserved ${bufferDuration} Acute Emergency Buffer Slot`,
                status: 'buffer',
                notes: 'Held for priority acute walk-ins or post-op complications.'
              }
              setScheduleList(prev => [newBuffer, ...prev])
              setShowAddBufferModal(false)
            }}
          >
            Confirm Buffer Reservation
          </Button>
        </div>
      </Dialog>
    </div>
  )
}
