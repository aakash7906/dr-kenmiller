import {
  PatientProfile,
  Appointment,
  CarePlan,
  RecoveryTask,
  DentalService,
  EmergencyProtocol,
  OperatoryChair,
  ToothData,
  TriageTicket,
  LabCase,
  ComprehensivePatientRecord,
  CerecMillingCase,
  PerioSiteData
} from '../types'

// ================= DYNAMIC DATE HELPERS =================
// Automatically detects current date & computes relative dates dynamically
export const TODAY = new Date()

export const getDynamicDate = (daysOffset: number = 0): Date => {
  const d = new Date()
  d.setDate(d.getDate() + daysOffset)
  return d
}

export const formatAptDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

export const formatShortDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

export const formatMonthDay = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}

export const TODAY_APPOINTMENT_DATE = formatAptDate(TODAY)
export const TODAY_MONTH_SHORT = TODAY.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
export const TODAY_DAY = TODAY.getDate()

export const CLINIC_INFO = {
  name: 'DR. KEN MILLER DENTAL CLINIC',
  location: 'St. Paul, AB',
  fullAddress: '4703 – 50 Ave (2nd Floor), St. Paul, AB T0A 3A0',
  phone: '(780) 645-4122',
  email: 'contact@drkenmiller.ca',
  hours: 'Monday – Friday: 8:30 AM – 4:30 PM',
  weekend: 'Saturday – Sunday: Closed (Pager Monitored)',
  sinceYear: 1986,
  yearsOfCare: '38+ Yrs',
  emergencyBackup: 'St. Therese Healthcare Centre is available 24/7 for unmanageable head trauma.'
}

export const CURRENT_PATIENT: PatientProfile = {
  id: 'pt-001',
  name: 'Sarah Tremblay',
  chartNumber: '#KM-6421',
  since: 2018,
  primaryDentist: 'Dr. Ken Miller, DDS',
  insurancePlan: 'Alberta Blue Cross',
  coverage: '80% Basic / 50% Major',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
  phone: '(780) 645-8821',
  medicalAlerts: ['Penicillin Allergy (Mild Hives)', 'Nitrous Oxide Tolerant']
}

export const PATIENT_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-01',
    type: 'Routine Hygiene, Fluoride & Exam',
    date: formatAptDate(TODAY),
    time: '10:00 AM – 10:45 AM',
    duration: '45 Min',
    provider: 'Dr. Ken Miller & Lisa (Dental Hygienist)',
    providerRole: 'Lead DDS & Senior RDH',
    location: '4703 – 50 Ave (2nd Floor), St. Paul, AB',
    status: 'confirmed',
    readyForCheckIn: true,
    notes: 'Includes 6-month bitewing radiographs and implant osseointegration torque check at site #19.'
  },
  {
    id: 'apt-02',
    type: 'Crown Seating & Occlusal Verification',
    date: formatAptDate(getDynamicDate(14)),
    time: '2:15 PM – 2:45 PM',
    duration: '30 Min',
    provider: 'Dr. Ken Miller, DDS',
    providerRole: 'Lead DDS',
    location: 'Operatory 1 • 2nd Floor',
    status: 'confirmed',
    readyForCheckIn: false,
    notes: 'Permanent placement of monolithic zirconia crown #19 from Aurum Dental Labs.'
  }
]

export const PAST_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-past-1',
    type: 'Implant Post Placement (Surgery Stage 1)',
    date: formatShortDate(getDynamicDate(-14)),
    time: '9:00 AM – 10:15 AM',
    duration: '75 Min',
    provider: 'Dr. Ken Miller, DDS',
    providerRole: 'Lead DDS',
    location: 'Operatory 1 (Surgical Suite)',
    status: 'completed',
    notes: 'Titanium fixture 4.5 x 10mm seated with sterile resorbable suture. Primary stability 38 Ncm.'
  },
  {
    id: 'apt-past-2',
    type: '3D CBCT Cone Beam Scan & Bone Mapping',
    date: formatShortDate(getDynamicDate(-45)),
    time: '11:00 AM – 11:30 AM',
    duration: '30 Min',
    provider: 'Dr. Ken Miller, DDS',
    providerRole: 'Lead DDS',
    location: 'Radiology Bay 2',
    status: 'completed',
    notes: 'Adequate cortical bone height confirmed for lower left first molar.'
  },
  {
    id: 'apt-past-3',
    type: 'Comprehensive Oral Exam & Scaling',
    date: formatShortDate(getDynamicDate(-180)),
    time: '1:30 PM – 2:15 PM',
    duration: '45 Min',
    provider: 'Lisa (RDH)',
    providerRole: 'Registered Dental Hygienist',
    location: 'Hygiene Bay A',
    status: 'completed',
    notes: 'Periodontal probing depths 2-3mm generalized. Recommended replacement of fractured filling #19.'
  },
  {
    id: 'apt-past-4',
    type: 'Occlusal Night Guard Delivery & Adjustment',
    date: formatShortDate(getDynamicDate(-300)),
    time: '3:00 PM – 3:30 PM',
    duration: '30 Min',
    provider: 'Dr. Ken Miller, DDS',
    providerRole: 'Lead DDS',
    location: 'Operatory 2',
    status: 'completed',
    notes: 'Upper hard/soft dual-laminate night guard fitted. Balanced canine guidance.'
  }
]

