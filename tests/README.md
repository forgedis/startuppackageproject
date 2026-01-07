# Testing Guide for StartupPackage

This project uses modern testing tools to ensure quality before deployment.

## 🧪 Testing Stack

- **Vitest** - Fast unit and integration tests (faster than Jest)
- **React Testing Library** - Component testing
- **Playwright** - End-to-end browser automation tests
- **TypeScript** - Type-safe tests

---

## 📦 Installation

Install test dependencies:

```bash
npm install
```

---

## 🚀 Running Tests

### Unit & Integration Tests (Vitest)

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with UI interface
npm run test:ui
```

### End-to-End Tests (Playwright)

**Important:** E2E tests require a test admin user!

1. Create test admin user in Supabase:
   - Email: `test@admin.com`
   - Password: `TestAdmin123!`
   - Add to `admin_users` table with `is_active = true`

2. Run E2E tests:

```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests with UI (visual mode)
npm run test:e2e:ui

# Run E2E tests in headed mode (see the browser)
npx playwright test --headed
```

---

## 📁 Test Structure

```
tests/
├── setup.ts                          # Vitest setup
├── unit/                             # Unit tests
│   ├── actions/
│   │   ├── categories.test.ts       # Category CRUD tests
│   │   └── partners.test.ts         # Partner CRUD tests
│   └── components/
│       └── category-form.test.tsx   # Component tests
└── e2e/                              # End-to-end tests
    ├── admin-categories.spec.ts     # Category management E2E
    └── admin-partners.spec.ts       # Partner management E2E
```

---

## ✅ What's Tested

### Unit Tests
- ✅ Category creation validation
- ✅ Partner creation validation
- ✅ URL format validation (https:// required)
- ✅ Email format validation
- ✅ Required field validation
- ✅ Form auto-generation (e.g., slug from name)

### Component Tests
- ✅ Form rendering
- ✅ Field validation
- ✅ Auto-slug generation
- ✅ Pre-filled data when editing

### E2E Tests
- ✅ Admin login flow
- ✅ Create new category
- ✅ Edit existing category
- ✅ Delete category (with confirmation)
- ✅ Create new partner
- ✅ URL validation (rejects www.test.com, requires https://)
- ✅ Email validation
- ✅ Checkbox toggling

---

## 🔧 Pre-Deployment Checklist

Before deploying, run:

```bash
# 1. Type checking
npm run typecheck

# 2. Linting
npm run lint

# 3. Unit tests
npm test

# 4. Build check
npm run build

# 5. E2E tests (requires running dev server)
npm run test:e2e
```

---

## 🎯 CI/CD Integration

Add to your GitHub Actions workflow:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run type checking
        run: npm run typecheck

      - name: Run unit tests
        run: npm test

      - name: Run build
        run: npm run build

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: npm run test:e2e
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
```

---

## 📝 Writing New Tests

### Unit Test Example

```typescript
import { describe, it, expect } from 'vitest'

describe('My Function', () => {
  it('should do something', () => {
    expect(true).toBe(true)
  })
})
```

### E2E Test Example

```typescript
import { test, expect } from '@playwright/test'

test('should load homepage', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toContainText('StartupPackage')
})
```

---

## 🐛 Debugging Tests

### Debug Unit Tests
```bash
# Run specific test file
npx vitest run tests/unit/actions/categories.test.ts

# Debug in VS Code
# Add breakpoint and run "Debug Test" in Test Explorer
```

### Debug E2E Tests
```bash
# Run with headed browser
npx playwright test --headed

# Run with debug mode (step through)
npx playwright test --debug

# Run specific test
npx playwright test tests/e2e/admin-categories.spec.ts
```

---

## 🔄 Coverage Report

Generate test coverage:

```bash
npx vitest run --coverage
```

Coverage report will be in `coverage/index.html`

---

## 💡 Best Practices

1. **Write tests before deploying** - Catch bugs early
2. **Keep tests fast** - Use mocks for external dependencies
3. **Test user behavior** - Not implementation details
4. **Use descriptive test names** - `should create category with valid data`
5. **One assertion per test** - Makes failures clearer
6. **Clean up after tests** - Use `afterEach` hooks

---

## 📚 Resources

- [Vitest Documentation](https://vitest.dev)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Happy Testing! 🎉**
