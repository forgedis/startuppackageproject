'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { offerSchema } from '@/lib/validations'

// Helper to convert empty strings to undefined
const getOptionalString = (formData: FormData, key: string) => {
  const value = formData.get(key) as string | null
  return value && value.trim() !== '' ? value : undefined
}

/**
 * Create a new offer
 */
export async function createOffer(formData: FormData) {
  const supabase = await createClient()

  // Extract form data
  const data = {
    slug: formData.get('slug') as string,
    partner_id: formData.get('partner_id') as string,
    category_id: getOptionalString(formData, 'category_id'),
    title_cs: formData.get('title_cs') as string,
    subtitle_cs: getOptionalString(formData, 'subtitle_cs'),
    description_cs: formData.get('description_cs') as string,
    pricing_tier: getOptionalString(formData, 'pricing_tier') as 'starter' | 'grower' | 'scaler' | undefined,
    pricing_details: getOptionalString(formData, 'pricing_details'),
    conditions: getOptionalString(formData, 'conditions'),
    cta_text: (formData.get('cta_text') as string) || 'Mám zájem',
    meta_title: getOptionalString(formData, 'meta_title'),
    meta_description: getOptionalString(formData, 'meta_description'),
    published_at: getOptionalString(formData, 'published_at'),
    is_active: formData.get('is_active') === 'on',
    sort_order: parseInt(formData.get('sort_order') as string) || 0,
  }

  // Parse JSON fields if they exist
  let parsedData: any = { ...data }

  if (data.pricing_details) {
    try {
      parsedData.pricing_details = JSON.parse(data.pricing_details)
    } catch (e) {
      throw new Error('Neplatný formát pricing_details (musí být platný JSON)')
    }
  }

  if (data.conditions) {
    try {
      parsedData.conditions = JSON.parse(data.conditions)
    } catch (e) {
      throw new Error('Neplatný formát conditions (musí být platný JSON)')
    }
  }

  // Validate with Zod schema
  let validatedData
  try {
    validatedData = offerSchema.parse(parsedData)
  } catch (error: any) {
    // Format Zod errors into readable message
    if (error.errors) {
      const errorMessages = error.errors.map((err: any) => `${err.path.join('.')}: ${err.message}`).join('\n')
      throw new Error(`Validační chyby:\n${errorMessages}`)
    }
    throw error
  }

  // Insert into database
  const { error } = await supabase
    .from('offers')
    // @ts-ignore - Supabase SSR type inference limitation
    .insert(validatedData)

  if (error) {
    throw new Error(`Databázová chyba: ${error.message}`)
  }

  // Revalidate and redirect
  revalidatePath('/admin/offers')
  redirect('/admin/offers')
}

/**
 * Update an existing offer
 */
export async function updateOffer(id: string, formData: FormData) {
  const supabase = await createClient()

  // Extract form data
  const data = {
    slug: formData.get('slug') as string,
    partner_id: formData.get('partner_id') as string,
    category_id: getOptionalString(formData, 'category_id'),
    title_cs: formData.get('title_cs') as string,
    subtitle_cs: getOptionalString(formData, 'subtitle_cs'),
    description_cs: formData.get('description_cs') as string,
    pricing_tier: getOptionalString(formData, 'pricing_tier') as 'starter' | 'grower' | 'scaler' | undefined,
    pricing_details: getOptionalString(formData, 'pricing_details'),
    conditions: getOptionalString(formData, 'conditions'),
    cta_text: (formData.get('cta_text') as string) || 'Mám zájem',
    meta_title: getOptionalString(formData, 'meta_title'),
    meta_description: getOptionalString(formData, 'meta_description'),
    published_at: getOptionalString(formData, 'published_at'),
    is_active: formData.get('is_active') === 'on',
    sort_order: parseInt(formData.get('sort_order') as string) || 0,
  }

  // Parse JSON fields if they exist
  let parsedData: any = { ...data }

  if (data.pricing_details) {
    try {
      parsedData.pricing_details = JSON.parse(data.pricing_details)
    } catch (e) {
      throw new Error('Neplatný formát pricing_details (musí být platný JSON)')
    }
  }

  if (data.conditions) {
    try {
      parsedData.conditions = JSON.parse(data.conditions)
    } catch (e) {
      throw new Error('Neplatný formát conditions (musí být platný JSON)')
    }
  }

  // Validate with Zod schema
  let validatedData
  try {
    validatedData = offerSchema.parse(parsedData)
  } catch (error: any) {
    // Format Zod errors into readable message
    if (error.errors) {
      const errorMessages = error.errors.map((err: any) => `${err.path.join('.')}: ${err.message}`).join('\n')
      throw new Error(`Validační chyby:\n${errorMessages}`)
    }
    throw error
  }

  // Update in database
  const { error } = await supabase
    .from('offers')
    // @ts-ignore - Supabase SSR type inference limitation
    .update(validatedData)
    .eq('id', id)

  if (error) {
    throw new Error(`Databázová chyba: ${error.message}`)
  }

  // Revalidate and redirect
  revalidatePath('/admin/offers')
  redirect('/admin/offers')
}

/**
 * Delete an offer
 */
export async function deleteOffer(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('offers')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  // Revalidate but don't redirect (called from list page)
  revalidatePath('/admin/offers')
}
