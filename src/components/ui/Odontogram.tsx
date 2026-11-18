import React, { useState } from 'react'
import { ToothData } from '@/types'
import { DOCTOR_ODONTOGRAM_TEETH } from '@/data/mockData'
import { Badge } from '@/components/ui/Badge'
import { Info, Check, AlertTriangle, ShieldCheck } from 'lucide-react'

interface OdontogramProps {
  onSelectTooth?: (tooth: ToothData) => void
  selectedToothNumber?: number | null
  interactive?: boolean
}

export const Odontogram: React.FC<OdontogramProps> = ({
  onSelectTooth,
  selectedToothNumber,
  interactive = true
}) => {
  const [activeTooth, setActiveTooth] = useState<ToothData | null>(
    DOCTOR_ODONTOGRAM_TEETH.find(t => t.number === 19) || null
  )

  const upperTeeth = DOCTOR_ODONTOGRAM_TEETH.filter(t => t.number >= 1 && t.number <= 16)
  const lowerTeeth = DOCTOR_ODONTOGRAM_TEETH.filter(t => t.number >= 17 && t.number <= 32)

  const handleToothClick = (tooth: ToothData) => {
    setActiveTooth(tooth)
    if (onSelectTooth) {
      onSelectTooth(tooth)
    }
  }

  const getConditionColor = (condition: ToothData['condition'], isSelected: boolean) => {
    if (isSelected) return 'ring-2 ring-offset-2 ring-indigo-600 font-bold'
    switch (condition) {
      case 'implant':
        return 'bg-teal-500 text-white border-teal-600 shadow-xs'
      case 'crown':
        return 'bg-amber-400 text-amber-950 border-amber-500'
      case 'decay':
        return 'bg-rose-500 text-white border-rose-600 animate-pulse'
      case 'rootcanal':
        return 'bg-purple-600 text-white border-purple-700'
      case 'missing':
        return 'bg-slate-100 text-slate-400 border-dashed border-slate-300'
      case 'healthy':
      default:
        return 'bg-white text-slate-800 border-slate-200 hover:border-slate-400'
    }
  }

  const current = selectedToothNumber
    ? DOCTOR_ODONTOGRAM_TEETH.find(t => t.number === selectedToothNumber) || activeTooth
    : activeTooth

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Adult Dentition Odontogram (Universal #1–32)
          </h4>
          <p className="text-[11px] text-slate-400">Click any tooth for chart history & procedure notes</p>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <Badge variant="teal" size="sm">Implant (#19)</Badge>
          <Badge variant="amber" size="sm">Crown (#3)</Badge>
          <Badge variant="red" size="sm">Decay (#14)</Badge>
        </div>
      </div>

      {/* Odontogram Grid */}
      <div className="space-y-3 bg-slate-50/70 p-3 rounded-xl border border-slate-100 overflow-x-auto">
        {/* Upper Arch */}
        <div>
          <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 mb-1 px-1">
            <span>UPPER RIGHT (MAXILLARY)</span>
            <span>MIDLINE</span>
            <span>UPPER LEFT (MAXILLARY)</span>
          </div>
          <div className="grid grid-cols-16 gap-1 min-w-[500px]">
            {upperTeeth.map((tooth) => {
              const isSelected = current?.number === tooth.number
              return (
                <button
                  key={tooth.number}
                  type="button"
                  disabled={!interactive}
                  onClick={() => handleToothClick(tooth)}
                  title={`Tooth #${tooth.number}: ${tooth.name} (${tooth.condition})`}
                  className={`h-9 flex flex-col items-center justify-center rounded-lg border text-xs transition-all ${getConditionColor(
                    tooth.condition,
                    isSelected
                  )}`}
                >
                  <span className="text-[11px] font-bold leading-none">{tooth.number}</span>
                  <span className="text-[8px] opacity-75 capitalize mt-0.5 scale-90">
                    {tooth.condition === 'healthy' ? 'H' : tooth.condition.slice(0, 3)}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Occlusal Midline separator */}
        <div className="relative py-0.5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dashed border-slate-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-slate-200 text-slate-600 text-[9px] font-mono px-2 py-0.5 rounded-full uppercase">
              Occlusal Plane
            </span>
          </div>
        </div>

        {/* Lower Arch */}
        <div>
          <div className="grid grid-cols-16 gap-1 min-w-[500px]">
            {lowerTeeth.map((tooth) => {
              const isSelected = current?.number === tooth.number
              return (
                <button
                  key={tooth.number}
                  type="button"
                  disabled={!interactive}
                  onClick={() => handleToothClick(tooth)}
                  title={`Tooth #${tooth.number}: ${tooth.name} (${tooth.condition})`}
                  className={`h-9 flex flex-col items-center justify-center rounded-lg border text-xs transition-all ${getConditionColor(
                    tooth.condition,
                    isSelected
                  )}`}
                >
                  <span className="text-[11px] font-bold leading-none">{tooth.number}</span>
                  <span className="text-[8px] opacity-75 capitalize mt-0.5 scale-90">
                    {tooth.condition === 'healthy' ? 'H' : tooth.condition.slice(0, 3)}
                  </span>
                </button>
              )
            })}
          </div>
          <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 mt-1 px-1">
            <span>LOWER RIGHT (MANDIBULAR)</span>
            <span>MIDLINE</span>
            <span>LOWER LEFT (MANDIBULAR)</span>
          </div>
        </div>
      </div>

      {/* Selected Tooth Detail Banner */}
      {current && (
        <div className="mt-3 bg-white p-3 rounded-xl border border-slate-200/90 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
              #{current.number}
            </span>
            <div>
              <div className="font-semibold text-slate-800 flex items-center gap-2">
                <span>{current.name}</span>
                <span className="uppercase text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                  {current.condition}
                </span>
              </div>
              <p className="text-slate-500 text-[11px] mt-0.5">
                {current.notes || 'No active pathology recorded. Regular prophylactic hygiene indicated.'}
              </p>
            </div>
          </div>
          {current.plannedProcedure && (
            <div className="sm:text-right shrink-0">
              <span className="text-[10px] uppercase font-bold text-teal-700 bg-teal-50 px-2 py-1 rounded-md border border-teal-200 flex items-center gap-1">
                <Check className="w-3 h-3 text-teal-600" />
                Plan: {current.plannedProcedure}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
