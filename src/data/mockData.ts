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
  LabCase
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
    condition: 'Traumatic Sports Injury - Knocked out Upper Incisor #8',
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
    toothNumber: '#29 - #31',
    type: '3-Unit Porcelain-Fused-to-Zirconia Bridge',
    labName: 'Aurum Ceramic Dental Lab',
    sentDate: formatShortDate(getDynamicDate(-10)),
    expectedDelivery: formatShortDate(getDynamicDate(2)),
    status: 'shipped',
    shade: 'Vita B2'
  }
]
