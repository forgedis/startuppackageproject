-- Check what data is currently in the database

-- Check Partners
SELECT COUNT(*) as partner_count FROM partners;
SELECT id, name, slug FROM partners ORDER BY sort_order;

-- Check Categories
SELECT COUNT(*) as category_count FROM categories;
SELECT id, name_cs, slug FROM categories ORDER BY sort_order;

-- Check Offers
SELECT COUNT(*) as offer_count FROM offers;
SELECT id, title_cs, partner_id, category_id FROM offers LIMIT 20;
