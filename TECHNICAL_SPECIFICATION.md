# StartupPackage - Technical Specification

## 1. Project Overview

**StartupPackage** is a curated B2B marketplace connecting early-stage startups with verified service partners across multiple categories (Finance, HR, Tech, Legal, Marketing, etc.). The platform enables startups to discover relevant offers and submit qualified leads directly to partners.

### Core Value Proposition
- Zero friction: No accounts required for basic browsing and lead submission
- Curated quality: Manually verified partners and offers
- Clear value: Transparent conditions and pricing
- Startup-focused: Tailored for early-stage companies in CZ/CEE region

### Key Differentiators
- Single-page beta approach for fast validation
- Lead-first model (not transactional)
- Admin-curated content for quality control
- Mobile-first, SEO-optimized architecture

---

## 2. Product Goals

### Phase 1 (MVP - Beta)
- ✅ Launch functional one-page platform
- ✅ Enable lead submission flow
- ✅ Admin content management
- ✅ SEO for organic discovery
- ✅ Partner profile showcase

### Phase 2 (Growth)
- Partner dashboard for lead management
- Analytics and reporting
- Email automation workflows
- Advanced filtering and search
- Multi-language support (EN)

### Phase 3 (Scale)
- Startup user accounts
- Partner API integrations
- Marketplace features (reviews, ratings)
- Payment processing for premium offers

---

## 3. User Roles

### 3.1 Anonymous Visitor (Public)
**Permissions:**
- Browse categories and offers
- View partner details
- Submit lead forms
- Access FAQ and footer content

**No authentication required** - reduces friction for core user journey

### 3.2 Startup User (Future)
**Permissions:**
- All visitor permissions
- View submitted leads history
- Save favorite offers
- Receive personalized recommendations

### 3.3 Partner (Future)
**Permissions:**
- Access partner dashboard
- View received leads
- Update offer details (pending admin approval)
- View analytics

### 3.4 Admin
**Permissions:**
- Full CRUD on categories, partners, offers
- Lead management and moderation
- Content publishing
- SEO settings
- User management

---

## 4. Tech Stack & Justification

### 4.1 Core Stack

```yaml
Frontend Framework: Next.js 15 (App Router)
Styling: Tailwind CSS 4
Database: Supabase (PostgreSQL)
Authentication: Supabase Auth
Email: Resend / Supabase Edge Functions
Forms: React Hook Form + Zod
CMS: Custom Admin Panel (Supabase-powered)
Deployment: Vercel
Analytics: Vercel Analytics + Plausible
```

### 4.2 Rationale

**Why Next.js App Router?**
- Server Components reduce client bundle size
- Built-in SEO optimization (metadata API)
- Server Actions eliminate need for separate API routes
- Edge runtime support for global performance
- Streaming and Suspense for perceived performance

**Why Supabase over custom backend?**
- PostgreSQL with instant REST/GraphQL APIs
- Row Level Security (RLS) for data protection
- Real-time subscriptions (future partner dashboard)
- Built-in auth with social providers
- Storage for partner logos/images
- Edge Functions for serverless logic
- Reduces infrastructure complexity
- Cost-effective for MVP

**Why Tailwind CSS?**
- Utility-first = faster development
- Excellent mobile-first defaults
- Small production bundle with JIT
- Easy theming and design system
- No CSS-in-JS runtime cost

**Why custom admin vs headless CMS?**
- Full control over data models
- No vendor lock-in
- Tighter integration with Supabase
- Lower cost
- Custom workflows for partner approval

**Alternative considered:**
- Payload CMS: Overkill for simple CRUD
- Strapi: Adds unnecessary complexity
- Sanity: Great but not needed for structured data

---

## 5. Frontend Architecture

### 5.1 Next.js App Router Structure

