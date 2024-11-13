import { execSync } from 'child_process'
import { readFileSync, createReadStream } from 'fs'
import { createHash } from 'crypto'
import fetch from 'node-fetch'

async function publishRelease() {
  try {
    const version = process.env.npm_package_version
    console.log(`Publishing release v${version}...`)

    // Build all installers
    await buildInstallers()

    // Calculate checksums and sizes
    const downloads = await getDownloadInfo()

    // Create version info
    const versionInfo = {
      version,
      releaseDate: new Date().toISOString(),
      downloads,
      releaseNotes: getReleaseNotes(),
      cloudflare: {
        cdn: 'https://cdn.advancedambition.dev',
        zone: process.env.CF_ZONE_ID,
        worker: 'https://update.advancedambition.dev'
      }
    }

    // Upload to Cloudflare R2
    await uploadToR2(downloads)

    // Update KV namespace
    await updateKV(versionInfo)

    // Create GitHub release
    await createGitHubRelease(version, downloads)

    console.log('Release published successfully!')
  } catch (error) {
    console.error('Failed to publish release:', error)
    process.exit(1)
  }
}

async function buildInstallers() {
  console.log('Building installers...')
  execSync('node scripts/build-installers.js', { stdio: 'inherit' })
}

async function getDownloadInfo() {
  const platforms = ['mac', 'windows', 'linux', 'ios', 'android']
  const downloads = {}

  for (const platform of platforms) {
    const fileName = getInstallerFileName(platform)
    const filePath = `dist/installers/${fileName}`

    const fileBuffer = readFileSync(filePath)
    const sha256 = createHash('sha256').update(fileBuffer).digest('hex')
    const size = fileBuffer.length

    downloads[platform] = {
      url: `https://github.com/REBEL33Soul/Advanced-Ambition-DEVS/releases/download/v${version}/${fileName}`,
      sha256,
      size
    }
  }

  return downloads
}

function getInstallerFileName(platform) {
  switch (platform) {
    case 'mac': return 'AdvancedAmbitionDEVS-mac.dmg'
    case 'windows': return 'AdvancedAmbitionDEVS-win.exe'
    case 'linux': return 'AdvancedAmbitionDEVS-linux.AppImage'
    case 'ios': return 'AdvancedAmbitionDEVS.ipa'
    case 'android': return 'AdvancedAmbitionDEVS.apk'
  }
}

async function uploadToR2(downloads) {
  console.log('Uploading to Cloudflare R2...')
  
  for (const [platform, info] of Object.entries(downloads)) {
    const fileName = getInstallerFileName(platform)
    const filePath = `dist/installers/${fileName}`

    const stream = createReadStream(filePath)
    await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/r2/buckets/releases/objects/${fileName}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${process.env.CF_API_TOKEN}`,
        'Content-Type': 'application/octet-stream'
      },
      body: stream
    })
  }
}

async function updateKV(versionInfo) {
  console.log('Updating Cloudflare KV...')
  
  await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/storage/kv/namespaces/${process.env.CF_KV_NAMESPACE_ID}/values/latest`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${process.env.CF_API_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(versionInfo)
  })
}

function getReleaseNotes() {
  try {
    return readFileSync('CHANGELOG.md', 'utf-8')
  } catch {
    return 'No release notes available.'
  }
}

publishRelease().catch(console.error)