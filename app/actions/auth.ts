'use server'

import { createClient } from '@/lib/supabase/server'

export async function changePassword(formData: FormData) {
  const currentPassword = formData.get('currentPassword') as string
  const newPassword = formData.get('newPassword') as string

  if (!currentPassword || !newPassword) {
    return { success: false, error: 'Všechna pole jsou povinná' }
  }

  if (newPassword.length < 8) {
    return { success: false, error: 'Nové heslo musí mít alespoň 8 znaků' }
  }

  const supabase = await createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || !user.email) {
    return { success: false, error: 'Uživatel není přihlášen' }
  }

  // Verify current password by attempting to sign in
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  })

  if (signInError) {
    return { success: false, error: 'Současné heslo je nesprávné' }
  }

  // Update password
  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (updateError) {
    return { success: false, error: 'Nepodařilo se změnit heslo' }
  }

  return { success: true }
}
