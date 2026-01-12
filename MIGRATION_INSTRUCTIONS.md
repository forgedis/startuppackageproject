# Database Migration Instructions

## Apply Database Migration with Sample Data

### Using Supabase Dashboard (Recommended)

1. **Go to your Supabase project:** https://supabase.com/dashboard/project/bexbyxeyhoqjflzyiyee
2. **Click on "SQL Editor"** in the left sidebar
3. **Click "New Query"**
4. **Copy and paste this complete SQL:**

```sql
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
-- IMPORTANT: Replace these with actual contact details for your partners

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
```

5. **Click "Run"** button
6. You should see "Success. No rows returned" or the number of rows updated

### Verify the Migration

After running the SQL, verify it worked by running this query:

```sql
-- Check partners with new fields
SELECT name, contact_person, contact_phone, website_url
FROM partners
ORDER BY name;

-- Check offers with external URLs
SELECT title_cs, external_program_url
FROM offers
WHERE external_program_url IS NOT NULL;
```

## Customize the Data

After the migration, you can customize the contact information:

### Update Individual Partners

```sql
UPDATE partners
SET
  contact_person = 'Your Contact Name',
  contact_phone = '+420 XXX XXX XXX'
WHERE slug = 'partner-slug';
```

### Add External URL to Specific Offers

```sql
UPDATE offers
SET external_program_url = 'https://partner-website.com/signup'
WHERE slug = 'offer-slug';
```

### Bulk Update All Offers from a Partner

```sql
UPDATE offers
SET external_program_url = 'https://partner-website.com/program'
WHERE partner_id IN (SELECT id FROM partners WHERE slug = 'partner-slug');
```

## What the New Fields Do

### For Partners:
- **`contact_person`** - Contact person name (e.g., "Jan Novák")
  - Displayed in "O partnerovi" section with User icon 👤

- **`contact_phone`** - Phone number (e.g., "+420 123 456 789")
  - Displayed in "O partnerovi" section as clickable tel: link 📞
  - Also shown in offer cards at the bottom

### For Offers:
- **`external_program_url`** - External redirect URL (e.g., "https://czechfounders.org/join-our-community/")
  - When filled: "Mám zájem" button redirects to this URL (opens in new tab)
  - When empty: Shows standard contact form
  - External link icon (↗) appears in offer card title when set

## After Migration

### Test the Changes:

1. **View an offer detail page** - You should see:
   - Partner contact info in "O partnerovi" section (person, phone, email, website)
   - If external URL is set: Redirect button instead of form

2. **View category pages** - Offer cards should show:
   - Small globe icon (🌐) next to partner name (links to website)
   - External link icon (↗) in title if external_program_url is set
   - Partner phone and email at bottom

3. **Admin panel** - Edit forms now have:
   - Partner form: Contact person & phone fields
   - Offer form: External program URL field

## Components Updated:
- ✅ `offer-card.tsx` - Shows partner contact info, external link icon, fixed hydration error
- ✅ `offer-detail-header.tsx` - Prominent partner name with website link
- ✅ `partner-section.tsx` - Shows all contact info with icons
- ✅ `lead-form-section.tsx` - Smart CTA (form vs external redirect)
- ✅ `partner-form.tsx` - Admin form with new fields
- ✅ `offer-form.tsx` - Admin form with external URL field

## Add More Offers (Optional but Recommended)

To ensure each category has at least 3 offers for a better user experience, run this additional SQL:

**Location:** `supabase/seed_more_offers.sql`

This will add 3+ offers to each category:
- Technologické řešení a automatizace (3 offers)
- Právo & zakládání firmy (3 offers)
- Finance & účetnictví (3 offers)
- Mentoring & edukace (3 offers)
- HR & nábor (3 offers)
- Coworking & zázemí (3 offers)
- Expanze & zahraniční (3 offers)
- Marketing & komunita (3 offers)

**To apply:**
1. Open the file `supabase/seed_more_offers.sql`
2. Copy all the SQL
3. Paste into Supabase SQL Editor
4. Click Run

**Verify it worked:**
```sql
SELECT c.name_cs, c.slug, COUNT(o.id) as offer_count
FROM categories c
LEFT JOIN offers o ON o.category_id = c.id AND o.is_active = true
GROUP BY c.id, c.name_cs, c.slug
ORDER BY c.name_cs;
```

You should see each category now has at least 3 offers.

## Troubleshooting

**If fields don't show up after migration:**
1. Hard refresh your browser (Ctrl+Shift+R)
2. Check the data was actually inserted with the verify queries above
3. Make sure you're looking at an offer/partner that has the data filled in

**If you see errors:**
- "column already exists" - Safe to ignore, means migration already ran
- "relation does not exist" - Check you're connected to the right database
- "duplicate key value violates unique constraint" - Some offers already exist, safe to ignore
