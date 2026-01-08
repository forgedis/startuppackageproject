import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  console.warn('RESEND_API_KEY is not set - emails will not be sent')
}

export const resend = new Resend(process.env.RESEND_API_KEY || 'dummy-key')

export const EMAIL_CONFIG = {
  from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@example.com',
}

type LeadEmailData = {
  firstName: string
  lastName: string
  email: string
  phone?: string
  companyName: string
  note?: string
  partnerName?: string
  offerName?: string
}

export async function sendLeadNotificationToAdmin(leadData: LeadEmailData) {
  if (!process.env.RESEND_API_KEY) {
    console.log('Skipping email - RESEND_API_KEY not configured')
    return { success: false, error: 'Email not configured' }
  }

  try {
    const emailHtml = `
      <h2>Nová poptávka ze Startup Package</h2>

      <h3>Kontaktní údaje:</h3>
      <ul>
        <li><strong>Jméno:</strong> ${leadData.firstName} ${leadData.lastName}</li>
        <li><strong>Email:</strong> ${leadData.email}</li>
        ${leadData.phone ? `<li><strong>Telefon:</strong> ${leadData.phone}</li>` : ''}
        <li><strong>Firma:</strong> ${leadData.companyName}</li>
      </ul>

      ${leadData.partnerName ? `<p><strong>Partner:</strong> ${leadData.partnerName}</p>` : ''}
      ${leadData.offerName ? `<p><strong>Nabídka:</strong> ${leadData.offerName}</p>` : ''}

      ${leadData.note ? `
        <h3>Poznámka:</h3>
        <p>${leadData.note}</p>
      ` : ''}

      <hr>
      <p style="color: #666; font-size: 12px;">
        Tato zpráva byla odeslána z formuláře na startuppackage.cz
      </p>
    `

    const { data, error } = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.adminEmail,
      subject: `Nová poptávka: ${leadData.companyName} - ${leadData.firstName} ${leadData.lastName}`,
      html: emailHtml,
    })

    if (error) {
      console.error('Error sending admin notification email:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error in sendLeadNotificationToAdmin:', error)
    return { success: false, error }
  }
}

export async function sendLeadConfirmationToUser(leadData: LeadEmailData) {
  if (!process.env.RESEND_API_KEY) {
    console.log('Skipping email - RESEND_API_KEY not configured')
    return { success: false, error: 'Email not configured' }
  }

  try {
    const emailHtml = `
      <h2>Děkujeme za váš zájem, ${leadData.firstName}!</h2>

      <p>Vaše poptávka byla úspěšně odeslána. Brzy se vám ozveme.</p>

      <h3>Shrnutí vaší poptávky:</h3>
      <ul>
        <li><strong>Firma:</strong> ${leadData.companyName}</li>
        ${leadData.partnerName ? `<li><strong>Partner:</strong> ${leadData.partnerName}</li>` : ''}
        ${leadData.offerName ? `<li><strong>Nabídka:</strong> ${leadData.offerName}</li>` : ''}
      </ul>

      ${leadData.note ? `
        <h3>Vaše poznámka:</h3>
        <p>${leadData.note}</p>
      ` : ''}

      <hr>
      <p>S pozdravem,<br>Tým Startup Package</p>

      <p style="color: #666; font-size: 12px;">
        Pokud jste tuto poptávku neodeslali vy, ignorujte prosím tento email.
      </p>
    `

    const { data, error } = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: leadData.email,
      subject: 'Potvrzení poptávky - Startup Package',
      html: emailHtml,
    })

    if (error) {
      console.error('Error sending confirmation email:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error in sendLeadConfirmationToUser:', error)
    return { success: false, error }
  }
}
