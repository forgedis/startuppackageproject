'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { changePassword } from '@/app/actions/auth'

export function PasswordChangeForm() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validation
    if (newPassword.length < 8) {
      setError('Nové heslo musí mít alespoň 8 znaků')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Nová hesla se neshodují')
      return
    }

    if (currentPassword === newPassword) {
      setError('Nové heslo musí být odlišné od současného')
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('currentPassword', currentPassword)
      formData.append('newPassword', newPassword)

      const result = await changePassword(formData)

      if (result.success) {
        setSuccess('Heslo bylo úspěšně změněno')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        setError(result.error || 'Nepodařilo se změnit heslo')
      }
    } catch (err) {
      setError('Nastala chyba při změně hesla')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="currentPassword">Současné heslo *</Label>
        <Input
          id="currentPassword"
          name="currentPassword"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          disabled={loading}
          placeholder="••••••••"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="newPassword">Nové heslo *</Label>
        <Input
          id="newPassword"
          name="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          disabled={loading}
          placeholder="••••••••"
          minLength={8}
        />
        <p className="text-xs text-muted-foreground">
          Minimálně 8 znaků
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Potvrzení nového hesla *</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={loading}
          placeholder="••••••••"
          minLength={8}
        />
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-md bg-green-50 p-3 text-sm text-green-800 border border-green-200">
          ✓ {success}
        </div>
      )}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Měním heslo...' : 'Změnit heslo'}
      </Button>
    </form>
  )
}
