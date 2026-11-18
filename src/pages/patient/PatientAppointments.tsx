import React, { useState } from 'react'
import {
  Clock,
  MapPin,
  CalendarDays,
  Edit3,
  Navigation,
  Lightbulb,
  CheckCircle2,
  ChevronRight,
  PlusCircle,
  FileText,
  UserCheck,
  Check
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Dialog } from '@/components/ui/Dialog'
import { Calendar } from '@/components/ui/Calendar'
import { PATIENT_APPOINTMENTS, PAST_APPOINTMENTS, CLINIC_INFO, CURRENT_PATIENT } from '@/data/mockData'

export const PatientAppointments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'request' | 'history'>('upcoming')
  const [showDirectionsModal, setShowDirectionsModal] = useState(false)
  const [showModifyModal, setShowModifyModal] = useState(false)
  const [showCalendarModal, setShowCalendarModal] = useState(false)
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<Date>(new Date(2024, 10, 15))
  const [requestDate, setRequestDate] = useState<Date>(new Date(2024, 10, 20))
  const [showRequestCalendarModal, setShowRequestCalendarModal] = useState(false)
  const [requestSubmitted, setRequestSubmitted] = useState(false)

  // Booking Form State
  const [selectedService, setSelectedService] = useState('Routine Hygiene & Cleaning')
  const [selectedProvider, setSelectedProvider] = useState('Dr. Ken Miller, DDS')
  const [selectedTiming, setSelectedTiming] = useState('Morning (8:30 AM – 12:00 PM)')
  const [patientNotes, setPatientNotes] = useState('')

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setRequestSubmitted(true)
  }

  const upcomingApt = PATIENT_APPOINTMENTS[0]

  return (
    <div className="space-y-4 pb-20">
      {/* Tab Switcher Pills */}
      <div className="bg-slate-100/90 p-1 rounded-2xl flex items-center justify-between border border-slate-200/80">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'upcoming'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Upcoming</span>
          <span className="w-5 h-5 rounded-full bg-patient-primary-light text-patient-primary text-[10px] flex items-center justify-center font-bold">
            1
          </span>
        </button>

        <button
          onClick={() => setActiveTab('request')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
            activeTab === 'request'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Request</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'history'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>History</span>
          <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] flex items-center justify-center font-bold">
            4
          </span>
        </button>
      </div>

      {/* UPCOMING TAB */}
      {activeTab === 'upcoming' && (
        <div className="space-y-4">
          <Card className="p-4 sm:p-5 border-slate-200 shadow-sm relative overflow-hidden">
            {/* Top Badges */}
            <div className="flex items-center justify-between mb-3.5">
             
              
            </div>

            {/* Main Visit Header with Date Box */}
            <div className="flex items-start gap-3.5">
              {/* Date Block */}
              <button
                type="button"
                onClick={() => setShowCalendarModal(true)}
                className="w-14 h-16 rounded-2xl bg-patient-secondary-light border border-patient-secondary-border flex flex-col items-center justify-center text-center shrink-0 cursor-pointer hover:opacity-90 active:scale-95 transition-all shadow-2xs"
                title="View Calendar"
              >
                <span className="text-[10px] font-bold text-patient-secondary-text uppercase tracking-wider">
                  NOV
                </span>
                <span className="text-xl font-extrabold text-slate-900 leading-tight">
                  15
                </span>
              </button>

              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {upcomingApt.type}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1">
                  <Clock className="w-3.5 h-3.5 text-patient-primary" />
                  <span>{upcomingApt.time}</span>
                </div>
              </div>
            </div>

            {/* Provider card */}
            <div className="mt-4 bg-patient-bg p-3 rounded-xl border border-slate-200/80 flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-patient-primary-light text-patient-primary flex items-center justify-center shrink-0 font-bold text-sm">
                KM
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900 truncate">Dr. Ken Miller</h4>
                  <Badge variant="amber" size="sm">Lead DDS</Badge>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Caring for St. Paul families since {CLINIC_INFO.sinceYear}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="mt-3 flex items-start gap-2 text-xs text-slate-600">
              <MapPin className="w-4 h-4 text-patient-primary shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800">St. Paul Clinic • 2nd Floor</span>
              </div>
            </div>

            {/* Action Buttons: Calendar, Modify, Directions */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-1">
              <button
                type="button"
                onClick={() => setShowCalendarModal(true)}
                className="flex items-center justify-center gap-1 py-2 px-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition-colors cursor-pointer active:scale-98"
              >
                <CalendarDays className="w-3.5 h-3.5 text-patient-primary" />
                <span>Calendar</span>
              </button>

              <button
                onClick={() => setShowModifyModal(true)}
                className="flex items-center justify-center gap-1 py-2 px-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-patient-primary" />
                <span>Modify</span>
              </button>

              <button
                onClick={() => setShowDirectionsModal(true)}
                className="flex items-center justify-center gap-1 py-2 px-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-teal-800 transition-colors cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 text-patient-primary" />
                <span>Directions</span>
              </button>
            </div>
          </Card>

          {/* Fast Front-Desk Check-In Card */}
          <div className="bg-patient-primary-subtle border border-patient-primary-border rounded-2xl p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-patient-primary-light text-patient-primary flex items-center justify-center shrink-0 mt-0.5">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Fast Front-Desk Check-In</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Arrive 5 minutes early. Complimentary coffee and tea available in the foyer.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* REQUEST TAB */}
      {activeTab === 'request' && (
        <Card className="p-4 sm:p-5 border-slate-200 shadow-sm">
          {requestSubmitted ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Appointment Request Sent!</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you, {CURRENT_PATIENT.name.split(' ')[0]}. Our front-desk coordinator will review your requested appointment for <strong>{selectedService}</strong> on <strong>{requestDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</strong> and notify you shortly.
              </p>
              <Button
                variant="primary"
                onClick={() => {
                  setRequestSubmitted(false)
                  setActiveTab('upcoming')
                }}
              >
                Back to Appointments
              </Button>
            </div>
          ) : (
            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Request New Appointment</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select your treatment reason and preferred time.
                </p>
              </div>

              {/* Service Selection */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Treatment / Reason:
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-patient-primary"
                >
                  <option>Routine Hygiene & Cleaning</option>
                  <option>Dental Implant Consultation</option>
                  <option>Toothache / Emergency Assessment</option>
                  <option>Cosmetic Whitening</option>
                  <option>Night Guard Fitting / Occlusion</option>
                  <option>Pediatric Checkup</option>
                </select>
              </div>

              {/* Provider Selection */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Preferred Provider:
                </label>
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-patient-primary"
                >
                  <option>Dr. Ken Miller, DDS (Lead Dental Surgeon)</option>
                  <option>Lisa (Senior Registered Dental Hygienist)</option>
                  <option>Elena (Registered Dental Hygienist)</option>
                  <option>First Available Provider</option>
                </select>
              </div>

              {/* Preferred Date with Shadcn Calendar trigger */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Preferred Date:
                </label>
                <button
                  type="button"
                  onClick={() => setShowRequestCalendarModal(true)}
                  className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 flex items-center justify-between transition-colors cursor-pointer active:scale-98"
                >
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-patient-primary shrink-0" />
                    <span className="font-semibold">
                      {requestDate.toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <span className="text-[11px] text-patient-primary font-bold">Pick Date</span>
                </button>
              </div>

              {/* Timing */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Preferred Time Window:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Morning (8:30 AM – 12:00 PM)', 'Afternoon (1:00 PM – 4:30 PM)'].map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTiming(time)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        selectedTiming === time
                          ? 'border-patient-primary bg-patient-primary-light text-patient-primary'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Symptoms or Specific Notes:
                </label>
                <textarea
                  value={patientNotes}
                  onChange={(e) => setPatientNotes(e.target.value)}
                  placeholder="e.g. Sensitivity to cold liquids on lower right side, or regular check-up."
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-patient-primary"
                />
              </div>

              <Button type="submit" variant="primary" fullWidth>
                Submit Booking Request
              </Button>
            </form>
          )}
        </Card>
      )}

      {/* HISTORY TAB */}
      {activeTab === 'history' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Completed Visits & Records
            </h3>
          </div>

          {PAST_APPOINTMENTS.map((apt) => (
            <Card key={apt.id} className="p-3.5 border-slate-200 shadow-2xs">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {apt.date}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                    {apt.type}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {apt.provider} • {apt.location}
                  </p>
                </div>
                <Badge variant="teal" size="sm">Completed</Badge>
              </div>

              {apt.notes && (
                <div className="mt-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] text-slate-600">
                  <span className="font-semibold text-slate-700">Clinical Summary: </span>
                  {apt.notes}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Directions Modal */}
      <Dialog
        isOpen={showDirectionsModal}
        onClose={() => setShowDirectionsModal(false)}
        title="Clinic Location & Parking"
        subtitle="4703 – 50 Ave (2nd Floor), St. Paul, AB T0A 3A0"
      >
        <div className="space-y-3 text-xs sm:text-sm text-slate-700">
          <div className="rounded-xl overflow-hidden border border-slate-200 h-36 bg-slate-100 relative">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600"
              alt="St. Paul Map"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
              <span className="bg-patient-primary text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-md">
                📍 Dr. Ken Miller Dental Clinic (2nd Floor)
              </span>
            </div>
          </div>

          <p>
            Conveniently located on 50th Avenue in downtown St. Paul. Elevator and wide accessible stairs are available directly through the main lobby entrance.
          </p>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <a
              href="https://maps.google.com/?q=4703+50+Ave+St+Paul+AB"
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-3 rounded-xl bg-patient-primary hover:bg-patient-primary-hover text-white text-xs font-bold text-center"
            >
              Open Google Maps
            </a>
            <a
              href="https://maps.apple.com/?q=4703+50+Ave+St+Paul+AB"
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-3 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold text-center hover:bg-slate-200"
            >
              Open Apple Maps
            </a>
          </div>
        </div>
      </Dialog>

      {/* Modify Modal */}
      <Dialog
        isOpen={showModifyModal}
        onClose={() => setShowModifyModal(false)}
        title="Modify Appointment"
        subtitle="Routine Hygiene, Fluoride & Exam"
      >
        <div className="space-y-3 text-xs sm:text-sm text-slate-700">
          <p>
            To reschedule or modify your confirmed time on <strong>Wed, Nov 15</strong>, please call our clinic coordinator or leave a direct modification note:
          </p>
          <a
            href="tel:7806454122"
            className="block text-center bg-patient-primary text-white py-2.5 rounded-xl font-bold hover:bg-patient-primary-hover"
          >
            Call Front Desk ({CLINIC_INFO.phone})
          </a>
        </div>
      </Dialog>

      {/* Shadcn Responsive Calendar Modal for Upcoming Appointment */}
      <Dialog
        isOpen={showCalendarModal}
        onClose={() => setShowCalendarModal(false)}
        title="Appointment Calendar"
        subtitle="Dr. Ken Miller Dental Clinic • Select or sync visit date"
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
                setShowModifyModal(true)
              }}
              className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 py-2.5 rounded-xl text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
            >
              Modify or Request Reschedule
            </button>
          </div>
        </div>
      </Dialog>

      {/* Date Picker Modal for Request Form */}
      <Dialog
        isOpen={showRequestCalendarModal}
        onClose={() => setShowRequestCalendarModal(false)}
        title="Select Preferred Date"
        subtitle="Dr. Ken Miller Dental Clinic"
      >
        <div className="space-y-4 text-xs sm:text-sm">
          <Calendar
            selectedDate={requestDate}
            onSelectDate={(d) => {
              setRequestDate(d)
              setShowRequestCalendarModal(false)
            }}
          />
          <Button
            variant="primary"
            fullWidth
            onClick={() => setShowRequestCalendarModal(false)}
          >
            Confirm Date: {requestDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </Button>
        </div>
      </Dialog>
    </div>
  )
}
