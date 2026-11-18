import React, { useState, useEffect, useRef } from 'react'
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  CalendarPlus,
  PhoneCall,
  FileCheck,
  AlertTriangle,
  PlusCircle,
  ChevronRight,
  CheckCircle2,
  Brush,
  CreditCard,
  Droplet,
  Check
} from 'lucide-react'
import { ToothIcon } from '@/components/ui/ToothIcon'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Dialog } from '@/components/ui/Dialog'
import { Calendar } from '@/components/ui/Calendar'
import { CURRENT_PATIENT, PATIENT_APPOINTMENTS, ACTIVE_CARE_PLAN, CLINIC_INFO } from '@/data/mockData'
import { PatientTab } from '@/types'

interface PatientHomeProps {
  onNavigate: (tab: PatientTab) => void
}

const FEATURED_SERVICES_CAROUSEL = [
  {
    id: 'implants',
    title: 'DENTAL IMPLANTS',
    image: '/services/implants.jpg',
    info: 'Replace one or more missing teeth and preserve your smile.'
  },
  {
    id: 'family',
    title: 'FAMILY DENTISTRY',
    image: '/services/family.jpg',
    info: 'Keep your family smiling with comprehensive dental care.'
  },
  {
    id: 'cosmetic',
    title: 'COSMETIC DENTISTRY',
    image: '/services/cosmetic.jpg',
    info: 'Enhance the appearance of your smile with aesthetic treatments.'
  }
]

