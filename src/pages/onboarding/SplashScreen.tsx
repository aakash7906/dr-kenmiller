import React, { useEffect, useState } from 'react'
import { ToothIcon } from '@/components/ui/ToothIcon'
import { CLINIC_INFO } from '@/data/mockData'

interface SplashScreenProps {
  onComplete: () => void
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 300)
          return 100
        }
        return prev + 5
      })
    }, 60)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-gradient-to-b from-patient-primary via-patient-primary-hover to-patient-primary-dark text-white p-6 sm:p-10 select-none overflow-hidden animate-in fade-in duration-300">
      {/* Ambient background glow elements */}
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-teal-400/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-cyan-400/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />



      {/* Center Logo & Branding */}
      <div className="flex flex-col items-center text-center z-10 my-auto space-y-6">
        {/* Animated Tooth Logo Icon with Luminous Glow */}
        <div className="relative">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/12 backdrop-blur-xl border border-white/25 shadow-2xl flex items-center justify-center relative overflow-hidden group">
            {/* Shimmer light sweep */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite]" />

            {/* Authentic Anatomical Molar Tooth Icon */}
            <ToothIcon className="w-14 h-14 sm:w-16 sm:h-16 text-white drop-shadow-[0_4px_16px_rgba(255,255,255,0.45)]" />
          </div>

          {/* Pulse ring */}
          <div className="absolute -inset-3 rounded-full border border-teal-300/30 animate-ping pointer-events-none" />
        </div>

        {/* Text */}
        <div className="space-y-1.5">
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase drop-shadow-sm">
            {CLINIC_INFO.name}
          </h1>
          <p className="text-xs sm:text-sm text-teal-100 font-medium max-w-xs mx-auto leading-relaxed">
            Compassionate Family Care & Advanced Restorative Dentistry
          </p>
        </div>

        {/* Heritage Trust Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs text-amber-200 font-bold">
          <span> {CLINIC_INFO.yearsOfCare} of Clinical Trust</span>
          <span className="text-white/40">•</span>
          <span>Lead DDS Dr. Ken Miller</span>
        </div>
      </div>

      {/* Bottom Progress & Loading State */}
      <div className="w-full max-w-xs z-10 space-y-3 pb-4">
        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            className="h-full bg-gradient-to-r from-teal-300 via-cyan-200 to-white rounded-full transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-teal-200/90 font-medium">
          <span>Loading clinical systems...</span>
          <span className="font-mono">{progress}%</span>
        </div>
      </div>
    </div>
  )
}
