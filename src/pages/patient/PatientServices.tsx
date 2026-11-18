import React, { useState, useMemo, useRef } from 'react'
import {
  Search,
  X,
  ChevronRight,
  Clock,
  Box,
  Users,
  Smile,
  Sparkles,
  Phone,
  Droplets,
  Activity,
  HeartPulse,
  Briefcase,
  Moon,
  MapPin,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  Shield,
  Feather,
  Package,
  BellRing,
  ExternalLink
} from 'lucide-react'
import { Dialog } from '@/components/ui/Dialog'
import { CLINIC_INFO } from '@/data/mockData'
import { PatientTab } from '@/types'

interface PatientServicesProps {
  onNavigate: (tab: PatientTab) => void
}

type ServiceCategory = 'All' | 'Preventive' | 'Restorative' | 'Cosmetic' | 'Surgical'

interface ServiceFeature {
  icon: 'clock' | 'cube' | 'smile' | 'users' | 'palette' | 'check' | 'phone' | 'activity' | 'shield' | 'feather' | 'package' | 'bell'
  text: string
  isPhone?: boolean
}

interface ServiceItem {
  id: string
  name: string
  categories: ServiceCategory[]
  tag: string
  tagVariant: 'blue' | 'gray' | 'rose' | 'red'
  iconVariant: 'blue' | 'rose' | 'red'
  iconType: 'tooth' | 'users' | 'sparkles' | 'emergency' | 'droplet' | 'sedation' | 'extraction' | 'moon'
  image: string
  websiteLink: string
  description: string
  features: ServiceFeature[]
  duration: string
  isEmergency?: boolean
}

const ToothOutlineIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M7 2.5C4.5 2.5 3 4.2 3 6.8C3 9.4 4 12 5 14.5C5.9 16.8 6.6 19.4 8 21.2C8.6 22 9.5 21.7 10 20.6C10.7 19.1 11.2 16.6 11.6 14.8C11.8 14.2 12.2 14.2 12.4 14.8C12.8 16.6 13.3 19.1 14 20.6C14.5 21.7 15.4 22 16 21.2C17.4 19.4 18.1 16.8 19 14.5C20 12 21 9.4 21 6.8C21 4.2 19.5 2.5 17 2.5C15.3 2.5 14 3.7 12 3.7C10 3.7 8.7 2.5 7 2.5Z" />
  </svg>
)

/**
 * All 15 authentic services directly from https://www.drkenmiller.ca/our-services
 * Each service uses its downloaded real website image from public/services/
 */
