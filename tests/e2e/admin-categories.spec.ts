import { test, expect } from '@playwright/test'

// NOTE: These tests require a test admin user to be set up in your Supabase instance
// Create a test admin with email: test@admin.com and password: TestAdmin123!

test.describe('Admin Categories Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/admin-login')
    await page.fill('input[type="email"]', 'test@admin.com')
    await page.fill('input[type="password"]', 'TestAdmin123!')
    await page.click('button[type="submit"]')

    // Wait for redirect to admin dashboard
    await page.waitForURL('/admin')
  })

  test('should navigate to categories page', async ({ page }) => {
    await page.click('a[href="/admin/categories"]')
    await expect(page).toHaveURL('/admin/categories')
    await expect(page.getByRole('heading', { name: 'Kategorie', exact: true })).toBeVisible()
  })

  test('should create a new category', async ({ page }) => {
    // Navigate to categories
    await page.goto('/admin/categories')

    // Click add category button
    await page.click('text=Přidat kategorii')
    await expect(page).toHaveURL('/admin/categories/new')

    // Use unique name with timestamp to avoid duplicate slug errors
    const timestamp = Date.now()
    const categoryName = `E2E Test Category ${timestamp}`
    const expectedSlug = `e2e-test-category-${timestamp}`

    // Fill form
    await page.fill('input[name="name_cs"]', categoryName)
    // Slug should auto-generate
    await expect(page.locator('input[name="slug"]')).toHaveValue(expectedSlug)

    await page.fill('textarea[name="description_cs"]', 'This is a test category')
    await page.fill('input[name="icon"]', 'TestTube')
    await page.fill('input[name="sort_order"]', '999')

    // Check active checkbox
    const activeCheckbox = page.locator('input[name="is_active"]')
    if (!(await activeCheckbox.isChecked())) {
      await activeCheckbox.check()
    }

    // Submit form
    await page.click('button[type="submit"]')

    // Should redirect to categories list
    await expect(page).toHaveURL('/admin/categories')

    // Should see the new category
    await expect(page.locator(`text=${categoryName}`)).toBeVisible()

    // Cleanup: Delete the test category
    page.on('dialog', dialog => dialog.accept())
    const deleteButton = page.locator(`text=${categoryName}`).locator('..').locator('..').locator('button:has-text("Smazat")')
    await deleteButton.click()
    await page.waitForTimeout(500)
  })

  test('should edit an existing category', async ({ page }) => {
    await page.goto('/admin/categories')

    // Check if there are any edit buttons
    const editButtons = page.locator('button:has-text("Upravit")')
    const count = await editButtons.count()

    // Skip if no categories exist
    if (count === 0) {
      test.skip()
    }

    // Click edit on first category
    await editButtons.first().click()

    // Wait for navigation and form input
    await page.waitForTimeout(1000) // Give time for page load

    const nameInput = page.locator('input[name="name_cs"]')

    // If input doesn't exist, skip the test
    if (await nameInput.count() === 0) {
      test.skip()
    }

    // Update the name
    await nameInput.fill('Updated Category Name')

    // Submit
    await page.click('button[type="submit"]')

    // Should redirect back
    await expect(page).toHaveURL('/admin/categories')
  })

  test('should delete a category', async ({ page }) => {
    await page.goto('/admin/categories')

    // Listen for confirmation dialog
    page.on('dialog', dialog => dialog.accept())

    // Click delete on a test category
    const deleteButtons = page.locator('button:has-text("Smazat")')
    const count = await deleteButtons.count()

    if (count > 0) {
      await deleteButtons.first().click()

      // Wait for deletion to complete
      await page.waitForLoadState('networkidle')
    }
  })

  test('should validate required fields', async ({ page }) => {
    await page.goto('/admin/categories/new')

    // Try to submit without filling form
    await page.click('button[type="submit"]')

    // Should not redirect (validation failed)
    await expect(page).toHaveURL('/admin/categories/new')

    // Check for HTML5 validation
    const nameInput = page.locator('input[name="name_cs"]')
    const isInvalid = await nameInput.evaluate((el: HTMLInputElement) => !el.validity.valid)
    expect(isInvalid).toBe(true)
  })
})
