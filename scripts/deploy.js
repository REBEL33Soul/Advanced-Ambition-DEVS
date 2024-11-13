import { execSync } from 'child_process'

async function deploy() {
  console.log('Starting deployment...')

  try {
    // Build the application
    console.log('\nBuilding application...')
    execSync('npm run build', { stdio: 'inherit' })

    // Deploy to Cloudflare
    console.log('\nDeploying to Cloudflare...')
    execSync('wrangler publish', { stdio: 'inherit' })

    // Push to GitHub
    console.log('\nPushing to GitHub...')
    execSync('git add .', { stdio: 'inherit' })
    execSync('git commit -m "Deploy updates"', { stdio: 'inherit' })
    execSync('git push origin main', { stdio: 'inherit' })

    console.log('\nDeployment completed successfully!')
  } catch (error) {
    console.error('Deployment failed:', error)
    process.exit(1)
  }
}

deploy()