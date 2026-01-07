'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { ImageUpload } from '@/components/admin/image-upload'
import { createPartner, updatePartner } from '@/app/actions/partners'
import type { Partner } from '@/types'

interface PartnerFormProps {
  partner?: Partner
}

export function PartnerForm({ partner }: PartnerFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [slug, setSlug] = useState(partner?.slug || '')
  const [logoUrl, setLogoUrl] = useState<string | null>(partner?.logo_url || null)

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!partner) {
      setSlug(generateSlug(e.target.value))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)

      // Add logo URL to form data
      if (logoUrl) {
        formData.set('logo_url', logoUrl)
      }

      if (partner) {
        await updatePartner(partner.id, formData)
      } else {
        await createPartner(formData)
      }
      // Success - redirect happens automatically
    } catch (error) {
      // Check if error is a Next.js redirect (which is expected)
      if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
        // This is a successful redirect, not an error
        throw error
      }
      // Only show alert for actual errors
      alert('Chyba při ukládání partnera')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Základní informace</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Název partnera *</Label>
              <Input
                id="name"
                name="name"
                defaultValue={partner?.name}
                onChange={handleNameChange}
                placeholder="např. DYPE"
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL slug *</Label>
              <Input
                id="slug"
                name="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="dype"
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="short_description">Krátký popis</Label>
              <Input
                id="short_description"
                name="short_description"
                defaultValue={partner?.short_description || ''}
                placeholder="Jednořádkový popis partnera..."
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="full_description">Podrobný popis</Label>
              <Textarea
                id="full_description"
                name="full_description"
                defaultValue={partner?.full_description || ''}
                placeholder="Podrobný popis partnera a jeho služeb..."
                rows={4}
                disabled={loading}
              />
            </div>

            <ImageUpload
              currentImageUrl={partner?.logo_url}
              onImageUrlChange={setLogoUrl}
              label="Logo partnera"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kontaktní informace</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="website_url">Webová stránka</Label>
              <Input
                id="website_url"
                name="website_url"
                type="url"
                defaultValue={partner?.website_url || ''}
                placeholder="https://www.partner.com"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact_email">Kontaktní email</Label>
              <Input
                id="contact_email"
                name="contact_email"
                type="email"
                defaultValue={partner?.contact_email || ''}
                placeholder="kontakt@partner.com"
                disabled={loading}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nastavení</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sort_order">Pořadí</Label>
              <Input
                id="sort_order"
                name="sort_order"
                type="number"
                defaultValue={partner?.sort_order || 0}
                min={0}
                disabled={loading}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_verified"
                name="is_verified"
                defaultChecked={partner?.is_verified === true}
                disabled={loading}
              />
              <Label htmlFor="is_verified" className="cursor-pointer">
                Ověřený partner
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_featured"
                name="is_featured"
                defaultChecked={partner?.is_featured === true}
                disabled={loading}
              />
              <Label htmlFor="is_featured" className="cursor-pointer">
                Zvýrazněný partner
              </Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button type="submit" disabled={loading}>
            {loading ? 'Ukládám...' : partner ? 'Uložit změny' : 'Vytvořit partnera'}
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
      </div>
    </form>
  )
}
