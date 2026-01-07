import { createClient } from '@/lib/supabase/server'
import { OfferForm } from '@/components/admin/offer-form'

export default async function NewOfferPage() {
  const supabase = await createClient()

  // Fetch all partners
  const { data: partners } = await supabase
    .from('partners')
    .select('id, name')
    .order('name')

  // Fetch all categories
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name_cs')
    .order('name_cs')

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Přidat nabídku</h2>
        <p className="text-muted-foreground">
          Vytvořte novou nabídku pro startupy
        </p>
      </div>

      <OfferForm partners={partners || []} categories={categories || []} />
    </div>
  )
}
