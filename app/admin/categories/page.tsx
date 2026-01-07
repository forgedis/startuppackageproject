import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { SortableCategoriesList } from '@/components/admin/sortable-categories-list'

export default async function CategoriesPage() {
  const supabase = await createClient()

  const { data: categories } = await supabase
    .from('categories')
    .select(`
      *,
      offers:offers(count)
    `)
    .order('sort_order')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Kategorie</h2>
          <p className="text-muted-foreground">
            Spravujte kategorie nabídek. Přetáhněte kategorie pro změnu pořadí.
          </p>
        </div>
        <Link href="/admin/categories/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Přidat kategorii
          </Button>
        </Link>
      </div>

      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Celkem kategorií: {categories?.length || 0}
        </p>
      </div>

      {categories && categories.length > 0 ? (
        <SortableCategoriesList initialCategories={categories} />
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
          Zatím nemáte žádné kategorie. Vytvořte první kategorii kliknutím na tlačítko výše.
        </div>
      )}
    </div>
  )
}
