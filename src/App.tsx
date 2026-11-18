import React, { useState } from 'react'
import { UserRole, PatientTab, DoctorTab } from '@/types'
import { ClinicHeader } from '@/components/layout/ClinicHeader'
import { DesktopNav } from '@/components/layout/DesktopNav'
import { PatientBottomNav } from '@/components/layout/PatientBottomNav'
import { DoctorBottomNav } from '@/components/layout/DoctorBottomNav'
import { ThemeSpecDrawer } from '@/components/common/ThemeSpecDrawer'
import { Dialog } from '@/components/ui/Dialog'
import { CLINIC_INFO, CURRENT_PATIENT } from '@/data/mockData'

// Patient Views
import { PatientHome } from '@/components/patient/PatientHome'
import { PatientAppointments } from '@/components/patient/PatientAppointments'
import { PatientServices } from '@/components/patient/PatientServices'
import { PatientMyCare } from '@/components/patient/PatientMyCare'
import { PatientEmergency } from '@/components/patient/PatientEmergency'

// Doctor Views
import { DoctorDashboard } from '@/components/doctor/DoctorDashboard'
import { DoctorCharting } from '@/components/doctor/DoctorCharting'
import { DoctorSchedule } from '@/components/doctor/DoctorSchedule'
import { DoctorEmergencyDesk } from '@/components/doctor/DoctorEmergencyDesk'
import { DoctorLabAndPostOp } from '@/components/doctor/DoctorLabAndPostOp'

