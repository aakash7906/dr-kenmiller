import React, { useState } from 'react'
import {
  AlertOctagon,
  Clock,
  PhoneCall,
  CheckCircle2,
  ShieldAlert,
  Send,
  UserCheck,
  Stethoscope,
  ChevronRight
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { LIVE_TRIAGE_TICKETS, CLINIC_INFO } from '@/data/mockData'
import { TriageTicket } from '@/types'

export const DoctorEmergencyDesk: React.FC = () => {
  const [tickets, setTickets] = useState<TriageTicket[]>(LIVE_TRIAGE_TICKETS)
  const [selectedTicket, setSelectedTicket] = useState<TriageTicket | null>(LIVE_TRIAGE_TICKETS[0])

  const assignOperatory = (ticketId: string, operatoryName: string) => {
    setTickets(prev =>
      prev.map(t =>
        t.id === ticketId
          ? { ...t, status: 'assigned', assignedOperatory: operatoryName }
          : t
      )
    )
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket(prev => prev ? { ...prev, status: 'assigned', assignedOperatory: operatoryName } : null)
    }
  }

  const resolveTicket = (ticketId: string) => {
    setTickets(prev =>
      prev.map(t =>
        t.id === ticketId ? { ...t, status: 'resolved' } : t
      )
    )
  }

  return (
    <div className="space-y-4 pb-20">
      {/* Desk Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-red-600">
            Emergency Dispatch System
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-doctor-primary tracking-tight">
            Live Clinical Triage Desk
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="red" size="sm" className="font-bold">
            ● 1 Urgent Trauma En Route
          </Badge>
          <span className="text-xs text-slate-500 font-mono">Pager: Active</span>
        </div>
      </div>

      {/* Main Grid: Ticket Stream & Selected Ticket Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column: Inbound Triage Stream */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 px-1">
            Inbound Emergency Tickets
          </h3>

          {tickets.map((ticket) => {
            const isRed = ticket.urgency === 'high'
            const isSelected = selectedTicket?.id === ticket.id

            return (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'ring-2 ring-doctor-primary shadow-md'
                    : 'hover:shadow-xs'
                } ${
                  isRed
                    ? 'bg-rose-50/70 border-rose-200'
                    : 'bg-white border-slate-200/90'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        isRed ? 'bg-red-600 animate-ping' : 'bg-amber-500'
                      }`}
                    />
                    <h4 className="text-sm font-bold text-slate-900">
                      {ticket.patientName}
                    </h4>
                  </div>
                  <Badge variant={isRed ? 'red' : 'amber'} size="sm">
                    {ticket.urgency === 'high' ? 'High Urgency (Code Red)' : 'Moderate'}
                  </Badge>
                </div>

                <p className="text-xs font-semibold text-slate-800 mt-1.5 leading-snug">
                  {ticket.condition}
                </p>

                <p className="text-[11px] text-slate-500 mt-1">
                  Reported: {ticket.reportedTime}
                </p>

                {ticket.etaMinutes && (
                  <div className="mt-2 text-xs font-bold text-rose-800 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-rose-600" />
                    <span>ETA to Clinic: ~{ticket.etaMinutes} minutes</span>
                  </div>
                )}

                <div className="mt-3 flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                  <span className="font-mono text-[10px] text-slate-400">ID: {ticket.id}</span>
                  <span
                    className={`font-semibold ${
                      ticket.status === 'assigned'
                        ? 'text-teal-700'
                        : ticket.status === 'resolved'
                        ? 'text-slate-400'
                        : 'text-rose-700'
                    }`}
                  >
                    {ticket.status === 'assigned'
                      ? `Assigned: ${ticket.assignedOperatory}`
                      : ticket.status === 'resolved'
                      ? 'Resolved'
                      : 'Pending Assignment'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right Column: Selected Ticket Resolution Card */}
        {selectedTicket && (
          <Card className="p-4 sm:p-5 border-slate-200 shadow-sm space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Selected Incident
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {selectedTicket.patientName}
                </h3>
                <p className="text-xs font-mono text-slate-500">{selectedTicket.phone}</p>
              </div>

              <a
                href={`tel:${selectedTicket.phone.replace(/[^0-9]/g, '')}`}
                className="p-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors"
                title="Direct Phone Call"
              >
                <PhoneCall className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-2">
              <div>
                <strong className="text-slate-900 block text-[11px]">Primary Condition:</strong>
                <p className="text-slate-700 mt-0.5">{selectedTicket.condition}</p>
              </div>
              <div>
                <strong className="text-slate-900 block text-[11px]">Symptom / Transport Notes:</strong>
                <p className="text-slate-600 mt-0.5">{selectedTicket.symptoms}</p>
              </div>
            </div>

            {/* Recommended Protocol from Dr. Ken Miller */}
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-950">
              <strong className="block font-bold mb-1">Chairside Clinical Action Plan:</strong>
              <p className="text-[11px] leading-relaxed">
                1. Inspect avulsed socket for alveolar fracture. Take immediate periapical radiograph.
                <br />
                2. Administer local infiltration (Septocaine 4% or Lido 2%).
                <br />
                3. Gentle socket irrigation with sterile saline; seat tooth gently and place 0.016 flexible wire splint for 10-14 days.
              </p>
            </div>

            {/* Operatory Bay Assignment */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 block">
                Assign Operatory Suite:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => assignOperatory(selectedTicket.id, 'Operatory 1 (Immediate Prep)')}
                  className="p-2 rounded-xl border border-slate-200 hover:border-blue-500 text-xs font-semibold text-slate-700 bg-white hover:bg-blue-50"
                >
                  Operatory 1 (Surgical)
                </button>
                <button
                  onClick={() => assignOperatory(selectedTicket.id, 'Operatory 2 (Emergency Buffer)')}
                  className="p-2 rounded-xl border border-slate-200 hover:border-blue-500 text-xs font-semibold text-slate-700 bg-white hover:bg-blue-50"
                >
                  Operatory 2 (Restorative)
                </button>
              </div>
            </div>

            {/* Quick Action */}
            <div className="pt-2">
              <Button
                variant="doctor"
                fullWidth
                onClick={() => {
                  resolveTicket(selectedTicket.id)
                  alert(`Ticket ${selectedTicket.id} marked as Handled & Patient Admitted.`)
                }}
              >
                Mark Handled & Admitted to Operatory
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
