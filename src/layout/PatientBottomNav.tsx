import React from 'react'
import { Home, Plus, BriefcaseMedical, ShieldCheck, AlertCircle } from 'lucide-react'
import { PatientTab } from '@/types'

interface PatientBottomNavProps {
  activeTab: PatientTab
  onSelectTab: (tab: PatientTab) => void
}

export const PatientBottomNav: React.FC<PatientBottomNavProps> = ({
  activeTab,
  onSelectTab
}) => {
  const tabs = [
    { id: 'home' as PatientTab, label: 'Home', icon: Home },
    { id: 'services' as PatientTab, label: 'Services', icon: BriefcaseMedical },
    { id: 'appointments' as PatientTab, label: 'Appointments', icon: Plus, isAction: true },
    { id: 'mycare' as PatientTab, label: 'My Care', icon: ShieldCheck },
    { id: 'emergency' as PatientTab, label: 'Emergency', icon: AlertCircle, urgent: true }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] overflow-visible">
      <div className="max-w-md sm:max-w-xl md:max-w-2xl mx-auto grid grid-cols-5 items-center h-16 px-1 sm:px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          // Elevated Center Action Tab (Appointments with + icon, upward inverted)
          if (tab.isAction) {
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className="w-full relative -top-3.5 flex flex-col items-center justify-center group cursor-pointer focus:outline-none"
                aria-label={tab.label}
              >
                <div
                  className={`w-12 h-12 shrink-0 aspect-square rounded-full flex items-center justify-center transition-all duration-200 border-4 border-white shadow-[0_6px_16px_rgba(10,92,103,0.32)] active:scale-95 ${
                    isActive
                      ? 'bg-patient-primary-hover ring-2 ring-patient-primary/30'
                      : 'bg-patient-primary hover:bg-patient-primary-hover group-hover:scale-105'
                  }`}
                >
                  <Plus className="w-6 h-6 text-white stroke-[2.8]" />
                </div>
                <span
                  className={`text-[10px] mt-1 tracking-tight transition-colors text-center whitespace-nowrap ${
                    isActive
                      ? 'text-patient-primary font-bold'
                      : 'text-slate-600 font-semibold group-hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            )
          }

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`w-full h-14 flex flex-col items-center justify-center rounded-xl transition-all duration-150 cursor-pointer ${
                isActive
                  ? tab.urgent
                    ? 'text-patient-emergency font-bold'
                    : 'text-patient-primary font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-150 ${
                    isActive ? 'scale-110' : ''
                  }`}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
                {tab.urgent && !isActive && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-patient-emergency animate-pulse" />
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight text-center whitespace-nowrap">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
