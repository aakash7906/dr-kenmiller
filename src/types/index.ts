export type UserRole = 'patient' | 'doctor'

export type PatientTab = 'home' | 'appointments' | 'services' | 'mycare' | 'emergency'
export type DoctorTab = 'overview' | 'patients' | 'charting' | 'schedule' | 'triage' | 'lab'

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

// CEREC In-House Single-Visit CAD/CAM Milling Pipeline
export interface CerecMillingCase {
  id: string
  patientName: string
  chartNumber: string
  toothNumber: string
  material: 'e.max CAD Lithium Disilicate' | 'CEREC Tessera Advanced Lithium' | 'Katana Zirconia Block' | 'Telio CAD Temp'
  stage: 'digital_scan' | 'cad_design' | 'milling' | 'crystallization' | 'ready_to_seat' | 'seated'
  shade: string
  estimatedMinutesLeft: number
  millingUnit: string
  prepTime: string
  provider: string
}

// Periodontal Probing Record
export interface PerioSiteData {
  toothNumber: number
  facialDepths: [number, number, number] // Disto-facial, Facial, Mesio-facial
  lingualDepths: [number, number, number] // Disto-lingual, Lingual, Mesio-lingual
  bleedingOnProbing: boolean
  furcationGrade?: 1 | 2 | 3
  mobilityGrade?: 0 | 1 | 2 | 3
  recessionMm?: number
}

// Comprehensive Electronic Health Record (EHR)
export interface ComprehensivePatientRecord extends PatientProfile {
  dob: string
  age: number
  email: string
  address: string
  gender: string
  emergencyContact?: {
    name: string
    relationship: string
    phone: string
  }
  pharmacyPreference: string
  lastVisitDate: string
  nextAppointmentDate?: string
  status: 'active' | 'recall_due' | 'in_treatment' | 'emergency'
  familyHeadId?: string
  familyName?: string
  vitals: {
    bloodPressure: string
    pulse: number
    lastUpdated: string
  }
  soapNotesHistory: {
    id: string
    date: string
    provider: string
    subjective: string
    objective: string
    assessment: string
    plan: string
  }[]
  perioSites: PerioSiteData[]
  digitalScans: {
    id: string
    title: string
    type: 'CBCT 3D' | 'Bitewing X-Ray' | 'Panoramic' | 'Intraoral Photo'
    date: string
    image: string
    notes: string
    tooth?: string
  }[]
  prescriptions: {
    id: string
    medication: string
    dosage: string
    instructions: string
    datePrescribed: string
    prescribingDDS: string
    status: 'active' | 'completed'
  }[]
  eConsents: {
    id: string
    title: string
    signedDate: string
    status: 'verified' | 'pending'
    procedure: string
  }[]
}
