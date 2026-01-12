-- Run this to see all partner slugs and categories
-- This will help us create the correct seed script

-- Show all partners with their slugs
SELECT
  id,
  name,
  slug
FROM partners
ORDER BY name;

-- Show all categories with their slugs
SELECT
  id,
  name_cs,
  slug
FROM categories
ORDER BY name_cs;

-- Show current offers per category with partner names
SELECT
  c.name_cs as category,
  c.slug as category_slug,
  COUNT(o.id) as current_offers,
  string_agg(DISTINCT p.name, ', ') as partners_with_offers
FROM categories c
LEFT JOIN offers o ON o.category_id = c.id AND o.is_active = true
LEFT JOIN partners p ON o.partner_id = p.id
GROUP BY c.id, c.name_cs, c.slug
ORDER BY current_offers ASC;
