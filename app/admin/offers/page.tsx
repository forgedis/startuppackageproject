import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { SortableOffersList } from '@/components/admin/sortable-offers-list'

export default async function OffersPage() {
  const supabase = await createClient()

  const { data: offers } = await supabase
    .from('offers')
    .select(`
      *,
      partner:partners(name),
      category:categories(name_cs)
    `)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Nabídky</h2>
          <p className="text-muted-foreground">
            Spravujte nabídky pro startupy. Přetáhněte nabídky pro změnu pořadí.
          </p>
        </div>
        <Link href="/admin/offers/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Přidat nabídku
          </Button>
        </Link>
      </div>

      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Celkem nabídek: {offers?.length || 0}
        </p>
      </div>

      {offers && offers.length > 0 ? (
        <SortableOffersList initialOffers={offers} />
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
          Zatím nemáte žádné nabídky. Vytvořte první nabídku kliknutím na tlačítko výše.
        </div>
      )}
    </div>
  )
}
