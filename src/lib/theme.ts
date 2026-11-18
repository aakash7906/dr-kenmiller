/**
 * Color Palette and Theme Specification for Dr. Ken Miller Dental Clinic App
 * 
 * PATIENT THEME:
 * - Designed around calm, reassuring, trustworthy dental wellness.
 * - Derived from Dr. Ken Miller's brand & the Stitch design.
 * - Primary: Deep Teal / Alpine Spruce (#0A5C67 / #084952)
 *   -> Conveys medical reliability, calming dental care, reduces dental anxiety.
 * - Secondary: Crisp Arctic Sky Blue (#E0F2FE / #0369A1)
 *   -> Subtle background accents, pill badges, and soothing micro-interactions.
 * - Emergency Accent: Crimson Alert (#DC2626)
 *   -> Immediate recognition for knocked-out tooth, acute pain triage.
 * - Warm Gold Accent: Heritage Amber (#D97706 / #FEF3C7)
 *   -> Highlights 38+ years of clinic heritage in St. Paul since 1986.
 * 
 * DOCTOR THEME:
 * - Designed for rapid clinical decision making, high data density, and zero distractions.
 * - Primary: Clinical Royal Navy / Precision Blue (#0F2B48 / #1E3A8A / #0284C7)
 *   -> Authoritative, clear diagnostic contrast, crisp electronic health record aesthetic.
 * - Secondary: Diagnostic Cyan & Surgical Slate (#0EA5E9 / #1E293B)
 *   -> Clear visual hierarchy for operatory bays, tooth odontogram statuses.
 * - Status Accents:
 *   - Seated / Active: Clinical Emerald (#059669 / #D1FAE5)
 *   - Prepping / Buffer: Electric Blue (#2563EB / #DBEAFE)
 *   - Critical / Triage: Vivid Amber-Rose (#EA580C / #FFEDD5)
 */

export const THEME_CONFIG = {
  patient: {
    name: 'Patient Portal (Dental Wellness)',
    brandName: 'Dr. Ken Miller Dental Clinic',
    tagline: 'Compassionate Family Care Since 1986',
    primary: {
      main: '#0A5C67',
      hover: '#084952',
      dark: '#05333A',
      light: '#E6F4F6',
      subtle: '#F0F8F9',
      border: '#D1EAEF',
      text: '#FFFFFF'
    },
    secondary: {
      main: '#0284C7',
      light: '#E0F2FE',
      text: '#0369A1'
    },
    emergency: {
      main: '#DC2626',
      dark: '#991B1B',
      light: '#FEF2F2',
      border: '#FCA5A5',
      text: '#FFFFFF'
    },
    accent: {
      gold: '#D97706',
      goldLight: '#FEF3C7',
      goldBorder: '#FDE68A'
    },
    background: '#F8FAFC',
    card: '#FFFFFF',
    textMain: '#0F172A',
    textMuted: '#64748B'
  },
  doctor: {
    name: 'Doctor Portal (Chairside Ops & EHR)',
    brandName: 'Dr. Ken Miller, Lead DDS',
    tagline: 'Operatory Command & Patient Management',
    primary: {
      main: '#0F2B48',
      hover: '#091A2C',
      dark: '#061320',
      light: '#EBF3FB',
      subtle: '#F1F6FB',
      border: '#CBDCF0',
      text: '#FFFFFF'
    },
    secondary: {
      main: '#0EA5E9',
      light: '#E0F2FE',
      text: '#0284C7'
    },
    status: {
      active: '#059669',
      activeLight: '#D1FAE5',
      warning: '#EA580C',
      warningLight: '#FFEDD5',
      info: '#2563EB',
      infoLight: '#DBEAFE'
    },
    background: '#F1F5F9',
    card: '#FFFFFF',
    textMain: '#0F172A',
    textMuted: '#475569'
  }
}
