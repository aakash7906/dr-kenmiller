import React from 'react'

interface ToothIconProps {
  className?: string
  sparkle?: boolean
}

/**
 * Authentic Anatomical Dental Molar Tooth Icon
 * Specifically designed with dual roots, crown cusps, and dentist sparkle.
 * Replaces any generic heart/cross shapes with true clinical dental iconography.
 */
export const ToothIcon: React.FC<ToothIconProps> = ({ className = 'w-6 h-6', sparkle = false }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 
        Molar Tooth Anatomy:
        - Occlusal Crown: Left cusp (7,2), mid-sulcus dip (12,3.5), right cusp (17,2)
        - Convex Buccal/Lingual contours (2.5, 21.5)
        - Bifurcated Mesial & Distal roots with furcation arch (12, 14.5)
      */}
      <path d="M7 2C4.5 2 2.5 4 2.5 6.8C2.5 9.5 3.6 12.2 4.6 14.8C5.6 17.2 6.4 20 7.8 21.8C8.5 22.7 9.5 22.3 10.1 21.1C10.8 19.6 11.3 17 11.7 15.2C11.9 14.4 12.1 14.4 12.3 15.2C12.7 17 13.2 19.6 13.9 21.1C14.5 22.3 15.5 22.7 16.2 21.8C17.6 20 18.4 17.2 19.4 14.8C20.4 12.2 21.5 9.5 21.5 6.8C21.5 4 19.5 2 17 2C15.2 2 13.8 3.3 12 3.3C10.2 3.3 8.8 2 7 2Z" />
      
      {/* Optional Enamel specular highlight arc */}
      <path
        d="M7 6C6.2 6.8 5.8 7.8 5.8 9"
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />

      {sparkle && (
        <path
          d="M19 4L19.5 5.5L21 6L19.5 6.5L19 8L18.5 6.5L17 6L18.5 5.5L19 4Z"
          fill="#38BDF8"
        />
      )}
    </svg>
  )
}

/**
 * Dentist Dental Clinic Emblem
 * An anatomical tooth framed inside a protective clinical shield with dental cross.
 */
export const DentistBadgeIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Clinical Shield */}
      <path
        d="M16 2L5 6V14C5 21.2 9.7 27.9 16 30C22.3 27.9 27 21.2 27 14V6L16 2Z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Crisp Center Molar Tooth */}
      <path
        d="M11.5 9C9.5 9 8 10.5 8 12.8C8 15 8.9 17 9.7 19C10.5 21 11.2 23 12.2 24.3C12.8 25 13.5 24.7 14 23.8C14.5 22.5 15 20.5 15.3 19.2C15.5 18.5 16.5 18.5 16.7 19.2C17 20.5 17.5 22.5 18 23.8C18.5 24.7 19.2 25 19.8 24.3C20.8 23 21.5 21 22.3 19C23.1 17 24 15 24 12.8C24 10.5 22.5 9 20.5 9C19 9 17.8 10 16 10C14.2 10 13 9 11.5 9Z"
        fill="currentColor"
      />
      {/* Dentist Star Gleam */}
      <circle cx="21" cy="11" r="1.5" fill="#38BDF8" />
    </svg>
  )
}
