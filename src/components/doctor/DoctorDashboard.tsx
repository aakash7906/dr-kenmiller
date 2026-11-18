import React, { useState, useEffect } from 'react'
import {
  Users,
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Stethoscope,
  ChevronRight,
  ShieldAlert,
  Play,
  RotateCcw,
  FileEdit,
  PhoneCall,
  UserCheck
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { OPERATORY_CHAIRS, LIVE_TRIAGE_TICKETS, CURRENT_PATIENT, CLINIC_INFO } from '@/data/mockData'
import { DoctorTab } from '@/types'

interface DoctorDashboardProps {
  onNavigateTab: (tab: DoctorTab) => void
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ onNavigateTab }) => {
  const [anesthesiaSeconds, setAnesthesiaSeconds] = useState(1440) // 24 minutes
  const [timerRunning, setTimerRunning] = useState(true)
  const [showQuickNoteModal, setShowQuickNoteModal] = useState(false)
  const [noteContent, setNoteContent] = useState('Local infiltration 2% Lido 1:100k given at 10:05 AM. Adequate profound pulpal anesthesia confirmed. Site #19 healing abutment removed, torque checked to 35 Ncm.')

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (timerRunning) {
      interval = setInterval(() => {
        setAnesthesiaSeconds(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timerRunning])

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60)
    const secs = totalSec % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const urgentTicket = LIVE_TRIAGE_TICKETS[0]

  return (
    <div className="space-y-4 pb-20">
      {/* Top Clinical Header & Date */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900">
            Chairside Practice Hub
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#0F2B48] tracking-tight">
            Today's Clinical Floor
          </h2>
        </div>
        <Badge variant="navy" size="sm" className="font-bold">
          Wed, Nov 15 • Active
        </Badge>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Patients Today</div>
          <div className="text-2xl font-black text-[#0F2B48] mt-0.5">14</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">● 2 Completed</div>
        </div>

        <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">In Operatories</div>
          <div className="text-2xl font-black text-teal-700 mt-0.5">3</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Chairs 1, 2 & Bay A</div>
        </div>

        <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Triage Queue</div>
          <div className="text-2xl font-black text-red-600 mt-0.5">1</div>
          <div className="text-[10px] text-red-600 font-bold mt-0.5">Trauma arriving</div>
        </div>

        <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Hygienists Active</div>
          <div className="text-2xl font-black text-blue-700 mt-0.5">2</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Lisa & Elena</div>
        </div>
      </div>

      {/* HIGH PRIORITY INBOUND TRAUMA BANNER */}
      {urgentTicket && (
        <div className="bg-gradient-to-r from-red-600 to-rose-700 rounded-2xl p-4 text-white shadow-md relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
                Incoming Emergency Trauma • ETA {urgentTicket.etaMinutes} mins
              </span>
            </div>
            <button
              onClick={() => onNavigateTab('triage')}
              className="text-xs font-bold underline cursor-pointer text-white hover:text-rose-100"
            >
              Open Desk →
            </button>
          </div>

          <h3 className="text-base font-extrabold mt-2 leading-snug">
            {urgentTicket.patientName}: {urgentTicket.condition}
          </h3>
          <p className="text-xs text-rose-100 mt-1">
            {urgentTicket.symptoms}
          </p>

          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <button
              onClick={() => alert('Chair 3 prepared for emergency arrival. Assistant alerted.')}
              className="bg-white text-red-900 hover:bg-rose-50 text-xs font-bold py-1.5 px-3 rounded-xl transition-colors cursor-pointer"
            >
              Prepare Chair 3
            </button>
            <a
              href={`tel:${urgentTicket.phone.replace(/[^0-9]/g, '')}`}
              className="bg-red-800/80 hover:bg-red-800 text-white text-xs font-semibold py-1.5 px-3 rounded-xl flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Patient ({urgentTicket.phone})</span>
            </a>
          </div>
        </div>
      )}

      {/* ACTIVE CHAIRSIDE FOCUS: OPERATORY 1 */}
      <Card className="p-4 sm:p-5 border-blue-200/80 shadow-sm relative overflow-hidden bg-gradient-to-b from-white to-blue-50/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
              Operatory 1 • Lead Surgical Suite
            </h3>
          </div>
          <Badge variant="emerald" size="sm">Patient in Chair</Badge>
        </div>

        {/* Patient in Chair info */}
        <div className="flex items-start justify-between gap-3 mt-1">
          <div className="flex items-start gap-3">
            <img
              src={CURRENT_PATIENT.avatar}
              alt="Sarah Tremblay"
              className="w-12 h-12 rounded-xl object-cover ring-2 ring-blue-100"
            />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-slate-900">{CURRENT_PATIENT.name}</h4>
                <span className="font-mono text-xs text-slate-500">#{CURRENT_PATIENT.chartNumber}</span>
              </div>
              <p className="text-xs font-semibold text-teal-800 mt-0.5">
                Tooth #19 Implant Stage 2 Abutment Seating & Bitewings
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-bold bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded">
                  ⚠️ Penicillin Allergy
                </span>
                <span className="text-[10px] font-semibold text-slate-500">
                  Alberta Blue Cross Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chairside Telemetry / Anesthesia Timer */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Anesthesia timer */}
          <div className="bg-slate-900 text-white p-3 rounded-xl flex items-center justify-between shadow-xs">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Lidocaine 2% (1:100k) Timer
              </div>
              <div className="text-xl font-mono font-extrabold text-cyan-300">
                {formatTimer(anesthesiaSeconds)}
              </div>
              <div className="text-[10px] text-slate-400">
                Administered at 10:05 AM (Site #19)
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                title={timerRunning ? 'Pause timer' : 'Resume timer'}
              >
                <Play className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setAnesthesiaSeconds(0)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                title="Reset timer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Charting Link */}
          <div className="bg-[#EBF3FB] p-3 rounded-xl border border-blue-200 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-blue-900">
                Digital Odontogram
              </div>
              <p className="text-xs text-slate-700 font-medium mt-0.5">
                Tooth #19 implant integrated. Monolithic Zirconia crown arriving from Aurum Lab.
              </p>
            </div>
            <div className="flex items-center justify-between mt-2 pt-1 border-t border-blue-200/60">
              <button
                onClick={() => onNavigateTab('charting')}
                className="text-xs font-bold text-blue-900 hover:underline flex items-center gap-1"
              >
                <span>Open Full Charting</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setShowQuickNoteModal(true)}
                className="text-xs font-bold text-[#0F2B48] bg-white px-2.5 py-1 rounded-lg border border-blue-200 shadow-2xs hover:bg-blue-50"
              >
                + Quick SOAP
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* ALL OPERATORY BAYS STATUS LIST */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            All Operatory Bays Status
          </h3>
          <span className="text-[11px] text-slate-500 font-medium">Live Clinic Flow</span>
        </div>

        <div className="space-y-2.5">
          {OPERATORY_CHAIRS.map((chair) => (
            <div
              key={chair.id}
              className="bg-white p-3.5 rounded-2xl border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:border-slate-300 transition-all"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                    chair.status === 'occupied'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : chair.status === 'prepping'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  {chair.name.includes('Hygiene') ? 'HYG' : 'OP'}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      {chair.name}
                    </h4>
                    <span className="text-[10px] text-slate-500">({chair.room})</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Provider: <strong className="text-slate-700">{chair.provider}</strong>
                  </p>

                  {chair.currentPatient ? (
                    <div className="mt-1 text-xs text-slate-800">
                      <span className="font-semibold">{chair.currentPatient.name}: </span>
                      <span className="text-slate-600">{chair.currentPatient.procedure}</span>
                    </div>
                  ) : (
                    <div className="mt-1 text-xs text-slate-400 italic">
                      Ready for next seated patient or emergency buffer
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 sm:self-center">
                <Badge
                  variant={
                    chair.status === 'occupied'
                      ? 'emerald'
                      : chair.status === 'prepping'
                      ? 'amber'
                      : 'gray'
                  }
                  size="sm"
                >
                  {chair.status === 'occupied' ? 'Occupied' : chair.status === 'prepping' ? 'Prepping' : 'Available'}
                </Badge>
                <button
                  onClick={() => onNavigateTab('schedule')}
                  className="text-xs font-semibold text-blue-900 hover:underline p-1"
                >
                  Manage →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QUICK CHAIRSIDE TOOLS */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-3">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
          Dr. Ken Miller Chairside Shortcuts
        </h4>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <button
            onClick={() => onNavigateTab('charting')}
            className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Activity className="w-5 h-5 text-cyan-400" />
            <span className="font-bold">Tooth Chart</span>
          </button>

          <button
            onClick={() => onNavigateTab('triage')}
            className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShieldAlert className="w-5 h-5 text-red-400" />
            <span className="font-bold">Triage Desk</span>
          </button>

          <button
            onClick={() => onNavigateTab('lab')}
            className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="font-bold">Lab Cases</span>
          </button>
        </div>
      </div>

      {/* Quick SOAP Note Modal */}
      <Dialog
        isOpen={showQuickNoteModal}
        onClose={() => setShowQuickNoteModal(false)}
        title="Add Clinical SOAP Note"
        subtitle={`Sarah Tremblay (${CURRENT_PATIENT.chartNumber}) • Operatory 1`}
      >
        <div className="space-y-3 text-xs sm:text-sm">
          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">
              Clinical Progress Entry:
            </label>
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              rows={4}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F2B48]"
            />
          </div>

          <div className="flex flex-wrap gap-1">
            <span className="text-[10px] text-slate-500 font-semibold block w-full mb-0.5">Quick Macro Chips:</span>
            {['2% Lido 1:100k Epi', 'Abutment 35 Ncm', 'Soft diet instructed', 'Bite verified with articulating paper'].map((macro) => (
              <button
                key={macro}
                type="button"
                onClick={() => setNoteContent(prev => `${prev} ${macro}.`)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] px-2 py-1 rounded-md"
              >
                +{macro}
              </button>
            ))}
          </div>

          <Button
            variant="doctor"
            fullWidth
            onClick={() => {
              alert('Clinical SOAP Note committed to patient electronic chart!')
              setShowQuickNoteModal(false)
            }}
          >
            Sign & Commit to Chart #KM-6421
          </Button>
        </div>
      </Dialog>
    </div>
  )
}
