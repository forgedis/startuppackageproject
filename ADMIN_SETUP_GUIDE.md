# 🔐 Admin Panel Setup Guide

Complete guide to setting up and using the StartupPackage admin panel.

---

## 📋 Step 1: Set Up Supabase Storage

### Create Storage Bucket for Images

1. Go to your Supabase Dashboard → **Storage**
2. Click "Create new bucket"
3. Name it: `partner-logos`
4. Enable **Public bucket**
5. Click "Create bucket"

### Set Up Storage Policies

Go to **SQL Editor** and run the contents of `supabase/storage-setup.sql`:

```sql
-- Allow public read access
CREATE POLICY "Public can view partner logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'partner-logos');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload partner logos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'partner-logos' AND auth.role() = 'authenticated');

-- Allow authenticated users to update
CREATE POLICY "Authenticated users can update partner logos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'partner-logos' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete
CREATE POLICY "Authenticated users can delete partner logos"
ON storage.objects FOR DELETE
USING (bucket_id = 'partner-logos' AND auth.role() = 'authenticated');
```

---

## 👤 Step 2: Create Your First Admin User

### Option A: Using Supabase Dashboard (Recommended)

1. Go to **Authentication** → **Users**
2. Click "Add user"
3. Enter email and password (e.g., `admin@startuppackage.cz`)
4. Click "Create user"

### Option B: Using SQL Editor

```sql
-- Create admin user account (replace with your email and password)
-- Password will be hashed automatically by Supabase Auth
```

**Important:** After creating the user in Auth, add them to the admin_users table:

Go to **SQL Editor** and run:

```sql
-- Add user to admin_users table (replace email with your actual admin email)
INSERT INTO admin_users (email, first_name, last_name, is_active)
VALUES ('admin@startuppackage.cz', 'Admin', 'User', true);
```

---

## 🚀 Step 3: Access the Admin Panel

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your browser and go to:
   ```
   http://localhost:3000/admin
   ```

3. You'll be redirected to the login page

4. Enter your admin credentials:
   - Email: `admin@startuppackage.cz`
   - Password: (the one you set in Supabase)

5. Click "Přihlásit se"

---

## 🎨 Admin Panel Features

### Dashboard (/)
- Overview of all data (categories, partners, offers, leads)
- Quick action buttons
- Statistics cards

### Categories (/admin/categories)
**Features:**
- ✅ List all categories
- ✅ Create new category
- ✅ Edit existing category
- ✅ Delete category
- ✅ Set icon (Lucide React icon names)
- ✅ Toggle active/inactive
- ✅ Set display order

**Fields:**
- Name (Czech) *required*
- URL slug *required* (auto-generated from name)
- Description (Czech)
- Icon (Lucide React name, e.g., "DollarSign", "Code")
- Sort order (0 = first)
- Active status checkbox

### Partners (/admin/partners)
**Features:**
- ✅ List all partners with logos
- ✅ Create new partner
- ✅ Edit existing partner
- ✅ Delete partner
- ✅ **Upload logo image** (PNG, JPG, GIF up to 2MB)
- ✅ Toggle active/inactive
- ✅ Set display order

**Fields:**
- Name *required*
- URL slug *required* (auto-generated)
- Short description (one-liner)
- Full description (detailed)
- Logo image (upload via drag & drop or click)
- Website URL
- Contact email
- Sort order
- Active status checkbox

### Offers (/admin/offers)
**Features:**
- ✅ List all offers with partner and category info
- ✅ View offer details
- ✅ Link to public offer page
- ⏳ Create/Edit forms (coming soon - currently manage via database)

**Current Limitations:**
- Offer creation/editing forms are complex and will be added in next phase
- For now, manage offers directly in Supabase Table Editor

### Leads (/admin/leads)
**Features:**
- ✅ View all lead submissions
- ✅ See lead details (name, email, phone, company, message)
- ✅ View associated offer and partner
- ✅ See lead status badges
- ✅ See submission time

**Lead Statuses:**
- **Nová** (new) - Just submitted
- **Kontaktováno** (contacted) - Partner contacted
- **Kvalifikováno** (qualified) - Lead is qualified
- **Konvertováno** (converted) - Successfully converted
- **Zamítnuto** (rejected) - Not interested

---

## 📸 How to Use Image Upload

### Uploading Partner Logos

1. Go to **Partners** → Click "Přidat partnera" or edit existing partner
2. Scroll to "Logo partnera" section
3. Click on the upload area or drag & drop an image
4. The image will automatically upload to Supabase Storage
5. Preview will appear immediately
6. To change: Click the X button and upload a new image
7. Click "Vytvořit partnera" or "Uložit změny"

