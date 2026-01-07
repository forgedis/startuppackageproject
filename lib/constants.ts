/**
 * Application constants
 */

export const APP_NAME = 'StartupPackage'
export const APP_DESCRIPTION = 'Vše, co váš startup potřebuje k rozjezdu'

export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

/**
 * Pricing tiers
 */
export const PRICING_TIERS = {
  starter: {
    label: 'Starter',
    description: 'Nápad nebo MVP',
  },
  grower: {
    label: 'Grower',
    description: 'První tržby',
  },
  scaler: {
    label: 'Scaler',
    description: 'Připraven na investici',
  },
} as const

/**
 * Lead status options
 */
export const LEAD_STATUS = {
  new: 'Nový',
  contacted: 'Kontaktován',
  qualified: 'Kvalifikován',
  converted: 'Převeden',
  rejected: 'Odmítnut',
} as const

/**
 * Contact information
 */
export const CONTACT = {
  email: 'info@startuppackage.cz',
  phone: '+420 725 568 866',
  website: 'https://www.startuppackage.eu',
} as const

/**
 * Social media links
 */
export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/company/startuppackage',
  facebook: 'https://www.facebook.com/startuppackage',
} as const
