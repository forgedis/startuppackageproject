# Installation Checklist ✅

## Step 1: Dependencies ✅ COMPLETE
- [x] Run `npm install`
- [x] 386 packages installed
- [x] No vulnerabilities found

## Step 2: Environment Variables ⚠️ ACTION REQUIRED

You need to set up Supabase credentials in `.env.local`

### How to Get Your Supabase Credentials:

1. **Go to** [supabase.com](https://supabase.com)
2. **Sign up** or log in
3. **Create a new project**:
   - Name: `startuppackage`
   - Database password: Choose a strong password
   - Region: Select closest to your location
   - Click "Create new project"
   - Wait 2-3 minutes for initialization

4. **Get your credentials**:
   - Click the ⚙️ **Settings** icon (bottom left)
   - Go to **API** section
   - Copy these three values:

```
Project URL → NEXT_PUBLIC_SUPABASE_URL
anon/public key → NEXT_PUBLIC_SUPABASE_ANON_KEY
service_role key → SUPABASE_SERVICE_ROLE_KEY
```

5. **Update `.env.local`**:
   - Open the file: `.env.local`
   - Replace the placeholder values with your actual credentials
   - Save the file

### ⚠️ Current Status:
```bash
# Your .env.local file needs real credentials
# Currently has placeholders - the app won't work until you update it!
```

## Step 3: Database Setup ⏳ TODO

Once you have Supabase credentials:

1. **Open Supabase SQL Editor**:
   - In your Supabase dashboard
   - Click "SQL Editor" in left sidebar
   - Click "New query"

2. **Run the migration**:
   - Open this file: `supabase/migrations/20250107_initial.sql`
   - Copy ALL the contents
   - Paste into Supabase SQL Editor
   - Click "Run" button
   - Should see "Success. No rows returned"

3. **Add sample data (optional)**:
   - Open: `supabase/seed.sql`
   - Copy all contents
   - Paste in new SQL query
   - Click "Run"
   - This creates sample categories, partners, and offers

## Step 4: Start Development Server ⏳ TODO

After completing Step 2 and 3:

```bash
npm run dev
```

Then open: [http://localhost:3000](http://localhost:3000)

You should see:
- ✅ Homepage with hero section
- ✅ Category grid (if you ran seed data)
- ✅ How it works section
- ✅ Header and footer

## Troubleshooting

### Error: "Failed to fetch" or "Invalid API key"
**Solution**: Check your `.env.local` file has correct Supabase credentials

### Error: "relation does not exist"
**Solution**: Run the migration SQL file in Supabase SQL Editor

### Error: Module not found
**Solution**:
```bash
npm install
```

### Port 3000 already in use
**Solution**:
```bash
# Kill the process using port 3000
# Or use a different port:
npm run dev -- -p 3001
```

## Current Status Summary

| Task | Status | Action |
|------|--------|--------|
| Install dependencies | ✅ Complete | Done |
| Create .env.local | ✅ Complete | **UPDATE WITH REAL CREDENTIALS** |
| Create Supabase project | ⏳ Todo | Go to supabase.com |
| Run database migration | ⏳ Todo | Copy migration SQL to Supabase |
| Start dev server | ⏳ Todo | Run `npm run dev` |

## Next Steps

1. **Right now**: Set up Supabase account and get credentials
2. **Update**: `.env.local` with your credentials
3. **Run**: Database migration in Supabase SQL Editor
4. **Test**: `npm run dev` and open localhost:3000

## Quick Reference

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build production
npm run typecheck    # Check types
npm run lint         # Lint code

# Common issues
rm -rf node_modules package-lock.json
npm install          # Reinstall dependencies
```

## Files You Need to Edit

1. **`.env.local`** - Add Supabase credentials (required)
2. **Supabase SQL Editor** - Run migration file (required)
3. **Supabase SQL Editor** - Run seed file (optional, for sample data)

That's it! Once you have Supabase set up, you're ready to develop.

---

**Need help?** Check:
- [QUICKSTART.md](./QUICKSTART.md) - Detailed setup guide
- [TECHNICAL_SPECIFICATION.md](./TECHNICAL_SPECIFICATION.md) - Architecture details
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - File organization
