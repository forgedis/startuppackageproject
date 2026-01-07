import type { Database } from './database'

/**
 * Type helpers for database tables
 */
export type Category = Database['public']['Tables']['categories']['Row']
export type Partner = Database['public']['Tables']['partners']['Row']
export type Offer = Database['public']['Tables']['offers']['Row']
export type Lead = Database['public']['Tables']['leads']['Row']
export type AdminUser = Database['public']['Tables']['admin_users']['Row']

/**
 * Extended types with relations
 */
export type OfferWithPartner = Offer & {
  partner: Partner
}

export type OfferWithCategory = Offer & {
  category: Category | null
}

export type OfferWithRelations = Offer & {
  partner: Partner
  category: Category | null
}

export type LeadWithRelations = Lead & {
  offer: Offer | null
  partner: Partner | null
}

/**
 * Pricing details structure
 */
export type PricingDetails = {
  base_price?: string
  discount?: string
  conditions?: string[]
  validity?: string
}

/**
 * Offer conditions structure
 */
export type OfferConditions = {
  company_age?: string
  revenue?: string
  employees?: string
  other?: string[]
}