export const ACTIVE_CARE_PLAN: CarePlan = {
  id: `D-${TODAY.getFullYear()}-88`,
  title: 'Lower Molar Implant Journey',
  tooth: 'Tooth #19 (Lower Left First Molar)',
  currentStep: 2,
  totalSteps: 3,
  statusText: 'Step 2 of 3 • Final Step: Crown Delivery',
  steps: [
    {
      stepNumber: 1,
      title: 'Phase 1: 3D Cone Beam Imaging',
      status: 'completed',
      date: formatMonthDay(getDynamicDate(-45)),
      description: 'Full bone density scan & surgical template verified.'
    },
    {
      stepNumber: 2,
      title: 'Phase 2: Implant Post Placement',
      status: 'current',
      date: formatMonthDay(getDynamicDate(-14)),
      description: 'Titanium fixture placed with sterile tissue stitch. Healing well.'
    },
    {
      stepNumber: 3,
      title: 'Phase 3: Custom Porcelain Crown',
      status: 'upcoming',
      date: `${formatMonthDay(TODAY)}, 10:30 AM`,
      description: 'Permanent abutment seating and natural shade matching.'
    }
  ],
  clinicalNote: 'Tissue integration at Site #19 is progressing ahead of schedule. Keep maintaining soft chew habits on the contralateral side until final crown delivery.',
  costEstimate: 2450.00,
  insuranceEstimatedCoverage: 1800.00,
  copayEstimated: 650.00
}

export const RECOVERY_TASKS: RecoveryTask[] = [
  {
    id: 'rec-1',
    title: 'Cold Compress Regimen',
    details: '20 min on, 20 min off completed for first 48 hours',
    completed: true
  },
  {
    id: 'rec-2',
    title: 'Warm Salt Water Rinses',
    details: '3 times daily after meals (Gently, do not swish forcefully)',
    frequency: 'Today: 2 / 3',
    completed: false,
    progressCount: 2,
    targetCount: 3
  },
  {
    id: 'rec-3',
    title: 'Gentle Adjacent Brushing',
    details: 'Clean surrounding teeth; avoid abrasive direct pressure on #19',
    frequency: 'Pending PM',
    completed: false
  }
]

export const DENTAL_SERVICES: DentalService[] = [
  {
    id: 'srv-1',
    name: 'Dental Implants',
    category: 'Treatments',
    tag: 'Restorative Specialty',
    description: 'Permanent titanium root replacement preserving jawbone health & bite alignment.',
    features: ['Lifetime Durability', 'Natural Feel & Bite', 'Prevents Bone Resorption'],
    isHero: true,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600',
    duration: 'Multi-stage care plan'
  },
  {
    id: 'srv-2',
    name: 'Family & Pediatric Care',
    category: 'Treatments',
    tag: '38+ Years of Trust',
    description: 'Gentle preventative care tailored for children, teens, and seniors in St. Paul since 1986.',
    features: ['Zero-Anxiety Visits', 'Fluoride Sealants', 'Gentle Desensitizing Tech'],
    duration: '45 - 60 Min'
  },
  {
    id: 'srv-3',
    name: 'Cosmetic & Whitening',
    category: 'Treatments',
    tag: 'Popular',
    description: 'Safe in-office bleaching and custom take-home whitening trays for radiant, stain-free smiles.',
    features: ['1h Same-day results', 'Enamel-Safe Formulation', 'Custom Comfort Trays'],
    duration: '60 Min'
  },
  {
    id: 'srv-4',
    name: 'Periodontics & Hygiene',
    category: 'Treatments',
    description: 'Ultrasonic tartar removal & gentle periodontal maintenance safeguarding gum health.',
    features: ['Piezo Ultrasonic Scaling', 'Biofilm Polishing', 'Pocket Depth Analysis'],
    duration: '45 Min'
  },
  {
    id: 'srv-5',
    name: 'Wisdom Teeth & Extractions',
    category: 'Treatments',
    description: 'Comfortable extractions with gentle anesthesia and post-op recovery kits provided.',
    features: ['Minimally Invasive Flap', 'Conscious Sedation Option', 'Direct Emergency Priority'],
    duration: '45 - 75 Min'
  },
  {
    id: 'srv-6',
    name: 'Post-Extraction Care Protocol',
    category: 'Recovery',
    tag: 'Recovery Guide',
    description: 'Essential steps to prevent dry socket, manage swelling, and resume normal diet after tooth extraction.',
    features: ['Gauze pressure protocol', 'Dry socket prevention', 'Day-by-day food recommendations'],
    duration: 'Step-by-step 7 day guide'
  },
  {
    id: 'srv-7',
    name: 'Pre-Surgical Sedation Guidelines',
    category: 'Pre-Op',
    tag: 'Pre-Op Checklist',
    description: 'Fasting instructions, companion driver requirements, and medication reviews before oral surgery.',
    features: ['6-hour fasting window', 'Medication clearance list', 'Post-procedure escort rules'],
    duration: 'Review 48h prior'
  }
]

