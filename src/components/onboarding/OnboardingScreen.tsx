import React, { useState } from 'react'
import {
  ArrowUpRight,
  Wifi,
  Battery,
  Signal,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  HeartHandshake
} from 'lucide-react'
import { UserRole } from '@/types'
import { CLINIC_INFO, CURRENT_PATIENT } from '@/data/mockData'

interface OnboardingScreenProps {
  onComplete: (role: UserRole) => void
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showRoleSelectModal, setShowRoleSelectModal] = useState(false)

  const slides = [
    {
      badge: 'AI-powered',
      title: 'Smarter\nDental Care',
      subtitle: 'Track your oral health with simple daily care.',
      highlight: 'Daily Hygiene AI Analysis'
    },
    {
      badge: 'St. Paul Clinic',
      title: 'Instant\nCheck-in',
      subtitle: 'Fast front-desk arrival, zero waiting room paperwork.',
      highlight: 'Direct Billing on File'
    },
    {
      badge: 'Restorative Care',
      title: 'Active Care\n& Recovery',
      subtitle: 'Step-by-step implant healing guides from Dr. Ken Miller.',
      highlight: '38+ Years of Practice'
    }
  ]

  const handleNextOrFinish = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1)
    } else {
      setShowRoleSelectModal(true)
    }
  }

  const slide = slides[currentSlide]

  return (
    <div className="min-h-screen bg-slate-900/40 backdrop-blur-sm sm:py-6 flex items-center justify-center p-0 sm:p-4 select-none">
      {/* Mobile Device Frame Mockup */}
      <div className="w-full sm:max-w-[390px] h-screen sm:h-[844px] bg-[#FAF8FE] sm:rounded-[48px] shadow-2xl sm:border-[8px] sm:border-slate-850 relative overflow-hidden flex flex-col justify-between">
        
        {/* Subtle Grid Paper Pattern Background with gentle ambient pastel glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(200, 175, 235, 0.22) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(200, 175, 235, 0.22) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Ambient Gradient Blobs */}
        <div className="absolute top-1/4 -right-16 w-64 h-64 rounded-full bg-purple-300/25 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 -left-16 w-64 h-64 rounded-full bg-rose-200/35 blur-3xl pointer-events-none" />
        <div className="absolute -top-10 left-10 w-48 h-48 rounded-full bg-blue-200/20 blur-2xl pointer-events-none" />

        {/* iOS Dynamic Island & Status Bar */}
        <div className="relative z-30 pt-3 px-6 flex items-center justify-between text-slate-900">
          <span className="text-xs font-semibold tracking-tight">9:41</span>
          
          {/* Dynamic Island pill */}
          <div className="w-24 h-6 bg-black rounded-full flex items-center justify-end px-2 gap-1.5 shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-[#1c1c1e] border border-slate-700/60" />
            <div className="w-2 h-2 rounded-full bg-emerald-950/80" />
          </div>

          <div className="flex items-center gap-1.5 text-slate-800">
            <Signal className="w-3.5 h-3.5 fill-current" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4 fill-current" />
          </div>
        </div>

        {/* Top Header Floating Badge & Skip */}
        <div className="relative z-20 px-6 pt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx ? 'w-6 bg-slate-900' : 'w-1.5 bg-slate-300'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* AI-Powered Glowing Pill Badge (matching image) */}
          <div className="bg-white/95 backdrop-blur-md py-1.5 px-3 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.06)] border border-white flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-rose-400 via-purple-400 to-indigo-400 p-[1.5px] flex items-center justify-center shadow-xs">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-purple-600 fill-current" viewBox="0 0 24 24">
                  <path d="M18.8 4c-1.3 0-2.4.7-3.1 1.7-.8-.7-1.8-1.2-3-1.2-1.2 0-2.2.5-3 1.2C9 4.7 7.9 4 6.6 4 4.1 4 2 6.1 2 8.6c0 3.8 2.2 6.8 4 9.1 1.2 1.5 2.5 2.8 3.5 3.7.4.4.8.6 1.2.6.4 0 .8-.2 1.2-.6 1-.9 2.3-2.2 3.5-3.7 1.8-2.3 4-5.3 4-9.1C21.4 6.1 19.3 4 18.8 4z" />
                </svg>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-800 tracking-tight">
              {slide.badge}
            </span>
          </div>
        </div>

        {/* Title & Subtitle Section */}
        <div className="relative z-20 px-6 pt-4 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-[1.08] whitespace-pre-line font-sans">
            {slide.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-[240px]">
            {slide.subtitle}
          </p>
        </div>

        {/* Central 3D Illuminated Tooth with Luminous Orbital Rings */}
        <div className="relative z-10 flex-1 flex items-center justify-center my-auto px-4 overflow-visible">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
            
            {/* Ambient Backlight Sphere */}
            <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-purple-200/60 to-rose-200/50 blur-2xl pointer-events-none" />

            {/* Glowing Multi-Ring Orbital Energy Trails (Passes in front and back of tooth) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
              viewBox="0 0 320 320"
              fill="none"
            >
              <defs>
                {/* Gradient for orbital rings */}
                <linearGradient id="orbitGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.1" />
                  <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.95" />
                  <stop offset="70%" stopColor="#E9D5FF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.15" />
                </linearGradient>

                <filter id="glowBlur" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Orbital Ring 1 - Upper swoosh */}
              <ellipse
                cx="160"
                cy="165"
                rx="145"
                ry="48"
                transform="rotate(-18 160 165)"
                stroke="url(#orbitGlow)"
                strokeWidth="2.8"
                strokeDasharray="450 150"
                filter="url(#glowBlur)"
                className="animate-[pulse_3s_ease-in-out_infinite]"
              />

              {/* Orbital Ring 2 - Concentric offset swoosh */}
              <ellipse
                cx="160"
                cy="175"
                rx="140"
                ry="44"
                transform="rotate(-18 160 175)"
                stroke="url(#orbitGlow)"
                strokeWidth="2.2"
                strokeDasharray="400 180"
                filter="url(#glowBlur)"
                opacity="0.85"
              />

              {/* Orbital Ring 3 - Outer thin whisper ring */}
              <ellipse
                cx="160"
                cy="185"
                rx="135"
                ry="40"
                transform="rotate(-18 160 185)"
                stroke="#FFFFFF"
                strokeWidth="1.6"
                strokeDasharray="360 200"
                filter="url(#glowBlur)"
                opacity="0.7"
              />

              {/* Sparkling Particle Highlights on the orbit */}
              <circle cx="270" cy="140" r="3" fill="#FFFFFF" filter="url(#glowBlur)">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="50" cy="190" r="2.5" fill="#FFFFFF" filter="url(#glowBlur)">
                <animate attributeName="opacity" values="1;0.3;1" dur="2.5s" repeatCount="indefinite" />
              </circle>
            </svg>

            {/* Pristine 3D Rendered Molar Tooth */}
            <div className="relative z-10 w-60 h-64 sm:w-68 sm:h-72 drop-shadow-[0_20px_35px_rgba(147,112,219,0.22)] transition-transform duration-500 hover:scale-105">
              <svg
                viewBox="0 0 280 300"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Pearlescent White Enamel Body Gradient */}
                  <linearGradient id="toothBody" x1="20%" y1="10%" x2="80%" y2="90%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="35%" stopColor="#F8FAFC" />
                    <stop offset="70%" stopColor="#EDE9FE" />
                    <stop offset="100%" stopColor="#DDD6FE" />
                  </linearGradient>

                  {/* Specular Crown Highlight */}
                  <linearGradient id="specularGlow" x1="0%" y1="0%" x2="100%" y2="80%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </linearGradient>

                  {/* Soft Occlusal Cusp Shadow */}
                  <radialGradient id="cuspShadow" cx="50%" cy="30%" r="50%">
                    <stop offset="0%" stopColor="#DDD6FE" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#DDD6FE" stopOpacity="0" />
                  </radialGradient>

                  {/* Root Shadow Depth */}
                  <linearGradient id="rootDepth" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0.45" />
                  </linearGradient>
                </defs>

                {/* Main Tooth Silhouette (Anatomical Human Molar) */}
                <path
                  d="M65 85
                     C65 52 95 38 120 44
                     C135 48 145 48 160 44
                     C185 38 215 52 215 85
                     C218 118 210 148 200 178
                     C195 192 188 230 180 262
                     C176 276 166 278 160 265
                     C152 245 146 205 140 180
                     C134 205 128 245 120 265
                     C114 278 104 276 100 262
                     C92 230 85 192 80 178
                     C70 148 62 118 65 85 Z"
                  fill="url(#toothBody)"
                />

                {/* Left Root Shading */}
                <path
                  d="M80 178
                     C85 192 92 230 100 262
                     C104 276 114 278 120 265
                     C128 245 134 205 140 180
                     C128 178 95 178 80 178 Z"
                  fill="url(#rootDepth)"
                />

                {/* Right Root Shading */}
                <path
                  d="M140 180
                     C146 205 152 245 160 265
                     C166 278 176 276 180 262
                     C188 230 195 192 200 178
                     C185 178 152 178 140 180 Z"
                  fill="url(#rootDepth)"
                />

                {/* Crown Occlusal Anatomical Grooves & Cusps */}
                <path
                  d="M85 70
                     C110 82 140 82 165 72
                     C180 66 195 72 202 82
                     C190 98 170 105 140 105
                     C110 105 88 95 85 70 Z"
                  fill="url(#cuspShadow)"
                />

                {/* Glossy High-Specularity Light Reflection (Curved Sheen on Crown) */}
                <path
                  d="M78 72
                     C78 52 100 44 125 48
                     C105 55 90 68 88 88
                     C85 82 80 78 78 72 Z"
                  fill="url(#specularGlow)"
                />

                <path
                  d="M185 52
                     C198 56 208 66 208 80
                     C205 70 198 62 188 58
                     C186 55 185 53 185 52 Z"
                  fill="#FFFFFF"
                  opacity="0.8"
                />

                {/* Vertical Central Enamel Light Ridge */}
                <path
                  d="M135 60
                     C142 60 148 85 146 130
                     C144 150 138 150 136 130
                     C134 85 130 60 135 60 Z"
                  fill="#FFFFFF"
                  opacity="0.55"
                />

                {/* Sparkle Glint on the Cusp */}
                <g transform="translate(95, 48)">
                  <polygon
                    points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2"
                    fill="#FFFFFF"
                    className="animate-pulse"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom CTA Capsule Button (Matching Image Style) */}
        <div className="relative z-20 px-6 pb-8 pt-2">
          <button
            onClick={handleNextOrFinish}
            className="w-full h-15 bg-black hover:bg-slate-900 active:scale-[0.98] text-white rounded-full flex items-center justify-between pl-6 pr-2 shadow-xl shadow-slate-900/20 transition-all cursor-pointer group"
          >
            <span className="text-base font-bold tracking-tight">
              {currentSlide === slides.length - 1 ? 'Get Started' : 'Next Step'}
            </span>

            {/* Circular White Button with Diagonal Upward-Right Arrow ↗ */}
            <div className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <ArrowUpRight className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
          </button>

          {/* Quick Skip / Jump to Portal */}
          <div className="mt-3 flex items-center justify-center gap-3">
            <button
              onClick={() => onComplete('patient')}
              className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Skip to Patient Portal
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => onComplete('doctor')}
              className="text-[11px] font-semibold text-patient-primary hover:underline"
            >
              Doctor Sign-In
            </button>
          </div>
        </div>
      </div>

      {/* Role Selection Modal on Get Started */}
      {showRoleSelectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-patient-primary-light text-patient-primary flex items-center justify-center mx-auto mb-2">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">
                Welcome to Dr. Ken Miller Dental
              </h3>
              <p className="text-xs text-slate-500">
                Select your intended portal experience to proceed:
              </p>
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
                      Patient Portal (Sarah Tremblay)
                    </h4>
                    <p className="text-[11px] text-teal-800">
                      Appointments, Implant tracker, Hygiene recall
                    </p>
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
                      Doctor EHR (Dr. Ken Miller, DDS)
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Chairside ops, Odontogram, Schedule & Triage
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="pt-2 text-center">
              <span className="text-[10px] text-slate-400">
                You can switch between Patient and Doctor anytime using the header toggle.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
