import { CategoryForm } from '@/components/admin/category-form'

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Přidat kategorii</h2>
        <p className="text-muted-foreground">
          Vytvořte novou kategorii nabídek
        </p>
      </div>

      <CategoryForm />
    </div>
  )
}
