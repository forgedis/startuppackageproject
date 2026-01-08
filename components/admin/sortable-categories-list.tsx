'use client'

import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, GripVertical } from 'lucide-react'
import Link from 'next/link'
import { deleteCategory } from '@/app/actions/categories'
import { reorderCategories } from '@/app/actions/reorder'

interface Category {
  id: string
  slug: string
  name_cs: string
  name_en: string
  is_active: boolean
  sort_order: number
  offers?: Array<{ count: number }>
}

interface SortableItemProps {
  category: Category
  onDelete: (id: string) => void
}

function SortableItem({ category, onDelete }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const handleDelete = async () => {
    if (confirm(`Opravdu chcete smazat kategorii "${category.name_cs}"?`)) {
      try {
        await deleteCategory(category.id)
        onDelete(category.id)
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Chyba při mazání kategorie')
      }
    }
  }

  return (
    <div ref={setNodeRef} style={style}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                className="cursor-grab active:cursor-grabbing p-1 hover:bg-accent rounded"
                {...attributes}
                {...listeners}
              >
                <GripVertical className="h-5 w-5 text-muted-foreground" />
              </button>
              <div>
                <CardTitle>{category.name_cs}</CardTitle>
                <p className="text-sm text-muted-foreground">{category.name_en}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {category.offers?.[0]?.count || 0} nabídek
              </Badge>
              {category.is_active ? (
                <Badge variant="default">Aktivní</Badge>
              ) : (
                <Badge variant="secondary">Neaktivní</Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Link href={`/admin/categories/${category.id}`}>
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Upravit
              </Button>
            </Link>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Smazat
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface SortableCategoriesListProps {
  initialCategories: Category[]
}

export function SortableCategoriesList({ initialCategories }: SortableCategoriesListProps) {
  const [categories, setCategories] = useState(initialCategories)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) {
      return
    }

    const oldIndex = categories.findIndex((cat) => cat.id === active.id)
    const newIndex = categories.findIndex((cat) => cat.id === over.id)

    const newOrder = arrayMove(categories, oldIndex, newIndex)

    // Optimistic update
    setCategories(newOrder)

    // Update sort_order values and send to server
    const updates = newOrder.map((cat, index) => ({
      id: cat.id,
      sort_order: index,
    }))

    try {
      await reorderCategories(updates)
    } catch (error) {
      // Revert on error
      setCategories(categories)
      alert('Chyba při změně pořadí. Zkuste to prosím znovu.')
      console.error('Reorder error:', error)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={categories.map((cat) => cat.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {categories.map((category) => (
            <SortableItem
              key={category.id}
              category={category}
              onDelete={(id) => {
                setCategories(categories.filter((cat) => cat.id !== id))
              }}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
