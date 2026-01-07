import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { OfferForm } from '@/components/admin/offer-form'

interface EditOfferPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditOfferPage({ params }: EditOfferPageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch the specific offer
  const { data: offer } = await supabase
    .from('offers')
    .select('*')
    .eq('id', id)
    .single()

  if (!offer) {
    notFound()
  }

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
        <h2 className="text-3xl font-bold tracking-tight">Upravit nabídku</h2>
        <p className="text-muted-foreground">
          Upravte informace o nabídce
        </p>
      </div>

      <OfferForm
        offer={offer}
        partners={partners || []}
        categories={categories || []}
      />
    </div>
  )
}