export const EMERGENCY_PROTOCOLS: EmergencyProtocol[] = [
  {
    id: 'emg-1',
    title: 'Knocked-Out Tooth (Avulsion)',
    urgencyBadge: '60 Min Window',
    badgeVariant: 'red',
    protocolTitle: 'Critical 60-Minute Survival Protocol',
    steps: [
      'Handle ONLY the white crown of the tooth. Never touch or scrape the root tissue.',
      'Rinse gently with cold whole milk or saline solution (do not scrub).',
      'If possible, gently slip tooth back into socket and bite softly on clean gauze.',
      'Alternatively, transport completely submerged in cold milk or patient saliva.'
    ],
    crucialWarning: 'TIME IS CRITICAL - Immediate reimplantation within 60 minutes yields >90% tooth salvage rate.',
    actionLabel: 'Notify Arrival (En Route)'
  },
  {
    id: 'emg-2',
    title: 'Severe Toothache & Swelling',
    urgencyBadge: 'High Urgency',
    badgeVariant: 'amber',
    protocolTitle: 'Acute Infection & Abscess Management',
    steps: [
      'Rinse gently with warm salt water (1/2 tsp salt in 1 cup warm water).',
      'Apply an external cold pack against the cheek for 15 minutes on / 15 minutes off.',
      'Never apply aspirin directly against the gum tissue, as this causes chemical burns.',
      'Keep your head elevated on pillows to reduce vascular throbbing.'
    ],
    crucialWarning: 'If swelling extends toward the eye or neck, or causes difficulty swallowing, seek hospital ER immediately.'
  },
  {
    id: 'emg-3',
    title: 'Broken or Chipped Tooth',
    urgencyBadge: 'Same-Day Care',
    badgeVariant: 'blue',
    protocolTitle: 'Structural Fracture Triage',
    steps: [
      'Recover all broken tooth fragments and store them in clean moist gauze or milk.',
      'Rinse mouth thoroughly with lukewarm water to remove loose debris.',
      'Cover any sharp exposed jagged edges with sugar-free gum or dental wax to protect tongue.',
      'Take over-the-counter ibuprofen if medically tolerated to ease inflammation.'
    ]
  },
  {
    id: 'emg-4',
    title: 'Bleeding or Soft Tissue Trauma',
    urgencyBadge: 'Moderate Urgency',
    badgeVariant: 'amber',
    protocolTitle: 'Oral Hemorrhage Control',
    steps: [
      'Apply direct, steady pressure to the bleeding wound using clean sterile gauze for 15 minutes uninterrupted.',
      'A moistened caffeinated black tea bag applied with firm pressure can help clot capillary bleeding.',
      'Sit upright and avoid spitting, sucking on straws, or vigorous rinsing.'
    ]
  }
]

// ================= DOCTOR & OPERATORY DATA =================

export const OPERATORY_CHAIRS: OperatoryChair[] = [
  {
    id: 'op-1',
    name: 'Operatory 1 (Surgical Suite)',
    room: 'Room 201',
    provider: 'Dr. Ken Miller, DDS',
    status: 'occupied',
    currentPatient: {
      name: 'Sarah Tremblay',
      chartNumber: 'KM-6421',
      procedure: 'Implant Stage 2 Abutment Seating & Bitewings',
      startTime: '10:00 AM',
      elapsedMinutes: 24,
      anesthesiaAdministeredAt: '10:05 AM',
      anesthetic: '2% Lidocaine 1:100k Epi (1.8mL)',
      tooth: '#19',
      medicalAlert: 'Penicillin Allergy'
    }
  },
  {
    id: 'op-2',
    name: 'Operatory 2 (Restorative)',
    room: 'Room 202',
    provider: 'Dr. Ken Miller, DDS',
    status: 'prepping',
    currentPatient: {
      name: 'Marcus Vance',
      chartNumber: 'KM-5819',
      procedure: 'Crown Prep & Temp Placement #14',
      startTime: '10:45 AM',
      elapsedMinutes: 0,
      tooth: '#14',
      medicalAlert: 'High Blood Pressure (Controlled)'
    }
  },
  {
    id: 'op-hyg-a',
    name: 'Hygiene Bay A',
    room: 'Room 203',
    provider: 'Lisa (RDH)',
    status: 'occupied',
    currentPatient: {
      name: 'David Chen',
      chartNumber: 'KM-7244',
      procedure: 'Prophylaxis & 6-Mo Recall Scaling',
      startTime: '9:45 AM',
      elapsedMinutes: 38,
      medicalAlert: 'No known allergies'
    }
  },
  {
    id: 'op-hyg-b',
    name: 'Hygiene Bay B',
    room: 'Room 204',
    provider: 'Elena (RDH)',
    status: 'available'
  }
]