```
app/
├── (public)/              # Public-facing pages (no auth)
│   ├── layout.tsx         # Main layout with header/footer
│   ├── page.tsx           # Homepage
│   ├── kategorie/
│   │   └── [slug]/
│   │       └── page.tsx   # Category detail page
│   ├── partner/
│   │   └── [slug]/
│   │       └── page.tsx   # Partner detail page
│   └── nabidka/
│       └── [slug]/
│           └── page.tsx   # Offer detail page
├── admin/                 # Protected admin panel
│   ├── layout.tsx         # Admin layout
│   ├── dashboard/
│   ├── kategorie/
│   ├── partneri/
│   ├── nabidky/
│   └── leady/
├── api/                   # API routes (if needed)
│   └── webhooks/
└── actions/               # Server Actions
    ├── leads.ts
    ├── partners.ts
    └── offers.ts
```

### 5.2 Rendering Strategy

**Homepage** → Server Component
- Static metadata for SEO
- Dynamic data fetching with caching
- Revalidate every 1 hour

**Category Pages** → Server Component
- Static generation at build time
- ISR (Incremental Static Regeneration) for updates
- Edge cached

**Offer Detail** → Server Component
- Dynamic route with metadata generation
- Server-side data fetching
- Optimistic UI for form submission

**Admin Panel** → Client Components (where interactive)
- Server Components for data display
- Client Components for forms/tables
- Protected by middleware

### 5.3 Performance Optimizations

```typescript
// next.config.js
const config = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { hostname: 'supabase.co' }
    ]
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
    ppr: true // Partial Pre-Rendering
  }
}
```

**Key strategies:**
- Image optimization with Next.js Image
- Font optimization (local fonts)
- Code splitting by route
- Suspense boundaries for progressive loading
- Server Components by default
- Client Components only when necessary

---

## 6. Backend Strategy

### 6.1 Architecture Decision

**Hybrid approach:**
- **Supabase as primary database** (PostgreSQL)
- **Server Actions for mutations** (form submissions)
- **Edge Functions for complex logic** (email workflows)
- **API routes only for webhooks** (external integrations)

### 6.2 Why Not a Separate Backend?

For this use case, a separate Node/Express backend would be:
- ❌ Over-engineered
- ❌ More infrastructure to manage
- ❌ Slower development
- ❌ Additional latency
- ❌ More complex deployment

**Supabase + Server Actions provides:**
- ✅ Type-safe database client
- ✅ Automatic API generation
- ✅ Built-in auth
- ✅ Real-time capabilities
- ✅ Edge deployment
- ✅ Simplified architecture

### 6.3 When to Add a Separate Backend?

Consider custom backend if:
- Complex business logic (pricing engines)
- Heavy background jobs
- Third-party API orchestration
- Need for non-Supabase database
- Microservices architecture

**Current assessment:** Not needed for Phase 1-2

---

## 7. Database Schema

### 7.1 Core Tables

