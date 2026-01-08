-- Seed Offers Data
-- Run this AFTER seed_categories.sql and seed_partners.sql
-- Run this in Supabase SQL Editor

-- FINANCE & ÚČETNICTVÍ - Dype
INSERT INTO offers (slug, partner_id, category_id, title_cs, subtitle_cs, description_cs, pricing_tier, pricing_details, conditions, cta_text, is_active, published_at)
SELECT
  'dype-ucetnictvi-reporting',
  p.id,
  c.id,
  'Účetnictví, reporting, cashflow, financování',
  'Komplexní finanční služby pro startupy',
  'Účetnictví šité na míru startupům. Reporting pro investory, cashflow management, pomoc s financováním a rozjezd účetních procesů od začátku.',
  'grower',
  '{"base_price": "Od 3000 Kč/měsíc", "discount": "50% sleva první rok", "validity": "12 měsíců"}'::jsonb,
  '{"company_age": "< 3 roky", "revenue": "< 20M Kč"}'::jsonb,
  'Mám zájem',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'dype' AND c.slug = 'finance-a-ucetnictvi'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO offers (slug, partner_id, category_id, title_cs, subtitle_cs, description_cs, pricing_tier, pricing_details, conditions, cta_text, is_active, published_at)
SELECT
  'dype-fx-rozjezd',
  p.id,
  c.id,
  'FX a rozjezd účetních procesů',
  'Mezinárodní platby a nastavení procesů',
  'Pomoc s nastavením mezinárodních plateb, FX operací a kompletní rozjezd účetních procesů od nuly.',
  'grower',
  '{"base_price": "Podle rozsahu", "discount": "Speciální podmínky", "validity": "Průběžně"}'::jsonb,
  '{"company_age": "Jakýkoliv", "revenue": "Jakýkoliv"}'::jsonb,
  'Mám zájem',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'dype' AND c.slug = 'finance-a-ucetnictvi'
ON CONFLICT (slug) DO NOTHING;

-- FINANCE & ÚČETNICTVÍ - Flowpay
INSERT INTO offers (slug, partner_id, category_id, title_cs, subtitle_cs, description_cs, pricing_tier, pricing_details, conditions, cta_text, is_active, published_at)
SELECT
  'flowpay-platebni-reseni',
  p.id,
  c.id,
  'Platební řešení pro startupy',
  'Moderní platební brána a finanční služby',
  'Komplexní platební řešení zahrnující platební bránu, správu plateb a finanční služby pro rostoucí firmy.',
  'grower',
  '{"base_price": "Podle objemu transakcí", "discount": "Zvýhodněné podmínky", "validity": "Trvalé"}'::jsonb,
  '{"company_age": "< 5 let", "revenue": "< 50M Kč"}'::jsonb,
  'Mám zájem',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'flowpay' AND c.slug = 'finance-a-ucetnictvi'
ON CONFLICT (slug) DO NOTHING;

-- FINANCE & ÚČETNICTVÍ - Amnis
INSERT INTO offers (slug, partner_id, category_id, title_cs, subtitle_cs, description_cs, pricing_tier, pricing_details, conditions, cta_text, is_active, published_at)
SELECT
  'amnis-financni-management',
  p.id,
  c.id,
  'Finanční management pro startupy',
  'Automatizované řešení pro správu financí',
  'Automatizované řešení pro správu financí a účetnictví s podporou pro rostoucí startupy.',
  'grower',
  '{"base_price": "Od 2000 Kč/měsíc", "discount": "První 3 měsíce zdarma", "validity": "3 měsíce trial"}'::jsonb,
  '{"company_age": "< 3 roky", "employees": "< 20"}'::jsonb,
  'Mám zájem',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'amnis' AND c.slug = 'finance-a-ucetnictvi'
ON CONFLICT (slug) DO NOTHING;

