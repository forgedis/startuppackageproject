import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { SortablePartnersList } from '@/components/admin/sortable-partners-list'

export default async function PartnersPage() {
  const supabase = await createClient()

  const { data: partners } = await supabase
    .from('partners')
    .select(`
      *,
      offers:offers(count)
    `)
    .order('sort_order')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Partneři</h2>
          <p className="text-muted-foreground">
            Spravujte partnery a jejich nabídky. Přetáhněte partnery pro změnu pořadí.
          </p>
        </div>
        <Link href="/admin/partners/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Přidat partnera
          </Button>
        </Link>
      </div>

      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Celkem partnerů: {partners?.length || 0}
        </p>
      </div>

      {partners && partners.length > 0 ? (
        <SortablePartnersList initialPartners={partners} />
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
          Zatím nemáte žádné partnery. Vytvořte prvního partnera kliknutím na tlačítko výše.
        </div>
      )}
    </div>
  )
}
