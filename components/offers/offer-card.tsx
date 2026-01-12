'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Mail, Phone, Globe } from 'lucide-react'
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

  return (
    <div className="block h-full">
      <Card
        className="flex flex-col h-full transition-all hover:shadow-xl hover:shadow-purple-200 hover:border-purple-500 hover:scale-[1.02] cursor-pointer"
        onClick={handleCardClick}
      >
        <CardHeader>
          {partner?.name && (
            <div className="mb-2 flex items-center gap-2">
              {partner.logo_url && (
                <img
                  src={partner.logo_url}
                  alt={partner.name}
                  className="h-6 w-6 object-contain rounded"
                />
              )}
              <span className="text-sm font-medium text-muted-foreground">
                {partner.name}
              </span>
              {partner.website_url && (
                <a
                  href={partner.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-primary hover:text-primary/80 transition-colors ml-auto"
                  title="Navštívit webové stránky partnera"
                >
                  <Globe className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          )}
          <CardTitle className="text-xl flex items-center gap-2">
            {offer.title_cs}
            {offer.external_program_url && (
              <ExternalLink className="h-4 w-4 text-primary flex-shrink-0" title="Otevře se v novém okně" />
            )}
          </CardTitle>
          {offer.subtitle_cs && (
            <CardDescription>{offer.subtitle_cs}</CardDescription>
          )}
        </CardHeader>

        <CardContent className="flex-1">
          <p className="line-clamp-3 text-sm text-muted-foreground mb-4">
            {offer.description_cs}
          </p>

          {conditions && (
            <div className="space-y-1 mb-4">
              {conditions.company_age && (
                <p className="text-xs text-muted-foreground">
                  📅 Stáří firmy: {conditions.company_age}
                </p>
              )}
              {conditions.revenue && (
                <p className="text-xs text-muted-foreground">
                  💰 Obrat: {conditions.revenue}
                </p>
              )}
              {conditions.employees && (
                <p className="text-xs text-muted-foreground">
                  👥 Zaměstnanci: {conditions.employees}
                </p>
              )}
            </div>
          )}

          {/* Partner Contact Info */}
          {partner && (partner.contact_email || partner.contact_phone) && (
            <div className="space-y-1 border-t pt-3 mt-3">
              {partner.contact_email && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Mail className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{partner.contact_email}</span>
                </div>
              )}
              {partner.contact_phone && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Phone className="h-3 w-3 flex-shrink-0" />
                  <span>{partner.contact_phone}</span>
                </div>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="justify-center">
          <Button className="px-8 hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-300 hover:scale-105 transition-all">
            {offer.cta_text || 'Mám zájem'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