-- TECHNOLOGIE - Apify
INSERT INTO offers (slug, partner_id, category_id, title_cs, subtitle_cs, description_cs, pricing_tier, pricing_details, conditions, cta_text, is_active, published_at)
SELECT
  'apify-automatizace-mvp',
  p.id,
  c.id,
  'Automatizace, web scraping, MVP',
  'Technické prototypy a datové scrapování',
  'Platforma pro automatizaci, datové scrapování a budování MVP s technickými prototypy. Získejte 4000 kreditů zdarma.',
  'starter',
  '{"base_price": "4000 kreditů zdarma", "discount": "100% sleva", "validity": "6 měsíců"}'::jsonb,
  '{"company_age": "< 2 roky", "employees": "< 10"}'::jsonb,
  'Mám zájem',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'apify' AND c.slug = 'technologie'
ON CONFLICT (slug) DO NOTHING;

-- PRÁVO - Eldison
INSERT INTO offers (slug, partner_id, category_id, title_cs, subtitle_cs, description_cs, pricing_tier, pricing_details, conditions, cta_text, is_active, published_at)
SELECT
  'eldison-zakladani-pravni-sluzby',
  p.id,
  c.id,
  'Zakládání firem a právní služby',
  'Právní struktura startupu a investor ready dokumenty',
  'Kompletní právní služby pro startupy - zakládání firem, nastavení smluv, právní struktura a příprava dokumentů pro investory.',
  'grower',
  '{"base_price": "Od 15000 Kč", "discount": "20% sleva", "validity": "První zakázka"}'::jsonb,
  '{"company_age": "< 5 let"}'::jsonb,
  'Mám zájem',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'eldison' AND c.slug = 'pravo-a-firma'
ON CONFLICT (slug) DO NOTHING;

-- HR & NÁBOR - StartupJobs
INSERT INTO offers (slug, partner_id, category_id, title_cs, subtitle_cs, description_cs, pricing_tier, pricing_details, conditions, cta_text, is_active, published_at)
SELECT
  'startupjobs-nabor-inzerat',
  p.id,
  c.id,
  'Nábor prvních zaměstnanců',
  'Psaní inzerátů a první kontrakty',
  'Komplexní podpora náboru - zveřejnění inzerátu, pomoc s psaním a nastavení prvních pracovních smluv. První inzerát zdarma.',
  'starter',
  '{"base_price": "První inzerát zdarma", "discount": "100% sleva", "validity": "30 dní"}'::jsonb,
  '{"company_age": "< 5 let", "employees": "< 30"}'::jsonb,
  'Mám zájem',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'startupjobs' AND c.slug = 'hr-a-nabor'
ON CONFLICT (slug) DO NOTHING;

-- HR & NÁBOR - Tribee
INSERT INTO offers (slug, partner_id, category_id, title_cs, subtitle_cs, description_cs, pricing_tier, pricing_details, conditions, cta_text, is_active, published_at)
SELECT
  'tribee-hr-platforma',
  p.id,
  c.id,
  'HR platforma pro startupy',
  'Komplexní HR řešení a náborové služby',
  'Moderní HR platforma s náborovými službami speciálně pro startup komunitu. Správa zaměstnanců, onboarding a nábor na jednom místě.',
  'grower',
  '{"base_price": "Od 1500 Kč/měsíc", "discount": "3 měsíce zdarma", "validity": "3 měsíce trial"}'::jsonb,
  '{"company_age": "< 5 let", "employees": "< 50"}'::jsonb,
  'Mám zájem',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'tribee' AND c.slug = 'hr-a-nabor'
ON CONFLICT (slug) DO NOTHING;

-- COWORK - WorkLounge
INSERT INTO offers (slug, partner_id, category_id, title_cs, subtitle_cs, description_cs, pricing_tier, pricing_details, conditions, cta_text, is_active, published_at)
SELECT
  'worklounge-coworking',
  p.id,
  c.id,
  'Coworkingové prostory',
  'Pracovní prostor, zasedačky, eventová místa',
  'Moderní coworkingové prostory včetně zasedaček a eventových prostor. Ideální pro sídlo firmy a práci týmu.',
  'grower',
  '{"base_price": "Od 3000 Kč/měsíc", "discount": "První měsíc 50% sleva", "validity": "První měsíc"}'::jsonb,
  '{"company_age": "< 5 let"}'::jsonb,
  'Mám zájem',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'worklounge' AND c.slug = 'cowork-a-zazemi'
ON CONFLICT (slug) DO NOTHING;

