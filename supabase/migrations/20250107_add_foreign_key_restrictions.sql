-- Update foreign key constraints to prevent deletion of categories and partners with active offers

-- Drop existing foreign key constraints
ALTER TABLE offers DROP CONSTRAINT IF EXISTS offers_partner_id_fkey;
ALTER TABLE offers DROP CONSTRAINT IF EXISTS offers_category_id_fkey;

-- Recreate with RESTRICT to prevent deletion when referenced
ALTER TABLE offers
  ADD CONSTRAINT offers_partner_id_fkey
  FOREIGN KEY (partner_id)
  REFERENCES partners(id)
  ON DELETE RESTRICT;

ALTER TABLE offers
  ADD CONSTRAINT offers_category_id_fkey
  FOREIGN KEY (category_id)
  REFERENCES categories(id)
  ON DELETE RESTRICT;

-- Note: RESTRICT means you cannot delete a partner or category if any offers reference it
-- This protects data integrity and prevents accidental deletion of important data
