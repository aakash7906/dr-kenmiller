import React from 'react'
import { Home, Calendar, BriefcaseMedical, ShieldCheck, AlertCircle } from 'lucide-react'
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
    { id: 'appointments' as PatientTab, label: 'Appointments', icon: Calendar },
    { id: 'services' as PatientTab, label: 'Services', icon: BriefcaseMedical },
    { id: 'mycare' as PatientTab, label: 'My Care', icon: ShieldCheck },
    { id: 'emergency' as PatientTab, label: 'Emergency', icon: AlertCircle, urgent: true }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
      <div className="max-w-md sm:max-w-xl md:max-w-2xl mx-auto flex items-center justify-around px-2 py-1.5 sm:py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-150 cursor-pointer ${
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
              <span className="text-[10px] mt-0.5 tracking-tight">{tab.label}</span>
              {isActive && (
                <span
                  className={`w-1 h-1 rounded-full mt-0.5 ${
                    tab.urgent ? 'bg-patient-emergency' : 'bg-patient-primary'
                  }`}
                />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
