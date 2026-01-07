# Quick Start Guide

This guide will help you get StartupPackage running locally in under 10 minutes.

## Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including Next.js, React, Supabase, Tailwind CSS, and more.

## Step 2: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - Project name: `startuppackage`
   - Database password: (choose a strong password)
   - Region: (select closest to you)
5. Click "Create new project"
6. Wait 2-3 minutes for setup to complete

## Step 3: Get Your Supabase Credentials

1. In your Supabase project dashboard, click the ⚙️ Settings icon
2. Go to "API" section
3. Copy these values:
   - **Project URL** (starts with `https://xxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`)

## Step 4: Configure Environment Variables

1. Copy the example environment file:

```bash
cp .env.example .env.local
```

2. Open `.env.local` and replace with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 5: Set Up the Database

1. Open Supabase SQL Editor:
   - In your Supabase dashboard
   - Click "SQL Editor" in the left sidebar
   - Click "New Query"

2. Copy the entire contents of `supabase/migrations/20250107_initial.sql`

3. Paste into the SQL Editor and click "Run"

4. You should see "Success. No rows returned" message

## Step 6: Add Sample Data (Optional)

1. In the same SQL Editor, create another new query

2. Copy the entire contents of `supabase/seed.sql`

3. Paste and click "Run"

4. This will create sample categories, partners, and offers

## Step 7: Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You should see the StartupPackage homepage with categories and sample data!

## Step 8: Access the Admin Panel

The admin panel is at [http://localhost:3000/admin](http://localhost:3000/admin)

**Note:** Admin authentication is not yet configured. You'll need to:

1. Create an admin user in Supabase Auth
2. Add that user to the `admin_users` table

Quick way to test (temporary):

```sql
-- In Supabase SQL Editor
-- First create an auth user in the Authentication > Users section
-- Then add them to admin_users table (replace the UUID with your user's ID)

INSERT INTO admin_users (id, email, full_name, role, is_active)
VALUES (
  'your-user-uuid-here',
  'admin@startuppackage.cz',
  'Admin User',
  'admin',
  true
);
```

## Troubleshooting

### "Failed to fetch" errors

- Check that your Supabase URL and anon key are correct in `.env.local`
- Make sure you restarted the dev server after updating `.env.local`

### Database connection errors

- Verify your Supabase project is active (green status in dashboard)
- Check that RLS policies are set up correctly (they're in the migration file)

### Build errors with TypeScript

```bash
npm run typecheck
```

This will show you any type errors. Most should be resolved, but you may need to install peer dependencies:

```bash
npm install --save-dev class-variance-authority
```

### Icons not showing

Make sure Lucide React is installed:

```bash
npm install lucide-react
```

## Next Steps

1. **Read the Technical Specification**: Check [TECHNICAL_SPECIFICATION.md](./TECHNICAL_SPECIFICATION.md) for architecture details

2. **Customize the Homepage**: Edit files in `components/home/`

3. **Add More Categories**: Use the admin panel or SQL Editor

4. **Build Additional Pages**:
   - Category detail pages: `app/(public)/kategorie/[slug]/page.tsx`
   - Offer detail pages: `app/(public)/nabidka/[slug]/page.tsx`

5. **Set Up Email**: Add Resend API key to `.env.local` for email notifications

## Common Tasks

### Adding a New Category

```sql
INSERT INTO categories (slug, name_cs, description_cs, icon, sort_order, is_active)
VALUES (
  'nova-kategorie',
  'Nová Kategorie',
  'Popis nové kategorie',
  'Package',  -- Lucide icon name
  99,
  true
);
```

### Adding a New Partner

```sql
INSERT INTO partners (slug, name, short_description, website_url, contact_email, is_verified)
VALUES (
  'partner-slug',
  'Partner Name',
  'Krátký popis partnera',
  'https://partner.com',
  'contact@partner.com',
  true
);
```

### Viewing All Leads

Go to Supabase dashboard > Table Editor > `leads` table

Or query:

```sql
SELECT
  l.*,
  o.title_cs as offer_title,
  p.name as partner_name
FROM leads l
LEFT JOIN offers o ON l.offer_id = o.id
LEFT JOIN partners p ON l.partner_id = p.id
ORDER BY l.created_at DESC;
```

## Need Help?

- Check the [Technical Specification](./TECHNICAL_SPECIFICATION.md)
- Review [Next.js Documentation](https://nextjs.org/docs)
- Read [Supabase Documentation](https://supabase.com/docs)

Happy coding! 🚀
