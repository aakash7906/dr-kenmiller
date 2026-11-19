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
    <div className="fixed inset-0 w-full h-[100dvh] max-h-[100dvh] z-50 flex flex-col items-center justify-between bg-gradient-to-b from-[#68A7E8] via-[#7BB3F0] to-[#8EC5F8] text-white p-6 sm:p-10 select-none overflow-hidden touch-none animate-in fade-in duration-300">
      {/* Ambient background glow elements matching Onboarding studio lighting */}
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-white/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-sky-200/30 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />

      {/* Center Logo & Branding */}
      <div className="flex flex-col items-center text-center z-10 my-auto space-y-6">
        {/* Official Dr. Ken Miller Logo with Luminous Glow */}
        <div className="relative">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl shadow-2xl relative overflow-hidden group">
            {/* Shimmer light sweep */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite] pointer-events-none z-10" />

            {/* Official Logo */}
            <img
              src="/logo-square.png"
              alt="Dr. Ken Miller Logo"
              className="w-full h-full object-cover rounded-3xl select-none"
            />
          </div>

          {/* Pulse ring */}
          <div className="absolute -inset-3 rounded-3xl border border-white/40 animate-ping pointer-events-none" />
        </div>

        {/* Text */}
        <div className="space-y-1.5">
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase drop-shadow-xs">
            {CLINIC_INFO.name}
          </h1>
          <p className="text-xs sm:text-sm text-white/95 font-medium max-w-xs mx-auto leading-relaxed drop-shadow-xs">
            Compassionate Family Care & Advanced Restorative Dentistry
          </p>
        </div>
      </div>

      {/* Bottom Progress & Loading State */}
      <div className="w-full max-w-xs z-10 space-y-3 pb-4">
        {/* Progress Bar */}
        <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm p-0.5">
          <div
            className="h-full bg-white rounded-full transition-all duration-75 shadow-xs"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-white/90 font-medium drop-shadow-xs">
          <span>Loading ...</span>
          <span className="font-mono font-bold text-white">{progress}%</span>
        </div>
      </div>
    </div>
  )
}