export const PatientHome: React.FC<PatientHomeProps> = ({ onNavigate }) => {
  const [showCheckInModal, setShowCheckInModal] = useState(false)
  const [showRescheduleModal, setShowRescheduleModal] = useState(false)
  const [showCalendarModal, setShowCalendarModal] = useState(false)
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<Date>(new Date(2024, 10, 15))
  const [showProtocolModal, setShowProtocolModal] = useState(false)
  const [showPreVisitModal, setShowPreVisitModal] = useState(false)
  const [checkInDone, setCheckInDone] = useState(false)

  // Auto-swiping carousel (1.5 seconds interval)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [isCarouselPaused, setIsCarouselPaused] = useState(false)
  const touchStartXRef = useRef(0)

  useEffect(() => {
    if (isCarouselPaused) return
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % FEATURED_SERVICES_CAROUSEL.length)
    }, 1500)
    return () => clearInterval(timer)
  }, [isCarouselPaused])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX
    setIsCarouselPaused(true)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartXRef.current - e.changedTouches[0].clientX
    if (diff > 35) {
      setCarouselIndex((prev) => (prev + 1) % FEATURED_SERVICES_CAROUSEL.length)
    } else if (diff < -35) {
      setCarouselIndex((prev) => (prev - 1 + FEATURED_SERVICES_CAROUSEL.length) % FEATURED_SERVICES_CAROUSEL.length)
    }
    setIsCarouselPaused(false)
  }

  const upcomingApt = PATIENT_APPOINTMENTS[0]

  return (
    <div className="space-y-6 pb-28 pt-2">

      {/* Greeting card */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Good morning, {CURRENT_PATIENT.name.split(' ')[0]}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Welcome back to your dental care portal</p>
        </div>
      </div>

      {/* Hygiene Recall Due Banner */}
      <div className="bg-patient-primary-light border border-patient-primary-border rounded-2xl p-4 sm:p-4.5 flex items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-patient-primary text-white flex items-center justify-center shrink-0 shadow-2xs">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-patient-primary truncate">Hygiene Recall Due</h4>
            <p className="text-[11px] text-slate-600 truncate">Routine 6-mo cleaning window</p>
          </div>
        </div>
        <button
          onClick={() => setShowCalendarModal(true)}
          className="shrink-0 bg-patient-primary hover:bg-patient-primary-hover text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-all shadow-2xs cursor-pointer active:scale-98"
        >
          Reserve Slot
        </button>
      </div>

      {/* Clinic photo & heritage banner */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
        <div className="h-40 sm:h-48 w-full relative overflow-hidden bg-slate-100">
          <img
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800"
            alt="Dr. Ken Miller Operatory"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-3.5 left-4 right-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm leading-tight text-white">{CLINIC_INFO.name}</h4>
                <p className="text-[11px] text-white/80 mt-0.5">Gentle, modern dentistry in St. Paul, AB</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmed Visit Card (Main Feature) */}
      <Card className="p-4.5 sm:p-5.5 border-slate-200 shadow-sm relative overflow-hidden">
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-3.5">
          <span className="inline-flex items-center gap-1.5 bg-patient-primary-light text-patient-primary text-xs font-bold px-2.5 py-1 rounded-full border border-patient-primary-border">
            Confirmed Visit
          </span>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>{upcomingApt.duration}</span>
          </div>
        </div>

        {/* Appointment Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {upcomingApt.type}
        </h3>

        {/* Details list */}
        <div className="mt-3.5 space-y-2.5 text-xs text-slate-600">
          <button
            type="button"
            onClick={() => setShowCalendarModal(true)}
            className="flex items-start gap-2.5 text-left w-full hover:text-patient-primary transition-colors cursor-pointer group"
          >
            <CalendarIcon className="w-4 h-4 text-patient-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-slate-800 group-hover:text-patient-primary">
              {upcomingApt.date.replace(/,\s*\d{4}/, '')} at {upcomingApt.time.split('–')[0].trim()}
            </span>
          </button>
          <div className="flex items-start gap-2.5">
            <span className="text-slate-400 shrink-0 text-sm">👤</span>
            <span>{upcomingApt.provider}</span>
          </div>
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-patient-primary shrink-0 mt-0.5" />
            <span>{upcomingApt.location}</span>
          </div>
        </div>

        {/* Action Buttons row */}
        <div className="grid grid-cols-2 gap-2.5 mt-4.5 pt-1">
          <button
            onClick={() => setShowCalendarModal(true)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 transition-colors cursor-pointer active:scale-98"
          >
            <CalendarIcon className="w-4 h-4 text-patient-primary" />
            <span>Calendar</span>
          </button>
          <button
            onClick={() => setShowRescheduleModal(true)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 transition-colors cursor-pointer active:scale-98"
          >
            <Clock className="w-4 h-4 text-patient-primary" />
            <span>Reschedule</span>
          </button>
        </div>

        {/* Big Digital Check-in button */}
        <button
          onClick={() => setShowCheckInModal(true)}
          className={`w-full mt-3 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-98 ${
            checkInDone
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-patient-primary hover:bg-patient-primary-hover text-white'
          }`}
        >
          {checkInDone ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Checked In • Dr. Miller's Team Notified</span>
            </>
          ) : (
            <>
              <FileCheck className="w-4 h-4" />
              <span>Digital Check-in Instructions</span>
            </>
          )}
        </button>
      </Card>

      {/* Quick Care Actions Section */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Quick Care Actions
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Book New Visit */}
          <div
            onClick={() => onNavigate('appointments')}
            className="bg-white p-4 rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between min-h-[110px] active:scale-98"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 leading-snug">Book New Visit</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Family & Cosmetic</p>
            </div>
          </div>

          {/* Emergency Care (Urgent highlight) */}
          <div
            onClick={() => onNavigate('emergency')}
            className="bg-gradient-to-br from-rose-50 to-red-50/60 p-4 rounded-2xl border border-red-200/80 hover:border-red-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between min-h-[110px] active:scale-98"
          >
            <div className="flex items-center justify-between mb-2.5">
              <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-2xs">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-red-950 leading-snug">Emergency Care</h4>
              <p className="text-[11px] text-red-700 mt-0.5">Same-Day Priority</p>
            </div>
          </div>

          {/* Call Reception */}
          <a
            href="tel:7806454122"
            className="bg-white p-4 rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between min-h-[110px] active:scale-98"
          >
            <div className="w-8 h-8 rounded-xl bg-patient-primary-light text-patient-primary flex items-center justify-center mb-2.5">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 leading-snug">Call Reception</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 font-mono">{CLINIC_INFO.phone}</p>
            </div>
          </a>

          {/* Pre-Visit Forms */}
          <div
            onClick={() => setShowPreVisitModal(true)}
            className="bg-white p-4 rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between min-h-[110px] active:scale-98"
          >
            <div className="flex items-center justify-between mb-2.5">
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <FileCheck className="w-4 h-4 text-patient-primary" />
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 leading-snug">Pre-Visit Forms</h4>
              <p className="text-[11px] text-emerald-700 font-medium mt-0.5">Status: Ready</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Services Carousel (Auto-Swipes at 1.5s interval with 1-line info) */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Featured Dental Services
          </h3>
        </div>

        <div
          onMouseEnter={() => setIsCarouselPaused(true)}
          onMouseLeave={() => setIsCarouselPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs p-4 sm:p-4.5 relative select-none"
        >
          {/* 3-Image Auto-Swiping Track */}
          <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden bg-slate-100">
            <div
              className="flex h-full w-full transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
            >
              {FEATURED_SERVICES_CAROUSEL.map((item) => (
                <div key={item.id} className="min-w-full h-full relative shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                      Dr. Ken Miller Care
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Content Below Image (Title & 1-Line Info from drkenmiller.ca) */}
          <div className="pt-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-black tracking-wider text-slate-900 uppercase">
                {FEATURED_SERVICES_CAROUSEL[carouselIndex].title}
              </h4>
              <span className="text-[10px] text-slate-400 font-bold">
                {carouselIndex + 1} / {FEATURED_SERVICES_CAROUSEL.length}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-snug line-clamp-1">
              {FEATURED_SERVICES_CAROUSEL[carouselIndex].info}
            </p>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => onNavigate('services')}
                className="py-1.5 px-3.5 rounded-lg border border-slate-300 hover:border-patient-primary hover:text-patient-primary text-slate-700 text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-2xs cursor-pointer active:scale-98"
              >
                <span>Find out more</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              {/* Indicator Dots */}
              <div className="flex items-center gap-1.5">
                {FEATURED_SERVICES_CAROUSEL.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      idx === carouselIndex
                        ? 'w-5 bg-patient-primary'
                        : 'w-1.5 bg-slate-200 hover:bg-slate-300'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Care Plan Card */}
      <Card className="p-4.5 sm:p-5.5 border-slate-200 shadow-sm space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="p-1 rounded-md bg-patient-primary-light text-patient-primary">
              <ToothIcon className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold text-slate-900">Active Care Plan</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Plan {ACTIVE_CARE_PLAN.id}</span>
        </div>

        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900">
            {ACTIVE_CARE_PLAN.title}
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Osseointegration complete
          </p>
        </div>

        {/* Progress header & tracker */}
        <div className="pt-1">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-patient-primary">Step {ACTIVE_CARE_PLAN.currentStep} of {ACTIVE_CARE_PLAN.totalSteps}</span>
            <span className="text-slate-500 text-[11px]">Crown Delivery</span>
          </div>

          {/* Stepper bar */}
          <div className="grid grid-cols-3 gap-1.5 py-1">
            <div className="h-2 rounded-full bg-patient-primary" />
            <div className="h-2 rounded-full bg-patient-primary" />
            <div className="h-2 rounded-full bg-slate-200" />
          </div>

          <div className="grid grid-cols-3 text-[10px] text-slate-600 mt-1.5 font-medium text-center">
            <span className="text-patient-primary font-semibold flex items-center justify-center gap-0.5">
              ✓ Post Placed
            </span>
            <span className="text-patient-primary font-bold">Abutment Fit</span>
            <span className="text-slate-400">Final Crown</span>
          </div>
        </div>

        {/* Protocol reader mini-card */}
        <div className="mt-3.5 bg-patient-primary-subtle border border-patient-primary-border rounded-xl p-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-base">📄</span>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">Post-Op & Healing Protocol</div>
              <div className="text-[10px] text-slate-500 truncate">includes soft diet & salt rinse guide</div>
            </div>
          </div>
          <button
            onClick={() => setShowProtocolModal(true)}
            className="shrink-0 text-xs font-bold text-patient-primary bg-white hover:bg-patient-primary-light px-2.5 py-1.5 rounded-lg border border-patient-primary-border flex items-center gap-1 cursor-pointer transition-colors active:scale-98"
          >
            <span>Read</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </Card>

      {/* Daily Care & Reminders */}
      <div className="space-y-3 pt-1">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
          Daily Care & Reminders
        </h3>

        <div className="space-y-3">
          {/* Toothbrush Replacement */}
          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/90 flex items-center gap-3 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Brush className="w-4.5 h-4.5" />
            </div>
            <div className="flex-1 min-w-0 flex items-center justify-between">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Toothbrush Replacement</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Gentle bristles preserve gum health</p>
              </div>
              <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200/60 px-2 py-0.5 rounded-full shrink-0">
                90 Days Elapsed
              </span>
            </div>
          </div>

          {/* Night Guard Hygiene */}
          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/90 flex items-center gap-3 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-patient-primary flex items-center justify-center shrink-0">
              <Droplet className="w-4.5 h-4.5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Night Guard Hygiene</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Clean with cool water & mild cleanser</p>
            </div>
          </div>

          {/* Direct Billing on File */}
          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/90 flex items-center gap-3 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <CreditCard className="w-4.5 h-4.5" />
            </div>
            <div className="flex-1 min-w-0 flex items-center justify-between">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Direct Billing On File</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Alberta Blue Cross Verified</p>
              </div>
              <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
            </div>
          </div>
        </div>
      </div>

      {/* Urgent Dental Support Bottom CTA (Matching Services Banner Styling) */}
      <div className="bg-patient-primary rounded-2xl p-4.5 sm:p-5.5 text-white shadow-md relative overflow-hidden space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-200">
              URGENT DENTAL SUPPORT
            </span>
            <h3 className="text-sm sm:text-base font-bold leading-snug mt-0.5 text-white">
              Sudden tooth pain or trauma?
            </h3>
          </div>
          <div className="w-9 h-9 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0">
            <PhoneCall className="w-5 h-5" />
          </div>
        </div>

        <p className="text-xs text-teal-100 leading-relaxed">
          Same-day priority walk-in assistance for broken tooth, severe pain, or bleeding.
        </p>

        <a
          href="tel:7806454122"
          className="w-full bg-white text-patient-primary hover:bg-teal-50 font-bold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer active:scale-98"
        >
          <PhoneCall className="w-4 h-4 text-patient-primary" />
          <span>Call Emergency : {CLINIC_INFO.phone}</span>
        </a>
      </div>

      {/* Check-In Modal */}
      <Dialog
        isOpen={showCheckInModal}
        onClose={() => setShowCheckInModal(false)}
        title="Digital Check-in Instructions"
        subtitle="Dr. Ken Miller Dental Clinic • Fast Front Desk"
      >
        <div className="space-y-4 text-xs sm:text-sm text-slate-700">
          <div className="bg-teal-50 p-3 rounded-xl border border-teal-200 text-teal-900">
            <p className="font-semibold">Fast Front-Desk Arrival Protocol</p>
            <p className="text-xs mt-1 text-teal-800">
              When arriving at 4703 – 50 Ave (2nd Floor), tap the button below to alert our reception team immediately.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
              <div>
                <strong className="text-slate-900">Arrive 5 minutes prior:</strong> Complimentary fresh coffee, tea, and bottled water are available in the foyer.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
              <div>
                <strong className="text-slate-900">Direct Billing Ready:</strong> Your Alberta Blue Cross digital insurance card is verified.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
              <div>
                <strong className="text-slate-900">Operatory Preparation:</strong> Operatory 1 is prepped for your bitewings and implant examination with Dr. Miller and Lisa (RDH).
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setCheckInDone(true)
              setShowCheckInModal(false)
            }}
            className="w-full bg-patient-primary hover:bg-patient-primary-hover text-white py-3 rounded-xl font-bold transition-all cursor-pointer"
          >
            I Have Arrived at Clinic Lobby
          </button>
        </div>
      </Dialog>

      {/* Shadcn Responsive Calendar Modal */}
      <Dialog
        isOpen={showCalendarModal}
        onClose={() => setShowCalendarModal(false)}
        title="Appointment Calendar"
        subtitle="Dr. Ken Miller Dental Clinic • Select visit date"
      >
        <div className="space-y-4 text-xs sm:text-sm">
          <Calendar
            selectedDate={selectedCalendarDate}
            onSelectDate={(d) => setSelectedCalendarDate(d)}
            highlightDates={[new Date(2024, 10, 15)]}
          />

          <div className="bg-patient-primary-subtle border border-patient-primary-border/80 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-patient-primary">
                Selected Date:
              </span>
              <span className="font-bold text-xs text-slate-900">
                {selectedCalendarDate.toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-700 pt-1 border-t border-patient-primary-border/40">
              <Clock className="w-3.5 h-3.5 text-patient-primary shrink-0" />
              <span>Reserved Window: 10:00 AM – 10:45 AM</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-patient-primary shrink-0" />
              <span>4703 – 50 Ave (2nd Floor), St. Paul, AB</span>
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={() => {
                alert(`Appointment confirmed for ${selectedCalendarDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}! Synced to device calendar.`)
                setShowCalendarModal(false)
              }}
              className="w-full bg-patient-primary hover:bg-patient-primary-hover text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer active:scale-98"
            >
              <Check className="w-4 h-4" />
              <span>Save & Sync to Device Calendar</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setShowCalendarModal(false)
                setShowRescheduleModal(true)
              }}
              className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 py-2.5 rounded-xl text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
            >
              Request Custom Time Slot
            </button>
          </div>
        </div>
      </Dialog>

      {/* Reschedule Modal */}
      <Dialog
        isOpen={showRescheduleModal}
        onClose={() => setShowRescheduleModal(false)}
        title="Modify or Reschedule Appointment"
        subtitle="Dr. Ken Miller Practice Coordination"
      >
        <div className="space-y-4 text-xs sm:text-sm">
          <p className="text-slate-600">
            We understand schedules change! Please select your preferred alternative timeframe or call our reception team.
          </p>

          <div className="space-y-2">
            <label className="font-semibold text-slate-800 block text-xs">Preferred Time Window:</label>
            <div className="grid grid-cols-2 gap-2">
              <button className="p-2.5 rounded-xl border border-slate-200 text-xs font-medium hover:border-patient-primary hover:bg-patient-primary-light text-left">
                🌅 Morning (9am – 12pm)
              </button>
              <button className="p-2.5 rounded-xl border border-slate-200 text-xs font-medium hover:border-patient-primary hover:bg-patient-primary-light text-left">
                ☀️ Afternoon (1pm – 4pm)
              </button>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="tel:7806454122"
              className="w-full block text-center bg-patient-primary text-white py-2.5 rounded-xl font-semibold hover:bg-patient-primary-hover"
            >
              Call Reception Directly ({CLINIC_INFO.phone})
            </a>
          </div>
        </div>
      </Dialog>

      {/* Protocol Reader Modal */}
      <Dialog
        isOpen={showProtocolModal}
        onClose={() => setShowProtocolModal(false)}
        title="Post-Op & Healing Protocol"
        subtitle="Tooth #19 Implant Restoration Care"
      >
        <div className="space-y-3 text-xs sm:text-sm text-slate-700">
          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900">
            <strong>Clinical Guidance from Dr. Ken Miller:</strong>
            <p className="mt-1 text-xs">
              "Your titanium implant post is fully osseointegrated into healthy alveolar bone. Keep following these steps until final crown delivery on Nov 15."
            </p>
          </div>
          <div className="space-y-2">
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="text-slate-900 block mb-0.5">Dietary Care:</strong>
              Chew predominantly on the opposite side. Avoid hard nuts, unpopped popcorn kernels, or ice chewing.
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="text-slate-900 block mb-0.5">Salt Water Rinses:</strong>
              Perform 3 gentle warm salt water rinses daily after meals to keep the healing cuff clean and free of biofilm.
            </div>
          </div>
          <Button
            variant="primary"
            fullWidth
            onClick={() => setShowProtocolModal(false)}
          >
            Understood
          </Button>
        </div>
      </Dialog>

      {/* Pre-Visit Forms Modal */}
      <Dialog
        isOpen={showPreVisitModal}
        onClose={() => setShowPreVisitModal(false)}
        title="Pre-Visit Digital Forms"
        subtitle="All documents verified for Sarah Tremblay"
      >
        <div className="space-y-3 text-xs sm:text-sm">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <div className="font-bold text-slate-900">Medical History Questionnaire</div>
              <div className="text-[11px] text-slate-500">Updated Oct 2024 • Penicillin allergy noted</div>
            </div>
            <span className="text-emerald-600 font-bold text-xs">✓ Verified</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <div className="font-bold text-slate-900">Alberta Blue Cross Direct Assignment</div>
              <div className="text-[11px] text-slate-500">Policy #ABC-7761129</div>
            </div>
            <span className="text-emerald-600 font-bold text-xs">✓ Active</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <div className="font-bold text-slate-900">Informed Consent - Crown Seating</div>
              <div className="text-[11px] text-slate-500">E-Signed Nov 1, 2024</div>
            </div>
            <span className="text-emerald-600 font-bold text-xs">✓ On File</span>
          </div>
          <Button
            variant="primary"
            fullWidth
            onClick={() => setShowPreVisitModal(false)}
          >
            Close Forms
          </Button>
        </div>
      </Dialog>
    </div>
  )
}
