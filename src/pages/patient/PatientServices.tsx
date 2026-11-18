import React, { useState, useMemo } from 'react'
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
  BellRing
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

const SERVICES_CATALOG: ServiceItem[] = [
  {
    id: 'implants',
    name: 'Dental Implants',
    categories: ['Restorative', 'Surgical'],
    tag: 'Specialty Consultation',
    tagVariant: 'blue',
    iconVariant: 'blue',
    iconType: 'tooth',
    description: 'Replace missing teeth and restore natural function with permanent titanium implants. Preserves jaw integrity and creates a permanent, confident smile.',
    features: [
      { icon: 'clock', text: '60-min consult' },
      { icon: 'cube', text: '3D Digital Imaging' }
    ],
    duration: '60 Min Consult'
  },
  {
    id: 'family-pediatric',
    name: 'Family & Pediatric Dentistry',
    categories: ['Preventive'],
    tag: 'All Ages Welcome',
    tagVariant: 'gray',
    iconVariant: 'blue',
    iconType: 'users',
    description: 'Comprehensive gentle care for all ages from first teeth to seniors. We ensure young patients feel safe, empowered, and eager to maintain oral health.',
    features: [
      { icon: 'smile', text: 'Gentle First Visits' },
      { icon: 'users', text: 'Multi-Member Bookings' }
    ],
    duration: '45 - 60 Min'
  },
  {
    id: 'cosmetic-whitening',
    name: 'Cosmetic Dentistry & Whitening',
    categories: ['Cosmetic'],
    tag: 'Aesthetic Focus',
    tagVariant: 'rose',
    iconVariant: 'rose',
    iconType: 'sparkles',
    description: 'In-office & take-home whitening, veneers, and smile makeovers. Crafted to complement your natural contours and brighten your everyday smile.',
    features: [
      { icon: 'palette', text: 'Shade Matching' },
      { icon: 'check', text: 'Custom Trays Included' }
    ],
    duration: '60 Min'
  },
  {
    id: 'emergencies-pain',
    name: 'Dental Emergencies & Pain Relief',
    categories: ['Surgical'],
    tag: 'Priority Same-Day',
    tagVariant: 'red',
    iconVariant: 'red',
    iconType: 'emergency',
    description: 'Rapid care for cracked teeth, acute infections, and dental trauma. Call immediately for prompt triage and fast relief right here in St. Paul.',
    features: [
      { icon: 'phone', text: 'Call Direct (780) 645-4122', isPhone: true }
    ],
    duration: 'Immediate Triage',
    isEmergency: true
  },
  {
    id: 'periodontics-cleaning',
    name: 'Periodontics & Deep Cleanings',
    categories: ['Preventive'],
    tag: 'Essential Maintenance',
    tagVariant: 'gray',
    iconVariant: 'blue',
    iconType: 'droplet',
    description: 'Gum therapy and preventive periodontal wellness. We safeguard root support, reverse early gingivitis, and keep your natural foundation sturdy.',
    features: [
      { icon: 'clock', text: '45–60 min hygiene' },
      { icon: 'activity', text: 'Ultrasonic Scaling' }
    ],
    duration: '45 - 60 Min'
  },
  {
    id: 'root-canal-sedation',
    name: 'Root Canal Therapy & Sedation',
    categories: ['Restorative'],
    tag: 'Sedation Comfort Options',
    tagVariant: 'blue',
    iconVariant: 'blue',
    iconType: 'sedation',
    description: 'Gentle pain-free care with modern comfort options. Eliminates severe toothaches while saving the original tooth with precise, reassuring technique.',
    features: [
      { icon: 'shield', text: 'Zero-Anxiety Protocols' },
      { icon: 'check', text: 'Tooth Preservation' }
    ],
    duration: '60 - 90 Min'
  },
  {
    id: 'wisdom-extractions',
    name: 'Wisdom Teeth & Extractions',
    categories: ['Surgical'],
    tag: 'In-Clinic Extraction',
    tagVariant: 'gray',
    iconVariant: 'blue',
    iconType: 'extraction',
    description: 'Comfortable extractions with experienced precision. We provide thorough pre-procedure guidance and supportive, attentive recovery planning.',
    features: [
      { icon: 'feather', text: 'Gentle Anesthesia' },
      { icon: 'package', text: 'Recovery Care Pack' }
    ],
    duration: '45 - 75 Min'
  },
  {
    id: 'night-guards',
    name: 'Night Guards & Bite Appliances',
    categories: ['Preventive', 'Restorative'],
    tag: 'Custom Fitted',
    tagVariant: 'gray',
    iconVariant: 'blue',
    iconType: 'moon',
    description: 'Custom protection against bruxism and TMJ strain. Preserves tooth enamel, reduces morning jaw soreness, and helps you sleep comfortably.',
    features: [
      { icon: 'cube', text: 'Precision Impression' },
      { icon: 'bell', text: 'Morning TMJ Relief' }
    ],
    duration: '30 Min Fitting'
  }
]

