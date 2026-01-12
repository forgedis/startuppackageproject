import { createClient } from '@/lib/supabase/server'
import { HeroSection } from '@/components/home/hero-section'
import { ValueProposition } from '@/components/home/value-proposition'
import { CategoryGridImproved } from '@/components/home/category-grid-improved'

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch active categories
  const { data: allCategories } = await supabase
    .from('categories')
    .select(`
      *,
      offers:offers!category_id(
        id,
        is_active,
        published_at,
        partner:partner_id(name, slug)
      )
    `)
    .eq('is_active', true)
    .order('sort_order')

  // Filter to show only active and published offers
  const categories = (allCategories || []).map((cat: any) => ({
    ...cat,
    offers: cat.offers?.filter((offer: any) =>
      offer.is_active === true &&
      offer.published_at !== null &&
      offer.partner !== null
    ) || []
  }))

  return (
    <>
      <HeroSection />
      <ValueProposition />
      {categories && categories.length > 0 && (
        <CategoryGridImproved categories={categories} />
      )}
    </>
  )
}
