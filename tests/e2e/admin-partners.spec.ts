import { test, expect } from '@playwright/test'

test.describe('Admin Partners Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/admin-login')
    await page.fill('input[type="email"]', 'test@admin.com')
    await page.fill('input[type="password"]', 'TestAdmin123!')
    await page.click('button[type="submit"]')
    await page.waitForURL('/admin')
  })

  test('should create a new partner', async ({ page }) => {
    await page.goto('/admin/partners/new')

    // Use unique name with timestamp to avoid duplicate slug errors
    const timestamp = Date.now()
    const partnerName = `E2E Test Partner ${timestamp}`
    const expectedSlug = `e2e-test-partner-${timestamp}`

    // Fill form
    await page.fill('input[name="name"]', partnerName)
    await expect(page.locator('input[name="slug"]')).toHaveValue(expectedSlug)

    await page.fill('input[name="short_description"]', 'Short test description')
    await page.fill('textarea[name="full_description"]', 'Full test description here')
    await page.fill('input[name="website_url"]', 'https://testpartner.com')
    await page.fill('input[name="contact_email"]', 'test@testpartner.com')

    // Submit
    await page.click('button[type="submit"]')

    // Should redirect to partners list
    await expect(page).toHaveURL('/admin/partners')
    await expect(page.locator(`text=${partnerName}`)).toBeVisible()

    // Cleanup: Delete the test partner
    page.on('dialog', dialog => dialog.accept())
    const deleteButton = page.locator(`text=${partnerName}`).locator('..').locator('..').locator('button:has-text("Smazat")')
    await deleteButton.click()
    await page.waitForTimeout(500)
  })

  test('should validate URL format', async ({ page }) => {
    await page.goto('/admin/partners/new')

    await page.fill('input[name="name"]', 'Test Partner')
    await page.fill('input[name="slug"]', 'test-partner')

    // Try invalid URL without https://
    await page.fill('input[name="website_url"]', 'www.test.com')
    await page.click('button[type="submit"]')

    // Should show validation error
    await page.waitForTimeout(500)

    // Check for error message or still on same page
    const url = page.url()
    expect(url).toContain('/admin/partners/new')
  })

  test('should validate email format', async ({ page }) => {
    await page.goto('/admin/partners/new')

    await page.fill('input[name="name"]', 'Test Partner')
    await page.fill('input[name="slug"]', 'test-partner')
    await page.fill('input[name="contact_email"]', 'invalid-email')

    // Try to submit
    await page.click('button[type="submit"]')

    // Check HTML5 validation
    const emailInput = page.locator('input[name="contact_email"]')
    const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid)
    expect(isInvalid).toBe(true)
  })

  test('should toggle partner checkboxes', async ({ page }) => {
    await page.goto('/admin/partners/new')

    const verifiedCheckbox = page.locator('input[name="is_verified"]')
    const featuredCheckbox = page.locator('input[name="is_featured"]')

    // Should be unchecked by default
    await expect(verifiedCheckbox).not.toBeChecked()
    await expect(featuredCheckbox).not.toBeChecked()

    // Check them
    await verifiedCheckbox.check()
    await featuredCheckbox.check()

    await expect(verifiedCheckbox).toBeChecked()
    await expect(featuredCheckbox).toBeChecked()
  })
})
