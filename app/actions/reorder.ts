'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

interface ReorderItem {
  id: string
  sort_order: number
}

/**
 * Reorder categories by updating their sort_order values
 */
export async function reorderCategories(items: ReorderItem[]) {
  const supabase = await createClient()

  try {
    // Update each category's sort_order
    const updates = items.map((item) =>
      supabase
        .from('categories')
        // @ts-ignore - Supabase SSR type inference limitation
        .update({ sort_order: item.sort_order })
        .eq('id', item.id)
    )

    const results = await Promise.all(updates)

    // Check for errors
    const errors = results.filter((result: { error: unknown }) => result.error)
    if (errors.length > 0) {
      throw new Error(`Chyba při změně pořadí: ${errors[0].error?.message}`)
    }

    // Revalidate paths
    revalidatePath('/admin/categories')
    revalidatePath('/')
  } catch (error) {
    console.error('Reorder categories error:', error)
    throw error
  }
}

/**
 * Reorder partners by updating their sort_order values
 */
export async function reorderPartners(items: ReorderItem[]) {
  const supabase = await createClient()

  try {
    const updates = items.map((item) =>
      supabase
        .from('partners')
        // @ts-ignore - Supabase SSR type inference limitation
        .update({ sort_order: item.sort_order })
        .eq('id', item.id)
    )

    const results = await Promise.all(updates)

    const errors = results.filter((result: { error: unknown }) => result.error)
    if (errors.length > 0) {
      throw new Error(`Chyba při změně pořadí: ${errors[0].error?.message}`)
    }

    revalidatePath('/admin/partners')
    revalidatePath('/')
  } catch (error) {
    console.error('Reorder partners error:', error)
    throw error
  }
}

/**
 * Reorder offers by updating their sort_order values
 */
export async function reorderOffers(items: ReorderItem[]) {
  const supabase = await createClient()

  try {
    const updates = items.map((item) =>
      supabase
        .from('offers')
        // @ts-ignore - Supabase SSR type inference limitation
        .update({ sort_order: item.sort_order })
        .eq('id', item.id)
    )

    const results = await Promise.all(updates)

    const errors = results.filter((result: { error: unknown }) => result.error)
    if (errors.length > 0) {
      throw new Error(`Chyba při změně pořadí: ${errors[0].error?.message}`)
    }

    revalidatePath('/admin/offers')
    revalidatePath('/')
  } catch (error) {
    console.error('Reorder offers error:', error)
    throw error
  }
}
