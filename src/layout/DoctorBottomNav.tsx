import React from 'react'
import { LayoutDashboard, Users, Activity, CalendarDays, PackageCheck } from 'lucide-react'
import { DoctorTab } from '@/types'

interface DoctorBottomNavProps {
  activeTab: DoctorTab
  onSelectTab: (tab: DoctorTab) => void
  unreadTriageCount?: number
}

interface TabItem {
  id: DoctorTab
  label: string
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  badge?: number
  urgent?: boolean
}

export const DoctorBottomNav: React.FC<DoctorBottomNavProps> = ({
  activeTab,
  onSelectTab,
  unreadTriageCount = 1
}) => {
  const tabs: TabItem[] = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'schedule', label: 'Schedule', icon: CalendarDays },
    { id: 'charting', label: 'Charting', icon: Activity },
    { id: 'lab', label: 'CEREC & Labs', icon: PackageCheck }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/85 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] text-slate-600">
      <div className="max-w-md sm:max-w-xl md:max-w-2xl mx-auto grid grid-cols-5 items-center h-16 px-1 sm:px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`w-full h-14 flex flex-col items-center justify-center rounded-xl transition-all duration-150 cursor-pointer ${
                isActive
                  ? tab.urgent
                    ? 'text-red-600 font-bold'
                    : 'text-doctor-primary font-bold'
                  : 'text-slate-400 hover:text-slate-700'
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
                  <span className="absolute -top-1 -right-2.5 bg-rose-500 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full animate-bounce shadow-2xs">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight font-semibold">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
