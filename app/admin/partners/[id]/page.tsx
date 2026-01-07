import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PartnerForm } from '@/components/admin/partner-form'

interface EditPartnerPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditPartnerPage({ params }: EditPartnerPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: partner } = await supabase
    .from('partners')
    .select('*')
    .eq('id', id)
    .single()

  if (!partner) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Upravit partnera</h2>
        <p className="text-muted-foreground">
          Upravte informace o partnerovi
        </p>
      </div>

      <PartnerForm partner={partner} />
    </div>
  )
}
