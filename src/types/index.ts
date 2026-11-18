export type UserRole = 'patient' | 'doctor'

export type PatientTab = 'home' | 'appointments' | 'services' | 'mycare' | 'emergency'
export type DoctorTab = 'overview' | 'charting' | 'schedule' | 'triage' | 'lab'

export interface PatientProfile {
  id: string
  name: string
  chartNumber: string
  since: number
  primaryDentist: string
  insurancePlan: string
  coverage: string
  avatar: string
  phone: string
  medicalAlerts: string[]
}

export interface Appointment {
  id: string
  type: string
  date: string
  time: string
  duration: string
  provider: string
  providerRole: string
  location: string
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled'
  readyForCheckIn?: boolean
  notes?: string
}

export interface CarePlanStep {
  stepNumber: number
  title: string
  status: 'completed' | 'current' | 'upcoming'
  date?: string
  description?: string
}

export interface CarePlan {
  id: string
  title: string
  tooth: string
  currentStep: number
  totalSteps: number
  statusText: string
  steps: CarePlanStep[]
  clinicalNote: string
  costEstimate: number
  insuranceEstimatedCoverage: number
  copayEstimated: number
}

export interface RecoveryTask {
  id: string
  title: string
  details: string
  frequency?: string
  completed: boolean
  progressCount?: number
  targetCount?: number
}

export interface DentalService {
  id: string
  name: string
  category: 'Treatments' | 'Recovery' | 'Pre-Op'
  tag?: string
  description: string
  features: string[]
  isHero?: boolean
  image?: string
  duration?: string
}

export interface EmergencyProtocol {
  id: string
  title: string
  urgencyBadge?: string
  badgeVariant?: 'red' | 'amber' | 'blue'
  protocolTitle?: string
  steps: string[]
  crucialWarning?: string
  actionLabel?: string
}

// Doctor Portal specific types
export interface OperatoryChair {
  id: string
  name: string
  room: string
  provider: string
  status: 'occupied' | 'prepping' | 'available' | 'cleaning'
  currentPatient?: {
    name: string
    chartNumber: string
    procedure: string
    startTime: string
    elapsedMinutes: number
    anesthesiaAdministeredAt?: string
    anesthetic?: string
    tooth?: string
    medicalAlert?: string
  }
}

export interface ToothData {
  number: number
  name: string
  condition: 'healthy' | 'crown' | 'implant' | 'decay' | 'missing' | 'rootcanal'
  notes?: string
  plannedProcedure?: string
}

export interface TriageTicket {
  id: string
  patientName: string
  phone: string
  urgency: 'high' | 'moderate' | 'mild'
  condition: string
  reportedTime: string
  etaMinutes?: number
  symptoms: string
  status: 'unresolved' | 'assigned' | 'resolved'
  assignedOperatory?: string
}

export interface LabCase {
  id: string
  patientName: string
  chartNumber: string
  toothNumber: string
  type: string
  labName: string
  sentDate: string
  expectedDelivery: string
  status: 'in_fabrication' | 'shipped' | 'delivered_at_clinic' | 'seated'
  shade: string
}
