import React from 'react'
import { Dialog } from '@/components/ui/Dialog'
import { THEME_CONFIG } from '@/lib/theme'
import { ShieldCheck, Stethoscope, Sparkles, Check, HeartHandshake } from 'lucide-react'

interface ThemeSpecDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export const ThemeSpecDrawer: React.FC<ThemeSpecDrawerProps> = ({
  isOpen,
  onClose
}) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Theme & Color Specification"
      subtitle="Complete design token specification for Patients & Doctor portals"
      maxWidth="lg"
    >
      <div className="space-y-6 text-slate-700 text-xs sm:text-sm">
        {/* Intro */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <p className="text-slate-600 leading-relaxed">
            The design follows a cohesive, modern medical design system tailored for{' '}
            <strong className="text-slate-900">Dr. Ken Miller Dental Clinic (St. Paul, AB)</strong>.
            Patient views focus on calming anxiety, treatment clarity, and quick emergency access. Doctor views focus on chairside operational speed, odontogram diagnostics, and EHR data density.
          </p>
        </div>

        {/* Patient Theme Specification */}
        <div className="border border-teal-100 rounded-2xl p-4 bg-teal-50/30">
          <div className="flex items-center gap-2 mb-3">
            <span className="p-1.5 rounded-lg bg-patient-primary text-white">
              <HeartHandshake className="w-4 h-4" />
            </span>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                Patient Theme: Dental Wellness & Reassurance
              </h4>
              <p className="text-[11px] text-teal-800">
                Faithful to the attached Google Stitch mobile design
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            {/* Primary */}
            <div className="bg-white p-3 rounded-xl border border-teal-100 shadow-2xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-patient-primary shadow-xs" />
                <div>
                  <div className="font-bold text-slate-900 text-xs">Primary Color</div>
                  <div className="font-mono text-[11px] text-slate-500">var(--patient-primary)</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 mt-2">
                Used for primary buttons, clinic header branding, active tabs, and primary action cards. Induces psychological calm and clinical trust.
              </p>
            </div>

            {/* Secondary */}
            <div className="bg-white p-3 rounded-xl border border-teal-100 shadow-2xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-patient-secondary-light border border-patient-secondary-border" />
                <div>
                  <div className="font-bold text-slate-900 text-xs">Secondary Color</div>
                  <div className="font-mono text-[11px] text-slate-500">var(--patient-secondary)</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 mt-2">
                Used for secondary chips, information callouts, upcoming appointment date blocks, and gentle micro-card backgrounds.
              </p>
            </div>

            {/* Emergency Accent */}
            <div className="bg-white p-3 rounded-xl border border-rose-100 shadow-2xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-patient-emergency" />
                <div>
                  <div className="font-bold text-slate-900 text-xs">Emergency Alert Accent</div>
                  <div className="font-mono text-[11px] text-slate-500">var(--patient-emergency)</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 mt-2">
                High-contrast triage banner and urgent call buttons for acute toothache, knocked-out teeth, and facial trauma.
              </p>
            </div>

            {/* Heritage Gold Accent */}
            <div className="bg-white p-3 rounded-xl border border-amber-100 shadow-2xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-patient-gold-light border border-patient-gold-border" />
                <div>
                  <div className="font-bold text-slate-900 text-xs">Heritage Accent</div>
                  <div className="font-mono text-[11px] text-slate-500">var(--patient-gold)</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 mt-2">
                Used on badges showcasing 38+ years of clinic heritage in St. Paul since 1986 and verified plan status.
              </p>
            </div>
          </div>
        </div>

        {/* Doctor Theme Specification */}
        <div className="border border-blue-200 rounded-2xl p-4 bg-slate-900 text-white">
          <div className="flex items-center gap-2 mb-3">
            <span className="p-1.5 rounded-lg bg-doctor-secondary text-white">
              <Stethoscope className="w-4 h-4" />
            </span>
            <div>
              <h4 className="font-bold text-white text-sm">
                Doctor Theme: Clinical Precision & Operatory Command
              </h4>
              <p className="text-[11px] text-slate-300">
                Engineered for rapid chairside workflow & mobile odontogram charting
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 text-slate-900">
            {/* Primary */}
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-doctor-primary shadow-xs" />
                <div>
                  <div className="font-bold text-slate-900 text-xs">Doctor Primary</div>
                  <div className="font-mono text-[11px] text-slate-500">var(--doctor-primary)</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 mt-2">
                Authoritative, high-contrast dark foundation. Provides zero visual clutter and maximum focus on patient data.
              </p>
            </div>

            {/* Secondary */}
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-doctor-secondary" />
                <div>
                  <div className="font-bold text-slate-900 text-xs">Doctor Secondary</div>
                  <div className="font-mono text-[11px] text-slate-500">var(--doctor-secondary)</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 mt-2">
                Active operatory indicators, tooth selection highlights, and quick clinical macro chips.
              </p>
            </div>

            {/* Operatory Status: Emerald */}
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-doctor-active" />
                <div>
                  <div className="font-bold text-slate-900 text-xs">Chairside Active State</div>
                  <div className="font-mono text-[11px] text-slate-500">var(--doctor-status-active)</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 mt-2">
                Used when a patient is seated in chair, local anesthesia timer is active, or treatment is successfully completed.
              </p>
            </div>

            {/* Triage Urgency: Amber-Rose */}
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-doctor-warning" />
                <div>
                  <div className="font-bold text-slate-900 text-xs">Urgent Triage Queue</div>
                  <div className="font-mono text-[11px] text-slate-500">var(--doctor-status-warning)</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 mt-2">
                Flags incoming walk-in dental trauma (avulsions, fractures) requiring chairside prep and assistant paging.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile & Responsive Summary */}
        <div className="bg-slate-100 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1.5">
          <div className="font-bold text-slate-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            Responsive & Mobile Architecture:
          </div>
          <p className="text-slate-600">
            • <strong>Mobile Optimized:</strong> 44px+ touch targets, sticky bottom navigation with thumb-reachable tabs, smooth card elevation, swipeable horizontal chips, and collapsible triage guides.
          </p>
          <p className="text-slate-600">
            • <strong>Desktop & Tablet Adaptive:</strong> Automatically expands into wide multi-column operatory boards, side-by-side odontogram & clinical SOAP notes, and structured clinical tables.
          </p>
        </div>
      </div>
    </Dialog>
  )
}