export const PatientServices: React.FC<PatientServicesProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('All')
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null)

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
    <div className="space-y-4 pb-24">
      {/* 1. Header Section */}
      <div className="space-y-1 ">
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
          className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-2xs focus:outline-none focus:ring-2 focus:ring-patient-primary focus:border-transparent transition-all"
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

      {/* 3. Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
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
              onClick={() => setSelectedCategory(cat.id as ServiceCategory)}
              className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-patient-primary text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50'
              }`}
            >
              {IconComp && <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />}
              <span>{cat.label}</span>
            </button>
          )
        })}
      </div>

      {/* 4. Operatory Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden shadow-sm h-44 sm:h-48 w-full bg-slate-900 border border-slate-200/70">
        <img
          src="https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=900"
          alt="Dr. Ken Miller Dental Clinic Operatory"
          className="w-full h-full object-cover opacity-85"
        />
        {/* Subtle Dark Gradient Overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-slate-900/10" />

        <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between">
          <div>
          </div>

          <div>
            <h2 className="text-white text-base sm:text-lg font-extrabold leading-snug drop-shadow-sm max-w-xs">
              Modern technology meets gentle community care
            </h2>
          </div>
        </div>
      </div>

      {/* 5. Meta Information Strip */}
      <div className="flex items-center justify-between text-xs px-1 text-slate-500 font-medium pt-0.5">
        <span>Providing {filteredServices.length} treatments</span>
        <span className="text-patient-primary flex items-center gap-1 font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-patient-primary" />
          Direct Insurance Billing
        </span>
      </div>

      {/* 6. List of 8 Services */}
      <div className="space-y-3.5">
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
              className="px-4 py-2 bg-patient-primary-light text-patient-primary rounded-xl text-xs font-bold hover:bg-patient-primary-light/80 cursor-pointer"
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
                className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-3 transition-all hover:border-slate-300"
              >
                {/* Top Row: Icon and Tag */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                      isRedCard
                        ? 'bg-patient-emergency-light border-patient-emergency-border/60'
                        : isRoseCard
                        ? 'bg-rose-50 border-rose-100'
                        : 'bg-patient-secondary-light/70 border-patient-secondary-border/60'
                    }`}
                  >
                    {renderServiceIcon(service.iconType)}
                  </div>

                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                      service.tagVariant === 'blue'
                        ? 'bg-patient-secondary-light text-patient-secondary-text border border-patient-secondary-border/60'
                        : service.tagVariant === 'rose'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200/60'
                        : service.tagVariant === 'red'
                        ? 'bg-patient-emergency-light text-patient-emergency border border-patient-emergency-border/60'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {service.tag}
                  </span>
                </div>

                {/* Title with right arrow */}
                <div
                  onClick={() => setSelectedService(service)}
                  className="flex items-center justify-between cursor-pointer group"
                >
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-patient-primary transition-colors">
                    {service.name}
                  </h3>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-patient-primary group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Feature Tags / Badges */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 pt-0.5">
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
                <div className="pt-1">
                  {service.isEmergency ? (
                    <a
                      href="tel:7806454122"
                      className="w-full py-2.5 px-4 bg-patient-emergency hover:bg-patient-emergency-hover text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer active:scale-[0.99]"
                    >
                      <Phone className="w-4 h-4 text-white" />
                      <span>Emergency Call Now</span>
                    </a>
                  ) : (
                    <button
                      onClick={() => setSelectedService(service)}
                      className="w-full py-2.5 px-4 bg-patient-primary hover:bg-patient-primary-hover text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-[0.99]"
                    >
                      <span>Learn More & Book</span>
                      <span className="text-base leading-none">→</span>
                    </button>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* 7. Bottom Clinic Location & Assistance Card */}
      <div className="bg-patient-primary-subtle border border-patient-primary-border/80 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3">
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

        <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60 font-medium">
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
            </div>
          </div>
        )}
      </Dialog>
    </div>
  )
}
