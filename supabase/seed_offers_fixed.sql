-- Add more offers using ACTUAL partners from the database
-- This will ensure each category has at least 3 offers

-- Categories that need more offers:
-- 1. Právo & zakládání firmy (pravo-a-firma) - currently 1 offer
-- 2. Technologické řešení a automatizace (technologie) - currently 1 offer

-- =============================================================================
-- PRÁVO & ZAKLÁDÁNÍ FIRMY (need 2 more offers)
-- =============================================================================

-- Offer 1: DYPE - Legal consultation for startups
INSERT INTO offers (
  slug,
  partner_id,
  category_id,
  title_cs,
  subtitle_cs,
  description_cs,
  conditions,
  cta_text,
  is_active,
  published_at
)
SELECT
  'dype-pravni-poradenstvi-pro-startupy',
  p.id,
  c.id,
  'Právní poradenství pro začínající startupy',
  'Bezplatná konzultace k založení firmy',
  'DYPE nabízí startupům bezplatnou právní konzultaci zaměřenou na založení společnosti, výběr právní formy a základní smluvní dokumentaci. Pomůžeme vám vybrat správnou strukturu pro váš startup.',
  '{"company_age": "Nová firma nebo před založením", "revenue": "Jakýkoliv", "employees": "< 5"}'::jsonb,
  'Chci konzultaci',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'dype' AND c.slug = 'pravo-a-firma'
ON CONFLICT (slug) DO NOTHING;

-- Offer 2: Czech Founders - Legal network access
INSERT INTO offers (
  slug,
  partner_id,
  category_id,
  title_cs,
  subtitle_cs,
  description_cs,
  conditions,
  cta_text,
  is_active,
  published_at
)
SELECT
  'czech-founders-pravni-sit',
  p.id,
  c.id,
  'Přístup k síti ověřených právníků pro startupy',
  'Doporučení prověřených právních firem',
  'Czech Founders nabízí členům přístup k síti ověřených právníků a právních firem, které mají zkušenosti se startupy a investičními rundami. Získejte kontakty na právníky, kteří rozumí specifickým potřebám startupů.',
  '{"company_age": "< 5 let", "revenue": "Jakýkoliv", "employees": "Jakýkoliv"}'::jsonb,
  'Chci přístup',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'czech-founders' AND c.slug = 'pravo-a-firma'
ON CONFLICT (slug) DO NOTHING;

-- =============================================================================
-- TECHNOLOGICKÉ ŘEŠENÍ A AUTOMATIZACE (need 2 more offers)
-- =============================================================================

-- Offer 1: DYPE - Tech consulting
INSERT INTO offers (
  slug,
  partner_id,
  category_id,
  title_cs,
  subtitle_cs,
  description_cs,
  conditions,
  cta_text,
  is_active,
  published_at
)
SELECT
  'dype-tech-konzultace',
  p.id,
  c.id,
  'Technické poradenství pro startupy',
  'Pomoc s technologickými rozhodnutími',
  'DYPE poskytuje startupům technické konzultace zaměřené na výběr správného technology stacku, architekturu řešení a best practices pro škálování. Pomůžeme vám vyhnout se běžným technologickým chybám.',
  '{"company_age": "< 3 roky", "revenue": "< 5M Kč", "employees": "< 20"}'::jsonb,
  'Chci konzultaci',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'dype' AND c.slug = 'technologie'
ON CONFLICT (slug) DO NOTHING;

-- Offer 2: Expats.cz - Technology newsletter & resources
INSERT INTO offers (
  slug,
  partner_id,
  category_id,
  title_cs,
  subtitle_cs,
  description_cs,
  conditions,
  cta_text,
  is_active,
  published_at
)
SELECT
  'expats-cz-tech-news',
  p.id,
  c.id,
  'Tech newsletter a přístup k technologickým zdrojům',
  'Sledujte technologické trendy pro český startup ekosystém',
  'Expats.cz Marketing nabízí pravidelný tech newsletter se zajímavými články, novinkami ze světa technologií a tipy pro startupy. Získejte přehled o nových nástrojích a službách.',
  '{"company_age": "Jakýkoliv", "revenue": "Jakýkoliv", "employees": "Jakýkoliv"}'::jsonb,
  'Přihlásit k odběru',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'expats-cz-marketing' AND c.slug = 'technologie'
