import type { OfferWithRelations } from '@/types'

interface OfferDetailHeaderProps {
  offer: OfferWithRelations
}

export function OfferDetailHeader({ offer }: OfferDetailHeaderProps) {
  const partner = offer.partner

  return (
    <section className="border-b bg-gradient-to-b from-purple-50 to-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl">
          {/* Partner Logo */}
          {partner?.logo_url && (
            <div className="mb-6">
              <img
                src={partner.logo_url}
                alt={partner.name}
                className="h-20 w-20 md:h-24 md:w-24 object-contain rounded-lg border border-border bg-white p-2"
              />
            </div>
          )}

          {/* Offer Title */}
          <h1 className="mb-6 text-3xl font-bold tracking-tight md:text-5xl">
            {offer.title_cs}
          </h1>
        </div>
      </div>
    </section>
  )
}
