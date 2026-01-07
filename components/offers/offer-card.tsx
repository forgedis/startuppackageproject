import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { OfferWithPartner } from '@/types'

interface OfferCardProps {
  offer: OfferWithPartner
}

export function OfferCard({ offer }: OfferCardProps) {
  const partner = offer.partner

  return (
    <Card className="flex flex-col transition-all hover:shadow-lg">
      <CardHeader>
        {partner?.name && (
          <div className="mb-2 text-sm font-medium text-muted-foreground">
            {partner.name}
          </div>
        )}
        <CardTitle className="text-xl">{offer.title_cs}</CardTitle>
        {offer.subtitle_cs && (
          <CardDescription>{offer.subtitle_cs}</CardDescription>
        )}
      </CardHeader>

      <CardContent className="flex-1">
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {offer.description_cs}
        </p>

        {offer.pricing_tier && (
          <div className="mt-4">
            <Badge variant="secondary" className="capitalize">
              {offer.pricing_tier}
            </Badge>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Link href={`/nabidka/${offer.slug}`} className="w-full">
          <Button className="w-full">
            {offer.cta_text || 'Mám zájem'}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
