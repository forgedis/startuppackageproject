# StartupPackage

A curated B2B marketplace connecting early-stage startups with verified service partners across multiple categories (Finance, HR, Tech, Legal, Marketing, etc.).

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**

```bash
cd startuppackageproject
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Update the following variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (keep secret!)

4. **Set up the database**

First, create a new Supabase project at [supabase.com](https://supabase.com)

Then run the initial migration:

```bash
# Copy the contents of supabase/migrations/20250107_initial.sql
# and run it in your Supabase SQL Editor
```

5. **Seed the database (optional)**

```bash
# Copy the contents of supabase/seed.sql
# and run it in your Supabase SQL Editor
```

6. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
startuppackage/
├── app/                      # Next.js App Router
│   ├── (public)/            # Public-facing pages
│   │   ├── layout.tsx       # Public layout
│   │   ├── page.tsx         # Homepage
│   │   ├── kategorie/       # Category pages
│   │   ├── partner/         # Partner pages
│   │   └── nabidka/         # Offer pages
│   ├── admin/               # Admin panel
│   ├── globals.css          # Global styles
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── ui/                  # Base UI components
│   ├── layout/              # Layout components
│   ├── home/                # Homepage sections
│   └── forms/               # Form components
├── lib/                     # Utilities
│   ├── supabase/            # Supabase clients
│   ├── utils.ts             # Utility functions
│   ├── validations.ts       # Zod schemas
│   └── constants.ts         # App constants
├── types/                   # TypeScript types
│   ├── database.ts          # Database types
│   └── index.ts             # App types
├── supabase/                # Database
│   ├── migrations/          # SQL migrations
│   └── seed.sql             # Seed data
└── public/                  # Static assets
```

## Key Features

### Phase 1 (MVP)
- ✅ Homepage with value proposition
- ✅ Category browsing
- ✅ Partner profiles
- ✅ Offer details
- ✅ Lead submission forms
- ✅ Admin panel (CRUD)
- ✅ SEO optimization

### Phase 2 (Planned)
- Partner dashboard
- Lead management
- Email automation
- Analytics

### Phase 3 (Planned)
- Startup user accounts
- Saved offers
- Recommendations

## Database Schema

### Tables

- `categories` - Service categories (Finance, HR, Tech, etc.)
- `partners` - Service providers
- `offers` - Individual offers from partners
- `leads` - Lead submissions from startups
- `admin_users` - Admin users

See [TECHNICAL_SPECIFICATION.md](./TECHNICAL_SPECIFICATION.md) for detailed schema.

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript compiler check
```

### Code Quality

- ESLint for code linting
- TypeScript for type safety
- Prettier for code formatting (recommended)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables

Make sure to set these in your deployment platform:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_APP_URL`

## Contributing

This is a private project. For questions or support, contact the development team.

## License

Proprietary - All rights reserved

## Support

For technical questions, refer to [TECHNICAL_SPECIFICATION.md](./TECHNICAL_SPECIFICATION.md)
