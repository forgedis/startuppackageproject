'use server'

import { createClient } from '@/lib/supabase/server'
import { leadSchema, type LeadFormValues } from '@/lib/validations'
import { headers } from 'next/headers'
import { sendLeadNotificationToAdmin, sendLeadConfirmationToUser } from '@/lib/email'

export async function submitLead(
  data: LeadFormValues & {
    offer_id?: string
    partner_id?: string
  }
) {
  try {
    // Validate input
    const validatedData = leadSchema.parse(data)

    // Get client info
    const headersList = await headers()
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || null
    const userAgent = headersList.get('user-agent') || null

    // Get UTM parameters from referrer if available
    const referer = headersList.get('referer') || ''
    const url = new URL(referer || 'http://localhost')
    const utmSource = url.searchParams.get('utm_source')
    const utmMedium = url.searchParams.get('utm_medium')
    const utmCampaign = url.searchParams.get('utm_campaign')

    // Create Supabase client
    const supabase = await createClient()

    // Insert lead
    const { data: lead, error } = await supabase
      .from('leads')
      // @ts-ignore - Supabase SSR type inference limitation
      .insert({
        offer_id: data.offer_id || null,
        partner_id: data.partner_id || null,
        first_name: validatedData.first_name,
        last_name: validatedData.last_name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        company_name: validatedData.company_name,
        note: validatedData.note || null,
        gdpr_consent: validatedData.gdpr_consent,
        marketing_consent: validatedData.marketing_consent || false,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        ip_address: ip,
        user_agent: userAgent,
        status: 'new',
      })
      .select()
      .single()

    if (error) {
      console.error('Error inserting lead:', error)
      return {
        success: false,
        error: 'Nepodařilo se odeslat poptávku. Zkuste to prosím znovu.',
      }
    }

    // Get partner and offer names if available
    let partnerName: string | undefined
    let offerName: string | undefined

    if (data.partner_id) {
      const { data: partner } = await supabase
        .from('partners')
        .select('name')
        .eq('id', data.partner_id)
        .single()
      partnerName = partner?.name
    }

    if (data.offer_id) {
      const { data: offer } = await supabase
        .from('offers')
        .select('title')
        .eq('id', data.offer_id)
        .single()
      offerName = offer?.title
    }

    // Send confirmation email to user only if they selected an offer
    if (data.offer_id && offerName) {
      const emailData = {
        firstName: validatedData.first_name,
        lastName: validatedData.last_name,
        email: validatedData.email,
        phone: validatedData.phone,
        companyName: validatedData.company_name,
        note: validatedData.note,
        partnerName,
        offerName,
      }

      // Send confirmation email in background (don't block the response)
      sendLeadConfirmationToUser(emailData).catch((err) => {
        console.error('Error sending confirmation email:', err)
      })
    }

    return {
      success: true,
      data: lead,
      message: 'Děkujeme! Brzy vás kontaktujeme.',
    }
  } catch (error) {
    console.error('Error submitting lead:', error)
    return {
      success: false,
      error: 'Nepodařilo se odeslat poptávku. Zkontrolujte prosím všechna pole.',
    }
  }
}
