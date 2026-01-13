'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, CheckCircle2 } from 'lucide-react'
import type { OfferWithPartner } from '@/types'

interface OfferCardProps {
  offer: OfferWithPartner
}

export function OfferCard({ offer }: OfferCardProps) {
  const router = useRouter()
  const partner = offer.partner
  const conditions = offer.conditions as any

  const handleCardClick = () => {
    router.push(`/nabidka/${offer.slug}`)
  }

  // Split description into lines and filter empty ones
  const descriptionLines = offer.description_cs
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)

  return (
    <div className="block h-full">
      <Card
        className="flex flex-col h-full transition-all hover:shadow-xl hover:shadow-purple-200 hover:border-purple-500 hover:scale-[1.02] cursor-pointer"
        onClick={handleCardClick}
      >
        <CardHeader className="space-y-4 pb-4">
          {/* Partner Name */}
          {partner?.name && (
            <div>
              <span className="text-lg font-bold text-foreground">
                {partner.name}
              </span>
            </div>
          )}

          {/* Offer Title */}
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            {offer.title_cs}
            {offer.external_program_url && (
              <span title="Otevře se v novém okně">
                <ExternalLink className="h-5 w-5 text-primary flex-shrink-0" />
              </span>
            )}
          </CardTitle>
        </CardHeader>

        {/* Offer Description - Main Content */}
        <CardContent className="flex-1 pt-0 space-y-6">
          {/* Nabídka - Main value proposition */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-muted-foreground">Nabídka:</h3>
            <ul className="space-y-2">
              {descriptionLines.map((line, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-base leading-relaxed text-foreground">{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Podmínky - Subtle, smaller */}
          {conditions && (conditions.company_age || conditions.revenue || conditions.employees) && (
            <div className="border-t pt-4">
              <div className="space-y-1">
                {conditions.company_age && (
                  <p className="text-xs text-muted-foreground">
                    Stáří firmy: {conditions.company_age}
                  </p>
                )}
                {conditions.revenue && (
                  <p className="text-xs text-muted-foreground">
                    Obrat: {conditions.revenue}
                  </p>
                )}
                {conditions.employees && (
                  <p className="text-xs text-muted-foreground">
                    Zaměstnanci: {conditions.employees}
                  </p>
                )}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="justify-center pt-6">
          <Button className="w-full max-w-xs text-base py-6 hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-300 hover:scale-105 transition-all">
            {offer.cta_text || 'Mám zájem'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
