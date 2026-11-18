import React, { useState } from 'react'
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  RotateCcw,
  Plus,
  PhoneCall,
  FileText,
  ChevronRight,
  CreditCard,
  AlertCircle
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { CURRENT_PATIENT, ACTIVE_CARE_PLAN, CLINIC_INFO } from '@/data/mockData'

export const PatientMyCare: React.FC = () => {
  const [painLevel, setPainLevel] = useState<'comfortable' | 'mild' | 'noticeable'>('comfortable')
  const [saltWaterCount, setSaltWaterCount] = useState(2)
  const [brushingDone, setBrushingDone] = useState(false)
  const [toothbrushDaysLeft, setToothbrushDaysLeft] = useState(52)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleResetToothbrush = () => {
    setToothbrushDaysLeft(90)
    showToast('Toothbrush counter reset to 90 days!')
  }

  const handleIncrementRinse = () => {
    if (saltWaterCount < 3) {
      setSaltWaterCount(prev => prev + 1)
      showToast('Warm salt water rinse logged!')
    }
  }

  return (
    <div className="space-y-4 pb-20 pt-2">
      {/* Patient Profile & Insurance Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs  space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={CURRENT_PATIENT.avatar}
              alt={CURRENT_PATIENT.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-teal-100"
            />
            <div>
              <h2 className="text-base font-bold text-slate-900  leading-tight">
                {CURRENT_PATIENT.name}
              </h2>
            
            </div>
          </div>
          <Badge variant="teal" size="sm" className="font-semibold">
            ✓ Direct Billing
          </Badge>
        </div>

        {/* 2 Micro Cards: Primary Dentist & Active Plan */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="bg-patient-bg p-2.5 rounded-xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Primary Dentist
            </span>
            <div className="text-xs font-bold text-slate-800 mt-0.5">
              {CURRENT_PATIENT.primaryDentist}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              Serving St. Paul since {CLINIC_INFO.sinceYear}
            </div>
          </div>

          <div className="bg-patient-bg p-2.5 rounded-xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Active Plan
            </span>
            <div className="text-xs font-bold text-slate-800 mt-0.5">
              {CURRENT_PATIENT.insurancePlan}
            </div>
            <div className="text-[10px] text-teal-700 font-medium mt-0.5">
              ● {CURRENT_PATIENT.coverage}
            </div>
          </div>
        </div>
      </div>

      {/* Ongoing Treatment Section */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Ongoing Treatment
            </h3>
          </div>
        </div>

        <Card className="p-4 sm:p-5 border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              
              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  Implant Restoration
                </h4>
                <p className="text-[11px] text-slate-500">
                  Tooth 19 (Lower Left First Molar)
                </p>
              </div>
            </div>
            <Badge variant="navy" size="sm">Phase 2 of 3</Badge>
          </div>

          {/* Phase 1, Phase 2, Phase 3 Timeline */}
          <div className="space-y-3.5 pl-1 border-l-2 border-slate-200 ml-3.5 my-2">
            {/* Phase 1 */}
            <div className="relative pl-5">
              <span className="absolute -left-[23px] top-0.5 w-4 h-4 rounded-full bg-patient-primary text-white flex items-center justify-center text-[10px]">
                ✓
              </span>
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold text-slate-900">Phase 1: 3D Cone Beam Imaging</h5>
                <span className="text-[10px] text-slate-400 font-medium">Oct 4</span>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="relative pl-5">
              <span className="absolute -left-[23px] top-0.5 w-4 h-4 rounded-full bg-patient-primary text-white flex items-center justify-center text-[10px]">
                ✓
              </span>
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold text-slate-900">Phase 2: Implant Post Placement</h5>
                <span className="text-[10px] text-slate-400 font-medium">Nov 1</span>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="relative pl-5">
              <span className="absolute -left-[23px] top-0.5 w-4 h-4 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center text-[10px] font-bold">
                ●
              </span>
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold text-slate-900">Phase 3: Custom Porcelain Crown</h5>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded">
                  Nov 15, 10:30 AM
                </span>
              </div>              
            </div>
          </div>

          {/* Dr. Ken Miller's Clinical Note */}
          <div className="bg-patient-primary-subtle border border-patient-primary-border rounded-xl p-3 flex items-start gap-2.5">
            <span className="text-base">📝</span>
            <div className="text-xs text-slate-700">
              <strong className="text-slate-900 block mb-0.5">Dr. Ken Miller's Clinical Note:</strong>
              <p className="italic leading-relaxed text-slate-600">
                "{ACTIVE_CARE_PLAN.clinicalNote}"
              </p>
            </div>
          </div>

          {/* Financial & Insurance Breakdown */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/90 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span>Treatment Estimate</span>
              <span className="font-semibold text-slate-900">${ACTIVE_CARE_PLAN.costEstimate.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-teal-700">
              <span>Est. Alberta Blue Cross Direct Bill</span>
              <span className="font-semibold">-${ACTIVE_CARE_PLAN.insuranceEstimatedCoverage.toFixed(2)}</span>
            </div>
            <div className="border-t border-slate-200 pt-1.5 flex items-center justify-between font-bold text-slate-900">
              <span>Estimated Patient Copay</span>
              <span className="text-base text-patient-primary">${ACTIVE_CARE_PLAN.copayEstimated.toFixed(2)}</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Final claim submitted electronically upon completion on Nov 15.
            </p>
          </div>
        </Card>
      </div>

      {/* Post-Op Recovery Tracker */}
      <Card className="p-4 sm:p-5 border-slate-200 shadow-sm space-y-3.5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">
            Post-Op Recovery Tracker
          </h3>
          <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
            Day 6 post-surgery
          </span>
        </div>

        {/* Daily Recovery Checklist */}
        <div className="space-y-2 text-xs">
          {/* Item 1 */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-md bg-patient-primary text-white flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1">
              <strong className="text-slate-900 block">Cold Compress Regimen</strong>
              <p className="text-slate-500 text-[11px]">20 min on, 20 min off completed for first 48 hours</p>
            </div>
            <span className="text-teal-700 text-[11px] font-bold">✓</span>
          </div>

          {/* Item 2: Warm salt water */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
            <button
              onClick={handleIncrementRinse}
              className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors cursor-pointer ${
                saltWaterCount >= 3 ? 'bg-patient-primary text-white' : 'bg-white border border-slate-300 text-teal-800'
              }`}
            >
              {saltWaterCount >= 3 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Plus className="w-3 h-3" />}
            </button>
            <div className="flex-1">
              <strong className="text-slate-900 block">Warm Salt Water Rinses</strong>
              <p className="text-slate-500 text-[11px]">3 times daily after meals (Gently, do not swish forcefully)</p>
            </div>
            <span className="text-xs font-bold text-patient-primary bg-patient-primary-light px-2 py-0.5 rounded-md">
              Today: {saltWaterCount} / 3
            </span>
          </div>

          {/* Item 3: Brushing */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
            <button
              onClick={() => {
                setBrushingDone(!brushingDone)
                showToast(brushingDone ? 'Marked pending' : 'Evening brushing completed!')
              }}
              className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors cursor-pointer ${
                brushingDone ? 'bg-patient-primary text-white' : 'bg-white border border-slate-300'
              }`}
            >
              {brushingDone && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
            </button>
            <div className="flex-1">
              <strong className="text-slate-900 block">Gentle Adjacent Brushing</strong>
              <p className="text-slate-500 text-[11px]">Clean surrounding teeth; avoid abrasive direct pressure on #19</p>
            </div>
            <span className="text-[11px] text-slate-500">
              {brushingDone ? 'Done' : 'Pending PM'}
            </span>
          </div>
        </div>

        {/* Interactive Pain Logger */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs mb-2">
            <strong className="text-slate-800">How is tooth #19 feeling today?</strong>
            <span className="text-[10px] text-slate-400">Logged at 8:16 AM</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                setPainLevel('comfortable')
                showToast('Logged: Comfortable - Tissue healing well!')
              }}
              className={`py-2 px-2 rounded-xl text-xs font-semibold border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                painLevel === 'comfortable'
                  ? 'bg-patient-primary text-white border-patient-primary shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className="text-base">😊</span>
              <span>Comfortable</span>
            </button>

            <button
              onClick={() => {
                setPainLevel('mild')
                showToast('Logged: Mild Aching - Continue salt rinses.')
              }}
              className={`py-2 px-2 rounded-xl text-xs font-semibold border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                painLevel === 'mild'
                  ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className="text-base">😐</span>
              <span>Mild Aching</span>
            </button>

            <button
              onClick={() => {
                setPainLevel('noticeable')
                showToast('Logged: Noticeable Pain - Clinical line notified.')
              }}
              className={`py-2 px-2 rounded-xl text-xs font-semibold border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                painLevel === 'noticeable'
                  ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className="text-base">😣</span>
              <span>Noticeable Pain</span>
            </button>
          </div>
        </div>

        {/* When to call the clinic alert */}
        <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-3 text-xs text-rose-900 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-rose-800">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>When to call the clinic:</span>
          </div>
          <p className="text-[11px] leading-relaxed text-rose-800">
            Persistent fever above 38°C, sudden sharp throbbing, or continuous bleeding. Dr. Miller's St. Paul team is available for urgent follow-up.
          </p>
          <a
            href="tel:7806454122"
            className="inline-flex items-center gap-1 font-bold text-rose-900 hover:underline pt-0.5 text-[11px]"
          >
            <PhoneCall className="w-3 h-3" />
            <span>Direct Nurse Line: (780) 645-4122</span>
          </a>
        </div>
      </Card>

      {/* Preventative Milestones */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
          Preventative Milestones
        </h3>

        {/* Hygiene & Polish Recall */}
        <Card className="p-3.5 border-slate-200 shadow-2xs">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-patient-primary-light text-patient-primary flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  Hygiene & Polish Recall
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Target: May 2025 • Regular scaling preserves implant longevity
                </p>
              </div>
            </div>
            <Badge variant="teal" size="sm">6-Month Recall</Badge>
          </div>

          <div className="mt-3 flex justify-end">
            <button
              onClick={() => alert('Hygiene appointment pre-reserved for May 2025!')}
              className="text-xs font-bold text-patient-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Pre-Reserve Spot</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </Card>

        {/* Toothbrush Head Life */}
        <Card className="p-3.5 border-slate-200 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">🪥</span>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                Toothbrush Head Life
              </h4>
            </div>
            <span className="text-[11px] font-bold text-slate-500">
              3-Month Cycle • {toothbrushDaysLeft} Days Left
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-patient-primary rounded-full transition-all duration-300"
              style={{ width: `${(toothbrushDaysLeft / 90) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-slate-400">
              Next recommended refresh: Jan 15, 2025
            </span>
            <button
              onClick={handleResetToothbrush}
              className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-lg cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 text-patient-primary" />
              <span>Reset Counter (New Brush)</span>
            </button>
          </div>
        </Card>
      </div>

      {/* Intake & Legal Records */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Intake & Legal Records
          </h3>
          <span className="text-[11px] text-teal-700 font-bold">All Verified</span>
        </div>

        <div className="space-y-1.5">
          {[
            {
              title: 'Medical History Questionnaire',
              desc: 'Updated Oct 2024 • No contraindications'
            },
            {
              title: 'Alberta Blue Cross Card',
              desc: 'Policy #ABC-7761129 • Active digital copy'
            },
            {
              title: 'Surgical & Restoration Consent',
              desc: 'E-Signed Nov 1, 2024 • Archival secured'
            }
          ].map((rec, i) => (
            <div
              key={i}
              className="bg-white p-3 rounded-xl border border-slate-200/90 flex items-center justify-between hover:border-slate-300 transition-all cursor-pointer"
              onClick={() => alert(`Opening archival copy of: ${rec.title}`)}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-patient-primary" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{rec.title}</h4>
                  <p className="text-[10px] text-slate-500">{rec.desc}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          ))}
        </div>
      </div>

      {/* St. Paul Patient Continuity Guarantee */}
      <div className="bg-patient-primary-light p-3.5 rounded-2xl border border-patient-primary-border flex items-start gap-2.5 text-xs text-patient-primary">
        <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-patient-primary" />
        <div>
          <strong className="block font-bold">St. Paul Patient Continuity Guarantee</strong>
          <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
            Dr. Ken Miller retains comprehensive records and digital radiograph archives for every family member.
          </p>
        </div>
      </div>
    </div>
  )
}
