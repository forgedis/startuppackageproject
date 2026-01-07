import { z } from 'zod'

/**
 * Lead form validation schema
 */
export const leadSchema = z.object({
  first_name: z.string().min(2, 'Jméno musí mít alespoň 2 znaky'),
  last_name: z.string().min(2, 'Příjmení musí mít alespoň 2 znaky'),
  email: z.string().email('Neplatný email'),
  phone: z
    .string()
    .regex(/^\+?[0-9]{9,15}$/, 'Neplatné telefonní číslo')
    .optional()
    .or(z.literal('')),
  company_name: z.string().min(2, 'Název firmy musí mít alespoň 2 znaky'),
  note: z.string().max(500, 'Poznámka může mít maximálně 500 znaků').optional(),
  gdpr_consent: z.boolean().refine((val) => val === true, {
    message: 'Musíte souhlasit se zpracováním osobních údajů',
  }),
  marketing_consent: z.boolean().optional(),
})

export type LeadFormValues = z.infer<typeof leadSchema>

/**
 * Category form validation schema (Admin)
 */
export const categorySchema = z.object({
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, 'Slug může obsahovat pouze malá písmena, čísla a pomlčky'),
  name_cs: z.string().min(2, 'Název musí mít alespoň 2 znaky'),
  name_en: z.string().optional(),
  description_cs: z.string().optional(),
  icon: z.string().optional(),
  sort_order: z.number().int().min(0).default(0),
  is_active: z.boolean().default(true),
})

export type CategoryFormValues = z.infer<typeof categorySchema>

/**
 * Partner form validation schema (Admin)
 */
export const partnerSchema = z.object({
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, 'Slug může obsahovat pouze malá písmena, čísla a pomlčky'),
  name: z.string().min(2, 'Název musí mít alespoň 2 znaky'),
  logo_url: z.string().url('Neplatná URL').optional().or(z.literal('')),
  short_description: z.string().min(10, 'Krátký popis musí mít alespoň 10 znaků'),
  full_description: z.string().min(50, 'Úplný popis musí mít alespoň 50 znaků'),
  website_url: z.string().url('Neplatná URL'),
  contact_email: z.string().email('Neplatný email'),
  is_verified: z.boolean().default(false),
  is_featured: z.boolean().default(false),
  sort_order: z.number().int().min(0).default(0),
})

export type PartnerFormValues = z.infer<typeof partnerSchema>

/**
 * Offer form validation schema (Admin)
 */
export const offerSchema = z.object({
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, 'Slug může obsahovat pouze malá písmena, čísla a pomlčky'),
  partner_id: z.string().uuid('Vyberte partnera'),
  category_id: z.string().uuid('Vyberte kategorii').optional(),
  title_cs: z.string().min(5, 'Název musí mít alespoň 5 znaků'),
  subtitle_cs: z.string().optional(),
  description_cs: z.string().min(50, 'Popis musí mít alespoň 50 znaků'),
  pricing_tier: z.enum(['starter', 'grower', 'scaler']).optional(),
  pricing_details: z.any().optional(), // JSON field
  conditions: z.any().optional(), // JSON field
  cta_text: z.string().default('Mám zájem'),
  meta_title: z.string().optional(),
  meta_description: z.string().max(160).optional(),
  published_at: z.string().optional(),
  sort_order: z.number().int().min(0).default(0),
  is_active: z.boolean().default(true),
})

export type OfferFormValues = z.infer<typeof offerSchema>
