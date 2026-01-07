'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { createOffer, updateOffer } from '@/app/actions/offers'
import type { Offer } from '@/types'

interface OfferFormProps {
  offer?: Offer
  partners: Array<{ id: string; name: string }>
  categories: Array<{ id: string; name_cs: string }>
}

export function OfferForm({ offer, partners, categories }: OfferFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [slug, setSlug] = useState(offer?.slug || '')

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!offer) {
      setSlug(generateSlug(e.target.value))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)

      if (offer) {
        await updateOffer(offer.id, formData)
      } else {
        await createOffer(formData)
      }
      // Success - redirect happens automatically
    } catch (error) {
      // Check if error is a Next.js redirect (which is expected)
      if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
        // This is a successful redirect, not an error
        throw error
      }
      // Show detailed error message
      const errorMessage = error instanceof Error ? error.message : 'Neznámá chyba'
      alert(`Chyba při ukládání nabídky:\n\n${errorMessage}`)
      console.error('Offer form error:', error)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Základní informace</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title_cs">Název nabídky *</Label>
              <Input
                id="title_cs"
                name="title_cs"
                defaultValue={offer?.title_cs}
                onChange={handleTitleChange}
                placeholder="např. 50% sleva na první měsíc"
                required
                disabled={loading}
              />
              <p className="text-sm text-muted-foreground">
                Hlavní název nabídky, který se zobrazí uživatelům
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL slug *</Label>
              <Input
                id="slug"
                name="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="50-procent-sleva"
                required
                disabled={loading}
              />
              <p className="text-sm text-muted-foreground">
                URL adresa nabídky (bez diakritiky a mezer)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle_cs">Podtitulek</Label>
              <Input
                id="subtitle_cs"
                name="subtitle_cs"
                defaultValue={offer?.subtitle_cs || ''}
                placeholder="Stručné upřesnění nabídky..."
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description_cs">Popis nabídky *</Label>
              <Textarea
                id="description_cs"
                name="description_cs"
                defaultValue={offer?.description_cs}
                placeholder="Detailní popis nabídky, podmínky, výhody..."
                rows={6}
                required
                disabled={loading}
              />
              <p className="text-sm text-muted-foreground">
                Minimálně 50 znaků
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Relationships */}
        <Card>
          <CardHeader>
            <CardTitle>Partner a kategorie</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="partner_id">Partner *</Label>
              <Select
                id="partner_id"
                name="partner_id"
                defaultValue={offer?.partner_id}
                required
                disabled={loading}
              >
                <option value="">Vyberte partnera...</option>
                {partners.map((partner) => (
                  <option key={partner.id} value={partner.id}>
                    {partner.name}
                  </option>
                ))}
              </Select>
              <p className="text-sm text-muted-foreground">
                Partner, který tuto nabídku poskytuje
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category_id">Kategorie</Label>
              <Select
                id="category_id"
                name="category_id"
                defaultValue={offer?.category_id || ''}
                disabled={loading}
              >
                <option value="">Bez kategorie</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name_cs}
                  </option>
                ))}
              </Select>
              <p className="text-sm text-muted-foreground">
                Kategorie, do které nabídka patří (volitelné)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Conditions */}
        <Card>
          <CardHeader>
            <CardTitle>Cenové balíčky a podmínky</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pricing_tier">Cenový balíček</Label>
              <Select
                id="pricing_tier"
                name="pricing_tier"
                defaultValue={offer?.pricing_tier || ''}
                disabled={loading}
              >
                <option value="">Nespecifikováno</option>
                <option value="starter">Starter</option>
                <option value="grower">Grower</option>
                <option value="scaler">Scaler</option>
              </Select>
              <p className="text-sm text-muted-foreground">
                Pro který cenový balíček je nabídka určena
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pricing_details">Cenové detaily (JSON)</Label>
              <Textarea
                id="pricing_details"
                name="pricing_details"
                defaultValue={
                  offer?.pricing_details
                    ? JSON.stringify(offer.pricing_details, null, 2)
                    : ''
                }
                placeholder='{"discount": "50%", "duration": "první měsíc", "original_price": "1000 Kč"}'
                rows={4}
                disabled={loading}
              />
              <p className="text-sm text-muted-foreground">
                Strukturované informace o ceně ve formátu JSON (volitelné)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="conditions">Podmínky (JSON)</Label>
              <Textarea
                id="conditions"
                name="conditions"
                defaultValue={
                  offer?.conditions ? JSON.stringify(offer.conditions, null, 2) : ''
                }
                placeholder='{"validity": "do 31.12.2024", "min_commitment": "3 měsíce"}'
                rows={4}
                disabled={loading}
              />
              <p className="text-sm text-muted-foreground">
                Podmínky platnosti nabídky ve formátu JSON (volitelné)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cta_text">Text tlačítka</Label>
              <Input
                id="cta_text"
                name="cta_text"
                defaultValue={offer?.cta_text || 'Mám zájem'}
                placeholder="Mám zájem"
                disabled={loading}
              />
              <p className="text-sm text-muted-foreground">
                Text zobrazen na tlačítku pro kontakt (výchozí: "Mám zájem")
              </p>
            </div>
          </CardContent>
        </Card>

        {/* SEO & Publishing */}
        <Card>
          <CardHeader>
            <CardTitle>SEO a publikování</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="meta_title">Meta title</Label>
              <Input
                id="meta_title"
                name="meta_title"
                defaultValue={offer?.meta_title || ''}
                placeholder="SEO titulek pro vyhledávače..."
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meta_description">Meta description</Label>
              <Textarea
                id="meta_description"
                name="meta_description"
                defaultValue={offer?.meta_description || ''}
                placeholder="SEO popis pro vyhledávače (max 160 znaků)..."
                rows={3}
                maxLength={160}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="published_at">Datum publikování</Label>
              <Input
                id="published_at"
                name="published_at"
                type="datetime-local"
                defaultValue={
                  offer?.published_at
                    ? new Date(offer.published_at).toISOString().slice(0, 16)
                    : ''
                }
                disabled={loading}
              />
              <p className="text-sm text-muted-foreground">
                Datum a čas zveřejnění nabídky (volitelné)
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_active"
                name="is_active"
                defaultChecked={offer?.is_active !== false}
                disabled={loading}
              />
              <Label htmlFor="is_active" className="cursor-pointer">
                Aktivní (zobrazit na webu)
              </Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button type="submit" disabled={loading}>
            {loading ? 'Ukládám...' : offer ? 'Uložit změny' : 'Vytvořit nabídku'}
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
