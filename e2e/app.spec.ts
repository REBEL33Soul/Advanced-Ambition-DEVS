import { test, expect } from '@playwright/test'

test('basic app flow', async ({ page }) => {
  await page.goto('/')
  
  // Check initial page load
  await expect(page.getByText('Advanced Ambition DEVS')).toBeVisible()
  
  // Test authentication
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page.getByText('Sign in to your account')).toBeVisible()
  
  // Test project creation
  await page.getByRole('button', { name: 'New Project' }).click()
  await expect(page.getByText('Create New Project')).toBeVisible()
  
  // Fill project details
  await page.getByLabel('Project Name').fill('Test Project')
  await page.getByLabel('Project Type').selectOption('web')
  await page.getByLabel('Framework').selectOption('react')
  await page.getByRole('button', { name: 'Create' }).click()
  
  // Verify project creation
  await expect(page.getByText('Project created successfully')).toBeVisible()
})

test('model selection and API key management', async ({ page }) => {
  await page.goto('/settings/models')
  
  // Test model configuration
  await expect(page.getByText('AI Model Configuration')).toBeVisible()
  
  // Add API key
  await page.getByRole('button', { name: 'Add API Key' }).click()
  await page.getByLabel('Provider').selectOption('openai')
  await page.getByLabel('API Key').fill('test-key')
  await page.getByRole('button', { name: 'Save' }).click()
  
  // Verify API key addition
  await expect(page.getByText('API key added successfully')).toBeVisible()
})

test('project building and deployment', async ({ page }) => {
  await page.goto('/projects/test-project')
  
  // Test build process
  await page.getByRole('button', { name: 'Build' }).click()
  await expect(page.getByText('Building project...')).toBeVisible()
  
  // Wait for build completion
  await expect(page.getByText('Build completed')).toBeVisible({ timeout: 30000 })
  
  // Test deployment
  await page.getByRole('button', { name: 'Deploy' }).click()
  await expect(page.getByText('Deploying to Netlify...')).toBeVisible()
  
  // Verify deployment
  await expect(page.getByText('Deployment successful')).toBeVisible({ timeout: 60000 })
})