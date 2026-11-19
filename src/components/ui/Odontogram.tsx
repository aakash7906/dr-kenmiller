import React, { useState } from 'react'
import { ToothData } from '@/types'
import { DOCTOR_ODONTOGRAM_TEETH } from '@/data/mockData'
import { Badge } from '@/components/ui/Badge'
import { Check, X, Shield, Sparkles, Filter } from 'lucide-react'

interface OdontogramProps {
  onSelectTooth?: (tooth: ToothData) => void
  selectedToothNumber?: number | null
  interactive?: boolean
}

type ArchView = 'both' | 'upper' | 'lower'
type TreatmentFilter = 'all' | 'treatments'

// Universal Numbering order for anatomical arches
// Upper Arch (viewed from occlusal): #1 on patient right (viewer left) to #16 on patient left (viewer right)
const UPPER_TEETH_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

// Lower Arch: #32 on patient right (viewer left) to #17 on patient left (viewer right)
const LOWER_TEETH_ORDER = [32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17]

interface ToothCoordinate {
  number: number
  x: number
  y: number
  rot: number
  labelX: number
  labelY: number
  type: 'molar' | 'premolar' | 'canine' | 'incisor'
}

// True anatomical U-shaped dental arch with deep Y-axis curvature and expanded anterior spacing
function getDentalArchCoordinates(
  isUpper: boolean,
  centerX = 190,
  apexY = 46,
  width = 146,
  height = 136
): ToothCoordinate[] {
  const UPPER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  const LOWER = [32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17]
  const list = isUpper ? UPPER : LOWER

  const T_max = (75 * Math.PI) / 180

  return list.map((num, i) => {
    const k = i - 7.5
    const s = k / 7.5

    // Warp parameter ensures anterior teeth (6 to 11 and 21 to 27) have generous, uniform spacing along the anatomical arch
    const s_warped = Math.sign(s) * (0.85 * Math.abs(s) + 0.15 * Math.pow(Math.abs(s), 0.85))
    const theta = s_warped * T_max

    const x = centerX + width * Math.sin(theta)
    const yCurve = height * (1 - Math.cos(theta)) + 12 * Math.pow(Math.abs(s), 3)
    const y = isUpper ? apexY + yCurve : apexY - yCurve

    const dx = width * Math.cos(theta)
    const dy = (height * Math.sin(theta) + 36 * Math.pow(Math.abs(s), 2) * Math.sign(s)) * (isUpper ? 1 : -1)
    const rot = Math.round((Math.atan2(dy, dx) * 180) / Math.PI)

    // Outward normal angle for placing tooth number cleanly outside the arch
    const normalAngle = (isUpper ? rot - 90 : rot + 90) * (Math.PI / 180)
    const labelDist = 20
    const labelX = Math.round((x + labelDist * Math.cos(normalAngle)) * 10) / 10
    const labelY = Math.round((y + labelDist * Math.sin(normalAngle)) * 10) / 10

    let type: ToothCoordinate['type'] = 'molar'
    if (num === 8 || num === 9 || num === 7 || num === 10 || num === 24 || num === 25 || num === 23 || num === 26) {
      type = 'incisor'
    } else if (num === 6 || num === 11 || num === 22 || num === 27) {
      type = 'canine'
    } else if (num === 4 || num === 5 || num === 12 || num === 13 || num === 20 || num === 21 || num === 28 || num === 29) {
      type = 'premolar'
    }

    return {
      number: num,
      x: Math.round(x * 10) / 10,
      y: Math.round(y * 10) / 10,
      rot,
      labelX,
      labelY,
      type
    }
  })
}

