'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { leadSchema, type LeadFormValues } from '@/lib/validations'
import { submitLead } from '@/app/actions/leads'
import { Loader2 } from 'lucide-react'

interface LeadFormProps {
  offerId: string
  partnerId: string
  offerTitle: string
}

export function LeadForm({ offerId, partnerId, offerTitle }: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
  })

  const onSubmit = async (data: LeadFormValues) => {
    setIsSubmitting(true)

    try {
      const result = await submitLead({
        ...data,
        offer_id: offerId,
        partner_id: partnerId,
      })

      if (result.success) {
        toast.success(result.message || 'Děkujeme! Brzy vás kontaktujeme.')
        setIsSuccess(true)
        reset()
      } else {
        toast.error(result.error || 'Nepodařilo se odeslat poptávku.')
      }
    } catch (error) {
      toast.error('Došlo k chybě. Zkuste to prosím znovu.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="rounded-lg bg-green-50 p-6 text-center">
        <div className="mb-2 text-2xl">✅</div>
        <h3 className="mb-2 font-semibold text-green-900">Poptávka odeslána!</h3>
        <p className="text-sm text-green-800">
          Partner vás brzy kontaktuje s dalšími informacemi.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* First Name */}
      <div>
        <Label htmlFor="first_name">
          Jméno <span className="text-destructive">*</span>
        </Label>
        <Input
          id="first_name"
          {...register('first_name')}
          placeholder="Jan"
          disabled={isSubmitting}
        />
        {errors.first_name && (
          <p className="mt-1 text-sm text-destructive">
            {errors.first_name.message}
          </p>
        )}
      </div>

      {/* Last Name */}
      <div>
        <Label htmlFor="last_name">
          Příjmení <span className="text-destructive">*</span>
        </Label>
        <Input
          id="last_name"
          {...register('last_name')}
          placeholder="Novák"
          disabled={isSubmitting}
        />
        {errors.last_name && (
          <p className="mt-1 text-sm text-destructive">
            {errors.last_name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email">
          Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="jan.novak@example.com"
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <Label htmlFor="phone">Telefon</Label>
        <Input
          id="phone"
          {...register('phone')}
          placeholder="+420 123 456 789"
          disabled={isSubmitting}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>
        )}
      </div>

      {/* Company Name */}
      <div>
        <Label htmlFor="company_name">
          Název firmy <span className="text-destructive">*</span>
        </Label>
        <Input
          id="company_name"
          {...register('company_name')}
          placeholder="Můj Startup s.r.o."
          disabled={isSubmitting}
        />
        {errors.company_name && (
          <p className="mt-1 text-sm text-destructive">
            {errors.company_name.message}
          </p>
        )}
      </div>

      {/* Note */}
      <div>
        <Label htmlFor="note">Poznámka</Label>
        <Textarea
          id="note"
          {...register('note')}
          placeholder="Něco nám o vašem startupu..."
          rows={3}
          disabled={isSubmitting}
        />
        {errors.note && (
          <p className="mt-1 text-sm text-destructive">{errors.note.message}</p>
        )}
      </div>

      {/* GDPR Consent */}
      <div className="flex items-start space-x-2">
        <Checkbox
          id="gdpr_consent"
          {...register('gdpr_consent')}
          disabled={isSubmitting}
        />
        <Label
          htmlFor="gdpr_consent"
          className="text-sm font-normal leading-tight"
        >
          Souhlasím se zpracováním osobních údajů{' '}
          <span className="text-destructive">*</span>
        </Label>
      </div>
      {errors.gdpr_consent && (
        <p className="text-sm text-destructive">{errors.gdpr_consent.message}</p>
      )}

      {/* Marketing Consent */}
      <div className="flex items-start space-x-2">
        <Checkbox
          id="marketing_consent"
          {...register('marketing_consent')}
          disabled={isSubmitting}
        />
        <Label
          htmlFor="marketing_consent"
          className="text-sm font-normal leading-tight"
        >
          Chci dostávat novinky o dalších nabídkách
        </Label>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isSubmitting ? 'Odesílám...' : 'Odeslat poptávku'}
      </Button>

      <p className="text-xs text-muted-foreground">
        Vaše poptávka bude odeslána přímo partnerovi. Partner vás bude
        kontaktovat s dalšími informacemi.
      </p>
    </form>
  )
}
