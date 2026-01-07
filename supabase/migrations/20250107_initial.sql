-- StartupPackage Database Schema
-- Initial Migration - 2025-01-07

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories Table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name_cs TEXT NOT NULL,
  name_en TEXT,
  description_cs TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Partners Table
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  logo_url TEXT,
  short_description TEXT,
  full_description TEXT,
  website_url TEXT,
  contact_email TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Offers Table
CREATE TABLE offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  partner_id UUID REFERENCES partners(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  title_cs TEXT NOT NULL,
  subtitle_cs TEXT,
  description_cs TEXT NOT NULL,
  pricing_tier TEXT,
  pricing_details JSONB,
  conditions JSONB,
  cta_text TEXT DEFAULT 'Mám zájem',
  meta_title TEXT,
  meta_description TEXT,
  is_active BOOLEAN DEFAULT true,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads Table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  offer_id UUID REFERENCES offers(id) ON DELETE SET NULL,
  partner_id UUID REFERENCES partners(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company_name TEXT,
  note TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  status TEXT DEFAULT 'new',
  gdpr_consent BOOLEAN DEFAULT false,
  marketing_consent BOOLEAN DEFAULT false,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin Users Table
CREATE TABLE admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX idx_offers_partner ON offers(partner_id);
CREATE INDEX idx_offers_category ON offers(category_id);
CREATE INDEX idx_offers_active ON offers(is_active, published_at);
CREATE INDEX idx_leads_offer ON leads(offer_id);
CREATE INDEX idx_leads_partner ON leads(partner_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created ON leads(created_at DESC);
CREATE INDEX idx_leads_email ON leads(email);

-- Row Level Security (RLS) Policies

-- Categories: Public read access to active categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active categories"
  ON categories FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage categories"
  ON categories FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid() AND is_active = true
    )
  );

-- Partners: Public read access to verified partners
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view verified partners"
  ON partners FOR SELECT
  USING (is_verified = true);

CREATE POLICY "Admins can manage partners"
  ON partners FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid() AND is_active = true
    )
  );

-- Offers: Public read access to active offers
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active offers"
  ON offers FOR SELECT
  USING (is_active = true AND published_at IS NOT NULL);

CREATE POLICY "Admins can manage offers"
  ON offers FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid() AND is_active = true
    )
  );

-- Leads: No public access
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view leads"
  ON leads FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid() AND is_active = true
    )
  );

CREATE POLICY "Only admins can update leads"
  ON leads FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid() AND is_active = true
    )
  );

-- Allow public lead insertion (for form submissions)
-- Validates essential fields and GDPR consent at database level
CREATE POLICY "Public can insert leads with valid data"
  ON leads FOR INSERT
  WITH CHECK (
    -- Require non-empty first and last name
    first_name IS NOT NULL AND length(trim(first_name)) > 0
    AND last_name IS NOT NULL AND length(trim(last_name)) > 0
    -- Validate email format
    AND email IS NOT NULL AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    -- Require GDPR consent (legal requirement)
    AND gdpr_consent = true
  );

-- Admin Users: Only admins can read
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view admin users"
  ON admin_users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid() AND is_active = true
    )
  );

-- Triggers for updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_partners_updated_at BEFORE UPDATE ON partners
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_offers_updated_at BEFORE UPDATE ON offers
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Comments for documentation
COMMENT ON TABLE categories IS 'Service categories (Finance, HR, Tech, etc.)';
COMMENT ON TABLE partners IS 'Service providers offering startup packages';
COMMENT ON TABLE offers IS 'Individual offers from partners';
COMMENT ON TABLE leads IS 'Lead submissions from startups';
COMMENT ON TABLE admin_users IS 'Admin users with access to the admin panel';