```sql
-- Categories (Oblasti)
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name_cs TEXT NOT NULL,
  name_en TEXT,
  description_cs TEXT,
  icon TEXT, -- Lucide icon name
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Partners
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

-- Offers (Nabídky)
CREATE TABLE offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  partner_id UUID REFERENCES partners(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  title_cs TEXT NOT NULL,
  subtitle_cs TEXT,
  description_cs TEXT NOT NULL,

  -- Pricing details
  pricing_tier TEXT, -- 'starter', 'grower', 'scaler'
  pricing_details JSONB, -- Flexible structure for complex pricing

  -- Conditions
  conditions JSONB, -- { "company_age": "< 2 years", "revenue": "< 5M" }

  -- CTA
  cta_text TEXT DEFAULT 'Mám zájem',

  -- SEO
  meta_title TEXT,
  meta_description TEXT,

  -- Status
  is_active BOOLEAN DEFAULT true,
  published_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  offer_id UUID REFERENCES offers(id) ON DELETE SET NULL,
  partner_id UUID REFERENCES partners(id) ON DELETE SET NULL,

  -- Lead data
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company_name TEXT,
  note TEXT,

  -- UTM tracking
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,

  -- Status
  status TEXT DEFAULT 'new', -- 'new', 'contacted', 'qualified', 'converted', 'rejected'

  -- Consent
  gdpr_consent BOOLEAN DEFAULT false,
  marketing_consent BOOLEAN DEFAULT false,

  -- Meta
  ip_address INET,
  user_agent TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin Users
CREATE TABLE admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'admin', -- 'admin', 'super_admin'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lead Activity Log (optional)
CREATE TABLE lead_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  action TEXT NOT NULL, -- 'status_changed', 'note_added'
  details JSONB,
  created_by UUID REFERENCES admin_users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 7.2 Indexes

```sql
CREATE INDEX idx_offers_partner ON offers(partner_id);
CREATE INDEX idx_offers_category ON offers(category_id);
CREATE INDEX idx_leads_offer ON leads(offer_id);
CREATE INDEX idx_leads_partner ON leads(partner_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created ON leads(created_at DESC);
```

### 7.3 Row Level Security (RLS)

```sql
-- Public read access to active content
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active categories"
  ON categories FOR SELECT
  USING (is_active = true);

ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view verified partners"
  ON partners FOR SELECT
  USING (is_verified = true);

ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active offers"
  ON offers FOR SELECT
  USING (is_active = true AND published_at IS NOT NULL);

-- Leads: No public access
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Only admins can view leads"
  ON leads FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = true
  ));

-- Admins have full access
CREATE POLICY "Admins can manage all"
  ON categories FOR ALL
  USING (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = true
  ));
```

---

## 8. Authentication & Permissions

### 8.1 Public Access (No Auth)

For MVP, **no authentication required** for:
- Browsing content
- Viewing offers
- Submitting leads

**Benefits:**
- Zero friction
- Faster conversions
- Simpler UX
- Better for SEO

### 8.2 Admin Authentication

**Method:** Supabase Auth (Email/Password)

```typescript
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const { data: { session } } = await supabase.auth.getSession()

  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Check if user is admin
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('is_active')
      .eq('id', session.user.id)
      .single()

    if (!adminUser?.is_active) {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }
  }

  return res
}
```

### 8.3 Future: Partner Authentication

When partners need dashboard access:
- Same Supabase Auth
- Separate `partner_users` table
- Role-based access control (RBAC)
- Partners can only see their own leads

---

## 9. Folder Structure

```
startuppackage/
├── app/
│   ├── (public)/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Homepage
│   │   ├── kategorie/
│   │   │   └── [slug]/
│   │   │       └── page.tsx            # Category page
│   │   ├── partner/
│   │   │   └── [slug]/
│   │   │       └── page.tsx            # Partner profile
│   │   ├── nabidka/
│   │   │   └── [slug]/
│   │   │       └── page.tsx            # Offer detail
│   │   └── o-nas/
│   │       └── page.tsx                # About page
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── kategorie/
│   │   │   ├── page.tsx
│   │   │   ├── [id]/
│   │   │   │   └── edit/
│   │   │   │       └── page.tsx
│   │   │   └── nova/
│   │   │       └── page.tsx
│   │   ├── partneri/
│   │   │   ├── page.tsx                # Partners list
│   │   │   ├── [id]/
│   │   │   │   └── edit/
│   │   │   │       └── page.tsx
│   │   │   └── novy/
│   │   │       └── page.tsx
│   │   ├── nabidky/
│   │   │   ├── page.tsx
│   │   │   ├── [id]/
│   │   │   │   └── edit/
│   │   │   │       └── page.tsx
│   │   │   └── nova/
│   │   │       └── page.tsx
│   │   └── leady/
│   │       ├── page.tsx
│   │       └── [id]/
│   │           └── page.tsx            # Lead detail
│   ├── login/
│   │   └── page.tsx
│   ├── api/
│   │   └── webhooks/
│   │       └── route.ts
│   ├── actions/                        # Server Actions
│   │   ├── leads.ts
│   │   ├── partners.ts
│   │   ├── offers.ts
│   │   └── categories.ts
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/                             # Shadcn components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── table.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── navigation.tsx
│   ├── home/
│   │   ├── hero-section.tsx
│   │   ├── value-proposition.tsx
│   │   ├── category-grid.tsx
│   │   └── how-it-works.tsx
│   ├── categories/
│   │   ├── category-card.tsx
│   │   └── category-header.tsx
│   ├── partners/
│   │   ├── partner-card.tsx
│   │   ├── partner-header.tsx
│   │   └── partner-offers-list.tsx
│   ├── offers/
│   │   ├── offer-card.tsx
│   │   ├── offer-detail-header.tsx
│   │   ├── offer-conditions.tsx
│   │   └── offer-cta-section.tsx
│   ├── forms/
│   │   ├── lead-form.tsx
│   │   ├── lead-form-modal.tsx
│   │   └── form-success.tsx
│   └── admin/
│       ├── data-table.tsx
│       ├── sidebar.tsx
│       ├── stats-card.tsx
│       └── forms/
│           ├── category-form.tsx
│           ├── partner-form.tsx
│           └── offer-form.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts               # Client-side Supabase
│   │   ├── server.ts               # Server-side Supabase
│   │   └── types.ts                # Generated types
│   ├── utils.ts                    # cn() helper, etc.
│   ├── validations.ts              # Zod schemas
│   ├── constants.ts
│   └── hooks/
│       ├── use-lead-form.ts
│       └── use-toast.ts
├── types/
│   ├── database.ts                 # Supabase generated types
│   └── index.ts                    # App-specific types
├── public/
│   ├── images/
│   ├── logos/
│   └── favicon/
├── supabase/
│   ├── migrations/
│   │   └── 20250107_initial.sql
│   └── seed.sql
├── .env.local
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 10. Key Pages & Components

