/**
 * Centralized Design System Bridge for Dr. Ken Miller Dental Clinic
 * 
 * NOTE: All CSS custom properties and color values are defined in:
 * `src/index.css`
 * 
 * To change the brand colors or theme of the application, simply edit `src/index.css`!
 */

export const THEME_CONFIG = {
  patient: {
    name: 'Patient Portal (Dental Wellness)',
    brandName: 'Dr. Ken Miller Dental Clinic',
    tagline: 'Compassionate Family Care Since 1986',
    primary: {
      main: 'var(--patient-primary)',
      hover: 'var(--patient-primary-hover)',
      dark: 'var(--patient-primary-dark)',
      light: 'var(--patient-primary-light)',
      subtle: 'var(--patient-primary-subtle)',
      border: 'var(--patient-primary-border)',
      text: 'var(--patient-primary-text)'
    },
    secondary: {
      main: 'var(--patient-secondary)',
      hover: 'var(--patient-secondary-hover)',
      light: 'var(--patient-secondary-light)',
      border: 'var(--patient-secondary-border)',
      text: 'var(--patient-secondary-text)'
    },
    emergency: {
      main: 'var(--patient-emergency)',
      dark: 'var(--patient-emergency-dark)',
      darker: 'var(--patient-emergency-darker)',
      light: 'var(--patient-emergency-light)',
      border: 'var(--patient-emergency-border)',
      text: 'var(--patient-emergency-text)'
    },
    accent: {
      gold: 'var(--patient-gold)',
      goldLight: 'var(--patient-gold-light)',
      goldBorder: 'var(--patient-gold-border)',
      goldText: 'var(--patient-gold-text)'
    },
    background: 'var(--patient-bg)',
    card: 'var(--patient-card)'
  },
  doctor: {
    name: 'Doctor Portal (Chairside Ops & EHR)',
    brandName: 'Dr. Ken Miller, Lead DDS',
    tagline: 'Operatory Command & Patient Management',
    primary: {
      main: 'var(--doctor-primary)',
      hover: 'var(--doctor-primary-hover)',
      dark: 'var(--doctor-primary-dark)',
      light: 'var(--doctor-primary-light)',
      subtle: 'var(--doctor-primary-subtle)',
      border: 'var(--doctor-primary-border)',
      text: 'var(--doctor-primary-text)'
    },
    secondary: {
      main: 'var(--doctor-secondary)',
      hover: 'var(--doctor-secondary-hover)',
      light: 'var(--doctor-secondary-light)',
      border: 'var(--doctor-secondary-border)',
      text: 'var(--doctor-secondary-text)'
    },
    status: {
      active: 'var(--doctor-status-active)',
      activeLight: 'var(--doctor-status-active-light)',
      activeBorder: 'var(--doctor-status-active-border)',
      activeText: 'var(--doctor-status-active-text)',

      warning: 'var(--doctor-status-warning)',
      warningLight: 'var(--doctor-status-warning-light)',
      warningBorder: 'var(--doctor-status-warning-border)',
      warningText: 'var(--doctor-status-warning-text)',

      info: 'var(--doctor-status-info)',
      infoLight: 'var(--doctor-status-info-light)'
    },
    background: 'var(--doctor-bg)',
    card: 'var(--doctor-card)'
  }
}
