import { ExternalLink, Mail } from 'lucide-react'
import type { Partner } from '@/types'

interface PartnerSectionProps {
  partner: Partner
}

export function PartnerSection({ partner }: PartnerSectionProps) {
  return (
    <div className="rounded-lg border bg-muted/50 p-6">
      <h2 className="mb-4 text-2xl font-bold">O partnerovi</h2>

      <div className="space-y-4">
        <div>
          <h3 className="mb-2 text-lg font-semibold">{partner.name}</h3>
          <p className="text-muted-foreground">
            {partner.full_description || partner.short_description}
          </p>
        </div>

        {/* Contact Information */}
        <div className="space-y-2 border-t pt-4">
          <h4 className="font-semibold text-sm">Kontaktní informace:</h4>

          {partner.contact_email && (
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a
                href={`mailto:${partner.contact_email}`}
                className="text-primary hover:underline"
              >
                {partner.contact_email}
              </a>
            </div>
          )}

          {partner.website_url && (
            <div className="flex items-center gap-2 text-sm">
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
              <a
                href={partner.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {partner.website_url.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
