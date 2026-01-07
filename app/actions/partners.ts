'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const partnerSchema = z.object({
  name: z.string().min(1, 'Název je povinný'),
  slug: z.string().min(1, 'Slug je povinný'),
  short_description: z.string().optional().nullable(),
  full_description: z.string().optional().nullable(),
  logo_url: z.string().url('URL musí být validní (např. https://example.com)').optional().nullable(),
  website_url: z.string().url('URL musí začínat https:// (např. https://www.test.com)').optional().nullable(),
  contact_email: z.string().email('Neplatný formát emailu').optional().nullable(),
  is_verified: z.boolean().default(false),
  is_featured: z.boolean().default(false),
  sort_order: z.number().int().min(0).default(0),
})

export async function createPartner(formData: FormData) {
  const supabase = await createClient()

  const data = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
    short_description: formData.get('short_description') as string || null,
    full_description: formData.get('full_description') as string || null,
    logo_url: formData.get('logo_url') as string || null,
    website_url: formData.get('website_url') as string || null,
    contact_email: formData.get('contact_email') as string || null,
    is_verified: formData.get('is_verified') === 'on',
    is_featured: formData.get('is_featured') === 'on',
    sort_order: parseInt(formData.get('sort_order') as string) || 0,
  }

  const validatedData = partnerSchema.parse(data)

  const { error } = await supabase
    .from('partners')
    // @ts-ignore - Supabase SSR type inference limitation
    .insert(validatedData)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/partners')
  redirect('/admin/partners')
}

export async function updatePartner(id: string, formData: FormData) {
  const supabase = await createClient()

  const data = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
    short_description: formData.get('short_description') as string || null,
    full_description: formData.get('full_description') as string || null,
    logo_url: formData.get('logo_url') as string || null,
    website_url: formData.get('website_url') as string || null,
    contact_email: formData.get('contact_email') as string || null,
    is_verified: formData.get('is_verified') === 'on',
    is_featured: formData.get('is_featured') === 'on',
    sort_order: parseInt(formData.get('sort_order') as string) || 0,
  }

  const validatedData = partnerSchema.parse(data)

  const { error } = await supabase
    .from('partners')
    // @ts-ignore - Supabase SSR type inference limitation
    .update(validatedData)
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/partners')
  redirect('/admin/partners')
}

export async function deletePartner(id: string) {
  const supabase = await createClient()

  // Check if partner has any offers
  const { data: offers, error: checkError } = await supabase
    .from('offers')
    .select('id')
    .eq('partner_id', id)
    .limit(1)

  if (checkError) {
    throw new Error(`Chyba při kontrole vazeb: ${checkError.message}`)
  }

  if (offers && offers.length > 0) {
    throw new Error('Nelze smazat partnera, který má přiřazené nabídky. Nejprve smažte všechny nabídky tohoto partnera.')
  }

  const { error } = await supabase
    .from('partners')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(`Chyba při mazání: ${error.message}`)
  }

  revalidatePath('/admin/partners')
}
