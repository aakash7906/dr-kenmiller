import React, { useState } from 'react'
import {
  PhoneCall,
  AlertTriangle,
  Clock,
  ChevronDown,
  ChevronUp,
  MapPin,
  Mail,
  Hospital,
  ShieldAlert,
  Send,
  CheckCircle2,
  ExternalLink
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Dialog } from '@/components/ui/Dialog'
import { EMERGENCY_PROTOCOLS, CLINIC_INFO } from '@/data/mockData'

interface PatientEmergencyProps {
  onNotifyArrivalSuccess?: () => void
}

export const PatientEmergency: React.FC<PatientEmergencyProps> = ({
  onNotifyArrivalSuccess
}) => {
  const [expandedId, setExpandedId] = useState<string>('emg-1')
  const [showNotifyModal, setShowNotifyModal] = useState(false)
  const [eta, setEta] = useState('15')
  const [patientConditionNote, setPatientConditionNote] = useState('Knocked-out tooth stored in cold whole milk.')
  const [notifiedDone, setNotifiedDone] = useState(false)

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? '' : id))
  }

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setNotifiedDone(true)
    if (onNotifyArrivalSuccess) {
      onNotifyArrivalSuccess()
    }
  }

  return (
    <div className="space-y-4 pb-20">
      {/* Top On-Call Status Banner */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-red-700">
            On-Call Response Ready
          </span>
        </div>
        <span className="text-[11px] font-semibold text-slate-500">
          St. Paul, AB
        </span>
      </div>

      {/* Urgent Triage Line (Hero Card in Deep Crimson) */}
      <div className="bg-gradient-to-br from-[var(--patient-emergency-dark)] via-[var(--patient-emergency-hover)] to-[var(--patient-emergency-darker)] rounded-2xl p-4 sm:p-5 text-white shadow-lg shadow-red-900/20 relative overflow-hidden">
        {/* Subtle background dental watermark */}
        <div className="absolute -right-6 -bottom-6 opacity-10">
          <svg className="w-36 h-36 fill-white" viewBox="0 0 24 24">
            <path d="M18.8 4c-1.3 0-2.4.7-3.1 1.7-.8-.7-1.8-1.2-3-1.2-1.2 0-2.2.5-3 1.2C9 4.7 7.9 4 6.6 4 4.1 4 2 6.1 2 8.6c0 3.8 2.2 6.8 4 9.1 1.2 1.5 2.5 2.8 3.5 3.7.4.4.8.6 1.2.6.4 0 .8-.2 1.2-.6 1-.9 2.3-2.2 3.5-3.7 1.8-2.3 4-5.3 4-9.1C21.4 6.1 19.3 4 18.8 4z" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 text-rose-200 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4 text-red-300" />
            <span>Urgent Triage Line</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Urgent Dental Emergency?
          </h2>

          <p className="text-xs text-rose-100 mt-1.5 leading-relaxed">
            Rapid intervention prevents tooth loss and manages acute pain. Don't wait — contact our clinical response team directly:
          </p>

          {/* Big Direct Call Button */}
          <a
            href="tel:7806454122"
            className="mt-3.5 w-full bg-white hover:bg-rose-50 text-red-950 font-black text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-red-700" />
            <span>Call Clinic Direct: {CLINIC_INFO.phone}</span>
          </a>

          {/* Severe After Hours Note */}
          <div className="mt-3 bg-red-950/60 border border-red-500/30 rounded-xl p-2.5 flex items-start gap-2 text-[11px] text-rose-200">
            <span className="text-amber-400 font-bold shrink-0">ⓘ</span>
            <p className="leading-snug">
              <strong className="text-white">Severe After-Hours Note:</strong> For trauma, uncontrolled bleeding, or severe facial swelling, call immediately and follow automated instructions to page the on-call dentist.
            </p>
          </div>
        </div>
      </div>

      {/* Emergency First-Aid Triage Accordions */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Emergency First-Aid Triage
            </h3>
            <p className="text-[11px] text-slate-500">
              Take immediate action while heading to our clinic
            </p>
          </div>
          <span className="text-base">🛡️</span>
        </div>

        <div className="space-y-2.5">
          {EMERGENCY_PROTOCOLS.map((proto) => {
            const isExpanded = expandedId === proto.id

            return (
              <div
                key={proto.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs transition-all"
              >
                {/* Header Row */}
                <button
                  type="button"
                  onClick={() => toggleExpand(proto.id)}
                  className="w-full p-3.5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50/60"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        proto.badgeVariant === 'red'
                          ? 'bg-rose-50 text-rose-700'
                          : proto.badgeVariant === 'amber'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {proto.id === 'emg-1' && <Clock className="w-4 h-4" />}
                      {proto.id === 'emg-2' && <span className="text-sm">😣</span>}
                      {proto.id === 'emg-3' && <span className="text-sm">🦷</span>}
                      {proto.id === 'emg-4' && <span className="text-sm">🩸</span>}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {proto.title}
                        </h4>
                        {proto.urgencyBadge && (
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                              proto.badgeVariant === 'red'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {proto.urgencyBadge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {proto.id === 'emg-1' && 'Avulsed permanent tooth instructions'}
                        {proto.id === 'emg-2' && 'Infection or suspected dental abscess'}
                        {proto.id === 'emg-3' && 'Crown fractures and structural cracks'}
                        {proto.id === 'emg-4' && 'Lacerated lips, tongue, or bleeding gums'}
                      </p>
                    </div>
                  </div>

                  <div className="text-slate-400 pl-2">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Collapsible Content */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-slate-100 space-y-3 animate-in fade-in duration-150">
                    {proto.protocolTitle && (
                      <div className="text-xs font-bold text-red-900 flex items-center gap-1.5 mt-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                        <span>{proto.protocolTitle}</span>
                      </div>
                    )}

                    <ul className="space-y-2 text-xs text-slate-700">
                      {proto.steps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-patient-primary shrink-0 mt-0.5" />
                          <span className="leading-snug">{step}</span>
                        </li>
                      ))}
                    </ul>

                    {proto.crucialWarning && (
                      <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-[11px] text-rose-900 font-semibold leading-relaxed">
                        ⚠️ {proto.crucialWarning}
                      </div>
                    )}

                    {/* Quick Arrival Notification Button */}
                    {proto.actionLabel && (
                      <div className="pt-1">
                        <button
                          onClick={() => setShowNotifyModal(true)}
                          className="w-full py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>{proto.actionLabel}</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Clinic Location & Map View */}
      <Card className="overflow-hidden border-slate-200 shadow-2xs">
        <div className="h-40 w-full relative bg-slate-200">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=700"
            alt="St. Paul Dental Location"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/35 flex items-center justify-center p-3 text-center">
            <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg border border-white">
              <div className="flex items-center gap-1.5 text-xs font-bold text-patient-primary">
                <MapPin className="w-4 h-4 text-red-600" />
                <span>Main St. Paul Dental Center</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">Serving St. Paul & Lakeland since 1986</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <h4 className="text-sm font-bold text-slate-900">{CLINIC_INFO.name}</h4>
            <p className="text-xs text-slate-600 mt-0.5">{CLINIC_INFO.fullAddress}</p>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] text-slate-600 flex items-start gap-2">
            <span className="text-base">♿</span>
            <p>Elevator and wide accessible stair access available through the main lobby entrance.</p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href="https://maps.google.com/?q=4703+50+Ave+St+Paul+AB"
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-3 rounded-xl bg-patient-primary hover:bg-patient-primary-hover text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Google Maps</span>
            </a>
            <a
              href="https://maps.apple.com/?q=4703+50+Ave+St+Paul+AB"
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold text-center flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Apple Maps</span>
            </a>
          </div>
        </div>
      </Card>

      {/* Operating Hours & Practice Info */}
      <Card className="p-4 border-slate-200 shadow-2xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
          Operating Hours & Practice Info
        </h3>

        <div className="space-y-1.5 text-xs text-slate-700">
          <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50/70 border border-emerald-100">
            <span className="font-semibold text-slate-900">Monday – Friday</span>
            <span className="font-bold text-emerald-800">8:30 AM – 4:30 PM (Open)</span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 text-slate-600">
            <span className="font-medium">Saturday – Sunday</span>
            <span className="font-medium text-slate-500">Closed (Pager Monitored)</span>
          </div>
        </div>

        {/* Direct Insurance Billing note */}
        <div className="bg-patient-primary-subtle p-3 rounded-xl border border-patient-primary-border flex items-start gap-2.5 text-xs">
          <span className="text-base">💳</span>
          <div>
            <strong className="text-slate-900 block">Direct Insurance Billing:</strong>
            <p className="text-[11px] text-slate-600 mt-0.5">
              We bill directly to all major Canadian dental plans (Alberta Blue Cross, Sun Life, Canada Life, Manulife).
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 text-xs">
          <span className="text-slate-500 font-mono text-[11px]">{CLINIC_INFO.email}</span>
          <a
            href={`mailto:${CLINIC_INFO.email}`}
            className="text-xs font-bold text-patient-primary hover:underline flex items-center gap-1"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email Us</span>
          </a>
        </div>

        {/* Regional Hospital Backup */}
        <div className="bg-slate-100/80 p-3 rounded-xl border border-slate-200/90 flex items-start gap-2.5 text-xs text-slate-700">
          <Hospital className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-900 block text-[11px]">Regional Hospital ER Backup:</strong>
            <p className="text-[11px] text-slate-600 mt-0.5">
              {CLINIC_INFO.emergencyBackup}
            </p>
          </div>
        </div>
      </Card>

      {/* Notify Arrival Modal */}
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
              Dr. Ken Miller and chairside assistants have been paged. Operatory 1 is being prepped for your arrival in ~{eta} minutes.
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
          <form onSubmit={handleNotifySubmit} className="space-y-3 text-xs sm:text-sm">
            <p className="text-slate-600 text-xs">
              Alert the clinical team so we can prepare anesthetic, sterile trays, and radiograph equipment before you step in the door.
            </p>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                Estimated Arrival Time (ETA):
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['10 mins', '15 mins', '30 mins'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setEta(option.split(' ')[0])}
                    className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                      eta === option.split(' ')[0]
                        ? 'bg-red-600 text-white border-red-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                Brief Situation Details:
              </label>
              <textarea
                value={patientConditionNote}
                onChange={(e) => setPatientConditionNote(e.target.value)}
                rows={2}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-600"
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
