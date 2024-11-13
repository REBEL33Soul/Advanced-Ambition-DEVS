import { execSync } from 'child_process'

async function runAllTests() {
  console.log('Running comprehensive test suite...')

  try {
    // Unit tests
    console.log('\nRunning unit tests...')
    execSync('npm test', { stdio: 'inherit' })

    // E2E tests
    console.log('\nRunning E2E tests...')
    execSync('npm run test:e2e', { stdio: 'inherit' })

    // Performance tests
    console.log('\nRunning performance tests...')
    execSync('npm run test:performance', { stdio: 'inherit' })

    // Integration tests
    console.log('\nRunning integration tests...')
    execSync('npm run test:integration', { stdio: 'inherit' })

    console.log('\nAll tests completed successfully!')
  } catch (error) {
    console.error('Test suite failed:', error)
    process.exit(1)
  }
}

runAllTests()