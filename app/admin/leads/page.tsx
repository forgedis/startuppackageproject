import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'
import { cs } from 'date-fns/locale'
import type { Database } from '@/types/database'

type Lead = Database['public']['Tables']['leads']['Row'] & {
  offer: { title_cs: string } | null
  partner: { name: string } | null
}

export default async function LeadsPage() {
  const supabase = await createClient()

  const { data: leads } = await supabase
    .from('leads')
    .select(`
      *,
      offer:offers(title_cs),
      partner:partners(name)
    `)
    .order('created_at', { ascending: false })

  const statusLabels = {
    new: 'Nová',
    contacted: 'Kontaktováno',
    qualified: 'Kvalifikováno',
    converted: 'Konvertováno',
    rejected: 'Zamítnuto',
  }

  const statusVariants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    new: 'default',
    contacted: 'secondary',
    qualified: 'default',
    converted: 'default',
    rejected: 'destructive',
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Poptávky</h2>
        <p className="text-muted-foreground">
          Přehled všech poptávek od startupů
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Všechny poptávky ({leads?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {leads && leads.length > 0 ? (
            <div className="space-y-2">
              {leads.map((lead: Lead) => (
                <div
                  key={lead.id}
                  className="rounded-lg border p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">
                          {lead.first_name} {lead.last_name}
                        </h3>
                        <Badge variant={statusVariants[lead.status] || 'outline'}>
                          {statusLabels[lead.status as keyof typeof statusLabels] || lead.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {lead.email} • {lead.phone || 'Bez telefonu'}
                      </p>
                      {lead.company_name && (
                        <p className="text-sm font-medium">
                          Společnost: {lead.company_name}
                        </p>
                      )}
                      {lead.note && (
                        <p className="mt-2 text-sm">
                          {lead.note}
                        </p>
                      )}
                      <div className="mt-2 flex gap-2">
                        {lead.offer && (
                          <Badge variant="outline">
                            {lead.offer.title_cs}
                          </Badge>
                        )}
                        {lead.partner && (
                          <Badge variant="outline">
                            {lead.partner.name}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(lead.created_at), {
                        addSuffix: true,
                        locale: cs,
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              Zatím nemáte žádné poptávky.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
