-- Add contact person and phone fields to partners table
-- Add external program URL to offers table for redirect functionality
-- 2025-01-12

-- Add new fields to partners table
ALTER TABLE partners ADD COLUMN IF NOT EXISTS contact_person TEXT;
ALTER TABLE partners ADD COLUMN IF NOT EXISTS contact_phone TEXT;

-- Add external program URL to offers table
ALTER TABLE offers ADD COLUMN IF NOT EXISTS external_program_url TEXT;

-- Add comments for documentation
COMMENT ON COLUMN partners.contact_person IS 'Name of the contact person at the partner organization';
COMMENT ON COLUMN partners.contact_phone IS 'Phone number for contacting the partner';
COMMENT ON COLUMN offers.external_program_url IS 'External URL to partner program (e.g., https://czechfounders.org/join-our-community/). If set, CTA redirects here instead of showing contact form';

-- Update existing partners with sample contact information
-- You should replace these with actual contact details

-- Update DYPE
UPDATE partners
SET
  contact_person = 'Matúš Bujňák',
  contact_phone = '+420 123 456 789'
WHERE slug = 'dype';

-- Update Czech Founders (if exists)
UPDATE partners
SET
  contact_person = 'Jan Novák',
  contact_phone = '+420 987 654 321'
WHERE slug = 'czech-founders';

-- Update Factorio (if exists)
UPDATE partners
SET
  contact_person = 'Petr Svoboda',
  contact_phone = '+420 111 222 333'
WHERE slug = 'factorio';

-- Update Lexolve (if exists)
UPDATE partners
SET
  contact_person = 'Lucie Horáková',
  contact_phone = '+420 444 555 666'
WHERE slug = 'lexolve';

-- Update Finfarm (if exists)
UPDATE partners
SET
  contact_person = 'Martin Dvořák',
  contact_phone = '+420 777 888 999'
WHERE slug = 'finfarm';

-- Add external program URLs to specific offers (example)
-- Czech Founders community membership could redirect to their join page
UPDATE offers
SET external_program_url = 'https://czechfounders.org/join-our-community/'
WHERE slug LIKE '%czech-founders%'
  AND title_cs LIKE '%členství%';

-- You can add more specific updates based on your actual data
-- Example: Update all offers from a specific partner
-- UPDATE offers
-- SET external_program_url = 'https://partner-website.com/signup'
-- WHERE partner_id IN (SELECT id FROM partners WHERE slug = 'partner-slug');
