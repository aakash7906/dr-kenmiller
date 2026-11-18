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
  Search
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { LAB_CASES, CURRENT_PATIENT } from '@/data/mockData'
import { LabCase } from '@/types'

export const DoctorLabAndPostOp: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'labs' | 'postOp'>('labs')
  const [labCases, setLabCases] = useState<LabCase[]>(LAB_CASES)

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

  return (
    <div className="space-y-4 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900">
            Prosthetics & Patient Recovery
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#0F2B48] tracking-tight">
            Lab Cases & Post-Op Tracker
          </h2>
        </div>

        {/* Tab Toggle */}
        <div className="bg-slate-200/80 p-1 rounded-xl flex items-center gap-1 text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('labs')}
            className={`py-1.5 px-3 rounded-lg transition-all ${
              activeSubTab === 'labs'
                ? 'bg-[#0F2B48] text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Dental Lab Prosthetics (3)
          </button>
          <button
            onClick={() => setActiveSubTab('postOp')}
            className={`py-1.5 px-3 rounded-lg transition-all flex items-center gap-1 ${
              activeSubTab === 'postOp'
                ? 'bg-[#0F2B48] text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <span>Remote Recovery Feed</span>
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          </button>
        </div>
      </div>

      {/* SUBTAB 1: DENTAL LAB PROSTHETICS */}
      {activeSubTab === 'labs' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Active Dental Laboratory Orders
            </h3>
            <span className="text-xs text-slate-500">Aurum & Precision Craft</span>
          </div>

          <div className="space-y-3">
            {labCases.map((lab) => {
              const isDelivered = lab.status === 'delivered_at_clinic'
              const isShipped = lab.status === 'shipped'

              return (
                <Card
                  key={lab.id}
                  className={`p-4 border transition-all ${
                    isDelivered ? 'bg-emerald-50/30 border-emerald-300' : 'border-slate-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-[#0F2B48] text-white font-mono font-bold flex items-center justify-center text-xs">
                          {lab.toothNumber}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">
                          {lab.patientName}
                        </h4>
                        <span className="text-xs font-mono text-slate-500">#{lab.chartNumber}</span>
                        <Badge
                          variant={isDelivered ? 'emerald' : isShipped ? 'blue' : 'amber'}
                          size="sm"
                        >
                          {isDelivered
                            ? 'Delivered at Clinic (In Lab Box)'
                            : isShipped
                            ? 'Shipped (In Transit)'
                            : 'In Fabrication'}
                        </Badge>
                      </div>

                      <p className="text-xs font-semibold text-slate-800 mt-1">
                        {lab.type}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Lab: <strong className="text-slate-700">{lab.labName}</strong> • Shade:{' '}
                        <span className="font-semibold text-teal-800">{lab.shade}</span>
                      </p>
                    </div>

                    <div className="text-right sm:self-center">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Target Seating Date
                      </span>
                      <span className="text-xs font-bold text-slate-900 block">
                        {lab.expectedDelivery}
                      </span>
                      {isDelivered && (
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-1">
                          ✓ Ready for Operatory 1
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 2: REMOTE POST-OP RECOVERY FEED */}
      {activeSubTab === 'postOp' && (
        <div className="space-y-3">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-950 flex items-start gap-2.5">
            <HeartPulse className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Tele-Dentistry & Recovery Monitoring</strong>
              <p className="text-[11px] text-blue-900 mt-0.5">
                Patients log daily pain levels and healing symptoms directly through the patient portal. Staff are notified immediately if pain scores spike.
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            {patientLogs.map((log) => {
              const isAlert = log.status === 'alert'
              const isComfortable = log.status === 'comfortable'

              return (
                <div
                  key={log.id}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isAlert
                      ? 'bg-rose-50 border-rose-300'
                      : isComfortable
                      ? 'bg-white border-slate-200'
                      : 'bg-amber-50/50 border-amber-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-base ${
                          isAlert
                            ? 'bg-red-100 text-red-700'
                            : isComfortable
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {isAlert ? '😣' : isComfortable ? '😊' : '😐'}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">
                            {log.patientName}
                          </h4>
                          <span className="text-[10px] font-mono text-slate-500">
                            #{log.chartNumber}
                          </span>
                          <span className="text-[10px] text-slate-400">({log.time})</span>
                        </div>

                        <p className="text-xs font-semibold text-slate-800 mt-0.5">
                          {log.procedure} •{' '}
                          <span
                            className={`font-bold ${
                              isAlert ? 'text-red-700' : isComfortable ? 'text-emerald-700' : 'text-amber-700'
                            }`}
                          >
                            {log.painText}
                          </span>
                        </p>

                        <p className="text-[11px] text-slate-600 mt-1 italic">
                          "{log.notes}"
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      {isAlert && (
                        <button
                          onClick={() => alert(`Dialing ${log.patientName}...`)}
                          className="text-xs font-bold bg-red-600 hover:bg-red-700 text-white py-1.5 px-3 rounded-xl flex items-center gap-1.5 shadow-xs"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>Call Patient</span>
                        </button>
                      )}
                      {isComfortable && (
                        <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
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
