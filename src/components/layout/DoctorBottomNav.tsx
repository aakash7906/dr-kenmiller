import React from 'react'
import { LayoutDashboard, Activity, CalendarDays, AlertOctagon, PackageCheck } from 'lucide-react'
import { DoctorTab } from '@/types'

interface DoctorBottomNavProps {
  activeTab: DoctorTab
  onSelectTab: (tab: DoctorTab) => void
  unreadTriageCount?: number
}

export const DoctorBottomNav: React.FC<DoctorBottomNavProps> = ({
  activeTab,
  onSelectTab,
  unreadTriageCount = 1
}) => {
  const tabs = [
    { id: 'overview' as DoctorTab, label: 'Chairside', icon: LayoutDashboard },
    { id: 'charting' as DoctorTab, label: 'Charting', icon: Activity },
    { id: 'schedule' as DoctorTab, label: 'Schedule', icon: CalendarDays },
    { id: 'triage' as DoctorTab, label: 'Triage Desk', icon: AlertOctagon, badge: unreadTriageCount },
    { id: 'lab' as DoctorTab, label: 'Lab & Post-Op', icon: PackageCheck }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0F2B48]/95 backdrop-blur-md border-t border-slate-700/60 shadow-[0_-4px_25px_rgba(15,43,72,0.25)] text-slate-300">
      <div className="max-w-md mx-auto sm:max-w-xl md:max-w-3xl flex items-center justify-around px-2 py-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'text-cyan-300 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-150 ${
                    isActive ? 'scale-110' : ''
                  }`}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
                {tab.badge && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[9px] font-extrabold px-1 rounded-full animate-bounce">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{tab.label}</span>
              {isActive && <span className="w-1 h-1 rounded-full bg-cyan-400 mt-0.5" />}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
