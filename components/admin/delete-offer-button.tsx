'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { deleteOffer } from '@/app/actions/offers'

export function DeleteOfferButton({ offerId }: { offerId: string }) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Opravdu chcete smazat tuto nabídku? Tato akce je nevratná.')) {
      return
    }

    setLoading(true)
    try {
      await deleteOffer(offerId)
    } catch (error) {
      alert('Chyba při mazání nabídky')
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
