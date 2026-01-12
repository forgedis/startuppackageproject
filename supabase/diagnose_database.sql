-- Run this in Supabase SQL Editor to diagnose the seed issue
-- This will show you what data exists in your database

-- 1. Check what partners exist (these are the slugs you need to use)
SELECT
  id,
  name,
  slug,
  contact_person,
  contact_phone
FROM partners
ORDER BY name;

-- 2. Check what categories exist
SELECT
  id,
  name_cs,
  slug
FROM categories
ORDER BY name_cs;

-- 3. Check current offer count per category
SELECT
  c.name_cs as category,
  c.slug as category_slug,
  COUNT(o.id) as current_offers,
  string_agg(DISTINCT p.name, ', ') as partners_in_category
FROM categories c
LEFT JOIN offers o ON o.category_id = c.id AND o.is_active = true
LEFT JOIN partners p ON o.partner_id = p.id
GROUP BY c.id, c.name_cs, c.slug
ORDER BY c.name_cs;

-- 4. Check existing offer slugs to avoid conflicts
SELECT
  slug,
  title_cs,
  partner_id
FROM offers
ORDER BY slug;

-- 5. Count total partners and offers
SELECT
  (SELECT COUNT(*) FROM partners) as total_partners,
  (SELECT COUNT(*) FROM categories) as total_categories,
  (SELECT COUNT(*) FROM offers WHERE is_active = true) as total_active_offers;