### 10.1 Homepage (`/`)

**Purpose:** High-impact landing page with clear value proposition

**Sections:**
1. Hero with headline + CTA
2. Value proposition (3 benefits)
3. Category grid (6-9 categories)
4. How it works (3 steps)
5. Featured partners
6. Social proof / testimonials (future)
7. Footer with FAQ

**Key Components:**
```typescript
// app/(public)/page.tsx
import { CategoryGrid } from '@/components/home/category-grid'
import { HeroSection } from '@/components/home/hero-section'
import { HowItWorks } from '@/components/home/how-it-works'

export default async function HomePage() {
  const categories = await getActiveCategories()
  const featuredPartners = await getFeaturedPartners()

  return (
    <>
      <HeroSection />
      <ValueProposition />
      <CategoryGrid categories={categories} />
      <HowItWorks />
      <FeaturedPartners partners={featuredPartners} />
    </>
  )
}
```

**SEO Metadata:**
```typescript
export const metadata: Metadata = {
  title: 'StartupPackage | Vše, co váš startup potřebuje k rozjezdu',
  description: 'Přinášíme startupům v rané fázi zvýhodněné balíčky nástrojů...',
  openGraph: {
    title: 'StartupPackage',
    description: '...',
    images: ['/og-image.png']
  }
}
```

### 10.2 Category Page (`/kategorie/[slug]`)

**Purpose:** Show all offers within a category

**Layout:**
- Category header (name, description, icon)
- Filter/sort controls (future)
- Offer cards grid
- Related categories

```typescript
// app/(public)/kategorie/[slug]/page.tsx
export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map(cat => ({ slug: cat.slug }))
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = params
  const category = await getCategoryBySlug(slug)
  const offers = await getOffersByCategory(category.id)

  return (
    <>
      <CategoryHeader category={category} />
      <OfferGrid offers={offers} />
    </>
  )
}
```

### 10.3 Offer Detail Page (`/nabidka/[slug]`)