ON CONFLICT (slug) DO NOTHING;

-- =============================================================================
-- Additional offers to boost other categories to 5+ offers each
-- =============================================================================

-- COWORK & ZÁZEMÍ (currently 3, add 2 more to reach 5)
-- =============================================================================

INSERT INTO offers (
  slug,
  partner_id,
  category_id,
  title_cs,
  subtitle_cs,
  description_cs,
  conditions,
  cta_text,
  is_active,
  published_at
)
SELECT
  'dype-coworking-sleva',
  p.id,
  c.id,
  'Sleva na coworkingové prostory pro DYPE startupy',
  '20% sleva na měsíční členství',
  'Startupy v DYPE programu získávají 20% slevu na coworkingové prostory u vybraných partnerů. Ideální pro týmy, které potřebují profesionální zázemí bez vysokých nákladů.',
  '{"company_age": "< 2 roky", "revenue": "< 3M Kč", "employees": "< 10"}'::jsonb,
  'Chci slevu',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'dype' AND c.slug = 'cowork-a-zazemi'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO offers (
  slug,
  partner_id,
  category_id,
  title_cs,
  subtitle_cs,
  description_cs,
  conditions,
  cta_text,
  is_active,
  published_at
)
SELECT
  'czech-founders-coworking-events',
  p.id,
  c.id,
  'Přístup na coworkingové eventy a networking',
  'Setkání v moderních coworkingových prostorech',
  'Czech Founders pořádá pravidelné networkingové eventy v coworkingových prostorech po celé ČR. Získejte přístup k široké komunitě zakladatelů a možnost pracovat z různých míst.',
  '{"company_age": "Jakýkoliv", "revenue": "Jakýkoliv", "employees": "Jakýkoliv"}'::jsonb,
  'Chci se účastnit',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'czech-founders' AND c.slug = 'cowork-a-zazemi'
ON CONFLICT (slug) DO NOTHING;

-- MARKETING & KOMUNITA (currently 3, add 2 more to reach 5)
-- =============================================================================

INSERT INTO offers (
  slug,
  partner_id,
  category_id,
  title_cs,
  subtitle_cs,
  description_cs,
  conditions,
  cta_text,
  is_active,
  published_at
)
SELECT
  'dype-marketing-konzultace',
  p.id,
  c.id,
  'Marketingová strategie pro startupy',
  'Bezplatná konzultace k growth strategii',
  'DYPE nabízí startupům konzultace zaměřené na marketingovou strategii, customer acquisition a growth hacking. Pomůžeme vám nastavit efektivní kanály pro růst.',
  '{"company_age": "< 3 roky", "revenue": "< 5M Kč", "employees": "< 15"}'::jsonb,
  'Chci konzultaci',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'dype' AND c.slug = 'marketing-a-komunita'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO offers (
  slug,
  partner_id,
  category_id,
  title_cs,
  subtitle_cs,
  description_cs,
  conditions,
  cta_text,
  is_active,
  published_at
)
SELECT
  'apify-marketing-automation',
  p.id,
  c.id,
  'Automatizace marketingových procesů s Apify',
  'Web scraping pro market research',
  'Apify nabízí startupům nástroje pro automatizaci marketingového research pomocí web scrapingu. Získejte data o konkurenci, cenách a trendech automaticky.',
  '{"company_age": "< 5 let", "revenue": "< 10M Kč", "employees": "< 30"}'::jsonb,
  'Chci vyzkoušet',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'apify' AND c.slug = 'marketing-a-komunita'
ON CONFLICT (slug) DO NOTHING;

-- HR & NÁBOR (currently 4, add 1 more to reach 5)
-- =============================================================================

