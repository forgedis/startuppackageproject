import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { OfferDetailHeader } from '@/components/offers/offer-detail-header'
import { OfferDescription } from '@/components/offers/offer-description'
import { OfferConditions } from '@/components/offers/offer-conditions'
import { PartnerSection } from '@/components/partners/partner-section'
import { LeadFormSection } from '@/components/forms/lead-form-section'
import type { Metadata } from 'next'

interface OfferPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: OfferPageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: offerData, error } = await supabase
    .from('offers')
    .select(`
      *,
      partner:partners(*)
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .not('published_at', 'is', null)
    .maybeSingle()

  const offer = offerData as any

  if (error || !offer) {
    return {
      title: 'Nabídka nenalezena',
    }
  }

  return {
    title: offer.meta_title || `${offer.title_cs} | StartupPackage`,
    description: offer.meta_description || offer.subtitle_cs || offer.description_cs.substring(0, 160),
    openGraph: {
      title: offer.title_cs,
      description: offer.subtitle_cs || offer.description_cs.substring(0, 160),
      images: offer.partner?.logo_url ? [offer.partner.logo_url] : [],
    },
  }
}

export default async function OfferPage({ params }: OfferPageProps) {
  const { slug } = await params
  const supabase = await createClient()

  // Fetch offer with partner info
  const { data: offerData, error } = await supabase
    .from('offers')
    .select(`
      *,
      partner:partners(*),
      category:categories(*)
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .not('published_at', 'is', null)
    .maybeSingle()

  const offer = offerData as any

  if (error || !offer) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Offer Header */}
      <OfferDetailHeader offer={offer} />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Lead Form (last on mobile, first on desktop) */}
            <div className="order-last lg:order-first lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <LeadFormSection offer={offer} />
              </div>
            </div>

            {/* Right Column - Main Content (first on mobile) */}
            <div className="order-first lg:order-last lg:col-span-2 space-y-8">
              {/* Offer Description */}
              <OfferDescription description={offer.description_cs} />

              {/* Conditions */}
              {offer.conditions && (
                <OfferConditions conditions={offer.conditions} />
              )}

              {/* Partner Section */}
              {offer.partner && (
                <PartnerSection partner={offer.partner} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
