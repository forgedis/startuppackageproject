import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createCategory, updateCategory, deleteCategory } from '@/app/actions/categories'

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
    })),
  })),
}))

describe('Category Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('createCategory', () => {
    it('should create a category with valid data', async () => {
      const formData = new FormData()
      formData.append('name_cs', 'Test Category')
      formData.append('slug', 'test-category')
      formData.append('description_cs', 'Test description')
      formData.append('icon', 'TestIcon')
      formData.append('is_active', 'on')
      formData.append('sort_order', '0')

      await expect(createCategory(formData)).resolves.not.toThrow()
    })

    it('should throw error with invalid data', async () => {
      const formData = new FormData()
      // Missing required fields

      await expect(createCategory(formData)).rejects.toThrow()
    })

    it('should throw error with empty name', async () => {
      const formData = new FormData()
      formData.append('name_cs', '')
      formData.append('slug', 'test-slug')

      await expect(createCategory(formData)).rejects.toThrow()
    })
  })

  describe('updateCategory', () => {
    it('should update a category with valid data', async () => {
      const formData = new FormData()
      formData.append('name_cs', 'Updated Category')
      formData.append('slug', 'updated-category')
      formData.append('is_active', 'on')
      formData.append('sort_order', '1')

      await expect(
        updateCategory('test-uuid', formData)
      ).resolves.not.toThrow()
    })
  })

  describe('deleteCategory', () => {
    it('should delete a category', async () => {
      await expect(deleteCategory('test-uuid')).resolves.not.toThrow()
    })
  })
})
