-- Add more offers to ensure each category has at least 3 offers
-- 2025-01-12

-- First, let's get the category and partner IDs we'll need
-- Run this to see current state:
-- SELECT c.name_cs, c.slug, COUNT(o.id) as offer_count
-- FROM categories c
-- LEFT JOIN offers o ON o.category_id = c.id
-- GROUP BY c.id, c.name_cs, c.slug
-- ORDER BY c.name_cs;

-- ============================================
-- 1. TECHNOLOGICKÉ ŘEŠENÍ A AUTOMATIZACE
-- ============================================

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
  'apify-web-scraping-startup',
  p.id,
  c.id,
  'Startup kredit na web scraping a automatizaci',
  'Až $500 kreditů zdarma pro startupy',
  'Apify nabízí startupům kredit v hodnotě až $500 na platformu pro web scraping a automatizaci. Získejte přístup k tisícům připravených scraperů, RPA nástrojů a integracím. Ideální pro datově orientované startupy, které potřebují automatizovat sběr dat z webu.',
  '{"company_age": "< 2 roky", "revenue": "< 1M Kč", "employees": "< 10"}'::jsonb,
  'Chci kredit zdarma',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'apify'
  AND c.slug = 'technologicke-reseni-a-automatizace'
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
  'mvp-prototype-development',
  p.id,
  c.id,
  '50% sleva na vývoj MVP prototypu',
  'Rychlý vývoj funkčního prototypu za půl ceny',
  'DYPE nabízí startupům 50% slevu na vývoj MVP (Minimum Viable Product). Naši vývojáři vám pomohou během 4-8 týdnů vytvořit funkční prototyp, který můžete prezentovat investorům nebo prvním zákazníkům. Používáme moderní technologie a agilní metodiku.',
  '{"company_age": "< 1 rok", "revenue": "< 500K Kč", "employees": "< 5"}'::jsonb,
  'Mám zájem o MVP',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'dype'
  AND c.slug = 'technologicke-reseni-a-automatizace'
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
  'cloud-hosting-startup-package',
  p.id,
  c.id,
  'Cloud hosting s technickou podporou',
  'Zdarma první 3 měsíce včetně onboardingu',
  'Komplexní cloud hosting řešení s dedikovanou technickou podporou. Zahrnuje nastavení infrastruktury, CI/CD pipeline, monitoring a 24/7 support. Ideální pro tech startupy, které potřebují spolehlivé hosting řešení bez starostí.',
  '{"company_age": "< 3 roky", "revenue": "< 2M Kč", "employees": "< 15"}'::jsonb,
  'Tohle mě zajímá',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'apify'
  AND c.slug = 'technologicke-reseni-a-automatizace'
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- 2. PRÁVO & ZAKLÁDÁNÍ FIRMY
-- ============================================

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
  'eldison-company-foundation',
  p.id,
  c.id,
  'Založení s.r.o. za zvýhodněnou cenu',
  'Kompletní založení firmy včetně právního poradenství',
  'Eldison nabízí startupům komplexní službu založení s.r.o. za zvýhodněnou cenu. Zahrnuje přípravu všech dokumentů, jednání na notářství, zápis do obchodního rejstříku a konzultaci k právní struktuře startupu. Vše vyřídíme do 14 dnů.',
  '{"company_age": "nový projekt", "revenue": "0 Kč", "employees": "jakýkoliv počet"}'::jsonb,
  'Chci založit firmu',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'eldison'
  AND c.slug = 'pravo-a-zakladani-firmy'
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
  'legal-advisory-first-consultation',
  p.id,
  c.id,
  'Bezplatná právní konzultace pro startupy',
  'První hodina konzultace zdarma',
  'Lexolve poskytuje startupům bezplatnou úvodní konzultaci v délce 1 hodiny. Můžete se ptát na zakládání firmy, investiční smlouvy, GDPR, pracovněprávní vztahy nebo ochranu duševního vlastnictví. Získáte jasný přehled, co je potřeba řešit.',
  '{"company_age": "< 2 roky", "revenue": "jakýkoliv", "employees": "jakýkoliv počet"}'::jsonb,
  'Rezervovat konzultaci',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'lexolve'
  AND c.slug = 'pravo-a-zakladani-firmy'
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
  'investment-contracts-package',
  p.id,
  c.id,
  'Příprava investičních smluv',
  '30% sleva na přípravu dokumentace pro investory',
  'Kompletní právní servis pro přípravu dokumentů k investičnímu kolu. Zahrnuje term sheet, investiční smlouvu, SHA (akcionářskou dohodu) a stanovy. Zkušenost s desítkami úspěšných investičních kol českých startupů.',
  '{"company_age": "< 5 let", "revenue": "jakýkoliv", "employees": "jakýkoliv počet"}'::jsonb,
  'Potřebuji smlouvy',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'lexolve'
  AND c.slug = 'pravo-a-zakladani-firmy'
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- 3. FINANCE & ÚČETNICTVÍ
-- ============================================

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
  'finfarm-accounting-package',
  p.id,
  c.id,
  'Účetnictví a daně pro startupy',
  'První 3 měsíce za polovinu',
  'Finfarm se specializuje na účetnictví pro startupy a tech firmy. Nabízíme moderní online účetnictví, daňové optimalizace, cashflow monitoring a měsíční reporting. Rozumíme specifickým potřebám startupů včetně investičních kol a opcí pro zaměstnance.',
  '{"company_age": "< 3 roky", "revenue": "< 10M Kč", "employees": "< 20"}'::jsonb,
  'Mám zájem',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'finfarm'
  AND c.slug = 'finance-a-ucetnictvi'
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
  'amnis-fx-international-payments',
  p.id,
  c.id,
  'Zvýhodněné kurzy pro mezinárodní platby',
  'Ušetřete až 90% na poplatcích za FX transakce',
  'Amnis FX nabízí startupům speciální podmínky pro mezinárodní platby. Výhodné směnné kurzy, nízké poplatky a rychlé převody. Ideální pro startupy, které platí zahraničním dodavatelům nebo mají klienty v cizích měnách.',
  '{"company_age": "< 5 let", "revenue": "> 1M Kč", "employees": "jakýkoliv počet"}'::jsonb,
  'Chci lepší kurzy',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'amnis-fx'
  AND c.slug = 'finance-a-ucetnictvi'
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
  'flowpay-cashflow-management',
  p.id,
  c.id,
  'Cashflow management nástroj zdarma',
  '12 měsíců premium účtu bez poplatků',
  'Flowpay je nástroj pro řízení cashflow a platební morálky zákazníků. Automaticky sleduje faktury, posílá upomínky a poskytuje přehled o finanční situaci. Pro startupy nabízíme roční premium účet zdarma.',
  '{"company_age": "< 3 roky", "revenue": "> 500K Kč", "employees": "< 15"}'::jsonb,
  'Aktivovat účet',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'flowpay'
  AND c.slug = 'finance-a-ucetnictvi'
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- 4. MENTORING & EDUKACE
-- ============================================

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
  published_at,
  external_program_url
)
SELECT
  'czech-founders-membership',
  p.id,
  c.id,
  'Členství v komunitě Czech Founders',
  'Přístup k síti 500+ founders a mentorů',
  'Czech Founders je největší komunita startupových zakladatelů v ČR. Získáte přístup k pravidelným meetupům, workshopům od úspěšných founders, soukromému Slacku pro networking a exkluzivním nabídkám od partnerů. Ideální pro validaci nápadů a hledání co-founderů.',
  '{"company_age": "jakékoliv", "revenue": "jakýkoliv", "employees": "jakýkoliv počet"}'::jsonb,
  'Přidat se do komunity',
  true,
  NOW(),
  'https://czechfounders.org/join-our-community/'
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'czech-founders'
  AND c.slug = 'mentoring-a-edukace'
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
  'dype-expert-consultation',
  p.id,
  c.id,
  'Expertní konzultace tech a product',
  '3 hodiny konzultací s senior vývojáři',
  'DYPE nabízí startupům 3 hodiny konzultací zdarma s našimi senior vývojáři a product managery. Můžete konzultovat technickou architekturu, výběr technologií, product roadmap nebo code review. Pomůžeme vám vyhnout se častým chybám.',
  '{"company_age": "< 2 roky", "revenue": "< 5M Kč", "employees": "< 10"}'::jsonb,
  'Rezervovat konzultaci',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'dype'
  AND c.slug = 'mentoring-a-edukace'
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
  'experti-mentoring-program',
  p.id,
  c.id,
  'Mentoring od zkušených founders',
  'Pravidelné 1:1 sessions s mentorem',
  'Program mentoringu od Experti.cz spojuje začínající foundery s úspěšnými podnikateli. Získáte pravidelné 1:1 sessions, kde můžete konzultovat strategii, fundraising, hiring nebo sales. Mentoři mají zkušenosti s exity a fundraisingem.',
  '{"company_age": "< 3 roky", "revenue": "jakýkoliv", "employees": "< 20"}'::jsonb,
  'Najít mentora',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'experti'
  AND c.slug = 'mentoring-a-edukace'
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- 5. HR & NÁBOR
-- ============================================

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
  'startupjobs-job-posting',
  p.id,
  c.id,
  'Zdarma inzerát na StartupJobs',
  '3 měsíce premium inzerce bez poplatků',
  'StartupJobs je největší platforma pro nábor do startupů v ČR. Nabízíme 3 měsíce premium inzerce zdarma, včetně zvýraznění pozice a propagace na sociálních sítích. Oslovte kvalitní kandidáty, kteří aktivně hledají práci ve startupech.',
  '{"company_age": "< 5 let", "revenue": "jakýkoliv", "employees": "< 50"}'::jsonb,
  'Vytvořit inzerát',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'startupjobs'
  AND c.slug = 'hr-a-nabor'
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
  'hr-templates-package',
  p.id,
  c.id,
  'Šablony pracovních smluv a dokumentů',
  'Kompletní HR dokumentace připravená k použití',
  'Sada šablon pro nábor a HR procesy v raném startupu. Obsahuje pracovní smlouvy, DPP/DPČ, smlouvy o mlčenlivosti, interní směrnice, onboarding checklist a šablony pro performance review. Vše připravené právníky s focus na startupy.',
  '{"company_age": "< 3 roky", "revenue": "jakýkoliv", "employees": "< 20"}'::jsonb,
  'Stáhnout šablony',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'lexolve'
  AND c.slug = 'hr-a-nabor'
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
  'tribee-benefits-platform',
  p.id,
  c.id,
  'Zaměstnanecké benefity bez starostí',
  'Flexibilní benefitní program od prvního zaměstnance',
  'Tribee nabízí startupům flexibilní benefitní platformu. Zaměstnanci si vybírají z katalogu benefitů (stravenky, sport, vzdělávání, wellness). Startupům nabízíme zvýhodněné podmínky a nastavení účtu zdarma.',
  '{"company_age": "jakékoliv", "revenue": "jakýkoliv", "employees": "> 1"}'::jsonb,
  'Nastavit benefity',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'tribee'
  AND c.slug = 'hr-a-nabor'
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- 6. COWORKING & ZÁZEMÍ
-- ============================================

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
  'worklounge-coworking-package',
  p.id,
  c.id,
  'Měsíc coworkingu zdarma',
  'Fixed desk nebo hot desk v centru Prahy',
  'WorkLounge nabízí startupům měsíc coworkingu zdarma. Na výběr máte fixed desk nebo hot desk v moderních prostorách v centru Prahy. Zahrnuje rychlý internet, meeting rooms, kuchyňku a přístup do komunity dalších startupů.',
  '{"company_age": "< 2 roky", "revenue": "< 2M Kč", "employees": "< 5"}'::jsonb,
  'Rezervovat místo',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'worklounge'
  AND c.slug = 'coworking-a-zazemi'
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
  'opero-coworking-brno',
  p.id,
  c.id,
  'Coworking v Brně se slevou',
  '50% sleva na první 3 měsíce',
  'Opero je moderní coworking v centru Brna. Nabízíme startupům 50% slevu na první 3 měsíce nájmu. Výběr z private offices, fixed nebo hot desks. Skvělá komunita tech startupů, pravidelné networkingové eventy.',
  '{"company_age": "< 3 roky", "revenue": "< 5M Kč", "employees": "< 10"}'::jsonb,
  'Prohlédnout prostory',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'opero'
  AND c.slug = 'coworking-a-zazemi'
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
  'meeting-rooms-package',
  p.id,
  c.id,
  'Kredit na meeting rooms',
  '10 hodin meeting rooms zdarma',
  'Potřebujete místo na schůzky s investory nebo klienty? Získejte 10 hodin meeting rooms zdarma v našich prostorách. Moderně vybavené místnosti s AV technikou, flipcharty a cateringem. V centru města s dobrou dostupností.',
  '{"company_age": "< 2 roky", "revenue": "jakýkoliv", "employees": "jakýkoliv počet"}'::jsonb,
  'Rezervovat místnost',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'worklounge'
  AND c.slug = 'coworking-a-zazemi'
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- 7. EXPANZE & ZAHRANIČNÍ
-- ============================================

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
  'apify-international-expansion',
  p.id,
  c.id,
  'Podpora expanze do zahraničí',
  'Konzultace a networking pro globální růst',
  'Apify má zkušenosti s expanzí do USA a dalších trhů. Nabízíme konzultace ohledně expanze, představení investorům a partnerům v cílových trzích, a rady ohledně právní struktury a daní při mezinárodním růstu.',
  '{"company_age": "< 5 let", "revenue": "> 5M Kč", "employees": "> 5"}'::jsonb,
  'Konzultovat expanzi',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'apify'
  AND c.slug = 'expanze-a-zahranicni'
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
  'dype-international-team',
  p.id,
  c.id,
  'Nábor mezinárodního tech týmu',
  'Pomoc s najímáním vývojářů ze zahraničí',
  'DYPE má zkušenosti s najímáním vývojářů z celého světa. Pomůžeme vám nastavit proces remote náboru, najít kvalitní kandidáty v zahraničí a nastavit právní a daňovou strukturu pro mezinárodní tým.',
  '{"company_age": "< 5 let", "revenue": "> 2M Kč", "employees": "> 3"}'::jsonb,
  'Konzultovat nábor',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'dype'
  AND c.slug = 'expanze-a-zahranicni'
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
  'amnis-international-banking',
  p.id,
  c.id,
  'Mezinárodní banking pro startupy',
  'Multi-currency účty s výhodnými kurzy',
  'Amnis FX nabízí multi-currency účty ideální pro startupy s mezinárodními transakcemi. Otevřete účty v EUR, USD, GBP a dalších měnách. Výhodné kurzy, rychlé převody a integrace s účetními systémy.',
  '{"company_age": "jakékoliv", "revenue": "> 1M Kč", "employees": "jakýkoliv počet"}'::jsonb,
  'Založit účet',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'amnis-fx'
  AND c.slug = 'expanze-a-zahranicni'
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- 8. MARKETING & KOMUNITA
-- ============================================

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
  'czechcrunch-pr-package',
  p.id,
  c.id,
  'PR balíček od CzechCrunch',
  'Článek + propagace na sociálních sítích',
  'CzechCrunch nabízí startupům PR balíček - napsání článku o vašem startupu, interview s founderem a propagaci na sociálních sítích. Oslovte tisíce čtenářů ze startup scény, investorů a potenciálních zákazníků.',
  '{"company_age": "< 3 roky", "revenue": "jakýkoliv", "employees": "jakýkoliv počet"}'::jsonb,
  'Domluvit článek',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'czechcrunch'
  AND c.slug = 'marketing-a-komunita'
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
  'expats-marketing-consultation',
  p.id,
  c.id,
  'Marketing konzultace zdarma',
  'Hodina s marketingovými experty',
  'Expats.cz Marketing nabízí startupům hodinovou konzultaci zdarma. Probereme vaši marketing strategii, kanály, content marketing a lead generation. Dostanete akční plán s konkrétními kroky.',
  '{"company_age": "< 2 roky", "revenue": "< 5M Kč", "employees": "< 15"}'::jsonb,
  'Rezervovat konzultaci',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'expats-marketing'
  AND c.slug = 'marketing-a-komunita'
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
  'social-media-package',
  p.id,
  c.id,
  'Social media management se slevou',
  '3 měsíce správy soc. sítí za zvýhodněnou cenu',
  'Kompletní správa vašich sociálních sítí - LinkedIn, Instagram, Facebook, Twitter. Obsahová strategie, pravidelný posting, engagement s komunitou a reporting. Ideální pro B2B startupy, které potřebují budovat brand.',
  '{"company_age": "< 3 roky", "revenue": "> 500K Kč", "employees": "< 20"}'::jsonb,
  'Mám zájem',
  true,
  NOW()
FROM partners p
CROSS JOIN categories c
WHERE p.slug = 'expats-marketing'
  AND c.slug = 'marketing-a-komunita'
ON CONFLICT (slug) DO NOTHING;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Successfully added new offers to all categories!';
  RAISE NOTICE 'Run the verification query to check the results.';
END $$;
