import React, { useState } from 'react'
import {
  Activity,
  Search,
  Plus,
  Save,
  Check,
  AlertTriangle,
  Clock,
  ShieldCheck,
  FileText,
  DollarSign
} from 'lucide-react'
import { Odontogram } from '@/components/ui/Odontogram'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Select } from '@/components/ui/Select'
import { ToothData } from '@/types'
import { CURRENT_PATIENT, DOCTOR_ODONTOGRAM_TEETH, ACTIVE_CARE_PLAN, TODAY, formatMonthDay } from '@/data/mockData'

export const DoctorCharting: React.FC = () => {
  const [selectedPatientId, setSelectedPatientId] = useState('pt-001')
  const [selectedTooth, setSelectedTooth] = useState<ToothData>(
    DOCTOR_ODONTOGRAM_TEETH.find(t => t.number === 19)!
  )
  const [activeTab, setActiveTab] = useState<'odontogram' | 'treatmentPlan' | 'soapNotes'>('odontogram')
  const [soapSubjective, setSoapSubjective] = useState('Patient arrives for stage 2 check on implant 19. Reports no spontaneous pain or tenderness.')
  const [soapObjective, setSoapObjective] = useState('Healing abutment intact. Gingival tissue pink and well-keratinized with no erythema or exudate. Torque test 35 Ncm stable.')
  const [soapAssessment, setSoapAssessment] = useState('Osseointegrated lower left first molar implant fixture. Ready for custom monolithic zirconia crown delivery.')
  const [soapPlan, setSoapPlan] = useState(`Crown seating appointment confirmed for ${formatMonthDay(TODAY)}. Aurum lab case verified shade A2.`)
  const [savedSuccess, setSavedSuccess] = useState(false)

  const handleSaveNotes = () => {
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2500)
  }

  return (
    <div className="space-y-6 pb-28 pt-2">
      {/* Charting Header & Patient Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div>
        
          <h2 className="text-xl sm:text-2xl font-black text-doctor-primary tracking-tight">
            Odontogram & Charting
          </h2>
        </div>

        {/* Search / Patient Switcher */}
        <div className="flex items-center gap-2 min-w-[200px]">
          <Select
            value={selectedPatientId}
            onChange={setSelectedPatientId}
            theme="doctor"
            triggerClassName="bg-white border-slate-300 font-bold py-2 shadow-2xs"
            options={[
              { value: 'pt-001', label: 'Sarah Tremblay' },
              { value: 'pt-002', label: 'Marcus Vance' },
              { value: 'pt-003', label: 'David Chen' },
              { value: 'pt-004', label: "Liam O'Connor (Emergency Triage)" }
            ]}
          />
        </div>
      </div>

      {/* Patient Vital Info Strip */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3.5">
        <div className="flex items-center gap-3.5">
          <img
            src={CURRENT_PATIENT.avatar}
            alt="Sarah"
            className="w-11 h-11 rounded-xl object-cover ring-2 ring-blue-100 shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">{CURRENT_PATIENT.name}</h3>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              <strong className="text-slate-700">{CURRENT_PATIENT.insurancePlan}</strong> (80% / 50%)
            </p>
          </div>
        </div>

        {/* Medical alerts banner */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-bold text-rose-800 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <span>Penicillin Allergy</span>
          </span>
          <span className="text-[11px] font-bold text-blue-800 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl">
            Latex Safe
          </span>
        </div>
      </div>

      {/* Mode Subtabs */}
      <div className="bg-slate-200/80 p-1.5 rounded-2xl flex items-center gap-1.5 text-xs font-bold">
        <button
          onClick={() => setActiveTab('odontogram')}
          className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer text-center ${
            activeTab === 'odontogram' ? 'bg-doctor-primary text-white shadow-xs' : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          Odontogram (1–32)
        </button>
        <button
          onClick={() => setActiveTab('treatmentPlan')}
          className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer text-center ${
            activeTab === 'treatmentPlan' ? 'bg-doctor-primary text-white shadow-xs' : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          Treatment & Fees
        </button>
        <button
          onClick={() => setActiveTab('soapNotes')}
          className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer text-center ${
            activeTab === 'soapNotes' ? 'bg-doctor-primary text-white shadow-xs' : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          SOAP Notes
        </button>
      </div>

      {/* TAB 1: ODONTOGRAM */}
      {activeTab === 'odontogram' && (
        <div className="space-y-5">
          <Odontogram
            selectedToothNumber={selectedTooth.number}
            onSelectTooth={(tooth) => setSelectedTooth(tooth)}
          />

          {/* Tooth Diagnostics & Quick Actions Card */}
          <Card className="p-4.5 sm:p-5.5 border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-doctor-primary text-white font-mono font-bold flex items-center justify-center text-xs shadow-2xs">
                  {selectedTooth.number}
                </span>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    {selectedTooth.name}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Universal ISO Notation • Quadrant {selectedTooth.number <= 8 ? '1' : selectedTooth.number <= 16 ? '2' : selectedTooth.number <= 24 ? '3' : '4'}
                  </p>
                </div>
              </div>
              <Badge variant="teal" size="sm" className="font-bold">
                {selectedTooth.condition.toUpperCase()}
              </Badge>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
              <strong className="text-slate-900 block text-[11px] uppercase tracking-wide">Chairside Historical Record:</strong>
              <p className="leading-relaxed">
                {selectedTooth.notes || 'No active pathology recorded on this tooth during previous recall cycle.'}
              </p>
            </div>

            {/* Quick Procedure Action Buttons for this tooth */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs">
              <button
                onClick={() => alert(`Marked Tooth ${selectedTooth.number} for Crown Prep.`)}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-white font-semibold text-slate-700 hover:bg-blue-50 text-center transition-all cursor-pointer active:scale-98 shadow-2xs"
              >
                + Plan Crown
              </button>
              <button
                onClick={() => alert(`Marked Tooth ${selectedTooth.number} for Resin Restoration.`)}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-white font-semibold text-slate-700 hover:bg-blue-50 text-center transition-all cursor-pointer active:scale-98 shadow-2xs"
              >
                + Composite MOD
              </button>
              <button
                onClick={() => alert(`Marked Tooth ${selectedTooth.number} for Endodontic Evaluation.`)}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-white font-semibold text-slate-700 hover:bg-blue-50 text-center transition-all cursor-pointer active:scale-98 shadow-2xs"
              >
                + Endo / Pulp Test
              </button>
              <button
                onClick={() => alert(`Tooth ${selectedTooth.number} flagged as Healthy / WNL.`)}
                className="p-2.5 rounded-xl border border-emerald-200 hover:border-emerald-400 bg-emerald-50/60 font-semibold text-emerald-800 hover:bg-emerald-100 text-center transition-all cursor-pointer active:scale-98 shadow-2xs"
              >
                ✓ Mark Healthy
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: TREATMENT PLAN & FEES (Redesigned as clean visual cards) */}
      {activeTab === 'treatmentPlan' && (
        <div className="space-y-4">
          <div className="bg-white p-4.5 sm:p-5.5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  {ACTIVE_CARE_PLAN.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Plan #{ACTIVE_CARE_PLAN.id} • Dr. Ken Miller, DDS</p>
              </div>
              <Badge variant="teal" size="sm">Phase 2 Active</Badge>
            </div>

            {/* Visual Procedures Stack */}
            <div className="space-y-3 pt-1">
              {/* Item 1 */}
              <div className="p-3.5 rounded-xl border border-slate-200/90 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-blue-900 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">Code 02601</span>
                    <span className="font-bold text-xs text-slate-800">Tooth 19</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">Paid</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">3D CBCT Cone Beam Scan</h4>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-500">Fee: $350</span>
                  <span className="text-emerald-700 font-semibold">Ins: $280</span>
                  <span className="font-bold text-slate-900 bg-white px-2 py-1 rounded-md border border-slate-200">Copay: $70</span>
                </div>
              </div>

              {/* Item 2 */}
              <div className="p-3.5 rounded-xl border border-slate-200/90 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-blue-900 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">Code 79931</span>
                    <span className="font-bold text-xs text-slate-800">Tooth 19</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">Done</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">Titanium Implant Fixture Surgery</h4>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-500">Fee: $1,350</span>
                  <span className="text-emerald-700 font-semibold">Ins: $1,000</span>
                  <span className="font-bold text-slate-900 bg-white px-2 py-1 rounded-md border border-slate-200">Copay: $350</span>
                </div>
              </div>

              {/* Item 3 (Current Active) */}
              <div className="p-3.5 rounded-xl border border-blue-300 bg-blue-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-2xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-blue-900 bg-blue-100 border border-blue-300 px-2 py-0.5 rounded">Code 27301</span>
                    <span className="font-bold text-xs text-slate-800">Tooth 19</span>
                    <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">{formatMonthDay(TODAY)} Visit</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">Custom Monolithic Zirconia Crown</h4>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-500">Fee: $750</span>
                  <span className="text-emerald-700 font-semibold">Ins: $520</span>
                  <span className="font-bold text-blue-950 bg-white px-2 py-1 rounded-md border border-blue-200">Copay: $230</span>
                </div>
              </div>
            </div>

            {/* Totals & Electronic Pre-determination */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-3">
              <div>
                <span className="font-bold text-slate-900">Alberta Blue Cross Direct EDI:</span>
                <p className="text-[11px] text-slate-500 mt-0.5">Pre-determination authorized at 73.4% overall coverage.</p>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-slate-500 text-xs">Total Patient Copay Balance: </span>
                <span className="text-lg font-black text-doctor-primary block sm:inline">$650.00</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CLINICAL SOAP NOTES */}
      {activeTab === 'soapNotes' && (
        <Card className="p-4.5 sm:p-5.5 border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                SOAP Format Progress Notes
              </h3>
              <p className="text-xs text-slate-500">Signed by Dr. Ken Miller, DDS (License #ALB-4921)</p>
            </div>
            {savedSuccess && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-xl animate-in fade-in">
                ✓ Committed to EHR
              </span>
            )}
          </div>

          <div className="space-y-3.5">
            {/* S - Subjective */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-doctor-primary text-white flex items-center justify-center text-[10px] font-bold">S</span>
                <span>Subjective (Patient Reported):</span>
              </label>
              <textarea
                value={soapSubjective}
                onChange={(e) => setSoapSubjective(e.target.value)}
                rows={2}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-doctor-primary transition-all"
              />
            </div>

            {/* O - Objective */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-doctor-primary text-white flex items-center justify-center text-[10px] font-bold">O</span>
                <span>Objective (Findings & Radiographs):</span>
              </label>
              <textarea
                value={soapObjective}
                onChange={(e) => setSoapObjective(e.target.value)}
                rows={2}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-doctor-primary transition-all"
              />
            </div>

            {/* A - Assessment */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-doctor-primary text-white flex items-center justify-center text-[10px] font-bold">A</span>
                <span>Assessment (Diagnosis):</span>
              </label>
              <textarea
                value={soapAssessment}
                onChange={(e) => setSoapAssessment(e.target.value)}
                rows={2}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-doctor-primary transition-all"
              />
            </div>

            {/* P - Plan */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-doctor-primary text-white flex items-center justify-center text-[10px] font-bold">P</span>
                <span>Plan & Follow-Up:</span>
              </label>
              <textarea
                value={soapPlan}
                onChange={(e) => setSoapPlan(e.target.value)}
                rows={2}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-doctor-primary transition-all"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              variant="doctor"
              fullWidth
              onClick={handleSaveNotes}
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold cursor-pointer active:scale-98"
            >
              <Save className="w-4 h-4" />
              <span>Electronically Sign & Commit SOAP Note</span>
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
