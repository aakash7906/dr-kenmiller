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
import { ToothData } from '@/types'
import { CURRENT_PATIENT, DOCTOR_ODONTOGRAM_TEETH, ACTIVE_CARE_PLAN } from '@/data/mockData'

export const DoctorCharting: React.FC = () => {
  const [selectedPatientId, setSelectedPatientId] = useState('pt-001')
  const [selectedTooth, setSelectedTooth] = useState<ToothData>(
    DOCTOR_ODONTOGRAM_TEETH.find(t => t.number === 19)!
  )
  const [activeTab, setActiveTab] = useState<'odontogram' | 'treatmentPlan' | 'soapNotes'>('odontogram')
  const [soapSubjective, setSoapSubjective] = useState('Patient arrives for stage 2 check on implant #19. Reports no spontaneous pain or tenderness.')
  const [soapObjective, setSoapObjective] = useState('Healing abutment intact. Gingival tissue pink and well-keratinized with no erythema or exudate. Torque test 35 Ncm stable.')
  const [soapAssessment, setSoapAssessment] = useState('Osseointegrated lower left first molar implant fixture. Ready for custom monolithic zirconia crown delivery.')
  const [soapPlan, setSoapPlan] = useState('Crown seating appointment confirmed for Nov 15. Aurum lab case verified shade A2.')
  const [savedSuccess, setSavedSuccess] = useState(false)

  const handleSaveNotes = () => {
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2500)
  }

  return (
    <div className="space-y-4 pb-20">
      {/* Charting Header & Patient Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900">
            Electronic Health Record (EHR)
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#0F2B48] tracking-tight">
            Patient Odontogram & Charting
          </h2>
        </div>

        {/* Search / Patient Switcher */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 shadow-2xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              <option value="pt-001">Sarah Tremblay (#KM-6421)</option>
              <option value="pt-002">Marcus Vance (#KM-5819)</option>
              <option value="pt-003">David Chen (#KM-7244)</option>
              <option value="pt-004">Liam O'Connor (Emergency Triage)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Patient Vital Info Strip */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={CURRENT_PATIENT.avatar}
            alt="Sarah"
            className="w-10 h-10 rounded-xl object-cover ring-2 ring-blue-100"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">{CURRENT_PATIENT.name}</h3>
              <span className="text-xs font-mono text-slate-500">Chart {CURRENT_PATIENT.chartNumber}</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                Active
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              DOB: Apr 14, 1988 • Insurance: <strong className="text-slate-700">{CURRENT_PATIENT.insurancePlan}</strong> (80% / 50%)
            </p>
          </div>
        </div>

        {/* Medical alerts banner */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-rose-800 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-xl flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>Penicillin Allergy (High Alert)</span>
          </span>
          <span className="text-[11px] font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-1 rounded-xl">
            Latex Safe
          </span>
        </div>
      </div>

      {/* Mode Subtabs */}
      <div className="bg-slate-200/80 p-1 rounded-xl flex items-center gap-1 text-xs font-bold">
        <button
          onClick={() => setActiveTab('odontogram')}
          className={`flex-1 py-1.5 px-3 rounded-lg transition-all ${
            activeTab === 'odontogram' ? 'bg-[#0F2B48] text-white shadow-xs' : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          Adult Odontogram (#1–32)
        </button>
        <button
          onClick={() => setActiveTab('treatmentPlan')}
          className={`flex-1 py-1.5 px-3 rounded-lg transition-all ${
            activeTab === 'treatmentPlan' ? 'bg-[#0F2B48] text-white shadow-xs' : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          Treatment Plan & Fees
        </button>
        <button
          onClick={() => setActiveTab('soapNotes')}
          className={`flex-1 py-1.5 px-3 rounded-lg transition-all ${
            activeTab === 'soapNotes' ? 'bg-[#0F2B48] text-white shadow-xs' : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          Clinical SOAP Notes
        </button>
      </div>

      {/* TAB 1: ODONTOGRAM */}
      {activeTab === 'odontogram' && (
        <div className="space-y-4">
          <Odontogram
            selectedToothNumber={selectedTooth.number}
            onSelectTooth={(tooth) => setSelectedTooth(tooth)}
          />

          {/* Tooth Diagnostics & Quick Actions Card */}
          <Card className="p-4 border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#0F2B48] text-white font-mono font-bold flex items-center justify-center text-xs">
                  #{selectedTooth.number}
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    {selectedTooth.name}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Universal ISO Notation • Quadrant {selectedTooth.number <= 8 ? '1' : selectedTooth.number <= 16 ? '2' : selectedTooth.number <= 24 ? '3' : '4'}
                  </p>
                </div>
              </div>
              <Badge variant="teal" size="sm">
                Condition: {selectedTooth.condition.toUpperCase()}
              </Badge>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700">
              <strong className="text-slate-900 block mb-1">Chairside Historical Record:</strong>
              <p>
                {selectedTooth.notes || 'No active pathology recorded on this tooth during previous recall cycle.'}
              </p>
            </div>

            {/* Quick Procedure Action Buttons for this tooth */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
              <button
                onClick={() => alert(`Marked Tooth #${selectedTooth.number} for Crown Prep.`)}
                className="p-2 rounded-xl border border-slate-200 hover:border-blue-400 bg-white font-semibold text-slate-700 hover:bg-blue-50 text-center"
              >
                + Plan Crown
              </button>
              <button
                onClick={() => alert(`Marked Tooth #${selectedTooth.number} for Resin Restoration.`)}
                className="p-2 rounded-xl border border-slate-200 hover:border-blue-400 bg-white font-semibold text-slate-700 hover:bg-blue-50 text-center"
              >
                + Composite MOD
              </button>
              <button
                onClick={() => alert(`Marked Tooth #${selectedTooth.number} for Endodontic Evaluation.`)}
                className="p-2 rounded-xl border border-slate-200 hover:border-blue-400 bg-white font-semibold text-slate-700 hover:bg-blue-50 text-center"
              >
                + Endo / Pulp Test
              </button>
              <button
                onClick={() => alert(`Tooth #${selectedTooth.number} flagged as Healthy / WNL.`)}
                className="p-2 rounded-xl border border-slate-200 hover:border-emerald-400 bg-white font-semibold text-emerald-700 hover:bg-emerald-50 text-center"
              >
                ✓ Mark Healthy (WNL)
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: TREATMENT PLAN & FEES */}
      {activeTab === 'treatmentPlan' && (
        <Card className="p-4 sm:p-5 border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Active Treatment Plan: {ACTIVE_CARE_PLAN.title}
              </h3>
              <p className="text-xs text-slate-500">Plan ID: #{ACTIVE_CARE_PLAN.id} • Dr. Ken Miller, DDS</p>
            </div>
            <Badge variant="teal" size="sm">Phase 2 Active</Badge>
          </div>

          {/* Procedures Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="py-2 px-2">Code</th>
                  <th className="py-2 px-2">Tooth</th>
                  <th className="py-2 px-2">Description</th>
                  <th className="py-2 px-2 text-right">Fee</th>
                  <th className="py-2 px-2 text-right">Ins. Est</th>
                  <th className="py-2 px-2 text-right">Patient Copay</th>
                  <th className="py-2 px-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-2.5 px-2 font-mono font-bold text-blue-900">02601</td>
                  <td className="py-2.5 px-2 font-bold">#19</td>
                  <td className="py-2.5 px-2">3D CBCT Cone Beam Scan</td>
                  <td className="py-2.5 px-2 text-right font-medium">$350.00</td>
                  <td className="py-2.5 px-2 text-right text-emerald-700">$280.00</td>
                  <td className="py-2.5 px-2 text-right font-bold">$70.00</td>
                  <td className="py-2.5 px-2 text-center">
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">Paid</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-2 font-mono font-bold text-blue-900">79931</td>
                  <td className="py-2.5 px-2 font-bold">#19</td>
                  <td className="py-2.5 px-2">Titanium Implant Fixture Surgery</td>
                  <td className="py-2.5 px-2 text-right font-medium">$1,350.00</td>
                  <td className="py-2.5 px-2 text-right text-emerald-700">$1,000.00</td>
                  <td className="py-2.5 px-2 text-right font-bold">$350.00</td>
                  <td className="py-2.5 px-2 text-center">
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">Done</span>
                  </td>
                </tr>
                <tr className="bg-blue-50/40">
                  <td className="py-2.5 px-2 font-mono font-bold text-blue-900">27301</td>
                  <td className="py-2.5 px-2 font-bold">#19</td>
                  <td className="py-2.5 px-2 font-semibold">Custom Monolithic Zirconia Crown</td>
                  <td className="py-2.5 px-2 text-right font-medium">$750.00</td>
                  <td className="py-2.5 px-2 text-right text-emerald-700">$520.00</td>
                  <td className="py-2.5 px-2 text-right font-bold text-blue-900">$230.00</td>
                  <td className="py-2.5 px-2 text-center">
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">Nov 15</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
            <div>
              <span className="font-bold text-slate-900">Electronic Direct Pre-Determination:</span>
              <p className="text-[11px] text-slate-500">Alberta Blue Cross EDI response received. Authorized coverage 73.4% overall.</p>
            </div>
            <div className="text-right">
              <span className="text-slate-500">Total Patient Balance: </span>
              <span className="text-base font-extrabold text-[#0F2B48]">$650.00</span>
            </div>
          </div>
        </Card>
      )}

      {/* TAB 3: CLINICAL SOAP NOTES */}
      {activeTab === 'soapNotes' && (
        <Card className="p-4 sm:p-5 border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                SOAP Format Clinical Progress Notes
              </h3>
              <p className="text-xs text-slate-500">Operatory 1 • Signed by Dr. Ken Miller, DDS (License #ALB-4921)</p>
            </div>
            {savedSuccess && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-xl animate-in fade-in">
                ✓ Saved to Archival EHR
              </span>
            )}
          </div>

          {/* S - Subjective */}
          <div>
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1">
              <span className="w-4 h-4 rounded bg-[#0F2B48] text-white flex items-center justify-center text-[10px]">S</span>
              Subjective (Patient Reported):
            </label>
            <textarea
              value={soapSubjective}
              onChange={(e) => setSoapSubjective(e.target.value)}
              rows={2}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F2B48]"
            />
          </div>

          {/* O - Objective */}
          <div>
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1">
              <span className="w-4 h-4 rounded bg-[#0F2B48] text-white flex items-center justify-center text-[10px]">O</span>
              Objective (Clinical Findings & Radiographs):
            </label>
            <textarea
              value={soapObjective}
              onChange={(e) => setSoapObjective(e.target.value)}
              rows={2}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F2B48]"
            />
          </div>

          {/* A - Assessment */}
          <div>
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1">
              <span className="w-4 h-4 rounded bg-[#0F2B48] text-white flex items-center justify-center text-[10px]">A</span>
              Assessment (Diagnosis):
            </label>
            <textarea
              value={soapAssessment}
              onChange={(e) => setSoapAssessment(e.target.value)}
              rows={2}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F2B48]"
            />
          </div>

          {/* P - Plan */}
          <div>
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1">
              <span className="w-4 h-4 rounded bg-[#0F2B48] text-white flex items-center justify-center text-[10px]">P</span>
              Plan & Follow-Up:
            </label>
            <textarea
              value={soapPlan}
              onChange={(e) => setSoapPlan(e.target.value)}
              rows={2}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F2B48]"
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              variant="doctor"
              onClick={handleSaveNotes}
              className="flex items-center gap-2"
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