**Image Requirements:**
- Format: PNG, JPG, GIF
- Max size: 2MB
- Recommended: Square images (e.g., 400x400px)
- Transparent background recommended for logos

---

## 🔍 Common Icon Names (for Categories)

Here are popular Lucide React icon names you can use:

- `DollarSign` - Finance
- `Code` - Technology
- `Scale` - Legal
- `Users` - HR
- `Building` - Coworking
- `GraduationCap` - Education/Mentoring
- `Globe` - International/Expansion
- `Megaphone` - Marketing
- `TrendingUp` - Sales/Growth
- `Settings` - Tools/Services

Full list: https://lucide.dev/icons/

---

## 🛠️ Managing Data

### Best Practices

1. **Categories First**
   - Create all your categories before adding offers
   - Use clear, descriptive names
   - Set appropriate sort orders (0, 10, 20, etc.)

2. **Partners Second**
   - Add all partners with complete information
   - Upload high-quality logos
   - Include website and contact email

3. **Offers Third**
   - Link offers to existing partners and categories
   - Write clear titles and descriptions
   - Set published dates

4. **Review Leads Regularly**
   - Check new leads daily
   - Update statuses as you process them

### Slug Generation

Slugs are automatically generated from names:
- Converts to lowercase
- Removes Czech diacritics (á→a, č→c, etc.)
- Replaces spaces with hyphens
- Example: "Finance & účetnictví" → "finance-a-ucetnictvi"

You can manually edit slugs if needed!

---

## 🚨 Troubleshooting

### Cannot Login

**Problem:** "Nemáte oprávnění k přístupu do administrace"

**Solution:** Make sure your email exists in the `admin_users` table:

```sql
SELECT * FROM admin_users WHERE email = 'your@email.com';
```

If not found, add yourself:

```sql
INSERT INTO admin_users (email, first_name, last_name, is_active)
VALUES ('your@email.com', 'Your', 'Name', true);
```

### Image Upload Fails

**Problem:** "Chyba při nahrávání obrázku"

**Solutions:**
1. Check storage bucket exists and is named `partner-logos`
2. Verify storage policies are set up correctly
3. Check file size (must be under 2MB)
4. Check file type (must be image/*)
5. Make sure you're authenticated

### Category/Partner Not Showing on Website

**Problem:** Item doesn't appear on public pages

**Solutions:**
1. Check "Aktivní" checkbox is enabled
2. For categories: Check if offers exist in that category
3. Clear browser cache and refresh
4. Check that item isn't set to future publish date

---

## 🎯 Next Steps

After setting up the admin panel:

1. ✅ Create all 8 categories from seed data
2. ✅ Add partners with logos
3. ✅ Create offers linking partners to categories
4. ✅ Test the complete user flow from homepage to lead submission
5. ✅ Monitor leads and respond quickly

---

## 💡 Tips for Non-Technical Users

### Adding a New Partner

1. Click "Partneři" in sidebar
2. Click green "Přidat partnera" button
3. Fill in partner name (required)
4. URL slug will auto-generate - don't touch it unless needed
5. Write a short one-line description
6. Write a longer detailed description
7. Click on the image upload area to add a logo
8. Add website URL (must start with https://)
9. Add contact email
10. Make sure "Aktivní" is checked
11. Click "Vytvořit partnera"

### Adding a New Category

1. Click "Kategorie" in sidebar
2. Click green "Přidat kategorii" button
3. Fill in category name in Czech (required)
4. URL slug will auto-generate
5. Write a description
6. Choose an icon name from the list above
7. Set order number (lower = appears first)
8. Make sure "Aktivní" is checked
9. Click "Vytvořit kategorii"

### Editing Existing Data

1. Go to the relevant section (Categories/Partners/etc.)
2. Find the item you want to edit
3. Click the "Upravit" (Edit) button
4. Change any fields you need
5. Click "Uložit změny" (Save changes)

### Deleting Data

1. Find the item you want to delete
2. Click the red "Smazat" (Delete) button
3. Confirm the deletion (this cannot be undone!)

---

## 🔐 Security Notes

- Never share your admin credentials
- Use a strong password
- Admin panel is protected - only authenticated admin users can access
- All data changes are logged in database
- Regular backups are recommended

---

**Need help?** Check the main `FINAL_SETUP_STEPS.md` for database setup instructions.
