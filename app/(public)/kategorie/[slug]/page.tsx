import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { OfferCard } from '@/components/offers/offer-card'
import type { Metadata } from 'next'

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

type CategoryMeta = {
  name_cs: string
  description_cs: string | null
}

type Category = {
  id: string
  slug: string
  name_cs: string
  name_en: string
  description_cs: string | null
  icon: string | null
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('name_cs, description_cs')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle()

  const category = data as CategoryMeta | null

  if (error || !category) {
    return {
      title: 'Kategorie nenalezena',
    }
  }

  return {
    title: `${category.name_cs} | StartupPackage`,
    description: category.description_cs || `Nabídky v kategorii ${category.name_cs}`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const supabase = await createClient()

  // Fetch category
  const { data: categoryData, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle()

  if (error || !categoryData) {
    notFound()
  }

  const category = categoryData as Category

  // Fetch offers for this category with partner info
  const { data: offersData } = await supabase
    .from('offers')
    .select(`
      *,
      partner:partners(*)
    `)
    .eq('category_id', category.id)
    .eq('is_active', true)
    .not('published_at', 'is', null)
    .order('partner(sort_order)')

  const offers = (offersData || []) as any[]

  return (
    <div className="min-h-screen">
      {/* Category Header */}
      <section className="border-b bg-muted/50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
              {category.name_cs}
            </h1>
            {category.description_cs && (
              <p className="text-lg text-muted-foreground">
                {category.description_cs}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {offers && offers.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {offers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-lg text-muted-foreground">
                V této kategorii zatím nejsou žádné nabídky.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
