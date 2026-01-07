-- Restore missing categories
-- (excluding 'marketing-a-komunita' which already exists)

INSERT INTO categories (slug, name_cs, name_en, description_cs, icon, sort_order, is_active) VALUES
('finance-a-ucetnictvi', 'Finance & účetnictví', 'Finance & Accounting', 'Účetnictví, reporting, cashflow, financování, FX, rozvod účetních procesů', 'DollarSign', 1, true),
('technologie', 'Technologické řešení a automatizace', 'Tech & Automation', 'Automatizace, datové scrapování, MVP technické prototypy', 'Code', 2, true),
('pravo-a-firma', 'Právo & zakládání firmy', 'Legal & Company Formation', 'Zakládání firem, nastavení smluv, právní struktura startupu, investor ready dokumenty', 'Scale', 3, true),
('hr-a-nabor', 'HR & nábor', 'HR & Recruitment', 'Nábor prvních zaměstnanců, psaní inzerátů, první kontrakty, trh práce pro startupy', 'Users', 4, true),
('cowork-a-zazemi', 'Cowork & zázemí', 'Cowork & Office', 'Pracovní prostor, zasedačky, eventová místa, sídlo', 'Building', 5, true),
('mentoring-a-edukace', 'Mentoring & edukace', 'Mentoring & Education', 'Startup mentoring, konzultace, ebooky, přednášky, office hours s odborníky', 'GraduationCap', 6, true),
('expanze-a-zahranici', 'Expanze & zahraničí', 'Expansion & International', 'Přesah do zahraničí, expanze mimo ČR, zakládání poboček, daňová a právní příprava', 'Globe', 7, true)
ON CONFLICT (slug) DO NOTHING;
