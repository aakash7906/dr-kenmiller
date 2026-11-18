import React, { useState } from 'react'
import {
  Calendar,
  Clock,
  MapPin,
  CalendarPlus,
  PhoneCall,
  FileCheck,
  AlertTriangle,
  PlusCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Brush,
  ShieldCheck,
  CreditCard,
  Droplet
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Dialog } from '@/components/ui/Dialog'
import { CURRENT_PATIENT, PATIENT_APPOINTMENTS, ACTIVE_CARE_PLAN, CLINIC_INFO } from '@/data/mockData'
import { PatientTab } from '@/types'

interface PatientHomeProps {
  onNavigate: (tab: PatientTab) => void
}

export const PatientHome: React.FC<PatientHomeProps> = ({ onNavigate }) => {
  const [showCheckInModal, setShowCheckInModal] = useState(false)
  const [showRescheduleModal, setShowRescheduleModal] = useState(false)
  const [showProtocolModal, setShowProtocolModal] = useState(false)
  const [showPreVisitModal, setShowPreVisitModal] = useState(false)
  const [checkInDone, setCheckInDone] = useState(false)

  const upcomingApt = PATIENT_APPOINTMENTS[0]

  return (
    <div className="space-y-4 pb-20">
      {/* Welcome Back & Patient Status Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-patient-primary animate-pulse" />
          <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
            Welcome Back
          </span>
        </div>
        <Badge variant="amber" size="sm" className="font-semibold">
          Patient since {CURRENT_PATIENT.since}
        </Badge>
      </div>

      {/* Greeting card */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Good morning, {CURRENT_PATIENT.name.split(' ')[0]}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Primary Provider: <span className="font-semibold text-slate-700">{CURRENT_PATIENT.primaryDentist}</span>
          </p>
        </div>
        <img
          src={CURRENT_PATIENT.avatar}
          alt={CURRENT_PATIENT.name}
          className="w-12 h-12 rounded-full ring-2 ring-white shadow-md object-cover"
        />
      </div>

      {/* Hygiene Recall Due Banner */}
      <div className="bg-patient-primary-light border border-patient-primary-border rounded-2xl p-3.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-patient-primary text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-patient-primary truncate">Hygiene Recall Due</h4>
            <p className="text-[11px] text-slate-600 truncate">Routine 6-mo cleaning window</p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('appointments')}
          className="shrink-0 bg-patient-primary hover:bg-patient-primary-hover text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-all shadow-2xs cursor-pointer"
        >
          Reserve Slot
        </button>
      </div>

      {/* Confirmed Visit Card (Main Feature) */}
      <Card className="p-4 sm:p-5 border-slate-200 shadow-sm relative overflow-hidden">
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center gap-1.5 bg-patient-primary-light text-patient-primary text-xs font-bold px-2.5 py-1 rounded-full border border-patient-primary-border">
            <span className="w-1.5 h-1.5 rounded-full bg-patient-primary" />
            Confirmed Visit
          </span>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>{upcomingApt.duration}</span>
            <span className="text-slate-300">•</span>
            <span className="cursor-pointer hover:text-slate-800" title="Visit details">ⓘ</span>
          </div>
        </div>

        {/* Appointment Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {upcomingApt.type}
        </h3>

        {/* Details list */}
        <div className="mt-3 space-y-2 text-xs text-slate-600">
          <div className="flex items-start gap-2.5">
            <Calendar className="w-4 h-4 text-patient-primary shrink-0 mt-0.5" />
            <span className="font-semibold text-slate-800">{upcomingApt.date} at {upcomingApt.time.split('–')[0]}</span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="text-slate-400 shrink-0 text-sm">👤</span>
            <span>{upcomingApt.provider}</span>
          </div>
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-patient-primary shrink-0 mt-0.5" />
            <span>{upcomingApt.location}</span>
          </div>
        </div>

        {/* Action Buttons row */}
        <div className="grid grid-cols-2 gap-2.5 mt-4 pt-1">
          <button
            onClick={() => alert(`Added "${upcomingApt.type}" to your device calendar for ${upcomingApt.date}.`)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
          >
            <CalendarPlus className="w-4 h-4 text-patient-primary" />
            <span>Add to Calendar</span>
          </button>
          <button
            onClick={() => setShowRescheduleModal(true)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
          >
            <Clock className="w-4 h-4 text-patient-primary" />
            <span>Reschedule</span>
          </button>
        </div>

        {/* Big Digital Check-in button */}
        <button
          onClick={() => setShowCheckInModal(true)}
          className={`w-full mt-2.5 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
            checkInDone
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-patient-primary hover:bg-patient-primary-hover text-white'
          }`}
        >
          {checkInDone ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Checked In • Dr. Miller's Team Notified</span>
            </>
          ) : (
            <>
              <FileCheck className="w-4 h-4" />
              <span>Digital Check-in Instructions</span>
            </>
          )}
        </button>
      </Card>

      {/* Quick Care Actions Section */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Quick Care Actions
          </h3>
          <span className="text-[11px] text-slate-400 font-medium">St. Paul Clinic</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Book New Visit */}
          <div
            onClick={() => onNavigate('appointments')}
            className="bg-white p-3.5 rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 leading-snug">Book New Visit</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Family & Cosmetic</p>
            </div>
          </div>

          {/* Emergency Care (Urgent highlight) */}
          <div
            onClick={() => onNavigate('emergency')}
            className="bg-gradient-to-br from-rose-50 to-red-50/60 p-3.5 rounded-2xl border border-red-200/80 hover:border-red-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-2xs">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <span className="bg-red-600 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                Urgent
              </span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-red-950 leading-snug">Emergency Care</h4>
              <p className="text-[11px] text-red-700 mt-0.5">Same-Day Priority</p>
            </div>
          </div>

          {/* Call Reception */}
          <a
            href="tel:7806454122"
            className="bg-white p-3.5 rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="w-8 h-8 rounded-xl bg-patient-primary-light text-patient-primary flex items-center justify-center mb-2">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 leading-snug">Call Reception</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 font-mono">{CLINIC_INFO.phone}</p>
            </div>
          </a>

          {/* Pre-Visit Forms */}
          <div
            onClick={() => setShowPreVisitModal(true)}
            className="bg-white p-3.5 rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <FileCheck className="w-4 h-4 text-patient-primary" />
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500" title="Ready to submit" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 leading-snug">Pre-Visit Forms</h4>
              <p className="text-[11px] text-emerald-700 font-medium mt-0.5">Status: Ready</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Care Plan Card */}
      <Card className="p-4 border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="p-1 rounded-md bg-patient-primary-light text-patient-primary">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.8 4c-1.3 0-2.4.7-3.1 1.7-.8-.7-1.8-1.2-3-1.2-1.2 0-2.2.5-3 1.2C9 4.7 7.9 4 6.6 4 4.1 4 2 6.1 2 8.6c0 3.8 2.2 6.8 4 9.1 1.2 1.5 2.5 2.8 3.5 3.7.4.4.8.6 1.2.6.4 0 .8-.2 1.2-.6 1-.9 2.3-2.2 3.5-3.7 1.8-2.3 4-5.3 4-9.1C21.4 6.1 19.3 4 18.8 4z" />
              </svg>
            </span>
            <span className="text-xs font-bold text-slate-900">Active Care Plan</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Plan #{ACTIVE_CARE_PLAN.id}</span>
        </div>

        <h3 className="text-sm sm:text-base font-bold text-slate-900">
          {ACTIVE_CARE_PLAN.title}
        </h3>
        <p className="text-[11px] text-slate-500 mt-0.5">
          {ACTIVE_CARE_PLAN.tooth} • Osseointegration complete
        </p>

        {/* Progress header & tracker */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-patient-primary">Step {ACTIVE_CARE_PLAN.currentStep} of {ACTIVE_CARE_PLAN.totalSteps}</span>
            <span className="text-slate-500 text-[11px]">Final Step: Crown Delivery</span>
          </div>

          {/* Stepper bar */}
          <div className="grid grid-cols-3 gap-1.5 py-1">
            <div className="h-2 rounded-full bg-patient-primary" />
            <div className="h-2 rounded-full bg-patient-primary" />
            <div className="h-2 rounded-full bg-slate-200" />
          </div>

          <div className="grid grid-cols-3 text-[10px] text-slate-600 mt-1 font-medium text-center">
            <span className="text-patient-primary font-semibold flex items-center justify-center gap-0.5">
              ✓ Post Placed
            </span>
            <span className="text-patient-primary font-bold">Abutment Fit</span>
            <span className="text-slate-400">Final Crown</span>
          </div>
        </div>

        {/* Protocol reader mini-card */}
        <div className="mt-3 bg-patient-primary-subtle border border-patient-primary-border rounded-xl p-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-base">📄</span>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">Post-Op & Healing Protocol</div>
              <div className="text-[10px] text-slate-500 truncate">includes soft diet & salt rinse guide</div>
            </div>
          </div>
          <button
            onClick={() => setShowProtocolModal(true)}
            className="shrink-0 text-xs font-bold text-patient-primary bg-white hover:bg-patient-primary-light px-2.5 py-1 rounded-lg border border-patient-primary-border flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Read</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </Card>

      {/* Clinic photo & heritage banner */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
        <div className="h-36 sm:h-44 w-full relative overflow-hidden bg-slate-100">
          <img
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800"
            alt="Dr. Ken Miller Operatory"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm leading-tight text-white">{CLINIC_INFO.name}</h4>
                <p className="text-[11px] text-slate-200 mt-0.5">
                  Compassionate family care in St. Paul since {CLINIC_INFO.sinceYear}.
                </p>
              </div>
              <Badge variant="amber" size="sm" className="font-bold shrink-0">
                ⭐ {CLINIC_INFO.yearsOfCare}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Care & Reminders */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 px-1">
          Daily Care & Reminders
        </h3>

        <div className="space-y-2">
          {/* Toothbrush Replacement */}
          <div className="bg-white p-3 rounded-xl border border-slate-200/90 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
              <Brush className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900">Toothbrush Replacement</h4>
                <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                  90 Days Elapsed
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                Bristle flare reduces plaque removal efficacy by 40%.
              </p>
            </div>
          </div>

          {/* Night Guard Hygiene */}
          <div className="bg-white p-3 rounded-xl border border-slate-200/90 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-patient-primary flex items-center justify-center shrink-0 mt-0.5">
              <Droplet className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-900">Night Guard Hygiene</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                Clean with cool water & mild crystal cleanser; avoid hot water warping.
              </p>
            </div>
          </div>

          {/* Direct Billing on File */}
          <div className="bg-white p-3 rounded-xl border border-slate-200/90 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <CreditCard className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900">Direct Billing On File</h4>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                {CURRENT_PATIENT.insurancePlan} assigned. Zero paper claims needed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Urgent Dental Support Bottom CTA */}
      <div className="bg-slate-900 rounded-2xl p-4 text-white shadow-md relative overflow-hidden">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-red-400">
            Urgent Dental Support
          </span>
        </div>
        <h3 className="text-sm sm:text-base font-bold leading-snug">
          Experiencing acute toothache or trauma?
        </h3>
        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
          Same-day priority walk-in assistance for broken tooth, severe pain, or bleeding.
        </p>

        <a
          href="tel:7806454122"
          className="mt-3 w-full bg-red-600 hover:bg-red-700 active:scale-98 text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-red-900/40"
        >
          <span className="text-base">🚑</span>
          <span>Call Emergency Triage {CLINIC_INFO.phone}</span>
        </a>
      </div>

      {/* Check-In Modal */}
      <Dialog
        isOpen={showCheckInModal}
        onClose={() => setShowCheckInModal(false)}
        title="Digital Check-in Instructions"
        subtitle="Dr. Ken Miller Dental Clinic • Fast Front Desk"
      >
        <div className="space-y-4 text-xs sm:text-sm text-slate-700">
          <div className="bg-teal-50 p-3 rounded-xl border border-teal-200 text-teal-900">
            <p className="font-semibold">Fast Front-Desk Arrival Protocol</p>
            <p className="text-xs mt-1 text-teal-800">
              When arriving at 4703 – 50 Ave (2nd Floor), tap the button below to alert our reception team immediately.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
              <div>
                <strong className="text-slate-900">Arrive 5 minutes prior:</strong> Complimentary fresh coffee, tea, and bottled water are available in the foyer.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
              <div>
                <strong className="text-slate-900">Direct Billing Ready:</strong> Your Alberta Blue Cross digital insurance card is verified.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
              <div>
                <strong className="text-slate-900">Operatory Preparation:</strong> Operatory 1 is prepped for your bitewings and implant examination with Dr. Miller and Lisa (RDH).
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setCheckInDone(true)
              setShowCheckInModal(false)
            }}
            className="w-full bg-patient-primary hover:bg-patient-primary-hover text-white py-3 rounded-xl font-bold transition-all cursor-pointer"
          >
            I Have Arrived at Clinic Lobby
          </button>
        </div>
      </Dialog>

      {/* Reschedule Modal */}
      <Dialog
        isOpen={showRescheduleModal}
        onClose={() => setShowRescheduleModal(false)}
        title="Modify or Reschedule Appointment"
        subtitle="Dr. Ken Miller Practice Coordination"
      >
        <div className="space-y-4 text-xs sm:text-sm">
          <p className="text-slate-600">
            We understand schedules change! Please select your preferred alternative timeframe or call our reception team.
          </p>

          <div className="space-y-2">
            <label className="font-semibold text-slate-800 block text-xs">Preferred Time Window:</label>
            <div className="grid grid-cols-2 gap-2">
              <button className="p-2.5 rounded-xl border border-slate-200 text-xs font-medium hover:border-patient-primary hover:bg-patient-primary-light text-left">
                🌅 Morning (9am – 12pm)
              </button>
              <button className="p-2.5 rounded-xl border border-slate-200 text-xs font-medium hover:border-patient-primary hover:bg-patient-primary-light text-left">
                ☀️ Afternoon (1pm – 4pm)
              </button>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="tel:7806454122"
              className="w-full block text-center bg-patient-primary text-white py-2.5 rounded-xl font-semibold hover:bg-patient-primary-hover"
            >
              Call Reception Directly ({CLINIC_INFO.phone})
            </a>
          </div>
        </div>
      </Dialog>

      {/* Protocol Reader Modal */}
      <Dialog
        isOpen={showProtocolModal}
        onClose={() => setShowProtocolModal(false)}
        title="Post-Op & Healing Protocol"
        subtitle="Tooth #19 Implant Restoration Care"
      >
        <div className="space-y-3 text-xs sm:text-sm text-slate-700">
          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900">
            <strong>Clinical Guidance from Dr. Ken Miller:</strong>
            <p className="mt-1 text-xs">
              "Your titanium implant post is fully osseointegrated into healthy alveolar bone. Keep following these steps until final crown delivery on Nov 15."
            </p>
          </div>
          <div className="space-y-2">
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="text-slate-900 block mb-0.5">Dietary Care:</strong>
              Chew predominantly on the opposite side. Avoid hard nuts, unpopped popcorn kernels, or ice chewing.
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="text-slate-900 block mb-0.5">Salt Water Rinses:</strong>
              Perform 3 gentle warm salt water rinses daily after meals to keep the healing cuff clean and free of biofilm.
            </div>
          </div>
          <Button
            variant="primary"
            fullWidth
            onClick={() => setShowProtocolModal(false)}
          >
            Understood
          </Button>
        </div>
      </Dialog>

      {/* Pre-Visit Forms Modal */}
      <Dialog
        isOpen={showPreVisitModal}
        onClose={() => setShowPreVisitModal(false)}
        title="Pre-Visit Digital Forms"
        subtitle="All documents verified for Sarah Tremblay"
      >
        <div className="space-y-3 text-xs sm:text-sm">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <div className="font-bold text-slate-900">Medical History Questionnaire</div>
              <div className="text-[11px] text-slate-500">Updated Oct 2024 • Penicillin allergy noted</div>
            </div>
            <span className="text-emerald-600 font-bold text-xs">✓ Verified</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <div className="font-bold text-slate-900">Alberta Blue Cross Direct Assignment</div>
              <div className="text-[11px] text-slate-500">Policy #ABC-7761129</div>
            </div>
            <span className="text-emerald-600 font-bold text-xs">✓ Active</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <div className="font-bold text-slate-900">Informed Consent - Crown Seating</div>
              <div className="text-[11px] text-slate-500">E-Signed Nov 1, 2024</div>
            </div>
            <span className="text-emerald-600 font-bold text-xs">✓ On File</span>
          </div>
          <Button
            variant="primary"
            fullWidth
            onClick={() => setShowPreVisitModal(false)}
          >
            Close Forms
          </Button>
        </div>
      </Dialog>
    </div>
  )
}
