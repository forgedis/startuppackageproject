import { PartnerForm } from '@/components/admin/partner-form'

export default function NewPartnerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Přidat partnera</h2>
        <p className="text-muted-foreground">
          Zaregistrujte nového partnera do systému
        </p>
      </div>

      <PartnerForm />
    </div>
  )
}