-- COWORK - Opero
INSERT INTO offers (slug, partner_id, category_id, title_cs, subtitle_cs, description_cs, pricing_tier, pricing_details, conditions, cta_text, is_active, published_at)
SELECT
  'opero-kancelare',
  p.id,
  c.id,
  'Flexibilní kancelářské prostory',
  'Moderní coworking a privátní kanceláře',
  'Flexibilní kancelářské řešení - od coworkingu po privátní kanceláře pro celé týmy. Vše na jednom místě.',
  'grower',
  '{"base_price": "Od 4000 Kč/měsíc", "discount": "20% sleva", "validity": "První 6 měsíců"}'::jsonb,
  '{"company_age": "< 5 let", "employees": "< 20"}'::jsonb,
  'Mám zájem',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'opero' AND c.slug = 'cowork-a-zazemi'
ON CONFLICT (slug) DO NOTHING;

-- MENTORING - Czech Founders
INSERT INTO offers (slug, partner_id, category_id, title_cs, subtitle_cs, description_cs, pricing_tier, pricing_details, conditions, cta_text, is_active, published_at)
SELECT
  'czech-founders-mentoring',
  p.id,
  c.id,
  'Startup mentoring a komunita',
  'Konzultace, ebooky, přednášky, office hours',
  'Přístup k mentorům, konzultacím, exclusive eBookům, přednáškám a pravidelným "office hours" s odborníky ze startup scény.',
  'grower',
  '{"base_price": "Od 2000 Kč/měsíc", "discount": "První konzultace zdarma", "validity": "Jednorázově"}'::jsonb,
  '{"company_age": "< 3 roky"}'::jsonb,
  'Mám zájem',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'czech-founders' AND c.slug = 'mentoring-a-edukace'
ON CONFLICT (slug) DO NOTHING;

-- MENTORING - Experti (Dype)
INSERT INTO offers (slug, partner_id, category_id, title_cs, subtitle_cs, description_cs, pricing_tier, pricing_details, conditions, cta_text, is_active, published_at)
SELECT
  'dype-experti-konzultace',
  p.id,
  c.id,
  'Expertní konzultace od Dype',
  'Odborné poradenství v různých oblastech',
  'Síť expertů pro konzultace v různých oblastech podnikání - finance, strategie, growth, fundraising.',
  'grower',
  '{"base_price": "Podle rozsahu", "discount": "První hodina zdarma", "validity": "Jednorázově"}'::jsonb,
  '{"company_age": "< 5 let"}'::jsonb,
  'Mám zájem',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'dype' AND c.slug = 'mentoring-a-edukace'
ON CONFLICT (slug) DO NOTHING;

-- MENTORING - Experti
INSERT INTO offers (slug, partner_id, category_id, title_cs, subtitle_cs, description_cs, pricing_tier, pricing_details, conditions, cta_text, is_active, published_at)
SELECT
  'experti-konzultace',
  p.id,
  c.id,
  'Expertní konzultace',
  'Síť expertů pro různé oblasti podnikání',
  'Přístup k síti ověřených expertů napříč různými oblastmi - od právního poradenství po marketing a sales.',
  'grower',
  '{"base_price": "Od 1500 Kč/hodina", "discount": "10% sleva", "validity": "První 3 konzultace"}'::jsonb,
  '{"company_age": "Jakýkoliv"}'::jsonb,
  'Mám zájem',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'experti' AND c.slug = 'mentoring-a-edukace'
ON CONFLICT (slug) DO NOTHING;

-- EXPANZE - Amnis FX
INSERT INTO offers (slug, partner_id, category_id, title_cs, subtitle_cs, description_cs, pricing_tier, pricing_details, conditions, cta_text, is_active, published_at)
SELECT
  'amnis-fx-expanze',
  p.id,
  c.id,
  'Mezinárodní platby a expanze',
  'Přesah do zahraničí a zakládání poboček',
  'Kompletní služby pro mezinárodní expanzi - FX operace, mezinárodní platby, pomoc se zakládáním zahraničních poboček.',
  'scaler',
  '{"base_price": "Podle rozsahu", "discount": "Zvýhodněné kurzy", "validity": "Trvalé"}'::jsonb,
  '{"company_age": "Jakýkoliv", "revenue": "> 10M Kč"}'::jsonb,
  'Mám zájem',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'amnis-fx' AND c.slug = 'expanze-a-zahranici'
