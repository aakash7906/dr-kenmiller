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
  const [noteContent, setNoteContent] = useState('Local infiltration 2% Lido 1:100k given at 10:05 AM. Adequate profound pulpal anesthesia confirmed. Site 19 healing abutment removed, torque checked to 35 Ncm.')

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
    <div className="space-y-6 pb-28">
      {/* Top Clinical Header & Date */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-doctor-primary tracking-tight">
            Clinical Floor Overview
          </h2>
        </div>
        <Badge variant="navy" size="sm" className="font-bold py-1 px-2.5">
          {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </Badge>
      </div>

      {/* KPI Stats Grid - Interactive Compact Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {/* 1. PATIENTS */}
        <button
          type="button"
          onClick={() => onNavigateTab('patients')}
          className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200/90 shadow-2xs space-y-1.5 text-left transition-all hover:border-blue-400 hover:shadow-xs hover:bg-blue-50/20 active:scale-98 cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider group-hover:text-doctor-primary transition-colors">
              Patients
            </span>
            <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-doctor-primary leading-tight">14</div>
          <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span>2 Completed</span>
          </div>
        </button>

        {/* 2. OPERATORIES */}
        <button
          type="button"
          onClick={() => onNavigateTab('schedule')}
          className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200/90 shadow-2xs space-y-1.5 text-left transition-all hover:border-teal-400 hover:shadow-xs hover:bg-teal-50/20 active:scale-98 cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider group-hover:text-teal-700 transition-colors">
              Operatories
            </span>
            <div className="w-6 h-6 rounded-md bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
              <Activity className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-teal-700 leading-tight">3 Seated</div>
          <div className="text-[10px] text-slate-500 truncate">Chairs 1, 2 & Bay A</div>
        </button>

        {/* 3. TRIAGE */}
        <button
          type="button"
          onClick={() => onNavigateTab('triage')}
          className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200/90 shadow-2xs space-y-1.5 text-left transition-all hover:border-red-400 hover:shadow-xs hover:bg-red-50/20 active:scale-98 cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider group-hover:text-red-600 transition-colors">
              Triage
            </span>
            <div className="w-6 h-6 rounded-md bg-rose-50 text-red-600 flex items-center justify-center group-hover:bg-rose-100 transition-colors">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-red-600 leading-tight">1 Inbound</div>
          <div className="text-[10px] text-red-600 font-bold truncate">Trauma arriving</div>
        </button>

        {/* 4. HYGIENISTS */}
        <button
          type="button"
          onClick={() => onNavigateTab('schedule')}
          className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200/90 shadow-2xs space-y-1.5 text-left transition-all hover:border-indigo-400 hover:shadow-xs hover:bg-indigo-50/20 active:scale-98 cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider group-hover:text-indigo-700 transition-colors">
              Hygienists
            </span>
            <div className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
              <Stethoscope className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-indigo-700 leading-tight">2 Active</div>
          <div className="text-[10px] text-slate-500 truncate">Lisa & Elena</div>
        </button>
      </div>

      {/* HIGH PRIORITY INBOUND TRAUMA BANNER */}
      {urgentTicket && (
        <div className="bg-gradient-to-r from-red-600 to-rose-700 rounded-2xl p-4.5 sm:p-5 text-white shadow-md relative overflow-hidden space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-md">
                Incoming Emergency Trauma
              </span>
            </div>
            <button
              onClick={() => onNavigateTab('triage')}
              className="text-xs font-bold underline cursor-pointer text-white hover:text-rose-100 active:scale-98"
            >
              Open Desk →
            </button>
          </div>

          <div>
            <h3 className="text-base font-extrabold leading-snug">
              {urgentTicket.patientName} <br></br>{urgentTicket.condition}
            </h3>
           
          </div>

          <div className="pt-1 flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => alert('Chair 3 prepared for emergency arrival. Assistant alerted.')}
              className="bg-white text-red-900 hover:bg-rose-50 text-xs font-bold py-2 px-3.5 rounded-xl transition-all cursor-pointer active:scale-98 shadow-xs"
            >
              Prepare Chair 3
            </button>
            <a
              href={`tel:${urgentTicket.phone.replace(/[^0-9]/g, '')}`}
              className="bg-red-800/80 hover:bg-red-800 text-white text-xs font-semibold py-2 px-3.5 rounded-xl flex items-center gap-1.5 transition-all active:scale-98"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call ({urgentTicket.phone})</span>
            </a>
          </div>
        </div>
      )}

      {/* ACTIVE CHAIRSIDE FOCUS: OPERATORY 1 */}
      <Card className="p-4.5 sm:p-5.5 border-blue-200/80 shadow-sm relative overflow-hidden bg-gradient-to-b from-white to-blue-50/20 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
              Operatory 1 • Lead Surgical Suite
            </h3>
          </div>
          <Badge variant="emerald" size="sm">Patient in Chair</Badge>
        </div>

        {/* Patient in Chair info */}
        <div className="flex items-start gap-3.5 bg-white p-3.5 rounded-2xl border border-slate-200/80">
          <img
            src={CURRENT_PATIENT.avatar}
            alt="Sarah Tremblay"
            className="w-12 h-12 rounded-xl object-cover ring-2 ring-blue-100 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-slate-900 truncate">{CURRENT_PATIENT.name}</h4>
            </div>
            <p className="text-xs font-semibold text-teal-800 mt-0.5 truncate">
              Tooth 19 Implant Stage 2 Abutment Seating & Bitewings
            </p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200 px-2 py-0.5 rounded-md">
                ⚠️ Penicillin Allergy
              </span>
              <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                Direct Billing Verified
              </span>
              <span className="text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                <span>🎧 NuCalm Active (Relaxed)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Chairside Telemetry / Anesthesia Timer & Odontogram */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Anesthesia timer */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-between shadow-xs">
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Lidocaine 2% (1:100k) Timer
              </div>
              <div className="text-2xl font-mono font-extrabold text-cyan-300">
                {formatTimer(anesthesiaSeconds)}
              </div>
              <div className="text-[11px] text-slate-400">
                Administered 10:05 AM (Site 19)
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer active:scale-98"
                title={timerRunning ? 'Pause timer' : 'Resume timer'}
              >
                <Play className="w-4 h-4" />
              </button>
              <button
                onClick={() => setAnesthesiaSeconds(0)}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer active:scale-98"
                title="Reset timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Charting Link */}
          <div className="bg-doctor-primary-light p-4 rounded-2xl border border-doctor-primary-border flex flex-col justify-between space-y-2.5">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-blue-900">
                Digital Odontogram Status
              </div>
              <p className="text-xs text-slate-700 font-medium mt-1">
                Tooth 19 fixture integrated. Zirconia crown in lab transit.
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-blue-200/60">
              <button
                onClick={() => onNavigateTab('charting')}
                className="text-xs font-bold text-blue-900 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Full Charting</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setShowQuickNoteModal(true)}
                className="text-xs font-bold text-doctor-primary bg-white px-3 py-1.5 rounded-xl border border-blue-200 shadow-2xs hover:bg-blue-50 transition-all cursor-pointer active:scale-98"
              >
                + Quick SOAP
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* ALL OPERATORY BAYS STATUS LIST */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            All Operatory Bays Status
          </h3>
          <span className="text-[11px] text-slate-400 font-medium">Live Clinic Flow</span>
        </div>

        <div className="space-y-3">
          {OPERATORY_CHAIRS.map((chair) => (
            <div
              key={chair.id}
              className="bg-white p-4 rounded-2xl border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300 transition-all shadow-2xs"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
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
                    <span className="text-[11px] text-slate-500">({chair.room})</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
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

              <div className="flex items-center gap-2.5 sm:self-center">
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
                  className="text-xs font-semibold text-blue-900 hover:underline p-1.5 cursor-pointer absolute right-10"
                >
                  Manage →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QUICK CHAIRSIDE TOOLS */}
      <div className="bg-slate-900 text-white rounded-2xl p-4.5 sm:p-5 space-y-3.5 shadow-md">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
          Dr. Ken Miller Chairside Shortcuts
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
          <button
            onClick={() => onNavigateTab('patients')}
            className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-98"
          >
            <Users className="w-5 h-5 text-blue-400" />
            <span className="font-bold">Patient EHR</span>
          </button>

          <button
            onClick={() => onNavigateTab('charting')}
            className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-98"
          >
            <Activity className="w-5 h-5 text-cyan-400" />
            <span className="font-bold">Tooth Chart</span>
          </button>

          <button
            onClick={() => onNavigateTab('lab')}
            className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-98"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="font-bold">CEREC & Labs</span>
          </button>

          <button
            onClick={() => onNavigateTab('triage')}
            className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-98"
          >
            <ShieldAlert className="w-5 h-5 text-red-400" />
            <span className="font-bold">Triage Desk</span>
          </button>
        </div>
      </div>

      {/* Quick SOAP Note Modal */}
      <Dialog
        isOpen={showQuickNoteModal}
        onClose={() => setShowQuickNoteModal(false)}
        title="Add Clinical SOAP Note"
        subtitle="Sarah Tremblay • Operatory 1"
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
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-doctor-primary"
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
            Sign & Commit to Chart
          </Button>
        </div>
      </Dialog>
    </div>
  )
}
