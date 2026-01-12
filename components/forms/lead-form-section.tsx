import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import { LeadForm } from './lead-form'
import type { OfferWithRelations } from '@/types'

interface LeadFormSectionProps {
  offer: OfferWithRelations
}

export function LeadFormSection({ offer }: LeadFormSectionProps) {
  // If external program URL is set, show redirect button instead of form
  if (offer.external_program_url) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Mám zájem o tuto nabídku</CardTitle>
          <CardDescription>
            Klikněte na tlačítko níže a budete přesměrováni do programu partnera
          </CardDescription>
        </CardHeader>
        <CardContent>
          <a
            href={offer.external_program_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button className="w-full hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-300 hover:scale-105 transition-all" size="lg">
              <span>{offer.cta_text || 'Přejít na program partnera'}</span>
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </a>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Otevře se v novém okně
          </p>
        </CardContent>
      </Card>
    )
  }

  // Default: show contact form
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mám zájem o tuto nabídku</CardTitle>
        <CardDescription>
          Vyplňte formulář a my vás spojíme s partnerem
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LeadForm
          offerId={offer.id}
          partnerId={offer.partner_id}
          offerTitle={offer.title_cs}
        />
      </CardContent>
    </Card>
  )
}
