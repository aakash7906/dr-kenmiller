import React, { useState } from 'react'
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  RotateCcw,
  Plus,
  Phone,
  FileText,
  ChevronRight,
  CreditCard,
  Droplets,
  HeartPulse,
  Activity
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { CURRENT_PATIENT, ACTIVE_CARE_PLAN, CLINIC_INFO, TODAY, formatMonthDay } from '@/data/mockData'
import { ToothIcon } from '@/components/ui/ToothIcon'

export const PatientMyCare: React.FC = () => {
  const [painLevel, setPainLevel] = useState<'comfortable' | 'mild' | 'noticeable'>('comfortable')
  const [saltWaterCount, setSaltWaterCount] = useState(2)
  const [toothbrushDaysLeft, setToothbrushDaysLeft] = useState(52)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const handleResetToothbrush = () => {
    setToothbrushDaysLeft(90)
    showToast('Brush counter reset to 90 days!')
  }

  const handleIncrementRinse = () => {
    if (saltWaterCount < 3) {
      setSaltWaterCount((prev) => prev + 1)
      showToast('Salt water rinse logged!')
    } else {
      setSaltWaterCount(0)
      showToast('Reset daily rinses')
    }
  }

  return (
    <div className="space-y-6 pb-28 pt-2.5">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          {toastMessage}
        </div>
      )}

      {/* 1. Compact Visual Header Card */}
      <div className="bg-white py-4 px-4 sm:px-5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={CURRENT_PATIENT.avatar}
              alt={CURRENT_PATIENT.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-patient-primary/20"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
                {CURRENT_PATIENT.name}
              </h2>
              
            </div>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
              {CURRENT_PATIENT.primaryDentist}
            </p>
          </div>
        </div>

        <div className="text-right">
          <Badge variant="teal" size="sm" className="font-bold">
            80% Insured
          </Badge>
          
        </div>
      </div>

      {/* 2. Visual Care Journey Card (Horizontal Stepper) */}
      <Card className="py-5 px-4 sm:px-5 border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-patient-primary-light text-patient-primary flex items-center justify-center shrink-0">
              <ToothIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                Tooth 19 Implant Journey
              </h3>
              <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                Step 2 of 3 • Healing Well
              </span>
            </div>
          </div>
          <span className="text-xs font-black text-patient-primary bg-patient-primary-subtle border border-patient-primary-border/80 px-2.5 py-1 rounded-full">
            67% Complete
          </span>
        </div>

        {/* Visual Horizontal 3-Step Stepper */}
        <div className="grid grid-cols-3 gap-2 py-1">
          {/* Step 1 */}
          <div className="bg-patient-primary text-white p-2.5 rounded-xl flex flex-col justify-between h-20 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">Phase 1</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <span className="text-xs font-bold block leading-tight">3D Scan</span>
              <span className="text-[9px] opacity-80">Completed</span>
            </div>
          </div>

          {/* Step 2 (Current) */}
          <div className="bg-patient-primary text-white p-2.5 rounded-xl flex flex-col justify-between h-20 shadow-2xs ring-2 ring-patient-primary/30">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">Phase 2</span>
              <Activity className="w-3.5 h-3.5 text-teal-200 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-bold block leading-tight">Post Placed</span>
              <span className="text-[9px] text-teal-200 font-semibold">Active Healing</span>
            </div>
          </div>

          {/* Step 3 (Next) */}
          <div className="bg-slate-50 border border-slate-200/90 text-slate-700 p-2.5 rounded-xl flex flex-col justify-between h-20">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Phase 3</span>
              <Clock className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div>
              <span className="text-xs font-bold block leading-tight text-slate-900">Crown</span>
              <span className="text-[9px] text-patient-secondary font-bold">{formatMonthDay(TODAY)} Visit</span>
            </div>
          </div>
        </div>

        {/* Visual Pill Stats Bar (Spacious layout, no text collision) */}
        <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-100">
          <div className="bg-slate-50 py-2.5 px-3 rounded-xl flex flex-col justify-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Final Visit</span>
            <span className="text-xs font-bold text-slate-900 mt-0.5">{formatMonthDay(TODAY)} • 10:30 AM</span>
          </div>
          <div className="bg-patient-primary-subtle border border-patient-primary-border/60 py-2.5 px-3 rounded-xl flex flex-col justify-center">
            <span className="text-[10px] text-patient-primary/80 font-bold uppercase tracking-wider">Est. Patient Copay</span>
            <span className="text-sm font-extrabold text-patient-primary mt-0.5">${ACTIVE_CARE_PLAN.copayEstimated.toFixed(0)}</span>
          </div>
        </div>
      </Card>

      {/* 3. Visual Recovery & Daily Health Dashboard */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
            Daily Recovery & Wellness
          </h3>
          <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
            Day 6 Post-Op
          </span>
        </div>

        <div className="space-y-3.5">
          {/* Top 2 Cards: Salt Water Rinse & Brush Life */}
          <div className="grid grid-cols-2 gap-3">
            {/* Card A: Salt Water Rinses */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between h-36">
              <div className="flex items-center justify-between">
                <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                  <Droplets className="w-4 h-4" />
                </div>
                <span className="text-xs font-black text-slate-800">
                  {saltWaterCount}/3 Done
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-900 block">Salt Water Rinse</span>
                <div className="flex gap-1.5 mt-2">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`h-1.5 flex-1 rounded-full ${
                        step <= saltWaterCount ? 'bg-patient-primary' : 'bg-slate-100'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={handleIncrementRinse}
                className="w-full py-1.5 bg-slate-50 hover:bg-slate-100 text-patient-primary text-[11px] font-bold rounded-lg border border-slate-200 flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>{saltWaterCount >= 3 ? 'Completed' : 'Log Rinse'}</span>
              </button>
            </div>

            {/* Card B: Toothbrush Head Life */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between h-36">
              <div className="flex items-center justify-between">
                <div className="w-7 h-7 rounded-lg bg-teal-50 text-patient-primary flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <button
                  onClick={handleResetToothbrush}
                  title="Reset for new brush"
                  className="text-slate-400 hover:text-slate-700 cursor-pointer p-1"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Brush Life</span>
                  <span className="text-[11px] font-extrabold text-patient-primary">{toothbrushDaysLeft}d</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full bg-patient-primary rounded-full transition-all"
                    style={{ width: `${(toothbrushDaysLeft / 90) * 100}%` }}
                  />
                </div>
              </div>

              <span className="text-[10px] text-slate-400 font-medium text-center bg-slate-50 py-1 rounded-md">
                Refresh in {Math.round(toothbrushDaysLeft / 7)} weeks
              </span>
            </div>
          </div>

          {/* Card C: Comfort / Pain Level Logger (Full Width) */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-patient-primary" />
                <span className="text-xs font-bold text-slate-900">How does 19 feel right now?</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">Tap to log</span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-0.5">
              <button
                onClick={() => {
                  setPainLevel('comfortable')
                  showToast('Logged: Comfortable 😊')
                }}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  painLevel === 'comfortable'
                    ? 'bg-patient-primary text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 border border-slate-200/80 hover:bg-slate-100'
                }`}
              >
                <span>😊</span>
                <span>Normal</span>
              </button>

              <button
                onClick={() => {
                  setPainLevel('mild')
                  showToast('Logged: Mild Tender 😐')
                }}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  painLevel === 'mild'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 border border-slate-200/80 hover:bg-slate-100'
                }`}
              >
                <span>😐</span>
                <span>Mild</span>
              </button>

              <button
                onClick={() => {
                  setPainLevel('noticeable')
                  showToast('Logged: Sore 😣')
                }}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  painLevel === 'noticeable'
                    ? 'bg-patient-emergency text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 border border-slate-200/80 hover:bg-slate-100'
                }`}
              >
                <span>😣</span>
                <span>Sore</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Digital Records & Insurance Cards */}
      <div className="space-y-3 pt-1">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 px-1">
          Digital Dental Records
        </h3>

        <div className="grid grid-cols-3 gap-2.5">
          {/* Record 1 */}
          <div
            onClick={() => showToast('Medical questionnaire verified')}
            className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between h-26 hover:border-slate-300 transition-all cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-lg bg-teal-50 text-patient-primary flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-900 block leading-tight truncate">Medical Hist.</span>
              <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">✓ Verified</span>
            </div>
          </div>

          {/* Record 2 */}
          <div
            onClick={() => showToast('Alberta Blue Cross policy active')}
            className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between h-26 hover:border-slate-300 transition-all cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-900 block leading-tight truncate">Blue Cross</span>
              <span className="text-[10px] text-slate-500 font-medium block mt-0.5">ABC-7761</span>
            </div>
          </div>

          {/* Record 3 */}
          <div
            onClick={() => showToast('Surgical consent on file')}
            className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between h-26 hover:border-slate-300 transition-all cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-900 block leading-tight truncate">E-Consent</span>
              <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">✓ Signed</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Sleek Direct Clinical Assistance Pill */}
      <div className="bg-patient-primary-subtle border border-patient-primary-border/80 rounded-2xl py-4 px-4 sm:px-5 flex items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-patient-primary text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Phone className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-xs sm:text-sm font-bold text-slate-900 block truncate">Post-Op Questions?</span>
            <span className="text-[11px] text-slate-500 truncate block mt-0.5">Direct Nurse & Triage Desk</span>
          </div>
        </div>

        <a
          href="tel:7806454122"
          className="shrink-0 bg-patient-primary hover:bg-patient-primary-hover text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-2xs"
        >
          (780) 645-4122
        </a>
      </div>
    </div>
  )
}
