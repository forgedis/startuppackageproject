import { Badge } from '@/components/ui/badge'
import { ExternalLink } from 'lucide-react'
import type { OfferWithRelations } from '@/types'

interface OfferDetailHeaderProps {
  offer: OfferWithRelations
}

export function OfferDetailHeader({ offer }: OfferDetailHeaderProps) {
  const partner = offer.partner

  return (
    <section className="border-b bg-gradient-to-b from-purple-50 to-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="flex gap-6 items-start">
            {/* Partner Logo - Large */}
            {partner?.logo_url && (
              <div className="flex-shrink-0">
                <img
                  src={partner.logo_url}
                  alt={partner.name}
                  className="h-20 w-20 md:h-24 md:w-24 object-contain rounded-lg border border-border bg-white p-2"
                />
              </div>
            )}

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Nabídka Label */}
              <div className="mb-2 text-sm font-medium text-muted-foreground">
                Nabídka:
              </div>

              {/* Partner Name */}
              {partner && (
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-lg font-semibold text-foreground">
                    {partner.name}
                  </span>
                  {partner.website_url && (
                    <a
                      href={partner.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors"
                      title="Navštívit webové stránky partnera"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
