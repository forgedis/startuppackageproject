'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { deleteCategory } from '@/app/actions/categories'

export function DeleteCategoryButton({ categoryId }: { categoryId: string }) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Opravdu chcete smazat tuto kategorii? Tato akce je nevratná.')) {
      return
    }

    setLoading(true)
    try {
      await deleteCategory(categoryId)
    } catch (error) {
      alert('Chyba při mazání kategorie')
      setLoading(false)
    }
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={loading}
    >
      <Trash2 className="mr-2 h-4 w-4" />
      Smazat
    </Button>
  )
}
