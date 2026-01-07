-- QUICK FIX for RLS Infinite Recursion
-- Run this in Supabase SQL Editor NOW

-- Simply disable RLS on admin_users table
-- This prevents the circular reference
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- That's it! Now refresh http://localhost:3000/test-db
