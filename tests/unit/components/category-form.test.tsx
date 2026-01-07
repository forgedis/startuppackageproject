import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CategoryForm } from '@/components/admin/category-form'

// Mock router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: vi.fn(),
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}))

// Mock actions
vi.mock('@/app/actions/categories', () => ({
  createCategory: vi.fn(),
  updateCategory: vi.fn(),
}))

describe('CategoryForm', () => {
  it('should render all form fields', () => {
    render(<CategoryForm />)

    expect(screen.getByLabelText(/Název kategorie/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/URL slug/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Popis/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Ikona/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Pořadí/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Aktivní/i)).toBeInTheDocument()
  })

  it('should auto-generate slug from name', async () => {
    const user = userEvent.setup()
    render(<CategoryForm />)

    const nameInput = screen.getByLabelText(/Název kategorie/i)
    const slugInput = screen.getByLabelText(/URL slug/i)

    await act(async () => {
      await user.type(nameInput, 'Finance & Účetnictví')
    })

    await waitFor(() => {
      expect(slugInput).toHaveValue('finance-ucetnictvi')
    })
  })

  it('should show validation error for empty name', async () => {
    const user = userEvent.setup()
    render(<CategoryForm />)

    const submitButton = screen.getByRole('button', { name: /Vytvořit kategorii/i })

    await user.click(submitButton)

    // HTML5 validation should prevent submission
    const nameInput = screen.getByLabelText(/Název kategorie/i) as HTMLInputElement
    expect(nameInput.validity.valid).toBe(false)
  })

  it('should pre-fill form when editing', () => {
    const category = {
      id: 'test-id',
      slug: 'test-slug',
      name_cs: 'Test Category',
      name_en: null,
      description_cs: 'Test description',
      icon: 'TestIcon',
      is_active: true,
      sort_order: 5,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    render(<CategoryForm category={category} />)

    expect(screen.getByLabelText(/Název kategorie/i)).toHaveValue('Test Category')
    expect(screen.getByLabelText(/URL slug/i)).toHaveValue('test-slug')
    expect(screen.getByLabelText(/Popis/i)).toHaveValue('Test description')
    expect(screen.getByLabelText(/Ikona/i)).toHaveValue('TestIcon')
    expect(screen.getByLabelText(/Pořadí/i)).toHaveValue(5)
    expect(screen.getByLabelText(/Aktivní/i)).toBeChecked()
  })
})
