import React, { useState } from 'react'
import {
  PhoneCall,
  AlertTriangle,
  Clock,
  MapPin,
  Hospital,
  Send,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Droplets,
  Activity
} from 'lucide-react'
import { ToothIcon } from '@/components/ui/ToothIcon'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { EMERGENCY_PROTOCOLS, CLINIC_INFO } from '@/data/mockData'
import { EmergencyProtocol } from '@/types'

interface PatientEmergencyProps {
  onNotifyArrivalSuccess?: () => void
}

export const PatientEmergency: React.FC<PatientEmergencyProps> = ({
  onNotifyArrivalSuccess
}) => {
  const [selectedProtocol, setSelectedProtocol] = useState<EmergencyProtocol | null>(null)
  const [showNotifyModal, setShowNotifyModal] = useState(false)
  const [eta, setEta] = useState('15')
  const [patientConditionNote, setPatientConditionNote] = useState('Knocked-out tooth stored in cold whole milk.')
  const [notifiedDone, setNotifiedDone] = useState(false)

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setNotifiedDone(true)
    if (onNotifyArrivalSuccess) {
      onNotifyArrivalSuccess()
    }
  }

  const getProtocolIcon = (id: string) => {
    switch (id) {
      case 'emg-1':
        return <ToothIcon className="w-5 h-5 text-patient-emergency" />
      case 'emg-2':
        return <Activity className="w-5 h-5 text-amber-600" />
      case 'emg-3':
        return <ShieldAlert className="w-5 h-5 text-sky-600" />
      case 'emg-4':
      default:
        return <Droplets className="w-5 h-5 text-rose-600" />
    }
  }

  return (
    <div className="space-y-6 pb-28 pt-2.5">
      {/* 1. Top On-Call Pulse Bar */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-patient-emergency animate-ping" />
          <span className="text-xs font-black uppercase tracking-wider text-patient-emergency">
            Live Emergency Triage Active
          </span>
        </div>
        <span className="text-[11px] font-bold text-slate-500">
          St. Paul Clinic
        </span>
      </div>

      {/* 2. Hero Emergency Action Card (Visual, Direct & High Visibility) */}
      <div className="bg-patient-emergency rounded-2xl p-4 sm:p-5 text-white shadow-md relative overflow-hidden space-y-4">
        {/* Background Watermark */}
        <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
          <ToothIcon className="w-36 h-36 text-white" />
        </div>

        <div className="relative z-10 flex items-start justify-between">
          <div>
          
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
              Urgent Dental Emergency?
            </h2>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md text-white flex items-center justify-center shrink-0">
            <PhoneCall className="w-5 h-5" />
          </div>
        </div>

        {/* Action Buttons: Call Now & Notify Dispatch */}
        <div className="relative z-10 space-y-2 pt-0.5">
          <a
            href="tel:7806454122"
            className="w-full h-9 bg-white hover:bg-red-50 text-patient-emergency font-extrabold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-99 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-patient-emergency" />
            <span>Call Clinic Direct: (780) 645-4122</span>
          </a>

          <button
            onClick={() => setShowNotifyModal(true)}
            className="w-full bg-white/15 hover:bg-white/25 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all backdrop-blur-sm cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Notify Clinic: I'm En Route (Prep Bay)</span>
          </button>
        </div>
      </div>

      {/* 3. First-Aid Protocols: Visual 2x2 Grid (No Text Overload) */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
            First-Aid Action Protocols
          </h3>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Tap Card for Steps
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {EMERGENCY_PROTOCOLS.map((proto) => {
            const isRed = proto.badgeVariant === 'red'
            const isAmber = proto.badgeVariant === 'amber'

            return (
              <div
                key={proto.id}
                onClick={() => setSelectedProtocol(proto)}
                className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between h-38 group"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                      isRed
                        ? 'bg-rose-50 border-rose-100'
                        : isAmber
                        ? 'bg-amber-50 border-amber-100'
                        : 'bg-sky-50 border-sky-100'
                    }`}
                  >
                    {getProtocolIcon(proto.id)}
                  </div>
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      isRed
                        ? 'bg-rose-100 text-rose-800'
                        : isAmber
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-sky-100 text-sky-800'
                    }`}
                  >
                    {proto.urgencyBadge}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-patient-emergency transition-colors line-clamp-1">
                    {proto.title.split('(')[0].trim()}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                    {proto.id === 'emg-1' && 'Handle crown only. Submerge in milk or saliva.'}
                    {proto.id === 'emg-2' && 'Cold compress on cheek. Never put aspirin on gum.'}
                    {proto.id === 'emg-3' && 'Recover fragments in milk. Warm water rinse.'}
                    {proto.id === 'emg-4' && 'Firm sterile gauze pressure for 15 minutes.'}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] font-bold text-patient-primary group-hover:translate-x-0.5 transition-transform pt-1 border-t border-slate-100">
                  <span>View Steps</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-patient-primary" />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 4. Location & Hospital Emergency Backup (Glanceable 2-Card Grid) */}
      <div className="space-y-3 pt-1">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 px-1">
          Clinic Location & Hospital ER
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {/* Clinic Location Card */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between h-36">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-patient-primary-light text-patient-primary flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-slate-900 truncate">Dr. Ken Miller</h4>
                <span className="text-[10px] text-emerald-700 font-bold block">Open Mon–Fri</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 leading-tight">
              4703 – 50 Ave (2nd Floor), St. Paul, AB
            </p>

            <a
              href="https://maps.google.com/?q=4703+50+Ave+St+Paul+AB"
              target="_blank"
              rel="noreferrer"
              className="w-full py-1.5 bg-slate-50 hover:bg-slate-100 text-patient-primary text-[11px] font-bold rounded-lg border border-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Hospital ER Backup Card */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between h-36">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-patient-emergency-light text-patient-emergency flex items-center justify-center shrink-0 border border-patient-emergency-border/60">
                <Hospital className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-slate-900 truncate">Hospital ER</h4>
                <span className="text-[10px] text-patient-emergency font-bold block">24/7 Trauma</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 leading-tight">
              St. Therese Centre, 4713 48 Ave
            </p>

            <a
              href="https://maps.google.com/?q=St+Therese+Healthcare+Centre+St+Paul+AB"
              target="_blank"
              rel="noreferrer"
              className="w-full py-1.5 bg-rose-50 hover:bg-rose-100 text-patient-emergency text-[11px] font-bold rounded-lg border border-rose-200/80 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>ER Route</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* 5. Emergency Protocol Detail Dialog */}
      <Dialog
        isOpen={!!selectedProtocol}
        onClose={() => setSelectedProtocol(null)}
        title={selectedProtocol?.title || 'Emergency Protocol'}
        subtitle={selectedProtocol?.urgencyBadge || 'Clinical Guidance'}
      >
        {selectedProtocol && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-700">
            {selectedProtocol.protocolTitle && (
              <div className="text-xs font-bold text-patient-emergency flex items-center gap-1.5 bg-patient-emergency-light p-2.5 rounded-xl border border-patient-emergency-border/60">
                <AlertTriangle className="w-4 h-4 text-patient-emergency shrink-0" />
                <span>{selectedProtocol.protocolTitle}</span>
              </div>
            )}

            <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              <strong className="text-slate-900 block font-bold text-xs uppercase tracking-wide">
                Immediate Action Steps:
              </strong>
              <ul className="space-y-2">
                {selectedProtocol.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-700 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-patient-primary shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {selectedProtocol.crucialWarning && (
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-semibold leading-relaxed">
                ⚠️ {selectedProtocol.crucialWarning}
              </div>
            )}

            <div className="space-y-2 pt-1">
              <a
                href="tel:7806454122"
                className="w-full py-2.5 px-4 bg-patient-emergency hover:bg-patient-emergency-hover text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Clinic Triage: (780) 645-4122</span>
              </a>

              <button
                onClick={() => {
                  setSelectedProtocol(null)
                  setShowNotifyModal(true)
                }}
                className="w-full py-2 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Notify Clinic I'm Arriving</span>
              </button>
            </div>
          </div>
        )}
      </Dialog>

      {/* 6. Notify Arrival Modal */}
      <Dialog
        isOpen={showNotifyModal}
        onClose={() => setShowNotifyModal(false)}
        title="Notify Dr. Miller's Clinic of Arrival"
        subtitle="Live Triage Dispatch • Operatory Bay Prep"
      >
        {notifiedDone ? (
          <div className="py-4 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Emergency Alert Transmitted!</h4>
            <p className="text-xs text-slate-600">
              Dr. Ken Miller and chairside assistants have been paged. Operatory is being prepped for your arrival in ~{eta} minutes.
            </p>
            <Button
              variant="primary"
              fullWidth
              onClick={() => {
                setNotifiedDone(false)
                setShowNotifyModal(false)
              }}
            >
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleNotifySubmit} className="space-y-3.5 text-xs sm:text-sm">
            <p className="text-slate-600 text-xs">
              Alert the clinical team so we can prepare anesthetic, sterile trays, and radiograph equipment before you step in the door.
            </p>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1.5">
                Estimated Arrival Time (ETA):
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['10 mins', '15 mins', '30 mins'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setEta(option.split(' ')[0])}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      eta === option.split(' ')[0]
                        ? 'bg-patient-emergency text-white border-patient-emergency shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1.5">
                Brief Situation Details:
              </label>
              <textarea
                value={patientConditionNote}
                onChange={(e) => setPatientConditionNote(e.target.value)}
                rows={2}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-patient-emergency"
              />
            </div>

            <Button type="submit" variant="emergency" fullWidth>
              Send High-Priority Alert to Clinic Desk
            </Button>
          </form>
        )}
      </Dialog>
    </div>
  )
}
