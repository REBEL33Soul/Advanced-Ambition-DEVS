import { test, expect } from '@playwright/test'

test.describe('AI Model Switching', () => {
  test('should automatically switch models based on task', async ({ page }) => {
    await page.goto('/projects/test-project')

    // Enable auto-switching
    await page.getByRole('checkbox', { name: 'Auto-select optimal models' }).check()

    // Start a complex task
    await page.getByRole('button', { name: 'Generate Architecture' }).click()

    // Verify model switching
    await expect(page.getByText('Switching to GPT-4 for architecture design')).toBeVisible()
    
    // Verify task completion
    await expect(page.getByText('Architecture generated successfully')).toBeVisible()
  })

  test('should handle API rate limits gracefully', async ({ page }) => {
    await page.goto('/projects/test-project')

    // Simulate rate limit
    await page.evaluate(() => {
      window.postMessage({ type: 'TEST_RATE_LIMIT', model: 'gpt-4' }, '*')
    })

    // Verify fallback behavior
    await expect(page.getByText('Switching to alternative model')).toBeVisible()
    
    // Verify continued operation
    await expect(page.getByText('Task completed with alternative model')).toBeVisible()
  })
})