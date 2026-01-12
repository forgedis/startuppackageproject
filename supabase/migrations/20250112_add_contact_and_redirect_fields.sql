-- Add contact person and phone fields to partners table
-- Add external program URL to offers table for redirect functionality
-- 2025-01-12

-- Add new fields to partners table
ALTER TABLE partners
ADD COLUMN contact_person TEXT,
ADD COLUMN contact_phone TEXT;

-- Add external program URL to offers table
ALTER TABLE offers
ADD COLUMN external_program_url TEXT;

-- Add comments for documentation
COMMENT ON COLUMN partners.contact_person IS 'Name of the contact person at the partner organization';
COMMENT ON COLUMN partners.contact_phone IS 'Phone number for contacting the partner';
COMMENT ON COLUMN offers.external_program_url IS 'External URL to partner program (e.g., https://czechfounders.org/join-our-community/). If set, CTA redirects here instead of showing contact form';
