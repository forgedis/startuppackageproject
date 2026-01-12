-- First, let's check what partners and categories exist
-- Run this first to see what we're working with

-- Check current state
SELECT
  c.name_cs as category,
  c.slug as category_slug,
  COUNT(o.id) as current_offers
FROM categories c
LEFT JOIN offers o ON o.category_id = c.id AND o.is_active = true
GROUP BY c.id, c.name_cs, c.slug
ORDER BY c.name_cs;

-- Check available partners
SELECT
  id,
  name,
  slug
FROM partners
ORDER BY name;

-- Check existing offer slugs to avoid conflicts
SELECT slug FROM offers ORDER BY slug;
