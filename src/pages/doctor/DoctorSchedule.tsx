import React, { useState } from 'react'
import {
  CalendarDays,
  Clock,
  UserCheck,
  Plus,
  AlertCircle,
  CheckCircle2,
  Filter,
  MoreVertical,
  ChevronRight
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'

interface ScheduleSlot {
  id: string
  time: string
  patientName: string
  chartNumber: string
  provider: string
  operatory: string
  procedure: string
  status: 'seated' | 'upcoming' | 'completed' | 'buffer'
  notes?: string
}

export const DoctorSchedule: React.FC = () => {
  const [providerFilter, setProviderFilter] = useState<string>('All')
  const [showAddBufferModal, setShowAddBufferModal] = useState(false)
  const [scheduleList, setScheduleList] = useState<ScheduleSlot[]>([
    {
      id: 'sc-1',
      time: '8:45 AM – 9:30 AM',
      patientName: 'Robert Gagne',
      chartNumber: 'KM-5102',
      provider: 'Dr. Ken Miller',
      operatory: 'Operatory 1',
      procedure: 'Post-Op Suture Removal #30',
      status: 'completed'
    },
    {
      id: 'sc-2',
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
      time: '10:00 AM – 10:45 AM',
      patientName: 'Sarah Tremblay',
      chartNumber: 'KM-6421',
      provider: 'Dr. Ken Miller',
      operatory: 'Operatory 1',
      procedure: 'Implant Stage 2 Abutment Seating & Bitewings',
      status: 'seated',
      notes: 'Penicillin allergy noted. Patient arrived and checked in.'
    },
    {
      id: 'sc-4',
      time: '10:45 AM – 11:30 AM',
      patientName: 'Marcus Vance',
      chartNumber: 'KM-5819',
      provider: 'Dr. Ken Miller',
      operatory: 'Operatory 2',
      procedure: 'Crown Prep & Temp Placement #14',
      status: 'upcoming'
    },
    {
      id: 'sc-5',
      time: '11:30 AM – 12:00 PM',
      patientName: 'Emergency Triage Buffer',
      chartNumber: 'TRIAGE',
      provider: 'Dr. Ken Miller',
      operatory: 'Operatory 1',
      procedure: 'Reserved for Incoming Dental Trauma (Liam O’Connor)',
      status: 'buffer'
    },
    {
      id: 'sc-6',
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
      time: '2:15 PM – 3:15 PM',
      patientName: 'Ronald Bouchard',
      chartNumber: 'KM-4902',
      provider: 'Dr. Ken Miller',
      operatory: 'Operatory 1',
      procedure: '3-Unit Bridge Try-In & Occlusal Balance',
      status: 'upcoming'
    }
  ])

  const filtered = scheduleList.filter(s => {
    if (providerFilter === 'All') return true
    return s.provider.includes(providerFilter)
  })

  const markSlotCompleted = (id: string) => {
    setScheduleList(prev => prev.map(item => item.id === id ? { ...item, status: 'completed' } : item))
  }

  const markSlotSeated = (id: string) => {
    setScheduleList(prev => prev.map(item => item.id === id ? { ...item, status: 'seated' } : item))
  }

  return (
    <div className="space-y-4 pb-20">
      {/* Schedule Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900">
            Operatory Flow Coordination
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-doctor-primary tracking-tight">
            Daily Chair Schedule
          </h2>
        </div>

        <button
          onClick={() => setShowAddBufferModal(true)}
          className="self-start sm:self-auto bg-doctor-primary hover:bg-doctor-primary-hover text-white text-xs font-bold py-2 px-3 rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Insert Emergency Buffer</span>
        </button>
      </div>

      {/* Provider Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {['All', 'Dr. Ken Miller', 'Lisa', 'Elena'].map((prov) => (
          <button
            key={prov}
            onClick={() => setProviderFilter(prov)}
            className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              providerFilter === prov
                ? 'bg-doctor-primary text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {prov === 'All' ? 'All Providers' : prov}
          </button>
        ))}
      </div>

      {/* Schedule Timeline Slots */}
      <div className="space-y-2.5">
        {filtered.map((slot) => {
          const isBuffer = slot.status === 'buffer'
          const isSeated = slot.status === 'seated'
          const isCompleted = slot.status === 'completed'

          return (
            <div
              key={slot.id}
              className={`p-3.5 rounded-2xl border transition-all ${
                isBuffer
                  ? 'bg-amber-50/80 border-amber-300'
                  : isSeated
                  ? 'bg-blue-50/50 border-blue-300 shadow-xs'
                  : isCompleted
                  ? 'bg-slate-50 border-slate-200 opacity-75'
                  : 'bg-white border-slate-200/90'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-start gap-3">
                  {/* Time pill */}
                  <div className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-center shrink-0">
                    <span className="text-[11px] font-bold text-slate-800 block">
                      {slot.time.split('–')[0]}
                    </span>
                    <span className="text-[9px] text-slate-400 block">
                      {slot.operatory}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">
                        {slot.patientName}
                      </h4>
                      {!isBuffer && (
                        <span className="text-[10px] font-mono text-slate-500">
                          #{slot.chartNumber}
                        </span>
                      )}
                      <Badge
                        variant={
                          isSeated ? 'emerald' : isCompleted ? 'gray' : isBuffer ? 'amber' : 'navy'
                        }
                        size="sm"
                      >
                        {isSeated ? 'In Chair' : isCompleted ? 'Completed' : isBuffer ? 'Buffer Slot' : 'Scheduled'}
                      </Badge>
                    </div>

                    <p className="text-xs font-medium text-slate-700 mt-0.5">
                      {slot.procedure}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Provider: <strong className="text-slate-700">{slot.provider}</strong>
                    </p>
                    {slot.notes && (
                      <p className="text-[10px] text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded mt-1 inline-block">
                        {slot.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Slot Actions */}
                <div className="flex items-center gap-1.5 self-end sm:self-center">
                  {!isCompleted && !isBuffer && (
                    <>
                      {!isSeated ? (
                        <button
                          onClick={() => markSlotSeated(slot.id)}
                          className="text-xs font-bold text-blue-900 bg-white border border-blue-200 px-2.5 py-1 rounded-xl hover:bg-blue-50"
                        >
                          Seat in Chair
                        </button>
                      ) : (
                        <button
                          onClick={() => markSlotCompleted(slot.id)}
                          className="text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-2.5 py-1 rounded-xl flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Complete</span>
                        </button>
                      )}
                    </>
                  )}
                  {isCompleted && (
                    <span className="text-[11px] text-slate-400 font-medium">✓ Finalized</span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Add Buffer Modal */}
      <Dialog
        isOpen={showAddBufferModal}
        onClose={() => setShowAddBufferModal(false)}
        title="Insert Emergency Buffer Slot"
        subtitle="Reserve an operatory window for acute trauma or walk-ins"
      >
        <div className="space-y-3 text-xs sm:text-sm">
          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">Select Operatory:</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800">
              <option>Operatory 1 (Dr. Ken Miller)</option>
              <option>Operatory 2 (Dr. Ken Miller)</option>
              <option>Hygiene Bay B (Elena RDH)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">Buffer Duration:</label>
            <div className="grid grid-cols-3 gap-2">
              <button className="p-2 rounded-xl border border-blue-500 bg-blue-50 text-blue-900 font-bold text-xs">
                20 mins
              </button>
              <button className="p-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs">
                30 mins
              </button>
              <button className="p-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs">
                45 mins
              </button>
            </div>
          </div>

          <Button
            variant="doctor"
            fullWidth
            onClick={() => {
              alert('Emergency buffer inserted into schedule grid.')
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
