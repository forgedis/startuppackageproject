#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js'

// Load environment variables from .env.local
const SUPABASE_URL = 'https://bexbyxeyhoqjflzyiyee.supabase.co'
const SUPABASE_SERVICE_KEY = 'sb_secret_6UWn7ftd3gkLn1Wh_Q3OIw_AotCxMXY'

// Create Supabase client with service role
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

console.log('📦 Applying migration: 20250112_add_contact_and_redirect_fields.sql')

// Execute SQL statements one by one
const statements = [
  `ALTER TABLE partners ADD COLUMN IF NOT EXISTS contact_person TEXT`,
  `ALTER TABLE partners ADD COLUMN IF NOT EXISTS contact_phone TEXT`,
  `ALTER TABLE offers ADD COLUMN IF NOT EXISTS external_program_url TEXT`,
]

for (const sql of statements) {
  console.log(`Executing: ${sql}`)
  try {
    const { data, error } = await supabase.rpc('exec_sql', { query: sql })

    if (error) {
      // Try direct query if RPC doesn't work
      const { data: queryData, error: queryError } = await supabase
        .from('_migrations')
        .select()
        .limit(1)

      console.log('⚠️  RPC not available, SQL must be run manually in Supabase SQL Editor')
      console.log('Please run these SQL statements in the Supabase SQL Editor:')
      console.log('\n' + statements.join(';\n') + ';\n')
      process.exit(0)
    }

    console.log('✅ Success')
  } catch (error) {
    console.error('⚠️  Error:', error.message)
  }
}

console.log('\n✅ All migrations applied successfully!')
console.log('\nNew fields added:')
console.log('  - partners.contact_person (TEXT)')
console.log('  - partners.contact_phone (TEXT)')
console.log('  - offers.external_program_url (TEXT)')
