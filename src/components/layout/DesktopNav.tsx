import React from 'react'
import {
  Home,
  Calendar,
  BriefcaseMedical,
  ShieldCheck,
  AlertCircle,
  LayoutDashboard,
  Activity,
  CalendarDays,
  AlertOctagon,
  PackageCheck,
  Sparkles,
  Phone,
  Palette
} from 'lucide-react'
import { UserRole, PatientTab, DoctorTab } from '@/types'
import { CLINIC_INFO, CURRENT_PATIENT } from '@/data/mockData'

interface DesktopNavProps {
  role: UserRole
  patientTab: PatientTab
  doctorTab: DoctorTab
  onSelectPatientTab: (tab: PatientTab) => void
  onSelectDoctorTab: (tab: DoctorTab) => void
  onToggleRole: () => void
  onOpenThemeSpec: () => void
  onOpenOnboarding: () => void
}

export const DesktopNav: React.FC<DesktopNavProps> = ({
  role,
  patientTab,
  doctorTab,
  onSelectPatientTab,
  onSelectDoctorTab,
  onToggleRole,
  onOpenThemeSpec,
  onOpenOnboarding
}) => {
  const isDoctor = role === 'doctor'

  const patientLinks = [
    { id: 'home' as PatientTab, label: 'Home Overview', icon: Home },
    { id: 'appointments' as PatientTab, label: 'Appointments', icon: Calendar },
    { id: 'services' as PatientTab, label: 'Services & Care', icon: BriefcaseMedical },
    { id: 'mycare' as PatientTab, label: 'My Care & Implant', icon: ShieldCheck },
    { id: 'emergency' as PatientTab, label: 'Emergency Triage', icon: AlertCircle, urgent: true }
  ]

  const doctorLinks = [
    { id: 'overview' as DoctorTab, label: 'Chairside Hub', icon: LayoutDashboard },
    { id: 'charting' as DoctorTab, label: 'Odontogram & Charting', icon: Activity },
    { id: 'schedule' as DoctorTab, label: 'Operatory Schedule', icon: CalendarDays },
    { id: 'triage' as DoctorTab, label: 'Emergency Triage Desk', icon: AlertOctagon, alert: true },
    { id: 'lab' as DoctorTab, label: 'Lab Orders & Post-Op', icon: PackageCheck }
  ]

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200/90 h-screen sticky top-0 shrink-0 p-4 justify-between">
      <div className="space-y-6">
        {/* Clinic Identity */}
        <div>
          <div className="flex items-center gap-2.5">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-xs ${
                isDoctor ? 'bg-doctor-primary' : 'bg-patient-primary'
              }`}
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M18.8 4c-1.3 0-2.4.7-3.1 1.7-.8-.7-1.8-1.2-3-1.2-1.2 0-2.2.5-3 1.2C9 4.7 7.9 4 6.6 4 4.1 4 2 6.1 2 8.6c0 3.8 2.2 6.8 4 9.1 1.2 1.5 2.5 2.8 3.5 3.7.4.4.8.6 1.2.6.4 0 .8-.2 1.2-.6 1-.9 2.3-2.2 3.5-3.7 1.8-2.3 4-5.3 4-9.1C21.4 6.1 19.3 4 18.8 4z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xs font-black text-slate-900 leading-tight">
                {CLINIC_INFO.name}
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                {CLINIC_INFO.location} • Since {CLINIC_INFO.sinceYear}
              </p>
            </div>
          </div>

          {/* Active Mode indicator badge */}
          <div className="mt-3">
            <div
              className={`text-xs font-bold py-1.5 px-3 rounded-xl border flex items-center justify-between ${
                isDoctor
                  ? 'bg-blue-50 text-blue-900 border-blue-200'
                  : 'bg-teal-50 text-teal-900 border-teal-200'
              }`}
            >
              <span>Current: {isDoctor ? 'Doctor EHR' : 'Patient App'}</span>
              <button
                onClick={onToggleRole}
                className="text-[10px] uppercase font-extrabold underline cursor-pointer"
              >
                Switch
              </button>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-2">
            {isDoctor ? 'Clinical Management' : 'Patient Navigation'}
          </div>

          {!isDoctor ? (
            patientLinks.map((link) => {
              const Icon = link.icon
              const isActive = patientTab === link.id

              return (
                <button
                  key={link.id}
                  onClick={() => onSelectPatientTab(link.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-patient-primary text-white shadow-xs'
                      : link.urgent
                      ? 'text-red-700 hover:bg-red-50'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="flex-1">{link.label}</span>
                  {link.urgent && !isActive && (
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                  )}
                </button>
              )
            })
          ) : (
            doctorLinks.map((link) => {
              const Icon = link.icon
              const isActive = doctorTab === link.id

              return (
                <button
                  key={link.id}
                  onClick={() => onSelectDoctorTab(link.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-doctor-primary text-white shadow-xs'
                      : link.alert
                      ? 'text-red-700 hover:bg-red-50'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="flex-1">{link.label}</span>
                  {link.alert && (
                    <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold">
                      1
                    </span>
                  )}
                </button>
              )
            })
          )}
        </nav>
      </div>

      {/* Bottom Footer & Palette info */}
      <div className="space-y-2 pt-4 border-t border-slate-100">
        <button
          onClick={onOpenOnboarding}
          className="w-full flex items-center gap-2 p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-semibold cursor-pointer transition-colors"
        >
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span>Splash & Onboarding Tour</span>
        </button>

        <button
          onClick={onOpenThemeSpec}
          className="w-full flex items-center gap-2 p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
        >
          <Palette className="w-4 h-4 text-teal-700" />
          <span>Theme & Color Tokens</span>
        </button>

        <a
          href="tel:7806454122"
          className="w-full flex items-center gap-2 p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
        >
          <Phone className="w-4 h-4 text-patient-primary" />
          <span>Reception {CLINIC_INFO.phone}</span>
        </a>
      </div>
    </aside>
  )
}