export const DOCTOR_ODONTOGRAM_TEETH: ToothData[] = [
  // Upper Arch (Teeth 1-16)
  { number: 1, name: 'Upper Right 3rd Molar', condition: 'missing' },
  { number: 2, name: 'Upper Right 2nd Molar', condition: 'healthy' },
  { number: 3, name: 'Upper Right 1st Molar', condition: 'crown', notes: 'Porcelain fused to metal crown placed 2019.' },
  { number: 4, name: 'Upper Right 2nd Premolar', condition: 'healthy' },
  { number: 5, name: 'Upper Right 1st Premolar', condition: 'healthy' },
  { number: 6, name: 'Upper Right Canine', condition: 'healthy' },
  { number: 7, name: 'Upper Right Lateral Incisor', condition: 'healthy' },
  { number: 8, name: 'Upper Right Central Incisor', condition: 'healthy' },
  { number: 9, name: 'Upper Left Central Incisor', condition: 'healthy' },
  { number: 10, name: 'Upper Left Lateral Incisor', condition: 'healthy' },
  { number: 11, name: 'Upper Left Canine', condition: 'healthy' },
  { number: 12, name: 'Upper Left 1st Premolar', condition: 'healthy' },
  { number: 13, name: 'Upper Left 2nd Premolar', condition: 'healthy' },
  { number: 14, name: 'Upper Left 1st Molar', condition: 'decay', notes: 'Recurrent margin caries. Scheduled for crown prep.', plannedProcedure: 'Zirconia Crown' },
  { number: 15, name: 'Upper Left 2nd Molar', condition: 'healthy' },
  { number: 16, name: 'Upper Left 3rd Molar', condition: 'missing' },

  // Lower Arch (Teeth 17-32)
  { number: 17, name: 'Lower Left 3rd Molar', condition: 'missing' },
  { number: 18, name: 'Lower Left 2nd Molar', condition: 'healthy' },
  { number: 19, name: 'Lower Left 1st Molar', condition: 'implant', notes: `Titanium fixture placed ${formatMonthDay(getDynamicDate(-14))}. Abutment torque 35 Ncm. Zirconia crown delivery ${formatMonthDay(TODAY)}.`, plannedProcedure: 'Final Crown Seated' },
  { number: 20, name: 'Lower Left 2nd Premolar', condition: 'healthy' },
  { number: 21, name: 'Lower Left 1st Premolar', condition: 'healthy' },
  { number: 22, name: 'Lower Left Canine', condition: 'healthy' },
  { number: 23, name: 'Lower Left Lateral Incisor', condition: 'healthy' },
  { number: 24, name: 'Lower Left Central Incisor', condition: 'healthy' },
  { number: 25, name: 'Lower Right Central Incisor', condition: 'healthy' },
  { number: 26, name: 'Lower Right Lateral Incisor', condition: 'healthy' },
  { number: 27, name: 'Lower Right Canine', condition: 'healthy' },
  { number: 28, name: 'Lower Right 1st Premolar', condition: 'healthy' },
  { number: 29, name: 'Lower Right 2nd Premolar', condition: 'healthy' },
  { number: 30, name: 'Lower Right 1st Molar', condition: 'rootcanal', notes: 'Endodontic treatment completed 2021 with full coverage ceramic crown.' },
  { number: 31, name: 'Lower Right 2nd Molar', condition: 'healthy' },
  { number: 32, name: 'Lower Right 3rd Molar', condition: 'missing' }
]

export const LIVE_TRIAGE_TICKETS: TriageTicket[] = [
  {
    id: 'trg-101',
    patientName: 'Liam O’Connor',
    phone: '(780) 645-3921',
    urgency: 'high',
    condition: 'Traumatic Sports Injury - Knocked out Upper Incisor 8',
    reportedTime: '10:12 AM (12 min ago)',
    etaMinutes: 14,
    symptoms: 'Tooth stored in cold milk carton. Moderate gingival sulcus bleeding.',
    status: 'unresolved'
  },
  {
    id: 'trg-102',
    patientName: 'Bernice Campbell',
    phone: '(780) 645-7740',
    urgency: 'moderate',
    condition: 'Acute Nocturnal Throbbing & Thermal Sensitivity #31',
    reportedTime: '9:30 AM (54 min ago)',
    etaMinutes: 45,
    symptoms: 'Patient reports sleep disturbance. Pain scale 7/10. Taking OTC Advil.',
    status: 'assigned',
    assignedOperatory: 'Operatory 2 (11:30 AM Buffer Slot)'
  }
]

