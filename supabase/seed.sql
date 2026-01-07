-- Seed Data for StartupPackage
-- Run this after initial migration to populate with sample data

-- Insert Categories
INSERT INTO categories (slug, name_cs, name_en, description_cs, icon, sort_order, is_active) VALUES
('finance-a-ucetnictvi', 'Finance & účetnictví', 'Finance & Accounting', 'Účetnictví, reporting, cashflow, financování, FX, rozvod účetních procesů', 'DollarSign', 1, true),
('technologie', 'Technologické řešení a automatizace', 'Tech & Automation', 'Automatizace, datové scrapování, MVP technické prototypy', 'Code', 2, true),
('pravo-a-firma', 'Právo & zakládání firmy', 'Legal & Company Formation', 'Zakládání firem, nastavení smluv, právní struktura startupu, investor ready dokumenty', 'Scale', 3, true),
('hr-a-nabor', 'HR & nábor', 'HR & Recruitment', 'Nábor prvních zaměstnanců, psaní inzerátů, první kontrakty, trh práce pro startupy', 'Users', 4, true),
('cowork-a-zazemi', 'Cowork & zázemí', 'Cowork & Office', 'Pracovní prostor, zasedačky, eventová místa, sídlo', 'Building', 5, true),
('mentoring-a-edukace', 'Mentoring & edukace', 'Mentoring & Education', 'Startup mentoring, konzultace, ebooky, přednášky, office hours s odborníky', 'GraduationCap', 6, true),
('expanze-a-zahranici', 'Expanze & zahraničí', 'Expansion & International', 'Přesah do zahraničí, expanze mimo ČR, zakládání poboček, daňová a právní příprava', 'Globe', 7, true),
('marketing-a-komunita', 'Marketing & komunita', 'Marketing & Community', 'Zviditelnění, mediální prostor, PR články, promo, pomoc s komunikací pro první zákazníky', 'Megaphone', 8, true);

-- Insert Partners (Sample)
INSERT INTO partners (slug, name, short_description, full_description, website_url, contact_email, is_verified, is_featured, sort_order) VALUES
('apify', 'Apify', 'Automatizace, datové scrapování, MVP technické prototypy', 'Apify je platforma pro web scraping a automatizaci. Pomáhá startupům získávat data z webu, testovat hypotézy a stavět MVP bez velkých investic do infrastruktury.', 'https://apify.com', 'support@apify.com', true, true, 1),
('startupjobs', 'StartupJobs', 'Nábor prvních zaměstnanců, psaní inzerátů, první kontrakty', 'StartupJobs je největší job board pro startupy v ČR. Pomáhá startupům najít správné lidi pro růst týmu se speciálními balíčky pro early-stage firmy.', 'https://startupjobs.cz', 'support@startupjobs.cz', true, true, 2),
('dype', 'DYPE', 'Účetnictví, reporting, cashflow, financování, FX', 'DYPE poskytuje komplexní účetní služby pro startupy. Od prvních faktur po pokročilý reporting pro investory.', 'https://dype.cz', 'info@dype.cz', true, true, 3),
('amnis', 'Amnis (FX)', 'Přesah do zahraničí, expanze mimo ČR', 'Amnis poskytuje mezinárodní bankovní služby a FX exchange pro startupy expandující do zahraničí.', 'https://amnis.com', 'hello@amnis.com', true, false, 4),
('flowpay', 'Flowpay', 'Účetnictví, reporting, cashflow, financování', 'Flowpay nabízí moderní cashflow management a financování pro startupy s transparentními podmínkami.', 'https://flowpay.io', 'support@flowpay.io', true, false, 5);

-- Insert Offers (Sample)
INSERT INTO offers (slug, partner_id, category_id, title_cs, subtitle_cs, description_cs, pricing_tier, pricing_details, conditions, cta_text, is_active, published_at)
SELECT
  'apify-4000-kreditu',
  p.id,
  c.id,
  'Apify - 4000 kreditů zdarma',
  'Pro automatizaci a data scraping',
  'Získejte 4000 kreditů na platformě Apify zdarma. Využijte je pro web scraping, automatizaci procesů nebo stavbu vašeho MVP. Ideální pro early-stage startupy, které potřebují data bez velkých investic do infrastruktury.',
  'starter',
  '{"base_price": "4000 kreditů", "discount": "100% sleva", "validity": "Platnost 6 měsíců"}'::jsonb,
  '{"company_age": "< 2 roky", "employees": "< 10", "revenue": "< 5M Kč"}'::jsonb,
  'Mám zájem',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'apify' AND c.slug = 'technologie';

INSERT INTO offers (slug, partner_id, category_id, title_cs, subtitle_cs, description_cs, pricing_tier, pricing_details, conditions, cta_text, is_active, published_at)
SELECT
  'startupjobs-inzerat-zdarma',
  p.id,
  c.id,
  'StartupJobs - První inzerát zdarma',
  'Nábor prvních zaměstnanců pro váš tým',
  'Zveřejněte svůj první inzerát na StartupJobs kompletně zdarma. Oslovte tisíce kandidátů hledających práci ve startupech. Zahrnuje standardní inzerát na 30 dní + copywriting pomoc.',
  'starter',
  '{"base_price": "První inzerát zdarma", "discount": "100% sleva", "validity": "30 dní aktivní inzerát"}'::jsonb,
  '{"company_age": "< 5 let", "employees": "< 30"}'::jsonb,
  'Mám zájem',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'startupjobs' AND c.slug = 'hr-a-nabor';

INSERT INTO offers (slug, partner_id, category_id, title_cs, subtitle_cs, description_cs, pricing_tier, pricing_details, conditions, cta_text, is_active, published_at)
SELECT
  'dype-prvni-rok-50-sleva',
  p.id,
  c.id,
  'DYPE - 50% sleva na účetnictví první rok',
  'Účetnictví šité na míru startupům',
  'Získejte 50% slevu na komplexní účetní služby od DYPE po celý první rok. Zahrnuje běžné účetnictví, mzdovou agendu, daňové poradenství a reporting pro investory.',
  'grower',
  '{"base_price": "Od 3000 Kč/měsíc", "discount": "50% sleva první rok", "validity": "12 měsíců"}'::jsonb,
  '{"company_age": "< 3 roky", "revenue": "< 20M Kč"}'::jsonb,
  'Mám zájem',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'dype' AND c.slug = 'finance-a-ucetnictvi';

-- Note: To insert sample leads, you would do so through the application
-- as leads require proper validation and email notifications
