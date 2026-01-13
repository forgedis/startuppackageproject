'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import type { OfferWithPartner } from '@/types'

interface OfferCardProps {
  offer: OfferWithPartner
}

export function OfferCard({ offer }: OfferCardProps) {
  const router = useRouter()
  const partner = offer.partner

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
            <div className="mb-3">
              <span className="text-base font-semibold text-foreground">
                {partner.name}
              </span>
            </div>
          )}
          <CardTitle className="text-2xl flex items-center gap-2 mb-4">
            {offer.title_cs}
            {offer.external_program_url && (
              <span title="Otevře se v novém okně">
                <ExternalLink className="h-5 w-5 text-primary flex-shrink-0" />
              </span>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1">
          <div className="prose prose-sm max-w-none mb-6">
            <p className="text-base text-foreground whitespace-pre-line">
              {offer.description_cs}
            </p>
          </div>
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