const SERVICES_CATALOG: ServiceItem[] = [
  {
    id: 'implants',
    name: 'Dental Implants',
    categories: ['Restorative', 'Surgical'],
    tag: 'Guided Surgery',
    tagVariant: 'blue',
    iconVariant: 'blue',
    iconType: 'tooth',
    image: '/services/implants.jpg',
    websiteLink: 'https://www.drkenmiller.ca/service/dental-implants',
    description: 'Learn how guided implant surgery provides a lifelong replacement for a missing tooth.',
    features: [
      { icon: 'clock', text: '60-min consult' },
      { icon: 'cube', text: '3D Digital Imaging' }
    ],
    duration: '60 Min Consult'
  },
  {
    id: 'emergencies',
    name: 'Dental Emergencies',
    categories: ['Surgical'],
    tag: 'Same-Day Priority',
    tagVariant: 'red',
    iconVariant: 'red',
    iconType: 'emergency',
    image: '/services/emergencies.jpg',
    websiteLink: 'https://www.drkenmiller.ca/service/dental-emergencies',
    description: 'Get same day treatment for dental emergencies such as broken teeth and toothaches.',
    features: [
      { icon: 'phone', text: 'Call Direct (780) 645-4122', isPhone: true }
    ],
    duration: 'Immediate Triage',
    isEmergency: true
  },
  {
    id: 'restoration',
    name: 'Dental Restoration',
    categories: ['Restorative'],
    tag: 'Crowns & Fillings',
    tagVariant: 'blue',
    iconVariant: 'blue',
    iconType: 'tooth',
    image: '/services/restoration.jpg',
    websiteLink: 'https://www.drkenmiller.ca/service/dental-restoration',
    description: 'Restore missing, damaged, or decayed teeth with fillings, crowns, bridges and other restorations.',
    features: [
      { icon: 'check', text: 'Custom Aesthetic Crowns' },
      { icon: 'shield', text: 'Durable Enamel Bonding' }
    ],
    duration: '45 - 60 Min'
  },
  {
    id: 'snoring',
    name: 'Snoring Counseling',
    categories: ['Preventive'],
    tag: 'Sleep Wellness',
    tagVariant: 'blue',
    iconVariant: 'blue',
    iconType: 'moon',
    image: '/services/snoring.jpg',
    websiteLink: 'https://www.drkenmiller.ca/service/snoring-counseling',
    description: 'Enjoy a full night’s sleep without snoring. We diagnose and treat snoring so you can wake up rested.',
    features: [
      { icon: 'shield', text: 'Airway Assessment' },
      { icon: 'bell', text: 'Custom Sleep Oral Appliance' }
    ],
    duration: '30 - 45 Min'
  },
  {
    id: 'cosmetic',
    name: 'Cosmetic Dentistry',
    categories: ['Cosmetic'],
    tag: 'Smile Makeover',
    tagVariant: 'rose',
    iconVariant: 'rose',
    iconType: 'sparkles',
    image: '/services/cosmetic.jpg',
    websiteLink: 'https://www.drkenmiller.ca/service/cosmetic-dentistry',
    description: 'Enhance your smile with aesthetic improvements to make your teeth look whiter and straighter.',
    features: [
      { icon: 'palette', text: 'Porcelain Veneers' },
      { icon: 'check', text: 'Contour Harmonization' }
    ],
    duration: '45 - 60 Min'
  },
  {
    id: 'whitening',
    name: 'Teeth Whitening',
    categories: ['Cosmetic'],
    tag: 'Safe & Long-Lasting',
    tagVariant: 'rose',
    iconVariant: 'rose',
    iconType: 'sparkles',
    image: '/services/whitening.jpg',
    websiteLink: 'https://www.drkenmiller.ca/service/teeth-whitening',
    description: 'Whiten your teeth reliably and safely, with long-lasting, consistent results.',
    features: [
      { icon: 'palette', text: 'In-Office & Take-Home' },
      { icon: 'check', text: 'Custom Trays Included' }
    ],
    duration: '60 Min'
  },
  {
    id: 'invisalign',
    name: 'Clear Correct',
    categories: ['Cosmetic', 'Preventive'],
    tag: 'Invisible Aligners',
    tagVariant: 'blue',
    iconVariant: 'blue',
    iconType: 'sparkles',
    image: '/services/invisalign.jpg',
    websiteLink: 'https://www.drkenmiller.ca/service/clear-correct',
    description: 'Get straighter teeth with invisible, removable clear aligners.',
    features: [
      { icon: 'cube', text: 'Digital 3D Smile Preview' },
      { icon: 'smile', text: 'Removable Daily Trays' }
    ],
    duration: '30 Min Assessment'
  },
  {
    id: 'family',
    name: 'Family Dentistry',
    categories: ['Preventive'],
    tag: 'All Ages Welcome',
    tagVariant: 'gray',
    iconVariant: 'blue',
    iconType: 'users',
    image: '/services/family.jpg',
    websiteLink: 'https://www.drkenmiller.ca/service/family-dentistry',
    description: 'Keep your family healthy and smiling with preventative dental care and education.',
    features: [
      { icon: 'smile', text: 'Gentle First Visits' },
      { icon: 'users', text: 'Multi-Member Bookings' }
    ],
    duration: '45 - 60 Min'
  },
  {
    id: 'periodontics',
    name: 'Periodontics',
    categories: ['Preventive'],
    tag: 'Gum Health',
    tagVariant: 'gray',
    iconVariant: 'blue',
    iconType: 'droplet',
    image: '/services/periodontics.jpg',
    websiteLink: 'https://www.drkenmiller.ca/service/periodontics',
    description: 'Gum disease can lead to serious health problems. Read about how it is prevented and treated.',
    features: [
      { icon: 'activity', text: 'Ultrasonic Scaling' },
      { icon: 'shield', text: 'Pocket Depth Analysis' }
    ],
    duration: '45 - 60 Min'
  },
  {
    id: 'endodontics',
    name: 'Endodontics',
    categories: ['Restorative'],
    tag: 'Root Canal Therapy',
    tagVariant: 'blue',
    iconVariant: 'blue',
    iconType: 'sedation',
    image: '/services/endodontics.jpg',
    websiteLink: 'https://www.drkenmiller.ca/service/endodontics',
    description: 'Root canal treatment can save a damaged tooth from being lost. Learn more about this often-misunderstood procedure.',
    features: [
      { icon: 'shield', text: 'Zero-Anxiety Protocols' },
      { icon: 'check', text: 'Tooth Preservation' }
    ],
    duration: '60 - 90 Min'
  },
  {
    id: 'sleep',
    name: 'NuCalm Relaxation System',
    categories: ['Preventive', 'Restorative'],
    tag: 'Medication-Free Calm',
    tagVariant: 'blue',
    iconVariant: 'blue',
    iconType: 'sedation',
    image: '/services/sleep.jpg',
    websiteLink: 'https://www.drkenmiller.ca/service/nucalm-relaxation-system',
    description: 'Enjoy medication-free relaxation to keep you calm and free from anxiety during your treatment.',
    features: [
      { icon: 'shield', text: 'Natural Neurological Reset' },
      { icon: 'smile', text: 'Deep Restorative Comfort' }
    ],
    duration: 'Available with any visit'
  },
  {
    id: 'hygiene',
    name: 'Oral Hygiene / Cleaning',
    categories: ['Preventive'],
    tag: 'Preventative Care',
    tagVariant: 'gray',
    iconVariant: 'blue',
    iconType: 'droplet',
    image: '/services/hygiene.jpg',
    websiteLink: 'https://www.drkenmiller.ca/service/preventative-dentistry',
    description: 'Prevent gum disease and tooth decay with regular professional cleanings and dental exams.',
    features: [
      { icon: 'clock', text: '45–60 min hygiene' },
      { icon: 'activity', text: 'Ultrasonic Scaling' }
    ],
    duration: '45 - 60 Min'
  },
  {
    id: 'wisdom',
    name: 'Wisdom Teeth Extraction',
    categories: ['Surgical'],
    tag: 'In-Clinic Surgery',
    tagVariant: 'gray',
    iconVariant: 'blue',
    iconType: 'extraction',
    image: '/services/wisdom.jpg',
    websiteLink: 'https://www.drkenmiller.ca/service/wisdom-teeth-extraction',
    description: 'Learn why dentists extract wisdom teeth and what to expect when you have your wisdom teeth removed.',
    features: [
      { icon: 'feather', text: 'Gentle Anesthesia' },
      { icon: 'package', text: 'Recovery Care Pack' }
    ],
    duration: '45 - 75 Min'
  },
  {
    id: 'mouthguard',
    name: 'Guards, Bite Appliances',
    categories: ['Preventive', 'Restorative'],
    tag: 'Custom Protection',
    tagVariant: 'gray',
    iconVariant: 'blue',
    iconType: 'moon',
    image: '/services/mouthguard.jpg',
    websiteLink: 'https://www.drkenmiller.ca/service/sports-guards-and-bite-appliances',
    description: 'Keep your teeth safe from damage with custom made guards and bite appliances.',
    features: [
      { icon: 'cube', text: 'Precision Dental Model' },
      { icon: 'bell', text: 'Bruxism Enamel Defense' }
    ],
    duration: '30 Min Fitting'
  },
  {
    id: 'tmd',
    name: 'TMJ Diagnosis & Treatment',
    categories: ['Restorative', 'Preventive'],
    tag: 'Jaw Pain Relief',
    tagVariant: 'blue',
    iconVariant: 'blue',
    iconType: 'sedation',
    image: '/services/tmd.jpg',
    websiteLink: 'https://www.drkenmiller.ca/service/tmj',
    description: 'Get relief from chronic facial and jaw pain with diagnosis and treatment of TMJ.',
    features: [
      { icon: 'shield', text: 'Jaw Joint Alignment' },
      { icon: 'smile', text: 'Morning TMJ Relief' }
    ],
    duration: '45 Min Consult'
  }
]

