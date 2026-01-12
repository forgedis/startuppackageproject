import { ExternalLink, Mail, Phone, User } from 'lucide-react'
import type { Partner } from '@/types'

interface PartnerSectionProps {
  partner: Partner
}

export function PartnerSection({ partner }: PartnerSectionProps) {
  return (
    <div className="rounded-lg border bg-muted/50 p-6">
      <h2 className="mb-4 text-2xl font-bold">O partnerovi</h2>

      <div className="space-y-4">
        {/* Partner Logo and Name */}
        <div className="flex items-center gap-4">
          {partner.logo_url && (
            <img
              src={partner.logo_url}
              alt={partner.name}
              className="h-16 w-16 object-contain rounded-lg border border-border bg-white p-2"
            />
          )}
          <h3 className="text-lg font-semibold">{partner.name}</h3>
        </div>

        {/* Partner Description */}
        <div>
          <p className="text-muted-foreground">
            {partner.full_description || partner.short_description}
          </p>
        </div>

        {/* Contact Information */}
        <div className="space-y-2 border-t pt-4">
          <h4 className="font-semibold text-sm mb-3">Kontaktní informace:</h4>

          {partner.contact_person && (
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="text-foreground">{partner.contact_person}</span>
            </div>
          )}

          {partner.contact_phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <a
                href={`tel:${partner.contact_phone}`}
                className="text-primary hover:underline"
              >
                {partner.contact_phone}
              </a>
            </div>
          )}

          {partner.contact_email && (
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
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
              <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
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
