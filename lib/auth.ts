import { createClient } from '@/lib/supabase/server'

export async function getAuthUser() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  return user
}

export async function isAdmin() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return false
  }

  // Check if user exists in admin_users table
  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('id')
    .eq('email', user.email || '')
    .eq('is_active', true)
    .single()

  return !!adminUser
}
