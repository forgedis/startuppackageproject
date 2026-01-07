'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { deletePartner } from '@/app/actions/partners'

export function DeletePartnerButton({ partnerId }: { partnerId: string }) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Opravdu chcete smazat tohoto partnera? Tato akce je nevratná.')) {
      return
    }

    setLoading(true)
    try {
      await deletePartner(partnerId)
    } catch (error) {
      alert('Chyba při mazání partnera')
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
