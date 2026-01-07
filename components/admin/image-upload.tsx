'use client'

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'

interface ImageUploadProps {
  currentImageUrl?: string | null
  onImageUrlChange: (url: string | null) => void
  bucketName?: string
  label?: string
}

export function ImageUpload({
  currentImageUrl,
  onImageUrlChange,
  bucketName = 'partner-logos',
  label = 'Logo/Obrázek'
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(currentImageUrl)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Prosím nahrajte obrázek')
      return
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Soubor je příliš velký. Maximální velikost je 2MB.')
      return
    }

    setUploading(true)

    try {
      // Create unique file name
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `${fileName}`

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file)

      if (error) {
        throw error
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath)

      setPreview(publicUrl)
      onImageUrlChange(publicUrl)
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Chyba při nahrávání obrázku')
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setPreview(null)
    onImageUrlChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {preview ? (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="h-32 w-32 rounded-lg border object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -right-2 -top-2 h-6 w-6"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed hover:bg-muted"
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading ? (
            <div className="text-center">
              <Upload className="mx-auto h-8 w-8 animate-pulse text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">Nahrávám...</p>
            </div>
          ) : (
            <div className="text-center">
              <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                Klikněte pro nahrání obrázku
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, GIF (max 2MB)
              </p>
            </div>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={uploading}
      />
    </div>
  )
}
