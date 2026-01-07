import { createClient } from '@/lib/supabase/server'
import { HeroSection } from '@/components/home/hero-section'
import { ValueProposition } from '@/components/home/value-proposition'
import { CategoryGridImproved } from '@/components/home/category-grid-improved'
import { HowItWorks } from '@/components/home/how-it-works'

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch active categories with their offers and partners
  const { data: categories } = await supabase
    .from('categories')
    .select(`
      *,
      offers:offers(
        id,
        partner:partners(name, slug)
      )
    `)
    .eq('is_active', true)
    .eq('offers.is_active', true)
    .not('offers.published_at', 'is', null)
    .order('sort_order')

  return (
    <>
      <HeroSection />
      <ValueProposition />
      {categories && categories.length > 0 && (
        <CategoryGridImproved categories={categories} />
      )}
      <HowItWorks />
    </>
  )
}
