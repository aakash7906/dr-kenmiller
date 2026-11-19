import React, { useState, useMemo, useEffect } from 'react'
import {
  Users,
  Search,
  Filter,
  Plus,
  ChevronRight,
  AlertTriangle,
  FileText,
  Activity,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Stethoscope,
  Pill,
  Camera,
  X,
  ExternalLink,
  HeartPulse,
  Share2,
  SlidersHorizontal,
  FolderHeart
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { Select } from '@/components/ui/Select'
import { COMPREHENSIVE_PATIENTS, CLINIC_DOCTORS, TODAY, formatShortDate, formatMonthDay } from '@/data/mockData'
import { ComprehensivePatientRecord, DoctorTab } from '@/types'

interface DoctorPatientsProps {
  onNavigateTab: (tab: DoctorTab) => void
  initialFilter?: 'all' | 'today'
}

// Live today floor schedule map: indicates who is being treated by whom, in which operatory, and current status
const TODAY_FLOOR_SCHEDULE: Record<string, {
  time: string
  operatory: string
  provider: string
  procedure: string
  status: 'seated' | 'completed' | 'upcoming'
}> = {
  'Sarah Tremblay': {
    time: '10:00 AM – 10:45 AM',
    operatory: 'Operatory 1',
    provider: 'Dr. Ken Miller, DDS',
    procedure: 'Implant Stage 2 Abutment Seating & Bitewings',
    status: 'seated'
  },
  'David Chen': {
    time: '9:45 AM & 11:15 AM',
    operatory: 'Hygiene Bay A / Operatory 2',
    provider: 'Lisa (RDH) & Dr. Julie Miller',
    procedure: 'Periodontal Prophylaxis & CEREC Tessera Onlay',
    status: 'seated'
  },
  "Liam O'Connor": {
    time: '11:30 AM – 12:30 PM',
    operatory: 'Operatory 4',
    provider: 'Dr. Austin Chomay, DDS',
    procedure: 'Urgent Trauma Stabilization & Wire Splint #8',
    status: 'seated'
  },
  'Robert Gagne': {
    time: '8:45 AM – 9:30 AM',
    operatory: 'Operatory 1',
    provider: 'Dr. Ken Miller, DDS',
    procedure: 'Post-Op Suture Removal 30',
    status: 'completed'
  },
  'Marcus Vance': {
    time: '10:45 AM – 11:30 AM',
    operatory: 'Operatory 2',
    provider: 'Dr. Ken Miller, DDS',
    procedure: 'Crown Prep & Temp Placement 14',
    status: 'upcoming'
  },
  'Grace Miller': {
    time: '1:15 PM – 2:00 PM',
    operatory: 'Hygiene Bay B',
    provider: 'Elena (RDH)',
    procedure: 'Pediatric Exam & Fluoride Varnish',
    status: 'upcoming'
  },
  'Ronald Bouchard': {
    time: '2:15 PM – 3:15 PM',
    operatory: 'Operatory 1',
    provider: 'Dr. Ken Miller, DDS',
    procedure: '3-Unit Bridge Try-In & Occlusal Balance',
    status: 'upcoming'
  },
  'Bernice Campbell': {
    time: '1:00 PM – 1:45 PM',
    operatory: 'Operatory 3',
    provider: 'Dr. Viktoria Kirsten, DDS',
    procedure: 'Hard Tissue Laser Debridement & Thermal Check #31',
    status: 'upcoming'
  }
}

export const DoctorPatients: React.FC<DoctorPatientsProps> = ({ onNavigateTab, initialFilter = 'today' }) => {
  const [patientsList, setPatientsList] = useState<ComprehensivePatientRecord[]>(COMPREHENSIVE_PATIENTS)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'today' | 'in_treatment' | 'recall_due' | 'alerts' | 'emergency'>(initialFilter)
  const [selectedDoctorFilter, setSelectedDoctorFilter] = useState('All')

  useEffect(() => {
    if (initialFilter) {
      setStatusFilter(initialFilter)
    }
  }, [initialFilter])
  
  // Selected Patient for 360° Medical Record Dossier
  const [activePatient, setActivePatient] = useState<ComprehensivePatientRecord | null>(null)
  const [dossierTab, setDossierTab] = useState<'vitals' | 'perio' | 'scans' | 'soap' | 'rx' | 'consents'>('vitals')
  
  // New Patient Registration Modal
  const [showAddPatientModal, setShowAddPatientModal] = useState(false)
  const [newPatientName, setNewPatientName] = useState('')
  const [newPatientPhone, setNewPatientPhone] = useState('')
  const [newPatientInsurance, setNewPatientInsurance] = useState('Alberta Blue Cross')
  const [newPatientAlert, setNewPatientAlert] = useState('')
  const [newPatientDoctor, setNewPatientDoctor] = useState('Dr. Ken Miller, DDS')

  // New Prescription Generator state
  const [showNewRxModal, setShowNewRxModal] = useState(false)
  const [rxMedication, setRxMedication] = useState('Amoxicillin 500mg')
  const [rxDosage, setRxDosage] = useState('1 capsule TID (every 8 hrs) x 7 days with water')
  const [rxAllergyWarning, setRxAllergyWarning] = useState<string | null>(null)

  // Filtered Patients List
  const filteredPatients = useMemo(() => {
    return patientsList.filter(p => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.chartNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.phone.includes(searchQuery) ||
        p.email.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus =
        statusFilter === 'all'
          ? true
          : statusFilter === 'today'
          ? !!TODAY_FLOOR_SCHEDULE[p.name]
          : statusFilter === 'in_treatment'
          ? p.status === 'in_treatment'
          : statusFilter === 'recall_due'
          ? p.status === 'recall_due'
          : statusFilter === 'emergency'
          ? p.status === 'emergency'
          : statusFilter === 'alerts'
          ? p.medicalAlerts.some(a => a.toLowerCase().includes('allergy') || a.toLowerCase().includes('trauma') || a.toLowerCase().includes('hypertension'))
          : true

      const matchesDoctor =
        selectedDoctorFilter === 'All'
          ? true
          : p.primaryDentist.toLowerCase().includes(selectedDoctorFilter.toLowerCase())

      return matchesSearch && matchesStatus && matchesDoctor
    })
  }, [patientsList, searchQuery, statusFilter, selectedDoctorFilter])

  // Handle Prescription Submit with Allergy Safety Verification
  const handlePrescribeMed = () => {
    if (!activePatient) return
    const isPenicillinAllergic = activePatient.medicalAlerts.some(a => a.toLowerCase().includes('penicillin'))
    const isPenicillinMed = rxMedication.toLowerCase().includes('amoxicillin') || rxMedication.toLowerCase().includes('penicillin')

    if (isPenicillinAllergic && isPenicillinMed) {
      setRxAllergyWarning(`CRITICAL CONTRAINDICATION ALERT: ${activePatient.name} has a verified PENICILLIN ALLERGY! Please switch to Clindamycin 300mg, Azithromycin, or Erythromycin.`)
      return
    }

    const newRx = {
      id: `rx-${Date.now()}`,
      medication: rxMedication,
      dosage: rxDosage,
      instructions: 'Dispense via Shoppers Drug Mart St. Paul. Post-op dental therapy.',
      datePrescribed: formatShortDate(TODAY),
      prescribingDDS: 'Dr. Ken Miller, DDS',
      status: 'active' as const
    }

    setActivePatient(prev => prev ? ({
      ...prev,
      prescriptions: [newRx, ...prev.prescriptions]
    }) : null)

    setShowNewRxModal(false)
    setRxAllergyWarning(null)
    alert(`E-Prescription for ${rxMedication} dispatched securely to ${activePatient.pharmacyPreference}!`)
  }

  // Handle Add New Patient Submit
  const handleCreatePatient = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPatientName.trim()) return

    const newRec: ComprehensivePatientRecord = {
      id: `pt-${Date.now()}`,
      name: newPatientName.trim(),
      chartNumber: `#KM-${Math.floor(1000 + Math.random() * 9000)}`,
      since: TODAY.getFullYear(),
      dob: 'Jan 15, 1992',
      age: 34,
      gender: 'Unspecified',
      email: `${newPatientName.toLowerCase().replace(/\s+/g, '.')}@email.com`,
      phone: newPatientPhone.trim() || '(780) 645-0000',
      address: 'St. Paul, AB',
      primaryDentist: newPatientDoctor,
      insurancePlan: newPatientInsurance,
      coverage: '80% Basic / 50% Major ($2,000 Cap)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250',
      status: 'active',
      medicalAlerts: newPatientAlert.trim() ? [newPatientAlert.trim()] : ['No Known Drug Allergies'],
      pharmacyPreference: 'Shoppers Drug Mart St. Paul',
      lastVisitDate: formatShortDate(TODAY),
      vitals: {
        bloodPressure: '120/80 mmHg',
        pulse: 72,
        lastUpdated: formatShortDate(TODAY)
      },
      soapNotesHistory: [
        {
          id: `soap-init-${Date.now()}`,
          date: formatShortDate(TODAY),
          provider: newPatientDoctor,
          subjective: 'New patient intake and registration completed at St. Paul clinic.',
          objective: 'Initial vitals stable. Comprehensive examination pending.',
          assessment: 'New intake patient.',
          plan: 'Schedule bitewing radiographs and full perio examination.'
        }
      ],
      perioSites: [],
      digitalScans: [],
      prescriptions: [],
      eConsents: []
    }

    setPatientsList(prev => [newRec, ...prev])
    setShowAddPatientModal(false)
    setNewPatientName('')
    setNewPatientPhone('')
    setNewPatientAlert('')
    alert(`Patient record for ${newRec.name} successfully created with Chart ${newRec.chartNumber}!`)
  }

  return (
    <div className="space-y-6 pb-28 pt-2">
      {/* 1. Module Header */}
      <div className="flex items-center justify-between gap-3">
        <div>       
          <h2 className="text-xl sm:text-2xl font-black text-doctor-primary tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-doctor-primary" />
            <span>Patient Records</span>
          </h2>
        </div>
<div className="absolute-left">
        <button
          onClick={() => setShowAddPatientModal(true)}
          className="inline-flex absolute-right items-center gap-2 bg-doctor-primary hover:bg-doctor-primary-hover text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs transition-all cursor-pointer active:scale-98 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Patient</span>
        </button>
        </div>
      </div>

      {/* 2. Search & Multi-Doctor Filter Strip */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, chart, phone, or insurance..."
            className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-doctor-primary focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Doctor and Status Filter Badges */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
          {/* Status Quick Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {[
              { id: 'today', label: "Today's Schedule (7)", isLive: true },
              { id: 'all', label: `All Patients (${patientsList.length})` },
              { id: 'in_treatment', label: 'In-Treatment' },
              { id: 'alerts', label: 'Allergies & Alerts' },
              { id: 'recall_due', label: 'Recall Due' },
              { id: 'emergency', label: 'Emergency' }
            ].map(chip => (
              <button
                key={chip.id}
                onClick={() => setStatusFilter(chip.id as any)}
                className={`py-1.5 px-3 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  statusFilter === chip.id
                    ? 'bg-doctor-primary text-white shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {chip.isLive && (
                  <span className={`w-1.5 h-1.5 rounded-full ${statusFilter === chip.id ? 'bg-emerald-300 animate-pulse' : 'bg-emerald-500'}`} />
                )}
                <span>{chip.label}</span>
              </button>
            ))}
          </div>

          {/* Provider Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[12px] font-bold text-slate-500 whitespace-nowrap">Doctor:</span>
            <div className="w-44 sm:w-48">
              <Select
                value={selectedDoctorFilter}
                onChange={setSelectedDoctorFilter}
                theme="doctor"
                triggerClassName="bg-slate-100 hover:bg-slate-200/70 border-slate-200/90 text-slate-800 font-bold py-1.5 px-3 text-xs rounded-xl shadow-2xs"
                dropdownClassName="w-52 right-0 left-auto"
                options={[
                  { value: 'All', label: 'All Clinicians' },
                  { value: 'Ken Miller', label: 'Dr. Ken Miller, DDS' },
                  { value: 'Julie Miller', label: 'Dr. Julie Miller, DDS' },
                  { value: 'Viktoria Kirsten', label: 'Dr. Viktoria Kirsten, DDS' },
                  { value: 'Austin Chomay', label: 'Dr. Austin Chomay, DDS' },
                  { value: 'Lisa', label: 'Lisa (RDH)' }
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Patients Registry Cards List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1 text-xs text-slate-500 font-semibold">
          <span>
            {statusFilter === 'today' ? "Today's Clinical Floor Patients" : `Showing ${filteredPatients.length} Records`}
          </span>
          {statusFilter === 'today' && (
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Live Clinic Shift
            </span>
          )}
        </div>

        {filteredPatients.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-2">
            <Users className="w-8 h-8 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold text-slate-800">No matching patient records</h4>
            <p className="text-xs text-slate-500">Try adjusting your search criteria or register a new intake.</p>
          </div>
        ) : (
          filteredPatients.map(patient => {
            const todaySchedule = TODAY_FLOOR_SCHEDULE[patient.name]

            return (
              <Card
                key={patient.id}
                className="p-4 sm:p-4.5 border-slate-200/90 hover:border-doctor-primary/40 transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
                onClick={() => {
                  setActivePatient(patient)
                  setDossierTab('vitals')
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Left Patient Bio */}
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <div className="relative shrink-0">
                      <img
                        src={patient.avatar}
                        alt={patient.name}
                        className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100 shrink-0"
                      />
                      <span
                        className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                          todaySchedule?.status === 'seated'
                            ? 'bg-emerald-500 ring-2 ring-emerald-200'
                            : patient.status === 'emergency'
                            ? 'bg-rose-500 animate-ping'
                            : patient.status === 'in_treatment'
                            ? 'bg-teal-500'
                            : patient.status === 'recall_due'
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                        }`}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-doctor-primary transition-colors">
                          {patient.name}
                        </h3>
                        <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
                          {patient.chartNumber}
                        </span>
                        <span className="text-xs text-slate-500">
                          {patient.age} yrs • {patient.gender}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-600 flex-wrap">
                        <span className="font-semibold text-doctor-primary">{patient.primaryDentist}</span>
                        <span>•</span>
                        <span>{patient.insurancePlan}</span>
                      </div>

                      {/* Medical Alert Pills */}
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                        {patient.medicalAlerts.map((alert, idx) => (
                          <span
                            key={idx}
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                              alert.toLowerCase().includes('allergy') || alert.toLowerCase().includes('trauma')
                                ? 'bg-rose-50 text-rose-800 border-rose-200'
                                : 'bg-blue-50 text-blue-800 border-blue-200'
                            }`}
                          >
                            {alert.toLowerCase().includes('allergy') && '⚠️ '}
                            {alert}
                          </span>
                        ))}
                      </div>

                      {/* Live Today Floor Appointment Strip */}
                      {todaySchedule && (
                        <div className="mt-2.5 p-2.5 bg-blue-50/80 border border-blue-200/90 rounded-xl flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2 flex-wrap text-xs">
                            <span className="font-extrabold text-slate-900 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-doctor-primary" />
                              <span>{todaySchedule.time}</span>
                            </span>
                            <span className="text-slate-300">•</span>
                            <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
                              {todaySchedule.operatory}
                            </span>
                            <span className="text-slate-300">•</span>
                            <span className="text-slate-600">
                              Doctor: <strong className="text-doctor-primary font-bold">{todaySchedule.provider}</strong>
                            </span>
                          </div>

                          <Badge
                            variant={
                              todaySchedule.status === 'seated'
                                ? 'emerald'
                                : todaySchedule.status === 'completed'
                                ? 'gray'
                                : 'blue'
                            }
                            size="sm"
                            className="font-bold shrink-0 text-[10px]"
                          >
                            {todaySchedule.status === 'seated'
                              ? '🟢 In Chair'
                              : todaySchedule.status === 'completed'
                              ? '✓ Completed'
                              : '🕒 Scheduled'}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Action & Visit Info */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2.5 sm:pt-0 border-slate-100 gap-2 shrink-0">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                        {todaySchedule ? "Today's Status" : 'Last Visit'}
                      </span>
                      <span className="text-xs font-semibold text-slate-700">
                        {todaySchedule ? todaySchedule.procedure.split('–')[0].trim() : patient.lastVisitDate}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setActivePatient(patient)
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-doctor-primary bg-doctor-primary-light hover:bg-doctor-primary hover:text-white px-3 py-1.5 rounded-xl border border-doctor-primary-border transition-all cursor-pointer"
                    >
                      <span>360° Dossier</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </Card>
            )
          })
        )}
      </div>

      {/* ========================================================================= */}
      {/* 4. 360° COMPREHENSIVE PATIENT MEDICAL RECORD MODAL (Dossier View) */}
      {/* ========================================================================= */}
      <Dialog
        isOpen={Boolean(activePatient)}
        onClose={() => setActivePatient(null)}
        title={activePatient ? `${activePatient.name} (${activePatient.chartNumber})` : 'Patient Dossier'}
        subtitle="Electronic Health Record • Dr. Ken Miller Dental Clinic"
        maxWidth="xl"
      >
        {activePatient && (
          <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
            {/* Top Critical Medical Alert Ribbon */}
            {activePatient.medicalAlerts.length > 0 && (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <h4 className="text-xs font-extrabold text-rose-900 uppercase tracking-wide">
                    Critical Clinical & Anesthetic Alerts:
                  </h4>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {activePatient.medicalAlerts.map((alert, i) => (
                      <span key={i} className="text-xs font-bold text-rose-800 bg-white px-2 py-0.5 rounded border border-rose-300">
                        {alert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Action Navigation Bar */}
            <div className="bg-slate-100 p-2 rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-700">{activePatient.primaryDentist}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600">{activePatient.insurancePlan}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setActivePatient(null)
                    onNavigateTab('charting')
                  }}
                  className="bg-doctor-primary text-white font-bold px-3 py-1.5 rounded-xl hover:bg-doctor-primary-hover transition-all cursor-pointer flex items-center gap-1"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Open Tooth Chart</span>
                </button>
                <button
                  onClick={() => setShowNewRxModal(true)}
                  className="bg-white text-doctor-primary font-bold px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-blue-50 transition-all cursor-pointer flex items-center gap-1"
                >
                  <Pill className="w-3.5 h-3.5" />
                  <span>+ Prescribe (Rx)</span>
                </button>
              </div>
            </div>

            {/* Dossier Subtabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-bold border-b border-slate-200">
              {[
                { id: 'vitals', label: 'Vitals & Demographics' },
                { id: 'soap', label: 'SOAP Progress Notes' },
                { id: 'perio', label: 'Perio Probing' },
                { id: 'scans', label: 'Digital Radiographs & CBCT' },
                { id: 'rx', label: 'e-Prescriptions' },
                { id: 'consents', label: 'E-Signed Consents' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setDossierTab(tab.id as any)}
                  className={`py-2 px-3 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                    dossierTab === tab.id
                      ? 'bg-doctor-primary text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB CONTENT 1: VITALS & DEMOGRAPHICS */}
            {dossierTab === 'vitals' && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Blood Pressure</span>
                    <span className="text-base font-extrabold text-slate-900 mt-0.5 block">{activePatient.vitals.bloodPressure}</span>
                    <span className="text-[10px] text-emerald-600 font-semibold">Normotensive Range</span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Pulse Rate</span>
                    <span className="text-base font-extrabold text-slate-900 mt-0.5 block">{activePatient.vitals.pulse} bpm</span>
                    <span className="text-[10px] text-slate-500">Resting radial</span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Insurance Cap</span>
                    <span className="text-base font-extrabold text-doctor-primary mt-0.5 block">{activePatient.coverage}</span>
                    <span className="text-[10px] text-slate-500">Alberta Fee Guide assignment</span>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Contact & Household Information</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                    <div><strong>Phone:</strong> {activePatient.phone}</div>
                    <div><strong>Email:</strong> {activePatient.email}</div>
                    <div><strong>Address:</strong> {activePatient.address}</div>
                    <div><strong>Family Unit:</strong> {activePatient.familyName || 'Single Account'}</div>
                    <div className="sm:col-span-2"><strong>Preferred Pharmacy:</strong> {activePatient.pharmacyPreference}</div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: SOAP CLINICAL NOTES */}
            {dossierTab === 'soap' && (
              <div className="space-y-3 text-xs">
                {activePatient.soapNotesHistory.map(note => (
                  <div key={note.id} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{note.date}</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-doctor-primary font-semibold">{note.provider}</span>
                      </div>
                      <Badge variant="blue" size="sm">Signed Chart Entry</Badge>
                    </div>
                    <div className="space-y-1.5 text-slate-700">
                      <div><strong className="text-slate-900">S (Subjective):</strong> {note.subjective}</div>
                      <div><strong className="text-slate-900">O (Objective):</strong> {note.objective}</div>
                      <div><strong className="text-slate-900">A (Assessment):</strong> {note.assessment}</div>
                      <div><strong className="text-slate-900">P (Plan):</strong> {note.plan}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT 3: PERIODONTAL PROBING */}
            {dossierTab === 'perio' && (
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900">6-Point Periodontal Depth Map</h4>
                  <span className="text-[11px] text-slate-500">Depths: Distal • Mid • Mesial</span>
                </div>

                {activePatient.perioSites.length === 0 ? (
                  <div className="p-6 bg-slate-50 rounded-xl text-center text-slate-500">
                    No active pocketing or severe attachment loss recorded. Full mouth perio probing is scheduled for upcoming recall.
                  </div>
                ) : (
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                        <tr>
                          <th className="p-2.5">Tooth #</th>
                          <th className="p-2.5">Facial Depths</th>
                          <th className="p-2.5">Lingual Depths</th>
                          <th className="p-2.5">Bleeding (BOP)</th>
                          <th className="p-2.5">Diagnosis</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {activePatient.perioSites.map(site => (
                          <tr key={site.toothNumber} className="hover:bg-slate-50">
                            <td className="p-2.5 font-bold text-doctor-primary">Tooth #{site.toothNumber}</td>
                            <td className="p-2.5 font-mono">{site.facialDepths.join(' - ')} mm</td>
                            <td className="p-2.5 font-mono">{site.lingualDepths.join(' - ')} mm</td>
                            <td className="p-2.5">
                              {site.bleedingOnProbing ? (
                                <span className="text-rose-600 font-bold">⚠️ Bleeding</span>
                              ) : (
                                <span className="text-emerald-600">✓ No Bleeding</span>
                              )}
                            </td>
                            <td className="p-2.5 text-slate-600">
                              {site.facialDepths.some(d => d >= 4) ? 'Mild Pocketing' : 'Healthy Sulcus'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT 4: DIGITAL RADIOLOGY & SCANS */}
            {dossierTab === 'scans' && (
              <div className="space-y-3 text-xs">
                {activePatient.digitalScans.length === 0 ? (
                  <div className="p-6 bg-slate-50 rounded-xl text-center text-slate-500">
                    No radiographs or CBCT scans captured in this view.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activePatient.digitalScans.map(scan => (
                      <div key={scan.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs space-y-2">
                        <div className="h-36 w-full bg-slate-900 relative">
                          <img src={scan.image} alt={scan.title} className="w-full h-full object-cover" />
                          <span className="absolute top-2 left-2 bg-slate-950/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {scan.type}
                          </span>
                        </div>
                        <div className="p-3 space-y-1">
                          <div className="font-bold text-slate-900">{scan.title}</div>
                          <div className="text-[11px] text-slate-500">{scan.date} • Site {scan.tooth}</div>
                          <p className="text-[11px] text-slate-600 leading-relaxed">{scan.notes}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT 5: E-PRESCRIPTIONS */}
            {dossierTab === 'rx' && (
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900">Active & Historical Dental Scripts</h4>
                  <button
                    onClick={() => setShowNewRxModal(true)}
                    className="text-xs font-bold text-doctor-primary hover:underline cursor-pointer"
                  >
                    + Write New Rx
                  </button>
                </div>

                {activePatient.prescriptions.length === 0 ? (
                  <div className="p-6 bg-slate-50 rounded-xl text-center text-slate-500">
                    No active prescriptions currently on file.
                  </div>
                ) : (
                  activePatient.prescriptions.map(rx => (
                    <div key={rx.id} className="bg-white border border-slate-200 rounded-xl p-3 flex items-start justify-between gap-3 shadow-2xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900">{rx.medication}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                            rx.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {rx.status === 'active' ? 'Active' : 'Course Completed'}
                          </span>
                        </div>
                        <div className="text-slate-600 font-medium">Dosage: {rx.dosage}</div>
                        <div className="text-[11px] text-slate-500">{rx.instructions}</div>
                      </div>
                      <div className="text-right text-[11px] text-slate-400 shrink-0">
                        <div>{rx.datePrescribed}</div>
                        <div className="font-semibold text-slate-700">{rx.prescribingDDS}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB CONTENT 6: E-CONSENTS */}
            {dossierTab === 'consents' && (
              <div className="space-y-3 text-xs">
                {activePatient.eConsents.length === 0 ? (
                  <div className="p-6 bg-slate-50 rounded-xl text-center text-slate-500">
                    No surgical consents logged yet.
                  </div>
                ) : (
                  activePatient.eConsents.map(cst => (
                    <div key={cst.id} className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-3 shadow-2xs">
                      <div>
                        <div className="font-bold text-slate-900">{cst.title}</div>
                        <div className="text-[11px] text-slate-500">Procedure: {cst.procedure} • Signed {cst.signedDate}</div>
                      </div>
                      <span className="text-emerald-600 font-bold text-xs bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        ✓ Legally Verified
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </Dialog>

      {/* ========================================================================= */}
      {/* 5. ADD NEW PATIENT MODAL */}
      {/* ========================================================================= */}
      <Dialog
        isOpen={showAddPatientModal}
        onClose={() => setShowAddPatientModal(false)}
        title="Register New Patient Intake"
        subtitle="St. Paul Electronic Medical Records • Dr. Ken Miller Dental Clinic"
      >
        <form onSubmit={handleCreatePatient} className="space-y-3.5 text-xs sm:text-sm">
          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">Full Legal Name *</label>
            <input
              type="text"
              required
              value={newPatientName}
              onChange={(e) => setNewPatientName(e.target.value)}
              placeholder="e.g. Christine Gauthier"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-doctor-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                value={newPatientPhone}
                onChange={(e) => setNewPatientPhone(e.target.value)}
                placeholder="(780) 645-XXXX"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-doctor-primary"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">Insurance Provider</label>
              <Select
                value={newPatientInsurance}
                onChange={setNewPatientInsurance}
                theme="doctor"
                options={[
                  { value: 'Alberta Blue Cross', label: 'Alberta Blue Cross' },
                  { value: 'Sun Life Financial', label: 'Sun Life Financial' },
                  { value: 'Canada Life', label: 'Canada Life' },
                  { value: 'Alberta Seniors Dental', label: 'Alberta Seniors Dental' },
                  { value: 'Direct Private Pay', label: 'Direct Private Pay' }
                ]}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">Assigned Primary Dentist</label>
            <Select
              value={newPatientDoctor}
              onChange={setNewPatientDoctor}
              theme="doctor"
              options={[
                { value: 'Dr. Ken Miller, DDS', label: 'Dr. Ken Miller, DDS (Lead)' },
                { value: 'Dr. Julie Miller, DDS', label: 'Dr. Julie Miller, DDS' },
                { value: 'Dr. Viktoria Kirsten, DDS', label: 'Dr. Viktoria Kirsten, DDS' },
                { value: 'Dr. Austin Chomay, DDS', label: 'Dr. Austin Chomay, DDS' }
              ]}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">Medical Alerts / Drug Allergies</label>
            <input
              type="text"
              value={newPatientAlert}
              onChange={(e) => setNewPatientAlert(e.target.value)}
              placeholder="e.g. Penicillin Allergy, Asthma, Latex Sensitivity"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-doctor-primary"
            />
          </div>

          <Button variant="doctor" fullWidth type="submit">
            Create Electronic Health Record
          </Button>
        </form>
      </Dialog>

      {/* ========================================================================= */}
      {/* 6. NEW E-PRESCRIPTION MODAL WITH AUTO ALLERGY GUARD */}
      {/* ========================================================================= */}
      <Dialog
        isOpen={showNewRxModal}
        onClose={() => {
          setShowNewRxModal(false)
          setRxAllergyWarning(null)
        }}
        title={`New e-Prescription (Rx) for ${activePatient?.name}`}
        subtitle="Alberta College of Dental Surgeons Registered Script Generator"
      >
        <div className="space-y-3.5 text-xs sm:text-sm">
          {rxAllergyWarning && (
            <div className="bg-red-50 border-2 border-red-500 rounded-xl p-3 text-red-900 font-bold animate-pulse text-xs">
              {rxAllergyWarning}
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">Select Medication *</label>
            <Select
              value={rxMedication}
              onChange={(val) => {
                setRxMedication(val)
                setRxAllergyWarning(null)
              }}
              theme="doctor"
              options={[
                { value: 'Amoxicillin 500mg', label: 'Amoxicillin 500mg (First-line Dental Antibiotic)' },
                { value: 'Clindamycin HCl 300mg', label: 'Clindamycin HCl 300mg (Penicillin-Allergic Alternative)' },
                { value: 'Ibuprofen 600mg', label: 'Ibuprofen 600mg (Anti-inflammatory Analgesic)' },
                { value: 'Chlorhexidine Gluconate 0.12% Oral Rinse', label: 'Chlorhexidine Gluconate 0.12% Oral Rinse (Peridex)' },
                { value: 'Ketorolac (Toradol) 10mg', label: 'Ketorolac (Toradol) 10mg (Short-term Acute Pain)' }
              ]}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">Sig Instructions / Dosage</label>
            <input
              type="text"
              value={rxDosage}
              onChange={(e) => setRxDosage(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none"
            />
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs text-slate-600">
            <strong>Target Pharmacy:</strong> {activePatient?.pharmacyPreference}
          </div>

          <Button variant="doctor" fullWidth onClick={handlePrescribeMed}>
            Transmit Safe e-Prescription
          </Button>
        </div>
      </Dialog>
    </div>
  )
}

export default DoctorPatients;