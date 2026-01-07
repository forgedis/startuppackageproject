# Project Structure Overview

## Directory Tree

```
startuppackageproject/
│
├── 📁 app/                           # Next.js App Router
│   ├── 📁 (public)/                  # Public routes (no auth)
│   │   ├── layout.tsx                # Public layout with header/footer
│   │   ├── page.tsx                  # Homepage
│   │   ├── 📁 kategorie/
│   │   │   └── 📁 [slug]/
│   │   │       └── page.tsx          # Category detail (/kategorie/finance)
│   │   ├── 📁 partner/
│   │   │   └── 📁 [slug]/
│   │   │       └── page.tsx          # Partner profile (/partner/apify)
│   │   └── 📁 nabidka/
│   │       └── 📁 [slug]/
│   │           └── page.tsx          # Offer detail (/nabidka/apify-kredity)
│   │
│   ├── 📁 admin/                     # Admin panel (protected)
│   │   ├── layout.tsx                # Admin layout
│   │   ├── 📁 dashboard/
│   │   │   └── page.tsx              # Admin dashboard
│   │   ├── 📁 kategorie/
│   │   │   ├── page.tsx              # Categories list
│   │   │   ├── 📁 [id]/edit/
│   │   │   └── 📁 nova/
│   │   ├── 📁 partneri/
│   │   ├── 📁 nabidky/
│   │   └── 📁 leady/
│   │
│   ├── 📁 login/
│   │   └── page.tsx                  # Login page
│   │
│   ├── layout.tsx                    # Root layout
│   └── globals.css                   # Global styles + Tailwind
│
├── 📁 components/
│   ├── 📁 ui/                        # Base UI components (Shadcn-style)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   └── ...
│   │
│   ├── 📁 layout/
│   │   ├── header.tsx                # Main navigation
│   │   └── footer.tsx                # Footer with links
│   │
│   ├── 📁 home/                      # Homepage sections
│   │   ├── hero-section.tsx
│   │   ├── value-proposition.tsx
│   │   ├── category-grid.tsx
│   │   └── how-it-works.tsx
│   │
│   ├── 📁 categories/
│   │   └── category-card.tsx
│   │
│   ├── 📁 partners/
│   │   ├── partner-card.tsx
│   │   └── partner-header.tsx
│   │
│   ├── 📁 offers/
│   │   ├── offer-card.tsx
│   │   └── offer-detail-header.tsx
│   │
│   └── 📁 forms/
│       ├── lead-form.tsx             # Lead submission form
│       └── form-success.tsx
│
├── 📁 lib/
│   ├── 📁 supabase/
│   │   ├── client.ts                 # Client-side Supabase
│   │   ├── server.ts                 # Server-side Supabase
│   │   └── middleware.ts             # Auth middleware helper
│   │
│   ├── utils.ts                      # cn(), formatDate(), slugify()
│   ├── validations.ts                # Zod schemas
│   └── constants.ts                  # App constants
│
├── 📁 types/
│   ├── database.ts                   # Supabase generated types
│   └── index.ts                      # Extended types
│
├── 📁 supabase/
│   ├── 📁 migrations/
│   │   └── 20250107_initial.sql      # Database schema
│   └── seed.sql                      # Sample data
│
├── 📁 public/
│   ├── 📁 images/
│   └── 📁 logos/
│
├── 📄 middleware.ts                  # Next.js middleware (auth)
├── 📄 next.config.js                 # Next.js configuration
├── 📄 tailwind.config.ts             # Tailwind configuration
├── 📄 tsconfig.json                  # TypeScript configuration
├── 📄 package.json                   # Dependencies
├── 📄 .env.example                   # Environment variables template
├── 📄 .gitignore
│
├── 📄 README.md                      # Project documentation
├── 📄 QUICKSTART.md                  # Quick setup guide
├── 📄 TECHNICAL_SPECIFICATION.md     # Detailed architecture
└── 📄 PROJECT_STRUCTURE.md           # This file
```

## Key Files Explained

### Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and scripts |
| `next.config.js` | Next.js configuration (images, optimization) |
| `tailwind.config.ts` | Tailwind CSS theme and plugins |
| `tsconfig.json` | TypeScript compiler options |
| `.env.example` | Environment variables template |
| `middleware.ts` | Auth protection for admin routes |

