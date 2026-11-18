import React from 'react'
import { Phone, User, Stethoscope, HeartPulse, Palette } from 'lucide-react'
import { UserRole } from '@/types'
import { CLINIC_INFO, CURRENT_PATIENT } from '@/data/mockData'

interface ClinicHeaderProps {
  role: UserRole
  onToggleRole: () => void
  onOpenThemeSpec: () => void
  onCallClinic: () => void
  onOpenProfile: () => void
}

export const ClinicHeader: React.FC<ClinicHeaderProps> = ({
  role,
  onToggleRole,
  onOpenThemeSpec,
  onCallClinic,
  onOpenProfile
}) => {
  const isDoctor = role === 'doctor'

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-2xs">
      <div className="max-w-md mx-auto sm:max-w-xl md:max-w-3xl lg:max-w-5xl px-4 py-2.5 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-2.5">
          {/* Logo icon */}
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
              isDoctor
                ? 'bg-[#0F2B48] text-white shadow-xs'
                : 'bg-[#0A5C67] text-white shadow-xs'
            }`}
          >
            {isDoctor ? (
              <Stethoscope className="w-5 h-5" />
            ) : (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.8 4c-1.3 0-2.4.7-3.1 1.7-.8-.7-1.8-1.2-3-1.2-1.2 0-2.2.5-3 1.2C9 4.7 7.9 4 6.6 4 4.1 4 2 6.1 2 8.6c0 3.8 2.2 6.8 4 9.1 1.2 1.5 2.5 2.8 3.5 3.7.4.4.8.6 1.2.6.4 0 .8-.2 1.2-.6 1-.9 2.3-2.2 3.5-3.7 1.8-2.3 4-5.3 4-9.1C21.4 6.1 19.3 4 18.8 4z" />
              </svg>
            )}
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xs font-bold tracking-tight text-slate-900 leading-tight">
                {isDoctor ? 'DR. KEN MILLER, DDS' : CLINIC_INFO.name}
              </h1>
              {isDoctor && (
                <span className="text-[10px] font-bold uppercase bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded">
                  Clinical Portal
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              {isDoctor ? 'Lead Dental Surgeon • St. Paul' : CLINIC_INFO.location}
            </p>
          </div>
        </div>

        {/* Right side actions & Role Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Theme & Color Spec Info Pill */}
          <button
            onClick={onOpenThemeSpec}
            title="View Theme & Color Palette Specification"
            className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <Palette className="w-3.5 h-3.5 text-teal-700" />
            <span className="hidden sm:inline">Theme Palette</span>
          </button>

          {/* Quick Role Switcher Pill */}
          <button
            onClick={onToggleRole}
            className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-xl transition-all cursor-pointer shadow-xs border ${
              isDoctor
                ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                : 'bg-teal-50 text-teal-900 border-teal-200 hover:bg-teal-100'
            }`}
            title="Switch between Patient Experience & Doctor EHR View"
          >
            {isDoctor ? (
              <>
                <HeartPulse className="w-3.5 h-3.5 text-amber-700" />
                <span className="hidden xs:inline">Switch: </span>
                <span className="font-extrabold text-teal-800">Patient UI</span>
              </>
            ) : (
              <>
                <Stethoscope className="w-3.5 h-3.5 text-teal-700" />
                <span className="hidden xs:inline">Switch: </span>
                <span className="font-extrabold text-blue-900">Doctor UI</span>
              </>
            )}
          </button>

          {/* Direct Phone button */}
          <button
            onClick={onCallClinic}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            title="Call Clinic Reception"
            aria-label="Call Reception"
          >
            <Phone className="w-4 h-4 text-[#0A5C67]" />
          </button>

          {/* User profile avatar / button */}
          <button
            onClick={onOpenProfile}
            className="w-8 h-8 rounded-full ring-2 ring-slate-100 overflow-hidden hover:opacity-85 transition-opacity cursor-pointer"
            title={isDoctor ? 'Dr. Ken Miller Profile' : CURRENT_PATIENT.name}
            aria-label="Profile"
          >
            <img
              src={
                isDoctor
                  ? 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200'
                  : CURRENT_PATIENT.avatar
              }
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  )
}
