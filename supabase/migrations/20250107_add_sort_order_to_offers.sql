-- Add sort_order column to offers table
ALTER TABLE offers ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_offers_sort_order ON offers(sort_order);
