-- Fix RLS Infinite Recursion Issue
-- This migration fixes the circular reference in admin policies

-- Drop all existing policies that cause recursion
DROP POLICY IF EXISTS "Admins can manage categories" ON categories;
DROP POLICY IF EXISTS "Admins can manage partners" ON partners;
DROP POLICY IF EXISTS "Admins can manage offers" ON offers;
DROP POLICY IF EXISTS "Only admins can view leads" ON leads;
DROP POLICY IF EXISTS "Only admins can update leads" ON leads;
DROP POLICY IF EXISTS "Admins can view admin users" ON admin_users;

-- Categories: Admins can manage (without recursion)
CREATE POLICY "Admins can manage categories"
  ON categories FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true)
  )
  WITH CHECK (
    auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true)
  );

-- Partners: Admins can manage (without recursion)
CREATE POLICY "Admins can manage partners"
  ON partners FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true)
  )
  WITH CHECK (
    auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true)
  );

-- Offers: Admins can manage (without recursion)
CREATE POLICY "Admins can manage offers"
  ON offers FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true)
  )
  WITH CHECK (
    auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true)
  );

-- Leads: Only admins can view
CREATE POLICY "Only admins can view leads"
  ON leads FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true)
  );

-- Leads: Only admins can update
CREATE POLICY "Only admins can update leads"
  ON leads FOR UPDATE
  TO authenticated
  USING (
    auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true)
  )
  WITH CHECK (
    auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true)
  );

-- Admin Users: Disable RLS (no recursion needed)
-- Instead, we'll use service role for admin operations
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Or if you want to keep RLS, use a simpler policy:
-- ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Admins can view admin users"
--   ON admin_users FOR SELECT
--   TO authenticated
--   USING (auth.uid() = id OR auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true));