export const PatientServices: React.FC<PatientServicesProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('All')
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null)

  // Drag-to-scroll / Swipe gesture handler (Mouse + Touch)
  const categoriesRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)
  const hasMovedRef = useRef(false)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!categoriesRef.current) return
    isDraggingRef.current = true
    hasMovedRef.current = false
    startXRef.current = e.pageX - categoriesRef.current.offsetLeft
    scrollLeftRef.current = categoriesRef.current.scrollLeft
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !categoriesRef.current) return
    e.preventDefault()
    const x = e.pageX - categoriesRef.current.offsetLeft
    const walk = (x - startXRef.current) * 1.4
    if (Math.abs(walk) > 4) {
      hasMovedRef.current = true
    }
    categoriesRef.current.scrollLeft = scrollLeftRef.current - walk
  }

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false
  }

  const handleWheel = (e: React.WheelEvent) => {
    if (!categoriesRef.current) return
    if (e.deltaY !== 0 && categoriesRef.current.scrollWidth > categoriesRef.current.clientWidth) {
      categoriesRef.current.scrollLeft += e.deltaY
    }
  }

  const handleChipClick = (id: ServiceCategory) => {
    if (hasMovedRef.current) {
      // It was a drag gesture, do not trigger chip click
      return
    }
    setSelectedCategory(id)
  }

  const filteredServices = useMemo(() => {
    return SERVICES_CATALOG.filter((service) => {
      const matchesCategory =
        selectedCategory === 'All' || service.categories.includes(selectedCategory)

      const query = searchQuery.trim().toLowerCase()
      if (!query) return matchesCategory

      const matchesSearch =
        service.name.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.tag.toLowerCase().includes(query) ||
        service.features.some((f) => f.text.toLowerCase().includes(query))

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const renderServiceIcon = (type: ServiceItem['iconType']) => {
    switch (type) {
      case 'tooth':
        return <ToothOutlineIcon className="w-5 h-5 text-sky-600" />
      case 'users':
        return <Users className="w-5 h-5 text-sky-600" />
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-rose-500" />
      case 'emergency':
        return <AlertTriangle className="w-5 h-5 text-patient-emergency" />
      case 'droplet':
        return <Droplets className="w-5 h-5 text-sky-600" />
      case 'sedation':
        return <HeartPulse className="w-5 h-5 text-sky-600" />
      case 'extraction':
        return <Briefcase className="w-5 h-5 text-sky-600" />
      case 'moon':
        return <Moon className="w-5 h-5 text-sky-600" />
    }
  }

  const renderFeatureIcon = (feature: ServiceFeature) => {
    switch (feature.icon) {
      case 'clock':
        return <Clock className="w-3.5 h-3.5 text-slate-400" />
      case 'cube':
        return <Box className="w-3.5 h-3.5 text-slate-400" />
      case 'smile':
        return <Smile className="w-3.5 h-3.5 text-slate-400" />
      case 'users':
        return <Users className="w-3.5 h-3.5 text-slate-400" />
      case 'palette':
      case 'bell':
        return <BellRing className="w-3.5 h-3.5 text-slate-400" />
      case 'shield':
        return <Shield className="w-3.5 h-3.5 text-slate-400" />
      case 'feather':
        return <Feather className="w-3.5 h-3.5 text-slate-400" />
      case 'package':
        return <Package className="w-3.5 h-3.5 text-slate-400" />
      case 'phone':
        return <Phone className="w-3.5 h-3.5 text-patient-emergency" />
      case 'check':
      default:
        return <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
    }
  }

  return (
    <div className="space-y-6 pb-28 pt-2">
      {/* 1. Header Section */}
      <div className="space-y-2 pt-1">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Our Dental Services
        </h1>

      </div>

      {/* 2. Interactive Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Search className="w-4 h-4 text-slate-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search cleanings, implants, sedation..."
          className="w-full pl-10 pr-9 py-3 bg-white border border-slate-200/90 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-2xs focus:outline-none focus:ring-2 focus:ring-patient-primary focus:border-transparent transition-all"
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

      {/* 3. Category Filter Chips (Smooth finger swipe & mouse pointer drag-to-scroll) */}
      <div className="relative">
        <div
          ref={categoriesRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onWheel={handleWheel}
          className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 scrollbar-none -mx-1 px-1 cursor-grab active:cursor-grabbing select-none touch-pan-x"
        >
          {(
            [
              { id: 'All', label: `All (${SERVICES_CATALOG.length})` },
              { id: 'Preventive', label: 'Preventive', icon: Shield },
              { id: 'Restorative', label: 'Restorative', icon: ToothOutlineIcon },
              { id: 'Cosmetic', label: 'Cosmetic', icon: Smile },
              { id: 'Surgical', label: 'Surgical', icon: Activity }
            ] as const
          ).map((cat) => {
            const isActive = selectedCategory === cat.id
            const IconComp = 'icon' in cat ? cat.icon : null

            return (
              <button
                key={cat.id}
                onClick={() => handleChipClick(cat.id as ServiceCategory)}
                className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 select-none active:scale-98 ${
                  isActive
                    ? 'bg-patient-primary text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50'
                }`}
              >
                {IconComp && (
                  <IconComp className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                )}
                <span className="whitespace-nowrap">{cat.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 4. Operatory Hero Banner (Dr. Ken Miller Clinic Photo) */}
      <div className="relative rounded-2xl overflow-hidden shadow-sm h-44 sm:h-50 w-full bg-slate-900 border border-slate-200/70">
        <img
          src="/services/clinic-operatory-banner.jpg"
          alt="Dr. Ken Miller Dental Clinic Operatory"
          className="w-full h-full object-cover opacity-90"
        />
        {/* Subtle Dark Gradient Overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-slate-900/10" />

        <div className="absolute inset-0 p-4.5 sm:p-5 flex flex-col justify-end">
          <h2 className="text-white text-base sm:text-lg font-extrabold leading-snug drop-shadow-sm max-w-xs">
            Modern technology meets gentle community care
          </h2>
        </div>
      </div>

      {/* 5. Meta Information Strip */}
      <div className="flex items-center justify-between text-xs px-1 text-slate-500 font-medium py-1">
        <span>Providing {filteredServices.length} treatments</span>
        <span className="text-patient-primary flex items-center gap-1 font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-patient-primary" />
          Direct Insurance Billing
        </span>
      </div>

      {/* 6. List of Services with Authentic Dr. Ken Miller Website Images */}
      <div className="space-y-5">
        {filteredServices.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
            <p className="text-xs text-slate-500">
              No services found matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All')
              }}
              className="px-4 py-2 bg-patient-primary-light text-patient-primary rounded-xl text-xs font-bold hover:bg-patient-primary-light/80 cursor-pointer active:scale-98"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          filteredServices.map((service) => {
            const isRedCard = service.iconVariant === 'red'
            const isRoseCard = service.iconVariant === 'rose'

            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:border-slate-300 transition-all group"
              >
                {/* Real Website Service Image */}
                <div
                  onClick={() => setSelectedService(service)}
                  className="w-full h-40 sm:h-48 relative bg-slate-100 overflow-hidden cursor-pointer"
                >
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    loading="lazy"
                  />
                  {/* Subtle top gradient for tag readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-black/20" />

                  {/* Top Right Tag */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs backdrop-blur-md ${
                        service.tagVariant === 'blue'
                          ? 'bg-sky-500/90 text-white'
                          : service.tagVariant === 'rose'
                          ? 'bg-rose-500/90 text-white'
                          : service.tagVariant === 'red'
                          ? 'bg-red-600/95 text-white'
                          : 'bg-slate-900/80 text-white'
                      }`}
                    >
                      {service.tag}
                    </span>
                  </div>

                  {/* Bottom Image Caption Title */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white">
                    <span className="font-bold text-sm drop-shadow-md truncate">
                      {service.name}
                    </span>
                    <span className="text-[11px] text-white/90 bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-md">
                      {service.duration}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-4.5 sm:p-5.5 space-y-3.5">
                  {/* Header row: Icon & Title */}
                  <div
                    onClick={() => setSelectedService(service)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                          isRedCard
                            ? 'bg-patient-emergency-light border-patient-emergency-border/60'
                            : isRoseCard
                            ? 'bg-rose-50 border-rose-100'
                            : 'bg-patient-secondary-light/70 border-patient-secondary-border/60'
                        }`}
                      >
                        {renderServiceIcon(service.iconType)}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-patient-primary transition-colors truncate">
                        {service.name}
                      </h3>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-patient-primary group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </div>

                  {/* Description directly from drkenmiller.ca */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Feature Highlights */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 pt-1 pb-0.5">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        {renderFeatureIcon(feature)}
                        {feature.isPhone ? (
                          <a
                            href="tel:7806454122"
                            className="text-xs text-slate-700 font-semibold hover:text-patient-emergency transition-colors"
                          >
                            {feature.text}
                          </a>
                        ) : (
                          <span className="text-slate-600 font-medium">{feature.text}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Action CTA Button */}
                  <div className="pt-2">
                    {service.isEmergency ? (
                      <a
                        href="tel:7806454122"
                        className="w-full py-3 px-4 bg-patient-emergency hover:bg-patient-emergency-hover text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer active:scale-[0.99]"
                      >
                        <Phone className="w-4 h-4 text-white" />
                        <span>Emergency Call Now</span>
                      </a>
                    ) : (
                      <button
                        onClick={() => setSelectedService(service)}
                        className="w-full py-3 px-4 bg-patient-primary hover:bg-patient-primary-hover text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-[0.99]"
                      >
                        <span>Learn More & Book</span>
                        <span className="text-base leading-none">→</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* 7. Bottom Clinic Location & Assistance Card */}
      <div className="bg-patient-primary-subtle border border-patient-primary-border/80 rounded-2xl p-4.5 sm:p-5.5 shadow-2xs space-y-3.5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-patient-secondary-light text-patient-secondary flex items-center justify-center shrink-0 mt-0.5 border border-patient-secondary-border">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">
              Dr. Ken Miller Clinic
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
              4703 – 50 Ave (2nd Floor), St. Paul, AB
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Need assistance choosing a treatment? Dr. Miller and our dedicated hygienists will walk you through transparent treatment plans with direct insurance submissions.
        </p>

        <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60 font-medium">
          <a
            href="tel:7806454122"
            className="flex items-center gap-1.5 text-slate-700 font-bold hover:text-patient-primary transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-patient-primary" />
            <span>{CLINIC_INFO.phone}</span>
          </a>
          <span className="text-slate-500">Mon–Fri: 8am – 4:30pm</span>
        </div>
      </div>

      {/* 8. Service Details & Booking Dialog */}
      <Dialog
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        title={selectedService?.name || 'Service Details'}
        subtitle={selectedService?.tag || 'Clinical Service Directory'}
      >
        {selectedService && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-700">
            {/* Header Image in Modal */}
            <div className="w-full h-40 sm:h-48 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 relative shadow-2xs">
              <img
                src={selectedService.image}
                alt={selectedService.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2.5 right-2.5">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-900/80 text-white backdrop-blur-md">
                  {selectedService.tag}
                </span>
              </div>
            </div>

            <p className="leading-relaxed text-slate-600">{selectedService.description}</p>

            <div className="bg-patient-primary-subtle p-3.5 rounded-xl border border-patient-primary-border/80 space-y-2">
              <strong className="text-slate-900 block font-bold text-xs uppercase tracking-wide">
                Treatment Highlights & Protocol:
              </strong>
              <div className="space-y-2">
                {selectedService.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-800 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-patient-primary shrink-0" />
                    <span className="font-medium">{feature.text}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 text-slate-800 text-xs">
                  <Clock className="w-3.5 h-3.5 text-patient-primary shrink-0" />
                  <span className="font-medium">Estimated Time: {selectedService.duration}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  setSelectedService(null)
                  onNavigate('appointments')
                }}
                className="w-full py-2.5 px-4 bg-patient-primary hover:bg-patient-primary-hover text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment for this Treatment</span>
              </button>

              <a
                href="tel:7806454122"
                className="w-full py-2 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/90 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>Call Clinic Directly: (780) 645-4122</span>
              </a>

              <a
                href={selectedService.websiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-1.5 text-center text-[11px] font-semibold text-slate-400 hover:text-patient-primary flex items-center justify-center gap-1 transition-colors"
              >
                <span>Read Full Article on DrKenMiller.ca</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  )
}