INSERT INTO offers (
  slug,
  partner_id,
  category_id,
  title_cs,
  subtitle_cs,
  description_cs,
  conditions,
  cta_text,
  is_active,
  published_at
)
SELECT
  'dype-hr-poradenstvi',
  p.id,
  c.id,
  'HR poradenství pro startupy',
  'Pomoc s nastavením procesů a náborem',
  'DYPE poskytuje HR konzultace zaměřené na nastavení náborových procesů, budování týmové kultury a kompenzační strategie. Ideální pro startupy, které začínají budovat svůj první tým.',
  '{"company_age": "< 2 roky", "revenue": "< 5M Kč", "employees": "< 10"}'::jsonb,
  'Chci poradenství',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'dype' AND c.slug = 'hr-a-nabor'
ON CONFLICT (slug) DO NOTHING;

-- EXPANZE & ZAHRANIČNÍ (currently 5, good but add 1 more for variety)
-- =============================================================================

INSERT INTO offers (
  slug,
  partner_id,
  category_id,
  title_cs,
  subtitle_cs,
  description_cs,
  conditions,
  cta_text,
  is_active,
  published_at
)
SELECT
  'czech-founders-international-network',
  p.id,
  c.id,
  'Mezinárodní síť pro expanzi startupů',
  'Kontakty na zakladatele ve 20+ zemích',
  'Czech Founders nabízí přístup k mezinárodní síti zakladatelů ve více než 20 zemích. Získejte kontakty, doporučení a podporu při expanzi do zahraničí.',
  '{"company_age": "< 7 let", "revenue": "> 1M Kč", "employees": "> 5"}'::jsonb,
  'Chci se připojit',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'czech-founders' AND c.slug = 'expanze-a-zahranicni'
ON CONFLICT (slug) DO NOTHING;

-- MENTORING & EDUKACE (currently 6, good but add 1 more)
-- =============================================================================

INSERT INTO offers (
  slug,
  partner_id,
  category_id,
  title_cs,
  subtitle_cs,
  description_cs,
  conditions,
  cta_text,
  is_active,
  published_at
)
SELECT
  'apify-technical-workshops',
  p.id,
  c.id,
  'Technické workshopy o web scrapingu a automatizaci',
  'Naučte se automatizovat procesy s Apify',
  'Apify pořádá pravidelné workshopy zaměřené na web scraping, automatizaci a data extraction. Naučte se, jak využít automatizaci pro růst vašeho startupu.',
  '{"company_age": "Jakýkoliv", "revenue": "Jakýkoliv", "employees": "Jakýkoliv"}'::jsonb,
  'Přihlásit se',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'apify' AND c.slug = 'mentoring-a-edukace'
ON CONFLICT (slug) DO NOTHING;

-- FINANCE & ÚČETNICTVÍ (currently 6, add 1 more for balance)
-- =============================================================================

INSERT INTO offers (
  slug,
  partner_id,
  category_id,
  title_cs,
  subtitle_cs,
  description_cs,
  conditions,
  cta_text,
  is_active,
  published_at
)
SELECT
  'czech-founders-finance-mentoring',
  p.id,
  c.id,
  'Finanční mentoring a fundraising poradenství',
  'Přístup k mentorům se zkušenostmi s investicemi',
  'Czech Founders nabízí finanční mentoring od zkušených zakladatelů, kteří úspěšně získali investice. Naučte se připravit pitch deck, financial model a fundraising strategii.',
  '{"company_age": "< 5 let", "revenue": "Jakýkoliv", "employees": "Jakýkoliv"}'::jsonb,
  'Chci mentora',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'czech-founders' AND c.slug = 'finance-a-ucetnictvi'
ON CONFLICT (slug) DO NOTHING;

-- Verify results
SELECT
  c.name_cs as category,
  c.slug as category_slug,
  COUNT(o.id) as total_offers
FROM categories c
LEFT JOIN offers o ON o.category_id = c.id AND o.is_active = true
GROUP BY c.id, c.name_cs, c.slug
ORDER BY total_offers ASC;