export const LAB_CASES: LabCase[] = [
  {
    id: 'lab-984',
    patientName: 'Sarah Tremblay',
    chartNumber: 'KM-6421',
    toothNumber: '#19',
    type: 'Screw-Retained Monolithic Zirconia Crown',
    labName: 'Aurum Ceramic Dental Lab (Calgary)',
    sentDate: formatShortDate(getDynamicDate(-12)),
    expectedDelivery: formatShortDate(getDynamicDate(-2)),
    status: 'delivered_at_clinic',
    shade: 'Vita A2 (Incisal Translucency High)'
  },
  {
    id: 'lab-985',
    patientName: 'Marcus Vance',
    chartNumber: 'KM-5819',
    toothNumber: '#14',
    type: 'EMax Lithium Disilicate Crown',
    labName: 'Precision Craft Dental Studios (Edmonton)',
    sentDate: formatShortDate(getDynamicDate(-5)),
    expectedDelivery: formatShortDate(getDynamicDate(5)),
    status: 'in_fabrication',
    shade: 'Vita A3'
  },
  {
    id: 'lab-986',
    patientName: 'Ronald Bouchard',
    chartNumber: 'KM-4902',
    toothNumber: '#29–31',
    type: '3-Unit Porcelain-Fused-to-Zirconia Bridge',
    labName: 'Aurum Ceramic Dental Lab',
    sentDate: formatShortDate(getDynamicDate(-10)),
    expectedDelivery: formatShortDate(getDynamicDate(2)),
    status: 'shipped',
    shade: 'Vita B2'
  }
]