### App Router Structure

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/(public)/page.tsx` | Homepage |
| `/kategorie/[slug]` | `app/(public)/kategorie/[slug]/page.tsx` | Category page |
| `/partner/[slug]` | `app/(public)/partner/[slug]/page.tsx` | Partner profile |
| `/nabidka/[slug]` | `app/(public)/nabidka/[slug]/page.tsx` | Offer detail |
| `/admin` | `app/admin/dashboard/page.tsx` | Admin dashboard |
| `/admin/kategorie` | `app/admin/kategorie/page.tsx` | Manage categories |
| `/admin/partneri` | `app/admin/partneri/page.tsx` | Manage partners |
| `/admin/nabidky` | `app/admin/nabidky/page.tsx` | Manage offers |
| `/admin/leady` | `app/admin/leady/page.tsx` | View leads |

### Component Organization

```
components/
├── ui/           → Reusable primitives (Button, Card, Input)
├── layout/       → Page layout (Header, Footer)
├── home/         → Homepage-specific sections
├── categories/   → Category-related components
├── partners/     → Partner-related components
├── offers/       → Offer-related components
└── forms/        → Form components
```

### Library Structure

```
lib/
├── supabase/     → Database clients
│   ├── client.ts     → For Client Components
│   ├── server.ts     → For Server Components
│   └── middleware.ts → For middleware
├── utils.ts      → Helper functions
├── validations.ts → Zod schemas
└── constants.ts  → App constants
```

### Type Definitions

```
types/
├── database.ts   → Generated from Supabase (run: supabase gen types)
└── index.ts      → Extended types with relations
```

## Component Dependencies

```
HomePage
  ├── HeroSection
  ├── ValueProposition
  ├── CategoryGrid
  │   └── CategoryCard
  └── HowItWorks

CategoryPage
  ├── CategoryHeader
  └── OfferGrid
      └── OfferCard

OfferPage
  ├── OfferDetailHeader
  ├── OfferDescription
  ├── OfferConditions
  ├── PartnerSection
  └── OfferCTASection
      └── LeadForm

AdminDashboard
  ├── StatsCard
  └── RecentLeadsTable
```

## Data Flow

```
User Request
    ↓
Next.js App Router
    ↓
Server Component (default)
    ↓
Supabase Server Client
    ↓
PostgreSQL Database
    ↓
Row Level Security (RLS)
    ↓
Data returned to component
    ↓
Rendered HTML sent to browser
```

## Development Workflow

1. **Start dev server**: `npm run dev`
2. **Edit components**: Changes hot-reload automatically
3. **Check types**: `npm run typecheck`
4. **Lint code**: `npm run lint`
5. **Build production**: `npm run build`

## File Naming Conventions

- **Components**: `kebab-case.tsx` (e.g., `hero-section.tsx`)
- **Pages**: `page.tsx` (Next.js convention)
- **Layouts**: `layout.tsx` (Next.js convention)
- **Types**: `PascalCase` (e.g., `Category`, `OfferWithPartner`)
- **Functions**: `camelCase` (e.g., `createClient`, `formatDate`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `APP_NAME`, `PRICING_TIERS`)

## Import Paths

Using TypeScript path aliases (`@/`):

```typescript
// ✅ Correct
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'
import type { Category } from '@/types'

// ❌ Avoid
import { Button } from '../../../components/ui/button'
```

## Environment Variables

| Variable | Location | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Client & Server | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client & Server | Public API key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Admin API key |
| `NEXT_PUBLIC_APP_URL` | Client & Server | App base URL |

**Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## Database Tables

| Table | Purpose | Access |
|-------|---------|--------|
| `categories` | Service categories | Public read |
| `partners` | Service providers | Public read (verified only) |
| `offers` | Partner offers | Public read (active only) |
| `leads` | Lead submissions | Public insert, Admin read |
| `admin_users` | Admin users | Admin only |

## Next Steps

1. ✅ Project structure is set up
2. ⏳ Install dependencies: `npm install`
3. ⏳ Configure Supabase credentials
4. ⏳ Run database migrations
5. ⏳ Start development server
6. ⏳ Build remaining pages

See [QUICKSTART.md](./QUICKSTART.md) for detailed setup instructions.
