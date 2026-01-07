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
import { deletePartner } from '@/app/actions/partners'
import { reorderPartners } from '@/app/actions/reorder'

interface Partner {
  id: string
  slug: string
  name: string
  short_description: string | null
  logo_url: string | null
  website_url: string | null
  is_active: boolean
  sort_order: number
  offers?: Array<{ count: number }>
}

interface SortableItemProps {
  partner: Partner
  onDelete: (id: string) => void
}

function SortableItem({ partner, onDelete }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: partner.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const handleDelete = async () => {
    if (confirm(`Opravdu chcete smazat partnera "${partner.name}"?`)) {
      try {
        await deletePartner(partner.id)
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Chyba při mazání partnera')
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
              {partner.logo_url && (
                <img
                  src={partner.logo_url}
                  alt={partner.name}
                  className="h-12 w-12 rounded object-contain"
                />
              )}
              <div>
                <CardTitle>{partner.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {partner.short_description || 'Bez popisu'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {partner.offers?.[0]?.count || 0} nabídek
              </Badge>
              {partner.is_active ? (
                <Badge variant="default">Aktivní</Badge>
              ) : (
                <Badge variant="secondary">Neaktivní</Badge>
              )}
              {partner.website_url && (
                <Badge variant="outline">
                  Web: {new URL(partner.website_url).hostname}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Link href={`/admin/partners/${partner.id}`}>
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

interface SortablePartnersListProps {
  initialPartners: Partner[]
}

export function SortablePartnersList({ initialPartners }: SortablePartnersListProps) {
  const [partners, setPartners] = useState(initialPartners)
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

    const oldIndex = partners.findIndex((p) => p.id === active.id)
    const newIndex = partners.findIndex((p) => p.id === over.id)

    const newOrder = arrayMove(partners, oldIndex, newIndex)

    // Optimistic update
    setPartners(newOrder)

    // Update sort_order values and send to server
    const updates = newOrder.map((p, index) => ({
      id: p.id,
      sort_order: index,
    }))

    try {
      await reorderPartners(updates)
    } catch (error) {
      // Revert on error
      setPartners(partners)
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
        items={partners.map((p) => p.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {partners.map((partner) => (
            <SortableItem
              key={partner.id}
              partner={partner}
              onDelete={(id) => {
                setPartners(partners.filter((p) => p.id !== id))
              }}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