// ================= CLINICAL DENTISTS & HYGIENISTS =================
// Dr. Ken Miller Clinic Team directly from drkenmiller.ca
export const CLINIC_DOCTORS = [
  { id: 'dr-ken', name: 'Dr. Ken Miller, DDS', role: 'Lead Dentist & CEREC Mentor', room: 'Operatory 1', activePatients: 6, avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=250' },
  { id: 'dr-julie', name: 'Dr. Julie Miller, DDS', role: 'Associate General Dentist', room: 'Operatory 2', activePatients: 4, avatar: 'https://images.unsplash.com/photo-1594824813589-98ffb4b45564?auto=format&fit=crop&q=80&w=250' },
  { id: 'dr-viktoria', name: 'Dr. Viktoria Kirsten, DDS', role: 'Associate General Dentist', room: 'Operatory 3', activePatients: 3, avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=250' },
  { id: 'dr-austin', name: 'Dr. Austin Chomay, DDS', role: 'Associate General Dentist', room: 'Operatory 4', activePatients: 5, avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=250' },
  { id: 'rdh-lisa', name: 'Lisa (RDH)', role: 'Senior Dental Hygienist', room: 'Hygiene Bay A', activePatients: 7, avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=250' },
  { id: 'rdh-elena', name: 'Elena (RDH)', role: 'Registered Dental Hygienist', room: 'Hygiene Bay B', activePatients: 6, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250' }
]

// ================= CEREC IN-HOUSE CAD/CAM MILLING PIPELINE =================
export const CEREC_MILLING_CASES: CerecMillingCase[] = [
  {
    id: 'cerec-101',
    patientName: 'Marcus Vance',
    chartNumber: 'KM-5819',
    toothNumber: '#14',
    material: 'e.max CAD Lithium Disilicate',
    stage: 'milling',
    shade: 'Vita A3',
    estimatedMinutesLeft: 7,
    millingUnit: 'CEREC Primemill Unit 1',
    prepTime: '10:45 AM',
    provider: 'Dr. Ken Miller, DDS'
  },
  {
    id: 'cerec-102',
    patientName: 'Sarah Tremblay',
    chartNumber: 'KM-6421',
    toothNumber: '#19',
    material: 'Katana Zirconia Block',
    stage: 'ready_to_seat',
    shade: 'Vita A2',
    estimatedMinutesLeft: 0,
    millingUnit: 'CEREC MC XL Unit 2',
    prepTime: '9:30 AM',
    provider: 'Dr. Ken Miller, DDS'
  },
  {
    id: 'cerec-103',
    patientName: 'David Chen',
    chartNumber: 'KM-7244',
    toothNumber: '#30',
    material: 'CEREC Tessera Advanced Lithium',
    stage: 'cad_design',
    shade: 'Vita A1',
    estimatedMinutesLeft: 14,
    millingUnit: 'CAD Station A',
    prepTime: '11:15 AM',
    provider: 'Dr. Julie Miller, DDS'
  },
  {
    id: 'cerec-104',
    patientName: 'Bernice Campbell',
    chartNumber: 'KM-4190',
    toothNumber: '#31',
    material: 'e.max CAD Lithium Disilicate',
    stage: 'crystallization',
    shade: 'Vita A3.5',
    estimatedMinutesLeft: 3,
    millingUnit: 'SpeedFire Sintering Furnace',
    prepTime: '11:00 AM',
    provider: 'Dr. Viktoria Kirsten, DDS'
  }
]

// ================= MASTER PATIENT DIRECTORY & 360° EHR DOSSIERS =================
export const COMPREHENSIVE_PATIENTS: ComprehensivePatientRecord[] = [
  {
    id: 'pt-001',
    name: 'Sarah Tremblay',
    chartNumber: '#KM-6421',
    since: 2018,
    dob: 'May 14, 1990',
    age: 34,
    gender: 'Female',
    email: 'sarah.tremblay@gmail.com',
    phone: '(780) 645-8821',
    address: '4922 – 51 Ave, St. Paul, AB T0A 3A1',
    primaryDentist: 'Dr. Ken Miller, DDS',
    insurancePlan: 'Alberta Blue Cross',
    coverage: '80% Basic / 50% Major ($2,000 Annual Cap)',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
    status: 'in_treatment',
    medicalAlerts: ['Penicillin Allergy (Mild Hives)', 'Nitrous Oxide Tolerant', 'Latex Safe'],
    familyHeadId: 'pt-001',
    familyName: 'Tremblay Household (2 Members)',
    pharmacyPreference: 'Shoppers Drug Mart St. Paul (Ph: 780-645-3341)',
    lastVisitDate: formatShortDate(getDynamicDate(-14)),
    nextAppointmentDate: TODAY_APPOINTMENT_DATE,
    vitals: {
      bloodPressure: '118/76 mmHg',
      pulse: 72,
      lastUpdated: formatShortDate(TODAY)
    },
    soapNotesHistory: [
      {
        id: 'soap-101',
        date: formatShortDate(TODAY),
        provider: 'Dr. Ken Miller, DDS',
        subjective: 'Patient presents for scheduled Stage 2 abutment seating on site #19. Reports no chewing pain on left quadrant. Salt water rinses compliant.',
        objective: 'Tissues well-keratinized around 4.5mm healing collar. No bleeding upon gentle probing. Torque wrench calibrated to 35 Ncm achieved with zero micro-rotation. Bitewing radiograph confirms flush seat to implant platform.',
        assessment: 'Successful Stage 2 implant osseointegration #19 lower left first molar.',
        plan: 'Deliver monolithic custom zirconia crown. Schedule 6-month hygiene recall recall with Lisa RDH.'
      },
      {
        id: 'soap-100',
        date: formatShortDate(getDynamicDate(-14)),
        provider: 'Dr. Ken Miller, DDS',
        subjective: 'Patient returns for 2-week post-op check after stage 1 titanium fixture placement.',
        objective: 'Sutures resorbed cleanly. Healthy gingival pink cuffs. Bone density mapped via CBCT slice.',
        assessment: 'Uncomplicated post-op healing.',
        plan: 'Maintain contralateral soft diet. Review in 14 days.'
      }
    ],
    perioSites: [
      { toothNumber: 18, facialDepths: [3, 2, 3], lingualDepths: [3, 2, 3], bleedingOnProbing: false },
      { toothNumber: 19, facialDepths: [3, 3, 3], lingualDepths: [3, 2, 3], bleedingOnProbing: false },
      { toothNumber: 20, facialDepths: [2, 2, 2], lingualDepths: [2, 2, 3], bleedingOnProbing: false },
      { toothNumber: 30, facialDepths: [3, 2, 3], lingualDepths: [3, 3, 3], bleedingOnProbing: false },
      { toothNumber: 31, facialDepths: [4, 3, 3], lingualDepths: [4, 3, 4], bleedingOnProbing: true, recessionMm: 1 }
    ],
    digitalScans: [
      {
        id: 'scan-1',
        title: '3D CBCT Surgical Volume - Lower Left Mandible',
        type: 'CBCT 3D',
        date: formatShortDate(getDynamicDate(-45)),
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600',
        notes: 'Adequate cortical bone height (11.2mm above inferior alveolar nerve canal). Guided surgical stent fabricated.',
        tooth: '#19'
      },
      {
        id: 'scan-2',
        title: 'Periapical Radiograph - Abutment Seat Check',
        type: 'Bitewing X-Ray',
        date: formatShortDate(TODAY),
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600',
        notes: 'Platform switch verified. Screw-retained access hole aligned through central groove.',
        tooth: '#19'
      },
      {
        id: 'scan-3',
        title: 'High-Res Intraoral Camera Macro',
        type: 'Intraoral Photo',
        date: formatShortDate(TODAY),
        image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600',
        notes: 'Marginal gingiva shade Vita A2 match verified with spectrophotometer.',
        tooth: '#19'
      }
    ],
    prescriptions: [
      {
        id: 'rx-201',
        medication: 'Clindamycin HCl 300mg',
        dosage: '1 capsule QID (every 6 hrs) x 7 days',
        instructions: 'Take with full glass of water. Selected due to Penicillin Allergy.',
        datePrescribed: formatShortDate(getDynamicDate(-14)),
        prescribingDDS: 'Dr. Ken Miller, DDS',
        status: 'completed'
      },
      {
        id: 'rx-202',
        medication: 'Ibuprofen 600mg',
        dosage: '1 tab TID PRN pain with meals',
        instructions: 'Take with food for mild-to-moderate inflammatory soreness.',
        datePrescribed: formatShortDate(getDynamicDate(-14)),
        prescribingDDS: 'Dr. Ken Miller, DDS',
        status: 'active'
      }
    ],
    eConsents: [
      {
        id: 'cst-301',
        title: 'Informed Consent - Dental Implant Surgical Placement',
        signedDate: formatShortDate(getDynamicDate(-45)),
        status: 'verified',
        procedure: 'Guided Implant Placement #19'
      },
      {
        id: 'cst-302',
        title: 'Crown & Fixed Prosthodontic Cementation Consent',
        signedDate: formatShortDate(TODAY),
        status: 'verified',
        procedure: 'Permanent Zirconia Crown Seating'
      }
    ]
  },
  {
    id: 'pt-002',
    name: 'Marcus Vance',
    chartNumber: '#KM-5819',
    since: 2021,
    dob: 'Nov 3, 1976',
    age: 48,
    gender: 'Male',
    email: 'marcus.vance@yahoo.ca',
    phone: '(780) 645-9120',
    address: '5012 – 47 St, St. Paul, AB T0A 3A2',
    primaryDentist: 'Dr. Ken Miller, DDS',
    insurancePlan: 'Sun Life Financial',
    coverage: '80% Basic / 50% Major ($2,500 Cap)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    status: 'in_treatment',
    medicalAlerts: ['Hypertension (Lisinopril 10mg daily)', 'No Known Drug Allergies'],
    familyHeadId: 'pt-002',
    familyName: 'Vance Family',
    pharmacyPreference: 'Rexall St. Paul',
    lastVisitDate: formatShortDate(getDynamicDate(-5)),
    nextAppointmentDate: TODAY_APPOINTMENT_DATE,
    vitals: {
      bloodPressure: '128/82 mmHg',
      pulse: 76,
      lastUpdated: formatShortDate(TODAY)
    },
    soapNotesHistory: [
      {
        id: 'soap-102',
        date: formatShortDate(TODAY),
        provider: 'Dr. Ken Miller, DDS',
        subjective: 'Marcus seated in Operatory 2 for CEREC CAD/CAM crown seating #14. Tooth was prepped and scanned today.',
        objective: 'e.max lithium disilicate crown milled in CEREC Primemill. Contacts floss-tight, occlusion checked with 40-micron paper.',
        assessment: 'Satisfactory single-visit monolithic crown #14.',
        plan: 'Post-op oral hygiene instructions given. Routine 6-month recall.'
      }
    ],
    perioSites: [],
    digitalScans: [],
    prescriptions: [],
    eConsents: [
      {
        id: 'cst-303',
        title: 'CEREC Single-Visit Ceramic Restoration Consent',
        signedDate: formatShortDate(TODAY),
        status: 'verified',
        procedure: 'Crown Prep & Immediate Mill #14'
      }
    ]
  },
  {
    id: 'pt-003',
    name: 'David Chen',
    chartNumber: '#KM-7244',
    since: 2022,
    dob: 'Aug 19, 1995',
    age: 29,
    gender: 'Male',
    email: 'david.chen@outlook.com',
    phone: '(780) 645-1288',
    address: '4610 – 52 Ave, St. Paul, AB',
    primaryDentist: 'Dr. Julie Miller, DDS',
    insurancePlan: 'Canada Life',
    coverage: '100% Preventive / 80% Basic',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    status: 'active',
    medicalAlerts: ['No Known Allergies (NKDA)', 'Healthy Patient'],
    pharmacyPreference: 'Guardian Pharmacy St. Paul',
    lastVisitDate: formatShortDate(TODAY),
    vitals: {
      bloodPressure: '114/72 mmHg',
      pulse: 68,
      lastUpdated: formatShortDate(TODAY)
    },
    soapNotesHistory: [
      {
        id: 'soap-103',
        date: formatShortDate(TODAY),
        provider: 'Lisa (RDH) & Dr. Julie Miller, DDS',
        subjective: 'Patient arrives for regular 6-month hygiene maintenance.',
        objective: 'Generalized 2-3mm pocketing. Mild supragingival calculus lower lingual anteriors. Ultrasonic cavitron scaling and prophy paste polish completed.',
        assessment: 'Healthy gingival tissues. Low caries risk.',
        plan: 'Recall scheduled in 6 months.'
      }
    ],
    perioSites: [],
    digitalScans: [],
    prescriptions: [],
    eConsents: []
  },
  {
    id: 'pt-004',
    name: "Liam O'Connor",
    chartNumber: '#KM-8109',
    since: 2024,
    dob: 'Feb 12, 2008',
    age: 16,
    gender: 'Male',
    email: 'm.oconnor@yahoo.ca',
    phone: '(780) 645-3921',
    address: '5318 – 48 Ave, St. Paul, AB',
    primaryDentist: 'Dr. Austin Chomay, DDS',
    insurancePlan: 'Alberta Child Health Benefit',
    coverage: '100% Emergency & Basic',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
    status: 'emergency',
    medicalAlerts: ['Asthma (Ventolin Inhaler on Person)', 'Severe Dental Trauma'],
    pharmacyPreference: 'Shoppers Drug Mart St. Paul',
    lastVisitDate: formatShortDate(TODAY),
    vitals: {
      bloodPressure: '122/78 mmHg',
      pulse: 92,
      lastUpdated: formatShortDate(TODAY)
    },
    soapNotesHistory: [
      {
        id: 'soap-104',
        date: formatShortDate(TODAY),
        provider: 'Dr. Austin Chomay, DDS',
        subjective: '16yo male struck in face with hockey puck at St. Paul arena. Upper central incisor #8 knocked out into ice (stored in cold milk carton).',
        objective: 'Socket cleaned with sterile saline. Intact tooth #8 reimplanted within 32 min window. Flexible wire-composite splint bonded from #7 to #9. Tetanus status up to date.',
        assessment: 'Dental Avulsion #8 with successful immediate replantation.',
        plan: 'Soft diet. Prescribe Amoxicillin + Chlorhexidine rinse. Splint removal in 14 days. Endodontic assessment in 7-10 days.'
      }
    ],
    perioSites: [],
    digitalScans: [],
    prescriptions: [],
    eConsents: []
  },
  {
    id: 'pt-005',
    name: 'Bernice Campbell',
    chartNumber: '#KM-4190',
    since: 2012,
    dob: 'Jul 28, 1957',
    age: 67,
    gender: 'Female',
    email: 'bernice.campbell@telus.net',
    phone: '(780) 645-7740',
    address: '4802 – 49 St, St. Paul, AB',
    primaryDentist: 'Dr. Viktoria Kirsten, DDS',
    insurancePlan: 'Alberta Dental for Seniors',
    coverage: '100% up to $5,000 Schedule',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=250',
    status: 'in_treatment',
    medicalAlerts: ['Osteoporosis (Oral Alendronate / Fosamax 5 yrs)', 'Sulfa Drug Allergy'],
    pharmacyPreference: 'Rexall St. Paul',
    lastVisitDate: formatShortDate(getDynamicDate(-8)),
    vitals: {
      bloodPressure: '134/84 mmHg',
      pulse: 74,
      lastUpdated: formatShortDate(TODAY)
    },
    soapNotesHistory: [],
    perioSites: [],
    digitalScans: [],
    prescriptions: [],
    eConsents: []
  },
  {
    id: 'pt-006',
    name: 'Ronald Bouchard',
    chartNumber: '#KM-4902',
    since: 2016,
    dob: 'Sep 11, 1969',
    age: 55,
    gender: 'Male',
    email: 'ron.bouchard@albertaenergy.ca',
    phone: '(780) 645-2234',
    address: '5109 – 50 Ave, St. Paul, AB',
    primaryDentist: 'Dr. Ken Miller, DDS',
    insurancePlan: 'Great-West Life',
    coverage: '80% Basic / 60% Major',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=250',
    status: 'in_treatment',
    medicalAlerts: ['Smoker (1/2 pack/day)', 'Type 2 Diabetes (A1C 6.8 controlled)'],
    pharmacyPreference: 'Shoppers Drug Mart St. Paul',
    lastVisitDate: formatShortDate(getDynamicDate(-10)),
    vitals: {
      bloodPressure: '126/80 mmHg',
      pulse: 70,
      lastUpdated: formatShortDate(TODAY)
    },
    soapNotesHistory: [],
    perioSites: [],
    digitalScans: [],
    prescriptions: [],
    eConsents: []
  },
  {
    id: 'pt-007',
    name: 'Grace Miller',
    chartNumber: '#KM-6912',
    since: 2022,
    dob: 'Mar 22, 2016',
    age: 8,
    gender: 'Female',
    email: 'miller.family@gmail.com',
    phone: '(780) 645-6677',
    address: '5201 – 46 St, St. Paul, AB',
    primaryDentist: 'Dr. Julie Miller, DDS',
    insurancePlan: 'Alberta Blue Cross',
    coverage: '100% Basic Pediatric',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
    status: 'recall_due',
    medicalAlerts: ['Mild Eczema', 'Latex Sensitivity (Use Nitrile)'],
    pharmacyPreference: 'Guardian Pharmacy St. Paul',
    lastVisitDate: formatShortDate(getDynamicDate(-190)),
    vitals: {
      bloodPressure: '102/66 mmHg',
      pulse: 84,
      lastUpdated: formatShortDate(getDynamicDate(-190))
    },
    soapNotesHistory: [],
    perioSites: [],
    digitalScans: [],
    prescriptions: [],
    eConsents: []
  }
]
