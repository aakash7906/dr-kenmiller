import React from 'react'
import { Phone, Stethoscope } from 'lucide-react'
import { ToothIcon } from '@/components/ui/ToothIcon'
import { UserRole } from '@/types'
import { CLINIC_INFO, CURRENT_PATIENT } from '@/data/mockData'

interface ClinicHeaderProps {
  role: UserRole
  onToggleRole?: () => void
  onOpenThemeSpec?: () => void
  onCallClinic: () => void
  onOpenProfile: () => void
  onOpenOnboarding?: () => void
}

export const ClinicHeader: React.FC<ClinicHeaderProps> = ({
  role,
  onCallClinic,
  onOpenProfile
}) => {
  const isDoctor = role === 'doctor'

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-colors duration-200">
      <div className="max-w-md sm:max-w-xl md:max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">

        {/* Left: Brand Identity & Location */}
        <div className="flex items-center gap-2.5">
          {/* Logo icon */}
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${isDoctor
                ? 'bg-doctor-primary text-white shadow-xs'
                : 'bg-patient-primary text-white shadow-xs'
              }`}
          >
            {isDoctor ? (
              <Stethoscope className="w-5 h-5" />
            ) : (
              <ToothIcon className="w-5 h-5" />
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

        {/* Right side actions (Clean Minimalist: Phone & Profile Avatar matching Stitch design) */}
        <div className="flex items-center gap-2">
          {/* Direct Phone button */}
          <button
            onClick={onCallClinic}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
            title="Call Clinic Reception"
            aria-label="Call Reception"
          >
            <Phone className="w-4 h-4 text-patient-primary" />
          </button>

          {/* User profile avatar / button */}
          <button
            onClick={onOpenProfile}
            className="w-9 h-9 rounded-full ring-2 ring-slate-100 overflow-hidden hover:opacity-85 transition-opacity cursor-pointer shadow-2xs"
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
