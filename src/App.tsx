import React, { useState, useEffect } from 'react'
import { UserRole, PatientTab, DoctorTab } from '@/types'
import { ClinicHeader } from '@/layout/ClinicHeader'
import { PatientBottomNav } from '@/layout/PatientBottomNav'
import { DoctorBottomNav } from '@/layout/DoctorBottomNav'
import { DesktopDeviceFrame } from '@/layout/DesktopDeviceFrame'
import { Dialog } from '@/components/ui/Dialog'
import { CLINIC_INFO, CURRENT_PATIENT } from '@/data/mockData'

// Splash & Onboarding
import { SplashScreen } from '@/pages/onboarding/SplashScreen'
import { OnboardingScreen } from '@/pages/onboarding/OnboardingScreen'

// Patient Views
import { PatientHome } from '@/pages/patient/PatientHome'
import { PatientAppointments } from '@/pages/patient/PatientAppointments'
import { PatientServices } from '@/pages/patient/PatientServices'
import { PatientMyCare } from '@/pages/patient/PatientMyCare'
import { PatientEmergency } from '@/pages/patient/PatientEmergency'

// Doctor Views
import { DoctorDashboard } from '@/pages/doctor/DoctorDashboard'
import { DoctorCharting } from '@/pages/doctor/DoctorCharting'
import { DoctorSchedule } from '@/pages/doctor/DoctorSchedule'
import { DoctorEmergencyDesk } from '@/pages/doctor/DoctorEmergencyDesk'
import { DoctorLabAndPostOp } from '@/pages/doctor/DoctorLabAndPostOp'

/**
 * Mobile Dental App Core
 * When rendered inside the 393x852 viewport iframe or on physical mobile,
 * all media queries, touches, and layouts run in genuine 1:1 mobile mode.
 */
function MobileDentalApp() {
  // Always start from splash screen on browser refresh / new session
  const [appState, setAppState] = useState<'splash' | 'onboarding' | 'portal'>('splash')
  const [role, setRole] = useState<UserRole>('patient')
  const [patientTab, setPatientTab] = useState<PatientTab>('home')
  const [doctorTab, setDoctorTab] = useState<DoctorTab>('overview')

  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const [receptionModalOpen, setReceptionModalOpen] = useState(false)

  const toggleRole = () => {
    setRole((prev) => (prev === 'patient' ? 'doctor' : 'patient'))
  }

  const handleOnboardingFinish = (selectedRole: UserRole) => {
    setRole(selectedRole)
    setAppState('portal')
  }

  const isDoctor = role === 'doctor'

  // Clean URL query params on refresh so every reload starts cleanly from splash
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search) {
      window.history.replaceState(null, '', window.location.pathname)
      if (window.self !== window.top && window.top) {
        try {
          window.top.history.replaceState(null, '', window.top.location.pathname)
        } catch {
          // Cross-origin safety
        }
      }
    }
  }, [])

  // 1. Splash Screen Mode
  if (appState === 'splash') {
    return <SplashScreen onComplete={() => setAppState('onboarding')} />
  }

  // 2. Onboarding Screen Mode (Pixel match to uploaded design)
  if (appState === 'onboarding') {
    return <OnboardingScreen onComplete={handleOnboardingFinish} />
  }

  // 3. Main Clinical & Patient Portal Mode
  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isDoctor ? 'bg-doctor-bg' : 'bg-patient-bg'
      }`}
    >
      {/* Top Clinic Header */}
      <ClinicHeader
        role={role}
        onToggleRole={toggleRole}
        onCallClinic={() => setReceptionModalOpen(true)}
        onOpenProfile={() => setProfileModalOpen(true)}
        onOpenOnboarding={() => setAppState('onboarding')}
      />

      {/* Main Responsive Body (Mobile & Tablet First) */}
      <div className="flex-1 flex flex-col w-full">
        {/* Dynamic Content Container */}
        <main className="flex-1 max-w-md sm:max-w-xl md:max-w-2xl mx-auto px-4 py-3 sm:py-5 w-full pb-24 sm:pb-28">
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
                    // Alert dispatched
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

      {/* Mobile & Tablet Bottom Navigation Bar (Always Visible) */}
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

      {/* Reception Call Modal */}
      <Dialog
        isOpen={receptionModalOpen}
        onClose={() => setReceptionModalOpen(false)}
        title="Dr. Ken Miller Dental Clinic"
        subtitle={CLINIC_INFO.location}
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
            className="w-full bg-patient-primary hover:bg-patient-primary-hover text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
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
              className="w-full py-2.5 px-3 rounded-xl border border-slate-300 font-bold text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Switch Role to {isDoctor ? 'Patient View' : 'Doctor View'}
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

/**
 * Root Application
 * Wraps with DesktopDeviceFrame (Viewport Iframe Architecture)
 * - On desktop: hosts an iPhone 15 Pro mockup with 393x852 iframe
 * - Inside iframe / on mobile: renders genuine 1:1 mobile PWA directly
 */
export function App() {
  return (
    <DesktopDeviceFrame>
      <MobileDentalApp />
    </DesktopDeviceFrame>
  )
}

export default App
