import React, { useState } from 'react'
import {
  PackageCheck,
  Truck,
  HeartPulse,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  Calendar,
  Clock,
  Sparkles,
  Search,
  Cpu,
  Flame,
  Check,
  RotateCcw,
  Box
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { LAB_CASES, CEREC_MILLING_CASES, CURRENT_PATIENT } from '@/data/mockData'
import { LabCase, CerecMillingCase } from '@/types'

export const DoctorLabAndPostOp: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'cerec' | 'labs' | 'postOp'>('cerec')
  const [labCases, setLabCases] = useState<LabCase[]>(LAB_CASES)
  const [cerecCases, setCerecCases] = useState<CerecMillingCase[]>(CEREC_MILLING_CASES)

  // Remote post op logs mock
  const [patientLogs] = useState([
    {
      id: 'log-1',
      patientName: 'Sarah Tremblay',
      chartNumber: 'KM-6421',
      procedure: 'Implant Post #19 (Day 6)',
      status: 'comfortable',
      painText: 'Comfortable (Pain scale 1/10)',
      time: 'Today at 8:16 AM',
      notes: 'Completed warm salt water rinses. No bleeding.'
    },
    {
      id: 'log-2',
      patientName: 'Marcus Vance',
      chartNumber: 'KM-5819',
      procedure: 'Crown Temp #14 (Day 2)',
      status: 'mild',
      painText: 'Mild Aching (Pain scale 3/10)',
      time: 'Yesterday at 7:30 PM',
      notes: 'Mild thermal sensitivity to cold water. Taking OTC Tylenol.'
    },
    {
      id: 'log-3',
      patientName: 'Dennis Tremblay',
      chartNumber: 'KM-3990',
      procedure: 'Surgical Extraction #32 (Day 3)',
      status: 'alert',
      painText: 'Noticeable Pain (Pain scale 6/10)',
      time: 'Today at 9:02 AM',
      notes: 'Reports throbbing sensation at night. Requested callback from nurse.'
    }
  ])

  const handleAdvanceCerecStage = (id: string) => {
    setCerecCases(prev => prev.map(c => {
      if (c.id !== id) return c
      if (c.stage === 'cad_design') return { ...c, stage: 'milling', estimatedMinutesLeft: 11, millingUnit: 'CEREC Primemill Unit 1' }
      if (c.stage === 'milling') return { ...c, stage: 'crystallization', estimatedMinutesLeft: 5, millingUnit: 'SpeedFire Sintering Furnace' }
      if (c.stage === 'crystallization') return { ...c, stage: 'ready_to_seat', estimatedMinutesLeft: 0 }
      if (c.stage === 'ready_to_seat') return { ...c, stage: 'seated', estimatedMinutesLeft: 0 }
      return c
    }))
  }

  return (
    <div className="space-y-6 pb-28 pt-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-doctor-primary tracking-tight">
            CEREC In-House & Lab Hub
          </h2>
        </div>

        {/* 3-Way Subtab Toggle */}
        <div className="bg-slate-200/80 p-1.5 rounded-2xl flex items-center gap-1 text-xs font-bold overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveSubTab('cerec')}
            className={`py-2 px-3.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === 'cerec'
                ? 'bg-doctor-primary text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>CEREC (4)</span>
          </button>
          <button
            onClick={() => setActiveSubTab('labs')}
            className={`py-2 px-3 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === 'labs'
                ? 'bg-doctor-primary text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Lab (3)
          </button>
          <button
            onClick={() => setActiveSubTab('postOp')}
            className={`py-2 px-3 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeSubTab === 'postOp'
                ? 'bg-doctor-primary text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <span>Post Op Telemetry</span>
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          </button>
        </div>
      </div>

      {/* SUBTAB 0: CEREC SAME-DAY CAD/CAM IN-OFFICE MILLING */}
      {activeSubTab === 'cerec' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-900 to-indigo-950 rounded-2xl p-4.5 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-200">
                  Dr. Ken Miller • CEREC Doctor Mentor Station
                </span>
              </div>
              <h3 className="text-base font-extrabold">In-House CAD/CAM Milling Queue</h3>
              <p className="text-xs text-blue-200">
                Dentsply Sirona Primemill & SpeedFire furnace running live in clinic lab.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl text-center shrink-0 border border-white/20">
              <div className="text-lg font-mono font-black text-cyan-300">4 Active</div>
              <span className="text-[10px] text-white/80 uppercase font-bold">Same-Day Units</span>
            </div>
          </div>

          <div className="space-y-3.5">
            {cerecCases.map(cerec => {
              const isMilling = cerec.stage === 'milling'
              const isReady = cerec.stage === 'ready_to_seat'
              const isFurnace = cerec.stage === 'crystallization'

              return (
                <div
                  key={cerec.id}
                  className={`p-4.5 sm:p-5 rounded-2xl border transition-all shadow-2xs space-y-3.5 ${
                    isReady
                      ? 'bg-emerald-50/30 border-emerald-300'
                      : isMilling
                      ? 'bg-blue-50/30 border-blue-300 ring-2 ring-blue-400/20'
                      : 'bg-white border-slate-200/90'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="min-w-8 h-8 px-2 rounded-xl bg-doctor-primary text-white font-mono font-bold flex items-center justify-center text-xs shadow-2xs shrink-0 whitespace-nowrap">
                          {cerec.toothNumber}
                        </span>
                        <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                          {cerec.patientName}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-500 font-bold bg-slate-100 px-2 py-0.5 rounded">
                          {cerec.chartNumber}
                        </span>
                        <Badge
                          variant={isReady ? 'emerald' : isMilling ? 'blue' : isFurnace ? 'amber' : 'gray'}
                          size="sm"
                          className="font-bold uppercase tracking-wider"
                        >
                          {cerec.stage.replace('_', ' ')}
                        </Badge>
                      </div>

                      <div className="text-xs text-slate-700 font-semibold pt-0.5">
                        {cerec.material} • Shade: <strong className="text-doctor-primary">{cerec.shade}</strong>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {cerec.millingUnit} • Prep: {cerec.prepTime} • DDS: {cerec.provider}
                      </div>
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      {isReady ? (
                        <div className="space-y-1">
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-xl inline-block">
                            ✓ Ready for Cementation
                          </span>
                          <span className="text-[10px] text-slate-500 block">Deliver to Operatory</span>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">
                            Estimated Completion
                          </span>
                          <span className="text-base font-mono font-extrabold text-doctor-primary block">
                            {cerec.estimatedMinutesLeft} Min Left
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Visual 5-Stage Stepper Bar */}
                  <div className="grid grid-cols-5 gap-1.5 pt-1 text-[10px] font-bold text-center">
                    {[
                      { step: 'digital_scan', label: '1. Scan' },
                      { step: 'cad_design', label: '2. Design' },
                      { step: 'milling', label: '3. Primemill' },
                      { step: 'crystallization', label: '4. Sinter' },
                      { step: 'ready_to_seat', label: '5. Seat' }
                    ].map(st => {
                      const stagesOrder = ['digital_scan', 'cad_design', 'milling', 'crystallization', 'ready_to_seat', 'seated']
                      const currentIndex = stagesOrder.indexOf(cerec.stage)
                      const thisIndex = stagesOrder.indexOf(st.step)
                      const isComplete = thisIndex < currentIndex
                      const isCurrent = thisIndex === currentIndex

                      return (
                        <div
                          key={st.step}
                          className={`p-1.5 rounded-lg border transition-all ${
                            isCurrent
                              ? 'bg-doctor-primary text-white border-doctor-primary shadow-xs'
                              : isComplete
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-slate-50 text-slate-400 border-slate-200'
                          }`}
                        >
                          <span className="block truncate">{st.label}</span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Stage Advancement Action Button */}
                  <div className="flex items-center justify-end pt-1 border-t border-slate-100">
                    <button
                      onClick={() => handleAdvanceCerecStage(cerec.id)}
                      className="text-xs font-bold text-doctor-primary hover:bg-blue-50 py-1.5 px-3 rounded-xl border border-blue-200 transition-all cursor-pointer active:scale-98 flex items-center gap-1"
                    >
                      <span>Advance Stage →</span>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 1: DENTAL LAB PROSTHETICS */}
      {activeSubTab === 'labs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Active Dental Laboratory Orders
            </h3>
            <span className="text-xs text-slate-400">Aurum Ceramic & Precision Craft</span>
          </div>

          <div className="space-y-3.5">
            {labCases.map((lab) => {
              const isDelivered = lab.status === 'delivered_at_clinic'
              const isShipped = lab.status === 'shipped'

              return (
                <div
                  key={lab.id}
                  className={`p-4.5 sm:p-5.5 rounded-2xl border transition-all shadow-2xs space-y-3 ${
                    isDelivered ? 'bg-emerald-50/20 border-emerald-300' : 'bg-white border-slate-200/90'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="min-w-8 h-8 px-2.5 rounded-xl bg-doctor-primary text-white font-mono font-bold flex items-center justify-center text-xs shadow-2xs shrink-0 whitespace-nowrap">
                          {lab.toothNumber}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900">
                          {lab.patientName}
                        </h4>
                        <Badge
                          variant={isDelivered ? 'emerald' : isShipped ? 'blue' : 'amber'}
                          size="sm"
                          className="font-bold"
                        >
                          {isDelivered
                            ? 'Delivered at Clinic'
                            : isShipped
                            ? 'In Transit'
                            : 'In Fabrication'}
                        </Badge>
                      </div>

                      <p className="text-xs sm:text-sm font-semibold text-slate-800">
                        {lab.type}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
                        <span>Lab: <strong className="text-slate-700">{lab.labName}</strong></span>
                        <span>•</span>
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold">
                          Shade: {lab.shade}
                        </span>
                      </div>
                    </div>

                    <div className="text-left sm:text-right space-y-1 shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Target Seating Date
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 block">
                        {lab.expectedDelivery}
                      </span>
                      {isDelivered && (
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2.5 py-0.5 rounded-full inline-block">
                          ✓ In Clinic Lab Box
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 2: REMOTE POST-OP RECOVERY FEED */}
      {activeSubTab === 'postOp' && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs text-blue-950 flex items-start gap-3 shadow-2xs">
            <HeartPulse className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="block font-bold text-xs uppercase tracking-wide">Tele-Dentistry & Recovery Monitoring</strong>
              <p className="text-[11px] text-blue-900 leading-relaxed">
                Patients log daily pain levels and healing symptoms directly through the patient portal. Staff are notified immediately if pain scores spike.
              </p>
            </div>
          </div>

          <div className="space-y-3.5">
            {patientLogs.map((log) => {
              const isAlert = log.status === 'alert'
              const isComfortable = log.status === 'comfortable'

              return (
                <div
                  key={log.id}
                  className={`p-4.5 sm:p-5 rounded-2xl border transition-all shadow-2xs space-y-3 ${
                    isAlert
                      ? 'bg-rose-50/70 border-rose-300'
                      : isComfortable
                      ? 'bg-white border-slate-200/90'
                      : 'bg-amber-50/40 border-amber-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg shadow-2xs ${
                          isAlert
                            ? 'bg-red-100 text-red-700'
                            : isComfortable
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {isAlert ? '😣' : isComfortable ? '😊' : '😐'}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-bold text-slate-900">
                            {log.patientName}
                          </h4>
                          <span className="text-[10px] text-slate-400">({log.time})</span>
                        </div>

                        <p className="text-xs font-semibold text-slate-800">
                          {log.procedure} •{' '}
                          <span
                            className={`font-bold ${
                              isAlert ? 'text-red-700' : isComfortable ? 'text-emerald-700' : 'text-amber-700'
                            }`}
                          >
                            {log.painText}
                          </span>
                        </p>

                        <p className="text-xs text-slate-600 italic bg-black/5 p-2 rounded-lg mt-1">
                          "{log.notes}"
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      {isAlert && (
                        <button
                          onClick={() => alert(`Dialing ${log.patientName}...`)}
                          className="text-xs font-bold bg-red-600 hover:bg-red-700 text-white py-2 px-3.5 rounded-xl flex items-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-98"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>Call Patient</span>
                        </button>
                      )}
                      {isComfortable && (
                        <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-xl">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Healing Normal</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
