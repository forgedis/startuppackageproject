'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const categorySchema = z.object({
  name_cs: z.string().min(1, 'Název je povinný'),
  slug: z.string().min(1, 'Slug je povinný'),
  description_cs: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  is_active: z.boolean().default(true),
  sort_order: z.number().int().min(0).default(0),
})

export async function createCategory(formData: FormData) {
  const supabase = await createClient()

  const data = {
    name_cs: formData.get('name_cs') as string,
    slug: formData.get('slug') as string,
    description_cs: (formData.get('description_cs') as string) || null,
    icon: (formData.get('icon') as string) || null,
    is_active: formData.get('is_active') === 'on',
    sort_order: parseInt(formData.get('sort_order') as string) || 0,
  }

  const validatedData = categorySchema.parse(data)

  // Type assertion needed due to Supabase SSR type inference issue
  // Data is validated by Zod schema above
  const { error } = await supabase
    .from('categories')
    // @ts-ignore - Supabase SSR type inference limitation
    .insert(validatedData)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/categories')
  redirect('/admin/categories')
}

export async function updateCategory(id: string, formData: FormData) {
  const supabase = await createClient()

  const data = {
    name_cs: formData.get('name_cs') as string,
    slug: formData.get('slug') as string,
    description_cs: (formData.get('description_cs') as string) || null,
    icon: (formData.get('icon') as string) || null,
    is_active: formData.get('is_active') === 'on',
    sort_order: parseInt(formData.get('sort_order') as string) || 0,
  }

  const validatedData = categorySchema.parse(data)

  // Type assertion needed due to Supabase SSR type inference issue
  // Data is validated by Zod schema above
  const { error } = await supabase
    .from('categories')
    // @ts-ignore - Supabase SSR type inference limitation
    .update(validatedData)
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/categories')
  redirect('/admin/categories')
}

export async function deleteCategory(id: string) {
  const supabase = await createClient()

  // Check if category has any offers
  const { data: offers, error: checkError } = await supabase
    .from('offers')
    .select('id')
    .eq('category_id', id)
    .limit(1)

  if (checkError) {
    throw new Error(`Chyba při kontrole vazeb: ${checkError.message}`)
  }

  if (offers && offers.length > 0) {
    throw new Error('Nelze smazat kategorii, která má přiřazené nabídky. Nejprve smažte nebo přesuňte všechny nabídky.')
  }

  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(`Chyba při mazání: ${error.message}`)
  }

  revalidatePath('/admin/categories')
}
