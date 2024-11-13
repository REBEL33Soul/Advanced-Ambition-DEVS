import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Add custom matchers
expect.extend({
  toHaveBeenCalledOnce(received: any) {
    const pass = received.mock.calls.length === 1
    return {
      pass,
      message: () => `expected ${received} to have been called once`
    }
  }
})