export const Odontogram: React.FC<OdontogramProps> = ({
  onSelectTooth,
  selectedToothNumber,
  interactive = true
}) => {
  const [activeTooth, setActiveTooth] = useState<ToothData | null>(
    DOCTOR_ODONTOGRAM_TEETH.find((t) => t.number === 19) || null
  )
  const [archView, setArchView] = useState<ArchView>('both')
  const [filterMode, setFilterMode] = useState<TreatmentFilter>('all')
  const [showCallout, setShowCallout] = useState(true)

  const current = selectedToothNumber
    ? DOCTOR_ODONTOGRAM_TEETH.find((t) => t.number === selectedToothNumber) || activeTooth
    : activeTooth

  const handleToothClick = (toothNum: number) => {
    if (!interactive) return
    const toothData = DOCTOR_ODONTOGRAM_TEETH.find((t) => t.number === toothNum)
    if (toothData) {
      setActiveTooth(toothData)
      setShowCallout(true)
      if (onSelectTooth) {
        onSelectTooth(toothData)
      }
    }
  }

  // Pre-calculated coordinates for views (wider & much deeper anatomical dental arch)
  const upperCoordsBoth = getDentalArchCoordinates(true, 190, 46, 146, 134)
  const lowerCoordsBoth = getDentalArchCoordinates(false, 190, 404, 142, 134)

  // Zoomed views when user clicks Upper or Lower arch
  const upperCoordsSingle = getDentalArchCoordinates(true, 190, 48, 155, 175)
  const lowerCoordsSingle = getDentalArchCoordinates(false, 190, 240, 155, 175)

  // Tooth vector rendering with anatomical dimensions & non-overlapping touch targets
  const renderToothVector = (
    coord: ToothCoordinate,
    tooth: ToothData,
    isSelected: boolean,
    isDimmed: boolean
  ) => {
    const { number, x, y, rot, labelX, labelY, type } = coord
    const isImplant = tooth.condition === 'implant'
    const isCrown = tooth.condition === 'crown'
    const isDecay = tooth.condition === 'decay'
    const isRootCanal = tooth.condition === 'rootcanal'
    const isMissing = tooth.condition === 'missing'

    let fill = '#FFFFFF'
    let stroke = '#94A3B8'
    let strokeWidth = '1.6'
    let fissureStroke = '#CBD5E1'

    if (isImplant) {
      fill = '#0D9488'
      stroke = '#115E59'
      fissureStroke = '#99F6E4'
    } else if (isCrown) {
      fill = '#F59E0B'
      stroke = '#D97706'
      fissureStroke = '#FEF3C7'
    } else if (isDecay) {
      fill = '#F43F5E'
      stroke = '#BE123C'
      fissureStroke = '#FFE4E6'
    } else if (isRootCanal) {
      fill = '#8B5CF6'
      stroke = '#6D28D9'
      fissureStroke = '#EDE9FE'
    } else if (isMissing) {
      fill = '#F8FAFC'
      stroke = '#CBD5E1'
    }

    if (isSelected) {
      stroke = '#2563EB'
      strokeWidth = '2.6'
    }

    return (
      <g
        key={number}
        onClick={() => handleToothClick(number)}
        className={`cursor-pointer transition-all duration-200 select-none ${
          isDimmed ? 'opacity-20' : 'opacity-100 hover:scale-108'
        }`}
      >
        {/* Selected glowing halo ring */}
        {isSelected && (
          <circle
            cx={x}
            cy={y}
            r="19"
            fill="none"
            stroke="#2563EB"
            strokeWidth="2.8"
            strokeDasharray="5 3"
            className="animate-spin-slow opacity-95"
          />
        )}

        {/* Tooth anatomical crown vector - Scaled up and enlarged */}
        <g transform={`translate(${x}, ${y}) rotate(${rot}) scale(1.42)`}>
          {/* Non-overlapping oriented touch target pill along tooth's tangent & radial orientation */}
          <rect
            x="-11.5"
            y="-15"
            width="23"
            height="30"
            rx="9"
            fill="transparent"
            className="cursor-pointer"
          />

          {type === 'molar' && (
            <>
              {/* Rounded 4-cusped molar occlusal anatomy */}
              <path
                d="M -9.5,-8 C -9.5,-10.5 -7,-10.5 -3.5,-10 C -1,-10.5 1,-10.5 3.5,-10 C 7,-10.5 9.5,-10.5 9.5,-8 C 10,-5 10,-2 9.5,1 C 10,4 10,7 9.5,9 C 7.5,10.5 5,10 0,10.5 C -5,10 -7.5,10.5 -9.5,9 C -10,7 -10,4 -9.5,1 C -10,-2 -10,-5 -9.5,-8 Z"
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeDasharray={isMissing ? '2 2' : 'none'}
              />
              {!isMissing && (
                <>
                  <path
                    d="M -5.5,-1 Q 0,0 5.5,-1 M 0,-5.5 Q 0,0 0,6"
                    fill="none"
                    stroke={fissureStroke}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  {isImplant && (
                    <circle cx="0" cy="0" r="3" fill="#CCFBF1" stroke="#0F766E" strokeWidth="1" />
                  )}
                  {isDecay && (
                    <circle cx="2" cy="-1.5" r="2.4" fill="#881337" />
                  )}
                </>
              )}
            </>
          )}

          {type === 'premolar' && (
            <>
              {/* Rounded bicuspid oval crown - Enriched and enlarged */}
              <path
                d="M -8.5,-6.5 C -8.5,-9 0,-9.5 8.5,-6.5 C 10,-2 10,2 8.5,6.5 C 0,9.5 -8.5,9 -8.5,6.5 C -10,2 -10,-2 -8.5,-6.5 Z"
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeDasharray={isMissing ? '2 2' : 'none'}
              />
              {!isMissing && (
                <path
                  d="M -5,0 Q 0,0.6 5,0"
                  fill="none"
                  stroke={fissureStroke}
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
              )}
            </>
          )}

          {type === 'canine' && (
            <>
              {/* Pointed cusp canine contour - Enlarged & robust */}
              <path
                d="M 0,-9 C 4,-7.5 8.5,-3.5 8.5,1.5 C 8.5,6.5 4.5,9 0,9.5 C -4.5,9 -8.5,6.5 -8.5,1.5 C -8.5,-3.5 -4,-7.5 0,-9 Z"
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeDasharray={isMissing ? '2 2' : 'none'}
              />
              {!isMissing && (
                <path
                  d="M 0,-5.5 L 0,5.5"
                  fill="none"
                  stroke={fissureStroke}
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
              )}
            </>
          )}

          {type === 'incisor' && (
            <>
              {/* Elegant curved incisor wedge - Substantially enlarged & wide */}
              <path
                d="M -8.5,-6 C -8.5,-8 8.5,-8 8.5,-6 C 9.5,-1.5 8.5,4 7,7 C 3,8.5 -3,8.5 -7,7 C -8.5,4 -9.5,-1.5 -8.5,-6 Z"
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeDasharray={isMissing ? '2 2' : 'none'}
              />
              {!isMissing && (
                <path
                  d="M -5.5,3.5 Q 0,4.5 5.5,3.5"
                  fill="none"
                  stroke={fissureStroke}
                  strokeWidth="1"
                />
              )}
            </>
          )}
        </g>

        {/* Tooth number label directly along outer perimeter */}
        <text
          x={labelX}
          y={labelY}
          textAnchor="middle"
          dominantBaseline="central"
          className={`select-none transition-colors ${
            isSelected
              ? 'fill-blue-600 font-black text-[12px]'
              : isMissing
              ? 'fill-slate-300 font-bold text-[9px]'
              : 'fill-slate-600 font-bold text-[10.5px]'
          }`}
        >
          {number}
        </text>
      </g>
    )
  }

  return (
    <div className="space-y-4">
      {/* 1. Header with View Controls & Treatment Mode - Outside of Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-slate-900">
              Anatomical Dental Arch Odontogram
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Tap any tooth to inspect surfaces & records
          </p>
        </div>

        {/* Arch Switcher: Both / Upper / Lower */}
        <div className="bg-slate-200/90 p-1 rounded-xl flex items-center gap-1 text-xs font-bold shrink-0 self-start sm:self-auto shadow-2xs">
          <button
            type="button"
            onClick={() => setArchView('both')}
            className={`py-1.5 px-3.5 rounded-lg transition-all cursor-pointer ${
              archView === 'both'
                ? 'bg-doctor-primary text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Both Arches
          </button>
          <button
            type="button"
            onClick={() => setArchView('upper')}
            className={`py-1.5 px-3.5 rounded-lg transition-all cursor-pointer ${
              archView === 'upper'
                ? 'bg-doctor-primary text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Upper (1–16)
          </button>
          <button
            type="button"
            onClick={() => setArchView('lower')}
            className={`py-1.5 px-3.5 rounded-lg transition-all cursor-pointer ${
              archView === 'lower'
                ? 'bg-doctor-primary text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Lower (17–32)
          </button>
        </div>
      </div>

      {/* 2. Visual Clinical Legend & Filter Pill */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-800 border border-teal-200 px-3 py-1 rounded-full text-xs font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
            Implant (19)
          </span>
          <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            Crown (3)
          </span>
          <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-800 border border-rose-200 px-3 py-1 rounded-full text-xs font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            Decay (14)
          </span>
          <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-800 border border-purple-200 px-3 py-1 rounded-full text-xs font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
            Endo (30)
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white text-slate-600 border border-slate-200 px-3 py-1 rounded-full text-xs font-semibold shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            Healthy Enamel
          </span>
        </div>

        {/* Toggle Treatment View Filter */}
        <div className="flex items-center gap-1 bg-slate-200/80 p-0.5 rounded-lg text-xs font-semibold">
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
              filterMode === 'all' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600'
            }`}
          >
            All Teeth
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('treatments')}
            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
              filterMode === 'treatments' ? 'bg-white text-blue-900 shadow-2xs font-bold' : 'text-slate-600'
            }`}
          >
            Treatments Only
          </button>
        </div>
      </div>

      {/* 3. Main Anatomical Dental Arch - Displayed Out of Card taking Full Viewport Width */}
      <div className="w-full flex flex-col items-center justify-center py-2 relative select-none">
        {/* VIEW 1: BOTH ARCHES (Full Mouth Anatomical U-Arch View) */}
        {archView === 'both' && (
          <div className="w-full max-w-[460px] aspect-[380/450] relative">
            <svg
              viewBox="0 0 380 450"
              className="w-full h-full drop-shadow-sm overflow-visible"
            >
              {/* Subtle Dental Crosshair / Midline Axis */}
              <line x1="190" y1="18" x2="190" y2="432" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="20" y1="225" x2="360" y2="225" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />

              {/* Arch Headings */}
              <text x="190" y="16" textAnchor="middle" className="text-[10px] font-bold fill-slate-400 uppercase tracking-widest">
                Upper Dental Arch (Maxillary)
              </text>
              <text x="24" y="130" textAnchor="middle" className="text-[9px] font-bold fill-slate-400">
                RIGHT
              </text>
              <text x="356" y="130" textAnchor="middle" className="text-[9px] font-bold fill-slate-400">
                LEFT
              </text>

              {/* Center Occlusal Plane Badge */}
              <g transform="translate(190, 225)">
                <rect x="-46" y="-10" width="92" height="20" rx="10" fill="#F1F5F9" stroke="#E2E8F0" />
                <text x="0" y="1" textAnchor="middle" dominantBaseline="central" className="text-[9px] font-black fill-slate-500 uppercase tracking-wider">
                  Occlusal Plane
                </text>
              </g>

              {/* Lower Arch Heading */}
              <text x="190" y="440" textAnchor="middle" className="text-[10px] font-bold fill-slate-400 uppercase tracking-widest">
                Lower Dental Arch (Mandibular)
              </text>

              {/* Render Upper Arch Teeth */}
              {upperCoordsBoth.map((coord) => {
                const tooth = DOCTOR_ODONTOGRAM_TEETH.find((t) => t.number === coord.number)!
                const isSelected = current?.number === coord.number
                const isDimmed = filterMode === 'treatments' && tooth.condition === 'healthy'
                return renderToothVector(coord, tooth, isSelected, isDimmed)
              })}

              {/* Render Lower Arch Teeth */}
              {lowerCoordsBoth.map((coord) => {
                const tooth = DOCTOR_ODONTOGRAM_TEETH.find((t) => t.number === coord.number)!
                const isSelected = current?.number === coord.number
                const isDimmed = filterMode === 'treatments' && tooth.condition === 'healthy'
                return renderToothVector(coord, tooth, isSelected, isDimmed)
              })}
            </svg>
          </div>
        )}

        {/* VIEW 2: UPPER ARCH (Zoomed High Detail) */}
        {archView === 'upper' && (
          <div className="w-full max-w-[460px] aspect-[380/290] relative">
            <svg viewBox="0 0 380 290" className="w-full h-full drop-shadow-sm overflow-visible">
              <line x1="190" y1="20" x2="190" y2="275" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
              <text x="190" y="18" textAnchor="middle" className="text-[11px] font-bold fill-slate-400 uppercase tracking-widest">
                Upper Maxillary Arch (1–16)
              </text>
              <text x="24" y="145" textAnchor="middle" className="text-[10px] font-bold fill-slate-400">
                RIGHT
              </text>
              <text x="356" y="145" textAnchor="middle" className="text-[10px] font-bold fill-slate-400">
                LEFT
              </text>

              {upperCoordsSingle.map((coord) => {
                const tooth = DOCTOR_ODONTOGRAM_TEETH.find((t) => t.number === coord.number)!
                const isSelected = current?.number === coord.number
                const isDimmed = filterMode === 'treatments' && tooth.condition === 'healthy'
                return renderToothVector(coord, tooth, isSelected, isDimmed)
              })}
            </svg>
          </div>
        )}

        {/* VIEW 3: LOWER ARCH (Zoomed High Detail with Tooth 19) */}
        {archView === 'lower' && (
          <div className="w-full max-w-[460px] aspect-[380/290] relative">
            <svg viewBox="0 0 380 290" className="w-full h-full drop-shadow-sm overflow-visible">
              <line x1="190" y1="15" x2="190" y2="275" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
              <text x="190" y="18" textAnchor="middle" className="text-[11px] font-bold fill-slate-400 uppercase tracking-widest">
                Lower Mandibular Arch (17–32)
              </text>
              <text x="24" y="140" textAnchor="middle" className="text-[10px] font-bold fill-slate-400">
                RIGHT
              </text>
              <text x="356" y="140" textAnchor="middle" className="text-[10px] font-bold fill-slate-400">
                LEFT
              </text>

              {lowerCoordsSingle.map((coord) => {
                const tooth = DOCTOR_ODONTOGRAM_TEETH.find((t) => t.number === coord.number)!
                const isSelected = current?.number === coord.number
                const isDimmed = filterMode === 'treatments' && tooth.condition === 'healthy'
                return renderToothVector(coord, tooth, isSelected, isDimmed)
              })}
            </svg>
          </div>
        )}

        {/* 4. Interactive Floating Speech Bubble / Callout Card */}
        {showCallout && current && (
          <div className="mt-4 w-full bg-white border border-slate-200/90 shadow-sm rounded-2xl p-4 animate-in fade-in slide-in-from-bottom-2 space-y-2.5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-doctor-primary text-white font-mono font-bold flex items-center justify-center text-xs shadow-2xs">
                  {current.number}
                </span>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {current.name}
                  </h4>
                  <span
                    className={`inline-block text-[10px] font-extrabold uppercase tracking-wide px-2.5 py-0.5 rounded-full mt-0.5 ${
                      current.condition === 'implant'
                        ? 'bg-teal-100 text-teal-800'
                        : current.condition === 'crown'
                        ? 'bg-amber-100 text-amber-900'
                        : current.condition === 'decay'
                        ? 'bg-rose-100 text-rose-800'
                        : current.condition === 'rootcanal'
                        ? 'bg-purple-100 text-purple-900'
                        : current.condition === 'missing'
                        ? 'bg-slate-100 text-slate-500'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {current.condition.toUpperCase()}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowCallout(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg cursor-pointer"
                title="Dismiss Callout"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              {current.notes ||
                'Enamel surface intact with healthy periodontal margin. No decay or active pathology identified during recall cycle.'}
            </p>

            {current.plannedProcedure && (
              <div className="flex items-center justify-between pt-1 text-xs">
                <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-lg border border-teal-200 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-teal-600" />
                  <span>Clinical Plan: {current.plannedProcedure}</span>
                </span>
                <span className="text-[11px] text-slate-400 font-mono">Dr. Ken Miller</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
