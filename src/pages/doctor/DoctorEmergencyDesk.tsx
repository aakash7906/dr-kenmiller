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
    <div className="space-y-6 pb-28 pt-2">
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
          <Badge variant="red" size="sm" className="font-bold py-1 px-2.5">
            ● 1 Urgent Trauma En Route
          </Badge>
          <span className="text-xs text-slate-500 font-mono">Pager: Active</span>
        </div>
      </div>

      {/* Main Grid: Ticket Stream & Selected Ticket Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left Column: Inbound Triage Stream */}
        <div className="space-y-3.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
            Inbound Emergency Tickets
          </h3>

          <div className="space-y-3">
            {tickets.map((ticket) => {
              const isRed = ticket.urgency === 'high'
              const isSelected = selectedTicket?.id === ticket.id

              return (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket)}
                  className={`p-4.5 rounded-2xl border transition-all cursor-pointer ${
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
                      <h4 className="text-sm sm:text-base font-bold text-slate-900">
                        {ticket.patientName}
                      </h4>
                    </div>
                    <Badge variant={isRed ? 'red' : 'amber'} size="sm" className="font-bold">
                      {ticket.urgency === 'high' ? 'Code Red' : 'Moderate'}
                    </Badge>
                  </div>

                  <p className="text-xs font-semibold text-slate-800 mt-2 leading-snug">
                    {ticket.condition}
                  </p>

                  <p className="text-[11px] text-slate-500 mt-1">
                    Reported: {ticket.reportedTime}
                  </p>

                  {ticket.etaMinutes && (
                    <div className="mt-2.5 text-xs font-bold text-rose-800 flex items-center gap-1.5 bg-rose-100/70 py-1 px-2.5 rounded-lg w-fit">
                      <Clock className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      <span>ETA to Clinic: ~{ticket.etaMinutes} minutes</span>
                    </div>
                  )}

                  <div className="mt-3.5 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                    <span className="font-mono text-[10px] text-slate-400">ID: {ticket.id}</span>
                    <span
                      className={`font-semibold text-xs ${
                        ticket.status === 'assigned'
                          ? 'text-teal-700'
                          : ticket.status === 'resolved'
                          ? 'text-slate-400'
                          : 'text-rose-700'
                      }`}
                    >
                      {ticket.status === 'assigned'
                        ? `✓ Assigned: ${ticket.assignedOperatory}`
                        : ticket.status === 'resolved'
                        ? 'Resolved'
                        : 'Pending Assignment'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column: Selected Ticket Resolution Card */}
        {selectedTicket && (
          <Card className="p-4.5 sm:p-5.5 border-slate-200 shadow-sm space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Selected Incident
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {selectedTicket.patientName}
                </h3>
                <p className="text-xs font-mono text-slate-500 mt-0.5">{selectedTicket.phone}</p>
              </div>

              <a
                href={`tel:${selectedTicket.phone.replace(/[^0-9]/g, '')}`}
                className="p-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors shadow-2xs active:scale-98"
                title="Direct Phone Call"
              >
                <PhoneCall className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-2.5">
              <div>
                <strong className="text-slate-900 block text-[11px] uppercase tracking-wide">Primary Condition:</strong>
                <p className="text-slate-800 font-semibold mt-0.5">{selectedTicket.condition}</p>
              </div>
              <div>
                <strong className="text-slate-900 block text-[11px] uppercase tracking-wide">Symptom & Transport Notes:</strong>
                <p className="text-slate-600 mt-0.5 leading-relaxed">{selectedTicket.symptoms}</p>
              </div>
            </div>

            {/* Recommended Protocol from Dr. Ken Miller - Formatted cleanly as step cards */}
            <div className="bg-amber-50/80 p-3.5 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-2">
              <strong className="block font-bold text-xs uppercase tracking-wide text-amber-900">
                Chairside Clinical Action Protocol:
              </strong>
              <div className="space-y-1.5 text-xs text-amber-900">
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <span>Inspect avulsed socket for alveolar fracture & take immediate periapical radiograph.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <span>Administer local infiltration (Septocaine 4% or Lidocaine 2% 1:100k).</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <span>Gentle socket irrigation with sterile saline; seat tooth gently and place flexible wire splint.</span>
                </div>
              </div>
            </div>

            {/* Operatory Bay Assignment */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 block">
                Assign Operatory Suite:
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => assignOperatory(selectedTicket.id, 'Operatory 1 (Immediate Prep)')}
                  className="p-3 rounded-xl border border-slate-200 hover:border-doctor-primary text-xs font-semibold text-slate-700 bg-white hover:bg-blue-50 transition-all cursor-pointer text-center active:scale-98 shadow-2xs"
                >
                  <span className="block font-bold text-slate-900">Operatory 1</span>
                  <span className="text-[10px] text-slate-500">Surgical Suite</span>
                </button>
                <button
                  onClick={() => assignOperatory(selectedTicket.id, 'Operatory 2 (Emergency Buffer)')}
                  className="p-3 rounded-xl border border-slate-200 hover:border-doctor-primary text-xs font-semibold text-slate-700 bg-white hover:bg-blue-50 transition-all cursor-pointer text-center active:scale-98 shadow-2xs"
                >
                  <span className="block font-bold text-slate-900">Operatory 2</span>
                  <span className="text-[10px] text-slate-500">Restorative Suite</span>
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
                className="py-3 rounded-xl font-bold cursor-pointer active:scale-98 shadow-xs"
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
