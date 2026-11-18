import React, { useState } from 'react'
import { ChevronRight, HeartHandshake, Stethoscope } from 'lucide-react'
import { UserRole } from '@/types'
import { CLINIC_INFO } from '@/data/mockData'

interface OnboardingScreenProps {
  onComplete: (role: UserRole) => void
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [showRoleModal, setShowRoleModal] = useState(false)

  const handleGetStarted = () => {
    setShowRoleModal(true)
  }

  return (
    <div className="min-h-screen bg-slate-950 sm:py-6 flex items-center justify-center p-0 sm:p-4 select-none">
      {/* Mobile Frame Container */}
      <div className="w-full sm:max-w-[390px] h-screen sm:h-[844px] sm:rounded-[48px] shadow-2xl sm:border-[8px] sm:border-slate-850 relative overflow-hidden flex flex-col justify-between">
        
        {/* 1. Full-Bleed Onboarding Background Image */}
        <img
          src="/onboarding-screen.png"
          alt="Dental Mascot Onboarding"
          className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
        />

        {/* 2. Top Content: Logo, Headline, and Subtitle (Overlay on Sky) */}
        <div className="relative z-10 pt-10 sm:pt-12 px-7 sm:px-8">

          {/* Headline */}
          <h1 className="text-[34px] sm:text-[38px] font-bold text-white tracking-tight leading-[1.14] drop-shadow-xs">
            Confident Smile<br />
            Smarter Care.
          </h1>

          {/* Subtitle */}
          <p className="text-[13px] sm:text-[14px] text-white/95 leading-relaxed font-normal mt-3.5 max-w-[275px] sm:max-w-[290px] drop-shadow-xs">
            At Dr. Ken Miller, every patient receives thoughtful care built on their goals, lifestyle, and comfort.
          </p>
        </div>

        {/* 3. Bottom Action: "Get Started" Capsule Button */}
        <div className="relative z-10 px-7 sm:px-8 pb-10 sm:pb-12 pt-4">
          <button
            onClick={handleGetStarted}
            className="w-full bg-onboarding-btn hover:bg-onboarding-btn-hover text-onboarding-btn-text text-base font-semibold py-4 px-6 rounded-full shadow-lg shadow-blue-500/30 transition-all duration-200 cursor-pointer active:scale-98 flex items-center justify-center tracking-wide"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Role Selection Modal when tapping "Get Started" */}
      {showRoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 mx-auto rounded-2xl overflow-hidden shadow-xs border border-slate-200/90 bg-[#65a9c0] flex items-center justify-center p-1">
                <img
                  src="/logo-square.png"
                  alt="Dr. Ken Miller Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Welcome to Dr. Ken Miller Dental
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Choose your portal to continue
                </p>
              </div>
            </div>

            <div className="space-y-2.5 pt-1">
              {/* Option 1: Patient Experience */}
              <button
                onClick={() => onComplete('patient')}
                className="w-full p-3.5 rounded-2xl border-2 border-patient-primary bg-patient-primary-light/50 hover:bg-patient-primary-light text-left transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-patient-primary text-white flex items-center justify-center shadow-xs">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      I'm a Patient 
                    </h4>
                   
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-patient-primary group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Option 2: Doctor Experience */}
              <button
                onClick={() => onComplete('doctor')}
                className="w-full p-3.5 rounded-2xl border-2 border-slate-200 hover:border-doctor-primary bg-white hover:bg-doctor-primary-light/40 text-left transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-doctor-primary text-white flex items-center justify-center shadow-xs">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      I'm a Doctor
                    </h4>
                    
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

          
          </div>
        </div>
      )}
    </div>
  )
}
