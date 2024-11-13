import { test, expect } from '@playwright/test'

test.describe('Project Creation Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Login first
    await page.getByRole('button', { name: 'Login' }).click()
    await page.fill('[name="email"]', 'test@example.com')
    await page.fill('[name="password"]', 'password123')
    await page.click('button[type="submit"]')
  })

  test('should create a new web project', async ({ page }) => {
    // Click new project button
    await page.getByRole('button', { name: 'New Project' }).click()

    // Fill project details
    await page.fill('[name="projectName"]', 'E2E Test Project')
    await page.selectOption('select[name="projectType"]', 'web')
    await page.selectOption('select[name="framework"]', 'react')

    // Submit form
    await page.click('button[type="submit"]')

    // Verify success
    await expect(page.getByText('Project created successfully')).toBeVisible()

    // Verify project appears in list
    await expect(page.getByText('E2E Test Project')).toBeVisible()
  })

  test('should handle model selection', async ({ page }) => {
    await page.goto('/settings/models')

    // Toggle auto-select
    await page.getByLabel('Auto-select optimal models').click()

    // Add API key
    await page.getByRole('button', { name: 'Add API Key' }).click()
    await page.selectOption('select[name="provider"]', 'openai')
    await page.fill('[name="apiKey"]', 'test-key')
    await page.click('button[type="submit"]')

    // Verify success
    await expect(page.getByText('API key added successfully')).toBeVisible()
  })
})