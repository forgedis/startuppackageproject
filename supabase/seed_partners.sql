-- Seed Partners Data
-- Run this in Supabase SQL Editor

-- OPTION 1: Clear all existing partners first (uncomment if you want to start fresh)
-- DELETE FROM partners;

-- OPTION 2: Use INSERT with ON CONFLICT to skip duplicates
-- This will only insert partners that don't already exist

-- Finance & účetnictví
INSERT INTO partners (name, slug, short_description, full_description, website_url, contact_email, is_verified, sort_order)
VALUES
  ('Dype', 'dype', 'Účetnictví, reporting, cashflow, financování', 'Komplexní finanční služby pro startupy včetně účetnictví, reportingu, cashflow managementu, FX a rozjezdu účetních procesů.', 'https://dype.cz', 'info@dype.cz', true, 10),
  ('Flowpay', 'flowpay', 'Platební řešení pro startupy', 'Moderní platební brána a finanční služby pro rostoucí firmy.', 'https://flowpay.cz', 'info@flowpay.cz', true, 11),
  ('Amnis', 'amnis', 'Finanční management pro startupy', 'Automatizované řešení pro správu financí a účetnictví.', 'https://amnis.cz', 'info@amnis.cz', true, 12)
ON CONFLICT (slug) DO NOTHING;

-- Technologické řešení a automatizace
INSERT INTO partners (name, slug, short_description, full_description, website_url, contact_email, is_verified, sort_order)
VALUES
  ('Apify', 'apify', 'Automatizace, web scraping, MVP', 'Platforma pro automatizaci, datové scrapování a budování MVP s technickými prototypy.', 'https://apify.com', 'info@apify.com', true, 20)
ON CONFLICT (slug) DO NOTHING;

-- Právo & zakládání firmy
INSERT INTO partners (name, slug, short_description, full_description, website_url, contact_email, is_verified, sort_order)
VALUES
  ('Eldison', 'eldison', 'Právní služby pro startupy', 'Zakládání firem, nastavení smluv, právní struktura startupu a investor ready dokumenty.', 'https://eldison.cz', 'info@eldison.cz', true, 30)
ON CONFLICT (slug) DO NOTHING;

-- HR & nábor
INSERT INTO partners (name, slug, short_description, full_description, website_url, contact_email, is_verified, sort_order)
VALUES
  ('StartupJobs', 'startupjobs', 'Nábor pro startupy', 'Nábor prvních zaměstnanců, psaní inzerátů, první kontrakty a trh práce pro startupy.', 'https://startupjobs.cz', 'info@startupjobs.cz', true, 40),
  ('Tribee', 'tribee', 'HR platforma pro startupy', 'Komplexní HR řešení a náborové služby zaměřené na startup komunitu.', 'https://tribee.cz', 'info@tribee.cz', true, 41)
ON CONFLICT (slug) DO NOTHING;

-- Cowork & zázemí
INSERT INTO partners (name, slug, short_description, full_description, website_url, contact_email, is_verified, sort_order)
VALUES
  ('WorkLounge', 'worklounge', 'Coworkingové prostory', 'Pracovní prostor, zasedačky, eventová místa a sídle pro startupy.', 'https://worklounge.cz', 'info@worklounge.cz', true, 50),
  ('Opero', 'opero', 'Flexibilní kancelářské prostory', 'Moderní coworkingové prostory a privátní kanceláře pro týmy.', 'https://opero.cz', 'info@opero.cz', true, 51)
ON CONFLICT (slug) DO NOTHING;

-- Mentoring & edukace
INSERT INTO partners (name, slug, short_description, full_description, website_url, contact_email, is_verified, sort_order)
VALUES
  ('Czech Founders', 'czech-founders', 'Startup mentoring a komunita', 'Startup mentoring, konzultace, ebooky, přednášky a "office hours" s odborníky.', 'https://czechfounders.com', 'info@czechfounders.com', true, 60),
  ('Experti', 'experti', 'Expertní konzultace', 'Síť expertů pro konzultace v různých oblastech podnikání.', 'https://experti.cz', 'info@experti.cz', true, 61)
ON CONFLICT (slug) DO NOTHING;

-- Expanze & zahraničí
INSERT INTO partners (name, slug, short_description, full_description, website_url, contact_email, is_verified, sort_order)
VALUES
  ('Amnis FX', 'amnis-fx', 'Mezinárodní platby', 'Přesah do zahraničí, expanze mimo ČR a zakládání poboček.', 'https://amnis.com', 'fx@amnis.com', true, 70),
  ('Expats.cz', 'expats-cz', 'Služby pro expaty', 'Daňová a právní příprava pro komunitu cizinců a expanzi do ČR.', 'https://expats.cz', 'info@expats.cz', true, 71)
ON CONFLICT (slug) DO NOTHING;

-- Marketing & komunita
INSERT INTO partners (name, slug, short_description, full_description, website_url, contact_email, is_verified, sort_order)
VALUES
  ('Expats.cz Marketing', 'expats-cz-marketing', 'Marketing pro startup komunitu', 'Zviditelnění, mediální prostor, PR články, promo a pomoc s komunikací pro první zákazníky.', 'https://expats.cz', 'marketing@expats.cz', true, 80),
  ('CzechCrunch', 'czechcrunch', 'Startup média', 'Největší český tech a startup médium pro PR a marketing.', 'https://czechcrunch.cz', 'redakce@czechcrunch.cz', true, 81)
ON CONFLICT (slug) DO NOTHING;

-- Poznámka: Po vložení dat můžete upravit:
-- - Logo URL (až budete mít loga nahrána do Supabase Storage)
-- - Kontaktní emaily (nahraďte skutečnými)
-- - Plné popisy (rozšiřte dle potřeby)
-- - Website URL (ověřte správnost)
