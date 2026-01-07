import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createPartner, updatePartner, deletePartner } from '@/app/actions/partners'

// Mock Next.js modules
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}))

// Mock Supabase
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      insert: vi.fn(() => ({ error: null })),
      update: vi.fn(() => ({ eq: vi.fn(() => ({ error: null })) })),
      delete: vi.fn(() => ({ eq: vi.fn(() => ({ error: null })) })),
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          limit: vi.fn(() => ({ data: [], error: null })),
        })),
      })),
    })),
  })),
}))

describe('Partner Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('createPartner', () => {
    it('should create a partner with valid data', async () => {
      const formData = new FormData()
      formData.append('name', 'Test Partner')
      formData.append('slug', 'test-partner')
      formData.append('short_description', 'Short desc')
      formData.append('full_description', 'Full description')
      formData.append('logo_url', 'https://example.com/logo.png')
      formData.append('website_url', 'https://example.com')
      formData.append('contact_email', 'test@example.com')
      formData.append('is_verified', 'on')
      formData.append('sort_order', '0')

      await expect(createPartner(formData)).resolves.not.toThrow()
    })

    it('should throw error with invalid email', async () => {
      const formData = new FormData()
      formData.append('name', 'Test Partner')
      formData.append('slug', 'test-partner')
      formData.append('contact_email', 'invalid-email')

      await expect(createPartner(formData)).rejects.toThrow()
    })

    it('should throw error with invalid URL', async () => {
      const formData = new FormData()
      formData.append('name', 'Test Partner')
      formData.append('slug', 'test-partner')
      formData.append('website_url', 'not-a-url')

      await expect(createPartner(formData)).rejects.toThrow()
    })

    it('should throw error with missing required fields', async () => {
      const formData = new FormData()
      // Missing name and slug

      await expect(createPartner(formData)).rejects.toThrow()
    })
  })

  describe('updatePartner', () => {
    it('should update a partner with valid data', async () => {
      const formData = new FormData()
      formData.append('name', 'Updated Partner')
      formData.append('slug', 'updated-partner')
      formData.append('website_url', 'https://updated.com')
      formData.append('sort_order', '1')

      await expect(
        updatePartner('test-uuid', formData)
      ).resolves.not.toThrow()
    })
  })

  describe('deletePartner', () => {
    it('should delete a partner', async () => {
      await expect(deletePartner('test-uuid')).resolves.not.toThrow()
    })
  })
})
