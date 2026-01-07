'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { createCategory, updateCategory } from '@/app/actions/categories'
import type { Category } from '@/types'

interface CategoryFormProps {
  category?: Category
}

export function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [slug, setSlug] = useState(category?.slug || '')

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!category) {
      setSlug(generateSlug(e.target.value))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)

      if (category) {
        await updateCategory(category.id, formData)
      } else {
        await createCategory(formData)
      }
      // Success - redirect happens automatically
    } catch (error) {
      // Check if error is a Next.js redirect (which is expected)
      if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
        // This is a successful redirect, not an error
        throw error
      }
      // Only show alert for actual errors
      alert('Chyba při ukládání kategorie')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Základní informace</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name_cs">Název kategorie *</Label>
            <Input
              id="name_cs"
              name="name_cs"
              defaultValue={category?.name_cs}
              onChange={handleNameChange}
              placeholder="např. Finance & účetnictví"
              required
              disabled={loading}
            />
            <p className="text-sm text-muted-foreground">
              Název kategorie, který se zobrazí uživatelům
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">URL slug *</Label>
            <Input
              id="slug"
              name="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="finance-a-ucetnictvi"
              required
              disabled={loading}
            />
            <p className="text-sm text-muted-foreground">
              URL adresa kategorie (bez diakritiky a mezer)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description_cs">Popis</Label>
            <Textarea
              id="description_cs"
              name="description_cs"
              defaultValue={category?.description_cs || ''}
              placeholder="Stručný popis kategorie..."
              rows={3}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">Ikona (Lucide React)</Label>
            <Input
              id="icon"
              name="icon"
              defaultValue={category?.icon || ''}
              placeholder="DollarSign"
              disabled={loading}
            />
            <p className="text-sm text-muted-foreground">
              Název ikony z Lucide React (např. DollarSign, Code, Users)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sort_order">Pořadí</Label>
            <Input
              id="sort_order"
              name="sort_order"
              type="number"
              defaultValue={category?.sort_order || 0}
              min={0}
              disabled={loading}
            />
            <p className="text-sm text-muted-foreground">
              Pořadí zobrazení (nižší číslo = vyšší pozice)
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_active"
              name="is_active"
              defaultChecked={category?.is_active !== false}
              disabled={loading}
            />
            <Label htmlFor="is_active" className="cursor-pointer">
              Aktivní (zobrazit na webu)
            </Label>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Ukládám...' : category ? 'Uložit změny' : 'Vytvořit kategorii'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={loading}
            >
              Zrušit
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