export function App() {
  const [role, setRole] = useState<UserRole>('patient')
  const [patientTab, setPatientTab] = useState<PatientTab>('home')
  const [doctorTab, setDoctorTab] = useState<DoctorTab>('overview')
  const [themeSpecOpen, setThemeSpecOpen] = useState(false)
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const [receptionModalOpen, setReceptionModalOpen] = useState(false)

  const toggleRole = () => {
    setRole((prev) => (prev === 'patient' ? 'doctor' : 'patient'))
  }

  const isDoctor = role === 'doctor'

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      isDoctor ? 'bg-[#F1F5F9]' : 'bg-[#F8FAFC]'
    }`}>
      {/* Top Clinic Header */}
      <ClinicHeader
        role={role}
        onToggleRole={toggleRole}
        onOpenThemeSpec={() => setThemeSpecOpen(true)}
        onCallClinic={() => setReceptionModalOpen(true)}
        onOpenProfile={() => setProfileModalOpen(true)}
      />

      {/* Main Responsive Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar (hidden on mobile, visible on desktop) */}
        <DesktopNav
          role={role}
          patientTab={patientTab}
          doctorTab={doctorTab}
          onSelectPatientTab={(tab) => setPatientTab(tab)}
          onSelectDoctorTab={(tab) => setDoctorTab(tab)}
          onToggleRole={toggleRole}
          onOpenThemeSpec={() => setThemeSpecOpen(true)}
        />

        {/* Dynamic Content Container */}
        <main className="flex-1 max-w-md mx-auto sm:max-w-xl md:max-w-3xl lg:max-w-4xl px-4 py-3 sm:py-5 w-full">
          {/* PATIENT SCREENS */}
          {!isDoctor && (
            <>
              {patientTab === 'home' && <PatientHome onNavigate={(t) => setPatientTab(t)} />}
              {patientTab === 'appointments' && <PatientAppointments />}
              {patientTab === 'services' && <PatientServices onNavigate={(t) => setPatientTab(t)} />}
              {patientTab === 'mycare' && <PatientMyCare />}
              {patientTab === 'emergency' && (
                <PatientEmergency
                  onNotifyArrivalSuccess={() => {
                    // switch to doctor or alert
                  }}
                />
              )}
            </>
          )}

          {/* DOCTOR SCREENS */}
          {isDoctor && (
            <>
              {doctorTab === 'overview' && (
                <DoctorDashboard onNavigateTab={(t) => setDoctorTab(t)} />
              )}
              {doctorTab === 'charting' && <DoctorCharting />}
              {doctorTab === 'schedule' && <DoctorSchedule />}
              {doctorTab === 'triage' && <DoctorEmergencyDesk />}
              {doctorTab === 'lab' && <DoctorLabAndPostOp />}
            </>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden">
        {!isDoctor ? (
          <PatientBottomNav
            activeTab={patientTab}
            onSelectTab={(tab) => setPatientTab(tab)}
          />
        ) : (
          <DoctorBottomNav
            activeTab={doctorTab}
            onSelectTab={(tab) => setDoctorTab(tab)}
            unreadTriageCount={1}
          />
        )}
      </div>

      {/* Floating Theme Spec Pill (always accessible on mobile) */}
      <div className="lg:hidden fixed bottom-16 right-4 z-30">
        <button
          onClick={() => setThemeSpecOpen(true)}
          className="bg-slate-900/90 text-white text-[11px] font-bold py-1.5 px-3 rounded-full shadow-lg backdrop-blur-xs flex items-center gap-1.5 hover:bg-slate-800 transition-all cursor-pointer border border-slate-700"
        >
          <span>🎨</span>
          <span>Theme Tokens</span>
        </button>
      </div>

      {/* Theme Specification Modal */}
      <ThemeSpecDrawer
        isOpen={themeSpecOpen}
        onClose={() => setThemeSpecOpen(false)}
      />

      {/* Reception Call Modal */}
      <Dialog
        isOpen={receptionModalOpen}
        onClose={() => setReceptionModalOpen(false)}
        title="Call Dr. Ken Miller Dental Reception"
        subtitle={CLINIC_INFO.fullAddress}
      >
        <div className="space-y-3 text-xs sm:text-sm text-slate-700">
          <p>
            Our front desk is available Monday through Friday from 8:30 AM to 4:30 PM for appointment bookings, insurance billing queries, and doctor inquiries.
          </p>
          <div className="bg-teal-50 p-3 rounded-xl border border-teal-200 text-teal-900 font-bold flex items-center justify-between">
            <span>Direct Reception Line:</span>
            <span className="font-mono text-sm">{CLINIC_INFO.phone}</span>
          </div>
          <a
            href={`tel:${CLINIC_INFO.phone.replace(/[^0-9]/g, '')}`}
            className="w-full bg-[#0A5C67] hover:bg-[#084952] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            <span>Dial {CLINIC_INFO.phone} Now</span>
          </a>
        </div>
      </Dialog>

      {/* Profile Modal */}
      <Dialog
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        title={isDoctor ? 'Dr. Ken Miller, DDS' : CURRENT_PATIENT.name}
        subtitle={isDoctor ? 'Lead Dental Surgeon (Lic. #ALB-4921)' : `Chart ${CURRENT_PATIENT.chartNumber}`}
      >
        <div className="space-y-3 text-xs sm:text-sm text-slate-700">
          <div className="flex items-center gap-3">
            <img
              src={
                isDoctor
                  ? 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200'
                  : CURRENT_PATIENT.avatar
              }
              alt="Avatar"
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-200"
            />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                {isDoctor ? 'Dr. Ken Miller, DDS' : CURRENT_PATIENT.name}
              </h4>
              <p className="text-slate-500 text-xs mt-0.5">
                {isDoctor ? 'St. Paul Practice Principal since 1986' : `Patient with Dr. Miller since ${CURRENT_PATIENT.since}`}
              </p>
              <div className="mt-1">
                <span className="text-[10px] font-bold bg-teal-100 text-teal-900 px-2 py-0.5 rounded-full">
                  {isDoctor ? 'Lead Dentist' : CURRENT_PATIENT.insurancePlan}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-500">Contact Phone:</span>
              <span className="font-semibold text-slate-800">{isDoctor ? CLINIC_INFO.phone : CURRENT_PATIENT.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Clinic Address:</span>
              <span className="font-semibold text-slate-800">{CLINIC_INFO.location}</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                toggleRole()
                setProfileModalOpen(false)
              }}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-300 font-bold text-slate-800 hover:bg-slate-100 transition-colors"
            >
              Switch Role to {isDoctor ? 'Patient View' : 'Doctor View'}
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
export default App
