import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { CategoryForm } from '@/components/admin/category-form'

interface EditCategoryPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single()

  if (!category) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Upravit kategorii</h2>
        <p className="text-muted-foreground">
          Upravte informace o kategorii
        </p>
      </div>

      <CategoryForm category={category} />
    </div>
  )
}