ON CONFLICT (slug) DO NOTHING;

-- EXPANZE - Expats.cz (komunita cizinců)
INSERT INTO offers (slug, partner_id, category_id, title_cs, subtitle_cs, description_cs, pricing_tier, pricing_details, conditions, cta_text, is_active, published_at)
SELECT
  'expats-cz-komunita',
  p.id,
  c.id,
  'Služby pro expaty a expanzi do ČR',
  'Daňová a právní příprava pro komunitu cizinců',
  'Pomoc s expanzí do ČR, daňové a právní poradenství pro zahraniční firmy a expaty. Napojení na komunitu.',
  'grower',
  '{"base_price": "Od 5000 Kč", "discount": "Individuální", "validity": "Podle projektu"}'::jsonb,
  '{"company_age": "Jakýkoliv"}'::jsonb,
  'Mám zájem',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'expats-cz' AND c.slug = 'expanze-a-zahranici'
ON CONFLICT (slug) DO NOTHING;

-- EXPANZE - Dype (mezinárodní účetnictví)
INSERT INTO offers (slug, partner_id, category_id, title_cs, subtitle_cs, description_cs, pricing_tier, pricing_details, conditions, cta_text, is_active, published_at)
SELECT
  'dype-mezinarodni-ucetnictvi',
  p.id,
  c.id,
  'Mezinárodní účetnictví od Dype',
  'Účetnictví při expanzi mimo ČR',
  'Specializované účetní služby pro startupy expandující do zahraničí. Pomoc s mezinárodním účetnictvím a reportingem.',
  'scaler',
  '{"base_price": "Podle rozsahu", "discount": "Speciální podmínky", "validity": "Průběžně"}'::jsonb,
  '{"company_age": "Jakýkoliv", "revenue": "> 5M Kč"}'::jsonb,
  'Mám zájem',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'dype' AND c.slug = 'expanze-a-zahranici'
ON CONFLICT (slug) DO NOTHING;

-- MARKETING - Expats.cz Marketing
INSERT INTO offers (slug, partner_id, category_id, title_cs, subtitle_cs, description_cs, pricing_tier, pricing_details, conditions, cta_text, is_active, published_at)
SELECT
  'expats-cz-marketing',
  p.id,
  c.id,
  'Marketing pro startup komunitu',
  'Zviditelnění, PR články, promo',
  'Komplexní marketingové služby - zviditelnění, mediální prostor, PR články, promo a pomoc s komunikací pro získání prvních zákazníků.',
  'grower',
  '{"base_price": "Od 10000 Kč", "discount": "První článek 50% sleva", "validity": "První kampaň"}'::jsonb,
  '{"company_age": "< 5 let"}'::jsonb,
  'Mám zájem',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'expats-cz-marketing' AND c.slug = 'marketing-a-komunita'
ON CONFLICT (slug) DO NOTHING;

-- MARKETING - CzechCrunch
INSERT INTO offers (slug, partner_id, category_id, title_cs, subtitle_cs, description_cs, pricing_tier, pricing_details, conditions, cta_text, is_active, published_at)
SELECT
  'czechcrunch-pr-media',
  p.id,
  c.id,
  'Startup média a PR',
  'Největší české tech médium',
  'Publikace na CzechCrunch - největším českém tech a startup médiu. Pomoc s PR, marketingem a komunikací pro první zákazníky.',
  'grower',
  '{"base_price": "Podle typu obsahu", "discount": "Zvýhodněné podmínky", "validity": "Podle dohody"}'::jsonb,
  '{"company_age": "Jakýkoliv"}'::jsonb,
  'Mám zájem',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'czechcrunch' AND c.slug = 'marketing-a-komunita'
ON CONFLICT (slug) DO NOTHING;

-- Poznámka: Po vložení zkontrolujte:
-- - Správné propojení partner_id a category_id
-- - Ceny a podmínky jednotlivých nabídek
-- - Správnost slugů (musí být unikátní)
