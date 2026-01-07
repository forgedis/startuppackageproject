import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LeadForm } from './lead-form'
import type { OfferWithRelations } from '@/types'

interface LeadFormSectionProps {
  offer: OfferWithRelations
}

export function LeadFormSection({ offer }: LeadFormSectionProps) {
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