**Purpose:** Full offer details with lead form

**Sections:**
1. Offer header (title, partner logo)
2. Description
3. Pricing table
4. Conditions
5. "About Partner" section
6. Lead form (sticky CTA)

```typescript
// app/(public)/nabidka/[slug]/page.tsx
export default async function OfferPage({ params }: Props) {
  const offer = await getOfferBySlug(params.slug)
  const partner = await getPartner(offer.partner_id)

  return (
    <>
      <OfferDetailHeader offer={offer} partner={partner} />
      <OfferDescription content={offer.description_cs} />
      <OfferConditions conditions={offer.conditions} />
      <PartnerSection partner={partner} />
      <OfferCTASection offer={offer} /> {/* Includes modal form */}
    </>
  )
}
```

**Lead Form Modal:**
```typescript
// components/forms/lead-form.tsx
'use client'

export function LeadForm({ offerId, partnerId }: Props) {
  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema)
  })

  async function onSubmit(data: LeadFormValues) {
    const result = await submitLead({
      ...data,
      offerId,
      partnerId
    })

    if (result.success) {
      toast.success('Děkujeme! Brzy vás kontaktujeme.')
      // Send confirmation email
      // Notify partner
    }
  }

  return (
    <Form {...form}>
      <FormField name="first_name" label="Jméno" />
      <FormField name="last_name" label="Příjmení" />
      <FormField name="email" label="Email" />
      <FormField name="phone" label="Telefon" />
      <FormField name="company_name" label="Název firmy" />
      <FormField name="note" label="Poznámka" />
      <Checkbox name="gdpr_consent" label="Souhlasím se zpracováním..." />
      <Button type="submit">Odeslat</Button>
    </Form>
  )
}
```

### 10.4 Admin Dashboard (`/admin/dashboard`)

**Purpose:** Overview of key metrics

**Widgets:**
- Total leads (today, this week, this month)
- Top performing offers
- Recent leads table
- Partner activity

```typescript
// app/admin/dashboard/page.tsx
export default async function AdminDashboard() {
  const stats = await getDashboardStats()
  const recentLeads = await getRecentLeads(10)

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <StatsCard title="Leads Today" value={stats.leadsToday} />
      <StatsCard title="Active Offers" value={stats.activeOffers} />
      <StatsCard title="Partners" value={stats.totalPartners} />

      <div className="col-span-3">
        <RecentLeadsTable leads={recentLeads} />
      </div>
    </div>
  )
}
```

### 10.5 Admin CRUD Pages

**Pattern:** Consistent table → form flow

```typescript
// app/admin/partneri/page.tsx
export default async function PartnersListPage() {
  const partners = await getAllPartners()

  return (
    <>
      <PageHeader
        title="Partneři"
        action={<Link href="/admin/partneri/novy">Přidat</Link>}
      />
      <DataTable
        columns={partnerColumns}
        data={partners}
      />
    </>
  )
}
```

---

## 11. Admin Panel / CMS Strategy

### 11.1 Decision: Custom Admin vs Headless CMS

**Choice: Custom Admin Panel**

**Justification:**
- Simple CRUD operations
- Full control over UX
- Direct Supabase integration
- No additional cost
- Easier to customize for workflows (e.g., partner approval)

**When to reconsider:**
- Need for multi-tenant partner access
- Complex content workflows
- Non-technical admins need UI builder

### 11.2 Admin Features

**Core functionality:**
- Categories: CRUD + ordering
- Partners: CRUD + verification status
- Offers: CRUD + publish/unpublish
- Leads: View, filter, export, status updates
- Settings: SEO metadata, email templates

**UI Library:** Shadcn/ui (Radix + Tailwind)
- Data tables with sorting/filtering
- Form validation with Zod
- Toast notifications
- Modal dialogs

### 11.3 Admin UX Principles

