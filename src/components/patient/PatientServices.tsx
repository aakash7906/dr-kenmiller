import React, { useState } from 'react'
import {
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Info,
  Calendar,
  PhoneCall,
  CheckCircle2,
  Clock,
  Heart,
  Users,
  Smile,
  Activity
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Dialog } from '@/components/ui/Dialog'
import { DENTAL_SERVICES, CLINIC_INFO } from '@/data/mockData'
import { DentalService, PatientTab } from '@/types'

interface PatientServicesProps {
  onNavigate: (tab: PatientTab) => void
}

export const PatientServices: React.FC<PatientServicesProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<'Treatments' | 'Recovery' | 'Pre-Op'>('Treatments')
  const [selectedService, setSelectedService] = useState<DentalService | null>(null)

  const filteredServices = DENTAL_SERVICES.filter(s => s.category === activeCategory)
  const heroService = DENTAL_SERVICES.find(s => s.isHero)

  return (
    <div className="space-y-4 pb-20">
      {/* Category Subheader */}
      <div className="pt-1">
        <div className="flex items-center gap-2">
          <Badge variant="teal" size="sm" className="font-bold tracking-wider">
            CLINICAL DIRECTORY
          </Badge>
          <span className="text-[11px] text-amber-800 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            St. Paul Family Care
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
          Services & Patient Care
        </h2>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          Comprehensive family dentistry, restorative care, and step-by-step patient recovery guides.
        </p>
      </div>

      {/* Filter / Category Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {(['Treatments', 'Recovery', 'Pre-Op'] as const).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeCategory === category
                ? 'bg-patient-primary text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50'
            }`}
          >
            {category === 'Treatments' && <span className="text-sm">💼</span>}
            {category === 'Recovery' && <span className="text-sm">🩹</span>}
            {category === 'Pre-Op' && <span className="text-sm">📋</span>}
            <span>{category}</span>
          </button>
        ))}
      </div>

      {/* Treatments Section */}
      {activeCategory === 'Treatments' && (
        <div className="space-y-4">
          {/* Hero Feature Card: Dental Implants */}
          {heroService && (
            <Card className="overflow-hidden border-slate-200 shadow-sm">
              {/* Dental Implant Image with Overlay badge */}
              <div className="h-44 sm:h-52 w-full relative bg-slate-100 overflow-hidden">
                <img
                  src={heroService.image}
                  alt="Dental Implants Model"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-patient-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs uppercase tracking-wider">
                    {heroService.tag}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {heroService.name}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-teal-50 text-patient-primary flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {heroService.description}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <Badge variant="teal" size="sm">✓ Lifetime Durability</Badge>
                  <Badge variant="amber" size="sm">🦷 Natural Feel & Bite</Badge>
                </div>

                {/* CTA Buttons */}
                <div className="grid grid-cols-2 gap-2.5 mt-4 pt-1">
                  <button
                    onClick={() => setSelectedService(heroService)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                  >
                    <span>Learn More</span>
                    <Info className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  <button
                    onClick={() => onNavigate('appointments')}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-patient-primary hover:bg-patient-primary-hover text-white rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Consult</span>
                  </button>
                </div>
              </div>
            </Card>
          )}

          {/* Family & Pediatric Care */}
          <Card className="p-4 border-slate-200 shadow-2xs">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                <Users className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Family & Pediatric Care
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-snug">
                  Gentle preventative care tailored for children, teens, and seniors in St. Paul since 1986.
                </p>

                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  <Badge variant="blue" size="sm">Zero-Anxiety Visits</Badge>
                  <Badge variant="gray" size="sm">Fluoride Sealants</Badge>
                </div>

                <div className="flex items-center justify-between mt-3.5 pt-1">
                  <span className="text-[11px] font-semibold text-amber-800 flex items-center gap-1">
                    🏆 38+ Years of Trust
                  </span>
                  <button
                    onClick={() => onNavigate('appointments')}
                    className="text-xs font-bold text-patient-primary hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Book Family Visit</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Cosmetic & Whitening */}
          <Card className="p-4 border-slate-200 shadow-2xs">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 text-patient-primary flex items-center justify-center shrink-0 mt-0.5">
                <Smile className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Cosmetic & Whitening
                  </h3>
                  <Badge variant="amber" size="sm">Popular</Badge>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-snug">
                  Safe in-office bleaching and custom take-home whitening trays for radiant, stain-free smiles.
                </p>

                <div className="flex items-center justify-between mt-3.5 pt-1">
                  <span className="text-[11px] text-slate-500 font-medium">
                    ✨ 1h Same-day results
                  </span>
                  <button
                    onClick={() => onNavigate('appointments')}
                    className="text-xs font-bold text-patient-primary hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Consultation</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Periodontics & Hygiene Quick Row */}
          <div
            onClick={() => onNavigate('appointments')}
            className="bg-white p-3.5 rounded-2xl border border-slate-200/90 flex items-center justify-between hover:border-slate-300 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-patient-secondary-light text-patient-secondary flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  Periodontics & Hygiene
                </h4>
                <p className="text-[11px] text-slate-500 truncate">
                  Ultrasonic tartar removal & gentle periodontal care
                </p>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center shrink-0">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Wisdom Teeth & Extractions Quick Row */}
          <div
            onClick={() => onNavigate('appointments')}
            className="bg-white p-3.5 rounded-2xl border border-slate-200/90 flex items-center justify-between hover:border-slate-300 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center shrink-0">
                <span className="text-base">🦷</span>
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  Wisdom Teeth & Extractions
                </h4>
                <p className="text-[11px] text-slate-500 truncate">
                  Comfortable extractions with conscious sedation
                </p>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center shrink-0">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}

      {/* Recovery & Pre-Op Tab Content */}
      {activeCategory !== 'Treatments' && (
        <div className="space-y-3">
          {filteredServices.map((service) => (
            <Card key={service.id} className="p-4 border-slate-200 shadow-2xs">
              <div className="flex items-start justify-between">
                <div>
                  {service.tag && (
                    <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md uppercase">
                      {service.tag}
                    </span>
                  )}
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                    {service.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">{service.description}</p>
                </div>
              </div>

              <div className="mt-3 space-y-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between text-xs pt-1">
                <span className="text-slate-500 font-medium">Timing: {service.duration}</span>
                <button
                  onClick={() => setSelectedService(service)}
                  className="font-bold text-patient-primary hover:underline"
                >
                  View Details →
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Have Questions? Banner */}
      <div className="bg-patient-primary rounded-2xl p-4 sm:p-5 text-white shadow-md">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-200">
              HAVE QUESTIONS?
            </span>
            <h3 className="text-base sm:text-lg font-bold leading-snug mt-0.5">
              We're Here For You
            </h3>
          </div>
          <div className="w-9 h-9 rounded-xl bg-white/10 text-white flex items-center justify-center">
            <PhoneCall className="w-5 h-5" />
          </div>
        </div>

        <p className="text-xs text-teal-100 mt-2 leading-relaxed">
          Need personalized treatment pricing, insurance pre-authorization, or anxious patient accommodations? Call Dr. Miller's dedicated care team directly.
        </p>

        <a
          href="tel:7806454122"
          className="mt-3.5 w-full bg-white text-patient-primary hover:bg-teal-50 font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs"
        >
          <PhoneCall className="w-4 h-4 text-patient-primary" />
          <span>{CLINIC_INFO.phone}</span>
        </a>
      </div>

      {/* Service Details Modal */}
      <Dialog
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        title={selectedService?.name || 'Service Details'}
        subtitle={selectedService?.tag || 'Clinical Service Directory'}
      >
        {selectedService && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-700">
            <p className="leading-relaxed">{selectedService.description}</p>

            <div className="bg-patient-primary-subtle p-3 rounded-xl border border-patient-primary-border">
              <strong className="text-slate-900 block mb-1.5">What makes this treatment unique at Dr. Ken Miller's Clinic:</strong>
              <ul className="space-y-1">
                {selectedService.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-patient-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              variant="primary"
              fullWidth
              onClick={() => {
                setSelectedService(null)
                onNavigate('appointments')
              }}
            >
              Book an Appointment for this Treatment
            </Button>
          </div>
        )}
      </Dialog>
    </div>
  )
}
