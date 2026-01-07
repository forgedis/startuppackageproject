import { Badge } from '@/components/ui/badge'
import type { OfferWithRelations } from '@/types'
import { PRICING_TIERS } from '@/lib/constants'

interface OfferDetailHeaderProps {
  offer: OfferWithRelations
}

export function OfferDetailHeader({ offer }: OfferDetailHeaderProps) {
  const partner = offer.partner

  return (
    <section className="border-b bg-gradient-to-b from-purple-50 to-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Partner Name */}
          {partner && (
            <div className="mb-4 text-sm font-medium text-muted-foreground">
              Nabídka od {partner.name}
            </div>
          )}

          {/* Offer Title */}
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
            {offer.title_cs}
          </h1>

          {/* Subtitle */}
          {offer.subtitle_cs && (
            <p className="mb-6 text-xl text-muted-foreground">
              {offer.subtitle_cs}
            </p>
          )}

          {/* Pricing Tier Badge */}
          {offer.pricing_tier && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm capitalize">
                {PRICING_TIERS[offer.pricing_tier as keyof typeof PRICING_TIERS]?.label || offer.pricing_tier}
              </Badge>
              {offer.pricing_tier in PRICING_TIERS && (
                <span className="text-sm text-muted-foreground">
                  {PRICING_TIERS[offer.pricing_tier as keyof typeof PRICING_TIERS].description}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