- **Fast access:** Dashboard shows key metrics immediately
- **Bulk actions:** Select multiple, change status
- **Search & filter:** Find anything quickly
- **Auto-save:** Draft mode for offers
- **Preview:** See public view before publishing

---

## 12. SEO & Content Strategy

### 12.1 Technical SEO

**Next.js Metadata API:**
```typescript
// app/(public)/nabidka/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const offer = await getOfferBySlug(params.slug)

  return {
    title: offer.meta_title || `${offer.title_cs} | StartupPackage`,
    description: offer.meta_description || offer.subtitle_cs,
    openGraph: {
      title: offer.title_cs,
      description: offer.subtitle_cs,
      images: [offer.partner.logo_url],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image'
    }
  }
}
```

**Structured Data (JSON-LD):**
```typescript
// components/seo/structured-data.tsx
export function OfferStructuredData({ offer, partner }: Props) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: offer.title_cs,
    description: offer.description_cs,
    seller: {
      '@type': 'Organization',
      name: partner.name,
      url: partner.website_url
    },
    availability: 'https://schema.org/InStock'
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
```

### 12.2 Content Strategy

**URL Structure:**
```
/ (homepage)
/kategorie/finance-a-ucetnictvi
/kategorie/technologie
/partner/apify
/nabidka/apify-4000-kreditu
/o-nas
/faq
```

**Keyword Strategy:**
- Primary: "startup balíček", "startup nástroje ČR"
- Secondary: "accounting for startups", "HR tools for startups"
- Long-tail: "Apify kredity pro startupy", "zdarma účetnictví startup"

**Content Pages:**
- Blog (future): SEO-driven content
- Case studies: "How Startup X saved €10k"
- Partner success stories

### 12.3 Performance SEO

**Core Web Vitals Targets:**
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

**Optimizations:**
- Image optimization (WebP, AVIF)
- Font optimization (local fonts, font-display: swap)
- Lazy loading below fold
- Preload critical assets
- Edge caching (Vercel)

---

## 13. Performance & Security Best Practices

### 13.1 Performance

**Caching Strategy:**
```typescript
// lib/supabase/server.ts
export async function getActiveCategories() {
  return unstable_cache(
    async () => {
      const { data } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order')

      return data
    },
    ['active-categories'],
    { revalidate: 3600 } // 1 hour
  )()
}
```

**Image Optimization:**
```typescript
// next.config.js
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200],
  imageSizes: [16, 32, 48, 64, 96, 128, 256],
  minimumCacheTTL: 60
}
```

**Bundle Optimization:**
- Tree-shake unused imports
- Dynamic imports for heavy components
- Analyze bundle with `@next/bundle-analyzer`

### 13.2 Security

**Environment Variables:**
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx (server-only)

RESEND_API_KEY=xxx
```

**Input Validation:**
```typescript
// lib/validations.ts
import { z } from 'zod'

export const leadSchema = z.object({
  first_name: z.string().min(2, 'Jméno musí mít alespoň 2 znaky'),
  last_name: z.string().min(2),
  email: z.string().email('Neplatný email'),
  phone: z.string().regex(/^\+?[0-9]{9,15}$/, 'Neplatné telefonní číslo'),
  company_name: z.string().min(2),
  note: z.string().max(500).optional(),
  gdpr_consent: z.boolean().refine(val => val === true, {
    message: 'Musíte souhlasit se zpracováním osobních údajů'
  })
})
```

**Rate Limiting:**
```typescript
// app/actions/leads.ts
import { ratelimit } from '@/lib/redis'

