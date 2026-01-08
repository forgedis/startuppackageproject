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
import { Edit, Trash2, GripVertical, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { deleteOffer } from '@/app/actions/offers'
import { reorderOffers } from '@/app/actions/reorder'

interface Offer {
  id: string
  slug: string
  title_cs: string
  subtitle_cs: string | null
  is_active: boolean
  sort_order: number
  partner: { name: string } | null
  category: { name_cs: string } | null
}

interface SortableItemProps {
  offer: Offer
  onDelete: (id: string) => void
}

function SortableItem({ offer, onDelete }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: offer.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const handleDelete = async () => {
    if (confirm(`Opravdu chcete smazat nabídku "${offer.title_cs}"?`)) {
      try {
        await deleteOffer(offer.id)
        onDelete(offer.id)
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Chyba při mazání nabídky')
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
                <CardTitle>{offer.title_cs}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {offer.subtitle_cs || 'Bez podtitulku'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {offer.is_active ? (
                <Badge variant="default">Aktivní</Badge>
              ) : (
                <Badge variant="secondary">Neaktivní</Badge>
              )}
              {offer.partner && (
                <Badge variant="outline">
                  {offer.partner.name}
                </Badge>
              )}
              {offer.category && (
                <Badge variant="outline">
                  {offer.category.name_cs}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Link href={`/nabidka/${offer.slug}`} target="_blank">
              <Button variant="ghost" size="sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
            <Link href={`/admin/offers/${offer.id}`}>
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

interface SortableOffersListProps {
  initialOffers: Offer[]
}

export function SortableOffersList({ initialOffers }: SortableOffersListProps) {
  const [offers, setOffers] = useState(initialOffers)
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

    const oldIndex = offers.findIndex((o) => o.id === active.id)
    const newIndex = offers.findIndex((o) => o.id === over.id)

    const newOrder = arrayMove(offers, oldIndex, newIndex)

    // Optimistic update
    setOffers(newOrder)

    // Update sort_order values and send to server
    const updates = newOrder.map((o, index) => ({
      id: o.id,
      sort_order: index,
    }))

    try {
      await reorderOffers(updates)
    } catch (error) {
      // Revert on error
      setOffers(offers)
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
        items={offers.map((o) => o.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {offers.map((offer) => (
            <SortableItem
              key={offer.id}
              offer={offer}
              onDelete={(id) => {
                setOffers(offers.filter((o) => o.id !== id))
              }}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