export async function submitLead(data: LeadFormValues) {
  const ip = headers().get('x-forwarded-for') || 'unknown'

  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return { error: 'Příliš mnoho požadavků. Zkuste to později.' }
  }

  // Process lead...
}
```

**CSRF Protection:** Built-in with Next.js Server Actions

**XSS Prevention:**
- Never use `dangerouslySetInnerHTML` with user input
- Sanitize rich text if needed (DOMPurify)

### 13.3 Monitoring

**Error Tracking:** Sentry
```typescript
// sentry.client.config.ts
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV
})
```

**Analytics:**
- Vercel Analytics (Core Web Vitals)
- Plausible (privacy-friendly)
- Custom events for lead submissions

**Logging:**
```typescript
// lib/logger.ts
export const logger = {
  info: (msg: string, meta?: any) => console.log(msg, meta),
  error: (msg: string, error: Error) => {
    console.error(msg, error)
    Sentry.captureException(error)
  }
}
```

---

## 14. Deployment Strategy

### 14.1 Infrastructure

**Platform:** Vercel

**Rationale:**
- Native Next.js support
- Global edge network
- Automatic HTTPS
- Preview deployments
- Environment variable management
- Web Analytics included

**Database:** Supabase Cloud (managed PostgreSQL)

### 14.2 Environments

```
Development → Local (localhost:3000)
Staging → Vercel Preview (branch deploys)
Production → startuppackage.cz
```

**Branch Strategy:**
```
main → production deployment
develop → staging deployment
feature/* → preview deployments
```

### 14.3 CI/CD Pipeline

**GitHub Actions:**
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint

  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run typecheck

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
```

**Deployment Checklist:**
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Seed data loaded
- [ ] DNS records configured
- [ ] SSL certificate active
- [ ] Error tracking enabled
- [ ] Analytics configured

### 14.4 Database Migration Strategy

```bash
# supabase/migrations/20250107_initial.sql
-- Create all tables, indexes, RLS policies

# Deploy
supabase db push

# Rollback
supabase db reset
```

**Migration workflow:**
1. Write migration SQL
2. Test locally with `supabase start`
3. Push to staging
4. Verify with seed data
5. Push to production
6. Monitor logs

---

## 15. Future Phases & Scalability

### 15.1 Phase 2: Partner Dashboard

**Features:**
- Partner login (Supabase Auth)
- View received leads
- Lead status management
- Analytics dashboard
- Profile editing (requires approval)

**Technical additions:**
- Partner role in RLS policies
- Real-time lead notifications (Supabase Realtime)
- Email templates (Resend)
- Partner API tokens (future integrations)

### 15.2 Phase 3: Startup Accounts

**Features:**
- Startup user registration
- Lead history
- Saved offers
- Recommendations

**Technical additions:**
- User profiles table
- Favorite offers (many-to-many)
- Recommendation engine (simple ML)

### 15.3 Scalability Considerations

**Current architecture scales to:**
- 10,000+ monthly visitors
- 1,000+ leads/month
- 100+ partners
- 500+ offers

**When to scale infrastructure:**
- **>100k visitors/month:** Consider CDN caching layer
- **>10k leads/month:** Add background job queue (BullMQ)
- **>500 partners:** Implement search (Algolia/Meilisearch)
- **Multiple regions:** Multi-region Supabase or split read replicas

**Potential bottlenecks:**
- Supabase API rate limits → Implement connection pooling
- Email sending → Add queue (Inngest/Trigger.dev)
- Image storage → Move to Cloudflare Images

### 15.4 Technical Debt Prevention

**Code quality:**
- ESLint + Prettier configured
- TypeScript strict mode
- Automated tests (E2E with Playwright)
- Component documentation (Storybook)

**Refactoring triggers:**
- Component > 300 lines → Split
- Repeated logic → Extract to hook/util
- Slow queries → Add index or cache

---

## 16. Open Questions & Decisions Needed

### 16.1 Email Strategy

**Options:**
1. **Resend** (modern, developer-friendly)
2. **SendGrid** (enterprise-grade, more features)
3. **Supabase Edge Functions** (custom SMTP)

**Recommendation:** Resend
- Best DX
- React Email templates
- Generous free tier
- Easy tracking

### 16.2 Payment Processing (Future)

**Options:**
1. **Stripe** (global, best UX)
2. **Comgate** (CZ-focused)
3. **Hybrid:** Stripe primary, Comgate fallback

**Recommendation:** Start with Stripe
- Better docs
- Easier integration
- Add Comgate later if needed

### 16.3 Search & Filtering

**Phase 1:** Client-side filtering (simple)
**Phase 2:** Supabase full-text search
**Phase 3:** Algolia (if >1000 offers)

### 16.4 Analytics Depth

**Minimal:** Vercel Analytics + Plausible
**Standard:** + Google Analytics 4
**Advanced:** + Mixpanel (event tracking)

**Recommendation:** Start minimal, add GA4 when traffic grows

---

## 17. Success Metrics

### 17.1 Technical KPIs

- **Performance:** Lighthouse score > 95
- **Uptime:** 99.9% availability
- **TTFB:** < 200ms (Edge deployment)
- **Build time:** < 3 minutes

### 17.2 Product KPIs

- **Conversion rate:** 5% (visitors → lead submissions)
- **Time to submit lead:** < 2 minutes
- **Bounce rate:** < 50%
- **Return visitors:** 20%

### 17.3 Business KPIs

- **Leads/month:** 100+ (Phase 1 target)
- **Partner satisfaction:** NPS > 40
- **Lead quality:** 70% qualified
- **CAC:** < €5 (via SEO)

---

## 18. Development Timeline (Estimates)

**Phase 1 (MVP):** 6-8 weeks
- Week 1-2: Setup, database, auth
- Week 3-4: Public pages (homepage, category, offer)
- Week 5-6: Admin panel (CRUD)
- Week 7: Lead form, email automation
- Week 8: Testing, polish, deploy

**Phase 2 (Partner Dashboard):** 4 weeks
**Phase 3 (Startup Accounts):** 6 weeks

---

## 19. Team Recommendations

**Ideal team for Phase 1:**
- 1x Full-stack developer (Next.js + Supabase)
- 1x Designer (UI/UX + branding)
- 0.5x Product manager (part-time)

**Can be built by solo developer:** Yes (10-12 weeks)

---

## 20. Final Architecture Summary

```
┌─────────────────────────────────────────────────────────┐
│                    USERS                                │
│  (Startups, Partners, Admins)                          │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│              VERCEL EDGE NETWORK                        │
│  (Next.js 15 App Router + Server Components)           │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │  Public Pages│  │ Admin Panel  │  │ Server Actions│ │
│  │  (SSR/ISR)   │  │ (Auth + RLS) │  │ (Mutations)   │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                   SUPABASE                              │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │  PostgreSQL  │  │  Auth        │  │  Storage     │ │
│  │  (with RLS)  │  │  (Magic Link)│  │  (Images)    │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐                   │
│  │  Edge Fns    │  │  Realtime    │                   │
│  │  (Emails)    │  │  (Future)    │                   │
│  └──────────────┘  └──────────────┘                   │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│              EXTERNAL SERVICES                          │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Resend     │  │   Sentry     │  │  Plausible   │ │
│  │   (Email)    │  │  (Errors)    │  │ (Analytics)  │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## 21. Conclusion

This architecture provides:

✅ **Simplicity:** No over-engineering, leverages platform strengths
✅ **Performance:** Edge deployment, optimized rendering
✅ **Scalability:** Can grow to 100k+ users without major refactor
✅ **Maintainability:** Clear structure, modern tooling
✅ **Cost-efficiency:** Minimal infrastructure, generous free tiers
✅ **Developer Experience:** Type-safe, fast iteration
✅ **User Experience:** Fast load times, smooth interactions

**Core principle:** Build for today's needs, architect for tomorrow's scale.

The system is designed to launch quickly (Phase 1), validate product-market fit, then scale deliberately based on real usage data—not hypothetical requirements.

---

**Document Version:** 1.0
**Last Updated:** 2026-01-07
**Author:** Claude (Senior Technical Architect)
**Status:** Ready for Implementation
